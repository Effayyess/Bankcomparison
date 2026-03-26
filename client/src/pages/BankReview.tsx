// Design: Authoritative Broadsheet | Bank Review page
// Long-form editorial review with sticky sidebar, pros/cons, key facts table

import { useParams, Link } from 'wouter';
import { Star, Check, X, ExternalLink, ChevronRight, ArrowLeft } from 'lucide-react';
import { getBankBySlug, banks } from '@/lib/bankData';
import NotFound from './NotFound';

function StarRating({ rating, large }: { rating: number; large?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={large ? 'w-5 h-5' : 'w-4 h-4'}
          fill={i <= Math.round(rating) ? 'oklch(0.72 0.12 82)' : 'transparent'}
          style={{ color: 'oklch(0.72 0.12 82)' }}
        />
      ))}
      <span className={`font-bold ml-1 ${large ? 'text-2xl' : 'text-base'}`} style={{ color: 'oklch(0.18 0.02 65)' }}>
        {rating.toFixed(1)}
      </span>
      <span className="text-sm" style={{ color: 'oklch(0.55 0.01 65)' }}>/5</span>
    </div>
  );
}

function BankLogo({ bank }: { bank: ReturnType<typeof getBankBySlug> }) {
  if (!bank) return null;
  return (
    <img
      src={bank.logoUrl}
      alt={`${bank.name} logo`}
      className="w-16 h-16 object-contain rounded-xl border border-gray-100 bg-white p-2"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
      }}
    />
  );
}

// Generate review content based on bank data
function generateReviewContent(bank: NonNullable<ReturnType<typeof getBankBySlug>>) {
  const isAppOnly = bank.type === 'app-only';
  const isFree = bank.monthlyFee === 0;
  const hasFSCS = bank.fscsProtected;

  return {
    intro: `${bank.name} is ${isAppOnly ? 'a digital-first' : 'a well-established'} UK business bank account that has built a strong reputation among ${bank.suitability.slice(0, 2).join(' and ')} businesses. ${isFree ? 'One of its most attractive features is that the core account is completely free to open and maintain, with no monthly fee.' : `The account comes with a monthly fee of £${bank.monthlyFee}, which covers a range of features designed for growing businesses.`} In this review, we examine whether ${bank.name} is the right choice for your business.`,

    overview: `${bank.name} ${isAppOnly ? 'operates entirely through its mobile app, with no physical branches.' : 'offers both digital banking and access to a branch network across the UK.'} The account is designed primarily for ${bank.suitability.slice(0, 3).join(', ')} businesses, and offers ${bank.internationalPayments ? 'international payment capabilities' : 'domestic payment processing'} alongside ${bank.accountingIntegrations.slice(0, 2).join(' and ')} integrations.

${hasFSCS ? 'Importantly, deposits are protected by the Financial Services Compensation Scheme (FSCS) up to £85,000 per person — giving business owners peace of mind that their funds are safe.' : 'It is worth noting that this account is provided by an e-money institution rather than a fully licensed bank, meaning deposits are not covered by the FSCS. Instead, funds are held in segregated accounts as required by the FCA.'}`,

    fees: `${isFree ? `The standard ${bank.name} account has no monthly fee, making it one of the most cost-effective business banking options available. ${bank.plans && bank.plans.length > 1 ? `However, paid plans are available for businesses that need additional features — starting from £${bank.plans.find(p => p.monthlyFee && p.monthlyFee > 0)?.monthlyFee}/month.` : ''}` : `${bank.name} charges £${bank.monthlyFee} per month for its business account. ${bank.freePeriodNote ? bank.freePeriodNote + '.' : ''}`}

Transaction fees are ${bank.transactions.toLowerCase().includes('free') ? 'free for standard transfers, which is excellent value for businesses with high transaction volumes.' : `charged at ${bank.transactions.toLowerCase()}, which is worth factoring in if your business makes many payments each month.`}

Cash deposits are handled ${bank.cashDeposit.toLowerCase().includes('not') ? 'via alternative methods, as direct cash deposits are not supported — a limitation for cash-heavy businesses.' : `via ${bank.cashDeposit.toLowerCase()}.`}`,

    verdict: `${bank.name} is ${bank.rating >= 4.5 ? 'an excellent choice' : bank.rating >= 4.0 ? 'a strong choice' : 'a solid option'} for ${bank.suitability.slice(0, 2).join(' and ')} businesses in the UK. ${bank.bestFor ? `It particularly stands out as the ${bank.bestFor.toLowerCase()} on the market right now.` : ''} The combination of ${bank.pros.slice(0, 2).join(' and ').toLowerCase()} makes it worth serious consideration.

The main drawbacks to be aware of are ${bank.cons.slice(0, 2).join(' and ').toLowerCase()}. For businesses that can work around these limitations, ${bank.name} represents ${isFree ? 'exceptional value' : 'good value for money'}.

Our rating of ${bank.rating}/5 reflects its strong overall offering, though as with any financial product, we recommend checking the latest terms directly with ${bank.name} before applying.`,
  };
}

export default function BankReview() {
  const params = useParams<{ slug: string }>();
  const bank = getBankBySlug(params.slug || '');

  if (!bank) {
    return <NotFound />;
  }

  const content = generateReviewContent(bank);
  const relatedBanks = banks.filter((b) => b.id !== bank.id && b.suitability.some((s) => bank.suitability.includes(s))).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.98 0.008 85)' }}>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200" style={{ background: 'white' }}>
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm" style={{ color: 'oklch(0.55 0.01 65)' }}>
            <Link href="/" className="hover:underline" style={{ color: 'oklch(0.28 0.09 155)' }}>Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/compare" className="hover:underline" style={{ color: 'oklch(0.28 0.09 155)' }}>Compare</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{bank.name} Review</span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Review header */}
            <div className="bank-card p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <BankLogo bank={bank} />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {bank.editorChoice && (
                      <span className="badge-gold text-xs">⭐ Editor's Choice</span>
                    )}
                    {bank.bestFor && (
                      <span className="badge-green text-xs">{bank.bestFor}</span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                    {bank.name} Review {new Date().getFullYear()}
                  </h1>
                  <p className="text-base mb-3" style={{ color: 'oklch(0.45 0.01 65)' }}>{bank.tagline}</p>
                  <StarRating rating={bank.rating} large />
                  <p className="text-sm mt-1" style={{ color: 'oklch(0.6 0.01 65)' }}>
                    Based on {bank.reviewCount.toLocaleString()} customer reviews
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:min-w-36">
                  <a
                    href={bank.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center justify-center gap-1.5 px-5 py-3 rounded font-semibold text-sm transition-all hover:opacity-90"
                    style={{ background: 'oklch(0.28 0.09 155)', color: 'white' }}
                  >
                    Open Account
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-center" style={{ color: 'oklch(0.6 0.01 65)' }}>
                    Opens on {bank.name}'s website
                  </p>
                </div>
              </div>
            </div>

            {/* Key facts table */}
            <div className="bank-card p-6 mb-6">
              <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                Key Facts
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Monthly Fee', value: bank.monthlyFee === 0 ? 'Free' : bank.monthlyFee === null ? 'Custom' : `£${bank.monthlyFee}/month` },
                  { label: 'Transactions', value: bank.transactions },
                  { label: 'Cash Deposits', value: bank.cashDeposit },
                  { label: 'FSCS Protected', value: bank.fscsProtected ? 'Yes (up to £85k)' : 'No' },
                  { label: 'International Payments', value: bank.internationalPayments ? 'Yes' : 'No' },
                  { label: 'Multi-Currency', value: bank.multiCurrency ? 'Yes' : 'No' },
                  { label: 'Overdraft', value: bank.overdraft ? 'Available' : 'Not available' },
                  { label: 'Account Opening', value: bank.openingTime },
                  { label: 'Minimum Deposit', value: bank.minimumDeposit },
                ].map((fact) => (
                  <div key={fact.label} className="p-3 rounded-lg" style={{ background: 'oklch(0.97 0.005 85)' }}>
                    <div className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(0.55 0.01 65)' }}>
                      {fact.label}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: 'oklch(0.18 0.02 65)' }}>
                      {fact.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="bank-card p-6 mb-6">
              <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                Pros &amp; Cons
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5" style={{ color: 'oklch(0.28 0.09 155)' }}>
                    <Check className="w-4 h-4" /> Advantages
                  </h3>
                  <ul className="space-y-2">
                    {bank.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm" style={{ color: 'oklch(0.3 0.02 65)' }}>
                        <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.45 0.12 155)' }} />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5" style={{ color: 'oklch(0.55 0.2 27)' }}>
                    <X className="w-4 h-4" /> Disadvantages
                  </h3>
                  <ul className="space-y-2">
                    {bank.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm" style={{ color: 'oklch(0.3 0.02 65)' }}>
                        <X className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.55 0.2 27)' }} />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Review body */}
            <div className="bank-card p-6 mb-6">
              <div className="prose-editorial">
                <h2>Overview</h2>
                <p>{content.intro}</p>
                <p>{content.overview}</p>

                <h2>Fees &amp; Charges</h2>
                <p>{content.fees}</p>

                {bank.plans && bank.plans.length > 1 && (
                  <>
                    <h3>Available Plans</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 not-prose">
                      {bank.plans.map((plan) => (
                        <div key={plan.name} className="rounded-lg p-3 border border-gray-200 bg-gray-50">
                          <div className="font-semibold text-sm mb-1" style={{ color: 'oklch(0.28 0.09 155)', fontFamily: 'DM Sans, sans-serif' }}>{plan.name}</div>
                          <div className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {plan.monthlyFee === 0 ? 'Free' : plan.monthlyFee === null ? 'Custom' : `£${plan.monthlyFee}/mo`}
                          </div>
                          <div className="text-xs mt-1 text-gray-500">{plan.bestFor}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <h2>Accounting Integrations</h2>
                <p>
                  {bank.name} integrates with the following accounting software:{' '}
                  {bank.accountingIntegrations.join(', ')}. This makes it straightforward to keep your bookkeeping up to date and reduces the time spent on manual data entry.
                </p>

                <h2>Who Is {bank.name} Best For?</h2>
                <p>
                  Based on our analysis, {bank.name} is particularly well-suited to:{' '}
                  {bank.suitability.map((s) => s.replace(/-/g, ' ')).join(', ')} businesses.
                  {bank.bestFor ? ` It is our pick for the ${bank.bestFor.toLowerCase()} category.` : ''}
                </p>

                <h2>Our Verdict</h2>
                <p>{content.verdict}</p>
              </div>
            </div>

            {/* Features */}
            <div className="bank-card p-6 mb-6">
              <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                Features at a Glance
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'FSCS Protection', value: bank.fscsProtected },
                  { label: 'International Payments', value: bank.internationalPayments },
                  { label: 'Multi-Currency', value: bank.multiCurrency },
                  { label: 'Overdraft', value: bank.overdraft },
                  { label: 'No Monthly Fee', value: bank.monthlyFee === 0 },
                  { label: 'Same-Day Opening', value: bank.openingTime === 'Same day' },
                ].map((feature) => (
                  <div key={feature.label} className="flex items-center gap-2 text-sm">
                    {feature.value ? (
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: 'oklch(0.45 0.12 155)' }} />
                    ) : (
                      <X className="w-4 h-4 flex-shrink-0" style={{ color: 'oklch(0.55 0.2 27)' }} />
                    )}
                    <span style={{ color: 'oklch(0.3 0.02 65)' }}>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bank-card p-6 mb-6 text-center" style={{ background: 'oklch(0.28 0.09 155)' }}>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.98 0.01 85)' }}>
                Ready to open a {bank.name} account?
              </h3>
              <p className="text-sm mb-4" style={{ color: 'oklch(0.8 0.02 85)' }}>
                Opening takes {bank.openingTime.toLowerCase()}. No minimum deposit required.
              </p>
              <a
                href={bank.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: 'oklch(0.72 0.12 82)', color: 'oklch(0.15 0.04 155)' }}
              >
                Open {bank.name} Account
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs mt-3" style={{ color: 'oklch(0.65 0.02 85)' }}>
                Affiliate link — we may earn a commission at no cost to you
              </p>
            </div>

            {/* Related banks */}
            {relatedBanks.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                  You Might Also Consider
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedBanks.map((related) => (
                    <Link
                      key={related.id}
                      href={`/review/${related.slug}`}
                      className="bank-card p-4 hover:no-underline group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={related.logoUrl}
                          alt={related.name}
                          className="w-8 h-8 object-contain rounded"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <span className="font-semibold text-sm group-hover:underline" style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.18 0.02 65)' }}>
                          {related.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" fill="oklch(0.72 0.12 82)" style={{ color: 'oklch(0.72 0.12 82)' }} />
                        <span className="text-sm font-bold" style={{ color: 'oklch(0.18 0.02 65)' }}>{related.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: 'oklch(0.55 0.01 65)' }}>
                        {related.monthlyFee === 0 ? 'Free' : `£${related.monthlyFee}/mo`} · {related.type.replace('-', ' ')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Quick verdict */}
              <div className="bank-card p-5">
                <h3 className="font-bold text-sm mb-3 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif', color: 'oklch(0.28 0.09 155)' }}>
                  Our Verdict
                </h3>
                <StarRating rating={bank.rating} large />
                <p className="text-sm mt-2 mb-4" style={{ color: 'oklch(0.45 0.01 65)' }}>
                  {bank.rating >= 4.5 ? 'Outstanding' : bank.rating >= 4.0 ? 'Excellent' : bank.rating >= 3.5 ? 'Good' : 'Average'} — {bank.bestFor || `Good for ${bank.suitability[0]?.replace(/-/g, ' ')}`}
                </p>
                <a
                  href={bank.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: 'oklch(0.28 0.09 155)', color: 'white' }}
                >
                  Open Account
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Key details */}
              <div className="bank-card p-5">
                <h3 className="font-bold text-sm mb-3 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif', color: 'oklch(0.28 0.09 155)' }}>
                  Key Details
                </h3>
                <dl className="space-y-2">
                  {[
                    { dt: 'Monthly Fee', dd: bank.monthlyFee === 0 ? 'Free' : `£${bank.monthlyFee}/mo` },
                    { dt: 'Transactions', dd: bank.transactions },
                    { dt: 'FSCS', dd: bank.fscsProtected ? '✓ Protected' : '✗ Not protected' },
                    { dt: 'Opening Time', dd: bank.openingTime },
                  ].map((item) => (
                    <div key={item.dt} className="flex justify-between text-sm">
                      <dt style={{ color: 'oklch(0.55 0.01 65)' }}>{item.dt}</dt>
                      <dd className="font-medium" style={{ color: 'oklch(0.18 0.02 65)' }}>{item.dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Back to compare */}
              <Link
                href="/compare"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: 'oklch(0.28 0.09 155)' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all accounts
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
