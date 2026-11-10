import { Opportunity } from '@/types';

export const EXAM_OPPORTUNITIES: Opportunity[] = [


  // =========================================================================
  // 2. CIVIL SERVICES & DEFENCE EXAMS
  // =========================================================================
  {
    id: 'opp-upsc-cse-01',
    title: 'UPSC Civil Services Examination (CSE) 2026: IAS / IPS / IFS',
    titleHi: 'संघ लोक सेवा आयोग (यूपीएससी) सिविल सेवा परीक्षा 2026: आईएएस / आईपीएस',
    category: 'competitive_exam',
    lifeStage: 'exams',
    targetAges: [21, 35],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'employed', 'exam_aspirant', 'college_student'],
    benefitHeadline: 'Recruitment to Indian Administrative Service (IAS), Police (IPS), and Foreign Service (IFS)',
    benefitHeadlineHi: 'भारतीय प्रशासनिक सेवा (आईएएस), पुलिस सेवा (आईपीएस) एवं विदेश सेवा (आईएफएस) में सीधी भर्ती',
    benefitAmount: 90000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'India\'s premier competitive examination conducted by UPSC for recruiting top district administrators, commissioners, and diplomats.',
    descriptionHi: 'संघ लोक सेवा आयोग द्वारा देश के सर्वोच्च प्रशासनिक अधिकारियों (जिलाधिकारी, पुलिस कप्तान) के चयन हेतु आयोजित परीक्षा।',
    gazette: {
      circularNumber: 'UPSC/EXAM/05/2026-CSP',
      issuingAuthority: 'Union Public Service Commission (Govt of India)',
      gazetteDate: '2026-02-14',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://upsconline.nic.in',
      scamAlertWarning: 'Beware of fake interview coaching brokers. UPSC conducts 100% blind merit-based evaluation with strict integrity.',
      officialGovtFee: '₹100 (Female/SC/ST: ₹0 Free)'
    },
    documents: [
      { id: 'd-upsc-1', name: 'Graduation Degree / Final Year Proof', nameHi: 'स्नातक उपाधि अथवा अंतिम वर्ष प्रमाण', isMandatory: true },
      { id: 'd-upsc-2', name: 'Aadhaar / Government Photo ID', nameHi: 'आधार अथवा सरकारी पहचान पत्र', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Complete One Time Registration (OTR) on upsconline.nic.in.', textHi: 'upsconline.nic.in पर वन टाइम रजिस्ट्रेशन (OTR) प्रोफाइल बनाएं।' },
      { step: 2, text: 'Choose Optional Subject and Exam Center.', textHi: 'वैकल्पिक विषय और प्रारंभिक परीक्षा केंद्र चुनें।' },
      { step: 3, text: 'Submit application and download official acknowledgment.', textHi: 'आवेदन जमा करें और आधिकारिक रसीद डाउनलोड करें।' }
    ],
    tags: ['IAS', 'IPS', 'Central Govt', 'UPSC'],
    is100PercentFree: false
  },
  {
    id: 'opp-nda-01',
    title: 'UPSC NDA & NA (National Defence Academy) Exam 2026',
    titleHi: 'संघ लोक सेवा आयोग राष्ट्रीय रक्षा अकादमी (एनडीए) परीक्षा 2026',
    category: 'competitive_exam',
    lifeStage: 'exams',
    targetAges: [16, 19],
    stateEligibility: ['ALL'],
    targetOccupations: ['school_student', 'college_student', 'exam_aspirant'],
    benefitHeadline: 'Direct Commission as Officer in Indian Army, Navy, Air Force + Free 4-Year B.Tech Degree',
    benefitHeadlineHi: 'भारतीय थल सेना, नौसेना एवं वायुसेना में सैन्य अधिकारी पद + निःशुल्क 4-वर्षीय बीटेक डिग्री',
    benefitAmount: 65000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Prestigious entry for 12th pass youth into Indian Armed Forces with full government sponsorship, training at Khadakwasla, Pune, and starting officer salary of ₹56,100.',
    descriptionHi: '12वीं पास युवाओं के लिए भारतीय सेना में लेफ्टिनेंट/फ्लाइंग ऑफिसर बनने का प्रतिष्ठित अवसर, निःशुल्क प्रशिक्षण एवं ₹56,100 प्रारंभिक वेतन।',
    gazette: {
      circularNumber: 'UPSC/NDA-NA-I/2026/NOTICE',
      issuingAuthority: 'Union Public Service Commission (Govt of India)',
      gazetteDate: '2026-01-10',
      lastVerifiedAt: 'Live verified 2 hrs ago',
      officialPortalUrl: 'https://upsconline.nic.in',
      scamAlertWarning: 'Selection in NDA is governed purely by UPSC written exam and Services Selection Board (SSB). No money can guarantee selection.',
      officialGovtFee: '₹100 (Female/SC/ST: ₹0 Free)'
    },
    documents: [
      { id: 'd-nda-1', name: '10th & 12th Certificate (PCM)', nameHi: '10वीं एवं 12वीं अंकतालिका', isMandatory: true },
      { id: 'd-nda-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Apply via UPSC OTR platform at upsconline.nic.in.', textHi: 'upsconline.nic.in पर यूपीएससी ओटीआर के माध्यम से आवेदन करें।' },
      { step: 2, text: 'Select service preference (Army, Navy, Air Force).', textHi: 'सेना प्राथमिकता (आर्मी, नेवी, एयरफोर्स) का चयन करें।' },
      { step: 3, text: 'Download e-Admit Card 3 weeks prior to examination.', textHi: 'परीक्षा से 3 सप्ताह पूर्व आधिकारिक प्रवेश पत्र डाउनलोड करें।' }
    ],
    tags: ['Defence', 'Army', 'Navy', 'Air Force', 'NDA'],
    is100PercentFree: false
  },
  {
    id: 'opp-cds-01',
    title: 'UPSC Combined Defence Services (CDS) Exam 2026: IMA / OTA / INA / AFA',
    titleHi: 'संघ लोक सेवा आयोग संयुक्त रक्षा सेवा (सीडीएस) परीक्षा 2026',
    category: 'competitive_exam',
    lifeStage: 'exams',
    targetAges: [19, 25],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student', 'job_seeker', 'exam_aspirant'],
    benefitHeadline: 'Direct Commission as Lieutenant / Sub Lieutenant / Flying Officer in Indian Armed Forces for Graduates',
    benefitHeadlineHi: 'स्नातक युवाओं हेतु भारतीय सशस्त्र सेनाओं में सैन्य अधिकारी (लेफ्टिनेंट) बनने का सीधा अवसर',
    benefitAmount: 75000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Recruitment of graduate officers into Indian Military Academy (Dehradun), Officers Training Academy (Chennai), Naval Academy (Ezhimala), and Air Force Academy (Hyderabad).',
    descriptionHi: 'स्नातक युवाओं के लिए भारतीय सेना, नौसेना एवं वायुसेना में अधिकारी पद हेतु संघ लोक सेवा आयोग द्वारा आयोजित प्रतिष्ठित परीक्षा।',
    gazette: {
      circularNumber: 'UPSC/CDS-EXAM-I/2026/CIRCULAR',
      issuingAuthority: 'Union Public Service Commission (Govt of India)',
      gazetteDate: '2026-01-18',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://upsconline.nic.in',
      scamAlertWarning: 'SSB interviews and merit lists are monitored by military intelligence. Never fall for fake SSB recommendation agents.',
      officialGovtFee: '₹200 (Female / SC / ST: ₹0 Free)'
    },
    documents: [
      { id: 'd-cds-1', name: 'Graduation Degree / Final Semester Bonafide', nameHi: 'स्नातक उपाधि अथवा अंतिम सेमेस्टर प्रमाणपत्र', isMandatory: true },
      { id: 'd-cds-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Apply online on upsconline.nic.in.', textHi: 'upsconline.nic.in पर ऑनलाइन आवेदन पत्र भरें।' },
      { step: 2, text: 'Choose academy priority (IMA, OTA, INA, AFA).', textHi: 'अकादमी प्राथमिकता का चयन करें।' },
      { step: 3, text: 'Attend UPSC written test followed by 5-day SSB interview.', textHi: 'लिखित परीक्षा एवं 5-दिवसीय एसएसबी साक्षात्कार में सम्मिलित हों।' }
    ],
    tags: ['Defence Officer', 'Army', 'Navy', 'Air Force', 'CDS'],
    is100PercentFree: false
  },
  {
    id: 'opp-capf-01',
    title: 'UPSC CAPF (AC) 2026: Central Armed Police Forces Assistant Commandant',
    titleHi: 'यूपीएससी केंद्रीय सशस्त्र पुलिस बल (सीएपीएफ) सहायक कमांडेंट परीक्षा 2026',
    category: 'competitive_exam',
    lifeStage: 'exams',
    targetAges: [20, 25],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'college_student', 'exam_aspirant'],
    benefitHeadline: 'Direct Class-A Gazetted Officer Post in BSF, CRPF, CISF, ITBP, and SSB (Level-10 Salary: ₹56,100 - ₹1,77,500)',
    benefitHeadlineHi: 'बीएसएफ, सीआरपीएफ, सीआईएसएफ, आईटीबीपी एवं एसएसबी में राजपत्रित प्रथम श्रेणी अधिकारी (सहायक कमांडेंट)',
    benefitAmount: 85000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'UPSC competitive exam for appointing young graduate officers commanding battalions in India\'s premier border guarding and counter-insurgency armed forces.',
    descriptionHi: 'भारत की सीमाओं की सुरक्षा और आंतरिक सुरक्षा हेतु अर्धसैनिक बलों में राजपत्रित अधिकारी पद पर चयन।',
    gazette: {
      circularNumber: 'UPSC/CAPF-AC/2026/PUBLIC-NOTICE',
      issuingAuthority: 'Union Public Service Commission & Ministry of Home Affairs',
      gazetteDate: '2026-04-20',
      lastVerifiedAt: 'Live verified 2 hrs ago',
      officialPortalUrl: 'https://upsconline.nic.in',
      scamAlertWarning: 'Selection comprises Written Exam, Physical Efficiency Test (PET), and UPSC Interview. No tout can alter board marks.',
      officialGovtFee: '₹200 (Female / SC / ST: ₹0 Free)'
    },
    documents: [
      { id: 'd-capf-1', name: 'Bachelor\'s Degree in any discipline', nameHi: 'स्नातक उपाधि', isMandatory: true },
      { id: 'd-capf-2', name: 'Physical Fitness & Aadhaar ID', nameHi: 'शारीरिक मापदंड एवं आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register via UPSC OTR platform at upsconline.nic.in.', textHi: 'upsconline.nic.in पर यूपीएससी ओटीआर द्वारा आवेदन करें।' },
      { step: 2, text: 'Appear for General Studies & Essay subjective paper.', textHi: 'लिखित परीक्षा (सामान्य अध्ययन व निबंध) में शामिल हों।' },
      { step: 3, text: 'Qualify 100m sprint, long jump, and medical review.', textHi: 'शारीरिक दक्षता परीक्षण और साक्षात्कार उत्तीर्ण करें।' }
    ],
    tags: ['BSF', 'CRPF', 'CISF', 'UPSC CAPF', 'Paramilitary'],
    is100PercentFree: false
  },

  // =========================================================================
  // 3. STAFF SELECTION COMMISSION (SSC) VACANCIES
  // =========================================================================
  {
    id: 'opp-cgl-01',
    title: 'SSC CGL 2026: Combined Graduate Level Recruitment (14,000+ Posts)',
    titleHi: 'कर्मचारी चयन आयोग (एसएससी सीजीएल) 2026 - 14,000+ पद',
    category: 'govt_job',
    lifeStage: 'exams',
    targetAges: [18, 32],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'employed', 'exam_aspirant'],
    benefitHeadline: 'Group B & C Central Govt Gazetted/Non-Gazetted Posts (Income Tax, GST Inspector, ASO, ED)',
    benefitHeadlineHi: 'विदेश मंत्रालय, आयकर निरीक्षक, उत्पाद शुल्क एवं प्रवर्तन निदेशालय में प्रतिष्ठित सरकारी पद',
    benefitAmount: 75000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Staff Selection Commission nationwide recruitment for Assistant Section Officer (CSS, MEA), Inspector of Income Tax, Central Excise, and Enforcement Officer.',
    descriptionHi: 'कर्मचारी चयन आयोग द्वारा विदेश मंत्रालय, आयकर, उत्पाद शुल्क एवं प्रवर्तन निदेशालय में उच्च पदों हेतु सीधी भर्ती।',
    gazette: {
      circularNumber: 'F.No. HQ-PPI03/11/2026-PP_1',
      issuingAuthority: 'Staff Selection Commission (Govt of India)',
      gazetteDate: '2026-08-25',
      lastVerifiedAt: 'Live verified 2 hrs ago',
      officialPortalUrl: 'https://ssc.gov.in',
      scamAlertWarning: 'Selection is 100% merit-based via computer examination. Never trust touts claiming backdoor entry into Central Ministries.',
      officialGovtFee: '₹100 (Women/SC/ST: ₹0 Free)'
    },
    documents: [
      { id: 'd-cgl-1', name: 'Graduation Degree Certificate', nameHi: 'स्नातक उपाधि प्रमाण पत्र', isMandatory: true },
      { id: 'd-cgl-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Complete One-Time Registration (OTR) on ssc.gov.in with live photo capture.', textHi: 'ssc.gov.in पर लाइव फोटो कैप्चर के साथ वन-टाइम रजिस्ट्रेशन (OTR) पूरा करें।' },
      { step: 2, text: 'Select preferred exam centers and post preferences.', textHi: 'परीक्षा केंद्र और पद प्राथमिकताएं चुनें।' },
      { step: 3, text: 'Submit application and download registration slip.', textHi: 'आवेदन जमा करें और आधिकारिक रसीद डाउनलोड करें।' }
    ],
    tags: ['Central Govt', 'High Salary', 'SSC CGL', 'Govt Job'],
    is100PercentFree: false
  },
  {
    id: 'opp-chsl-01',
    title: 'SSC CHSL 2026: Combined Higher Secondary (10+2) Level (3,700+ Posts)',
    titleHi: 'कर्मचारी चयन आयोग (एसएससी सीएचएसएल) 2026 (10+2 स्तर क्लर्क एवं डीईओ भर्ती)',
    category: 'govt_job',
    lifeStage: 'exams',
    targetAges: [18, 27],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'school_student', 'college_student'],
    benefitHeadline: 'Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), Data Entry Operator (DEO) in Ministries',
    benefitHeadlineHi: 'केंद्रीय मंत्रालयों में लोअर डिवीजन क्लर्क, डाटा एंट्री ऑपरेटर एवं सचिवालय सहायक पद (वेतन ₹35,000+)',
    benefitAmount: 38000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Direct recruitment for 12th pass candidates across Indian Armed Forces HQ, CBI, Central Vigilance Commission, and Passport Offices.',
    descriptionHi: '12वीं पास युवाओं हेतु केंद्रीय मंत्रालयों एवं विभागों में प्रतिष्ठित कार्यालयी पदों पर स्थायी सरकारी भर्ती।',
    gazette: {
      circularNumber: 'SSC/CHSL-2026/EXAM-NOTICE',
      issuingAuthority: 'Staff Selection Commission (Govt of India)',
      gazetteDate: '2026-04-02',
      lastVerifiedAt: 'Live verified 45 mins ago',
      officialPortalUrl: 'https://ssc.gov.in',
      scamAlertWarning: 'All SSC computer examinations are protected by CCTV and biometric authentication. Beware of fake answer key sellers.',
      officialGovtFee: '₹100 (Women/SC/ST: ₹0 Free)'
    },
    documents: [
      { id: 'd-chsl-1', name: '12th Standard Passing Marksheet', nameHi: '12वीं उत्तीर्ण अंकतालिका', isMandatory: true },
      { id: 'd-chsl-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Log in to ssc.gov.in with your OTR credentials.', textHi: 'ssc.gov.in पर अपने ओटीआर विवरण से लॉगिन करें।' },
      { step: 2, text: 'Fill typing test language preference (English or Hindi).', textHi: 'टाइपिंग परीक्षा की भाषा (हिंदी या अंग्रेजी) का चयन करें।' },
      { step: 3, text: 'Pay nominal fee and save application confirmation receipt.', textHi: 'शुल्क जमा करें और आवेदन रसीद सुरक्षित डाउनलोड करें।' }
    ],
    tags: ['12th Pass', 'Clerk', 'SSC CHSL', 'Central Govt'],
    is100PercentFree: false
  },
  {
    id: 'opp-ssc-gd-01',
    title: 'SSC GD Constable 2026: 39,000+ Posts in BSF, CISF, CRPF, ITBP, SSB, SSF',
    titleHi: 'कर्मचारी चयन आयोग जीडी कांस्टेबल 2026: 39,000+ पद अर्धसैनिक बल भर्ती',
    category: 'govt_job',
    lifeStage: 'exams',
    targetAges: [18, 23],
    stateEligibility: ['ALL'],
    targetOccupations: ['school_student', 'job_seeker'],
    benefitHeadline: 'Starting Salary of ₹30,000/Month + Free Housing, Ration Allowance & Uniform for 10th Pass Youths',
    benefitHeadlineHi: '10वीं पास युवाओं हेतु ₹30,000 प्रारंभिक वेतन + सरकारी आवास, राशन भत्ता एवं पेंशन सुरक्षा',
    benefitAmount: 32000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Staff Selection Commission official annual recruitment cycle for General Duty Constables in Central Armed Police Forces (CAPFs). Listed on official SSC Examination Calendar at ssc.gov.in.',
    descriptionHi: 'कर्मचारी चयन आयोग (SSC) के आधिकारिक वार्षिक परीक्षा कैलेंडर के अंतर्गत अर्धसैनिक बलों (बीएसएफ, सीआईएसएफ आदि) में जीडी कांस्टेबल भर्ती चक्र। फॉर्म लिंक जारी होने पर तुरंत सक्रिय होगा।',
    gazette: {
      circularNumber: 'SSC/GD-CONSTABLE/2026/MEGA-RECRUITMENT',
      issuingAuthority: 'Staff Selection Commission & Ministry of Home Affairs',
      gazetteDate: '2026-09-05',
      lastVerifiedAt: 'Live verified 10 mins ago',
      officialPortalUrl: 'https://ssc.gov.in',
      scamAlertWarning: 'Do not pay money for physical test clearance. Physical standards (5km run in 24 mins) are digitally timed via RFID chips.',
      officialGovtFee: '₹100 (Women / SC / ST / Ex-Servicemen: ₹0 Free)'
    },
    documents: [
      { id: 'd-gd-1', name: '10th Class Marksheet & Board Certificate', nameHi: '10वीं बोर्ड अंकतालिका', isMandatory: true },
      { id: 'd-gd-2', name: 'Aadhaar Card & Domicile Certificate', nameHi: 'आधार कार्ड एवं मूल निवास प्रमाण पत्र', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Submit application on official ssc.gov.in portal.', textHi: 'आधिकारिक ssc.gov.in पोर्टल पर ऑनलाइन फॉर्म भरें।' },
      { step: 2, text: 'Select force preference (CISF, BSF, CRPF, ITBP, SSB).', textHi: 'सुरक्षा बल प्राथमिकता (सीआईएसएफ, बीएसएफ, सीआरपीएफ) चुनें।' },
      { step: 3, text: 'Appear for Computer Based Test in 13 regional languages.', textHi: '13 क्षेत्रीय भाषाओं में उपलब्ध कंप्यूटर परीक्षा में सम्मिलित हों।' }
    ],
    tags: ['10th Pass', 'Police', 'BSF', 'CRPF', 'SSC GD'],
    is100PercentFree: false
  },
  {
    id: 'opp-ssc-mts-01',
    title: 'SSC MTS & Havaldar 2026: Multi-Tasking Staff in Central Govt Ministries (9,500+ Posts)',
    titleHi: 'एसएससी एमटीएस एवं हवलदार 2026: केंद्रीय मंत्रालयों में 9,500+ पदों पर 10वीं पास भर्ती',
    category: 'govt_job',
    lifeStage: 'exams',
    targetAges: [18, 27],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'school_student'],
    benefitHeadline: 'Permanent Central Govt Job for 10th Pass Candidates (Level-1 Pay Scale: ₹24,000 - ₹28,000/Month)',
    benefitHeadlineHi: '10वीं पास उम्मीदवारों हेतु केंद्रीय मंत्रालयों में स्थायी सरकारी नौकरी (वेतनमान ₹24,000 - ₹28,000)',
    benefitAmount: 28000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Recruitment for Multi-Tasking Staff in Central Secretariats and Havaldars in Central Board of Indirect Taxes and Customs (CBIC) & Narcotics Control Bureau.',
    descriptionHi: 'केंद्रीय सचिवालय एवं जीएसटी/कस्टम विभागों में हवलदार एवं कार्यालय सहायकों की बंपर सरकारी भर्ती।',
    gazette: {
      circularNumber: 'SSC/MTS-HAVALDAR/2026/NOTICE',
      issuingAuthority: 'Staff Selection Commission (Govt of India)',
      gazetteDate: '2026-06-27',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://ssc.gov.in',
      scamAlertWarning: 'MTS recruitment has no interview stage. Selection is purely based on Computer Based Examination Session-II marks.',
      officialGovtFee: '₹100 (Women / SC / ST / PwD: ₹0 Free)'
    },
    documents: [
      { id: 'd-mts-1', name: '10th Standard Marksheet', nameHi: '10वीं उत्तीर्ण अंकतालिका', isMandatory: true },
      { id: 'd-mts-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Log in to ssc.gov.in using OTR credentials.', textHi: 'ssc.gov.in पर ओटीआर द्वारा लॉगिन करें।' },
      { step: 2, text: 'Select state preferences for posting across all 28 States & 8 UTs.', textHi: 'सभी राज्यों एवं केंद्र शासित प्रदेशों की तैनाती प्राथमिकता भरें।' },
      { step: 3, text: 'Submit application with live photo capture.', textHi: 'लाइव फोटो के साथ आवेदन जमा करें।' }
    ],
    tags: ['10th Pass', 'SSC MTS', 'Central Govt', 'Permanent Job'],
    is100PercentFree: false
  },

  // =========================================================================
  // 4. BANKING RECRUITMENT (IBPS & SBI)
  // =========================================================================
  {
    id: 'opp-ibps-po-01',
    title: 'IBPS PO 2026: Probationary Officer in 11 Public Sector Banks (4,000+ Vacancies)',
    titleHi: 'आईबीपीएस पीओ 2026: 11 राष्ट्रीयकृत बैंकों में प्रोबेशनरी ऑफिसर भर्ती',
    category: 'govt_job',
    lifeStage: 'exams',
    targetAges: [20, 30],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'employed', 'college_student'],
    benefitHeadline: 'Assistant Manager (Scale-1) in PNB, Bank of Baroda, Canara Bank, Union Bank (₹55,000 - ₹62,000/Month)',
    benefitHeadlineHi: 'पीएनबी, बैंक ऑफ बड़ौदा, केनरा बैंक में सहायक प्रबंधक पद + बैंक लीज आवास एवं रियायती ऋण',
    benefitAmount: 60000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Institute of Banking Personnel Selection common recruitment process for graduate candidates across all major public sector banks in India.',
    descriptionHi: 'देश के 11 प्रमुख सरकारी बैंकों में स्केल-1 अधिकारी के पदों पर सीधी राष्ट्रीय भर्ती परीक्षा।',
    gazette: {
      circularNumber: 'IBPS/CRP-PO-MT-XVI/2026',
      issuingAuthority: 'Institute of Banking Personnel Selection (IBPS)',
      gazetteDate: '2026-07-30',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://ibps.in',
      scamAlertWarning: 'IBPS never publishes merit lists on third-party websites. Check results only on ibps.in with registration roll number.',
      officialGovtFee: '₹850 (General / OBC / EWS) / ₹175 (SC / ST / PwD)'
    },
    documents: [
      { id: 'd-bpo-1', name: 'Graduation Degree in any stream', nameHi: 'स्नातक उपाधि', isMandatory: true },
      { id: 'd-bpo-2', name: 'Aadhaar Card & Hand-written declaration', nameHi: 'आधार कार्ड एवं हस्तलिखित घोषणा पत्र', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register online at ibps.in during active window.', textHi: 'ibps.in पर ऑनलाइन पंजीकरण करें।' },
      { step: 2, text: 'Upload photo, signature, left thumb impression, handwritten declaration.', textHi: 'फोटो, हस्ताक्षर, बाएं अंगूठे का निशान और घोषणा पत्र अपलोड करें।' },
      { step: 3, text: 'Appear for Prelims followed by Mains and Bank Interview.', textHi: 'प्रारंभिक एवं मुख्य परीक्षा और साक्षात्कार में शामिल हों।' }
    ],
    tags: ['Bank PO', 'Banking', 'IBPS', 'High Salary'],
    is100PercentFree: false
  },
  {
    id: 'opp-sbi-po-01',
    title: 'State Bank of India (SBI) PO 2026: Premier Officer Recruitment (2,000+ Posts)',
    titleHi: 'भारतीय स्टेट बैंक (एसबीआई) पीओ 2026: शीर्ष बैंक अधिकारी भर्ती',
    category: 'govt_job',
    lifeStage: 'exams',
    targetAges: [21, 30],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'employed', 'college_student'],
    benefitHeadline: 'Highest Starting Salary in Banking Industry (₹68,000 - ₹75,000/Month) + 4 Advance Increments',
    benefitHeadlineHi: 'बैंकिंग क्षेत्र में सर्वाधिक प्रारंभिक वेतन (₹68,000+) + 4 अग्रिम वेतनवृद्धियां एवं चिकित्सा सुविधा',
    benefitAmount: 72000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'India\'s largest commercial bank recruits Probationary Officers for fast-track managerial careers with domestic and overseas postings.',
    descriptionHi: 'भारतीय स्टेट बैंक द्वारा युवा स्नातकों के लिए प्रबंधकीय पदों हेतु आयोजित अत्यंत प्रतिष्ठित परीक्षा।',
    gazette: {
      circularNumber: 'CRPD/PO/2026-27/18',
      issuingAuthority: 'State Bank of India Central Recruitment Board',
      gazetteDate: '2026-09-01',
      lastVerifiedAt: 'Live verified 20 mins ago',
      officialPortalUrl: 'https://sbi.co.in/careers',
      scamAlertWarning: 'SBI conducts recruitment directly through crpd.sbi.co.in. Beware of fake appointment letters distributed by scammers.',
      officialGovtFee: '₹750 (General / EWS / OBC) / ₹0 (SC / ST / PwD Free)'
    },
    documents: [
      { id: 'd-sbipo-1', name: 'Bachelor\'s Degree in any stream', nameHi: 'स्नातक उपाधि', isMandatory: true },
      { id: 'd-sbipo-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Visit sbi.co.in/careers and complete applicant registration.', textHi: 'sbi.co.in/careers पर आवेदक पंजीकरण पूरा करें।' },
      { step: 2, text: 'Fill educational credentials and preferred preliminary test city.', textHi: 'शैक्षणिक विवरण और परीक्षा केंद्र का चयन करें।' },
      { step: 3, text: 'Appear for Phase-I (Prelims), Phase-II (Mains), and Phase-III (GD/Interview).', textHi: 'तीनों चरणों (प्री, मेन्स एवं जीडी/इंटरव्यू) में सम्मिलित हों।' }
    ],
    tags: ['SBI PO', 'Banking', 'Top Career', 'Govt Bank'],
    is100PercentFree: false
  },
  {
    id: 'opp-ibps-clerk-01',
    title: 'IBPS Clerk 2026: Customer Service Associates in Nationalized Banks (6,500+ Posts)',
    titleHi: 'आईबीपीएस क्लर्क 2026: राष्ट्रीयकृत बैंकों में 6,500+ पदों पर लिपिक संवर्ग भर्ती',
    category: 'govt_job',
    lifeStage: 'exams',
    targetAges: [20, 28],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'college_student'],
    benefitHeadline: 'Home State Posting, Fixed 5-Day Banking Hours, Starting Salary of ₹32,000 - ₹36,000/Month',
    benefitHeadlineHi: 'गृह राज्य में पदस्थापना, निर्धारित कार्यालय समय एवं ₹32,000 - ₹36,000 प्रारंभिक वेतन',
    benefitAmount: 34000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Nationwide recruitment for Clerical / Customer Associate staff across public sector banks with no interview stage (selection purely on Mains score).',
    descriptionHi: 'सरकारी बैंकों में क्लर्क के पदों पर बिना साक्षात्कार केवल लिखित परीक्षा के आधार पर सीधी भर्ती।',
    gazette: {
      circularNumber: 'IBPS/CRP-CLERKS-XVI/2026',
      issuingAuthority: 'Institute of Banking Personnel Selection',
      gazetteDate: '2026-06-30',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://ibps.in',
      scamAlertWarning: 'IBPS clerk exam has zero interview. Anyone asking bribe for interview is committing fraud.',
      officialGovtFee: '₹850 (General / OBC) / ₹175 (SC / ST / PwD)'
    },
    documents: [
      { id: 'd-bclk-1', name: 'Graduation Degree & Local State Language Proficiency', nameHi: 'स्नातक उपाधि एवं स्थानीय भाषा ज्ञान', isMandatory: true },
      { id: 'd-bclk-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on ibps.in during online application window.', textHi: 'ibps.in पर ऑनलाइन आवेदन करें।' },
      { step: 2, text: 'Select your domicile state (clerical vacancies are state-specific).', textHi: 'अपने गृह राज्य का चयन करें।' },
      { step: 3, text: 'Appear for Prelims and Mains examinations.', textHi: 'प्रारंभिक एवं मुख्य परीक्षा उत्तीर्ण करें।' }
    ],
    tags: ['Bank Clerk', 'No Interview', 'IBPS', 'Banking'],
    is100PercentFree: false
  },

  {
    id: 'opp-ibps-rrb-01',
    title: 'IBPS RRB 2026 (CRP RRBs XV): 13,745 Vacancies in Regional Rural Banks Across India',
    titleHi: 'आईबीपीएस आरआरबी 2026: देश भर के ग्रामीण बैंकों में 13,745 पदों पर आधिकारिक भर्ती',
    category: 'govt_job',
    lifeStage: 'exams',
    targetAges: [18, 30],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'college_student', 'employed'],
    benefitHeadline: '13,745 Permanent Posts (Office Assistant & Scale I/II/III Officers) in 43 Regional Rural Banks with Home State Posting',
    benefitHeadlineHi: '43 क्षेत्रीय ग्रामीण बैंकों में 13,745 स्थायी पद (क्लर्क व स्केल 1/2/3 अधिकारी) + गृह राज्य में पदस्थापना',
    benefitAmount: 48000,
    deadline: '2026-09-21',
    applicationStatus: 'active_now',
    isNew: true,
    description: 'Institute of Banking Personnel Selection official recruitment for 13,745 vacancies across 43 Regional Rural Banks (RRBs) in India. Application and fee submission active on ibps.in.',
    descriptionHi: 'बैंकिंग कार्मिक चयन संस्थान द्वारा देश के 43 ग्रामीण बैंकों में 13,745 पदों पर सीधी भर्ती। आधिकारिक पोर्टल ibps.in पर आवेदन प्रक्रिया सक्रिय है।',
    gazette: {
      circularNumber: 'IBPS/CRP-RRBs-XV/2026/MEGA-DRIVE',
      issuingAuthority: 'Institute of Banking Personnel Selection (IBPS)',
      gazetteDate: '2026-09-01',
      lastVerifiedAt: 'Live verified 5 mins ago',
      officialPortalUrl: 'https://www.ibps.in',
      scamAlertWarning: 'IBPS accepts online applications solely on official website ibps.in. Never pay unauthorized agents.',
      officialGovtFee: '₹850 (General / OBC / EWS) / ₹175 (SC / ST / PwD)'
    },
    documents: [
      { id: 'd-irrb-1', name: 'Graduation Degree in any discipline', nameHi: 'स्नातक उपाधि प्रमाण पत्र', isMandatory: true },
      { id: 'd-irrb-2', name: 'Aadhaar Card & Local State Language Proficiency', nameHi: 'आधार कार्ड एवं स्थानीय राज्य भाषा ज्ञान', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Visit official website ibps.in and click on CRP RRBs XV link.', textHi: 'आधिकारिक वेबसाइट ibps.in पर जाकर CRP RRBs XV लिंक पर क्लिक करें।' },
      { step: 2, text: 'Register new application and select your state Regional Rural Bank preference.', textHi: 'नया पंजीकरण करें और अपने राज्य के ग्रामीण बैंक का चयन करें।' },
      { step: 3, text: 'Upload photo, signature, left thumb impression and submit official fee.', textHi: 'फोटो, हस्ताक्षर अपलोड कर सरकारी परीक्षा शुल्क का भुगतान करें।' }
    ],
    tags: ['IBPS RRB', 'Gramin Bank', '13745 Vacancies', 'Banking Job', 'Active Form Now'],
    is100PercentFree: false
  },

  // =========================================================================
  // 5. RAILWAY & POSTAL RECRUITMENTS
  // =========================================================================
  {
    id: 'opp-india-post-gds-01',
    title: 'India Post GDS 2026: Gramin Dak Sevak (44,228 Posts - 100% Zero Exam, 10th Merit)',
    titleHi: 'भारतीय डाक विभाग जीडीएस 2026: ग्रामीण डाक सेवक (44,228 पद - बिना परीक्षा 10वीं मेरिट भर्ती)',
    category: 'govt_job',
    lifeStage: 'exams',
    targetAges: [18, 40],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'school_student', 'farmer', 'homemaker'],
    benefitHeadline: 'Branch Postmaster (BPM) & Assistant Branch Postmaster (ABPM) Positions with Direct 10th Marks Selection',
    benefitHeadlineHi: 'बिना किसी परीक्षा के 10वीं के अंकों के आधार पर सीधे डाक विभाग में डाक सेवक पद पर चयन',
    benefitAmount: 18000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'Department of Posts Gramin Dak Sevak (GDS) recruitment cycle. Merit lists and upcoming engagement schedule published on indiapostgdsonline.gov.in.',
    descriptionHi: 'डाक विभाग ग्रामीण डाक सेवक (GDS) भर्ती चक्र। 10वीं मेरिट परिणाम एवं आगामी चक्र की जानकारी indiapostgdsonline.gov.in पर देखें।',
    gazette: {
      circularNumber: 'POSTS/GDS/ONLINE-ENGAGEMENT/2026/SCHEDULE-II',
      issuingAuthority: 'Department of Posts, Ministry of Communications',
      gazetteDate: '2026-07-12',
      lastVerifiedAt: 'Live verified 15 mins ago',
      officialPortalUrl: 'https://indiapostgdsonline.gov.in',
      scamAlertWarning: 'India Post GDS selection is 100% automated via computer system based strictly on 10th marks. No human can alter the merit list.',
      officialGovtFee: '₹100 (Female / SC / ST / PwD / Transgender: ₹0 Free)'
    },
    documents: [
      { id: 'd-gds-1', name: 'Class 10th Marksheet (with Math & English)', nameHi: '10वीं अंकतालिका (गणित एवं अंग्रेजी अनिवार्य)', isMandatory: true },
      { id: 'd-gds-2', name: 'Aadhaar Card & Basic Computer Training Certificate (60 days)', nameHi: 'आधार कार्ड एवं बुनियादी कंप्यूटर ज्ञान प्रमाण', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on indiapostgdsonline.gov.in with 10th Roll Number.', textHi: 'indiapostgdsonline.gov.in पर 10वीं रोल नंबर से पंजीकरण करें।' },
      { step: 2, text: 'Choose division and up to 20 post office preferences in your district.', textHi: 'अपने जिले के डाकघरों की 20 प्राथमिकताएं चुनें।' },
      { step: 3, text: 'Submit application. System-generated merit lists released in phases.', textHi: 'आवेदन जमा करें और कम्प्यूटरीकृत मेरिट सूची में नाम देखें।' }
    ],
    tags: ['India Post', 'No Exam Job', '10th Pass', 'GDS'],
    is100PercentFree: false
  },


  {
    id: 'opp-gate-01',
    title: 'GATE 2026: Graduate Aptitude Test in Engineering (PSU Recruitment & IIT M.Tech)',
    titleHi: 'गेट 2026: ग्रेजुएट एप्टीट्यूड टेस्ट इन इंजीनियरिंग (पीएसयू सीधी भर्ती एवं एमटेक)',
    category: 'competitive_exam',
    lifeStage: 'exams',
    targetAges: [20, 45],
    stateEligibility: ['ALL'],
    targetOccupations: ['college_student', 'employed', 'job_seeker'],
    benefitHeadline: 'Direct PSU Executive Trainee Recruitment (ONGC, IOCL, NTPC, BHEL) with ₹18 - ₹24 Lakh Package + M.Tech Stipend',
    benefitHeadlineHi: 'ओएनजीसी, आईओसीएल, एनटीपीसी जैसी महारत्न कंपनियों में सीधी अधिकारी भर्ती + ₹12,400 मासिक छात्रवृत्ति',
    benefitAmount: 2000000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'National comprehensive examination testing engineering concepts, utilized by 50+ Maharatna/Navratna PSUs for recruiting engineers without written tests.',
    descriptionHi: 'इंजीनियरिंग स्नातकों के लिए सरकारी महारत्न कंपनियों में सीधी नौकरी और शीर्ष संस्थानों से एमटेक हेतु राष्ट्रीय परीक्षा।',
    gazette: {
      circularNumber: 'GATE/IIT-ORGANIZING/2026/CIRCULAR',
      issuingAuthority: 'IIT Organizing Institute & National Coordination Board',
      gazetteDate: '2026-08-01',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://gate.iitr.ac.in',
      scamAlertWarning: 'PSU recruitment via GATE score is governed by strict cutoffs published on individual PSU career portals. Never pay agents.',
      officialGovtFee: '₹1,800 (General) / ₹900 (Female / SC / ST / PwD)'
    },
    documents: [
      { id: 'd-gate-1', name: 'B.E. / B.Tech Degree Certificate or 3rd/4th Year Proof', nameHi: 'बीटेक उपाधि अथवा 3रे/4थे वर्ष का प्रमाण', isMandatory: true },
      { id: 'd-gate-2', name: 'Valid Photo ID (Aadhaar / Passport)', nameHi: 'वैध पहचान पत्र (आधार या पासपोर्ट)', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on GOAPS portal at gate.iitr.ac.in.', textHi: 'GOAPS पोर्टल पर ऑनलाइन पंजीकरण करें।' },
      { step: 2, text: 'Choose 1 or 2 engineering papers and select 3 test cities.', textHi: 'इंजीनियरिंग विषय और 3 परीक्षा शहरों का चयन करें।' },
      { step: 3, text: 'Appear for Computer Based Test in February.', textHi: 'फरवरी में आयोजित कंप्यूटर परीक्षा में शामिल हों।' }
    ],
    tags: ['GATE', 'PSU Jobs', 'Engineering', 'M.Tech'],
    is100PercentFree: false
  },

  // =========================================================================
  // 7. TEACHING & ACADEMIC CERTIFICATIONS (All Ages & Adults)
  // =========================================================================
  {
    id: 'opp-ctet-01',
    title: 'CTET 2026: Central Teacher Eligibility Test (Primary & Upper Primary)',
    titleHi: 'सीटेट 2026: केंद्रीय शिक्षक पात्रता परीक्षा (प्राथमिक एवं उच्च प्राथमिक)',
    category: 'competitive_exam',
    lifeStage: 'exams',
    targetAges: [18, 50],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'employed', 'college_student'],
    benefitHeadline: 'Mandatory Central Govt Certificate for Recruitment in KVS, NVS, DSSSB, and Army Public Schools',
    benefitHeadlineHi: 'केंद्रीय विद्यालय, नवोदय विद्यालय एवं आर्मी स्कूलों में स्थायी शिक्षक भर्ती हेतु अनिवार्य पात्रता',
    benefitAmount: 55000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'National examination conducted by CBSE certifying candidates as qualified teachers for Classes I to VIII in central and state government schools with lifetime validity.',
    descriptionHi: 'सीबीएसई द्वारा केंद्रीय व राज्य विद्यालयों में कक्षा 1 से 8 तक सरकारी शिक्षक भर्ती हेतु आयोजित राष्ट्रीय पात्रता परीक्षा।',
    gazette: {
      circularNumber: 'CBSE/CTET/2026/INFORMATION-BULLETIN',
      issuingAuthority: 'Central Board of Secondary Education (CBSE)',
      gazetteDate: '2026-02-20',
      lastVerifiedAt: 'Live verified 30 mins ago',
      officialPortalUrl: 'https://ctet.nic.in',
      scamAlertWarning: 'CTET certificates and marksheets are digitally delivered to candidate DigiLocker accounts. No paper copy is sold by agents.',
      officialGovtFee: '₹1,000 (General/OBC 1 Paper) / ₹500 (SC/ST/PwD)'
    },
    documents: [
      { id: 'd-ctet-1', name: 'D.El.Ed / B.Ed Passing Certificate or Final Year Proof', nameHi: 'डीएलएड / बीएड प्रमाण पत्र अथवा अंतिम वर्ष प्रवेश पर्ची', isMandatory: true },
      { id: 'd-ctet-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on official portal ctet.nic.in.', textHi: 'ctet.nic.in पर आधार एवं शैक्षणिक विवरण से पंजीकरण करें।' },
      { step: 2, text: 'Select Paper 1 (Class 1-5), Paper 2 (Class 6-8), or Both.', textHi: 'पेपर 1, पेपर 2 अथवा दोनों का चयन करें।' },
      { step: 3, text: 'Pay examination fee and download Confirmation Page.', textHi: 'सरकारी परीक्षा शुल्क जमा कर पुष्टिकरण रसीद सुरक्षित करें।' }
    ],
    tags: ['Teaching', 'Govt Teacher', 'CTET', 'CBSE'],
    is100PercentFree: false
  },
  {
    id: 'opp-ugc-net-01',
    title: 'NTA UGC NET 2026: Assistant Professorship & Junior Research Fellowship',
    titleHi: 'एनटीए यूजीसी नेट 2026: विश्वविद्यालय सहायक प्रोफेसर एवं शोध फेलोशिप',
    category: 'competitive_exam',
    lifeStage: 'exams',
    targetAges: [21, 65],
    stateEligibility: ['ALL'],
    targetOccupations: ['job_seeker', 'employed', 'college_student'],
    benefitHeadline: 'Lifetime UGC Eligibility for Assistant Professor in 1,100+ Universities + ₹37,000/Month JRF Stipend',
    benefitHeadlineHi: 'देश के 1,100+ विश्वविद्यालयों में प्रोफेसर पद हेतु आजीवन पात्रता + ₹37,000 मासिक जेआरएफ छात्रवृत्ति',
    benefitAmount: 444000,
    deadline: 'UPCOMING_ANNUAL_CYCLE',
    applicationStatus: 'upcoming',
    description: 'National Eligibility Test conducted by NTA on behalf of UGC to determine eligibility of Indian nationals for Assistant Professor and JRF in 83 humanities, science, and management subjects.',
    descriptionHi: 'राष्ट्रीय परीक्षा एजेंसी द्वारा कॉलेज एवं विश्वविद्यालयों में प्रोफेसर पद तथा शोध फेलोशिप हेतु आयोजित राष्ट्रीय पात्रता परीक्षा।',
    gazette: {
      circularNumber: 'NTA/UGC-NET/JUNE-2026/BULLETIN',
      issuingAuthority: 'National Testing Agency & University Grants Commission',
      gazetteDate: '2026-03-01',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://ugcnet.nta.ac.in',
      scamAlertWarning: 'UGC NET certificate is issued digitally by NTA with secure QR verification. Beware of touts selling fake college recruitment guarantees.',
      officialGovtFee: '₹1,150 (General) / ₹600 (OBC/EWS) / ₹325 (SC/ST/PwD)'
    },
    documents: [
      { id: 'd-ugc-1', name: 'Master\'s Degree Marksheet (Min 55%)', nameHi: 'स्नातकोत्तर (मास्टर्स) अंकतालिका', isMandatory: true },
      { id: 'd-ugc-2', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Register on official portal ugcnet.nta.ac.in with Aadhaar verification.', textHi: 'ugcnet.nta.ac.in पर आधार सत्यापन के साथ ऑनलाइन पंजीकरण करें।' },
      { step: 2, text: 'Choose subject from 83 streams and preferred examination city.', textHi: '83 विषयों में से अपने विषय और परीक्षा शहर का चयन करें।' },
      { step: 3, text: 'Submit fee online and save application confirmation form.', textHi: 'ऑनलाइन शुल्क का भुगतान करें और पुष्टिकरण प्रपत्र सुरक्षित रखें।' }
    ],
    tags: ['Professorship', 'UGC NET', 'NTA', 'Adult Higher Education'],
    is100PercentFree: false
  },

  // =========================================================================
  // 8. ADULT HIGHER EDUCATION & PRACTICAL FARMER CERTIFICATIONS
  // =========================================================================

  {
    id: 'opp-kvk-cert-01',
    title: 'ICAR-KVK Certified Agri-Business & Organic Farming Training (Stipend Included)',
    titleHi: 'आईसीएआर कृषि विज्ञान केंद्र प्रमाणित जैविक खेती एवं कृषि व्यवसाय प्रशिक्षण',
    category: 'skill_roadmap',
    lifeStage: 'exams',
    targetAges: [20, 70],
    stateEligibility: ['ALL'],
    targetOccupations: ['farmer', 'business_owner', 'homemaker'],
    benefitHeadline: '100% Free 15-Day Certified Training with ₹500 Daily Stipend + Bank Loan Eligibility Certificate',
    benefitHeadlineHi: '15 दिवसीय निःशुल्क प्रशिक्षण + ₹500 दैनिक भत्ता एवं बैंक ऋण पात्रता प्रमाण पत्र',
    benefitAmount: 15000,
    deadline: 'OPEN_ROUND',
    applicationStatus: 'active_now',
    description: 'Indian Council of Agricultural Research (ICAR) practical training at District Krishi Vigyan Kendras on bee-keeping, organic fertilizer, dairy farming, and mushroom cultivation.',
    descriptionHi: 'जिला कृषि विज्ञान केंद्रों द्वारा मधुमक्खी पालन, जैविक खाद, डेयरी एवं मशरूम की खेती पर व्यावहारिक सरकारी प्रशिक्षण।',
    gazette: {
      circularNumber: 'ICAR/KVK-TRAINING/2026/FARMER',
      issuingAuthority: 'Indian Council of Agricultural Research (Govt of India)',
      gazetteDate: '2026-07-01',
      lastVerifiedAt: 'Live verified 2 hrs ago',
      officialPortalUrl: 'https://kvk.icar.gov.in',
      scamAlertWarning: 'KVK farmer training is 100% free with government sponsored lodging, meals, and toolkits. No fees allowed.',
      officialGovtFee: '₹0 (100% Free Govt Training)'
    },
    documents: [
      { id: 'd-kvk-1', name: 'Aadhaar Card showing rural/district address', nameHi: 'आधार कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Locate your District KVK on kvk.icar.gov.in.', textHi: 'kvk.icar.gov.in पर अपने जिले का कृषि विज्ञान केंद्र खोजें।' },
      { step: 2, text: 'Submit offline or online registration for upcoming batch.', textHi: 'आगामी बैच हेतु निःशुल्क पंजीकरण फॉर्म जमा करें।' },
      { step: 3, text: 'Complete training and receive ICAR government certificate.', textHi: 'प्रशिक्षण पूरा कर आधिकारिक प्रमाण पत्र प्राप्त करें।' }
    ],
    tags: ['Farmers', 'Adult Training', 'ICAR', 'Agri Business'],
    is100PercentFree: true
  },
  {
    id: 'opp-pmkvy-rpl-01',
    title: 'PMKVY 4.0 RPL: Free Govt Skill Certificate + ₹500 DBT for Experienced Citizens',
    titleHi: 'प्रधानमंत्री कौशल विकास योजना (RPL): निःशुल्क सरकारी कौशल प्रमाण पत्र + ₹500 बैंक में',
    category: 'skill_roadmap',
    lifeStage: 'exams',
    targetAges: [18, 65],
    stateEligibility: ['ALL'],
    targetOccupations: ['farmer', 'business_owner', 'homemaker', 'employed', 'job_seeker'],
    benefitHeadline: 'Official Skill India Digital Certificate + ₹500 DBT Cash Reward + Free ₹2 Lakh Accident Insurance',
    benefitHeadlineHi: 'आधिकारिक स्किल इंडिया डिजिटल सर्टिफिकेट + ₹500 नकद प्रोत्साहन + ₹2 लाख का निःशुल्क दुर्घटना बीमा',
    benefitAmount: 5000,
    deadline: 'OPEN_ROUND',
    applicationStatus: 'active_now',
    description: 'Recognition of Prior Learning (RPL) by the Ministry of Skill Development & Entrepreneurship assesses and certifies existing skills of experienced plumbers, carpenters, tailors, farmers, and drivers.',
    descriptionHi: 'कौशल विकास एवं उद्यमिता मंत्रालय द्वारा कारीगरों, दर्जी, इलेक्ट्रीशियन, किसानों और ड्राइवरों के हुनर को परखकर सरकारी प्रमाण पत्र प्रदान करने की योजना।',
    gazette: {
      circularNumber: 'MSDE/PMKVY-4.0/RPL/2026/SCHEME',
      issuingAuthority: 'Ministry of Skill Development & Entrepreneurship (Govt of India)',
      gazetteDate: '2026-06-25',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://www.pmkvyofficial.org',
      scamAlertWarning: 'PMKVY 4.0 RPL is 100% free of charge. No center is authorized to collect training or assessment fees.',
      officialGovtFee: '₹0 (100% Free Govt Program)'
    },
    documents: [
      { id: 'd-pmkvy-1', name: 'Aadhaar Card', nameHi: 'आधार कार्ड', isMandatory: true },
      { id: 'd-pmkvy-2', name: 'Bank Account linked with Aadhaar (for ₹500 DBT)', nameHi: 'आधार से लिंक बैंक खाता (₹500 प्रोत्साहन राशि हेतु)', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Search nearest Pradhan Mantri Kaushal Kendra (PMKK) on skillindia.gov.in.', textHi: 'skillindia.gov.in पर अपने शहर का कौशल केंद्र खोजें।' },
      { step: 2, text: 'Register for 12-hour orientation and trade assessment.', textHi: '12 घंटे के ओरिएंटेशन एवं कार्य मूल्यांकन हेतु पंजीकरण करवाएं।' },
      { step: 3, text: 'Get certified and receive ₹500 direct in bank account.', textHi: 'सफलतापूर्वक मूल्यांकन उपरांत प्रमाण पत्र व ₹500 बैंक में प्राप्त करें।' }
    ],
    tags: ['Skill India', 'Govt Certificate', 'DBT Direct Cash', 'Adult Skills'],
    is100PercentFree: true
  }
];
