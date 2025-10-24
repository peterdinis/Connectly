import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connectly – Your Personal Link Hub",
  description: "Connectly is a Linktree clone that lets you create a simple and beautiful page to share all your links in one place.",
  keywords: ["Connectly", "Linktree clone", "personal links", "social media links", "link hub", "link management"],
  authors: [
    { name: "Connectly Team", url: "https://connectly.example.com" },
  ],
  creator: "Connectly Team",
  publisher: "Connectly",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connectly – Your Personal Link Hub",
    description: "Create a simple and beautiful page to share all your links in one place with Connectly.",
    images: ["/og-image.png"],
    creator: "@connectly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
