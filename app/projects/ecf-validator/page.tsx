import { pageMetadata } from '@/lib/site'
import ProjectPage from '@/components/ProjectPage'
import ValidatorMockup from './ValidatorMockup'


export const metadata = pageMetadata({
  title: 'ECF XML Validator — Gary De la Cruz',
  description:
    'A free, open-source validator for Dominican Republic e-CF invoice XML — official DGII XSD schemas plus 60+ business rules, with inline highlighting and plain-language messages. Live at ecf-validator.garydelacruz.dev.',
  path: '/projects/ecf-validator',
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

// ── What it checks (shipped) ──────────────────────────────────────────────

const capabilities = [
  {
    label: 'Schema & structure',
    items: [
      'Official DGII XSD validation for all 10 e-CF types, the RFCE summary, and the ARECF / ACECF / ANECF response documents',
      'Document type detected automatically — the right schema is picked for you',
      'Packed or minified XML is beautified before display',
    ],
  },
  {
    label: 'Identity & sequences',
    items: [
      'RNC and cédula check-digit validation, plus a live taxpayer lookup',
      'eNCF prefix ↔ TipoeCF consistency',
      'Province and municipality codes checked against DGII tables',
    ],
  },
  {
    label: 'Math',
    items: [
      'ITBIS rates, subtotals, additional taxes and MontoTotal recalculated and compared with the declared amounts',
      'Export totals for E-46 (CIF = FOB + insurance + freight + other costs)',
      'Foreign-currency (OtraMoneda) conversions verified',
    ],
  },
  {
    label: 'Business rules & dates',
    items: [
      '60+ DGII business rules — required-if fields and sections forbidden by invoice type',
      'Future FechaHoraFirma detection, with a hint when a UTC / GMT-4 mismatch is the likely cause',
      'Digital signature presence detected — pre-signature and signed XML both accepted',
    ],
  },
]

const stats = [
  { num: '14', label: 'DGII document formats' },
  { num: '60+', label: 'Business rules' },
  { num: '4', label: 'Severity levels' },
  { num: '51', label: 'Automated tests' },
]

const nextUp = [
  'Cryptographic signature verification — not just presence',
  'Batch mode for validating many XMLs at once',
  'Exportable error reports',
]

const LIVE_URL = 'https://ecf-validator.garydelacruz.dev'
const REPO_URL = 'https://github.com/gary4gld/ecf-validator'

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EcfValidatorPage() {
  return (
    <ProjectPage title="ECF XML Validator">

      {/* ── Header ── */}
      <header className="pt-16 pb-12 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-400">
              Open Source · Live
            </span>
            <span className="text-xs text-gray-400">Personal project</span>
          </div>
          <h1 className="display text-4xl font-normal mb-4">ECF XML Validator</h1>
          <p className="text-gray-300 text-sm max-w-2xl leading-relaxed">
            A developer tool for validating Dominican Republic e-CF invoice XML against
            official DGII XSD schemas. It highlights every issue in context — breaking
            errors, math discrepancies, conditional warnings, and informational notes —
            with human-readable messages instead of the vague feedback DGII gives you.
            Validation runs in your browser — the XML itself is never uploaded.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-gray-950 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Open the validator ↗
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-white/20 text-sm text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              View source on GitHub ↗
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 max-w-2xl">
            {stats.map(({ num, label }) => (
              <div key={label} className="bg-gray-900 border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-medium text-white">{num}</div>
                <div className="text-xs text-gray-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Problem statement ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">
              The problem
            </span>
            <h2 className="display text-2xl font-normal mt-3 mb-4">
              DGII tells you something is wrong. That&apos;s usually all it tells you.
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nine times out of ten, the most you get from DGII is a field name and
              a generic error code — no indication of what the correct value should
              be, no hint at why your structure is wrong, no explanation of which
              conditional rule you violated. During the certification process you get
              slightly more context, but it&apos;s still limited and cryptic.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mt-4">
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
              <div key={label} className="bg-gray-900 border border-white/10 rounded-xl p-4">
                <div className="text-xs font-medium text-gray-400 mb-2">{label}</div>
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
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">
              Interface
            </span>
            <h2 className="display text-2xl font-normal mt-2">What it looks like</h2>
            <p className="text-gray-300 text-sm mt-2">
              A simplified demo of the real interface. Click any issue to jump to its line — and back.{' '}
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                Try it with your own XML ↗
              </a>
            </p>
          </div>
          <ValidatorMockup />
        </div>
      </section>

      {/* ── Severity levels ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">
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
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What it checks ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">
              Coverage
            </span>
            <h2 className="display text-2xl font-normal mt-2">What it checks.</h2>
            <p className="text-gray-300 text-sm mt-2">
              Everything below is live today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {capabilities.map(({ label, items }) => (
              <div key={label} className="bg-gray-900 border border-white/10 rounded-xl p-5">
                <div className="text-sm font-medium text-white mb-4">{label}</div>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">
              Next up
            </div>
            <ul className="space-y-2">
              {nextUp.map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Open source ── */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">
              Open source
            </span>
            <h2 className="display text-2xl font-normal mt-3 mb-4">
              Free to use. Free to read.
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              The validator is a Next.js app written in TypeScript. Rules are organized by
              category — format, math, conditional fields, sequences, registry — and a Vitest
              suite runs valid and deliberately broken XML fixtures against the engine.
            </p>
          </div>
          <div className="space-y-3 mt-2">
            {[
              { label: 'Web app', sub: 'ecf-validator.garydelacruz.dev', href: LIVE_URL },
              { label: 'Source code', sub: 'github.com/gary4gld/ecf-validator', href: REPO_URL },
            ].map(({ label, sub, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 border border-white/10 rounded-xl px-4 py-3 hover:border-blue-500/40 transition-colors"
              >
                <div>
                  <div className="text-sm text-white font-medium">{label}</div>
                  <div className="text-xs text-gray-300 mt-0.5">{sub}</div>
                </div>
                <span className="text-xs text-blue-400 shrink-0">Open ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

    </ProjectPage>
  )
}