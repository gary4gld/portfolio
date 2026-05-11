const projects = [
  {
    title: "DGII e-CF Electronic Invoicing System",
    badge: "Enterprise · Compliance",
    badgeStyle: "bg-blue-950 text-blue-300",
    description:
      "Production compliance pipeline for the Dominican Republic's tax authority — covering all 10 government-mandated invoice types, automated XML generation, dual-path submission, and real-time invoice status tracking.",
    tags: ["C# / Azure Functions", "Azure Logic Apps", "ERPNext", "Python", "XSLT / XML"],
    links: [{ label: "View architecture →", href: "#" }],
  },
  {
    title: "OCR Invoice Ingestion Pipeline",
    badge: "Enterprise · AI",
    badgeStyle: "bg-blue-950 text-blue-300",
    description:
      "Automated invoice processing using Azure Document Intelligence. Snap a photo of an invoice, get structured data in ERPNext — with a custom Angular web form and Spanish-language error handling.",
    tags: ["Azure Document Intelligence", "Angular", "ERPNext", "Python"],
    links: [{ label: "View details →", href: "#" }],
  },
  {
    title: "NCF / eNCF Validator",
    badge: "Open Source · Coming Soon",
    badgeStyle: "bg-emerald-950 text-emerald-400",
    description:
      "Open-source validation tool for Dominican Republic DGII invoice numbers. Validates format, type codes, and sequence rules for both NCF and eNCF standards.",
    tags: ["TypeScript", "npm package"],
    links: [{ label: "Coming soon", href: "#" }],
  },
];

const skillGroups = [
  {
    category: "Cloud & integrations",
    skills: ["Azure Functions", "Logic Apps", "Doc Intelligence", "Table Storage", "Docker"],
  },
  {
    category: "Languages",
    skills: ["C#", "TypeScript", "Python", "JavaScript", "Java"],
  },
  {
    category: "Frontend",
    skills: ["Angular", "React", "Next.js", "Svelte"],
  },
  {
    category: "Backend & data",
    skills: [".NET", "Node.js", "ERPNext", "SQL Server", "Entity Framework"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-medium text-white">Gary De la Cruz</span>
          <div className="flex items-center gap-8">
            {["About", "Projects", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="pt-36 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-gray-400">Open to opportunities</span>
          </div>
          <h1 className="text-5xl font-medium leading-tight tracking-tight mb-5">
            Full-stack developer
            <br />& integration specialist.
          </h1>
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed mb-10">
            I build the bridges between enterprise systems and government
            platforms — clean code, real compliance, zero drama.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-white text-gray-950 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
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

      {/* ── About ── */}
      <section id="about" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
            About
          </span>
          <h2 className="text-2xl font-medium mt-3 mb-1">
            A developer who ships in the real world.
          </h2>
          <p className="text-gray-400 text-sm mb-10">
            Not just tutorials — production systems handling government
            compliance at scale.
          </p>

          <div className="grid grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed">
                Based in Santo Domingo, Dominican Republic. I specialize in
                enterprise integrations — connecting ERPNext with tax
                authorities, building Azure-hosted automation pipelines, and
                shipping Angular frontends that make complex workflows feel
                simple.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                B.S. Computer Science, Westfield State University. Fluent in
                English and Spanish.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                { num: "10+", label: "e-CF invoice types in production" },
                { num: "3+", label: "Years building ERPNext integrations" },
                { num: "2",   label: "Languages, fluent" },
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

      {/* ── Projects ── */}
      <section id="projects" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
            Projects
          </span>
          <h2 className="text-2xl font-medium mt-3 mb-1">Things I've built.</h2>
          <p className="text-gray-400 text-sm mb-10">
            Production systems, not side projects collecting dust.
          </p>

          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.title}
                className="border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
              >
                <div className="mb-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${project.badgeStyle}`}
                  >
                    {project.badge}
                  </span>
                </div>
                <h3 className="text-base font-medium text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {project.description}
                </p>
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

      {/* ── Skills ── */}
      <section id="skills" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
            Skills
          </span>
          <h2 className="text-2xl font-medium mt-3 mb-1">What I work with.</h2>
          <p className="text-gray-400 text-sm mb-10">
            No logo soup — grouped by what actually matters on a project.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {skillGroups.map(({ category, skills }) => (
              <div key={category} className="bg-gray-900 rounded-xl p-5">
                <div className="text-xs font-medium text-gray-500 mb-3">
                  {category}
                </div>
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
          <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
            Contact
          </span>
          <h2 className="text-2xl font-medium mt-3 mb-10">
            Let's build something.
          </h2>

          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Available for full-time roles, freelance integrations, and
                consulting on ERPNext or DGII compliance systems. I respond
                within 24 hours.
              </p>
              <a
                href="mailto:gary4gld@gmail.com"
                className="px-6 py-3 bg-white text-gray-950 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors inline-block"
              >
                Send me an email
              </a>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "gary4gld@gmail.com", href: "mailto:gary4gld@gmail.com" },
                { label: "LinkedIn",           href: "https://www.linkedin.com/in/gary-de-la-cruz-783895119/" },
                { label: "GitHub",             href: "https://github.com/gary4gld" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 text-sm text-gray-400 px-4 py-3 border border-white/10 rounded-xl hover:border-white/20 hover:text-white transition-colors"
                >
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
          <span className="text-xs text-gray-600">Gary E. De la Cruz · 2025</span>
          <span className="text-xs text-gray-600">
            Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </footer>

    </div>
  );
}
