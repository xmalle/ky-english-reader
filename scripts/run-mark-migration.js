/**
 * 一键执行 schema-mark.sql 迁移
 * 运行: node scripts/run-mark-migration.js
 */
const { Pool } = require("pg");
const fs = require("fs");

const sql = fs.readFileSync("schema-mark.sql", "utf-8");

const configs = [
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
    user: "postgres.sgkaybgsuvgjhddmjkct",
    ssl: { rejectUnauthorized: false },
  },
];

(async () => {
  for (const cfg of configs) {
    console.log("尝试:", cfg.host + ":" + cfg.port);
    const pool = new Pool({
      host: cfg.host,
      port: cfg.port,
      database: "postgres",
      user: cfg.user,
      password: "QMRQr1Dw2YHmmODE",
      ssl: cfg.ssl,
      ...("family" in cfg ? { family: cfg.family } : {}),
      connectionTimeoutMillis: 10000,
    });
    try {
      const client = await pool.connect();
      console.log("已连接");
      await client.query(sql);
      console.log("✅ user_sentence_marks 表创建成功！");
      client.release();
      await pool.end();
      return;
    } catch (err) {
      console.log("失败:", err.message.slice(0, 100));
      await pool.end().catch(() => {});
    }
  }
  console.log("\n❌ 自动连接失败，请手动执行 schema-mark.sql");
  console.log("   打开: https://supabase.com/dashboard/project/sgkaybgsuvgjhddmjkct");
  console.log("   左侧菜单 → SQL Editor → 粘贴 schema-mark.sql 内容 → Run");
})();
