export interface PassageContent {
  paragraphs: Paragraph[];
  fullText: string;
}

export interface Paragraph {
  index: number;
  sentences: Sentence[];
}

export interface Sentence {
  index: number;
  text: string;
}

export interface Passage {
  id: string;
  year: number;
  text_num: string;
  title: string | null;
  content: PassageContent;
  created_at: string;
  updated_at: string;
}

export interface Vocabulary {
  id: string;
  user_id: string;
  word: string;
  basic_meaning: string;
  context_meaning: string | null;
  source_sentence: string;
  passage_id: string | null;
  created_at: string;
  updated_at: string;
  next_review_date: string;
  interval: number;
  ease_factor: number;
  repetitions: number;
}

export type NewVocabulary = Omit<
  Vocabulary,
  "id" | "user_id" | "created_at" | "updated_at" | "next_review_date" | "interval" | "ease_factor" | "repetitions"
>;

// SM-2 算法评分: 0=完全忘记, 1=记得但困难, 2=记得但犹豫, 3=轻松, 4=太简单, 5=完美
export type Sm2Grade = 0 | 1 | 2 | 3 | 4 | 5;
