"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getQuestions } from "@/lib/data";
import type { Question } from "@/lib/types";

interface QuestionsPanelProps {
  passageId: string;
  year: number;
  textNum: string;
  onWordSelect?: (word: string, sentence: string, rect: DOMRect) => void;
}

function splitWords(text: string): string[] {
  return text.match(/[\w']+[.,;:!?"']*|\s+|[^\w\s]+/g)?.filter(w => w.trim()) ?? [text];
}

/** 将文本渲染为可点击单词 */
function WordClickableText({
  text,
  onWordClick,
}: {
  text: string;
  onWordClick: (word: string, el: HTMLElement) => void;
}) {
  const words = splitWords(text);
  return (
    <>
      {words.map((w, i) => {
        const clean = w.replace(/[.,;:!?"']/g, "");
        const isWord = /^[\w']+/.test(clean);
        return isWord ? (
          <span
            key={i}
            data-word={clean}
            onClick={(e) => {
              e.stopPropagation();
              onWordClick(clean, e.currentTarget as HTMLElement);
            }}
            className="cursor-pointer hover:bg-primary/20 hover:rounded px-0.5 -mx-0.5 transition-colors"
          >
            {w}{" "}
          </span>
        ) : (
          <span key={i}>{w}</span>
        );
      })}
    </>
  );
}

export function QuestionsPanel({ passageId, year, textNum, onWordSelect }: QuestionsPanelProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    getQuestions(passageId).then((data) => {
      setQuestions(data);
      setLoading(false);
    });
  }, [passageId]);

  if (loading) {
    return (
      <div className="p-5 space-y-3 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="p-5 text-center text-muted-foreground text-sm">
        暂无题目数据
      </div>
    );
  }

  function handleSelectAnswer(qNum: number, option: string) {
    setSelectedAnswers((prev) => {
      const next = new Map(prev);
      next.set(qNum, option);
      return next;
    });
  }

  function handleWordClick(word: string, el: HTMLElement) {
    if (!onWordSelect) return;
    const rect = el.getBoundingClientRect();
    const parentText = el.closest("[data-context]")?.textContent ?? "";
    onWordSelect(word, parentText, rect);
  }

  return (
    <div className="space-y-3">
      <div className="px-1">
        <h3 className="font-semibold text-sm">
          {year} {textNum} 题目
        </h3>
      </div>

      <div className="space-y-2">
        {questions.map((q) => {
          const isExpanded = expandedQ === q.question_number;
          const selectedAnswer = selectedAnswers.get(q.question_number);
          const options = [
            { key: "A", text: q.option_a },
            { key: "B", text: q.option_b },
            { key: "C", text: q.option_c },
            { key: "D", text: q.option_d },
          ];

          return (
            <div
              key={q.id}
              className="border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedQ(isExpanded ? null : q.question_number)}
                className="w-full flex items-start gap-2 p-3 text-left hover:bg-muted/50 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronRight className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                )}
                <span className="text-sm leading-relaxed flex-1" data-context>
                  <span className="font-medium text-primary mr-1">{q.question_number}.</span>
                  <WordClickableText text={q.question_text} onWordClick={handleWordClick} />
                </span>
                {selectedAnswer && (
                  <Badge variant="outline" className="text-xs shrink-0">
                    {selectedAnswer}
                  </Badge>
                )}
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 space-y-1.5">
                  {options.map((opt) => {
                    const isSelected = selectedAnswer === opt.key;

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectAnswer(q.question_number, opt.key)}
                        className={`w-full flex items-start gap-2 p-2 rounded-md text-left text-sm transition-colors
                          ${isSelected ? "bg-primary/10 border border-primary/30" : ""}
                          ${!isSelected ? "hover:bg-muted/50 border border-transparent" : ""}
                        `}
                      >
                        <span className={`font-medium shrink-0 w-5 ${
                          isSelected ? "text-primary" : "text-muted-foreground"
                        }`}>
                          {opt.key}.
                        </span>
                        <span className="leading-relaxed" data-context>
                          <WordClickableText text={opt.text} onWordClick={handleWordClick} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
