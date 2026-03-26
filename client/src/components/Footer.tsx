// Footer — matches original buscompare-7vygqn9p.manus.space exactly
// Design: dark navy oklch(0.18 0.05 240), trust bar, 5-col grid, Sora font

import { Link } from 'wouter';
import { Shield, Award, Users, Building2 } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'oklch(0.18 0.05 240)', fontFamily: 'Sora, sans-serif' }} className="text-white">
      {/* Trust bar */}
      <div style={{ background: 'oklch(0.22 0.06 240)', borderBottom: '1px solid oklch(0.30 0.06 240)' }}>
        <div className="container py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 flex-shrink-0" style={{ color: 'oklch(0.72 0.12 210)' }} />
              <div>
                <p className="font-semibold text-sm">Independent &amp; Unbiased</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Our reviews are editorially independent</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 flex-shrink-0" style={{ color: 'oklch(0.72 0.12 210)' }} />
              <div>
                <p className="font-semibold text-sm">Expert Reviewed</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Reviewed by qualified financial experts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 flex-shrink-0" style={{ color: 'oklch(0.72 0.12 210)' }} />
              <div>
                <p className="font-semibold text-sm">Trusted by 50,000+</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>UK business owners use our comparisons</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand col (spans 2) */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 no-underline">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                style={{ background: 'oklch(0.26 0.07 240)' }}
              >
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight text-white">Compare Business</p>
                <p className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.5)' }}>Account</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-4 max-w-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              The UK's leading independent comparison site for business bank accounts. We compare all 22 major providers so you don't have to.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              comparebusinessaccount.co.uk is an independent comparison website and is not regulated or authorised by the Financial Conduct Authority (FCA). We do not provide financial advice, and the information on this website is for informational purposes only.
            </p>
          </div>

          {/* Compare Accounts */}
          <div>
            <h3 className="font-bold text-sm mb-4" style={{ color: 'oklch(0.72 0.12 210)' }}>
              Compare Accounts
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'All Business Accounts', href: '/compare' },
                { label: 'Free Business Accounts', href: '/best-free-business-bank-account' },
                { label: 'Digital Banks', href: '/compare' },
                { label: 'High Street Banks', href: '/compare' },
                { label: 'Guides & Resources', href: '/guides' },
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors no-underline" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* By Business Type */}
          <div>
            <h3 className="font-bold text-sm mb-4" style={{ color: 'oklch(0.72 0.12 210)' }}>
              By Business Type
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Sole Trader', href: '/best-business-bank-account-sole-trader' },
                { label: 'Limited Company', href: '/best-business-bank-account-limited-company' },
                { label: 'Contractor', href: '/best-business-bank-account-contractor' },
                { label: 'Freelancer', href: '/best-business-bank-account-freelancer' },
                { label: 'Startup', href: '/best-business-bank-account-startup' },
                { label: 'Small Business', href: '/best-business-bank-account-small-business' },
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors no-underline" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bank Reviews + Guides */}
          <div>
            <h3 className="font-bold text-sm mb-4" style={{ color: 'oklch(0.72 0.12 210)' }}>
              Bank Reviews
            </h3>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: 'Starling Bank', href: '/starling-bank' },
                { label: 'Monzo Business', href: '/monzo-business' },
                { label: 'Tide Business', href: '/tide-business' },
                { label: 'Revolut Business', href: '/revolut-business' },
                { label: 'Wise Business', href: '/wise-business' },
                { label: 'Barclays Business', href: '/barclays-business' },
                { label: 'HSBC Business', href: '/hsbc-business' },
                { label: 'NatWest Business', href: '/natwest-business' },
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors no-underline" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-sm mb-4" style={{ color: 'oklch(0.72 0.12 210)' }}>
              Guides
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'How to Open a Business Account', href: '/guides/how-to-open-a-business-bank-account' },
                { label: 'Business Account vs Personal', href: '/guides/business-vs-personal-account' },
                { label: 'FSCS Protection Explained', href: '/guides/fscs-protection-explained' },
                { label: 'How to Switch Business Account', href: '/guides/how-to-switch-business-bank-account' },
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors no-underline" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: 'oklch(0.14 0.04 240)', borderTop: '1px solid oklch(0.25 0.06 240)' }}>
        <div className="container py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              © {year} CompareBusinessAccount.co.uk — All rights reserved
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Cookie Policy', href: '/cookies' },
                { label: 'Terms of Use', href: '/terms' },
                { label: 'Editorial Policy', href: '/editorial-policy' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <Link key={link.label} href={link.href} className="text-xs hover:text-white/70 transition-colors no-underline" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
