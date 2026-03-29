// Savings Interest Calculator
// Calculates interest earned on business savings over time at different rates
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { PiggyBank, TrendingUp, Info, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface SavingsProduct {
  id: string;
  name: string;
  provider: string;
  type: 'easy-access' | 'notice' | 'fixed';
  aer: number;           // Annual Equivalent Rate %
  minDeposit: number;    // £
  maxDeposit: number;    // £ (0 = no limit)
  fscs: boolean;
  noticePeriod?: string; // e.g. "95 days"
  termMonths?: number;   // for fixed-rate
  affiliateUrl?: string;
  highlight?: string;
}

const savingsProducts: SavingsProduct[] = [
  {
    id: 'tide-savings', name: 'Tide Instant Saver', provider: 'Tide',
    type: 'easy-access', aer: 4.00, minDeposit: 1, maxDeposit: 10000000, fscs: true,
    highlight: 'Best easy-access rate',
    affiliateUrl: 'https://www.tide.co/business-savings/',
  },
  {
    id: 'shawbrook-easy', name: 'Shawbrook Easy Access Business Account', provider: 'Shawbrook Bank',
    type: 'easy-access', aer: 3.40, minDeposit: 1000, maxDeposit: 500000, fscs: true,
    affiliateUrl: 'https://www.shawbrook.co.uk/business-savings/',
  },
  {
    id: 'revolut-savings', name: 'Revolut Business Savings Account', provider: 'Revolut',
    type: 'easy-access', aer: 2.15, minDeposit: 1, maxDeposit: 500000, fscs: false,
    affiliateUrl: 'https://www.revolut.com/business/',
  },
  {
    id: 'monzo-savings', name: 'Monzo Business Instant Access Savings Pot', provider: 'Monzo',
    type: 'easy-access', aer: 1.30, minDeposit: 1, maxDeposit: 100000, fscs: true,
    affiliateUrl: 'https://monzo.com/business/',
  },
  {
    id: 'shawbrook-45day', name: 'Shawbrook 45-Day Notice Business Account', provider: 'Shawbrook Bank',
    type: 'notice', aer: 3.45, minDeposit: 5000, maxDeposit: 2000000, fscs: true,
    noticePeriod: '45 days',
    affiliateUrl: 'https://www.shawbrook.co.uk/business-savings/',
  },
  {
    id: 'shawbrook-notice', name: 'Shawbrook 100-Day Notice Business Account', provider: 'Shawbrook Bank',
    type: 'notice', aer: 3.51, minDeposit: 5000, maxDeposit: 2000000, fscs: true,
    noticePeriod: '100 days',
    affiliateUrl: 'https://www.shawbrook.co.uk/business-savings/',
  },
  {
    id: 'aldermore-easy', name: 'Aldermore Easy Access Business Savings Account', provider: 'Aldermore',
    type: 'easy-access', aer: 2.45, minDeposit: 1000, maxDeposit: 1000000, fscs: true,
    affiliateUrl: 'https://www.aldermore.co.uk/savings-accounts/business-savings-accounts/',
  },
  {
    id: 'aldermore-notice', name: 'Aldermore 95-Day Notice Business Savings Account', provider: 'Aldermore',
    type: 'notice', aer: 4.00, minDeposit: 1000, maxDeposit: 1000000, fscs: true,
    noticePeriod: '95 days',
    affiliateUrl: 'https://www.aldermore.co.uk/savings-accounts/business-savings-accounts/',
  },
  {
    id: 'aldermore-6mo', name: 'Aldermore 6-Month Fixed Rate Business Savings Account', provider: 'Aldermore',
    type: 'fixed', aer: 3.65, minDeposit: 1000, maxDeposit: 1000000, fscs: true,
    termMonths: 6,
    affiliateUrl: 'https://www.aldermore.co.uk/savings-accounts/business-savings-accounts/',
  },
  {
    id: 'aldermore-1yr', name: 'Aldermore 1-Year Fixed Rate Business Savings Account', provider: 'Aldermore',
    type: 'fixed', aer: 4.00, minDeposit: 1000, maxDeposit: 1000000, fscs: true,
    termMonths: 12,
    highlight: 'Best 1-year fixed rate',
    affiliateUrl: 'https://www.aldermore.co.uk/savings-accounts/business-savings-accounts/',
  },
  {
    id: 'shawbrook-1yr', name: 'Shawbrook 1-Year Fixed Rate Business Bond', provider: 'Shawbrook Bank',
    type: 'fixed', aer: 3.92, minDeposit: 5000, maxDeposit: 2000000, fscs: true,
    termMonths: 12,
    affiliateUrl: 'https://www.shawbrook.co.uk/business-savings/',
  },
  {
    id: 'shawbrook-2yr', name: 'Shawbrook 2-Year Fixed Rate Business Bond', provider: 'Shawbrook Bank',
    type: 'fixed', aer: 3.86, minDeposit: 5000, maxDeposit: 2000000, fscs: true,
    termMonths: 24,
    affiliateUrl: 'https://www.shawbrook.co.uk/business-savings/',
  },
  {
    id: 'starling-fixed', name: 'Starling Business Fixed Saver', provider: 'Starling Bank',
    type: 'fixed', aer: 2.50, minDeposit: 2000, maxDeposit: 1000000, fscs: true,
    termMonths: 12,
    affiliateUrl: 'https://www.starlingbank.com/business-account/business-fixed-rate-savings/',
  },
];

type ProductType = 'all' | 'easy-access' | 'notice' | 'fixed';

function calcInterest(principal: number, aer: number, months: number) {
  const rate = aer / 100;
  const years = months / 12;
  const gross = principal * Math.pow(1 + rate, years) - principal;
  return gross;
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }).format(n);
}

function typeLabel(t: SavingsProduct['type']) {
  if (t === 'easy-access') return 'Easy Access';
  if (t === 'notice') return 'Notice Account';
  return 'Fixed Rate';
}

function typeColor(t: SavingsProduct['type']) {
  if (t === 'easy-access') return 'bg-green-100 text-green-700';
  if (t === 'notice') return 'bg-amber-100 text-amber-700';
  return 'bg-blue-100 text-blue-700';
}

export default function SavingsInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [months, setMonths] = useState(12);
  const [filterType, setFilterType] = useState<ProductType>('all');
  const [fscsOnly, setFscsOnly] = useState(false);

  const filtered = useMemo(() => {
    return savingsProducts
      .filter(p => filterType === 'all' || p.type === filterType)
      .filter(p => !fscsOnly || p.fscs)
      .filter(p => principal >= p.minDeposit && (p.maxDeposit === 0 || principal <= p.maxDeposit))
      .map(p => ({ ...p, interest: calcInterest(principal, p.aer, months) }))
      .sort((a, b) => b.interest - a.interest);
  }, [principal, months, filterType, fscsOnly]);

  const best = filtered[0];

  const projectionMonths = [3, 6, 12, 24, 36];

  return (
    <>
      <Helmet>
        <title>Business Savings Interest Calculator UK 2026 | Business Bank Compare</title>
        <meta name="description" content="Calculate how much interest your business savings could earn. Compare easy access, notice, and fixed-rate business savings accounts from leading UK providers." />
        <link rel="canonical" href="https://businessbankcompare.co.uk/calculators/savings-interest" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div style={{ paddingTop: '88px' }}>
        {/* Hero */}
        <div style={{ background: '#0f172a' }} className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-blue-300 text-sm mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              <Link href="/calculators" className="hover:text-white no-underline">Calculators</Link>
              <span>/</span>
              <span className="text-white">Savings Interest Calculator</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <PiggyBank className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Business Savings Interest Calculator
                </h1>
                <p className="text-blue-100 text-base max-w-2xl">
                  See how much interest your business could earn on its savings. Compare easy access, notice, and fixed-rate accounts from leading UK providers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* ── Inputs ── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Your Savings Details
                </h2>

                {/* Principal */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Sora, sans-serif' }}>Amount to save</label>
                    <span className="text-sm font-bold text-blue-600" style={{ fontFamily: 'Sora, sans-serif' }}>{fmt(principal)}</span>
                  </div>
                  <input
                    type="range" min={500} max={500000} step={500} value={principal}
                    onChange={e => setPrincipal(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>£500</span><span>£500,000</span>
                  </div>
                  <div className="mt-2">
                    <input
                      type="number" min={500} max={500000} value={principal}
                      onChange={e => setPrincipal(Math.min(500000, Math.max(500, Number(e.target.value))))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Or type an amount"
                    />
                  </div>
                </div>

                {/* Term */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Sora, sans-serif' }}>Savings term</label>
                    <span className="text-sm font-bold text-blue-600" style={{ fontFamily: 'Sora, sans-serif' }}>
                      {months < 12 ? `${months} months` : months === 12 ? '1 year' : `${months / 12} years`}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[3, 6, 12, 18, 24, 36].map(m => (
                      <button
                        key={m}
                        onClick={() => setMonths(m)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${months === m ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        style={{ fontFamily: 'Sora, sans-serif' }}
                      >
                        {m < 12 ? `${m}mo` : `${m / 12}yr`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 my-4" />

                {/* Filters */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Filter accounts</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {(['all', 'easy-access', 'notice', 'fixed'] as ProductType[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filterType === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      style={{ fontFamily: 'Sora, sans-serif' }}
                    >
                      {t === 'all' ? 'All types' : typeLabel(t as SavingsProduct['type'])}
                    </button>
                  ))}
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox" checked={fscsOnly}
                    onChange={e => setFscsOnly(e.target.checked)}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Sora, sans-serif' }}>
                    FSCS protected only
                  </span>
                </label>

                {/* Best result summary */}
                {best && (
                  <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Best match for you</p>
                    <p className="font-bold text-blue-900 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{best.name}</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                      {fmt(best.interest)}
                    </p>
                    <p className="text-xs text-blue-600">estimated interest over {months < 12 ? `${months} months` : months === 12 ? '1 year' : `${months / 12} years`}</p>
                    <p className="text-xs text-blue-500 mt-1">{best.aer}% AER</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Results ── */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Interest Estimates — Highest First
                </h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{filtered.length} accounts</span>
              </div>

              {filtered.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400">
                  <PiggyBank className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="font-semibold" style={{ fontFamily: 'Sora, sans-serif' }}>No accounts match your current filters</p>
                  <p className="text-sm mt-1">Try adjusting the amount or removing filters</p>
                </div>
              )}

              <div className="space-y-3">
                {filtered.map((product, idx) => {
                  const isBest = idx === 0;
                  const annualInterest = calcInterest(principal, product.aer, 12);

                  return (
                    <div
                      key={product.id}
                      className={`bg-white rounded-2xl border transition-all ${isBest ? 'border-green-300 shadow-md' : 'border-gray-100 shadow-sm'}`}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{product.name}</span>
                              {isBest && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Best rate</span>}
                              {product.highlight && !isBest && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{product.highlight}</span>}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${typeColor(product.type)}`}>{typeLabel(product.type)}</span>
                              {product.noticePeriod && <span className="text-xs text-gray-500">{product.noticePeriod} notice</span>}
                              {product.termMonths && <span className="text-xs text-gray-500">{product.termMonths}-month term</span>}
                              {product.fscs && <span className="text-xs text-gray-500 flex items-center gap-1"><Info className="w-3 h-3" />FSCS protected</span>}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              {product.provider} · Min deposit {fmt(product.minDeposit)}
                              {product.maxDeposit > 0 ? ` · Max ${fmt(product.maxDeposit)}` : ''}
                            </p>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div className={`text-xl font-bold ${isBest ? 'text-green-600' : 'text-gray-900'}`} style={{ fontFamily: 'Sora, sans-serif' }}>
                              {fmt(product.interest)}
                            </div>
                            <div className="text-xs text-gray-400">
                              over {months < 12 ? `${months} months` : months === 12 ? '1 year' : `${months / 12} years`}
                            </div>
                            <div className="text-sm font-bold text-blue-600 mt-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>
                              {product.aer}% AER
                            </div>
                          </div>
                        </div>

                        {/* Mini projection table */}
                        <div className="mt-3 pt-3 border-t border-gray-50">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Interest projection</p>
                          <div className="grid grid-cols-5 gap-1">
                            {projectionMonths.map(m => (
                              <div key={m} className="text-center bg-gray-50 rounded-lg p-1.5">
                                <div className="text-xs text-gray-400">{m < 12 ? `${m}mo` : `${m / 12}yr`}</div>
                                <div className="text-xs font-bold text-gray-700 mt-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>
                                  {fmt(calcInterest(principal, product.aer, m))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <a
                            href={product.affiliateUrl ?? '#'}
                            target="_blank" rel="noopener noreferrer sponsored"
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white no-underline transition-all hover:opacity-90"
                            style={{ background: '#2563eb', fontFamily: 'Sora, sans-serif' }}
                          >
                            Open Account <ExternalLink className="w-3 h-3" />
                          </a>
                          <div className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs text-gray-500 bg-gray-50">
                            <TrendingUp className="w-3 h-3" />
                            {fmt(annualInterest)}/yr
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-3 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Understanding Business Savings Account Types
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <div className="font-semibold text-green-700 mb-1">Easy Access</div>
                    <p>Withdraw your money at any time with no penalty. Rates are lower but you retain full flexibility. Best for emergency funds or money you may need quickly.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-700 mb-1">Notice Accounts</div>
                    <p>You must give advance notice (typically 30–95 days) before withdrawing. Offers higher rates than easy access in exchange for reduced flexibility.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-700 mb-1">Fixed Rate</div>
                    <p>Lock your money away for a set term (6 months to 3 years) at a guaranteed rate. Highest rates available but no access until the term ends.</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                <strong>Disclaimer:</strong> Interest rates shown are indicative as of March 2026 and are subject to change. Calculations assume compound interest and no withdrawals during the term. FSCS protection covers deposits up to £85,000 per institution. Always verify current rates directly with the provider before opening an account. Some links are affiliate links.
              </p>
            </div>
          </div>
        </div>
        </div>{/* end paddingTop wrapper */}
        <Footer />
      </div>
    </>
  );
}
