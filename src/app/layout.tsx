import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "#/components/SessionProvider";
import Sidebar from "#/components/Sidebar";

export const metadata: Metadata = {
  title: "Showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <div className="flex flex-1">
              <div className="hidden md:block">
                <Sidebar />
              </div>
              <div className="flex justify-center px-8 flex-1">
                <main className="w-full max-w-[800px]">{children}</main>
              </div>
            </div>
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 flex justify-around p-2">
              <a href="/timeline" className="text-center">
                タイムライン
              </a>
              <a href="/search" className="text-center">
                検索
              </a>
              <a href="/mypage" className="text-center">
                マイページ
              </a>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
