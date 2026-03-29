// Contact page — full functional contact form wired to Resend via Netlify Function
// Design: matches site's Sora/dark-navy brand; clean card layout

import { useState } from 'react';
import { Link } from 'wouter';
import {
  ChevronRight,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  BookOpen,
  Handshake,
  Shield,
  MessageSquare,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

type EnquiryType = 'general' | 'editorial' | 'partnership' | 'privacy';

interface FormState {
  name: string;
  email: string;
  enquiryType: EnquiryType;
  subject: string;
  message: string;
}

const enquiryOptions: { value: EnquiryType; label: string; description: string; icon: React.ReactNode; email: string }[] = [
  {
    value: 'general',
    label: 'General Enquiry',
    description: 'Questions about our website, comparisons, or services',
    icon: <MessageSquare className="w-5 h-5" />,
    email: 'info@businessbankcompare.co.uk',
  },
  {
    value: 'editorial',
    label: 'Editorial & Corrections',
    description: 'Report an inaccuracy or suggest an update',
    icon: <BookOpen className="w-5 h-5" />,
    email: 'editorial@businessbankcompare.co.uk',
  },
  {
    value: 'partnership',
    label: 'Partnership & Advertising',
    description: 'Bank or financial institution partnership enquiries',
    icon: <Handshake className="w-5 h-5" />,
    email: 'partnerships@businessbankcompare.co.uk',
  },
  {
    value: 'privacy',
    label: 'Data Privacy',
    description: 'UK GDPR rights or data handling questions',
    icon: <Shield className="w-5 h-5" />,
    email: 'privacy@businessbankcompare.co.uk',
  },
];

const responseTimesMap: Record<EnquiryType, string> = {
  general: '2–3 working days',
  editorial: '5 working days',
  partnership: '3–5 working days',
  privacy: '30 days (as required by UK GDPR)',
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    enquiryType: 'general',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function validate(): boolean {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2) errors.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.';
    if (!form.subject.trim() || form.subject.trim().length < 3) errors.subject = 'Please enter a subject (at least 3 characters).';
    if (!form.message.trim() || form.message.trim().length < 10) errors.message = 'Please enter a message (at least 10 characters).';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status === 'error') setStatus('idle');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', enquiryType: 'general', subject: '', message: '' });
        setFieldErrors({});
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  const selectedEnquiry = enquiryOptions.find((o) => o.value === form.enquiryType)!;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
      <SEO
        title="Contact Us | Business Bank Compare"
        description="Get in touch with the Business Bank Compare team. We're here to help with general enquiries, editorial corrections, partnership opportunities, and data privacy requests."
        canonicalPath="/contact"
        noIndex={true}
      />
      <Navigation />

      <div style={{ paddingTop: '88px' }}>
        {/* Hero */}
        <div className="text-white py-10" style={{ background: '#0f172a' }}>
          <div className="container">
            <nav className="flex items-center gap-2 text-sm mb-4 text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-300">Contact Us</span>
            </nav>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-400">We typically respond within 2–5 working days</span>
            </div>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
              Contact Us
            </h1>
          </div>
        </div>

        <div className="container py-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left: Form */}
              <div className="lg:col-span-2">
                {/* Success state */}
                {status === 'success' ? (
                  <div className="bg-white border border-green-200 rounded-2xl p-10 text-center shadow-sm">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-5">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                      Message sent!
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                      Thanks for getting in touch. We've sent a confirmation to your email and will respond within{' '}
                      <strong>{responseTimesMap[form.enquiryType] || '2–5 working days'}</strong>.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: '#2563eb' }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                      Send us a message
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                      Fill in the form below and we'll get back to you as soon as possible.
                    </p>

                    {/* Enquiry type selector */}
                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                        Enquiry Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {enquiryOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleChange('enquiryType', opt.value)}
                            className="flex items-start gap-3 p-3 rounded-xl border text-left transition-all"
                            style={
                              form.enquiryType === opt.value
                                ? { borderColor: '#2563eb', background: '#eff6ff' }
                                : { borderColor: '#e5e7eb', background: 'white' }
                            }
                          >
                            <span
                              className="flex-shrink-0 mt-0.5"
                              style={{ color: form.enquiryType === opt.value ? '#2563eb' : '#9ca3af' }}
                            >
                              {opt.icon}
                            </span>
                            <div>
                              <p
                                className="text-sm font-semibold leading-tight"
                                style={{ color: form.enquiryType === opt.value ? '#1d4ed8' : '#374151' }}
                              >
                                {opt.label}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5 leading-snug">{opt.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            value={form.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Jane Smith"
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                              fieldErrors.name ? 'border-red-400' : 'border-gray-200'
                            }`}
                          />
                          {fieldErrors.name && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="jane@company.co.uk"
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                              fieldErrors.email ? 'border-red-400' : 'border-gray-200'
                            }`}
                          />
                          {fieldErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="mb-4">
                        <label htmlFor="contact-subject" className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          value={form.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          placeholder="e.g. Question about Starling Bank review"
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                            fieldErrors.subject ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {fieldErrors.subject && (
                          <p className="text-red-500 text-xs mt-1">{fieldErrors.subject}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="mb-6">
                        <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          value={form.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Please describe your enquiry in as much detail as possible..."
                          rows={6}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors resize-y min-h-[120px] ${
                            fieldErrors.message ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        <div className="flex items-center justify-between mt-1">
                          {fieldErrors.message ? (
                            <p className="text-red-500 text-xs">{fieldErrors.message}</p>
                          ) : (
                            <span />
                          )}
                          <span className="text-xs text-gray-400">{form.message.length} chars</span>
                        </div>
                      </div>

                      {/* Global error */}
                      {status === 'error' && errorMsg && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 mb-4">
                          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <p className="text-red-700 text-sm">{errorMsg}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60"
                        style={{ background: '#2563eb' }}
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-400 text-center mt-3">
                        By submitting this form you agree to our{' '}
                        <Link href="/privacy-policy" className="underline hover:text-gray-600">Privacy Policy</Link>.
                        We will only use your details to respond to your enquiry.
                      </p>
                    </form>
                  </div>
                )}
              </div>

              {/* Right: Info sidebar */}
              <div className="space-y-4">
                {/* Selected enquiry routing info */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-sm text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Your message will go to
                  </h3>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <span className="text-blue-600">{selectedEnquiry.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-blue-900">{selectedEnquiry.label}</p>
                      <p className="text-xs text-blue-700 break-all">{selectedEnquiry.email}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Expected response: <strong className="text-gray-700">{responseTimesMap[form.enquiryType]}</strong>
                  </p>
                </div>

                {/* Contact details */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-sm text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Other Contact Details
                  </h3>
                  <div className="space-y-3">
                    {enquiryOptions.map((opt) => (
                      <div key={opt.value} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5 flex-shrink-0">{opt.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-gray-700">{opt.label}</p>
                          <a
                            href={`mailto:${opt.email}`}
                            className="text-xs text-blue-600 hover:text-blue-800 break-all"
                          >
                            {opt.email}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important note */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <h3 className="font-bold text-sm text-amber-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Important Note
                  </h3>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Business Bank Compare is an <strong>independent comparison website</strong>. We are not a bank and cannot access your bank account, process transactions, or resolve issues with your specific bank.
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed mt-2">
                    For account-specific issues, please contact your bank directly using the details on their official website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
