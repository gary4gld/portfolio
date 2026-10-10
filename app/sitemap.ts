import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Served at /sitemap.xml — the list of pages search engines should index.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '', priority: 1 },
    { path: '/projects/dgii-ecf', priority: 0.8 },
    { path: '/projects/ocr-pipeline', priority: 0.8 },
    { path: '/projects/ecf-validator', priority: 0.8 },
  ]
  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }))
}
