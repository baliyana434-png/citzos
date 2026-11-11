'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, CheckCircle2, Award, ShieldCheck, Briefcase } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { DISCLAIMER_LOCALES } from '@/data/localization/legalPoliciesData';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export default function DisclaimerPage() {
  const { language } = useTranslation();
  const d = DISCLAIMER_LOCALES[language] || DISCLAIMER_LOCALES.en;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white antialiased flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#0c0d12] border-b border-slate-300 dark:border-white/18 shadow-sm citzos-header">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{d.backHome}</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity" aria-label="Citzos Home">
              <img src="/logo-citzos.png" alt="CITZOS" className="h-7 w-auto object-contain" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Page Hero */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-emerald-950 text-white shadow-xl border border-amber-500/30">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>{d.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            {d.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {d.subtitle}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
          
          {/* Bold Core Declaration */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-300/80 space-y-2">
            <h2 className="text-sm sm:text-base font-black text-amber-950 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>{d.coreDeclarationTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
              {d.coreDeclarationText}
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                1
              </span>
              <span>{d.sec1Title}</span>
            </h3>
            <p>{d.sec1Intro}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-medium text-xs">
              {d.sources.map((s, idx) => (
                <li key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{s.title} ({s.url})</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                2
              </span>
              <span>{d.sec2Title}</span>
            </h3>
            <p>{d.sec2Text}</p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                3
              </span>
              <span>{d.sec3Title}</span>
            </h3>
            <p>{d.sec3Text}</p>
          </section>

          {/* Section 4: Zero Direct Job Guarantee & Informational Discovery */}
          {d.sec4Title && (
            <section className="space-y-2 p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-300/80">
              <h3 className="text-base font-black text-amber-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-black">
                  4
                </span>
                <span>{d.sec4Title}</span>
              </h3>
              <p className="text-amber-900/90 leading-relaxed font-medium">{d.sec4Text}</p>
            </section>
          )}

          {/* Section 5: Comprehensive Skill Hub Certification Transparency & Authorized Issuance */}
          <section className="space-y-4 p-5 sm:p-6 rounded-2xl bg-sky-50/80 border-2 border-sky-300/90 text-slate-800">
            <h3 className="text-base sm:text-lg font-black text-sky-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-200 text-sky-900 flex items-center justify-center text-xs font-black shrink-0">
                5
              </span>
              <span>
                {language === 'hi'
                  ? 'कौशल प्रमाणन (Certificate) का पूर्ण सत्य व आधिकारिक प्रक्रिया'
                  : 'Skill Hub Certification Transparency & Authorized Issuance Process'}
              </span>
            </h3>

            {/* Point 1: Zero Dummy / Local Certificates */}
            <div className="p-3.5 rounded-xl bg-white border border-sky-200 space-y-1">
              <h4 className="font-bold text-sky-950 text-xs sm:text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0" />
                <span>
                  {language === 'hi'
                    ? '1. कोई स्थानीय या नकली प्रमाणपत्र नहीं (Zero Fake or In-House Dummy Certificates)'
                    : '1. Zero Fake or Auto-Generated In-House Certificates'}
                </span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {language === 'hi'
                  ? 'Citzos वीडियो पूरा होने पर कोई स्थानीय, डमी या कंप्यूटर-जनरेटेड पीडीएफ प्रमाणपत्र जारी नहीं करता है। बाजार में कई वेबसाइटें केवल वीडियो देखने पर डमी सर्टिफिकेट थमा देती हैं, जिसकी किसी भी इंडस्ट्री, कॉरपोरेट अथवा विदेशी वीजा में शून्य (0%) मान्यता होती है। Citzos ऐसा कोई काम-चलाऊ या अमान्य प्रमाणपत्र नहीं बनाता।'
                  : 'Citzos does not issue local, auto-generated, or in-house dummy PDF certificates upon video completion. Many online portals hand out synthetic certificates that hold 0% legal, industry, or visa accreditation. Citzos strictly refrains from producing unaccredited dummy certificates.'}
              </p>
            </div>

            {/* Point 2: Who Issues Real Certificates? */}
            <div className="p-3.5 rounded-xl bg-white border border-sky-200 space-y-2.5">
              <h4 className="font-bold text-sky-950 text-xs sm:text-sm flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === 'hi'
                    ? '2. जिन कौशलों में प्रमाणपत्र मिलता है, वे कौन देता है?'
                    : '2. Who Issues Legitimate & Globally Recognized Certificates?'}
                </span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {language === 'hi'
                  ? 'जिन कौशलों (Skills) में वास्तविक प्रमाणपत्र प्रदान किया जाता है, वे विश्वस्तरीय एवं सरकारी मान्यता प्राप्त प्राधिकृत संस्थाओं द्वारा औपचारिक परीक्षा अथवा मूल्यांकन के आधार पर ही जारी किए जाते हैं:'
                  : 'Where certificates are offered, they are awarded exclusively by authorized global institutions, government bodies, and official industry leaders following standard evaluations:'}
              </p>

              {/* Authority Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-[11px] sm:text-xs">
                  <thead className="bg-sky-100/70 text-sky-950 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2 sm:p-2.5">{language === 'hi' ? 'कौशल / विषय' : 'Skill / Subject'}</th>
                      <th className="p-2 sm:p-2.5">{language === 'hi' ? 'प्रमाणपत्र प्रदाता' : 'Issuing Body'}</th>
                      <th className="p-2 sm:p-2.5 hidden sm:table-cell">{language === 'hi' ? 'आधिकारिक मान्यता / स्तर' : 'Accreditation / Scope'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-2 sm:p-2.5 font-bold">German Language</td>
                      <td className="p-2 sm:p-2.5 font-semibold text-emerald-800">Goethe-Institut / Max Mueller Bhavan</td>
                      <td className="p-2 sm:p-2.5 text-slate-600 hidden sm:table-cell">Germany Official Language Institute (Global Visa Valid)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-2 sm:p-2.5 font-bold">Japanese Language</td>
                      <td className="p-2 sm:p-2.5 font-semibold text-emerald-800">The Japan Foundation &amp; JEES</td>
                      <td className="p-2 sm:p-2.5 text-slate-600 hidden sm:table-cell">Official JLPT Exam Authority (Global Working Visa)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-2 sm:p-2.5 font-bold">French Language</td>
                      <td className="p-2 sm:p-2.5 font-semibold text-emerald-800">France Éducation international</td>
                      <td className="p-2 sm:p-2.5 text-slate-600 hidden sm:table-cell">Ministry of National Education, France (DELF/DALF)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-2 sm:p-2.5 font-bold">English &amp; IELTS</td>
                      <td className="p-2 sm:p-2.5 font-semibold text-emerald-800">British Council / IDP / Cambridge</td>
                      <td className="p-2 sm:p-2.5 text-slate-600 hidden sm:table-cell">Official IELTS Global Certification</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-2 sm:p-2.5 font-bold">Digital Marketing &amp; SEO</td>
                      <td className="p-2 sm:p-2.5 font-semibold text-emerald-800">Google (Google Skillshop)</td>
                      <td className="p-2 sm:p-2.5 text-slate-600 hidden sm:table-cell">Official Online Test &amp; Free Verified Certificate by Google</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-2 sm:p-2.5 font-bold">Meta Ads (FB/Insta)</td>
                      <td className="p-2 sm:p-2.5 font-semibold text-emerald-800">Meta (Meta Blueprint)</td>
                      <td className="p-2 sm:p-2.5 text-slate-600 hidden sm:table-cell">Certified Media Buying Professional</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-2 sm:p-2.5 font-bold">Share Market &amp; Research</td>
                      <td className="p-2 sm:p-2.5 font-semibold text-emerald-800">SEBI / NISM</td>
                      <td className="p-2 sm:p-2.5 text-slate-600 hidden sm:table-cell">National Institute of Securities Markets (Govt Mandated)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-2 sm:p-2.5 font-bold">Accounting &amp; GST</td>
                      <td className="p-2 sm:p-2.5 font-semibold text-emerald-800">Tally Education</td>
                      <td className="p-2 sm:p-2.5 text-slate-600 hidden sm:table-cell">Tally Solutions Official Certified Professional</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-2 sm:p-2.5 font-bold">Healthcare &amp; First Aid</td>
                      <td className="p-2 sm:p-2.5 font-semibold text-emerald-800">Indian Red Cross / Skill India</td>
                      <td className="p-2 sm:p-2.5 text-slate-600 hidden sm:table-cell">Healthcare Sector Skill Council (HSSC - Govt of India)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Point 3: Platform Role of Citzos */}
            <div className="p-3.5 rounded-xl bg-white border border-sky-200 space-y-1">
              <h4 className="font-bold text-sky-950 text-xs sm:text-sm flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-sky-700 shrink-0" />
                <span>
                  {language === 'hi'
                    ? '3. Citzos का प्लेटफ़ॉर्म पर क्या रोल है?'
                    : '3. What is the Exact Role of Citzos?'}
                </span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {language === 'hi'
                  ? 'निःशुल्क शिक्षण एवं रोडमैप: Citzos शिक्षार्थी को बिना किसी भारी कोचिंग फीस के संपूर्ण व्यवस्थित पाठ्यक्रम और शीर्ष विशेषज्ञों की वीडियो मास्टरक्लास उपलब्ध कराता है। जब शिक्षार्थी तैयारी पूरी कर लेता है, तो Citzos उसे उस विषय की आधिकारिक प्राधिकृत संस्था के पोर्टल का सीधा लिंक (Direct Official Link) प्रदान करता है जहाँ शिक्षार्थी स्वयं आधिकारिक परीक्षा या सर्टिफिकेशन हेतु आवेदन कर सकता है।'
                  : 'Free Curated Learning & Roadmaps: Citzos provides structured curricula and handpicked expert masterclasses so learners master valuable skills without paying expensive coaching fees. Once prepared, Citzos provides direct official registration URLs so learners can apply directly with authorized examination bodies.'}
              </p>
            </div>

            {/* Point 4: Portfolio-Based Skills */}
            <div className="p-3.5 rounded-xl bg-white border border-sky-200 space-y-1">
              <h4 className="font-bold text-sky-950 text-xs sm:text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === 'hi'
                    ? '4. जिन विषयों में प्रमाणपत्र नहीं मिलता, उनका क्या लॉजिक है?'
                    : '4. Why Some Practical Skills Do Not Have Paper Certificates?'}
                </span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {language === 'hi'
                  ? 'फ्रीलांस वीडियो एडिटिंग, यूट्यूब थंबनेल डिजाइन, स्ट्रीट फोटोग्राफी, अथवा कोडिंग प्रोजेक्ट्स जैसे रचनात्मक और तकनीकी क्षेत्रों में कोई भी क्लाइंट या नियोक्ता कागज का प्रमाणपत्र नहीं मांगता, बल्कि आपका काम और पोर्टफोलियो (Work Samples) देखता है। इन विषयों का उद्देश्य सीधा व्यावहारिक हुनर सीखकर ग्राहकों से आय अर्जित करना है।'
                  : 'In practical and creative domains like Freelance Video Editing, YouTube Thumbnail Creation, Street Photography, or Coding, clients and employers evaluate real portfolios and work samples rather than paper certificates. The objective of these modules is hands-on mastery and immediate earning readiness.'}
              </p>
            </div>
          </section>

          {/* Official Helplines Link */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-emerald-950">{d.helplineTitle}</p>
              <p className="text-emerald-800 mt-0.5">{d.helplineSub}</p>
            </div>
            <Link
              href="/helpline"
              className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shrink-0 transition-colors shadow-2xs"
            >
              {d.helplineBtn}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
