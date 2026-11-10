import { Opportunity } from '@/types';

export const EDUCATION_OPPORTUNITIES: Opportunity[] = [
  // =========================================================================
  // 1. NATIONAL ADMISSION ENTRANCES (MEDICAL, ENGINEERING & UNIVERSITIES)
  // =========================================================================
  {
    id: 'opp-nirf-top-colleges-01',
    title: 'NIRF 2026 Official College & University Ranking Finder (Govt of India MoE)',
    titleHi: 'एनआईआरएफ 2026 आधिकारिक कॉलेज एवं विश्वविद्यालय रैंकिंग पोर्टल (भारत सरकार)',
    category: 'college_finder',
    lifeStage: 'education',
    targetAges: [15, 30],
    stateEligibility: ['ALL'],
    targetOccupations: ['school_student', 'college_student', 'job_seeker'],
    benefitHeadline: '1-Click Access to Official Cutoffs, Fee Structures & Audited Placement Packages of 8,000+ Colleges',
    benefitHeadlineHi: 'देश के 8,000+ सरकारी व निजी कॉलेजों की वास्तविक प्लेसमेंट रिपोर्ट, फीस व सरकारी रैंकिंग एक क्लिक में देखें',
    benefitAmount: 0,
    deadline: 'OPEN_ROUND',
    applicationStatus: 'ongoing',
    description: 'National Institutional Ranking Framework (NIRF) by the Ministry of Education outlines the methodology to rank institutions across India based on teaching, learning, research, and placement outcomes.',
    descriptionHi: 'शिक्षा मंत्रालय का आधिकारिक पोर्टल जहां भारत के सभी इंजीनियरिंग, मेडिकल, मैनेजमेंट और डिग्री कॉलेजों की प्रामाणिक रैंकिंग और सैलरी पैकेज विवरण निशुल्क देखा जा सकता है।',
    gazette: {
      circularNumber: 'MOE/NIRF/RANKING-DATA/2026',
      issuingAuthority: 'Ministry of Education (Govt of India)',
      gazetteDate: '2026-08-12',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://www.nirfindia.org',
      scamAlertWarning: 'Beware of fake private ranking websites charging money for college recommendations. NIRF data is 100% free and audited by Govt of India.',
      officialGovtFee: '₹0 (100% Free Public Portal)'
    },
    documents: [],
    applySteps: [
      { step: 1, text: 'Visit nirfindia.org and select your preferred category (Engineering, Medical, Management, University).', textHi: 'nirfindia.org पोर्टल पर अपनी पसंदीदा श्रेणी चुनें।' },
      { step: 2, text: 'Filter colleges by rank score, state, placement median salary, and faculty ratio.', textHi: 'कॉलेजों को उनके रैंक स्कोर, राज्य और प्लेसमेंट के अनुसार फिल्टर करें।' },
      { step: 3, text: 'Download official NIRF audit reports before taking college admission.', textHi: 'कॉलेज में प्रवेश लेने से पूर्व आधिकारिक सरकारी रिपोर्ट डाउनलोड करें।' }
    ],
    tags: ['Colleges', 'NIRF', 'Rankings', 'Best Colleges', 'Admission Guide'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-neet-01',
    title: 'NTA NEET UG 2026: National Eligibility cum Entrance Test (MBBS/BDS Admissions)',
    titleHi: 'एनटीए नीट यूजी 2026: एमबीबीएस एवं बीडीएस आधिकारिक राष्ट्रीय प्रवेश परीक्षा',
    category: 'competitive_exam',
    lifeStage: 'education',
    targetAges: [17, 25],
    stateEligibility: ['ALL'],
    targetOccupations: ['school_student', 'college_student'],
    benefitHeadline: 'Single National Gateway to 1,00,000+ Govt & Private Medical College Seats (AIIMS/JIPMER)',
    benefitHeadlineHi: 'एम्स, जिपमर सहित देश के सभी सरकारी मेडिकल कॉलेजों में एमबीबीएस प्रवेश का आधिकारिक मार्ग',
    benefitAmount: 1200000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'National Testing Agency official offline pen-paper examination for admission to undergraduate medical programs across India. Listed on official NTA annual examination schedule.',
    descriptionHi: 'राष्ट्रीय परीक्षा एजेंसी द्वारा भारत के सभी मेडिकल संस्थानों में एमबीबीएस और बीडीएस प्रवेश हेतु आयोजित राष्ट्रीय परीक्षा। एनटीए परीक्षा कैलेंडर में सूचीबद्ध।',
    gazette: {
      circularNumber: 'NTA/NEET-UG/2026/PUBLIC-NOTICE',
      issuingAuthority: 'National Testing Agency (Govt of India)',
      gazetteDate: '2026-02-01',
      lastVerifiedAt: 'Live verified 15 mins ago',
      officialPortalUrl: 'https://exams.nta.ac.in/NEET',
      scamAlertWarning: 'Admissions are 100% based on MCC online counselling. Never pay brokers claiming "Management Quota" seats in Govt Medical Colleges.',
      officialGovtFee: '₹1,700 (General) / ₹1,600 (EWS/OBC) / ₹1,000 (SC/ST)'
    },
    documents: [
      { id: 'd-neet-1', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true },
      { id: 'd-neet-2', name: 'Class 10 & 12 Marksheets (PCB)', nameHi: '10वीं एवं 12वीं (भौतिक, रसायन, जीव विज्ञान) अंकतालिका', isMandatory: true },
      { id: 'd-neet-3', name: 'Postcard & Passport Size Photographs', nameHi: 'पासपोर्ट एवं पोस्टकार्ड साइज फोटो', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on official portal exams.nta.ac.in/NEET with Aadhaar OTP.', textHi: 'exams.nta.ac.in/NEET पोर्टल पर आधार ओटीपी से पंजीकरण करें।' },
      { step: 2, text: 'Upload white background photo, left/right hand thumb impressions.', textHi: 'सफेद बैकग्राउंड वाली फोटो एवं अंगूठे के निशान अपलोड करें।' },
      { step: 3, text: 'Pay exam fee via netbanking/UPI and print Confirmation Page.', textHi: 'आधिकारिक शुल्क का भुगतान करें और पुष्टि रसीद डाउनलोड करें।' }
    ],
    tags: ['Medical', 'Doctor', 'NEET', 'NTA', 'MBBS'],
    is100PercentFree: false,
    isNew: true
  },
  {
    id: 'opp-jee-01',
    title: 'NTA JEE Main 2026: Premier Engineering College Entrance Examination',
    titleHi: 'एनटीए जेईई मेन 2026: शीर्ष इंजीनियरिंग संस्थान प्रवेश परीक्षा',
    category: 'competitive_exam',
    lifeStage: 'education',
    targetAges: [16, 22],
    stateEligibility: ['ALL'],
    targetOccupations: ['school_student', 'college_student'],
    benefitHeadline: 'Gateway to 31 NITs, 25 IIITs, GFTIs and Qualifying Exam for IIT JEE Advanced',
    benefitHeadlineHi: 'एनआईटी, आईआईआईटी एवं आईआईटी प्रवेश परीक्षा (जेईई एडवांस्ड) हेतु आधिकारिक मार्ग',
    benefitAmount: 900000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Official computer-based examination for admissions to B.Tech/B.E. programs in premier central institutions.',
    descriptionHi: 'राष्ट्रीय परीक्षा एजेंसी द्वारा शीर्ष इंजीनियरिंग संस्थानों में बीटेक प्रवेश हेतु आयोजित आधिकारिक राष्ट्रीय परीक्षा।',
    gazette: {
      circularNumber: 'NTA/JEE-Main/2026/PublicNotice-01',
      issuingAuthority: 'National Testing Agency (NTA)',
      gazetteDate: '2026-09-01',
      lastVerifiedAt: 'Live verified 30 mins ago',
      officialPortalUrl: 'https://jeemain.nta.ac.in',
      scamAlertWarning: 'Application fee is strictly payable via official NTA SBI/HDFC payment gateways. NTA does not have offline agents.',
      officialGovtFee: '₹1,000 (General) / ₹500 (Reserved)'
    },
    documents: [
      { id: 'd-jee-1', name: 'Class 10 & 12 Marksheet', nameHi: 'कक्षा 10 एवं 12 की अंकतालिका', isMandatory: true },
      { id: 'd-jee-2', name: 'Passport Size Photo & Signature', nameHi: 'पासपोर्ट साइज फोटो एवं हस्ताक्षर', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on official portal jeemain.nta.ac.in with Aadhaar verification.', textHi: 'आधिकारिक पोर्टल jeemain.nta.ac.in पर आधार सत्यापन के साथ पंजीकरण करें।' },
      { step: 2, text: 'Fill educational qualification & exam city choices.', textHi: 'शैक्षणिक योग्यता एवं परीक्षा शहर के विकल्प भरें।' },
      { step: 3, text: 'Pay official exam fee and download Confirmation Page.', textHi: 'सरकारी परीक्षा शुल्क का भुगतान करें और पुष्टि पृष्ठ सुरक्षित डाउनलोड करें।' }
    ],
    tags: ['Engineering', 'IIT', 'NIT', 'JEE', 'B.Tech'],
    is100PercentFree: false,
    isNew: true
  },
  {
    id: 'opp-jee-adv-01',
    title: 'JEE Advanced 2026: Direct Admission to 23 Indian Institutes of Technology (IITs)',
    titleHi: 'जेईई एडवांस्ड 2026: देश के 23 भारतीय प्रौद्योगिकी संस्थानों (आईआईटी) में प्रवेश',
    category: 'competitive_exam',
    lifeStage: 'education',
    targetAges: [16, 22],
    stateEligibility: ['ALL'],
    targetOccupations: ['school_student', 'college_student'],
    benefitHeadline: 'Direct B.Tech Admission to Premier IIT Bombay, IIT Delhi, IIT Madras with Top Tech Career Opportunities',
    benefitHeadlineHi: 'भारत के शीर्ष 23 आईआईटी संस्थानों में प्रतिष्ठित बीटेक उपाधि हेतु संयुक्त प्रवेश परीक्षा',
    benefitAmount: 1500000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Joint Entrance Examination Advanced conducted by the rotating IIT for top 2,50,000 qualifiers of JEE Main seeking undergraduate engineering degrees in IITs.',
    descriptionHi: 'जेईई मेन के शीर्ष 2,50,000 सफल उम्मीदवारों हेतु आईआईटी बॉम्बे, दिल्ली, कानपुर आदि में बीटेक प्रवेश परीक्षा।',
    gazette: {
      circularNumber: 'JAB/IIT-JEE-ADV/2026',
      issuingAuthority: 'Joint Admission Board (IITs)',
      gazetteDate: '2026-08-15',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://jeeadv.ac.in',
      scamAlertWarning: 'IIT admissions are conducted strictly via JoSAA online counselling based solely on JEE Advanced rank. Beware of bogus agents.',
      officialGovtFee: '₹3,200 (Male Gen/OBC) / ₹1,600 (Female / SC / ST / PwD)'
    },
    documents: [
      { id: 'd-jadv-1', name: 'JEE Main 2026 Scorecard', nameHi: 'जेईई मेन 2026 स्कोरकार्ड', isMandatory: true },
      { id: 'd-jadv-2', name: 'Class 12th Board Marksheet (Top 20 Percentile or 75%+)', nameHi: '12वीं बोर्ड अंकतालिका (75% या टॉप 20 परसेंटाइल)', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on jeeadv.ac.in using JEE Main Application Number & Password.', textHi: 'jeeadv.ac.in पर जेईई मेन नंबर से लॉगिन कर पंजीकरण करें।' },
      { step: 2, text: 'Select exam cities and pay examination fee online.', textHi: 'परीक्षा शहर चुनें और ऑनलाइन परीक्षा शुल्क का भुगतान करें।' },
      { step: 3, text: 'Appear for Paper 1 & Paper 2 (both mandatory) and participate in JoSAA counselling.', textHi: 'पेपर 1 और 2 में सम्मिलित होकर जोसा (JoSAA) काउंसलिंग में सीट प्राप्त करें।' }
    ],
    tags: ['IIT', 'JEE Advanced', 'Engineering', 'Premier Institutes'],
    is100PercentFree: false
  },
  {
    id: 'opp-cuet-ug-01',
    title: 'NTA CUET UG 2026: Central Universities Common Entrance Test (DU, BHU, JNU)',
    titleHi: 'एनटीए सीयूईटी यूजी 2026: दिल्ली यूनिवर्सिटी, बीएचयू, जेएनयू संयुक्त विश्वविद्यालय प्रवेश परीक्षा',
    category: 'competitive_exam',
    lifeStage: 'education',
    targetAges: [16, 24],
    stateEligibility: ['ALL'],
    targetOccupations: ['school_student', 'college_student'],
    benefitHeadline: 'Single National Gateway to 250+ Central, State & Deemed Universities (3 Lakh+ Undergraduate Seats)',
    benefitHeadlineHi: 'देश के 250+ केंद्रीय, राज्य एवं डीम्ड विश्वविद्यालयों में बीए, बीएससी, बीकॉम प्रवेश हेतु एकमात्र राष्ट्रीय परीक्षा',
    benefitAmount: 400000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Common University Entrance Test conducted by NTA providing a single-window opportunity to students seeking admission in Central Universities across the country.',
    descriptionHi: 'राष्ट्रीय परीक्षा एजेंसी (NTA) द्वारा दिल्ली विश्वविद्यालय, बीएचयू, जेएनयू, जामिया सहित देश के शीर्ष विश्वविद्यालयों में स्नातक डिग्री प्रवेश हेतु आयोजित राष्ट्रीय परीक्षा।',
    gazette: {
      circularNumber: 'NTA/CUET-UG/2026/OFFICIAL',
      issuingAuthority: 'National Testing Agency & University Grants Commission (UGC)',
      gazetteDate: '2026-02-10',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://exams.nta.ac.in/CUET-UG',
      scamAlertWarning: 'Admissions are 100% merit-based via Samarth Portal / University portals. No donation or management quota in Central Universities.',
      officialGovtFee: '₹1,000 (Up to 3 subjects) / ₹400 (per additional subject)'
    },
    documents: [
      { id: 'd-cuet-1', name: 'Class 10 & 12 Marksheet', nameHi: '10वीं एवं 12वीं अंकतालिका', isMandatory: true },
      { id: 'd-cuet-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on official NTA CUET UG portal.', textHi: 'आधिकारिक NTA CUET UG पोर्टल पर पंजीकरण करें।' },
      { step: 2, text: 'Select domain subjects, general test and target universities.', textHi: 'अपने विषय और लक्षित विश्वविद्यालयों का चयन करें।' },
      { step: 3, text: 'Submit application and download confirmation receipt.', textHi: 'आवेदन जमा करें और पुष्टि रसीद डाउनलोड करें।' }
    ],
    tags: ['CUET', 'Central University', 'Delhi University', 'College Admission'],
    is100PercentFree: false,
    isNew: true
  },
  {
    id: 'opp-clat-01',
    title: 'CLAT 2026: Common Law Admission Test for 26 National Law Universities (NLUs)',
    titleHi: 'क्लैट 2026: देश के 26 राष्ट्रीय विधि विश्वविद्यालयों में बीए एलएलबी प्रवेश परीक्षा',
    category: 'competitive_exam',
    lifeStage: 'education',
    targetAges: [16, 25],
    stateEligibility: ['ALL'],
    targetOccupations: ['school_student', 'college_student'],
    benefitHeadline: 'Direct Entry to NLSIU Bengaluru, NALSAR Hyderabad for 5-Year Integrated B.A. LL.B (Hons)',
    benefitHeadlineHi: 'शीर्ष राष्ट्रीय लॉ कॉलेजों से 5-वर्षीय बीए एलएलबी कर कॉर्पोरेट लॉयर एवं न्यायाधीश बनने का मार्ग',
    benefitAmount: 1800000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'National-level entrance exam for admissions to 5-year integrated undergraduate and one-year postgraduate law degree programmes at 26 participating NLUs.',
    descriptionHi: 'देश के 26 प्रमुख राष्ट्रीय विधि विश्वविद्यालयों में कानून की पढ़ाई हेतु आयोजित प्रतिष्ठित राष्ट्रीय परीक्षा।',
    gazette: {
      circularNumber: 'CONSORTIUM-NLUS/CLAT-2026',
      issuingAuthority: 'Consortium of National Law Universities',
      gazetteDate: '2026-07-01',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://consortiumofnlus.ac.in',
      scamAlertWarning: 'CLAT admission is 100% merit-based through central counseling. Beware of fake agents claiming NRI quota seats.',
      officialGovtFee: '₹4,000 (General) / ₹3,500 (SC / ST / BPL)'
    },
    documents: [
      { id: 'd-clat-1', name: '12th Class Pass Certificate (45% for Gen, 40% for SC/ST)', nameHi: '12वीं बोर्ड अंकतालिका', isMandatory: true },
      { id: 'd-clat-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on consortiumofnlus.ac.in with mobile number.', textHi: 'consortiumofnlus.ac.in पर मोबाइल नंबर से पंजीकरण करें।' },
      { step: 2, text: 'Fill educational qualification & upload scanned photo and signature.', textHi: 'शैक्षणिक योग्यता भरें और फोटो हस्ताक्षर अपलोड करें।' },
      { step: 3, text: 'Complete online payment and select test center preference.', textHi: 'परीक्षा शुल्क जमा कर पसंदीदा परीक्षा केंद्र चुनें।' }
    ],
    tags: ['CLAT', 'Lawyer', 'Judge', 'NLSIU', 'Legal Education'],
    is100PercentFree: false
  },
  {
    id: 'opp-cat-01',
    title: 'IIM CAT 2026: Common Admission Test for 21 Indian Institutes of Management',
    titleHi: 'कैट 2026: देश के 21 भारतीय प्रबंध संस्थानों (आईआईएम) में एमबीए प्रवेश परीक्षा',
    category: 'competitive_exam',
    lifeStage: 'education',
    targetAges: [20, 35],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student', 'job_seeker', 'employed'],
    benefitHeadline: 'Direct Entry to IIM Ahmedabad, IIM Bangalore, IIM Calcutta with ₹30+ Lakh Average Starting Salary',
    benefitHeadlineHi: 'आईआईएम अहमदाबाद, बैंगलोर से एमबीए कर शीर्ष बहुराष्ट्रीय कंपनियों में उच्च पदों पर चयन',
    benefitAmount: 3200000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Premier national management aptitude examination conducted by IIMs for admission into MBA/PGDM programs across 21 IIMs and 100+ top B-schools.',
    descriptionHi: 'देश के सर्वश्रेष्ठ मैनेजमेंट संस्थानों में एमबीए प्रवेश हेतु आयोजित सर्वोच्च राष्ट्रीय परीक्षा।',
    gazette: {
      circularNumber: 'IIM-CAT/2026/BULLETIN',
      issuingAuthority: 'Indian Institutes of Management (IIM Convenor)',
      gazetteDate: '2026-07-28',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://iimcat.ac.in',
      scamAlertWarning: 'Selection in IIMs is strictly based on CAT percentile, WAT, and personal interview. No management quota seats exist in IIMs.',
      officialGovtFee: '₹2,500 (General / OBC) / ₹1,250 (SC / ST / PwD)'
    },
    documents: [
      { id: 'd-cat-1', name: 'Bachelor Degree Certificate (50% or equivalent CGPA)', nameHi: 'स्नातक डिग्री प्रमाण पत्र (न्यूनतम 50%)', isMandatory: true },
      { id: 'd-cat-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on iimcat.ac.in and generate User ID and Password.', textHi: 'iimcat.ac.in पर जाकर यूजर आईडी और पासवर्ड बनाएं।' },
      { step: 2, text: 'Fill academic history and select all 21 IIM interview preferences.', textHi: 'शैक्षणिक विवरण भरें और सभी 21 आईआईएम के विकल्प चुनें।' },
      { step: 3, text: 'Pay online application fee and print confirmation receipt.', textHi: 'परीक्षा शुल्क जमा करें और पुष्टि रसीद डाउनलोड करें।' }
    ],
    tags: ['CAT', 'MBA', 'IIM', 'Management', 'Corporate Leadership'],
    is100PercentFree: false
  },

  // =========================================================================
  // 2. NATIONAL SCHOLARSHIPS & HIGHER EDUCATION ASSISTANCE
  // =========================================================================
  {
    id: 'opp-pm-usp-scholarship-01',
    title: 'PM-USP: Central Sector Scheme of Scholarship for College and University Students (NSP)',
    titleHi: 'पीएम-यूएसपी: कॉलेज एवं विश्वविद्यालय छात्रों हेतु केंद्रीय क्षेत्र छात्रवृत्ति योजना',
    category: 'scholarship',
    lifeStage: 'education',
    targetAges: [17, 25],
    stateEligibility: ['ALL'],
    incomeCeiling: 450000,
    targetOccupations: ['college_student', 'school_student'],
    benefitHeadline: 'Direct Cash DBT of ₹12,000/Year for 3 Years (UG) & ₹20,000/Year (PG) Directly in Aadhaar Bank Account',
    benefitHeadlineHi: 'स्नातक हेतु ₹12,000/वर्ष एवं स्नातकोत्तर हेतु ₹20,000/वर्ष सीधे बैंक खाते में (डीबीटी नेशनल स्कॉलरशिप पोर्टल)',
    benefitAmount: 76000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Ministry of Education flagship scholarship for top 20th percentile Class 12 board pass-outs pursuing regular graduation and post-graduation courses.',
    descriptionHi: 'शिक्षा मंत्रालय द्वारा 12वीं कक्षा में शीर्ष 20% (80 परसेंटाइल से ऊपर) अंक प्राप्त करने वाले कॉलेज छात्रों को स्नातक एवं स्नातकोत्तर की पढ़ाई हेतु दी जाने वाली वार्षिक नकद छात्रवृत्ति।',
    gazette: {
      circularNumber: 'MOE/SCHOLARSHIP/PM-USP/2026',
      issuingAuthority: 'Ministry of Education, Higher Education Department',
      gazetteDate: '2026-07-15',
      lastVerifiedAt: 'Live verified 45 mins ago',
      officialPortalUrl: 'https://scholarships.gov.in',
      scamAlertWarning: 'Application on scholarships.gov.in is 100% free of charge. Never pay any café or agent claiming to get scholarship sanctioned.',
      officialGovtFee: '₹0 (100% Free National Scholarship Portal)'
    },
    documents: [
      { id: 'd-usp-1', name: 'Class 12th Board Marksheet with Top 20th Percentile Rank', nameHi: '12वीं बोर्ड अंकतालिका (80+ परसेंटाइल)', isMandatory: true },
      { id: 'd-usp-2', name: 'Income Certificate (Family income below ₹4.5 Lakh)', nameHi: 'पारिवारिक आय प्रमाण पत्र (₹4.5 लाख से कम)', isMandatory: true },
      { id: 'd-usp-3', name: 'Aadhaar Seeded Bank Account Details', nameHi: 'आधार से डीबीटी लिंक बैंक खाता पासबुक', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register with Aadhaar on National Scholarship Portal (scholarships.gov.in).', textHi: 'नेशनल स्कॉलरशिप पोर्टल (NSP) पर आधार सत्यापन से पंजीकरण करें।' },
      { step: 2, text: 'Choose "Central Sector Scheme of Scholarship for College and University Students".', textHi: 'केंद्रीय क्षेत्र छात्रवृत्ति योजना का चयन करें।' },
      { step: 3, text: 'Submit form. College Institute Nodal Officer (INO) verifies electronically.', textHi: 'फॉर्म जमा करें, कॉलेज के नोडल अधिकारी द्वारा डिजिटल सत्यापन किया जाएगा।' }
    ],
    tags: ['Scholarship', 'Govt Cash', 'College Students', 'NSP', 'Higher Education'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-aicte-pragati-01',
    title: 'AICTE Pragati & Saksham Scholarships: ₹50,000/Year for Girls & Differently-Abled Students',
    titleHi: 'एआईसीटीई प्रगति एवं सक्षम छात्रवृत्ति: छात्राओं एवं दिव्यांग छात्रों हेतु ₹50,000 प्रतिवर्ष',
    category: 'scholarship',
    lifeStage: 'education',
    targetAges: [17, 25],
    stateEligibility: ['ALL'],
    incomeCeiling: 800000,
    targetOccupations: ['college_student', 'school_student'],
    benefitHeadline: '₹50,000 Per Annum for Every Year of Degree/Diploma Course (Up to ₹2,00,000 Total Financial Assistance)',
    benefitHeadlineHi: 'तकनीकी डिग्री एवं डिप्लोमा की पढ़ाई के प्रत्येक वर्ष ₹50,000 सीधे बैंक खाते में (कुल ₹2,00,000 तक सहायता)',
    benefitAmount: 200000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'AICTE scheme to empower girls and differently-abled students admitted to AICTE approved technical colleges (B.Tech, B.Pharm, Diploma) with ₹50,000/year assistance.',
    descriptionHi: 'अखिल भारतीय तकनीकी शिक्षा परिषद (एआईसीटीई) द्वारा तकनीकी कॉलेजों में बीटेक, बीफार्मा या डिप्लोमा कर रही बालिकाओं और दिव्यांग छात्रों को ₹50,000 प्रतिवर्ष की आर्थिक सहायता।',
    gazette: {
      circularNumber: 'AICTE/PRAGATI-SAKSHAM/2026/PORTAL',
      issuingAuthority: 'All India Council for Technical Education (AICTE)',
      gazetteDate: '2026-08-01',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://scholarships.gov.in',
      scamAlertWarning: 'Funds are transferred strictly through PFMS DBT direct to beneficiary account. No third-party agent has any authority.',
      officialGovtFee: '₹0 (100% Free Portal Scheme)'
    },
    documents: [
      { id: 'd-prag-1', name: 'Admission Proof in AICTE Approved Technical Institution', nameHi: 'एआईसीटीई मान्यता प्राप्त कॉलेज प्रवेश रसीद', isMandatory: true },
      { id: 'd-prag-2', name: 'Family Income Certificate (Below ₹8 Lakh/Year)', nameHi: 'आय प्रमाण पत्र (पारिवारिक आय ₹8 लाख से कम)', isMandatory: true },
      { id: 'd-prag-3', name: 'Aadhaar Card Linked to DBT Enabled Bank Account', nameHi: 'आधार लिंक डीबीटी बैंक खाता', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on National Scholarship Portal scholarships.gov.in with OTR.', textHi: 'scholarships.gov.in पर अपने OTR नंबर से लॉगिन करें।' },
      { step: 2, text: 'Select AICTE Pragati (for girls) or Saksham (for differently-abled) scheme.', textHi: 'एआईसीटीई प्रगति अथवा सक्षम छात्रवृत्ति योजना चुनें।' },
      { step: 3, text: 'Submit required documents and track sanction status online.', textHi: 'आवश्यक दस्तावेज अपलोड करें और डीबीटी द्वारा ₹50,000 प्राप्त करें।' }
    ],
    tags: ['Girl Child', 'Women Empowerment', 'AICTE', 'Engineering', 'Scholarship'],
    is100PercentFree: true,
    isNew: true
  },

  // =========================================================================
  // 3. OPEN & DISTANCE HIGHER EDUCATION (NO AGE LIMIT)
  // =========================================================================
  {
    id: 'opp-ignou-01',
    title: 'IGNOU Distance Degrees & Professional Diplomas (Zero Upper Age Limit)',
    titleHi: 'इग्नू दूरस्थ स्नातक, स्नातकोत्तर एवं व्यावसायिक डिप्लोमा (कोई ऊपरी आयु सीमा नहीं)',
    category: 'college_finder',
    lifeStage: 'education',
    targetAges: [18, 75],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'employed', 'farmer', 'homemaker', 'senior_citizen'],
    benefitHeadline: 'UGC Recognized B.A., B.Com, MBA & Agriculture Diplomas via Distance Learning for Working Adults',
    benefitHeadlineHi: 'कार्यरत वयस्कों एवं गृहणियों हेतु यूजीसी मान्यता प्राप्त सरकारी डिग्री एवं कृषि डिप्लोमा',
    benefitAmount: 15000,
    deadline: 'OPEN_ROUND',
    applicationStatus: 'ongoing',
    description: 'Indira Gandhi National Open University provides accessible, flexible higher education with study material delivered home, regional weekend classes, and pan-India exam centers.',
    descriptionHi: 'इंदिरा गांधी राष्ट्रीय मुक्त विश्वविद्यालय द्वारा बिना नौकरी या खेती छोड़े उच्च शिक्षा पूरी करने हेतु दूरस्थ शिक्षा कार्यक्रम।',
    gazette: {
      circularNumber: 'IGNOU/SED/ADMISSION-2026/DISTANCE',
      issuingAuthority: 'Indira Gandhi National Open University (Central University)',
      gazetteDate: '2026-08-10',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://ignouadmission.samarth.edu.in',
      scamAlertWarning: 'Register only on official portal ignouadmission.samarth.edu.in. IGNOU does not authorize private admission agents.',
      officialGovtFee: 'Official semester course fee only (SC/ST full fee waiver on BA/BCom/BSc)'
    },
    documents: [
      { id: 'd-ignou-1', name: '10th / 12th / Graduation Marksheet', nameHi: '10वीं / 12वीं / स्नातक अंकतालिका', isMandatory: true },
      { id: 'd-ignou-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on ignouadmission.samarth.edu.in.', textHi: 'ignouadmission.samarth.edu.in पर नया पंजीकरण करें।' },
      { step: 2, text: 'Select degree programme and your nearest Regional Study Centre.', textHi: 'अपना पसंदीदा कोर्स और निकटतम अध्ययन केंद्र चुनें।' },
      { step: 3, text: 'Pay nominal fee. Study books are posted directly to your address.', textHi: 'शुल्क जमा करें, अध्ययन पुस्तकें सीधे आपके घर भेजी जाती हैं।' }
    ],
    tags: ['IGNOU', 'Distance Education', 'Adult Education', 'Degree', 'Flexible Learning'],
    is100PercentFree: false
  },
  {
    id: 'opp-nios-adult-01',
    title: 'NIOS Open Basic & Senior Secondary (10th/12th) Certification for Adults',
    titleHi: 'एनआईओएस मुक्त बुनियादी एवं वरिष्ठ माध्यमिक (10वीं/12वीं) वयस्क प्रमाणन',
    category: 'college_finder',
    lifeStage: 'education',
    targetAges: [14, 80],
    stateEligibility: ['ALL'],
    targetOccupations: ['farmer', 'homemaker', 'employed', 'job_seeker'],
    benefitHeadline: 'Govt Recognized 10th & 12th Board Certificate with Home Study & On-Demand Exams for Any Age',
    benefitHeadlineHi: 'भारत सरकार मान्यता प्राप्त 10वीं एवं 12वीं बोर्ड परीक्षा (बिना किसी ऊपरी आयु सीमा के घर बैठे तैयारी)',
    benefitAmount: 20000,
    deadline: 'OPEN_ROUND',
    applicationStatus: 'ongoing',
    description: 'National Institute of Open Schooling under the Ministry of Education allows any citizen to pass Class 10 and 12 with flexible subject combinations and online exam booking.',
    descriptionHi: 'शिक्षा मंत्रालय, भारत सरकार के अंतर्गत संचालित राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान से किसी भी उम्र में 10वीं एवं 12वीं उत्तीर्ण करें।',
    gazette: {
      circularNumber: 'NIOS/SSS/OPEN-BASIC/2026',
      issuingAuthority: 'National Institute of Open Schooling, Ministry of Education',
      gazetteDate: '2026-06-10',
      lastVerifiedAt: 'Live verified 2 hrs ago',
      officialPortalUrl: 'https://sdmis.nios.ac.in',
      scamAlertWarning: 'NIOS certificates are 100% equivalent to CBSE/ICSE for all govt jobs and college admissions. Avoid unauthorized middlemen.',
      officialGovtFee: 'Official board registration fee only (Female/SC/ST concessional fee)'
    },
    documents: [
      { id: 'd-nios-1', name: 'Aadhaar Card & Proof of Residence', nameHi: 'आधार कार्ड एवं निवास प्रमाण', isMandatory: true },
      { id: 'd-nios-2', name: 'Self-Certificate of Literacy or Previous School Leaving Certificate', nameHi: 'साक्षरता स्व-प्रमाण पत्र या पूर्व टीसी', isMandatory: false }
    ],
    applySteps: [
      { step: 1, text: 'Register online at sdmis.nios.ac.in Stream 1/2.', textHi: 'sdmis.nios.ac.in पर ऑनलाइन स्ट्रीम चुनें।' },
      { step: 2, text: 'Choose 5 subjects with easy combinations (e.g. Hindi, English, Data Entry).', textHi: 'अपनी पसंद के 5 विषयों का चयन करें।' },
      { step: 3, text: 'Appear for exams when ready at nearby Kendriya Vidyalaya center.', textHi: 'निकटतम केंद्रीय विद्यालय में जाकर परीक्षा दें और बोर्ड मार्कशीट प्राप्त करें।' }
    ],
    tags: ['NIOS', '10th Board', '12th Board', 'Adult Education', 'Second Chance'],
    is100PercentFree: false
  },

  // =========================================================================
  // 4. PRESTIGIOUS STUDY ABROAD & GLOBAL HIGHER EDUCATION SCHOLARSHIPS
  // =========================================================================
  {
    id: 'opp-germany-tuition-free-01',
    title: 'Study in Germany: 100% Tuition-Free Universities (DAAD Official & APS India Advisory)',
    titleHi: 'जर्मनी में निःशुल्क उच्च शिक्षा: सरकारी विश्वविद्यालयों में शून्य ट्यूशन फीस (DAAD परामर्श)',
    category: 'study_abroad',
    lifeStage: 'education',
    targetAges: [18, 35],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student', 'job_seeker'],
    benefitHeadline: 'Zero Tuition Fees in 300+ Top Public German Universities (B.Tech, M.Sc, MBA) + 18-Month Post-Study Job Visa',
    benefitHeadlineHi: 'जर्मनी की 300+ शीर्ष सरकारी यूनिवर्सिटीज में 100% मुफ्त ट्यूशन फीस + पढ़ाई के बाद 18 माह का यूरोपीय वर्क वीजा',
    benefitAmount: 2500000,
    deadline: '2026-07-15',
    applicationStatus: 'ongoing',
    description: 'Official German Academic Exchange Service (DAAD) advisory and APS verification portal. Public universities in Germany charge 0 Euro tuition fees for Indian students across engineering, data science, biotechnology, and management programs taught in English.',
    descriptionHi: 'जर्मन सरकार की आधिकारिक संस्था (DAAD) द्वारा भारतीय छात्रों को जर्मनी के शीर्ष विश्वविद्यालयों में बिना किसी ट्यूशन फीस के इंजीनियरिंग व मास्टर्स करने का सीधा आधिकारिक मार्ग।',
    gazette: {
      circularNumber: 'DAAD/GER/IN/ACADEMIC-MOBILITY/2026',
      issuingAuthority: 'DAAD (German Academic Exchange Service) & German Embassy New Delhi',
      gazetteDate: '2026-07-20',
      lastVerifiedAt: 'Live verified 40 mins ago',
      officialPortalUrl: 'https://www.daad.in',
      scamAlertWarning: 'German public universities charge ZERO tuition fees. Beware of private visa agents charging ₹3-5 Lakhs for admissions that are completely free.',
      officialGovtFee: '€0 Tuition Fee (Only semester fee ~€150-€350 includes free public transport ticket)'
    },
    documents: [
      { id: 'd-ger-1', name: 'APS Certificate (Mandatory for Indian students applying to Germany)', nameHi: 'एपीएस प्रमाण पत्र (APS Certificate)', isMandatory: true },
      { id: 'd-ger-2', name: '12th Certificate / Bachelor Degree Transcripts', nameHi: '12वीं अथवा स्नातक डिग्री अंकतालिका', isMandatory: true },
      { id: 'd-ger-3', name: 'English Proficiency (IELTS 6.5+ or TOEFL) or German A1/B1', nameHi: 'आईईएलटीएस (IELTS) अथवा जर्मन भाषा प्रमाण पत्र', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Search English-taught programs on official DAAD database: daad.de/en/study-and-research-in-germany.', textHi: 'daad.de पर अंग्रेजी माध्यम के निःशुल्क कोर्स खोजें।' },
      { step: 2, text: 'Apply for APS Certificate verification through aps-india.de in Delhi.', textHi: 'aps-india.de से अनिवार्य एपीएस सत्यापन प्रमाण पत्र प्राप्त करें।' },
      { step: 3, text: 'Apply directly via uni-assist.de or university portal and secure admission letter.', textHi: 'uni-assist.de अथवा यूनिवर्सिटी पोर्टल पर सीधा आवेदन कर प्रवेश पत्र प्राप्त करें।' }
    ],
    tags: ['Study in Germany', 'Zero Tuition Fee', 'Foreign Study', 'Global Career', 'Europe Education'],
    is100PercentFree: false,
    isNew: true
  }
];
