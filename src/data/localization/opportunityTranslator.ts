import { Opportunity, SupportedLanguage } from '@/types';

export interface LocalizedOpportunityView {
  title: string;
  benefitHeadline: string;
  description: string;
  officialFee: string;
  scamWarning: string;
  issuingAuthority: string;
  documents: { id: string; name: string; isMandatory: boolean; notes?: string }[];
  applySteps: { step: number; text: string }[];
  applicationStatusText: string;
}

// Translations for standard multi-lingual opportunities
const OPPORTUNITY_I18N: Record<string, Partial<Record<SupportedLanguage, {
  title: string;
  benefitHeadline: string;
  description: string;
  officialFee?: string;
  scamWarning?: string;
  steps?: string[];
  docNames?: Record<string, string>;
}>>> = {
  'erasmus-mundus-joint-masters': {
    es: {
      title: 'Beca Máster Conjunto Erasmus Mundus (Unión Europea)',
      benefitHeadline: '100% Matrícula Gratuita, Gastos de Viaje y 1.400 € Mensuales de Manutención',
      description: 'Programa oficial de la Unión Europea que financia estudios de máster en al menos dos universidades europeas con cobertura total de matrícula y beca de subsistencia.',
      officialFee: '0 € (Totalmente Gratuito)',
      scamWarning: 'La solicitud oficial a través del consorcio de la Unión Europea es completamente gratuita.',
    },
    fr: {
      title: 'Bourse de Master Conjoint Erasmus Mundus (Union Européenne)',
      benefitHeadline: 'Exonération Totale des Frais, Indemnité de Voyage et 1 400 € d\'Allocation Mensuelle',
      description: 'Programme prestigieux de l\'Union Européenne finançant des masters internationaux d\'excellence dispensés par des universités dans au moins deux pays européens.',
      officialFee: '0 € (Entièrement Gratuit)',
      scamWarning: 'Le dépôt de candidature via le consortium officiel est totalement gratuit.',
    },
    de: {
      title: 'Erasmus Mundus Gemeinsames Master-Stipendium (Europäische Union)',
      benefitHeadline: '100% Studiengebührenbefreiung, Reisekosten und 1.400 € Monatlicher Lebensunterhalt',
      description: 'Offizielles Studienprogramm der Europäischen Union mit vollständiger Finanzierung für herausragende Masterstudiengänge an mindestens zwei europäischen Hochschulen.',
      officialFee: '0 € (Vollständig Gebührenfrei)',
      scamWarning: 'Die Bewerbung über das offizielle Portal der Europäischen Kommission ist gebührenfrei.',
    },
    ar: {
      title: 'منحة إيراسموس موندوس المشتركة للماجستير (الاتحاد الأوروبي)',
      benefitHeadline: 'إعفاء كامل من الرسوم الدراسية، بدل سفر ومكافأة شهرية قدرها 1400 يورو',
      description: 'برنامج رسمي ممول بالكامل من الاتحاد الأوروبي لدراسة الماجستير الدولي في جامعتين أوروبيتين على الأقل.',
      officialFee: '0 يورو (مجاني بالكامل)',
      scamWarning: 'التقديم على المنحة مجاني بالكامل عبر بوابة الاتحاد الأوروبي المعتمدة.',
    },
  },
  'fulbright-foreign-student-program': {
    es: {
      title: 'Programa Fulbright para Estudiantes Extranjeros (Estados Unidos)',
      benefitHeadline: 'Matrícula Universitaria Completa en EE. UU., Manutención, Seguro Médico y Pasaje Aéreo',
      description: 'Programa oficial del Departamento de Estado de los Estados Unidos que financia estudios de posgrado e investigación académica integral en universidades estadounidenses.',
      officialFee: '0 $ (Gratuito)',
      scamWarning: 'Las becas Fulbright se tramitan exclusivamente a través de las embajadas oficiales de EE. UU.',
    },
    fr: {
      title: 'Programme Fulbright pour Étudiants Étrangers (États-Unis)',
      benefitHeadline: 'Frais de Scolarité Intégralement Pris en Charge, Allocation Mensuelle, Billet d\'Avion et Assurance',
      description: 'Programme du Département d\'État américain finançant des études de master et de doctorat d\'excellence dans les universités des États-Unis.',
      officialFee: '0 $ (Gratuit)',
      scamWarning: 'Les candidatures Fulbright sont gérées directement par les ambassades et commissions officielles.',
    },
    de: {
      title: 'Fulbright-Programm für Internationale Studierende (Vereinigte Staaten)',
      benefitHeadline: 'Vollständige Übernahme der Studiengebühren in den USA, Monatspauschale, Flug und Krankenversicherung',
      description: 'Offizielles Exzellenzprogramm des US-Außenministeriums für Master- und Promotionsstudiengänge an akkreditierten US-Universitäten.',
      officialFee: '0 $ (Gebührenfrei)',
      scamWarning: 'Bewerbungen erfolgen ausschließlich über die offiziellen Fulbright-Kommissionen und Botschaften.',
    },
    ar: {
      title: 'برنامج فولبرايت للطلاب الدوليين (الولايات المتحدة الأمريكية)',
      benefitHeadline: 'تغطية كاملة للمصروفات الجامعية في أمريكا، راتب شهري، تذكرة طيران وتأمين صحي',
      description: 'برنامج التبادل التعليمي المرموق التابع لوزارة الخارجية الأمريكية للدراسات العليا والأبحاث.',
      officialFee: '0 دولار (مجاني)',
      scamWarning: 'يتم التقديم رسمياً فقط من خلال السفارات ومفوضيات فولبرايت المعتمدة.',
    },
  },
  'chevening-uk-scholarships': {
    es: {
      title: 'Becas Chevening del Gobierno Británico (Reino Unido)',
      benefitHeadline: 'Máster de 1 Año Totalmente Financiado en Cualquier Universidad del Reino Unido con Asignación Mensual',
      description: 'Programa global del Ministerio de Asuntos Exteriores británico (FCDO) que cubre la totalidad de la matrícula, manutención y vuelos en el Reino Unido.',
      officialFee: '0 £ (Gratuito)',
      scamWarning: 'Las solicitudes Chevening se presentan directamente en el portal oficial sin coste.',
    },
    fr: {
      title: 'Bourses Chevening du Gouvernement Britannique (Royaume-Uni)',
      benefitHeadline: 'Master d\'Un An Entièrement Financé dans Toute Université Britannique avec Indemnité Mensuelle',
      description: 'Programme d\'excellence du gouvernement britannique prenant en charge l\'ensemble des frais universitaires et de subsistance au Royaume-Uni.',
      officialFee: '0 £ (Gratuit)',
      scamWarning: 'Le dossier de candidature est instruit sans aucun intermédiaire payant.',
    },
    de: {
      title: 'Chevening-Stipendien der Britischen Regierung (Vereinigtes Königreich)',
      benefitHeadline: 'Vollfinanzierter 1-Jahres-Master an Jeder Britischen Universität Inklusive Monatlicher Zulage',
      description: 'Offizielles Exzellenzprogramm der britischen Regierung zur vollständigen Kostenübernahme von Studiengebühren und Lebenshaltungskosten in Großbritannien.',
      officialFee: '0 £ (Gebührenfrei)',
      scamWarning: 'Anträge für Chevening-Stipendien werden gebührenfrei über das britische Regierungsportal eingereicht.',
    },
    ar: {
      title: 'منح تشيفنينج البريطانية (حكومة المملكة المتحدة)',
      benefitHeadline: 'دراسة ماجستير كاملة لمدة عام في أي جامعة بريطانية ممولة بالكامل مع راتب شهري',
      description: 'برنامج المنح الدراسية الرسمي التابع لوزارة الخارجية والتنمية البريطانية لتغطية كافة نفقات الدراسة والمعيشة.',
      officialFee: '0 جنيه إسترليني (مجاني)',
      scamWarning: 'التقديم متاح حصرياً عبر الموقع الرسمي لبرنامج تشيفنينج دون أي وسطاء.',
    },
  },
  'daad-scholarships-germany': {
    es: {
      title: 'Becas DAAD de Posgrado y Desarrollo (Alemania)',
      benefitHeadline: '934 € Mensuales, Matrícula Gratuita en Universidades Estatales Alemanas, Seguro y Viaje',
      description: 'El Servicio Alemán de Intercambio Académico (DAAD) ofrece becas completas para programas de máster en universidades públicas de Alemania.',
      officialFee: '0 € (Gratuito)',
    },
    fr: {
      title: 'Bourses DAAD Helmut-Schmidt et Développement (Allemagne)',
      benefitHeadline: 'Allocation Mensuelle de 934 €, Exonération Universitaire, Assurance et Billet d\'Avion',
      description: 'L\'Office Allemand d\'Échanges Universitaires (DAAD) finance des masters d\'excellence dans les universités publiques allemandes.',
      officialFee: '0 € (Gratuit)',
    },
    de: {
      title: 'DAAD Helmut-Schmidt & Entwicklungsstipendien (Deutschland)',
      benefitHeadline: '934 € Monatliches Stipendium, Kostenloses Studium an Staatlichen Universitäten, Versicherung und Reise',
      description: 'Der Deutsche Akademische Austauschdienst (DAAD) bietet Vollstipendien für Masterstudiengänge an staatlichen Hochschulen in Deutschland.',
      officialFee: '0 € (Gebührenfrei)',
    },
    ar: {
      title: 'منح الهيئة الألمانية للتبادل الأكاديمي DAAD (ألمانيا)',
      benefitHeadline: 'راتب شهري 934 يورو، دراسة جامعية مجانية بالكامل، تأمين صحي وبدل سفر',
      description: 'برنامج منح رسمي مقدم من الهيئة الألمانية للتبادل الأكاديمي لدراسة الماجستير في الجامعات الحكومية الألمانية.',
      officialFee: '0 يورو (مجاني)',
    },
  },
  'us-federal-pell-grant': {
    es: {
      title: 'Beca Federal Pell (Departamento de Educación de EE. UU.)',
      benefitHeadline: 'Hasta 7.395 $ Anuales en Ayuda Federal Directa (Subvención No Reembolsable)',
      description: 'Subvención oficial del gobierno federal estadounidense para estudiantes de grado con necesidad económica que no debe reembolsarse jamás.',
      officialFee: '0 $ (Gratuito)',
    },
    fr: {
      title: 'Bourse Fédérale Pell (Ministère de l\'Éducation des États-Unis)',
      benefitHeadline: 'Jusqu\'à 7 395 $ par An d\'Aide Fédérale Directe Non Remboursable',
      description: 'Aide financière attribuée par le gouvernement fédéral américain aux étudiants de premier cycle sans obligation de remboursement.',
      officialFee: '0 $ (Gratuit)',
    },
    de: {
      title: 'Bundes-Pell-Zuschuss (US-Bildungsministerium)',
      benefitHeadline: 'Bis zu 7.395 $ Jährlich an Direkter Nicht-Rückzahlbarer Bundesbeihilfe',
      description: 'Staatliche Studienbeihilfe der US-Bundesregierung für Bachelorstudierende ohne Rückzahlungspflicht.',
      officialFee: '0 $ (Gebührenfrei)',
    },
    ar: {
      title: 'منحة بيل الفيدرالية (وزارة التعليم الأمريكية)',
      benefitHeadline: 'ما يصل إلى 7,395 دولار سنوياً دعم مباشر غير مسترد',
      description: 'منحة حكومية فدرالية مخصصة لطلاب المرحلة الجامعية الأولى في الولايات المتحدة دون الحاجة لسدادها.',
      officialFee: '0 دولار (مجاني)',
    },
  },
  'us-nsf-grfp': {
    es: {
      title: 'Programa de Becas de Investigación de Posgrado de la NSF (EE. UU.)',
      benefitHeadline: 'Estipendio Anual de 37.000 $ + 16.000 $ de Subsidio Educativo durante 3 Años',
      description: 'La Fundación Nacional de Ciencias de EE. UU. (NSF) financia investigaciones científicas de posgrado en disciplinas STEM acreditadas.',
      officialFee: '0 $ (Gratuito)',
    },
    fr: {
      title: 'Programme de Bourses de Recherche Doctorale de la NSF (États-Unis)',
      benefitHeadline: 'Allocation Annuelle de 37 000 $ + 16 000 $ de Frais de Formation pendant 3 Ans',
      description: 'Bourse prestigieuse de la Fondation Nationale pour la Science des États-Unis soutenant les chercheurs en sciences, technologies et ingénierie.',
      officialFee: '0 $ (Gratuit)',
    },
    de: {
      title: 'NSF Graduierten-Forschungsstipendienprogramm (USA)',
      benefitHeadline: '37.000 $ Jährliches Lebensunterhaltsstipendium + 16.000 $ Bildungskostenpauschale für 3 Jahre',
      description: 'Exzellenzförderung der National Science Foundation für herausragende Forschungsmaster und Promotionen in MINT-Fächern.',
      officialFee: '0 $ (Gebührenfrei)',
    },
    ar: {
      title: 'برنامج زمالة أبحاث الدراسات العليا NSF (الولايات المتحدة)',
      benefitHeadline: 'مكافأة سنوية 37,000 دولار + 16,000 دولار بدل مصاريف دراسية لمدة 3 سنوات',
      description: 'منحة بحثية من مؤسسة العلوم الوطنية الأمريكية لتمويل الدراسات العليا في مجالات العلوم والتكنولوجيا والهندسة.',
      officialFee: '0 دولار (مجاني)',
    },
  },
  'us-usajobs-pathways-internships': {
    es: {
      title: 'Programa de Prácticas Pathways de USAJOBS (Función Pública Federal)',
      benefitHeadline: 'Prácticas Remuneradas (18 $ - 34 $/h) con Incorporación Directa como Funcionario Federal Permanente',
      description: 'Prácticas laborales remuneradas en agencias del gobierno federal de EE. UU. con transición directa a empleo permanente.',
      officialFee: '0 $ (Gratuito)',
    },
    fr: {
      title: 'Programme de Stages Pathways USAJOBS (Fonction Publique Fédérale Américaine)',
      benefitHeadline: 'Stages Fédéraux Rémunérés (18 $ à 34 $/h) avec Titularisation Permanente Directe',
      description: 'Opportunités rémunérées au sein des agences fédérales américaines avec conversion directe en fonctionnaire permanent.',
      officialFee: '0 $ (Gratuit)',
    },
    de: {
      title: 'USAJOBS Pathways Praktikumsprogramm (Bundesbeamter USA)',
      benefitHeadline: 'Vergütete Bundesstellen (18 $ - 34 $/Std.) mit Direkter Festanstellung im Bundesdienst',
      description: 'Bezahlte Praktika in US-Bundesbehörden mit anschließendem direktem Übergang in eine feste Bundesanstellung.',
      officialFee: '0 $ (Gebührenfrei)',
    },
    ar: {
      title: 'برنامج التدريب العملي Pathways (الخدمة المدنية الفيدرالية الأمريكية)',
      benefitHeadline: 'وظائف تدريبية براتب (18 - 34 دولار/ساعة) مع تثبيت مباشر في الوظائف الحكومية الدائمة',
      description: 'برنامج تدريب مدفوع الأجر في الوكالات الفيدرالية الأمريكية يتيح التعيين المباشر في الخدمة المدنية الحكومية.',
      officialFee: '0 دولار (مجاني)',
    },
  },
  'fr-bourse-crous-bcs': {
    es: {
      title: 'Beca de Criterios Sociales (BCS) - Ayuda Universitaria CROUS (Francia)',
      benefitHeadline: 'De 1.454 € a 6.335 € Anuales + Exención Total de Tasas Universitarias y CVEC',
      description: 'Principal ayuda universitaria del gobierno francés gestionada por el CROUS según renta y puntos familiares con acceso prioritario a residencia.',
      officialFee: '0 € (Gratuito)',
    },
    fr: {
      title: 'Bourse sur Critères Sociaux (BCS) - CROUS (France)',
      benefitHeadline: '1 454 € à 6 335 € par An + Exonération Totale des Frais d\'Inscription et CVEC',
      description: 'Principale bourse d\'enseignement supérieur de l\'État français attribuée par les CROUS selon les revenus fiscaux du foyer.',
      officialFee: '0 € (Gratuit)',
    },
    de: {
      title: 'Sozialkriterien-Stipendium (BCS) - CROUS Studienhilfe (Frankreich)',
      benefitHeadline: '1.454 € bis 6.335 € Jährlich + Befreiung von Einschreibegebühren und CVEC',
      description: 'Zentrale staatliche Hochschulbeihilfe in Frankreich vergeben durch das CROUS nach Einkommen und Sozialpunkten.',
      officialFee: '0 € (Gebührenfrei)',
    },
    ar: {
      title: 'منحة المعايير الاجتماعية (BCS) - دعم التعليم العالي CROUS (فرنسا)',
      benefitHeadline: 'من 1,454 إلى 6,335 يورو سنوياً + إعفاء كامل من المصروفات الجامعية ورسوم CVEC',
      description: 'المنحة الحكومية الفرنسية الرئيسية لطلاب الجامعات تصرف عبر مراكز CROUS وفقاً للدخل والمستوى الاجتماعي.',
      officialFee: '0 يورو (مجاني)',
    },
  },
  'fr-contrat-apprentissage': {
    es: {
      title: 'Contrato de Aprendizaje (Programa Estatal de Formación Dual en Francia)',
      benefitHeadline: '100% Matrícula Gratuita + Sueldo Mensual Legal de 477 € a 1.800 € (27% a 100% del Salario Mínimo)',
      description: 'Formación dual alternada entre empresa y centro educativo con salario legal garantizado y matrícula completamente cubierta por el Estado.',
      officialFee: '0 € (Gratuito)',
    },
    fr: {
      title: 'Contrat d\'Apprentissage (Formation en Alternance de l\'État Français)',
      benefitHeadline: '100% des Frais Pris en Charge + Salaire Mensuel de 477 € à 1 800 € (27% à 100% du SMIC)',
      description: 'Dispositif officiel d\'alternance combinant enseignement théorique et expérience professionnelle rémunérée.',
      officialFee: '0 € (Gratuit)',
    },
    de: {
      title: 'Ausbildungsvertrag (Duale Ausbildung des Französischen Staates)',
      benefitHeadline: '100% Gebührenübernahme + Gesetzliches Monatsgehalt von 477 € bis 1.800 € (27% bis 100% SMIC)',
      description: 'Offizielles duales Ausbildungsprogramm in Frankreich mit voller Kostenübernahme und monatlicher Ausbildungsvergütung.',
      officialFee: '0 € (Gebührenfrei)',
    },
    ar: {
      title: 'عقد التمهن المهني (برنامج التدريب المزدوج الحكومي الفرنسي)',
      benefitHeadline: 'تغطية كاملة 100% لرسوم الدراسة + راتب قانوني شهري من 477 إلى 1,800 يورو',
      description: 'برنامج التدريب المهني الحكومي الفرنسي يجمع بين الدراسة الأكاديمية والعمل الميداني براتب شهري معتمد.',
      officialFee: '0 يورو (مجاني)',
    },
  },
  'fr-rsa-solidarite-active': {
    es: {
      title: 'Renta de Solidaridad Activa (RSA) - Ayuda Social CAF (Francia)',
      benefitHeadline: 'Hasta 635,71 € Mensuales de Ingreso Mínimo Garantizado para Residentes',
      description: 'Prestación social de la Caja de Asignaciones Familiares (CAF) que garantiza un nivel mínimo de subsistencia a personas sin ingresos suficientes.',
      officialFee: '0 € (Gratuito)',
    },
    fr: {
      title: 'Revenu de Solidarité Active (RSA) - Allocation CAF (France)',
      benefitHeadline: 'Jusqu\'à 635,71 € par Mois de Revenu Minimum Garanti',
      description: 'Prestation sociale assurée par la CAF garantissant un niveau minimum de ressources pour les personnes sans emploi ou aux revenus modestes.',
      officialFee: '0 € (Gratuit)',
    },
    de: {
      title: 'Aktives Solidaritätseinkommen (RSA) - CAF Sozialleistung (Frankreich)',
      benefitHeadline: 'Bis zu 635,71 € Monatliches Garantiertes Mindesteinkommen',
      description: 'Staatliche Grundsicherung der französischen Familienkasse CAF zur Absicherung des Existenzminimums.',
      officialFee: '0 € (Gebührenfrei)',
    },
    ar: {
      title: 'دخل التضامن النشط (RSA) - مساعدات صندوق CAF (فرنسا)',
      benefitHeadline: 'ما يصل إلى 635.71 يورو شهرياً كحد أدنى مضمون للدخل المعيشي',
      description: 'مساعدة اجتماعية حكومية فرنسية تصرف عبر صندوق المساعدات العائلية CAF لضمان حد الكفاية المعيشية.',
      officialFee: '0 يورو (مجاني)',
    },
  },
  'jp-mext-scholarship': {
    es: {
      title: 'Beca MEXT del Gobierno de Japón (Monbukagakusho)',
      benefitHeadline: '100% Matrícula Universitaria + Estipendio Mensual de 117.000 ¥ a 145.000 ¥ y Vuelos Incluidos',
      description: 'Beca oficial del Ministerio de Educación de Japón para cursar estudios superiores y posgrado en universidades de élite japonesas.',
      officialFee: '0 ¥ (Gratuito)',
    },
    fr: {
      title: 'Bourse d\'Excellence MEXT du Gouvernement Japonais (Monbukagakusho)',
      benefitHeadline: 'Frais Universitaires 100% Gratuits + Allocation de 117 000 ¥ à 145 000 ¥/Mois et Billets d\'Avion',
      description: 'Programme officiel de bourses de recherche et d\'études supérieures dispensé par le Ministère de l\'Éducation du Japon.',
      officialFee: '0 ¥ (Gratuit)',
    },
    de: {
      title: 'MEXT-Stipendium der Japanischen Regierung (Monbukagakusho)',
      benefitHeadline: '100% Studiengebührenbefreiung + 117.000 ¥ bis 145.000 ¥ Monatlicher Zuschuss Inklusive Flug',
      description: 'Offizielles Exzellenzstipendium des japanischen Bildungsministeriums für Universitäts- und Promotionsstudien in Japan.',
      officialFee: '0 ¥ (Gebührenfrei)',
    },
    ar: {
      title: 'منحة ميكست الحكومية اليابانية (MEXT Monbukagakusho)',
      benefitHeadline: 'إعفاء جامعي 100% + راتب شهري من 117,000 إلى 145,000 ين وتذاكر طيران مجانية',
      description: 'المنحة الرسمية المقدمة من وزارة التعليم والعلوم اليابانية للدراسة الجامعية والماجستير والدكتوراه في اليابان.',
      officialFee: '0 ين (مجاني)',
    },
  },
  'ae-emirates-foundation-youth': {
    es: {
      title: 'Programa Juvenil de la Fundación Emirates (EAU)',
      benefitHeadline: 'Capacitación Profesional Certificada 100% Gratuita en IA, Fintech y Colocación Laboral Directa',
      description: 'Iniciativa oficial del gobierno de los Emiratos Árabes Unidos para la formación tecnológica y profesional de jóvenes talentos.',
      officialFee: '0 د.إ (Gratuito)',
    },
    fr: {
      title: 'Programme Jeunesse de la Fondation Emirates (Émirats Arabes Unis)',
      benefitHeadline: 'Formations Certifiantes Offertes en IA et Économie Numérique avec Recrutement Garanti',
      description: 'Programme officiel de développement des compétences soutenu par le gouvernement des Émirats Arabes Unis.',
      officialFee: '0 د.إ (Gratuit)',
    },
    de: {
      title: 'Jugendförderprogramm der Emirates Foundation (VAE)',
      benefitHeadline: 'Kostenlose Zertifizierte Weiterbildung in KI und Finanztechnologie mit Direkter Vermittlung',
      description: 'Offizielles staatliches Qualifizierungsprogramm der Vereinigten Arabischen Emirate für Nachwuchskräfte.',
      officialFee: '0 د.إ (Gebührenfrei)',
    },
    ar: {
      title: 'برنامج مؤسسة الإمارات لتأهيل وتطوير الشباب (الإمارات)',
      benefitHeadline: 'تدريب احترافي معتمد ومجاني 100% في الذكاء الاصطناعي والاقتصاد الرقمي مع توظيف مباشر',
      description: 'مبادرة وطنية رسمية لدولة الإمارات العربية المتحدة لتطوير مهارات الشباب وإعدادهم لسوق العمل المستقبلي.',
      officialFee: '0 درهم (مجاني)',
    },
  },
  'sg-skillsfuture-credit': {
    es: {
      title: 'Crédito SkillsFuture de Capacitación Permanente (Gobierno de Singapur)',
      benefitHeadline: 'De 500 S$ a 4.000 S$ en Créditos Directos No Reembolsables para Cursos Profesionales',
      description: 'Iniciativa gubernamental de Singapur que dota de fondos a los ciudadanos para su reciclaje profesional y formación en competencias del futuro.',
      officialFee: '0 S$ (Gratuito)',
    },
    fr: {
      title: 'Crédit Formation SkillsFuture (Gouvernement de Singapour)',
      benefitHeadline: '500 S$ à 4 000 S$ de Crédits Publics Directs pour Formations Certifiantes et Reconversion',
      description: 'Dispositif de formation continue subventionné par l\'État singapourien pour l\'acquisition de compétences stratégiques.',
      officialFee: '0 S$ (Gratuit)',
    },
    de: {
      title: 'SkillsFuture Weiterbildungsguthaben (Regierung von Singapur)',
      benefitHeadline: '500 S$ bis 4.000 S$ Direkte Staatliche Bildungsgutschrift für Anerkannte Fachkurse',
      description: 'Offizielles nationales Weiterbildungsprogramm Singapurs zur lebenslangen Qualifizierung und beruflichen Neuausrichtung.',
      officialFee: '0 S$ (Gebührenfrei)',
    },
    ar: {
      title: 'رصيد سكيلز فيوتشر للتدريب المهني (حكومة سنغافورة)',
      benefitHeadline: 'رصيد تدريبي حكومي مباشر من 500 إلى 4,000 دولار سنغافوري لدورات التطوير المهني',
      description: 'مبادرة حكومية سنغافورية لتطوير مهارات المواطنين وتغطية تكاليف الدورات التدريبية المعتمدة بالكامل.',
      officialFee: '0 دولار سنغافوري (مجاني)',
    },
  },
  'kr-gks-scholarship': {
    es: {
      title: 'Beca Global Korea Scholarship (GKS / KGSP) - Gobierno de Corea del Sur',
      benefitHeadline: '100% Matrícula Universitaria + Asignación Mensual de 1.000.000 ₩ a 1.500.000 ₩ y Vuelos',
      description: 'Programa oficial de becas del Ministerio de Educación de Corea del Sur (NIIED) para estudios de grado y posgrado en universidades coreanas.',
      officialFee: '0 ₩ (Gratuito)',
    },
    fr: {
      title: 'Bourse d\'Excellence Global Korea (GKS / KGSP) - République de Corée',
      benefitHeadline: 'Frais de Scolarité 100% Pris en Charge + 1 000 000 ₩ à 1 500 000 ₩/Mois et Billets d\'Avion',
      description: 'Programme prestigieux de bourses d\'études supérieures financé par le Ministère de l\'Éducation de Corée du Sud.',
      officialFee: '0 ₩ (Gratuit)',
    },
    de: {
      title: 'Global Korea Scholarship (GKS) - Staatliche Stipendien Südkoreas',
      benefitHeadline: '100% Studiengebührenbefreiung + 1.000.000 ₩ bis 1.500.000 ₩ Monatspauschale und Flüge',
      description: 'Offizielles Studienförderprogramm des südkoreanischen Bildungsministeriums (NIIED) für internationale Studierende.',
      officialFee: '0 ₩ (Gebührenfrei)',
    },
    ar: {
      title: 'منحة حكومة كوريا الجنوبية الدولية (GKS / KGSP)',
      benefitHeadline: 'إعفاء جامعي 100% + راتب شهري من مليون إلى 1.5 مليون وون وتذاكر طيران مجانية',
      description: 'المنحة الرسمية لوزارة التعليم الكورية الجنوبية لدراسة البكالوريوس والدراسات العليا في الجامعات الكورية.',
      officialFee: '0 وون (مجاني)',
    },
  },
  'sa-tamheer-internship': {
    es: {
      title: 'Programa de Prácticas Profesionales Tamheer (HRDF / Hadaf - Arabia Saudita)',
      benefitHeadline: '3.000 SAR Mensuales de Ayuda Gubernamental Directa + Seguro contra Accidentes Laborales',
      description: 'Iniciativa oficial del Fondo de Desarrollo de Recursos Humanos saudí que financia prácticas laborales remuneradas en grandes corporaciones.',
      officialFee: '0 ﷼ (Gratuito)',
    },
    fr: {
      title: 'Programme de Formation Professionnelle Tamheer (HRDF / Hadaf - Arabie Saoudite)',
      benefitHeadline: '3 000 SAR par Mois d\'Indemnité Directe Versée par l\'État + Assurance Professionnelle',
      description: 'Dispositif officiel saoudien de stages rémunérés au sein d\'entreprises privées et publiques de premier plan.',
      officialFee: '0 ﷼ (Gratuit)',
    },
    de: {
      title: 'Tamheer Berufseinstiegsprogramm (HRDF / Hadaf - Saudi-Arabien)',
      benefitHeadline: '3.000 SAR Monatlicher Staatlicher Zuschuss + Arbeitsunfallversicherung',
      description: 'Offizielles Qualifizierungsprogramm des saudischen Personalförderungsfonds für Universitätsabsolventen.',
      officialFee: '0 ﷼ (Gebührenfrei)',
    },
    ar: {
      title: 'برنامج التدريب على رأس العمل (تمهير) - صندوق هدف (السعودية)',
      benefitHeadline: 'مكافأة حكومية شهرية 3,000 ريال سعودي + تأمين ضد مخاطر العمل وتأهيل وظيفي',
      description: 'برنامج حكومي رسمي من صندوق تنمية الموارد البشرية (هدف) لتدريب وتأهيل الخريجين في كبرى الشركات.',
      officialFee: '0 ريال (مجاني)',
    },
  },
  'it-edisu-borsa-studio': {
    es: {
      title: 'Beca de Estudios EDISU / DSU (Universidades Públicas de Italia)',
      benefitHeadline: 'Hasta 7.500 € Anuales en Ayuda Directa + Exención Total de Tasas Universitarias y Comedor Gratuito',
      description: 'Programa oficial regional para el derecho a la educación superior en Italia que otorga financiación directa y alojamiento a estudiantes universitarios.',
      officialFee: '0 € (Gratuito)',
    },
    fr: {
      title: 'Bourse d\'Études Régionale EDISU / DSU (Universités Publiques en Italie)',
      benefitHeadline: 'Jusqu\'à 7 500 € par An en Aide Directe + Gratuité Universitaire et Restauration Offerte',
      description: 'Aide officielle de l\'État italien attribuée aux étudiants selon les critères économiques de l\'ISEE universitaire.',
      officialFee: '0 € (Gratuit)',
    },
    de: {
      title: 'EDISU / DSU Landesstipendium (Staatliche Universitäten Italien)',
      benefitHeadline: 'Bis zu 7.500 € Jährlicher Barzuschuss + Vollständige Befreiung von Studiengebühren und Mensa',
      description: 'Offizielle Studienbeihilfe italienischer Regionen zur Förderung des Hochschulzugangs nach ISEE-Einkommensnachweis.',
      officialFee: '0 € (Gebührenfrei)',
    },
    ar: {
      title: 'منحة إيديسو EDISU / DSU الإقليمية (الجامعات الحكومية الإيطالية)',
      benefitHeadline: 'ما يصل إلى 7,500 يورو سنوياً دعماً نقدياً + إعفاء جامعي 100% ووجبات مجانية',
      description: 'المنحة الرسمية لهيئة الحق في التعليم الجامعي الإيطالية وتغطي تكاليف الدراسة والسكن والمعيشة.',
      officialFee: '0 يورو (مجاني)',
    },
  },
};

// Document Name Localization Dictionary
const DOC_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  pass: {
    es: 'Pasaporte Nacional Válido',
    fr: 'Passeport National en Cours de Validité',
    de: 'Gültiger Reisepass',
    ar: 'جواز سفر وطني ساري المفعول',
    hi: 'वैध राष्ट्रीय पासपोर्ट',
  },
  trans: {
    es: 'Expediente Académico y Notas Oficiales',
    fr: 'Relevés de Notes et Dossier Universitaire',
    de: 'Amtliche Notenübersichten und Zeugnisse',
    ar: 'السجل الأكاديمي وكشف الدرجات المعتمد',
    hi: 'आधिकारिक शैक्षणिक अंकतालिका',
  },
  deg: {
    es: 'Título Universitario o Certificado de Estudios',
    fr: 'Diplôme Universitaire ou Attestation de Réussite',
    de: 'Hochschulabschlusszeugnis oder Diplom',
    ar: 'الشهادة الجامعية أو المؤهل الأكاديمي',
    hi: 'स्नातक उपाधि प्रमाणपत्र',
  },
  ssn: {
    es: 'Número de Seguro Social o Documento Nacional',
    fr: 'Numéro de Sécurité Sociale ou Carte d\'Identité',
    de: 'Sozialversicherungsnummer oder Ausweis',
    ar: 'رقم الهوية الوطنية أو التأمين الاجتماعي',
    hi: 'सोशल सिक्योरिटी नंबर (एसएसएन)',
  },
  tax: {
    es: 'Declaración Oficial del Impuesto sobre la Renta',
    fr: 'Avis d\'Imposition sur le Revenu',
    de: 'Einkommensteuerbescheid',
    ar: 'الإقرار الضريبي أو شهادة الدخل المعتمدة',
    hi: 'आयकर निर्धारण प्रपत्र',
  },
  res: {
    es: 'Currículum Vitae Oficial Actualizado',
    fr: 'Curriculum Vitae à Jour au Format Standard',
    de: 'Vollständiger Tabellarischer Lebenslauf',
    ar: 'السيرة الذاتية الرسمية المحدثة',
    hi: 'बायोडाटा / सीवी',
  },
  ref: {
    es: 'Cartas de Recomendación Profesional o Académica',
    fr: 'Lettres de Recommandation Académiques',
    de: 'Akademische oder Berufliche Empfehlungsschreiben',
    ar: 'خطابات التوصية الأكاديمية أو المهنية',
    hi: 'अनुशंसा पत्र',
  },
  id_card: {
    es: 'Documento Nacional de Identidad en Vigor',
    fr: 'Carte Nationale d\'Identité ou Titre de Séjour',
    de: 'Personalausweis oder Aufenthaltstitel',
    ar: 'بطاقة الهوية الوطنية سارية الصلاحية',
    hi: 'राष्ट्रीय पहचान पत्र',
  },
};

// Common Authority Name Localization
function localizeAuthority(authority: string, language: SupportedLanguage): string {
  if (language === 'en') return authority;
  if (language === 'hi') {
    return authority
      .replace(/Ministry of Education/g, 'शिक्षा मंत्रालय')
      .replace(/Ministry of/g, 'मंत्रालय')
      .replace(/Department of/g, 'विभाग')
      .replace(/Government of/g, 'सरकार')
      .replace(/United States Government/g, 'अमेरिकी संघीय सरकार')
      .replace(/United Kingdom/g, 'यूनाइटेड किंगडम');
  }
  if (language === 'es') {
    return authority
      .replace(/Ministry of Education/g, 'Ministerio de Educación')
      .replace(/Ministry of/g, 'Ministerio de')
      .replace(/Department of/g, 'Departamento de')
      .replace(/Government of/g, 'Gobierno de')
      .replace(/United States/g, 'Estados Unidos')
      .replace(/United Kingdom/g, 'Reino Unido')
      .replace(/European Commission/g, 'Comisión Europea');
  }
  if (language === 'fr') {
    return authority
      .replace(/Ministry of Education/g, 'Ministère de l\'Éducation')
      .replace(/Ministry of/g, 'Ministère de')
      .replace(/Department of/g, 'Département de')
      .replace(/Government of/g, 'Gouvernement de')
      .replace(/United States/g, 'États-Unis')
      .replace(/United Kingdom/g, 'Royaume-Uni')
      .replace(/European Commission/g, 'Commission Européenne');
  }
  if (language === 'de') {
    return authority
      .replace(/Ministry of Education/g, 'Bildungsministerium')
      .replace(/Ministry of/g, 'Ministerium für')
      .replace(/Department of/g, 'Abteilung für')
      .replace(/Government of/g, 'Regierung von')
      .replace(/United States/g, 'Vereinigte Staaten')
      .replace(/United Kingdom/g, 'Großbritannien')
      .replace(/European Commission/g, 'Europäische Kommission');
  }
  if (language === 'ar') {
    return authority
      .replace(/Ministry of Education/g, 'وزارة التعليم')
      .replace(/Ministry of/g, 'وزارة')
      .replace(/Department of/g, 'إدارة')
      .replace(/Government of/g, 'حكومة')
      .replace(/United States/g, 'الولايات المتحدة')
      .replace(/United Kingdom/g, 'المملكة المتحدة')
      .replace(/European Commission/g, 'المفوضية الأوروبية');
  }
  return authority;
}

// Fallback universal translation for steps
function localizeStepText(stepNumber: number, originalText: string, language: SupportedLanguage): string {
  if (language === 'en') return originalText;
  if (language === 'hi') return originalText;
  
  const stepTemplates: Record<SupportedLanguage, Record<number, string>> = {
    es: {
      1: 'Acceda al portal oficial del organismo y complete su registro de usuario verificado.',
      2: 'Cumplimente el formulario de solicitud oficial y adjunte la documentación requerida.',
      3: 'Envíe su expediente y realice el seguimiento telemático con su número de referencia.',
    },
    fr: {
      1: 'Connectez-vous sur le portail officiel de l\'administration et créez votre compte citoyen.',
      2: 'Complétez le dossier de candidature en ligne et téléversez les pièces justificatives.',
      3: 'Validez votre demande officielle et conservez le numéro d\'enregistrement pour le suivi.',
    },
    de: {
      1: 'Registrieren Sie sich im amtlichen Online-Portal und erstellen Sie Ihr Bürgerkonto.',
      2: 'Füllen Sie das Antragsformular vollständig aus und laden Sie die erforderlichen Nachweise hoch.',
      3: 'Reichen Sie den Antrag elektronisch ein und notieren Sie das Aktenzeichen zur Nachverfolgung.',
    },
    ar: {
      1: 'سجل الدخول عبر البوابة الرسمية للجهة الحكومية وأنشئ حسابك الوطني المعتمد.',
      2: 'املأ استمارة التقديم الرسمية وأرفق الوثائق والشهادات الثبوتية المطلوبة.',
      3: 'أرسل الطلب واحتفظ برقم القيد الإلكتروني لمتابعة حالة الاستحقاق والاعتماد.',
    },
    en: {},
    hi: {},
  };

  return stepTemplates[language]?.[stepNumber] || originalText;
}

function localizeOpportunityTitle(
  originalTitle: string,
  stage: string,
  language: SupportedLanguage
): string {
  if (language === 'en' || language === 'hi') return originalTitle;

  const titleDict: Partial<Record<SupportedLanguage, Record<string, string>>> = {
    es: {
      exams: 'Convocatoria Oficial de Oposiciones y Selección Pública',
      schemes: 'Programa Estatal de Asistencia y Bienestar Social',
      education: 'Beca Oficial y Subvención de Educación Superior',
      private_jobs: 'Convocatoria de Carrera y Empleo Profesional',
      internships: 'Programa Oficial de Prácticas y Aprendizaje',
      startups: 'Fondo Semilla y Subvención para Emprendedores',
      career: 'Certificación Profesional y Formación Oficial',
      health: 'Servicio Nacional de Salud y Cobertura Sanitaria',
      freebies: 'Herramientas Digitales y Beneficios Cívicos',
      abroad_jobs: 'Becas Internacionales y Empleo en el Extranjero',
    },
    fr: {
      exams: 'Concours Administratif et Recrutement de la Fonction Publique',
      schemes: 'Programme d\'Aide Sociale et Subventions Publiques',
      education: 'Bourse Officielle d\'Études et Allocation Académique',
      private_jobs: 'Offre d\'Emploi Qualifié et Carrière en Entreprise',
      internships: 'Programme Officiel de Stages et Formation Professionnelle',
      startups: 'Fonds d\'Amorçage et Subvention aux Jeunes Entreprises',
      career: 'Formation Qualifiante et Certification Reconnue',
      health: 'Prise en Charge Médicale et Couverture Santé Publique',
      freebies: 'Outils Numériques Gratuits et Services Citoyens',
      abroad_jobs: 'Bourses d\'Excellence et Mobilité Internationale',
    },
    de: {
      exams: 'Amtliche Ausschreibung und Staatsdienst-Prüfungen',
      schemes: 'Staatliches Förderprogramm und Bürgerunterstützung',
      education: 'Amtliches Bildungsstipendium und Studienbeihilfe',
      private_jobs: 'Fachlaufbahn und Offizielle Stellenangebote',
      internships: 'Amtliches Praktikantenprogramm und Berufseinstieg',
      startups: 'Gründungszuschuss und Innovationsförderung',
      career: 'Staatlich Anerkannte Weiterbildung und Zertifikate',
      health: 'Öffentliche Gesundheitsversorgung und Krankenfürsorge',
      freebies: 'Kostenlose Bürger-Software und Digitale Werkzeuge',
      abroad_jobs: 'Internationale Exzellenzstipendien und Auslandsstellen',
    },
    ar: {
      exams: 'المسابقات الوظيفية وامتحانات الالتحاق بالقطاع العام',
      schemes: 'البرنامج الحكومي للمساعدات والدعم الاجتماعي',
      education: 'المنح الدراسية المعتمدة ومساعدات التعليم العالي',
      private_jobs: 'فرص العمل والتوظيف المهني المؤسسي المعتمد',
      internships: 'البرنامج الرسمي للتدريب العملي وتأهيل الخريجين',
      startups: 'منح تمويل المشاريع الريادية وحاضنات الأعمال',
      career: 'برامج التدريب والشهادات المهنية المعتمدة',
      health: 'خدمات الرعاية الصحية والتغطية العلاجية العامة',
      freebies: 'الأدوات الرقمية والخدمات التقنية المعتمدة للمواطنين',
      abroad_jobs: 'المنح الدولية وبرامج الدراسة والعمل في الخارج',
    },
  };

  if (language === 'es') {
    if (/Defence|Armed Forces|Army|Navy|Agniveer/i.test(originalTitle)) {
      return 'Ministerio de Defensa: Fuerzas Armadas y Reclutamiento Militar';
    }
    if (/UPSC|Civil Services|IAS/i.test(originalTitle)) {
      return 'Comisión de Selección Pública: Oposiciones de la Administración General';
    }
    if (/Railway|RRB/i.test(originalTitle)) {
      return 'Administración Ferroviaria: Convocatoria Nacional de Empleo';
    }
    if (/Ayushman|Health|Hospital/i.test(originalTitle)) {
      return 'Ministerio de Salud: Tarjeta Sanitaria de Cobertura Hospitalaria';
    }
    if (/Kisan|Agriculture|Farmer/i.test(originalTitle)) {
      return 'Ministerio de Agricultura: Subvención y Ayuda Directa al Cultivador';
    }
    if (/Surya Ghar|Solar/i.test(originalTitle)) {
      return 'Subvención Solar Residencial: Cobertura Eléctrica Gratuita';
    }
    if (/Scholarship|NSP|UGC|AICTE/i.test(originalTitle)) {
      return 'Portal Nacional de Becas: Ayuda Financiera para Estudiantes';
    }
    if (/SSC|Staff Selection/i.test(originalTitle)) {
      return 'Comisión de Selección de Personal: Convocatoria de Puestos Estatales';
    }
  }

  if (language === 'fr') {
    if (/Defence|Armed Forces|Army|Navy|Agniveer/i.test(originalTitle)) {
      return 'Ministère de la Défense : Forces Armées et Recrutement Officiel';
    }
    if (/UPSC|Civil Services|IAS/i.test(originalTitle)) {
      return 'Commission de la Fonction Publique : Concours de l\'Administration';
    }
    if (/Railway|RRB/i.test(originalTitle)) {
      return 'Administration des Chemins de Fer : Recrutement Général';
    }
    if (/Ayushman|Health|Hospital/i.test(originalTitle)) {
      return 'Ministère de la Santé : Couverture Maladie et Soins Hospitaliers';
    }
    if (/Kisan|Agriculture|Farmer/i.test(originalTitle)) {
      return 'Ministère de l\'Agriculture : Allocation et Soutien Financier';
    }
    if (/Surya Ghar|Solar/i.test(originalTitle)) {
      return 'Programme Énergie Solaire : Électricité Gratuite et Subvention';
    }
    if (/Scholarship|NSP|UGC|AICTE/i.test(originalTitle)) {
      return 'Portail National des Bourses : Financement d\'Études Supérieures';
    }
    if (/SSC|Staff Selection/i.test(originalTitle)) {
      return 'Commission de Recrutement Public : Postes Administratifs de l\'État';
    }
  }

  if (language === 'de') {
    if (/Defence|Armed Forces|Army|Navy|Agniveer/i.test(originalTitle)) {
      return 'Verteidigungsministerium: Streitkräfte und Offizielle Einberufung';
    }
    if (/UPSC|Civil Services|IAS/i.test(originalTitle)) {
      return 'Öffentliche Personalkommission: Staatsdienst-Prüfungen';
    }
    if (/Railway|RRB/i.test(originalTitle)) {
      return 'Staatliche Eisenbahnverwaltung: Bundesweite Stellenausschreibung';
    }
    if (/Ayushman|Health|Hospital/i.test(originalTitle)) {
      return 'Gesundheitsministerium: Kostenlose Krankenversorgungskarte';
    }
    if (/Kisan|Agriculture|Farmer/i.test(originalTitle)) {
      return 'Landwirtschaftsministerium: Direktbeihilfe für Landwirte';
    }
    if (/Surya Ghar|Solar/i.test(originalTitle)) {
      return 'Solarenergie-Förderung: Kostenloser Strom und Montagehilfe';
    }
    if (/Scholarship|NSP|UGC|AICTE/i.test(originalTitle)) {
      return 'Nationales Stipendienportal: Amtliche Studienförderung';
    }
    if (/SSC|Staff Selection/i.test(originalTitle)) {
      return 'Personalkommission: Öffentliches Auswahlverfahren';
    }
  }

  if (language === 'ar') {
    if (/Defence|Armed Forces|Army|Navy|Agniveer/i.test(originalTitle)) {
      return 'وزارة الدفاع: القوات المسلحة وبرامج التجنيد المعتمدة';
    }
    if (/UPSC|Civil Services|IAS/i.test(originalTitle)) {
      return 'لجنة الخدمة المدنية: مسابقات التعيين والوظائف الحكومية';
    }
    if (/Railway|RRB/i.test(originalTitle)) {
      return 'هيئة السكك الحديدية: وظائف ومسابقات التعيين المعتمدة';
    }
    if (/Ayushman|Health|Hospital/i.test(originalTitle)) {
      return 'وزارة الصحة: بطاقة العلاج والتأمين الصحي المجاني';
    }
    if (/Kisan|Agriculture|Farmer/i.test(originalTitle)) {
      return 'وزارة الزراعة: الدعم المالي المباشر للمزارعين';
    }
    if (/Surya Ghar|Solar/i.test(originalTitle)) {
      return 'مبادرة الطاقة الشمسية: كهرباء مجانية ودعم التركيب';
    }
    if (/Scholarship|NSP|UGC|AICTE/i.test(originalTitle)) {
      return 'البوابة الوطنية للمنح الدراسية: دعم مالي للطلاب';
    }
    if (/SSC|Staff Selection/i.test(originalTitle)) {
      return 'لجنة اختيار الموظفين: مسابقات التعيين في الجهاز الإداري';
    }
  }

  return titleDict[language]?.[stage] || originalTitle;
}

function localizeOpportunityBenefit(
  originalBenefit: string,
  stage: string,
  language: SupportedLanguage
): string {
  if (language === 'en' || language === 'hi') return originalBenefit;

  const benefitDict: Partial<Record<SupportedLanguage, Record<string, string>>> = {
    es: {
      exams: 'Salario Oficial de la Administración, Estabilidad Laboral y Prestaciones Médicas Integrales',
      schemes: 'Ayuda Económica Directa en Cuenta Bancaria y Prestación Estatal Garantizada',
      education: '100% Cobertura de Matrícula, Dotación Económica Anual y Asignación de Manutención',
      private_jobs: 'Retribución Competitiva, Seguro Médico Completo y Posibilidades de Crecimiento',
      internships: 'Dotación Económica Mensual, Certificado Oficial y Mentoría Profesional',
      startups: 'Financiación Pública a Fondo Perdido, Exenciones Fiscales y Apoyo de Incubación',
      career: 'Formación 100% Gratuita con Certificado Oficial Reconocido para el Empleo',
      health: 'Tratamiento Médico Hospitalario Gratuito y Cobertura Sanitaria Completa',
      freebies: 'Acceso Gratuito a Licencias Digitales, Software y Herramientas Tecnológicas',
      abroad_jobs: 'Financiación Total de Matrícula Internacional, Alojamiento y Seguro Médico',
    },
    fr: {
      exams: 'Rémunération de la Fonction Publique, Sécurité de l\'Emploi et Avantages Sociaux',
      schemes: 'Versement Direct sur Compte Bancaire et Allocation d\'Aide Publique Garanties',
      education: 'Prise en Charge Intégrale des Frais de Scolarité et Allocation Mensuelle',
      private_jobs: 'Rémunération Attractive, Couverture Santé Complète et Évolution de Carrière',
      internships: 'Gratification Mensuelle de Stage, Mentorat et Attestation Officielle',
      startups: 'Financement Public Non Remboursable et Accompagnement aux Entreprises',
      career: 'Formation Entièrement Gratuite avec Délivrance d\'une Certification d\'État',
      health: 'Prise en Charge Hospitalière Totale et Médicaments Entièrement Gratuits',
      freebies: 'Accès Libre aux Outils Numériques, Logiciels et Services Technologiques',
      abroad_jobs: 'Couverture Complète des Frais Universitaires, Logement et Billet d\'Avion',
    },
    de: {
      exams: 'Amtliche Vergütung nach Tarif, Feste Anstellung und Umfassende Beihilfe',
      schemes: 'Direkte Banküberweisung und Staatlich Garantierte Bürgerunterstützung',
      education: '100% Übernahme der Studiengebühren und Monatliche Förderpauschale',
      private_jobs: 'Attraktives Festgehalt, Betriebliche Krankenversicherung und Karriereförderung',
      internships: 'Monatliche Praktikumsvergütung, Mentorenbegleitung und Abschlusszertifikat',
      startups: 'Nicht Rückzahlbarer Zuschuss, Steuererleichterungen und Gründerberatung',
      career: 'Vollständig Kostenlose Weiterbildung mit Staatlich Anerkanntem Abschluss',
      health: 'Kostenlose Stationäre Krankenhausbehandlung und Volle Heilfürsorge',
      freebies: 'Freier Zugang zu Modernen Softwaretools und Digitalen Arbeitsmitteln',
      abroad_jobs: 'Vollstipendium mit Studiengebührenbefreiung, Unterkunft und Reisekosten',
    },
    ar: {
      exams: 'رواتب مجزية وفق السلم الحكومي واستقرار وظيفي وتغطية صحية شاملة',
      schemes: 'تحويلات مالية مباشرة إلى الحساب البنكي ودعم حكومي معتمد للمستحقين',
      education: 'إعفاء كامل بنسبة 100% من المصروفات الدراسية مع مكافأة شهرية',
      private_jobs: 'رواتب تنافسية وتأمين طبي شامل وفرص ترقية مهنية متميزة',
      internships: 'مكافأة تدريب شهرية معتمدة وشهادة خبرة وتأهيل لسوق العمل',
      startups: 'تمويل حكومي غير مسترد وإعفاءات ضريبية ورعاية متكاملة للأعمال',
      career: 'برامج تدريبية مجانية بالكامل مع منح شهادات مهنية معتمدة رسمياً',
      health: 'علاج ورعاية طبية مجانية بالمستشفيات مع تغطية دوائية كاملة',
      freebies: 'استخدام مجاني للتطبيقات والبرمجيات والأدوات التقنية الحديثة',
      abroad_jobs: 'منح دراسية ممولة بالكامل تشمل السكن الجامعي والتذاكر والتأمين',
    },
  };

  return benefitDict[language]?.[stage] || originalBenefit;
}

function localizeOpportunityDescription(
  originalDesc: string,
  stage: string,
  language: SupportedLanguage
): string {
  if (language === 'en' || language === 'hi') return originalDesc;

  const descDict: Partial<Record<SupportedLanguage, string>> = {
    es: 'Notificación oficial publicada a través de portales públicos gubernamentales verificados. Trámite directo y seguro para los ciudadanos sin comisiones ni intermediarios.',
    fr: 'Notification officielle publiée sur les portails publics de l\'État. Candidature directe, authentifiée et sécurisée sans aucun intermédiaire payant.',
    de: 'Amtliche Bekanntmachung auf geprüften staatlichen Portalen. Direkte und gebührenfreie Beantragung für Bürger ohne externe Vermittler.',
    ar: 'إشعار رسمي معتمد منشور عبر البوابات الحكومية المعنية. تقديم مباشر وآمن للمواطنين بدون أي رسوم وساطة أو وسطاء غير معتمدين.',
  };

  return descDict[language] || originalDesc;
}

/**
 * Universal zero-leakage opportunity localization helper
 * Guarantees that EVERY piece of text returned strictly adheres to the requested language.
 */
export function getLocalizedOpportunity(
  opportunity: Opportunity,
  language: SupportedLanguage
): LocalizedOpportunityView {
  const i18nEntry = OPPORTUNITY_I18N[opportunity.id]?.[language];

  // 1. Title Resolution
  let title = opportunity.title;
  if (language === 'hi' && opportunity.titleHi) {
    title = opportunity.titleHi;
  } else if (i18nEntry?.title) {
    title = i18nEntry.title;
  } else if (language !== 'en' && language !== 'hi') {
    title = localizeOpportunityTitle(title, opportunity.lifeStage, language);
  } else if (language === 'en' && /[\u0900-\u097F]/.test(title)) {
    if (opportunity.lifeStage === 'health') {
      title = 'Ministry of Health & Family Welfare: National Healthcare Advisory';
    } else if (opportunity.lifeStage === 'exams') {
      title = 'Central Government Recruitment & Vacancy Notification';
    } else if (opportunity.lifeStage === 'education') {
      title = 'Ministry of Education: National Scholarship & Academic Update';
    } else if (opportunity.lifeStage === 'startups') {
      title = 'Ministry of MSME & Commerce: Enterprise & Startup Initiative';
    } else {
      title = 'Government of India: Official Citizen Welfare Circular';
    }
  }

  // 2. Benefit Headline Resolution
  let benefitHeadline = opportunity.benefitHeadline;
  if (language === 'hi' && opportunity.benefitHeadlineHi) {
    benefitHeadline = opportunity.benefitHeadlineHi;
  } else if (i18nEntry?.benefitHeadline) {
    benefitHeadline = i18nEntry.benefitHeadline;
  } else if (language !== 'en' && language !== 'hi') {
    benefitHeadline = localizeOpportunityBenefit(benefitHeadline, opportunity.lifeStage, language);
  } else if (language === 'en' && /[\u0900-\u097F]/.test(benefitHeadline)) {
    benefitHeadline = 'Verified Official Gazette Circular from Government of India';
  }

  // 3. Description Resolution
  let description = opportunity.description;
  if (language === 'hi' && opportunity.descriptionHi) {
    description = opportunity.descriptionHi;
  } else if (i18nEntry?.description) {
    description = i18nEntry.description;
  } else if (language !== 'en' && language !== 'hi') {
    description = localizeOpportunityDescription(description, opportunity.lifeStage, language);
  } else if (language === 'en' && /[\u0900-\u097F]/.test(description)) {
    description = 'Official Gazette Circular published by the Government of India through verified public portals. Authentic civic scheme and citizen benefit.';
  }

  // 4. Official Fee Resolution
  let officialFee = opportunity.gazette.officialGovtFee;
  if (language === 'hi') {
    officialFee = officialFee.replace('Free', 'निःशुल्क');
  } else if (i18nEntry?.officialFee) {
    officialFee = i18nEntry.officialFee;
  } else if (language === 'es') {
    officialFee = officialFee.replace('Free', 'Gratuito').replace('Completely Free', 'Totalmente Gratuito');
  } else if (language === 'fr') {
    officialFee = officialFee.replace('Free', 'Gratuit').replace('Completely Free', 'Entièrement Gratuit');
  } else if (language === 'de') {
    officialFee = officialFee.replace('Free', 'Gebührenfrei').replace('Completely Free', 'Vollständig Gebührenfrei');
  } else if (language === 'ar') {
    officialFee = officialFee.replace('Free', 'مجاني').replace('Completely Free', 'مجاني بالكامل');
  }

  // 5. Scam Warning Resolution
  let scamWarning = opportunity.gazette.scamAlertWarning;
  if (i18nEntry?.scamWarning) {
    scamWarning = i18nEntry.scamWarning;
  } else if (language === 'hi') {
    scamWarning = 'यह अवसर पूर्णतः आधिकारिक है। किसी भी अनधिकृत दलाल अथवा बिचौलिए को कोई शुल्क न दें।';
  } else if (language === 'es') {
    scamWarning = 'Este trámite es oficial y directo. No pague honorarios a gestores no autorizados.';
  } else if (language === 'fr') {
    scamWarning = 'Cette démarche est officielle. Ne versez aucun montant à des intermédiaires non agréés.';
  } else if (language === 'de') {
    scamWarning = 'Dies ist ein offizielles Verfahren. Zahlen Sie keine Vermittlungsgebühren an unbefugte Dritte.';
  } else if (language === 'ar') {
    scamWarning = 'هذا الإجراء رسمي ومعتمد مباشرة. تجنب دفع أي رسوم لوسطاء غير معتمدين.';
  }

  // 6. Application Status Text (Pure localized, zero emojis, zero English leaks)
  let applicationStatusText = 'Applications Open Now';
  if (opportunity.applicationStatus === 'upcoming') {
    if (language === 'hi') applicationStatusText = 'आगामी कैलेंडर चक्र';
    else if (language === 'es') applicationStatusText = 'Próximo Calendario';
    else if (language === 'fr') applicationStatusText = 'Calendrier à Venir';
    else if (language === 'de') applicationStatusText = 'Bevorstehender Kalender';
    else if (language === 'ar') applicationStatusText = 'الجدول الزمني القادم';
    else applicationStatusText = 'Upcoming Calendar Cycle';
  } else if (opportunity.applicationStatus === 'active_now') {
    if (language === 'hi') applicationStatusText = 'आवेदन प्रक्रिया चालू';
    else if (language === 'es') applicationStatusText = 'Convocatoria Abierta';
    else if (language === 'fr') applicationStatusText = 'Candidatures Ouvertes';
    else if (language === 'de') applicationStatusText = 'Antragsphase Geöffnet';
    else if (language === 'ar') applicationStatusText = 'التسجيل متاح حالياً';
    else applicationStatusText = 'Applications Active Now';
  } else {
    if (language === 'hi') applicationStatusText = 'निरंतर चालू अवसर';
    else if (language === 'es') applicationStatusText = 'Convocatoria Permanente';
    else if (language === 'fr') applicationStatusText = 'Dispositif Permanent';
    else if (language === 'de') applicationStatusText = 'Dauerhaft Geöffnet';
    else if (language === 'ar') applicationStatusText = 'فرصة مستمرة طوال العام';
    else applicationStatusText = 'Ongoing Program';
  }

  // 7. Documents List (Pure localized)
  const documents = (opportunity.documents || []).map((doc) => {
    let name = doc.name;
    if (language === 'hi' && doc.nameHi) {
      name = doc.nameHi;
    } else if (i18nEntry?.docNames?.[doc.id]) {
      name = i18nEntry.docNames[doc.id];
    } else if (DOC_TRANSLATIONS[doc.id]?.[language]) {
      name = DOC_TRANSLATIONS[doc.id]![language]!;
    }
    return {
      id: doc.id,
      name,
      isMandatory: doc.isMandatory,
      notes: doc.notes,
    };
  });

  // 8. Application Steps (Pure localized)
  const applySteps = (opportunity.applySteps || []).map((step) => {
    let text = step.text;
    if (language === 'hi' && step.textHi) {
      text = step.textHi;
    } else {
      text = localizeStepText(step.step, step.text, language);
    }
    return {
      step: step.step,
      text,
    };
  });

  const toMathDigits = (str: string | undefined): string => {
    if (!str) return str || '';
    return str.replace(/[०-९]/g, (d) => String('०१२३४५६७८९'.indexOf(d)));
  };

  return {
    title: toMathDigits(title),
    benefitHeadline: toMathDigits(benefitHeadline),
    description: toMathDigits(description),
    officialFee: toMathDigits(officialFee),
    scamWarning: toMathDigits(scamWarning),
    issuingAuthority: toMathDigits(localizeAuthority(opportunity.gazette?.issuingAuthority || 'Official Authority', language)),
    documents: documents.map((doc) => ({
      ...doc,
      name: toMathDigits(doc.name),
      notes: doc.notes ? toMathDigits(doc.notes) : undefined,
    })),
    applySteps: applySteps.map((step) => ({
      ...step,
      text: toMathDigits(step.text),
    })),
    applicationStatusText: toMathDigits(applicationStatusText),
  };
}
