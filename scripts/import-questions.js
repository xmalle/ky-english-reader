const SUPABASE_URL = "https://sgkaybgsuvgjhddmjkct.supabase.co";
const ANON_KEY = "sb_publishable_n1JVhD8C3QSfxFCuLNhnbw_cg0dTF1c";

const QUESTIONS = [
  // { year: 2024, text_num: "Text1", question_number: 21, question_text: "...", option_a: "...", option_b: "...", option_c: "...", option_d: "...", correct_answer: "D" },
];

async function fetchPassages() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/passages?select=id,year,text_num`, {
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`获取 passages 失败: ${res.status} ${text}`);
  }

  return await res.json();
}

function buildPassageMap(passages) {
  const map = new Map();
  for (const p of passages) {
    const key = `${p.year}_${p.text_num}`;
    map.set(key, p.id);
  }
  return map;
}

async function upsertQuestion(question, passageId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/questions?on_conflict=passage_id,question_number`,
    {
      method: "POST",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        passage_id: passageId,
        question_number: question.question_number,
        question_text: question.question_text,
        option_a: question.option_a,
        option_b: question.option_b,
        option_c: question.option_c,
        option_d: question.option_d,
        correct_answer: question.correct_answer,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${text}`);
  }
}

async function main() {
  if (QUESTIONS.length === 0) {
    console.log("QUESTIONS 数据为空，请先填充题目数据。");
    return;
  }

  console.log("正在获取 passages 映射...");
  const passages = await fetchPassages();
  const passageMap = buildPassageMap(passages);
  console.log(`已获取 ${passages.length} 篇文章\n`);

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < QUESTIONS.length; i++) {
    const q = QUESTIONS[i];
    const key = `${q.year}_${q.text_num}`;
    const passageId = passageMap.get(key);

    if (!passageId) {
      console.log(`  ⚠️  [${i + 1}] ${q.year} ${q.text_num} Q${q.question_number}: 未找到对应 passage，跳过`);
      skipped++;
      continue;
    }

    try {
      await upsertQuestion(q, passageId);
      console.log(`  ✅ [${i + 1}] ${q.year} ${q.text_num} Q${q.question_number}`);
      success++;
    } catch (err) {
      console.log(`  ❌ [${i + 1}] ${q.year} ${q.text_num} Q${q.question_number}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n导入完成！成功: ${success}, 失败: ${failed}, 跳过: ${skipped}`);
}

main();
