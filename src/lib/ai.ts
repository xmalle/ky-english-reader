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
      temperature: 0.3,
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

const TRANSLATE_PROMPT = `你是一位考研英语辅导专家。请分析以下英文句子，返回 JSON（不要 markdown 标记）：

{
  "translation": "精翻译文（中文，贴合考研翻译风格，准确且通顺）",
  "grammar": "语法分析（简洁说明句子结构、从句类型、关键语法点，50字以内）",
  "keywords": ["重点词汇1=释义", "重点词汇2=释义"]
}

注意：结合上下文给出最准确的翻译和理解。`;

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

const VOCAB_PROMPT = `你是一位考研英语辅导专家，擅长讲解"熟词生义"。对于用户提供的单词和语境句子，返回 JSON（不要 markdown 标记）：

{
  "word": "单词原形",
  "basicMeaning": "基础释义（最常见的意思，中文）",
  "contextMeaning": "语境释义（该单词在这句话中的精确含义，中文）",
  "isAdvanced": true或false（是否属于"熟词生义"——即基础意思很简单但在语境中是不同的/生僻的含义）
}

注意：
- "熟词生义"指那些看起来简单但在具体语境下有特殊含义的词
- 基础释义要简洁，语境释义要结合句子
- isAdvanced 为 true 表示值得记录学习`;

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
