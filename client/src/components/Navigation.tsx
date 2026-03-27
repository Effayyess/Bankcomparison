// Navigation — matches original buscompare design exactly
// Dark navy top bar + white nav with teal accents + dropdown menus
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, Building2 } from 'lucide-react';

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
    label: 'Compare Bank Accounts',
    href: '/compare',
    children: [
      { label: 'All Business Accounts', href: '/compare' },
      { label: 'Free Business Accounts', href: '/category/free-business-accounts' },
      { label: 'Fast Opening Accounts', href: '/category/fast-opening' },
      { label: 'Accounts with Overdraft', href: '/category/overdraft' },
      { label: 'Multi-Currency Accounts', href: '/category/multi-currency' },
      { label: 'Accounts with Branch Access', href: '/category/high-street' },
      { label: 'Accounts with Accounting', href: '/category/accounting' },
      { label: 'Cash Deposit Accounts', href: '/category/cash-deposit' },
    ],
  },
  {
    label: 'By Business Type',
    href: '#',
    children: [
      { label: 'Sole Trader', href: '/category/sole-trader' },
      { label: 'Limited Company', href: '/category/limited-company' },
      { label: 'Contractor', href: '/category/contractor' },
      { label: 'Freelancer', href: '/category/freelancer' },
      { label: 'Startup', href: '/category/startup' },
      { label: 'Small Business', href: '/category/small-business' },
      { label: 'Partnership', href: '/category/partnership' },
      { label: 'Charity / Non-Profit', href: '/category/charity' },
      { label: 'E-commerce Business', href: '/category/ecommerce' },
    ],
  },
  {
    label: 'Bank Reviews',
    href: '#',
    children: [
      { label: '— Digital Banks —', href: '#', disabled: true },
      { label: 'Tide Business Bank Review', href: '/tide-business' },
      { label: 'Revolut Business Bank Review', href: '/revolut-business' },
      { label: 'Monzo Business Bank Review', href: '/monzo-business' },
      { label: 'Starling Business Bank Review', href: '/starling-bank' },
      { label: 'Wise Business Bank Review', href: '/wise-business' },
      { label: 'ANNA Money Bank Review', href: '/anna-money' },
      { label: 'Mettle Business Bank Review', href: '/mettle' },
      { label: 'Zempler Business Bank Review', href: '/zempler-bank' },
      { label: 'Airwallex Business Bank Review', href: '/airwallex-business' },
      { label: 'WorldFirst Business Bank Review', href: '/worldfirst-business' },
      { label: 'CountingUp Business Bank Review', href: '/countingup' },
      { label: '— High Street Banks —', href: '#', disabled: true },
      { label: 'HSBC Business Bank Review', href: '/hsbc-business' },
      { label: 'Lloyds Business Bank Review', href: '/lloyds-business' },
      { label: 'Barclays Business Bank Review', href: '/barclays-business' },
      { label: 'NatWest Business Bank Review', href: '/natwest-business' },
      { label: 'Virgin Money Business Bank Review', href: '/virgin-money-business' },
      { label: 'RBS Business Bank Review', href: '/rbs-business' },
      { label: 'Co-operative Business Bank Review', href: '/cooperative-bank' },
      { label: 'Cynergy Business Bank Review', href: '/cynergy-bank' },
    ],
  },
  {
    label: 'Guides',
    href: '/guides',
    children: [
      { label: 'Getting Started', href: '/guides#getting-started' },
      { label: 'By Business Type', href: '/guides#business-types' },
      { label: 'Account Management', href: '/guides#account-management' },
      { label: 'Fees & Security', href: '/guides#fees-and-security' },
      { label: 'Tools & Software', href: '/guides#tools-and-software' },
      { label: 'View All Guides', href: '/guides' },
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
              <img src="/logo-square.png" alt="Compare Business Account" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-bold text-base leading-tight" style={{ fontFamily: 'Sora, sans-serif', color: 'oklch(0.26 0.07 240)' }}>
                Compare Business Account
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
                    style={{ minWidth: '220px', maxHeight: '80vh', overflowY: 'auto' }}
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
                          className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors no-underline"
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
                        style={{ transform: activeDropdown === item.label ? 'rotate(180deg)' : 'none' }}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="bg-gray-50 border-t border-gray-100">
                        {item.children.map((child) =>
                          child.disabled ? (
                            <div
                              key={child.label}
                              className="px-6 py-1.5 text-xs font-semibold uppercase tracking-wider"
                              style={{ color: '#60a5fa' }}
                            >
                              {child.label}
                            </div>
                          ) : (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-6 py-2.5 text-sm hover:bg-gray-100 no-underline"
                              style={{ color: 'oklch(26% .07 240)' }}
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
                    className="block px-4 py-3 text-sm font-semibold hover:bg-gray-50 no-underline border-t border-gray-50"
                    style={{ color: 'oklch(26% .07 240)' }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="px-4 py-3 border-t border-gray-100">
              <Link
                href="/compare"
                className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white no-underline"
                style={{ background: '#2563eb' }}
                >
                Compare Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
