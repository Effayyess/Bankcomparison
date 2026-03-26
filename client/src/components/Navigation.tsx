// Design: Authoritative Broadsheet | Navigation
// Racing green masthead with gold accent links and dropdown menus
// Dropdown hover bug fixed: using onMouseEnter/onMouseLeave on the wrapper div

import { useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, Building2 } from 'lucide-react';

interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: NavDropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Compare Accounts',
    href: '/compare',
    dropdown: [
      { label: 'All Business Accounts', href: '/compare', description: 'Compare all 22 UK business bank accounts' },
      { label: 'Free Business Accounts', href: '/category/free-business-accounts', description: 'No monthly fee options' },
      { label: 'App-Only Banks', href: '/category/app-only-banks', description: 'Digital-first business banking' },
      { label: 'High Street Banks', href: '/category/high-street-banks', description: 'Traditional branch banking' },
    ],
  },
  {
    label: 'By Business Type',
    dropdown: [
      { label: 'Sole Trader', href: '/category/sole-trader', description: 'Best accounts for sole traders' },
      { label: 'Limited Company', href: '/category/limited-company', description: 'Accounts for Ltd companies' },
      { label: 'Contractor', href: '/category/contractor', description: 'Contractor-friendly banking' },
      { label: 'Startup', href: '/category/startup', description: 'New business bank accounts' },
      { label: 'Freelancer', href: '/category/freelancer', description: 'Self-employed banking' },
      { label: 'International', href: '/category/international', description: 'Multi-currency accounts' },
    ],
  },
  {
    label: 'Reviews',
    dropdown: [
      { label: 'Starling Bank Review', href: '/review/starling-bank' },
      { label: 'Monzo Business Review', href: '/review/monzo-business' },
      { label: 'Tide Review', href: '/review/tide' },
      { label: 'Revolut Business Review', href: '/review/revolut-business' },
      { label: 'Barclays Business Review', href: '/review/barclays-business' },
      { label: 'HSBC Business Review', href: '/review/hsbc-business' },
      { label: 'View All Reviews', href: '/compare' },
    ],
  },
  {
    label: 'Guides',
    dropdown: [
      { label: 'How to Open a Business Account', href: '/guides/how-to-open-a-business-bank-account' },
      { label: 'Best Free Business Accounts', href: '/guides/best-free-business-bank-accounts' },
      { label: 'Sole Trader Banking Guide', href: '/guides/sole-trader-business-bank-account' },
      { label: 'Limited Company Banking', href: '/guides/limited-company-business-bank-account' },
      { label: 'Switching Business Banks', href: '/guides/switching-business-bank-account' },
      { label: 'Business Account Fees Explained', href: '/guides/business-bank-account-fees' },
    ],
  },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 shadow-md" style={{ background: 'oklch(0.28 0.09 155)' }}>
      {/* Top bar */}
      <div className="border-b" style={{ borderColor: 'oklch(0.35 0.07 155)' }}>
        <div className="container flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ background: 'oklch(0.72 0.12 82)' }}
            >
              <Building2 className="w-4.5 h-4.5" style={{ color: 'oklch(0.15 0.04 155)' }} />
            </div>
            <div>
              <span className="font-bold text-base leading-none" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.98 0.01 85)' }}>
                CompareBusiness
              </span>
              <span className="text-xs block leading-none mt-0.5" style={{ color: 'oklch(0.72 0.12 82)', fontFamily: 'DM Sans, sans-serif' }}>
                Account
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href && !item.dropdown ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors duration-150"
                    style={{
                      color: location === item.href ? 'oklch(0.72 0.12 82)' : 'oklch(0.9 0.02 85)',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors duration-150"
                    style={{
                      color: activeDropdown === item.label ? 'oklch(0.72 0.12 82)' : 'oklch(0.9 0.02 85)',
                      fontFamily: 'DM Sans, sans-serif',
                      background: 'transparent',
                      border: 'none',
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform duration-150"
                      style={{ transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                )}

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-56 z-50"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-800 block">{sub.label}</span>
                        {sub.description && (
                          <span className="text-xs text-gray-500 mt-0.5 block">{sub.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/compare"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded text-sm font-semibold transition-all duration-150 hover:opacity-90"
              style={{
                background: 'oklch(0.72 0.12 82)',
                color: 'oklch(0.15 0.04 155)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Compare Now
            </Link>
            <button
              className="lg:hidden p-2 rounded"
              style={{ color: 'oklch(0.9 0.02 85)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.href && !item.dropdown ? (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2">
                      {item.label}
                    </div>
                    {item.dropdown?.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-5 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/compare"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded text-sm font-semibold"
                style={{ background: 'oklch(0.28 0.09 155)', color: 'white' }}
              >
                Compare All Accounts
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
