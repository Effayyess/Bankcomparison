// BankCard — matches original buscompare design
// White card, logo image with fallback, rating stars, offer banner, pros list, expandable details
import { useState } from 'react';
import { Link } from 'wouter';
import { Star, ChevronDown, ChevronUp, Shield, Zap, ExternalLink, Check, X } from 'lucide-react';
import type { BankAccount } from '@/lib/bankData';

interface BankCardProps {
  bank: BankAccount;
  rank?: number;
  showOffer?: boolean;
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

export default function BankCard({ bank, rank, showOffer = true }: BankCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300"
      style={{ fontFamily: 'Sora, sans-serif' }}
    >
      {/* Welcome offer banner */}
      {showOffer && bank.welcomeOffer && (
        <div
          className="px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
          style={{ background: '#fefce8', color: '#92400e', borderBottom: '1px solid #fde68a' }}
        >
          <span>🎁</span>
          <span>Current Offer: {bank.welcomeOffer}</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Rank + Logo */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            {rank && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: rank === 1 ? 'oklch(55% .12 210)' : 'oklch(70% .02 240)' }}
              >
                {rank}
              </div>
            )}
            <div
              className="w-14 h-14 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden bg-white shadow-sm"
            >
              {!imgError ? (
                <img
                  src={bank.logo}
                  alt={`${bank.provider} logo`}
                  className="w-10 h-10 object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: bank.logoColor }}
                >
                  {bank.provider.substring(0, 4).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <div>
                {bank.badge && (
                  <span
                    className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1"
                    style={{ background: 'oklch(0.93 0.04 210)', color: 'oklch(0.35 0.12 210)' }}
                  >
                    {bank.badge}
                  </span>
                )}
                <h3 className="font-bold text-gray-900 text-base leading-tight">{bank.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{bank.provider}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-lg" style={{ color: 'oklch(26% .07 240)' }}>
                  {bank.monthlyFee}
                </div>
                <div className="text-xs text-gray-500">per month</div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={bank.rating} />
              <span className="text-xs font-semibold text-gray-700">{bank.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500">{bank.ratingLabel}</span>
              {bank.fscsProtection && (
                <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                  <Shield className="w-3 h-3" />
                  FSCS
                </span>
              )}
              {bank.hasFastOpening && (
                <span className="flex items-center gap-0.5 text-xs font-medium text-teal-600">
                  <Zap className="w-3 h-3" />
                  Fast Open
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-snug mb-3">{bank.tagline}</p>

            {/* Best for */}
            <div className="text-xs text-gray-500 mb-3">
              <span className="font-semibold text-gray-700">Best for: </span>
              {bank.bestFor}
            </div>

            {/* Pros list (top 3) */}
            <ul className="space-y-1 mb-4">
              {bank.pros.slice(0, 3).map((pro) => (
                <li key={pro} className="flex items-start gap-1.5 text-xs text-gray-700">
                  <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-500" />
                  {pro}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 no-underline"
                style={{ background: 'oklch(55% .12 210)' }}
                onClick={(e) => e.preventDefault()}
              >
                Open Account
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                href={`/${bank.slug}`}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors no-underline text-gray-700"
              >
                Full Review
              </Link>
              <button
                className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <>Less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>More details <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Monthly Fee', value: bank.monthlyFee },
                { label: 'Free Transfers', value: bank.freeTransfers },
                { label: 'ATM Withdrawals', value: bank.atmWithdrawals },
                { label: 'Cash Deposits', value: bank.cashDeposits },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                  <div className="text-sm font-semibold text-gray-800">{value}</div>
                </div>
              ))}
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Pros</div>
                <ul className="space-y-1.5">
                  {bank.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-1.5 text-xs text-gray-700">
                      <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-500" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cons</div>
                <ul className="space-y-1.5">
                  {bank.cons.map((con) => (
                    <li key={con} className="flex items-start gap-1.5 text-xs text-gray-700">
                      <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-red-400" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Accounting integrations */}
            {bank.accountingIntegrations.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Accounting Integrations</div>
                <div className="flex flex-wrap gap-1.5">
                  {bank.accountingIntegrations.map((acc) => (
                    <span
                      key={acc}
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{ background: 'oklch(0.95 0.02 210)', color: 'oklch(0.35 0.1 210)', borderColor: 'oklch(0.88 0.04 210)' }}
                    >
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Welcome offer detail */}
            {bank.welcomeOfferDetail && (
              <div className="text-xs p-3 rounded-lg bg-amber-50 text-amber-800">
                <span className="font-semibold">Offer details: </span>
                {bank.welcomeOfferDetail}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
