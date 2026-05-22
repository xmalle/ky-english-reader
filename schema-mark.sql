-- ============================================================
-- user_sentence_marks: 用户句子级高亮/下划线标记
-- 在 Supabase SQL Editor 中执行此文件
-- ============================================================
CREATE TABLE IF NOT EXISTS user_sentence_marks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001',
  passage_id      UUID NOT NULL REFERENCES passages(id) ON DELETE CASCADE,
  sentence_index  SMALLINT NOT NULL,
  mark_type       VARCHAR(30) NOT NULL CHECK (mark_type IN ('highlight-yellow', 'highlight-green', 'underline-red')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(user_id, passage_id, sentence_index)
);

CREATE INDEX IF NOT EXISTS idx_user_sentence_marks_lookup
  ON user_sentence_marks(user_id, passage_id);

-- RLS：单用户模式开放访问
ALTER TABLE user_sentence_marks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_sentence_marks_all_open"
  ON user_sentence_marks FOR ALL
  USING (true)
  WITH CHECK (true);
