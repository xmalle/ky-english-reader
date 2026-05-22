"use client";

import { Loader2, Languages, GitBranch, BookOpen, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
}

export function MobileSheet({
  open,
  onClose,
  loading,
  analysis,
  sentence,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="max-h-[60vh] overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2 text-base">
            <Languages className="size-4" />
            精读解析
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 pb-6">
          {loading ? (
            <div className="flex items-center gap-3 text-muted-foreground py-8 justify-center">
              <Loader2 className="size-5 animate-spin" />
              <span className="text-sm">AI 正在分析...</span>
            </div>
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

              <Separator />

              {/* 精翻 */}
              <div>
                <div className="text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1.5">
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
      </SheetContent>
    </Sheet>
  );
}
