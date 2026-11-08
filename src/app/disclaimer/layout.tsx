import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  title: 'Official Civic Disclaimer | Citzos',
  description:
    'Civic technology disclaimer: Citzos is an independent civic portal indexing publicly accessible official government programs and gazettes. We do not represent any government agency directly.',
  alternates: {
    canonical: `${siteUrl}/disclaimer`,
  },
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
