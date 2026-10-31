import Link from 'next/link'
import HomeNav from '@/components/HomeNav'
import ScrollReveal from '@/components/ScrollReveal'
import SiteFooter from '@/components/SiteFooter'
import { LinkedInIcon, GitHubIcon, MailIcon } from '@/components/icons'
import CopyEmailButton from '@/components/CopyEmailButton'
import ProjectVisual from '@/components/ProjectVisual'

// ── Data ──────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: 'DGII e-CF Electronic Invoicing System',
    visual: 'ecf-pipeline' as const,
    employer: 'Neural Software Solutions, SRL',
    badge: 'Enterprise · Compliance',
    badgeStyle: 'bg-blue-950 text-blue-300',
    description:
      "End-to-end compliance pipeline connecting ERPNext to the Dominican Republic's DGII tax authority. Covers all 10 mandated e-CF invoice types — automated XML generation, dual-path submission, and real-time status tracking. A pre-validation layer catches format errors before they reach DGII, protecting government-issued invoice sequences. Most invoices clear DGII in under 5 seconds.",
    role: 'Full design & implementation, end to end.',
    tags: ['C# / Azure Functions', 'Azure Logic Apps', 'ERPNext', 'Python', 'XSLT / XML'],
    links: [{ label: 'View architecture →', href: '/projects/dgii-ecf' }],
  },
  {
    title: 'OCR Invoice Ingestion Pipeline',
    visual: 'ocr' as const,
    employer: 'Neural Software Solutions, SRL',
    badge: 'Enterprise · AI',
    badgeStyle: 'bg-blue-950 text-blue-300',
    description:
      "AI-powered invoice ingestion for the accounting team. Upload a photo or PDF through a custom web form, get a fully registered Purchase Invoice in ERPNext. Azure Document Intelligence handles extraction; a Logic App routes the result — auto-creating suppliers from the DGII registry when they don't exist, handling errors gracefully, and improving accuracy with each invoice processed.",
    role: 'End-to-end: OCR integration, Logic App workflows, ERPNext, custom web form.',
    tags: ['Azure Document Intelligence', 'Azure Logic Apps', 'Angular', 'ERPNext', 'Python'],
    links: [{ label: 'View details →', href: '/projects/ocr-pipeline' }],
  },
  {
    title: 'ECF XML Validator',
    visual: 'validator' as const,
    employer: null,
    badge: 'Free to use · Live',
    badgeStyle: 'bg-emerald-950 text-emerald-400',
    description:
      "A free web tool that checks Dominican Republic e-CF invoice XML before it reaches DGII. It validates every document type against the official XSD schemas plus 60+ DGII business rules — math, conditional fields, RNC check digits, sequence and date logic — and explains each issue in plain Spanish, right on the offending line. Built because DGII's own feedback rarely tells you what's actually wrong.",
    role: 'Personal project — rules engine, UI, and test suite.',
    tags: ['TypeScript', 'Next.js', 'XSD / XML', 'Vitest'],
    links: [
      { label: 'Try it live ↗', href: 'https://ecf-validator.garydelacruz.dev' },
      { label: 'How it works →', href: '/projects/ecf-validator' },
      { label: 'Source on GitHub ↗', href: 'https://github.com/gary4gld/ecf-validator' },
    ],
  },
]

const experience = [
  {
    period: '2023 – Present',
    role: 'Full-Stack Software Developer',
    org: 'Neural Software Solutions, SRL',
    summary:
      'Build and maintain web applications, APIs and enterprise integrations. Designed and delivered the DGII e-CF electronic invoicing system and the OCR invoice ingestion pipeline end to end.',
    tags: ['C# / .NET', 'Azure Functions', 'Azure Logic Apps', 'ERPNext', 'Angular', 'Python'],
  },
  {
    period: '2020',
    role: 'Software Developer Intern · Scrum Master',
    org: 'OpenActuary Project, Westfield State University',
    summary:
      'Helped build an online examination platform that is still live today, working across database, backend, frontend and API code, and ran the team’s Agile sprints.',
    tags: ['Node.js', 'React Native', 'Scrum'],
    link: { label: 'openactuary.org', href: 'https://openactuary.org' },
  },
]

const education = [
  {
    degree: 'B.S. Computer Science, minor in Mathematics',
    school: 'Westfield State University',
    period: '2017 – 2020',
  },
  {
    degree: 'A.S. Computer Systems and Technology',
    school: 'Springfield Technical Community College',
    period: '2011 – 2015',
  },
]

const skillGroups = [
  {
    category: 'Cloud & integrations',
    skills: ['Azure Functions', 'Logic Apps', 'Doc Intelligence', 'Table Storage', 'Docker'],
  },
  {
    category: 'Languages',
    skills: ['C#', 'TypeScript', 'Python', 'JavaScript', 'Java', 'C++'],
  },
  {
    category: 'Frontend',
    skills: ['Angular', 'React', 'Next.js', 'Svelte'],
  },
  {
    category: 'Backend & data',
    skills: ['.NET', 'Node.js', 'ERPNext', 'SQL Server', 'MySQL', 'SQLite', 'Entity Framework'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Postman'],
  },
]

// Structured data for search engines (schema.org Person). Not visible on the
// page; tells Google this site, LinkedIn and GitHub all belong to one person.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gary De la Cruz',
  url: 'https://www.garydelacruz.dev',
  jobTitle: 'Full-Stack Software Developer',
  email: 'mailto:gary4gld@gmail.com',
  address: { '@type': 'PostalAddress', addressRegion: 'MA', addressCountry: 'US' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Westfield State University' },
  knowsAbout: [
    'C#', '.NET', 'TypeScript', 'Angular', 'Next.js', 'Python', 'Azure Functions',
    'Azure Logic Apps', 'ERPNext', 'Electronic invoicing (DGII e-CF)',
  ],
  knowsLanguage: ['English', 'Spanish'],
  sameAs: [
    'https://www.linkedin.com/in/gary-de-la-cruz-783895119/',
    'https://github.com/gary4gld',
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────
// Server component: all content is rendered as static HTML. Only the nav
// (active section + mobile menu) and the scroll-reveal observer run in the browser.

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
      />
      <HomeNav />
      <ScrollReveal />

      <main id="main">

      {/* ── Hero ── */}
      <section id="hero" className="relative pt-36 pb-28 px-6 dot-grid overflow-hidden">
        <div
          className="absolute pointer-events-none inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 15% 65%, rgba(59,130,246,.08) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-2 mb-6 hero-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            <span className="text-sm text-gray-300">Open to remote roles · willing to relocate</span>
          </div>

          <h1
            className="display font-normal leading-[1.02] tracking-tight mb-4 hero-2"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.25rem)' }}
          >
            Gary De la Cruz
          </h1>
          <p
            className="display text-gray-400 leading-[1.15] mb-6 hero-2"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Full-stack developer &amp; integration specialist.
          </p>

          <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-10 hero-3">
            I build the bridges between enterprise systems and government
            platforms — clean code, real compliance, zero drama.
          </p>

          <div className="flex flex-wrap items-center gap-4 hero-4">
            <a
              href="#projects"
              className="shimmer px-6 py-3 bg-white text-gray-950 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              View my work
            </a>
            <a
              href="/resume/DelaCruz_Gary_SoftwareDeveloper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 text-sm text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              View resume
            </a>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">About</span>
            <h2 className="display text-2xl font-normal mt-3 mb-1">
              A developer who ships in the real world.
            </h2>
            <p className="text-gray-300 text-sm mb-10">
              Not just tutorials — production systems handling government compliance at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4 reveal">
              <p className="text-gray-300 text-sm leading-relaxed">
                I specialize in enterprise integrations —
                connecting ERPNext with tax authorities, building Azure-hosted automation pipelines,
                and shipping Angular frontends that make complex workflows feel simple.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Based in Massachusetts, USA. Fluent in English and Spanish.
              </p>
            </div>

            <div className="grid gap-3 reveal" style={{ transitionDelay: '.08s' }}>
              {[
                { num: '3+', label: 'Years of professional full-stack experience' },
                { num: '6',  label: 'Programming languages used in real-world projects' },
                { num: '4',  label: 'Cloud & enterprise platforms shipped' },
              ].map(({ num, label }) => (
                <div key={label} className="bg-gray-900 border border-white/10 rounded-xl p-4">
                  <div className="text-2xl font-medium text-white">{num}</div>
                  <div className="text-sm text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience & education ───────────────────────────────────────────
          A vertical timeline: a line down the left, one dot per entry. ── */}
      <section id="experience" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-10">
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">Experience</span>
            <h2 className="display text-2xl font-normal mt-3">Experience &amp; education.</h2>
          </div>

          <ol className="relative border-l border-white/10 ml-1.5 space-y-10">
            {experience.map((job, i) => (
              <li key={job.org} className="reveal relative pl-8" style={{ transitionDelay: `${i * 80}ms` }}>
                <span
                  className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-blue-400 ring-4 ring-gray-950"
                  aria-hidden="true"
                />
                <div className="text-xs font-medium text-blue-400 mb-1">{job.period}</div>
                <h3 className="text-base font-medium text-white">{job.role}</h3>
                <div className="text-sm text-gray-400 mb-3">{job.org}</div>
                <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mb-3">
                  {job.summary}
                  {job.link && (
                    <>
                      {' '}
                      <a
                        href={job.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {job.link.label} ↗
                      </a>
                    </>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}

            <li className="reveal relative pl-8" style={{ transitionDelay: `${experience.length * 80}ms` }}>
              {/* Hollow dot marks education apart from work entries */}
              <span
                className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full border-2 border-blue-400 bg-gray-950 ring-4 ring-gray-950"
                aria-hidden="true"
              />
              <div className="text-xs font-medium text-blue-400 mb-3">Education</div>
              <ul className="space-y-3 max-w-2xl">
                {education.map((ed) => (
                  <li key={ed.school} className="sm:flex sm:items-baseline sm:justify-between sm:gap-6">
                    <div>
                      <div className="text-sm font-medium text-white">{ed.degree}</div>
                      <div className="text-sm text-gray-400">{ed.school}</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 sm:mt-0 shrink-0">{ed.period}</div>
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────────────────
          Outer div: owns the scroll-reveal (.reveal + transitionDelay).
          Inner div: owns hover effects (transition-all duration-200).
          Keeping them separate prevents the fast hover duration from
          overriding the slower reveal duration. ── */}
      <section id="projects" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">Projects</span>
            <h2 className="display text-2xl font-normal mt-3 mb-1">Things I&apos;ve built.</h2>
            <p className="text-gray-300 text-sm mb-10">
              Production systems — and a side project that actually shipped.
            </p>
          </div>

          <div className="grid gap-4">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="bg-gray-900/40 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 md:grid md:grid-cols-[minmax(0,1fr)_240px] md:gap-8">
                  {/* Illustration: on top on phones, right column from md up */}
                  <div className="mb-5 md:mb-0 md:order-2 md:pt-1 max-w-[320px] md:max-w-none">
                    <ProjectVisual kind={project.visual} />
                  </div>
                  <div className="md:order-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${project.badgeStyle}`}>
                      {project.badge}
                    </span>
                    {project.employer && (
                      <span className="text-xs text-gray-400">{project.employer}</span>
                    )}
                  </div>

                  <h3 className="text-base font-medium text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">{project.description}</p>

                  {project.role && (
                    <p className="text-xs text-gray-400 mb-4">
                      <span className="text-gray-400">Role: </span>
                      {project.role}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-white/5">
                    {project.links.map((link) =>
                      link.href.startsWith('http') ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {link.label}
                        </Link>
                      )
                    )}
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          {/* mb-10 on the reveal wrapper provides spacing between the
              heading block and the skill cards. Cleaner than a spacer div. */}
          <div className="reveal mb-10">
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">Skills</span>
            <h2 className="display text-2xl font-normal mt-3">What I work with.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillGroups.map(({ category, skills }, i) => (
              <div
                key={category}
                className={`reveal bg-gray-900 border border-white/10 rounded-xl p-5 ${
                  // An odd last card spans the full row instead of leaving a gap
                  i === skillGroups.length - 1 && skillGroups.length % 2 === 1 ? 'sm:col-span-2' : ''
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-xs font-medium text-gray-400 mb-3">{category}</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-full border border-white/10 text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">Contact</span>
            <h2 className="display text-2xl font-normal mt-3 mb-10">Let&apos;s build something.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Open to full-time roles — remote, hybrid, or on-site with relocation — as well as
                freelance integrations and consulting on ERPNext or DGII compliance systems.
                I respond within 24 hours.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="mailto:gary4gld@gmail.com"
                  className="shimmer px-6 py-3 bg-white text-gray-950 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors inline-block"
                >
                  Send me an email
                </a>
                <CopyEmailButton email="gary4gld@gmail.com" />
              </div>
            </div>

            <div className="flex flex-col gap-3 reveal" style={{ transitionDelay: '.08s' }}>
              {[
                {
                  label: 'gary4gld@gmail.com',
                  href: 'mailto:gary4gld@gmail.com',
                  icon: <MailIcon />,
                  external: false,
                },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/gary-de-la-cruz-783895119/',
                  icon: <LinkedInIcon />,
                  external: true,
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/gary4gld',
                  icon: <GitHubIcon />,
                  external: true,
                },
              ].map(({ label, href, icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 text-sm text-gray-300 px-4 py-3 border border-white/10 rounded-xl hover:border-blue-500/40 hover:text-white transition-colors"
                >
                  <span className="text-gray-400 shrink-0">{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  )
}
