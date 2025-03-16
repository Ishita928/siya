import { ReactNode } from "react";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
