"use client";

import { Languages, GitBranch, BookOpen, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MarkToolbar } from "./MarkToolbar";
import { AnalysisSkeleton } from "./ArticleReader";
import type { MarkType } from "@/lib/types";

interface TranslateResult {
  translation?: string;
  grammar?: string;
  keywords?: string[];
  error?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  analysis: TranslateResult | null;
  sentence: { index: number; text: string } | null;
  currentMark: MarkType | null;
  onMark: (type: MarkType) => void;
  onClearMark: () => void;
}

export function MobileSheet({ open, onClose, loading, analysis, sentence, currentMark, onMark, onClearMark }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  if (!open) return null;

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t rounded-t-xl shadow-lg transition-all duration-300 ease-out"
      style={{ maxHeight: collapsed ? "52px" : "45vh" }}
    >
      {/* 拖拽手柄 + 标题栏 */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b shrink-0">
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex-1 min-w-0"
        >
          {collapsed ? (
            <ChevronUp className="size-4 shrink-0" />
          ) : (
            <ChevronDown className="size-4 shrink-0" />
          )}
          <span className="truncate">
            <Languages className="size-3.5 inline mr-1.5" />
            精读解析
            {sentence && !collapsed && (
              <span className="text-xs text-muted-foreground ml-2">
                {sentence.text.slice(0, 25)}...
              </span>
            )}
          </span>
        </button>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-muted transition-colors shrink-0 ml-2"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* 内容区 */}
      <div
        className={`overflow-y-auto transition-all duration-300 ${
          collapsed ? "max-h-0" : "max-h-[calc(45vh-52px)]"
        }`}
      >
        <div className="px-4 py-3 pb-6">
          {loading ? (
            <AnalysisSkeleton />
          ) : analysis ? (
            <div className="space-y-4">
              {/* 原句 */}
              <div>
                <div className="text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1.5">
                  <BookOpen className="size-3" />
                  原句
                </div>
                <p className="text-sm leading-relaxed font-medium">
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
                <div className="text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1.5">
                  <Languages className="size-3" />
                  精翻译文
                </div>
                <p className="text-sm leading-relaxed">{analysis.translation}</p>
              </div>

              {/* 语法 */}
              {analysis.grammar && (
                <>
                  <Separator />
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1.5">
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
          ) : null}
        </div>
      </div>
    </div>
  );
}
