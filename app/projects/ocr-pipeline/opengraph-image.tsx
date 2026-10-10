import { renderOgImage, ogSize, ogContentType } from '@/lib/og'

export const alt = 'OCR Invoice Ingestion Pipeline — case study by Gary De la Cruz'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: 'Case study · Enterprise AI',
    title: 'OCR Invoice Ingestion Pipeline',
    subtitle: 'Photo in, Purchase Invoice out — Azure Document Intelligence, Logic Apps, ERPNext, and an Angular upload form.',
  })
}
