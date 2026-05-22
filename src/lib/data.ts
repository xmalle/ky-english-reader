import { createClient } from "@/lib/supabase/client";
import { parsePassageText } from "@/lib/parser";
import { sm2 } from "@/lib/srs";
import { DEFAULT_USER_ID } from "@/lib/constants";
import type { Passage, Vocabulary, Sm2Grade } from "@/lib/types";

const supabase = createClient();

export async function importPassage(data: {
  year: number;
  textNum: string;
  title?: string;
  rawText: string;
}) {
  const { year, textNum, title, rawText } = data;

  if (!year || !textNum || !rawText) {
    return { error: "请填写年份、Text 编号和文章内容" };
  }

  const content = parsePassageText(rawText);

  if (content.paragraphs.length === 0) {
    return { error: "未能解析出有效段落，请检查文章格式" };
  }

  const { data: row, error } = await supabase
    .from("passages")
    .insert({
      year,
      text_num: textNum,
      title: title || null,
      content,
    })
    .select()
    .single();

  if (error) {
    return { error: `导入失败: ${error.message}` };
  }

  return { success: true, passage: row as Passage };
}

export async function getPassages() {
  const { data, error } = await supabase
    .from("passages")
    .select("*")
    .order("year", { ascending: false })
    .order("text_num", { ascending: true });

  if (error) return [];
  return data as Passage[];
}

export async function getPassageById(id: string) {
  const { data, error } = await supabase
    .from("passages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Passage;
}

export async function getVocabulary(): Promise<Vocabulary[]> {
  const { data, error } = await supabase
    .from("vocabulary")
    .select("*")
    .eq("user_id", DEFAULT_USER_ID)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data as Vocabulary[];
}

export async function getDueVocabulary(): Promise<Vocabulary[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("vocabulary")
    .select("*")
    .eq("user_id", DEFAULT_USER_ID)
    .lte("next_review_date", today)
    .order("next_review_date", { ascending: true });

  if (error) return [];
  return data as Vocabulary[];
}

export async function reviewVocabulary(vocabId: string, quality: Sm2Grade) {
  const { data: item, error: fetchErr } = await supabase
    .from("vocabulary")
    .select("*")
    .eq("id", vocabId)
    .single();

  if (fetchErr || !item) return { error: "生词不存在" };

  const result = sm2(
    quality,
    item.interval,
    item.ease_factor,
    item.repetitions,
  );

  const { error } = await supabase
    .from("vocabulary")
    .update({
      interval: result.interval,
      ease_factor: result.easeFactor,
      repetitions: result.repetitions,
      next_review_date: result.nextReviewDate,
    })
    .eq("id", vocabId);

  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteVocabulary(vocabId: string) {
  const { error } = await supabase
    .from("vocabulary")
    .delete()
    .eq("id", vocabId);

  if (error) return { error: error.message };
  return { success: true };
}

export async function addVocabulary(data: {
  word: string;
  basicMeaning: string;
  contextMeaning?: string;
  sourceSentence: string;
  passageId?: string;
}) {
  const { word, basicMeaning, contextMeaning, sourceSentence, passageId } = data;

  if (!word || !basicMeaning || !sourceSentence) {
    return { error: "缺少必要字段" };
  }

  const { data: row, error } = await supabase
    .from("vocabulary")
    .upsert(
      {
        user_id: DEFAULT_USER_ID,
        word: word.toLowerCase().trim(),
        basic_meaning: basicMeaning,
        context_meaning: contextMeaning || null,
        source_sentence: sourceSentence,
        passage_id: passageId || null,
      },
      { onConflict: "user_id, word" },
    )
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, data: row };
}
