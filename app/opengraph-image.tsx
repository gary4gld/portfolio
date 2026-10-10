import { renderOgImage, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Gary De la Cruz — Full-stack developer and integration specialist'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: 'Full-stack developer & integration specialist',
    title: 'Gary De la Cruz',
    subtitle: 'I build the bridges between enterprise systems and government platforms — clean code, real compliance, zero drama.',
  })
}
