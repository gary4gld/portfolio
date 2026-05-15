import Link from 'next/link'
import { Instrument_Serif, DM_Sans } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// ── Colour tokens ──────────────────────────────────────────────────────────
const c = {
  erp:  { fill: '#052e16', stroke: '#059669', title: '#d1fae5', sub: '#6ee7b7' },
  az:   { fill: '#0c1a2e', stroke: '#3b82f6', title: '#dbeafe', sub: '#93c5fd' },
  dgii: { fill: '#1a0533', stroke: '#7c3aed', title: '#ede9fe', sub: '#c4b5fd' },
  neu:  { fill: '#111827', stroke: '#374151', title: '#f9fafb', sub: '#9ca3af' },
  line: '#374151',
  note: '#4b5563',
}

// ── Reusable node ──────────────────────────────────────────────────────────
function Node({
  x, y, w, h = 50, colors, title, sub,
}: {
  x: number; y: number; w: number; h?: number
  colors: typeof c.erp; title: string; sub: string
}) {
  const cx = x + w / 2
  // For 50px boxes: title at +16, sub at +35
  // For 56px boxes: title at +19, sub at +38
  // For 44px boxes: title at +13, sub at +32
  const offsets: Record<number, [number, number]> = {
    44: [13, 32],
    50: [16, 35],
    56: [19, 38],
  }
  const [titleOff, subOff] = offsets[h] ?? [16, 35]
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8}
        fill={colors.fill} stroke={colors.stroke} strokeWidth={1.5}/>
      <text x={cx} y={y + titleOff} textAnchor="middle" dominantBaseline="central"
        fill={colors.title} fontSize={13} fontWeight={500}>{title}</text>
      <text x={cx} y={y + subOff} textAnchor="middle" dominantBaseline="central"
        fill={colors.sub} fontSize={11} fillOpacity={0.8}>{sub}</text>
    </g>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function OcrPipelinePage() {
  return (
    <div
      className={`min-h-screen bg-gray-950 text-white ${dmSans.variable} ${instrumentSerif.variable}`}
      style={{ fontFamily: 'var(--font-body), sans-serif' }}
    >
      <style>{`
        .display { font-family: var(--font-display), Georgia, serif; }
      `}</style>

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
            ← Gary De la Cruz
          </Link>
          <span className="text-gray-700 text-sm">/</span>
          <span className="text-sm text-gray-400">OCR Invoice Pipeline</span>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="pt-16 pb-12 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-blue-950 text-blue-300">
              Enterprise · AI
            </span>
            <span className="text-xs text-gray-600">Neural Software Solutions, SRL</span>
          </div>
          <h1 className="display text-4xl font-normal mb-4">
            OCR Invoice Ingestion Pipeline
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            AI-powered purchase invoice registration for the accounting team. Upload a photo
            or PDF through a custom web form, get a fully created Purchase Invoice in ERPNext
            — with no file ever touching the server. Azure Document Intelligence handles
            extraction; a Logic App routes the result, auto-creating suppliers from the DGII
            registry when they don&apos;t already exist.
          </p>
        </div>
      </header>

      {/* ── Architecture diagram ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              Architecture
            </span>
            <h2 className="display text-2xl font-normal mt-2">System flow</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gray-900/40 p-6 overflow-x-auto">
            <svg
              viewBox="0 0 780 600"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ minWidth: '520px' }}
              aria-label="OCR invoice ingestion pipeline diagram"
            >
              <defs>
                <marker id="arr" viewBox="0 0 10 10" refX={8} refY={5}
                  markerWidth={8} markerHeight={8} orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke={c.line}
                    strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
              </defs>

              {/* ── Layer labels ── */}
              {[
                { y: 65,  label: 'Browser', color: c.erp.stroke },
                { y: 215, label: 'Azure',   color: c.az.stroke  },
                { y: 385, label: 'DGII',    color: c.dgii.stroke },
                { y: 500, label: 'ERPNext', color: c.erp.stroke  },
              ].map(({ y, label, color }) => (
                <text key={`${y}`} x={22} y={y} fill={color} fillOpacity={0.45}
                  fontSize={9} fontFamily="monospace" letterSpacing={1} fontWeight={600}>
                  {label.toUpperCase()}
                </text>
              ))}

              {/* ── Node 1: Web form ── */}
              <Node x={145} y={40} w={490} colors={c.erp}
                title="Web form — invoice upload"
                sub="Drag-and-drop · validated in browser · no server storage"
              />

              <line x1={390} y1={90} x2={390} y2={112}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 2: Logic App ── */}
              <Node x={110} y={114} w={560} colors={c.az}
                title="Azure Logic App — invoice pipeline"
                sub="Receives image · orchestrates extraction and registration"
              />

              <line x1={390} y1={164} x2={390} y2={184}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 3: Azure DI ── */}
              <Node x={145} y={186} w={490} h={56} colors={c.az}
                title="Azure Document Intelligence"
                sub="Async image analysis · polling loop · up to 3 min"
              />

              <line x1={390} y1={242} x2={390} y2={262}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 4: Field extraction ── */}
              <Node x={145} y={264} w={490} colors={c.neu}
                title="Invoice field extraction"
                sub="RNC · NCF · date · totals · DGII verification URL"
              />

              {/* ── Fork ── */}
              {/* Vertical stem */}
              <line x1={390} y1={314} x2={390} y2={340}
                stroke={c.line} strokeWidth={1.5}/>
              {/* Horizontal fork bar */}
              <line x1={210} y1={340} x2={570} y2={340}
                stroke={c.line} strokeWidth={1.5}/>

              {/* Branch labels */}
              <text x={210} y={330} textAnchor="middle" dominantBaseline="central"
                fill={c.neu.sub} fontSize={11}>found</text>
              <text x={570} y={330} textAnchor="middle" dominantBaseline="central"
                fill={c.neu.sub} fontSize={11}>not found</text>

              {/* Drop arrowheads */}
              <line x1={210} y1={340} x2={210} y2={352}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>
              <line x1={570} y1={340} x2={570} y2={352}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 5a: Supplier found (left) ── */}
              <Node x={100} y={354} w={220} h={44} colors={c.neu}
                title="Supplier found"
                sub="Matched by RNC in ERPNext"
              />

              {/* ── Node 5b: DGII lookup (right) ── */}
              <Node x={460} y={354} w={220} h={44} colors={c.dgii}
                title="DGII registry lookup"
                sub="Query by supplier RNC"
              />

              {/* Arrow between right branch nodes */}
              <line x1={570} y1={398} x2={570} y2={410}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 5c: Supplier auto-created (right) ── */}
              <Node x={460} y={412} w={220} h={44} colors={c.neu}
                title="Supplier auto-created"
                sub="Registered in ERPNext"
              />

              {/* ── Merge ── */}
              {/* Left extends down to merge bar */}
              <line x1={210} y1={398} x2={210} y2={456}
                stroke={c.line} strokeWidth={1.5}/>
              {/* Right bottom at 456 */}
              <line x1={570} y1={456} x2={570} y2={456}/>
              {/* Horizontal merge bar */}
              <line x1={210} y1={456} x2={570} y2={456}
                stroke={c.line} strokeWidth={1.5}/>
              {/* Arrow down to purchase invoice */}
              <line x1={390} y1={456} x2={390} y2={468}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 6: Purchase Invoice ── */}
              <Node x={110} y={470} w={560} h={56} colors={c.erp}
                title="Purchase Invoice created"
                sub="Result returned to user · success link or error message in Spanish"
              />

              {/* Footer note */}
              <text x={390} y={548} textAnchor="middle" dominantBaseline="central"
                fill={c.note} fontSize={10}>
                Structured error codes: duplicate invoice · missing RNC · unrecognized supplier
              </text>

              {/* Legend */}
              <rect x={136} y={564} width={12} height={12} rx={2}
                fill={c.erp.fill} stroke={c.erp.stroke} strokeWidth={1}/>
              <text x={154} y={570} dominantBaseline="central"
                fill={c.note} fontSize={11}>Browser / ERPNext</text>

              <rect x={286} y={564} width={12} height={12} rx={2}
                fill={c.az.fill} stroke={c.az.stroke} strokeWidth={1}/>
              <text x={304} y={570} dominantBaseline="central"
                fill={c.note} fontSize={11}>Azure</text>

              <rect x={358} y={564} width={12} height={12} rx={2}
                fill={c.dgii.fill} stroke={c.dgii.stroke} strokeWidth={1}/>
              <text x={376} y={570} dominantBaseline="central"
                fill={c.note} fontSize={11}>DGII</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ── UI states ───────────────────────────────────────────────────────
          Images go in: public/projects/ocr/
          Expected filenames (rename your files to match):
            base-state.png   → BaseState.png
            processing.png   → Procesando.png
            success.png      → Exito.png
            error.png        → Fallido.jpeg
            duplicate.png    → Duplicada.png
      ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              Interface
            </span>
            <h2 className="display text-2xl font-normal mt-2">In action</h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xl">
              The custom web form handles five distinct states — each with clear
              Spanish-language feedback tailored to the accounting team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                src: '/projects/ocr/BaseState.png',
                caption: 'Empty state',
                sub: 'Drag-and-drop upload · client-side file validation',
              },
              {
                src: '/projects/ocr/Procesando.png',
                caption: 'Processing',
                sub: 'AI extraction in progress · 1–2 min estimate shown',
              },
              {
                src: '/projects/ocr/Exito.png',
                caption: 'Success',
                sub: 'Invoice created · clickable link to ERPNext document',
              },
              {
                src: '/projects/ocr/Fallido.jpeg',
                caption: 'Missing RNC',
                sub: 'Extracted data shown · actionable recovery tips in Spanish',
              },
              {
                src: '/projects/ocr/Duplicada.png',
                caption: 'Duplicate detected',
                sub: 'NCF + supplier matched · links to the existing invoice',
              },
            ].map(({ src, caption, sub }) => (
              <div key={src} className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-gray-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={caption}
                    className="w-full h-auto"
                  />
                </div>
                <div>
                  <div className="text-sm text-white font-medium">{caption}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Role & context ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
              My role
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              End-to-end: the custom web form and client-side validation, the Azure Logic App
              workflows, the Document Intelligence integration, the ERPNext Purchase Invoice
              creation, and the Spanish-language error handling surfaced back to the user.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
              What it solves
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Manual invoice entry is slow and error-prone. This pipeline lets the accounting
              team photograph a paper invoice and have it registered in seconds — including
              auto-fetching the supplier from the DGII registry if they&apos;ve never been seen
              before. The model improves accuracy with every invoice processed.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
              Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Azure Document Intelligence',
                'Azure Logic Apps',
                'Angular',
                'ERPNext',
                'Python',
              ].map((tag) => (
                <span key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-gray-900 border border-white/10 text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Back link ── */}
      <div className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <Link href="/"
            className="text-sm text-gray-500 hover:text-white transition-colors">
            ← Back to portfolio
          </Link>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="py-6 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-gray-600">Gary E. De la Cruz · 2026</span>
          <span className="text-xs text-gray-600">Built with Next.js · Deployed on Vercel</span>
        </div>
      </footer>
    </div>
  )
}