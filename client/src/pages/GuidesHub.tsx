// GuidesHub — Learn section landing page
// Shows all 11 content categories with article listings
import { Link } from 'wouter';
import { ChevronRight, BookOpen, Calculator, TrendingUp, Shield, Globe, RefreshCw, DollarSign, Settings, Briefcase, Star, PlusCircle, FileText } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { guideCategories, guidesData } from '../lib/guidesData';

const categoryIcons: Record<string, React.ReactNode> = {
  'getting-started': <PlusCircle className="w-6 h-6" />,
  'business-types': <Briefcase className="w-6 h-6" />,
  'fees-and-costs': <DollarSign className="w-6 h-6" />,
  'fees-and-security': <DollarSign className="w-6 h-6" />,
  'features-functionality': <Settings className="w-6 h-6" />,
  'switching-comparing': <RefreshCw className="w-6 h-6" />,
  'tax-accounting': <FileText className="w-6 h-6" />,
  'bank-comparisons': <Star className="w-6 h-6" />,
  'startups': <TrendingUp className="w-6 h-6" />,
  'security-regulation': <Shield className="w-6 h-6" />,
  'international-banking': <Globe className="w-6 h-6" />,
  'account-management': <Settings className="w-6 h-6" />,
  'tools-and-software': <Calculator className="w-6 h-6" />,
  'emerging-topics': <TrendingUp className="w-6 h-6" />,
};

const categoryColors: Record<string, string> = {
  'getting-started': '#2563eb',
  'business-types': '#7c3aed',
  'fees-and-costs': '#059669',
  'fees-and-security': '#059669',
  'features-functionality': '#0891b2',
  'switching-comparing': '#d97706',
  'tax-accounting': '#dc2626',
  'bank-comparisons': '#db2777',
  'startups': '#16a34a',
  'security-regulation': '#1d4ed8',
  'international-banking': '#0e7490',
  'account-management': '#7c3aed',
  'tools-and-software': '#0891b2',
  'emerging-topics': '#9333ea',
};

export default function GuidesHub() {
  const totalGuides = Object.keys(guidesData).length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={`Business Banking Guides & Resources UK ${new Date().getFullYear()} | Business Bank Compare`}
        description={`Expert guides on UK business banking — ${totalGuides}+ articles covering how to open an account, fees, switching, tax, accounting integrations, and more. Updated ${new Date().toLocaleString('en-GB', { month: 'long', year: 'numeric' })}.`}
        keywords="business bank account guide, UK business banking guides, how to open business bank account, business banking tips, sole trader banking guide, business bank fees explained, switching business bank account"
        canonicalPath="/guides"
      />
      <Navigation />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: '#0f172a' }}>
          <div className="relative container py-16 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-blue-400 text-sm font-medium mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
              <BookOpen className="w-4 h-4" />
              Business Banking Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
              Learn About Business Banking
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              {totalGuides}+ expert guides covering every aspect of UK business banking — from opening your first account to managing international payments, tax, and accounting integrations.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90 no-underline"
                style={{ background: '#2563eb' }}
              >
                Compare Accounts
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/find-my-account"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white/80 border border-white/20 transition-all hover:bg-white/10 no-underline"
              >
                Find My Account
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quick category jump links */}
        <section className="bg-white border-b border-gray-200 sticky top-16 z-30">
          <div className="container">
            <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
              {guideCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors hover:bg-blue-50 hover:text-blue-700 no-underline whitespace-nowrap"
                  style={{ color: 'oklch(26% .07 240)', fontFamily: 'Sora, sans-serif' }}
                >
                  {cat.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container space-y-16">
            {guideCategories.map((category) => {
              const color = categoryColors[category.id] || '#2563eb';
              const icon = categoryIcons[category.id] || <BookOpen className="w-6 h-6" />;
              const categoryGuides = category.guides.map(slug => ({ slug, guide: guidesData[slug] })).filter(g => g.guide);

              return (
                <div key={category.id} id={category.id} className="scroll-mt-28">
                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: color }}>
                      {icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                          {category.title}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: color }}>
                          {categoryGuides.length} {categoryGuides.length === 1 ? 'guide' : 'guides'}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1 text-sm">{category.description}</p>
                    </div>
                    <Link
                      href={`/guides/category/${category.id}`}
                      className="hidden md:inline-flex items-center gap-1 text-sm font-semibold no-underline hover:underline flex-shrink-0"
                      style={{ color }}
                    >
                      View all <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Articles grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryGuides.map(({ slug, guide }) => (
                      <Link
                        key={slug}
                        href={`/guides/${slug}`}
                        className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all no-underline"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 flex-shrink-0" style={{ background: `${color}15` }}>
                          <ChevronRight className="w-4 h-4" style={{ color }} />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>
                          {guide!.title.split(' | ')[0]}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {guide!.metaDescription?.substring(0, 90)}...
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Mobile view all link */}
                  <div className="mt-4 md:hidden">
                    <Link
                      href={`/guides/category/${category.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold no-underline"
                      style={{ color }}
                    >
                      View all {category.title} guides <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Calculators coming soon banner */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="container">
            <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}>
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Calculator className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
                  Coming Soon
                </div>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Business Banking Calculators
                </h2>
                <p className="text-slate-300 text-sm max-w-xl">
                  We're building a suite of free calculators to help you work out the true cost of your business bank account, compare fees side-by-side, and calculate potential savings from switching.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white/50 border border-white/10 cursor-not-allowed">
                  <Calculator className="w-4 h-4" />
                  Calculators Coming Soon
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Ready to find your perfect account?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Compare all the top UK business bank accounts side-by-side and find the right fit for your business in minutes.
            </p>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 shadow-lg no-underline"
              style={{ background: '#2563eb' }}
            >
              Compare All Accounts
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
