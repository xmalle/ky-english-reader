import Link from "next/link";
import { BookOpen, BookMarked } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <BookOpen className="size-16 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">
          KyEnglishReader
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          考研英语阅读精读工具
          <br />
          逐句解析 · 熟词生义 · 间隔复习
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/passages"
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            <BookOpen className="size-5 mr-2" />
            开始阅读
          </Link>
          <Link
            href="/vocabulary"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <BookMarked className="size-5 mr-2" />
            我的生词本
          </Link>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          管理员入口：<Link href="/admin/import" className="underline underline-offset-2">导入真题</Link>
        </p>
      </div>
    </div>
  );
}
