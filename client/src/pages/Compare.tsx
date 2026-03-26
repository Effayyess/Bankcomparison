// Design: Authoritative Broadsheet | Compare page
// Full comparison list with all filters, sortable, searchable

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { banks, type Suitability } from '@/lib/bankData';
import BankCard from '@/components/BankCard';

const suitabilityFilters: { value: Suitability | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'sole-trader', label: 'Sole Trader' },
  { value: 'limited-company', label: 'Limited Company' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'startup', label: 'Startup' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'international', label: 'International' },
];

const typeFilters = [
  { value: 'all', label: 'All Types' },
  { value: 'app-only', label: 'App-Only' },
  { value: 'high-street', label: 'High Street' },
  { value: 'challenger', label: 'Challenger' },
];

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'fee-asc', label: 'Lowest Fee' },
  { value: 'fee-desc', label: 'Highest Fee' },
  { value: 'name', label: 'A–Z' },
];

export default function Compare() {
  const [suitability, setSuitability] = useState<Suitability | 'all'>('all');
  const [bankType, setBankType] = useState('all');
  const [feeType, setFeeType] = useState('all');
  const [fscsOnly, setFscsOnly] = useState(false);
  const [intlOnly, setIntlOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = banks.filter((bank) => {
      if (suitability !== 'all' && !bank.suitability.includes(suitability)) return false;
      if (bankType !== 'all' && bank.type !== bankType) return false;
      if (feeType === 'free' && bank.monthlyFee !== 0) return false;
      if (feeType === 'paid' && bank.monthlyFee === 0) return false;
      if (fscsOnly && !bank.fscsProtected) return false;
      if (intlOnly && !bank.internationalPayments) return false;
      if (search && !bank.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fee-asc') return (a.monthlyFee ?? 999) - (b.monthlyFee ?? 999);
      if (sortBy === 'fee-desc') return (b.monthlyFee ?? 0) - (a.monthlyFee ?? 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [suitability, bankType, feeType, fscsOnly, intlOnly, search, sortBy]);

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.98 0.008 85)' }}>
      {/* Page header */}
      <div className="border-b border-gray-200" style={{ background: 'white' }}>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
            Compare Business Bank Accounts UK
          </h1>
          <p className="text-base" style={{ color: 'oklch(0.45 0.01 65)' }}>
            Independent comparison of {banks.length} UK business bank accounts. Ranked by our editorial team.
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Filter bar */}
        <div className="bank-card p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'oklch(0.6 0.01 65)' }} />
              <input
                type="text"
                placeholder="Search banks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: 'oklch(0.88 0.01 85)', color: 'oklch(0.18 0.02 65)' }}
              />
            </div>

            {/* Suitability chips */}
            <div className="flex flex-wrap gap-1.5">
              {suitabilityFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setSuitability(f.value)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
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

            {/* More filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-medium"
              style={{ borderColor: 'oklch(0.88 0.01 85)', color: 'oklch(0.35 0.02 65)', background: 'transparent' }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              More filters
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded border text-xs font-medium"
              style={{ borderColor: 'oklch(0.88 0.01 85)', color: 'oklch(0.35 0.02 65)', background: 'white' }}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Extended filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: 'oklch(0.55 0.01 65)' }}>Account Type</label>
                <div className="flex gap-1.5">
                  {typeFilters.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setBankType(f.value)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: bankType === f.value ? 'oklch(0.28 0.09 155)' : 'oklch(0.94 0.005 85)',
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
                <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: 'oklch(0.55 0.01 65)' }}>Monthly Fee</label>
                <div className="flex gap-1.5">
                  {[{ value: 'all', label: 'Any' }, { value: 'free', label: 'Free only' }, { value: 'paid', label: 'Paid only' }].map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFeeType(f.value)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
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
              <div className="flex items-end gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fscsOnly}
                    onChange={(e) => setFscsOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-xs font-medium" style={{ color: 'oklch(0.35 0.02 65)' }}>FSCS Protected only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={intlOnly}
                    onChange={(e) => setIntlOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-xs font-medium" style={{ color: 'oklch(0.35 0.02 65)' }}>International payments</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm mb-4" style={{ color: 'oklch(0.55 0.01 65)' }}>
          Showing <strong style={{ color: 'oklch(0.18 0.02 65)' }}>{filtered.length}</strong> of {banks.length} accounts
        </p>

        {/* Bank cards */}
        {filtered.length === 0 ? (
          <div className="bank-card p-12 text-center">
            <p className="text-lg font-semibold mb-2" style={{ color: 'oklch(0.35 0.02 65)' }}>No accounts match your filters</p>
            <button
              onClick={() => { setSuitability('all'); setBankType('all'); setFeeType('all'); setFscsOnly(false); setIntlOnly(false); setSearch(''); }}
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
      </div>
    </div>
  );
}
