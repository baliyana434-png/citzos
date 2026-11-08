import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Citzos',
  description:
    'Official Refund and Cancellation Policy for Citzos 1-Year National Citizen Access Pass and services.',
  alternates: {
    canonical: `${siteUrl}/refund`,
  },
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
