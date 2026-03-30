// Hub Pillar Page: How to Start a Business in the UK
// Target keyword: "how to start a business UK"
// Spokes: opening accounts, sole trader vs ltd, documents needed, registering, etc.

import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronRight, BookOpen, Building2, FileText, CreditCard, Calculator, Users } from 'lucide-react';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'How to Start a Business in the UK: Complete Guide 2026',
      description: 'The complete guide to starting a business in the UK. Covers choosing a structure, registering with Companies House, opening a bank account, and managing your finances.',
      url: 'https://www.businessbankcompare.co.uk/guides/hub/starting-a-business-uk',
      dateModified: '2026-03-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.businessbankcompare.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://www.businessbankcompare.co.uk/guides' },
          { '@type': 'ListItem', position: 3, name: 'How to Start a Business in the UK' },
        ],
      },
    },
    {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.hub-intro', '.hub-steps'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I start a business in the UK?',
          acceptedAnswer: { '@type': 'Answer', text: 'To start a business in the UK, you need to: choose a business structure (sole trader or limited company), register with HMRC and/or Companies House, open a business bank account, register for VAT if your turnover will exceed £90,000, and set up your accounting and record-keeping systems.' },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost to start a business in the UK?',
          acceptedAnswer: { '@type': 'Answer', text: 'The minimum cost to start a UK business is very low. Registering as a sole trader with HMRC is free. Registering a limited company with Companies House costs £50 online. You can open a free business bank account with providers like Starling Bank at no cost. The main startup costs depend on your specific business type and sector.' },
        },
        {
          '@type': 'Question',
          name: 'Should I be a sole trader or limited company?',
          acceptedAnswer: { '@type': 'Answer', text: 'The choice depends on your circumstances. Sole trader status is simpler and cheaper to set up, but you have unlimited personal liability for business debts. A limited company provides liability protection and can be more tax-efficient above certain income levels, but involves more administrative obligations. Most accountants recommend considering a limited company once your annual profit exceeds around £30,000–£50,000.' },
        },
      ],
    },
  ],
};

const steps = [
  {
    number: '01',
    icon: <Building2 className="w-6 h-6" />,
    title: 'Choose Your Business Structure',
    summary: 'Decide between sole trader, limited company, partnership, or LLP. This affects your tax, liability, and administrative obligations.',
    spokes: [
      { href: '/guides/sole-trader-business-bank-account', label: 'Sole Trader Banking Guide' },
      { href: '/guides/limited-company-business-bank-account', label: 'Limited Company Banking Guide' },
      { href: '/guides/do-sole-traders-need-a-business-bank-account', label: 'Do Sole Traders Need a Business Account?' },
      { href: '/guides/partnership-business-bank-accounts-uk', label: 'Partnership Bank Accounts' },
    ],
  },
  {
    number: '02',
    icon: <FileText className="w-6 h-6" />,
    title: 'Register Your Business',
    summary: 'Sole traders register with HMRC for Self Assessment. Limited companies register with Companies House (£50 online). Both must register for VAT if turnover exceeds £90,000.',
    spokes: [
      { href: '/guides/how-to-open-a-business-bank-account-as-a-new-limited-company', label: 'Opening an Account as a New Ltd Company' },
      { href: '/guides/can-i-open-business-bank-account-before-company-registered', label: 'Can I Open an Account Before Registration?' },
      { href: '/guides/what-do-i-need-to-open-a-business-bank-account-uk', label: 'What Documents Do I Need?' },
    ],
  },
  {
    number: '03',
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Open a Business Bank Account',
    summary: 'A dedicated business bank account is essential — legally required for limited companies, strongly recommended for sole traders. Choose between digital banks (fast, free) and high street banks (branch access, overdrafts).',
    spokes: [
      { href: '/guides/how-to-open-a-business-bank-account', label: 'How to Open a Business Bank Account' },
      { href: '/guides/digital-vs-high-street-banks', label: 'Digital vs High Street Banks' },
      { href: '/guides/business-account-vs-personal-account', label: 'Business vs Personal Account' },
      { href: '/best-business-bank-accounts-for-startups', label: 'Best Accounts for Startups' },
      { href: '/free-business-bank-accounts', label: 'Best Free Business Accounts' },
    ],
  },
  {
    number: '04',
    icon: <Calculator className="w-6 h-6" />,
    title: 'Set Up Your Accounting & Tax',
    summary: 'From day one, keep clear records of all income and expenses. Use accounting software that integrates with your bank account to automate bookkeeping and prepare for your tax return.',
    spokes: [
      { href: '/guides/business-bank-account-fees', label: 'Understanding Business Banking Fees' },
      { href: '/guides/are-business-bank-account-fees-tax-deductible-uk', label: 'Are Banking Fees Tax Deductible?' },
      { href: '/calculators/business-cost', label: 'Business Banking Cost Calculator' },
      { href: '/calculators/fee-comparison', label: 'Fee Comparison Calculator' },
    ],
  },
  {
    number: '05',
    icon: <Users className="w-6 h-6" />,
    title: 'Understand Your Banking Needs',
    summary: 'As your business grows, your banking needs will evolve. Consider accounts that support international payments, multiple team members, expense cards, and overdraft facilities.',
    spokes: [
      { href: '/guides/open-banking-for-uk-businesses-explained', label: 'Open Banking for UK Businesses' },
      { href: '/guides/multi-currency-business-bank-account-uk', label: 'Multi-Currency Business Accounts' },
      { href: '/guides/business-bank-accounts-with-expense-cards', label: 'Accounts with Expense Cards' },
      { href: '/guides/business-bank-accounts-overdraft-facilities-uk', label: 'Accounts with Overdraft Facilities' },
    ],
  },
];

const relatedLandingPages = [
  { href: '/best-business-bank-accounts-for-startups', label: 'Best Accounts for Startups', desc: 'Top picks for new businesses' },
  { href: '/free-business-bank-accounts', label: 'Free Business Accounts', desc: 'Accounts with no monthly fee' },
  { href: '/best-sole-trader-bank-accounts', label: 'Best Sole Trader Accounts', desc: 'For the self-employed' },
  { href: '/best-business-bank-accounts-for-limited-companies', label: 'Best Ltd Company Accounts', desc: 'For incorporated businesses' },
  { href: '/best-digital-business-bank-accounts', label: 'Best Digital Accounts', desc: 'App-only banking' },
  { href: '/business-bank-accounts-no-credit-check', label: 'No Credit Check Accounts', desc: 'For adverse credit histories' },
];

export default function StartingABusinessHub() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="How to Start a Business in the UK: Complete Guide 2026 | Business Bank Compare"
        description="The complete guide to starting a business in the UK. Covers choosing a structure, registering, opening a bank account, and managing your finances. Updated March 2026."
        schema={schema}
      />
      <Navigation />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-blue-300 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/guides" className="hover:text-white no-underline">Guides</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">How to Start a Business in the UK</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-blue-600/30 border border-blue-500/40 rounded-full px-3 py-1 text-xs font-semibold text-blue-200 mb-4">
            <BookOpen className="w-3 h-3" /> Hub Guide — Last reviewed: March 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            How to Start a Business in the UK: Complete Guide {new Date().getFullYear()}
          </h1>
          <p className="hub-intro text-lg text-blue-100 mb-6 leading-relaxed max-w-3xl">
            Starting a business in the UK is more accessible than ever. This hub guide covers every step of the journey — from choosing your business structure and registering with HMRC or Companies House, to opening the right bank account and setting up your finances for long-term success.
          </p>
          <div className="hub-steps bg-white/10 border border-white/20 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">What This Guide Covers</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {steps.map(s => (
                <div key={s.number} className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{s.number}</div>
                  <div className="text-xs text-blue-200 mt-1">{s.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Steps with spokes */}
        <div className="space-y-8 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-start gap-4 p-6 border-b border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  {step.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step {step.number}</div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{step.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.summary}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Related Guides</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {step.spokes.map(spoke => (
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

        {/* Compare accounts CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center mb-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Ready to Open a Business Bank Account?</h2>
          <p className="text-blue-100 mb-6 text-sm">Compare all 37 UK business bank accounts side by side — filter by fee, features, and business type.</p>
          <Link href="/compare" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold text-sm no-underline hover:bg-blue-50 transition-colors">
            Compare All Accounts <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related landing pages */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
            Find the Right Account for Your Business
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedLandingPages.map(page => (
              <Link key={page.href} href={page.href} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all no-underline group">
                <p className="font-bold text-sm text-gray-900 group-hover:text-blue-700 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{page.label}</p>
                <p className="text-xs text-gray-500">{page.desc}</p>
                <div className="flex items-center gap-1 text-blue-600 text-xs mt-2">
                  View accounts <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to guides */}
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
