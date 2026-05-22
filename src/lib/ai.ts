/**
 * OpenAI 兼容格式 AI API 客户端
 * 默认使用 DeepSeek，支持切换任意兼容接口 (Kimi, Qwen 等)
 */

const BASE_URL = process.env.NEXT_PUBLIC_AI_BASE_URL ?? "https://api.deepseek.com/v1";
const API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY ?? "";
const MODEL = process.env.NEXT_PUBLIC_AI_MODEL ?? "deepseek-v4-flash";

export async function chatCompletion(prompt: string, systemPrompt?: string) {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
        { role: "user", content: prompt },
      ],
      temperature: 0,
    }),
  });

  if (!res.ok) {
    throw new Error(`AI API error: ${res.status} ${await res.text()}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}

export function isAiConfigured(): boolean {
  return API_KEY.length > 0;
}

const TRANSLATE_PROMPT = `你是考研英语辅导专家。分析英文句子，只返回 JSON（不要 markdown）：

{
  "translation": "中文精翻",
  "grammar": "语法结构简述（30字内）",
  "keywords": ["词1=义", "词2=义", "词3=义"]
}`;

export async function chatTranslation(sentence: string, context?: string) {
  if (!isAiConfigured()) return { error: "AI 未配置" };

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
  if (!isAiConfigured()) return { error: "AI 未配置" };

  try {
    const userPrompt = `单词："${word}"\n原文句子："${sentence}"\n\n请分析这个单词在句子中的含义。`;
    const raw = await chatCompletion(userPrompt, VOCAB_PROMPT);
    const jsonStr = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    return JSON.parse(jsonStr);
  } catch {
    return { error: "AI 解析失败，请重试" };
  }
}
