'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, ShieldCheck, PhoneCall, Star, FileText, FileCheck } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

export const Footer: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const languages: { code: 'en' | 'hi' | 'es' | 'fr' | 'de' | 'ar'; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ar', label: 'العربية' },
  ];

  return (
    <footer className="w-full bg-black text-zinc-400 text-xs border-t border-white/10 mt-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        
        {/* 1. Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Identity & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <Link href="/" className="cursor-pointer block hover:opacity-90 transition-opacity" aria-label="Citzos Home">
                <img
                  src="/logo-citzos.png"
                  alt="CITZOS"
                  width={140}
                  height={36}
                  className="h-8 sm:h-9 w-auto object-contain"
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {language === 'hi'
                ? 'नागरिकों, विद्यार्थियों, युवाओं एवं पेशेवरों के लिए सरकारों एवं मान्यता प्राप्त संस्थानों के प्रामाणिक अवसरों, योजनाओं व छात्रवृत्तियों का स्वतंत्र नागरिक-तकनीकी सूचना पोर्टल।'
                : language === 'es'
                ? 'Portal cívico independiente de información sobre becas, oportunidades laborales y subvenciones públicas oficiales para ciudadanos.'
                : language === 'fr'
                ? 'Portail civique indépendant d\'accès aux opportunités nationales, bourses d\'études et concours administratifs officiels.'
                : language === 'de'
                ? 'Unabhängiges Portal für amtliche Fördermittel, Bildungsstipendien und öffentliche Ausschreibungen für Bürger.'
                : language === 'ar'
                ? 'بوابة مدنية مستقلة للاطلاع على الفرص الحكومية والمنح الدراسية المعتمدة والخدمات العامة للمواطنين.'
                : 'Independent civic-tech portal providing verified national and global opportunities, scholarships, exams, and government schemes.'}
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'hi'
                  ? 'शून्य दलाली एवं सीधा आधिकारिक आवेदन'
                  : language === 'es'
                  ? 'Sin intermediarios ni costes de gestión'
                  : language === 'fr'
                  ? 'Sans intermédiaires • Dépôt direct officiel'
                  : language === 'de'
                  ? 'Ohne Vermittler • Direkter amtlicher Antrag'
                  : language === 'ar'
                  ? 'تقديم رسمي مباشر بدون أي وسطاء'
                  : 'Zero Middlemen • Direct Official Applications'}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'hi'
                ? 'त्वरित लिंक'
                : language === 'es'
                ? 'Enlaces Rápidos'
                : language === 'fr'
                ? 'Accès Rapide'
                : language === 'de'
                ? 'Direktlinks'
                : language === 'ar'
                ? 'روابط سريعة'
                : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>•</span>
                  <span>{t('tabs.schemes')}</span>
                </Link>
              </li>
              <li>
                <Link href="/helpline" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-red-400" />
                  <span>
                    {language === 'hi'
                      ? 'नागरिक हेल्पलाइन'
                      : language === 'es'
                      ? 'Líneas de Atención'
                      : language === 'fr'
                      ? 'Assistance Téléphonique'
                      : language === 'de'
                      ? 'Bürger-Hotlines'
                      : language === 'ar'
                      ? 'أرقام الطوارئ والمساعدة'
                      : 'Citizen Helplines'}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-400" />
                  <span>{t('subfilters.favorites')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'hi'
                ? 'कानूनी नीतियां'
                : language === 'es'
                ? 'Aviso Legal'
                : language === 'fr'
                ? 'Informations Légales'
                : language === 'de'
                ? 'Rechtliches'
                : language === 'ar'
                ? 'الشروط القانونية'
                : 'Legal & Policies'}
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>
                    {language === 'hi'
                      ? 'गोपनीयता नीति'
                      : language === 'es'
                      ? 'Política de Privacidad'
                      : language === 'fr'
                      ? 'Politique de Confidentialité'
                      : language === 'de'
                      ? 'Datenschutzerklärung'
                      : language === 'ar'
                      ? 'سياسة الخصوصية'
                      : 'Privacy Policy'}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <FileCheck className="w-3 h-3 text-emerald-400" />
                  <span>
                    {language === 'hi'
                      ? 'नियम एवं शर्तें'
                      : language === 'es'
                      ? 'Términos del Servicio'
                      : language === 'fr'
                      ? 'Conditions d\'Utilisation'
                      : language === 'de'
                      ? 'Nutzungsbedingungen'
                      : language === 'ar'
                      ? 'شروط الاستخدام'
                      : 'Terms of Service'}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-emerald-400" />
                  <span>
                    {language === 'hi'
                      ? 'रिफंड एवं रद्दीकरण नीति'
                      : language === 'es'
                      ? 'Reembolsos y Cancelaciones'
                      : language === 'fr'
                      ? 'Remboursement et Annulation'
                      : language === 'de'
                      ? 'Rückerstattung & Stornierung'
                      : language === 'ar'
                      ? 'سياسة الاسترداد والإلغاء'
                      : 'Refund & Cancellation'}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-emerald-400" />
                  <span>
                    {language === 'hi'
                      ? 'संपर्क एवं सहायता'
                      : language === 'es'
                      ? 'Contacto y Asistencia'
                      : language === 'fr'
                      ? 'Contact et Support'
                      : language === 'de'
                      ? 'Kontakt & Hilfe'
                      : language === 'ar'
                      ? 'الاتصال والدعم'
                      : 'Contact Us'}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Landmark className="w-3 h-3 text-amber-400" />
                  <span>
                    {language === 'hi'
                      ? 'आधिकारिक अस्वीकरण'
                      : language === 'es'
                      ? 'Descargo de Responsabilidad'
                      : language === 'fr'
                      ? 'Avertissement Légal'
                      : language === 'de'
                      ? 'Haftungsausschluss'
                      : language === 'ar'
                      ? 'إخلاء المسؤولية'
                      : 'Official Disclaimer'}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Mandatory Disclaimer Notice Bar */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-1">
          <strong className="text-white block font-bold">
            {language === 'hi'
              ? 'अनिवार्य गैर-सरकारी घोषणा एवं प्लेटफ़ॉर्म सूचना:'
              : language === 'es'
              ? 'Aviso Oficial de Plataforma No Gubernamental:'
              : language === 'fr'
              ? 'Déclaration Officielle de Non-Affiliation Publique :'
              : language === 'de'
              ? 'Hinweis auf Nicht-Staatliche Unabhängigkeit :'
              : language === 'ar'
              ? 'إقرار رسمي بعدم التبعية الحكومية المباشرة :'
              : 'Mandatory Independent Platform Notice:'}
          </strong>
          <p>
            {language === 'hi'
              ? 'Citzos एक स्वतंत्र निजी डिजिटल तकनीक मंच है और किसी भी सरकारी निकाय का प्रतिनिधित्व नहीं करता है। हम कोई भी सरकारी पहचान पत्र (जैसे आधार/पैन) जारी नहीं करते हैं और न ही किसी सरकारी योजना के लिए शुल्क लेते हैं। पोर्टल पर प्रदर्शित सभी सरकारी योजनाओं की जानकारी 100% निःशुल्क जनहित सूचना है। ₹1 का वार्षिक सदस्यता शुल्क केवल डिजिटल प्लेटफ़ॉर्म सॉफ़्टवेयर, सर्वर रख-रखाव एवं अवसर खोज इंजन के लिए है। आधिकारिक आवेदन केवल संबंधित विभागों के मूल पोर्टल पर ही करें।'
              : 'Citzos is an independent private digital technology platform providing opportunity discovery, eligibility matching, and civic information for all citizens (students, farmers, women, job seekers, startups, seniors). We are NOT an official government portal. We do NOT issue government identity cards (Aadhaar/PAN) or charge any fee for government schemes. All government scheme notifications are 100% free public awareness sourced from official government websites. The ₹1 annual pass is strictly towards digital software hosting, platform maintenance, and eligibility search software.'}
          </p>
        </div>

        {/* 3. Bottom Bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Citzos. {t('auth.verification_success')}.</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLanguage(l.code)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                  language === l.code
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-zinc-500 hover:text-white bg-slate-900'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <p>
            {language === 'hi' ? 'भारतीय एवं अंतरराष्ट्रीय नागरिकों के लिए समर्पित।' : 'Designed for national and global citizens.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
