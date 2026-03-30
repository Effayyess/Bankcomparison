// Hub Pillar Page: Switching Your Business Bank Account
// Target keyword: "switch business bank account UK"

import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronRight, BookOpen, RefreshCw, Gift, Clock, CheckCircle } from 'lucide-react';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'How to Switch Your Business Bank Account UK: Complete Guide 2026',
      description: 'The complete guide to switching your UK business bank account. Covers the Current Account Switch Service, switching bonuses, how long it takes, and the best accounts to switch to.',
      url: 'https://www.businessbankcompare.co.uk/guides/hub/switching-business-bank-account',
      dateModified: '2026-03-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.businessbankcompare.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://www.businessbankcompare.co.uk/guides' },
          { '@type': 'ListItem', position: 3, name: 'Switching Your Business Bank Account' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does it take to switch a business bank account?',
          acceptedAnswer: { '@type': 'Answer', text: 'Using the Current Account Switch Service (CASS), switching takes 7 working days. The service automatically transfers all your direct debits, standing orders, and incoming payments to your new account. You can choose your switch date and the old account remains active until the switch is complete.' },
        },
        {
          '@type': 'Question',
          name: 'Can I switch my business bank account and keep my sort code?',
          acceptedAnswer: { '@type': 'Answer', text: 'No — when you switch to a new bank, you will receive a new sort code and account number. However, the Current Account Switch Service (CASS) automatically redirects all payments from your old account to your new one for at least 3 years, so clients and suppliers do not need to update their records immediately.' },
        },
        {
          '@type': 'Question',
          name: 'Are there switching bonuses for business bank accounts?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes — several UK banks offer cash switching bonuses for businesses that switch using CASS. Current offers include Barclays (£400 cashback), Tide (£250 cashback with code REFER200), and NatWest (various offers for new business customers). These offers change regularly, so check our comparison page for the latest deals.' },
        },
      ],
    },
  ],
};

const switchingSteps = [
  { step: '1', title: 'Choose your new account', desc: 'Compare accounts and select one that better suits your needs. Consider fees, features, and any switching bonuses on offer.' },
  { step: '2', title: 'Open the new account', desc: 'Apply for and open your new business bank account. Most digital banks can open accounts within hours.' },
  { step: '3', title: 'Initiate the CASS switch', desc: 'Request a full switch via the Current Account Switch Service. Your new bank will manage the process.' },
  { step: '4', title: 'Choose your switch date', desc: 'Select a switch date at least 7 working days in the future. This gives time for all payments to be transferred.' },
  { step: '5', title: 'Switch completes', desc: 'On your chosen date, all direct debits, standing orders, and incoming payments are automatically transferred. Your old account closes.' },
  { step: '6', title: 'Notify key contacts', desc: 'Although CASS redirects payments automatically, it is good practice to update your sort code and account number with key clients and suppliers.' },
];

const currentOffers = [
  { bank: 'Barclays Business', offer: '£400 cashback', condition: 'Switch using CASS and meet eligibility criteria' },
  { bank: 'Tide Business', offer: '£250 cashback', condition: 'Use code REFER200, spend £100 within 30 days' },
  { bank: 'NatWest Business', offer: '24 months free banking', condition: 'New business customers switching to NatWest' },
  { bank: 'Lloyds Business', offer: '£200 cashback', condition: 'Switch using CASS, T&Cs apply' },
];

export default function SwitchingBankAccountHub() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="How to Switch Your Business Bank Account UK: Complete Guide 2026 | Business Bank Compare"
        description="The complete guide to switching your UK business bank account. Covers CASS, switching bonuses, how long it takes, and the best accounts to switch to."
        schema={schema}
      />
      <Navigation />

      <div className="bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-green-300 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/guides" className="hover:text-white no-underline">Guides</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Switching Your Business Bank Account</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-green-600/30 border border-green-500/40 rounded-full px-3 py-1 text-xs font-semibold text-green-200 mb-4">
            <BookOpen className="w-3 h-3" /> Hub Guide — Last reviewed: March 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            How to Switch Your Business Bank Account: Complete Guide {new Date().getFullYear()}
          </h1>
          <p className="text-lg text-green-100 mb-6 leading-relaxed max-w-3xl">
            Switching your business bank account is easier than most people think — and can save you hundreds of pounds per year in fees, plus earn you a switching bonus of up to £400. The Current Account Switch Service (CASS) handles the entire process in just 7 working days.
          </p>
          <div className="bg-white/10 border border-white/20 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-green-300 mb-3">TL;DR — Key Takeaways</p>
            <ul className="space-y-1.5 text-sm text-green-50">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Switching takes just <strong>7 working days</strong> via the Current Account Switch Service</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> CASS automatically transfers all direct debits, standing orders, and incoming payments</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Current switching bonuses include up to <strong>£400 cashback</strong> from Barclays</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> You are protected by the <strong>CASS Switching Guarantee</strong> — any errors are corrected at no cost</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* CASS guarantee box */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>The Current Account Switch Service (CASS) Guarantee</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            The Current Account Switch Service is a free, industry-wide service that makes switching bank accounts simple, reliable, and quick. It is backed by the <strong>CASS Switching Guarantee</strong>, which means:
          </p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            {[
              'All payments (direct debits, standing orders, incoming transfers) are automatically moved to your new account',
              'Any misdirected payments are redirected for at least 3 years after switching',
              'If anything goes wrong, your bank will refund any charges or interest incurred as a result',
              'The switch completes within 7 working days of your chosen switch date',
            ].map(point => (
              <li key={point} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* How to switch steps */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <RefreshCw className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>How to Switch in 6 Steps</h2>
          </div>
          <div className="space-y-4">
            {switchingSteps.map(s => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">{s.step}</div>
                <div>
                  <p className="font-bold text-sm text-gray-900 mb-0.5">{s.title}</p>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current switching offers */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <Gift className="w-6 h-6 text-orange-600" />
            <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Current Switching Offers (March 2026)</h2>
          </div>
          <div className="space-y-3">
            {currentOffers.map(offer => (
              <div key={offer.bank} className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="font-bold text-orange-700 text-sm">{offer.offer}</div>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{offer.bank}</p>
                  <p className="text-xs text-gray-600">{offer.condition}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">Switching offers change regularly. Always verify current terms directly with the bank before switching.</p>
        </div>

        {/* How long does it take */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>How Long Does Switching Take?</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            {[
              { label: 'Open new account', time: 'Same day', note: 'Digital banks' },
              { label: 'CASS switch process', time: '7 working days', note: 'From switch date' },
              { label: 'Payment redirection', time: '3+ years', note: 'After switching' },
            ].map(item => (
              <div key={item.label} className="bg-blue-50 rounded-xl p-4">
                <div className="text-xl font-bold text-blue-700 mb-1">{item.time}</div>
                <div className="text-xs font-semibold text-gray-700">{item.label}</div>
                <div className="text-xs text-gray-500">{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Related guides */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Related Switching Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { href: '/guides/how-to-switch-business-bank-accounts-uk', label: 'Full Guide: How to Switch Business Bank Accounts' },
              { href: '/guides/business-bank-account-fees', label: 'Understanding Business Banking Fees' },
              { href: '/guides/hub/business-banking-fees-explained', label: 'Hub: Business Banking Fees Explained' },
              { href: '/compare', label: 'Compare All Business Bank Accounts' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 no-underline group">
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
