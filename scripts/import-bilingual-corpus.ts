/**
 * 双语语料导入脚本：读取 bilingual_corpus.json（句级中英对照），
 * 写入 passages（文章结构）和 sentence_analyses（翻译缓存）。
 *
 * 运行方式：npx tsx scripts/import-bilingual-corpus.ts [文件路径]
 * 默认读取项目根目录的 bilingual_corpus.json
 *
 * 支持的 JSON 格式：
 *   1. "paragraphs": [{ "sentences": [{ "en": "...", "zh": "..." }] }]   ← 保留段落
 *   2. "sentences": [{ "en": "...", "zh": "..." }]                       ← 扁平（视为单段落）
 */

import dns from "node:dns";
import fs from "node:fs";
import path from "node:path";
import { Pool } from "pg";

// ============================================================
// 配置
// ============================================================
const PROJECT_REF = "sgkaybgsuvgjhddmjkct";
const DB_PASSWORD = "QMRQr1Dw2YHmmODE";

dns.setServers(["202.118.66.6", "114.114.114.114", "8.8.8.8"]);

// ============================================================
// 类型
// ============================================================
interface BilingualSentence {
  en: string;
  zh: string;
}

interface BilingualParagraph {
  sentences: BilingualSentence[];
}

interface BilingualPassage {
  year: number;
  text_num: string;
  title?: string;
  /** 方式一：段落结构 */
  paragraphs?: BilingualParagraph[];
  /** 方式二：扁平句子（脚本自动转为单段落） */
  sentences?: BilingualSentence[];
}

// ============================================================
// 数据库连接
// ============================================================
const DB_CONFIGS = [
  {
    host: "2406:da1c:4c7:f800:6ed7:dc9b:6c10:4e8a",
    port: 5432,
    user: "postgres",
    ssl: {
      rejectUnauthorized: false,
      servername: "db.sgkaybgsuvgjhddmjkct.supabase.co",
    },
    family: 6,
  },
  {
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    port: 6543,
    user: `postgres.${PROJECT_REF}`,
    ssl: { rejectUnauthorized: false },
  },
];

async function connectDB(): Promise<Pool> {
  for (const cfg of DB_CONFIGS) {
    const pool = new Pool({
      host: cfg.host,
      port: cfg.port,
      database: "postgres",
      user: cfg.user,
      password: DB_PASSWORD,
      ssl: cfg.ssl,
      ...("family" in cfg ? { family: cfg.family } : {}),
      connectionTimeoutMillis: 10_000,
    } as any);
    try {
      const client = await pool.connect();
      await client.query("SELECT 1");
      client.release();
      console.log(`  ✅ 数据库连接成功 (${cfg.host}:${cfg.port})`);
      return pool;
    } catch {
      await pool.end().catch(() => {});
    }
  }
  throw new Error("无法连接数据库");
}

// ============================================================
// 主流程
// ============================================================
async function main() {
  const filePath =
    process.argv[2] ?? path.join(process.cwd(), "bilingual_corpus.json");

  console.log("═══════════════════════════════════════════");
  console.log("  KyEnglishReader - 双语语料导入");
  console.log("═══════════════════════════════════════════\n");

  // 1. 读取 JSON
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf-8");
    console.log(`📂 读取文件: ${filePath}`);
  } catch {
    console.error(`❌ 找不到文件: ${filePath}`);
    console.error("   请确保 bilingual_corpus.json 存在，或指定路径：");
    console.error("   npx tsx scripts/import-bilingual-corpus.ts /path/to/file.json");
    process.exit(1);
  }

  let data: BilingualPassage[];
  try {
    data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error("根元素必须是数组");
  } catch (err: any) {
    console.error("❌ JSON 解析失败:", err.message);
    process.exit(1);
  }
  console.log(`📋 共 ${data.length} 个文章条目\n`);

  // 2. 连接数据库
  const pool = await connectDB();

  try {
    let created = 0;
    let updated = 0;
    let totalSentences = 0;
    let failed = 0;

    for (let i = 0; i < data.length; i++) {
      const entry = data[i];
      const label = `${entry.year}_${entry.text_num}`;
      const progress = `[${i + 1}/${data.length}]`;

      // 校验
      if (!entry.year || !entry.text_num) {
        console.log(`  ${progress} ${label} ⚠️  缺少 year 或 text_num，跳过`);
        failed++;
        continue;
      }

      // 解析句子和段落
      const paragraphs: BilingualParagraph[] = entry.paragraphs ?? (
        entry.sentences ? [{ sentences: entry.sentences }] : []
      );

      if (paragraphs.length === 0 || paragraphs.every((p) => (p.sentences?.length ?? 0) === 0)) {
        console.log(`  ${progress} ${label} ⚠️  无句子数据，跳过`);
        failed++;
        continue;
      }

      const sentenceCount = paragraphs.reduce(
        (sum, p) => sum + (p.sentences?.length ?? 0),
        0,
      );

      process.stdout.write(`  ${progress} ${label} (${sentenceCount} 句) ... `);

      try {
        // 3. 构建结构化 passage content
        let globalIdx = 0;
        const contentParagraphs = paragraphs.map((para, pIdx) => ({
          index: pIdx,
          sentences: (para.sentences ?? []).map((s) => ({
            index: globalIdx++,
            text: s.en,
          })),
        }));

        const fullText = contentParagraphs
          .flatMap((p) => p.sentences.map((s) => s.text))
          .join(" ");

        const content = {
          paragraphs: contentParagraphs,
          fullText,
        };

        // 4. Upsert passage
        const { rows: passageRows } = await pool.query(
          `INSERT INTO passages (year, text_num, title, content)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (year, text_num) DO UPDATE SET
             title = COALESCE(EXCLUDED.title, passages.title),
             content = EXCLUDED.content,
             updated_at = now()
           RETURNING id, (xmax = 0) AS is_new`,
          [entry.year, entry.text_num, entry.title ?? null, JSON.stringify(content)],
        );

        const passageId = passageRows[0]?.id as string;
        const isNew = passageRows[0]?.is_new as boolean;
        if (isNew) created++;
        else updated++;

        // 5. 批量 Upsert sentence_analyses
        globalIdx = 0;
        const sentenceRows: any[][] = [];
        for (const para of paragraphs) {
          for (const s of para.sentences ?? []) {
            sentenceRows.push([
              passageId,
              globalIdx++,
              s.en,
              s.zh,
              null, // syntax_analysis — 静态语料没有语法分析
            ]);
          }
        }

        // 分批插入（每批最多 100 条）
        const BATCH_SIZE = 100;
        for (let start = 0; start < sentenceRows.length; start += BATCH_SIZE) {
          const batch = sentenceRows.slice(start, start + BATCH_SIZE);
          const params: any[] = [];
          const values: string[] = [];
          let pIdx = 1;

          for (const row of batch) {
            values.push(
              `($${pIdx}, $${pIdx + 1}, $${pIdx + 2}, $${pIdx + 3}, $${pIdx + 4})`,
            );
            params.push(row[0], row[1], row[2], row[3], row[4]);
            pIdx += 5;
          }

          await pool.query(
            `INSERT INTO sentence_analyses (passage_id, sentence_index, original_text, translation, syntax_analysis)
             VALUES ${values.join(", ")}
             ON CONFLICT (passage_id, sentence_index) DO UPDATE SET
               original_text = EXCLUDED.original_text,
               translation = EXCLUDED.translation,
               syntax_analysis = EXCLUDED.syntax_analysis`,
            params,
          );
        }

        totalSentences += sentenceRows.length;
        console.log(`✅ ${isNew ? "新建" : "更新"}，${sentenceRows.length} 句翻译`);
      } catch (err: any) {
        console.log(`❌ ${err.message.slice(0, 100)}`);
        failed++;
      }
    }

    // 6. 统计
    console.log("\n═══════════════════════════════════════════");
    console.log(`  新建文章: ${created}`);
    console.log(`  更新文章: ${updated}`);
    console.log(`  翻译句子: ${totalSentences}`);
    if (failed > 0) console.log(`  失败: ${failed}`);
    console.log("═══════════════════════════════════════════");

    const { rows: stats } = await pool.query(
      `SELECT COUNT(*)::int AS total, COUNT(DISTINCT passage_id)::int AS passages
       FROM sentence_analyses WHERE translation IS NOT NULL`,
    );
    console.log(
      `\n📊 sentence_analyses 表: ${stats[0].total} 条翻译, 覆盖 ${stats[0].passages} 篇文章`,
    );
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error("\n❌ 脚本异常:", err.message);
  process.exit(1);
});
