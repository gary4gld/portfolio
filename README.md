# garydelacruz.dev

Personal portfolio of **Gary De la Cruz** — full-stack developer and integration specialist.

**Live:** [www.garydelacruz.dev](https://www.garydelacruz.dev)

It showcases three projects, each with its own case-study page:

- **DGII e-CF Electronic Invoicing System:** a production compliance pipeline from ERPNext to the Dominican Republic's tax authority (Azure Functions, Logic Apps, ERPNext).
- **OCR Invoice Ingestion Pipeline:** photo or PDF in, Purchase Invoice out (Azure Document Intelligence, Logic Apps, Angular, ERPNext).
- **ECF XML Validator:** a free web tool that checks e-CF invoice XML against DGII schemas and business rules. Live at [ecf-validator.garydelacruz.dev](https://ecf-validator.garydelacruz.dev).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- Deployed on [Vercel](https://vercel.com). Every pull request gets a preview deployment.

## Running locally

Requires Node.js 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm build      # production build
```

## Project structure

```
app/
  layout.tsx              Root layout: fonts, site-wide metadata
  page.tsx                Home page (server component)
  globals.css             Theme, fonts, motion, scroll-reveal styles
  opengraph-image.tsx     Share image for the home page
  sitemap.ts, robots.ts   /sitemap.xml and /robots.txt
  projects/
    dgii-ecf/             Case study + architecture diagram
    ocr-pipeline/         Case study + architecture diagram
    ecf-validator/        Case study + interactive demo (ValidatorMockup.tsx)
components/
  HomeNav.tsx             Home nav: active-section highlight, mobile menu (client)
  ScrollReveal.tsx        Fade-in on scroll (client)
  ProjectPage.tsx         Shared nav / back link / footer for project pages
  SiteFooter.tsx, icons.tsx
lib/
  site.ts                 Site URL + pageMetadata() helper (title, OG, Twitter, canonical)
  og.tsx                  Share-image renderer used by every opengraph-image.tsx
assets/fonts/             Fonts for share images (SIL Open Font License)
public/resume/            Résumé PDF
```

## Notes

- **Share images** are generated at build time from `lib/og.tsx`. After changing them, use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to refresh LinkedIn's cache.
- **Accessibility:** text meets WCAG AA contrast, animations respect `prefers-reduced-motion`, and content stays visible without JavaScript.

© Gary De la Cruz. All rights reserved.
