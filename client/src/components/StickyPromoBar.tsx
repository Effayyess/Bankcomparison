import { useState } from 'react';
import { X, Gift, Tag } from 'lucide-react';

const TIDE_LOGO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663463044688/ARsFo8cnc8CpnHoXXZH5qW/tide_d5081234.png';

export default function StickyPromoBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: '#fbbf24',          // amber-400 — warm yellow
        borderTop: '2px solid #f59e0b', // amber-500 border
        fontFamily: 'Sora, sans-serif',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.25)',
      }}
    >
      <div className="container py-2.5 md:py-3">
        <div className="flex items-center justify-between gap-3">

          {/* Left: logo + badge + copy */}
          <div className="flex items-center gap-3 min-w-0">

            {/* Tide logo — white pill background so it shows on yellow */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center overflow-hidden p-1">
              <img
                src={TIDE_LOGO}
                alt="Tide"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            {/* Special offer badge */}
            <div
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0"
              style={{ background: '#1d4ed8', color: '#fff' }}
            >
              <Tag className="w-3 h-3" />
              Special Offer
            </div>

            {/* Offer copy */}
            <div className="min-w-0">
              <p className="text-gray-900 font-bold text-sm leading-tight">
                <span
                  className="inline-block px-1.5 py-0.5 rounded text-white text-sm font-extrabold mr-1"
                  style={{ background: '#1d4ed8' }}
                >
                  £250 cashback
                </span>
                Open a Tide Business Account &amp; spend £500 in 30 days
              </p>
              <p className="text-gray-700 text-xs mt-0.5 hidden sm:block">
                New customers only. T&amp;Cs apply. Offer subject to change.
              </p>
            </div>
          </div>

          {/* Right: CTA + dismiss */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://www.tide.co/business-current-account/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 no-underline flex-shrink-0 shadow-sm"
              style={{ background: '#1d4ed8' }}
            >
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">Open Account</span>
              <span className="sm:hidden">Claim £250</span>
            </a>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss offer"
              className="p-1.5 rounded-lg transition-colors hover:bg-black/10 flex-shrink-0"
              style={{ color: 'rgba(0,0,0,0.45)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
