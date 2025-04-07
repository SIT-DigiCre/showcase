import type { Metadata } from "next";
import "./globals.css";
import { Heading } from "@/components/ui/heading";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebarNav from "@/components/app-sidebar-nav";
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
            <SidebarInset>
              <AppSidebarNav />
              <div className="p-4 lg:p-6">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
