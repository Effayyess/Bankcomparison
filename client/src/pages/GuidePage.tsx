// Design: Authoritative Broadsheet | Guide articles
// Long-form editorial guides with table of contents, related guides sidebar

import { useParams, Link } from 'wouter';
import { ChevronRight, BookOpen } from 'lucide-react';
import NotFound from './NotFound';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const GUIDE_HERO = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=80';

import { guidesData as guides, guideCategories } from '../lib/guidesData';

// We can remove the local interfaces and guides object since we're importing them

const guideSlugToTitle: Record<string, string> = {
  'how-to-open-a-business-bank-account': 'How to Open a Business Account',
  'best-free-business-bank-accounts': 'Best Free Business Accounts',
  'sole-trader-business-bank-account': 'Sole Trader Banking Guide',
  'limited-company-business-bank-account': 'Limited Company Banking',
  'switching-business-bank-account': 'Switching Business Banks',
  'business-bank-account-fees': 'Business Account Fees Explained',
  'business-account-vs-personal-account': 'Business vs Personal Account',
  'digital-vs-high-street-banks': 'Digital vs High Street Banks',
  'business-bank-account-for-bad-credit': 'Accounts for Bad Credit',
  'do-sole-traders-need-a-business-bank-account': 'Do Sole Traders Need an Account?',
  'how-to-close-a-business-bank-account': 'How to Close an Account',
  'what-is-a-business-overdraft': 'What is a Business Overdraft?',
  'how-to-change-business-bank-account-details': 'How to Change Account Details',
  'fscs-protection-explained': 'FSCS Protection Explained',
  'best-accounting-software-for-small-businesses': 'Best Accounting Software',
  'international-business-payments-guide': 'International Payments Guide'
};

export default function GuidePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || '';
  const guide = guides[slug];

  if (!guide) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={guide.title}
        description={guide.metaDescription}
        keywords={`${guide.h1.toLowerCase()}, business bank account guide, UK business banking, compare business bank accounts`}
        canonicalPath={`/guides/${slug}`}
        ogType="article"
      />
      <Navigation />
      <div style={{ paddingTop: '64px' }}>
      {/* Hero — matches site's navy hero style */}
      <section className="relative overflow-hidden" style={{ background: '#0f172a', minHeight: '220px' }}>
        <div className="absolute inset-0" style={{ background: '#0f172a', opacity: 1 }} />
        <div className="relative container py-10">
          <nav className="flex items-center gap-2 text-sm mb-4 text-slate-400">
            <Link href="/" className="hover:text-teal-400 transition-colors text-slate-300">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-300">Guides</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400 truncate max-w-xs">{guide.h1}</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <span className="text-sm font-medium text-teal-400" style={{ fontFamily: 'Sora, sans-serif' }}>Business Banking Guide</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            {guide.h1}
          </h1>
        </div>
      </section>

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Intro */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              <p className="text-base leading-relaxed text-gray-700" style={{ fontFamily: 'Sora, sans-serif' }}>
                {guide.intro}
              </p>
            </div>

            {/* Table of contents */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
              <h2 className="text-sm font-bold mb-3 uppercase tracking-wider text-teal-700" style={{ fontFamily: 'Sora, sans-serif' }}>
                In This Guide
              </h2>
              <ol className="space-y-1.5">
                {guide.sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm hover:text-teal-700 flex items-center gap-2 text-gray-600 transition-colors"
                    >
                      <span className="text-xs font-bold text-teal-600 w-5 shrink-0">{i + 1}.</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Sections */}
            {guide.sections.map((section) => (
              <div key={section.id} id={section.id} className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {section.heading}
                </h2>
                <div>
                  {section.content.split('\n\n').map((para, i) => {
                    if (para.startsWith('**') && para.includes('**\n')) {
                      const lines = para.split('\n');
                      return (
                        <div key={i} className="mb-4">
                          {lines.map((line, j) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return (
                                <h3 key={j} className="font-bold text-base mt-4 mb-2 text-gray-800" style={{ fontFamily: 'Sora, sans-serif' }}>
                                  {line.replace(/\*\*/g, '')}
                                </h3>
                              );
                            }
                            if (line.startsWith('- ')) {
                              return (
                                <p key={j} className="text-sm ml-4 mb-1 text-gray-600">
                                  • {line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}
                                </p>
                              );
                            }
                            return line ? (
                              <p key={j} className="text-sm leading-relaxed mb-2 text-gray-600">
                                {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                              </p>
                            ) : null;
                          })}
                        </div>
                      );
                    }
                    if (para.includes('|')) {
                      const rows = para.split('\n').filter(r => r.includes('|') && !r.match(/^[\s|:-]+$/));
                      return (
                        <div key={i} className="overflow-x-auto mb-4">
                          <table className="w-full text-sm border-collapse">
                            {rows.map((row, j) => {
                              const cells = row.split('|').filter(c => c.trim());
                              return (
                                <tr key={j} className={j === 0 ? 'border-b-2 border-teal-600' : 'border-b border-gray-100'}>
                                  {cells.map((cell, k) => (
                                    j === 0 ? (
                                      <th key={k} className="text-left py-2 px-3 font-semibold text-xs uppercase tracking-wide text-teal-700" style={{ fontFamily: 'Sora, sans-serif' }}>
                                        {cell.trim()}
                                      </th>
                                    ) : (
                                      <td key={k} className="py-2 px-3 text-gray-600 text-sm">
                                        {cell.trim()}
                                      </td>
                                    )
                                  ))}
                                </tr>
                              );
                            })}
                          </table>
                        </div>
                      );
                    }
                    const formatted = para
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n- /g, '<br/>• ');
                    return (
                      <p
                        key={i}
                        className="text-sm leading-relaxed mb-4 text-gray-600"
                        dangerouslySetInnerHTML={{ __html: formatted }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="rounded-xl p-6 text-center" style={{ background: '#0f172a' }}>
              <h3 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                Ready to compare business bank accounts?
              </h3>
              <p className="text-sm mb-4 text-slate-300">
                Use our comparison tool to find the best account for your business.
              </p>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90 text-white"
                style={{ background: '#0d9488' }}
              >
                Compare All Accounts
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-sm mb-3 uppercase tracking-wider text-teal-700" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Related Guides
                </h3>
                <ul className="space-y-2">
                  {guide.relatedGuides.map((relSlug) => (
                    <li key={relSlug}>
                      <Link
                        href={`/guides/${relSlug}`}
                        className="text-sm hover:text-teal-700 flex items-center gap-1 text-gray-600 transition-colors"
                      >
                        <ChevronRight className="w-3 h-3 text-teal-500" />
                        {guideSlugToTitle[relSlug] || relSlug}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-sm mb-3 uppercase tracking-wider text-teal-700" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Compare Accounts
                </h3>
                <ul className="space-y-2">
                  {[
                    { label: 'All Business Accounts', href: '/compare' },
                    { label: 'Free Accounts', href: '/category/free-business-accounts' },
                    { label: 'Sole Trader Accounts', href: '/category/sole-trader' },
                    { label: 'Limited Company', href: '/category/limited-company' },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-sm hover:text-teal-700 flex items-center gap-1 text-gray-600 transition-colors">
                        <ChevronRight className="w-3 h-3 text-teal-500" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick compare CTA */}
              <div className="rounded-xl p-5" style={{ background: '#0f172a' }}>
                <h3 className="font-bold text-sm mb-2 text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Find Your Best Account</h3>
                <p className="text-xs text-slate-400 mb-3">Compare all 22 UK business bank accounts side by side.</p>
                <Link
                  href="/compare"
                  className="block text-center text-xs font-semibold py-2 px-3 rounded-lg text-white transition-all hover:opacity-90"
                  style={{ background: '#0d9488' }}
                >
                  Compare Now
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
