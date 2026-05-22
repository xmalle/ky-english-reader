-- 单用户模式迁移：移除词汇表认证限制
-- 因为这是单人使用的本地工具，不启用登录

-- 1. 删除旧的 RLS 策略
DROP POLICY IF EXISTS "vocabulary_select_own" ON vocabulary;
DROP POLICY IF EXISTS "vocabulary_insert_own" ON vocabulary;
DROP POLICY IF EXISTS "vocabulary_update_own" ON vocabulary;
DROP POLICY IF EXISTS "vocabulary_delete_own" ON vocabulary;

-- 2. 创建新的开放策略（单用户模式）
CREATE POLICY "vocabulary_all_open"
  ON vocabulary FOR ALL
  USING (true)
  WITH CHECK (true);

-- 3. passages 插入也开放
DROP POLICY IF EXISTS "passages_insert_admin" ON passages;

CREATE POLICY "passages_insert_open"
  ON passages FOR INSERT
  WITH CHECK (true);
