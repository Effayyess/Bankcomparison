// SEO Landing Page: Best Business Bank Accounts for Limited Companies UK
// Target keyword: "limited company bank account UK"

import { Link } from 'wouter';
import { banks } from '@/lib/bankData';
import BankCard from '@/components/BankCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronRight, Star, AlertTriangle } from 'lucide-react';

const limitedCompanyIds = ['starling', 'monzo', 'tide', 'revolut', 'hsbc', 'natwest', 'barclays', 'lloyds', 'wise', 'anna', 'zempler', 'airwallex'];
const limitedCompanyBanks = limitedCompanyIds
  .map(id => banks.find(b => b.id === id))
  .filter(Boolean) as typeof banks;

const faqs = [
  {
    q: 'Do limited companies legally need a business bank account?',
    a: 'Yes — limited companies are legally required to have a separate business bank account. A limited company is a distinct legal entity from its directors and shareholders, and all company finances must be kept entirely separate from personal finances. Failing to do so can result in serious legal and tax complications, and could be considered a breach of your director\'s duties.',
  },
  {
    q: 'What is the best bank account for a limited company?',
    a: 'For most new limited companies, Starling Bank is our top recommendation — it is free, FSCS-protected, opens quickly, and has excellent accounting integrations. Monzo Business is a strong alternative with outstanding expense management. For companies that need branch access or a relationship manager, NatWest Business offers 24 months free banking for new companies.',
  },
  {
    q: 'Can a limited company use a personal bank account?',
    a: 'No — a limited company must not use a personal bank account for company transactions. This would blur the legal separation between the company and its directors, potentially invalidating the limited liability protection that is the primary purpose of incorporating. It would also create significant accounting and tax complications.',
  },
  {
    q: 'What documents do I need to open a limited company bank account?',
    a: 'You will typically need: your Companies House registration number and certificate of incorporation, proof of identity for all directors and significant shareholders (passport or driving licence), proof of address (utility bill or bank statement), details of your business activities, and your expected annual turnover. Digital banks often complete this process entirely online.',
  },
  {
    q: 'Can I open a limited company bank account before the company is registered?',
    a: 'No — you must complete your Companies House registration before you can open a bank account in the company\'s name. You can begin the registration process online at gov.uk/register-a-company, which typically takes 24 hours. Some banks allow you to begin the application process before registration is complete, but the account will not be opened until the company number is confirmed.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `Best Business Bank Accounts for Limited Companies UK ${new Date().getFullYear()}`,
      description: 'Compare the best UK business bank accounts for limited companies. Find accounts with fast opening, accounting integrations, and features built for Ltd companies.',
      url: 'https://www.businessbankcompare.co.uk/best-business-bank-accounts-for-limited-companies',
      dateModified: '2026-03-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.businessbankcompare.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.businessbankcompare.co.uk/compare' },
          { '@type': 'ListItem', position: 3, name: 'Best for Limited Companies' },
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

export default function LimitedCompanyBankAccounts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`Best Business Bank Accounts for Limited Companies UK ${new Date().getFullYear()} | Business Bank Compare`}
        description="Compare the best UK business bank accounts for limited companies. Find accounts with fast opening, accounting integrations, and features built for Ltd companies. Updated March 2026."
        schema={schema}
      />
      <Navigation />

      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/compare" className="hover:text-white no-underline">Compare</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Best for Limited Companies</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-indigo-600/30 border border-indigo-500/40 rounded-full px-3 py-1 text-xs font-semibold text-indigo-200 mb-4">
            <Star className="w-3 h-3" /> Last reviewed: March 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Best Business Bank Accounts for Limited Companies UK {new Date().getFullYear()}
          </h1>
          <p className="page-intro text-lg text-indigo-100 mb-6 leading-relaxed max-w-3xl">
            Limited companies are legally required to maintain a separate business bank account — it is not optional. We have reviewed {limitedCompanyBanks.length} accounts to find the best options for UK limited companies, from newly incorporated startups to established SMEs.
          </p>
          <div className="bg-amber-500/20 border border-amber-400/40 rounded-xl p-4 mb-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-100"><strong>Important:</strong> Limited companies are legally required to have a separate business bank account. Using a personal account for company transactions can invalidate your limited liability protection and create serious legal complications.</p>
          </div>
          <div className="key-takeaways bg-white/10 border border-white/20 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">TL;DR — Key Takeaways</p>
            <ul className="space-y-1.5 text-sm text-indigo-50">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best overall:</strong> Starling Bank — free, FSCS-protected, fast to open</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for growing companies:</strong> Monzo Business — excellent team expense management</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best high street option:</strong> NatWest Business — 24 months free, full branch access</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for international Ltd companies:</strong> Wise Business or Airwallex</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
          Top {limitedCompanyBanks.length} Business Bank Accounts for Limited Companies
        </h2>
        <div className="space-y-4 mb-10">
          {limitedCompanyBanks.map((bank, index) => (
            <BankCard key={bank.id} bank={bank} rank={index + 1} />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            What Limited Companies Need from a Bank Account
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Limited companies have more complex banking needs than sole traders. As a director, you need an account that clearly separates company funds from your personal finances, supports multiple users (for companies with more than one director), integrates with accounting software for corporation tax preparation, and can handle both domestic and — for many companies — international transactions.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The most important consideration for new limited companies is <strong>speed of opening</strong>. You cannot trade until you have a business account, and delays can cost you clients and revenue. Digital banks like Starling and Monzo can open accounts within hours of Companies House registration being confirmed — a significant advantage over high street banks, which can take 1–2 weeks.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            For established limited companies, the priority shifts to <strong>accounting integration quality</strong>. Seamless connectivity with Xero, QuickBooks, or Sage dramatically reduces the time spent on bookkeeping and ensures your accountant has accurate, real-time data for your annual accounts and corporation tax return.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Related Guides for Limited Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { href: '/guides/limited-company-business-bank-account', label: 'Limited Company Bank Account Guide' },
              { href: '/guides/how-to-open-a-business-bank-account-as-a-new-limited-company', label: 'Opening an Account as a New Limited Company' },
              { href: '/guides/can-i-open-business-bank-account-before-company-registered', label: 'Can I Open Before Company Registration?' },
              { href: '/guides/what-do-i-need-to-open-a-business-bank-account-uk', label: 'What Documents Do I Need?' },
              { href: '/guides/hub/starting-a-business-uk', label: 'Hub: How to Start a Business in the UK' },
              { href: '/guides/business-account-vs-personal-account', label: 'Business vs Personal Account Explained' },
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
