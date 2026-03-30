// GuidesHub — filterable guide listing
// Filter state lives in the URL: /guides?category=switching-comparing
// Clicking a category from the homepage pre-filters the page via that URL param
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  ChevronRight, BookOpen, Calculator, TrendingUp, Shield, Globe,
  RefreshCw, DollarSign, Settings, Briefcase, Star, PlusCircle,
  FileText, X, Filter
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { guideCategories, guidesData } from '../lib/guidesData';

const categoryIcons: Record<string, React.ReactNode> = {
  'getting-started': <PlusCircle className="w-5 h-5" />,
  'business-types': <Briefcase className="w-5 h-5" />,
  'fees-and-costs': <DollarSign className="w-5 h-5" />,
  'fees-and-security': <DollarSign className="w-5 h-5" />,
  'features-functionality': <Settings className="w-5 h-5" />,
  'switching-comparing': <RefreshCw className="w-5 h-5" />,
  'tax-accounting': <FileText className="w-5 h-5" />,
  'bank-comparisons': <Star className="w-5 h-5" />,
  'startups': <TrendingUp className="w-5 h-5" />,
  'security-regulation': <Shield className="w-5 h-5" />,
  'international-banking': <Globe className="w-5 h-5" />,
  'account-management': <Settings className="w-5 h-5" />,
  'tools-and-software': <Calculator className="w-5 h-5" />,
  'emerging-topics': <TrendingUp className="w-5 h-5" />,
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

function getQueryParam(search: string, key: string): string | null {
  const params = new URLSearchParams(search);
  return params.get(key);
}

export default function GuidesHub() {
  const totalGuides = Object.keys(guidesData).length;
  const [location, navigate] = useLocation();

  // Read the active category from the URL query string
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const [activeCategory, setActiveCategory] = useState<string | null>(() => getQueryParam(search, 'category'));

  // Keep activeCategory in sync when the URL changes (e.g. browser back/forward)
  useEffect(() => {
    const cat = getQueryParam(window.location.search, 'category');
    setActiveCategory(cat);
  }, [location]);

  // When user clicks a filter button, update the URL and state
  const handleFilter = (catId: string | null) => {
    if (catId === null) {
      navigate('/guides');
    } else {
      navigate(`/guides?category=${catId}`);
    }
    setActiveCategory(catId);
    // Scroll to the guide listing section
    setTimeout(() => {
      document.getElementById('guide-listing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Which categories to show: all, or just the selected one
  const visibleCategories = activeCategory
    ? guideCategories.filter((c) => c.id === activeCategory)
    : guideCategories;

  const activeLabel = activeCategory
    ? guideCategories.find((c) => c.id === activeCategory)?.title
    : null;

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

        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden" style={{ background: '#0f172a' }}>
          <div className="relative container py-14 md:py-18 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-blue-400 text-sm font-medium mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
              <BookOpen className="w-4 h-4" />
              Business Banking Knowledge Hub
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              {activeLabel ? `${activeLabel} Guides` : 'Learn About Business Banking'}
            </h1>
            <p className="text-base text-slate-300 max-w-2xl mx-auto mb-6">
              {activeLabel
                ? `Showing all guides in the "${activeLabel}" category. Use the filter below to browse other topics.`
                : `${totalGuides}+ expert guides covering every aspect of UK business banking — from opening your first account to managing international payments, tax, and accounting integrations.`}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90 no-underline"
                style={{ background: '#2563eb' }}
              >
                Compare Accounts <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/find-my-account"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white/80 border border-white/20 transition-all hover:bg-white/10 no-underline"
              >
                Find My Account <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CATEGORY FILTER ─── */}
        <section className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
          <div className="container py-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-bold text-gray-800" style={{ fontFamily: 'Sora, sans-serif' }}>
                Filter by category:
              </span>
              {activeCategory && (
                <button
                  onClick={() => handleFilter(null)}
                  className="ml-auto flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors border border-blue-200"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  <X className="w-3 h-3" />
                  Clear filter
                </button>
              )}
            </div>
            {/* Wrap-grid of filter buttons — no horizontal scroll */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilter(null)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeCategory === null
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50'
                }`}
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                <BookOpen className="w-3 h-3" />
                All Guides
                <span className={`ml-0.5 text-xs font-bold ${activeCategory === null ? 'text-blue-200' : 'text-gray-400'}`}>
                  ({totalGuides})
                </span>
              </button>
              {guideCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const color = categoryColors[cat.id] || '#2563eb';
                const count = cat.guides.filter(slug => guidesData[slug]).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleFilter(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      isActive
                        ? 'text-white shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                    style={{
                      fontFamily: 'Sora, sans-serif',
                      ...(isActive ? { background: color, borderColor: color } : {}),
                    }}
                  >
                    <span className="flex-shrink-0" style={isActive ? { color: 'white' } : { color }}>
                      {categoryIcons[cat.id] || <BookOpen className="w-3 h-3" />}
                    </span>
                    {cat.title}
                    <span className={`ml-0.5 text-xs font-bold ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── GUIDE LISTING ─── */}
        <section id="guide-listing" className="py-12 scroll-mt-32">
          <div className="container space-y-14">
            {visibleCategories.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-sm">No guides found for this category.</p>
                <button onClick={() => handleFilter(null)} className="mt-4 text-blue-600 font-semibold text-sm hover:underline">
                  Show all guides
                </button>
              </div>
            )}
            {visibleCategories.map((category) => {
              const color = categoryColors[category.id] || '#2563eb';
              const icon = categoryIcons[category.id] || <BookOpen className="w-6 h-6" />;
              const categoryGuides = category.guides.map(slug => ({ slug, guide: guidesData[slug] })).filter(g => g.guide);

              return (
                <div key={category.id} id={category.id} className="scroll-mt-36">
                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: color }}>
                      {icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                          {category.title}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: color }}>
                          {categoryGuides.length} {categoryGuides.length === 1 ? 'guide' : 'guides'}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1 text-sm">{category.description}</p>
                    </div>
                  </div>

                  {/* Articles grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryGuides.map(({ slug, guide }) => (
                      <Link
                        key={slug}
                        href={`/guides/${slug}`}
                        className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all no-underline"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 flex-shrink-0" style={{ background: `${color}18` }}>
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
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── CALCULATOR PROMO ─── */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="container">
            <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}>
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Calculator className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Free Business Banking Calculators
                </h2>
                <p className="text-slate-300 text-sm max-w-xl">
                  Work out the true cost of your business bank account, compare fees side-by-side, and calculate potential savings from switching.
                </p>
              </div>
              <div className="flex-shrink-0 flex gap-3 flex-wrap justify-center">
                <Link
                  href="/calculators/business-cost"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white no-underline transition-all hover:opacity-90"
                  style={{ background: '#2563eb' }}
                >
                  <Calculator className="w-4 h-4" />
                  Cost Calculator
                </Link>
                <Link
                  href="/calculators/fee-comparison"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white/80 border border-white/20 no-underline transition-all hover:bg-white/10"
                >
                  Fee Comparison
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-14 bg-gray-50 border-t border-gray-200">
          <div className="container text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Ready to find your perfect account?
            </h2>
            <p className="text-base text-gray-600 mb-6 max-w-2xl mx-auto">
              Compare all the top UK business bank accounts side-by-side and find the right fit for your business in minutes.
            </p>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 shadow-lg no-underline"
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
