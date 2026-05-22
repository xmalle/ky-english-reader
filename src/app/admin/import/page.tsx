"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { FileUp, Eye, Send, BookOpen, ArrowLeft } from "lucide-react";
import { parsePassageText } from "@/lib/parser";
import { importPassage } from "@/lib/data";
import type { PassageContent } from "@/lib/types";
import Link from "next/link";

const YEARS = Array.from({ length: 27 }, (_, i) => 2026 - i); // 2026-2000
const TEXT_NUMS = ["Text1", "Text2", "Text3", "Text4"];

export default function ImportPage() {
  const router = useRouter();
  const [year, setYear] = useState("2025");
  const [textNum, setTextNum] = useState("Text1");
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [parsed, setParsed] = useState<PassageContent | null>(null);
  const [loading, setLoading] = useState(false);

  function handleParse() {
    if (!rawText.trim()) {
      toast.error("请先粘贴文章内容");
      return;
    }
    const result = parsePassageText(rawText);
    setParsed(result);
    toast.success(
      `解析完成: ${result.paragraphs.length} 个段落, ${result.paragraphs.flatMap((p) => p.sentences).length} 个句子`
    );
  }

  async function handleImport() {
    if (!parsed) {
      toast.error("请先点击「解析预览」确认内容");
      return;
    }

    setLoading(true);
    const result = await importPassage({
      year: parseInt(year, 10),
      textNum,
      title: title || undefined,
      rawText,
    });
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("导入成功！");
    router.push("/passages");
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
          <FileUp className="size-6" />
          导入真题
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>文章信息</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">年份</Label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}年
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="textNum">Text 编号</Label>
            <select
              id="textNum"
              value={textNum}
              onChange={(e) => setTextNum(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {TEXT_NUMS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">文章标题（可选）</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="如：The Future of Work"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>粘贴真题原文</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="在此粘贴完整的考研英语阅读真题原文...

段落之间用空行分隔，程序会自动按句号、问号、叹号拆分为句子。"
            className="min-h-[300px] font-mono text-sm leading-relaxed"
          />
          <div className="flex gap-3">
            <Button onClick={handleParse} variant="secondary">
              <Eye className="size-4 mr-2" />
              解析预览
            </Button>
            <Button onClick={handleImport} disabled={loading}>
              <Send className="size-4 mr-2" />
              {loading ? "导入中..." : "导入到数据库"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {parsed && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="size-5" />
              解析预览
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">
                {parsed.paragraphs.length} 段落
              </Badge>
              <Badge variant="secondary">
                {parsed.paragraphs.flatMap((p) => p.sentences).length} 句子
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[500px] rounded-md border">
              <div className="p-4 space-y-4">
                {parsed.paragraphs.map((para) => (
                  <div key={para.index} className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      段落 {para.index + 1}
                    </Badge>
                    {para.sentences.map((sentence) => (
                      <p
                        key={sentence.index}
                        className="ml-4 pl-3 border-l-2 border-primary/20 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="text-xs text-primary/60 mr-2">
                          [{sentence.index + 1}]
                        </span>
                        {sentence.text}
                      </p>
                    ))}
                    {para.index < parsed.paragraphs.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
