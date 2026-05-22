"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Plus, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatVocab } from "@/lib/ai";
import { addVocabulary, getCachedWordContextMeaning, saveWordContextMeaning } from "@/lib/data";

interface VocabResult {
  word?: string;
  basicMeaning?: string;
  contextMeaning?: string;
  isAdvanced?: boolean;
  error?: string;
}

interface Props {
  word: string;
  sentence: string;
  sentenceIndex: number;
  rect: DOMRect;
  passageId: string;
  onClose: () => void;
}

export function WordPopover({ word, sentence, sentenceIndex, rect, passageId, onClose }: Props) {
  const [result, setResult] = useState<VocabResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchVocab() {
      setLoading(true);
      try {
        // 1. 先查缓存
        const cached = await getCachedWordContextMeaning(
          passageId,
          sentenceIndex,
          word,
        );
        if (cached) {
          if (!cancelled) {
            setResult({
              word: cached.word,
              basicMeaning: cached.basic_meaning,
              contextMeaning: cached.context_meaning ?? undefined,
            });
            setLoading(false);
          }
          return;
        }

        // 2. 缓存未命中，调用 AI
        const data = await chatVocab(word, sentence);
        if (!cancelled) {
          if (data.error) {
            toast.error(data.error);
          } else {
            setResult(data);
            // 3. 异步存入缓存
            saveWordContextMeaning(
              passageId,
              sentenceIndex,
              word,
              data.basicMeaning ?? "",
              data.contextMeaning ?? "",
            ).catch(() => {});
          }
        }
      } catch {
        if (!cancelled) toast.error("获取释义失败");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchVocab();
    return () => { cancelled = true; };
  }, [word, sentence, passageId, sentenceIndex]);

  // 点击外部关闭
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    setTimeout(() => document.addEventListener("click", handleClick), 100);
    return () => document.removeEventListener("click", handleClick);
  }, [onClose]);

  async function handleSave() {
    setSaving(true);
    try {
      const data = await addVocabulary({
        word: result?.word ?? word,
        basicMeaning: result?.basicMeaning ?? "",
        contextMeaning: result?.contextMeaning ?? "",
        sourceSentence: sentence,
        passageId,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("已加入生词本");
        onClose();
      }
    } catch {
      toast.error("保存失败");
    } finally {
      setSaving(false);
    }
  }

  // 计算弹出位置
  const style = calcPopoverStyle(rect);

  return (
    <div
      ref={popRef}
      style={style}
      className="fixed z-50 w-72 bg-popover border rounded-xl shadow-xl p-4 space-y-3"
    >
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm py-2">
          <Loader2 className="size-4 animate-spin" />
          查询中...
        </div>
      ) : result ? (
        <>
          <div>
            <h4 className="font-bold text-base">{result.word ?? word}</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">基本释义：</span>
              <span>{result.basicMeaning}</span>
            </div>
            {result.contextMeaning && (
              <div>
                <span className="text-muted-foreground">语境释义：</span>
                <span className="text-primary font-medium">
                  {result.contextMeaning}
                </span>
              </div>
            )}
            {result.isAdvanced && (
              <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                熟词生义
              </div>
            )}
          </div>
          <div className="pt-1">
            <Button
              size="sm"
              className="w-full"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin mr-2" />
              ) : (
                <Plus className="size-4 mr-2" />
              )}
              加入生词本
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}

function calcPopoverStyle(rect: DOMRect): React.CSSProperties {
  const padding = 8;
  let top = rect.bottom + padding;
  let left = rect.left;

  // 防止超出右边界
  if (left + 288 > window.innerWidth) {
    left = window.innerWidth - 288 - padding;
  }
  if (left < padding) left = padding;

  // 防止超出底部
  if (top + 250 > window.innerHeight) {
    top = rect.top - 250 - padding;
    if (top < padding) top = padding;
  }

  return { top, left };
}
