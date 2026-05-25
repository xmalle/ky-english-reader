"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Languages, GitBranch, BookOpen, Pointer, ClipboardList, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { WordPopover } from "./WordPopover";
import { MobileSheet } from "./MobileSheet";
import { MarkToolbar, MARK_STYLES } from "./MarkToolbar";
import { QuestionsPanel } from "./QuestionsPanel";
import { chatTranslation } from "@/lib/ai";
import {
  getCachedSentenceAnalysis,
  saveSentenceAnalysis,
  getSentenceMarks,
  upsertSentenceMark,
  deleteSentenceMark,
} from "@/lib/data";
import type { Passage, PassageContent, MarkType } from "@/lib/types";

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
    sentenceIndex: number;
    rect: DOMRect;
  } | null>(null);

  // 移动端点词模式
  const [wordTapMode, setWordTapMode] = useState(false);

  // 全局句索引用 Ref 持久化
  const sentenceMap = useRef<Map<Element, number>>(new Map());
  const articleRef = useRef<HTMLDivElement>(null);
  const wordTapRef = useRef(false); // 标记是否由点词触发

  // 句子标记状态：sentence_index → mark_type
  const [marks, setMarks] = useState<Map<number, MarkType>>(new Map());

  // 右侧面板标签页
  const [rightTab, setRightTab] = useState<"analysis" | "questions">("analysis");

  // 移动端题目面板
  const [mobileQuestionsOpen, setMobileQuestionsOpen] = useState(false);

  // 加载当前文章的标记
  useEffect(() => {
    getSentenceMarks(passage.id).then(setMarks);
  }, [passage.id]);

  // 乐观标记句子
  const handleMark = useCallback(
    (sentenceIndex: number, markType: MarkType) => {
      setMarks((prev) => new Map(prev).set(sentenceIndex, markType));
      upsertSentenceMark(passage.id, sentenceIndex, markType).catch(() => {});
    },
    [passage.id],
  );

  // 乐观清除标记
  const handleClearMark = useCallback(
    (sentenceIndex: number) => {
      setMarks((prev) => {
        const next = new Map(prev);
        next.delete(sentenceIndex);
        return next;
      });
      deleteSentenceMark(passage.id, sentenceIndex).catch(() => {});
    },
    [passage.id],
  );

  const handleSentenceClick = useCallback(
    async (index: number, text: string) => {
      setSelectedSentence({ index, text });
      setLoading(true);
      setAnalysis(null);

      // 1. 先查缓存
      const cached = await getCachedSentenceAnalysis(passage.id, index);
      if (cached) {
        setAnalysis({
          translation: cached.translation,
          grammar: cached.syntax_analysis ?? undefined,
        });
        setLoading(false);
        return;
      }

      // 2. 缓存未命中，调用 AI
      try {
        const prev = allSentences[index - 1]?.text ?? "";
        const next = allSentences[index + 1]?.text ?? "";
        const context = [prev, next].filter(Boolean).join(" ");

        const data = await chatTranslation(text, context);
        if (data.error) {
          toast.error(data.error);
          return;
        }
        setAnalysis(data);

        // 3. 异步存入缓存（不阻塞 UI）
        saveSentenceAnalysis(
          passage.id,
          index,
          text,
          data.translation ?? "",
          data.grammar ?? "",
        ).catch(() => {});
      } catch {
        toast.error("请求失败，请检查网络");
      } finally {
        setLoading(false);
      }
    },
    [allSentences, passage.id],
  );

  // 使用 selectionchange 事件监听划词（同时支持桌面和移动端）
  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout>;

    function handleSelectionChange() {
      // 点词模式下由 handleWordTap 控制弹窗，不响应 selectionchange
      if (wordTapRef.current) {
        wordTapRef.current = false;
        return;
      }
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !sel.toString().trim()) {
          setSelection(null);
          return;
        }

        // 检查选区是否在文章区域内
        if (!articleRef.current) return;
        const range = sel.getRangeAt(0);
        if (!articleRef.current.contains(range.commonAncestorContainer)) return;

        const word = sel.toString().trim();
        if (word.split(/\s+/).length > 3) return;

        const rect = range.getBoundingClientRect();
        const sentenceEl = range.startContainer.parentElement?.closest(
          "[data-sentence]",
        );
        const sentence = sentenceEl?.textContent ?? "";
        const sentenceIndex = sentenceEl
          ? Number(sentenceEl.getAttribute("data-sentence-index"))
          : -1;

        setSelection({ word, sentence, sentenceIndex, rect });
      }, 200);
    }

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      clearTimeout(debounceTimer);
    };
  }, []);

  const mobilePanelOpen = !!selectedSentence && (!!analysis || loading);

  // 移动端点词查义
  const handleWordTap = useCallback((e: React.MouseEvent, word: string, sentenceText: string, sentenceIdx: number) => {
    if (!wordTapMode) return;
    e.stopPropagation();
    e.preventDefault();
    wordTapRef.current = true;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setSelection({ word, sentence: sentenceText, sentenceIndex: sentenceIdx, rect });
  }, [wordTapMode]);

  // 拆分句子为单词（保持标点附着）
  function splitWords(text: string): string[] {
    return text.match(/[\w']+[.,;:!?"']*|\s+|[^\w\s]+/g)?.filter(w => w.trim()) ?? [text];
  }

  return (
    <div className="flex flex-1 overflow-hidden relative min-h-0">
      {/* ========== 左侧：文章阅读区 ========== */}
      <div className="flex-1 flex flex-col min-w-0 border-r min-h-0">
        {/* 移动端点词模式按钮 */}
        <div className="lg:hidden flex items-center gap-2 px-4 py-2 border-b shrink-0 bg-muted/30">
          <button
            onClick={() => setWordTapMode(!wordTapMode)}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
              wordTapMode
                ? "bg-primary text-primary-foreground"
                : "bg-background border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Pointer className="size-3.5" />
            {wordTapMode ? "点词模式开" : "点词查义"}
          </button>
          {wordTapMode && (
            <span className="text-xs text-muted-foreground">点击句中单词即可查义</span>
          )}
          <button
            onClick={() => setMobileQuestionsOpen(!mobileQuestionsOpen)}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ml-auto ${
              mobileQuestionsOpen
                ? "bg-primary text-primary-foreground"
                : "bg-background border text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardList className="size-3.5" />
            题目
          </button>
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <article
            ref={articleRef}
            className={`px-6 py-8 max-w-3xl mx-auto ${
              mobilePanelOpen ? "pb-[48vh]" : ""
            }`}
          >
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

                    const markType = marks.get(globalIdx);
                    const markClass = markType ? MARK_STYLES[markType] : "";
                    const isSelected = selectedSentence?.index === globalIdx;

                    const words = splitWords(sentence.text);

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
                        className={`inline-block cursor-pointer px-1.5 py-0.5 rounded-md transition-colors leading-7 text-[15px] select-text touch-pan-y
                          ${markClass}
                          ${
                            isSelected
                              ? "ring-2 ring-primary/50 bg-primary/10 text-foreground"
                              : !markType
                                ? "hover:bg-muted/60 text-foreground"
                                : "text-foreground"
                          }`}
                      >
                        {words.map((w, wi) => (
                          <span
                            key={wi}
                            data-word={w.replace(/[.,;:!?"']/g, "")}
                            onClick={(e) => handleWordTap(
                              e,
                              w.replace(/[.,;:!?"']/g, ""),
                              sentence.text,
                              globalIdx
                            )}
                            className={
                              wordTapMode
                                ? "cursor-pointer hover:bg-primary/20 hover:rounded px-0.5 -mx-0.5 transition-colors"
                                : ""
                            }
                          >
                            {w}{" "}
                          </span>
                        ))}
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
        <div className="px-5 py-4 border-b flex items-center gap-1">
          <button
            onClick={() => setRightTab("analysis")}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
              rightTab === "analysis"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Languages className="size-3.5" />
            精读解析
          </button>
          <button
            onClick={() => setRightTab("questions")}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
              rightTab === "questions"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardList className="size-3.5" />
            题目
          </button>
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-5">
            {rightTab === "analysis" ? (
              loading ? (
                <AnalysisSkeleton />
              ) : analysis ? (
                <AnalysisContent
                  analysis={analysis}
                  sentence={selectedSentence}
                  currentMark={
                    selectedSentence ? marks.get(selectedSentence.index) ?? null : null
                  }
                  onMark={(type) => {
                    if (selectedSentence) handleMark(selectedSentence.index, type);
                  }}
                  onClearMark={() => {
                    if (selectedSentence) handleClearMark(selectedSentence.index);
                  }}
                />
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <BookOpen className="size-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">点击左侧任意句子</p>
                  <p className="text-xs mt-1">查看精翻译文和语法分析</p>
                </div>
              )
            ) : (
              <QuestionsPanel
                passageId={passage.id}
                year={passage.year}
                textNum={passage.text_num}
              />
            )}
          </div>
        </ScrollArea>
      </aside>

      {/* ========== 划词气泡 ========== */}
      {selection && (
        <WordPopover
          word={selection.word}
          sentence={selection.sentence}
          sentenceIndex={selection.sentenceIndex}
          rect={selection.rect}
          passageId={passage.id}
          onClose={() => setSelection(null)}
        />
      )}

      {/* ========== 移动端底部浮动面板 ========== */}
      <MobileSheet
        open={mobilePanelOpen}
        onClose={() => setSelectedSentence(null)}
        loading={loading}
        analysis={analysis}
        sentence={selectedSentence}
        currentMark={
          selectedSentence ? marks.get(selectedSentence.index) ?? null : null
        }
        onMark={(type) => {
          if (selectedSentence) handleMark(selectedSentence.index, type);
        }}
        onClearMark={() => {
          if (selectedSentence) handleClearMark(selectedSentence.index);
        }}
      />

      {/* ========== 移动端题目面板 ========== */}
      {mobileQuestionsOpen && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t rounded-t-xl shadow-lg max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-2.5 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
            <span className="text-sm font-medium flex items-center gap-1.5">
              <ClipboardList className="size-3.5" />
              {passage.year} {passage.text_num} 题目
            </span>
            <button
              onClick={() => setMobileQuestionsOpen(false)}
              className="p-1 rounded-md hover:bg-muted transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="p-4 pb-8">
            <QuestionsPanel
              passageId={passage.id}
              year={passage.year}
              textNum={passage.text_num}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function AnalysisSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div>
        <div className="h-3 bg-muted rounded w-8 mb-1.5" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      </div>
      <Separator />
      <div>
        <div className="h-3 bg-muted rounded w-12 mb-1.5" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-4/5" />
        </div>
      </div>
      <Separator />
      <div>
        <div className="h-3 bg-muted rounded w-12 mb-1.5" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}

function AnalysisContent({
  analysis,
  sentence,
  currentMark,
  onMark,
  onClearMark,
}: {
  analysis: TranslateResult;
  sentence: { index: number; text: string } | null;
  currentMark: MarkType | null;
  onMark: (type: MarkType) => void;
  onClearMark: () => void;
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

      {/* 标记工具栏 */}
      {sentence && (
        <div className="py-1">
          <MarkToolbar
            currentMark={currentMark}
            onMark={onMark}
            onClear={onClearMark}
          />
        </div>
      )}

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
