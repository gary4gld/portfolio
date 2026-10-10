export default function SiteFooter() {
  return (
    <footer className="py-6 px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-gray-400">Gary E. De la Cruz · {new Date().getFullYear()}</span>
        <span className="text-xs text-gray-400">Built with Next.js · Deployed on Vercel</span>
      </div>
    </footer>
  )
}
