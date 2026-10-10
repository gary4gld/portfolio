import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL, pageMetadata } from "@/lib/site";

// Loaded once for the whole site; globals.css maps these variables to
// Tailwind's font-sans / font-serif and the .display class.
const displayFont = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    title: "Gary De la Cruz — Full-Stack Developer",
    description: "Full-stack developer and integration specialist based in Massachusetts. Enterprise integrations, Azure pipelines, ERPNext, and compliance systems.",
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <head>
        {/* Marks the page as JS-enabled before first paint so scroll-reveal
            styles only apply when the script that reveals them can run. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
