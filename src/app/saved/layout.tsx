import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  title: 'My Saved Schemes & Bookmarks | Citzos',
  description:
    'Access your personal bookmarks for verified government schemes, scholarship deadlines, exam alerts, and learning roadmaps on Citzos.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/saved`,
  },
};

export default function SavedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
