import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SidebarProvider } from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

import "@/styles/global.css";

// Font configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Next.js Template",
  description:
    "A modern Next.js 15 template with TypeScript, Tailwind CSS v4, and shadcn UI",
  keywords: ["next.js", "react", "typescript", "tailwind", "shadcn"],
  authors: [
    {
      name: "Your Name",
      url: "https://yourwebsite.com",
    },
  ],
};

// Root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning // Add this to suppress hydration warnings on the body too
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable,
          geistMono.variable
        )}
      >
        <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
      </body>
    </html>
  );
}
