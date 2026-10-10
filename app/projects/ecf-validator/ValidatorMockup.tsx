'use client'

import { useEffect, useRef } from 'react'

// ── Validator mockup component ─────────────────────────────────────────────
// Static shell rendered by React; content injected by useEffect after mount.
// Event delegation handles clicks — no window globals needed.

export default function ValidatorMockup() {
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
          return `<div ${attrs}><span style="width:34px;min-width:34px;text-align:right;padding-right:12px;color:${nc};font-size:11px;opacity:${s ? 0.9 : 0.45};user-select:none;padding-top:1px">${n}</span><span style="flex:1;min-width:0;white-space:pre;color:#e6edf3;padding-right:16px">${colorize(text, sev)}</span></div>`
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
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400">
            Interactive demo
          </span>
        </div>
        <div className="hidden sm:flex gap-2">
          {['Paste XML', 'Upload file'].map(label => (
            <button
              key={label}
              className="text-xs px-3 py-1.5 rounded border border-white/15 text-gray-300 cursor-default"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Result bar */}
      <div className="flex items-center flex-wrap gap-2 px-4 py-2 border-b border-white/10 bg-gray-950">
        <span className="text-xs text-gray-400">
          E-31 · Factura de Crédito Fiscal ·{' '}
          <span className="text-blue-400">pre-firma</span>
        </span>
        <div ref={badgRef} className="flex gap-1.5 flex-wrap ml-auto" />
      </div>

      {/* Split pane */}
      {/* Stacks on small screens; side by side from md up. The XML pane
          scrolls horizontally on its own so long lines never widen the page. */}
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="flex-1 min-w-0 overflow-x-auto border-b md:border-b-0 md:border-r border-white/[0.07] md:min-h-[680px]" style={{ background: '#0d1117' }}>
          <div
            ref={xmlRef}
            className="py-3 w-max min-w-full"
            style={{
              fontFamily: "'Courier New', Consolas, monospace",
              fontSize: '12px',
              lineHeight: '1.92',
            }}
          />
        </div>
        <div
          ref={errRef}
          className="py-3 px-3 bg-gray-950 w-full md:w-[264px] md:shrink-0 md:min-h-[680px]"
        />
      </div>
    </div>
  )
}
