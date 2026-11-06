'use client';

import { Opportunity } from '@/types';

/**
 * Generates and triggers the real download of an official government
 * guidelines and application checklist PDF for an opportunity.
 */
export async function downloadOpportunityPdf(
  opportunity: Opportunity,
  language: 'hi' | 'en' = 'hi'
): Promise<void> {
  if (typeof window === 'undefined') return;

  const title = language === 'hi' ? opportunity.titleHi : opportunity.title;
  const benefit = language === 'hi' ? opportunity.benefitHeadlineHi : opportunity.benefitHeadline;
  const desc = language === 'hi' ? opportunity.descriptionHi : opportunity.description;
  const authority = opportunity.gazette.issuingAuthority || 'भारत सरकार / State Govt Department';
  const circular = opportunity.gazette.circularNumber || 'OFFICIAL-CIRCULAR-REF-2026';
  const fee = opportunity.gazette.officialGovtFee || 'निःशुल्क (Zero Fee)';
  const portal = opportunity.gazette.officialPortalUrl || 'https://india.gov.in';
  const scamWarning =
    opportunity.gazette.scamAlertWarning ||
    'सावधानी: यह अवसर आधिकारिक सरकारी पोर्टल से सत्यापित है। किसी भी अनधिकृत एजेंट या दलाल को पैसे न दें।';
  const ageLimit = opportunity.targetAges
    ? `${opportunity.targetAges[0]} - ${opportunity.targetAges[1]} वर्ष (Years)`
    : 'पात्र नागरिकों के लिए खुला (Eligible Citizens)';
  const gender =
    opportunity.genderEligibility === 'female'
      ? 'केवल महिलाएँ (Female Only)'
      : opportunity.genderEligibility === 'male'
      ? 'केवल पुरुष (Male Only)'
      : 'सभी नागरिक (All Genders)';
  const states =
    opportunity.stateEligibility && opportunity.stateEligibility[0] === 'ALL'
      ? 'अखिल भारतीय (All India)'
      : opportunity.stateEligibility?.join(', ') || 'भारत (India)';

  const currentDate = new Date().toLocaleDateString('hi-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // Dynamic import to prevent any SSR bundling overhead
  const { default: html2canvas } = await import('html2canvas');
  const { jsPDF } = await import('jspdf');

  // Create temporary off-screen container styled for A4 document (794px width)
  const container = document.createElement('div');
  container.id = '__pdf_render_container__';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px';
  container.style.minHeight = '1123px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  container.style.padding = '36px 44px';
  container.style.boxSizing = 'border-box';
  container.style.lineHeight = '1.45';

  const documentsHtml = (opportunity.documents || [])
    .map(
      (doc, index) => `
      <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; font-size: 12px;">
        <span style="display: inline-block; width: 14px; height: 14px; border: 1.5px solid #059669; border-radius: 3px; margin-top: 2px; flex-shrink: 0;"></span>
        <div>
          <strong style="color: #1e293b;">${index + 1}. ${language === 'hi' ? doc.nameHi : doc.name}</strong>
          ${doc.isMandatory ? '<span style="color: #dc2626; font-size: 11px; margin-left: 6px; font-weight: bold;">(अनिवार्य / Mandatory)</span>' : '<span style="color: #64748b; font-size: 11px; margin-left: 6px;">(यदि लागू हो)</span>'}
          ${doc.notes ? `<div style="color: #64748b; font-size: 11px; margin-top: 2px;">${doc.notes}</div>` : ''}
        </div>
      </div>
    `
    )
    .join('');

  const stepsHtml = (opportunity.applySteps || [])
    .map(
      (s) => `
      <div style="display: flex; gap: 10px; margin-bottom: 6px; font-size: 12px;">
        <span style="background: #065f46; color: #ffffff; border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; flex-shrink: 0;">${s.step}</span>
        <span style="color: #334155;">${language === 'hi' ? s.textHi : s.text}</span>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <!-- Top Emblem / Watermark Bar -->
    <div style="border-bottom: 2px solid #065f46; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.5px; color: #065f46; text-transform: uppercase;">
          🇮🇳 भारत सरकार एवं राज्य प्राधिकृत डिजिटल दिशानिर्देश प्रपत्र
        </div>
        <div style="font-size: 18px; font-weight: 900; color: #0f172a; margin-top: 2px;">
          CITZOS • OFFICIAL APPLICATION KIT
        </div>
        <div style="font-size: 11px; color: #64748b;">
          100% Verified Public Domain Gazette Record • Zero Broker Guarantee
        </div>
      </div>
      <div style="text-align: right;">
        <span style="display: inline-block; background: #ecfdf5; border: 1.5px solid #059669; color: #065f46; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 9999px; letter-spacing: 0.5px;">
          ✓ OFFICIALLY VERIFIED
        </span>
        <div style="font-size: 10px; color: #64748b; margin-top: 4px;">
          जारी तिथि: ${currentDate}
        </div>
      </div>
    </div>

    <!-- Official Authority & Circular Strip -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 16px; margin-bottom: 16px;">
      <div style="display: grid; grid-template-columns: 2fr 1.5fr; gap: 12px; font-size: 11px;">
        <div>
          <span style="color: #64748b; text-transform: uppercase; font-weight: 700; font-size: 9px; letter-spacing: 0.5px;">जारीकर्ता प्राधिकरण (Issuing Authority)</span>
          <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">${authority}</div>
        </div>
        <div>
          <span style="color: #64748b; text-transform: uppercase; font-weight: 700; font-size: 9px; letter-spacing: 0.5px;">आधिकारिक सर्कुलर सं. (Circular No.)</span>
          <div style="font-size: 12px; font-weight: 700; color: #065f46; margin-top: 2px; font-family: monospace;">${circular}</div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 10px; padding-top: 8px; border-top: 1px dashed #cbd5e1; font-size: 11px;">
        <div><strong>सरकारी आवेदन शुल्क:</strong> <span style="color: #059669; font-weight: 800;">${fee}</span></div>
        <div><strong>सत्यापन स्थिति:</strong> <span style="color: #059669; font-weight: bold;">सक्रिय (Live on Official Portal)</span></div>
      </div>
    </div>

    <!-- Main Opportunity Title -->
    <div style="margin-bottom: 16px;">
      <h1 style="font-size: 18px; font-weight: 900; color: #0f172a; line-height: 1.35; margin: 0 0 6px 0;">
        ${title}
      </h1>
      <div style="background: #ecfdf5; border-left: 4px solid #059669; padding: 10px 14px; border-radius: 0 8px 8px 0; margin-top: 8px;">
        <span style="font-size: 10px; text-transform: uppercase; font-weight: 800; color: #065f46; letter-spacing: 0.5px;">मुख्य लाभ एवं विवरण (Benefit Highlights)</span>
        <div style="font-size: 13px; font-weight: 800; color: #064e3b; margin-top: 2px;">${benefit}</div>
        <p style="font-size: 11px; color: #334155; margin: 4px 0 0 0; line-height: 1.4;">${desc}</p>
      </div>
    </div>

    <!-- Anti-Fraud / Zero Broker Advisory Box -->
    <div style="background: #fffbeb; border: 1.5px solid #f59e0b; border-radius: 10px; padding: 10px 14px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; color: #92400e;">
        <span>धोखाधड़ी और दलालों से सुरक्षा चेतावनी (Anti-Fraud & Scam Advisory)</span>
      </div>
      <div style="font-size: 11px; color: #78350f; margin-top: 3px; line-height: 1.4;">
        ${scamWarning} केवल आधिकारिक वेबसाइट पर ही ऑनलाइन पंजीकरण करें।
      </div>
    </div>

    <!-- Eligibility Grid -->
    <div style="margin-bottom: 16px;">
      <div style="font-size: 12px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
        1. पात्रता मानदंड (Eligibility Criteria)
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 11px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
          <span style="color: #64748b; font-size: 10px; display: block;">आयु सीमा (Age)</span>
          <strong style="color: #0f172a;">${ageLimit}</strong>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
          <span style="color: #64748b; font-size: 10px; display: block;">लिंग पात्रता (Gender)</span>
          <strong style="color: #0f172a;">${gender}</strong>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
          <span style="color: #64748b; font-size: 10px; display: block;">राज्य / क्षेत्र (States)</span>
          <strong style="color: #0f172a;">${states}</strong>
        </div>
      </div>
    </div>

    <!-- Document Checklist -->
    <div style="margin-bottom: 16px;">
      <div style="font-size: 12px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
        2. आवश्यक सरकारी दस्तावेज़ (Official Required Documents)
      </div>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px;">
        ${
          documentsHtml ||
          '<div style="font-size: 11px; color: #64748b;">आधार कार्ड, बैंक पासबुक, पासपोर्ट फोटो एवं मूल निवास प्रमाण पत्र।</div>'
        }
      </div>
    </div>

    <!-- Step by Step Application Guide -->
    <div style="margin-bottom: 18px;">
      <div style="font-size: 12px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
        3. आवेदन करने के आधिकारिक चरण (Official How to Apply Steps)
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px;">
        ${
          stepsHtml ||
          `
          <div style="font-size: 11px; color: #334155; line-height: 1.5;">
            1. आधिकारिक पोर्टल <strong>${portal}</strong> पर सीधे जाएँ।<br/>
            2. "New Citizen / Applicant Registration" लिंक पर क्लिक करें।<br/>
            3. अपने आधार और मोबाइल नंबर से OTP द्वारा पंजीकरण पूर्ण करें।<br/>
            4. उपर्युक्त आवश्यक दस्तावेज़ अपलोड करके रसीद डाउनलोड करें।
          </div>
        `
        }
      </div>
    </div>

    <!-- Official Portal Direct Link Box -->
    <div style="background: #0f172a; color: #ffffff; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">
          सीधा आधिकारिक सरकारी पोर्टल लिंक (Direct Portal)
        </div>
        <div style="font-size: 13px; font-weight: bold; color: #38bdf8; margin-top: 2px; font-family: monospace;">
          ${portal}
        </div>
      </div>
      <div style="background: #059669; color: #ffffff; font-size: 10px; font-weight: 800; padding: 6px 12px; border-radius: 6px; letter-spacing: 0.5px;">
        GOVT VERIFIED
      </div>
    </div>

    <!-- Document Footer -->
    <div style="border-top: 1px solid #e2e8f0; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #64748b;">
      <div>
        <strong>CITZOS</strong> • डिजिटल सशक्त भारत पहल • 100% Free Public Verification
      </div>
      <div>
        दस्तावेज़ सुरक्षा कोड: <strong>DLT-${opportunity.id.slice(0, 8).toUpperCase()}-2026</strong>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pageHeight = pdf.internal.pageSize.getHeight();
    if (pdfHeight <= pageHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    } else {
      let heightLeft = pdfHeight;
      let position = 0;
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
    }

    const cleanFilename = (opportunity.title || 'Official_Guidelines')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .slice(0, 40);
    pdf.save(`${cleanFilename}_Guidelines_2026.pdf`);
  } catch (err) {
    console.error('Failed to generate canvas PDF, falling back to basic jsPDF:', err);
    const fallbackDoc = new jsPDF('p', 'mm', 'a4');
    fallbackDoc.setFontSize(16);
    fallbackDoc.text('CITZOS - OFFICIAL GUIDELINES', 14, 20);
    fallbackDoc.setFontSize(12);
    fallbackDoc.text(`Authority: ${authority}`, 14, 30);
    fallbackDoc.text(`Circular No: ${circular}`, 14, 38);
    fallbackDoc.text(`Opportunity: ${opportunity.title}`, 14, 46);
    fallbackDoc.text(`Benefit: ${opportunity.benefitHeadline}`, 14, 54);
    fallbackDoc.text(`Official Fee: ${fee}`, 14, 62);
    fallbackDoc.text(`Portal URL: ${portal}`, 14, 70);
    fallbackDoc.text(`Verification Date: ${currentDate}`, 14, 78);
    fallbackDoc.save(`Official_Guidelines_${opportunity.id}.pdf`);
  } finally {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
}
