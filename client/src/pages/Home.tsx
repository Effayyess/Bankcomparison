// Home page — matches original buscompare design exactly
// Hero image, trust bar, business type cards, bank list with show-more, account type grid, why us, guides, FAQ
import { useState } from 'react';
import { Link } from 'wouter';
import { Shield, Star, RefreshCw, ChevronDown, ChevronUp, ArrowRight, SlidersHorizontal, Info } from 'lucide-react';
import { banks, accountTypeCategories, businessTypeCards, guides, getBanksByType, getBanksBySuitability } from '@/lib/bankData';
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
    answer: 'The Financial Services Compensation Scheme (FSCS) protects eligible deposits up to £85,000 per person per authorised firm (£170,000 for joint accounts). Some newer banks, like Tide (via ClearBank), offer protection up to £120,000. E-money institutions like Revolut and Wise are not FSCS protected but must safeguard your funds in a separate account. Always check the protection status before opening an account.',
  },
  {
    question: 'What is the best free business bank account in the UK?',
    answer: 'The best free business bank accounts in the UK include Starling Bank (unlimited free transfers, free ATM withdrawals, FSCS protected), Tide (free for the first year, excellent invoicing tools), Monzo Business Lite (brilliant app, fee-free abroad), and Virgin Money M Account (free banking with 0.25% cashback). The best choice depends on your specific needs — consider whether you need cash deposits, branch access, or accounting integrations.',
  },
  {
    question: 'Which business bank account is best for a sole trader?',
    answer: 'For sole traders, the best options are typically Starling Bank (free, FSCS protected, great app), Tide (free plan, invoicing built in), and Monzo Business Lite (free, excellent mobile app). If you need branch access, HSBC or Lloyds offer free accounts with a full branch network. The right choice depends on whether you need cash deposits, accounting integrations, or international payments.',
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

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '420px', paddingTop: '88px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(10,30,60,0.92) 0%, rgba(10,30,60,0.75) 60%, rgba(10,30,60,0.45) 100%)' }}
        />
        <div className="relative container py-16 md:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: 'oklch(55% .12 210)', color: 'white' }}
              >
                Updated {currentMonth}
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Compare UK Business Bank Accounts
            </h1>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Independent reviews of {banks.length} UK business bank accounts. Find the right account for your sole trader, limited company or startup — with no hidden agenda.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 no-underline text-white"
                style={{ background: 'oklch(55% .12 210)' }}
              >
                Compare All Accounts
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/best-business-bank-account-sole-trader"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all hover:bg-white/10 no-underline text-white"
                style={{ borderColor: 'rgba(255,255,255,0.4)' }}
              >
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
      <section className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
              Find the Best Account for Your Business Type
            </h2>
            <p className="text-gray-600 text-sm">Tailored recommendations based on how your business is structured</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {businessTypeCards.map((card) => (
              <Link key={card.href} href={card.href} className="no-underline">
                <div
                  className="rounded-xl p-4 text-center hover:shadow-md transition-all cursor-pointer group border border-gray-200 hover:border-teal-300"
                  style={{ backgroundColor: card.color }}
                >
                  <div className="text-2xl mb-2">{card.icon}</div>
                  <div
                    className="text-xs font-bold text-gray-800 group-hover:text-teal-700 transition-colors leading-tight"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    {card.title}
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
              <BankCard key={bank.id} bank={bank} rank={i + 1} showOffer={true} />
            ))}
          </div>

          {showAll && (
            <div className="space-y-4 mb-4">
              {remainingBanks.map((bank, i) => (
                <BankCard key={bank.id} bank={bank} rank={featuredBanks.length + i + 1} showOffer={true} />
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
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
              Types of Business Bank Account Available
            </h2>
            <p className="text-gray-600 text-sm">Browse by account type to find the best account for your specific needs</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {accountTypeCategories.map((cat) => {
              const count = (cat as any).suitability
                ? getBanksBySuitability((cat as any).suitability).length
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
                <Link key={cat.type} href={href} className="no-underline">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer group">
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <div
                      className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors leading-tight"
                      style={{ fontFamily: 'Sora, sans-serif' }}
                    >
                      {cat.label}
                    </div>
                    <div className="text-xs text-gray-500">{count} accounts</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
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
                icon: '🏆',
                title: 'Truly Independent',
                desc: "Our editorial team is not influenced by advertising spend. We review every account on its merits.",
              },
              {
                icon: '🔄',
                title: 'Updated Monthly',
                desc: 'We update fees, offers, and account details every month to ensure you always see accurate information.',
              },
              {
                icon: '📊',
                title: 'Data-Driven Rankings',
                desc: 'Our rankings use a weighted scoring system covering fees, features, customer ratings, and FSCS protection.',
              },
              {
                icon: '🤝',
                title: 'No Favouritism',
                desc: 'We compare all 22 UK business bank accounts — high street and digital — on the same criteria.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                Business Banking Guides
              </h2>
              <p className="text-gray-600 text-sm mt-1">Expert guides to help you make the right choice</p>
            </div>
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
                  <div className="flex items-center justify-between mt-auto pt-3">
                    <span className="text-xs text-gray-500">{guide.time}</span>
                    <span className="text-xs font-semibold text-teal-600 flex items-center gap-1">
                      Read guide <ArrowRight className="w-3 h-3" />
                    </span>
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Sora, sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
