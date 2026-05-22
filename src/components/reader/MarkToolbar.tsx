"use client";

import { Highlighter, Underline, Eraser } from "lucide-react";
import type { MarkType } from "@/lib/types";

export const MARK_STYLES: Record<string, string> = {
  "highlight-yellow": "bg-yellow-200 dark:bg-yellow-800",
  "highlight-green": "bg-green-200 dark:bg-green-800",
  "underline-red":
    "underline decoration-red-500 decoration-2 underline-offset-4",
};

interface Props {
  currentMark: MarkType | null;
  onMark: (type: MarkType) => void;
  onClear: () => void;
}

export function MarkToolbar({ currentMark, onMark, onClear }: Props) {
  const buttons: {
    type: MarkType;
    label: string;
    previewClass: string;
    icon: React.ReactNode;
  }[] = [
    {
      type: "highlight-yellow",
      label: "黄高亮",
      previewClass:
        "bg-yellow-300 dark:bg-yellow-700 ring-1 ring-yellow-400",
      icon: <Highlighter className="size-3.5 text-yellow-600 dark:text-yellow-400" />,
    },
    {
      type: "highlight-green",
      label: "绿高亮",
      previewClass:
        "bg-green-300 dark:bg-green-700 ring-1 ring-green-400",
      icon: <Highlighter className="size-3.5 text-green-600 dark:text-green-400" />,
    },
    {
      type: "underline-red",
      label: "红下划线",
      previewClass:
        "underline decoration-red-500 decoration-2 underline-offset-4",
      icon: <Underline className="size-3.5 text-red-500" />,
    },
  ];

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {buttons.map((btn) => {
        const isActive = currentMark === btn.type;
        return (
          <button
            key={btn.type}
            onClick={() => onMark(btn.type)}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors border
              ${
                isActive
                  ? "bg-primary/10 border-primary/40 text-primary"
                  : "border-border hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            title={btn.label}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        );
      })}
      {currentMark && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors border border-red-200 hover:bg-red-50 text-red-500 dark:border-red-800 dark:hover:bg-red-950"
          title="清除标记"
        >
          <Eraser className="size-3.5" />
          <span>清除</span>
        </button>
      )}
    </div>
  );
}
