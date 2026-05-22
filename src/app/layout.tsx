import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "KyEnglishReader - 考研英语阅读精读",
  description: "交互式考研英语阅读精读工具，支持逐句解析与生词管理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
      style={{
        fontFamily:
          "'Inter', 'SF Pro Text', 'PingFang SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      <body className="h-full flex flex-col">
        <TooltipProvider delay={300}>
          {children}
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
