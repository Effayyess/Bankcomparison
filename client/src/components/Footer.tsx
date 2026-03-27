// Footer — matches original buscompare-7vygqn9p.manus.space exactly
// Design: dark navy, trust bar (3 items), 4-col grid (brand + 3 link cols), no separate Guides column
// Guides & Resources is a link inside Compare Accounts column

import { Link } from 'wouter';
import { Shield, Award, Users } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'oklch(0.18 0.05 240)', fontFamily: 'Sora, sans-serif' }} className="text-white">

      {/* Trust bar — 3 items */}
      <div style={{ background: 'oklch(0.22 0.06 240)', borderBottom: '1px solid oklch(0.30 0.06 240)' }}>
        <div className="container py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 flex-shrink-0" style={{ color: '#60a5fa' }} />
              <div>
                <p className="font-semibold text-sm">Independent &amp; Unbiased</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Our reviews are editorially independent</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 flex-shrink-0" style={{ color: '#60a5fa' }} />
              <div>
                <p className="font-semibold text-sm">Expert Reviewed</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Reviewed by qualified financial experts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 flex-shrink-0" style={{ color: '#60a5fa' }} />
              <div>
                <p className="font-semibold text-sm">Trusted by 50,000+</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>UK business owners use our comparisons</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main columns — 4 cols: brand (wider) + Compare Accounts + By Business Type + Bank Reviews */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 no-underline">
              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                <img src="/logo-square.png" alt="Business Bank Compare" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight text-white">Business Bank Compare</p>
                <p className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.5)' }}>businessbankcompare.co.uk</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Independent UK business bank account comparisons and expert reviews. We help UK businesses find the right banking solution for their needs.
            </p>
            <div
              className="rounded-lg p-3 text-xs leading-relaxed"
              style={{ background: 'oklch(0.22 0.06 240)', color: 'rgba(255,255,255,0.5)' }}
            >
              <span className="font-semibold text-white">Advertising Disclosure:</span> We may receive compensation when you click on links to products. This does not affect our editorial independence or the integrity of our reviews.
            </div>
          </div>

          {/* Compare Accounts */}
          <div>
            <h3 className="font-bold text-sm mb-4" style={{ color: '#60a5fa' }}>
              Compare Accounts
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'All Business Accounts', href: '/compare' },
                { label: 'Free Business Accounts', href: '/category/free-business-accounts' },
                { label: 'Digital Banks', href: '/category/app-only-banks' },
                { label: 'High Street Banks', href: '/category/high-street-banks' },
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
            <h3 className="font-bold text-sm mb-4" style={{ color: '#60a5fa' }}>
              By Business Type
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Sole Trader', href: '/category/sole-trader' },
                { label: 'Limited Company', href: '/category/limited-company' },
                { label: 'Contractor', href: '/category/contractor' },
                { label: 'Freelancer', href: '/category/freelancer' },
                { label: 'Startup', href: '/category/startup' },
                { label: 'Small Business', href: '/category/small-business' },
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors no-underline" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bank Reviews */}
          <div>
            <h3 className="font-bold text-sm mb-4" style={{ color: '#60a5fa' }}>
              Bank Reviews
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Starling Bank', href: '/starling-bank' },
                { label: 'Monzo Business', href: '/monzo-business' },
                { label: 'Tide Business', href: '/tide-business' },
                { label: 'Revolut Business', href: '/revolut-business' },
                { label: 'Wise Business', href: '/wise-business' },
                { label: 'Barclays Business', href: '/barclays-business' },
                { label: 'HSBC Kinetic', href: '/hsbc-business' },
                { label: 'NatWest Business', href: '/natwest-business' },
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

      {/* Bottom bar — important info + FSCS + copyright + legal links */}
      <div style={{ background: 'oklch(0.14 0.04 240)', borderTop: '1px solid oklch(0.25 0.06 240)' }}>
        <div className="container py-6">
          <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>Important Information:</span> businessbankcompare.co.uk is an independent comparison website and is not regulated or authorised by the Financial Conduct Authority (FCA). We do not provide financial advice, and the information on this website is for informational purposes only. Always read the full terms and conditions before opening any financial product. Business bank account features and fees are subject to change — please verify current details directly with the provider.
          </p>
          <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            FSCS protection covers eligible deposits up to £120,000 per person per authorised institution. Not all providers listed are FSCS protected — please check individual provider details. Think carefully before taking on any financial product.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              © {year} Business Bank Compare. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Cookie Policy', href: '/cookie-policy' },
                { label: 'Terms of Use', href: '/terms-of-use' },
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
