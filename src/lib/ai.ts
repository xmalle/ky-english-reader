/**
 * AI 客户端 — 通过 Vercel API 路由代理调用 DeepSeek
 */

export async function chatCompletion(prompt: string, systemPrompt?: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, systemPrompt }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `AI API error: ${res.status}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}

export function isAiConfigured(): boolean {
  return true; // API key 在服务端，前端始终可用
}

const TRANSLATE_PROMPT = `你是考研英语辅导专家。分析英文句子，只返回 JSON（不要 markdown）：

{
  "translation": "中文精翻",
  "grammar": "语法结构简述（30字内）",
  "keywords": ["词1=义", "词2=义", "词3=义"]
}`;

export async function chatTranslation(sentence: string, context?: string) {
  try {
    const userPrompt = context
      ? `上下文：${context}\n\n请分析句子：${sentence}`
      : `请分析句子：${sentence}`;

    const raw = await chatCompletion(userPrompt, TRANSLATE_PROMPT);
    const jsonStr = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    return JSON.parse(jsonStr);
  } catch {
    return { error: "AI 解析失败，请重试" };
  }
}

const VOCAB_PROMPT = `分析英文单词在句子中的含义，只返回 JSON（不要 markdown）：

{
  "word": "原形",
  "basicMeaning": "常见释义",
  "contextMeaning": "句中含义",
  "isAdvanced": true或false
}
isAdvanced 为 true 表示熟词生义（常见词在语境中有特殊含义）。`;

export async function chatVocab(word: string, sentence: string) {
  try {
    const userPrompt = `单词："${word}"\n原文句子："${sentence}"\n\n请分析这个单词在句子中的含义。`;
    const raw = await chatCompletion(userPrompt, VOCAB_PROMPT);
    const jsonStr = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    return JSON.parse(jsonStr);
  } catch {
    return { error: "AI 解析失败，请重试" };
  }
}
