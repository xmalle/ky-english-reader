/**
 * 从 DOCX 真题文件中提取 Text 1-4 阅读文章，生成 bilingual_corpus.json
 *
 * 用法：
 *   npx tsx scripts/extract-passages-from-docx.ts <DOCX目录路径> > bilingual_corpus.json
 */

import fs from "node:fs";
import path from "node:path";
import mammoth from "mammoth";

interface BilingualEntry {
  year: number;
  text_num: string;
  title: string;
  paragraphs: { sentences: { en: string; zh: string }[] }[];
}

/**
 * 句子分割（与项目 parser.ts 保持一致）
 */
function splitSentences(text: string): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];

  const boundary =
    /(?<!\b(?:Mr|Mrs|Ms|Dr|Prof|St|Sr|Jr|vs|etc|i\.e|e\.g|U\.S|U\.K|a\.m|p\.m|No|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.)\s*(?<=[.!?])\s+(?=[A-Z0-9"'""(（]|\s*$)/;
  const parts = cleaned.split(boundary);

  const result: string[] = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length < 3) continue;
    if (/[.!?]$/.test(trimmed) || trimmed.split(/\s+/).length >= 3) {
      result.push(trimmed);
    }
  }
  return result;
}

/**
 * 去除段落中混入的题目选项行（如 "[A] xxx"）
 */
function stripAnswerChoices(paragraph: string): string {
  return paragraph
    .replace(/\s*\[[A-D]\]\s*[^\n]*/gi, "")
    .replace(/\n\s*[A-D]\s+[^\n]*/gi, "")
    .trim();
}

/**
 * 检测是否已进入题目区域（非文章内容）
 */
function isQuestionLine(line: string): boolean {
  // 题目通常以数字加点开头或包含答案选项标记
  if (/^\d{1,2}\.\s/.test(line)) return true;
  if (/\[[A-D]\]/.test(line)) return true;
  if (/^\s*[A-D]\s{2,}/.test(line)) return true;
  return false;
}

/**
 * 处理一篇 DOCX 中的所有阅读文章
 */
async function processDocx(filePath: string, year: number): Promise<BilingualEntry[]> {
  const buf = fs.readFileSync(filePath);
  const result = await mammoth.extractRawText({ buffer: buf });
  const text = result.value;

  // 策略：直接查找 Text 1-4（无需依赖 Section II 标记）
  const textPattern = /(?:^|\n)\s*Text\s*(\d)\s*\n/g;
  const matches: { num: number; index: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = textPattern.exec(text)) !== null) {
    const num = parseInt(match[1]);
    matches.push({ num, index: match.index });
  }

  // 分离 Text 1-4（过滤掉题目中引用的 Text N）
  const textMatches = matches.filter(
    (m, i) => m.num >= 1 && m.num <= 4 && !matches.slice(0, i).some((prev) => prev.num === m.num),
  );
  textMatches.sort((a, b) => a.index - b.index);

  if (textMatches.length === 0) {
    // 回退：查找 "Part A" 或 "Reading Comprehension" 之后的 Text
    return [];
  }

  const entries: BilingualEntry[] = [];

  for (let i = 0; i < textMatches.length; i++) {
    const current = textMatches[i];
    const next = textMatches[i + 1];
    const startIdx = current.index;
    const endIdx = next?.index ?? Math.min(text.indexOf("\n\n\n", startIdx + 100), text.length);

    let passage = text.slice(startIdx, endIdx);

    // 去除 "Text N" 头
    passage = passage.replace(/^\s*Text\s*\d\s*/i, "").trim();

    // 按段落分割
    const rawParagraphs = passage.split(/\n{2,}/);

    const paragraphs: BilingualEntry["paragraphs"] = [];
    let inQuestions = false;

    for (const raw of rawParagraphs) {
      const cleaned = raw.replace(/\s+/g, " ").trim();
      if (cleaned.length < 10) continue;

      // 检测是否进入题目区域
      if (isQuestionLine(cleaned)) {
        inQuestions = true;
        continue;
      }
      if (inQuestions) continue;

      // 检测是否是阅读文章内容（非题目指令）
      if (/^(Directions|Read the following|Answer the questions|Part [A-C])/i.test(cleaned)) {
        continue;
      }

      const stripped = stripAnswerChoices(cleaned);
      const sentences = splitSentences(stripped);

      if (sentences.length > 0) {
        paragraphs.push({
          sentences: sentences.map((s) => ({ en: s, zh: "" })),
        });
      }
    }

    if (paragraphs.length > 0) {
      const sentCount = paragraphs.reduce((s, p) => s + p.sentences.length, 0);
      entries.push({
        year,
        text_num: `Text${current.num}`,
        title: `${year}年 Text${current.num}`,
        paragraphs,
      });
      console.error(`     Text${current.num}: ${sentCount} 句, ${paragraphs.length} 段落`);
    }
  }

  return entries;
}

// ============================================================
// 主流程
// ============================================================
async function main() {
  const dirPath = process.argv[2];
  if (!dirPath) {
    console.error("用法: npx tsx scripts/extract-passages-from-docx.ts <DOCX目录>");
    process.exit(1);
  }

  if (!fs.existsSync(dirPath)) {
    console.error("❌ 目录不存在:", dirPath);
    process.exit(1);
  }

  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".docx"))
    .sort();

  if (files.length === 0) {
    console.error("❌ 目录中没有 .docx 文件");
    process.exit(1);
  }

  console.error("═══════════════════════════════════════════");
  console.error("  从 DOCX 提取考研英语阅读文章");
  console.error(`  目录: ${dirPath}  (${files.length} 个文件)`);
  console.error("═══════════════════════════════════════════\n");

  const all: BilingualEntry[] = [];
  const yearRe = /^(\d{4})/;

  for (const file of files) {
    const ym = file.match(yearRe);
    if (!ym) continue;
    const year = parseInt(ym[1]);

    console.error(`  ${file} ...`);
    try {
      const entries = await processDocx(path.join(dirPath, file), year);
      all.push(...entries);
    } catch (err: any) {
      console.error(`    ❌ ${err.message}`);
    }
  }

  console.log(JSON.stringify(all, null, 2));

  const totalSent = all.reduce(
    (s, e) => s + e.paragraphs.reduce((sp, p) => sp + p.sentences.length, 0),
    0,
  );
  console.error(`\n✅ ${all.length} 篇文章, ${totalSent} 句`);
  console.error("运行导入: npx tsx scripts/import-bilingual-corpus.ts bilingual_corpus.json");
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
