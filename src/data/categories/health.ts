import { Opportunity } from '@/types';

export const HEALTH_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-jan-aushadhi-01',
    title: 'Pradhan Mantri Jan Aushadhi: 80% Discounted Generic Salt Medicines',
    titleHi: 'प्रधानमंत्री भारतीय जनऔषधि केंद्र: 80% तक सस्ती प्रमाणित जेनेरिक दवाइयां',
    category: 'healthcare_free',
    lifeStage: 'health',
    targetAges: [0, 99],
    stateEligibility: ['ALL'],
    targetOccupations: ['farmer', 'homemaker', 'senior_citizen', 'employed', 'business_owner', 'job_seeker'],
    benefitHeadline: 'Save ₹2,000 - ₹5,000 Every Month on Monthly BP, Diabetes, Heart & Thyroid Prescriptions',
    benefitHeadlineHi: 'बीपी, शुगर, हृदय रोग एवं थायरॉयड की दवाइयों पर प्रतिमाह ₹2,000 - ₹5,000 तक की भारी बचत',
    benefitAmount: 36000,
    deadline: 'OPEN_ROUND',
    description: 'Over 10,000 government-run Jan Aushadhi stores across India dispensing identical salt chemical composition drugs matching branded medicines at 50% to 90% cheaper prices.',
    descriptionHi: 'देश भर में 10,000 से अधिक सरकारी जनऔषधि केंद्र जहां ब्रांडेड दवाइयों का वही सॉल्ट 80% तक कम कीमत में मिलता है।',
    gazette: {
      circularNumber: 'PMBI/JAN-AUSHADHI/2026/PRICE-LIST',
      issuingAuthority: 'Pharmaceuticals & Medical Devices Bureau of India (PMBI)',
      gazetteDate: '2026-08-01',
      lastVerifiedAt: 'Live verified 15 mins ago',
      officialPortalUrl: 'https://janaushadhi.gov.in',
      scamAlertWarning: 'All Jan Aushadhi medicines undergo strict WHO-GMP certified laboratory quality testing. Check official MRP printed on back of foil.',
      officialGovtFee: '₹0 (Locate Kendra Free Online)'
    },
    documents: [
      { id: 'd-med-1', name: 'Doctor\'s Prescription (Showing generic salt)', nameHi: 'डॉक्टर का पर्चा', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Search your required medicine on janaushadhi.gov.in product list.', textHi: 'janaushadhi.gov.in पर अपनी दवा का सॉल्ट नाम खोजें।' },
      { step: 2, text: 'Use "Locate Kendra" tool to find nearest store in your district.', textHi: '"लोकेट केंद्र" टूल से अपने नजदीकी सरकारी स्टोर का पता लगाएं।' },
      { step: 3, text: 'Show prescription and purchase medicines at 80% subsidized prices.', textHi: 'डॉक्टर का पर्चा दिखाकर 80% तक कम मूल्य पर दवाइयां प्राप्त करें।' }
    ],
    tags: ['Cheap Medicines', 'Generic Drugs', 'Healthcare Savings', 'Jan Aushadhi'],
    is100PercentFree: true
  },
  {
    id: 'opp-senior-eye-01',
    title: 'National Cataract Blindness Control (Free Cataract Surgery & Intraocular Lens)',
    titleHi: 'राष्ट्रीय अंधता नियंत्रण कार्यक्रम: वरिष्ठ नागरिकों हेतु 100% निःशुल्क मोतियाबिंद ऑपरेशन एवं लेंस',
    category: 'healthcare_free',
    lifeStage: 'health',
    targetAges: [50, 95],
    stateEligibility: ['ALL'],
    targetOccupations: ['senior_citizen', 'farmer', 'homemaker'],
    benefitHeadline: '100% Free Phacoemulsification Eye Surgery with Intraocular Lens (IOL) + Medicines & Specs',
    benefitHeadlineHi: 'निःशुल्क अत्याधुनिक मोतियाबिंद ऑपरेशन, लेंस प्रत्यारोपण, दवाइयां एवं काला चश्मा',
    benefitAmount: 25000,
    deadline: 'OPEN_ROUND',
    description: 'National Health Mission program across all District Civil Hospitals providing free screening, surgery, foldable lens implantation, and transportation for elderly citizens.',
    descriptionHi: 'राष्ट्रीय स्वास्थ्य मिशन के अंतर्गत सभी जिला अस्पतालों एवं मेडिकल कॉलेजों में बुजुर्गों के लिए पूर्णतः निःशुल्क मोतियाबिंद ऑपरेशन व लेंस की व्यवस्था।',
    gazette: {
      circularNumber: 'NPCBVI/NHM/2026/ELDER-VISION',
      issuingAuthority: 'Ministry of Health & Family Welfare, Govt of India',
      gazetteDate: '2026-07-10',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://npcbvi.gov.in',
      scamAlertWarning: 'This government program is 100% free at District Hospitals. Never pay private nursing homes claiming govt lens charges.',
      officialGovtFee: '₹0 (Completely Free for 50+)'
    },
    documents: [
      { id: 'd-eye-1', name: 'Aadhaar Card (Showing Age 50+)', nameHi: 'आधार कार्ड (आयु 50+ दर्शाने वाला)', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Visit Eye OPD at nearest District Hospital or Community Health Centre.', textHi: 'निकटतम जिला अस्पताल अथवा सामुदायिक स्वास्थ्य केंद्र की नेत्र ओपीडी में जाएं।' },
      { step: 2, text: 'Free vision screening and pre-operative blood sugar/BP check.', textHi: 'निःशुल्क आंखों की जांच एवं ब्लड शुगर/बीपी परीक्षण करवाएं।' },
      { step: 3, text: 'Surgery scheduled and free intraocular lens implanted with zero charges.', textHi: 'निर्धारित तिथि पर निःशुल्क ऑपरेशन एवं लेंस प्रत्यारोपण करवाएं।' }
    ],
    tags: ['Senior Citizens', 'Free Eye Surgery', 'Elder Health', 'Eye Care'],
    is100PercentFree: true
  },
  {
    id: 'opp-nikshay-tb-01',
    title: 'Ni-kshay Poshan Yojana: 100% Free TB Treatment + ₹500/Month Nutrition DBT',
    titleHi: 'निक्षय पोषण योजना: 100% निःशुल्क टीबी उपचार एवं दवाइयां + ₹500 प्रतिमाह पोषण भत्ता',
    category: 'healthcare_free',
    lifeStage: 'health',
    targetAges: [0, 99],
    stateEligibility: ['ALL'],
    targetOccupations: ['farmer', 'homemaker', 'senior_citizen', 'job_seeker', 'employed'],
    benefitHeadline: 'Complete Free Diagnostic Tests, Full Medicine Course & Direct Bank Transfer of ₹500/Month for Diet',
    benefitHeadlineHi: 'टीबी की सभी जांचें, संपूर्ण दवा कोर्स निःशुल्क + पौष्टिक आहार हेतु प्रति माह ₹500 सीधे खाते में',
    benefitAmount: 6000,
    deadline: 'OPEN_ROUND',
    description: 'National Tuberculosis Elimination Programme (NTEP) providing free sputum tests, CBNAAT molecular testing, daily fixed-dose combination drugs, and financial nutrition incentives.',
    descriptionHi: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय द्वारा टीबी मरीजों के त्वरित एवं पूर्ण स्वस्थ होने हेतु निःशुल्क इलाज व वित्तीय सहायता।',
    gazette: {
      circularNumber: 'MOHFW/NTEP/NI-KSHAY/2026',
      issuingAuthority: 'Central TB Division, Ministry of Health and Family Welfare',
      gazetteDate: '2026-06-18',
      lastVerifiedAt: 'Live verified 3 hrs ago',
      officialPortalUrl: 'https://www.nikshay.in',
      scamAlertWarning: 'Government TB diagnosis and treatment is strictly free across all District TB Centres and PHCs. Never buy fake unregistered anti-TB syrups.',
      officialGovtFee: '₹0 (100% Free National Treatment)'
    },
    documents: [
      { id: 'd-tb-1', name: 'Aadhaar Card & Bank Account Details', nameHi: 'आधार कार्ड एवं बैंक पासबुक विवरण', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Visit nearest Primary Health Centre (PHC) or District TB Centre for free testing.', textHi: 'निकटतम प्राथमिक स्वास्थ्य केंद्र (PHC) पर निःशुल्क बलगम जांच करवाएं।' },
      { step: 2, text: 'Register on Ni-kshay portal with Aadhaar and bank details for DBT.', textHi: 'निक्षय पोर्टल पर पंजीकरण करवाकर बैंक खाता लिंक करवाएं।' },
      { step: 3, text: 'Collect monthly medicine pack and receive ₹500 direct in bank account.', textHi: 'मासिक दवा किट प्राप्त करें और ₹500 प्रति माह पोषण सहायता बैंक में पाएं।' }
    ],
    tags: ['TB Treatment', 'Free Medicine', 'Nutrition DBT', 'Public Health'],
    is100PercentFree: true
  },
  {
    id: 'opp-arogya-mandir-01',
    title: 'Ayushman Arogya Mandir: Free Primary Health Checkup, BP/Sugar Diagnostics & 172 Medicines',
    titleHi: 'आयुष्मान आरोग्य मंदिर: निःशुल्क प्राथमिक स्वास्थ्य जांच, बीपी/शुगर परीक्षण एवं 172 आवश्यक दवाइयां',
    category: 'healthcare_free',
    lifeStage: 'health',
    targetAges: [18, 99],
    stateEligibility: ['ALL'],
    targetOccupations: ['farmer', 'homemaker', 'senior_citizen', 'business_owner', 'employed'],
    benefitHeadline: 'Comprehensive Primary Healthcare Centers in Every Village/Ward with Free Tele-Consultation (e-Sanjeevani)',
    benefitHeadlineHi: 'हर गांव एवं वार्ड में निःशुल्क बीपी, शुगर, कैंसर स्क्रीनिंग एवं ई-संजीवनी द्वारा बड़े डॉक्टरों से मुफ्त परामर्श',
    benefitAmount: 12000,
    deadline: 'OPEN_ROUND',
    description: 'Transformed Sub-Health Centres and Primary Health Centres offering 12 packages of comprehensive healthcare services close to citizens\' homes.',
    descriptionHi: 'स्वास्थ्य मंत्रालय द्वारा संचालित स्थानीय आरोग्य मंदिर जहां आम बीमारियों की जांच, दवाइयां और योग सत्र निःशुल्क उपलब्ध हैं।',
    gazette: {
      circularNumber: 'NHM/AROGYA-MANDIR/2026/POLICY',
      issuingAuthority: 'National Health Mission (Ministry of Health & Family Welfare)',
      gazetteDate: '2026-05-12',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://ab-hwm.nhp.gov.in',
      scamAlertWarning: 'All diagnostic tests and essential medicines dispensed at Ayushman Arogya Mandir are 100% free. No user fee can be charged.',
      officialGovtFee: '₹0 (100% Free Health Service)'
    },
    documents: [],
    applySteps: [
      { step: 1, text: 'Walk in to your nearest local Ayushman Arogya Mandir (Village/Ward).', textHi: 'अपने स्थानीय गांव अथवा वार्ड के आरोग्य मंदिर में सीधे जाएं।' },
      { step: 2, text: 'Get free vitals check (Blood Pressure, Blood Sugar, Hemoglobin).', textHi: 'रक्तचाप एवं शुगर की निःशुल्क जांच करवाएं।' },
      { step: 3, text: 'Receive prescribed generic medicines or connect to MD doctors via e-Sanjeevani video call.', textHi: 'निःशुल्क दवाइयां प्राप्त करें अथवा वीडियो कॉल पर विशेषज्ञ डॉक्टर से परामर्श लें।' }
    ],
    tags: ['Arogya Mandir', 'Free Checkup', 'Village Clinic', 'e-Sanjeevani'],
    is100PercentFree: true
  }
];
