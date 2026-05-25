"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Database, Play } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { QUESTIONS_DATA } from "@/lib/questions-data";

export default function SetupQuestionsPage() {
  const [step1Status, setStep1Status] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [step2Status, setStep2Status] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [importProgress, setImportProgress] = useState("");
  const [importCount, setImportCount] = useState({ success: 0, failed: 0, skipped: 0 });

  async function handleCreateTable() {
    setStep1Status("loading");
    const supabase = createClient();

    try {
      const { error } = await supabase.rpc("exec_sql", {
        sql: "SELECT 1",
      });

      if (error) {
        throw error;
      }
    } catch {
      // RPC not available, try direct check
    }

    // Check if table exists by trying to select
    const { error: checkError } = await supabase
      .from("questions")
      .select("id")
      .limit(1);

    if (!checkError) {
      setStep1Status("done");
      toast.success("questions 表已存在");
      return;
    }

    toast.error("questions 表不存在，请在 Supabase SQL Editor 中执行建表 SQL（见下方说明）");
    setStep1Status("error");
  }

  async function handleImportQuestions() {
    setStep2Status("loading");
    setImportProgress("正在获取文章映射...");
    const supabase = createClient();

    const { data: passages, error: pError } = await supabase
      .from("passages")
      .select("id, year, text_num");

    if (pError || !passages) {
      toast.error("获取文章列表失败");
      setStep2Status("error");
      return;
    }

    const passageMap = new Map<string, string>();
    for (const p of passages) {
      passageMap.set(`${p.year}_${p.text_num}`, p.id);
    }

    setImportProgress(`已获取 ${passages.length} 篇文章，开始导入题目...`);

    let success = 0;
    let failed = 0;
    let skipped = 0;

    for (let i = 0; i < QUESTIONS_DATA.length; i++) {
      const q = QUESTIONS_DATA[i];
      const key = `${q.year}_${q.text_num}`;
      const passageId = passageMap.get(key);

      if (!passageId) {
        skipped++;
        continue;
      }

      const { error } = await supabase
        .from("questions")
        .upsert(
          {
            passage_id: passageId,
            question_number: q.question_number,
            question_text: q.question_text,
            option_a: q.option_a,
            option_b: q.option_b,
            option_c: q.option_c,
            option_d: q.option_d,
            correct_answer: q.correct_answer,
          },
          { onConflict: "passage_id,question_number" },
        );

      if (error) {
        failed++;
        setImportProgress(`❌ ${q.year} ${q.text_num} Q${q.question_number}: ${error.message}`);
      } else {
        success++;
        if (success % 20 === 0) {
          setImportProgress(`已导入 ${success}/${QUESTIONS_DATA.length} 题...`);
        }
      }
    }

    setImportCount({ success, failed, skipped });
    setStep2Status("done");
    setImportProgress(`导入完成！成功: ${success}, 失败: ${failed}, 跳过: ${skipped}`);
    toast.success(`成功导入 ${success} 道题目`);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          返回首页
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Database className="size-6" />
          题目管理
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>第 1 步：创建 questions 表</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            如果 questions 表尚未创建，请先在 Supabase Dashboard 的 SQL Editor 中执行以下 SQL：
          </p>
          <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`CREATE TABLE IF NOT EXISTS questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passage_id      UUID NOT NULL REFERENCES passages(id) ON DELETE CASCADE,
  question_number SMALLINT NOT NULL,
  question_text   TEXT NOT NULL,
  option_a        TEXT NOT NULL,
  option_b        TEXT NOT NULL,
  option_c        TEXT NOT NULL,
  option_d        TEXT NOT NULL,
  correct_answer  CHAR(1) CHECK (correct_answer IN ('A','B','C','D')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(passage_id, question_number)
);

CREATE INDEX IF NOT EXISTS idx_questions_passage ON questions(passage_id);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "questions_read_all" ON questions FOR SELECT USING (true);
CREATE POLICY "questions_insert_admin" ON questions FOR INSERT WITH CHECK (true);`}
          </pre>
          <Button onClick={handleCreateTable} disabled={step1Status === "loading"}>
            <Play className="size-4 mr-2" />
            {step1Status === "loading" ? "检查中..." : "检查表是否存在"}
          </Button>
          {step1Status === "done" && (
            <p className="text-sm text-green-600">✅ questions 表已存在</p>
          )}
          {step1Status === "error" && (
            <p className="text-sm text-red-600">❌ questions 表不存在，请先执行上方 SQL</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>第 2 步：导入题目数据</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            将 {QUESTIONS_DATA.length} 道考研英语一阅读理解题目导入数据库。
          </p>
          <Button
            onClick={handleImportQuestions}
            disabled={step2Status === "loading" || step1Status !== "done"}
          >
            <Play className="size-4 mr-2" />
            {step2Status === "loading" ? "导入中..." : "开始导入"}
          </Button>
          {importProgress && (
            <p className="text-sm text-muted-foreground">{importProgress}</p>
          )}
          {step2Status === "done" && (
            <div className="text-sm space-y-1">
              <p className="text-green-600">✅ 成功: {importCount.success}</p>
              {importCount.failed > 0 && (
                <p className="text-red-600">❌ 失败: {importCount.failed}</p>
              )}
              {importCount.skipped > 0 && (
                <p className="text-yellow-600">⚠️ 跳过: {importCount.skipped}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
