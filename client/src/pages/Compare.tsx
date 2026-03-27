// Compare page — full comparison list with filters
// Matches original buscompare design: teal accents, Sora font
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { banks } from '@/lib/bankData';
import BankCard from '@/components/BankCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const suitabilityFilters = [
  { value: 'all', label: 'All Businesses' },
  { value: 'sole-trader', label: 'Sole Trader' },
  { value: 'limited-company', label: 'Limited Company' },
  { value: 'startup', label: 'Startup' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'small-business', label: 'Small Business' },
  { value: 'international', label: 'International' },
];

const typeFilters = [
  { value: 'all', label: 'All Types' },
  { value: 'digital', label: 'Digital / App' },
  { value: 'highstreet', label: 'High Street' },
  { value: 'challenger', label: 'Challenger' },
];

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'fee-asc', label: 'Lowest Fee' },
  { value: 'fee-desc', label: 'Highest Fee' },
  { value: 'name', label: 'A–Z' },
];

export default function Compare() {
  const [suitability, setSuitability] = useState('all');
  const [bankType, setBankType] = useState('all');
  const [feeType, setFeeType] = useState('all');
  const [fscsOnly, setFscsOnly] = useState(false);
  const [intlOnly, setIntlOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = banks.filter((bank) => {
      if (suitability !== 'all' && !bank.suitableFor.includes(suitability)) return false;
      if (bankType !== 'all' && bank.type !== bankType) return false;
      if (feeType === 'free' && bank.monthlyFeeNum !== 0) return false;
      if (feeType === 'paid' && bank.monthlyFeeNum === 0) return false;
      if (fscsOnly && !bank.fscsProtection) return false;
      if (intlOnly && !bank.internationalPayments) return false;
      if (search && !bank.name.toLowerCase().includes(search.toLowerCase()) && !bank.provider.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fee-asc') return a.monthlyFeeNum - b.monthlyFeeNum;
      if (sortBy === 'fee-desc') return b.monthlyFeeNum - a.monthlyFeeNum;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [suitability, bankType, feeType, fscsOnly, intlOnly, search, sortBy]);

  const hasActiveFilters = suitability !== 'all' || bankType !== 'all' || feeType !== 'all' || fscsOnly || intlOnly || search;

  function clearFilters() {
    setSuitability('all');
    setBankType('all');
    setFeeType('all');
    setFscsOnly(false);
    setIntlOnly(false);
    setSearch('');
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
      <SEO
        title={`Compare Business Bank Accounts UK ${new Date().getFullYear()} | All Accounts Side by Side`}
        description={`Compare all ${banks.length} UK business bank accounts. Filter by fees, features, FSCS protection, and business type. Find the best account for your business today.`}
        keywords="compare business bank accounts, business bank account comparison, best business bank account UK, UK business banking comparison, business account comparison tool"
        canonicalPath="/compare"
      />
      <Navigation />

      <div style={{ paddingTop: '88px' }}>
        {/* Page header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
              Compare Business Bank Accounts UK {new Date().getFullYear()}
            </h1>
            <p className="text-gray-600 text-sm">
              Independent comparison of {banks.length} UK business bank accounts. Filter by business type, features, and fees.
            </p>
          </div>
        </div>

        <div className="container py-8">
          {/* Search + filter toggle */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
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
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-blue-400 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-400"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Suitability filter pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {suitabilityFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setSuitability(f.value)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={
                  suitability === f.value
                    ? { background: '#2563eb', color: 'white', borderColor: 'oklch(0.72 0.12 210)' }
                    : { background: 'white', color: '#374151', borderColor: '#e5e7eb' }
                }
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Bank type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Bank Type</label>
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

                {/* Fee type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Monthly Fee</label>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { value: 'all', label: 'Any fee' },
                      { value: 'free', label: 'Free only' },
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

                {/* Toggles */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Must-Have Features</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fscsOnly}
                        onChange={(e) => setFscsOnly(e.target.checked)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">FSCS Protected only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={intlOnly}
                        onChange={(e) => setIntlOnly(e.target.checked)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">International payments only</span>
                    </label>
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={clearFilters}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-transparent border-none"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              Showing <strong>{filtered.length}</strong> of {banks.length} accounts
              {hasActiveFilters && (
                <button onClick={clearFilters} className="ml-2 text-blue-600 text-xs font-semibold hover:underline bg-transparent border-none">
                  Clear filters
                </button>
              )}
            </p>
          </div>

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
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
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
              <strong>Disclaimer:</strong> Our rankings are based on a combination of monthly fees, transaction costs, features, customer reviews, FSCS protection status, and overall value for money. We update our data monthly. Some links are affiliate links — we may earn a commission if you open an account, but this never influences our editorial rankings.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
