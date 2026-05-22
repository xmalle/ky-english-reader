const dns = require("dns");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// 修复 Node.js DNS 解析
dns.setServers(["202.118.66.6", "114.114.114.114", "8.8.8.8"]);

const PROJECT_REF = "sgkaybgsuvgjhddmjkct";
const PASSWORD = "QMRQr1Dw2YHmmODE";

// 优先 IPv6 直连，其次尝试 Pooler
const CONFIGS = [
  {
    name: "IPv6 直连",
    host: "2406:da1c:4c7:f800:6ed7:dc9b:6c10:4e8a",
    port: 5432,
    database: "postgres",
    user: "postgres",
    ssl: {
      rejectUnauthorized: false,
      servername: "db.sgkaybgsuvgjhddmjkct.supabase.co",
    },
    family: 6,
  },
  {
    name: "Pooler (ap-southeast-1)",
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    port: 6543,
    database: "postgres",
    user: `postgres.${PROJECT_REF}`,
    ssl: { rejectUnauthorized: false },
  },
];

async function tryExecute(config, sql) {
  const pool = new Pool({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: PASSWORD,
    ssl: config.ssl,
    family: config.family,
    connectionTimeoutMillis: 10000,
  });

  try {
    console.log(`  尝试 ${config.name} (${config.host}:${config.port})...`);
    const client = await pool.connect();
    console.log("  ✅ 已连接！");
    await client.query(sql);
    console.log("  ✅ SQL 执行成功！");
    client.release();
    return true;
  } catch (err) {
    console.log(`  ❌ 失败: ${err.message.split("\n")[0]}`);
    return false;
  } finally {
    await pool.end().catch(() => {});
  }
}

async function main() {
  const sqlPath = path.join(__dirname, "..", "schema-cache.sql");
  const sql = fs.readFileSync(sqlPath, "utf-8");

  console.log("═══════════════════════════════════════════");
  console.log("  KyEnglishReader - 缓存表迁移脚本");
  console.log("  执行文件: schema-cache.sql");
  console.log("═══════════════════════════════════════════\n");

  let ok = false;
  for (const cfg of CONFIGS) {
    ok = await tryExecute(cfg, sql);
    if (ok) break;
    console.log("");
  }

  if (!ok) {
    console.log("❌ 自动连接失败。");
    console.log("\n请手动在 Supabase Dashboard 中执行 schema-cache.sql：");
    console.log(
      "  https://sgkaybgsuvgjhddmjkct.supabase.co/project/default/sql/new"
    );
    process.exit(1);
  }

  // 验证
  const lastCfg = CONFIGS[0]; // Reconnect to verify
  const pool = new Pool({
    host: lastCfg.host,
    port: lastCfg.port,
    database: lastCfg.database,
    user: lastCfg.user,
    password: PASSWORD,
    ssl: lastCfg.ssl,
    family: lastCfg.family,
  });

  try {
    const client = await pool.connect();
    const { rows: tables } = await client.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);
    console.log("\n📋 当前数据库表:", tables.map((t) => t.table_name).join(", "));
    client.release();
  } catch {
    // 验证失败不影响
  }
  await pool.end().catch(() => {});

  console.log("\n✅ 迁移完成！");
}

main();
