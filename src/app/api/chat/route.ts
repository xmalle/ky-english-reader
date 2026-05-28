import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.AI_BASE_URL ?? "https://api.deepseek.com/v1";
const API_KEY = process.env.AI_API_KEY ?? "";
const MODEL = process.env.AI_MODEL ?? "deepseek-v4-flash";

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: "AI 未配置" }, { status: 500 });
  }

  const { prompt, systemPrompt } = await req.json();

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
    const errText = await res.text();
    console.error("AI API error:", res.status, errText);
    return NextResponse.json({ error: `AI API error: ${res.status}` }, { status: res.status });
  }

  const json = await res.json();
  return NextResponse.json(json);
}
