const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Supabase DB IPv6 直连（绕过 DNS 解析问题）
const HOST = "2406:da1c:4c7:f800:6ed7:dc9b:6c10:4e8a";
const PASSWORD = "QMRQr1Dw2YHmmODE";

async function main() {
  const pool = new Pool({
    host: HOST,
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: PASSWORD,
    ssl: {
      rejectUnauthorized: false,
      servername: "db.sgkaybgsuvgjhddmjkct.supabase.co",
    },
    family: 6,
  });

  const schemaPath = path.join(__dirname, "..", "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf-8");

  console.log("正在连接 Supabase 数据库...");
  const client = await pool.connect();

  try {
    console.log("已连接，开始执行 schema.sql ...\n");
    await client.query(sql);
    console.log("✅ 建表成功！");
    console.log("   - passages 表已创建");
    console.log("   - vocabulary 表已创建");
    console.log("   - RLS 策略已启用");
    console.log("   - 触发器已创建");

    // 验证
    const { rows: tables } = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);
    console.log("\n📋 当前数据库表:", tables.map((t) => t.table_name).join(", "));
  } catch (err) {
    console.error("❌ 执行失败:", err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
