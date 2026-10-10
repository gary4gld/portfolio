import type { Metadata } from 'next'

// Single source of truth for the public URL and shared metadata.
// metadataBase (set in app/layout.tsx) turns every relative URL below —
// canonical links, og:url, og:image — into a full https:// address, which
// LinkedIn, Slack, WhatsApp, etc. require.
export const SITE_URL = 'https://www.garydelacruz.dev'
export const SITE_NAME = 'Gary De la Cruz'

type PageMeta = {
  title: string
  description: string
  path: string
}

// Next.js merges metadata shallowly: a page that sets its own `title` but not
// `openGraph` would inherit the home page's og:title. Building every page's
// metadata through this helper keeps title, description, and share cards in sync.
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: path,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
