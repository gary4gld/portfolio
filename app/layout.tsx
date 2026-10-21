import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL, pageMetadata } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

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

// Colors the mobile browser's address bar to match the site background.
export const viewport: Viewport = {
  themeColor: "#030712",
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
      <body className="min-h-full flex flex-col">
        {/* Hidden until focused with Tab: lets keyboard and screen-reader users
            jump past the navigation straight to the page content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-gray-950 focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        {children}
        {/* Vercel Web Analytics: page views only, no cookies. Data appears in
            the project's Analytics tab once it's enabled in the dashboard. */}
        <Analytics />
      </body>
    </html>
  );
}
