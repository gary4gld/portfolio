'use client'

import { useEffect, useRef } from 'react'
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

// ── Severity levels shown in the features section ─────────────────────────

const severities = [
  {
    dot: 'bg-red-500',
    border: 'border-red-500/30',
    text: 'text-red-400',
    bg: 'bg-red-950/40',
    label: 'Breaking error',
    desc: 'DGII will reject — missing required fields, invalid RNC, wrong field names, schema violations.',
  },
  {
    dot: 'bg-orange-400',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    bg: 'bg-orange-950/40',
    label: 'Math discrepancy',
    desc: 'Calculated ITBIS, totals, or retentions don\'t match the declared amounts.',
  },
  {
    dot: 'bg-yellow-400',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    bg: 'bg-yellow-950/40',
    label: 'Conditional warning',
    desc: 'Invoice passes as Aceptado Condicional — phone too long, address over character limit.',
  },
  {
    dot: 'bg-blue-400',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    bg: 'bg-blue-950/40',
    label: 'Informational',
    desc: 'Not an error — signature absent, unusual date gap, or a deprecated field in use.',
  },
  {
    dot: 'bg-emerald-400',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/40',
    label: 'All clear',
    desc: 'No issues found — the entire XML highlights in green.',
  },
]

// ── Roadmap ───────────────────────────────────────────────────────────────

const phases = [
  {
    label: 'MVP',
    status: 'In development',
    statusStyle: 'bg-emerald-950 text-emerald-400',
    items: [
      'Paste or upload XML — pre-signature and signed both accepted',
      'Auto-beautify packed XML before displaying',
      'Invoice type detection → correct XSD schema selected automatically',
      'Full schema validation against official DGII XSD files',
      'RNC checksum validation (catches typos without a database lookup)',
      'eNCF prefix ↔ TipoeCF consistency check',
      'Signature presence detection — noted if absent',
      'Inline highlighting with 4 severity levels',
      'Clickable error panel — human-readable messages in Spanish',
    ],
  },
  {
    label: 'v1.1',
    status: 'Planned',
    statusStyle: 'bg-gray-900 text-gray-500',
    items: [
      'Math validation — ITBIS calculations, totals, retention amounts',
      'Date sanity checks — FechaEmision, FechaHoraFirma, future dates',
    ],
  },
  {
    label: 'v1.2',
    status: 'Planned',
    statusStyle: 'bg-gray-900 text-gray-500',
    items: [
      'Full conditional field logic — required-if rules by invoice type and buyer category',
      'Field documentation on hover — the DGII spec for each field, inline',
    ],
  },
  {
    label: 'v2',
    status: 'Planned',
    statusStyle: 'bg-gray-900 text-gray-500',
    items: [
      'Signature integrity verification — validate the cryptographic signature, not just its presence',
      'Batch mode — validate multiple XMLs at once',
      'Exportable error report',
    ],
  },
]

// ── Validator mockup component ─────────────────────────────────────────────
// Static shell rendered by React; content injected by useEffect after mount.
// Event delegation handles clicks — no window globals needed.

function ValidatorMockup() {
  const xmlRef  = useRef<HTMLDivElement>(null)
  const errRef  = useRef<HTMLDivElement>(null)
  const badgRef = useRef<HTMLDivElement>(null)
  const curRef  = useRef<string | null>(null)

  useEffect(() => {
    type Sev = 'red' | 'orange' | 'yellow' | 'blue'
    type Cfg = { h: string; r: string; v: string }
    const K: Record<Sev, Cfg> = {
      red:    { h: '#ef4444', r: '239,68,68',  v: '#fca5a5' },
      orange: { h: '#f97316', r: '249,115,22', v: '#fdba74' },
      yellow: { h: '#eab308', r: '234,179,8',  v: '#fde047' },
      blue:   { h: '#60a5fa', r: '96,165,250', v: '#93c5fd' },
    }

    const errs = [
      { id: 'e1', sev: 'red'    as Sev, field: 'eNCF',         line: 7,   msg: 'El prefijo <b>E33</b> no corresponde al TipoeCF <b>31</b>. El comprobante debe iniciar con E31.' },
      { id: 'e2', sev: 'red'    as Sev, field: 'RNCComprador',  line: 17,  msg: 'Campo obligatorio ausente. RNCComprador es requerido para toda factura E-31 (Crédito Fiscal).' },
      { id: 'm1', sev: 'orange' as Sev, field: 'MontoTotal',    line: 26,  msg: 'MontoGravadoI1 (9,840.00) + TotalITBIS (1,771.20) = <b>11,611.20</b>, no 12,000.00.' },
      { id: 'w1', sev: 'yellow' as Sev, field: 'CorreoEmisor',  line: 15,  msg: '87 caracteres — máximo: 80. Aceptado condicionalmente.' },
      { id: 'n1', sev: 'blue'   as Sev, field: 'FechaEmision',  line: 14,  msg: 'Emisión (2020) difiere 5 años de FechaHoraFirma (2025). Inusual pero no es un error.' },
      { id: 'n2', sev: 'blue'   as Sev, field: 'FirmaDigital',  line: null,msg: 'Sin firma digital. XML válido como pre-firma. Requerida antes de enviar a DGII.' },
    ]

    const xmlLines: [number, string | null, Sev | null, string][] = [
      [1,  null, null,     '<?xml version="1.0" encoding="utf-8"?>'],
      [2,  null, null,     '<ECF>'],
      [3,  null, null,     '  <Encabezado>'],
      [4,  null, null,     '    <Version>1.0</Version>'],
      [5,  null, null,     '    <IdDoc>'],
      [6,  null, null,     '      <TipoeCF>31</TipoeCF>'],
      [7,  'e1', 'red',    '      <eNCF>E330000000012</eNCF>'],
      [8,  null, null,     '      <FechaVencimientoSecuencia>31-12-2025</FechaVencimientoSecuencia>'],
      [9,  null, null,     '      <TipoPago>1</TipoPago>'],
      [10, null, null,     '    </IdDoc>'],
      [11, null, null,     '    <Emisor>'],
      [12, null, null,     '      <RNCEmisor>132984651</RNCEmisor>'],
      [13, null, null,     '      <RazonSocialEmisor>MANUFACTURA INDUSTRIAL SRL</RazonSocialEmisor>'],
      [14, 'n1', 'blue',   '      <FechaEmision>03-06-2020</FechaEmision>'],
      [15, 'w1', 'yellow', '      <CorreoEmisor>administracion.facturas.comercial.2025@grupo-manufactura-industrial-dominicana.com.do</CorreoEmisor>'],
      [16, null, null,     '    </Emisor>'],
      [17, 'e2', 'red',    '    <Comprador>'],
      [18, 'e2', 'red',    '      <!-- RNCComprador: campo obligatorio ausente para E-31 -->'],
      [19, null, null,     '      <RazonSocialComprador>DISTRIBUIDORA CENTRAL SA</RazonSocialComprador>'],
      [20, null, null,     '    </Comprador>'],
      [21, null, null,     '    <Totales>'],
      [22, null, null,     '      <MontoGravadoI1>9840.00</MontoGravadoI1>'],
      [23, null, null,     '      <ITBIS1>18</ITBIS1>'],
      [24, null, null,     '      <TotalITBIS1>1771.20</TotalITBIS1>'],
      [25, null, null,     '      <TotalITBIS>1771.20</TotalITBIS>'],
      [26, 'm1', 'orange', '      <MontoTotal>12000.00</MontoTotal>'],
      [27, null, null,     '    </Totales>'],
      [28, null, null,     '  </Encabezado>'],
      [29, null, null,     '  <FechaHoraFirma>29-07-2025 14:30:00</FechaHoraFirma>'],
      [30, null, null,     '</ECF>'],
    ]

    function colorize(raw: string, sev: Sev | null): string {
      const vc = sev ? K[sev].v : '#86efac'
      let s = raw.replace(/&/g, '&amp;').replace(/</g, '\x01').replace(/>/g, '\x02')
      s = s.replace(/\x01!--([\s\S]*?)--\x02/g, `<em style="color:#6e7681">\x01!--$1--\x02</em>`)
      s = s.replace(/\x01\?([\s\S]*?)\?\x02/g, `<span style="color:#484f58">\x01?$1?\x02</span>`)
      s = s.replace(
        /(\x01\/?[\w]+\x02)([^\x01]*)(\x01\/[\w]+\x02)/g,
        (_, o, v, c) => {
          const T = 'style="color:#7dd3fc"'
          return (
            o.replace(/\x01(\/?[\w]+)\x02/, `<span ${T}>\x01$1\x02</span>`) +
            (v ? `<span style="color:${vc}">${v}</span>` : '') +
            c.replace(/\x01(\/?[\w]+)\x02/, `<span ${T}>\x01$1\x02</span>`)
          )
        },
      )
      s = s.replace(/\x01(\/?[\w]+)\x02/g, '<span style="color:#7dd3fc">\x01$1\x02</span>')
      return s.replace(/\x01/g, '&lt;').replace(/\x02/g, '&gt;')
    }

    function pick(id: string) {
      const prev = curRef.current
      if (prev) {
        const pc = errRef.current?.querySelector<HTMLElement>(`[data-id="${prev}"]`)
        if (pc) pc.style.outline = 'none'
        xmlRef.current?.querySelectorAll<HTMLElement>(`[data-lid="${prev}"]`).forEach(el => { el.style.filter = '' })
      }
      curRef.current = id
      const card = errRef.current?.querySelector<HTMLElement>(`[data-id="${id}"]`)
      if (card) {
        card.style.outline = '1.5px solid rgba(255,255,255,0.2)'
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
      const lines = xmlRef.current?.querySelectorAll<HTMLElement>(`[data-lid="${id}"]`)
      lines?.forEach(el => { el.style.filter = 'brightness(1.35)' })
      if (lines?.length) lines[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    // Badges
    if (badgRef.current) {
      badgRef.current.innerHTML = (
        [
          [K.red,    '2 errores'],
          [K.orange, '1 discrepancia'],
          [K.yellow, '1 advertencia'],
          [K.blue,   '2 notas'],
        ] as [Cfg, string][]
      )
        .map(([c, t]) => `<span style="font-size:11px;background:rgba(${c.r},0.12);color:${c.v};padding:3px 10px;border-radius:20px;border:0.5px solid rgba(${c.r},0.3);display:inline-flex;align-items:center;gap:5px"><span style="width:6px;height:6px;border-radius:50%;background:${c.h}"></span>${t}</span>`)
        .join('')
    }

    // XML pane
    if (xmlRef.current) {
      xmlRef.current.innerHTML = xmlLines
        .map(([n, eid, sev, text]) => {
          const s = sev ? K[sev] : null
          const ls = s
            ? `background:rgba(${s.r},0.07);border-left:4px solid ${s.h};box-shadow:inset 8px 0 28px rgba(${s.r},0.09)`
            : 'border-left:4px solid transparent'
          const nc = s ? s.h : '#484f58'
          const attrs = eid
            ? `data-lid="${eid}" style="display:flex;cursor:pointer;${ls}"`
            : `style="display:flex;${ls}"`
          return `<div ${attrs}><span style="width:34px;min-width:34px;text-align:right;padding-right:12px;color:${nc};font-size:11px;opacity:${s ? 0.9 : 0.45};user-select:none;padding-top:1px">${n}</span><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;color:#e6edf3;padding-right:10px">${colorize(text, sev)}</span></div>`
        })
        .join('')

      xmlRef.current.addEventListener('click', e => {
        const t = (e.target as HTMLElement).closest('[data-lid]') as HTMLElement | null
        if (t?.dataset.lid) pick(t.dataset.lid)
      })
    }

    // Error pane
    if (errRef.current) {
      errRef.current.innerHTML =
        `<div style="font-size:10px;color:#4b5563;letter-spacing:.08em;text-transform:uppercase;font-weight:500;margin-bottom:10px">6 issues encontrados</div>` +
        errs
          .map(e => {
            const c = K[e.sev]
            const lr = e.line ? `línea ${e.line}` : 'documento'
            return `<div data-id="${e.id}" style="padding:10px 12px;border-radius:8px;margin-bottom:6px;cursor:pointer;border-left:3px solid ${c.h};border-top:0.5px solid rgba(255,255,255,0.07);border-right:0.5px solid rgba(255,255,255,0.07);border-bottom:0.5px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.03)"><div style="display:flex;align-items:center;gap:6px;margin-bottom:5px"><span style="width:7px;height:7px;border-radius:50%;background:${c.h};flex-shrink:0"></span><code style="font-size:11px;font-weight:500;color:${c.h};font-family:monospace">&lt;${e.field}&gt;</code></div><p style="font-size:11px;color:#9ca3af;line-height:1.55;margin:0 0 5px">${e.msg}</p><span style="font-size:10px;color:#4b5563">${lr}</span></div>`
          })
          .join('')

      errRef.current.addEventListener('click', e => {
        const t = (e.target as HTMLElement).closest('[data-id]') as HTMLElement | null
        if (t?.dataset.id) pick(t.dataset.id)
      })
    }
  }, [])

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden text-sm">
      {/* Mockup header */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 border-b border-white/10 bg-gray-900">
        <div className="flex items-center gap-3">
          <span className="font-medium text-white">ECF XML Validator</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950 text-blue-300">
            In development
          </span>
        </div>
        <div className="flex gap-2">
          {['Paste XML', 'Upload file'].map(label => (
            <button
              key={label}
              className="text-xs px-3 py-1.5 rounded border border-white/15 text-gray-400 cursor-default"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Result bar */}
      <div className="flex items-center flex-wrap gap-2 px-4 py-2 border-b border-white/10 bg-gray-950">
        <span className="text-xs text-gray-500">
          E-31 · Factura de Crédito Fiscal ·{' '}
          <span className="text-blue-400">pre-firma</span>
        </span>
        <div ref={badgRef} className="flex gap-1.5 flex-wrap ml-auto" />
      </div>

      {/* Split pane */}
      <div className="flex items-start">
        <div
          ref={xmlRef}
          className="flex-1 min-w-0 py-3 border-r border-white/[0.07]"
          style={{
            fontFamily: "'Courier New', Consolas, monospace",
            fontSize: '12px',
            lineHeight: '1.92',
            background: '#0d1117',
            minHeight: '680px',
          }}
        />
        <div
          ref={errRef}
          className="py-3 px-3 bg-gray-950 shrink-0"
          style={{ width: '264px', minHeight: '680px' }}
        />
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EcfValidatorPage() {
  return (
    <div
      className={`min-h-screen bg-gray-950 text-white ${dmSans.variable} ${instrumentSerif.variable}`}
      style={{ fontFamily: 'var(--font-body), sans-serif' }}
    >
      <style>{`.display { font-family: var(--font-display), Georgia, serif; }`}</style>

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
            ← Gary De la Cruz
          </Link>
          <span className="text-gray-700 text-sm">/</span>
          <span className="text-sm text-gray-400">ECF XML Validator</span>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="pt-16 pb-12 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-400">
              Open Source · In Development
            </span>
            <span className="text-xs text-gray-600">Personal project</span>
          </div>
          <h1 className="display text-4xl font-normal mb-4">ECF XML Validator</h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            A developer tool for validating Dominican Republic e-CF invoice XML against
            official DGII XSD schemas. It highlights every issue in context — breaking
            errors, math discrepancies, conditional warnings, and informational notes —
            with human-readable messages instead of the vague feedback DGII gives you.
          </p>
        </div>
      </header>

      {/* ── Problem statement ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              The problem
            </span>
            <h2 className="display text-2xl font-normal mt-3 mb-4">
              DGII tells you something is wrong. That&apos;s usually all it tells you.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nine times out of ten, the most you get from DGII is a field name and
              a generic error code — no indication of what the correct value should
              be, no hint at why your structure is wrong, no explanation of which
              conditional rule you violated. During the certification process you get
              slightly more context, but it&apos;s still limited and cryptic.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Developers end up debugging invoices blind: resubmitting, getting the
              same error, changing one field at a time, burning limited government-issued
              NCF sequences in the process.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'What DGII says', text: '"Campo RNCComprador invalido."', dim: false },
              { label: 'What you need to know', text: 'RNCComprador is required for all E-31 invoices. Your buyer must have a valid RNC (or cedula). The field cannot be omitted even if the buyer name is present.', dim: false },
            ].map(({ label, text }) => (
              <div key={label} className="bg-gray-900 rounded-xl p-4">
                <div className="text-xs font-medium text-gray-500 mb-2">{label}</div>
                <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mockup ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              Interface
            </span>
            <h2 className="display text-2xl font-normal mt-2">What it looks like</h2>
            <p className="text-gray-400 text-sm mt-2">
              Click any error card to jump to the highlighted XML line — and back.
            </p>
          </div>
          <ValidatorMockup />
        </div>
      </section>

      {/* ── Severity levels ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              Highlighting
            </span>
            <h2 className="display text-2xl font-normal mt-2">Five states, immediately readable</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {severities.map(({ dot, border, text, bg, label, desc }) => (
              <div
                key={label}
                className={`${bg} border ${border} rounded-xl p-4`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${dot} shrink-0`} />
                  <span className={`text-sm font-medium ${text}`}>{label}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              Roadmap
            </span>
            <h2 className="display text-2xl font-normal mt-2">Built in phases.</h2>
            <p className="text-gray-400 text-sm mt-2">
              Shipping a useful MVP first, then expanding. No feature creep.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {phases.map(({ label, status, statusStyle, items }) => (
              <div key={label} className="bg-gray-900 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-white">{label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyle}`}>
                    {status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open source ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              Open source
            </span>
            <h2 className="display text-2xl font-normal mt-3 mb-4">
              Two things, one project.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              The core validator logic will be published as a TypeScript npm package —
              so other developers can integrate it into their own tooling without
              depending on this interface. The web app is both a showcase of the
              package and a standalone tool anyone can use.
            </p>
          </div>
          <div className="space-y-3 mt-2">
            {[
              { label: 'npm package', sub: 'Core validator — importable in any TypeScript project', tag: 'Coming soon' },
              { label: 'Web interface', sub: 'This tool — open source on GitHub', tag: 'Coming soon' },
            ].map(({ label, sub, tag }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 border border-white/10 rounded-xl px-4 py-3"
              >
                <div>
                  <div className="text-sm text-white font-medium">{label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{sub}</div>
                </div>
                <span className="text-xs text-gray-600 shrink-0">{tag}</span>
              </div>
            ))}
            <a
              href="https://github.com/gary4gld"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-400 px-4 py-3 border border-white/10 rounded-xl hover:border-white/20 hover:text-white transition-colors"
            >
              GitHub — gary4gld
            </a>
          </div>
        </div>
      </section>

      {/* ── Back link ── */}
      <div className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
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