import Link from 'next/link'
import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Page not found — Gary De la Cruz',
  robots: { index: false },
}

const destinations = [
  { href: '/', label: 'Home', sub: 'garydelacruz.dev' },
  { href: '/projects/dgii-ecf', label: 'DGII e-CF System', sub: 'Case study' },
  { href: '/projects/ocr-pipeline', label: 'OCR Invoice Pipeline', sub: 'Case study' },
  { href: '/projects/ecf-validator', label: 'ECF XML Validator', sub: 'Case study' },
]

// Shown for any URL that doesn't match a page (Next.js returns a 404 status).
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main id="main" className="flex-1 px-6 pt-32 pb-24 dot-grid">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">Error 404</span>
          <h1 className="display font-normal leading-[1.05] mt-3 mb-4" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>
            This page doesn&apos;t exist.
          </h1>
          <p className="text-gray-300 max-w-xl leading-relaxed mb-10">
            The link may be mistyped or the page may have moved. Here&apos;s where you can go instead:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
            {destinations.map(({ href, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-4 bg-gray-900 border border-white/10 rounded-xl px-4 py-3 hover:border-blue-500/40 transition-colors"
              >
                <div>
                  <div className="text-sm text-white font-medium">{label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
                </div>
                <span className="text-blue-400 text-sm" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
