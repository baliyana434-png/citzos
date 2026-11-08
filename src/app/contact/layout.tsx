import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  title: 'Contact Us | Citizen Support & Verification Desk | Citzos',
  description:
    'Reach out to Citzos editorial and citizen grievance team. Contact info, verification queries, and platform support.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
