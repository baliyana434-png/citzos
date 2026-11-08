import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  title: 'Free Skill Hub & Certifications | YouTube Masterclasses & Govt Recognized Courses',
  description:
    'Master in-demand high-earning skills with top curated masterclasses and official government free certificates. Full-Stack Web Development, AI & Machine Learning, Python, Data Analytics, Cloud Computing, Prompt Engineering, and Digital Marketing.',
  keywords: [
    'free government courses with certificate',
    'swayam free online courses with certificate',
    'skill india certification free',
    'learn web development free with certificate',
    'python free course with certificate',
    'ai machine learning masterclass free',
    'data analytics course free certificate',
    'prompt engineering courses free',
    'digital marketing free certification course',
    'iit free online courses nptel',
    'top high income skills to learn in 2026',
    'online masterclass youtube free',
  ],
  alternates: {
    canonical: `${siteUrl}/skills`,
  },
  openGraph: {
    title: 'Free Skill Hub & Certifications | Citzos',
    description:
      'Learn high-income skills through top YouTube masterclasses and earn verified official government certificates from SWAYAM, Skill India, and tech leaders.',
    url: `${siteUrl}/skills`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Skill Hub & Certifications | Citzos',
    description:
      'Master Web Dev, AI, Python, and Data Science with free masterclasses and official certificates.',
  },
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSkills = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are the skills courses on Citzos completely free to learn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all curated video masterclasses in the Citzos Skill Hub are 100% free, offering complete roadmaps from beginner to professional in Web Development, AI, Python, Data Analytics, and Cloud Computing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I get government recognized certificates for free skills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each skill topic in the Skill Hub provides direct access to official government and recognized institutions like SWAYAM, Skill India, NPTEL, and global tech providers where students can enroll and obtain authentic completion certificates.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the highest paying skills students can learn in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The top in-demand skills in 2026 include Full-Stack Web Development, Generative AI & Prompt Engineering, Data Analytics with Python & SQL, Cloud Architecture (AWS/GCP), and Digital Performance Marketing.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSkills) }}
      />
      {children}
    </>
  );
}
