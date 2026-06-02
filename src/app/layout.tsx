import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "QFC-OS | Quésede Filipe Constantino",
  description:
    "Portfolio como sistema operacional. Terminal, projetos, stack e contato — tudo em um OS pessoal.",
  openGraph: {
    title: "QFC-OS — Quésede Filipe Constantino",
    description:
      "Um mini sistema operacional onde o portfólio roda como aplicação.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg-canvas text-text-primary">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
