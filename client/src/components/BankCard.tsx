// BankCard — exactly matches original buscompare-7vygqn9p.manus.space
// Layout: rank+logo | name+badge+tagline+rating+bestFor | monthly fee + buttons
// Offer banner: BELOW feature tags (amber)
// More Info expanded: plan tabs, key details table, pros/cons, accounting integrations, offer detail
import { useState } from 'react';
import { Link } from 'wouter';
import { Star, ChevronDown, ChevronUp, Zap, Check, X, ExternalLink, Info, TrendingUp, Lock, Shield } from 'lucide-react';
import type { BankAccount } from '@/lib/bankData';

interface BankCardProps {
  bank: BankAccount;
  rank?: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-3.5 h-3.5"
          style={{
            fill: star <= Math.round(rating) ? '#f59e0b' : 'none',
            color: star <= Math.round(rating) ? '#f59e0b' : '#d1d5db',
          }}
        />
      ))}
    </div>
  );
}

function FeatureTag({ label, color }: { label: string; color: string }) {
  const styles: Record<string, { bg: string; text: string; border: string }> = {
    green:  { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
    purple: { bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff' },
    blue:   { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
    orange: { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
    teal:   { bg: '#f0fdfa', text: '#0f766e', border: '#99f6e4' },
    yellow: { bg: '#fefce8', text: '#a16207', border: '#fde68a' },
  };
  const s = styles[color] || styles.green;
  return (
    <span
      className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border"
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
    >
      {label}
    </span>
  );
}

function getFeatureTags(bank: BankAccount) {
  const tags: { label: string; color: string }[] = [];
  if (bank.fscsProtection)           tags.push({ label: 'FSCS Protected',  color: 'green'  });
  if (bank.hasFastOpening)           tags.push({ label: 'Fast Opening',     color: 'teal'   });
  if (bank.hasNoCreditCheck)         tags.push({ label: 'No Credit Check',  color: 'purple' });
  if (bank.hasGlobalCurrencyAccounts)tags.push({ label: 'Multi-Currency',   color: 'blue'   });
  if (bank.hasBranchAccess)          tags.push({ label: 'Branch Access',    color: 'orange' });
  if (bank.hasAccounting)            tags.push({ label: 'Accounting',       color: 'yellow' });
  if (bank.hasSavingsProduct)         tags.push({ label: 'Savings Account',  color: 'teal'   });
  return tags;
}

export default function BankCard({ bank, rank }: BankCardProps) {
  const [expanded, setExpanded]       = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [imgError, setImgError]       = useState(false);

  const tags      = getFeatureTags(bank);
  const plan      = bank.plans[selectedPlan];
  const typeLabel = bank.type === 'highstreet' ? 'High Street' : 'Digital Bank';
  const typeBg    = bank.type === 'highstreet'
    ? { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' }
    : { bg: '#f0fdfa', text: '#0f766e', border: '#99f6e4' };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
      style={{ fontFamily: 'Sora, sans-serif' }}
    >
      <div className="p-4 md:p-5">
        {/* ── Main row ── */}
        <div className="flex items-start gap-3 md:gap-4">

          {/* Rank + Logo */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
            {rank && (
              <div
                className="text-xs font-bold text-gray-400 text-center leading-none"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {rank}
              </div>
            )}
            {/* Logo square — white background, no colour fill */}
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center overflow-hidden"
              style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}
            >
              {!imgError ? (
                <img
                  src={bank.logo}
                  alt={`${bank.provider} logo`}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="font-bold text-sm" style={{ color: bank.logoColor }}>
                  {bank.provider.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Middle: name + badges on same line, tagline, rating, bestFor */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight mr-1">
                {bank.name}
              </h3>
              {bank.badge && (
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: bank.badge === 'Most Popular' ? '#fef9c3' : '#ccfbf1',
                    color: bank.badge === 'Most Popular' ? '#a16207' : '#0f766e'
                  }}
                >
                  {bank.badge}
                </span>
              )}
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full border"
                style={{ background: typeBg.bg, color: typeBg.text, borderColor: typeBg.border }}
              >
                {typeLabel}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-1.5 mt-0.5">{bank.tagline}</p>
            <div className="flex items-center gap-2 mb-1">
              <StarRating rating={bank.rating} />
              <span className="text-xs font-semibold text-gray-700">{bank.rating}</span>
            </div>
            <p className="text-xs font-medium" style={{ color: '#2563eb' }}>
              Best for: {bank.bestFor}
            </p>
          </div>

          {/* Right: monthly fee + action buttons */}
          <div className="flex-shrink-0 flex flex-col items-end gap-2 ml-1">
            <div className="text-right">
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Monthly Fee</div>
              <div className="font-bold text-base md:text-lg text-gray-900">{bank.monthlyFee}</div>
            </div>
            <a
              href={bank.affiliateUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white no-underline transition-opacity hover:opacity-90"
              style={{ background: '#2563eb' }}
              onClick={!bank.affiliateUrl ? (e) => e.preventDefault() : undefined}
            >
              Open Account <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              href={`/${bank.slug}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:border-gray-300 transition-colors no-underline text-gray-700"
            >
              Read Review →
            </Link>
            <button
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? <><ChevronUp className="w-3.5 h-3.5" /> Less Info</>
                : <><ChevronDown className="w-3.5 h-3.5" /> More Info</>
              }
            </button>
          </div>
        </div>

        {/* Welcome offer banner — BELOW main row, ABOVE feature tags */}
        {bank.welcomeOffer && (
          <div
            className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
            style={{ background: '#fefce8', color: '#92400e', border: '1px solid #fde68a' }}
          >
            <Zap className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
            <span>CURRENT OFFER: {bank.welcomeOffer}</span>
          </div>
        )}

        {/* Feature tags — BELOW offer banner */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((t) => <FeatureTag key={t.label} label={t.label} color={t.color} />)}
          </div>
        )}
      </div>

      {/* ── Expanded More Info ── */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 md:px-5 pb-5 pt-4" style={{ background: '#f9fafb' }}>

          {/* Plan tabs */}
          {bank.plans.length > 0 && (
            <>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Account Plans
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {bank.plans.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPlan(i)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer"
                    style={
                      selectedPlan === i
                        ? { background: '#2563eb', color: '#fff', borderColor: '#2563eb' }
                        : { background: '#fff', color: '#374151', borderColor: '#d1d5db' }
                    }
                  >
                    {p.name}{' '}
                    <span style={{ opacity: 0.75 }}>{p.price}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {plan && (
            <>
              {plan.highlight && (
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3.5 h-3.5 text-amber-500" style={{ fill: '#f59e0b' }} />
                  <span className="text-xs font-semibold text-amber-700">{plan.highlight}</span>
                </div>
              )}

              {/* Three-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Features list */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {plan.name} — {plan.price}
                    {plan.priceNote ? ` (${plan.priceNote})` : ''}
                  </div>
                  <ul className="space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Details */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Key Details
                  </div>
                  {/* Hide current-account rows for savings-only banks */}
                  {!bank.hasSavingsProduct || bank.accountTypes?.includes('current') ? (
                    <table className="w-full text-xs mb-3">
                      <tbody>
                        {[
                          { label: 'UK Transfers',     value: bank.freeTransfers   },
                          { label: 'ATM Withdrawals',  value: bank.atmWithdrawals  },
                          { label: 'Spending Abroad',  value: bank.spendingAbroad  },
                          { label: 'Cash Deposits',    value: bank.cashDeposits    },
                        ].map(({ label, value }) => (
                          <tr key={label} className="border-b border-gray-100 last:border-0">
                            <td className="py-1.5 pr-2 text-gray-500 font-medium whitespace-nowrap">{label}</td>
                            <td className="py-1.5 text-gray-800 text-right font-semibold">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : null}
                  <div className="space-y-1">
                    {[
                      { label: 'FSCS Protected',        value: bank.fscsProtection,       show: true },
                      { label: 'Overdraft Available',   value: bank.overdraft,            show: !bank.hasSavingsProduct || !!bank.accountTypes?.includes('current') },
                      { label: 'International Payments',value: bank.internationalPayments, show: !bank.hasSavingsProduct || !!bank.accountTypes?.includes('current') },
                      { label: 'Cheque Deposits',       value: bank.chequeDeposits,       show: !bank.hasSavingsProduct || !!bank.accountTypes?.includes('current') },
                    ].filter(item => item.show).map(({ label, value }) => (
                      <div key={label} className="flex items-center gap-1.5 text-xs">
                        {value
                          ? <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          : <X     className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                        }
                        <span className={value ? 'text-gray-700' : 'text-gray-400'}>{label}</span>
                      </div>
                    ))}
                  </div>
                  {bank.accountingIntegrations.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-1">Accounting Integrations:</div>
                      <div className="flex flex-wrap gap-1">
                        {bank.accountingIntegrations.map((a) => (
                          <span
                            key={a}
                            className="text-xs px-2 py-0.5 rounded-full border font-medium"
                            style={{ background: '#f0fdf4', color: '#15803d', borderColor: '#bbf7d0' }}
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pros & Cons */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Pros & Cons
                  </div>
                  <div className="space-y-1 mb-3">
                    {bank.pros.slice(0, 5).map((p) => (
                      <div key={p} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-500" />
                        {p}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1 mb-3">
                    {bank.cons.slice(0, 3).map((c) => (
                      <div key={c} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-red-400" />
                        {c}
                      </div>
                    ))}
                  </div>
                  {/* T&C offer detail box — inside Pros & Cons column, below cons */}
                  {bank.welcomeOfferDetail && (
                    <div
                      className="flex items-start gap-2 p-2.5 rounded-lg text-xs"
                      style={{ background: '#fff7ed', border: '1px solid #fed7aa', color: '#9a3412' }}
                    >
                      <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#ea580c' }} />
                      <span>{bank.welcomeOfferDetail}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Savings Products Section ── */}
              {bank.hasSavingsProduct && bank.savingsProducts && bank.savingsProducts.length > 0 && (
                <div className="mt-5 border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Business Savings Products</span>
                    {bank.savingsProducts?.some(sp => sp.fscsProtected) && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                        FSCS Protected
                      </span>
                    )}
                    {bank.savingsProducts?.some(sp => !sp.fscsProtected) && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: '#fff7ed', color: '#c2410c' }}>
                        Safeguarded
                      </span>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 pr-3 text-gray-500 font-semibold">Product</th>
                          <th className="text-left py-2 pr-3 text-gray-500 font-semibold">Type</th>
                          <th className="text-left py-2 pr-3 text-gray-500 font-semibold">AER</th>
                          <th className="text-left py-2 pr-3 text-gray-500 font-semibold">Term</th>
                          <th className="text-left py-2 pr-3 text-gray-500 font-semibold">Min. Deposit</th>
                          <th className="text-left py-2 text-gray-500 font-semibold">Interest Paid</th>
                          <th className="text-left py-2 text-gray-500 font-semibold">Protection</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bank.savingsProducts.map((sp, i) => {
                          const typeIcon = sp.type === 'fixed-rate'
                            ? <Lock className="w-3 h-3 inline mr-1" />
                            : sp.type === 'notice'
                            ? <TrendingUp className="w-3 h-3 inline mr-1" />
                            : <Zap className="w-3 h-3 inline mr-1" />;
                          const typeColour = sp.type === 'fixed-rate'
                            ? { bg: '#f0fdf4', text: '#15803d' }
                            : sp.type === 'notice'
                            ? { bg: '#fef9c3', text: '#854d0e' }
                            : { bg: '#eff6ff', text: '#1d4ed8' };
                          return (
                            <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-blue-50 transition-colors">
                              <td className="py-2 pr-3 font-semibold text-gray-900">
                                {sp.productName}
                                {sp.badge && (
                                  <span className="ml-1.5 px-1.5 py-0.5 rounded text-xs font-bold" style={{ background: '#2563eb', color: 'white' }}>
                                    {sp.badge}
                                  </span>
                                )}
                              </td>
                              <td className="py-2 pr-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: typeColour.bg, color: typeColour.text }}>
                                  {typeIcon}
                                  {sp.type === 'easy-access' ? 'Easy Access' : sp.type === 'notice' ? 'Notice' : 'Fixed Rate'}
                                </span>
                              </td>
                              <td className="py-2 pr-3 font-bold text-blue-600">{sp.aerLabel}</td>
                              <td className="py-2 pr-3 text-gray-700">{sp.term}</td>
                              <td className="py-2 pr-3 text-gray-700">{sp.minDepositLabel}</td>
                              <td className="py-2 pr-3 text-gray-700">{sp.interestPaid}</td>
                              <td className="py-2">
                                {sp.fscsProtected
                                  ? <span className="inline-flex items-center gap-1 text-green-700 font-semibold"><Shield className="w-3 h-3" />FSCS</span>
                                  : <span className="text-amber-600 font-semibold">Safeguarded</span>
                                }
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Rates are variable unless stated as fixed. FSCS protection up to £85,000 per authorised institution.
                  </p>
                </div>
              )}

              {/* Bottom CTAs — right-aligned to match top buttons */}
              <div className="mt-4 flex justify-end gap-2">
                <a
                  href={bank.affiliateUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                  style={{ background: '#2563eb' }}
                  onClick={!bank.affiliateUrl ? (e) => e.preventDefault() : undefined}
                >
                  Open Account <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href={`/${bank.slug}`}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors no-underline text-gray-700"
                >
                  Full Review
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
