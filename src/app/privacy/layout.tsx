import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  title: 'Privacy Policy | Citzos',
  description:
    'Official Privacy Policy and Data Protection standards of Citzos. Google OAuth 2.0 compliant and ISO/DPDP citizen data protection architecture.',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
