import { useState } from 'react';
import { X, Zap, Gift } from 'lucide-react';

const CDN = 'https://cdn.comparebusinessaccount.co.uk/logos';

export default function StickyPromoBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'oklch(0.18 0.05 240)',
        borderTop: '1px solid oklch(0.30 0.06 240)',
        fontFamily: 'Sora, sans-serif',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.35)',
      }}
    >
      <div className="container py-3 md:py-3.5">
        <div className="flex items-center justify-between gap-3">

          {/* Left: badge + offer text */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Tide logo */}
            <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-white">
              <img
                src={`${CDN}/tide_d5081234.png`}
                alt="Tide"
                className="w-full h-full object-contain p-0.5"
              />
            </div>

            {/* Special offer badge */}
            <div
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0"
              style={{ background: '#2563eb', color: '#fff' }}
            >
              <Zap className="w-3 h-3" />
              Special Offer
            </div>

            {/* Offer copy */}
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm leading-tight truncate">
                <span className="text-blue-400 font-bold">£250 cashback</span>
                {' '}— Open a Tide Business Account &amp; spend £500 within 30 days
              </p>
              <p className="text-white/50 text-xs mt-0.5 hidden sm:block">
                T&amp;Cs apply. New customers only. Offer subject to change.
              </p>
            </div>
          </div>

          {/* Right: CTA + dismiss */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://www.tide.co/business-current-account/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 no-underline flex-shrink-0"
              style={{ background: '#2563eb' }}
            >
              <Gift className="w-4 h-4" />
              <span className="hidden xs:inline">Open Account</span>
              <span className="xs:hidden">Claim £250</span>
            </a>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss offer"
              className="p-1.5 rounded-lg transition-colors hover:bg-white/10 flex-shrink-0"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
