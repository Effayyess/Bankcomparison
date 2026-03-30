// SEO Landing Page: Best Digital / Online Business Bank Accounts UK
// Target keyword: "online business bank account UK" / "digital business bank account UK"

import { Link } from 'wouter';
import { banks } from '@/lib/bankData';
import BankCard from '@/components/BankCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronRight, Star, Smartphone } from 'lucide-react';

const digitalBankIds = ['starling', 'monzo', 'tide', 'revolut', 'wise', 'anna', 'mettle', 'countingup', 'zempler', 'airwallex', 'worldfirst', 'wallester', 'equals'];
const digitalBanks = digitalBankIds
  .map(id => banks.find(b => b.id === id))
  .filter(Boolean) as typeof banks;

const faqs = [
  {
    q: 'What is a digital business bank account?',
    a: 'A digital business bank account is a business current account that is managed entirely through a mobile app or web browser, with no physical branches. They are typically faster to open, cheaper to run, and offer more modern features (such as real-time notifications, virtual cards, and accounting integrations) than traditional high street bank accounts.',
  },
  {
    q: 'Are digital business bank accounts safe?',
    a: 'Yes — the best digital business bank accounts are fully authorised and regulated by the Financial Conduct Authority (FCA) and Prudential Regulation Authority (PRA). Accounts from Starling Bank, Monzo, and others are protected by the Financial Services Compensation Scheme (FSCS) up to £85,000 per eligible depositor. Always check that a digital bank holds a full UK banking licence rather than just an e-money licence, as FSCS protection only applies to licensed banks.',
  },
  {
    q: 'What is the difference between a digital bank and an e-money provider?',
    a: 'A digital bank holds a full UK banking licence from the PRA and FCA, meaning customer deposits are protected by FSCS up to £85,000. An e-money provider (such as Revolut, which holds an e-money licence rather than a banking licence in the UK) safeguards customer funds through segregation in ring-fenced accounts, but this is not the same as FSCS protection. Both are regulated, but the level of deposit protection differs.',
  },
  {
    q: 'Can I deposit cash into a digital business bank account?',
    a: 'Most digital banks allow cash deposits via Post Office counters or PayPoint locations, though a fee typically applies (usually £1–£3 per deposit). Starling Bank, Monzo, and Tide all support Post Office cash deposits. If your business handles large volumes of cash regularly, a high street bank account may be more cost-effective for this specific need.',
  },
  {
    q: 'Which digital business bank account has the best app?',
    a: 'Starling Bank and Monzo consistently receive the highest app ratings among UK digital business banks. Starling\'s app is rated 4.9/5 on the App Store and 4.7/5 on Google Play. Monzo\'s app is similarly highly rated. Both offer real-time transaction notifications, spending analytics, and seamless accounting integrations.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `Best Digital Business Bank Accounts UK ${new Date().getFullYear()}`,
      description: 'Compare the best digital and online business bank accounts in the UK. Find app-only accounts with fast opening, low fees, and modern features for UK businesses.',
      url: 'https://www.businessbankcompare.co.uk/best-digital-business-bank-accounts',
      dateModified: '2026-03-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.businessbankcompare.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.businessbankcompare.co.uk/compare' },
          { '@type': 'ListItem', position: 3, name: 'Best Digital Accounts' },
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

export default function DigitalBankAccounts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`Best Digital Business Bank Accounts UK ${new Date().getFullYear()} | Business Bank Compare`}
        description="Compare the best digital and online business bank accounts in the UK. Find app-only accounts with fast opening, low fees, and modern features. Updated March 2026."
        schema={schema}
      />
      <Navigation />

      <div className="bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-cyan-300 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/compare" className="hover:text-white no-underline">Compare</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Best Digital Accounts</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-cyan-600/30 border border-cyan-500/40 rounded-full px-3 py-1 text-xs font-semibold text-cyan-200 mb-4">
            <Star className="w-3 h-3" /> Last reviewed: March 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Best Digital Business Bank Accounts UK {new Date().getFullYear()}
          </h1>
          <p className="page-intro text-lg text-cyan-100 mb-6 leading-relaxed max-w-3xl">
            Digital business bank accounts have transformed UK business banking — offering faster opening, lower fees, and smarter features than traditional high street banks. We have reviewed {digitalBanks.length} digital accounts to find the best options for UK businesses that want modern, app-first banking.
          </p>
          <div className="key-takeaways bg-white/10 border border-white/20 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3">TL;DR — Key Takeaways</p>
            <ul className="space-y-1.5 text-sm text-cyan-50">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best overall digital bank:</strong> Starling Bank — free, FSCS-protected, top-rated app</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for teams:</strong> Monzo Business — virtual cards, spending pots, team expense management</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for international payments:</strong> Wise Business — multi-currency accounts, low FX fees</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Always check:</strong> full banking licence (FSCS) vs e-money licence (safeguarded funds)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-6 h-6 text-cyan-600" />
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
              Digital Banks vs High Street Banks: Key Differences
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 pr-4 font-bold text-gray-700">Feature</th>
                  <th className="py-2 pr-4 font-bold text-blue-700">Digital Banks</th>
                  <th className="py-2 font-bold text-gray-700">High Street Banks</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {[
                  ['Account opening time', 'Minutes to hours', '3–10 business days'],
                  ['Monthly fee', 'Often free', '£6–£12.50/month (after free period)'],
                  ['Branch access', 'No (app/web only)', 'Yes'],
                  ['Cash deposits', 'Post Office (fee applies)', 'Branch or Post Office'],
                  ['App quality', 'Excellent (4.7–4.9★)', 'Variable (2.5–4.0★)'],
                  ['Accounting integrations', 'Extensive', 'Limited'],
                  ['FSCS protection', 'Yes (licensed banks)', 'Yes'],
                  ['Overdraft facility', 'Limited', 'Yes'],
                ].map(([feature, digital, highStreet]) => (
                  <tr key={feature} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium text-gray-800">{feature}</td>
                    <td className="py-2 pr-4 text-blue-700">{digital}</td>
                    <td className="py-2">{highStreet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
          Top {digitalBanks.length} Digital Business Bank Accounts
        </h2>
        <div className="space-y-4 mb-10">
          {digitalBanks.map((bank, index) => (
            <BankCard key={bank.id} bank={bank} rank={index + 1} />
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { href: '/guides/digital-vs-high-street-banks', label: 'Digital vs High Street Banks: Full Comparison' },
              { href: '/guides/best-mobile-app-business-bank-account-uk', label: 'Best Mobile App Business Bank Accounts' },
              { href: '/guides/open-banking-for-uk-businesses-explained', label: 'Open Banking for UK Businesses Explained' },
              { href: '/guides/hub/starting-a-business-uk', label: 'Hub: How to Start a Business in the UK' },
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
