import { Link } from 'wouter';
import { ChevronRight, BookOpen, Search } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { guideCategories, guidesData } from '../lib/guidesData';

export default function GuidesHub() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title="Business Banking Guides & Resources UK 2025 | Compare Business Account"
        description="Expert guides on UK business banking. Learn how to open an account, switch banks, understand fees, and find the best account for your business type."
        keywords="business bank account guide, UK business banking guides, how to open business bank account, business banking tips, sole trader banking guide"
        canonicalPath="/guides"
      />
      <Navigation />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden" style={{ background: '#0f172a' }}>
          <div className="absolute inset-0" style={{ background: '#0f172a', opacity: 1 }} />
          <div className="relative container py-16 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-teal-400 text-sm font-medium mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
              <BookOpen className="w-4 h-4" />
              Business Banking Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
              Guides & Resources
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
              Everything you need to know about business banking in the UK. From opening your first account to managing international payments.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guideCategories.map((category) => (
                <div key={category.id} id={category.id} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {category.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-4">
                    {category.guides.map((guideSlug) => {
                      const guide = guidesData[guideSlug];
                      if (!guide) return null;
                      return (
                        <li key={guideSlug}>
                          <Link 
                            href={`/guides/${guideSlug}`}
                            className="group flex items-start gap-3 text-gray-700 hover:text-teal-700 transition-colors"
                          >
                            <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                            <span className="font-medium leading-snug">{guide.title.split(' | ')[0]}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Ready to find your account?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Compare all the top UK business bank accounts side-by-side to find the perfect fit for your business.
            </p>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 shadow-lg"
              style={{ background: '#0d9488' }}
            >
              Compare Accounts Now
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
