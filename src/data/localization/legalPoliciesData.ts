import { SupportedLanguage } from '@/types';

export interface DisclaimerContent {
  backHome: string;
  badge: string;
  title: string;
  subtitle: string;
  coreDeclarationTitle: string;
  coreDeclarationText: string;
  sec1Title: string;
  sec1Intro: string;
  sources: { title: string; url: string }[];
  sec2Title: string;
  sec2Text: string;
  sec3Title: string;
  sec3Text: string;
  helplineTitle: string;
  helplineSub: string;
  helplineBtn: string;
  sec4Title?: string;
  sec4Text?: string;
  sec5Title?: string;
  sec5Text?: string;
}

export interface PrivacyContent {
  backHome: string;
  badge: string;
  title: string;
  subtitle: string;
  sec1Title: string;
  sec1Text: string;
  sec2Title: string;
  oauthTitle: string;
  oauthText: string;
  eligibilityTitle: string;
  eligibilityText: string;
  neverCollectTitle: string;
  neverCollectText: string;
  sec3Title: string;
  sec3Points: string[];
  sec4Title: string;
  sec4Text: string;
  sec5Title: string;
  sec5Text: string;
  sec6Title: string;
  sec6Text: string;
}

export interface TermsContent {
  backHome: string;
  badge: string;
  title: string;
  subtitle: string;
  sec1Title: string;
  sec1Text: string;
  sec2Title: string;
  sec2Text: string;
  sec2Note: string;
  sec3Title: string;
  sec3Points: string[];
  sec4Title: string;
  sec4Text: string;
  sec5Title: string;
  sec5Text: string;
}

export interface RefundContent {
  backHome: string;
  badge: string;
  title: string;
  subtitle: string;
  sec1Title: string;
  sec1Text: string;
  sec2Title: string;
  sec2Text1: string;
  sec2Text2: string;
  sec3Title: string;
  sec3Text: string;
  sec4Title: string;
  emailLabel: string;
  hoursLabel: string;
}

export interface ContactContent {
  backHome: string;
  badge: string;
  title: string;
  subtitle: string;
  emailCardTitle: string;
  emailCardDesc: string;
  phoneCardTitle: string;
  phoneCardDesc: string;
  hoursTitle: string;
  hoursDesc: string;
  officeTitle: string;
  officeDesc: string;
  grievanceTitle: string;
  grievanceDesc: string;
}

export const DISCLAIMER_LOCALES: Record<SupportedLanguage, DisclaimerContent> = {
  en: {
    backHome: 'Back to Home',
    badge: 'Official Government Compliance Advisory',
    title: 'Disclaimer & Civic Advisory',
    subtitle: 'Mandatory transparency declaration under Civic-Tech Information Technology standards.',
    coreDeclarationTitle: 'Important Declaration: Independent Non-Governmental Platform',
    coreDeclarationText: 'Citzos is an independent EdTech & career readiness technology portal and is NOT an official agency, ministry, department, or representative of any government entity. Our mission is to aggregate, organize, and simplify publicly available educational syllabus, competitive exam learning resources, and civic awareness programs directly from authentic official educational and institutional sources to empower students, learners, and citizens with direct links to learning portals without middlemen or cyber-cafe extortion.',
    sec1Title: 'Authentic Sources of Information',
    sec1Intro: 'All educational syllabus, competitive learning exams, and civic resources displayed on this platform are aggregated strictly from publicly accessible official institutional sources:',
    sources: [
      { title: 'The Gazette of India', url: 'egazette.gov.in' },
      { title: 'Press Information Bureau', url: 'pib.gov.in' },
      { title: 'National Portal of India & myScheme', url: 'india.gov.in / myscheme.gov.in' },
      { title: 'Official State & Ministry Portals', url: '.gov.in / .nic.in / .gov' },
    ],
    sec2Title: 'Application Advisory & Zero Middlemen',
    sec2Text: 'We never charge unauthorized consultation fees or broker charges for government scheme submissions. Citzos provides direct links to genuine portals so citizens can apply safely without middlemen or illegal cyber-café commissions.',
    sec3Title: 'Final Authority on Benefit Approvals',
    sec3Text: 'The final decision to select, approve, or disburse benefits for any government program, scholarship, or recruitment exam rests solely with the competent government department, selection board, or ministry. Our platform provides initial eligibility orientation based on your registered criteria.',
    helplineTitle: 'For any emergency or civic assistance:',
    helplineSub: 'Access our 24x7 verified national helpline directory.',
    sec4Title: 'Zero Direct Employment & Placement Guarantee',
    sec4Text: 'Citzos does NOT provide direct employment, jobs, or recruitment placement services, nor do we guarantee hiring or exam selection. Citzos functions exclusively as an eligibility-based informational discovery engine. Our objective is solely to aggregate and highlight verified public opportunities and career pathways tailored to your demographic eligibility that you may not have been aware of. Citizens apply directly on the respective official government and institutional portals.',
    sec5Title: 'Skill Learning & Certificate Non-Guarantee Advisory',
    sec5Text: 'Acquiring or studying any skill track or video module on Citzos does NOT guarantee the issuance of a completion certificate. Certificates are strictly subject to the independent policies, assessments, and criteria of third-party educational providers (such as Swayam, NPTEL, Skill India, etc.) if and when offered by them.',
    helplineBtn: 'View Helplines',
  },
  hi: {
    backHome: 'मुख्य पृष्ठ',
    badge: 'आधिकारिक सरकारी अनुपालन सूचना',
    title: 'अस्वीकरण एवं नागरिक सूचना',
    subtitle: 'नागरिक पारदर्शिता और भारतीय सूचना प्रौद्योगिकी अधिनियम के अंतर्गत अनिवार्य कानूनी अस्वीकरण।',
    coreDeclarationTitle: 'महत्वपूर्ण घोषणा: गैर-सरकारी स्वतंत्र मंच',
    coreDeclarationText: 'Citzos किसी भी सरकारी संस्था, मंत्रालय, विभाग या सार्वजनिक उपक्रम (PSU) का आधिकारिक अंग या प्रतिनिधि नहीं है। यह एक स्वतंत्र नागरिक-तकनीकी (Civic-Tech) सूचना मंच है, जिसका एकमात्र उद्देश्य आम नागरिकों, विद्यार्थियों, किसानों व युवाओं तक सार्वजनिक सरकारी अधिसूचनाओं को सरल और सीधे रूप में पहुंचाना है।',
    sec1Title: 'सूचना के प्रामाणिक स्रोत',
    sec1Intro: 'इस प्लेटफ़ॉर्म पर प्रदर्शित सभी योजनाओं, नौकरियों, परीक्षा तिथियों और लाभों का विवरण भारत सरकार एवं राज्य सरकारों के सार्वजनिक रूप से उपलब्ध आधिकारिक स्रोतों से संकलित किया जाता है:',
    sources: [
      { title: 'भारत का राजपत्र', url: 'egazette.gov.in' },
      { title: 'पत्र सूचना कार्यालय', url: 'pib.gov.in' },
      { title: 'राष्ट्रीय पोर्टल व myScheme', url: 'india.gov.in / myscheme.gov.in' },
      { title: 'आधिकारिक राज्य व मंत्रालय पोर्टल्स', url: '.gov.in / .nic.in' },
    ],
    sec2Title: 'आवेदन प्रक्रिया एवं दलालों से बचाव',
    sec2Text: 'हम कभी भी किसी योजना के आवेदन पत्र भरने, नौकरी दिलाने या सब्सिडी स्वीकृत कराने के एवज में कोई शुल्क नहीं मांगते। Citzos आपको केवल सही आधिकारिक वेबसाइट का सीधा लिंक प्रदान करता है ताकि आप बिना किसी बिचौलिए या साइबर कैफे दलाली के सीधे आवेदन कर सकें।',
    sec3Title: 'स्वीकृति व लाभ का अंतिम अधिकार',
    sec3Text: 'किसी भी सरकारी योजना, छात्रवृत्ति या परीक्षा में चयन, स्वीकृति या वित्तीय लाभ प्रदान करने का संपूर्ण एवं अंतिम अधिकार केवल संबंधित सरकारी विभाग, चयन बोर्ड या मंत्रालय के पास सुरक्षित रहता है। इस प्लेटफ़ॉर्म द्वारा की गई गणना केवल आपकी दी गई जानकारी पर आधारित प्राथमिक मार्गदर्शन है।',
    helplineTitle: 'किसी भी आपातकालीन या सरकारी सहायता के लिए:',
    helplineSub: 'हमारे 24x7 सत्यापित राष्ट्रीय हेल्पलाइन डायरेक्टरी का उपयोग करें।',
    sec4Title: 'शून्य प्रत्यक्ष रोजगार व प्लेसमेंट गारंटी अस्वीकरण',
    sec4Text: 'Citzos प्रत्यक्ष अथवा व्यक्तिगत रूप से कोई नौकरी, रोजगार या भर्ती प्रदान नहीं करता है और न ही किसी चयन या प्लेसमेंट की गारंटी लेता है। Citzos केवल एक सूचनात्मक अवसर खोज इंजन (Discovery Engine) है। हमारा कार्य केवल नागरिक की योग्यता व पात्रता के अनुसार उन प्रामाणिक अवसरों, योजनाओं व सूचनाओं को प्रदर्शित करना है, जिनके बारे में आपको पूर्व जानकारी नहीं थी। नागरिक संबंधित आधिकारिक सरकारी अथवा संस्थान के पोर्टल पर सीधे स्वयं आवेदन करते हैं।',
    sec5Title: 'कौशल सीखने व प्रमाणपत्र अनिवार्यता अस्वीकरण',
    sec5Text: 'Citzos पर प्रदर्शित किसी भी कौशल (Skill) या पाठ्यक्रम को सीखने पर प्रमाणपत्र (Certificate) मिलना अनिवार्य नहीं है। प्रमाणपत्र केवल उन्हीं कार्यक्रमों में प्रदान किया जाता है जहाँ आधिकारिक तृतीय-पक्ष संस्था (जैसे Swayam, NPTEL, Skill India आदि) इसे अपनी शर्तों व परीक्षाओं के आधार पर जारी करती है।',
    helplineBtn: 'हेल्पलाइन देखें',
  },
  es: {
    backHome: 'Volver al Inicio',
    badge: 'Aviso Oficial de Cumplimiento Cívico',
    title: 'Aviso Legal y Descargo de Responsabilidad',
    subtitle: 'Declaración obligatoria de transparencia conforme a las directrices cívicas independientes.',
    coreDeclarationTitle: 'Declaración Importante: Plataforma Cívica Independiente',
    coreDeclarationText: 'Citzos es un portal cívico-tecnológico independiente y NO es una agencia oficial, ministerio, departamento ni representante de ninguna entidad gubernamental. Nuestra misión es consolidar y facilitar el acceso a convocatorias públicas oficiales directamente desde fuentes gubernamentales verificadas.',
    sec1Title: 'Fuentes Oficiales de Información',
    sec1Intro: 'Todas las becas, convocatorias públicas y subsidios se obtienen exclusivamente de fuentes oficiales públicas:',
    sources: [
      { title: 'Boletín Oficial del Estado', url: 'Portal Oficial' },
      { title: 'Agencias Públicas de Información', url: 'Fuentes Verificadas' },
      { title: 'Portales Nacionales de Subvenciones', url: 'Servicios Ciudadanos' },
      { title: 'Portales Ministeriales y Regionales', url: '.gov / .gob' },
    ],
    sec2Title: 'Asesoramiento y Enlaces Directos',
    sec2Text: 'No cobramos tarifas de intermediación ni comisiones indebidas. Proporcionamos enlaces directos a las páginas web oficiales para que los ciudadanos presenten sus solicitudes de forma segura y sin intermediarios.',
    sec3Title: 'Autoridad Final de Concesión',
    sec3Text: 'La decisión final de conceder ayudas, becas o empleos corresponde exclusivamente a los órganos y ministerios competentes. Esta plataforma ofrece una guía orientativa inicial.',
    helplineTitle: 'Para asistencia o emergencias:',
    helplineSub: 'Consulte nuestro directorio de teléfonos de emergencia verificados 24x7.',
    helplineBtn: 'Ver Teléfonos',
  },
  fr: {
    backHome: 'Retour à l\'Accueil',
    badge: 'Avis Officiel de Conformité Civique',
    title: 'Avertissement Légal & Non-Affiliation',
    subtitle: 'Déclaration obligatoire de transparence relative aux services numériques civiques indépendants.',
    coreDeclarationTitle: 'Déclaration Importante : Plateforme Civique Indépendante',
    coreDeclarationText: 'Citzos est un portail civique indépendant et ne représente aucun ministère, organisme public ni entité gouvernementale. Notre objectif est de faciliter l\'accès aux bourses, concours et aides publiques par des liens directs vers les portaux administratifs officiels.',
    sec1Title: 'Sources Authentiques d\'Information',
    sec1Intro: 'Toutes les aides et opportunités proviennent de canaux officiels vérifiés :',
    sources: [
      { title: 'Journaux Officiels Administratifs', url: 'Publications d\'État' },
      { title: 'Services Publics d\'Information', url: 'Portails Vérifiés' },
      { title: 'Portails Nationaux des Bourses', url: 'Services aux Citoyens' },
      { title: 'Portails Ministériels Régionaux', url: '.gouv / .gov' },
    ],
    sec2Title: 'Accès Direct Sans Intermédiaires',
    sec2Text: 'Nous ne percevons aucun frais d\'intermédiation pour le dépôt de dossiers d\'aides publiques. Les démarches s\'effectuent directement sur les plateformes officielles.',
    sec3Title: 'Décision Finale des Autorités',
    sec3Text: 'L\'attribution de tout droit ou aide publique relève exclusivement de la compétence des ministères et comités officiels.',
    helplineTitle: 'Pour toute urgence ou assistance :',
    helplineSub: 'Consultez notre répertoire national des numéros d\'urgence 24h/24.',
    helplineBtn: 'Consulter l\'Assistance',
  },
  de: {
    backHome: 'Zurück zur Startseite',
    badge: 'Amtliche Bürger-Compliance-Mitteilung',
    title: 'Haftungsausschluss & Unabhängigkeitshinweis',
    subtitle: 'Gesetzlich vorgeschriebene Transparenzerklärung für bürgerorientierte Informationsportale.',
    coreDeclarationTitle: 'Wichtiger Hinweis: Unabhängige Nicht-Staatliche Plattform',
    coreDeclarationText: 'Citzos ist ein unabhängiges bürgertechnologisches Portal und vertritt KEINE staatliche Behörde, kein Ministerium und keine öffentliche Dienststelle. Unser Anliegen ist es, öffentliche Fördermittel, Stipendien und amtliche Bekanntmachungen transparent darzustellen.',
    sec1Title: 'Amtliche Informationsquellen',
    sec1Intro: 'Alle dargestellten Förderungen und Bekanntmachungen stammen aus öffentlich zugänglichen amtlichen Quellen:',
    sources: [
      { title: 'Amtliche Gesetzblätter & Register', url: 'Staatliche Bekanntmachungen' },
      { title: 'Offizielle Presse- und Bürgerportale', url: 'Verifizierte Quellen' },
      { title: 'Nationale Stipendien- und Förderportale', url: 'Bürgerdienste' },
      { title: 'Ministerielle Portale', url: '.gov / .bund / .de' },
    ],
    sec2Title: 'Direkte Antragstellung ohne Vermittler',
    sec2Text: 'Wir erheben keinerlei Vermittlungsgebühren. Anträge werden direkt auf den amtlichen Portalen der zuständigen Stellen eingereicht.',
    sec3Title: 'Zuständigkeit der Behörden',
    sec3Text: 'Die abschließende Bewilligung von Förderungen obliegt stets den zuständigen Behörden und Ministerien.',
    helplineTitle: 'Für Notfälle oder Auskünfte:',
    helplineSub: 'Nutzen Sie unser verifiziertes 24x7 Bürger-Hotline-Verzeichnis.',
    helplineBtn: 'Hotlines Öffnen',
  },
  ar: {
    backHome: 'العودة للرئيسية',
    badge: 'إشعار الامتثال المدني الرسمي',
    title: 'إخلاء المسؤولية والإقرار المدني',
    subtitle: 'إقرار الشفافية القانونية الملزم لخدمات المعلومات المدنية الرقمية المستقلة.',
    coreDeclarationTitle: 'إقرار هام: منصة مدنية مستقلة غير حكومية',
    coreDeclarationText: 'منصة Citzos بوابة تقنية مدنية مستقلة وليست جهة حكومية أو ممثلاً رسمياً لأي وزارة. هدفنا هو تسهيل وصول المواطنين والطلاب والباحثين عن عمل إلى الفرص الرسمية والمنح المعتمدة بروابط تقديم رسمية ومباشرة بدون وسطاء.',
    sec1Title: 'المصادر الرسمية المعتمدة للبيانات',
    sec1Intro: 'تُستخرج كافة الفرص والمنح والإعلانات من المصادر الحكومية المتاحة رسمياً للعامة:',
    sources: [
      { title: 'الجرائد الرسمية المعتمدة', url: 'المنشورات الحكومية' },
      { title: 'وكالات الأنباء الرسمية', url: 'المصادر المعتمدة' },
      { title: 'البوابات الوطنية للمنح والخدمات', url: 'بوابات المواطنين' },
      { title: 'بوابات الوزارات والهيئات', url: '.gov / .nic' },
    ],
    sec2Title: 'التقديم المباشر بدون وسطاء',
    sec2Text: 'لا نتقاضى أي رسوم أو عمولات وساطة للحصول على المنح أو الخدمات. نوفر روابط مباشرة للبوابات الرسمية.',
    sec3Title: 'القرار النهائي لجهات الاختصاص',
    sec3Text: 'قرار القبول والاعتماد النهائي في أي برنامج حكومي أو منحة يعود حصراً للوزارات والجهات المختصة.',
    helplineTitle: 'للحصول على مساعدة طارئة أو رسمية:',
    helplineSub: 'استخدم دليل أرقام الطوارئ والمساعدة الوطنية المعتمد على مدار الساعة.',
    helplineBtn: 'عرض الأرقام',
  },
};

export const PRIVACY_LOCALES: Record<SupportedLanguage, PrivacyContent> = {
  en: {
    backHome: 'Back to Home',
    badge: 'Data Privacy & Cybersecurity Compliant',
    title: 'Privacy Policy',
    subtitle: 'Last updated: 2026 • Citzos is 100% committed to your personal data privacy and cybersecurity.',
    sec1Title: 'Introduction & Purpose',
    sec1Text: 'Citzos is an independent civic-tech portal dedicated to providing citizens with accurate eligibility calculation for public welfare programs, scholarships, competitive exams, and civic services. This policy clarifies how your data is collected, processed, and safeguarded when you visit our website.',
    sec2Title: 'Information We Collect',
    oauthTitle: 'Account Sign-in (Google OAuth / Email):',
    oauthText: 'When you sign in, we only receive your display name, verified email address, and profile avatar. We never request, access, or store your Google account password.',
    eligibilityTitle: 'Citizen Demographic Data:',
    eligibilityText: 'Selected age, occupation, demographic category, and state/country - strictly used to filter eligible opportunities you genuinely qualify for.',
    neverCollectTitle: 'What We NEVER Collect:',
    neverCollectText: 'We NEVER collect or store raw 12-digit Aadhaar numbers, biometric data (fingerprint/iris), bank passwords, UPI PINs, or confidential financial credentials.',
    sec3Title: 'How We Use Information',
    sec3Points: [
      'To filter authentic civic schemes and exams tailored to exact age, category, and state/country.',
      'To generate your personal digital citizen card and subscription pass.',
      'To maintain your saved/starred forms and bookmarks securely across sessions.',
      'ZERO SPAM POLICY: We NEVER sell, rent, or trade citizen personal data to advertisers, loan brokers, telecallers, or third parties.',
    ],
    sec4Title: 'Data Security & Storage',
    sec4Text: 'We utilize modern security standards (HTTPS, TLS encryption, and secure JSON Web Tokens). User session credentials are kept in encrypted local storage and secured cloud databases adhering to global privacy best practices.',
    sec5Title: 'User Rights & Data Deletion',
    sec5Text: 'Every citizen possesses the complete Right to be Forgotten. You can clear your session cache, log out at any time, or request permanent deletion of your profile by emailing baliyana434@gmail.com.',
    sec6Title: 'Contact & Grievance Redressal',
    sec6Text: 'For any privacy concerns, inquiries, or grievance redressal, please contact our support desk or reference our 24x7 Helplines directory.',
  },
  hi: {
    backHome: 'मुख्य पृष्ठ',
    badge: 'Google OAuth 2.0 एवं डेटा गोपनीयता अनुपालन',
    title: 'गोपनीयता नीति',
    subtitle: 'अंतिम नवीनीकरण: 2026 • Citzos आपकी व्यक्तिगत जानकारी और डेटा सुरक्षा के प्रति 100% प्रतिबद्ध है।',
    sec1Title: 'परिचय एवं उद्देश्य',
    sec1Text: 'Citzos भारतीय नागरिकों को केंद्र व राज्य सरकारों द्वारा जारी योजनाओं, छात्रवृत्तियों, प्रतियोगी परीक्षाओं और सार्वजनिक अवसरों की सटीक गणना व जानकारी प्रदान करने वाला स्वतंत्र नागरिक-सुलभ मंच है। यह नीति स्पष्ट करती है कि जब आप हमारी वेबसाइट का उपयोग करते हैं, तो हम आपकी जानकारी को कैसे एकत्र, उपयोग और सुरक्षित रखते हैं।',
    sec2Title: 'हम क्या जानकारी एकत्र करते हैं',
    oauthTitle: 'Google साइन-इन डेटा (Google OAuth):',
    oauthText: 'जब आप Google द्वारा लॉगिन करते हैं, तो हम केवल आपका नाम (Display Name), सत्यापित ईमेल पता (Email), और प्रोफ़ाइल चित्र (Avatar) प्राप्त करते हैं। हम कभी भी आपके Google खाते का पासवर्ड नहीं मांगते और न ही एकत्र करते हैं।',
    eligibilityTitle: 'नागरिक पात्रता विवरण:',
    eligibilityText: 'पंजीकरण के समय आपके द्वारा चुना गया कार्यक्षेत्र (Role/Occupation), आयु (Age), सामाजिक वर्ग (Category), और राज्य (State)—ताकि आपको केवल वही योजनाएं दिखाई जाएं जिसके लिए आप वास्तविक रूप से पात्र हैं।',
    neverCollectTitle: 'हम क्या एकत्र नहीं करते:',
    neverCollectText: 'हम किसी भी प्रकार का बायोमेट्रिक डेटा (फिंगरप्रिंट/आइरिस), असंशोधित 12-अंकीय आधार कार्ड संख्या, बैंक खाता पासवर्ड, यूपीआई पिन या गोपनीय वित्तीय विवरण कभी एकत्र या संचित नहीं करते।',
    sec3Title: 'जानकारी का उपयोग',
    sec3Points: [
      'नागरिक की उम्र, वर्ग और कार्यक्षेत्र के अनुसार प्रामाणिक योजनाओं की पात्रता फ़िल्टर करने हेतु।',
      'नागरिक का व्यक्तिगत नागरिक डिजिटल पहचान पत्र प्रदर्शित करने हेतु।',
      'उपयोगकर्ता द्वारा पसंदीदा चिह्नित किए गए फॉर्म्स को सुरक्षित रखने हेतु।',
      'शून्य स्पैम नीति (Zero Spam / No Data Sale): हम उपयोगकर्ता का डेटा किसी भी विज्ञापनदाता, लोन प्रदाता, टेलीकॉलर या तीसरे पक्ष को न बेचते हैं और न ही साझा करते हैं।',
    ],
    sec4Title: 'डेटा सुरक्षा एवं भंडारण',
    sec4Text: 'हम आधुनिक सुरक्षा तकनीकों (HTTPS, SSL एनक्रिप्शन, और सुरक्षित टोकन प्रमाणीकरण) का उपयोग करते हैं। उपयोगकर्ता का स्थानीय सेशन ब्राउज़र के लोकल स्टोरेज एवं सुरक्षित क्लाउड डेटाबेस में उद्योग मानकों के अनुरूप संग्रहीत रहता है।',
    sec5Title: 'उपयोगकर्ता अधिकार व डेटा निष्कासन',
    sec5Text: 'प्रत्येक उपयोगकर्ता को अपने खाते को लॉग आउट करने, स्थानीय डेटा साफ़ करने, या अपने प्रोफ़ाइल विवरण को सर्वर से स्थायी रूप से हटाने (Right to be Forgotten) का पूर्ण अधिकार है।',
    sec6Title: 'संपर्क एवं शिकायत निवारण',
    sec6Text: 'इस गोपनीयता नीति या आपके डेटा के संबंध में किसी भी प्रश्न अथवा शिकायत हेतु आप मुख्य पोर्टल के माध्यम से या हमारे आधिकारिक हेल्पलाइन पृष्ठ पर संपर्क कर सकते हैं।',
  },
  es: {
    backHome: 'Volver al Inicio',
    badge: 'Cumplimiento de Privacidad y Ciberseguridad',
    title: 'Política de Privacidad',
    subtitle: 'Actualizado: 2026 • Citzos garantiza la máxima protección y privacidad de sus datos.',
    sec1Title: 'Introducción y Objeto',
    sec1Text: 'Citzos es un portal cívico independiente dedicado a orientar a los ciudadanos sobre convocatorias públicas y ayudas oficiales. Esta política describe cómo gestionamos y protegemos su información.',
    sec2Title: 'Información que Recopilamos',
    oauthTitle: 'Datos de Acceso (Google OAuth / Correo):',
    oauthText: 'Solo obtenemos su nombre público, correo electrónico verificado y avatar. Nunca solicitamos ni almacenamos su contraseña de Google.',
    eligibilityTitle: 'Datos de Idoneidad Cívica:',
    eligibilityText: 'Edad, ocupación, colectivo y región geográfica para filtrar únicamente las oportunidades para las que usted califica legalmente.',
    neverCollectTitle: 'Lo que NUNCA Recopilamos:',
    neverCollectText: 'Nunca recopilamos datos biométricos, documentos de identidad sin cifrar, claves bancarias ni contraseñas financieras.',
    sec3Title: 'Uso de la Información',
    sec3Points: [
      'Filtrar convocatorias y becas según sus criterios demográficos reales.',
      'Emitir su pase de acceso cívico digital.',
      'Guardar sus formularios favoritos y recordatorios de fechas límite.',
      'POLÍTICA CERO SPAM: No vendemos ni compartimos sus datos con agencias publicitarias ni terceros.',
    ],
    sec4Title: 'Seguridad y Almacenamiento',
    sec4Text: 'Aplicamos cifrado TLS/HTTPS y tokens seguros de autenticación para garantizar la integridad de sus sesiones.',
    sec5Title: 'Derechos del Usuario y Supresión',
    sec5Text: 'Usted tiene derecho a solicitar la eliminación completa de sus datos (Derecho al Olvido) en cualquier momento escribiendo a baliyana434@gmail.com.',
    sec6Title: 'Contacto y Reclamaciones',
    sec6Text: 'Para consultas de privacidad o sugerencias, comuníquese con nuestro centro de atención o consulte nuestras líneas telefónicas de asistencia.',
  },
  fr: {
    backHome: 'Retour à l\'Accueil',
    badge: 'Conformité Protection des Données & RGPD',
    title: 'Politique de Confidentialité',
    subtitle: 'Mise à jour : 2026 • Citzos s\'engage à protéger rigoureusement vos données personnelles.',
    sec1Title: 'Introduction et Portée',
    sec1Text: 'Citzos est un service numérique civique dédié à l\'orientation des citoyens vers les aides publiques et bourses d\'études. La présente politique détaille notre gestion éthique des données.',
    sec2Title: 'Données Recueillies',
    oauthTitle: 'Connexion (Google OAuth / E-mail) :',
    oauthText: 'Nous recueillons uniquement votre nom, e-mail vérifié et photo de profil. Nous ne stockons jamais votre mot de passe Google.',
    eligibilityTitle: 'Critères d\'Éligibilité Civique :',
    eligibilityText: 'Âge, statut, catégorie et région pour cibler précisément les aides administratives auxquelles vous avez droit.',
    neverCollectTitle: 'Données Non Collectées :',
    neverCollectText: 'Nous ne recueillons aucune donnée biométrique, aucun numéro d\'identité en clair ni aucune information bancaire sensible.',
    sec3Title: 'Utilisation des Données',
    sec3Points: [
      'Sélectionner les opportunités officielles conformes à votre profil.',
      'Générer votre pass citoyen numérique.',
      'Sauvegarder vos favoris et dates limites importantes.',
      'AUCUN SPAM : Nous ne vendons et ne cédons aucune donnée à des tiers commerciaux.',
    ],
    sec4Title: 'Sécurité et Hébergement',
    sec4Text: 'Nous utilisons des protocoles cryptographiques modernes (HTTPS, chiffrement TLS, jetons sécurisés) et des bases de données protégées.',
    sec5Title: 'Droit à l\'Oubli',
    sec5Text: 'Chaque citoyen dispose du droit d\'accès et de suppression complète de son compte en contactant baliyana434@gmail.com.',
    sec6Title: 'Contact et Réclamations',
    sec6Text: 'Pour toute demande relative à vos données, notre service d\'assistance est à votre écoute.',
  },
  de: {
    backHome: 'Zurück zur Startseite',
    badge: 'Datenschutz & IT-Sicherheitskonformität',
    title: 'Datenschutzerklärung',
    subtitle: 'Stand: 2026 • Citzos schützt Ihre personenbezogenen Daten vollumfänglich.',
    sec1Title: 'Einleitung und Zweck',
    sec1Text: 'Citzos ist ein bürgernahes Informationsportal zur Ermittlung von Fördermitteln und Stipendien. Diese Richtlinie erklärt den transparenten Umgang mit Ihren Daten.',
    sec2Title: 'Erfasste Daten',
    oauthTitle: 'Anmeldung (Google OAuth / E-Mail):',
    oauthText: 'Wir erfassen lediglich Namen, verifizierte E-Mail-Adresse und Profilbild. Passwörter werden zu keinem Zeitpunkt abgefragt oder gespeichert.',
    eligibilityTitle: 'Förderkriterien:',
    eligibilityText: 'Alter, Ausbildungsstand, Gruppe und Region zur präzisen Zuordnung berechtigter staatlicher Förderungen.',
    neverCollectTitle: 'Ausdrücklich Nicht Erfasst:',
    neverCollectText: 'Keine biometrischen Daten, keine unverschlüsselten Ausweisdaten und keine Bank-PINs oder Passwörter.',
    sec3Title: 'Nutzung der Daten',
    sec3Points: [
      'Filterung amtlicher Fördermöglichkeiten und Prüfungsfristen.',
      'Bereitstellung Ihres digitalen Bürgerpasses.',
      'Sichere Verwaltung gespeicherter Formulare.',
      'KEIN SPAM & KEIN DATENVERKAUF: Ihre Daten werden niemals an Werbepartner oder Dritte veräußert.',
    ],
    sec4Title: 'Datensicherheit',
    sec4Text: 'Verwendung zeitgemäßer Sicherheitsstandards (HTTPS, TLS-Verschlüsselung, sichere Token) nach höchsten IT-Sicherheitsmaßstäben.',
    sec5Title: 'Recht auf Löschung',
    sec5Text: 'Sie haben jederzeit das Recht auf vollständige Löschung Ihrer Daten (Recht auf Vergessenwerden) per E-Mail an baliyana434@gmail.com.',
    sec6Title: 'Kontakt und Beschwerden',
    sec6Text: 'Bei Fragen wenden Sie sich bitte an unseren Bürgerservice oder nutzen Sie unsere Telefon-Hotlines.',
  },
  ar: {
    backHome: 'العودة للرئيسية',
    badge: 'الامتثال لمعايير خصوصية البيانات والأمن الرقمي',
    title: 'سياسة الخصوصية',
    subtitle: 'تحديث: 2026 • تلتزم منصة Citzos بنسبة 100% بحماية بياناتك الشخصية.',
    sec1Title: 'المقدمة والغرض',
    sec1Text: 'توضح هذه السياسة كيفية جمع البيانات ومعالجتها لتزويد المواطنين بالمنح والفرص الرسمية المؤهلين لها فعلياً.',
    sec2Title: 'البيانات التي نجمعها',
    oauthTitle: 'تسجيل الدخول (Google OAuth / البريد):',
    oauthText: 'نستلم فقط الاسم المسجل والبريد الإلكتروني المعتمد والصورة الرمزية. لا نطلب أبداً كلمة مرور حسابك.',
    eligibilityTitle: 'بيانات الأهلية المدنية:',
    eligibilityText: 'العمر والمجال والموقع الجغرافي لعرض الفرص المناسبة بدقة.',
    neverCollectTitle: 'ما لا نجمعه نهائياً:',
    neverCollectText: 'لا نجمع أي بصمات بيومترية أو أرقام هوية غير مشفرة أو كلمات مرور مصرفية.',
    sec3Title: 'كيفية استخدام البيانات',
    sec3Points: [
      'تحديد الأهلية الدقيقة للمنح والوظائف الرسمية.',
      'إصدار بطاقة الهوية الرقمية للمواطن.',
      'حفظ النماذج المفضلة ومواعيد التقديم.',
      'منع الرسائل المزعجة نهائياً: لا نبيع أو نشارك أي بيانات مع أي جهات تسويقية.',
    ],
    sec4Title: 'أمن البيانات والتخزين',
    sec4Text: 'نستخدم أعلى معايير التشفير الرقمي الحديثة لحماية الجلسات وقواعد البيانات.',
    sec5Title: 'حقوق المستخدم وحذف البيانات',
    sec5Text: 'يحق لك طلب حذف بياناتك نهائياً في أي وقت عبر البريد: baliyana434@gmail.com.',
    sec6Title: 'التواصل والشكاوى',
    sec6Text: 'لأي استفسار بخصوص الخصوصية، يرجى التواصل مع مكتب المساعدة أو مراجعة دليل الخطوط الساخنة.',
  },
};

export const TERMS_LOCALES: Record<SupportedLanguage, TermsContent> = {
  en: {
    backHome: 'Back to Home',
    badge: 'User Agreement & Service Terms',
    title: 'Terms & Conditions',
    subtitle: 'Last updated: 2026 • Please read these terms carefully before accessing or registering on Citzos.',
    sec1Title: 'Acceptance of Terms',
    sec1Text: 'By accessing or registering on Citzos, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, please discontinue using the platform.',
    sec2Title: 'Nature of Service',
    sec2Text: 'Our platform operates as an independent EdTech & career readiness software portal, presenting organized educational study materials, competitive exam syllabus, and career skill learning tracks aggregated directly from official institutional publications and recognized educational boards.',
    sec2Note: 'We are strictly an educational technology, career skill readiness, and civic opportunity discovery software portal. We do NOT provide employment, recruitment, or placement guarantees, nor do we guarantee completion certificates for external skills. The nominal ₹1 annual subscription is exclusively towards digital software hosting, server maintenance, and eligibility search technology.',
    sec3Title: 'User Obligations & Integrity',
    sec3Points: [
      'Citizens are responsible for providing authentic demographic details (age, category, state) during profile setup.',
      'Running automated scraping bots, unauthorized crawlers, or malicious scripts against our servers is strictly prohibited.',
      'Impersonating other citizens or misusing Google credentials is a punishable legal offense.',
    ],
    sec4Title: 'Limitation of Liability',
    sec4Text: 'While we verify all notices against official gazettes, sudden deadline changes, exam postponements, or government server downtime remain beyond our control. Citizens are advised to verify notices on official portal links before final application.',
    sec5Title: 'Intellectual Property & Fair Reference',
    sec5Text: 'The Citzos interface, algorithms, and design are our intellectual property. Official departmental names, gazette citations, and portal emblems remain the property of their respective ministries, referenced solely for public civic guidance.',
  },
  hi: {
    backHome: 'मुख्य पृष्ठ',
    badge: 'उपयोगकर्ता अनुबंध एवं सेवा शर्तें',
    title: 'नियम एवं शर्तें',
    subtitle: 'अंतिम नवीनीकरण: 2026 • कृपया प्लेटफ़ॉर्म का उपयोग करने से पहले इन शर्तों को ध्यानपूर्वक पढ़ें।',
    sec1Title: 'नियमों की स्वीकृति',
    sec1Text: 'Citzos का उपयोग करके या इस पर पंजीकरण करके आप इन नियमों व शर्तों से पूर्णतः सहमत होते हैं। यदि आप इनमें से किसी भी शर्त से असहमत हैं, तो कृपया प्लेटफ़ॉर्म का उपयोग न करें।',
    sec2Title: 'सेवा की प्रकृति',
    sec2Text: 'हमारा प्लेटफ़ॉर्म एक स्वतंत्र एडटेक व करियर लर्निंग सॉफ़्टवेयर पोर्टल है, जो विद्यार्थियों व नागरिकों को प्रतियोगी परीक्षा पाठ्यक्रम, कौशल विकास मॉड्यूल और करियर अध्ययन सामग्री को संगठित रूप में प्रदान करता है।',
    sec2Note: 'हम कोई नौकरी प्रदाता, भर्ती एजेंसी या प्लेसमेंट फर्म नहीं हैं। हम प्रत्यक्ष रूप से कोई जॉब प्रदान नहीं करते और न ही किसी चयन या नौकरी की गारंटी लेते हैं; हम केवल आपकी पात्रता के अनुसार उन अवसरों को एकत्रित करके दिखाते हैं जिनकी सामान्यतः जानकारी नहीं होती। इसके अतिरिक्त, किसी भी स्किल को सीखने पर प्रमाणपत्र मिलना अनिवार्य नहीं है। ₹1 का वार्षिक शुल्क केवल डिजिटल सॉफ़्टवेयर सर्वर रख-रखाव एवं तकनीकी सेवा हेतु है।',
    sec3Title: 'सत्य विवरण एवं आचरण',
    sec3Points: [
      'उपयोगकर्ता पंजीकरण करते समय सत्य एवं प्रामाणिक विवरण (जैसे वास्तविक आयु, वर्ग, राज्य) दर्ज करने के लिए उत्तरदायी है।',
      'प्लेटफ़ॉर्म पर किसी भी प्रकार के बॉट, स्वचालित डेटा स्क्रैपर, या दुर्भावनापूर्ण कोड चलाने का प्रयास पूर्णतः प्रतिबंधित है।',
      'किसी अन्य व्यक्ति के पहचान पत्र या Google खाते का दुरुपयोग करना कानूनन दंडनीय है।',
    ],
    sec4Title: 'दायित्व की सीमा',
    sec4Text: 'यद्यपि हम सभी अवसरों, अंतिम तिथियों और पात्रता मानदंडों को आधिकारिक राजपत्रों व सरकारी पोर्टलों से सत्यापित करके ही प्रकाशित करते हैं, फिर भी किसी भी सरकारी विभाग द्वारा अंतिम तिथि में किए गए तात्कालिक फेरबदल, परीक्षा रद्द होने, या सरकारी सर्वर डाउन होने की स्थिति में Citzos उत्तरदायी नहीं होगा।',
    sec5Title: 'बौद्धिक संपदा एवं ट्रेडमार्क',
    sec5Text: 'Citzos का इंटरफेस, एल्गोरिदम और डिज़ाइन हमारी बौद्धिक संपदा है। सभी संबंधित सरकारी नाम, प्रतीक, राजपत्र संदर्भ और आधिकारिक पोर्टल लोगो उनके संबंधित मंत्रालयों एवं सरकारी विभागों की संपत्ति हैं, जिनका उपयोग केवल नागरिकों के मार्गदर्शन व सूचना संदर्भ हेतु किया गया है।',
  },
  es: {
    backHome: 'Volver al Inicio',
    badge: 'Términos y Condiciones del Servicio',
    title: 'Términos y Condiciones',
    subtitle: 'Actualizado: 2026 • Por favor lea detenidamente estos términos antes de utilizar Citzos.',
    sec1Title: 'Aceptación de los Términos',
    sec1Text: 'Al acceder o registrarse en Citzos, usted acepta plenamente estos Términos y Condiciones de uso.',
    sec2Title: 'Naturaleza del Servicio',
    sec2Text: 'Citzos es un facilitador cívico digital que recopila y organiza convocatorias públicas de fuentes oficiales para beneficio de la ciudadanía.',
    sec2Note: 'No cobramos honorarios de intermediación por ayudas oficiales. Las solicitudes se tramitan directamente en las sedes electrónicas competentes.',
    sec3Title: 'Obligaciones del Usuario',
    sec3Points: [
      'Facilitar información verídica sobre edad, estudios y provincia durante el registro.',
      'Queda terminantemente prohibido el uso de bots o extracción masiva no autorizada de datos.',
      'La suplantación de identidad o uso indebido de cuentas ajenas conlleva responsabilidades legales.',
    ],
    sec4Title: 'Limitación de Responsabilidad',
    sec4Text: 'Aunque verificamos la información con los boletines oficiales, las modificaciones de plazos decididas por la administración escapan a nuestro control.',
    sec5Title: 'Propiedad Intelectual',
    sec5Text: 'El diseño y software de Citzos pertenecen a sus creadores. Los nombres y marcas de organismos públicos son propiedad de sus titulares.',
  },
  fr: {
    backHome: 'Retour à l\'Accueil',
    badge: 'Conditions Générales d\'Utilisation',
    title: 'Conditions d\'Utilisation',
    subtitle: 'Mise à jour : 2026 • Veuillez lire attentivement les présentes conditions avant d\'utiliser le service.',
    sec1Title: 'Acceptation des Conditions',
    sec1Text: 'L\'accès et l\'utilisation de Citzos impliquent l\'acceptation sans réserve des présentes conditions générales.',
    sec2Title: 'Nature du Service',
    sec2Text: 'La plateforme regroupe et indexe les publications officielles pour faciliter les démarches des citoyens.',
    sec2Note: 'Aucun frais de dossier ni intermédiaire n\'est appliqué. Les démarches officielles se font sur les portails publics de l\'État.',
    sec3Title: 'Obligations de l\'Utilisateur',
    sec3Points: [
      'Fournir des renseignements véridiques lors de l\'enregistrement de son profil.',
      'L\'utilisation de robots d\'extraction automatisée est formellement prohibée.',
      'Toute usurpation d\'identité est passible de sanctions conformément à la loi.',
    ],
    sec4Title: 'Limitation de Responsabilité',
    sec4Text: 'Nous ne saurions être tenus responsables d\'éventuels reports de délais ou interruptions de services des serveurs ministériels.',
    sec5Title: 'Propriété Intellectuelle',
    sec5Text: 'L\'interface et les algorithmes sont la propriété exclusive de Citzos. Les emblèmes officiels sont cités à titre documentaire.',
  },
  de: {
    backHome: 'Zurück zur Startseite',
    badge: 'Nutzungsbedingungen & Bürgervereinbarung',
    title: 'Nutzungsbedingungen',
    subtitle: 'Stand: 2026 • Bitte lesen Sie diese Bestimmungen vor der Nutzung von Citzos aufmerksam durch.',
    sec1Title: 'Zustimmung zu den Bedingungen',
    sec1Text: 'Mit der Registrierung auf Citzos erklären Sie sich mit den nachfolgenden Nutzungsbedingungen einverstanden.',
    sec2Title: 'Art der Dienstleistung',
    sec2Text: 'Citzos bündelt öffentlich zugängliche amtliche Bekanntmachungen und Fördermittel für Bürger.',
    sec2Note: 'Es werden keine unberechtigten Antrags- oder Vermittlungsgebühren erhoben. Anträge erfolgen direkt bei den zuständigen Behörden.',
    sec3Title: 'Pflichten des Nutzers',
    sec3Points: [
      'Verpflichtung zur Angabe wahrheitsgemäßer Stammdaten bei der Profilerstellung.',
      'Die Nutzung automatisierter Scraper oder Bots ist untersagt.',
      'Identitätsmissbrauch ist gesetzlich strafbar.',
    ],
    sec4Title: 'Haftungsbeschränkung',
    sec4Text: 'Kurzfristige Friständerungen oder Serverausfälle staatlicher Stellen liegen außerhalb unseres Einflussbereichs.',
    sec5Title: 'Urheberrecht und Marken',
    sec5Text: 'Plattformsoftware und Design unterliegen unserem Urheberrecht. Amtliche Bezeichnungen verbleiben Eigentum der jeweiligen Behörden.',
  },
  ar: {
    backHome: 'العودة للرئيسية',
    badge: 'شروط الخدمة والاتفاقية المدنية',
    title: 'الشروط والأحكام',
    subtitle: 'تحديث: 2026 • يرجى قراءة هذه الشروط بعناية قبل استخدام منصة Citzos.',
    sec1Title: 'الموافقة على الشروط',
    sec1Text: 'باستخدامك للمنصة أو التسجيل فيها، فإنك تقر بموافقتك الكاملة على هذه الشروط والأحكام.',
    sec2Title: 'طبيعة الخدمة',
    sec2Text: 'تعمل المنصة كدليل تقني مدني لتنظيم الإعلانات الحكومية الرسمية والمنح المعتمدة وتسهيل الوصول إليها.',
    sec2Note: 'لا نتقاضى أي رسوم وساطة أو مبالغ غير معتمدة. التقديم يتم مباشرة عبر المواقع الرسمية.',
    sec3Title: 'التزامات المستخدم',
    sec3Points: [
      'الالتزام بإدخال بيانات دقيقة وصحيحة عند إنشاء الحساب.',
      'يُحظر استخدام أي برمجيات كشط آلية أو اختراق لخوادم المنصة.',
      'انتحال شخصية الآخرين يُعد مخالفة قانونية صريحة.',
    ],
    sec4Title: 'حدود المسؤولية',
    sec4Text: 'لا تتحمل المنصة مسؤولية أي تعديل طارئ في مواعيد التقديم من قبل الجهات الحكومية أو أعطال خوادمها.',
    sec5Title: 'الملكية الفكرية',
    sec5Text: 'كافة برمجيات المنصة وتصاميمها محمية بحقوق الملكية الفكرية، وتعود الأسماء والشعارات الرسمية لمالكيها.',
  },
};

export const REFUND_LOCALES: Record<SupportedLanguage, RefundContent> = {
  en: {
    backHome: 'Back to Home',
    badge: 'Official Billing & Refund Policy',
    title: 'Refund & Cancellation Policy',
    subtitle: 'Last updated: 2026 • Citzos 1-Year National Citizen Access Pass',
    sec1Title: 'Digital Service Delivery',
    sec1Text: 'The 1-Year National Citizen Access Pass (₹1 / Year) is an instant digital entitlement service. Activation occurs immediately upon payment verification; no physical goods shipping or delivery is involved.',
    sec2Title: '100% Refund Guarantee',
    sec2Text1: 'If technical failure results in bank deduction without pass activation, or in case of duplicate billing, a 100% full refund is automatically issued to the original bank/UPI account within 5 to 7 business days.',
    sec2Text2: 'If unsatisfied for any genuine reason within 7 days of pass activation, citizens may contact baliyana434@gmail.com with their transaction ID / Order ID to request a full refund.',
    sec3Title: 'Cancellation & No Hidden Auto-Debits',
    sec3Text: 'Our platform has ZERO recurring auto-debits. The pass automatically expires after 365 days unless you manually choose to renew. You can request cancellation at any time by contacting our support desk.',
    sec4Title: 'Refund Support & Customer Care',
    emailLabel: 'Email: baliyana434@gmail.com',
    hoursLabel: 'Hours: Monday to Saturday, 9:00 AM - 6:00 PM IST',
  },
  hi: {
    backHome: 'मुख्य पृष्ठ',
    badge: 'आधिकारिक बिलिंग एवं रिफंड नीति',
    title: 'रिफंड एवं रद्दीकरण नीति',
    subtitle: 'अंतिम नवीनीकरण: 2026 • Citzos 1-Year National Citizen Access Pass',
    sec1Title: 'डिजिटल सेवा एवं सदस्यता',
    sec1Text: 'Citzos पर 1-वर्षीय नागरिक सदस्यता (1-Year National Citizen Access Pass ₹1) एक डिजिटल सेवा है। सफल भुगतान के तुरंत बाद सदस्यता स्वतः आपके खाते में सक्रिय हो जाती है। इसके लिए किसी भौतिक वस्तु की डिलीवरी की आवश्यकता नहीं होती है।',
    sec2Title: 'रिफंड नीति एवं गारंटी',
    sec2Text1: 'यदि किसी तकनीकी त्रुटि के कारण आपके बैंक खाते से राशि कट गई हो किंतु सदस्यता सक्रिय न हुई हो, अथवा दोहरे भुगतान की स्थिति में, पूरा भुगतान (100% Amount) बिना किसी कटौती के आपके मूल बैंक खाते में 5 से 7 कार्य दिवसों के भीतर स्वतः वापस कर दिया जाएगा।',
    sec2Text2: 'यदि नागरिक किसी भी कारणवश सदस्यता से असंतुष्ट हैं, तो वे खरीद के 7 दिनों के भीतर हमारे सहायता केंद्र (baliyana434@gmail.com) पर अपने लेनदेन विवरण (Transaction ID / Order ID) के साथ संपर्क करके रिफंड का अनुरोध कर सकते हैं।',
    sec3Title: 'रद्दीकरण प्रक्रिया एवं शून्य स्वतः कटौती',
    sec3Text: 'हमारी सदस्यता में कोई स्वतः-नवीनीकरण (auto-debit / recurring charge) नहीं होता है। 365 दिनों की अवधि पूर्ण होने के पश्चात सदस्यता स्वतः समाप्त हो जाती है।',
    sec4Title: 'रिफंड सहायता केंद्र',
    emailLabel: 'ईमेल: baliyana434@gmail.com',
    hoursLabel: 'कार्य समय: सोमवार से शनिवार, 9:00 AM - 6:00 PM IST',
  },
  es: {
    backHome: 'Volver al Inicio',
    badge: 'Política Oficial de Reembolso',
    title: 'Política de Reembolso y Cancelación',
    subtitle: 'Actualizado: 2026 • Pase de Acceso Cívico Anual Citzos',
    sec1Title: 'Entrega de Servicios Digitales',
    sec1Text: 'El Pase de Acceso Cívico es un servicio de activación digital inmediata tras la confirmación del pago, sin envío físico.',
    sec2Title: 'Garantía de Reembolso del 100%',
    sec2Text1: 'En caso de cobro duplicado o incidencia técnica que impida la activación, se reintegrará el 100% del importe en un plazo de 5 a 7 días hábiles.',
    sec2Text2: 'Si no está satisfecho durante los primeros 7 días, puede solicitar el reembolso escribiendo a baliyana434@gmail.com con su número de pedido.',
    sec3Title: 'Cancelación sin Cobros Recurrentes',
    sec3Text: 'No aplicamos cobros automáticos periódicos. La membresía caduca automáticamente al cabo de 365 días.',
    sec4Title: 'Atención al Cliente y Reembolsos',
    emailLabel: 'Correo: baliyana434@gmail.com',
    hoursLabel: 'Horario: Lunes a Sábado, 9:00 - 18:00 IST',
  },
  fr: {
    backHome: 'Retour à l\'Accueil',
    badge: 'Politique Officielle de Remboursement',
    title: 'Politique de Remboursement & Résiliation',
    subtitle: 'Mise à jour : 2026 • Pass Citoyen National Annuel Citzos',
    sec1Title: 'Prestation Numérique Immédiate',
    sec1Text: 'Le Pass Citoyen est un service numérique activé instantanément dès la validation du paiement.',
    sec2Title: 'Garantie de Remboursement Intégral',
    sec2Text1: 'En cas de double prélèvement ou d\'anomalie technique, le remboursement à 100% intervient sous 5 à 7 jours ouvrés.',
    sec2Text2: 'Vous pouvez solliciter un remboursement dans un délai de 7 jours sur simple e-mail à baliyana434@gmail.com.',
    sec3Title: 'Résiliation et Absence de Débit Automatique',
    sec3Text: 'Aucun prélèvement automatique récurrent n\'est configuré. L\'accès prend fin après 365 jours sans frais cachés.',
    sec4Title: 'Service Client et Assistance',
    emailLabel: 'E-mail : baliyana434@gmail.com',
    hoursLabel: 'Horaires : Du lundi au samedi, 9h00 - 18h00 IST',
  },
  de: {
    backHome: 'Zurück zur Startseite',
    badge: 'Offizielle Erstattungsrichtlinie',
    title: 'Erstattungs- und Kündigungsrichtlinie',
    subtitle: 'Stand: 2026 • Citzos Jahres-Bürgerpass',
    sec1Title: 'Digitale Leistungsbereitstellung',
    sec1Text: 'Der Jahres-Bürgerpass wird unmittelbar nach erfolgreicher Transaktion digital freigeschaltet.',
    sec2Title: '100% Erstattungsgarantie',
    sec2Text1: 'Bei Doppelbuchungen oder technischen Fehlern erfolgt die vollständige Rückerstattung innerhalb von 5 bis 7 Werktagen.',
    sec2Text2: 'Binnen 7 Tagen nach Buchung können Sie bei Unzufriedenheit eine Erstattung über baliyana434@gmail.com beantragen.',
    sec3Title: 'Keine Automatischen Verlängerungen',
    sec3Text: 'Es existieren keine versteckten Abonnements. Der Pass läuft nach 365 Tagen automatisch aus.',
    sec4Title: 'Kundenservice und Support',
    emailLabel: 'E-Mail: baliyana434@gmail.com',
    hoursLabel: 'Geschäftszeiten: Mo–Sa, 9:00 – 18:00 Uhr IST',
  },
  ar: {
    backHome: 'العودة للرئيسية',
    badge: 'سياسة الاسترداد والإلغاء الرسمية',
    title: 'سياسة الاسترداد وإلغاء الاشتراك',
    subtitle: 'تحديث: 2026 • بطاقة اشتراك المواطن السنوية Citzos',
    sec1Title: 'تقديم الخدمة الرقمية الفورية',
    sec1Text: 'تُفعل بطاقة الاشتراك الرقمية مباشرة وبشكل فوري بمجرد إتمام السداد دون الحاجة لشحن مادي.',
    sec2Title: 'ضمان الاسترداد الكامل 100%',
    sec2Text1: 'في حال الخصم دون تفعيل أو الدفع المزدوج بالخطأ، يُسترد المبلغ كاملاً تلقائياً خلال 5 إلى 7 أيام عمل.',
    sec2Text2: 'يحق للمواطن طلب استرداد المبلغ خلال 7 أيام من الشراء عبر البريد: baliyana434@gmail.com.',
    sec3Title: 'لا توجد خصومات تلقائية متكررة',
    sec3Text: 'لا تتجدد العضوية تلقائياً؛ حيث تنتهي بعد 365 يوماً دون أي التزامات مالية خفية.',
    sec4Title: 'الدعم والمساعدة المالية',
    emailLabel: 'البريد: baliyana434@gmail.com',
    hoursLabel: 'ساعات العمل: من الإثنين إلى السبت، 9:00 ص - 6:00 م بتوقيت الهند',
  },
};

export const CONTACT_LOCALES: Record<SupportedLanguage, ContactContent> = {
  en: {
    backHome: 'Back to Home',
    badge: 'Citizen Helpdesk & Grievance',
    title: 'Contact & Citizen Support Desk',
    subtitle: 'Reach out to our dedicated support team for citizen assistance, technical guidance, or pass inquiries.',
    emailCardTitle: 'Email Support',
    emailCardDesc: 'For citizen inquiries, pass verification, and technical assistance:',
    phoneCardTitle: 'Helpline Desk',
    phoneCardDesc: 'Direct civic telephonic support during business hours:',
    hoursTitle: 'Operating Hours',
    hoursDesc: 'Monday to Saturday: 9:30 AM to 6:30 PM (IST). Email support is monitored on Sundays and national holidays.',
    officeTitle: 'Registered Office',
    officeDesc: 'Citzos Civic-Tech Platform, Haryana, India',
    grievanceTitle: 'Grievance Redressal Officer',
    grievanceDesc: 'Designated per Information Technology (Intermediary Guidelines) Rules: baliyana434@gmail.com (24-hour acknowledgment SLA).',
  },
  hi: {
    backHome: 'मुख्य पृष्ठ',
    badge: 'नागरिक सहायता एवं शिकायत निवारण',
    title: 'संपर्क एवं सहायता केंद्र',
    subtitle: 'नागरिक सहायता, तकनीकी समस्या या भुगतान संबंधी प्रश्नों हेतु हमारी समर्पित सहायता टीम से संपर्क करें।',
    emailCardTitle: 'ईमेल सहायता',
    emailCardDesc: 'सामान्य पूछताछ, सदस्यता व तकनीकी सहायता हेतु:',
    phoneCardTitle: 'हेल्पलाइन डेस्क',
    phoneCardDesc: 'कार्य दिवसों में प्रत्यक्ष नागरिक सहायता उपलब्ध:',
    hoursTitle: 'कार्यकारी समय',
    hoursDesc: 'सोमवार से शनिवार: प्रातः 9:30 बजे से सायं 6:30 बजे तक (IST)। रविवार एवं राष्ट्रीय अवकाश के दिन ईमेल सपोर्ट सक्रिय रहता है।',
    officeTitle: 'पंजीकृत कार्यालय',
    officeDesc: 'Citzos Civic-Tech Platform, Haryana, India',
    grievanceTitle: 'शिकायत निवारण अधिकारी',
    grievanceDesc: 'सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश) नियम के अनुसार शिकायत अधिकारी: baliyana434@gmail.com पर 24 घंटे के भीतर पावती दी जाती है।',
  },
  es: {
    backHome: 'Volver al Inicio',
    badge: 'Atención al Ciudadano y Reclamaciones',
    title: 'Centro de Contacto y Asistencia',
    subtitle: 'Póngase en contacto con nuestro equipo de soporte para orientación cívica o consultas sobre su pase.',
    emailCardTitle: 'Soporte por Correo Electrónico',
    emailCardDesc: 'Para consultas generales, verificación de pases y asistencia técnica:',
    phoneCardTitle: 'Línea de Asistencia',
    phoneCardDesc: 'Atención telefónica directa en días hábiles:',
    hoursTitle: 'Horario de Atención',
    hoursDesc: 'De lunes a sábado: 9:30 a 18:30 (IST). El soporte por correo permanece activo los domingos y festivos.',
    officeTitle: 'Sede Principal',
    officeDesc: 'Citzos Civic-Tech Platform, Haryana, India',
    grievanceTitle: 'Oficina de Reclamaciones',
    grievanceDesc: 'Responsable de tramitación de incidencias: baliyana434@gmail.com (respuesta en 24 horas).',
  },
  fr: {
    backHome: 'Retour à l\'Accueil',
    badge: 'Service d\'Assistance Civique & Réclamations',
    title: 'Contact & Support aux Citoyens',
    subtitle: 'Contactez notre équipe dédiée pour toute demande d\'assistance technique ou d\'information.',
    emailCardTitle: 'Support par E-mail',
    emailCardDesc: 'Pour vos démarches, validation de pass et questions techniques :',
    phoneCardTitle: 'Ligne Téléphonique',
    phoneCardDesc: 'Assistance téléphonique directe aux heures ouvrables :',
    hoursTitle: 'Heures d\'Ouverture',
    hoursDesc: 'Du lundi au samedi : 9h30 à 18h30 (IST). L\'assistance e-mail fonctionne le dimanche et jours fériés.',
    officeTitle: 'Bureau Enregistré',
    officeDesc: 'Citzos Civic-Tech Platform, Haryana, India',
    grievanceTitle: 'Médiateur aux Réclamations',
    grievanceDesc: 'Délégué à la protection et réclamation : baliyana434@gmail.com (accusé sous 24h).',
  },
  de: {
    backHome: 'Zurück zur Startseite',
    badge: 'Bürgerhilfe & Beschwerdestelle',
    title: 'Kontakt & Bürgerservice',
    subtitle: 'Wenden Sie sich an unser Support-Team für Hilfe zu Förderungen und technischen Fragen.',
    emailCardTitle: 'E-Mail-Support',
    emailCardDesc: 'Für allgemeine Bürgerfragen und IT-Hilfe:',
    phoneCardTitle: 'Telefonische Auskunft',
    phoneCardDesc: 'Direkte telefonische Unterstützung zu Geschäftszeiten:',
    hoursTitle: 'Öffnungszeiten',
    hoursDesc: 'Montag bis Samstag: 9:30 bis 18:30 Uhr (IST). E-Mail-Dienst auch an Sonn- und Feiertagen aktiv.',
    officeTitle: 'Firmensitz',
    officeDesc: 'Citzos Civic-Tech Platform, Haryana, India',
    grievanceTitle: 'Beschwerdebeauftragter',
    grievanceDesc: 'Zuständige Ombudsstelle: baliyana434@gmail.com (Rückmeldung binnen 24 Stunden).',
  },
  ar: {
    backHome: 'العودة للرئيسية',
    badge: 'مكتب مساعدة المواطنين وتلقي الشكاوى',
    title: 'مركز الاتصال والدعم المدني',
    subtitle: 'تواصل مع فريق الدعم المتخصص لأي استفسار تقني أو إرشاد حول الخدمات.',
    emailCardTitle: 'الدعم عبر البريد الإلكتروني',
    emailCardDesc: 'للاستفسارات العامة وتفعيل الاشتراكات والمساعدة التقنية:',
    phoneCardTitle: 'الخط الهاتفي المباشر',
    phoneCardDesc: 'دعم هاتفي مباشر خلال ساعات العمل الرسمية:',
    hoursTitle: 'ساعات العمل الرسمية',
    hoursDesc: 'من الإثنين إلى السبت: 9:30 ص إلى 6:30 م (IST). مراقبة البريد مستمرة في الإجازات.',
    officeTitle: 'المكتب المسجل',
    officeDesc: 'Citzos Civic-Tech Platform, Haryana, India',
    grievanceTitle: 'مسؤول فض الشكاوى والاعتراضات',
    grievanceDesc: 'مسؤول الشكاوى الرسمي: baliyana434@gmail.com (إفادة خلال 24 ساعة).',
  },
};
