// 通过 Supabase HTTP API + pg 直连池化器 尝试建表
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://sgkaybgsuvgjhddmjkct.supabase.co";
const ANON_KEY = "sb_publishable_n1JVhD8C3QSfxFCuLNhnbw_cg0dTF1c";

// 方案：用 Supabase REST API 调用 Postgres 内置函数
// 先尝试通过 HTTP API 看看能否执行 SQL

async function tryHttpApi() {
  const schemaPath = path.join(__dirname, "..", "schema.sql");
  const sqlContent = fs.readFileSync(schemaPath, "utf-8");

  // 将 SQL 拆分为单独语句
  const statements = sqlContent
    .replace(/--.*$/gm, "") // 去掉注释
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`共 ${statements.length} 条 SQL 语句\n`);

  // 使用 fetch 通过 Supabase REST API 执行
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    const preview = stmt.substring(0, 60).replace(/\n/g, " ");
    console.log(`[${i + 1}/${statements.length}] ${preview}...`);

    try {
      // 尝试用 Management API 的 SQL 端点
      const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        method: "POST",
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ query: stmt }),
      });
      console.log(`  状态: ${res.status}`);
    } catch (e) {
      console.log(`  错误: ${e.message}`);
    }
  }
}

tryHttpApi().catch(console.error);
