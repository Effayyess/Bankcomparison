// Business Banking Cost Calculator
// Calculates estimated monthly banking cost for each provider based on user's transaction volumes
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { Calculator, ChevronDown, ChevronUp, Info, ExternalLink, TrendingDown, CheckCircle } from 'lucide-react';
import { banks } from '@/lib/bankData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// ─── Fee model per bank ────────────────────────────────────────────────────
// All figures in pence unless noted. monthlyFee in pounds.
interface BankFeeModel {
  id: string;
  name: string;
  provider: string;
  slug: string;
  logo: string;
  monthlyFee: number;          // £/month
  perTransferFee: number;      // pence per outgoing UK transfer (above free allowance)
  freeTransfersPerMonth: number;
  perIncomingFee: number;      // pence per incoming payment
  cashDepositRate: number;     // % of cash deposited (0 = not accepted, -1 = branch only)
  cashDepositMin: number;      // minimum charge per deposit in pence
  cashDepositAccepted: boolean;
  intlTransferFee: number;     // pence per international transfer
  intlTransferPct: number;     // % of amount (FX margin)
  overdraftMonthlyFee: number; // £/month if overdraft used
  affiliateUrl?: string;
}

const feeModels: BankFeeModel[] = [
  {
    id: 'hsbc', name: 'HSBC Small Business', provider: 'HSBC UK', slug: 'hsbc-business',
    logo: banks.find(b => b.id === 'hsbc')?.logo ?? '',
    monthlyFee: 0, perTransferFee: 35, freeTransfersPerMonth: 0,
    perIncomingFee: 0, cashDepositRate: 0.9, cashDepositMin: 100,
    cashDepositAccepted: true, intlTransferFee: 2500, intlTransferPct: 2.75,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'hsbc')?.affiliateUrl,
  },
  {
    id: 'tide', name: 'Tide Business', provider: 'Tide', slug: 'tide-business',
    logo: banks.find(b => b.id === 'tide')?.logo ?? '',
    // 5 free transfers/mo then 20p each; cash: 0.99% at Post Office (min £2.50); intl: 20p + 1.5%
    monthlyFee: 0, perTransferFee: 20, freeTransfersPerMonth: 5,
    perIncomingFee: 0, cashDepositRate: 0.99, cashDepositMin: 250,
    cashDepositAccepted: true, intlTransferFee: 20, intlTransferPct: 1.5,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'tide')?.affiliateUrl,
  },
  {
    id: 'starling', name: 'Starling Bank Business', provider: 'Starling Bank', slug: 'starling-bank',
    logo: banks.find(b => b.id === 'starling')?.logo ?? '',
    monthlyFee: 0, perTransferFee: 0, freeTransfersPerMonth: 9999,
    perIncomingFee: 0, cashDepositRate: 0.7, cashDepositMin: 0,
    cashDepositAccepted: true, intlTransferFee: 0, intlTransferPct: 0.4,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'starling')?.affiliateUrl,
  },
  {
    id: 'monzo', name: 'Monzo Business', provider: 'Monzo', slug: 'monzo-business',
    logo: banks.find(b => b.id === 'monzo')?.logo ?? '',
    // Lite plan (free): unlimited UK transfers, £1 flat per cash deposit, 1% intl FX
    monthlyFee: 0, perTransferFee: 0, freeTransfersPerMonth: 9999,
    perIncomingFee: 0, cashDepositRate: 0, cashDepositMin: 100,
    cashDepositAccepted: true, intlTransferFee: 0, intlTransferPct: 1.0,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'monzo')?.affiliateUrl,
  },
  {
    id: 'revolut', name: 'Revolut Business Grow', provider: 'Revolut', slug: 'revolut-business',
    logo: banks.find(b => b.id === 'revolut')?.logo ?? '',
    // Grow plan £30/mo: 100 free local transfers then 20p each; 5 free intl then £5+0.6%
    monthlyFee: 30, perTransferFee: 20, freeTransfersPerMonth: 100,
    perIncomingFee: 0, cashDepositRate: 0, cashDepositMin: 0,
    cashDepositAccepted: false, intlTransferFee: 500, intlTransferPct: 0.6,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'revolut')?.affiliateUrl,
  },
  {
    id: 'wise', name: 'Wise Business', provider: 'Wise', slug: 'wise-business',
    logo: banks.find(b => b.id === 'wise')?.logo ?? '',
    monthlyFee: 0, perTransferFee: 0, freeTransfersPerMonth: 9999,
    perIncomingFee: 0, cashDepositRate: 0, cashDepositMin: 0,
    cashDepositAccepted: false, intlTransferFee: 0, intlTransferPct: 0.41,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'wise')?.affiliateUrl,
  },
  {
    id: 'lloyds', name: 'Lloyds Business Account', provider: 'Lloyds Bank', slug: 'lloyds-business',
    logo: banks.find(b => b.id === 'lloyds')?.logo ?? '',
    monthlyFee: 0, perTransferFee: 30, freeTransfersPerMonth: 0,
    perIncomingFee: 0, cashDepositRate: 0.8, cashDepositMin: 0,
    cashDepositAccepted: true, intlTransferFee: 2000, intlTransferPct: 2.5,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'lloyds')?.affiliateUrl,
  },
  {
    id: 'barclays', name: 'Barclays Business', provider: 'Barclays', slug: 'barclays-business',
    logo: banks.find(b => b.id === 'barclays')?.logo ?? '',
    // Free first 12 months then £8.50/mo; 0.6% cash via Post Office/self-service; £15+2.75% intl
    monthlyFee: 8.50, perTransferFee: 35, freeTransfersPerMonth: 0,
    perIncomingFee: 0, cashDepositRate: 0.6, cashDepositMin: 0,
    cashDepositAccepted: true, intlTransferFee: 1500, intlTransferPct: 2.75,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'barclays')?.affiliateUrl,
  },
  {
    id: 'natwest', name: 'NatWest Business', provider: 'NatWest', slug: 'natwest-business',
    logo: banks.find(b => b.id === 'natwest')?.logo ?? '',
    monthlyFee: 0, perTransferFee: 35, freeTransfersPerMonth: 0,
    perIncomingFee: 0, cashDepositRate: 0.7, cashDepositMin: 0,
    cashDepositAccepted: true, intlTransferFee: 2000, intlTransferPct: 2.5,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'natwest')?.affiliateUrl,
  },
  {
    id: 'anna', name: 'ANNA Money', provider: 'ANNA', slug: 'anna-money',
    logo: banks.find(b => b.id === 'anna')?.logo ?? '',
    // Pay As You Go: 0.95% on incoming payments; cash deposits accepted; 1% intl FX
    monthlyFee: 0, perTransferFee: 0, freeTransfersPerMonth: 9999,
    perIncomingFee: 95, cashDepositRate: 1.0, cashDepositMin: 0,
    cashDepositAccepted: true, intlTransferFee: 0, intlTransferPct: 1.0,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'anna')?.affiliateUrl,
  },
  {
    id: 'mettle', name: 'Mettle by NatWest', provider: 'Mettle', slug: 'mettle',
    logo: banks.find(b => b.id === 'mettle')?.logo ?? '',
    // Free account: unlimited UK transfers; £2.75 flat per cash deposit; no intl transfers
    monthlyFee: 0, perTransferFee: 0, freeTransfersPerMonth: 9999,
    perIncomingFee: 0, cashDepositRate: 0, cashDepositMin: 275,
    cashDepositAccepted: true, intlTransferFee: 0, intlTransferPct: 0,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'mettle')?.affiliateUrl,
  },
  {
    id: 'countingup', name: 'CountingUp', provider: 'CountingUp', slug: 'countingup',
    logo: banks.find(b => b.id === 'countingup')?.logo ?? '',
    monthlyFee: 3, perTransferFee: 30, freeTransfersPerMonth: 0,
    perIncomingFee: 0, cashDepositRate: 0.5, cashDepositMin: 0,
    cashDepositAccepted: true, intlTransferFee: 0, intlTransferPct: 0,
    overdraftMonthlyFee: 0,
    affiliateUrl: banks.find(b => b.id === 'countingup')?.affiliateUrl,
  },
];

interface Inputs {
  outgoingTransfers: number;
  incomingTransfers: number;
  cashDepositAmount: number;
  cashDepositFrequency: number;
  intlTransfers: number;
  intlTransferAvgAmount: number;
  needsOverdraft: boolean;
}

interface CostResult {
  model: BankFeeModel;
  monthlyFee: number;
  transferCost: number;
  cashCost: number;
  intlCost: number;
  overdraftCost: number;
  total: number;
  cashWarning: boolean;
}

function calcCost(model: BankFeeModel, inputs: Inputs): CostResult {
  const billableTransfers = Math.max(0, inputs.outgoingTransfers - model.freeTransfersPerMonth);
  const transferCost = (billableTransfers * model.perTransferFee) / 100;

  let cashCost = 0;
  let cashWarning = false;
  if (inputs.cashDepositAmount > 0 && inputs.cashDepositFrequency > 0) {
    if (!model.cashDepositAccepted) {
      cashWarning = true;
      cashCost = 0;
    } else {
      const totalCash = inputs.cashDepositAmount * inputs.cashDepositFrequency;
      const pctCost = totalCash * (model.cashDepositRate / 100);
      const minCost = (model.cashDepositMin / 100) * inputs.cashDepositFrequency;
      cashCost = Math.max(pctCost, minCost);
    }
  }

  let intlCost = 0;
  if (inputs.intlTransfers > 0 && inputs.intlTransferAvgAmount > 0) {
    const flatFees = (inputs.intlTransfers * model.intlTransferFee) / 100;
    const pctFees = inputs.intlTransfers * inputs.intlTransferAvgAmount * (model.intlTransferPct / 100);
    intlCost = flatFees + pctFees;
  }

  const overdraftCost = inputs.needsOverdraft ? model.overdraftMonthlyFee : 0;
  const total = model.monthlyFee + transferCost + cashCost + intlCost + overdraftCost;

  return { model, monthlyFee: model.monthlyFee, transferCost, cashCost, intlCost, overdraftCost, total, cashWarning };
}

function fmt(n: number) {
  if (n === 0) return '£0.00';
  return `£${n.toFixed(2)}`;
}

function SliderInput({ label, value, onChange, min, max, step, unit, tooltip }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; unit: string; tooltip?: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1" style={{ fontFamily: 'Sora, sans-serif' }}>
          {label}
          {tooltip && (
            <span className="group relative cursor-help">
              <Info className="w-3.5 h-3.5 text-gray-400" />
              <span className="absolute left-5 top-0 z-10 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 w-48 shadow-lg">{tooltip}</span>
            </span>
          )}
        </label>
        <span className="text-sm font-bold text-blue-600" style={{ fontFamily: 'Sora, sans-serif' }}>
          {unit === '£' ? `£${value.toLocaleString()}` : `${value} ${unit}`}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{unit === '£' ? `£${min}` : `${min} ${unit}`}</span>
        <span>{unit === '£' ? `£${max.toLocaleString()}` : `${max} ${unit}`}</span>
      </div>
    </div>
  );
}

export default function BusinessCostCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    outgoingTransfers: 20,
    incomingTransfers: 10,
    cashDepositAmount: 0,
    cashDepositFrequency: 0,
    intlTransfers: 0,
    intlTransferAvgAmount: 500,
    needsOverdraft: false,
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const set = (key: keyof Inputs) => (v: number | boolean) =>
    setInputs(prev => ({ ...prev, [key]: v }));

  const results = useMemo(() => {
    return feeModels
      .map(m => calcCost(m, inputs))
      .sort((a, b) => a.total - b.total);
  }, [inputs]);

  const cheapest = results[0];
  const mostExpensive = results[results.length - 1];
  const potentialSaving = mostExpensive.total - cheapest.total;

  const hasCash = inputs.cashDepositAmount > 0 && inputs.cashDepositFrequency > 0;
  const cashWarningBanks = results.filter(r => r.cashWarning).map(r => r.model.name);

  return (
    <>
      <Helmet>
        <title>Business Banking Cost Calculator UK 2026 | Business Bank Compare</title>
        <meta name="description" content="Calculate your true monthly business banking cost across all major UK banks. Enter your transaction volumes and instantly see which bank is cheapest for your business." />
        <link rel="canonical" href="https://businessbankcompare.co.uk/calculators/business-cost" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div style={{ paddingTop: '88px' }}>
        {/* Hero */}
        <div style={{ background: '#0f172a' }} className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-blue-300 text-sm mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              <Link href="/calculators" className="hover:text-white no-underline">Calculators</Link>
              <span>/</span>
              <span className="text-white">Business Banking Cost Calculator</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Calculator className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Business Banking Cost Calculator
                </h1>
                <p className="text-blue-100 text-base max-w-2xl">
                  Enter your monthly transaction volumes below to see your estimated banking cost at every major UK provider — ranked cheapest first.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* ── Inputs panel ── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Your Monthly Banking Activity
                </h2>

                <SliderInput
                  label="Outgoing UK transfers"
                  value={inputs.outgoingTransfers} onChange={set('outgoingTransfers')}
                  min={0} max={500} step={5} unit="transfers"
                  tooltip="Bank transfers, supplier payments, payroll runs etc."
                />
                <SliderInput
                  label="Incoming payments"
                  value={inputs.incomingTransfers} onChange={set('incomingTransfers')}
                  min={0} max={500} step={5} unit="payments"
                  tooltip="Customer payments, invoice receipts etc."
                />

                <div className="border-t border-gray-100 my-4" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Cash Deposits</p>

                <SliderInput
                  label="Cash deposit per visit"
                  value={inputs.cashDepositAmount} onChange={set('cashDepositAmount')}
                  min={0} max={5000} step={100} unit="£"
                  tooltip="Average amount you deposit in cash each visit"
                />
                <SliderInput
                  label="Cash deposit visits / month"
                  value={inputs.cashDepositFrequency} onChange={set('cashDepositFrequency')}
                  min={0} max={20} step={1} unit="visits"
                />

                <div className="border-t border-gray-100 my-4" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">International Payments</p>

                <SliderInput
                  label="International transfers / month"
                  value={inputs.intlTransfers} onChange={set('intlTransfers')}
                  min={0} max={50} step={1} unit="transfers"
                />
                {inputs.intlTransfers > 0 && (
                  <SliderInput
                    label="Average transfer amount"
                    value={inputs.intlTransferAvgAmount} onChange={set('intlTransferAvgAmount')}
                    min={100} max={50000} step={100} unit="£"
                  />
                )}

                <div className="border-t border-gray-100 my-4" />
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.needsOverdraft}
                    onChange={e => set('needsOverdraft')(e.target.checked)}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Sora, sans-serif' }}>
                    I need an overdraft facility
                  </span>
                </label>

                {/* Summary box */}
                {potentialSaving > 0.5 && (
                  <div className="mt-5 p-3 rounded-xl bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 text-green-700 text-sm font-semibold" style={{ fontFamily: 'Sora, sans-serif' }}>
                      <TrendingDown className="w-4 h-4" />
                      You could save up to {fmt(potentialSaving * 12)}/year
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      by switching from the most expensive to the cheapest option for your usage.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Results panel ── */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Estimated Monthly Cost — Ranked Cheapest First
                </h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{results.length} banks</span>
              </div>

              {hasCash && cashWarningBanks.length > 0 && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
                  <strong>Note:</strong> {cashWarningBanks.join(', ')} {cashWarningBanks.length === 1 ? 'does' : 'do'} not accept cash deposits — cash costs shown as £0 but you would need an alternative arrangement.
                </div>
              )}

              <div className="space-y-3">
                {results.map((result, idx) => {
                  const isExpanded = expandedId === result.model.id;
                  const isCheapest = idx === 0;
                  const savingVsCheapest = result.total - cheapest.total;

                  return (
                    <div
                      key={result.model.id}
                      className={`bg-white rounded-2xl border transition-all ${isCheapest ? 'border-green-300 shadow-md' : 'border-gray-100 shadow-sm'}`}
                    >
                      <div
                        className="flex items-center gap-3 p-4 cursor-pointer"
                        onClick={() => setExpandedId(isExpanded ? null : result.model.id)}
                      >
                        {/* Rank */}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isCheapest ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {idx + 1}
                        </div>

                        {/* Logo */}
                        <img src={result.model.logo} alt={result.model.name} className="w-8 h-8 object-contain rounded flex-shrink-0" />

                        {/* Name */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                              {result.model.name}
                            </span>
                            {isCheapest && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Cheapest for you</span>
                            )}
                            {result.cashWarning && hasCash && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">No cash deposits</span>
                            )}
                          </div>
                          {savingVsCheapest > 0.5 && (
                            <p className="text-xs text-red-500 mt-0.5">+{fmt(savingVsCheapest)}/mo more than cheapest</p>
                          )}
                        </div>

                        {/* Total */}
                        <div className="text-right flex-shrink-0">
                          <div className={`text-lg font-bold ${isCheapest ? 'text-green-600' : 'text-gray-900'}`} style={{ fontFamily: 'Sora, sans-serif' }}>
                            {fmt(result.total)}
                          </div>
                          <div className="text-xs text-gray-400">per month</div>
                        </div>

                        {/* Expand */}
                        <div className="flex-shrink-0 ml-1">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </div>
                      </div>

                      {/* Breakdown */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 px-4 pb-4 pt-3">
                          <table className="w-full text-sm mb-4">
                            <tbody>
                              {[
                                ['Monthly account fee', result.monthlyFee],
                                ['UK transfer fees', result.transferCost],
                                ['Cash deposit fees', result.cashCost],
                                ['International transfer fees', result.intlCost],
                                ['Overdraft facility', result.overdraftCost],
                              ].map(([label, val]) => (
                                <tr key={label as string} className="border-b border-gray-50">
                                  <td className="py-1.5 text-gray-600">{label as string}</td>
                                  <td className="py-1.5 text-right font-semibold text-gray-900">{fmt(val as number)}</td>
                                </tr>
                              ))}
                              <tr className="font-bold">
                                <td className="pt-2 text-gray-900">Estimated total</td>
                                <td className="pt-2 text-right text-blue-600">{fmt(result.total)}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="flex gap-2">
                            <a
                              href={result.model.affiliateUrl ?? '#'}
                              target="_blank" rel="noopener noreferrer sponsored"
                              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white no-underline transition-all hover:opacity-90"
                              style={{ background: '#2563eb', fontFamily: 'Sora, sans-serif' }}
                            >
                              Open Account <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <Link
                              href={`/${result.model.slug}`}
                              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-700 no-underline hover:bg-gray-50 transition-all"
                              style={{ fontFamily: 'Sora, sans-serif' }}
                            >
                              Read Review
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                <strong>Disclaimer:</strong> These estimates are based on published tariffs as of March 2026 and are for guidance only. Actual costs may vary. Some banks offer introductory free periods not reflected here. Always verify current fees directly with the provider before opening an account. Some links are affiliate links.
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
