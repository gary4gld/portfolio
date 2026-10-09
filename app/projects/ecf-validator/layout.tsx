export const metadata = {
  title: 'ECF XML Validator — Gary De la Cruz',
  description:
    'A free, open-source validator for Dominican Republic e-CF invoice XML — official DGII XSD schemas plus 60+ business rules, with inline highlighting and plain-language messages. Live at ecf-validator.garydelacruz.dev.',
}
 
export default function EcfValidatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}