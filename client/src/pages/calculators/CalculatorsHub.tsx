// Calculators Hub — landing page listing all three calculators
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { Calculator, BarChart3, PiggyBank, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const calculators = [
  {
    icon: Calculator,
    title: 'Business Banking Cost Calculator',
    description: 'Enter your monthly transaction volumes and instantly see your estimated banking cost at every major UK provider — ranked cheapest first. Find out how much you could save by switching.',
    href: '/calculators/business-cost',
    color: 'blue',
    tags: ['Monthly fees', 'Transfer costs', 'Cash deposits', 'International payments'],
  },
  {
    icon: BarChart3,
    title: 'Fee Comparison Calculator',
    description: 'Select up to 3 UK business banks and compare every fee side-by-side in a detailed table. Monthly charges, transfer costs, cash deposit rates, international fees, and key features — all in one place.',
    href: '/calculators/fee-comparison',
    color: 'purple',
    tags: ['Side-by-side', 'Up to 3 banks', 'All fee types', 'Feature comparison'],
  },
  {
    icon: PiggyBank,
    title: 'Savings Interest Calculator',
    description: 'Calculate how much interest your business savings could earn. Compare easy access, notice, and fixed-rate accounts from leading UK providers and find the best rate for your savings amount and term.',
    href: '/calculators/savings-interest',
    color: 'green',
    tags: ['Easy access', 'Notice accounts', 'Fixed rate', 'FSCS filter'],
  },
];

const colorMap: Record<string, { bg: string; icon: string; tag: string }> = {
  blue: { bg: 'bg-blue-50 border-blue-200', icon: 'text-blue-600 bg-blue-100', tag: 'bg-blue-100 text-blue-700' },
  purple: { bg: 'bg-purple-50 border-purple-200', icon: 'text-purple-600 bg-purple-100', tag: 'bg-purple-100 text-purple-700' },
  green: { bg: 'bg-green-50 border-green-200', icon: 'text-green-600 bg-green-100', tag: 'bg-green-100 text-green-700' },
};

export default function CalculatorsHub() {
  return (
    <>
      <Helmet>
        <title>Business Banking Calculators UK 2026 | Business Bank Compare</title>
        <meta name="description" content="Free UK business banking calculators. Calculate your true monthly banking cost, compare fees side-by-side, and see how much interest your business savings could earn." />
        <link rel="canonical" href="https://businessbankcompare.co.uk/calculators" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div style={{ paddingTop: '88px' }}>
        {/* Hero */}
        <div style={{ background: '#0f172a' }} className="py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              <Calculator className="w-3.5 h-3.5" /> Free Tools
            </div>
            <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Business Banking Calculators
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Free tools to help you understand your true banking costs, compare providers side-by-side, and maximise the return on your business savings.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-6">
            {calculators.map(calc => {
              const colors = colorMap[calc.color];
              const Icon = calc.icon;
              return (
                <Link key={calc.href} href={calc.href} className="no-underline group">
                  <div className={`bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 ${colors.bg}`}>
                    <div className="flex items-start gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                            {calc.title}
                          </h2>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors flex-shrink-0" />
                        </div>
                        <p className="text-gray-600 mt-2 text-sm leading-relaxed">{calc.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {calc.tags.map(tag => (
                            <span key={tag} className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.tag}`} style={{ fontFamily: 'Sora, sans-serif' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Info box */}
          <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>About Our Calculators</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              All calculators use published fee data from UK business banking providers, verified as of March 2026. Figures are estimates for guidance only — actual costs may vary based on your specific account tier, introductory offers, and individual circumstances. Always verify current rates and fees directly with the provider before opening an account.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Some links on this page are affiliate links. We may earn a commission if you open an account, but this never influences our data or editorial rankings.
            </p>
          </div>
        </div>
        </div>{/* end paddingTop wrapper */}
        <Footer />
      </div>
    </>
  );
}
