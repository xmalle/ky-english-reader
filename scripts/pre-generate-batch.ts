/**
 * 预生成脚本：批量为 passages 表中的文章生成 sentence_analyses 缓存
 *
 * 运行方式：
 *   npx tsx scripts/pre-generate-batch.ts
 *
 * 环境变量（可选，默认读取 .env.local）：
 *   AI_BASE_URL      - AI API 基础地址
 *   AI_API_KEY       - AI API 密钥
 *   AI_MODEL         - 模型名称
 *   DB_PASSWORD      - Supabase 数据库密码
 */

import { Pool, PoolClient } from "pg";
import { z } from "zod";

// ============================================================
// 配置
// ============================================================

const AI_BASE_URL = process.env.AI_BASE_URL ?? "https://api.deepseek.com/v1";
const AI_API_KEY = process.env.AI_API_KEY ?? "";
const AI_MODEL = process.env.AI_MODEL ?? "deepseek-chat";

const DB_HOST = process.env.DB_HOST ?? "2406:da1c:4c7:f800:6ed7:dc9b:6c10:4e8a";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "QMRQr1Dw2YHmmODE";
const DB_PORT = Number(process.env.DB_PORT ?? 5432);

/** 文章间处理延迟（毫秒） */
const DELAY_MS = 2000;
/** AI 请求最大重试次数 */
const MAX_RETRIES = 3;
/** AI 请求超时（毫秒） */
const AI_TIMEOUT_MS = 120_000;

// ============================================================
// Zod Schema：验证 AI 返回的 JSON
// ============================================================

const SentenceAnalysisSchema = z.object({
  sentence_index: z.number().int().min(0),
  original_text: z.string().min(1),
  translation: z.string().min(1),
  syntax_analysis: z.string(),
});

const AiResponseSchema = z.array(SentenceAnalysisSchema);

// ============================================================
// 数据库连接
// ============================================================

function createPool(): Pool {
  return new Pool({
    host: DB_HOST,
    port: DB_PORT,
    database: "postgres",
    user: "postgres",
    password: DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
      servername: "db.sgkaybgsuvgjhddmjkct.supabase.co",
    },
    family: 6,
  });
}

// ============================================================
// 类型定义
// ============================================================

interface PassageRow {
  id: string;
  year: number;
  text_num: string;
  title: string | null;
  content: {
    paragraphs: {
      index: number;
      sentences: { index: number; text: string }[];
    }[];
    fullText: string;
  };
}

interface SentenceAnalysisItem {
  sentence_index: number;
  original_text: string;
  translation: string;
  syntax_analysis: string;
}

// ============================================================
// AI 调用
// ============================================================

const SYSTEM_PROMPT = `你是一位考研英语辅导专家。请分析用户提供的考研英语阅读文章，并严格返回一个 JSON 数组。

数组中的每一个对象对应文章中的一句话，必须包含以下字段：
- sentence_index: 句子序号（从 0 开始的整数）
- original_text: 原句（必须与输入完全一致）
- translation: 精翻译文（中文，贴合考研翻译风格，准确且通顺）
- syntax_analysis: 语法结构分析（简洁说明句子结构、从句类型、关键语法点，50-100字）

重要要求：
1. 必须返回纯净的 JSON 数组，不要包含 markdown 代码块标记（如 \`\`\`json）
2. 数组长度必须与文章中的句子数量完全一致
3. sentence_index 必须按 0, 1, 2... 的顺序连续排列
4. 每个句子的 original_text 必须与输入的原文完全一致
5. 只返回 JSON，不要添加任何其他解释或说明文字`;

function buildUserPrompt(passage: PassageRow): string {
  const sentences: string[] = [];
  passage.content.paragraphs.forEach((para) => {
    para.sentences.forEach((s) => {
      sentences.push(`[${s.index}] ${s.text}`);
    });
  });

  return `请分析以下考研英语阅读文章的所有句子：

文章：${passage.year}年 ${passage.text_num}${passage.title ? ` (${passage.title})` : ""}

共 ${sentences.length} 句话：

${sentences.join("\n\n")}

请返回包含 ${sentences.length} 个对象的 JSON 数组。`;
}

async function callAiWithRetry(
  prompt: string,
  retries = MAX_RETRIES,
): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

      const res = await fetch(`${AI_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt },
          ],
          temperature: 0.3,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const json = await res.json();
      const content = json.choices?.[0]?.message?.content ?? "";

      if (!content.trim()) {
        throw new Error("AI 返回空内容");
      }

      return content;
    } catch (err) {
      const isLast = attempt === retries;
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`    ⚠️ AI 请求失败 (尝试 ${attempt}/${retries}): ${msg}`);

      if (isLast) {
        throw new Error(`AI 请求在 ${retries} 次尝试后仍然失败: ${msg}`);
      }

      // 指数退避
      const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 8000);
      await sleep(backoff);
    }
  }

  throw new Error("AI 请求失败");
}

// ============================================================
// JSON 解析与验证
// ============================================================

function cleanJson(raw: string): string {
  // 移除 markdown 代码块标记
  let cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  // 有时 AI 会在 JSON 前后添加解释文字，尝试提取 JSON 数组
  const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    cleaned = arrayMatch[0];
  }

  return cleaned;
}

function parseAndValidateAiResponse(
  raw: string,
  expectedCount: number,
): SentenceAnalysisItem[] {
  const cleaned = cleanJson(raw);

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`JSON 解析失败: ${msg}\n原始内容前 200 字: ${raw.slice(0, 200)}`);
  }

  const result = AiResponseSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error(
      `Zod 验证失败: ${result.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ")}`,
    );
  }

  const items = result.data;

  if (items.length !== expectedCount) {
    throw new Error(
      `句子数量不匹配: 期望 ${expectedCount} 句，实际返回 ${items.length} 句`,
    );
  }

  // 验证 sentence_index 连续性
  for (let i = 0; i < items.length; i++) {
    if (items[i].sentence_index !== i) {
      throw new Error(
        `sentence_index 不连续: 期望 ${i}，实际 ${items[i].sentence_index}`,
      );
    }
  }

  return items;
}

// ============================================================
// 数据库操作
// ============================================================

async function fetchUnprocessedPassages(client: PoolClient): Promise<PassageRow[]> {
  const { rows } = await client.query(`
    SELECT p.id, p.year, p.text_num, p.title, p.content
    FROM passages p
    WHERE NOT EXISTS (
      SELECT 1 FROM sentence_analyses sa
      WHERE sa.passage_id = p.id
    )
    ORDER BY p.year DESC, p.text_num ASC
  `);
  return rows as PassageRow[];
}

async function bulkInsertAnalyses(
  client: PoolClient,
  passageId: string,
  items: SentenceAnalysisItem[],
): Promise<number> {
  const values: (string | number)[] = [];
  const placeholders: string[] = [];

  items.forEach((item, idx) => {
    const base = idx * 5;
    placeholders.push(
      `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5})`,
    );
    values.push(
      passageId,
      item.sentence_index,
      item.original_text,
      item.translation,
      item.syntax_analysis,
    );
  });

  const sql = `
    INSERT INTO sentence_analyses (passage_id, sentence_index, original_text, translation, syntax_analysis)
    VALUES ${placeholders.join(", ")}
    ON CONFLICT (passage_id, sentence_index) DO UPDATE SET
      original_text = EXCLUDED.original_text,
      translation = EXCLUDED.translation,
      syntax_analysis = EXCLUDED.syntax_analysis,
      created_at = now()
  `;

  await client.query(sql, values);
  return items.length;
}

// ============================================================
// 工具函数
// ============================================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("zh-CN", { hour12: false });
}

// ============================================================
// 主流程
// ============================================================

async function main() {
  console.log("=".repeat(60));
  console.log("考研英语阅读理解 - 句子分析预生成脚本");
  console.log("=".repeat(60));
  console.log();

  if (!AI_API_KEY) {
    console.error("❌ 错误: 未设置 AI_API_KEY 环境变量");
    console.error("   请确保 .env.local 中配置了 AI_API_KEY，或通过环境变量传入");
    process.exit(1);
  }

  console.log(`AI 配置: ${AI_BASE_URL} / ${AI_MODEL}`);
  console.log(`数据库: ${DB_HOST}:${DB_PORT}`);
  console.log();

  const pool = createPool();
  const client = await pool.connect();

  try {
    console.log("正在查询未处理的文章...\n");
    const passages = await fetchUnprocessedPassages(client);

    if (passages.length === 0) {
      console.log("✅ 所有文章已处理完毕，无需预生成。");
      return;
    }

    console.log(`找到 ${passages.length} 篇未处理的文章\n`);
    console.log("-".repeat(60));

    let successCount = 0;
    let failCount = 0;
    let totalSentences = 0;
    const startTime = Date.now();

    for (let i = 0; i < passages.length; i++) {
      const passage = passages[i];
      const sentenceCount = passage.content.paragraphs.reduce(
        (sum, p) => sum + p.sentences.length,
        0,
      );
      const label = `${passage.year}_${passage.text_num}`;

      console.log(
        `[${i + 1}/${passages.length}] ${formatTime(new Date())} 正在处理 ${label} (${sentenceCount} 句)...`,
      );

      try {
        // 1. 构建 prompt 并调用 AI
        const userPrompt = buildUserPrompt(passage);
        const rawResponse = await callAiWithRetry(userPrompt);

        // 2. 解析并验证 JSON
        const analyses = parseAndValidateAiResponse(rawResponse, sentenceCount);

        // 3. 批量写入数据库
        const inserted = await bulkInsertAnalyses(client, passage.id, analyses);
        totalSentences += inserted;
        successCount++;

        console.log(
          `    ✅ 成功写入 ${inserted} 句话的解析`,
        );
      } catch (err) {
        failCount++;
        const msg = err instanceof Error ? err.message : String(err);
        console.log(`    ❌ 处理失败: ${msg}`);
      }

      // 4. 文章间延迟（最后一篇不需要）
      if (i < passages.length - 1) {
        process.stdout.write(`    ⏳ 等待 ${DELAY_MS}ms...`);
        await sleep(DELAY_MS);
        console.log(" 完成");
      }

      console.log();
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log("-".repeat(60));
    console.log("📊 处理统计");
    console.log(`   总文章数: ${passages.length}`);
    console.log(`   成功: ${successCount}`);
    console.log(`   失败: ${failCount}`);
    console.log(`   写入句子数: ${totalSentences}`);
    console.log(`   耗时: ${elapsed}s`);
    console.log("-".repeat(60));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("脚本执行出错:", err);
  process.exit(1);
});
