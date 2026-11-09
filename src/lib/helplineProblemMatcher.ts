export interface ProblemMatchResult {
  id: string;
  helplineNumber: string;
  badgeEn: string;
  badgeHi: string;
  problemTitleEn: string;
  problemTitleHi: string;
  authorityEn: string;
  authorityHi: string;
  operatingHours: string;
  is24x7: boolean;
  urgencyLevel: 'critical' | 'high' | 'standard';
  goldenHourTipEn: string;
  goldenHourTipHi: string;
  actionStepsEn: string[];
  actionStepsHi: string[];
  cautionEn: string;
  cautionHi: string;
  portalUrl: string;
  portalLabel: string;
  secondaryNumbers?: { label: string; number: string }[];
  matchScore?: number;
}

interface ProblemDefinition {
  id: string;
  helplineNumber: string;
  badgeEn: string;
  badgeHi: string;
  problemTitleEn: string;
  problemTitleHi: string;
  authorityEn: string;
  authorityHi: string;
  operatingHours: string;
  is24x7: boolean;
  urgencyLevel: 'critical' | 'high' | 'standard';
  goldenHourTipEn: string;
  goldenHourTipHi: string;
  actionStepsEn: string[];
  actionStepsHi: string[];
  cautionEn: string;
  cautionHi: string;
  portalUrl: string;
  portalLabel: string;
  secondaryNumbers?: { label: string; number: string }[];
  keywords: string[];
}

export const COMPREHENSIVE_PROBLEMS: ProblemDefinition[] = [
  // 1. Cyber Financial Fraud / UPI / Bank Money Debited
  {
    id: 'prob-cyber-fraud',
    helplineNumber: '1930',
    badgeEn: 'CYBER FINANCIAL FRAUD DETECTED',
    badgeHi: 'साइबर वित्तीय धोखाधड़ी रिपोर्ट',
    problemTitleEn: 'Unauthorized Bank Debit, UPI Scam or Online Fraud',
    problemTitleHi: 'बैंक से अनधिकृत पैसे कटना, यूपीआई फ्रॉड अथवा ऑनलाइन ठगी',
    authorityEn: 'Indian Cyber Crime Coordination Centre (I4C), MHA',
    authorityHi: 'भारतीय साइबर अपराध समन्वय केंद्र (I4C), गृह मंत्रालय (भारत सरकार)',
    operatingHours: '24x7 All Days (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'critical',
    goldenHourTipEn: 'Golden Hour Rule: Calling 1930 within 2 hours of money debit freezes the scammer\'s bank account immediately and gives up to 90% money recovery chance.',
    goldenHourTipHi: 'गोल्डन आवर नियम: पैसे कटने के तुरंत 2 घंटे के भीतर 1930 पर कॉल करने से फ्रॉड का बैंक खाता तुरंत फ्रीज हो जाता है और पैसे वापस मिलने की संभावना 90% तक होती है।',
    actionStepsEn: [
      'Call 1930 immediately from any phone without delay.',
      'Keep Transaction UTR Number, Account Number, and Debit SMS ready.',
      'Also register a formal complaint on the official portal cybercrime.gov.in.'
    ],
    actionStepsHi: [
      'बिना किसी देरी के तुरंत 1930 पर कॉल करें।',
      'बैंक मैसेज का UTR नंबर, खाता संख्या और लेनदेन का समय पास रखें।',
      'कॉल के बाद आधिकारिक पोर्टल cybercrime.gov.in पर भी फॉर्मल कंप्लेंट दर्ज करें।'
    ],
    cautionEn: 'Never install AnyDesk, TeamViewer or click suspicious APK download links sent by the scammer.',
    cautionHi: 'सावधानी: ठग द्वारा भेजा गया कोई भी AnyDesk, TeamViewer या APK ऐप कभी डाउनलोड न करें।',
    portalUrl: 'https://cybercrime.gov.in',
    portalLabel: 'cybercrime.gov.in',
    secondaryNumbers: [
      { label: 'Police Emergency / पुलिस सहायता', number: '112' },
      { label: 'RBI Banking Ombudsman / बैंक लोकपाल', number: '14440' }
    ],
    keywords: [
      'paise cut gaye', 'paisa cut gaya', 'paisa kat gaya', 'money deducted', 'fraud', 'bank fraud', 
      'upi scam', 'phonepe scam', 'gpay scam', 'paytm fraud', 'account hack', 'otp scam', 'credit card fraud',
      'atm clone', 'trading scam', 'task scam', 'telegram fraud', 'fake loan app', 'extortion video call',
      'sextortion', 'blackmail', 'lottery scam', 'kyc scam', 'sim swap', 'digital arrest', 'paise wapas',
      'unauthorized transaction', 'online thagi', 'cyber crime', 'netbanking hack'
    ]
  },

  // 2. Police Emergency / Crime / Physical Danger / Accidents
  {
    id: 'prob-police-emergency',
    helplineNumber: '112',
    badgeEn: 'POLICE & LIFE EMERGENCY',
    badgeHi: 'आपातकालीन पुलिस व जीवन सुरक्षा',
    problemTitleEn: 'Immediate Police Assistance, Crime, Physical Threat or Theft',
    problemTitleHi: 'तत्काल पुलिस सहायता, अपराध, शारीरिक हमला अथवा चोरी',
    authorityEn: 'Emergency Response Support System (ERSS), Ministry of Home Affairs',
    authorityHi: 'आपातकालीन प्रतिक्रिया समर्थन प्रणाली (ERSS), गृह मंत्रालय',
    operatingHours: '24x7 Pan-India (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'critical',
    goldenHourTipEn: 'Single emergency pan-India number for immediate Police PCR van dispatch, Ambulance, and Fire services.',
    goldenHourTipHi: 'अखिल भारतीय एकीकृत नंबर: तुरंत पीसीआर वैन, एम्बुलेंस अथवा बचाव दल रवाना करने हेतु 112 मिलाएं।',
    actionStepsEn: [
      'Dial 112 and clearly state your exact location and nearby landmark.',
      'Describe the emergency (theft, physical threat, assault, road accident).',
      'Stay on the line until the dispatch officer confirms the patrol unit is en route.'
    ],
    actionStepsHi: [
      '112 पर कॉल करके अपना सटीक स्थान और नजदीकी लैंडमार्क बताएं।',
      'घटना का प्रकार स्पष्ट करें (चोरी, झगड़ा, हमला, सड़क हादसा)।',
      'जब तक कंट्रोल रूम अधिकारी यूनिट रवाना होने की पुष्टि न करे, लाइन पर बने रहें।'
    ],
    cautionEn: 'Stay in a well-lit, populated area if facing a physical threat while waiting for police.',
    cautionHi: 'सावधानी: यदि किसी खतरे का सामना कर रहे हैं, तो पुलिस आने तक किसी भीड़भाड़ या सुरक्षित स्थान पर रहें।',
    portalUrl: 'https://112.gov.in',
    portalLabel: '112.gov.in',
    secondaryNumbers: [
      { label: 'Ambulance / एम्बुलेंस', number: '108' },
      { label: 'Fire Service / दमकल', number: '101' }
    ],
    keywords: [
      'police', 'chori', 'theft', 'marpeet', 'jhagda', 'fight', 'attack', 'hamla', 'gunda', 'threat',
      'dhamki', 'accident', 'murder', 'kidnap', 'loot', 'fir', 'police station', 'pcr van', 'emergency',
      'life threat', 'danger', 'kisi ne mara', 'snatching', 'burglary', 'trespass', 'illegal possession'
    ]
  },

  // 3. Women Safety & Domestic Violence
  {
    id: 'prob-women-safety',
    helplineNumber: '181',
    badgeEn: 'WOMEN SAFETY & CRISIS ASSISTANCE',
    badgeHi: 'महिला सुरक्षा व संकट सहायता',
    problemTitleEn: 'Women Harassment, Domestic Violence, Stalking or Distress',
    problemTitleHi: 'महिला उत्पीड़न, घरेलू हिंसा, पीछा करना अथवा संकट सहायता',
    authorityEn: 'Ministry of Women and Child Development (Govt of India)',
    authorityHi: 'महिला एवं बाल विकास मंत्रालय (भारत सरकार)',
    operatingHours: '24x7 All Days (Toll-Free & Confidential)',
    is24x7: true,
    urgencyLevel: 'critical',
    goldenHourTipEn: 'Confidential 24x7 crisis intervention providing immediate rescue, legal advice, shelter, and medical support.',
    goldenHourTipHi: 'गोपनीय 24x7 हेल्पलाइन: तत्काल रेस्क्यू, कानूनी सलाह, शेल्टर होम और चिकित्सा सहायता प्रदान की जाती है।',
    actionStepsEn: [
      'Dial 181 for confidential counseling, emergency shelter, and legal protection.',
      'In case of immediate physical violence or danger, call 112 alongside 181.',
      'Women in UP can also dial 1090 (Women Power Line) for cyber stalking and harassment.'
    ],
    actionStepsHi: [
      'गोपनीय काउंसलिंग, शेल्टर होम और कानूनी सुरक्षा के लिए 181 पर कॉल करें।',
      'तत्काल शारीरिक खतरे या हमले की स्थिति में 181 के साथ 112 पर भी तुरंत कॉल करें।',
      'साइबर स्टॉकिंग या फोन पर परेशान किए जाने पर 1090 पर भी शिकायत कर सकते हैं।'
    ],
    cautionEn: 'Your identity and call records are kept strictly confidential by the government cell.',
    cautionHi: 'सावधानी: आपकी पहचान और कॉल विवरण पूरी तरह गोपनीय रखे जाते हैं।',
    portalUrl: 'https://wcd.nic.in',
    portalLabel: 'wcd.nic.in',
    secondaryNumbers: [
      { label: 'Women Power Line / महिला पावर लाइन', number: '1090' },
      { label: 'National Police Emergency', number: '112' }
    ],
    keywords: [
      'women safety', 'domestic violence', 'ghar me marpeet', 'pati mar raha hai', 'dahej', 'dowry',
      'eve teasing', 'stalking', 'molestation', 'rape', 'harassment', 'ladki ko pareshan', 'mahila helpline',
      'nari suraksha', 'women distress', 'forced marriage', 'cheating husband', 'threat to woman'
    ]
  },

  // 4. Mental Health, Depression & Suicide Prevention
  {
    id: 'prob-mental-health',
    helplineNumber: '14416',
    badgeEn: '24x7 FREE PSYCHOLOGICAL COUNSELING',
    badgeHi: '24x7 निःशुल्क मानसिक स्वास्थ्य व काउंसलिंग',
    problemTitleEn: 'Depression, Severe Anxiety, Panic Attack or Suicidal Distress',
    problemTitleHi: 'गंभीर अवसाद (डिप्रेशन), घबराहट, मानसिक तनाव अथवा आत्महत्या विचार',
    authorityEn: 'Tele-MANAS, Ministry of Health and Family Welfare (Govt of India)',
    authorityHi: 'टेली-मानस, स्वास्थ्य एवं परिवार कल्याण मंत्रालय (भारत सरकार)',
    operatingHours: '24x7 All Languages (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'critical',
    goldenHourTipEn: 'Free, compassionate psychiatric counseling by certified counselors across 20+ Indian languages with zero judgment.',
    goldenHourTipHi: '20+ भारतीय भाषाओं में प्रमाणित डॉक्टरों और मनोवैज्ञानिकों द्वारा 100% निःशुल्क और गोपनीय परामर्श।',
    actionStepsEn: [
      'Dial 14416 (or alternative 1800-891-4416) from any mobile or landline.',
      'Select your preferred regional language (Hindi, English, Bengali, Tamil, etc.).',
      'Speak freely with the counselor. They can connect you to medical specialists nearby if needed.'
    ],
    actionStepsHi: [
      'किसी भी फोन से 14416 (या 1800-891-4416) डायल करें।',
      'अपनी पसंदीदा भाषा चुनें (हिंदी, अंग्रेजी आदि)।',
      'काउंसलर से खुलकर बात करें। आवश्यकता पड़ने पर वे नजदीकी सरकारी अस्पताल से भी जोड़ते हैं।'
    ],
    cautionEn: 'You are not alone. There is no shame in seeking support. All conversations are 100% confidential.',
    cautionHi: 'सावधानी: आप अकेले नहीं हैं। मदद मांगना समझदारी है। आपकी बातचीत पूरी तरह गोपनीय रहती है।',
    portalUrl: 'https://telemanas.mohfw.gov.in',
    portalLabel: 'telemanas.mohfw.gov.in',
    secondaryNumbers: [
      { label: 'KIRAN Mental Health Helpline', number: '1800-599-0019' },
      { label: 'National Health Helpline', number: '1075' }
    ],
    keywords: [
      'depression', 'suicide', 'marne ka man', 'rona aa raha hai', 'anxiety', 'panic attack', 'mental health',
      'stress', 'tension', 'akelapan', 'loneliness', 'neend nahi aa rahi', 'insomnia', 'exam stress', 
      'breakup depression', 'psychiatrist', 'counseling', 'mental trauma', 'manas', 'dimagi pareshani'
    ]
  },

  // 5. Railway RailMadad / Train Problems
  {
    id: 'prob-railway',
    helplineNumber: '139',
    badgeEn: 'INDIAN RAILWAYS RAILMADAD',
    badgeHi: 'भारतीय रेल मदद 24x7',
    problemTitleEn: 'Train Delay, Theft on Train, AC Breakdown, TT Issue or Medical Emergency',
    problemTitleHi: 'ट्रेन में सामान चोरी, एसी/बिजली खराबी, टीटी विवाद अथवा चलती ट्रेन में मेडिकल आपातकाल',
    authorityEn: 'Ministry of Railways (Government of India)',
    authorityHi: 'रेल मंत्रालय (भारत सरकार)',
    operatingHours: '24x7 All Days (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'high',
    goldenHourTipEn: 'Dialing 139 with your PNR or Train Number triggers immediate on-board RPF or TTE intervention at the very next station.',
    goldenHourTipHi: 'पीएनआर (PNR) या ट्रेन नंबर बताकर 139 मिलाने पर अगले ही स्टेशन पर आरपीएफ या टीटीई द्वारा समाधान किया जाता है।',
    actionStepsEn: [
      'Dial 139 and select option for Emergency, Security or Coach Cleanliness.',
      'Keep your PNR number, Train number and Coach/Berth number ready.',
      'You can also register on railmadad.indianrailways.gov.in for real-time tracking.'
    ],
    actionStepsHi: [
      '139 डायल करें और सुरक्षा, मेडिकल या कोच सफाई का विकल्प चुनें।',
      'अपना PNR नंबर, ट्रेन नंबर और कोच/बर्थ संख्या पास रखें।',
      'railmadad.indianrailways.gov.in पर भी ऑनलाइन शिकायत दर्ज कर सकते हैं।'
    ],
    cautionEn: 'In case of physical crime or luggage theft on a running train, ask for GRP (Government Railway Police) escort.',
    cautionHi: 'सावधानी: चलती ट्रेन में चोरी या अपराध होने पर 139 से जीआरपी (GRP) एस्कॉर्ट की मांग करें।',
    portalUrl: 'https://railmadad.indianrailways.gov.in',
    portalLabel: 'railmadad.indianrailways.gov.in',
    secondaryNumbers: [
      { label: 'RPF Security Helpline', number: '139' },
      { label: 'Police Emergency', number: '112' }
    ],
    keywords: [
      'railway', 'train', 'irctc', 'pnr', 'railmadad', '139', 'train me chori', 'coach ac kharab', 
      'train dirty toilet', 'tt rishwat', 'berth dispute', 'train delay refund', 'ticket refund',
      'food in train', 'train accident', 'railway complaint', 'running train help'
    ]
  },

  // 6. Consumer Complaints / Fake Products / Refund Denial
  {
    id: 'prob-consumer',
    helplineNumber: '1915',
    badgeEn: 'NATIONAL CONSUMER GRIEVANCE HELPLINE',
    badgeHi: 'राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH)',
    problemTitleEn: 'Defective Product, Refund Refused, E-commerce Fraud or Warranty Denial',
    problemTitleHi: 'खराब सामान, रिफंड देने से मना करना, ई-कॉमर्स धोखा अथवा वारंटी विवाद',
    authorityEn: 'Department of Consumer Affairs, Ministry of Consumer Affairs',
    authorityHi: 'उपभोक्ता मामले विभाग, उपभोक्ता मामले मंत्रालय (भारत सरकार)',
    operatingHours: '9:30 AM to 5:30 PM (Mon-Sat, Toll-Free)',
    is24x7: false,
    urgencyLevel: 'high',
    goldenHourTipEn: 'Government-backed statutory dispute resolution for immediate notices to e-commerce companies, shops, airlines, and service providers.',
    goldenHourTipHi: 'सख्त सरकारी फोरम: ई-कॉमर्स कंपनियों, दुकानों, एयरलाइंस या बिल्डरों को तुरंत नोटिस भेजकर समाधान कराया जाता है।',
    actionStepsEn: [
      'Dial 1915 (or 1800-11-4000) or send an SMS with your grievance to 8800001915.',
      'Keep your Order ID, Invoice/Bill copy, and company support chat logs ready.',
      'File the complaint on consumerhelpline.gov.in to get a unique Docket ID.'
    ],
    actionStepsHi: [
      '1915 (या 1800-11-4000) पर कॉल करें अथवा 8800001915 पर एसएमएस भेजें।',
      'खरीद का बिल/इनवॉइस, आर्डर आईडी और कस्टमर केयर से हुई बातचीत पास रखें।',
      'consumerhelpline.gov.in पर भी डॉकेट नंबर प्राप्त कर शिकायत दर्ज करें।'
    ],
    cautionEn: 'Do not accept fake coupon codes or click unofficial customer care numbers from Google search.',
    cautionHi: 'सावधानी: गूगल सर्च पर मिलने वाले फर्जी कस्टमर केयर नंबरों पर कभी भरोसा न करें।',
    portalUrl: 'https://consumerhelpline.gov.in',
    portalLabel: 'consumerhelpline.gov.in',
    secondaryNumbers: [
      { label: 'Alternate Toll-Free Consumer Desk', number: '1800-11-4000' },
      { label: 'Tele-Law Legal Support', number: '15100' }
    ],
    keywords: [
      'consumer', 'refund', 'refund nahi mila', 'defective product', 'shopkeeper cheated', 'fake product',
      'amazon refund', 'flipkart return', 'warranty claim', 'broken item', 'airline refund', 'flight cancelled',
      'builder delayed possession', 'rera complaint', 'telecom bill dispute', 'overcharging', 'mrp se jyada'
    ]
  },

  // 7. LPG Gas Leakage 24x7 Emergency
  {
    id: 'prob-lpg-leak',
    helplineNumber: '1906',
    badgeEn: 'LPG GAS LEAKAGE EMERGENCY',
    badgeHi: 'एलपीजी गैस सिलेंडर रिसाव आपातकाल',
    problemTitleEn: 'Gas Cylinder Leakage, Strong Gas Smell or Regulator Malfunction',
    problemTitleHi: 'रसोई गैस सिलेंडर रिसाव, गैस की तेज गंध अथवा रेगुलेटर खराबी',
    authorityEn: 'Ministry of Petroleum & Natural Gas (All Oil Companies IOCL, BPCL, HPCL)',
    authorityHi: 'पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय (इंडियन ऑयल, भारत पेट्रोलियम, एचपी गैस)',
    operatingHours: '24x7 Pan-India (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'critical',
    goldenHourTipEn: 'Do NOT turn ON or OFF any electrical switches, matchsticks or mobile flashlights. Open all doors & windows immediately.',
    goldenHourTipHi: 'अत्यंत महत्वपूर्ण: कोई भी बिजली का स्विच ऑन/ऑफ न करें, माचिस न जलाएं। सभी खिड़कियां और दरवाजे तुरंत खोल दें।',
    actionStepsEn: [
      'Immediately put the safety cap on the LPG cylinder and close the regulator.',
      'Evacuate everyone from the room and open all doors and windows.',
      'Dial 1906 immediately from a safe distance outside the house.'
    ],
    actionStepsHi: [
      'रेगुलेटर तुरंत बंद करें और सिलेंडर पर सेफ्टी कैप लगा दें।',
      'कमरे से बाहर निकलें और सभी दरवाजे-खिड़कियां खोल दें।',
      'घर से बाहर सुरक्षित दूरी पर जाकर तुरंत 1906 पर कॉल करें।'
    ],
    cautionEn: 'Never use a mobile phone, electrical appliances, or lighter inside the room with gas smell.',
    cautionHi: 'सावधानी: गैस की गंध वाले कमरे के भीतर फोन, लाइटर या बिजली का कोई उपकरण न चलाएं।',
    portalUrl: 'https://mopng.gov.in',
    portalLabel: 'mopng.gov.in',
    secondaryNumbers: [
      { label: 'Fire Emergency / दमकल', number: '101' },
      { label: 'National Emergency', number: '112' }
    ],
    keywords: [
      'gas leak', 'cylinder leak', 'gas smell', 'lpg leak', 'cylinder aag', 'cylinder blast', 
      'regulator kharab', 'indane leak', 'hp gas leak', 'bharat gas leak', 'rasoi gas smell', '1906'
    ]
  },

  // 8. Electricity Failure & High-Voltage Shock Emergency
  {
    id: 'prob-electricity',
    helplineNumber: '1912',
    badgeEn: 'ELECTRICITY COMPLAINT & POWER EMERGENCY',
    badgeHi: 'बिजली फॉल्ट व ट्रांसफार्मर आपातकाल',
    problemTitleEn: 'Power Cut, Transformer Blast, Fallen Electric Wire or High Bill Dispute',
    problemTitleHi: 'बिजली गुल होना, ट्रांसफार्मर खराबी, टूटा बिजली तार अथवा अत्यधिक बिल विवाद',
    authorityEn: 'Ministry of Power & All State Discoms (Govt of India)',
    authorityHi: 'विद्युत मंत्रालय व सभी राज्य बिजली वितरण निगम',
    operatingHours: '24x7 Pan-India (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'high',
    goldenHourTipEn: 'Pan-India single toll-free number connecting directly to your state electricity discom control room.',
    goldenHourTipHi: 'पूरे भारत का एकल नंबर जो आपके राज्य के बिजली बोर्ड कंट्रोल रूम से सीधे जोड़ता है।',
    actionStepsEn: [
      'Dial 1912 and enter your Consumer Number (CA Number) or select live executive.',
      'Report power outage, sparks, loose wire or transformer smoke.',
      'Note down the Complaint Docket Number for immediate tracking.'
    ],
    actionStepsHi: [
      '1912 मिलाएं और अपना बिजली उपभोक्ता नंबर (CA Number) दर्ज करें।',
      'बिजली गुल, टूटा तार या ट्रांसफार्मर स्पार्क की तुरंत रिपोर्ट करें।',
      'फॉलो-अप हेतु कंप्लेंट डॉकेट नंबर जरूर नोट करें।'
    ],
    cautionEn: 'Never go near water puddles or iron poles near a fallen electric wire.',
    cautionHi: 'सावधानी: गिरे हुए बिजली के तार या पानी भरे रास्तों के पास कभी न जाएं।',
    portalUrl: 'https://powermin.gov.in',
    portalLabel: 'powermin.gov.in',
    secondaryNumbers: [
      { label: 'Fire Brigade / दमकल', number: '101' },
      { label: 'National Emergency', number: '112' }
    ],
    keywords: [
      'electricity', 'bijli', 'power cut', 'light chali gayi', 'transformer blast', 'electric wire broken',
      'meter fast', 'bijli bill dispute', 'voltage fluctuation', 'current lag gaya', '1912', 'discom'
    ]
  },

  // 9. Childline / Child Distress & Abuse
  {
    id: 'prob-childline',
    helplineNumber: '1098',
    badgeEn: 'CHILDLINE 24x7 RESCUE',
    badgeHi: 'चाइल्डलाइन 1098 बाल सुरक्षा',
    problemTitleEn: 'Lost Child, Child Abuse, Child Labor, Trafficking or Distress',
    problemTitleHi: 'लापता बच्चा, बाल शोषण, बाल मजदूरी अथवा संकटग्रस्त बच्चे की सहायता',
    authorityEn: 'Ministry of Women and Child Development (Govt of India)',
    authorityHi: 'महिला एवं बाल विकास मंत्रालय (भारत सरकार)',
    operatingHours: '24x7 Pan-India (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'critical',
    goldenHourTipEn: '24-hour emergency phone outreach service for children in need of care and protection.',
    goldenHourTipHi: 'संकट में फंसे किसी भी बच्चे के तत्काल बचाव व संरक्षण हेतु 24 घंटे की सरकारी आपातकालीन सेवा।',
    actionStepsEn: [
      'Dial 1098 immediately and provide the exact location of the child.',
      'State if the child is injured, lost, begging, or working as forced child labor.',
      'Child Welfare Committee (CWC) team and local police will be dispatched.'
    ],
    actionStepsHi: [
      'तुरंत 1098 मिलाएं और बच्चे का सटीक स्थान बताएं।',
      'स्पष्ट करें कि क्या बच्चा लावारिस है, बाल मजदूरी कर रहा है या संकट में है।',
      'चाइल्ड वेलफेयर टीम और पुलिस तुरंत बचाव के लिए रवाना होगी।'
    ],
    cautionEn: 'Any citizen can report anonymously to protect a vulnerable child.',
    cautionHi: 'सावधानी: किसी बच्चे की सुरक्षा के लिए कोई भी नागरिक बिना नाम बताए गुप्त रिपोर्ट कर सकता है।',
    portalUrl: 'https://childlineindia.org',
    portalLabel: 'childlineindia.org',
    secondaryNumbers: [
      { label: 'Police Emergency', number: '112' },
      { label: 'Women Helpline', number: '181' }
    ],
    keywords: [
      'child', 'bachha', 'child abuse', 'child labor', 'lost child', 'bachha ghum ho gaya', 'bal vivah',
      'child marriage', 'orphan baby', 'begging child', 'school bullying child', '1098', 'ncpcr'
    ]
  },

  // 10. National Highway Emergency & Road Breakdown
  {
    id: 'prob-highway',
    helplineNumber: '1033',
    badgeEn: 'NATIONAL HIGHWAY 24x7 EMERGENCY (NHAI)',
    badgeHi: 'राष्ट्रीय राजमार्ग हेल्पलाइन (NHAI)',
    problemTitleEn: 'Highway Accident, Vehicle Breakdown, Ambulance or Crane Towing',
    problemTitleHi: 'हाइवे पर सड़क दुर्घटना, गाड़ी खराब होना, तत्काल एम्बुलेंस अथवा क्रेन सहायता',
    authorityEn: 'National Highways Authority of India (NHAI), Ministry of Road Transport',
    authorityHi: 'भारतीय राष्ट्रीय राजमार्ग प्राधिकरण (NHAI), सड़क परिवहन मंत्रालय',
    operatingHours: '24x7 All Days (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'critical',
    goldenHourTipEn: 'Dedicated NHAI patrol vehicle, crane, and advanced life support ambulance dispatch within 15-20 minutes on any National Highway.',
    goldenHourTipHi: 'किसी भी नेशनल हाईवे पर 15-20 मिनट के भीतर सरकारी पेट्रोलिंग वैन, क्रेन और एम्बुलेंस सहायता भेजी जाती है।',
    actionStepsEn: [
      'Dial 1033 and mention the Highway Number (e.g. NH-44, NH-48) and closest milestone/toll plaza.',
      'Turn on your vehicle hazard warning lights and place safety triangle on the road.',
      'Stay away from active traffic lanes behind the crash barrier.'
    ],
    actionStepsHi: [
      '1033 मिलाएं और नेशनल हाईवे नंबर व नजदीकी माइलस्टोन/टोल प्लाजा बताएं।',
      'गाड़ी के हजार्ड लैंप ऑन करें और सड़क पर सेफ्टी त्रिकोण रखें।',
      'सड़क के किनारे क्रैश बैरियर के पीछे खड़े होकर सहायता की प्रतीक्षा करें।'
    ],
    cautionEn: 'Never stand behind a stalled vehicle on high-speed expressways.',
    cautionHi: 'सावधानी: एक्सप्रेसवे पर रुकी हुई गाड़ी के पीछे कभी न खड़े हों।',
    portalUrl: 'https://nhai.gov.in',
    portalLabel: 'nhai.gov.in',
    secondaryNumbers: [
      { label: 'Medical Ambulance / एम्बुलेंस', number: '108' },
      { label: 'Police Emergency / पुलिस', number: '112' }
    ],
    keywords: [
      'highway', 'accident', 'nhai', 'road accident', 'car breakdown', 'towing crane', 'highway ambulance',
      'fastag dispute', 'expressway help', 'puncture on highway', 'gadi kharab ho gayi', '1033'
    ]
  },

  // 11. Senior Citizen Abuse & Elderline
  {
    id: 'prob-elderline',
    helplineNumber: '14567',
    badgeEn: 'ELDERLINE SENIOR CITIZEN HELPLINE',
    badgeHi: 'एल्डरलाइन वरिष्ठ नागरिक सहायता 14567',
    problemTitleEn: 'Elderly Abuse, Abandonment, Property Dispute or Senior Pension Issues',
    problemTitleHi: 'बुजुर्गों का उत्पीड़न, बेसहारा छोड़ना, संपत्ति से बेदखल करना अथवा पेंशन समस्या',
    authorityEn: 'Ministry of Social Justice and Empowerment (Govt of India)',
    authorityHi: 'सामाजिक न्याय एवं अधिकारिता मंत्रालय (भारत सरकार)',
    operatingHours: '8:00 AM to 8:00 PM All Days (Toll-Free)',
    is24x7: false,
    urgencyLevel: 'high',
    goldenHourTipEn: 'Free legal counseling, rescue of abandoned elders, old age home placement, and enforcement of Maintenance and Welfare of Parents Act.',
    goldenHourTipHi: 'माता-पिता एवं वरिष्ठ नागरिक भरण-पोषण कानून के तहत तुरंत कानूनी संरक्षण, शेल्टर होम और मेडिकल सहायता।',
    actionStepsEn: [
      'Dial 14567 to connect with a trained senior citizen case officer.',
      'Explain the harassment, illegal eviction or medical neglect.',
      'Elderline field officers visit the location for mediation or SDM legal intervention.'
    ],
    actionStepsHi: [
      '14567 मिलाएं और केस अधिकारी से समस्या साझा करें।',
      'घर से निकालने, संपत्ति विवाद या देखरेख न करने की शिकायत दर्ज कराएं।',
      'फील्ड अधिकारी खुद पहुंचकर समझाइश अथवा एसडीएम कोर्ट में याचिका दाखिल कराते हैं।'
    ],
    cautionEn: 'Under the 2007 Act, children who neglect senior parents can face legal eviction and cancellation of gift deeds.',
    cautionHi: 'सावधानी: 2007 के कानून के तहत बुजुर्ग माता-पिता को प्रताड़ित करने वाले बच्चों को संपत्ति से बेदखल किया जा सकता है।',
    portalUrl: 'https://elderline.dosje.gov.in',
    portalLabel: 'elderline.dosje.gov.in',
    secondaryNumbers: [
      { label: 'Free Legal Aid / मुफ्त कानूनी सहायता', number: '15100' },
      { label: 'Police Emergency / पुलिस सहायता', number: '112' }
    ],
    keywords: [
      'senior citizen', 'bujurg', 'dada dadi', 'elderly', 'elderline', '14567', 'ghar se nikal diya',
      'property dispute son', 'old age home', 'pension nahi aayi', 'bujurg harassment', 'parents maintenance'
    ]
  },

  // 12. College Anti-Ragging Helpline
  {
    id: 'prob-ragging',
    helplineNumber: '1800-180-5522',
    badgeEn: 'UGC NATIONAL ANTI-RAGGING HELPLINE',
    badgeHi: 'यूजीसी राष्ट्रीय एंटी-रैगिंग हेल्पलाइन',
    problemTitleEn: 'College / University Ragging, Senior Bullying or Hostel Harassment',
    problemTitleHi: 'कॉलेज या यूनिवर्सिटी में रैगिंग, सीनियर्स द्वारा उत्पीड़न अथवा हॉस्टल प्रताड़ना',
    authorityEn: 'University Grants Commission (UGC), Ministry of Education',
    authorityHi: 'विश्वविद्यालय अनुदान आयोग (UGC), शिक्षा मंत्रालय (भारत सरकार)',
    operatingHours: '24x7 All Days (Toll-Free & Zero-Leakage)',
    is24x7: true,
    urgencyLevel: 'critical',
    goldenHourTipEn: 'Strict zero-tolerance statutory cell: complaint goes directly to the College Principal, District Magistrate (DM) and SP within 1 hour.',
    goldenHourTipHi: 'जीरो टॉलरेंस सरकारी सेल: शिकायत दर्ज होते ही 1 घंटे के भीतर कॉलेज प्रिंसिपल, जिला मजिस्ट्रेट (DM) और एसपी को सीधी कार्रवाई का आदेश जाता है।',
    actionStepsEn: [
      'Call 1800-180-5522 immediately or email helpline@antiragging.in.',
      'You can keep your identity confidential if you fear retaliation.',
      'An FIR must be registered by the college within 24 hours under UGC regulations.'
    ],
    actionStepsHi: [
      'तुरंत 1800-180-5522 पर कॉल करें अथवा helpline@antiragging.in पर मेल करें।',
      'यदि पहचान उजागर करने में डर लगे, तो अपनी पहचान पूरी तरह गुप्त रख सकते हैं।',
      'यूजीसी नियमों के तहत कॉलेज प्रशासन को 24 घंटे में पुलिस एफआईआर दर्ज करानी अनिवार्य है।'
    ],
    cautionEn: 'Ragging is a non-bailable criminal offense in India. Perpetrators face immediate expulsion and police arrest.',
    cautionHi: 'सावधानी: रैगिंग गैर-जमानती अपराध है। रैगिंग करने वाले छात्र का कॉलेज से निष्कासन और पुलिस गिरफ्तारी तय है।',
    portalUrl: 'https://antiragging.in',
    portalLabel: 'antiragging.in',
    secondaryNumbers: [
      { label: 'Police Emergency / पुलिस', number: '112' },
      { label: 'Tele-MANAS Counseling', number: '14416' }
    ],
    keywords: [
      'ragging', 'senior harassment', 'college ragging', 'hostel harassment', 'senior maar rahe hain',
      'colg ragging', 'ugc ragging', 'ragging complaint', 'university bullying', 'hostel threat'
    ]
  },

  // 13. Free Legal Aid & Tele-Law (Police Refusing FIR, Court Cases)
  {
    id: 'prob-legal-aid',
    helplineNumber: '15100',
    badgeEn: 'TELE-LAW & FREE LEGAL AID (NALSA)',
    badgeHi: 'टेली-लॉ व मुफ्त कानूनी सहायता (न्याय विभाग)',
    problemTitleEn: 'Police Refusing FIR, Free Lawyer Needed, Land Dispute or Legal Rights',
    problemTitleHi: 'पुलिस एफआईआर दर्ज न करना, मुफ्त सरकारी वकील, भूमि विवाद अथवा कानूनी सहायता',
    authorityEn: 'Department of Justice & National Legal Services Authority (NALSA)',
    authorityHi: 'न्याय विभाग, कानून एवं न्याय मंत्रालय व नालसा (भारत सरकार)',
    operatingHours: '24x7 All Days (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'high',
    goldenHourTipEn: 'Free legal advice from High Court and District Legal Services panel advocates for all women, SC/ST, farmers, and citizens earning under ₹3 Lakhs.',
    goldenHourTipHi: 'महिलाओं, किसानों, एससी/एसटी और कम आय वर्ग के नागरिकों को हाई कोर्ट पैनल के वकीलों द्वारा 100% मुफ्त कानूनी सलाह व कोर्ट केस लड़ने हेतु वकील।',
    actionStepsEn: [
      'Dial 15100 and request advice on how to file a private criminal complaint if police refuse FIR.',
      'Get free government lawyer assigned through your District Legal Services Authority (DLSA).',
      'Access tele-law.in for video consultation with high court advocates.'
    ],
    actionStepsHi: [
      '15100 मिलाएं और एफआईआर दर्ज न होने पर मजिस्ट्रेट के सामने शिकायत करने की सलाह लें।',
      'जिला विधिक सेवा प्राधिकरण (DLSA) से निःशुल्क सरकारी वकील प्राप्त करें।',
      'tele-law.in पर हाई कोर्ट के वकीलों से मुफ्त वीडियो कंसल्टेशन भी ले सकते हैं।'
    ],
    cautionEn: 'Under Section 154 CrPC, police officers who refuse to register an FIR for cognizable offenses face criminal action under IPC 166A.',
    cautionHi: 'सावधानी: गंभीर अपराधों में पुलिस द्वारा एफआईआर न लिखना कानूनन जुर्म है (आईपीसी धारा 166A)।',
    portalUrl: 'https://tele-law.in',
    portalLabel: 'tele-law.in',
    secondaryNumbers: [
      { label: 'National Police Emergency', number: '112' },
      { label: 'National Consumer Helpline', number: '1915' }
    ],
    keywords: [
      'legal', 'vakeel', 'lawyer', 'free lawyer', 'muft vakeel', 'police fir nahi likh rahi',
      'fir refuse', 'court case', 'bail', 'zameen vivad', 'land dispute', 'property case',
      'nalsa', 'tele law', '15100', 'kanooni salah', 'legal aid'
    ]
  },

  // 14. Ayushman Bharat Free Healthcare & Hospital Denial
  {
    id: 'prob-ayushman',
    helplineNumber: '14555',
    badgeEn: 'AYUSHMAN BHARAT (PM-JAY) GRIEVANCE',
    badgeHi: 'आयुष्मान भारत 5 लाख मुफ्त इलाज शिकायत',
    problemTitleEn: 'Hospital Demanding Cash on Ayushman Card or Denying Free Treatment',
    problemTitleHi: 'आयुष्मान कार्ड होने पर भी अस्पताल द्वारा पैसे मांगना अथवा भर्ती से मना करना',
    authorityEn: 'National Health Authority (NHA), Ministry of Health',
    authorityHi: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA), स्वास्थ्य मंत्रालय (भारत सरकार)',
    operatingHours: '24x7 Pan-India (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'critical',
    goldenHourTipEn: 'Every empaneled hospital must provide 100% cashless treatment up to ₹5 Lakhs. Demanding cash is illegal and leads to hospital de-empanelment.',
    goldenHourTipHi: 'सूचीबद्ध अस्पताल में ₹5 लाख तक का इलाज 100% कैशलेस होना अनिवार्य है। पैसे मांगना गैर-कानूनी है।',
    actionStepsEn: [
      'Dial 14555 immediately while still at the hospital premises.',
      'Give the Hospital Name, City, and your Ayushman Card / ABHA ID Number.',
      'A District Grievance Nodal Officer will directly intervene with the hospital administration.'
    ],
    actionStepsHi: [
      'अस्पताल में मौजूद रहते हुए ही तुरंत 14555 पर कॉल करें।',
      'अस्पताल का नाम, शहर और अपना आयुष्मान कार्ड/ABHA नंबर बताएं।',
      'जिला नोडल अधिकारी सीधे अस्पताल प्रबंधन से बात कर तुरंत भर्ती सुनिश्चित कराएंगे।'
    ],
    cautionEn: 'Do not pay cash without obtaining a printed official hospital receipt if forced.',
    cautionHi: 'सावधानी: यदि मजबूरी में पैसे देने पड़ें, तो अस्पताल की मुहर लगी पक्की रसीद अवश्य लें।',
    portalUrl: 'https://pmjay.gov.in',
    portalLabel: 'pmjay.gov.in',
    secondaryNumbers: [
      { label: 'Alternate Toll-Free PMJAY', number: '1800-11-4477' },
      { label: 'Emergency Ambulance', number: '108' }
    ],
    keywords: [
      'ayushman', 'pmjay', 'ayushman card rejected', 'hospital paise maang raha hai', 'free hospital treatment',
      'golden card', '5 lakh ilaj', 'abha id', 'hospital admit nahi kar raha', 'cashless treatment dispute'
    ]
  },

  // 15. Farmers & Agriculture / Crop Loss / Mandi / Seeds
  {
    id: 'prob-farmer',
    helplineNumber: '1551',
    badgeEn: 'KISAN CALL CENTER (GOVT OF INDIA)',
    badgeHi: 'किसान कॉल सेंटर 1551 (कृषि मंत्रालय)',
    problemTitleEn: 'Crop Damage Compensation, Fake Seeds/Fertilizer, Mandi Price or KCC Loan',
    problemTitleHi: 'फसल नुकसान मुआवजा, नकली बीज/खाद, मंडी भाव अथवा किसान क्रेडिट कार्ड समस्या',
    authorityEn: 'Department of Agriculture & Farmers Welfare, Ministry of Agriculture',
    authorityHi: 'कृषि एवं किसान कल्याण विभाग, कृषि मंत्रालय (भारत सरकार)',
    operatingHours: '6:00 AM to 10:00 PM All Days (Toll-Free)',
    is24x7: false,
    urgencyLevel: 'high',
    goldenHourTipEn: 'Direct phone support from agriculture scientists in your local regional dialect for immediate crop disease diagnosis and subsidy claims.',
    goldenHourTipHi: 'अपनी स्थानीय बोली में कृषि वैज्ञानिकों से सीधा संपर्क: कीट-रोग निदान, फसल बीमा क्लेम व सब्सिडी सहायता।',
    actionStepsEn: [
      'Dial 1551 (or 1800-180-1551) from your mobile or landline.',
      'State your District, Crop name, and issue (pest attack, hail storm damage, PM Fasal Bima).',
      'For crop insurance claim, report damage within 72 hours of rain/flood to guarantee compensation.'
    ],
    actionStepsHi: [
      '1551 (या 1800-180-1551) पर कॉल करें।',
      'अपना जिला, फसल का नाम और समस्या (कीट, ओलावृष्टि नुकसान, फसल बीमा) बताएं।',
      'फसल बीमा क्लेम हेतु बारिश/ओले के 72 घंटे के भीतर नुकसान की सूचना देना अनिवार्य है।'
    ],
    cautionEn: 'Always preserve retail receipts of purchased fertilizer and seeds to claim refund on spurious supplies.',
    cautionHi: 'सावधानी: नकली खाद-बीज मिलने पर दुकान का पक्का बिल सुरक्षित रखें ताकि विक्रेता पर कानूनी कार्रवाई हो सके।',
    portalUrl: 'https://dharani.gov.in',
    portalLabel: 'agricoop.nic.in',
    secondaryNumbers: [
      { label: 'PM Kisan Samman Nidhi Helpline', number: '155261' },
      { label: 'PM Fasal Bima Yojana', number: '1800-180-1111' }
    ],
    keywords: [
      'kisan', 'farmer', 'fasal', 'crop damage', 'kisan credit card', 'kcc', 'pm kisan', 'fasal bima',
      'nakli beej', 'nakli fertilizer', 'mandi bhav', 'tiddi dal', 'insect attack', 'fasal nuksan', '1551'
    ]
  },

  // 16. EPFO / PF / Salary Not Paid / Employment Grievance
  {
    id: 'prob-epfo-salary',
    helplineNumber: '14442',
    badgeEn: 'EPFO & LABOR GRIEVANCE CELL',
    badgeHi: 'ईपीएफओ (PF) व श्रम मंत्रालय शिकायत',
    problemTitleEn: 'PF Withdrawal Stuck, Employer Not Depositing PF, or Salary Denied',
    problemTitleHi: 'पीएफ निकासी अटकना, कंपनी द्वारा पीएफ जमा न करना अथवा वेतन न मिलना',
    authorityEn: 'Employees\' Provident Fund Organisation (EPFO), Ministry of Labour',
    authorityHi: 'कर्मचारी भविष्य निधि संगठन (EPFO), श्रम एवं रोजगार मंत्रालय',
    operatingHours: '9:15 AM to 5:45 PM (Mon-Sat, Toll-Free)',
    is24x7: false,
    urgencyLevel: 'high',
    goldenHourTipEn: 'Direct statutory desk to resolve claim rejections, employer non-remittance, and UAN linking issues.',
    goldenHourTipHi: 'पीएफ क्लेम रिजेक्शन, कंपनी द्वारा पीएफ न काटने या जमा न करने की सीधी कानूनी जांच।',
    actionStepsEn: [
      'Dial 14442 or 1800-11-5885 with your 12-digit UAN (Universal Account Number) ready.',
      'File an online grievance on epfigms.gov.in to get an official tracking ticket.',
      'If salary is withheld, lodge a formal dispute under the Payment of Wages Act at samadhan.labour.gov.in.'
    ],
    actionStepsHi: [
      'अपना 12 अंकों का यूएएन (UAN) नंबर पास रखकर 14442 या 1800-11-5885 पर कॉल करें।',
      'epfigms.gov.in पर ऑनलाइन शिकायत दर्ज करें ताकि 15 दिन में समाधान मिले।',
      'कंपनी द्वारा वेतन रोकने पर samadhan.labour.gov.in पर श्रम आयुक्त के पास शिकायत दर्ज कराएं।'
    ],
    cautionEn: 'Never share your EPFO portal password or OTP with third-party PF withdrawal agents.',
    cautionHi: 'सावधानी: पीएफ निकलवाने के नाम पर किसी भी दलाल को अपना पासवर्ड या ओटीपी न दें।',
    portalUrl: 'https://epfigms.gov.in',
    portalLabel: 'epfigms.gov.in',
    secondaryNumbers: [
      { label: 'Alternate EPFO Toll-Free', number: '1800-11-5885' },
      { label: 'Free Legal Aid for Workers', number: '15100' }
    ],
    keywords: [
      'pf', 'epfo', 'uan', 'pf withdrawal', 'salary nahi mili', 'company ne salary roki', 
      'employer not paying pf', 'gratuity', 'pension epfo', 'pf claim reject', 'shramik helpline', '14442'
    ]
  },

  // 17. Stray Animal Emergency / Mobile Veterinary Ambulance
  {
    id: 'prob-animal-emergency',
    helplineNumber: '1962',
    badgeEn: '24x7 MOBILE VETERINARY AMBULANCE',
    badgeHi: 'पशु चिकित्सा आपातकाल (पशु एम्बुलेंस 1962)',
    problemTitleEn: 'Injured Stray Dog, Cow Accident, Rabies Alert or Animal Cruelty',
    problemTitleHi: 'सड़क पर घायल गाय/कुत्ता, पशु दुर्घटना, रेबीज अथवा पशु क्रूरता रिपोर्ट',
    authorityEn: 'Department of Animal Husbandry and Dairying (Govt of India)',
    authorityHi: 'पशुपालन एवं डेयरी विभाग, मत्स्यपालन व पशुपालन मंत्रालय (भारत सरकार)',
    operatingHours: '24x7 Pan-India (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'high',
    goldenHourTipEn: 'GPS-enabled Mobile Veterinary Units (MVU) equipped with animal ambulance, vet doctor, and life-saving injections dispatched to location.',
    goldenHourTipHi: 'सड़क पर घायल किसी भी बेजुबान पशु के लिए डॉक्टर और दवाइयों से लैस पशु एम्बुलेंस वैन तुरंत मौके पर पहुंचती है।',
    actionStepsEn: [
      'Dial 1962 and state the exact street address or landmark where the animal is located.',
      'State animal type (cow, dog, bull, horse) and nature of injury (hit by vehicle, deep wound).',
      'In case of intentional animal abuse, inform police at 112 under the Prevention of Cruelty to Animals Act.'
    ],
    actionStepsHi: [
      '1962 मिलाएं और घायल पशु का सटीक स्थान/सड़क का नाम बताएं।',
      'पशु का प्रकार (गाय, कुत्ता, नंदी आदि) और चोट की स्थिति बताएं।',
      'किसी व्यक्ति द्वारा जानबूझकर पशु को मारने पर 112 पर पुलिस शिकायत भी दर्ज कराएं।'
    ],
    cautionEn: 'Do not approach an aggressive or rabid animal without professional handlers.',
    cautionHi: 'सावधानी: आक्रामक या रेबीज पीड़ित पशु के पास खुद अकेले जाने से बचें।',
    portalUrl: 'https://dahd.nic.in',
    portalLabel: 'dahd.nic.in',
    secondaryNumbers: [
      { label: 'Police Emergency (For Animal Abuse)', number: '112' }
    ],
    keywords: [
      'animal', 'cow', 'dog', 'gaay', 'kutta', 'injured animal', 'animal accident', 'pashu ambulance',
      'rabies', 'animal cruelty', 'stray cow injured', 'veterinary help', '1962'
    ]
  },

  // 18. UIDAI Aadhaar Support & Linking Issues
  {
    id: 'prob-aadhaar',
    helplineNumber: '1947',
    badgeEn: 'UIDAI AADHAAR 24x7 HELPLINE',
    badgeHi: 'यूआईडीएआई आधार हेल्पलाइन 1947',
    problemTitleEn: 'Aadhaar Mobile Link Issue, Biometric Error or Document Update Delay',
    problemTitleHi: 'आधार में मोबाइल नंबर लिंक समस्या, बायोमेट्रिक त्रुटि अथवा आधार कार्ड न आना',
    authorityEn: 'Unique Identification Authority of India (UIDAI)',
    authorityHi: 'भारतीय विशिष्ट पहचान प्राधिकरण (UIDAI), इलेक्ट्रॉनिकी व आईटी मंत्रालय',
    operatingHours: '24x7 Interactive (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'standard',
    goldenHourTipEn: 'Official government helpline to track EID enrolment numbers, verify lock/unlock biometrics, and locate nearest authorized Aadhaar Seva Kendra.',
    goldenHourTipHi: 'आधार एनरोलमेंट स्टेटस, बायोमेट्रिक लॉक/अनलॉक और नजदीकी सरकारी आधार सेवा केंद्र की जानकारी हेतु 1947 मिलाएं।',
    actionStepsEn: [
      'Dial 1947 and keep your 28-digit Enrolment ID (EID) or 12-digit Aadhaar number ready.',
      'You can also check online status and download e-Aadhaar on myaadhaar.uidai.gov.in.',
      'To prevent SIM fraud, use the mAadhaar app to lock your biometrics.'
    ],
    actionStepsHi: [
      '1947 मिलाएं और अपनी 28 अंकों की एनरोलमेंट पर्ची (EID) या आधार नंबर पास रखें।',
      'myaadhaar.uidai.gov.in पर जाकर भी ई-आधार और स्टेटस चेक कर सकते हैं।',
      'आधार फ्रॉड से बचने हेतु mAadhaar ऐप से अपना बायोमेट्रिक लॉक रखें।'
    ],
    cautionEn: 'UIDAI never calls asking for OTP or fee payments over phone.',
    cautionHi: 'सावधानी: यूआईडीएआई कभी भी फोन करके आपसे ओटीपी या पैसे की मांग नहीं करता।',
    portalUrl: 'https://myaadhaar.uidai.gov.in',
    portalLabel: 'myaadhaar.uidai.gov.in',
    secondaryNumbers: [
      { label: 'Cyber Fraud Helpline', number: '1930' }
    ],
    keywords: [
      'aadhaar', 'aadhar', 'uidai', '1947', 'aadhaar mobile link', 'biometric locked', 'aadhar card update',
      'eaadhaar', 'enrolment slip lost', 'aadhaar photo change', 'name in aadhar wrong'
    ]
  },

  // 19. Blood Emergency & Organ Donation
  {
    id: 'prob-blood',
    helplineNumber: '104',
    badgeEn: 'NATIONAL BLOOD BANK & HEALTH SUPPORT',
    badgeHi: 'राष्ट्रीय ब्लड बैंक व स्वास्थ्य हेल्पलाइन 104',
    problemTitleEn: 'Urgent Blood Units, Rare Platelets Needed, or Poisoning Info',
    problemTitleHi: 'रक्त (ब्लड यूनिट्स) की आपातकालीन आवश्यकता, प्लेटलेट्स अथवा विषाक्तता सलाह',
    authorityEn: 'State Health Departments & National Health Mission (NHM)',
    authorityHi: 'राज्य स्वास्थ्य विभाग एवं राष्ट्रीय स्वास्थ्य मिशन (भारत सरकार)',
    operatingHours: '24x7 All Days (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'critical',
    goldenHourTipEn: 'Direct connection to centralized state blood banks, authorized donor networks, and real-time platelet availability.',
    goldenHourTipHi: 'नजदीकी अधिकृत सरकारी व रेड क्रॉस ब्लड बैंकों में रियल-टाइम रक्त और प्लेटलेट्स की उपलब्धता की जांच।',
    actionStepsEn: [
      'Dial 104 immediately and state patient blood group (e.g. O-, AB+, B-).',
      'Specify patient hospital name, city, and number of units required.',
      'Also visit the official national portal eraktkosh.in to view live inventory in nearby blood banks.'
    ],
    actionStepsHi: [
      'तुरंत 104 डायल करें और मरीज का ब्लड ग्रुप (A+, O-, AB आदि) बताएं।',
      'मरीज किस अस्पताल और शहर में भर्ती है और कितने यूनिट रक्त चाहिए, स्पष्ट करें।',
      'eraktkosh.in पर भी नजदीकी ब्लड बैंकों का लाइव स्टॉक तुरंत देख सकते हैं।'
    ],
    cautionEn: 'Never pay private touts or middlemen outside hospitals for blood. Government blood banks provide verified screened blood.',
    cautionHi: 'सावधानी: अस्पतालों के बाहर खून बेचने वाले दलालों से बचें। अधिकृत ब्लड बैंक से ही रक्त प्राप्त करें।',
    portalUrl: 'https://eraktkosh.in',
    portalLabel: 'eraktkosh.in',
    secondaryNumbers: [
      { label: 'Emergency Ambulance', number: '108' },
      { label: 'National Health Helpline', number: '1075' }
    ],
    keywords: [
      'blood', 'khoon chahiye', 'platelets', 'rare blood group', 'blood donor', 'blood bank',
      'eraktkosh', '104', 'blood emergency', 'o negative blood', 'plasma needed'
    ]
  },

  // 20. Election & Voter ID Card
  {
    id: 'prob-voter',
    helplineNumber: '1950',
    badgeEn: 'ELECTION COMMISSION VOTER HELPLINE',
    badgeHi: 'भारत निर्वाचन आयोग मतदाता हेल्पलाइन 1950',
    problemTitleEn: 'Voter ID Name Missing, Polling Booth Location or Election Complaint',
    problemTitleHi: 'वोटर लिस्ट में नाम न होना, वोटर आईडी कार्ड न आना अथवा मतदान केंद्र जानकारी',
    authorityEn: 'Election Commission of India (ECI)',
    authorityHi: 'भारत निर्वाचन आयोग (ECI)',
    operatingHours: '24x7 All Days (Toll-Free)',
    is24x7: true,
    urgencyLevel: 'standard',
    goldenHourTipEn: 'Free assistance for voter card status, Form 6 registration, and reporting election code violations.',
    goldenHourTipHi: 'वोटर लिस्ट में नाम जुड़वाने, सुधार करने अथवा मतदान केंद्र की जानकारी हेतु 1950 मिलाएं।',
    actionStepsEn: [
      'Dial 1950 with your STD code prefixed (e.g. 011-1950 for Delhi) to reach your District Election Officer.',
      'Check your EPIC number status on voters.eci.gov.in.',
      'Download the cVIGIL app to report election bribery or illegal campaigning.'
    ],
    actionStepsHi: [
      'अपने शहर के एसटीडी कोड के साथ 1950 डायल करें (जैसे 011-1950)।',
      'voters.eci.gov.in पर जाकर अपना वोटर कार्ड सर्च करें।',
      'चुनाव में पैसे बांटने या आचार संहिता उल्लंघन की गुप्त रिपोर्ट cVIGIL ऐप से करें।'
    ],
    cautionEn: 'Voter registration is 100% free through the government portal.',
    cautionHi: 'सावधानी: वोटर कार्ड बनवाना सरकारी पोर्टल पर पूरी तरह निःशुल्क है।',
    portalUrl: 'https://voters.eci.gov.in',
    portalLabel: 'voters.eci.gov.in',
    secondaryNumbers: [
      { label: 'National Emergency', number: '112' }
    ],
    keywords: [
      'voter', 'voter id', 'vote nahi de paya', 'voter list me naam nahi hai', 'election', '1950',
      'chunav', 'polling booth', 'epic card', 'form 6 voter'
    ]
  }
];

// Fallback Universal Resolver for any arbitrary unlisted query
export const UNIVERSAL_FALLBACK_HELPLINE: ProblemMatchResult = {
  id: 'prob-universal-fallback',
  helplineNumber: '112',
  badgeEn: 'STATUTORY CITIZEN ESCALATION DESK',
  badgeHi: 'राष्ट्रीय नागरिक सुरक्षा व आपातकालीन डेस्क',
  problemTitleEn: 'Official Statutory Guidance & Civil Protection',
  problemTitleHi: 'सत्यापित सरकारी सहायता व नागरिक समाधान',
  authorityEn: 'National Emergency Response Support System (ERSS), MHA (Govt of India)',
  authorityHi: 'आपातकालीन सहायता प्रणाली (ERSS), गृह मंत्रालय (भारत सरकार)',
  operatingHours: '24x7 All Days (Toll-Free)',
  is24x7: true,
  urgencyLevel: 'high',
  goldenHourTipEn: 'India\'s unified citizen emergency & civil grievance escalation center for immediate statutory intervention.',
  goldenHourTipHi: 'किसी भी अनसुलझी समस्या या नागरिक विवाद में तत्काल सरकारी हस्तक्षेप हेतु राष्ट्रीय हेल्पलाइन।',
  actionStepsEn: [
    'Dial 112 to connect with the government emergency and civil coordination desk.',
    'For legal disputes or free lawyer assistance, call National Legal Services at 15100.',
    'For consumer or service complaints, call National Consumer Helpline at 1915.'
  ],
  actionStepsHi: [
    'सरकारी आपातकालीन व नागरिक समन्वय डेस्क से जुड़ने के लिए 112 मिलाएं।',
    'मुफ्त सरकारी वकील या कानूनी समाधान के लिए 15100 (नालसा) पर संपर्क करें।',
    'दुकान, सामान अथवा ऑनलाइन सेवा में धोखाधड़ी हेतु 1915 (उपभोक्ता फोरम) पर संपर्क करें।'
  ],
  cautionEn: 'Keep all documentary proofs, photos, bills, and communications ready when registering your complaint.',
  cautionHi: 'सावधानी: शिकायत दर्ज कराते समय सभी जरूरी बिल, फोटो, दस्तावेज और बातचीत के प्रमाण सुरक्षित रखें।',
  portalUrl: 'https://112.gov.in',
  portalLabel: '112.gov.in',
  secondaryNumbers: [
    { label: 'Free Legal Aid / मुफ्त वकील', number: '15100' },
    { label: 'Consumer Disputes / उपभोक्ता फोरम', number: '1915' },
    { label: 'Cyber Crime / ऑनलाइन ठगी', number: '1930' }
  ]
};

export function matchCitizenProblem(query: string): ProblemMatchResult | null {
  const cleanQuery = (query || '').trim().toLowerCase();
  if (!cleanQuery) return null;

  // Split query into individual words and clean them
  const tokens = cleanQuery.replace(/[^\w\s\u0900-\u097F]/g, ' ').split(/\s+/).filter(Boolean);

  let bestMatch: ProblemDefinition | null = null;
  let highestScore = 0;

  for (const prob of COMPREHENSIVE_PROBLEMS) {
    let score = 0;

    // Check exact problem keywords
    for (const kw of prob.keywords) {
      const cleanKw = kw.toLowerCase();
      
      // 1. Exact phrase match
      if (cleanQuery.includes(cleanKw)) {
        score += 25 + cleanKw.length * 2;
      }

      // 2. Word token match
      const kwTokens = cleanKw.split(/\s+/);
      for (const t of tokens) {
        if (t.length >= 3 && kwTokens.includes(t)) {
          score += 10;
        }
      }
    }

    // Direct number match (e.g. user typed "1930" or "112")
    if (cleanQuery.includes(prob.helplineNumber.replace(/\D/g, ''))) {
      score += 50;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = prob;
    }
  }

  // If a clear match was found with score >= 10
  if (bestMatch && highestScore >= 10) {
    return {
      ...bestMatch,
      matchScore: highestScore
    };
  }

  // If query is longer than 3 characters but no specific keyword matched, 
  // provide intelligent contextual routing instead of a blank screen!
  if (cleanQuery.length >= 3) {
    // Check if financial
    if (/paisa|paise|rupaye|money|rupee|account|bank|cheated|dhokha|chori/.test(cleanQuery)) {
      const cyber = COMPREHENSIVE_PROBLEMS.find(p => p.id === 'prob-cyber-fraud');
      if (cyber) return { ...cyber, matchScore: 12 };
    }
    // Check if health
    if (/health|bimar|dard|hospital|doctor|pain|heart|attack|dawa|medicine/.test(cleanQuery)) {
      const blood = COMPREHENSIVE_PROBLEMS.find(p => p.id === 'prob-blood');
      if (blood) return { ...blood, matchScore: 12 };
    }
    // Check if woman
    if (/ladki|woman|mahila|wife|female|stree|sister/.test(cleanQuery)) {
      const women = COMPREHENSIVE_PROBLEMS.find(p => p.id === 'prob-women-safety');
      if (women) return { ...women, matchScore: 12 };
    }
    // Check if student
    if (/college|school|ragging|student|exam|teacher|paper/.test(cleanQuery)) {
      const ragging = COMPREHENSIVE_PROBLEMS.find(p => p.id === 'prob-ragging');
      if (ragging) return { ...ragging, matchScore: 12 };
    }

    // Return the universal fallback escalation card
    return {
      ...UNIVERSAL_FALLBACK_HELPLINE,
      matchScore: 5
    };
  }

  return null;
}
