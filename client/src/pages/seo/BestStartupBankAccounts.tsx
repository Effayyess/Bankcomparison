// SEO Landing Page: Best Business Bank Accounts for Startups UK
// Target keyword: "best business bank account for startups UK"
// Hub: /guides/hub/starting-a-business-uk

import { Link } from 'wouter';
import { banks } from '@/lib/bankData';
import BankCard from '@/components/BankCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronRight, Star, Zap, Shield, BookOpen } from 'lucide-react';

const startupBankIds = ['monzo', 'starling', 'tide', 'anna', 'mettle', 'revolut', 'natwest', 'hsbc', 'zempler', 'countingup', 'wise', 'barclays'];
const startupBanks = startupBankIds
  .map(id => banks.find(b => b.id === id))
  .filter(Boolean) as typeof banks;

const faqs = [
  {
    q: 'What is the best business bank account for a startup in the UK?',
    a: 'For most UK startups, Monzo Business and Starling Bank are the top choices — both are free, FSCS-protected, open in minutes, and offer excellent expense management and accounting integrations. If you prefer a high street bank, NatWest Business offers 24 months free banking for new businesses.',
  },
  {
    q: 'Can I open a business bank account before my company is registered?',
    a: 'No — you must register your limited company with Companies House before opening a business account in the company\'s name. However, if you are a sole trader startup, you can open an account immediately without any registration.',
  },
  {
    q: 'How quickly can I open a startup business bank account?',
    a: 'Digital-first banks like Starling, Monzo, and Tide can open accounts on the same day, often within minutes via their apps. High street banks typically take 3–7 business days and may require a branch visit or video call.',
  },
  {
    q: 'Do I need a business bank account for my startup?',
    a: 'If your startup is a limited company, yes — you are legally required to keep company finances separate from personal finances. For sole trader startups, it is not a legal requirement but is strongly recommended for professional invoicing, tax preparation, and financial clarity.',
  },
  {
    q: 'What features should a startup look for in a business bank account?',
    a: 'Startups should prioritise: zero or low monthly fees (to preserve runway), fast account opening, accounting software integration (Xero, QuickBooks, FreeAgent), expense card management, and FSCS protection. As you scale, look for accounts that offer overdraft facilities and international payment support.',
  },
  {
    q: 'Are there free business bank accounts for startups?',
    a: 'Yes — several excellent free options exist for UK startups. Starling Bank and Monzo Business both offer genuinely free tiers with no monthly fee. Mettle (by NatWest) is also free and designed specifically for sole traders and small businesses. NatWest Business offers 24 months free for new startups.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `Best Business Bank Accounts for Startups UK ${new Date().getFullYear()}`,
      description: 'Compare the best UK business bank accounts for startups. Expert-reviewed accounts with free periods, fast opening, and features built for growing businesses.',
      url: 'https://www.businessbankcompare.co.uk/best-business-bank-accounts-for-startups',
      dateModified: '2026-03-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.businessbankcompare.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.businessbankcompare.co.uk/compare' },
          { '@type': 'ListItem', position: 3, name: 'Best for Startups' },
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
    {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.page-intro', '.key-takeaways'],
    },
  ],
};

export default function BestStartupBankAccounts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`Best Business Bank Accounts for Startups UK ${new Date().getFullYear()} | Business Bank Compare`}
        description="Compare the best UK business bank accounts for startups. Expert-reviewed accounts with free periods, fast opening, and features built for growing businesses. Updated March 2026."
        schema={schema}
      />
      <Navigation />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-blue-300 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/compare" className="hover:text-white no-underline">Compare</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Best for Startups</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-blue-600/30 border border-blue-500/40 rounded-full px-3 py-1 text-xs font-semibold text-blue-200 mb-4">
            <Star className="w-3 h-3" /> Last reviewed: March 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Best Business Bank Accounts for Startups UK {new Date().getFullYear()}
          </h1>
          <p className="page-intro text-lg text-blue-100 mb-6 leading-relaxed max-w-3xl">
            Choosing the right bank account is one of the first and most important decisions a startup founder makes. You need an account that opens quickly, keeps costs low while you find your feet, and scales with you as you grow. We've reviewed {startupBanks.length} accounts to find the best options for UK startups in {new Date().getFullYear()}.
          </p>
          {/* Key Takeaways */}
          <div className="key-takeaways bg-white/10 border border-white/20 rounded-xl p-5 mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">TL;DR — Key Takeaways</p>
            <ul className="space-y-1.5 text-sm text-blue-50">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best overall:</strong> Starling Bank — free, FSCS-protected, opens in minutes</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for expense management:</strong> Monzo Business — excellent free tier, smart spending insights</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best high street option:</strong> NatWest Business — 24 months free banking for new businesses</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for invoicing:</strong> Tide — built-in invoicing tools, strong accounting integrations</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for sole traders:</strong> Mettle by NatWest — free, FreeAgent integration included</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* What to look for */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            What to Look for in a Startup Business Bank Account
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Startups have different banking needs from established businesses. In the early stages, preserving cash runway is paramount — which means avoiding unnecessary monthly fees. But low cost should not come at the expense of functionality. The best startup accounts combine zero or low fees with the features you will need as your business grows.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {[
              { icon: <Zap className="w-5 h-5 text-yellow-500" />, title: 'Fast Opening', desc: 'Open in minutes via an app — no waiting weeks for a branch appointment.' },
              { icon: <Shield className="w-5 h-5 text-green-500" />, title: 'FSCS Protection', desc: 'Ensure your deposits are protected up to £85,000 under the Financial Services Compensation Scheme.' },
              { icon: <BookOpen className="w-5 h-5 text-blue-500" />, title: 'Accounting Integration', desc: 'Connect to Xero, QuickBooks, or FreeAgent to automate bookkeeping from day one.' },
            ].map(item => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-4">
                <div className="mb-2">{item.icon}</div>
                <p className="font-bold text-sm text-gray-900 mb-1">{item.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bank listings */}
        <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
          Top {startupBanks.length} Business Bank Accounts for Startups
        </h2>
        <div className="space-y-4 mb-10">
          {startupBanks.map((bank, index) => (
            <BankCard key={bank.id} bank={bank} rank={index + 1} />
          ))}
        </div>

        {/* Editorial section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Our Expert Analysis: Startup Banking in 2026
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The UK startup banking landscape has been transformed by digital-first challenger banks over the past decade. Where founders once had to book appointments at high street branches and wait weeks for account approval, today's best startup accounts can be opened in under ten minutes via a smartphone app — often with no credit check required.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            <strong>Starling Bank</strong> consistently tops our rankings for startups due to its combination of genuinely free banking, full FSCS protection, and a best-in-class mobile app. Unlike some competitors, Starling's free tier is not a limited introductory offer — it is the permanent product. This makes it particularly well-suited to pre-revenue startups that need to conserve cash.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            <strong>Monzo Business</strong> is our top pick for startups that prioritise expense management and team spending. Its virtual card system, spending pots, and real-time notifications make it easy to track exactly where your startup's money is going — an invaluable feature when every pound counts.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            For startups that anticipate needing a branch relationship or a business overdraft in their first year, <strong>NatWest Business</strong> offers 24 months of free banking alongside full branch access and a dedicated relationship manager for growing businesses. This makes it the best high street option for startups with more complex needs.
          </p>
        </div>

        {/* Hub links */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Related Guides for Startup Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { href: '/guides/hub/starting-a-business-uk', label: 'Complete Guide: How to Start a Business in the UK' },
              { href: '/guides/how-to-open-a-business-bank-account', label: 'How to Open a Business Bank Account' },
              { href: '/guides/can-i-open-business-bank-account-before-company-registered', label: 'Can I Open an Account Before Registering?' },
              { href: '/guides/how-long-does-it-take-to-open-a-business-bank-account', label: 'How Long Does Account Opening Take?' },
              { href: '/guides/business-account-vs-personal-account', label: 'Business vs Personal Account: What\'s the Difference?' },
              { href: '/guides/how-to-open-a-business-bank-account-as-a-new-limited-company', label: 'Opening an Account as a New Limited Company' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 no-underline group">
                <ChevronRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqs.map(faq => (
              <div key={faq.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <h3 className="font-bold text-sm mb-2 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to compare CTA */}
        <div className="text-center">
          <Link href="/compare" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm no-underline hover:opacity-90 transition-opacity" style={{ background: '#2563eb', fontFamily: 'Sora, sans-serif' }}>
            Compare All Business Bank Accounts
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
