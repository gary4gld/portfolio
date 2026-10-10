import { renderOgImage, ogSize, ogContentType } from '@/lib/og'

export const alt = 'ECF XML Validator — open-source tool by Gary De la Cruz'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: 'Open source · Live',
    title: 'ECF XML Validator',
    subtitle: 'Checks Dominican e-CF invoice XML against DGII schemas and 60+ business rules — and explains every issue in plain language.',
  })
}
