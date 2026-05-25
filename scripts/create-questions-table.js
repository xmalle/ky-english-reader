const { Pool } = require("pg");
const dns = require("dns");

dns.setServers(["202.118.66.6", "114.114.114.114", "8.8.8.8"]);

const PROJECT_REF = "sgkaybgsuvgjhddmjkct";
const PASSWORD = "QMRQr1Dw2YHmmODE";

const SQL = `
CREATE TABLE IF NOT EXISTS questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passage_id      UUID NOT NULL REFERENCES passages(id) ON DELETE CASCADE,
  question_number SMALLINT NOT NULL,
  question_text   TEXT NOT NULL,
  option_a        TEXT NOT NULL,
  option_b        TEXT NOT NULL,
  option_c        TEXT NOT NULL,
  option_d        TEXT NOT NULL,
  correct_answer  CHAR(1) CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(passage_id, question_number)
);

CREATE INDEX IF NOT EXISTS idx_questions_passage ON questions(passage_id);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "questions_read_all" ON questions;
DROP POLICY IF EXISTS "questions_insert_admin" ON questions;

CREATE POLICY "questions_read_all" ON questions FOR SELECT USING (true);
CREATE POLICY "questions_insert_admin" ON questions FOR INSERT WITH CHECK (true);
`;

const REGIONS = [
  "ap-southeast-1",
  "us-east-1",
  "us-west-1",
  "ap-northeast-1",
  "eu-west-1",
  "eu-central-1",
  "ap-southeast-2",
  "sa-east-1",
];

async function tryRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  const pool = new Pool({
    host,
    port: 6543,
    database: "postgres",
    user: `postgres.${PROJECT_REF}`,
    password: PASSWORD,
    ssl: { rejectUnauthorized: false },
  });
  try {
    const client = await pool.connect();
    const { rows } = await client.query("SELECT 1 AS ok");
    client.release();
    await pool.end();
    return rows[0].ok === 1;
  } catch {
    await pool.end();
    return false;
  }
}

async function main() {
  console.log("寻找可用区域...\n");
  let connectedRegion = null;

  for (const region of REGIONS) {
    process.stdout.write(`  ${region}... `);
    try {
      const ok = await tryRegion(region);
      if (ok) {
        console.log("✅");
        connectedRegion = region;
        break;
      }
      console.log("❌");
    } catch {
      console.log("❌");
    }
  }

  if (!connectedRegion) {
    console.log("\n❌ 所有区域连接失败");
    console.log("\n请在 Supabase Dashboard SQL Editor 中执行以下 SQL：\n");
    console.log(SQL);
    process.exit(1);
  }

  const host = `aws-0-${connectedRegion}.pooler.supabase.com`;
  const pool = new Pool({
    host,
    port: 6543,
    database: "postgres",
    user: `postgres.${PROJECT_REF}`,
    password: PASSWORD,
    ssl: { rejectUnauthorized: false },
  });

  const client = await pool.connect();
  try {
    console.log("\n执行建表 SQL...\n");
    await client.query(SQL);
    console.log("✅ questions 表创建成功！");

    const { rows: policies } = await client.query(
      "SELECT policyname FROM pg_policies WHERE tablename = 'questions'",
    );
    console.log(`\n🔒 RLS 策略: ${policies.map((p) => p.policyname).join(", ")}`);
  } catch (err) {
    console.error("❌ 建表失败:", err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
