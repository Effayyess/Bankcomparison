// Compare page — full comparison list with sticky filters and advanced filtering
// Matches original buscompare design: blue accents, Sora font
import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp, RotateCcw, TrendingUp } from 'lucide-react';
import { banks } from '@/lib/bankData';
import BankCard from '@/components/BankCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

// ─── Filter definitions ────────────────────────────────────────────────────────

const suitabilityFilters = [
  { value: 'all', label: 'All Businesses' },
  { value: 'sole-trader', label: 'Sole Trader' },
  { value: 'limited-company', label: 'Limited Company' },
  { value: 'startup', label: 'Startup' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'small-business', label: 'Small Business' },
  { value: 'international', label: 'International' },
  { value: 'savings', label: 'Savings Accounts' },
];

const typeFilters = [
  { value: 'all', label: 'All Types' },
  { value: 'digital', label: 'Digital / App' },
  { value: 'highstreet', label: 'High Street' },
  { value: 'challenger', label: 'Challenger' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'fee-asc', label: 'Lowest Fee' },
  { value: 'fee-desc', label: 'Highest Fee' },
  { value: 'name', label: 'A–Z' },
];

// Advanced feature toggles — each maps to a boolean field on BankAccount
const advancedFeatureFilters: {
  key: string;
  label: string;
  description: string;
  emoji: string;
  filterFn: (bank: (typeof banks)[0]) => boolean;
}[] = [
  {
    key: 'noFee',
    label: 'No Monthly Fee',
    description: 'Free accounts only',
    emoji: '£',
    filterFn: (b) => b.monthlyFeeNum === 0,
  },
  {
    key: 'noCreditCheck',
    label: 'No Credit Check',
    description: 'Apply without a hard credit search',
    emoji: '✓',
    filterFn: (b) => !!b.hasNoCreditCheck,
  },
  {
    key: 'fscs',
    label: 'FSCS Protected',
    description: 'Deposits protected up to £120,000',
    emoji: '🛡',
    filterFn: (b) => !!b.fscsProtection,
  },
  {
    key: 'branchAccess',
    label: 'Branch Access',
    description: 'Visit a physical branch',
    emoji: '🏦',
    filterFn: (b) => !!b.hasBranchAccess,
  },
  {
    key: 'cashDeposits',
    label: 'Cash Deposits',
    description: 'Deposit cash at Post Office or branch',
    emoji: '💵',
    filterFn: (b) => !!b.hasCashDeposits,
  },
  {
    key: 'international',
    label: 'International Payments',
    description: 'Send & receive international transfers',
    emoji: '🌍',
    filterFn: (b) => !!b.internationalPayments,
  },
  {
    key: 'accounting',
    label: 'Accounting Integration',
    description: 'Connects to Xero, QuickBooks, FreeAgent',
    emoji: '📊',
    filterFn: (b) => !!b.hasAccounting,
  },
  {
    key: 'fastOpening',
    label: 'Fast Account Opening',
    description: 'Open an account in minutes',
    emoji: '⚡',
    filterFn: (b) => !!b.hasFastOpening,
  },
];

// ─── Quick-filter pill presets ─────────────────────────────────────────────────
const quickFilterPresets: { label: string; features: string[] }[] = [
  { label: 'Free & No Credit Check', features: ['noFee', 'noCreditCheck'] },
  { label: 'Best for Startups', features: ['noFee', 'fastOpening'] },
  { label: 'Traditional Banking', features: ['branchAccess', 'fscs', 'cashDeposits'] },
  { label: 'International Business', features: ['international', 'fscs'] },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Compare() {
  const [suitability, setSuitability] = useState('all');
  const [bankType, setBankType] = useState('all');
  const [feeType, setFeeType] = useState('all');
  const [activeFeatures, setActiveFeatures] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Sentinel ref for sticky detection
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-88px 0px 0px 0px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  function toggleFeature(key: string) {
    setActiveFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function applyPreset(features: string[]) {
    setActiveFeatures(new Set(features));
    setShowFilters(true);
  }

  // Savings-only banks (no current account) — only show in 'all' and 'savings' views
  const SAVINGS_ONLY_IDS = ['aldermore', 'shawbrook'];

  const filtered = useMemo(() => {
    // Savings view: show only banks with a savings product
    if (suitability === 'savings') {
      return banks.filter((bank) => {
        if (!bank.hasSavingsProduct) return false;
        if (
          search &&
          !bank.name.toLowerCase().includes(search.toLowerCase()) &&
          !bank.provider.toLowerCase().includes(search.toLowerCase())
        ) return false;
        return true;
      });
    }

    let result = banks.filter((bank) => {
      // Always exclude savings-only banks (Aldermore, Shawbrook) from all views except savings
      if (SAVINGS_ONLY_IDS.includes(bank.id)) return false;

      if (suitability !== 'all' && !bank.suitableFor.includes(suitability)) return false;
      if (bankType !== 'all' && bank.type !== bankType) return false;
      if (feeType === 'free' && bank.monthlyFeeNum !== 0) return false;
      if (feeType === 'paid' && bank.monthlyFeeNum === 0) return false;
      // Advanced feature filters
      for (const key of Array.from(activeFeatures)) {
        const filter = advancedFeatureFilters.find((f) => f.key === key);
        if (filter && !filter.filterFn(bank)) return false;
      }
      if (
        search &&
        !bank.name.toLowerCase().includes(search.toLowerCase()) &&
        !bank.provider.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });

    if (sortBy !== 'featured') {
      result = [...result].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'fee-asc') return a.monthlyFeeNum - b.monthlyFeeNum;
        if (sortBy === 'fee-desc') return b.monthlyFeeNum - a.monthlyFeeNum;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
    }

    return result;
  }, [suitability, bankType, feeType, activeFeatures, search, sortBy]);

  const hasActiveFilters =
    suitability !== 'all' ||
    bankType !== 'all' ||
    feeType !== 'all' ||
    activeFeatures.size > 0 ||
    !!search;

  const activeFilterCount =
    (suitability !== 'all' ? 1 : 0) +
    (bankType !== 'all' ? 1 : 0) +
    (feeType !== 'all' ? 1 : 0) +
    activeFeatures.size +
    (search ? 1 : 0);

  function clearFilters() {
    setSuitability('all');
    setBankType('all');
    setFeeType('all');
    setActiveFeatures(new Set());
    setSearch('');
  }

  const compareSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Best UK Business Bank Accounts ${new Date().getFullYear()}`,
      description: `Compare all ${banks.length} UK business bank accounts. Independent comparison by Business Bank Compare.`,
      numberOfItems: banks.length,
      itemListElement: banks.slice(0, 20).map((bank, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${bank.name} Business Bank Account`,
        url: `https://businessbankcompare.co.uk/${bank.slug}`,
        description: bank.tagline,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
      <SEO
        title={`Compare Business Bank Accounts UK ${new Date().getFullYear()} | ${banks.length} Accounts Compared`}
        description={`Compare all ${banks.length} UK business bank accounts side by side. Filter by fees, features, FSCS protection, business type, and more. Find the best account for sole traders, limited companies, and startups.`}
        keywords="compare business bank accounts UK, business bank account comparison, best business bank account UK, business current account comparison, UK business banking comparison, free business bank account comparison, sole trader bank account comparison, limited company bank account"
        canonicalPath="/compare"
        dateModified={new Date().toISOString().split('T')[0]}
        breadcrumbs={[
          { name: 'Home', url: 'https://businessbankcompare.co.uk/' },
          { name: 'Compare Business Bank Accounts', url: 'https://businessbankcompare.co.uk/compare' },
        ]}
        schema={compareSchema}
      />
      <Navigation />

      <div style={{ paddingTop: '88px' }}>
        {/* Page header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container py-8">
            <h1
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Compare Business Bank Accounts UK {new Date().getFullYear()}
            </h1>
            <p className="text-gray-600 text-sm">
              Independent comparison of {banks.length} UK business bank accounts. Filter by business type, features,
              and fees.
            </p>

            {/* Quick-filter presets */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs font-semibold text-gray-500 self-center mr-1">Quick filters:</span>
              {quickFilterPresets.map((preset) => {
                const isActive =
                  preset.features.length === activeFeatures.size &&
                  preset.features.every((f) => activeFeatures.has(f));
                return (
                  <button
                    key={preset.label}
                    onClick={() => (isActive ? clearFilters() : applyPreset(preset.features))}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                    style={
                      isActive
                        ? { background: '#0a1e3c', color: 'white', borderColor: '#0a1e3c' }
                        : { background: 'white', color: '#374151', borderColor: '#e5e7eb' }
                    }
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sentinel for sticky detection */}
        <div ref={sentinelRef} style={{ height: 0 }} />

        {/* ── Sticky filter bar ─────────────────────────────────────────────── */}
        <div
          className="bg-white border-b border-gray-200 z-30 transition-shadow"
          style={{
            position: 'sticky',
            top: '88px',
            boxShadow: isSticky ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
          }}
        >
          <div className="container py-3">
            {/* Row 1: search + filter toggle + sort */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by bank name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium text-gray-700 hover:border-blue-400 transition-colors whitespace-nowrap"
                style={
                  showFilters
                    ? { borderColor: '#2563eb', background: '#eff6ff', color: '#1d4ed8' }
                    : { borderColor: '#e5e7eb', background: 'white' }
                }
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white"
                    style={{ background: '#2563eb' }}
                  >
                    {activeFilterCount}
                  </span>
                )}
                {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-400"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 2: Suitability pills */}
            <div className="flex flex-wrap gap-2">
              {suitabilityFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setSuitability(f.value)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                  style={
                    suitability === f.value
                      ? { background: '#2563eb', color: 'white', borderColor: '#2563eb' }
                      : { background: 'white', color: '#374151', borderColor: '#e5e7eb' }
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container py-6">
          {/* ── Expanded advanced filters panel ──────────────────────────────── */}
          {showFilters && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Bank type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    Bank Type
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {typeFilters.map((f) => (
                      <label key={f.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="bankType"
                          value={f.value}
                          checked={bankType === f.value}
                          onChange={() => setBankType(f.value)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">{f.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Monthly fee */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    Monthly Fee
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { value: 'all', label: 'Any fee' },
                      { value: 'free', label: 'Free only (£0/month)' },
                      { value: 'paid', label: 'Paid only' },
                    ].map((f) => (
                      <label key={f.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="feeType"
                          value={f.value}
                          checked={feeType === f.value}
                          onChange={() => setFeeType(f.value)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">{f.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Advanced feature toggles */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    Must-Have Features
                  </label>
                  <div className="flex flex-col gap-2">
                    {advancedFeatureFilters.map((f) => (
                      <label key={f.key} className="flex items-start gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={activeFeatures.has(f.key)}
                          onChange={() => toggleFeature(f.key)}
                          className="accent-blue-600 w-4 h-4 mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <span className="text-sm text-gray-700 font-medium">{f.label}</span>
                          <p className="text-xs text-gray-400 leading-tight">{f.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    <strong>{filtered.length}</strong> of {banks.length} accounts match your filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-transparent border-none"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Active feature filter chips */}
          {activeFeatures.size > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from(activeFeatures).map((key) => {
                const filter = advancedFeatureFilters.find((f) => f.key === key);
                if (!filter) return null;
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{ background: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}
                  >
                    {filter.label}
                    <button
                      onClick={() => toggleFeature(key)}
                      className="bg-transparent border-none p-0 ml-0.5 text-blue-400 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
              <button
                onClick={() => setActiveFeatures(new Set())}
                className="text-xs text-gray-500 hover:text-gray-700 bg-transparent border-none underline"
              >
                Clear
              </button>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {suitability === 'savings'
                ? <>Showing <strong>{filtered.length}</strong> savings products with available rates</>
                : <>Showing <strong>{filtered.length}</strong> of {banks.filter(b => !SAVINGS_ONLY_IDS.includes(b.id)).length} accounts</>
              }
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-2 text-blue-600 text-xs font-semibold hover:underline bg-transparent border-none"
                >
                  Clear filters
                </button>
              )}
            </p>
          </div>

          {/* Savings view info banner */}
          {suitability === 'savings' && (
            <div className="mb-4 p-4 rounded-xl border flex items-start gap-3" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
              <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Business Savings Accounts</p>
                <p className="text-xs text-blue-700">
                  Showing all {filtered.length} providers with business savings products. Click <strong>More Info</strong> on any card to see full savings rates, terms, and FSCS protection details.
                  Rates correct as of {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}.
                </p>
              </div>
            </div>
          )}

          {/* Bank list */}
          {filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((bank, i) => (
                <BankCard key={bank.id} bank={bank} rank={i + 1} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <div className="text-4xl mb-4">🔍</div>
              <h3
                className="text-lg font-bold text-gray-900 mb-2"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                No accounts match your filters
              </h3>
              <p className="text-gray-500 text-sm mb-4">Try adjusting your filters to see more results.</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#2563eb' }}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong>Disclaimer:</strong> Our rankings are based on a combination of monthly fees, transaction costs,
              features, customer reviews, FSCS protection status, and overall value for money. We update our data
              monthly. Some links are affiliate links — we may earn a commission if you open an account, but this never
              influences our editorial rankings.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

