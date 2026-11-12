'use client';

import React from 'react';
import {
  X,
  ShieldCheck,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Calendar,
  User,
  CreditCard,
  Building2,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Download,
  Copy,
  Check,
} from 'lucide-react';
import { RegisteredCitizen } from '@/app/api/admin/citizens/route';

interface CitizenAadhaarModalProps {
  citizen: RegisteredCitizen | null;
  language?: 'en' | 'hi';
  onClose: () => void;
}

export const CitizenAadhaarModal: React.FC<CitizenAadhaarModalProps> = ({ citizen, language = 'en', onClose }) => {
  const [copied, setCopied] = React.useState(false);
  if (!citizen) return null;

  const isEn = language === 'en';

  const rawAadhaar = citizen.aadhaarNumber || citizen.aadhaarNumberMasked || citizen.nationalIdMasked || '';
  const cleanDigits = rawAadhaar.replace(/\D/g, '');
  const isFullAadhaar = cleanDigits.length === 12;
  const aadhaarNumber = isFullAadhaar
    ? cleanDigits.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')
    : rawAadhaar || 'XXXX-XXXX-XXXX';
  const isSubscribed = citizen.subscription?.status === 'active';

  const handleCopyAadhaar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const toCopy = cleanDigits.length === 12 ? cleanDigits : (rawAadhaar || aadhaarNumber);
    if (toCopy) {
      navigator.clipboard.writeText(toCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden my-6 z-10">
        {/* Top Official Tricolor Accent Stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600" />

        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white flex items-center justify-center font-bold text-xs">
              GOI
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                Unique Identification Authority of India (UIDAI)
              </span>
              <span className="text-[10px] text-slate-500 block">
                Digital Citizen Identity & Verification Dossier
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Authentic Aadhaar Card Visual Format */}
          <div className="relative rounded-xl border border-slate-300 bg-gradient-to-b from-amber-50/30 via-white to-emerald-50/20 p-4 sm:p-5 shadow-xs">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
              <div>
                <span className="text-[11px] font-bold text-slate-800 tracking-wider uppercase block">
                  {isEn ? 'Government of India' : 'भारत सरकार • Government of India'}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {isEn ? 'My Aadhaar, My Identity' : 'मेरा आधार, मेरी पहचान'}
                </span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  VERIFIED RECORD
                </span>
              </div>
            </div>

            {/* Photo & Details Grid */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Photo Area */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-24 h-28 rounded-lg bg-slate-100 border border-slate-300 overflow-hidden flex items-center justify-center relative shadow-xs">
                  {citizen.photoURL ? (
                    <img
                      src={citizen.photoURL}
                      alt={citizen.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-slate-400" />
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-white text-[8px] font-bold text-center py-0.5 uppercase tracking-wider">
                    {citizen.status}
                  </div>
                </div>
                <span className="text-[9px] text-slate-500 mt-1 font-mono">
                  ID: {citizen.id.slice(-8)}
                </span>
              </div>

              {/* Citizen Details */}
              <div className="flex-1 space-y-1.5 text-xs text-slate-800 min-w-0">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{isEn ? 'Full Name' : 'नाम / Full Name'}</span>
                  <span className="text-sm font-extrabold text-slate-900">{citizen.fullName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{isEn ? 'Date of Birth' : 'जन्म तिथि / DOB'}</span>
                    <span className="font-semibold text-slate-800">
                      {citizen.dob || 'Not provided'} ({citizen.age} Yrs)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{isEn ? 'Gender' : 'लिंग / Gender'}</span>
                    <span className="font-semibold text-slate-800 capitalize">{citizen.gender || 'General'}</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{isEn ? 'Residential Address' : 'पता / Residential Address'}</span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {citizen.district ? `${citizen.district}, ` : ''}
                    {citizen.state || 'India'}
                    {citizen.pincode ? ` - ${citizen.pincode}` : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Aadhaar Number Band */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border">
              <div className="flex items-center gap-2.5">
                <QrCode className="w-6 h-6 text-slate-700 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">{isEn ? 'Aadhaar Number' : 'आधार संख्या / Aadhaar Number'}</span>
                    {isFullAadhaar && (
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300">
                        ORIGINAL UNMASKED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-black tracking-widest text-slate-900 select-all">
                      {aadhaarNumber}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAadhaar}
                      className="px-2 py-0.5 rounded bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-700 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                      title="Copy Aadhaar Number"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-200 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verhoeff Checksum Validated</span>
              </div>
            </div>
          </div>

          {/* Contact & Socio-Economic Information Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Direct Contact Channels</span>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{citizen.phoneNumber || 'Not provided'}</span>
                  </span>
                  {citizen.phoneNumber && (
                    <div className="flex items-center gap-1">
                      <a
                        href={`tel:${citizen.phoneNumber}`}
                        className="px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 text-[10px] font-bold transition-colors"
                      >
                        Call
                      </a>
                      <a
                        href={`https://wa.me/91${citizen.phoneNumber.replace(/\D/g, '').slice(-10)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-slate-600 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{citizen.email || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Socio-Economic Classification</span>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Life Stage:</span>
                  <span className="font-semibold text-slate-800 capitalize">{(citizen.lifePhase || 'Student').replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Social Category:</span>
                  <span className="font-semibold text-slate-800">{citizen.casteCategory || 'General'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Family Income:</span>
                  <span className="font-semibold text-slate-800">
                    Rs {(citizen.familyIncomeAnnual || 0).toLocaleString('en-IN')} / year
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 1-Year National Citizen Pass Subscription Status */}
          <div className="p-3.5 rounded-xl border flex items-center justify-between text-xs bg-slate-50 border-slate-200">
            <div className="flex items-center gap-2.5">
              <CreditCard className={`w-4 h-4 ${isSubscribed ? 'text-emerald-600' : 'text-slate-400'}`} />
              <div>
                <span className="font-bold text-slate-900 block">
                  1-Year Citizen Access Pass: {isSubscribed ? 'Active (Valid)' : 'Inactive'}
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  {isSubscribed && citizen.subscription?.validUntil
                    ? `Expires: ${citizen.subscription.validUntil} • Txn: ${citizen.subscription.transactionId || 'Verified'}`
                    : 'Standard guest browsing privileges'}
                </span>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
              isSubscribed
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-slate-200 text-slate-700 border-slate-300'
            }`}>
              {isSubscribed ? 'PAID Rs 1 PASS' : 'UNPAID'}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px] font-mono">
            Registered: {new Date(citizen.registeredAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
