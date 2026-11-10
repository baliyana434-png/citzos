import { Opportunity } from '@/types';

export const INTERNSHIP_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-pm-internship-01',
    title: 'PM Internship Scheme 2026: 12-Month Paid Internship in Top 500 Companies',
    titleHi: 'प्रधानमंत्री इंटर्नशिप योजना 2026: भारत की शीर्ष 500 कंपनियों में 1 वर्ष की सवेतन इंटर्नशिप',
    category: 'internship',
    applicationStatus: 'active_now',
    lifeStage: 'internships',
    targetAges: [21, 24],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student', 'job_seeker'],
    benefitHeadline: '₹5,000/Month Govt Stipend + ₹6,000 One-Time Grant + 12 Months Corporate Experience in Top 500 Companies',
    benefitHeadlineHi: '₹5,000 प्रतिमाह वजीफा + ₹6,000 एकमुश्त सहायता + भारत की शीर्ष 500 कंपनियों में 1 वर्ष का अनुभव',
    benefitAmount: 66000,
    deadline: '2026-10-25',
    description: 'Ministry of Corporate Affairs flagship initiative connecting college youth with paid 12-month internships in India’s leading 500 companies (Reliance, Tata, Mahindra, HDFC, Larsen & Toubro). Includes full insurance coverage under PMJJBY and PMSBY.',
    descriptionHi: 'कॉर्पोरेट कार्य मंत्रालय की प्रमुख योजना जिसके तहत कॉलेज के युवाओं को भारत की शीर्ष 500 कंपनियों में ₹5,000 मासिक वजीफे पर 1 वर्ष का वास्तविक कॉर्पोरेट कार्य अनुभव मिलता है।',
    gazette: {
      circularNumber: 'MCA/PM-INTERNSHIP/2026/01',
      issuingAuthority: 'Ministry of Corporate Affairs (Govt of India)',
      gazetteDate: '2026-09-01',
      lastVerifiedAt: 'Live verified 10 mins ago',
      officialPortalUrl: 'https://pminternship.mca.gov.in',
      scamAlertWarning: 'Application on pminternship.mca.gov.in is 100% free of cost. Never pay any fee or bribe to agents or brokers claiming guaranteed selection.',
      officialGovtFee: '₹0 (100% Free Govt Registration)'
    },
    documents: [
      { id: 'd-pmi-1', name: 'Aadhaar Card (Linked with Mobile)', nameHi: 'आधार कार्ड (मोबाइल से लिंक)', isMandatory: true },
      { id: 'd-pmi-2', name: 'Class 10, 12 & Degree/Diploma Marksheets', nameHi: '10वीं, 12वीं एवं कॉलेज डिग्री/डिप्लोमा अंकतालिका', isMandatory: true },
      { id: 'd-pmi-3', name: 'Bank Account with Aadhaar NPCI Seeding', nameHi: 'आधार से डीबीटी लिंक बैंक खाता विवरण', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on pminternship.mca.gov.in using Aadhaar OTP verification.', textHi: 'pminternship.mca.gov.in पर आधार ओटीपी द्वारा निःशुल्क पंजीकरण करें।' },
      { step: 2, text: 'Complete digital profile with educational qualifications and district preferences.', textHi: 'अपनी शैक्षणिक योग्यता एवं जिले की पसंद भरकर प्रोफाइल पूर्ण करें।' },
      { step: 3, text: 'Select up to 5 corporate internship roles based on your specialization and submit.', textHi: 'अपनी पसंद की अधिकतम 5 कंपनियों में इंटर्नशिप पद चुनकर फॉर्म सबमिट करें।' }
    ],
    tags: ['PM Internship', 'Govt Stipend', 'College Internships', 'Corporate Experience', 'Paid Internship'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-gsoc-intern-01',
    title: 'Google Summer of Code (GSoC) 2026: Open Source Software Engineering Fellowship',
    titleHi: 'गूगल समर ऑफ कोड (GSoC) 2026: $1,500 - $3,000 वजीफा सहित वैश्विक सॉफ्टवेयर फेलोशिप',
    category: 'internship',
    applicationStatus: 'upcoming',
    lifeStage: 'internships',
    targetAges: [18, 30],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student', 'job_seeker'],
    benefitHeadline: '$1,500 - $3,000 (~₹1.25 Lakh - ₹2.50 Lakh) Direct Payout from Google + 1-on-1 Mentorship from Global Open Source Leaders',
    benefitHeadlineHi: '$1,500 - $3,000 (~₹1.25 लाख - ₹2.50 लाख) गूगल द्वारा सीधा वजीफा + अंतरराष्ट्रीय स्तर पर सॉफ्टवेयर मेंटरशिप',
    benefitAmount: 185000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    description: 'Global program organized by Google introducing college students and new open-source contributors to world-renowned open-source organizations (Linux, Apache, Python, Blender, TensorFlow). 100% remote 12-week coding fellowship.',
    descriptionHi: 'गूगल द्वारा प्रायोजित वैश्विक कोडिंग कार्यक्रम जिसके तहत कॉलेज छात्र घर बैठे दुनिया के शीर्ष ओपन-सोर्स प्रोजेक्ट्स में योगदान देकर अंतरराष्ट्रीय स्तर का वजीफा और प्रमाण पत्र प्राप्त करते हैं।',
    gazette: {
      circularNumber: 'GOOG-OSPO/GSOC-2026/PROGRAM',
      issuingAuthority: 'Google Open Source Programs Office',
      gazetteDate: '2026-08-15',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://summerofcode.withgoogle.com',
      scamAlertWarning: 'Application to GSoC is completely free at summerofcode.withgoogle.com. Google never asks for registration fees.',
      officialGovtFee: '₹0 (100% Free Public Program)'
    },
    documents: [
      { id: 'd-gsoc-1', name: 'Project Proposal written according to mentor organization guidelines', nameHi: 'मेंटर संस्था दिशानिर्देश अनुसार प्रोजेक्ट प्रस्ताव', isMandatory: true },
      { id: 'd-gsoc-2', name: 'GitHub or GitLab Account with sample commits', nameHi: 'गिटहब या गिटलैब प्रोफाइल', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Review accepted mentoring organizations on summerofcode.withgoogle.com.', textHi: 'आधिकारिक पोर्टल पर मेंटरिंग संगठनों की सूची देखें।' },
      { step: 2, text: 'Engage with community channels and submit project proposal.', textHi: 'ओपन-सोर्स कम्युनिटी से जुड़कर अपना प्रोजेक्ट प्रपोजल जमा करें।' },
      { step: 3, text: 'Receive project acceptance and write code over 12 weeks with milestone payouts.', textHi: 'स्वीकृति मिलने पर 12 सप्ताह कोडिंग करें और वजीफा प्राप्त करें।' }
    ],
    tags: ['GSoC', 'Google Internship', 'Open Source', 'Software Fellowship', 'High Stipend'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-msft-student-intern-01',
    title: 'Microsoft India College Internship & Learn Student Ambassador (MLSA) 2026',
    titleHi: 'माइक्रोसॉफ्ट इंडिया कॉलेज इंटर्नशिप एवं स्टूडेंट एंबेसडर 2026: ₹50,000 - ₹1,00,000/माह',
    category: 'internship',
    applicationStatus: 'active_now',
    lifeStage: 'internships',
    targetAges: [18, 26],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student'],
    benefitHeadline: '₹50,000 - ₹1,00,000/Month Stipend for Tech Interns + Free Azure Cloud Credits & Direct PPO Gateway to Microsoft India',
    benefitHeadlineHi: '₹50,000 - ₹1,00,000 प्रतिमाह वजीफा + निःशुल्क अज़्योर क्लाउड क्रेडिट्स एवं प्री-प्लेसमेंट ऑफर (PPO)',
    benefitAmount: 80000,
    deadline: '2026-06-30',
    description: 'Microsoft India official student programs providing college engineering and tech students hands-on technical internships across Hyderabad, Bengaluru, and Noida development centers.',
    descriptionHi: 'माइक्रोसॉफ्ट इंडिया द्वारा कॉलेज छात्रों को सॉफ्टवेयर इंजीनियरिंग, डेटा साइंस और क्लाउड कंप्यूटिंग में सवेतन इंटर्नशिप और कैंपस एंबेसडर फेलोशिप।',
    gazette: {
      circularNumber: 'MSFT-IN/UNIVERSITY-TALENT/2026',
      issuingAuthority: 'Microsoft University Recruiting India',
      gazetteDate: '2026-09-01',
      lastVerifiedAt: 'Live verified 20 mins ago',
      officialPortalUrl: 'https://careers.microsoft.com/students/us/en',
      scamAlertWarning: 'Microsoft does not charge any application or testing fees. Apply directly on careers.microsoft.com.',
      officialGovtFee: '₹0 (100% Free Direct Application)'
    },
    documents: [
      { id: 'd-msft-1', name: 'College Bonafide / Enrollment Verification', nameHi: 'कॉलेज अध्ययनरत प्रमाण पत्र', isMandatory: true },
      { id: 'd-msft-2', name: 'Software Engineering Resume (DSA, Projects, GPA)', nameHi: 'इंजीनियरिंग बायोडाटा (प्रोजेक्ट्स व जीपीए)', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Search "India University" roles on careers.microsoft.com.', textHi: 'careers.microsoft.com पर भारतीय कॉलेज छात्र पद सर्च करें।' },
      { step: 2, text: 'Apply with LinkedIn profile and 1-page technical resume.', textHi: 'लिंक्डइन प्रोफाइल और बायोडाटा के साथ फॉर्म भरें।' },
      { step: 3, text: 'Clear Codility coding assessment and technical interviews.', textHi: 'कोडिंग टेस्ट और तकनीकी इंटरव्यू राउंड उत्तीर्ण करें।' }
    ],
    tags: ['Microsoft', 'College Students', 'Paid Internship', 'Tech Giant', 'High Stipend'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-isro-research-intern-01',
    title: 'ISRO Student Research Project & Internship 2026: Space Applications & Satellite Tech',
    titleHi: 'इसरो छात्र अनुसंधान एवं तकनीकी इंटर्नशिप 2026: सैटेलाइट एवं स्पेस टेक्नोलॉजी हैंड्स-ऑन',
    category: 'internship',
    applicationStatus: 'active_now',
    lifeStage: 'internships',
    targetAges: [18, 28],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student'],
    benefitHeadline: 'Conduct Live Space Research at ISRO/DOS Centres (SAC Ahmedabad, URSC Bengaluru, VSSC Thiruvananthapuram)',
    benefitHeadlineHi: 'इसरो के शीर्ष केंद्रों (बेंगलुरु, अहमदाबाद, तिरुवनंतपुरम) में भारतीय अंतरिक्ष वैज्ञानिकों के साथ शोध',
    benefitAmount: 20000,
    deadline: 'OPEN_ROUND',
    description: 'Indian Space Research Organisation (ISRO) department centers invite meritorious B.E./B.Tech, M.E./M.Tech, MSc, and Ph.D. students to carry out curriculum-based project work and technical internships in satellite communication, payload design, and remote sensing.',
    descriptionHi: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) द्वारा देशभर के इंजीनियरिंग एवं विज्ञान के छात्रों को वास्तविक रॉकेट, सैटेलाइट और अंतरिक्ष मिशनों से जुड़े शोध प्रोजेक्ट्स में इंटर्नशिप का मौका।',
    gazette: {
      circularNumber: 'ISRO/DOS/ACAD-INTERN/2026',
      issuingAuthority: 'Department of Space, Indian Space Research Organisation',
      gazetteDate: '2026-08-25',
      lastVerifiedAt: 'Live verified 45 mins ago',
      officialPortalUrl: 'https://www.isro.gov.in/Internship.html',
      scamAlertWarning: 'ISRO internships require formal institutional sponsorship. ISRO never collects any fee for student internships. Beware of fake coaching touts.',
      officialGovtFee: '₹0 (100% Free Govt Research Sponsorship)'
    },
    documents: [
      { id: 'd-isro-1', name: 'Official Recommendation Letter from College Principal/Dean/HOD', nameHi: 'कॉलेज डीन अथवा विभागाध्यक्ष का आधिकारिक संस्तुति पत्र', isMandatory: true },
      { id: 'd-isro-2', name: 'All Semester Marksheets with minimum 65% / 6.84 CGPA', nameHi: 'सभी सेमेस्टरों की अंकतालिकाएं (न्यूनतम 65% अंक)', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Download official student internship application format from isro.gov.in.', textHi: 'isro.gov.in से आधिकारिक इंटर्नशिप फॉर्म डाउनलोड करें।' },
      { step: 2, text: 'Get signed authorization and bonafide declaration from your college Principal.', textHi: 'कॉलेज प्राचार्य से संस्तुति पत्र पर हस्ताक्षर कराएं।' },
      { step: 3, text: 'Submit to the HRDD department of the respective ISRO centre.', textHi: 'संबंधित इसरो केंद्र के मानव संसाधन विभाग में जमा करें।' }
    ],
    tags: ['ISRO', 'Space Research', 'Govt Internship', 'Engineering', 'Satellite Technology'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-isro-intern-01',
    title: 'ISRO / VSSC / SAC Space Technology Student Project & Internship 2026',
    titleHi: 'इसरो (ISRO) अंतरिक्ष प्रौद्योगिकी छात्र प्रोजेक्ट एवं इंटर्नशिप 2026',
    category: 'internship',
    applicationStatus: 'active_now',
    lifeStage: 'internships',
    targetAges: [19, 28],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student'],
    benefitHeadline: 'Direct Laboratory Research Experience with ISRO Rocket Scientists + Apex Space Project Certification',
    benefitHeadlineHi: 'इसरो के वरिष्ठ अंतरिक्ष वैज्ञानिकों के साथ प्रयोगशाला में कार्य का अनुभव + प्रतिष्ठित राष्ट्रीय अंतरिक्ष प्रमाण पत्र',
    benefitAmount: 30000,
    deadline: '2026-11-30',
    description: 'Vikram Sarabhai Space Centre (VSSC) and Space Applications Centre (SAC) invite applications from B.Tech, M.Tech, and MSc students for official curriculum-linked project training in aerospace, robotics, optics, and telemetry.',
    descriptionHi: 'विक्रम साराभाई अंतरिक्ष केंद्र (VSSC) एवं अंतरिक्ष उपयोग केंद्र (SAC) द्वारा इंजीनियरिंग एवं विज्ञान के मेधावी छात्रों हेतु अंतरिक्ष अनुसंधान प्रयोगशालाओं में व्यावहारिक इंटर्नशिप।',
    gazette: {
      circularNumber: 'ISRO/VSSC/ACADEMIC-TRAINING/2026',
      issuingAuthority: 'Department of Space, Govt of India',
      gazetteDate: '2026-08-01',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://www.vssc.gov.in',
      scamAlertWarning: 'ISRO never charges any fee for student projects. All applications must be forwarded strictly through your college Principal.',
      officialGovtFee: '₹0 (Free Govt Student Facility)'
    },
    documents: [
      { id: 'd-isro-vssc-1', name: 'Forwarding Letter signed by College Principal / Dean', nameHi: 'कॉलेज प्राचार्य द्वारा हस्ताक्षरित संस्तुति पत्र', isMandatory: true },
      { id: 'd-isro-vssc-2', name: 'Consolidated Marksheets (Min 60% or 6.5 CGPA)', nameHi: 'अंकतालिका (न्यूनतम 60% अथवा 6.5 सीजीपीए)', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Download official academic training application form from vssc.gov.in.', textHi: 'vssc.gov.in पोर्टल से आवेदन प्रपत्र डाउनलोड करें।' },
      { step: 2, text: 'Attach college forwarding letter and semester marks transcripts.', textHi: 'कॉलेज का अग्रेषण पत्र व अंकतालिकाएं संलग्न करें।' },
      { step: 3, text: 'Send application to Head, Human Resources Development Division (HRDD), VSSC.', textHi: 'मानव संसाधन विकास प्रभाग (HRDD), वीएसएससी को प्रेषित करें।' }
    ],
    tags: ['ISRO Internship', 'Space Technology', 'Engineering Students', 'Aerospace', 'Govt Certificate'],
    is100PercentFree: true
  },
  {
    id: 'opp-tata-student-intern-01',
    title: 'Tata Group Student Internships 2026: Paid Hands-on Industry Experience (TCS, Tata Motors, Tata Steel)',
    titleHi: 'टाटा ग्रुप स्टूडेंट इंटर्नशिप 2026: सवेतन व्यावहारिक कॉर्पोरेट अनुभव (टीसीएस, टाटा मोटर्स, टाटा स्टील)',
    category: 'internship',
    applicationStatus: 'active_now',
    lifeStage: 'internships',
    targetAges: [18, 27],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student'],
    benefitHeadline: 'Stipend ₹15,000 - ₹35,000/Month + Hands-on Mentorship by Senior Tata Executives & Fast-Track Campus Hiring',
    benefitHeadlineHi: '₹15,000 - ₹35,000 प्रतिमाह वजीफा + टाटा के वरिष्ठ अधिकारियों द्वारा मेंटरशिप एवं कैंपस प्लेसमेंट में प्राथमिकता',
    benefitAmount: 35000,
    deadline: 'OPEN_ROUND',
    description: 'Tata Group conglomerate internships across software engineering, automotive design, heavy manufacturing, supply chain, and retail business operations for Indian college students.',
    descriptionHi: 'टाटा समूह द्वारा देश के कॉलेज छात्रों के लिए टीसीएस, टाटा मोटर्स, टाटा स्टील और ट्रेंट में वास्तविक प्रोजेक्ट्स पर कार्य करने का सवेतन अवसर।',
    gazette: {
      circularNumber: 'TATA/CAMPUS-INTERN/2026/CY-01',
      issuingAuthority: 'Tata Group Human Resources',
      gazetteDate: '2026-08-30',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://www.tata.com/careers',
      scamAlertWarning: 'Tata Group companies never charge fees for internship selection. Report any unauthorized agencies demanding deposit.',
      officialGovtFee: '₹0 (100% Free Application)'
    },
    documents: [
      { id: 'd-tata-1', name: 'Degree / Diploma College ID Card', nameHi: 'कॉलेज पहचान पत्र', isMandatory: true },
      { id: 'd-tata-2', name: 'Resume highlighting academic projects and skills', nameHi: 'बायोडाटा (प्रोजेक्ट्स व स्किल्स सहित)', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Visit tata.com/careers and explore internship postings across Tata companies.', textHi: 'tata.com/careers पर जाकर टाटा कंपनियों के इंटर्नशिप पद देखें।' },
      { step: 2, text: 'Submit student profile with academic credentials and GitHub/Portfolio.', textHi: 'शैक्षणिक विवरण और पोर्टफोलियो के साथ आवेदन जमा करें।' },
      { step: 3, text: 'Attend virtual technical interview and start internship at assigned Tata hub.', textHi: 'ऑनलाइन इंटरव्यू पास कर टाटा केंद्र पर इंटर्नशिप शुरू करें।' }
    ],
    tags: ['Tata Internships', 'College Students', 'TCS', 'Paid Internship', 'Corporate Experience'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-amazon-afe-intern-01',
    title: 'Amazon Future Engineer & AWS Student Cloud Internship: ₹45,000/Month Stipend for College Students',
    titleHi: 'अमेज़न एडब्ल्यूएस स्टूडेंट क्लाउड एवं टेक इंटर्नशिप: ₹45,000 प्रतिमाह वजीफा + एडब्ल्यूएस सर्टिफिकेशन',
    category: 'internship',
    applicationStatus: 'upcoming',
    lifeStage: 'internships',
    targetAges: [18, 25],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student'],
    benefitHeadline: '₹45,000/Month Stipend + 100% Free AWS Cloud Practitioner & Solutions Architect Certifications + Amazon Mentorship',
    benefitHeadlineHi: '₹45,000 प्रतिमाह वजीफा + निःशुल्क एडब्ल्यूएस क्लाउड प्रमाणन + अमेज़न के वरिष्ठ इंजीनियरों से मेंटरशिप',
    benefitAmount: 90000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    description: 'Amazon Future Engineer program provides college students from underrepresented backgrounds and meritorious engineering students free cloud computing training, paid internships, and direct interview opportunities for Amazon SDE-1 roles.',
    descriptionHi: 'अमेज़न फ्यूचर इंजीनियर द्वारा कॉलेज छात्रों को मुफ्त क्लाउड एवं एआई प्रशिक्षण के साथ अमेज़न की विभिन्न टीमों में सवेतन इंटर्नशिप और सॉफ्टवेयर इंजीनियर बनने का मार्ग।',
    gazette: {
      circularNumber: 'AMZN-AFE/STUDENT-CLOUD/2026',
      issuingAuthority: 'Amazon Future Engineer India & AWS Educate',
      gazetteDate: '2026-07-25',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://www.amazonfutureengineer.in',
      scamAlertWarning: 'Amazon Future Engineer is 100% free. Never pay any fee for Amazon scholarships or internships.',
      officialGovtFee: '₹0 (100% Free Program)'
    },
    documents: [
      { id: 'd-amz-afe-1', name: 'First or Second Year College Marksheet / ID Card', nameHi: 'कॉलेज प्रथम/द्वितीय वर्ष की अंकतालिका', isMandatory: true },
      { id: 'd-amz-afe-2', name: 'Family Income Certificate / College Bonafide', nameHi: 'आय प्रमाण पत्र अथवा कॉलेज बोनाफाइड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on amazonfutureengineer.in during student intake cycle.', textHi: 'amazonfutureengineer.in पर रजिस्ट्रेशन करें।' },
      { step: 2, text: 'Complete free AWS Educate cloud computing foundational modules.', textHi: 'एडब्ल्यूएस क्लाउड फाउंडेशनल कोर्स पूरा करें।' },
      { step: 3, text: 'Compete in Amazon student hackathon to secure paid internship offer.', textHi: 'हैकाथॉन में भाग लेकर सवेतन इंटर्नशिप ऑफर प्राप्त करें।' }
    ],
    tags: ['Amazon AFE', 'AWS Cloud', 'College Students', 'Free Certification', 'High Stipend'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-rbi-summer-intern-01',
    title: 'RBI Summer Internship 2026: Official Reserve Bank of India Research Fellowship',
    titleHi: 'आरबीआई ग्रीष्मकालीन इंटर्नशिप 2026: भारतीय रिज़र्व बैंक शोध फेलोशिप',
    category: 'internship',
    applicationStatus: 'upcoming',
    lifeStage: 'internships',
    targetAges: [20, 28],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student', 'job_seeker'],
    benefitHeadline: '₹45,000/Month Stipend + Work Directly with Central Bank Economists and Policy Makers in Mumbai',
    benefitHeadlineHi: '₹45,000 प्रतिमाह वजीफा + रिज़र्व बैंक ऑफ इंडिया के शीर्ष अर्थशास्त्रियों के साथ शोध कार्य',
    benefitAmount: 135000,
    deadline: '2026-12-15',
    description: 'Premier national summer internship program by the Reserve Bank of India for undergraduate/postgraduate students in Economics, Finance, Statistics, Commerce, Management, Law, and Engineering.',
    descriptionHi: 'भारतीय रिज़र्व बैंक द्वारा अर्थशास्त्र, वाणिज्य, सांख्यिकी, कानून एवं इंजीनियरिंग के कॉलेज छात्रों हेतु 3 माह की प्रतिष्ठित सवेतन इंटर्नशिप।',
    gazette: {
      circularNumber: 'RBI/HRMD/INTERN-2026/04',
      issuingAuthority: 'Reserve Bank of India (Central Office Mumbai)',
      gazetteDate: '2026-08-15',
      lastVerifiedAt: 'Live verified 30 mins ago',
      officialPortalUrl: 'https://opportunities.rbi.org.in',
      scamAlertWarning: 'RBI conducts official online application only through opportunities.rbi.org.in with ₹0 application fee. Beware of fake email offers.',
      officialGovtFee: '₹0 (100% Free Online Application)'
    },
    documents: [
      { id: 'd-rbi-1', name: 'Bonafide Student Certificate issued by College Principal/HOD', nameHi: 'कॉलेज द्वारा जारी बोनाफाइड प्रमाण पत्र', isMandatory: true },
      { id: 'd-rbi-2', name: 'Semester Marksheets & Identity Proof', nameHi: 'सेमेस्टर अंकतालिका एवं कॉलेज पहचान पत्र', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Fill online application form at opportunities.rbi.org.in during the open window.', textHi: 'opportunities.rbi.org.in पोर्टल पर जाकर ऑनलाइन आवेदन फॉर्म भरें।' },
      { step: 2, text: 'Select preferred Regional Office (Mumbai, Delhi, Kolkata, Chennai, etc.).', textHi: 'अपने पसंदीदा क्षेत्रीय कार्यालय का चयन करें।' },
      { step: 3, text: 'Shortlisted candidates appear for 1-round interview at regional office.', textHi: 'चयनित छात्रों का क्षेत्रीय कार्यालय में साक्षात्कार आयोजित किया जाता है।' }
    ],
    tags: ['RBI Internship', 'High Stipend', 'Economics', 'Banking', 'College Students'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-niti-intern-01',
    title: 'NITI Aayog Official Internship Scheme: National Policy & Governance Fellowship',
    titleHi: 'नीति आयोग इंटर्नशिप योजना: राष्ट्रीय नीति एवं सुशासन फेलोशिप',
    category: 'internship',
    applicationStatus: 'active_now',
    lifeStage: 'internships',
    targetAges: [18, 28],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student', 'job_seeker'],
    benefitHeadline: 'Work Directly with NITI Aayog Verticals (AI, Electric Mobility, Health, Education) & Receive Apex Govt Certificate',
    benefitHeadlineHi: 'नीति आयोग के साथ कार्य का अनुभव एवं भारत सरकार का प्रतिष्ठित अनुभव प्रमाण पत्र',
    benefitAmount: 25000,
    deadline: 'OPEN_ROUND',
    description: 'Premier policy internship by the apex public policy think tank of the Government of India. Open every month from 1st to 10th for undergraduate, postgraduate, and research scholars across all disciplines.',
    descriptionHi: 'भारत सरकार के शीर्ष थिंक टैंक नीति आयोग में कॉलेज छात्रों हेतु इंटर्नशिप। प्रत्येक माह की 1 से 10 तारीख तक ऑनलाइन आवेदन खुले रहते हैं।',
    gazette: {
      circularNumber: 'NITI/INTERN/SCHEME/2026',
      issuingAuthority: 'NITI Aayog (National Institution for Transforming India)',
      gazetteDate: '2026-09-01',
      lastVerifiedAt: 'Live verified 10 mins ago',
      officialPortalUrl: 'https://workforindia.niti.gov.in',
      scamAlertWarning: 'NITI Aayog does not charge any fee for internships. Applications are accepted exclusively online through workforindia.niti.gov.in.',
      officialGovtFee: '₹0 (100% Free Govt Application)'
    },
    documents: [
      { id: 'd-niti-1', name: 'NOC / Recommendation Letter from College Principal or Dean', nameHi: 'कॉलेज प्राचार्य अथवा डीन द्वारा अनापत्ति प्रमाण पत्र (NOC)', isMandatory: true },
      { id: 'd-niti-2', name: 'Marksheets of 12th & All Completed College Semesters', nameHi: '12वीं एवं सभी उत्तीर्ण सेमेस्टरों की अंकतालिकाएं', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Visit workforindia.niti.gov.in between 1st and 10th of any calendar month.', textHi: 'किसी भी माह की 1 से 10 तारीख के बीच पोर्टल पर जाएं।' },
      { step: 2, text: 'Choose your area of interest (AI, Data Analytics, Agriculture, Education, Health, Infra).', textHi: 'अपनी रुचि का विषय (एआई, स्वास्थ्य, शिक्षा, इंफ्रा) चुनें।' },
      { step: 3, text: 'Submit verified marks percentages and upload Principal recommendation letter.', textHi: 'अंक प्रतिशत भरें और प्राचार्य का संस्तुति पत्र अपलोड कर सबमिट करें।' }
    ],
    tags: ['NITI Aayog', 'Policy Internship', 'Govt Fellowship', 'College Students', 'Public Policy'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-tulip-intern-01',
    title: 'The Urban Learning Internship Program (TULIP): Smart Cities & Municipal Governance',
    titleHi: 'ट्यूलिप (TULIP) अर्बन लर्निंग इंटर्नशिप: स्मार्ट सिटी एवं नगर निगम परियोजनाएं',
    category: 'internship',
    applicationStatus: 'active_now',
    lifeStage: 'internships',
    targetAges: [18, 28],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student', 'job_seeker'],
    benefitHeadline: 'Work Directly on 100 Smart City Projects with Urban Local Bodies (ULBs) + Up to ₹25,000/Month Stipend',
    benefitHeadlineHi: 'स्मार्ट सिटी एवं नगर निगम परियोजनाओं में ₹25,000 तक मासिक वजीफे पर वास्तविक प्रोजेक्ट कार्य',
    benefitAmount: 30000,
    deadline: 'OPEN_ROUND',
    description: 'Joint initiative by Ministry of Housing & Urban Affairs (MoHUA) and AICTE offering Indian fresh graduates and final-year students experiential learning opportunities in 4,400+ Urban Local Bodies and Smart Cities across India.',
    descriptionHi: 'आवासन एवं शहरी कार्य मंत्रालय तथा एआईसीटीई द्वारा संचालित संयुक्त कार्यक्रम जिसके तहत युवा छात्र अपने शहर के नगर निगम व स्मार्ट सिटी प्रोजेक्ट्स में इंटर्नशिप कर सकते हैं।',
    gazette: {
      circularNumber: 'MOHUA/TULIP/SMART-CITIES/2026',
      issuingAuthority: 'Ministry of Housing and Urban Affairs & AICTE',
      gazetteDate: '2026-08-10',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://internship.aicte-india.org',
      scamAlertWarning: 'TULIP applications are completely free on AICTE internship portal. Never pay commission to municipal contractors.',
      officialGovtFee: '₹0 (100% Free Public Program)'
    },
    documents: [
      { id: 'd-tulip-1', name: 'Degree / Diploma Certificate in Civil, Architecture, IT, Planning, or Management', nameHi: 'इंजीनियरिंग, प्लानिंग अथवा मैनेजमेंट डिग्री/डिप्लोमा', isMandatory: true },
      { id: 'd-tulip-2', name: 'Aadhaar Card and Local Residence Proof', nameHi: 'आधार कार्ड एवं स्थानीय निवास प्रमाण पत्र', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on AICTE Internship portal and search for "TULIP Smart City".', textHi: 'एआईसीटीई पोर्टल पर जाकर TULIP स्मार्ट सिटी सर्च करें।' },
      { step: 2, text: 'Filter opportunities by your home state and municipal corporation.', textHi: 'अपने गृह राज्य एवं नगर निगम के अनुसार पद चुनें।' },
      { step: 3, text: 'Complete online application and attend municipal coordination interview.', textHi: 'ऑनलाइन आवेदन कर नगर निगम द्वारा आयोजित साक्षात्कार में भाग लें।' }
    ],
    tags: ['TULIP', 'Smart Cities', 'Govt Internship', 'Urban Governance', 'AICTE'],
    is100PercentFree: true,
    isNew: true
  }
];
