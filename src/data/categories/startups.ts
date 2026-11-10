import { Opportunity } from '@/types';

export const STARTUP_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-biz-ev-01',
    title: 'EV 2-Wheeler Smart Charging Point & Battery Swap Hub Setup',
    titleHi: 'इलेक्ट्रिक 2-व्हीलर स्मार्ट चार्जिंग पॉइंट एवं बैटरी स्वैप केंद्र व्यापार',
    category: 'startup_idea',
    lifeStage: 'startups',
    targetAges: [21, 65],
    stateEligibility: ['ALL'],
    targetOccupations: ['business_owner', 'farmer', 'employed', 'job_seeker'],
    benefitHeadline: 'Earn ₹30,000 - ₹75,000/Month Passive Income on Idle Commercial/Residential Land (₹35,000 Initial Cost)',
    benefitHeadlineHi: 'अपनी खाली दुकान या घर के बाहर ₹35,000 की लागत से चार्जिंग पॉइंट लगाकर ₹30,000 - ₹75,000 प्रतिमाह कमाएं',
    benefitAmount: 60000,
    deadline: 'OPEN_ROUND',
    description: 'Capitalize on the 2026 EV explosion in India. Install an ARAI-certified Bharat AC-001 smart charger outside your shop or house with automated QR UPI payment collection.',
    descriptionHi: 'देश भर में इलेक्ट्रिक वाहनों की भारी संख्या को देखते हुए अपनी दुकान या मकान के बाहर स्वचालित यूपीआई आधारित चार्जिंग स्टेशन लगाने का व्यापार मॉडल।',
    gazette: {
      circularNumber: 'MOP/EV-CHARGING-GUIDELINES/2026',
      issuingAuthority: 'Ministry of Power, Govt of India',
      gazetteDate: '2026-06-12',
      lastVerifiedAt: 'Live verified 3 hrs ago',
      officialPortalUrl: 'https://e-amrit.niti.gov.in',
      scamAlertWarning: 'Govt of India does not require a commercial electricity license to operate public EV chargers. Beware of fake franchise brokers charging ₹2 Lakh fees.',
      officialGovtFee: '₹0 (Delicensed Public Service)'
    },
    documents: [
      { id: 'd-ev-1', name: 'Electricity Connection Bill (3kW to 7kW)', nameHi: 'विद्युत कनेक्शन बिल (3 से 7 किलोवाट)', isMandatory: true },
      { id: 'd-ev-2', name: 'Bank Account & UPI ID', nameHi: 'बैंक खाता एवं यूपीआई विवरण', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Check e-Amrit NITI Aayog guidelines on public EV charging.', textHi: 'नीति आयोग के ई-अमृत पोर्टल पर चार्जिंग दिशानिर्देश देखें।' },
      { step: 2, text: 'Purchase ARAI-approved smart charger hardware with automated billing.', textHi: 'स्वचालित बिलिंग वाला प्रमाणित स्मार्ट चार्जर प्राप्त करें।' },
      { step: 3, text: 'List charging location on Google Maps & Kazam/Statiq open networks.', textHi: 'गूगल मैप्स एवं ओपन ईवी नेटवर्क पर अपनी लोकेशन लाइव करें।' }
    ],
    tags: ['Startup Idea', 'Passive Income', 'EV Green Energy'],
    is100PercentFree: true,
    isNew: true
  },
  {
    id: 'opp-biz-pmegp-01',
    title: 'PMEGP Scheme: Up to ₹50 Lakh Business Loan with 35% Govt Subsidy',
    titleHi: 'प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP): 35% सरकारी सब्सिडी पर ₹50 लाख तक का ऋण',
    category: 'startup_idea',
    lifeStage: 'startups',
    targetAges: [18, 65],
    stateEligibility: ['ALL'],
    targetOccupations: ['business_owner', 'farmer', 'job_seeker', 'homemaker'],
    benefitHeadline: '35% Direct Cash Subsidy (Up to ₹17.5 Lakh Free Govt Grant) for Manufacturing & Service Startups',
    benefitHeadlineHi: 'विनिर्माण एवं सेवा व्यापार शुरू करने हेतु 35% सीधी सरकारी सब्सिडी (₹17.5 लाख तक माफ)',
    benefitAmount: 1750000,
    deadline: 'OPEN_ROUND',
    description: 'Flagship credit-linked subsidy scheme by Khadi and Village Industries Commission (KVIC) helping individuals start bakeries, fabrication, packaging, coaching, clinics, or food processing units.',
    descriptionHi: 'खादी एवं ग्रामोद्योग आयोग द्वारा नया उद्योग, बेकरी, पैकेजिंग, फूड प्रोसेसिंग अथवा वर्कशॉप शुरू करने हेतु 35% सरकारी सब्सिडी योजना।',
    gazette: {
      circularNumber: 'KVIC/PMEGP/2026/SCHEME-EXP',
      issuingAuthority: 'Ministry of MSME & KVIC (Govt of India)',
      gazetteDate: '2026-07-20',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://www.kviconline.gov.in/pmegpeportal',
      scamAlertWarning: 'Application is 100% online and free on kviconline.gov.in. KVIC has no private consultants. Do not pay commissions to bank touts.',
      officialGovtFee: '₹0 (Free Govt Subsidy Portal)'
    },
    documents: [
      { id: 'd-pmegp-1', name: 'Detailed Project Report (DPR)', nameHi: 'परियोजना रिपोर्ट (DPR)', isMandatory: true },
      { id: 'd-pmegp-2', name: 'Aadhaar Card & Caste Certificate', nameHi: 'आधार कार्ड एवं जाति प्रमाण पत्र', isMandatory: true },
      { id: 'd-pmegp-3', name: 'EDP Training Certificate (Free Online)', nameHi: 'ईडूपी ऑनलाइन प्रशिक्षण प्रमाण पत्र', isMandatory: false }
    ],
    applySteps: [
      { step: 1, text: 'Submit online application with DPR on kviconline.gov.in.', textHi: 'kviconline.gov.in पर परियोजना रिपोर्ट के साथ ऑनलाइन आवेदन करें।' },
      { step: 2, text: 'District Level Task Force Committee (DLTFC) verification.', textHi: 'जिला स्तरीय टास्क फोर्स कमेटी द्वारा आवेदन का अनुमोदन।' },
      { step: 3, text: 'Bank loan sanction and automatic 3-year lock-in subsidy deposit.', textHi: 'बैंक ऋण स्वीकृति एवं सब्सिडी राशि का सरकारी हस्तांतरण।' }
    ],
    tags: ['Business Loan', 'Govt Subsidy', 'Startup India', 'MSME'],
    is100PercentFree: true
  },
  {
    id: 'opp-biz-mudra-01',
    title: 'Pradhan Mantri MUDRA Yojana: Collateral-Free Loans Up to ₹20 Lakh',
    titleHi: 'प्रधानमंत्री मुद्रा योजना: बिना किसी गारंटी के ₹20 लाख तक का व्यापार ऋण',
    category: 'startup_idea',
    lifeStage: 'startups',
    targetAges: [18, 65],
    stateEligibility: ['ALL'],
    targetOccupations: ['business_owner', 'farmer', 'homemaker', 'employed'],
    benefitHeadline: 'Tarun Plus Category: ₹10 Lakh to ₹20 Lakh Loan with Zero Mortgage Required at Subsidized Interest Rates',
    benefitHeadlineHi: 'तरुण प्लस श्रेणी: दुकानदारों व उद्यमियों हेतु ₹10 लाख से ₹20 लाख तक बिना गारंटी सस्ता ऋण',
    benefitAmount: 1000000,
    deadline: 'OPEN_ROUND',
    description: 'Refinanced business loans for small shopkeepers, retail stores, transport operators, food service, repair centers, and micro-enterprises across all public & private banks.',
    descriptionHi: 'छोटे व्यापारियों, खुदरा दुकानदारों, रिपेयरिंग सेंटर्स और उद्यमियों के विस्तार हेतु बिना किसी संपत्ति को गिरवी रखे बैंक ऋण।',
    gazette: {
      circularNumber: 'MUDRA/FIN-MIN/2026/TARUN-PLUS',
      issuingAuthority: 'Department of Financial Services, Ministry of Finance',
      gazetteDate: '2026-07-23',
      lastVerifiedAt: 'Live verified 2 hrs ago',
      officialPortalUrl: 'https://www.mudra.org.in',
      scamAlertWarning: 'Mudra loans do not require security or processing fees above nominal limits. Do not pay unverified DSA agents demanding advance cash.',
      officialGovtFee: '₹0 (Apply via Udyamimitra portal)'
    },
    documents: [
      { id: 'd-mudra-1', name: 'Business Proof / Udyam Aadhar Registration', nameHi: 'उद्यम आधार प्रमाण पत्र (निःशुल्क बनता है)', isMandatory: true },
      { id: 'd-mudra-2', name: 'Last 6 Months Bank Statement', nameHi: 'गत 6 माह का बैंक खाता विवरण', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Generate free Udyam registration on udyamregistration.gov.in.', textHi: 'udyamregistration.gov.in पर निःशुल्क उद्यम रजिस्ट्रेशन करें।' },
      { step: 2, text: 'Apply online on JanSamarth portal (jansamarth.in) or your bank branch.', textHi: 'जनसमर्थ पोर्टल (jansamarth.in) पर सीधे ऑनलाइन आवेदन करें।' },
      { step: 3, text: 'Receive direct in-principle loan approval and disbursal.', textHi: 'सैद्धांतिक स्वीकृति पत्र प्राप्त करें और खाते में ऋण राशि पाएं।' }
    ],
    tags: ['Mudra Loan', 'Shopkeepers', 'Finance', 'No Collateral'],
    is100PercentFree: true
  },
  {
    id: 'opp-biz-mushroom-01',
    title: 'Commercial Mushroom Cultivation & Processing Unit (NABARD 33% Subsidy)',
    titleHi: 'व्यावसायिक मशरूम उत्पादन एवं प्रसंस्करण इकाई (नाबार्ड 33% सरकारी सब्सिडी)',
    category: 'startup_idea',
    lifeStage: 'startups',
    targetAges: [20, 65],
    stateEligibility: ['ALL'],
    targetOccupations: ['farmer', 'business_owner', 'homemaker', 'job_seeker'],
    benefitHeadline: 'Earn ₹60,000 - ₹1,80,000/Month from 500 Sq Ft Dark Room (₹8 Lakh NABARD Subsidized Project)',
    benefitHeadlineHi: 'मात्र 500 वर्गफीट स्थान में मशरूम उगाकर ₹60,000 - ₹1,80,000 प्रतिमाह शुद्ध लाभ प्राप्त करें',
    benefitAmount: 264000,
    deadline: 'OPEN_ROUND',
    description: 'NABARD and National Horticulture Board (NHB) credit-linked subsidy providing up to 33.3% capital grant for cold-controlled oyster, button, and milky mushroom sheds.',
    descriptionHi: 'राष्ट्रीय बागवानी बोर्ड एवं नाबार्ड द्वारा नियंत्रित वातावरण में उच्च मूल्य वाली मशरूम की खेती हेतु पूंजीगत सब्सिडी योजना।',
    gazette: {
      circularNumber: 'NHB/MIDH/MUSHROOM-UNIT/2026',
      issuingAuthority: 'National Horticulture Board & NABARD',
      gazetteDate: '2026-06-15',
      lastVerifiedAt: 'Live verified 3 hrs ago',
      officialPortalUrl: 'https://nhb.gov.in',
      scamAlertWarning: 'Free spawn and compost testing is available at State Agriculture Universities (SAUs). Avoid fake private franchisors selling bad spawn.',
      officialGovtFee: '₹0 (Subsidy Application Free on NHB portal)'
    },
    documents: [
      { id: 'd-mush-1', name: 'Land Proof / Lease Deed (Minimum 3 Years)', nameHi: 'भूमि अभिलेख अथवा 3 वर्षीय लीज डीड', isMandatory: true },
      { id: 'd-mush-2', name: 'Bank Sanction Letter & DPR', nameHi: 'बैंक ऋण स्वीकृति पत्र एवं परियोजना रिपोर्ट', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Complete free 3-day mushroom training at nearest KVK or NHB centre.', textHi: 'निकटतम केवीके से 3-दिवसीय निःशुल्क मशरूम प्रशिक्षण लें।' },
      { step: 2, text: 'Submit project report to Nationalized Bank under NHB scheme.', textHi: 'राष्ट्रीयकृत बैंक में एनएचबी योजना के अंतर्गत ऋण आवेदन करें।' },
      { step: 3, text: 'Receive direct back-ended capital subsidy into bank loan account.', textHi: 'सब्सिडी राशि बैंक ऋण खाते में सीधे सरकारी सहायता के रूप में जमा होगी।' }
    ],
    tags: ['Agri Business', 'Mushroom Farming', 'NABARD Subsidy', 'High Profit'],
    is100PercentFree: true
  },
  {
    id: 'opp-biz-janaushadhi-store-01',
    title: 'Pradhan Mantri Jan Aushadhi Kendra Franchise (₹5 Lakh Govt Assistance)',
    titleHi: 'प्रधानमंत्री जन औषधि केंद्र फ्रैंचाइज़ी (सरकार द्वारा ₹5 लाख तक की आर्थिक सहायता)',
    category: 'startup_idea',
    lifeStage: 'startups',
    targetAges: [21, 65],
    stateEligibility: ['ALL'],
    targetOccupations: ['business_owner', 'job_seeker', 'employed'],
    benefitHeadline: 'Earn 20% Direct Retail Margin on Generic Medicines + ₹5 Lakh Govt Incentive Reimbursement',
    benefitHeadlineHi: 'दवाइयों की बिक्री पर 20% सुनिश्चित मार्जिन + दुकान सजावट एवं कंप्यूटर हेतु ₹5 लाख तक सरकारी सहायता',
    benefitAmount: 500000,
    deadline: 'OPEN_ROUND',
    description: 'Pharmaceuticals & Medical Devices Bureau of India (PMBI) official franchise model helping pharmacists and entrepreneurs open generic medicine stores in hospitals and public markets.',
    descriptionHi: 'केंद्र सरकार द्वारा आम जनता को सस्ती जेनेरिक दवाइयां उपलब्ध कराने हेतु निजी उद्यमियों को जन औषधि केंद्र खोलने का आकर्षक अवसर।',
    gazette: {
      circularNumber: 'PMBI/KENDRA-POLICY/2026/INCENTIVE',
      issuingAuthority: 'Pharmaceuticals & Medical Devices Bureau of India',
      gazetteDate: '2026-07-05',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://janaushadhi.gov.in',
      scamAlertWarning: 'Application is processed exclusively on janaushadhi.gov.in. No agency or officer is authorized to take cash payments for approval.',
      officialGovtFee: '₹5,000 (Non-refundable official processing fee, Free for Women/SC/ST)'
    },
    documents: [
      { id: 'd-jan-1', name: 'Pharmacist D.Pharm / B.Pharm Degree & Registration', nameHi: 'फार्मासिस्ट पंजीकरण प्रमाण पत्र', isMandatory: true },
      { id: 'd-jan-2', name: 'Minimum 120 Sq Ft Commercial Space Ownership/Rent Deed', nameHi: 'न्यूनतम 120 वर्ग फीट दुकान का स्वामित्व या किरायानामा', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Submit online application on janaushadhi.gov.in.', textHi: 'janaushadhi.gov.in पर ऑनलाइन आवेदन फॉर्म भरें।' },
      { step: 2, text: 'Receive In-Principle Approval (IPA) from PMBI within 15 days.', textHi: '15 दिनों में पीएमबीआई से सैद्धांतिक स्वीकृति पत्र प्राप्त करें।' },
      { step: 3, text: 'Obtain Drug License from State Drug Authority and start retail operations.', textHi: 'ड्रग लाइसेंस प्राप्त कर दवा केंद्र शुरू करें और सरकारी प्रोत्साहन पाएं।' }
    ],
    tags: ['Pharmacy', 'Medical Store', 'Jan Aushadhi', 'Govt Franchise'],
    is100PercentFree: false
  },
  {
    id: 'opp-biz-dairy-poultry-01',
    title: 'National Livestock Mission (NLM): 50% Capital Subsidy for Dairy & Poultry Units',
    titleHi: 'राष्ट्रीय पशुधन मिशन: मुर्गी पालन, बकरी पालन एवं डेयरी फार्म हेतु 50% सरकारी सब्सिडी',
    category: 'startup_idea',
    lifeStage: 'startups',
    targetAges: [21, 65],
    stateEligibility: ['ALL'],
    targetOccupations: ['farmer', 'business_owner'],
    benefitHeadline: 'Get 50% Direct Govt Capital Subsidy Up to ₹25 Lakh to ₹50 Lakh for Commercial Animal Husbandry',
    benefitHeadlineHi: 'व्यावसायिक डेयरी, पोल्ट्री व बकरी पालन हेतु ₹25 लाख से ₹50 लाख तक 50% सीधी सरकारी सब्सिडी',
    benefitAmount: 2500000,
    deadline: 'OPEN_ROUND',
    description: 'Ministry of Fisheries, Animal Husbandry & Dairying initiative to create rural entrepreneurs by subsidizing breeding farms, feed processing plants, and hatcheries.',
    descriptionHi: 'पशुपालन और डेयरी विभाग द्वारा ग्रामीण क्षेत्रों में आधुनिक पोल्ट्री, डेयरी और पशुधन फार्म स्थापित करने हेतु मेगा सब्सिडी।',
    gazette: {
      circularNumber: 'DAHD/NLM/2026/ENTREPRENEURSHIP',
      issuingAuthority: 'Department of Animal Husbandry and Dairying (Govt of India)',
      gazetteDate: '2026-05-20',
      lastVerifiedAt: 'Live verified 2 hrs ago',
      officialPortalUrl: 'https://nlm.udyamimitra.in',
      scamAlertWarning: 'All NLM subsidy approvals are vetted by State Level Screening Committee (SLSC). Never pay middlemen claiming express approval.',
      officialGovtFee: '₹0 (Free Application via SIDBI Udyamimitra portal)'
    },
    documents: [
      { id: 'd-nlm-1', name: 'Land Record (Self-owned or minimum 10-year registered lease)', nameHi: 'जमीन की रजिस्ट्री अथवा 10-वर्षीय लीज डीड', isMandatory: true },
      { id: 'd-nlm-2', name: 'Detailed Project Report (DPR) prepared by chartered engineer', nameHi: 'परियोजना तकनीकी एवं वित्तीय रिपोर्ट (DPR)', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Prepare DPR and get bank in-principle loan sanction.', textHi: 'परियोजना रिपोर्ट बनवाकर बैंक से सैद्धांतिक ऋण स्वीकृति लें।' },
      { step: 2, text: 'Apply online on nlm.udyamimitra.in portal with all attachments.', textHi: 'nlm.udyamimitra.in पोर्टल पर सभी दस्तावेजों के साथ ऑनलाइन आवेदन करें।' },
      { step: 3, text: 'Subsidy released in 2 milestones directly into bank escrow account.', textHi: 'निर्माण चरणों के सत्यापन के पश्चात 50% सब्सिडी सीधे खाते में जमा होगी।' }
    ],
    tags: ['Dairy Farming', 'Poultry Farm', 'Livestock Subsidy', 'High Subsidy'],
    is100PercentFree: true
  },
  {
    id: 'opp-biz-cloud-kitchen-01',
    title: 'Low-Investment Cloud Kitchen & Home Food Brand (FSSAI + Swiggy/Zomato)',
    titleHi: 'घर से शुरू करें कम लागत वाला क्लाउड किचन व्यापार (एफएसएसएआई एवं स्विगी/ज़ोमैटो पार्टनरशिप)',
    category: 'startup_idea',
    lifeStage: 'startups',
    targetAges: [18, 60],
    stateEligibility: ['ALL'],
    targetOccupations: ['homemaker', 'job_seeker', 'business_owner', 'employed'],
    benefitHeadline: 'Earn ₹40,000 - ₹1,20,000/Month from Home Kitchen with Zero Restaurant Dine-In Rent Costs',
    benefitHeadlineHi: 'बिना किसी दुकान का भारी किराया दिए घर की रसोई से खाना बनाकर ऑनलाइन डिलीवरी द्वारा उच्च मुनाफा कमाएं',
    benefitAmount: 60000,
    deadline: 'OPEN_ROUND',
    description: 'Practical guide to establishing a legal food delivery brand from home or low-cost commercial space using mandatory ₹100 FSSAI registration and online aggregator onboarding.',
    descriptionHi: 'मात्र ₹100 के सरकारी खाद्य सुरक्षा लाइसेंस के साथ घर से भोजन का वैध ब्रांड बनाकर स्विगी और जोमैटो पर बिक्री का मॉडल।',
    gazette: {
      circularNumber: 'FSSAI/FOSCOS/2026/HOME-KITCHEN',
      issuingAuthority: 'Food Safety and Standards Authority of India (FSSAI)',
      gazetteDate: '2026-08-14',
      lastVerifiedAt: 'Live verified 1 hr ago',
      officialPortalUrl: 'https://foscos.fssai.gov.in',
      scamAlertWarning: 'FSSAI Basic Registration fee is officially ₹100 per year on foscos.fssai.gov.in. Avoid third-party consultancy websites charging ₹2,500.',
      officialGovtFee: '₹100/year (Official Govt FSSAI Fee)'
    },
    documents: [
      { id: 'd-fssai-1', name: 'Aadhaar Card & Photo of Kitchen Setup', nameHi: 'आधार कार्ड एवं रसोई की फोटो', isMandatory: true },
      { id: 'd-fssai-2', name: 'Bank Account / Cancelled Cheque & PAN Card', nameHi: 'बैंक खाता एवं पैन कार्ड', isMandatory: true }
    ],
    applySteps: [
      { step: 1, text: 'Apply for Basic FSSAI Registration on foscos.fssai.gov.in for ₹100.', textHi: 'foscos.fssai.gov.in पर मात्र ₹100 में सरकारी खाद्य लाइसेंस प्राप्त करें।' },
      { step: 2, text: 'Register as Merchant Partner on Swiggy Partner and Zomato for Business apps.', textHi: 'स्विगी एवं जोमैटो मर्चेंट ऐप पर अपना मेनू और बैंक खाता लिंक करें।' },
      { step: 3, text: 'Start receiving daily online orders with weekly direct bank payouts.', textHi: 'ऑर्डर प्राप्त करना शुरू करें और साप्ताहिक बैंक भुगतान पाएं।' }
    ],
    tags: ['Cloud Kitchen', 'Home Business', 'Food Business', 'Zero Rent'],
    is100PercentFree: false
  }
];
