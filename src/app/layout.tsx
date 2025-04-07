import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <SidebarProvider>
            <AppSidebar collapsible="dock" />
            <SidebarInset className="flex-1 flex-row justify-center">
              <div className="w-full max-w-[800px] mx-4">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
