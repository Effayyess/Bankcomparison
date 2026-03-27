import { Link } from 'wouter';
import { ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { guideCategories, guidesData } from '../lib/guidesData';

interface Props {
  categoryId: string;
}

export default function GuidesCategory({ categoryId }: Props) {
  const category = guideCategories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
            <Link href="/guides" className="text-blue-600 hover:underline">← Back to all guides</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const guides = category.guides
    .map((slug) => guidesData[slug])
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={`${category.title} — Business Banking Guides UK ${new Date().getFullYear()} | Business Bank Compare`}
        description={category.description}
        keywords={`business bank account guide, ${category.title.toLowerCase()}, UK business banking`}
        canonicalPath={`/guides/category/${category.id}`}
      />
      <Navigation />
      <main className="flex-1 pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: '#0f172a' }}>
          <div className="relative container py-14 md:py-18">
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors no-underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All Guides
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-blue-400 text-sm font-medium mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              <BookOpen className="w-4 h-4" />
              {guides.length} {guides.length === 1 ? 'Guide' : 'Guides'}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              {category.title}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              {category.description}
            </p>
          </div>
        </section>

        {/* Guides list */}
        <section className="py-14">
          <div className="container max-w-3xl">
            <div className="space-y-5">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group block bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all no-underline"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                        {guide.title.split(' | ')[0]}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {guide.metaDescription}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors no-underline"
              >
                <ArrowLeft className="w-4 h-4" />
                View all guide categories
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-white border-t border-gray-200">
          <div className="container text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              Ready to find your account?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Compare all the top UK business bank accounts side-by-side.
            </p>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 shadow-lg"
              style={{ background: '#2563eb' }}
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
