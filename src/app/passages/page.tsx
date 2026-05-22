import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import type { Passage } from "@/lib/types";
import { PassagesFilter } from "./PassagesFilter";

export const dynamic = "force-static";

function buildClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

async function getPassages() {
  const supabase = buildClient();
  const { data } = await supabase
    .from("passages")
    .select("*")
    .order("year", { ascending: false })
    .order("text_num", { ascending: true });
  return (data ?? []) as Passage[];
}

function groupByYear(passages: Passage[]) {
  const map = new Map<number, Passage[]>();
  for (const p of passages) {
    const list = map.get(p.year) ?? [];
    list.push(p);
    map.set(p.year, list);
  }
  const years = Array.from(map.keys()).sort((a, b) => b - a);
  // 转为普通对象以支持序列化传给客户端组件
  const byYear: Record<number, Passage[]> = {};
  for (const [year, list] of map) {
    byYear[year] = list;
  }
  return { byYear, years };
}

export default async function PassagesPage() {
  const passages = await getPassages();
  const { byYear, years } = groupByYear(passages);
  const totalPassages = passages.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
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
          <p className="text-sm text-muted-foreground mt-1">
            共 {years.length} 个年份，{totalPassages} 篇文章
          </p>
        </div>
      </div>

      {passages.length === 0 ? (
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
        <PassagesFilter passages={passages} byYear={byYear} years={years} />
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
