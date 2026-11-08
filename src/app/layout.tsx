import type { Metadata, Viewport } from 'next';
import './globals.css';
import { TranslationProvider } from '@/i18n/useTranslation';
import { CountryProvider } from '@/context/CountryContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://citizenlifeos.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Citzos | Universal Opportunity Discovery & Civic Platform for All Citizens',
    template: '%s | Citzos',
  },
  description:
    'Citzos is an independent private digital technology platform connecting all citizens—students, job seekers, farmers, women, startups, and seniors—with official schemes, private jobs, internships, healthcare, and 24x7 emergency helplines.',
  applicationName: 'Citzos',
  authors: [{ name: 'Citzos Editorial Board', url: siteUrl }],
  generator: 'Next.js',
  keywords: [
    // Primary Brand & Transition Keywords
    'citzos',
    'citzos portal',
    'citzos online',
    'citzos app',
    'citzos login',
    'citzos schemes',
    'citzos scholarships',
    'citzos jobs',
    'citizen life os',
    'citizen os',
    'citizenlifeos',
    'citizen life',
    'life os',
    // Hindi & Hinglish High-Volume Search Queries
    'sarkari yojana',
    'sarkari yojana 2026',
    'pradhan mantri yojana',
    'pm kisan yojana',
    'pm vishwakarma yojana',
    'ayushman bharat card apply online',
    'ladli behna yojana',
    'sukanya samriddhi yojana',
    'chhatravritti scholarship 2026',
    'sarkari naukri form',
    'sarkari exam result',
    '1930 cyber crime complaint online',
    '112 emergency number',
    '181 women helpline',
    'kisan call center number 1551',
    'free certificate courses',
    // English Government Schemes & Welfare
    'government schemes for students',
    'government welfare schemes india',
    'pm internship scheme 2026',
    'national scholarship portal',
    'nsp scholarship apply online',
    'pre matric scholarship',
    'post matric scholarship',
    'ugc net fellowship',
    'aicte scholarship',
    // Helplines & Emergency Support
    '1930 cyber fraud helpline',
    '112 national emergency number india',
    '1098 childline helpline',
    '14416 tele manas mental health helpline',
    'toll free government helplines',
    '24x7 emergency helpline directory',
    // Competitive Exams & Careers
    'upsc civil services exam syllabus',
    'ssc cgl notification 2026',
    'railway rrb ntpc exam',
    'banking ibps po exam',
    'agniveer bharti 2026',
    'state police constable bharti',
    // Skills & Free Certifications
    'free government online courses with certificate',
    'swayam portal free courses',
    'skill india certification online',
    'learn python free with certificate',
    'ai masterclass free certificate',
    'web development course free',
    // Healthcare & Welfare
    'ayushman golden card eligibility',
    'abha health card registration',
    'free cataract surgery government scheme',
    'jan aushadhi generic medicine',
    // Startups & MSME Loans
    'startup india seed fund scheme',
    'mudra loan apply online',
    'stand up india scheme',
    // Global Opportunities
    'study abroad scholarships for indian students',
    'fulbright scholarship',
    'chevening scholarship uk',
    'daad scholarship germany',
    'mext scholarship japan',
    'international internships and careers',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Citzos',
  publisher: 'Citzos',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'hi-IN': '/',
    },
  },
  openGraph: {
    title: 'Citzos | Verified Government Schemes, Scholarships, Helplines & Jobs',
    description:
      'Official verified civic access portal. Discover eligible government schemes, student scholarships, competitive exam alerts, 24x7 emergency hotlines, and free skill certifications matching your age, qualification, and state.',
    url: siteUrl,
    siteName: 'Citzos',
    locale: 'en_IN',
    alternateLocale: ['hi_IN'],
    type: 'website',
    images: [
      {
        url: '/brand-logo-full.png',
        width: 1004,
        height: 342,
        alt: 'Citzos - Global Civic & Opportunities Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Citzos | Verified Civic Opportunities & Helplines',
    description:
      'Zero-scam platform for verified government schemes, scholarships, jobs, 24x7 helplines, and free certified masterclasses.',
    images: ['/brand-logo-full.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Civic Technology & Public Welfare',
  classification: 'Government Schemes, Education, Scholarships, Helplines, Jobs & Skills',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#059669',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Citzos',
    alternateName: ['Citizen Life OS', 'Citizen OS', 'CitizenLifeOS', 'Citzos Portal'],
    url: siteUrl,
    description:
      'Verified government schemes, competitive exams, youth internships, 24x7 emergency helplines, free skill certifications, and healthcare benefits.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'Citzos',
    alternateName: ['Citizen Life OS', 'Citizen OS', 'CitizenLifeOS'],
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'citizen support',
      availableLanguage: ['English', 'Hindi'],
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Citzos (formerly Citizen Life OS) and how does it help citizens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Citzos (formerly Citizen Life OS) is an authentic, zero-scam civic platform that helps citizens discover verified government schemes, scholarships, competitive exams, youth internships, healthcare benefits, and 24x7 toll-free emergency helplines tailored to their age, state, and qualification without middlemen or scam risks.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the official cyber crime helpline number in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The official national cyber financial fraud helpline number in India is 1930 (operated by the Indian Cyber Crime Coordination Centre, Ministry of Home Affairs). Citizens can also report cyber crimes directly at cybercrime.gov.in.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can students apply for genuine scholarships and internships in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Students can discover eligible central and state scholarships (like National Scholarship Portal NSP, PM YASASVI, UGC fellowships) and verified internship schemes (such as the PM Internship Scheme 2026 offering stipends up to Rs 5,000/month) directly through verified official government links on Citzos.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I learn skills and receive free government recognized certificates online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, through the Citzos Skill Hub, learners can access curated masterclasses and direct official links to free government courses with recognized certificates from SWAYAM, Skill India, NPTEL, and global tech programs in Web Development, AI, Python, and Data Science.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Citzos calculate opportunity eligibility?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Citzos automatically calculates your exact age from your date of birth on every birthday and filters opportunities according to your country, state, education level, and demographic category to show only genuine, 100% eligible programs.',
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('citizen_theme');
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white selection:bg-emerald-200 selection:text-emerald-950">
        <TranslationProvider>
          <CountryProvider>
            {children}
          </CountryProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
