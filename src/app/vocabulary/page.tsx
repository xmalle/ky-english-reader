"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BookMarked,
  ArrowLeft,
  Calendar,
  Trash2,
  Download,
  Loader2,
  Check,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import {
  getVocabulary,
  getDueVocabulary,
  reviewVocabulary,
  deleteVocabulary,
} from "@/lib/data";
import { sm2 } from "@/lib/srs";
import type { Vocabulary, Sm2Grade } from "@/lib/types";

export default function VocabularyPage() {
  const [allWords, setAllWords] = useState<Vocabulary[]>([]);
  const [dueWords, setDueWords] = useState<Vocabulary[]>([]);
  const [tab, setTab] = useState<"all" | "review">("review");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Record<string, Sm2Grade | null>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [rated, setRated] = useState<Record<string, Sm2Grade | null>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [all, due] = await Promise.all([
      getVocabulary(),
      getDueVocabulary(),
    ]);
    setAllWords(all);
    setDueWords(due);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleReview(vocabId: string, quality: Sm2Grade) {
    const word = allWords.find(v => v.id === vocabId) ?? dueWords.find(v => v.id === vocabId);
    if (!word) return;

    // 乐观更新 UI
    setReviews((prev) => ({ ...prev, [vocabId]: quality }));
    setRated((prev) => ({ ...prev, [vocabId]: quality }));
    setRevealed((prev) => ({ ...prev, [vocabId]: true }));

    // 本地计算新 SRS 数据
    const srs = sm2(quality, word.interval, word.ease_factor, word.repetitions);

    // 更新后的生词对象
    const updated: Vocabulary = {
      ...word,
      interval: srs.interval,
      ease_factor: srs.easeFactor,
      repetitions: srs.repetitions,
      next_review_date: srs.nextReviewDate,
    };

    // 从待复习列表移除，更新全部列表
    setDueWords(prev => prev.filter(v => v.id !== vocabId));
    setAllWords(prev => prev.map(v => v.id === vocabId ? updated : v));

    // 后台同步到服务器
    const result = await reviewVocabulary(vocabId, quality);
    if (result.error) {
      toast.error(result.error);
      // 失败则回滚数据
      const [all, due] = await Promise.all([getVocabulary(), getDueVocabulary()]);
      setAllWords(all);
      setDueWords(due);
    }
  }

  async function handleDelete(vocabId: string) {
    // 乐观移除
    setDueWords(prev => prev.filter(v => v.id !== vocabId));
    setAllWords(prev => prev.filter(v => v.id !== vocabId));
    const result = await deleteVocabulary(vocabId);
    if (result.error) {
      toast.error(result.error);
      const [all, due] = await Promise.all([getVocabulary(), getDueVocabulary()]);
      setAllWords(all);
      setDueWords(due);
    } else {
      toast.success("已删除");
    }
  }

  function handleExportCSV() {
    const headers = "word,basic_meaning,context_meaning,source_sentence,next_review_date,repetitions";
    const rows = allWords.map((v) =>
      [
        `"${v.word}"`,
        `"${v.basic_meaning}"`,
        `"${v.context_meaning ?? ""}"`,
        `"${v.source_sentence.replace(/"/g, '""')}"`,
        v.next_review_date,
        v.repetitions,
      ].join(","),
    );
    const csv = [headers, ...rows].join("\n");
    downloadFile(csv, "kyenglish-vocabulary.csv", "text/csv");
    toast.success("CSV 已导出");
  }

  function handleExportAnki() {
    const lines = allWords.map((v) => {
      const front = `${v.word}<br><br><i>${v.source_sentence}</i>`;
      const back = `${v.basic_meaning}${v.context_meaning ? `<br><br>熟词生义: ${v.context_meaning}` : ""}`;
      return [front, back].map((s) => `"${s.replace(/"/g, '""')}"`).join(",");
    });
    const csv = lines.join("\n");
    downloadFile(csv, "kyenglish-anki-import.csv", "text/csv");
    toast.success("Anki 导入文件已导出（CSV 格式，可直接导入 Anki）");
  }

  const displayWords = tab === "review" ? dueWords : allWords;
  const qualityLabels: { grade: Sm2Grade; label: string; variant: "default" | "secondary" | "outline" | "destructive" }[] = [
    { grade: 0, label: "忘记", variant: "destructive" },
    { grade: 2, label: "模糊", variant: "outline" },
    { grade: 4, label: "认识", variant: "secondary" },
    { grade: 5, label: "简单", variant: "default" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* 导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            返回
          </Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <BookMarked className="size-5" />
            生词本
          </h1>
        </div>
        {/* 导出按钮（移动端收起） */}
        <div className="flex items-center gap-1">
          <Sheet>
            <SheetTrigger render={
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                <Download className="size-4 mr-1.5" />
                导出
              </Button>
            } />
            <SheetContent side="bottom" className="max-h-[40vh]">
              <SheetHeader>
                <SheetTitle>导出生词</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-3 mt-4 pb-4">
                <Button onClick={handleExportCSV} variant="outline" className="justify-start">
                  <Download className="size-4 mr-2" />
                  导出 CSV（Excel 可打开）
                </Button>
                <Button onClick={handleExportAnki} variant="outline" className="justify-start">
                  <BookOpen className="size-4 mr-2" />
                  导出 Anki 格式（CSV 导入 Anki）
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2">
        <Button
          variant={tab === "review" ? "default" : "outline"}
          size="sm"
          onClick={() => setTab("review")}
        >
          <Calendar className="size-4 mr-1.5" />
          待复习
          {dueWords.length > 0 && (
            <Badge variant="secondary" className="ml-1.5 text-xs">
              {dueWords.length}
            </Badge>
          )}
        </Button>
        <Button
          variant={tab === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setTab("all")}
        >
          全部 ({allWords.length})
        </Button>
      </div>

      {/* 导出按钮（移动端） */}
      <div className="flex gap-2 sm:hidden">
        <Button onClick={handleExportCSV} variant="outline" size="sm" className="flex-1">
          <Download className="size-4 mr-1.5" /> CSV
        </Button>
        <Button onClick={handleExportAnki} variant="outline" size="sm" className="flex-1">
          <BookOpen className="size-4 mr-1.5" /> Anki
        </Button>
      </div>

      {/* 生词列表 */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : displayWords.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <BookMarked className="size-12 mx-auto mb-3 opacity-30" />
            <p>{tab === "review" ? "没有待复习的生词" : "生词本为空"}</p>
            <p className="text-sm mt-1">
              {tab === "review"
                ? "去阅读文章，点击生词加入生词本吧"
                : "去阅读文章，选中生词并加入生词本"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {displayWords.map((v) => (
            <Card key={v.id} className="group">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* 单词 */}
                    <h3 className="font-bold text-lg">{v.word}</h3>

                    {/* 释义（复习模式需评分后才显示） */}
                    {tab !== "review" || revealed[v.id] ? (
                      <div className="mt-2 space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">基本释义：</span>
                          {v.basic_meaning}
                        </p>
                        {v.context_meaning && (
                          <p>
                            <span className="text-muted-foreground">语境释义：</span>
                            <span className="text-primary font-medium">
                              {v.context_meaning}
                            </span>
                          </p>
                        )}
                        {rated[v.id] !== undefined && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            {qualityLabels.find(q => q.grade === rated[v.id])?.label}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground italic">
                        评分后显示释义
                      </p>
                    )}

                    {/* 原句（可展开） */}
                    <div className="mt-2">
                      <button
                        onClick={() => setExpanded(prev => ({ ...prev, [v.id]: !prev[v.id] }))}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mb-1"
                      >
                        <BookOpen className="size-3" />
                        真题例句
                        <ChevronDown className={`size-3 transition-transform ${expanded[v.id] ? "rotate-180" : ""}`} />
                      </button>
                      {expanded[v.id] && (
                        <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3 py-1 bg-muted/30 rounded-r-md">
                          {v.source_sentence}
                        </p>
                      )}
                    </div>

                    {/* 复习信息 */}
                    <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
                      <Badge variant="outline">
                        复习 {v.repetitions} 次
                      </Badge>
                      <Badge variant="outline">
                        间隔 {v.interval} 天
                      </Badge>
                      <Badge variant="outline">
                        下次 {v.next_review_date}
                      </Badge>
                    </div>
                  </div>

                  {/* 删除 */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    onClick={() => handleDelete(v.id)}
                  >
                    <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>

                {/* SRS 评分按钮 */}
                {tab === "review" && (
                  <>
                    <Separator className="my-3" />
                    <div className="flex gap-2">
                      {qualityLabels.map(({ grade, label, variant }) => (
                        <Button
                          key={grade}
                          variant={variant}
                          size="sm"
                          className="flex-1"
                          onClick={() => handleReview(v.id, grade)}
                          disabled={reviews[v.id] !== undefined}
                        >
                          {reviews[v.id] === grade ? (
                            <Check className="size-4" />
                          ) : (
                            label
                          )}
                        </Button>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob(["﻿" + content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
