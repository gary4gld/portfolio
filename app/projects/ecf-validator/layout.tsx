export const metadata = {
  title: 'ECF XML Validator — Gary De la Cruz',
  description:
    'An open-source developer tool for validating Dominican Republic e-CF invoice XML against official DGII XSD schemas — with inline error highlighting and human-readable messages.',
}
 
export default function EcfValidatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}