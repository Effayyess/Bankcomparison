import { useState } from 'react';
import { X, Gift } from 'lucide-react';

const TIDE_LOGO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663463044688/ARsFo8cnc8CpnHoXXZH5qW/tide_d5081234.png';

export default function StickyPromoBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: '#fbbf24',
        borderTop: '2px solid #f59e0b',
        fontFamily: 'Sora, sans-serif',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.25)',
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2">

          {/* Left: logo + copy */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">

            {/* Tide logo */}
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center overflow-hidden">
              <img
                src={TIDE_LOGO}
                alt="Tide"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            {/* Offer copy */}
            <div className="min-w-0">
              <p className="text-gray-900 font-bold text-xs sm:text-sm leading-tight">
                <span className="font-extrabold">£200 cashback</span>
                {' '}— Open a Tide Business Account using code{' '}
                <span className="font-mono font-bold tracking-wider">REFER200</span>
              </p>
              <p className="text-gray-700 text-xs mt-0.5 hidden sm:block">
                New customers only. T&amp;Cs apply.
              </p>
            </div>
          </div>

          {/* Right: CTA + dismiss */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <a
              href="https://www.tide.co/partners/refer-save-refer200/bca/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold text-white transition-all hover:opacity-90 no-underline flex-shrink-0 shadow-sm whitespace-nowrap"
              style={{ background: '#1d4ed8' }}
            >
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Open Account</span>
            </a>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss offer"
              className="p-1 sm:p-1.5 rounded-lg transition-colors hover:bg-black/10 flex-shrink-0"
              style={{ color: 'rgba(0,0,0,0.45)' }}
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
