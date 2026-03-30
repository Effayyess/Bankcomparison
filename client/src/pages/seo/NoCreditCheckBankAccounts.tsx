// SEO Landing Page: Business Bank Accounts No Credit Check UK
// Target keyword: "business bank account no credit check UK"

import { Link } from 'wouter';
import { banks } from '@/lib/bankData';
import BankCard from '@/components/BankCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronRight, Star, ShieldCheck } from 'lucide-react';

const noCreditCheckIds = ['tide', 'zempler', 'anna', 'countingup', 'revolut', 'airwallex', 'worldfirst', 'wallester', 'monzo', 'starling', 'wise', 'mettle', 'equals'];
const noCreditCheckBanks = noCreditCheckIds
  .map(id => banks.find(b => b.id === id))
  .filter(Boolean) as typeof banks;

const faqs = [
  {
    q: 'Can I open a business bank account with bad credit?',
    a: 'Yes — many UK business bank accounts do not require a credit check or will accept applications from businesses with poor credit histories. Digital banks like Zempler Bank, Tide, and ANNA Money are specifically designed to be accessible to businesses that may have been declined by traditional high street banks.',
  },
  {
    q: 'Which business bank accounts have no credit check?',
    a: 'Business bank accounts with no hard credit check include: Zempler Bank (specifically designed for bad credit), Tide Business, ANNA Money, CountingUp, Revolut Business, Airwallex, WorldFirst, and Wallester Business. These accounts use alternative eligibility criteria such as identity verification and business registration checks.',
  },
  {
    q: 'Will opening a business bank account affect my credit score?',
    a: 'Most digital business bank accounts perform only a soft credit check (which does not affect your credit score) or no credit check at all. High street banks typically perform a hard credit check, which leaves a footprint on your credit file. Always check the bank\'s application process before applying if you are concerned about your credit score.',
  },
  {
    q: 'What is the difference between a soft and hard credit check?',
    a: 'A soft credit check allows a lender to review your credit file without leaving a visible footprint — it does not affect your credit score and is not visible to other lenders. A hard credit check leaves a visible record on your credit file and can temporarily lower your credit score. Multiple hard checks in a short period can significantly impact your ability to obtain credit.',
  },
  {
    q: 'Can I get a business bank account if I have been bankrupt?',
    a: 'Yes, though options are more limited. Zempler Bank and ANNA Money are among the most accessible for businesses with a history of bankruptcy or insolvency. You will typically be restricted to a basic account without overdraft facilities, and you may need to provide additional documentation about your business.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `Business Bank Accounts No Credit Check UK ${new Date().getFullYear()}`,
      description: 'Compare UK business bank accounts with no credit check. Find accounts that accept bad credit, CCJs, and businesses declined by high street banks.',
      url: 'https://www.businessbankcompare.co.uk/business-bank-accounts-no-credit-check',
      dateModified: '2026-03-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.businessbankcompare.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.businessbankcompare.co.uk/compare' },
          { '@type': 'ListItem', position: 3, name: 'No Credit Check Accounts' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function NoCreditCheckBankAccounts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`Business Bank Accounts No Credit Check UK ${new Date().getFullYear()} | Business Bank Compare`}
        description="Compare UK business bank accounts with no credit check. Find accounts that accept bad credit, CCJs, and businesses declined by high street banks. Updated March 2026."
        schema={schema}
      />
      <Navigation />

      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-teal-300 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/compare" className="hover:text-white no-underline">Compare</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">No Credit Check Accounts</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-teal-600/30 border border-teal-500/40 rounded-full px-3 py-1 text-xs font-semibold text-teal-200 mb-4">
            <Star className="w-3 h-3" /> Last reviewed: March 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Business Bank Accounts with No Credit Check UK {new Date().getFullYear()}
          </h1>
          <p className="page-intro text-lg text-teal-100 mb-6 leading-relaxed max-w-3xl">
            A poor credit history, CCJ, or previous insolvency should not prevent you from running a business. We have identified {noCreditCheckBanks.length} UK business bank accounts that either perform no credit check or accept applications from businesses with adverse credit histories.
          </p>
          <div className="key-takeaways bg-white/10 border border-white/20 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3">TL;DR — Key Takeaways</p>
            <ul className="space-y-1.5 text-sm text-teal-50">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for bad credit:</strong> Zempler Bank — specifically designed for businesses with poor credit</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best digital option:</strong> Tide — no hard credit check, opens in minutes</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best free option:</strong> ANNA Money — no credit check, free PAYG plan available</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Most digital banks use <strong>soft checks only</strong> — no impact on your credit score</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
              Soft Check vs No Check: What to Expect
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            When we say "no credit check," we mean no <strong>hard credit check</strong> that would leave a footprint on your credit file. Most digital business banks perform a <strong>soft identity check</strong> to verify who you are — this is a legal requirement under UK anti-money laundering regulations — but this does not affect your credit score.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Zempler Bank is the standout option for businesses with genuinely poor credit histories, CCJs, or previous insolvency. It was specifically designed to serve businesses that have been declined by mainstream banks, and its eligibility criteria focus on your current business activity rather than your past credit history.
          </p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
          Top {noCreditCheckBanks.length} Business Bank Accounts — No Credit Check
        </h2>
        <div className="space-y-4 mb-10">
          {noCreditCheckBanks.map((bank, index) => (
            <BankCard key={bank.id} bank={bank} rank={index + 1} />
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { href: '/guides/business-bank-account-for-bad-credit', label: 'Business Bank Accounts for Bad Credit' },
              { href: '/guides/can-i-open-business-bank-account-bad-credit-uk', label: 'Can I Open an Account with Bad Credit?' },
              { href: '/guides/how-to-open-business-bank-account-no-credit-check-uk', label: 'How to Open an Account Without a Credit Check' },
              { href: '/guides/why-was-my-business-bank-account-application-rejected', label: 'Why Was My Application Rejected?' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 no-underline group">
                <ChevronRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map(faq => (
              <div key={faq.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <h3 className="font-bold text-sm mb-2 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/compare" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm no-underline hover:opacity-90 transition-opacity" style={{ background: '#2563eb', fontFamily: 'Sora, sans-serif' }}>
            Compare All Business Bank Accounts <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
