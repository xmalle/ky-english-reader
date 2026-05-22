import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArticleReader } from "@/components/reader/ArticleReader";
import type { Passage } from "@/lib/types";

export const dynamic = "force-static";

function buildClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export async function generateStaticParams() {
  const supabase = buildClient();
  const { data } = await supabase.from("passages").select("id");
  return (data ?? []).map((p: { id: string }) => ({ id: p.id }));
}

export default async function PassagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = buildClient();
  const { data: passage, error } = await supabase
    .from("passages")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !passage) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-lg text-muted-foreground">文章未找到</p>
        <Link href="/passages" className="text-primary underline mt-2 inline-block">
          返回列表
        </Link>
      </div>
    );
  }

  const content = (passage as Passage).content as Passage["content"];
  const allSentences = content.paragraphs.flatMap((p) => p.sentences);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ height: "100dvh" }}>
      <header className="flex items-center gap-3 px-4 py-3 border-b shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <Link
          href="/passages"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">返回</span>
        </Link>
        <div className="flex items-center gap-2 ml-2">
          <Badge variant="default" className="text-xs">
            {passage.year}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {passage.text_num}
          </Badge>
        </div>
        <h1 className="text-sm font-medium truncate flex-1">
          {passage.title ?? `${passage.year}年 ${passage.text_num}`}
        </h1>
        <span className="text-xs text-muted-foreground">
          {allSentences.length} 句
        </span>
      </header>

      <ArticleReader passage={passage as Passage} />
    </div>
  );
}
