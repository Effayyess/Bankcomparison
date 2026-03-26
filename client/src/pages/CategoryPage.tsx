// Design: Authoritative Broadsheet | Category SEO pages
// Sole trader, limited company, contractor, startup, freelancer, international, free, app-only, high-street

import { useParams, Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { banks, getBanksBySuitability, getBanksByType, type Suitability } from '@/lib/bankData';
import BankCard from '@/components/BankCard';
import NotFound from './NotFound';

const CATEGORY_HERO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663463044688/ARsFo8cnc8CpnHoXXZH5qW/category-hero-6Nc3QNrcoK9d5tYJhmmahE.webp';

interface CategoryConfig {
  title: string;
  h1: string;
  description: string;
  intro: string;
  getBanks: () => typeof banks;
  faq: { q: string; a: string }[];
}

const categoryConfigs: Record<string, CategoryConfig> = {
  'sole-trader': {
    title: 'Best Business Bank Accounts for Sole Traders UK 2025',
    h1: 'Best Business Bank Accounts for Sole Traders',
    description: 'Compare the best UK business bank accounts for sole traders. Find free accounts with no monthly fee, instant opening, and great accounting integrations.',
    intro: 'As a sole trader, you are not legally required to have a separate business bank account — but it is strongly recommended. Mixing personal and business finances makes tax returns harder, looks unprofessional to clients, and makes it difficult to track your business performance. The good news is that many excellent accounts are available completely free.',
    getBanks: () => getBanksBySuitability('sole-trader'),
    faq: [
      { q: 'Do sole traders need a business bank account?', a: 'Sole traders are not legally required to have a separate business bank account, unlike limited companies. However, it is strongly recommended to keep business and personal finances separate for tax purposes, professional appearance, and easier bookkeeping.' },
      { q: 'Can a sole trader get a free business bank account?', a: 'Yes — several excellent free business bank accounts are available to sole traders, including Starling Bank, Monzo Business (Lite plan), and ANNA Money (Pay as you go). These offer no monthly fee with a good range of features.' },
      { q: 'What documents do I need to open a sole trader account?', a: 'Typically you will need: proof of identity (passport or driving licence), proof of address (utility bill or bank statement), your UTR number if you have one, and details about your business. Most app-only banks can verify your identity digitally.' },
    ],
  },
  'limited-company': {
    title: 'Best Business Bank Accounts for Limited Companies UK 2025',
    h1: 'Best Business Bank Accounts for Limited Companies',
    description: 'Compare the best UK business bank accounts for limited companies. Limited companies must have a separate business account — find the right one here.',
    intro: 'Unlike sole traders, limited companies are legally required to have a separate business bank account. This is because a limited company is a distinct legal entity from its directors and shareholders. The account must be in the company\'s name, and all business income and expenses must pass through it.',
    getBanks: () => getBanksBySuitability('limited-company'),
    faq: [
      { q: 'Do limited companies need a business bank account?', a: 'Yes — limited companies are legally required to have a business bank account in the company\'s name. This is because a limited company is a separate legal entity from its directors, and all company finances must be kept separate from personal finances.' },
      { q: 'What is the best business bank account for a new limited company?', a: 'For new limited companies, we recommend Starling Bank (free, FSCS protected, excellent app) or NatWest Business (free for 24 months for new businesses, full branch access). Monzo Business is also excellent for startups.' },
      { q: 'Can I use a personal bank account for my limited company?', a: 'No — you must not use a personal bank account for limited company transactions. This would breach your company\'s legal obligations and could create significant accounting and tax complications.' },
    ],
  },
  'contractor': {
    title: 'Best Business Bank Accounts for Contractors UK 2025',
    h1: 'Best Business Bank Accounts for Contractors',
    description: 'Compare the best UK business bank accounts for contractors and consultants. Find accounts with great invoicing tools, accounting integrations, and low fees.',
    intro: 'Contractors — whether operating through a limited company or as sole traders — have specific banking needs. You need an account that makes invoicing clients straightforward, integrates with accounting software, and keeps costs low during quiet periods. Many contractors also benefit from accounts that handle multiple clients and projects clearly.',
    getBanks: () => getBanksBySuitability('contractor'),
    faq: [
      { q: 'What is the best bank account for a contractor?', a: 'For contractors, we recommend Starling Bank (free, excellent accounting integrations, FSCS protected) or Tide (strong invoicing tools, good for managing multiple clients). If you operate through a limited company, you must have a separate business account.' },
      { q: 'Do contractors need a business bank account?', a: 'If you operate through a limited company, yes — you are legally required to have a business account. If you are a sole trader contractor, it is not legally required but strongly recommended for professional invoicing and tax purposes.' },
      { q: 'Which bank accounts have the best invoicing for contractors?', a: 'Tide has particularly strong built-in invoicing tools, including automatic payment chasing. Starling and Monzo also offer invoicing features. ANNA Money is specifically designed with invoicing and tax management in mind.' },
    ],
  },
  'startup': {
    title: 'Best Business Bank Accounts for Startups UK 2025',
    h1: 'Best Business Bank Accounts for Startups',
    description: 'Compare the best UK business bank accounts for startups. Find accounts with free periods, easy opening, and features designed for growing businesses.',
    intro: 'Choosing the right bank account is one of the first decisions a startup founder needs to make. You need an account that is easy to open quickly, has low or no fees while you are getting started, and offers the features you will need as you grow — from accounting integrations to international payments.',
    getBanks: () => getBanksBySuitability('startup'),
    faq: [
      { q: 'What is the best bank account for a startup?', a: 'For startups, we recommend Monzo Business (excellent free tier, great expense management) or Starling Bank (free, FSCS protected, fast to open). NatWest Business offers 24 months free for new businesses if you prefer a high street bank.' },
      { q: 'Can I open a business bank account before my company is registered?', a: 'No — you need to have registered your limited company with Companies House before you can open a business bank account in the company\'s name. However, you can open a sole trader account immediately.' },
      { q: 'How quickly can I open a startup business bank account?', a: 'App-only banks like Starling and Monzo can open accounts on the same day, often within minutes. High street banks typically take 3–7 days and may require a branch visit.' },
    ],
  },
  'freelancer': {
    title: 'Best Business Bank Accounts for Freelancers UK 2025',
    h1: 'Best Business Bank Accounts for Freelancers',
    description: 'Compare the best UK business bank accounts for freelancers. Find free accounts with invoicing tools, expense tracking, and tax management features.',
    intro: 'Freelancers need a business bank account that makes managing irregular income straightforward, helps with invoicing clients, and keeps tax preparation as painless as possible. The best accounts for freelancers combine low costs with smart financial tools.',
    getBanks: () => getBanksBySuitability('freelancer'),
    faq: [
      { q: 'Do freelancers need a business bank account?', a: 'Freelancers operating as sole traders are not legally required to have a separate business account, but it is highly recommended. It makes invoicing more professional, simplifies tax returns, and helps you track your business finances clearly.' },
      { q: 'What is the best free bank account for a freelancer?', a: 'Starling Bank is our top pick for freelancers — it is completely free, FSCS protected, and has excellent invoicing and accounting tools. ANNA Money is also excellent for freelancers who want built-in tax management.' },
      { q: 'Which bank accounts help with self-assessment tax returns?', a: 'ANNA Money is specifically designed to help with self-assessment, including automatic tax estimates and VAT return preparation. Countingup also has built-in accounting software. Starling, Monzo, and Tide all integrate with accounting software like Xero and QuickBooks.' },
    ],
  },
  'international': {
    title: 'Best Multi-Currency Business Bank Accounts UK 2025',
    h1: 'Best Business Bank Accounts for International Businesses',
    description: 'Compare the best UK business bank accounts for international businesses. Find multi-currency accounts with competitive exchange rates and global payment capabilities.',
    intro: 'If your business operates internationally — whether you are selling to overseas customers, paying international suppliers, or employing staff abroad — you need a business bank account with strong international capabilities. The best accounts offer multi-currency wallets, competitive exchange rates, and low international transfer fees.',
    getBanks: () => getBanksBySuitability('international'),
    faq: [
      { q: 'What is the best multi-currency business bank account in the UK?', a: 'Wise Business is our top pick for international businesses — it holds 40+ currencies, uses real mid-market exchange rates, and offers local bank details in 10+ countries. Revolut Business and Airwallex are also excellent for international operations.' },
      { q: 'Which UK business bank accounts support international payments?', a: 'Most major banks support international payments, but the costs vary significantly. App-only banks like Wise, Revolut, and Airwallex offer the most competitive rates. High street banks like HSBC and Barclays also support international payments but typically charge higher fees.' },
      { q: 'Do I need a separate account for international payments?', a: 'You do not necessarily need a separate account, but many businesses find it beneficial to use a specialist multi-currency account (like Wise or Revolut) alongside their main UK business account for international transactions.' },
    ],
  },
  'free-business-accounts': {
    title: 'Best Free Business Bank Accounts UK 2025',
    h1: 'Best Free Business Bank Accounts',
    description: 'Compare the best free UK business bank accounts with no monthly fee. Find accounts that are genuinely free with no hidden charges.',
    intro: 'A growing number of excellent business bank accounts are available with no monthly fee. These free accounts are not stripped-down products — many offer features that rival or exceed paid alternatives, including accounting integrations, invoicing tools, and FSCS protection.',
    getBanks: () => banks.filter((b) => b.monthlyFee === 0),
    faq: [
      { q: 'Are free business bank accounts any good?', a: 'Yes — free business bank accounts have improved dramatically in recent years. Starling Bank, for example, is completely free and consistently rated as one of the best business bank accounts in the UK. Free does not mean inferior.' },
      { q: 'What is the catch with free business bank accounts?', a: 'Some free accounts charge for specific transactions (e.g., Tide charges 20p per transfer on its free plan). Others are free for a limited period (e.g., Barclays is free for 12 months). Always check the full fee schedule before opening.' },
      { q: 'Which free business bank accounts are FSCS protected?', a: 'Starling Bank is the standout free business account that is also FSCS protected. Zempler Bank also offers a free option with FSCS protection. Most other free accounts (Monzo, Tide, Revolut) are e-money institutions and not FSCS protected.' },
    ],
  },
  'app-only-banks': {
    title: 'Best App-Only Business Bank Accounts UK 2025',
    h1: 'Best App-Only Business Bank Accounts',
    description: 'Compare the best digital-only UK business bank accounts. Fast to open, feature-rich, and often free — the best app banks for UK businesses.',
    intro: 'App-only business bank accounts have transformed UK business banking. With no physical branches, these digital-first banks can offer lower fees, faster account opening, and more innovative features than traditional high street banks. The best app-only accounts are now the top choice for most UK small businesses.',
    getBanks: () => getBanksByType('app-only'),
    faq: [
      { q: 'Are app-only business bank accounts safe?', a: 'Yes — the major app-only banks are regulated by the FCA and PRA. Starling Bank is a fully licensed bank with FSCS protection. Others like Monzo, Tide, and Revolut are e-money institutions, which means your money is held in segregated accounts but not FSCS protected.' },
      { q: 'Can I deposit cash with an app-only business account?', a: 'Most app-only banks allow cash deposits via Post Office (Starling, Tide) or PayPoint (Monzo), though fees may apply. Revolut does not accept cash deposits at all. If you regularly handle cash, this is an important consideration.' },
      { q: 'How quickly can I open an app-only business account?', a: 'Most app-only banks can open accounts on the same day, often within minutes. You will need to verify your identity digitally using your phone camera and a valid ID document.' },
    ],
  },
  'high-street-banks': {
    title: 'Best High Street Business Bank Accounts UK 2025',
    h1: 'Best High Street Business Bank Accounts',
    description: 'Compare the best UK high street business bank accounts. Find traditional banks with branch access, overdrafts, and full business banking services.',
    intro: 'High street business bank accounts remain the preferred choice for businesses that need branch access, cash handling facilities, or the full range of traditional banking services including overdrafts, loans, and relationship managers. While they typically charge monthly fees after an initial free period, they offer capabilities that app-only banks cannot match.',
    getBanks: () => getBanksByType('high-street'),
    faq: [
      { q: 'Which high street bank is best for business?', a: 'Barclays Business is our top-rated high street business bank, offering a strong digital platform alongside its branch network. NatWest Business is also excellent, particularly for new businesses as it offers 24 months free.' },
      { q: 'Do high street banks charge for business accounts?', a: 'Most high street banks offer a free period (typically 12–24 months for new businesses) before charging a monthly fee of around £6–£8.50. Transaction fees are usually included in the monthly fee.' },
      { q: 'When should I choose a high street bank over an app-only bank?', a: 'Choose a high street bank if you regularly deposit cash, need an overdraft or business loan, want a relationship manager, or prefer face-to-face banking. For most small businesses with low cash handling needs, an app-only bank will offer better value.' },
    ],
  },
};

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || '';
  const config = categoryConfigs[slug];

  if (!config) {
    return <NotFound />;
  }

  const categoryBanks = config.getBanks();

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.98 0.008 85)' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '280px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${CATEGORY_HERO})` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, oklch(0.15 0.07 155 / 0.9) 0%, oklch(0.15 0.07 155 / 0.7) 100%)' }} />
        <div className="relative container py-12">
          <nav className="flex items-center gap-2 text-sm mb-4" style={{ color: 'oklch(0.75 0.02 85)' }}>
            <Link href="/" className="hover:underline" style={{ color: 'oklch(0.85 0.02 85)' }}>Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: 'oklch(0.85 0.02 85)' }}>{config.h1}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.98 0.01 85)' }}>
            {config.h1}
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'oklch(0.85 0.02 85)' }}>
            {config.description}
          </p>
        </div>
      </section>

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Intro */}
            <div className="bank-card p-6 mb-6">
              <p className="text-base leading-relaxed" style={{ color: 'oklch(0.3 0.02 65)', fontFamily: 'Libre Baskerville, serif' }}>
                {config.intro}
              </p>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                {categoryBanks.length} Accounts Found
              </h2>
            </div>

            <div className="space-y-4 mb-10">
              {categoryBanks.map((bank, index) => (
                <BankCard key={bank.id} bank={bank} rank={index + 1} />
              ))}
            </div>

            {/* FAQ */}
            <div className="bank-card p-6">
              <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                {config.faq.map((item) => (
                  <div key={item.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                      {item.q}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.35 0.02 65)', fontFamily: 'Libre Baskerville, serif' }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bank-card p-5">
                <h3 className="font-bold text-sm mb-3 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif', color: 'oklch(0.28 0.09 155)' }}>
                  Other Categories
                </h3>
                <ul className="space-y-2">
                  {Object.entries(categoryConfigs)
                    .filter(([key]) => key !== slug)
                    .slice(0, 8)
                    .map(([key, cat]) => (
                      <li key={key}>
                        <Link
                          href={`/category/${key}`}
                          className="text-sm hover:underline flex items-center gap-1"
                          style={{ color: 'oklch(0.28 0.09 155)' }}
                        >
                          <ChevronRight className="w-3 h-3" />
                          {cat.h1.replace('Best Business Bank Accounts for ', '').replace('Best ', '')}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="bank-card p-5">
                <h3 className="font-bold text-sm mb-3 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif', color: 'oklch(0.28 0.09 155)' }}>
                  Useful Guides
                </h3>
                <ul className="space-y-2">
                  {[
                    { label: 'How to Open a Business Account', href: '/guides/how-to-open-a-business-bank-account' },
                    { label: 'Best Free Accounts', href: '/guides/best-free-business-bank-accounts' },
                    { label: 'Fees Explained', href: '/guides/business-bank-account-fees' },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-sm hover:underline flex items-center gap-1" style={{ color: 'oklch(0.28 0.09 155)' }}>
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
    </div>
  );
}
