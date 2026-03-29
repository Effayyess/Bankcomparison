// Find My Account — multi-select filter wizard
// Design: dark navy hero (#0f172a), teal accents (#2563eb), Sora font
// Filter cards match the business-type card style: #1e293b background, slate-700 border, teal hover

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
  color: string;
  category: 'features' | 'business-type' | 'preferences';
}

const FILTER_OPTIONS: FilterOption[] = [
  // Features
  { id: 'free', label: 'Free Account', description: 'No monthly fee', icon: '🆓', color: '#2563eb', category: 'features' },
  { id: 'fast-opening', label: 'Fast Opening', description: 'Open in minutes', icon: '⚡', color: '#f59e0b', category: 'features' },
  { id: 'no-credit-check', label: 'No Credit Check', description: 'No hard credit check', icon: '✅', color: '#10b981', category: 'features' },
  { id: 'accounting', label: 'Accounting Integration', description: 'Xero, QuickBooks, FreeAgent', icon: '📊', color: '#6366f1', category: 'features' },
  { id: 'cash-deposit', label: 'Cash Deposits', description: 'Deposit cash at Post Office', icon: '💵', color: '#2563eb', category: 'features' },
  { id: 'branch-access', label: 'Branch Access', description: 'Visit a branch in person', icon: '🏦', color: '#3b82f6', category: 'features' },
  { id: 'overdraft', label: 'Overdraft Available', description: 'Arranged overdraft facility', icon: '💳', color: '#ec4899', category: 'features' },
  { id: 'multi-currency', label: 'Multi-Currency', description: 'Hold multiple currencies', icon: '💱', color: '#f97316', category: 'features' },
  { id: 'international', label: 'International Payments', description: 'Low-cost global transfers', icon: '🌍', color: '#0ea5e9', category: 'features' },
  { id: 'digital', label: 'App-Only / Digital', description: 'Fully digital, no branches', icon: '📱', color: '#8b5cf6', category: 'features' },
  { id: 'switcher', label: 'Easy Switching', description: 'CASS switching supported', icon: '🔄', color: '#3b82f6', category: 'features' },
  // Business type
  { id: 'sole-trader', label: 'Sole Trader', description: 'Self-employed individual', icon: '👤', color: '#2563eb', category: 'business-type' },
  { id: 'limited-company', label: 'Limited Company', description: 'Registered Ltd company', icon: '🏢', color: '#3b82f6', category: 'business-type' },
  { id: 'startup', label: 'Startup', description: 'New or early-stage business', icon: '🚀', color: '#f97316', category: 'business-type' },
  { id: 'freelancer', label: 'Freelancer', description: 'Independent contractor', icon: '💻', color: '#6366f1', category: 'business-type' },
  { id: 'contractor', label: 'Contractor', description: 'Contract worker or consultant', icon: '🔧', color: '#f59e0b', category: 'business-type' },
  { id: 'partnership', label: 'Partnership / Joint', description: 'Business with multiple owners', icon: '🤝', color: '#10b981', category: 'business-type' },
  // Preferences
  { id: 'bad-credit', label: 'Bad Credit History', description: 'Poor or thin credit file', icon: '🔓', color: '#ef4444', category: 'preferences' },
  { id: 'small-business', label: 'Small Business', description: 'Established SME', icon: '🏪', color: '#2563eb', category: 'preferences' },
  { id: 'ecommerce', label: 'E-commerce', description: 'Online retail or marketplace', icon: '🛒', color: '#8b5cf6', category: 'preferences' },
  { id: 'savings', label: 'Business Savings', description: 'Earn interest on surplus cash', icon: '💰', color: '#10b981', category: 'preferences' },
  { id: 'fscs', label: 'FSCS Protected', description: 'Protected up to £85,000', icon: '🛡️', color: '#2563eb', category: 'preferences' },
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

  const SAVINGS_ONLY_IDS = ['aldermore', 'shawbrook'];

  const matchedBanks = useMemo(() => {
    if (selected.size === 0) return [];
    const selectedArr = Array.from(selected);
    const wantsSavings = selectedArr.includes('savings');
    return banks.filter(bank => {
      // Savings-only banks only appear when savings filter is selected
      if (SAVINGS_ONLY_IDS.includes(bank.id) && !wantsSavings) return false;
      return selectedArr.every(filter => {
        if (bank.accountTypes.includes(filter)) return true;
        if (bank.suitableFor.includes(filter)) return true;
        if (filter === 'free' && bank.monthlyFeeNum === 0) return true;
        if (filter === 'bad-credit' && (bank.accountTypes.includes('no-credit-check') || bank.suitableFor.includes('bad-credit'))) return true;
        if (filter === 'digital' && bank.accountTypes.includes('digital')) return true;
        if (filter === 'branch-access' && bank.hasBranchAccess) return true;
        if (filter === 'cash-deposit' && bank.hasCashDeposits) return true;
        if (filter === 'accounting' && bank.hasAccounting) return true;
        if (filter === 'savings' && bank.hasSavingsProduct) return true;
        if (filter === 'fscs' && bank.fscsProtection) return true;
        return false;
      });
    });
  }, [selected]);

  const filterCategories = ['features', 'business-type', 'preferences'] as const;

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Sora, sans-serif', background: '#f8fafc' }}>
      <Navigation />
      <div style={{ paddingTop: '88px' }}>
        {/* Hero — dark navy matching main site */}
        <section
          className="relative overflow-hidden py-14"
          style={{ background: '#0f172a' }}
        >
          <div className="container relative">
            <nav className="flex items-center gap-2 text-sm mb-4 text-white/70">
              <Link href="/" className="hover:text-white no-underline text-white/80">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/90">Find My Account</span>
            </nav>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#2563eb' }}>
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

        {/* Filter sections — dark navy background matching business-type section */}
        <section className="py-12" style={{ background: '#0f172a' }}>
          <div className="container">
            <div className="max-w-5xl mx-auto">
              {filterCategories.map(cat => (
                <div key={cat} className="mb-10">
                  <h2 className="text-lg font-bold text-white mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {CATEGORY_LABELS[cat]}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {FILTER_OPTIONS.filter(f => f.category === cat).map(option => {
                      const isSelected = selected.has(option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() => toggleFilter(option.id)}
                          className="relative rounded-xl p-4 text-center transition-all cursor-pointer group flex flex-col items-center justify-start min-h-[110px]"
                          style={{
                            backgroundColor: isSelected ? 'rgba(13,148,136,0.2)' : '#1e293b',
                            border: isSelected ? '2px solid #2563eb' : '2px solid #334155',
                            boxShadow: isSelected ? '0 0 0 1px #2563eb, 0 4px 16px rgba(13,148,136,0.2)' : 'none',
                          }}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2563eb' }}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-xl flex-shrink-0"
                            style={{ backgroundColor: isSelected ? option.color : 'rgba(255,255,255,0.08)' }}
                          >
                            {option.icon}
                          </div>
                          <div
                            className="text-xs font-semibold leading-tight flex-1 transition-colors"
                            style={{ color: isSelected ? '#5eead4' : '#cbd5e1', fontFamily: 'Sora, sans-serif' }}
                          >
                            {option.label}
                          </div>
                          <div className="text-xs mt-1 leading-tight" style={{ color: '#64748b' }}>
                            {option.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={() => setShowResults(true)}
                  disabled={selected.size === 0}
                  className="flex-1 py-3 px-6 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: selected.size > 0 ? '#2563eb' : '#475569' }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Find Matching Accounts
                  {selected.size > 0 && (
                    <span className="ml-1 rounded-full px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                      {selected.size} filter{selected.size !== 1 ? 's' : ''}
                    </span>
                  )}
                </button>
                {selected.size > 0 && (
                  <button
                    onClick={reset}
                    className="py-3 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#94a3b8' }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Prompt when nothing selected */}
              {!showResults && selected.size === 0 && (
                <div className="mt-6 rounded-2xl p-8 text-center" style={{ backgroundColor: '#1e293b', border: '1px dashed #334155' }}>
                  <div className="text-4xl mb-3">👆</div>
                  <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Select your requirements above</h3>
                  <p className="text-sm" style={{ color: '#64748b' }}>
                    Choose one or more options — you can mix features and business types to find the perfect match.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results section — white background */}
        {showResults && (
          <section className="py-10 bg-white">
            <div className="container">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {matchedBanks.length > 0
                      ? `${matchedBanks.length} Account${matchedBanks.length !== 1 ? 's' : ''} Match Your Requirements`
                      : 'No Accounts Match All Your Requirements'}
                  </h2>
                </div>

                {matchedBanks.length === 0 ? (
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <h3 className="font-bold text-gray-900 mb-2">No exact matches found</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      No single account meets all your selected requirements. Try removing one or two filters to see more results.
                    </p>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: '#2563eb' }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset and try again
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Selected filters summary */}
                    <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: '#f0fdfa', border: '1px solid #99f6e4' }}>
                      <p className="text-sm font-medium mb-2" style={{ color: '#0f766e' }}>Filtering by:</p>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(selected).map(id => {
                          const opt = FILTER_OPTIONS.find(f => f.id === id);
                          return opt ? (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                              style={{ backgroundColor: '#ccfbf1', color: '#0f766e', border: '1px solid #99f6e4' }}
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

                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center">
                      <p className="text-gray-600 text-sm mb-3">
                        Want to compare all {banks.length} accounts side by side?
                      </p>
                      <Link
                        href="/compare"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm no-underline transition-all hover:opacity-90"
                        style={{ backgroundColor: '#2563eb' }}
                      >
                        Compare All Accounts <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </div>
  );
}
