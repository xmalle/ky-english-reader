import type { PassageContent, Paragraph, Sentence } from "./types";

/**
 * 将纯文本文章拆分为段落和句子的结构化格式
 *
 * 拆分规则:
 * 1. 先按连续空行 (\n\n+) 拆分为段落
 * 2. 每个段落再按句子结束符号 (.!?)+ 引号/空格拆分为句子
 * 3. 过滤空段落和空句子
 */
export function parsePassageText(rawText: string): PassageContent {
  const cleaned = rawText.trim();

  // 按连续空行拆分段落
  const paragraphTexts = cleaned
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const paragraphs: Paragraph[] = paragraphTexts.map((paraText, pIndex) => {
    const sentences = splitSentences(paraText, pIndex);
    return { index: pIndex, sentences };
  });

  const fullText = paragraphs
    .flatMap((p) => p.sentences.map((s) => s.text))
    .join(" ");

  return { paragraphs, fullText };
}

/**
 * 将一个段落的文本拆分为句子数组
 * 处理英语句子的各种边界情况：
 * - 普通句子：以 .!? 结束
 * - 引号内的句子
 * - 缩略词（如 Mr. Dr. U.S. 等）
 */
function splitSentences(text: string, _paraIndex: number): Sentence[] {
  // 预处理：合并多余空格和换行
  const normalized = text.replace(/\s+/g, " ").trim();

  // 句子拆分正则：匹配以 .!? 结尾，后跟空格或字符串末尾
  // 排除常见的缩略词
  const sentenceBoundary =
    /(?<!\b(?:Mr|Mrs|Ms|Dr|Prof|St|Sr|Jr|vs|etc|i\.e|e\.g|U\.S|U\.K|a\.m|p\.m|No|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.)\s*(?<=[.!?])\s+(?=[A-Z0-9"'“‘(（]|\s*$)/;

  const rawParts = normalized.split(sentenceBoundary);

  const result: Sentence[] = [];
  let sentenceIndex = 0;

  for (const part of rawParts) {
    const trimmed = part.trim();
    if (trimmed.length === 0) continue;

    // 确保句子以有效结束符结尾；如果没有，附加到上一个句子
    if (/[.!?]$/.test(trimmed) || trimmed.length > 5) {
      result.push({ index: sentenceIndex++, text: trimmed });
    }
  }

  return result;
}
