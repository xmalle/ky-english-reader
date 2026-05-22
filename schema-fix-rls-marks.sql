-- 修复 user_sentence_marks RLS 策略为单用户模式
-- 在 Supabase SQL Editor 中执行此文件
--
-- 问题：原策略要求 auth.uid() = user_id，
-- 但单用户模式下不登录，auth.uid() 为 null，导致插入/更新被拒绝。

-- 1. 删除旧的 RLS 策略
DROP POLICY IF EXISTS "user_sentence_marks_select_own" ON user_sentence_marks;
DROP POLICY IF EXISTS "user_sentence_marks_insert_own" ON user_sentence_marks;
DROP POLICY IF EXISTS "user_sentence_marks_update_own" ON user_sentence_marks;
DROP POLICY IF EXISTS "user_sentence_marks_delete_own" ON user_sentence_marks;
DROP POLICY IF EXISTS "user_sentence_marks_all_open" ON user_sentence_marks;

-- 2. 创建开放的访问策略（单用户模式）
CREATE POLICY "user_sentence_marks_all_open"
  ON user_sentence_marks FOR ALL
  USING (true)
  WITH CHECK (true);
