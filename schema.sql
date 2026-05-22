-- KyEnglishReader 数据库 Schema
-- 在 Supabase SQL Editor 中执行此文件

-- ============================================================
-- passages: 历年考研英语阅读真题
-- ============================================================
CREATE TABLE IF NOT EXISTS passages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year        SMALLINT NOT NULL,
  text_num    VARCHAR(10) NOT NULL,           -- 如 'Text1', 'Text2', 'Text3', 'Text4'
  title       TEXT,                            -- 文章标题
  content     JSONB NOT NULL,                  -- 结构化文章内容
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- 每年 4 篇文章（英语一），每篇文章的 text_num 唯一
  UNIQUE(year, text_num)
);

-- content JSONB 结构示例:
-- {
--   "paragraphs": [
--     {
--       "index": 0,
--       "sentences": [
--         {
--           "index": 0,
--           "text": "Everybody loves a fat pay rise.",
--           "startOffset": 0,
--           "endOffset": 31
--         },
--         {
--           "index": 1,
--           "text": "Yet pleasure at your own can vanish if you learn that a colleague...",
--           "startOffset": 32,
--           "endOffset": 100
--         }
--       ]
--     },
--     {
--       "index": 1,
--       "sentences": [...]
--     }
--   ],
--   "fullText": "Everybody loves a fat pay rise. Yet pleasure..."
-- }

-- ============================================================
-- vocabulary: 用户生词本（含 SRS 间隔重复字段）
-- ============================================================
CREATE TABLE IF NOT EXISTS vocabulary (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word              TEXT NOT NULL,
  basic_meaning     TEXT NOT NULL,              -- 基本释义
  context_meaning   TEXT,                       -- 熟词生义（语境中的特殊含义）
  source_sentence   TEXT NOT NULL,              -- 原文句子
  passage_id        UUID REFERENCES passages(id) ON DELETE SET NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- SM-2 间隔重复字段
  next_review_date  DATE NOT NULL DEFAULT CURRENT_DATE,
  interval          SMALLINT NOT NULL DEFAULT 0,    -- 当前间隔（天）
  ease_factor       REAL NOT NULL DEFAULT 2.5,       -- 难度系数（默认 2.5）
  repetitions       SMALLINT NOT NULL DEFAULT 0,     -- 复习次数

  -- 每个用户每个生词只记录一次
  UNIQUE(user_id, word)
);

-- 为复习查询加速
CREATE INDEX IF NOT EXISTS idx_vocabulary_review
  ON vocabulary(user_id, next_review_date);

-- 为按文章查询生词加速
CREATE INDEX IF NOT EXISTS idx_vocabulary_passage
  ON vocabulary(passage_id);

-- ============================================================
-- RLS (Row Level Security) 策略
-- ============================================================

-- passages: 任何人可读，仅管理员可写
ALTER TABLE passages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "passages_read_all"
  ON passages FOR SELECT
  USING (true);

CREATE POLICY "passages_insert_admin"
  ON passages FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- vocabulary: 用户只能操作自己的生词
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vocabulary_select_own"
  ON vocabulary FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "vocabulary_insert_own"
  ON vocabulary FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "vocabulary_update_own"
  ON vocabulary FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "vocabulary_delete_own"
  ON vocabulary FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- 触发器：自动更新 updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER passages_updated_at
  BEFORE UPDATE ON passages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER vocabulary_updated_at
  BEFORE UPDATE ON vocabulary
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
