"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getQuestions } from "@/lib/data";
import type { Question } from "@/lib/types";

interface QuestionsPanelProps {
  passageId: string;
  year: number;
  textNum: string;
}

export function QuestionsPanel({ passageId, year, textNum }: QuestionsPanelProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, string>>(new Map());
  const [showResults, setShowResults] = useState(false);

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

  const correctCount = questions.filter(
    (q) => selectedAnswers.get(q.question_number) === q.correct_answer
  ).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-semibold text-sm">
          {year} {textNum} 题目
        </h3>
        <div className="flex items-center gap-2">
          {showResults && (
            <Badge variant={correctCount === questions.length ? "default" : "secondary"} className="text-xs">
              {correctCount}/{questions.length}
            </Badge>
          )}
          <button
            onClick={() => setShowResults(!showResults)}
            className="text-xs text-primary hover:underline"
          >
            {showResults ? "隐藏答案" : "显示答案"}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {questions.map((q) => {
          const isExpanded = expandedQ === q.question_number;
          const selectedAnswer = selectedAnswers.get(q.question_number);
          const isCorrect = selectedAnswer === q.correct_answer;
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
                <span className="text-sm leading-relaxed flex-1">
                  <span className="font-medium text-primary mr-1">{q.question_number}.</span>
                  {q.question_text}
                </span>
                {selectedAnswer && !showResults && (
                  <Badge variant="outline" className="text-xs shrink-0">
                    {selectedAnswer}
                  </Badge>
                )}
                {showResults && selectedAnswer && (
                  isCorrect ? (
                    <CheckCircle2 className="size-4 text-green-500 shrink-0" />
                  ) : (
                    <Circle className="size-4 text-red-400 shrink-0" />
                  )
                )}
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 space-y-1.5">
                  {options.map((opt) => {
                    const isSelected = selectedAnswer === opt.key;
                    const isCorrectOption = showResults && opt.key === q.correct_answer;
                    const isWrongSelection = showResults && isSelected && opt.key !== q.correct_answer;

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectAnswer(q.question_number, opt.key)}
                        className={`w-full flex items-start gap-2 p-2 rounded-md text-left text-sm transition-colors
                          ${isCorrectOption ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800" : ""}
                          ${isWrongSelection ? "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800" : ""}
                          ${isSelected && !showResults ? "bg-primary/10 border border-primary/30" : ""}
                          ${!isSelected && !isCorrectOption && !isWrongSelection ? "hover:bg-muted/50 border border-transparent" : ""}
                        `}
                      >
                        <span className={`font-medium shrink-0 w-5 ${
                          isCorrectOption ? "text-green-600 dark:text-green-400" :
                          isWrongSelection ? "text-red-500 dark:text-red-400" :
                          isSelected ? "text-primary" : "text-muted-foreground"
                        }`}>
                          {opt.key}.
                        </span>
                        <span className={`leading-relaxed ${
                          isCorrectOption ? "text-green-700 dark:text-green-300" :
                          isWrongSelection ? "text-red-600 dark:text-red-400" : ""
                        }`}>
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                  {showResults && q.correct_answer && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2 px-2">
                      正确答案：{q.correct_answer}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
