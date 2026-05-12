'use client'

import { useEffect, useState } from 'react'
import { Instrument_Serif, DM_Sans } from 'next/font/google'

// ── Fonts ─────────────────────────────────────────────────────────────────────
// next/font calls must be at module level

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

// ── Data ──────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: 'DGII e-CF Electronic Invoicing System',
    employer: 'Neural Software Solutions, SRL',
    badge: 'Enterprise · Compliance',
    badgeStyle: 'bg-blue-950 text-blue-300',
    description:
      'End-to-end compliance pipeline connecting ERPNext to the Dominican Republic\'s DGII tax authority. Covers all 10 mandated e-CF invoice types — automated XML generation, dual-path submission, and real-time status tracking. A pre-validation layer catches format errors before they reach DGII, protecting government-issued invoice sequences. Most invoices clear DGII in under 5 seconds.',
    role: 'Full design & implementation, end to end.',
    tags: ['C# / Azure Functions', 'Azure Logic Apps', 'ERPNext', 'Python', 'XSLT / XML'],
    links: [{ label: 'View architecture →', href: '#' }],
  },
  {
    title: 'OCR Invoice Ingestion Pipeline',
    employer: 'Neural Software Solutions, SRL',
    badge: 'Enterprise · AI',
    badgeStyle: 'bg-blue-950 text-blue-300',
    description:
      'AI-powered invoice ingestion for the accounting team. Upload a photo or PDF through a custom web form, get a fully registered Purchase Invoice in ERPNext. Azure Document Intelligence handles extraction; a Logic App routes the result — auto-creating suppliers from the DGII registry when they don\'t exist, handling errors gracefully, and improving accuracy with each invoice processed.',
    role: 'End-to-end: OCR integration, Logic App workflows, ERPNext, custom web form.',
    tags: ['Azure Document Intelligence', 'Azure Logic Apps', 'Angular', 'ERPNext', 'Python'],
    links: [{ label: 'View details →', href: '#' }],
  },
  {
    title: 'ECF XML Validator',
    employer: null,
    badge: 'Open Source · In Development',
    badgeStyle: 'bg-emerald-950 text-emerald-400',
    description:
      'A developer tool for validating Dominican Republic e-CF invoice XML against official DGII XSD schemas. Flags structural errors in red and recoverable warnings in yellow — so developers actually understand what\'s wrong, not just that something failed. Built because DGII\'s own tooling offers almost nothing in the way of actionable feedback.',
    role: 'Personal project.',
    tags: ['TypeScript', 'XSD / XML', 'npm package'],
    links: [{ label: 'Coming soon', href: '#' }],
  },
]

const skillGroups = [
  {
    category: 'Cloud & integrations',
    skills: ['Azure Functions', 'Logic Apps', 'Doc Intelligence', 'Table Storage', 'Docker'],
  },
  {
    category: 'Languages',
    skills: ['C#', 'TypeScript', 'Python', 'JavaScript', 'Java'],
  },
  {
    category: 'Frontend',
    skills: ['Angular', 'React', 'Next.js', 'Svelte'],
  },
  {
    category: 'Backend & data',
    skills: ['.NET', 'Node.js', 'ERPNext', 'SQL Server', 'Entity Framework'],
  },
]

// ── Icons ─────────────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')

  // Highlight the nav link that matches the section currently in view.
  // IntersectionObserver fires when a section crosses the middle 20% of the
  // viewport (-40% top margin, -60% bottom margin).
  useEffect(() => {
    const ids = ['hero', 'about', 'projects', 'skills', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Reveal elements as they scroll into view.
  // Any element with className="reveal" starts invisible and fades up once it
  // enters the viewport. An optional inline transition-delay adds stagger.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-revealed')
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`min-h-screen bg-gray-950 text-white ${dmSans.variable} ${instrumentSerif.variable}`}
      style={{ fontFamily: 'var(--font-body), sans-serif' }}
    >
      {/* ── Global styles injected via <style> tag ────────────────────────────
          We keep these here (rather than globals.css) so the component is
          self-contained and portable. ──────────────────────────────────────── */}
      <style>{`
        /* Display (serif) font utility */
        .display { font-family: var(--font-display), Georgia, serif; }

        /* ── Hero entrance animations ── */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Each child gets a slightly longer delay for a staggered feel */
        .hero-1 { animation: fadeInUp .5s ease both; }
        .hero-2 { animation: fadeInUp .5s ease .09s both; }
        .hero-3 { animation: fadeInUp .5s ease .18s both; }
        .hero-4 { animation: fadeInUp .5s ease .28s both; }

        /* ── Scroll-reveal ──
           Elements start invisible and slightly below their final position.
           The IntersectionObserver above adds .is-revealed when they enter
           the viewport, which transitions them to their natural state. ── */
        .reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .reveal.is-revealed {
          opacity: 1;
          transform: none;
        }

        /* ── CTA shimmer ──
           A bright diagonal bar sweeps across the button on a loop. ── */
        .shimmer { position: relative; overflow: hidden; }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255, 255, 255, .18) 50%,
            transparent 65%
          );
          background-size: 200% 100%;
          animation: shimmer 3.5s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Hero dot-grid background ── */
        .dot-grid {
          background-image: radial-gradient(rgba(255, 255, 255, .045) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      {/* ── Navigation ────────────────────────────────────────────────────────
          Active section is tracked via IntersectionObserver (see above).
          On small screens the nav links are hidden — the page is short enough
          that this is fine; a hamburger menu can be added later if needed. ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-medium text-white">Gary De la Cruz</span>
          <div className="hidden sm:flex items-center gap-8">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => {
              const id = item.toLowerCase()
              const isActive = activeSection === id
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  className={`text-sm transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {item}
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────────
          Dot-grid gives the section texture without competing with the text.
          The radial glow sits behind everything and creates atmospheric depth.
          All four child elements animate in with staggered delays. ── */}
      <section id="hero" className="relative pt-36 pb-28 px-6 dot-grid overflow-hidden">
        {/* Atmospheric blue glow — purely decorative */}
        <div
          className="absolute pointer-events-none inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 15% 65%, rgba(59, 130, 246, .08) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          {/* Status badge */}
          <div className="flex items-center gap-2 mb-6 hero-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-gray-400">Open to opportunities</span>
          </div>

          {/* Headline — Instrument Serif for editorial weight.
              clamp() keeps the font size fluid between mobile and desktop
              without needing multiple breakpoint classes. */}
          <h1
            className="display font-normal leading-[1.08] tracking-tight mb-6 hero-2"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}
          >
            Full-stack developer
            <br />
            <span className="text-gray-400">&amp; integration specialist.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl leading-relaxed mb-10 hero-3">
            I build the bridges between enterprise systems and government
            platforms — clean code, real compliance, zero drama.
          </p>

          {/* CTAs — flex-wrap so they stack naturally on very narrow screens */}
          <div className="flex flex-wrap items-center gap-4 hero-4">
            <a
              href="#projects"
              className="shimmer px-6 py-3 bg-white text-gray-950 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              View my work
            </a>
            <a
              href="/Gary_De_la_Cruz_Resume.pdf"
              className="px-6 py-3 border border-white/20 text-sm text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              Download résumé
            </a>
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────────
          Two-column on md+, single column on mobile.
          The stat cards get an updated metric (<5s) reflecting real system
          performance. Each block has .reveal for scroll animation. ── */}
      <section id="about" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">About</span>
            <h2 className="display text-2xl font-normal mt-3 mb-1">
              A developer who ships in the real world.
            </h2>
            <p className="text-gray-400 text-sm mb-10">
              Not just tutorials — production systems handling government compliance at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4 reveal">
              <p className="text-gray-400 text-sm leading-relaxed">
                Based in Santo Domingo, Dominican Republic. I specialize in enterprise integrations —
                connecting ERPNext with tax authorities, building Azure-hosted automation pipelines,
                and shipping Angular frontends that make complex workflows feel simple.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                B.S. Computer Science, Westfield State University. Fluent in English and Spanish.
              </p>
            </div>

            <div className="grid gap-3 reveal" style={{ transitionDelay: '.08s' }}>
              {[
                { num: '3+', label: 'Years of professional full-stack experience' },
                { num: '5',  label: 'Programming languages in active production use' },
                { num: '4',  label: 'Cloud & enterprise platforms shipped' },
              ].map(({ num, label }) => (
                <div key={label} className="bg-gray-900 rounded-xl p-4">
                  <div className="text-2xl font-medium text-white">{num}</div>
                  <div className="text-sm text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────────────────
          Each card reveals with a staggered delay (i * 80ms).
          Employer name is shown dimly in the card header.
          A "Role" line makes your ownership of each project explicit. ── */}
      <section id="projects" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Projects</span>
            <h2 className="display text-2xl font-normal mt-3 mb-1">Things I&apos;ve built.</h2>
            <p className="text-gray-400 text-sm mb-10">
              Production systems, not side projects collecting dust.
            </p>
          </div>

          <div className="grid gap-4">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="reveal border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Card header: badge + employer */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${project.badgeStyle}`}>
                    {project.badge}
                  </span>
                  {project.employer && (
                    <span className="text-xs text-gray-600">{project.employer}</span>
                  )}
                </div>

                <h3 className="text-base font-medium text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{project.description}</p>

                {/* Role line — makes your ownership explicit without being verbose */}
                {project.role && (
                  <p className="text-xs text-gray-600 mb-4">
                    <span className="text-gray-500">Role: </span>
                    {project.role}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-gray-900 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────────────
          1 column on mobile, 2 on sm+. Each card reveals independently. ── */}
      <section id="skills" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Skills</span>
            <h2 className="display text-2xl font-normal mt-3 mb-1">What I work with.</h2>
            <div className="mb-10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillGroups.map(({ category, skills }, i) => (
              <div
                key={category}
                className="reveal bg-gray-900 rounded-xl p-5"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-xs font-medium text-gray-500 mb-3">{category}</div>
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

      {/* ── Contact ───────────────────────────────────────────────────────────
          LinkedIn and GitHub links now include their brand icons.
          external links get target="_blank" + rel for safety. ── */}
      <section id="contact" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Contact</span>
            <h2 className="display text-2xl font-normal mt-3 mb-10">Let&apos;s build something.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Available for full-time roles, freelance integrations, and consulting on ERPNext or
                DGII compliance systems. I respond within 24 hours.
              </p>
              <a
                href="mailto:gary4gld@gmail.com"
                className="shimmer px-6 py-3 bg-white text-gray-950 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors inline-block"
              >
                Send me an email
              </a>
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
                  className="flex items-center gap-3 text-sm text-gray-400 px-4 py-3 border border-white/10 rounded-xl hover:border-white/20 hover:text-white transition-colors"
                >
                  <span className="text-gray-500 shrink-0">{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

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