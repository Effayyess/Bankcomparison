// Hub Pillar Page: Business Banking Fees Explained
// Target keyword: "business bank account fees UK"

import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronRight, BookOpen, PoundSterling, ArrowLeftRight, Globe, Banknote, Calculator } from 'lucide-react';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Business Banking Fees Explained: Complete UK Guide 2026',
      description: 'The complete guide to UK business banking fees. Covers monthly fees, transaction charges, cash deposit fees, international payment costs, and how to avoid unnecessary charges.',
      url: 'https://www.businessbankcompare.co.uk/guides/hub/business-banking-fees-explained',
      dateModified: '2026-03-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.businessbankcompare.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://www.businessbankcompare.co.uk/guides' },
          { '@type': 'ListItem', position: 3, name: 'Business Banking Fees Explained' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much does a business bank account cost per month in the UK?',
          acceptedAnswer: { '@type': 'Answer', text: 'UK business bank account fees range from £0 (free accounts like Starling Bank and Monzo) to £12.50+ per month for premium high street bank accounts. Many high street banks offer free introductory periods of 12–30 months before charging monthly fees. Digital challenger banks typically offer permanently free accounts or low-cost plans starting from £5–£9 per month for premium features.' },
        },
        {
          '@type': 'Question',
          name: 'Are business bank account fees tax deductible?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes — business bank account fees are generally tax deductible as a legitimate business expense. This includes monthly account fees, transaction charges, and other banking costs incurred wholly and exclusively for business purposes. You should record these expenses in your accounts and include them in your self-assessment tax return or corporation tax return.' },
        },
        {
          '@type': 'Question',
          name: 'What are CHAPS fees and when do you pay them?',
          acceptedAnswer: { '@type': 'Answer', text: 'CHAPS (Clearing House Automated Payment System) is a same-day high-value payment system used for large transfers, property purchases, and time-critical payments. CHAPS fees typically range from £15 to £35 per payment at high street banks. Some digital banks offer free or lower-cost CHAPS payments. CHAPS is typically used for payments above £10,000 or when same-day guaranteed delivery is required.' },
        },
      ],
    },
  ],
};

const feeCategories = [
  {
    icon: <PoundSterling className="w-6 h-6" />,
    title: 'Monthly Account Fees',
    summary: 'The base cost of holding a business account. Ranges from £0 (free digital accounts) to £12.50+ for premium high street accounts. Many banks offer free introductory periods.',
    typical: '£0 – £12.50/month',
    spokes: [
      { href: '/guides/are-business-bank-accounts-free-in-the-uk', label: 'Are Business Bank Accounts Free in the UK?' },
      { href: '/guides/how-much-does-a-business-bank-account-cost-per-month', label: 'How Much Does a Business Account Cost?' },
      { href: '/guides/what-is-an-introductory-free-banking-period-business-account-uk', label: 'What is an Introductory Free Banking Period?' },
      { href: '/free-business-bank-accounts', label: 'Best Free Business Bank Accounts' },
    ],
  },
  {
    icon: <ArrowLeftRight className="w-6 h-6" />,
    title: 'Transaction Fees',
    summary: 'Charges per payment made or received. Digital banks typically offer free UK transfers. High street banks may charge 20p–35p per transaction after a free allowance.',
    typical: '£0 – £0.35 per transaction',
    spokes: [
      { href: '/guides/business-bank-account-transaction-fees-explained', label: 'Transaction Fees Explained' },
      { href: '/guides/what-are-faster-payments-and-are-they-free', label: 'Are Faster Payments Free?' },
      { href: '/guides/what-are-chaps-payment-fees-and-when-do-you-pay-them', label: 'CHAPS Fees Explained' },
      { href: '/guides/hidden-fees-in-business-bank-accounts-uk', label: 'Hidden Fees to Watch Out For' },
    ],
  },
  {
    icon: <Banknote className="w-6 h-6" />,
    title: 'Cash Deposit Fees',
    summary: 'Charges for depositing physical cash. Most digital banks charge £1–£3 per deposit at Post Office counters. High street banks typically allow free branch deposits.',
    typical: '£0 – £3 per deposit',
    spokes: [
      { href: '/guides/cash-deposit-fees-business-accounts-explained', label: 'Cash Deposit Fees Explained' },
      { href: '/guides/how-to-avoid-business-banking-fees-uk', label: 'How to Avoid Banking Fees' },
    ],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'International Payment Fees',
    summary: 'Charges for sending money abroad or receiving international payments. Specialist providers like Wise and Airwallex offer significantly lower rates than high street banks.',
    typical: '£5 – £35 per payment (high street) vs 0.5%–1% (specialist)',
    spokes: [
      { href: '/guides/international-transfer-fees-for-uk-business-accounts', label: 'International Transfer Fees Explained' },
      { href: '/guides/multi-currency-business-bank-account-uk', label: 'Multi-Currency Business Accounts' },
      { href: '/guides/hub/switching-business-bank-account', label: 'Hub: Switching to Save on Fees' },
    ],
  },
];

export default function BusinessBankingFeesHub() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Business Banking Fees Explained: Complete UK Guide 2026 | Business Bank Compare"
        description="The complete guide to UK business banking fees. Monthly fees, transaction charges, cash deposit costs, international payments, and how to avoid unnecessary charges."
        schema={schema}
      />
      <Navigation />

      <div className="bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-orange-300 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/guides" className="hover:text-white no-underline">Guides</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Business Banking Fees Explained</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-orange-600/30 border border-orange-500/40 rounded-full px-3 py-1 text-xs font-semibold text-orange-200 mb-4">
            <BookOpen className="w-3 h-3" /> Hub Guide — Last reviewed: March 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Business Banking Fees Explained: Complete UK Guide {new Date().getFullYear()}
          </h1>
          <p className="text-lg text-orange-100 mb-6 leading-relaxed max-w-3xl">
            Business banking fees can be confusing — and expensive if you do not understand what you are paying for. This hub guide breaks down every type of fee you might encounter, from monthly account charges to international transfer costs, and shows you how to minimise them.
          </p>
          <div className="bg-white/10 border border-white/20 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-300 mb-3">TL;DR — Key Takeaways</p>
            <ul className="space-y-1.5 text-sm text-orange-50">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Many UK business accounts are <strong>genuinely free</strong> — no monthly fee, no transaction charges</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> High street banks often have <strong>hidden fees</strong> for cash deposits, CHAPS, and international payments</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> <strong>All banking fees are tax deductible</strong> as a legitimate business expense</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Use our <strong>fee comparison calculator</strong> to find the cheapest account for your usage pattern</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Fee categories */}
        <div className="space-y-6 mb-12">
          {feeCategories.map((cat) => (
            <div key={cat.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-start gap-4 p-6 border-b border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center text-white">
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{cat.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">{cat.summary}</p>
                  <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
                    <span className="text-xs font-semibold text-orange-700">Typical range: {cat.typical}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Related Guides</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {cat.spokes.map(spoke => (
                    <Link key={spoke.href} href={spoke.href} className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 no-underline group py-0.5">
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      {spoke.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calculators CTA */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Calculate Your True Banking Costs</h2>
          </div>
          <p className="text-sm text-gray-600 mb-5">Use our free calculators to work out which bank account is cheapest for your specific usage pattern.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/calculators/fee-comparison" className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 no-underline hover:border-blue-400 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900 group-hover:text-blue-700">Fee Comparison Calculator</p>
                <p className="text-xs text-gray-500">Compare fees across multiple banks</p>
              </div>
            </Link>
            <Link href="/calculators/business-cost" className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 no-underline hover:border-blue-400 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900 group-hover:text-blue-700">Business Cost Calculator</p>
                <p className="text-xs text-gray-500">Calculate your total annual banking cost</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/guides" className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 no-underline">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to All Guides
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
