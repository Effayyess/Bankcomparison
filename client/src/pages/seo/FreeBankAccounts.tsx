// SEO Landing Page: Free Business Bank Accounts UK
// Target keyword: "free business bank account UK"

import { Link } from 'wouter';
import { banks } from '@/lib/bankData';
import BankCard from '@/components/BankCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronRight, Star, CheckCircle, AlertCircle } from 'lucide-react';

const freeBankIds = ['starling', 'monzo', 'mettle', 'wise', 'anna', 'countingup', 'revolut', 'tide', 'zempler', 'worldfirst', 'natwest', 'hsbc'];
const freeBanks = freeBankIds
  .map(id => banks.find(b => b.id === id))
  .filter(Boolean) as typeof banks;

const faqs = [
  {
    q: 'Are there genuinely free business bank accounts in the UK?',
    a: 'Yes — several UK business bank accounts are permanently free with no monthly fee. Starling Bank, Monzo Business (Lite tier), Mettle, and Wise Business all offer free accounts with no hidden charges for standard UK transactions. Some high street banks offer free introductory periods (typically 12–30 months) before charging a monthly fee.',
  },
  {
    q: 'What is the catch with free business bank accounts?',
    a: 'Truly free accounts may charge for specific transactions such as cash deposits, CHAPS payments, or international transfers. Always check the fee schedule for the transactions relevant to your business. Some "free" accounts are only free for a limited introductory period — after which a monthly fee applies.',
  },
  {
    q: 'Which is the best free business bank account in the UK?',
    a: 'Starling Bank is widely considered the best genuinely free UK business bank account. It has no monthly fee, no charge for UK transfers, full FSCS protection, and an excellent mobile app. Monzo Business is a close second, particularly for businesses that value expense management tools.',
  },
  {
    q: 'Can a limited company get a free business bank account?',
    a: 'Yes — both Starling Bank and Monzo Business offer free accounts for limited companies. Mettle is free but is currently available only to sole traders and single-director limited companies. High street banks like NatWest and HSBC offer free introductory periods for new limited companies.',
  },
  {
    q: 'How long are introductory free banking periods?',
    a: 'Introductory free periods vary by bank. NatWest Business offers 24 months free for new businesses. HSBC Small Business Banking Account offers 12 months free. Barclays Business offers 12 months free for new startups. After the free period ends, standard monthly fees typically range from £6 to £12.50 per month.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `Free Business Bank Accounts UK ${new Date().getFullYear()}`,
      description: 'Compare the best free UK business bank accounts. Find genuinely free accounts with no monthly fee, plus introductory free banking offers from high street banks.',
      url: 'https://www.businessbankcompare.co.uk/free-business-bank-accounts',
      dateModified: '2026-03-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.businessbankcompare.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.businessbankcompare.co.uk/compare' },
          { '@type': 'ListItem', position: 3, name: 'Free Business Accounts' },
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

export default function FreeBankAccounts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`Free Business Bank Accounts UK ${new Date().getFullYear()} | Business Bank Compare`}
        description="Compare the best free UK business bank accounts. Find genuinely free accounts with no monthly fee, plus introductory free banking offers from high street banks. Updated March 2026."
        schema={schema}
      />
      <Navigation />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-emerald-300 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/compare" className="hover:text-white no-underline">Compare</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Free Business Accounts</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-emerald-600/30 border border-emerald-500/40 rounded-full px-3 py-1 text-xs font-semibold text-emerald-200 mb-4">
            <Star className="w-3 h-3" /> Last reviewed: March 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Best Free Business Bank Accounts UK {new Date().getFullYear()}
          </h1>
          <p className="page-intro text-lg text-emerald-100 mb-6 leading-relaxed max-w-3xl">
            Not all "free" business bank accounts are created equal. Some are genuinely free forever; others offer a limited introductory period before monthly fees kick in. We've reviewed {freeBanks.length} accounts to separate the truly free from the temporarily free — so you can make an informed choice.
          </p>
          <div className="key-takeaways bg-white/10 border border-white/20 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">TL;DR — Key Takeaways</p>
            <ul className="space-y-1.5 text-sm text-emerald-50">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best permanently free:</strong> Starling Bank — no monthly fee, ever</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best free for sole traders:</strong> Mettle by NatWest — free with FreeAgent included</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best free introductory period:</strong> NatWest Business — 24 months free for new businesses</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>Best free for international business:</strong> Wise Business — free to open, low-cost FX</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Permanently free vs introductory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h2 className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>Permanently Free Accounts</h2>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">These accounts have no monthly fee — not now, not ever. They are free as a permanent product, not a promotional offer.</p>
            <ul className="space-y-1 text-xs text-gray-700">
              {['Starling Bank', 'Monzo Business (Lite)', 'Mettle by NatWest', 'Wise Business', 'ANNA Money (PAYG)', 'CountingUp (Basic)'].map(b => (
                <li key={b} className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-green-500" />{b}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h2 className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>Introductory Free Periods</h2>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">These accounts are free for a limited period, after which a monthly fee applies. Useful for new businesses wanting a high street bank.</p>
            <ul className="space-y-1 text-xs text-gray-700">
              {[
                'NatWest Business — 24 months free',
                'HSBC Small Business — 12 months free',
                'Barclays Business — 12 months free',
                'Lloyds Business — 12 months free',
                'Co-operative Bank — 30 months free',
              ].map(b => (
                <li key={b} className="flex items-center gap-1.5"><AlertCircle className="w-3 h-3 text-amber-500" />{b}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bank listings */}
        <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
          Top {freeBanks.length} Free Business Bank Accounts
        </h2>
        <div className="space-y-4 mb-10">
          {freeBanks.map((bank, index) => (
            <BankCard key={bank.id} bank={bank} rank={index + 1} />
          ))}
        </div>

        {/* Editorial */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Are Free Business Bank Accounts Worth It?
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The short answer is yes — for the vast majority of UK small businesses and sole traders, a free business bank account is not just "good enough"; it is often the best option available. The rise of digital challenger banks has fundamentally changed the economics of business banking, and free accounts from providers like Starling and Monzo now offer features that would have cost £20+ per month from a high street bank just a decade ago.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The key distinction to understand is between <strong>permanently free accounts</strong> and <strong>introductory free periods</strong>. Starling Bank, Monzo Business (Lite), and Mettle are genuinely free with no time limit — their business model is built around premium upgrades and other financial products, not monthly account fees. High street banks, by contrast, use free introductory periods as an acquisition tool, with standard fees kicking in after 12–30 months.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            The one area where free accounts sometimes fall short is <strong>cash deposit handling</strong>. Most digital-only free accounts charge for cash deposits (typically £1–£3 per deposit at Post Office counters), which can add up for cash-heavy businesses like retailers or hospitality operators. If your business regularly handles significant cash volumes, a high street bank account — even one with a monthly fee — may ultimately be more cost-effective.
          </p>
        </div>

        {/* Related guides */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { href: '/guides/are-business-bank-accounts-free-in-the-uk', label: 'Are Business Bank Accounts Free in the UK?' },
              { href: '/guides/business-bank-account-fees', label: 'Business Bank Account Fees Explained' },
              { href: '/guides/how-to-avoid-business-banking-fees-uk', label: 'How to Avoid Business Banking Fees' },
              { href: '/guides/what-is-an-introductory-free-banking-period-business-account-uk', label: 'What is an Introductory Free Banking Period?' },
              { href: '/guides/how-much-does-a-business-bank-account-cost-per-month', label: 'How Much Does a Business Account Cost?' },
              { href: '/guides/hub/business-banking-fees-explained', label: 'Hub: Business Banking Fees Explained' },
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
