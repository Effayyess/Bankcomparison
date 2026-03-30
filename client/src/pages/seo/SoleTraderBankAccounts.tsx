// SEO Landing Page: Best Sole Trader Bank Accounts UK
// Target keyword: "sole trader bank account UK"

import { Link } from 'wouter';
import { banks } from '@/lib/bankData';
import BankCard from '@/components/BankCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronRight, Star } from 'lucide-react';

const soleTraderBankIds = ['starling', 'monzo', 'mettle', 'tide', 'anna', 'countingup', 'revolut', 'wise', 'hsbc', 'natwest', 'lloyds', 'zempler'];
const soleTraderBanks = soleTraderBankIds
  .map(id => banks.find(b => b.id === id))
  .filter(Boolean) as typeof banks;

const faqs = [
  {
    q: 'Do sole traders need a business bank account?',
    a: 'Sole traders are not legally required to have a separate business bank account — unlike limited companies. However, it is strongly recommended. Mixing personal and business finances makes tax returns significantly more complicated, can create problems with HMRC, and looks unprofessional to clients. Most accountants advise sole traders to open a dedicated business account from day one.',
  },
  {
    q: 'What is the best bank account for a sole trader in the UK?',
    a: 'For most UK sole traders, Starling Bank is the top choice — it is free, FSCS-protected, opens in minutes, and has excellent accounting integrations. Mettle by NatWest is also excellent and includes a free FreeAgent subscription, which is ideal for sole traders who need help with invoicing and self-assessment tax returns.',
  },
  {
    q: 'Can a sole trader use a personal bank account for business?',
    a: 'Technically yes, but it is strongly inadvisable. Using a personal account for business transactions makes it much harder to track income and expenses for your self-assessment tax return, can complicate your relationship with HMRC, and may breach your personal bank account\'s terms and conditions if used for commercial purposes.',
  },
  {
    q: 'Is a sole trader bank account free?',
    a: 'Many sole trader bank accounts are genuinely free. Starling Bank, Monzo Business (Lite), Mettle by NatWest, and Wise Business all offer free accounts for sole traders with no monthly fee. Some high street banks offer free introductory periods of 12–24 months.',
  },
  {
    q: 'Can a sole trader have multiple bank accounts?',
    a: 'Yes — there is no legal restriction on the number of bank accounts a sole trader can hold. Many sole traders use a primary current account for day-to-day transactions and a separate savings account for setting aside tax provisions. See our guide on managing multiple accounts as a sole trader.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `Best Sole Trader Bank Accounts UK ${new Date().getFullYear()}`,
      description: 'Compare the best UK bank accounts for sole traders. Find free accounts with invoicing tools, tax management, and accounting integrations designed for the self-employed.',
      url: 'https://www.businessbankcompare.co.uk/best-sole-trader-bank-accounts',
      dateModified: '2026-03-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.businessbankcompare.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.businessbankcompare.co.uk/compare' },
          { '@type': 'ListItem', position: 3, name: 'Best for Sole Traders' },
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

export default function SoleTraderBankAccounts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`Best Sole Trader Bank Accounts UK ${new Date().getFullYear()} | Business Bank Compare`}
        description="Compare the best UK bank accounts for sole traders. Find free accounts with invoicing tools, tax management, and accounting integrations. Updated March 2026."
        schema={schema}
      />
      <Navigation />

      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-purple-300 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/compare" className="hover:text-white no-underline">Compare</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Best for Sole Traders</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-purple-600/30 border border-purple-500/40 rounded-full px-3 py-1 text-xs font-semibold text-purple-200 mb-4">
            <Star className="w-3 h-3" /> Last reviewed: March 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Best Sole Trader Bank Accounts UK {new Date().getFullYear()}
          </h1>
          <p className="page-intro text-lg text-purple-100 mb-6 leading-relaxed max-w-3xl">
            There are over 4.2 million sole traders in the UK. Whether you are a freelancer, tradesperson, consultant, or self-employed professional, choosing the right bank account can save you time, money, and significant stress at tax time. We have reviewed {soleTraderBanks.length} accounts to find the best options for sole traders in {new Date().getFullYear()}.
          </p>
          <div className="key-takeaways bg-white/10 border border-white/20 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">TL;DR — Key Takeaways</p>
            <ul className="space-y-1.5 text-sm text-purple-50">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best overall:</strong> Starling Bank — free, FSCS-protected, excellent app</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for tax management:</strong> Mettle by NatWest — free FreeAgent subscription included</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for invoicing:</strong> ANNA Money — built-in invoicing and tax reminders</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best for tradespeople:</strong> Tide — easy cash deposits, strong expense tracking</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Sole traders are NOT legally required to have a business account</strong> — but it is strongly recommended</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Do Sole Traders Need a Business Bank Account?
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Unlike limited company directors, sole traders are not legally required to maintain a separate business bank account. As a sole trader, you and your business are legally the same entity — there is no legal separation of finances. However, the practical and financial arguments for having a dedicated account are overwhelming.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            HMRC expects sole traders to maintain clear records of business income and expenses for their self-assessment tax return. Mixing personal and business transactions in a single account makes this process significantly more difficult and time-consuming. It also increases the risk of errors that could trigger an HMRC enquiry.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Beyond tax, a dedicated business account looks more professional to clients, makes it easier to track cash flow, and gives you a clearer picture of your business's financial health. Given that many of the best sole trader accounts are completely free, there is very little reason not to have one.
          </p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
          Top {soleTraderBanks.length} Bank Accounts for Sole Traders
        </h2>
        <div className="space-y-4 mb-10">
          {soleTraderBanks.map((bank, index) => (
            <BankCard key={bank.id} bank={bank} rank={index + 1} />
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Related Guides for Sole Traders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { href: '/guides/do-sole-traders-need-a-business-bank-account', label: 'Do Sole Traders Need a Business Bank Account?' },
              { href: '/guides/sole-trader-business-bank-account', label: 'Sole Trader Business Bank Account Guide' },
              { href: '/guides/can-i-use-my-personal-bank-account-for-business-in-the-uk', label: 'Can I Use My Personal Account for Business?' },
              { href: '/guides/sole-trader-multiple-bank-accounts-uk', label: 'Can a Sole Trader Have Multiple Accounts?' },
              { href: '/guides/how-to-open-self-employed-business-bank-account-uk', label: 'How to Open a Self-Employed Bank Account' },
              { href: '/guides/hub/starting-a-business-uk', label: 'Hub: Complete Guide to Starting a Business in the UK' },
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
