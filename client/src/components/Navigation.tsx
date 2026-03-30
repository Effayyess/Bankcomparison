// Navigation — clean 4-section IA
// 1. Compare Accounts  2. Best Accounts For...  3. Bank Reviews  4. Guides & Tools
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavChild {
  label: string;
  href: string;
  disabled?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    label: 'Compare Accounts',
    href: '/compare',
    children: [
      { label: 'All Business Accounts', href: '/compare' },
      { label: 'Find My Account (Quiz)', href: '/find-my-account' },
      { label: '— By Feature —', href: '#', disabled: true },
      { label: 'Free Business Accounts', href: '/free-business-bank-accounts' },
      { label: 'Digital-Only Accounts', href: '/best-digital-business-bank-accounts' },
      { label: 'No Credit Check Accounts', href: '/business-bank-accounts-no-credit-check' },
      { label: '— Savings —', href: '#', disabled: true },
      { label: 'Business Savings Accounts', href: '/business-savings' },
    ],
  },
  {
    label: 'Best Accounts For...',
    href: '#',
    children: [
      { label: 'Startups', href: '/best-business-bank-accounts-for-startups' },
      { label: 'Sole Traders', href: '/best-sole-trader-bank-accounts' },
      { label: 'Limited Companies', href: '/best-business-bank-accounts-for-limited-companies' },
      { label: 'Freelancers & Contractors', href: '/best-business-bank-accounts-for-startups' },
      { label: 'Ecommerce Businesses', href: '/guides/hub/business-banking-by-sector' },
      { label: 'Charities & Non-Profits', href: '/guides/hub/business-banking-by-sector' },
      { label: 'Partnerships', href: '/guides/hub/business-banking-by-sector' },
      { label: 'International Businesses', href: '/guides/hub/business-banking-by-sector' },
    ],
  },
  {
    label: 'Bank Reviews',
    href: '#',
    children: [
      { label: '— Digital Banks —', href: '#', disabled: true },
      { label: 'Starling Bank', href: '/starling-bank' },
      { label: 'Monzo Business', href: '/monzo-business' },
      { label: 'Tide Business', href: '/tide-business' },
      { label: 'Revolut Business', href: '/revolut-business' },
      { label: 'Wise Business', href: '/wise-business' },
      { label: 'ANNA Money', href: '/anna-money' },
      { label: 'Mettle', href: '/mettle' },
      { label: 'Zempler Bank', href: '/zempler-bank' },
      { label: 'Airwallex', href: '/airwallex-business' },
      { label: 'WorldFirst', href: '/worldfirst-business' },
      { label: 'CountingUp', href: '/countingup' },
      { label: '— Savings Banks —', href: '#', disabled: true },
      { label: 'Aldermore Business Savings', href: '/aldermore-business' },
      { label: 'Shawbrook Business Savings', href: '/shawbrook-business' },
      { label: '— High Street Banks —', href: '#', disabled: true },
      { label: 'HSBC Business', href: '/hsbc-business' },
      { label: 'Lloyds Business', href: '/lloyds-business' },
      { label: 'Barclays Business', href: '/barclays-business' },
      { label: 'NatWest Business', href: '/natwest-business' },
      { label: 'Virgin Money Business', href: '/virgin-money-business' },
      { label: 'RBS Business', href: '/rbs-business' },
      { label: 'Co-operative Bank', href: '/cooperative-bank' },
      { label: 'Cynergy Bank', href: '/cynergy-bank' },
    ],
  },
  {
    label: 'Guides & Tools',
    href: '/guides',
    children: [
      { label: '— Hub Guides —', href: '#', disabled: true },
      { label: 'How to Start a Business in the UK', href: '/guides/hub/starting-a-business-uk' },
      { label: 'Business Banking Fees Explained', href: '/guides/hub/business-banking-fees-explained' },
      { label: 'How to Switch Your Account', href: '/guides/hub/switching-business-bank-account' },
      { label: 'Banking by Business Sector', href: '/guides/hub/business-banking-by-sector' },
      { label: '— Calculators —', href: '#', disabled: true },
      { label: 'Business Cost Calculator', href: '/calculators/business-cost' },
      { label: 'Fee Comparison Calculator', href: '/calculators/fee-comparison' },
      { label: 'Savings Interest Calculator', href: '/calculators/savings-interest' },
      { label: '— All Guides —', href: '#', disabled: true },
      { label: 'Browse All 135+ Guides', href: '/guides' },
      { label: 'How We Review Accounts', href: '/how-we-review' },
    ],
  },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const currentMonth = new Date().toLocaleString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}
    >
      {/* Top announcement bar — dark navy */}
      <div style={{ background: 'oklch(26% .07 240)' }} className="py-1.5">
        <div className="container flex items-center justify-between">
          <p className="text-xs text-white/80 font-medium" style={{ fontFamily: 'Sora, sans-serif' }}>
            Independent UK business bank account comparisons — updated {currentMonth}
          </p>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-xs text-white/70">⭐ Trusted by 50,000+ UK businesses</span>
          </div>
        </div>
      </div>

      {/* Main nav — white */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
              <img src="/logo-square.png" alt="Business Bank Compare" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-bold text-base leading-tight" style={{ fontFamily: 'Sora, sans-serif', color: 'oklch(0.26 0.07 240)' }}>
                Business Bank Compare
              </div>
            </div>
          </Link>

          {/* Desktop nav items */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children ? handleMouseEnter(item.label) : undefined}
                onMouseLeave={item.children ? handleMouseLeave : undefined}
              >
                {item.children ? (
                  <button
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
                    style={{ color: 'oklch(26% .07 240)', fontFamily: 'Sora, sans-serif', background: 'transparent', border: 'none' }}
                  >
                    {item.label}
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform"
                      style={{
                        transform: activeDropdown === item.label ? 'rotate(180deg)' : 'none',
                        color: '#60a5fa',
                      }}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 no-underline"
                    style={{ color: 'oklch(26% .07 240)', fontFamily: 'Sora, sans-serif' }}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown panel */}
                {item.children && activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                    style={{ minWidth: '240px', maxHeight: '80vh', overflowY: 'auto' }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.children.map((child) =>
                      child.disabled ? (
                        <div
                          key={child.label}
                          className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
                          style={{ color: '#60a5fa', fontFamily: 'Sora, sans-serif' }}
                        >
                          {child.label}
                        </div>
                      ) : (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm transition-colors no-underline hover:bg-gray-50"
                          style={{ color: 'oklch(26% .07 240)', fontFamily: 'Sora, sans-serif' }}
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/compare"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 no-underline"
              style={{ background: '#2563eb', fontFamily: 'Sora, sans-serif' }}
            >
              Compare Now
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" style={{ color: 'oklch(26% .07 240)' }} /> : <Menu className="w-5 h-5" style={{ color: 'oklch(26% .07 240)' }} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-gray-50 border-none bg-transparent"
                      style={{ color: 'oklch(26% .07 240)', fontFamily: 'Sora, sans-serif' }}
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        className="w-4 h-4 transition-transform"
                        style={{
                          transform: activeDropdown === item.label ? 'rotate(180deg)' : 'none',
                          color: '#60a5fa',
                        }}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="bg-gray-50 border-t border-gray-100">
                        {item.children.map((child) =>
                          child.disabled ? (
                            <div
                              key={child.label}
                              className="px-6 py-1.5 text-xs font-semibold uppercase tracking-wider"
                              style={{ color: '#60a5fa', fontFamily: 'Sora, sans-serif' }}
                            >
                              {child.label}
                            </div>
                          ) : (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-6 py-2.5 text-sm hover:bg-gray-100 transition-colors no-underline"
                              style={{ color: 'oklch(26% .07 240)', fontFamily: 'Sora, sans-serif' }}
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors no-underline border-t border-gray-100"
                    style={{ color: 'oklch(26% .07 240)', fontFamily: 'Sora, sans-serif' }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="p-4 border-t border-gray-100">
              <Link
                href="/compare"
                className="block w-full text-center px-4 py-3 rounded-xl font-semibold text-sm text-white no-underline"
                style={{ background: '#2563eb', fontFamily: 'Sora, sans-serif' }}
              >
                Compare All Accounts
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
