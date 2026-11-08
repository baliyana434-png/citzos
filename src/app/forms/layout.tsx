import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  title: 'Official Government Application Forms & Portals Directory | Direct Citizen Access',
  description:
    'Direct access to 100% authentic official government application forms, guidelines, and gazette notices. Scholarships, civil service exams, welfare pensions, ration cards, and business grants with zero middlemen.',
  keywords: [
    'sarkari form download',
    'government application forms pdf',
    'national scholarship portal form',
    'upsc online application form',
    'pm kisan registration form',
    'ayushman card online form',
    'direct official government portals',
    'sarkari exam online application',
    'citizen service portal links',
  ],
  alternates: {
    canonical: `${siteUrl}/forms`,
  },
  openGraph: {
    title: 'Official Government Forms & Citizen Portals Directory | Citzos',
    description:
      'Direct, zero-scam access to official application portals for national scholarships, exams, pensions, and welfare schemes.',
    url: `${siteUrl}/forms`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Government Forms & Portals Directory | Citzos',
    description: '100% verified official government application portals without middlemen.',
  },
};

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
