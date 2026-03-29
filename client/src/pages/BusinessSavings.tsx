import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BankCard from '@/components/BankCard';
import SEO from '@/components/SEO';
import { banks } from '@/lib/bankData';
import { Link } from 'wouter';
import { ChevronRight, ShieldCheck, TrendingUp, Percent, Info } from 'lucide-react';

const savingsBanks = banks.filter((b) => b.hasSavingsProduct === true);

const faq = [
  {
    q: 'What is a business savings account?',
    a: 'A business savings account is a separate account designed to help businesses earn interest on surplus cash. Unlike a current account, it is not used for day-to-day transactions — it holds money you do not need immediately, earning a competitive AER (Annual Equivalent Rate) in return.',
  },
  {
    q: 'Is my money protected in a business savings account?',
    a: 'Accounts held with UK-authorised banks (Shawbrook, Aldermore, Starling, Monzo etc.) are protected by the FSCS up to £85,000 per institution. Revolut Business savings are held in a safeguarded account — not FSCS-protected — so the protection mechanism is different.',
  },
  {
    q: 'What is the difference between easy access, notice, and fixed-rate savings?',
    a: 'Easy access accounts let you withdraw at any time with no penalty — ideal for emergency funds. Notice accounts require you to give advance notice (e.g. 60 or 95 days) before withdrawing, in exchange for a higher rate. Fixed-rate accounts lock your money for a set term (e.g. 1 or 2 years) and typically offer the highest rates.',
  },
  {
    q: 'Can a sole trader open a business savings account?',
    a: 'Yes — sole traders can open business savings accounts with most providers. Aldermore and Shawbrook accept sole traders as well as limited companies and partnerships.',
  },
  {
    q: 'How much interest can my business earn?',
    a: 'Rates vary by provider and account type. Easy access rates range from around 3.00% to 4.35% AER, notice accounts up to 4.75% AER, and fixed-rate accounts up to 5.05% AER. Use our Savings Interest Calculator to estimate your earnings.',
  },
];

export default function BusinessSavings() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
      <SEO
        title={`Best Business Savings Accounts UK ${new Date().getFullYear()} | Business Bank Compare`}
        description="Compare the best UK business savings accounts. Find the highest AER rates from Shawbrook, Aldermore, Starling, Tide, Monzo and Revolut. FSCS-protected options available."
      />
      <Navigation />
      <div style={{ paddingTop: '88px' }}>
        {/* Hero */}
        <div
          className="relative py-12"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)' }}
        >
          <div className="container">
            <nav className="flex items-center gap-2 text-xs text-blue-200 mb-4">
              <Link href="/" className="hover:text-white no-underline">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/compare" className="hover:text-white no-underline">Compare</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">Business Savings Accounts</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              Best Business Savings Accounts UK {new Date().getFullYear()}
            </h1>
            <p className="text-blue-100 text-base max-w-2xl mb-6">
              Compare the best UK business savings accounts. Earn competitive interest on your surplus cash with FSCS-protected options from specialist savings banks and leading digital providers.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                <TrendingUp className="w-4 h-4 text-green-300" />
                <span className="text-sm text-white font-medium">Up to 5.05% AER</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                <ShieldCheck className="w-4 h-4 text-green-300" />
                <span className="text-sm text-white font-medium">FSCS-protected options</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                <Percent className="w-4 h-4 text-green-300" />
                <span className="text-sm text-white font-medium">{savingsBanks.length} providers compared</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <p className="text-sm leading-relaxed text-gray-700">
                  A business savings account is one of the simplest ways to put your surplus cash to work. Whether you are building a tax reserve, saving for a future investment, or simply want your money earning more than it would in a current account, the right savings account can make a meaningful difference. We compare all the leading UK business savings providers — from specialist savings banks like Shawbrook and Aldermore to digital accounts from Starling, Tide, Monzo, and Revolut.
                </p>
              </div>

              <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Interest rates shown are indicative and subject to change. Always check the provider's website for the latest rates before applying. Revolut Business savings are held in a safeguarded account and are not FSCS-protected. All other providers listed are UK-authorised banks with FSCS protection up to £85,000.
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {savingsBanks.length} Providers with Business Savings
                </h2>
              </div>

              <div className="space-y-4 mb-10">
                {savingsBanks.map((bank, index) => (
                  <BankCard key={bank.id} bank={bank} rank={index + 1} />
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-5">
                  {faq.map((item) => (
                    <div key={item.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                      <h3 className="font-bold text-sm mb-2 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                        {item.q}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-600">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                <div className="bank-card p-5">
                  <h3 className="font-bold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Compare Accounts
                  </h3>
                  <ul className="space-y-1.5">
                    {[
                      { key: 'sole-trader',            label: 'Sole Trader Accounts' },
                      { key: 'startup',                label: 'Startup Accounts' },
                      { key: 'free-business-accounts', label: 'Free Business Accounts' },
                      { key: 'no-credit-check',        label: 'No Credit Check Accounts' },
                      { key: 'high-street-banks',      label: 'High Street Banks' },
                      { key: 'app-only-banks',         label: 'Online Business Accounts' },
                      { key: 'multi-currency',         label: 'Multi-Currency Accounts' },
                      { key: 'accounting',             label: 'With Accountancy' },
                      { key: 'cash-deposit',           label: 'Cash Deposit Accounts' },
                      { key: 'overdraft',              label: 'Accounts With Overdraft' },
                    ].map((item) => (
                      <li key={item.key}>
                        <Link href={`/category/${item.key}`} className="text-sm hover:text-blue-700 flex items-center gap-1 no-underline text-blue-600">
                          <ChevronRight className="w-3 h-3" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bank-card p-5">
                  <h3 className="font-bold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Savings Tools
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { label: 'Savings Interest Calculator', href: '/calculators/savings-interest' },
                      { label: 'Business Banking Cost Calculator', href: '/calculators/business-cost' },
                      { label: 'Fee Comparison Calculator', href: '/calculators/fee-comparison' },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="text-sm hover:text-blue-700 flex items-center gap-1 no-underline text-blue-600">
                          <ChevronRight className="w-3 h-3" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bank-card p-5">
                  <h3 className="font-bold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Useful Guides
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { label: 'FSCS Protection Guide', href: '/guides/fscs-protection-business-bank-accounts' },
                      { label: 'Best Free Accounts', href: '/guides/best-free-business-bank-accounts' },
                      { label: 'How to Open a Business Account', href: '/guides/how-to-open-a-business-bank-account' },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="text-sm hover:text-blue-700 flex items-center gap-1 no-underline text-blue-600">
                          <ChevronRight className="w-3 h-3" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
