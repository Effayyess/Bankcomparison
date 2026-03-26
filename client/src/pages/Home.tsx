// Design: Authoritative Broadsheet | Homepage
// Hero with editorial image, filter bar, ranked comparison list, trust signals

import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Search, SlidersHorizontal, ChevronRight, Shield, Star, Users, BookOpen } from 'lucide-react';
import { banks, type Suitability } from '@/lib/bankData';
import BankCard from '@/components/BankCard';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663463044688/ARsFo8cnc8CpnHoXXZH5qW/hero-banner-QH3zDDY8iZ35VEwqrBVBnA.webp';

const suitabilityFilters: { value: Suitability | 'all'; label: string }[] = [
  { value: 'all', label: 'All Businesses' },
  { value: 'sole-trader', label: 'Sole Trader' },
  { value: 'limited-company', label: 'Limited Company' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'startup', label: 'Startup' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'international', label: 'International' },
];

const typeFilters: { value: string; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'app-only', label: 'App-Only' },
  { value: 'high-street', label: 'High Street' },
  { value: 'challenger', label: 'Challenger' },
];

const feeFilters: { value: string; label: string }[] = [
  { value: 'all', label: 'Any Fee' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
];

export default function Home() {
  const [suitability, setSuitability] = useState<Suitability | 'all'>('all');
  const [bankType, setBankType] = useState('all');
  const [feeType, setFeeType] = useState('all');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return banks.filter((bank) => {
      if (suitability !== 'all' && !bank.suitability.includes(suitability)) return false;
      if (bankType !== 'all' && bank.type !== bankType) return false;
      if (feeType === 'free' && bank.monthlyFee !== 0) return false;
      if (feeType === 'paid' && bank.monthlyFee === 0) return false;
      if (search && !bank.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [suitability, bankType, feeType, search]);

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.98 0.008 85)' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '420px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, oklch(0.15 0.07 155 / 0.92) 0%, oklch(0.15 0.07 155 / 0.75) 60%, oklch(0.15 0.07 155 / 0.4) 100%)' }} />
        <div className="relative container py-16 md:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'oklch(0.72 0.12 82)', color: 'oklch(0.15 0.04 155)' }}>
                Updated March 2025
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.98 0.01 85)' }}
            >
              Compare UK Business Bank Accounts
            </h1>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'oklch(0.85 0.02 85)' }}>
              Independent reviews of 22 UK business bank accounts. Find the right account for your sole trader, limited company or startup — with no hidden agenda.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: 'oklch(0.72 0.12 82)', color: 'oklch(0.15 0.04 155)' }}
              >
                Compare All Accounts
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/guides/how-to-open-a-business-bank-account"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm border transition-all hover:bg-white/10"
                style={{ borderColor: 'oklch(0.85 0.02 85)', color: 'oklch(0.98 0.01 85)' }}
              >
                <BookOpen className="w-4 h-4" />
                Read Our Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="border-b border-gray-200" style={{ background: 'white' }}>
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm">
            {[
              { icon: <Shield className="w-4 h-4" />, text: '22 Banks Reviewed' },
              { icon: <Star className="w-4 h-4" />, text: 'Independent & Unbiased' },
              { icon: <Users className="w-4 h-4" />, text: 'Trusted by 50,000+ Business Owners' },
              { icon: <BookOpen className="w-4 h-4" />, text: 'Updated Monthly' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2" style={{ color: 'oklch(0.45 0.01 65)' }}>
                <span style={{ color: 'oklch(0.28 0.09 155)' }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bank-card p-5">
                <h3 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif', color: 'oklch(0.28 0.09 155)' }}>
                  Filter Accounts
                </h3>

                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: 'oklch(0.55 0.01 65)' }}>
                    Business Type
                  </label>
                  <div className="space-y-1">
                    {suitabilityFilters.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => setSuitability(f.value)}
                        className="w-full text-left px-3 py-1.5 rounded text-sm transition-all"
                        style={{
                          background: suitability === f.value ? 'oklch(0.28 0.09 155)' : 'transparent',
                          color: suitability === f.value ? 'white' : 'oklch(0.35 0.02 65)',
                          border: 'none',
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: 'oklch(0.55 0.01 65)' }}>
                    Account Type
                  </label>
                  <div className="space-y-1">
                    {typeFilters.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => setBankType(f.value)}
                        className="w-full text-left px-3 py-1.5 rounded text-sm transition-all"
                        style={{
                          background: bankType === f.value ? 'oklch(0.28 0.09 155)' : 'transparent',
                          color: bankType === f.value ? 'white' : 'oklch(0.35 0.02 65)',
                          border: 'none',
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: 'oklch(0.55 0.01 65)' }}>
                    Monthly Fee
                  </label>
                  <div className="space-y-1">
                    {feeFilters.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => setFeeType(f.value)}
                        className="w-full text-left px-3 py-1.5 rounded text-sm transition-all"
                        style={{
                          background: feeType === f.value ? 'oklch(0.28 0.09 155)' : 'transparent',
                          color: feeType === f.value ? 'white' : 'oklch(0.35 0.02 65)',
                          border: 'none',
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="mt-4 bank-card p-4">
                <h3 className="font-bold text-xs mb-3 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif', color: 'oklch(0.28 0.09 155)' }}>
                  Popular Guides
                </h3>
                <ul className="space-y-2">
                  {[
                    { label: 'How to Open a Business Account', href: '/guides/how-to-open-a-business-bank-account' },
                    { label: 'Best Free Accounts', href: '/guides/best-free-business-bank-accounts' },
                    { label: 'Sole Trader Guide', href: '/guides/sole-trader-business-bank-account' },
                    { label: 'Switching Banks', href: '/guides/switching-business-bank-account' },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-xs hover:underline flex items-center gap-1" style={{ color: 'oklch(0.28 0.09 155)' }}>
                        <ChevronRight className="w-3 h-3" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main list */}
          <div className="flex-1 min-w-0">
            {/* Search + mobile filter toggle */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'oklch(0.6 0.01 65)' }} />
                <input
                  type="text"
                  placeholder="Search banks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: 'oklch(0.88 0.01 85)', background: 'white', color: 'oklch(0.18 0.02 65)', '--tw-ring-color': 'oklch(0.28 0.09 155)' } as React.CSSProperties}
                />
              </div>
              <button
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium"
                style={{ borderColor: 'oklch(0.88 0.01 85)', background: 'white', color: 'oklch(0.28 0.09 155)' }}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Mobile filters */}
            {showFilters && (
              <div className="lg:hidden bank-card p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: 'oklch(0.55 0.01 65)' }}>Business Type</label>
                    <div className="flex flex-wrap gap-1">
                      {suitabilityFilters.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => setSuitability(f.value)}
                          className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                          style={{
                            background: suitability === f.value ? 'oklch(0.28 0.09 155)' : 'oklch(0.94 0.005 85)',
                            color: suitability === f.value ? 'white' : 'oklch(0.35 0.02 65)',
                            border: 'none',
                          }}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: 'oklch(0.55 0.01 65)' }}>Fee</label>
                    <div className="flex flex-wrap gap-1">
                      {feeFilters.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => setFeeType(f.value)}
                          className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                          style={{
                            background: feeType === f.value ? 'oklch(0.28 0.09 155)' : 'oklch(0.94 0.005 85)',
                            color: feeType === f.value ? 'white' : 'oklch(0.35 0.02 65)',
                            border: 'none',
                          }}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                  {suitability === 'all' ? 'All Business Bank Accounts' : `Best Accounts for ${suitabilityFilters.find(f => f.value === suitability)?.label}`}
                </h2>
                <p className="text-sm mt-0.5" style={{ color: 'oklch(0.55 0.01 65)' }}>
                  Showing {filtered.length} of {banks.length} accounts
                </p>
              </div>
            </div>

            {/* Bank cards */}
            {filtered.length === 0 ? (
              <div className="bank-card p-12 text-center">
                <p className="text-lg font-semibold mb-2" style={{ color: 'oklch(0.35 0.02 65)' }}>No accounts match your filters</p>
                <p className="text-sm" style={{ color: 'oklch(0.55 0.01 65)' }}>Try adjusting your filters to see more results</p>
                <button
                  onClick={() => { setSuitability('all'); setBankType('all'); setFeeType('all'); setSearch(''); }}
                  className="mt-4 px-4 py-2 rounded text-sm font-medium"
                  style={{ background: 'oklch(0.28 0.09 155)', color: 'white', border: 'none' }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((bank, index) => (
                  <BankCard key={bank.id} bank={bank} rank={index + 1} />
                ))}
              </div>
            )}

            {/* Bottom editorial note */}
            <div className="mt-8 p-5 rounded-lg border-l-4" style={{ background: 'oklch(0.95 0.02 155)', borderColor: 'oklch(0.28 0.09 155)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.3 0.02 65)' }}>
                <strong>How we rank accounts:</strong> Our rankings are based on a combination of monthly fees, transaction costs, features, customer reviews, FSCS protection status, and overall value for money. We update our data monthly. Some links are affiliate links — we may earn a commission if you open an account, but this never influences our editorial rankings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category quick links */}
      <section className="border-t border-gray-200 py-12" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-divider" />
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
            Compare by Business Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Sole Trader', href: '/category/sole-trader', icon: '👤', desc: 'Self-employed accounts' },
              { label: 'Limited Company', href: '/category/limited-company', icon: '🏢', desc: 'Ltd company banking' },
              { label: 'Contractor', href: '/category/contractor', icon: '🔧', desc: 'Contractor-friendly' },
              { label: 'Startup', href: '/category/startup', icon: '🚀', desc: 'New business accounts' },
              { label: 'Freelancer', href: '/category/freelancer', icon: '💻', desc: 'Freelance banking' },
              { label: 'International', href: '/category/international', icon: '🌍', desc: 'Multi-currency' },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="bank-card p-4 text-center hover:no-underline group"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-sm mb-1 group-hover:underline" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.28 0.09 155)' }}>
                  {cat.label}
                </div>
                <div className="text-xs" style={{ color: 'oklch(0.55 0.01 65)' }}>{cat.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured guides */}
      <section className="py-12" style={{ background: 'oklch(0.98 0.008 85)' }}>
        <div className="container">
          <div className="section-divider" />
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
            Business Banking Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'How to Open a Business Bank Account', href: '/guides/how-to-open-a-business-bank-account', desc: 'Step-by-step guide to opening your first business account in the UK, including what documents you need.' },
              { title: 'Best Free Business Bank Accounts 2025', href: '/guides/best-free-business-bank-accounts', desc: 'Our pick of the best no-fee business bank accounts available to UK businesses right now.' },
              { title: 'Sole Trader Bank Account Guide', href: '/guides/sole-trader-business-bank-account', desc: 'Do sole traders need a business account? What are the best options? We answer all your questions.' },
              { title: 'Limited Company Banking Guide', href: '/guides/limited-company-business-bank-account', desc: 'Limited companies must have a separate business account. Here\'s how to choose the right one.' },
              { title: 'How to Switch Business Bank Accounts', href: '/guides/switching-business-bank-account', desc: 'Switching is easier than you think. Our guide walks you through the process step by step.' },
              { title: 'Business Bank Account Fees Explained', href: '/guides/business-bank-account-fees', desc: 'Monthly fees, transaction charges, cash deposit fees — we break down every cost to watch out for.' },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="bank-card p-5 hover:no-underline group"
              >
                <h3 className="font-bold text-base mb-2 group-hover:underline" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                  {guide.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.45 0.01 65)' }}>
                  {guide.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: 'oklch(0.28 0.09 155)' }}>
                  Read guide <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
