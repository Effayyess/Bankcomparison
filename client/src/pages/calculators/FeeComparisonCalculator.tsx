// Fee Comparison Calculator
// Side-by-side detailed fee breakdown for up to 3 selected banks
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { BarChart3, Plus, X, CheckCircle, XCircle, ExternalLink, Info } from 'lucide-react';
import { banks } from '@/lib/bankData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Re-use fee model from cost calculator (inline here to keep files independent)
interface BankFeeRow {
  id: string;
  name: string;
  provider: string;
  slug: string;
  logo: string;
  affiliateUrl?: string;
  // Account basics
  monthlyFee: number;
  openingFee: string;
  creditCheck: boolean;
  fscsProtection: boolean;
  // UK transactions
  freeTransfersPerMonth: number;
  perTransferFee: number;       // pence
  perIncomingFee: number;       // pence
  // Cash
  cashDepositAccepted: boolean;
  cashDepositRate: number;      // %
  cashDepositMin: number;       // pence
  cashWithdrawalFee: string;
  // International
  intlTransferFee: number;      // pence flat
  intlTransferPct: number;      // % FX margin
  // Features
  hasOverdraft: boolean;
  hasAccounting: boolean;
  hasBranchAccess: boolean;
  hasFastOpening: boolean;
  hasMultiCurrency: boolean;
  appRating: number;
  trustpilot: number;
}

const feeRows: BankFeeRow[] = [
  {
    id: 'hsbc', name: 'HSBC Small Business', provider: 'HSBC UK', slug: 'hsbc-business',
    logo: banks.find(b => b.id === 'hsbc')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'hsbc')?.affiliateUrl,
    monthlyFee: 0, openingFee: 'Free', creditCheck: true, fscsProtection: true,
    freeTransfersPerMonth: 0, perTransferFee: 35, perIncomingFee: 0,
    cashDepositAccepted: true, cashDepositRate: 0.9, cashDepositMin: 100, cashWithdrawalFee: 'Free ATM',
    intlTransferFee: 2500, intlTransferPct: 2.75,
    hasOverdraft: true, hasAccounting: true, hasBranchAccess: true, hasFastOpening: false, hasMultiCurrency: false,
    appRating: 4.5, trustpilot: 1.5,
  },
  {
    id: 'tide', name: 'Tide Business', provider: 'Tide', slug: 'tide-business',
    logo: banks.find(b => b.id === 'tide')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'tide')?.affiliateUrl,
    monthlyFee: 0, openingFee: 'Free', creditCheck: false, fscsProtection: true,
    freeTransfersPerMonth: 0, perTransferFee: 20, perIncomingFee: 0,
    cashDepositAccepted: true, cashDepositRate: 1.0, cashDepositMin: 100, cashWithdrawalFee: 'Free ATM',
    intlTransferFee: 300, intlTransferPct: 0.5,
    hasOverdraft: false, hasAccounting: true, hasBranchAccess: false, hasFastOpening: true, hasMultiCurrency: false,
    appRating: 4.6, trustpilot: 4.1,
  },
  {
    id: 'starling', name: 'Starling Bank Business', provider: 'Starling Bank', slug: 'starling-bank',
    logo: banks.find(b => b.id === 'starling')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'starling')?.affiliateUrl,
    monthlyFee: 0, openingFee: 'Free', creditCheck: false, fscsProtection: true,
    freeTransfersPerMonth: 9999, perTransferFee: 0, perIncomingFee: 0,
    cashDepositAccepted: true, cashDepositRate: 0.7, cashDepositMin: 0, cashWithdrawalFee: 'Free ATM',
    intlTransferFee: 0, intlTransferPct: 0.4,
    hasOverdraft: true, hasAccounting: true, hasBranchAccess: false, hasFastOpening: true, hasMultiCurrency: false,
    appRating: 4.8, trustpilot: 4.3,
  },
  {
    id: 'monzo', name: 'Monzo Business', provider: 'Monzo', slug: 'monzo-business',
    logo: banks.find(b => b.id === 'monzo')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'monzo')?.affiliateUrl,
    monthlyFee: 0, openingFee: 'Free', creditCheck: false, fscsProtection: true,
    freeTransfersPerMonth: 9999, perTransferFee: 0, perIncomingFee: 0,
    cashDepositAccepted: true, cashDepositRate: 1.0, cashDepositMin: 50, cashWithdrawalFee: 'Free ATM',
    intlTransferFee: 50, intlTransferPct: 0.35,
    hasOverdraft: false, hasAccounting: true, hasBranchAccess: false, hasFastOpening: true, hasMultiCurrency: false,
    appRating: 4.7, trustpilot: 4.4,
  },
  {
    id: 'revolut', name: 'Revolut Business', provider: 'Revolut', slug: 'revolut-business',
    logo: banks.find(b => b.id === 'revolut')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'revolut')?.affiliateUrl,
    monthlyFee: 10, openingFee: 'Free', creditCheck: false, fscsProtection: false,
    freeTransfersPerMonth: 10, perTransferFee: 20, perIncomingFee: 0,
    cashDepositAccepted: false, cashDepositRate: 0, cashDepositMin: 0, cashWithdrawalFee: '2% above limit',
    intlTransferFee: 0, intlTransferPct: 0,
    hasOverdraft: false, hasAccounting: true, hasBranchAccess: false, hasFastOpening: true, hasMultiCurrency: true,
    appRating: 4.5, trustpilot: 4.2,
  },
  {
    id: 'wise', name: 'Wise Business', provider: 'Wise', slug: 'wise-business',
    logo: banks.find(b => b.id === 'wise')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'wise')?.affiliateUrl,
    monthlyFee: 0, openingFee: 'Free', creditCheck: false, fscsProtection: false,
    freeTransfersPerMonth: 9999, perTransferFee: 0, perIncomingFee: 0,
    cashDepositAccepted: false, cashDepositRate: 0, cashDepositMin: 0, cashWithdrawalFee: 'N/A',
    intlTransferFee: 0, intlTransferPct: 0.41,
    hasOverdraft: false, hasAccounting: true, hasBranchAccess: false, hasFastOpening: true, hasMultiCurrency: true,
    appRating: 4.6, trustpilot: 4.4,
  },
  {
    id: 'lloyds', name: 'Lloyds Business', provider: 'Lloyds Bank', slug: 'lloyds-business',
    logo: banks.find(b => b.id === 'lloyds')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'lloyds')?.affiliateUrl,
    monthlyFee: 0, openingFee: 'Free', creditCheck: true, fscsProtection: true,
    freeTransfersPerMonth: 0, perTransferFee: 30, perIncomingFee: 0,
    cashDepositAccepted: true, cashDepositRate: 0.8, cashDepositMin: 0, cashWithdrawalFee: 'Free ATM',
    intlTransferFee: 2000, intlTransferPct: 2.5,
    hasOverdraft: true, hasAccounting: true, hasBranchAccess: true, hasFastOpening: false, hasMultiCurrency: false,
    appRating: 3.8, trustpilot: 1.5,
  },
  {
    id: 'barclays', name: 'Barclays Business', provider: 'Barclays', slug: 'barclays-business',
    logo: banks.find(b => b.id === 'barclays')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'barclays')?.affiliateUrl,
    monthlyFee: 0, openingFee: 'Free', creditCheck: true, fscsProtection: true,
    freeTransfersPerMonth: 0, perTransferFee: 35, perIncomingFee: 0,
    cashDepositAccepted: true, cashDepositRate: 0.9, cashDepositMin: 100, cashWithdrawalFee: 'Free ATM',
    intlTransferFee: 2500, intlTransferPct: 2.75,
    hasOverdraft: true, hasAccounting: true, hasBranchAccess: true, hasFastOpening: false, hasMultiCurrency: false,
    appRating: 4.2, trustpilot: 1.5,
  },
  {
    id: 'natwest', name: 'NatWest Business', provider: 'NatWest', slug: 'natwest-business',
    logo: banks.find(b => b.id === 'natwest')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'natwest')?.affiliateUrl,
    monthlyFee: 0, openingFee: 'Free', creditCheck: true, fscsProtection: true,
    freeTransfersPerMonth: 0, perTransferFee: 35, perIncomingFee: 0,
    cashDepositAccepted: true, cashDepositRate: 0.7, cashDepositMin: 0, cashWithdrawalFee: 'Free ATM',
    intlTransferFee: 2000, intlTransferPct: 2.5,
    hasOverdraft: true, hasAccounting: true, hasBranchAccess: true, hasFastOpening: false, hasMultiCurrency: false,
    appRating: 4.0, trustpilot: 1.5,
  },
  {
    id: 'anna', name: 'ANNA Money', provider: 'ANNA', slug: 'anna-money',
    logo: banks.find(b => b.id === 'anna')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'anna')?.affiliateUrl,
    monthlyFee: 0, openingFee: 'Free', creditCheck: false, fscsProtection: true,
    freeTransfersPerMonth: 9999, perTransferFee: 0, perIncomingFee: 0,
    cashDepositAccepted: true, cashDepositRate: 1.0, cashDepositMin: 100, cashWithdrawalFee: 'Free ATM',
    intlTransferFee: 200, intlTransferPct: 0.5,
    hasOverdraft: false, hasAccounting: true, hasBranchAccess: false, hasFastOpening: true, hasMultiCurrency: false,
    appRating: 4.1, trustpilot: 4.2,
  },
  {
    id: 'mettle', name: 'Mettle by NatWest', provider: 'Mettle', slug: 'mettle',
    logo: banks.find(b => b.id === 'mettle')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'mettle')?.affiliateUrl,
    monthlyFee: 0, openingFee: 'Free', creditCheck: false, fscsProtection: true,
    freeTransfersPerMonth: 9999, perTransferFee: 0, perIncomingFee: 0,
    cashDepositAccepted: true, cashDepositRate: 1.0, cashDepositMin: 0, cashWithdrawalFee: 'Free ATM',
    intlTransferFee: 0, intlTransferPct: 0,
    hasOverdraft: false, hasAccounting: true, hasBranchAccess: false, hasFastOpening: true, hasMultiCurrency: false,
    appRating: 4.3, trustpilot: 4.0,
  },
  {
    id: 'countingup', name: 'CountingUp', provider: 'CountingUp', slug: 'countingup',
    logo: banks.find(b => b.id === 'countingup')?.logo ?? '',
    affiliateUrl: banks.find(b => b.id === 'countingup')?.affiliateUrl,
    monthlyFee: 3, openingFee: 'Free', creditCheck: false, fscsProtection: true,
    freeTransfersPerMonth: 0, perTransferFee: 30, perIncomingFee: 0,
    cashDepositAccepted: true, cashDepositRate: 0.5, cashDepositMin: 0, cashWithdrawalFee: 'Free ATM',
    intlTransferFee: 0, intlTransferPct: 0,
    hasOverdraft: false, hasAccounting: true, hasBranchAccess: false, hasFastOpening: true, hasMultiCurrency: false,
    appRating: 4.0, trustpilot: 4.0,
  },
];

function Bool({ v }: { v: boolean }) {
  return v
    ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
    : <XCircle className="w-5 h-5 text-red-300 mx-auto" />;
}

function fmt(n: number) {
  return n === 0 ? 'Free' : `£${n.toFixed(2)}`;
}

function pence(p: number) {
  return p === 0 ? 'Free' : `${p}p`;
}

interface RowDef {
  label: string;
  tooltip?: string;
  render: (b: BankFeeRow) => React.ReactNode;
}

const rowDefs: RowDef[] = [
  { label: 'Monthly fee', render: b => <span className="font-bold">{b.monthlyFee === 0 ? 'Free' : `£${b.monthlyFee}/mo`}</span> },
  { label: 'Opening fee', render: b => b.openingFee },
  { label: 'Credit check required', render: b => <Bool v={b.creditCheck} /> },
  { label: 'FSCS protected', tooltip: 'Financial Services Compensation Scheme — protects deposits up to £85,000', render: b => <Bool v={b.fscsProtection} /> },
  { label: 'Free UK transfers / month', render: b => b.freeTransfersPerMonth >= 9999 ? 'Unlimited' : b.freeTransfersPerMonth.toString() },
  { label: 'Per transfer fee (above limit)', render: b => pence(b.perTransferFee) },
  { label: 'Cash deposits accepted', render: b => <Bool v={b.cashDepositAccepted} /> },
  { label: 'Cash deposit fee', render: b => b.cashDepositAccepted ? `${b.cashDepositRate}% (min ${b.cashDepositMin === 0 ? 'none' : `${b.cashDepositMin}p`})` : 'N/A' },
  { label: 'Cash withdrawals', render: b => b.cashWithdrawalFee },
  { label: 'International transfer flat fee', render: b => pence(b.intlTransferFee) },
  { label: 'FX conversion margin', render: b => b.intlTransferPct === 0 ? 'Mid-market rate' : `~${b.intlTransferPct}%` },
  { label: 'Overdraft available', render: b => <Bool v={b.hasOverdraft} /> },
  { label: 'Accounting integrations', render: b => <Bool v={b.hasAccounting} /> },
  { label: 'Branch access', render: b => <Bool v={b.hasBranchAccess} /> },
  { label: 'Fast account opening', render: b => <Bool v={b.hasFastOpening} /> },
  { label: 'Multi-currency accounts', render: b => <Bool v={b.hasMultiCurrency} /> },
  { label: 'App store rating', render: b => b.appRating > 0 ? `${b.appRating} / 5` : 'N/A' },
  { label: 'Trustpilot score', render: b => b.trustpilot > 0 ? `${b.trustpilot} / 5` : 'N/A' },
];

export default function FeeComparisonCalculator() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['starling', 'tide', 'monzo']);
  const [pickerOpen, setPickerOpen] = useState(false);

  const selected = useMemo(() => selectedIds.map(id => feeRows.find(r => r.id === id)!).filter(Boolean), [selectedIds]);
  const available = feeRows.filter(r => !selectedIds.includes(r.id));

  const addBank = (id: string) => {
    if (selectedIds.length < 3) setSelectedIds(prev => [...prev, id]);
    setPickerOpen(false);
  };
  const removeBank = (id: string) => setSelectedIds(prev => prev.filter(x => x !== id));

  return (
    <>
      <Helmet>
        <title>Business Bank Fee Comparison Calculator UK 2026 | Business Bank Compare</title>
        <meta name="description" content="Compare business bank account fees side-by-side. Select up to 3 UK banks and see a full breakdown of every charge — monthly fees, transfer costs, cash fees, and more." />
        <link rel="canonical" href="https://businessbankcompare.co.uk/calculators/fee-comparison" />
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
              <span className="text-white">Fee Comparison Calculator</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Fee Comparison Calculator
                </h1>
                <p className="text-blue-100 text-base max-w-2xl">
                  Select up to 3 UK business banks and compare every fee side-by-side — from monthly charges and transfer costs to cash deposit rates and international payments.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">

          {/* Bank selector */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                Select up to 3 banks to compare
              </h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{selected.length}/3 selected</span>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {selected.map(bank => (
                <div key={bank.id} className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
                  <img src={bank.logo} alt={bank.name} className="w-6 h-6 object-contain rounded" />
                  <span className="text-sm font-semibold text-blue-800" style={{ fontFamily: 'Sora, sans-serif' }}>{bank.name}</span>
                  <button onClick={() => removeBank(bank.id)} className="ml-1 text-blue-400 hover:text-red-500 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {selected.length < 3 && (
                <div className="relative">
                  <button
                    onClick={() => setPickerOpen(!pickerOpen)}
                    className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    <Plus className="w-4 h-4" /> Add bank
                  </button>
                  {pickerOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 w-56 max-h-64 overflow-y-auto">
                      {available.map(bank => (
                        <button
                          key={bank.id}
                          onClick={() => addBank(bank.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-left transition-colors"
                        >
                          <img src={bank.logo} alt={bank.name} className="w-5 h-5 object-contain rounded" />
                          <span className="text-sm text-gray-700" style={{ fontFamily: 'Sora, sans-serif' }}>{bank.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Comparison table */}
          {selected.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header row */}
              <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
                <div className="p-4 bg-gray-50" />
                {selected.map(bank => (
                  <div key={bank.id} className="p-4 text-center border-l border-gray-100">
                    <img src={bank.logo} alt={bank.name} className="w-10 h-10 object-contain rounded mx-auto mb-2" />
                    <div className="font-bold text-sm text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{bank.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{bank.provider}</div>
                    <div className="flex gap-1 mt-3 justify-center">
                      <a
                        href={bank.affiliateUrl ?? '#'}
                        target="_blank" rel="noopener noreferrer sponsored"
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-white no-underline"
                        style={{ background: '#2563eb', fontFamily: 'Sora, sans-serif' }}
                      >
                        Open <ExternalLink className="w-3 h-3" />
                      </a>
                      <Link
                        href={`/${bank.slug}`}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border border-gray-200 text-gray-700 no-underline hover:bg-gray-50"
                        style={{ fontFamily: 'Sora, sans-serif' }}
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data rows */}
              {rowDefs.map((row, idx) => (
                <div
                  key={row.label}
                  className={`grid border-b border-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}
                >
                  <div className="p-3 flex items-center gap-1.5">
                    <span className="text-sm text-gray-600" style={{ fontFamily: 'Sora, sans-serif' }}>{row.label}</span>
                    {row.tooltip && (
                      <span className="group relative cursor-help">
                        <Info className="w-3 h-3 text-gray-400" />
                        <span className="absolute left-4 top-0 z-10 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 w-44 shadow-lg">{row.tooltip}</span>
                      </span>
                    )}
                  </div>
                  {selected.map(bank => (
                    <div key={bank.id} className="p-3 text-center text-sm text-gray-800 border-l border-gray-100 flex items-center justify-center" style={{ fontFamily: 'Sora, sans-serif' }}>
                      {row.render(bank)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {selected.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-semibold" style={{ fontFamily: 'Sora, sans-serif' }}>Select at least one bank to compare</p>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-6 leading-relaxed">
            <strong>Disclaimer:</strong> Fee data is based on published tariffs as of March 2026. Always verify current fees directly with the provider. Some links are affiliate links — we may earn a commission if you open an account, which never influences our editorial data.
          </p>
        </div>
        </div>{/* end paddingTop wrapper */}
        <Footer />
      </div>
    </>
  );
}
