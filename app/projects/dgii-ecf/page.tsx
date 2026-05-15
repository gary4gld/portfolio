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

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata = {
  title: 'DGII e-CF System — Gary De la Cruz',
  description:
    'Architecture and details for an end-to-end DGII e-CF compliance pipeline — covering all 10 mandated invoice types, Azure Functions orchestration, and real-time status tracking.',
}

// ── Colour tokens (match the portfolio dark theme) ─────────────────────────
// Each system layer gets its own colour ramp.
// ERPNext  → emerald   (teal fill / emerald stroke)
// Azure    → blue      (navy fill / blue stroke)
// DGII     → violet    (dark purple fill / violet stroke)
// Neutral  → gray      (gray-900 fill / gray-700 stroke)

const c = {
  erp:  { fill: '#052e16', stroke: '#059669', title: '#d1fae5', sub: '#6ee7b7' },
  az:   { fill: '#0c1a2e', stroke: '#3b82f6', title: '#dbeafe', sub: '#93c5fd' },
  dgii: { fill: '#1a0533', stroke: '#7c3aed', title: '#ede9fe', sub: '#c4b5fd' },
  neu:  { fill: '#111827', stroke: '#374151', title: '#f9fafb', sub: '#9ca3af' },
  wrap: { fill: '#0a0f1a', stroke: '#1e3a5f' },
  pill: { fill: '#0f172a', stroke: '#6366f1', text: '#c7d2fe' },
  line: '#374151',
  note: '#4b5563',
}

// ── Reusable SVG node components ───────────────────────────────────────────

function Node({
  x, y, w, h = 50, colors, title, sub,
}: {
  x: number; y: number; w: number; h?: number
  colors: typeof c.erp; title: string; sub: string
}) {
  const cx = x + w / 2
  const titleY = y + 16
  const subY   = y + 35
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8}
        fill={colors.fill} stroke={colors.stroke} strokeWidth={1.5}/>
      <text x={cx} y={titleY} textAnchor="middle" dominantBaseline="central"
        fill={colors.title} fontSize={13} fontWeight={500}>{title}</text>
      <text x={cx} y={subY} textAnchor="middle" dominantBaseline="central"
        fill={colors.sub} fontSize={11} fillOpacity={0.8}>{sub}</text>
    </g>
  )
}

function Pill({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={80} height={24} rx={6}
        fill={c.pill.fill} stroke={c.pill.stroke} strokeWidth={1}/>
      <text x={x + 40} y={y + 12} textAnchor="middle" dominantBaseline="central"
        fill={c.pill.text} fontSize={11} fontWeight={500}>{label}</text>
    </g>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function DgiiEcfPage() {
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
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            ← Gary De la Cruz
          </Link>
          <span className="text-gray-700 text-sm">/</span>
          <span className="text-sm text-gray-400">DGII e-CF System</span>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="pt-16 pb-12 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-blue-950 text-blue-300">
              Enterprise · Compliance
            </span>
            <span className="text-xs text-gray-600">Neural Software Solutions, SRL</span>
          </div>
          <h1 className="display text-4xl font-normal mb-4">
            DGII e-CF Electronic Invoicing System
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            An end-to-end compliance pipeline connecting ERPNext to the Dominican Republic&apos;s
            DGII tax authority. From a single user action to a signed, submitted, and tracked
            electronic invoice — across Azure Functions, Logic Apps, and the DGII&apos;s own
            endpoints. Covers all 10 mandated e-CF invoice types with a pre-validation layer
            that catches format errors before they reach DGII, protecting scarce
            government-issued NCF sequences.
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

          {/* Diagram container — horizontally scrollable on very small screens */}
          <div className="rounded-2xl border border-white/10 bg-gray-900/40 p-6 overflow-x-auto">
            <svg
              viewBox="0 0 780 710"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ minWidth: '560px' }}
              aria-label="DGII e-CF system architecture diagram"
            >
              {/* Arrow marker */}
              <defs>
                <marker
                  id="arr"
                  viewBox="0 0 10 10"
                  refX={8} refY={5}
                  markerWidth={8} markerHeight={8}
                  orient="auto-start-reverse"
                >
                  <path
                    d="M2 1L8 5L2 9"
                    fill="none"
                    stroke={c.line}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
              </defs>

              {/* ── Legend labels (left margin) ── */}
              {[
                { y: 65,  label: 'ERPNext', color: c.erp.stroke },
                { y: 220, label: 'Azure',   color: c.az.stroke  },
                { y: 555, label: 'DGII',    color: c.dgii.stroke },
                { y: 640, label: 'ERPNext', color: c.erp.stroke  },
              ].map(({ y, label, color }) => (
                <text
                  key={`${y}-${label}`}
                  x={22} y={y}
                  fill={color}
                  fillOpacity={0.5}
                  fontSize={9}
                  fontFamily="monospace"
                  letterSpacing={1}
                  fontWeight={600}
                >
                  {label.toUpperCase()}
                </text>
              ))}

              {/* ── Node 1: ERPNext user action ── */}
              <Node x={130} y={40} w={520} colors={c.erp}
                title="ERPNext — sales invoice"
                sub="User triggers submission · pre-validation runs"
              />

              <line x1={390} y1={90} x2={390} y2={112}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 2: Pre-validation ── */}
              <Node x={165} y={114} w={450} colors={c.neu}
                title="Pre-validation layer"
                sub="Tax indicators · payment mode · invoice references"
              />

              <line x1={390} y1={164} x2={390} y2={186}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 3: Azure Functions ── */}
              <Node x={100} y={188} w={580} colors={c.az}
                title="Azure Functions — orchestration"
                sub="NCF assignment · environment detection · instance routing"
              />

              <line x1={390} y1={238} x2={390} y2={260}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 4: Logic App ── */}
              <Node x={80} y={262} w={620} colors={c.az}
                title="Azure Logic App — processing hub"
                sub="Payload transform · token management · response parsing"
              />

              {/* Bus line → routing wrapper */}
              <line x1={390} y1={312} x2={390} y2={330}
                stroke={c.az.stroke} strokeWidth={1} strokeOpacity={0.35}
                markerEnd="url(#arr)"/>

              {/* ── Type routing wrapper (dashed) ── */}
              <rect
                x={208} y={330} width={364} height={92} rx={8}
                fill={c.wrap.fill} stroke={c.wrap.stroke}
                strokeWidth={1.5} strokeDasharray="4 3"
              />
              <text
                x={390} y={346}
                textAnchor="middle" dominantBaseline="central"
                fill="#4b5563" fontSize={9}
                fontFamily="monospace" letterSpacing={3}
              >
                INVOICE TYPE ROUTING
              </text>

              {/* Pills row 1 — x positions: 214, 294, 374, 454, 534 */}
              {['E-31','E-32','E-33','E-34','E-41'].map((label, i) => (
                <Pill key={label} x={214 + i * 80} y={356} label={label}/>
              ))}
              {/* Pills row 2 */}
              {['E-43','E-44','E-45','E-46','E-47'].map((label, i) => (
                <Pill key={label} x={214 + i * 80} y={390} label={label}/>
              ))}

              {/* ── Bus line out of wrapper → XML ── */}
              <line x1={390} y1={422} x2={390} y2={440}
                stroke={c.az.stroke} strokeWidth={1} strokeOpacity={0.35}
                markerEnd="url(#arr)"/>

              {/* ── Node 5: XML generation + signing ── */}
              <Node x={165} y={442} w={450} colors={c.neu}
                title="XML generation + digital signing"
                sub="Type-specific structure · cryptographic signature"
              />

              {/* Split to dual DGII paths */}
              {/* Vertical drop */}
              <line x1={390} y1={492} x2={390} y2={512}
                stroke={c.line} strokeWidth={1.5}/>
              {/* Horizontal fork */}
              <line x1={215} y1={512} x2={565} y2={512}
                stroke={c.line} strokeWidth={1.5}/>
              {/* Drop to left DGII */}
              <line x1={215} y1={512} x2={215} y2={526}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>
              {/* Drop to right DGII */}
              <line x1={565} y1={512} x2={565} y2={526}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 6a: Standard e-CF (DGII) ── */}
              <g>
                <rect x={80} y={528} width={270} height={58} rx={8}
                  fill={c.dgii.fill} stroke={c.dgii.stroke} strokeWidth={1.5}/>
                <text x={215} y={550} textAnchor="middle" dominantBaseline="central"
                  fill={c.dgii.title} fontSize={13} fontWeight={500}>
                  Standard e-CF
                </text>
                <text x={215} y={568} textAnchor="middle" dominantBaseline="central"
                  fill={c.dgii.sub} fontSize={11} fillOpacity={0.8}>
                  9 of 10 invoice types
                </text>
              </g>

              {/* ── Node 6b: Summary flow (DGII) ── */}
              <g>
                <rect x={430} y={528} width={270} height={58} rx={8}
                  fill={c.dgii.fill} stroke={c.dgii.stroke} strokeWidth={1.5}/>
                <text x={565} y={550} textAnchor="middle" dominantBaseline="central"
                  fill={c.dgii.title} fontSize={13} fontWeight={500}>
                  Summary flow
                </text>
                <text x={565} y={568} textAnchor="middle" dominantBaseline="central"
                  fill={c.dgii.sub} fontSize={11} fillOpacity={0.8}>
                  E-32 below threshold
                </text>
              </g>

              {/* Merge from both DGII → status */}
              <line x1={215} y1={586} x2={215} y2={604}
                stroke={c.line} strokeWidth={1.5}/>
              <line x1={565} y1={586} x2={565} y2={604}
                stroke={c.line} strokeWidth={1.5}/>
              <line x1={215} y1={604} x2={565} y2={604}
                stroke={c.line} strokeWidth={1.5}/>
              <line x1={390} y1={604} x2={390} y2={618}
                stroke={c.line} strokeWidth={1.5} markerEnd="url(#arr)"/>

              {/* ── Node 7: DGII Response → ERPNext ── */}
              <Node x={130} y={620} w={520} colors={c.erp}
                title="DGII response → ERPNext"
                sub="Status · security code · real-time user notification"
              />

              {/* Footer note */}
              <text
                x={390} y={694}
                textAnchor="middle" dominantBaseline="central"
                fill={c.note} fontSize={10}
              >
                Hourly scheduler monitors pending invoices and flags unresolved
                submissions for operator follow-up
              </text>
            </svg>
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
              Full design and implementation, end to end — from the ERPNext server scripts
              and client-side validation, through the Azure Function orchestration layer,
              to the Logic App workflows and final DGII submission.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
              What it solves
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dominican law requires every taxable transaction to be submitted to the DGII
              as an e-CF. Failed submissions consume government-issued NCF numbers that
              can&apos;t be recovered — so pre-validation and reliable delivery matter significantly.
              Most invoices clear DGII in under 5 seconds.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
              Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'C# / Azure Functions',
                'Azure Logic Apps',
                'ERPNext',
                'Python',
                'XSLT / XML',
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-gray-900 border border-white/10 text-gray-400"
                >
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
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
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