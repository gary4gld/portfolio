import Link from 'next/link'
import SiteFooter from './SiteFooter'

// Shared frame for every /projects/* page: breadcrumb nav on top,
// "back to portfolio" link and site footer at the bottom.
export default function ProjectPage({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
            ← Gary De la Cruz
          </Link>
          <span className="text-gray-600 text-sm" aria-hidden="true">/</span>
          <span className="text-sm text-gray-300">{title}</span>
        </div>
      </nav>

      {children}

      <div className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
            ← Back to portfolio
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
