// BankReview — individual bank review page
// Matches original buscompare design: teal accents, Sora font, structured review layout
import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { Star, Check, X, ExternalLink, ChevronRight, Shield, Zap, Globe } from 'lucide-react';
import { banks, getBankBySlug } from '@/lib/bankData';
import { authors, bankAuthorMap } from '@/lib/authorsData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AuthorByline from '@/components/AuthorByline';

function StarRating({ rating, large }: { rating: number; large?: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={large ? 'w-5 h-5' : 'w-4 h-4'}
          style={{
            fill: star <= Math.round(rating) ? '#f59e0b' : 'none',
            color: star <= Math.round(rating) ? '#f59e0b' : '#d1d5db',
          }}
        />
      ))}
    </div>
  );
}

export default function BankReview() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || '';
  const bank = getBankBySlug(slug);
  const [imgError, setImgError] = useState(false);

  if (!bank) {
    return (
      <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
        <Navigation />
        <div className="container py-20 text-center" style={{ paddingTop: '120px' }}>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bank review not found</h1>
          <p className="text-gray-600 mb-6">We couldn't find a review for that bank account.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-semibold no-underline">
            ← Back to comparisons
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentMonth = new Date().toLocaleString('en-GB', { month: 'long', year: 'numeric' });
  const relatedBanks = banks.filter((b) => b.id !== bank.id && b.type === bank.type).slice(0, 4);
  const year = new Date().getFullYear();

  // Resolve author for this bank
  const authorId = bankAuthorMap[slug] || 'james-hartley';
  const author = authors[authorId];

  const reviewSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FinancialProduct',
      name: `${bank.name} Business Bank Account`,
      description: bank.summary,
      brand: { '@type': 'Brand', name: bank.provider },
      offers: {
        '@type': 'Offer',
        price: bank.monthlyFeeNum,
        priceCurrency: 'GBP',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: bank.monthlyFeeNum,
          priceCurrency: 'GBP',
          billingDuration: 'P1M',
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: bank.rating,
        bestRating: 5,
        worstRating: 1,
        ratingCount: 1,
      },
      review: {
        '@type': 'Review',
        name: `${bank.name} Business Bank Account Review ${year}`,
        reviewBody: bank.summary,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: bank.rating,
          bestRating: 5,
          worstRating: 1,
        },
        author: author
          ? {
              '@type': 'Person',
              name: author.name,
              jobTitle: author.role,
              url: `https://businessbankcompare.co.uk/how-we-review`,
              image: `https://businessbankcompare.co.uk${author.photo}`,
            }
          : {
              '@type': 'Organization',
              name: 'Business Bank Compare',
              url: 'https://businessbankcompare.co.uk',
            },
        publisher: {
          '@type': 'Organization',
          name: 'Business Bank Compare',
          url: 'https://businessbankcompare.co.uk',
          logo: {
            '@type': 'ImageObject',
            url: 'https://businessbankcompare.co.uk/logo-square.png',
          },
        },
        datePublished: '2026-01-01',
        dateModified: new Date().toISOString().split('T')[0],
      },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
      <SEO
        title={`${bank.name} Business Bank Account Review ${year} | Fees, Features & Verdict`}
        description={`${bank.name} business bank account review ${year}: ${bank.tagline}. Monthly fee: ${bank.monthlyFee}. Rated ${bank.rating}/5. Independent expert review covering fees, features, pros and cons.`}
        keywords={`${bank.name} review, ${bank.name} business bank account, ${bank.provider} business account, ${bank.name} fees ${year}, ${bank.name} business banking UK, ${bank.name} business account review, is ${bank.name} good for business`}
        canonicalPath={`/${slug}`}
        ogType="article"
        dateModified={new Date().toISOString().split('T')[0]}
        breadcrumbs={[
          { name: 'Home', url: 'https://businessbankcompare.co.uk/' },
          { name: 'Compare Accounts', url: 'https://businessbankcompare.co.uk/compare' },
          { name: `${bank.name} Review`, url: `https://businessbankcompare.co.uk/${slug}` },
        ]}
        schema={reviewSchema}
      />
      <Navigation />

      <div style={{ paddingTop: '88px' }}>
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="container py-3">
            <nav className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-blue-600 no-underline">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/compare" className="hover:text-blue-600 no-underline">Compare Accounts</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 font-medium">{bank.name} Business Bank Review</span>
            </nav>
          </div>
        </div>

        {/* Review header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container py-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Logo */}
              <div className="w-20 h-20 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden bg-white shadow-sm flex-shrink-0">
                {!imgError ? (
                  <img
                    src={bank.logo}
                    alt={`${bank.provider} logo`}
                    className="w-14 h-14 object-contain"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: bank.logoColor }}
                  >
                    {bank.provider.substring(0, 4).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {bank.badge && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'oklch(0.93 0.04 210)', color: 'oklch(0.35 0.12 210)' }}
                    >
                      {bank.badge}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                    {bank.type === 'highstreet' ? 'High Street Bank' : bank.type === 'digital' ? 'Digital Bank' : 'Challenger Bank'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {bank.name} Business Bank Review {new Date().getFullYear()}
                </h1>
                <p className="text-gray-500 text-sm mb-3">{bank.provider}</p>
                <div className="flex items-center gap-3 mb-3">
                  <StarRating rating={bank.rating} large />
                  <span className="font-bold text-gray-900">{bank.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">{bank.ratingLabel}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">{bank.tagline}</p>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 flex-shrink-0 md:min-w-44">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{bank.monthlyFee}</div>
                  <div className="text-xs text-gray-500">per month</div>
                </div>
                <a
                  href={bank.affiliateUrl || '#'}
                  target={bank.affiliateUrl ? '_blank' : undefined}
                  rel={bank.affiliateUrl ? 'noopener noreferrer sponsored' : undefined}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 no-underline"
                  style={{ background: '#2563eb' }}
                >
                  Open Account <ExternalLink className="w-3.5 h-3.5" />
                </a>
                {bank.welcomeOffer && (
                  <div className="text-xs text-center text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    🎁 {bank.welcomeOffer}
                  </div>
                )}
                <p className="text-xs text-gray-400 text-center">Updated {currentMonth}</p>
              </div>
            </div>

            {/* Author byline — shown below the header row */}
            <div className="mt-5">
              <AuthorByline authorId={authorId} lastReviewed={currentMonth} variant="compact" showMethodologyLink={false} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Author byline — full version in main content */}
              <AuthorByline authorId={authorId} lastReviewed={currentMonth} variant="full" />

              {/* Quick facts */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Quick Facts
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Monthly Fee', value: bank.monthlyFee },
                    { label: 'Free Transfers', value: bank.freeTransfers },
                    { label: 'ATM Withdrawals', value: bank.atmWithdrawals },
                    { label: 'Cash Deposits', value: bank.cashDeposits },
                    { label: 'Spending Abroad', value: bank.spendingAbroad },
                    { label: 'Opening Fee', value: bank.openingFee },
                    { label: 'Credit Check', value: bank.creditCheck ? 'Required' : 'Not required' },
                    { label: 'Cheque Deposits', value: bank.chequeDeposits ? 'Yes' : 'No' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                      <div className="text-sm font-semibold text-gray-800">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Our Verdict
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">{bank.summary}</p>
              </div>

              {/* Pros & Cons */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Pros &amp; Cons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Pros
                    </h3>
                    <ul className="space-y-2">
                      {bank.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-500" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-1.5">
                      <X className="w-4 h-4" /> Cons
                    </h3>
                    <ul className="space-y-2">
                      {bank.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                          <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-red-400" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Plans */}
              {bank.plans && bank.plans.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Available Plans
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bank.plans.map((plan) => (
                      <div
                        key={plan.name}
                        className="rounded-xl border border-gray-200 p-4 hover:border-blue-300 transition-colors"
                      >
                        <div className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                          {plan.name}
                        </div>
                        <div className="text-xl font-bold mb-1" style={{ color: '#0f172a' }}>
                          {plan.price}
                        </div>
                        <div className="text-xs text-gray-500 mb-3">{plan.priceNote}</div>
                        {plan.highlight && (
                          <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg mb-3">
                            {plan.highlight}
                          </div>
                        )}
                        <ul className="space-y-1.5">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-1.5 text-xs text-gray-700">
                              <Check className="w-3 h-3 flex-shrink-0 mt-0.5 text-emerald-500" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accounting integrations */}
              {bank.accountingIntegrations.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Accounting Integrations
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {bank.accountingIntegrations.map((acc) => (
                      <span
                        key={acc}
                        className="px-3 py-1.5 rounded-full text-sm font-medium border"
                        style={{ background: '#f0fdfa', color: '#0f766e', borderColor: '#ccfbf1' }}
                      >
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Welcome offer */}
              {bank.welcomeOffer && (
                <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
                  <h2 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                    🎁 Current Welcome Offer
                  </h2>
                  <p className="text-amber-800 font-semibold mb-2">{bank.welcomeOffer}</p>
                  {bank.welcomeOfferDetail && (
                    <p className="text-amber-700 text-sm leading-relaxed">{bank.welcomeOfferDetail}</p>
                  )}
                </div>
              )}

              {/* Detailed review sections */}
              {bank.reviewContent && bank.reviewContent.length > 0 && bank.reviewContent.map((section) => (
                <div key={section.heading} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {section.heading}
                  </h2>
                  <div className="text-gray-700 text-sm leading-relaxed space-y-3">
                    {section.body.split('\n').map((line, idx) => {
                      const trimmed = line.trim();
                      if (!trimmed) return null;
                      // Bullet points: lines starting with - or •
                      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                        const text = trimmed.replace(/^[-•]\s+/, '');
                        return (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#2563eb', marginTop: '6px' }} />
                            <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                          </div>
                        );
                      }
                      // Sub-headings: lines ending with ':' or starting with ##
                      if (trimmed.endsWith(':') && trimmed.length < 80) {
                        return (
                          <p key={idx} className="font-semibold text-gray-900 mt-4 mb-1">
                            {trimmed}
                          </p>
                        );
                      }
                      // Numbered list items
                      if (/^\d+\.\s/.test(trimmed)) {
                        const text = trimmed.replace(/^\d+\.\s+/, '');
                        const num = trimmed.match(/^(\d+)\./)?.[1];
                        return (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white" style={{ background: '#2563eb', marginTop: '1px' }}>{num}</span>
                            <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                          </div>
                        );
                      }
                      // Regular paragraph
                      return (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Bottom author byline — methodology link */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
                <span>
                  Reviewed by <strong className="text-gray-700">{author?.name}</strong>, {author?.role} · Last reviewed: {currentMonth}
                </span>
                <Link href="/how-we-review" className="text-blue-600 hover:text-blue-800 font-medium no-underline">
                  How we review →
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Key features — dark navy matching footer */}
              <div className="rounded-2xl p-5 text-white" style={{ background: '#0f172a', border: '1px solid #1e293b' }}>
                <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Key Features
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'FSCS Protected', value: bank.fscsProtection, icon: <Shield className="w-4 h-4" /> },
                    { label: 'International Payments', value: bank.internationalPayments, icon: <Globe className="w-4 h-4" /> },
                    { label: 'Fast Opening', value: bank.hasFastOpening, icon: <Zap className="w-4 h-4" /> },
                    { label: 'Branch Access', value: bank.hasBranchAccess, icon: <span className="text-sm">🏦</span> },
                    { label: 'Cash Deposits', value: bank.hasCashDeposits, icon: <span className="text-sm">💵</span> },
                    { label: 'Accounting Integration', value: bank.hasAccounting, icon: <span className="text-sm">📊</span> },
                    { label: 'No Credit Check', value: bank.hasNoCreditCheck, icon: <span className="text-sm">✅</span> },
                    { label: 'Overdraft Available', value: bank.overdraft, icon: <span className="text-sm">💳</span> },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="flex items-center justify-between gap-2 py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        <span style={{ color: '#2563eb' }}>{icon}</span>
                        {label}
                      </div>
                      {value ? (
                        <div className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: '#2563eb' }}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                          <X className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.3)' }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable for — dark navy matching footer */}
              <div className="rounded-2xl p-5" style={{ background: '#0f172a', border: '1px solid #1e293b' }}>
                <h3 className="text-sm font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Suitable For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {bank.suitableFor.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                      style={{ backgroundColor: 'rgba(13,148,136,0.15)', color: '#5eead4', border: '1px solid rgba(13,148,136,0.3)' }}
                    >
                      {s.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Business types — dark navy matching footer */}
              {bank.businessTypes.length > 0 && (
                <div className="rounded-2xl p-5" style={{ background: '#0f172a', border: '1px solid #1e293b' }}>
                  <h3 className="text-sm font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Business Types Accepted
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {bank.businessTypes.map((bt) => (
                      <span
                        key={bt}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
                      >
                        {bt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA box */}
              <div
                className="rounded-2xl p-5 text-white"
                style={{ background: '#0f172a', border: '1px solid #1e293b' }}
              >
                <h3 className="font-bold text-sm mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Ready to open an account?
                </h3>
                <p className="text-xs text-white/80 mb-4 leading-relaxed">
                  Click below to visit {bank.provider}'s website and start your application.
                </p>
                <a
                  href={bank.affiliateUrl || '#'}
                  target={bank.affiliateUrl ? '_blank' : undefined}
                  rel={bank.affiliateUrl ? 'noopener noreferrer sponsored' : undefined}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 no-underline"
                  style={{ background: '#2563eb', color: 'white' }}
                >
                  Open Account <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-xs text-white/50 text-center mt-2">
                  We may earn a commission. This doesn't affect our review.
                </p>
              </div>

              {/* Compare with similar */}
              {relatedBanks.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <h3 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Compare With Similar Banks
                  </h3>
                  <div className="space-y-2">
                    {relatedBanks.map((b) => (
                      <Link
                        key={b.id}
                        href={`/${b.slug}`}
                        className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors no-underline"
                      >
                        <div>
                          <div className="text-xs font-semibold text-gray-800">{b.name}</div>
                          <div className="text-xs text-gray-500">{b.monthlyFee}/mo</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/compare"
                    className="block text-center text-xs font-semibold text-blue-600 mt-3 no-underline hover:text-blue-800"
                  >
                    Compare all accounts →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
