"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import type { Passage } from "@/lib/types";

interface Props {
  passages: Passage[];
  byYear: Record<number, Passage[]>;
  years: number[];
}

export function PassagesFilter({ byYear, years }: Props) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filteredYears = selectedYear
    ? years.filter((y) => y === selectedYear)
    : years;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedYear(null)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedYear === null
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted hover:bg-muted/70 text-muted-foreground"
          }`}
        >
          全部
        </button>
        {years.map((year) => {
          const count = byYear[year]?.length ?? 0;
          return (
            <button
              key={year}
              onClick={() =>
                setSelectedYear(selectedYear === year ? null : year)
              }
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedYear === year
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted hover:bg-muted/70 text-muted-foreground"
              }`}
            >
              {year}
              <span className="ml-1.5 opacity-60 text-xs">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-10">
        {filteredYears.map((year) => {
          const yearPassages = byYear[year] ?? [];
          return (
            <section key={year}>
              <div className="pb-3">
                <div className="flex items-baseline gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {year}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {yearPassages.length} 篇
                  </span>
                </div>
                <div className="h-px bg-border mt-3" />
              </div>

              <div className="space-y-2 mt-2">
                {yearPassages.map((p) => (
                  <Link key={p.id} href={`/passages/${p.id}`}>
                    <div className="group flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border/60">
                      <Badge
                        variant="outline"
                        className="shrink-0 text-xs font-mono w-14 justify-center"
                      >
                        {p.text_num}
                      </Badge>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                          {p.title ?? `${year}年 ${p.text_num}`}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {(p.content as Passage["content"])?.fullText?.slice(
                            0,
                            100,
                          ) ?? "—"}
                        </p>
                      </div>

                      <FileText className="size-4 text-muted-foreground/40 shrink-0 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
