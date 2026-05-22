-- ============================================================
-- KyEnglishReader - AI 缓存层迁移
-- 新增 sentence_analyses 和 word_context_meanings 两张缓存表
-- 在 Supabase SQL Editor 中执行此文件
-- ============================================================

-- ============================================================
-- sentence_analyses: 长难句 AI 分析缓存
-- ============================================================
CREATE TABLE IF NOT EXISTS sentence_analyses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passage_id      UUID NOT NULL REFERENCES passages(id) ON DELETE CASCADE,
  sentence_index  SMALLINT NOT NULL,
  original_text   TEXT NOT NULL,
  translation     TEXT NOT NULL,
  syntax_analysis TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- 每篇文章的每个句子只缓存一份分析结果
  UNIQUE(passage_id, sentence_index)
);

-- 按文章查询缓存时加速
CREATE INDEX IF NOT EXISTS idx_sentence_analyses_lookup
  ON sentence_analyses(passage_id, sentence_index);

-- ============================================================
-- word_context_meanings: 划词语境释义缓存
-- ============================================================
CREATE TABLE IF NOT EXISTS word_context_meanings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passage_id      UUID NOT NULL REFERENCES passages(id) ON DELETE CASCADE,
  sentence_index  SMALLINT NOT NULL,
  word            TEXT NOT NULL,
  basic_meaning   TEXT NOT NULL,
  context_meaning TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- 同一篇文章同一句子中同一单词只缓存一次
  UNIQUE(passage_id, sentence_index, word)
);

-- 按文章+句子+单词查询缓存时加速
CREATE INDEX IF NOT EXISTS idx_word_context_lookup
  ON word_context_meanings(passage_id, sentence_index, word);

-- ============================================================
-- RLS 策略（单用户模式：所有操作开放）
-- ============================================================

ALTER TABLE sentence_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sentence_analyses_all_open"
  ON sentence_analyses FOR ALL
  USING (true)
  WITH CHECK (true);

ALTER TABLE word_context_meanings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "word_context_meanings_all_open"
  ON word_context_meanings FOR ALL
  USING (true)
  WITH CHECK (true);
