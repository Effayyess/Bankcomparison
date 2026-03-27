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
      {/* Mobile layout — single compact row */}
      <div className="flex sm:hidden items-center justify-between gap-2 px-3 py-1.5">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <img
            src={TIDE_LOGO}
            alt="Tide"
            className="w-6 h-6 object-contain flex-shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <p className="text-gray-900 font-bold text-xs leading-tight truncate">
            Get up to <strong>£200 cashback</strong> — code <span className="font-mono font-bold">REFER200</span>
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <a
            href="https://www.tide.co/partners/refer-save-refer200/bca/"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-white no-underline whitespace-nowrap"
            style={{ background: '#1d4ed8' }}
          >
            <Gift className="w-3 h-3" />
            Open
          </a>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss offer"
            className="p-1 rounded-lg hover:bg-black/10 flex-shrink-0"
            style={{ color: 'rgba(0,0,0,0.45)' }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Desktop layout — fuller details */}
      <div className="hidden sm:block max-w-7xl mx-auto px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img
              src={TIDE_LOGO}
              alt="Tide"
              className="w-10 h-10 object-contain flex-shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="min-w-0">
              <p className="text-gray-900 font-bold text-sm leading-tight">
                Get up to <strong>£200 cashback</strong> when you open a Tide Business Account — use code{' '}
                <span className="font-mono font-bold tracking-wider">REFER200</span>
              </p>
              <p className="text-gray-700 text-xs mt-0.5">
                £75 cashback when you spend £100 in 30 days. Plus £125 when you deposit £5,000 into Tide Instant Saver within 7 days. New customers only. T&amp;Cs apply.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://www.tide.co/partners/refer-save-refer200/bca/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 no-underline flex-shrink-0 shadow-sm whitespace-nowrap"
              style={{ background: '#1d4ed8' }}
            >
              <Gift className="w-4 h-4" />
              Open Account
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
