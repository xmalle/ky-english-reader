const SUPABASE_URL = "https://sgkaybgsuvgjhddmjkct.supabase.co";
const ANON_KEY = "sb_publishable_n1JVhD8C3QSfxFCuLNhnbw_cg0dTF1c";

async function rpcExec(sql) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`RPC failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function restQuery(table, select = "*") {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${select}`, {
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
    },
  });
  if (!res.ok) return [];
  return res.json();
}

async function main() {
  console.log("正在通过 REST API 设置 user_sentence_marks 表...\n");

  // 1. 先检查表是否已存在
  const existing = await restQuery("user_sentence_marks", "count");
  if (Array.isArray(existing)) {
    console.log("✅ user_sentence_marks 表已存在，检查 RLS 策略...");
  } else {
    console.log("❌ 无法检查表状态，尝试直接创建...");
  }

  // 2. 尝试创建表（使用 pg_catalog 查询）
  // 由于无法直接执行 DDL，我们通过 Supabase 的 SQL Editor 方式
  // 实际上，如果 schema.sql 之前已经执行过，表应该已经存在
  // 让我们验证表结构和数据

  try {
    const marks = await restQuery("user_sentence_marks", "*");
    console.log(`📋 user_sentence_marks 表存在，当前记录数: ${marks.length}`);

    // 测试插入一条记录
    const testRes = await fetch(`${SUPABASE_URL}/rest/v1/user_sentence_marks`, {
      method: "POST",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        user_id: "00000000-0000-0000-0000-000000000001",
        passage_id: "00000000-0000-0000-0000-000000000000",
        sentence_index: 0,
        mark_type: "highlight-yellow",
      }),
    });

    if (testRes.status === 409) {
      console.log("✅ 表和约束已存在（唯一键冲突，说明表结构正确）");
    } else if (testRes.ok) {
      console.log("✅ 表存在且可以写入数据");
      // 删除测试数据
      await fetch(`${SUPABASE_URL}/rest/v1/user_sentence_marks?id=eq.${(await testRes.json())[0].id}`, {
        method: "DELETE",
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
        },
      });
    } else {
      const text = await testRes.text();
      console.log(`⚠️ 测试写入返回: ${testRes.status} ${text}`);
    }
  } catch (err) {
    console.log("⚠️ 检查表时出错:", err.message);
  }

  console.log("\n📌 说明:");
  console.log("   由于网络限制，无法直接执行 PostgreSQL DDL。");
  console.log("   请按以下步骤在 Supabase Dashboard 中手动执行 SQL:");
  console.log("\n   1. 打开 https://supabase.com/dashboard");
  console.log("   2. 进入你的项目 sgkaybgsuvgjhddmjkct");
  console.log("   3. 左侧菜单点击 'SQL Editor'");
  console.log("   4. 新建查询，粘贴以下 SQL:");
  console.log("\n" + "=".repeat(60));
  console.log(`
-- 创建用户句子标记表（如果不存在）
CREATE TABLE IF NOT EXISTS user_sentence_marks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001',
  passage_id      UUID NOT NULL REFERENCES passages(id) ON DELETE CASCADE,
  sentence_index  SMALLINT NOT NULL,
  mark_type       VARCHAR(30) NOT NULL CHECK (mark_type IN ('highlight-yellow', 'highlight-green', 'underline-red')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, passage_id, sentence_index)
);

CREATE INDEX IF NOT EXISTS idx_user_sentence_marks_lookup
  ON user_sentence_marks(user_id, passage_id);

-- 启用 RLS
ALTER TABLE user_sentence_marks ENABLE ROW LEVEL SECURITY;

-- 删除旧的全开放策略（如果存在）
DROP POLICY IF EXISTS "user_sentence_marks_all_open" ON user_sentence_marks;

-- 创建用户专属策略（只能读写自己的标记）
DROP POLICY IF EXISTS "user_sentence_marks_select_own" ON user_sentence_marks;
DROP POLICY IF EXISTS "user_sentence_marks_insert_own" ON user_sentence_marks;
DROP POLICY IF EXISTS "user_sentence_marks_update_own" ON user_sentence_marks;
DROP POLICY IF EXISTS "user_sentence_marks_delete_own" ON user_sentence_marks;

CREATE POLICY "user_sentence_marks_select_own"
  ON user_sentence_marks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_sentence_marks_insert_own"
  ON user_sentence_marks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_sentence_marks_update_own"
  ON user_sentence_marks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_sentence_marks_delete_own"
  ON user_sentence_marks FOR DELETE
  USING (auth.uid() = user_id);
`);
  console.log("=".repeat(60));
  console.log("\n   5. 点击 'Run' 执行");
  console.log("   6. 执行完成后，标记功能即可正常使用");
}

main().catch((err) => {
  console.error("错误:", err);
  process.exit(1);
});
