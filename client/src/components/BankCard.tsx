// Design: Authoritative Broadsheet | BankCard component
// White card with thick green top border (signature element), logo as <img> tag
// Expandable with plan tabs and feature chips

import { useState } from 'react';
import { Link } from 'wouter';
import { Star, ChevronDown, ChevronUp, Check, X, ExternalLink, Shield, Globe } from 'lucide-react';
import type { BankAccount } from '@/lib/bankData';

interface BankCardProps {
  bank: BankAccount;
  rank?: number;
  compact?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          fill={i <= Math.round(rating) ? 'oklch(0.72 0.12 82)' : 'transparent'}
          style={{ color: 'oklch(0.72 0.12 82)' }}
        />
      ))}
      <span className="text-sm font-bold ml-1" style={{ color: 'oklch(0.18 0.02 65)' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function BankLogo({ bank }: { bank: BankAccount }) {
  const [imgError, setImgError] = useState(false);

  if (!imgError && bank.logoUrl) {
    return (
      <img
        src={bank.logoUrl}
        alt={`${bank.name} logo`}
        className="w-12 h-12 object-contain rounded-lg"
        onError={() => setImgError(true)}
      />
    );
  }

  // Fallback: coloured square with initials
  return (
    <div
      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
      style={{ backgroundColor: bank.logoColor }}
    >
      {bank.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function BankCard({ bank, rank, compact = false }: BankCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bank-card">
      {/* Colour accent bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${bank.logoColor}, oklch(0.72 0.12 82))` }} />

      {/* Main card row */}
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          {/* Rank + Logo */}
          <div className="flex items-start gap-3 flex-shrink-0">
            {rank && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1"
                style={{ background: 'oklch(0.28 0.09 155)', color: 'white' }}
              >
                {rank}
              </div>
            )}
            <BankLogo bank={bank} />
          </div>

          {/* Name + tagline + badges */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <Link
                href={`/review/${bank.slug}`}
                className="font-bold text-lg hover:underline"
                style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}
              >
                {bank.name}
              </Link>
              {bank.editorChoice && (
                <span className="badge-gold text-xs">⭐ Editor's Choice</span>
              )}
              {bank.bestFor && (
                <span className="badge-green text-xs">{bank.bestFor}</span>
              )}
            </div>
            <p className="text-sm mb-2" style={{ color: 'oklch(0.45 0.01 65)' }}>{bank.tagline}</p>
            <StarRating rating={bank.rating} />
            <p className="text-xs mt-1" style={{ color: 'oklch(0.6 0.01 65)' }}>
              Based on {bank.reviewCount.toLocaleString()} reviews
            </p>
          </div>

          {/* Key facts */}
          <div className="flex flex-row md:flex-col gap-4 md:gap-2 md:text-right flex-shrink-0">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide mb-0.5" style={{ color: 'oklch(0.55 0.01 65)' }}>
                Monthly Fee
              </div>
              <div className="font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.28 0.09 155)' }}>
                {bank.monthlyFee === 0 ? (
                  <span style={{ color: 'oklch(0.35 0.1 155)' }}>Free</span>
                ) : bank.monthlyFee === null ? (
                  'Custom'
                ) : (
                  `£${bank.monthlyFee}/mo`
                )}
              </div>
              {bank.freePeriodNote && (
                <div className="text-xs mt-0.5" style={{ color: 'oklch(0.55 0.01 65)' }}>
                  {bank.freePeriodNote}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide mb-0.5" style={{ color: 'oklch(0.55 0.01 65)' }}>
                Transactions
              </div>
              <div className="text-sm font-semibold" style={{ color: 'oklch(0.25 0.02 65)' }}>
                {bank.transactions}
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-2 flex-shrink-0 md:min-w-36">
            <a
              href={bank.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: 'oklch(0.28 0.09 155)', color: 'white' }}
            >
              Open Account
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href={`/review/${bank.slug}`}
              className="flex items-center justify-center px-4 py-2 rounded text-sm font-medium border transition-all hover:bg-gray-50"
              style={{ borderColor: 'oklch(0.28 0.09 155)', color: 'oklch(0.28 0.09 155)' }}
            >
              Read Review
            </Link>
          </div>
        </div>

        {/* Quick feature chips */}
        {!compact && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className={`badge-${bank.fscsProtected ? 'green' : 'slate'} flex items-center gap-1`}>
              <Shield className="w-3 h-3" />
              {bank.fscsProtected ? 'FSCS Protected' : 'Not FSCS Protected'}
            </span>
            {bank.internationalPayments && (
              <span className="badge-green flex items-center gap-1">
                <Globe className="w-3 h-3" />
                International Payments
              </span>
            )}
            {bank.multiCurrency && (
              <span className="badge-gold">Multi-Currency</span>
            )}
            {bank.overdraft && (
              <span className="badge-green">Overdraft Available</span>
            )}
            {bank.monthlyFee === 0 && (
              <span className="badge-green">No Monthly Fee</span>
            )}
            {bank.openingTime === 'Same day' && (
              <span className="badge-gold">Same-Day Opening</span>
            )}
          </div>
        )}

        {/* Expand toggle */}
        {!compact && (
          <button
            className="mt-3 flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: 'oklch(0.28 0.09 155)', background: 'transparent', border: 'none' }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" /> Hide details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> Show pros &amp; cons
              </>
            )}
          </button>
        )}
      </div>

      {/* Expanded: pros & cons */}
      {expanded && !compact && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5" style={{ color: 'oklch(0.28 0.09 155)' }}>
                <Check className="w-4 h-4" /> Pros
              </h4>
              <ul className="space-y-1.5">
                {bank.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm" style={{ color: 'oklch(0.3 0.02 65)' }}>
                    <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.45 0.12 155)' }} />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5" style={{ color: 'oklch(0.55 0.2 27)' }}>
                <X className="w-4 h-4" /> Cons
              </h4>
              <ul className="space-y-1.5">
                {bank.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm" style={{ color: 'oklch(0.3 0.02 65)' }}>
                    <X className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.55 0.2 27)' }} />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {bank.plans && bank.plans.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'oklch(0.18 0.02 65)' }}>Available Plans</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {bank.plans.map((plan) => (
                  <div key={plan.name} className="rounded-lg p-3 border border-gray-100 bg-gray-50">
                    <div className="font-semibold text-sm mb-1" style={{ color: 'oklch(0.28 0.09 155)' }}>{plan.name}</div>
                    <div className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {plan.monthlyFee === 0 ? 'Free' : plan.monthlyFee === null ? 'Custom' : `£${plan.monthlyFee}/mo`}
                    </div>
                    <div className="text-xs mt-1 text-gray-500">{plan.bestFor}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
