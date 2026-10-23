// Small decorative illustrations for the home page project cards.
// Pure SVG in the same colour language as the architecture diagrams on the
// project pages (ERPNext = emerald, Azure = blue, DGII = violet), so they stay
// crisp at any size and never go stale the way screenshots do.

export type ProjectVisualKind = 'ecf-pipeline' | 'ocr' | 'validator'

const C = {
  erp: { fill: '#052e16', stroke: '#059669', text: '#a7f3d0' },
  az: { fill: '#0c1a2e', stroke: '#3b82f6', text: '#bfdbfe' },
  dgii: { fill: '#1a0533', stroke: '#7c3aed', text: '#ddd6fe' },
  line: '#4b5563',
  muted: '#374151',
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g stroke={C.line} strokeWidth={1.5} strokeLinecap="round" fill="none">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <path d={`M${x2 - 4} ${y - 3.5} L${x2} ${y} L${x2 - 4} ${y + 3.5}`} />
    </g>
  )
}

function Box({
  x, y, w, h, c, label, sub,
}: {
  x: number; y: number; w: number; h: number
  c: { fill: string; stroke: string; text: string }
  label: string; sub?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={7} fill={c.fill} stroke={c.stroke} strokeWidth={1.25} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 3 : h / 2)} textAnchor="middle" dominantBaseline="central"
        fill={c.text} fontSize={10} fontWeight={500}>{label}</text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 9} textAnchor="middle" dominantBaseline="central"
          fill={c.text} fillOpacity={0.6} fontSize={7.5}>{sub}</text>
      )}
    </g>
  )
}

function EcfPipeline() {
  const types = ['31', '32', '33', '34', '41', '43', '44', '45', '46', '47']
  return (
    <>
      <Box x={8} y={22} w={62} h={40} c={C.erp} label="ERPNext" sub="invoice" />
      <Arrow x1={73} x2={86} y={42} />
      <Box x={89} y={22} w={62} h={40} c={C.az} label="Azure" sub="validate · sign" />
      <Arrow x1={154} x2={167} y={42} />
      <Box x={170} y={22} w={62} h={40} c={C.dgii} label="DGII" sub="accepted" />
      {types.map((t, i) => {
        const col = i % 5
        const row = Math.floor(i / 5)
        const x = 27 + col * 38
        const y = 88 + row * 24
        return (
          <g key={t}>
            <rect x={x} y={y} width={34} height={18} rx={5} fill="#0f172a" stroke="#6366f1" strokeOpacity={0.7} />
            <text x={x + 17} y={y + 9} textAnchor="middle" dominantBaseline="central" fill="#c7d2fe" fontSize={8.5}>
              E-{t}
            </text>
          </g>
        )
      })}
    </>
  )
}

function Ocr() {
  return (
    <>
      {/* Photo of an invoice */}
      <g>
        <rect x={10} y={22} width={50} height={64} rx={6} fill="#111827" stroke={C.muted} strokeWidth={1.25} />
        {[34, 42, 50, 58].map((y, i) => (
          <rect key={y} x={18} y={y} width={i === 3 ? 20 : 34} height={3} rx={1.5} fill="#6b7280" fillOpacity={0.6} />
        ))}
        <rect x={18} y={68} width={34} height={8} rx={2} fill="#6b7280" fillOpacity={0.35} />
      </g>
      <Arrow x1={64} x2={80} y={54} />
      <Box x={83} y={34} w={70} h={40} c={C.az} label="Doc AI" sub="extract fields" />
      <Arrow x1={157} x2={173} y={54} />
      {/* Registered purchase invoice */}
      <g>
        <rect x={176} y={22} width={54} height={64} rx={6} fill={C.erp.fill} stroke={C.erp.stroke} strokeWidth={1.25} />
        <circle cx={203} cy={46} r={11} fill="none" stroke={C.erp.stroke} strokeWidth={1.5} />
        <path d="M197.5 46.5 L201.5 50.5 L209 42.5" fill="none" stroke="#6ee7b7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <text x={203} y={72} textAnchor="middle" fill={C.erp.text} fontSize={8}>ERPNext</text>
      </g>
      {/* Extracted fields */}
      {[
        ['RNC', 66],
        ['NCF', 54],
        ['Total', 40],
      ].map(([label, w], i) => (
        <g key={label as string}>
          <text x={40} y={110 + i * 14} textAnchor="end" fill="#9ca3af" fontSize={8.5}>{label}</text>
          <rect x={46} y={104 + i * 14} width={w as number} height={8} rx={3} fill={C.az.stroke} fillOpacity={0.35} />
        </g>
      ))}
    </>
  )
}

function Validator() {
  // Indent level and highlight for each mock XML line
  const lines: [number, number, string | null][] = [
    [0, 70, null], [1, 60, null], [2, 82, 'red'], [2, 64, null],
    [1, 50, null], [2, 88, 'orange'], [2, 58, null], [1, 46, 'blue'],
  ]
  const sev: Record<string, string> = { red: '#ef4444', orange: '#f97316', blue: '#60a5fa' }
  return (
    <>
      <rect x={8} y={14} width={150} height={122} rx={7} fill="#0d1117" stroke={C.muted} strokeWidth={1.25} />
      {lines.map(([indent, w, s], i) => {
        const y = 24 + i * 13.5
        return (
          <g key={i}>
            {s && <rect x={9} y={y - 3} width={148} height={11} fill={sev[s]} fillOpacity={0.12} />}
            {s && <rect x={9} y={y - 3} width={2.5} height={11} fill={sev[s]} />}
            <rect x={18 + indent * 10} y={y + 1} width={w} height={3.5} rx={1.75}
              fill={s ? sev[s] : '#7dd3fc'} fillOpacity={s ? 0.8 : 0.45} />
          </g>
        )
      })}
      {(['red', 'orange', 'blue'] as const).map((s, i) => (
        <g key={s}>
          <rect x={166} y={14 + i * 42} width={66} height={36} rx={6} fill="#111827" stroke={sev[s]} strokeOpacity={0.5} />
          <rect x={166} y={14 + i * 42} width={2.5} height={36} rx={1} fill={sev[s]} />
          <circle cx={176} cy={26 + i * 42} r={3} fill={sev[s]} />
          <rect x={183} y={24 + i * 42} width={40} height={3.5} rx={1.75} fill={sev[s]} fillOpacity={0.7} />
          <rect x={174} y={33 + i * 42} width={50} height={3} rx={1.5} fill="#6b7280" fillOpacity={0.5} />
          <rect x={174} y={40 + i * 42} width={34} height={3} rx={1.5} fill="#6b7280" fillOpacity={0.5} />
        </g>
      ))}
    </>
  )
}

export default function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  return (
    <div className="rounded-xl border border-white/10 bg-gray-950/60 overflow-hidden">
      <svg viewBox="0 0 240 150" className="w-full h-auto block" aria-hidden="true" focusable="false">
        {kind === 'ecf-pipeline' && <EcfPipeline />}
        {kind === 'ocr' && <Ocr />}
        {kind === 'validator' && <Validator />}
      </svg>
    </div>
  )
}
