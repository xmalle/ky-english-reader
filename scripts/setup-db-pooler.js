const dns = require("dns");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// 修复 Node.js DNS 解析
dns.setServers(["202.118.66.6", "114.114.114.114", "8.8.8.8"]);

const PROJECT_REF = "sgkaybgsuvgjhddmjkct";
const PASSWORD = "QMRQr1Dw2YHmmODE";

const REGIONS = [
  "us-east-1",
  "us-west-1",
  "ap-southeast-1",
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
  } catch (e) {
    await pool.end();
    return false;
  }
}

async function main() {
  console.log("正在寻找正确的 Supabase 区域...\n");

  for (const region of REGIONS) {
    process.stdout.write(`  ${region}... `);
    try {
      const ok = await tryRegion(region);
      if (ok) {
        console.log("✅ 连接成功！");
        console.log(`\n区域: ${region}`);
        console.log(`连接: aws-0-${region}.pooler.supabase.com:6543`);

        // 执行 schema.sql
        const schemaPath = path.join(__dirname, "..", "schema.sql");
        const sql = fs.readFileSync(schemaPath, "utf-8");

        const host = `aws-0-${region}.pooler.supabase.com`;
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
          console.log("正在执行 schema.sql ...");
          await client.query(sql);
          console.log("✅ 建表成功！");

          const { rows: tables } = await client.query(`
            SELECT table_name FROM information_schema.tables
            WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
            ORDER BY table_name;
          `);
          console.log(
            `\n📋 当前数据库表: ${tables.map((t) => t.table_name).join(", ")}`
          );
        } finally {
          client.release();
          await pool.end();
        }
        return;
      }
      console.log("❌");
    } catch {
      console.log("❌");
    }
  }

  console.log("\n❌ 所有区域均连接失败");
  console.log("请手动在 Supabase Dashboard SQL Editor 中执行 schema.sql");
}

main();
