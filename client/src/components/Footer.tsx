// Design: Authoritative Broadsheet | Footer
// Racing green background, editorial layout with legal links

import { Link } from 'wouter';
import { Building2, Shield, FileText } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'oklch(0.18 0.06 155)', color: 'oklch(0.85 0.02 85)' }}>
      {/* Main footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 no-underline">
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
                <span className="text-xs block leading-none mt-0.5" style={{ color: 'oklch(0.72 0.12 82)' }}>
                  Account
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'oklch(0.7 0.02 85)' }}>
              Independent comparison of UK business bank accounts. We help business owners find the right banking for their needs.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'oklch(0.6 0.02 85)' }}>
              <Shield className="w-3.5 h-3.5" />
              <span>Independent &amp; Unbiased</span>
            </div>
          </div>

          {/* Compare */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'oklch(0.72 0.12 82)', fontFamily: 'DM Sans, sans-serif' }}>
              Compare
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'All Business Accounts', href: '/compare' },
                { label: 'Free Business Accounts', href: '/category/free-business-accounts' },
                { label: 'App-Only Banks', href: '/category/app-only-banks' },
                { label: 'High Street Banks', href: '/category/high-street-banks' },
                { label: 'Sole Trader Accounts', href: '/category/sole-trader' },
                { label: 'Limited Company Accounts', href: '/category/limited-company' },
                { label: 'Startup Accounts', href: '/category/startup' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors" style={{ color: 'oklch(0.7 0.02 85)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reviews */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'oklch(0.72 0.12 82)', fontFamily: 'DM Sans, sans-serif' }}>
              Bank Reviews
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Starling Bank Review', href: '/review/starling-bank' },
                { label: 'Monzo Business Review', href: '/review/monzo-business' },
                { label: 'Tide Review', href: '/review/tide' },
                { label: 'Revolut Business Review', href: '/review/revolut-business' },
                { label: 'Barclays Business Review', href: '/review/barclays-business' },
                { label: 'HSBC Business Review', href: '/review/hsbc-business' },
                { label: 'NatWest Business Review', href: '/review/natwest-business' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors" style={{ color: 'oklch(0.7 0.02 85)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'oklch(0.72 0.12 82)', fontFamily: 'DM Sans, sans-serif' }}>
              Guides
            </h4>
            <ul className="space-y-2 mb-6">
              {[
                { label: 'How to Open a Business Account', href: '/guides/how-to-open-a-business-bank-account' },
                { label: 'Best Free Business Accounts', href: '/guides/best-free-business-bank-accounts' },
                { label: 'Sole Trader Banking Guide', href: '/guides/sole-trader-business-bank-account' },
                { label: 'Switching Business Banks', href: '/guides/switching-business-bank-account' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors" style={{ color: 'oklch(0.7 0.02 85)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'oklch(0.72 0.12 82)', fontFamily: 'DM Sans, sans-serif' }}>
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Cookie Policy', href: '/cookie-policy' },
                { label: 'Terms of Use', href: '/terms-of-use' },
                { label: 'Editorial Policy', href: '/editorial-policy' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors" style={{ color: 'oklch(0.7 0.02 85)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer bar */}
      <div className="border-t" style={{ borderColor: 'oklch(0.28 0.06 155)' }}>
        <div className="container py-6">
          <div className="flex items-start gap-3 mb-4">
            <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.72 0.12 82)' }} />
            <p className="text-xs leading-relaxed" style={{ color: 'oklch(0.55 0.02 85)' }}>
              <strong style={{ color: 'oklch(0.65 0.02 85)' }}>Advertising Disclosure:</strong> CompareBusiness Account is an independent comparison website. We may receive compensation when you click on links to products from our partners, which may influence which products we feature. This does not affect our editorial independence or the accuracy of our reviews. We always aim to provide fair, accurate and up-to-date information.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.72 0.12 82)' }} />
            <p className="text-xs leading-relaxed" style={{ color: 'oklch(0.55 0.02 85)' }}>
              <strong style={{ color: 'oklch(0.65 0.02 85)' }}>Not Financial Advice:</strong> The information on this website is for informational purposes only and does not constitute financial advice. Always check the latest terms and conditions directly with the bank before applying. FSCS protection applies to eligible deposits up to £85,000 per person per institution.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'oklch(0.25 0.06 155)', background: 'oklch(0.15 0.05 155)' }}>
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: 'oklch(0.5 0.02 85)' }}>
            © {currentYear} CompareBusiness Account. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: 'Privacy', href: '/privacy-policy' },
              { label: 'Cookies', href: '/cookie-policy' },
              { label: 'Terms', href: '/terms-of-use' },
              { label: 'Editorial', href: '/editorial-policy' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs hover:text-white transition-colors"
                style={{ color: 'oklch(0.5 0.02 85)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
