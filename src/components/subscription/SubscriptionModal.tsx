'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Calendar, 
  Download, 
  Copy, 
  Check, 
  Clock, 
  Smartphone,
  ExternalLink,
  Award
} from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { useCountry } from '@/context/CountryContext';
import { CitizenSubscription } from '@/types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  citizenName: string;
  citizenId: string;
  citizenEmail?: string;
  citizenPhone?: string;
  onSubscriptionSuccess: (sub: CitizenSubscription) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  citizenName,
  citizenId,
  citizenEmail,
  citizenPhone,
  onSubscriptionSuccess,
}) => {
  const { language } = useTranslation();
  const { country, countryMeta } = useCountry();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [successReceipt, setSuccessReceipt] = useState<CitizenSubscription | null>(null);
  const [copiedTxn, setCopiedTxn] = useState(false);

  // Auto-launch Razorpay immediately when opened!
  useEffect(() => {
    if (isOpen && !successReceipt) {
      setPaymentError(null);
      handlePayment();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Plan pricing
  const planAmount = 1;
  const currencyCode = 'INR';
  const currencySymbol = '₹';

  // Calculate validity (365 days from now)
  const now = new Date();
  const validUntilDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
  const validUntilStr = validUntilDate.toISOString().split('T')[0];

  // Load Razorpay Standard Checkout Script dynamically
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if ((window as any).Razorpay) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (preferredMethod?: 'upi' | 'card' | 'netbanking') => {
    setIsProcessing(true);
    setPaymentError(null);
    try {
      // 1. Create server-locked order
      const orderRes = await fetch('/api/subscription/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ citizenId }),
      });
      const orderData = await orderRes.json();
      if (!orderData.success) {
        throw new Error(orderData.message || 'Order creation failed');
      }

      // 2. If Razorpay Key is configured, launch official Razorpay Checkout popup
      if (orderData.keyId && orderData.keyId.startsWith('rzp_')) {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          throw new Error('Razorpay SDK load nahi ho saka. Kripya internet connection check karein.');
        }

        const options: any = {
          key: orderData.keyId,
          amount: orderData.order.amountPaisa || orderData.order.amount * 100,
          currency: orderData.order.currency || 'INR',
          name: 'Citzos',
          description: '1-Year Citzos Universal Platform Access Pass (365 Days)',
          image: typeof window !== 'undefined' && window.location.origin ? `${window.location.origin}/logo-razorpay.png` : 'https://www.citzos.in/logo-razorpay.png',
          order_id: orderData.order.orderId,
          prefill: {
            name: citizenName,
            email: citizenEmail || '',
            contact: citizenPhone || '',
          },
          notes: {
            citizenId,
            plan: '1_year_universal_platform_pass',
            product: 'Citzos Digital Technology Platform Access Pass',
            purpose: 'Universal Digital Software Maintenance and Eligibility Matching Service for Citizens',
            non_government_service: 'true',
          },
          theme: {
            color: '#059669', // Emerald 600
            backdrop_color: 'rgba(15, 23, 42, 0.85)',
          },
          handler: async function (response: any) {
            try {
              // 3. Cryptographically verify signature on server
              const verifyRes = await fetch('/api/subscription/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  citizenId,
                  orderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  paymentToken: response.razorpay_payment_id,
                  paymentMethod: preferredMethod ? `RAZORPAY_${preferredMethod.toUpperCase()}` : 'RAZORPAY_ALL_METHODS',
                }),
              });
              const verifyData = await verifyRes.json();
              if (!verifyData.success || !verifyData.subscription) {
                throw new Error(verifyData.message || 'Payment signature verification failed');
              }

              setSuccessReceipt(verifyData.subscription);
              onSubscriptionSuccess(verifyData.subscription);
            } catch (verErr: any) {
              console.error('Razorpay verification error:', verErr);
              setPaymentError(verErr.message || 'Payment verification failed');
            } finally {
              setIsProcessing(false);
            }
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.on('payment.failed', function (resp: any) {
          console.error('Payment failed:', resp.error);
          setIsProcessing(false);
          const desc = resp.error?.description || resp.error?.reason || (language === 'hi' ? 'भुगतान पूर्ण नहीं हो सका।' : 'Payment could not be completed.');
          const code = resp.error?.code ? ` [${resp.error.code}]` : '';
          setPaymentError(`${desc}${code}`);
        });
        razorpayInstance.open();
        return;
      }

      // 3. Fallback Test Mode (when Razorpay keys are not yet pasted in .env.local)
      const simPaymentToken = 'SIM_TOKEN_' + orderData.order.orderId + '_' + Date.now();
      const verifyRes = await fetch('/api/subscription/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          citizenId,
          orderId: orderData.order.orderId,
          paymentToken: simPaymentToken,
          paymentMethod: 'TEST_MODE',
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success || !verifyData.subscription) {
        throw new Error(verifyData.message || 'Verification failed');
      }

      setSuccessReceipt(verifyData.subscription);
      onSubscriptionSuccess(verifyData.subscription);
    } catch (err: any) {
      console.error('Payment process error:', err);
      setPaymentError(err.message || (language === 'hi' ? 'भुगतान प्रक्रिया में त्रुटि आई।' : 'Payment error occurred.'));
    } finally {
      setIsProcessing(false);
    }
  };

  const copyTransactionId = (txn: string) => {
    navigator.clipboard.writeText(txn);
    setCopiedTxn(true);
    setTimeout(() => setCopiedTxn(false), 2000);
  };

  // If payment succeeded, show the Official Digital Receipt
  if (successReceipt) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto p-5 sm:p-6 space-y-4">
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <div className="flex justify-center mb-1">
              <img src="/logo-citzos.png" alt="CITZOS" className="h-8 w-auto object-contain mx-auto drop-shadow-xs" />
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-md">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <h4 className="text-base font-extrabold text-emerald-950">
              {language === 'hi' ? 'Citzos Universal Platform Pass सक्रिय हो गया!' : '1-Year Citzos Universal Platform Pass Activated!'}
            </h4>
            <p className="text-xs text-emerald-800">
              {language === 'hi' ? 'सभी नागरिकों (छात्र, किसान, महिलाएं, युवा, उद्यमी व वरिष्ठ नागरिक) के लिए डिजिटल अवसर खोज व पात्रता पोर्टल सक्रिय है।' : 'Universal opportunity discovery & eligibility matching software is now unlocked for 365 days.'}
            </p>
          </div>

          {/* Legal Compliance Notice */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-500 leading-relaxed text-center">
            {language === 'hi'
              ? 'अस्वीकरण: Citzos एक स्वतंत्र डिजिटल सूचना व पात्रता मंच है। सभी सरकारी योजनाओं की जानकारी पूर्णतः निःशुल्क जनहित सूचना है। ₹1 केवल डिजिटल प्लेटफ़ॉर्म सॉफ़्टवेयर व सर्वर रख-रखाव शुल्क है।'
              : 'Disclaimer: Citzos is an independent private digital technology platform. Government scheme information is 100% free public awareness. The ₹1 fee is strictly towards digital platform maintenance and eligibility software.'}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 text-xs shadow-xs font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500 font-semibold">{language === 'hi' ? 'नागरिक नाम' : 'Citizen Name'}</span>
              <span className="font-bold text-slate-900">{citizenName}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500 font-semibold">{language === 'hi' ? 'नागरिक आईडी' : 'Citizen ID'}</span>
              <span className="font-mono font-bold text-slate-800">{citizenId}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500 font-semibold">{language === 'hi' ? 'लेनदेन संदर्भ (Txn ID)' : 'Transaction ID'}</span>
              <button
                onClick={() => copyTransactionId(successReceipt.transactionId)}
                className="font-mono font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>{successReceipt.transactionId}</span>
                {copiedTxn ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
              </button>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500 font-semibold">{language === 'hi' ? 'भुगतान राशि' : 'Amount Paid'}</span>
              <span className="font-extrabold text-slate-900 font-mono">₹{successReceipt.amount}.00 INR</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">{language === 'hi' ? 'वैधता तिथि' : 'Validity Date'}</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{successReceipt.validUntil} (365 Days)</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{language === 'hi' ? 'अवसर पोर्टल में प्रवेश करें' : 'Explore My Opportunities'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // If an error occurred during payment
  if (paymentError) {
    const isDomainError = paymentError.toLowerCase().includes('domain') || paymentError.toLowerCase().includes('origin') || paymentError.toLowerCase().includes('not authorized');
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="relative bg-slate-900/90 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center space-y-4 border border-rose-500/40 shadow-2xl z-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label={language === 'hi' ? 'बंद करें' : 'Close'}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex justify-center pt-1">
            <img src="/logo-citzos.png" alt="CITZOS" className="h-8 w-auto object-contain mx-auto drop-shadow-md" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-extrabold text-base text-rose-400">
              {language === 'hi' ? 'भुगतान विफल' : 'Payment Failed'}
            </h3>
            <p className="text-xs text-slate-200 bg-rose-950/50 border border-rose-800/40 rounded-xl p-2.5 break-words">
              {paymentError}
            </p>
          </div>

          {isDomainError && (
            <p className="text-[11px] text-amber-300 bg-amber-950/40 border border-amber-800/40 rounded-xl p-2.5 text-left leading-relaxed">
              {language === 'hi'
                ? 'सूचना: Razorpay Live Dashboard में Business website details के अंतर्गत citzos.in अधिकृत होना आवश्यक है।'
                : 'Notice: Under Razorpay Live Dashboard > Business website details, citzos.in must be approved.'}
            </p>
          )}

          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={() => handlePayment()}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              {language === 'hi' ? 'पुनः प्रयास करें (₹1)' : 'Retry Payment (₹1)'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer border border-slate-700"
            >
              {language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // While Razorpay is opening, show an elegant spinner with clear, prominent Cancel and Close controls
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Click outside to cancel */}
      <div className="fixed inset-0" onClick={onClose} />
      
      <div className="relative bg-slate-900/85 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-7 max-w-xs w-full text-center space-y-4 border border-emerald-500/40 shadow-2xl z-10">
        {/* Top-right close X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label={language === 'hi' ? 'बंद करें' : 'Close'}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Shield Logo */}
        <div className="flex justify-center pt-1">
          <img src="/logo-citzos.png" alt="CITZOS" className="h-8 w-auto object-contain mx-auto drop-shadow-md" />
        </div>

        <div className="w-9 h-9 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin mx-auto" />
        <div className="space-y-1">
          <h3 className="font-extrabold text-sm text-white">
            {language === 'hi' ? 'Citzos Universal Platform Pass' : 'Citzos Universal Platform Pass'}
          </h3>
          <p className="text-[11px] text-emerald-400 font-bold">
            {language === 'hi' ? 'वार्षिक प्लेटफ़ॉर्म रख-रखाव व सॉफ़्टवेयर शुल्क: ₹1.00' : 'Annual Platform Access & Software Fee: ₹1.00'}
          </p>
          <p className="text-[10px] text-slate-300">
            {language === 'hi' ? 'सुरक्षित भुगतान विंडो खुल रही है...' : 'Opening secure payment window...'}
          </p>
        </div>
        <p className="text-[10px] text-slate-400">Google Pay • PhonePe • Cards • Net Banking</p>
        <p className="text-[9px] text-slate-400 leading-tight">
          {language === 'hi'
            ? 'Citzos एक स्वतंत्र डिजिटल तकनीक मंच है। सभी योजनाएं पूर्णतः निःशुल्क जनहित सूचना हैं।'
            : 'Independent digital tech platform. Government scheme listings are free public awareness.'}
        </p>
        
        {/* Prominent High-Contrast Cancel Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 hover:text-white text-xs font-bold transition-all cursor-pointer border border-slate-700"
        >
          {language === 'hi' ? 'रद्द करें / वापस जाएं' : 'Cancel & Go Back'}
        </button>
      </div>
    </div>
  );
};

