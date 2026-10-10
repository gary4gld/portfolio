import { renderOgImage, ogSize, ogContentType } from '@/lib/og'

export const alt = 'DGII e-CF Electronic Invoicing System — case study by Gary De la Cruz'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: 'Case study · Enterprise compliance',
    title: 'DGII e-CF Electronic Invoicing System',
    subtitle: 'End-to-end pipeline from ERPNext to the Dominican tax authority — all 10 e-CF invoice types, Azure Functions and Logic Apps.',
  })
}
