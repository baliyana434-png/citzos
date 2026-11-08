import type { Metadata, Viewport } from 'next';
import './globals.css';
import { TranslationProvider } from '@/i18n/useTranslation';
import { CountryProvider } from '@/context/CountryContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Citzos | 100% Verified Sarkari Yojana 2026, Scholarships, Govt Jobs, Free Courses & 24x7 Helplines',
    template: '%s | Citzos',
  },
  description:
    'Citzos is India\'s #1 verified civic discovery portal for 100% authentic Sarkari Yojana 2026, National Scholarships (NSP), Competitive Exam alerts (UPSC, SSC, Railway), Free Skill India & SWAYAM certifications, and 24x7 Emergency Helplines (1930, 112, 181). Zero middlemen, direct official application portals.',
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
    'citzos helpline',
    'citzos skills',
    'citzos sarkari yojana',
    '#citzos',
    '#sarkariyojana2026',
    '#govtschemes',
    '#scholarship2026',
    '#cybercrime1930',
    '#freeskillcourses',
    // High-Volume Hindi & Hinglish Search Queries
    'sarkari yojana',
    'sarkari yojana 2026',
    'pradhan mantri yojana 2026',
    'pm kisan yojana',
    'pm kisan 19th kist date 2026',
    'pm surya ghar muft bijli yojana',
    'pm vishwakarma yojana 15000 toolkit',
    'ayushman bharat card apply online',
    'ayushman golden card eligibility',
    'ladli behna yojana 3.0 form',
    'sukanya samriddhi yojana interest rate 2026',
    'chhatravritti scholarship 2026',
    'sarkari naukri form 2026',
    'sarkari result 2026',
    'sarkari exam result',
    '1930 cyber crime complaint online',
    '112 national emergency number india',
    '181 women helpline',
    'kisan call center number 1551',
    'free certificate courses online',
    // English Government Schemes & Welfare
    'government schemes for students',
    'government welfare schemes india',
    'pm internship scheme 2026',
    'national scholarship portal',
    'nsp scholarship apply online 2026',
    'pre matric scholarship for students',
    'post matric scholarship online form',
    'ugc net fellowship',
    'aicte free scholarship',
    'mahadbt scholarship 2026',
    'up scholarship online status 2026',
    'bihar post matric scholarship',
    // Helplines & 24x7 Emergency Hotlines
    '1930 cyber fraud helpline',
    '112 emergency helpline india',
    '1098 childline child helpline',
    '14416 tele manas mental health helpline',
    '14567 senior citizen helpline elderline',
    '1912 electricity complaint number',
    '1906 lpg gas leakage emergency',
    '14443 national consumer helpline',
    '1947 uidai aadhaar helpline',
    'toll free government helplines india',
    '24x7 emergency helpline directory',
    // Competitive Exams, Jobs & Careers
    'upsc civil services exam syllabus 2026',
    'ssc cgl notification 2026',
    'ssc gd constable bharti 2026',
    'railway rrb ntpc exam 2026',
    'railway group d vacancy',
    'banking ibps po exam',
    'agniveer bharti 2026 online form',
    'state police constable bharti 2026',
    'ncs national career service portal',
    'apprenticeship india portal online apply',
    // Free Skill Certifications & High Income Masterclasses
    'free government online courses with certificate',
    'swayam portal free courses with certificate',
    'skill india digital free certification',
    'free python programming course with certificate',
    'ai machine learning free masterclass',
    'web development free certified course',
    'data analytics course free certificate',
    'prompt engineering free certificate',
    'iit nptel free courses online',
    'top high income skills to learn in 2026',
    // Healthcare & Senior Benefits
    'abha health card registration online',
    'free cataract surgery government scheme',
    'jan aushadhi generic medicine near me',
    'indira gandhi national old age pension',
    // Startups, MSME & Business Grants
    'startup india seed fund scheme apply',
    'pm mudra loan apply online 2026',
    'stand up india scheme for sc st women',
    'pmegp loan subsidy apply online',
    // Global & Study Abroad Scholarships
    'study abroad scholarships for indian students',
    'fulbright scholarship',
    'chevening scholarship uk 2026',
    'daad scholarship germany',
    'mext scholarship japan',
    'erasmus mundus scholarship europe',
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
    title: 'Citzos | 100% Verified Sarkari Yojana 2026, Scholarships, Govt Jobs & Helplines',
    description:
      'India\'s #1 authentic civic portal for verified Sarkari Yojana 2026, National Scholarships (NSP), youth internships, 24x7 emergency hotlines (1930, 112, 181), and free certified courses.',
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
    title: 'Citzos | 100% Verified Sarkari Yojana 2026, Scholarships & Jobs',
    description:
      'Direct authentic civic portal for verified government schemes, student scholarships, competitive exam alerts, 24x7 helplines, and free certified masterclasses.',
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
    '@type': 'Organization',
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

  const jsonLdSoftwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Citzos',
    operatingSystem: 'All Modern Web Browsers, Android, iOS',
    applicationCategory: 'EducationalApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    url: siteUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1280',
    },
  };

  const jsonLdItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Civic Services & Opportunities on Citzos',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Sarkari Yojana & Government Schemes 2026',
        url: `${siteUrl}/?category=schemes`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'National Scholarships & Fellowships (NSP)',
        url: `${siteUrl}/?category=scholarships`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: '24x7 Official Helpline Directory (1930, 112, 181)',
        url: `${siteUrl}/helpline`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Free Skill Hub & Recognized Certifications',
        url: `${siteUrl}/skills`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 5,
        name: 'Official Government Application Forms',
        url: `${siteUrl}/forms`,
      },
    ],
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
        name: 'What is PM Surya Ghar Muft Bijli Yojana and how to apply in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PM Surya Ghar Muft Bijli Yojana provides up to Rs 78,000 direct bank subsidy for installing rooftop solar panels, providing up to 300 units of free electricity every month. Eligible households can apply directly through verified links on Citzos.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is PM Vishwakarma Yojana toolkit voucher scheme?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PM Vishwakarma provides free modern skill training with a Rs 500/day stipend, a Rs 15,000 e-voucher for modern toolkits, and collateral-free enterprise loans up to Rs 3 Lakhs at 5% subsidized interest for 18 traditional trade artisans.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
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
