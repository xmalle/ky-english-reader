import { createClient } from "@/lib/supabase/client";
import { parsePassageText } from "@/lib/parser";
import { sm2 } from "@/lib/srs";
import { DEFAULT_USER_ID } from "@/lib/constants";
import type { Passage, Vocabulary, SentenceAnalysis, WordContextMeaning, SentenceMark, MarkType, Sm2Grade, Question } from "@/lib/types";

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

// ============================================================
// AI 缓存层：长难句分析
// ============================================================

export async function getCachedSentenceAnalysis(
  passageId: string,
  sentenceIndex: number,
): Promise<SentenceAnalysis | null> {
  const { data, error } = await supabase
    .from("sentence_analyses")
    .select("*")
    .eq("passage_id", passageId)
    .eq("sentence_index", sentenceIndex)
    .single();

  if (error) return null;
  return data as SentenceAnalysis;
}

export async function saveSentenceAnalysis(
  passageId: string,
  sentenceIndex: number,
  originalText: string,
  translation: string,
  syntaxAnalysis: string,
) {
  const { error } = await supabase.from("sentence_analyses").upsert(
    {
      passage_id: passageId,
      sentence_index: sentenceIndex,
      original_text: originalText,
      translation,
      syntax_analysis: syntaxAnalysis,
    },
    { onConflict: "passage_id, sentence_index" },
  );

  if (error) console.error("保存句子分析缓存失败:", error.message);
}

// ============================================================
// AI 缓存层：划词语境释义
// ============================================================

export async function getCachedWordContextMeaning(
  passageId: string,
  sentenceIndex: number,
  word: string,
): Promise<WordContextMeaning | null> {
  const { data, error } = await supabase
    .from("word_context_meanings")
    .select("*")
    .eq("passage_id", passageId)
    .eq("sentence_index", sentenceIndex)
    .eq("word", word.toLowerCase().trim())
    .single();

  if (error) return null;
  return data as WordContextMeaning;
}

export async function saveWordContextMeaning(
  passageId: string,
  sentenceIndex: number,
  word: string,
  basicMeaning: string,
  contextMeaning: string,
) {
  const { error } = await supabase.from("word_context_meanings").upsert(
    {
      passage_id: passageId,
      sentence_index: sentenceIndex,
      word: word.toLowerCase().trim(),
      basic_meaning: basicMeaning,
      context_meaning: contextMeaning,
    },
    { onConflict: "passage_id, sentence_index, word" },
  );

  if (error) console.error("保存划词释义缓存失败:", error.message);
}

// ============================================================
// 句子标记：高亮与下划线
// ============================================================

export async function getSentenceMarks(
  passageId: string,
): Promise<Map<number, MarkType>> {
  const { data, error } = await supabase
    .from("user_sentence_marks")
    .select("sentence_index, mark_type")
    .eq("user_id", DEFAULT_USER_ID)
    .eq("passage_id", passageId);

  if (error || !data) return new Map();

  const map = new Map<number, MarkType>();
  for (const row of data) {
    map.set(row.sentence_index, row.mark_type as MarkType);
  }
  return map;
}

export async function upsertSentenceMark(
  passageId: string,
  sentenceIndex: number,
  markType: MarkType,
) {
  const { error } = await supabase.from("user_sentence_marks").upsert(
    {
      user_id: DEFAULT_USER_ID,
      passage_id: passageId,
      sentence_index: sentenceIndex,
      mark_type: markType,
    },
    { onConflict: "user_id, passage_id, sentence_index" },
  );

  if (error) console.error("保存句子标记失败:", error.message);
}

export async function deleteSentenceMark(
  passageId: string,
  sentenceIndex: number,
) {
  const { error } = await supabase
    .from("user_sentence_marks")
    .delete()
    .eq("user_id", DEFAULT_USER_ID)
    .eq("passage_id", passageId)
    .eq("sentence_index", sentenceIndex);

  if (error) console.error("删除句子标记失败:", error.message);
}

// ============================================================
// 阅读理解题目
// ============================================================

export async function getQuestions(passageId: string): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("passage_id", passageId)
    .order("question_number", { ascending: true });

  if (error || !data) return [];
  return data as Question[];
}
