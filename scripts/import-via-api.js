const SUPABASE_URL = "https://sgkaybgsuvgjhddmjkct.supabase.co";
const ANON_KEY = "sb_publishable_n1JVhD8C3QSfxFCuLNhnbw_cg0dTF1c";

const { PASSAGES, parsePassageText } = require("./import-passages");

async function main() {
  console.log(`开始通过 REST API 导入 ${PASSAGES.length} 篇文章...\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < PASSAGES.length; i++) {
    const p = PASSAGES[i];
    const content = parsePassageText(p.content);

    if (content.paragraphs.length === 0) {
      console.log(`  ⚠️  [${i + 1}] ${p.year} ${p.text_num}: 解析失败，跳过`);
      failed++;
      continue;
    }

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/passages?on_conflict=year,text_num`, {
        method: "POST",
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          year: p.year,
          text_num: p.text_num,
          title: p.title,
          content: content,
        }),
      });

      if (res.ok) {
        console.log(
          `  ✅ [${i + 1}] ${p.year} ${p.text_num}: ${content.paragraphs.length} 段落, ${content.paragraphs.flatMap((pa) => pa.sentences).length} 句子`
        );
        success++;
      } else {
        const text = await res.text();
        console.log(`  ❌ [${i + 1}] ${p.year} ${p.text_num}: ${res.status} ${text}`);
        failed++;
      }
    } catch (err) {
      console.log(`  ❌ [${i + 1}] ${p.year} ${p.text_num}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n导入完成！成功: ${success}, 失败: ${failed}`);
}

main();
