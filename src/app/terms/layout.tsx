import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  title: 'Terms of Service | Citzos',
  description:
    'Terms of Service, user commitments, and legal agreements governing the use of Citzos civic services and access passes.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
