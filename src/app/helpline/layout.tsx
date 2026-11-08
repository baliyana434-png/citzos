import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  title: '24x7 Official Helpline Directory | 1930 Cyber Fraud, 112 Emergency, 181 Women, 1551 Kisan',
  description:
    'Search and direct call 100% verified toll-free government emergency helplines in India. Cyber financial fraud (1930), Police/Fire/Ambulance (112), Women safety (181), Childline (1098), Farmers (1551), and Mental Health (14416). Instant 1-click calling with zero middlemen.',
  keywords: [
    '1930 helpline',
    '1930 cyber crime number',
    'cyber fraud complaint online 1930',
    '112 national emergency number india',
    '181 women helpline number',
    'kisan call center 1551',
    'childline 1098',
    'tele manas 14416 mental health',
    'senior citizen helpline 14567',
    'electricity complaint 1912',
    'lpg emergency 1906',
    'national consumer helpline 14443',
    'aadhaar helpline 1947',
    'election voter helpline 1950',
    'toll free emergency numbers india',
    'government official helpline directory',
    '#helpline1930',
    '#emergency112',
    '#womenhelpline181',
    '#cybercrimeindia',
    '#citzoshelpline',
  ],
  alternates: {
    canonical: `${siteUrl}/helpline`,
  },
  openGraph: {
    title: '24x7 Verified Official Helpline Directory | 1930, 112, 181, 1551, 1098',
    description:
      'Zero-scam directory of authentic toll-free government helplines in India. Direct 1-click calling for Cyber Crime (1930), Police & Medical (112), Women Safety (181), and Agriculture (1551).',
    url: `${siteUrl}/helpline`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '24x7 Official Helpline Directory | Citzos',
    description:
      '100% Toll-free verified government emergency hotlines with instant 1-click calling.',
  },
};

export default function HelplineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdHelpline = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What should I do immediately if I lose money in a cyber fraud in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Immediately dial 1930 (National Cyber Financial Fraud Helpline) within the golden hour to freeze fraudulent transactions before scammers withdraw funds, or lodge a formal complaint at cybercrime.gov.in.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the single all-in-one emergency number in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '112 is the unified Pan-India emergency number for Police, Fire, and Ambulance services under the Emergency Response Support System (ERSS).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the toll-free helpline number for women in distress?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '181 is the 24x7 toll-free Women Helpline providing emergency response and rescue services for women facing violence or distress across India.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can farmers contact agriculture experts for free support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Farmers can call 1551 (Kisan Call Center) toll-free from 6:00 AM to 10:00 PM in all major Indian languages for expert agricultural guidance.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHelpline) }}
      />
      {children}
    </>
  );
}
