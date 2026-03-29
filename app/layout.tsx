import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROOPLEX | AI Agent Orchestration",
  description: "Autonomous multi-agent orchestration platform. Route, execute, learn, repeat.",
  openGraph: {
    title: "PROOPLEX | AI Agent Orchestration",
    description: "Autonomous multi-agent orchestration platform. Route, execute, learn, repeat.",
    siteName: "PROOPLEX",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=JetBrains+Mono:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise font-body bg-void text-text-primary">
        {children}
      </body>
    </html>
  );
}
