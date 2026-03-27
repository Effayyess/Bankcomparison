// Home page — matches original buscompare design exactly
// Hero image, trust bar, business type cards, bank list with show-more, account type grid, why us, guides, FAQ
import { useState } from 'react';
import { Link } from 'wouter';
import { Shield, Star, RefreshCw, ChevronDown, ChevronUp, ArrowRight, SlidersHorizontal, Info, BookOpen, Award, Clock } from 'lucide-react';
import { banks, accountTypeCategories, businessTypeCards, guides, getBanksByType, getBanksBySuitability, type AccountTypeCategory } from '@/lib/bankData';
import BankCard from '@/components/BankCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663463037748/7vygQN9pPuSYrBkN3gux2K/hero-banner-E9TkW2zNtdmXVsQo7kyxDY.webp';

const INITIAL_BANK_COUNT = 5;

const faqs = [
  {
    question: 'Do I legally need a business bank account?',
    answer: 'Limited companies are legally required to have a separate business bank account, as they are distinct legal entities from their owners. Sole traders are not legally required to have one, but it is strongly recommended for tax purposes, professionalism, and to keep personal and business finances separate. Most accountants advise all self-employed people to use a dedicated business account.',
  },
  {
    question: 'What information do I need to open a business bank account?',
    answer: 'You will typically need: proof of identity (passport or driving licence), proof of address (utility bill or bank statement dated within 3 months), your Companies House registration number (if a limited company), details of your business activities and expected turnover, and information about all directors and significant shareholders (usually those holding 25% or more). Digital banks often require less documentation and can verify identity via a smartphone selfie.',
  },
  {
    question: 'How long does it take to switch business bank accounts?',
    answer: 'If you use the Current Account Switch Service (CASS), the switch is typically completed within 7 working days of your chosen switch date. The service will transfer your balance, standing orders, and Direct Debits, and incoming payments to your old account will be automatically redirected. Look for the CASS logo to find participating banks. Digital banks often offer faster switching processes.',
  },
  {
    question: 'Can I have more than one business bank account?',
    answer: 'Yes, there is no legal restriction on having multiple business bank accounts. Many businesses use more than one account — for example, a high street bank for cash deposits and a digital account for day-to-day transactions. Some businesses also use specialist accounts for international payments alongside their primary account.',
  },
  {
    question: 'What is FSCS protection?',
    answer: 'The Financial Services Compensation Scheme (FSCS) protects eligible deposits up to £120,000 per person per authorised firm (£240,000 for joint accounts). This limit increased from £85,000 on 1 December 2025. E-money institutions like Revolut and Wise are not FSCS protected but must safeguard your funds in a separate ring-fenced account. Always check the protection status before opening an account.',
  },
  {
    question: 'What is the best free business bank account in the UK?',
    answer: 'The best free business bank accounts in the UK include Starling Bank (unlimited free transfers, free ATM withdrawals, FSCS protected), Tide (free for the first year, excellent invoicing tools), Monzo Business Lite (brilliant app, fee-free abroad), and Virgin Money M Account (free banking with 0.25% cashback). The best choice depends on your specific needs — consider whether you need cash deposits, branch access, or accounting integrations.',
  },
  {
    question: 'Which business bank account is best for a sole trader?',
    answer: 'For sole traders, the best options are typically Starling Bank (free, FSCS protected, great app), Tide (free plan, invoicing built in), and Monzo Business Lite (free, excellent mobile app). If you need branch access, HSBC or Lloyds offer free accounts with a full branch network. The right choice depends on whether you need cash deposits, accounting integrations, or international payments.',
  },
  {
    question: 'Which business bank account is best for a limited company?',
    answer: 'For limited companies, top choices include Starling Bank (free, FSCS protected, overdraft available), Revolut Business (if you need multi-currency), Tide (fast opening, good invoicing), and HSBC (free account, branch access, established reputation). Limited companies need a dedicated business account by law, so consider whether you need features like multi-user access, accounting integrations, or the ability to accept card payments.',
  },
  {
    question: 'Are digital business bank accounts safe?',
    answer: 'Yes, regulated digital business bank accounts are safe. Most are authorised by the Financial Conduct Authority (FCA) and either hold a full banking licence (like Starling and Monzo, which are FSCS protected up to £120,000) or are e-money institutions that must safeguard your funds in a separate ring-fenced account. Always check the FCA register before opening an account with any provider.',
  },
  {
    question: 'Can I get a business bank account with bad credit?',
    answer: 'Yes, several business bank accounts are available without a hard credit check. Zempler Bank (formerly Cashplus), Tide, Revolut, ANNA Money, and Countingup do not perform hard credit checks as part of their application process. These are particularly useful for new businesses or those with a limited credit history. Note that accounts with overdraft facilities will typically require a credit check.',
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors bg-transparent border-none"
      >
        <span className="font-semibold text-gray-900 text-sm leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
          {question}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-teal-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed pt-3">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [showAll, setShowAll] = useState(false);

  const featuredBanks = banks.slice(0, INITIAL_BANK_COUNT);
  const remainingBanks = banks.slice(INITIAL_BANK_COUNT);

  const currentMonth = new Date().toLocaleString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
      <Navigation />

      {/* Hero — pure dark navy, no background image, matches original exactly */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '480px', paddingTop: '88px', background: '#0a1e3c' }}
      >
        <div className="relative container py-16 md:py-20">
          <div className="max-w-2xl">
            {/* Updated badge */}
            <div className="flex items-center gap-2 mb-5">
              <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#4ade80' }}>
                <Star className="w-3.5 h-3.5" style={{ fill: '#4ade80', color: '#4ade80' }} />
                Updated {currentMonth} — Independent &amp; Unbiased
              </span>
            </div>
            {/* 3-line title: white / teal / white */}
            <h1
              className="font-bold leading-tight mb-5"
              style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
            >
              <span className="text-white">Compare the Best UK</span>
              <br />
              <span style={{ color: '#2dd4bf' }}>Business Bank</span>
              <br />
              <span className="text-white">Accounts</span>
            </h1>
            <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
              Independent expert reviews and comparisons of every major UK business bank account. Find the right account for your business — from sole traders to limited companies.
            </p>
            {/* Stats row */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
              {[
                `${banks.length} accounts compared`,
                'Updated monthly',
                'No hidden bias',
                'Expert reviewed',
              ].map((stat) => (
                <div key={stat} className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  <span style={{ color: '#2dd4bf', fontSize: '1rem' }}>✓</span>
                  {stat}
                </div>
              ))}
            </div>
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 no-underline text-white"
                style={{ background: '#0d9488' }}
              >
                Compare All Accounts
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/find-my-account"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all hover:bg-white/10 no-underline text-white"
                style={{ borderColor: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.05)' }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Find My Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            {[
              { icon: <Shield className="w-4 h-4 text-teal-500" />, text: 'FCA Regulated Providers Only' },
              { icon: <Star className="w-4 h-4 text-amber-500" />, text: '100% Independent Reviews' },
              { icon: <RefreshCw className="w-4 h-4 text-blue-500" />, text: 'Updated Monthly' },
              { icon: <Info className="w-4 h-4 text-purple-500" />, text: 'Trusted by 50,000+ UK Businesses' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                {icon}
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business type cards */}
      <section className="py-14 border-b border-gray-200" style={{ background: '#0f172a' }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/50 text-teal-300 text-xs font-semibold border border-teal-700/50 mb-4">
              Tailored Recommendations
            </div>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
              Find the Best Account for Your Business Type
            </h2>
            <p className="text-slate-400 text-sm">Tailored recommendations based on how your business is structured</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {businessTypeCards.map((card) => (
              <Link key={card.href} href={card.href} className="no-underline h-full">
                <div
                  className="rounded-xl p-4 text-center transition-all cursor-pointer group border border-slate-700 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-900/30 flex flex-col items-center justify-start h-full min-h-[120px]"
                  style={{ backgroundColor: '#1e293b' }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-xl flex-shrink-0" style={{ backgroundColor: card.color }}>
                    {card.icon}
                  </div>
                  <div
                    className="text-xs font-semibold text-slate-300 group-hover:text-teal-400 transition-colors leading-tight flex-1"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    {card.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-tight hidden sm:block">
                    {card.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bank list */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-100 mb-3"
              >
                <SlidersHorizontal className="w-3 h-3" /> Click any card to see full plan details
              </div>
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                Best UK Business Bank Accounts {new Date().getFullYear()}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Ranked by our editorial team based on fees, features, and customer satisfaction. Updated {currentMonth}.
              </p>
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-800 no-underline whitespace-nowrap"
            >
              View all {banks.length} accounts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4 mb-4">
            {featuredBanks.map((bank, i) => (
              <BankCard key={bank.id} bank={bank} rank={i + 1} />
            ))}
          </div>

          {showAll && (
            <div className="space-y-4 mb-4">
              {remainingBanks.map((bank, i) => (
                <BankCard key={bank.id} bank={bank} rank={featuredBanks.length + i + 1} />
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-3 border-2 border-teal-600 text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors bg-transparent"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              {showAll ? (
                <><ChevronUp className="w-4 h-4" /> Show fewer accounts</>
              ) : (
                <><ChevronDown className="w-4 h-4" /> Show all {banks.length} accounts</>
              )}
            </button>
            <Link
              href="/compare"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white no-underline transition-all hover:opacity-90"
              style={{ background: 'oklch(55% .12 210)', fontFamily: 'Sora, sans-serif' }}
            >
              Full comparison with filters <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong>How we rank accounts:</strong> Our rankings are based on a combination of monthly fees, transaction costs, features, customer reviews, FSCS protection status, and overall value for money. We update our data monthly. Some links are affiliate links — we may earn a commission if you open an account, but this never influences our editorial rankings.
            </p>
          </div>
        </div>
      </section>

      {/* Account type categories grid */}
      <section className="py-12" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d2a27 100%)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
              Types of Business Bank Account Available
            </h2>
            <p className="text-slate-400 text-sm">Browse by account type to find the best account for your specific needs</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {accountTypeCategories.map((cat: AccountTypeCategory) => {
              const count = cat.suitability
                ? getBanksBySuitability(cat.suitability).length
                : getBanksByType(cat.type).length;
              const catHrefMap: Record<string, string> = {
                'free': '/category/free-business-accounts',
                'fast-opening': '/category/fast-opening',
                'overdraft': '/category/overdraft',
                'multi-currency': '/category/multi-currency',
                'branch-access': '/category/high-street',
                'accounting': '/category/accounting',
                'cash-deposit': '/category/cash-deposit',
                'freelancer': '/category/freelancer',
                'startup': '/category/startup',
                'joint': '/category/partnership',
                'sole-trader': '/category/sole-trader',
                'multi-director': '/category/partnership',
                'no-credit-check': '/category/no-credit-check',
                'switcher': '/category/small-business',
                'small-business': '/category/small-business',
                'bad-credit': '/category/bad-credit',
                'international': '/category/international',
                'online': '/compare',
              };
              const href = catHrefMap[cat.type] || `/category/${cat.type}`;
              return (
                <Link key={cat.type} href={href} className="no-underline h-full">
                  <div
                    className="rounded-xl p-4 text-center transition-all cursor-pointer group border border-slate-700 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-900/30 flex flex-col items-center justify-start h-full min-h-[110px]"
                    style={{ backgroundColor: '#1e293b' }}
                  >
                    <div className="text-2xl mb-2 flex-shrink-0">{cat.icon}</div>
                    <div
                      className="text-xs font-semibold text-slate-300 group-hover:text-teal-400 transition-colors leading-tight flex-1"
                      style={{ fontFamily: 'Sora, sans-serif' }}
                    >
                      {cat.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{count} accounts</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us — matches original exactly */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              Why Compare Business Accounts With Us?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We're an independent comparison site — we're not owned by a bank and we don't favour any provider. Our rankings are based on genuine editorial assessment.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6 text-teal-600" />,
                title: 'Truly Independent',
                desc: "Our editorial team is not influenced by advertising spend. We review every account on its merits.",
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
                title: 'Always Up to Date',
                desc: "We check and update every account's fees, features, and offers every month so you get accurate information.",
              },
              {
                icon: <BookOpen className="w-6 h-6 text-purple-600" />,
                title: 'Expert Reviews',
                desc: 'Our long-form reviews cover everything: fees, features, security, customer service, and real user feedback.',
              },
              {
                icon: <Award className="w-6 h-6 text-amber-600" />,
                title: 'EEAT Compliant',
                desc: 'Our editorial team has 12+ years of financial services experience. We follow strict editorial guidelines.',
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides — matches original exactly */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                Expert Guides &amp; Resources
              </h2>
              <p className="text-gray-600 text-sm mt-1">In-depth guides to help you choose and manage your business bank account</p>
            </div>
            <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-800 no-underline whitespace-nowrap">
              All guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="no-underline group">
                <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all h-full">
                  <div className="text-2xl mb-3">{guide.icon}</div>
                  <h3
                    className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-teal-700 transition-colors leading-snug"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    {guide.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-3">
                    <Clock className="w-3 h-3" />
                    {guide.time}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Sora, sans-serif' }}>
            Frequently Asked Questions About UK Business Bank Accounts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
