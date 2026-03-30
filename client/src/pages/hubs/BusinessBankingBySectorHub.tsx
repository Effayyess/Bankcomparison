// Hub Pillar Page: Business Banking for Specific Sectors
// Target keyword: "best business bank account for [sector] UK"

import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronRight, BookOpen, ShoppingBag, Laptop, Heart, Users, Globe, Wrench } from 'lucide-react';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Best Business Bank Accounts by Sector UK 2026',
      description: 'Find the best UK business bank account for your specific sector — ecommerce, freelancers, charities, partnerships, non-UK residents, contractors, and more.',
      url: 'https://www.businessbankcompare.co.uk/guides/hub/business-banking-by-sector',
      dateModified: '2026-03-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.businessbankcompare.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://www.businessbankcompare.co.uk/guides' },
          { '@type': 'ListItem', position: 3, name: 'Business Banking by Sector' },
        ],
      },
    },
    {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.sector-intro'],
    },
  ],
};

const sectors = [
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: 'Ecommerce & Retail',
    desc: 'Ecommerce businesses need accounts that handle high transaction volumes, integrate with payment processors like Stripe and PayPal, and support international payments for global suppliers.',
    topPick: 'Starling Bank or Tide',
    spokes: [
      { href: '/guides/best-business-bank-account-for-ecommerce-uk', label: 'Best Accounts for Ecommerce Businesses' },
      { href: '/guides/business-bank-accounts-with-stripe-integration', label: 'Accounts with Stripe Integration' },
      { href: '/guides/multi-currency-business-bank-account-uk', label: 'Multi-Currency Business Accounts' },
    ],
  },
  {
    icon: <Laptop className="w-6 h-6" />,
    title: 'Freelancers & Creatives',
    desc: 'Freelancers need accounts with strong invoicing tools, tax management features, and low costs during quiet periods. Sole trader-friendly accounts with self-assessment support are ideal.',
    topPick: 'Mettle or ANNA Money',
    spokes: [
      { href: '/best-sole-trader-bank-accounts', label: 'Best Sole Trader Bank Accounts' },
      { href: '/guides/sole-trader-business-bank-account', label: 'Sole Trader Banking Guide' },
      { href: '/guides/how-to-open-self-employed-business-bank-account-uk', label: 'How to Open a Self-Employed Account' },
    ],
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: 'Contractors & Consultants',
    desc: 'Contractors operating through limited companies need accounts that clearly separate company and personal finances, support multiple clients, and integrate with accounting software.',
    topPick: 'Starling Bank or Tide',
    spokes: [
      { href: '/guides/best-business-bank-account-for-contractors-uk', label: 'Best Accounts for Contractors' },
      { href: '/best-business-bank-accounts-for-limited-companies', label: 'Best Limited Company Accounts' },
      { href: '/guides/limited-company-business-bank-account', label: 'Limited Company Banking Guide' },
    ],
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Charities & Non-Profits',
    desc: 'Charities have unique banking needs — they often require multiple signatories, grant management features, and accounts that understand the regulatory requirements of charitable organisations.',
    topPick: 'Co-operative Bank or HSBC',
    spokes: [
      { href: '/guides/best-business-bank-account-for-charities-uk', label: 'Best Accounts for Charities' },
      { href: '/guides/charity-bank-account-requirements-uk', label: 'Charity Bank Account Requirements' },
    ],
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Partnerships',
    desc: 'Business partnerships require accounts that support multiple account holders with appropriate access controls, clear transaction records for partnership accounts, and flexible signatory arrangements.',
    topPick: 'Starling Bank or NatWest',
    spokes: [
      { href: '/guides/partnership-business-bank-accounts-uk', label: 'Partnership Bank Accounts Guide' },
      { href: '/guides/business-bank-accounts-with-multiple-directors-uk', label: 'Accounts for Multiple Directors' },
    ],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Non-UK Residents & International Businesses',
    desc: 'Non-UK residents and international businesses face additional challenges opening UK business accounts. Specialist providers offer more accessible options with multi-currency support.',
    topPick: 'Wise Business or Airwallex',
    spokes: [
      { href: '/guides/can-a-non-uk-resident-open-a-business-bank-account', label: 'Can a Non-UK Resident Open an Account?' },
      { href: '/guides/international-transfer-fees-for-uk-business-accounts', label: 'International Transfer Fees' },
      { href: '/guides/multi-currency-business-bank-account-uk', label: 'Multi-Currency Accounts' },
    ],
  },
];

export default function BusinessBankingBySectorHub() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Best Business Bank Accounts by Sector UK 2026 | Business Bank Compare"
        description="Find the best UK business bank account for your specific sector — ecommerce, freelancers, charities, partnerships, non-UK residents, contractors, and more."
        schema={schema}
      />
      <Navigation />

      <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-violet-300 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/guides" className="hover:text-white no-underline">Guides</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Business Banking by Sector</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-violet-600/30 border border-violet-500/40 rounded-full px-3 py-1 text-xs font-semibold text-violet-200 mb-4">
            <BookOpen className="w-3 h-3" /> Hub Guide — Last reviewed: March 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Best Business Bank Accounts by Sector UK {new Date().getFullYear()}
          </h1>
          <p className="sector-intro text-lg text-violet-100 mb-6 leading-relaxed max-w-3xl">
            Different types of businesses have very different banking needs. The best account for a freelance graphic designer is not the same as the best account for an ecommerce retailer or a registered charity. This hub guide helps you find the right account for your specific sector.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-6 mb-12">
          {sectors.map((sector) => (
            <div key={sector.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-start gap-4 p-6 border-b border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white">
                  {sector.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{sector.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">{sector.desc}</p>
                  <div className="inline-flex items-center gap-1.5 bg-violet-50 border border-violet-200 rounded-full px-3 py-1">
                    <span className="text-xs font-semibold text-violet-700">Our top pick: {sector.topPick}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Related Guides</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {sector.spokes.map(spoke => (
                    <Link key={spoke.href} href={spoke.href} className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 no-underline group py-0.5">
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      {spoke.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category landing pages */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Browse by Business Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { href: '/best-business-bank-accounts-for-startups', label: 'Best for Startups' },
              { href: '/free-business-bank-accounts', label: 'Free Business Accounts' },
              { href: '/best-sole-trader-bank-accounts', label: 'Best for Sole Traders' },
              { href: '/best-business-bank-accounts-for-limited-companies', label: 'Best for Limited Companies' },
              { href: '/best-digital-business-bank-accounts', label: 'Best Digital Accounts' },
              { href: '/business-bank-accounts-no-credit-check', label: 'No Credit Check Accounts' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 no-underline group bg-white border border-blue-200 rounded-xl px-4 py-3 hover:border-blue-400 transition-colors">
                <ChevronRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/compare" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm no-underline hover:opacity-90 transition-opacity" style={{ background: '#2563eb', fontFamily: 'Sora, sans-serif' }}>
            Compare All Business Bank Accounts <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
