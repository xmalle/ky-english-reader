"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import { getPassages } from "@/lib/data";
import type { Passage } from "@/lib/types";

export default function PassagesPage() {
  const [passages, setPassages] = useState<Passage[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          返回首页
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="size-6" />
          真题阅读
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : passages.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <BookOpen className="size-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">暂无文章数据</p>
            <p className="text-sm mt-1">
              请通过{" "}
              <Link href="/admin/import" className="underline underline-offset-2 text-primary">
                导入页面
              </Link>{" "}
              添加真题
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {years.map((year) => (
            <section key={year}>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Badge variant="default" className="text-sm px-3">
                  {year}年
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {grouped.get(year)?.length ?? 0} 篇
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {grouped.get(year)?.map((p) => (
                  <Link key={p.id} href={`/passages/${p.id}`}>
                    <Card className="group hover:border-primary/50 hover:bg-accent/30 transition-colors cursor-pointer h-full">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {p.text_num}
                          </Badge>
                          <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <CardTitle className="text-base mt-1">
                          {p.title ?? `${p.year}年 ${p.text_num}`}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {(p.content as Passage["content"])?.fullText?.slice(0, 120) ?? "—"}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="text-center">
        <Link
          href="/admin/import"
          className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          管理员：导入新真题
        </Link>
      </div>
    </div>
  );
}
