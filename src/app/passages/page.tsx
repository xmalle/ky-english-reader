"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Loader2, FileText } from "lucide-react";

import { getPassages } from "@/lib/data";
import type { Passage } from "@/lib/types";

export default function PassagesPage() {
  const [passages, setPassages] = useState<Passage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    getPassages().then((data) => {
      setPassages(data);
      setLoading(false);
    });
  }, []);

  const grouped = new Map<number, Passage[]>();
  for (const p of passages) {
    const list = grouped.get(p.year) ?? [];
    list.push(p);
    grouped.set(p.year, list);
  }

  const years = Array.from(grouped.keys()).sort((a, b) => b - a);
  const totalPassages = passages.length;

  const filteredYears = selectedYear
    ? years.filter((y) => y === selectedYear)
    : years;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* 顶部导航 */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          返回首页
        </Link>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="size-6" />
            真题阅读
          </h1>
          {!loading && (
            <p className="text-sm text-muted-foreground mt-1">
              共 {years.length} 个年份，{totalPassages} 篇文章
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : passages.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <BookOpen className="size-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">暂无文章数据</p>
            <p className="text-sm mt-1">
              请通过{" "}
              <Link
                href="/admin/import"
                className="underline underline-offset-2 text-primary"
              >
                导入页面
              </Link>{" "}
              添加真题
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* 年份筛选标签 */}
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
              const count = grouped.get(year)?.length ?? 0;
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

          {/* 文章列表 */}
          <div className="space-y-10">
            {filteredYears.map((year) => {
              const yearPassages = grouped.get(year) ?? [];
              return (
                <section key={year}>
                  {/* 年份标题 */}
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

                  {/* 文章卡片列表 */}
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
      )}

      <div className="text-center pt-4">
        <Link
          href="/admin/import"
          className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
        >
          管理员：导入新真题
        </Link>
      </div>
    </div>
  );
}
