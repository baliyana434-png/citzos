import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';

export const metadata: Metadata = {
  title: 'Free Skill Hub & Certifications | AI Tools, Drone Pilot, Languages, Coding & Hardware',
  description:
    'Master in-demand high-earning skills with 100% free masterclasses and official government recognized certificates. Generative AI Tools, DGCA Drone Piloting, Foreign Languages (German, Japanese, French), Full-Stack Coding, Hardware Robotics, and Healthcare First Aid.',
  keywords: [
    'free government courses with certificate 2026',
    'swayam free online courses with certificate',
    'skill india digital certification free',
    'free ai tools with certificate 2026',
    'learn chatgpt prompt engineering generative ai free',
    'drone pilot training certification dgca free',
    'kisan drone pilot license course online',
    'learn german language free a1 b2 with certificate',
    'learn japanese free jlpt n5 preparation course',
    'learn french language free for beginners',
    'hardware electronics robotics course free with certificate',
    'ev electric vehicle technician training course',
    'healthcare first aid cpr certification free',
    'learn web development free with certificate',
    'python free course with certificate 2026',
    'ai machine learning masterclass free',
    'data analytics course free certificate',
    'digital marketing free certification course',
    'iit free online courses nptel',
    'top high income skills to learn in 2026',
    '#freecourses',
    '#skillindia',
    '#aitools2026',
    '#dronepilot',
    '#learngerman',
    '#learnjapanese',
    '#roboticscourse',
    '#freecertificate',
  ],
  alternates: {
    canonical: `${siteUrl}/skills`,
  },
  openGraph: {
    title: 'Free Skill Hub & Certifications | AI, Drones, Languages & Coding',
    description:
      'Learn high-income skills through curated free masterclasses: Generative AI, Drone Piloting, German, Japanese, Web Dev, and Hardware with official certificates.',
    url: `${siteUrl}/skills`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Skill Hub & Certifications | Citzos',
    description:
      'Master AI Tools, Drone Piloting, Foreign Languages, Web Dev, and Robotics with free masterclasses and official certificates.',
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
      {
        '@type': 'Question',
        name: 'Can I learn DGCA Drone Piloting, Hardware Robotics, and EV Technology for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Citzos provides complete video masterclass roadmaps and official government enrollment portals for Commercial Drone Piloting (DGCA syllabus), EV Technician Training, and IoT Robotics hardware.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are foreign language courses (German, French, Japanese) available with certificates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the Skill Hub features structured free courses for German (A1-B2), Japanese (JLPT), French, and Spanish, linking directly to official language institutes and proficiency exam guidelines.',
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
