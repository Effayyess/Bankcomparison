// Find My Account — multi-select filter wizard
// Design: dark navy hero (#0f172a), teal accents (#0d9488), Sora font, white cards

import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Check, ChevronRight, ArrowRight, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { banks } from '@/lib/bankData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BankCard from '@/components/BankCard';

interface FilterOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  category: 'features' | 'business-type' | 'preferences';
}

const FILTER_OPTIONS: FilterOption[] = [
  // Features
  { id: 'free', label: 'Free Account', description: 'No monthly fee', icon: '🆓', category: 'features' },
  { id: 'fast-opening', label: 'Fast Opening', description: 'Open in minutes', icon: '⚡', category: 'features' },
  { id: 'no-credit-check', label: 'No Credit Check', description: 'No hard credit check', icon: '✅', category: 'features' },
  { id: 'accounting', label: 'Accounting Integration', description: 'Xero, QuickBooks, FreeAgent', icon: '📊', category: 'features' },
  { id: 'cash-deposit', label: 'Cash Deposits', description: 'Deposit cash at Post Office or branch', icon: '💵', category: 'features' },
  { id: 'branch-access', label: 'Branch Access', description: 'Visit a branch in person', icon: '🏦', category: 'features' },
  { id: 'overdraft', label: 'Overdraft Available', description: 'Arranged overdraft facility', icon: '💳', category: 'features' },
  { id: 'multi-currency', label: 'Multi-Currency', description: 'Hold multiple currencies', icon: '💱', category: 'features' },
  { id: 'international', label: 'International Payments', description: 'Low-cost global transfers', icon: '🌍', category: 'features' },
  { id: 'digital', label: 'App-Only / Digital', description: 'Fully digital, no branches', icon: '📱', category: 'features' },
  { id: 'switcher', label: 'Easy Switching', description: 'CASS switching supported', icon: '🔄', category: 'features' },
  // Business type
  { id: 'sole-trader', label: 'Sole Trader', description: 'Self-employed individual', icon: '👤', category: 'business-type' },
  { id: 'limited-company', label: 'Limited Company', description: 'Registered Ltd company', icon: '🏢', category: 'business-type' },
  { id: 'startup', label: 'Startup', description: 'New or early-stage business', icon: '🚀', category: 'business-type' },
  { id: 'freelancer', label: 'Freelancer', description: 'Independent contractor', icon: '💻', category: 'business-type' },
  { id: 'contractor', label: 'Contractor', description: 'Contract worker or consultant', icon: '🔧', category: 'business-type' },
  { id: 'partnership', label: 'Partnership / Joint', description: 'Business with multiple owners', icon: '🤝', category: 'business-type' },
  // Preferences
  { id: 'bad-credit', label: 'Bad Credit History', description: 'Poor or thin credit file', icon: '🔓', category: 'preferences' },
  { id: 'small-business', label: 'Small Business', description: 'Established SME', icon: '🏪', category: 'preferences' },
  { id: 'ecommerce', label: 'E-commerce', description: 'Online retail or marketplace', icon: '🛒', category: 'preferences' },
];

const CATEGORY_LABELS: Record<string, string> = {
  'features': 'Account Features',
  'business-type': 'Business Type',
  'preferences': 'Other Preferences',
};

export default function FindMyAccount() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const toggleFilter = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setShowResults(false);
  };

  const reset = () => {
    setSelected(new Set());
    setShowResults(false);
  };

  const matchedBanks = useMemo(() => {
    if (selected.size === 0) return [];

    const selectedArr = Array.from(selected);

    return banks.filter(bank => {
      return selectedArr.every(filter => {
        // Check accountTypes
        if (bank.accountTypes.includes(filter)) return true;
        // Check suitableFor
        if (bank.suitableFor.includes(filter)) return true;
        // Special mappings
        if (filter === 'free' && bank.monthlyFeeNum === 0) return true;
        if (filter === 'bad-credit' && (bank.accountTypes.includes('no-credit-check') || bank.suitableFor.includes('bad-credit'))) return true;
        if (filter === 'digital' && bank.accountTypes.includes('digital')) return true;
        if (filter === 'branch-access' && bank.hasBranchAccess) return true;
        if (filter === 'cash-deposit' && bank.hasCashDeposits) return true;
        if (filter === 'accounting' && bank.hasAccounting) return true;
        return false;
      });
    });
  }, [selected]);

  const categories = ['features', 'business-type', 'preferences'] as const;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
      <Navigation />
      <div style={{ paddingTop: '88px' }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden py-14"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 100%)' }}
        >
          <div className="container relative">
            <nav className="flex items-center gap-2 text-sm mb-4 text-white/70">
              <Link href="/" className="hover:text-white no-underline text-white/80">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/90">Find My Account</span>
            </nav>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#0d9488' }}>
                <SlidersHorizontal className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                Find My Business Bank Account
              </h1>
            </div>
            <p className="text-white/80 text-base max-w-2xl">
              Select the features and requirements that matter to your business. We'll show you every account that matches — you can pick multiple options.
            </p>
          </div>
        </section>

        <div className="container py-10">
          <div className="max-w-4xl mx-auto">
            {/* Filter sections */}
            {categories.map(cat => (
              <div key={cat} className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {CATEGORY_LABELS[cat]}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {FILTER_OPTIONS.filter(f => f.category === cat).map(option => {
                    const isSelected = selected.has(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleFilter(option.id)}
                        className={`relative rounded-xl p-4 text-left transition-all border-2 cursor-pointer group ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d9488' }}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className="text-2xl mb-2">{option.icon}</div>
                        <div className={`text-sm font-semibold leading-tight mb-1 ${isSelected ? 'text-teal-700' : 'text-gray-900'}`}>
                          {option.label}
                        </div>
                        <div className="text-xs text-gray-500 leading-tight">
                          {option.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => setShowResults(true)}
                disabled={selected.size === 0}
                className="flex-1 py-3 px-6 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: selected.size > 0 ? '#0d9488' : '#9ca3af' }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Find Matching Accounts
                {selected.size > 0 && (
                  <span className="ml-1 bg-white/20 rounded-full px-2 py-0.5 text-xs">
                    {selected.size} filter{selected.size !== 1 ? 's' : ''}
                  </span>
                )}
              </button>
              {selected.size > 0 && (
                <button
                  onClick={reset}
                  className="py-3 px-6 rounded-xl font-semibold text-gray-600 text-sm border border-gray-200 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Filters
                </button>
              )}
            </div>

            {/* Results */}
            {showResults && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {matchedBanks.length > 0
                      ? `${matchedBanks.length} Account${matchedBanks.length !== 1 ? 's' : ''} Match Your Requirements`
                      : 'No Accounts Match All Your Requirements'}
                  </h2>
                </div>

                {matchedBanks.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <h3 className="font-bold text-gray-900 mb-2">No exact matches found</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      No single account meets all your selected requirements. Try removing one or two filters to see more results.
                    </p>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-800"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset and try again
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Selected filters summary */}
                    <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6">
                      <p className="text-sm text-teal-800 font-medium mb-2">Filtering by:</p>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(selected).map(id => {
                          const opt = FILTER_OPTIONS.find(f => f.id === id);
                          return opt ? (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200"
                            >
                              {opt.icon} {opt.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {matchedBanks.map((bank, index) => (
                        <BankCard key={bank.id} bank={bank} rank={index + 1} />
                      ))}
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                      <p className="text-gray-600 text-sm mb-3">
                        Want to compare all {banks.length} accounts side by side?
                      </p>
                      <Link
                        href="/compare"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm no-underline transition-all hover:opacity-90"
                        style={{ backgroundColor: '#0d9488' }}
                      >
                        Compare All Accounts <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Prompt when nothing selected yet */}
            {!showResults && selected.size === 0 && (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-center">
                <div className="text-4xl mb-3">👆</div>
                <h3 className="font-bold text-gray-900 mb-2">Select your requirements above</h3>
                <p className="text-gray-500 text-sm">
                  Choose one or more options — you can mix features and business types to find the perfect match.
                </p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
