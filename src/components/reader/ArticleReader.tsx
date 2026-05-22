"use client";

import { useState, useCallback, useRef } from "react";
import { Loader2, Languages, GitBranch, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { WordPopover } from "./WordPopover";
import { MobileSheet } from "./MobileSheet";
import { chatTranslation } from "@/lib/ai";
import type { Passage, PassageContent } from "@/lib/types";

interface TranslateResult {
  translation?: string;
  grammar?: string;
  keywords?: string[];
  error?: string;
}

export function ArticleReader({ passage }: { passage: Passage }) {
  const content = passage.content as PassageContent;
  const allSentences = content.paragraphs.flatMap((p) => p.sentences);

  const [selectedSentence, setSelectedSentence] = useState<{
    index: number;
    text: string;
  } | null>(null);
  const [analysis, setAnalysis] = useState<TranslateResult | null>(null);
  const [loading, setLoading] = useState(false);

  // 划词状态
  const [selection, setSelection] = useState<{
    word: string;
    sentence: string;
    rect: DOMRect;
  } | null>(null);

  // 全局句索引用 Ref 持久化
  const sentenceMap = useRef<Map<Element, number>>(new Map());
  const articleRef = useRef<HTMLDivElement>(null);

  const handleSentenceClick = useCallback(
    async (index: number, text: string) => {
      setSelectedSentence({ index, text });
      setLoading(true);
      setAnalysis(null);

      try {
        // 传上下文：前后各一句
        const prev = allSentences[index - 1]?.text ?? "";
        const next = allSentences[index + 1]?.text ?? "";
        const context = [prev, next].filter(Boolean).join(" ");

        const data = await chatTranslation(text, context);
        if (data.error) {
          toast.error(data.error);
          return;
        }
        setAnalysis(data);
      } catch {
        toast.error("请求失败，请检查网络");
      } finally {
        setLoading(false);
      }
    },
    [allSentences],
  );

  const handleTextSelection = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) {
      setSelection(null);
      return;
    }

    const word = sel.toString().trim();
    // 只处理单个单词或短语
    if (word.split(/\s+/).length > 3) return;

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // 获取选中词所在的句子
    const sentenceEl = range.startContainer.parentElement?.closest(
      "[data-sentence]",
    );
    const sentence = sentenceEl?.textContent ?? "";

    setSelection({ word, sentence, rect });
  }, []);

  return (
    <div className="flex flex-1 overflow-hidden relative">
      {/* ========== 左侧：文章阅读区 ========== */}
      <div className="flex-1 flex flex-col min-w-0 border-r">
        <ScrollArea className="flex-1">
          <article ref={articleRef} className="px-6 py-8 max-w-3xl mx-auto">
            {/* 标题 */}
            {passage.title && (
              <h2 className="text-xl font-bold mb-6">{passage.title}</h2>
            )}

            {/* 段落渲染 */}
            {content.paragraphs.map((para) => (
              <div key={para.index} className="mb-6">
                <div className="space-y-1.5">
                  {para.sentences.map((sentence) => {
                    const globalIdx =
                      content.paragraphs
                        .slice(0, para.index)
                        .flatMap((p) => p.sentences).length + sentence.index;

                    return (
                      <span
                        key={`${para.index}-${sentence.index}`}
                        data-sentence
                        data-sentence-index={globalIdx}
                        ref={(el) => {
                          if (el) sentenceMap.current.set(el, globalIdx);
                        }}
                        onClick={() =>
                          handleSentenceClick(globalIdx, sentence.text)
                        }
                        onMouseUp={handleTextSelection}
                        className={`inline-block cursor-pointer px-1.5 py-0.5 rounded-md transition-colors leading-7 text-[15px] select-text
                          ${
                            selectedSentence?.index === globalIdx
                              ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                              : "hover:bg-muted/60 text-foreground"
                          }`}
                      >
                        {sentence.text}{" "}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </article>
        </ScrollArea>
      </div>

      {/* ========== 右侧：解析面板（桌面端） ========== */}
      <aside className="hidden lg:flex w-[380px] shrink-0 flex-col bg-card/50">
        <div className="px-5 py-4 border-b">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Languages className="size-4" />
            精读解析
          </h3>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-5">
            {loading ? (
              <div className="flex items-center gap-3 text-muted-foreground py-12 justify-center">
                <Loader2 className="size-5 animate-spin" />
                <span className="text-sm">AI 正在分析...</span>
              </div>
            ) : analysis ? (
              <AnalysisContent analysis={analysis} sentence={selectedSentence} />
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="size-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">点击左侧任意句子</p>
                <p className="text-xs mt-1">查看精翻译文和语法分析</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </aside>

      {/* ========== 划词气泡 ========== */}
      {selection && (
        <WordPopover
          word={selection.word}
          sentence={selection.sentence}
          rect={selection.rect}
          passageId={passage.id}
          onClose={() => setSelection(null)}
        />
      )}

      {/* ========== 移动端底部抽屉 ========== */}
      <MobileSheet
        open={!!selectedSentence && !!analysis}
        onClose={() => setSelectedSentence(null)}
        loading={loading}
        analysis={analysis}
        sentence={selectedSentence}
      />
    </div>
  );
}

function AnalysisContent({
  analysis,
  sentence,
}: {
  analysis: TranslateResult;
  sentence: { index: number; text: string } | null;
}) {
  return (
    <div className="space-y-5">
      {/* 原文 */}
      <div>
        <div className="text-xs text-muted-foreground mb-1.5 font-medium flex items-center gap-1.5">
          <BookOpen className="size-3" />
          原句
        </div>
        <p className="text-sm leading-relaxed text-foreground font-medium">
          {sentence?.text}
        </p>
      </div>

      <Separator />

      {/* 精翻 */}
      <div>
        <div className="text-xs text-muted-foreground mb-1.5 font-medium flex items-center gap-1.5">
          <Languages className="size-3" />
          精翻译文
        </div>
        <p className="text-sm leading-relaxed">
          {analysis.translation}
        </p>
      </div>

      {/* 语法 */}
      {analysis.grammar && (
        <>
          <Separator />
          <div>
            <div className="text-xs text-muted-foreground mb-1.5 font-medium flex items-center gap-1.5">
              <GitBranch className="size-3" />
              语法分析
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {analysis.grammar}
            </p>
          </div>
        </>
      )}

      {/* 关键词 */}
      {analysis.keywords && analysis.keywords.length > 0 && (
        <>
          <Separator />
          <div>
            <div className="text-xs text-muted-foreground mb-2 font-medium">
              重点词汇
            </div>
            <div className="flex flex-wrap gap-1.5">
              {analysis.keywords.map((kw, i) => {
                const [word, meaning] = kw.split("=");
                return (
                  <Badge key={i} variant="secondary" className="text-xs">
                    <span className="font-medium">{word}</span>
                    <span className="mx-1.5 text-border">|</span>
                    <span className="text-muted-foreground">{meaning}</span>
                  </Badge>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
