// HowWeReview.tsx — Methodology page explaining how Business Bank Compare reviews accounts
// Addresses Google Quality Rater YMYL requirements and E-E-A-T signals
// Linked from every comparison table and review page

import { Link } from 'wouter';
import { CheckCircle, Search, BarChart2, RefreshCw, Users, Shield, Star, ChevronRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { authors } from '../lib/authorsData';

const methodologySchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'How We Review Business Bank Accounts | Our Methodology',
    description:
      'Learn how Business Bank Compare researches, tests, and rates UK business bank accounts. Our independent editorial methodology, scoring criteria, and review process explained.',
    url: 'https://businessbankcompare.co.uk/how-we-review',
    publisher: {
      '@type': 'Organization',
      name: 'Business Bank Compare',
      url: 'https://businessbankcompare.co.uk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://businessbankcompare.co.uk/logo-square.png',
      },
    },
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'en-GB',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Business Bank Compare rate business bank accounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We rate each account across six weighted criteria: monthly fees and transaction costs (25%), features and functionality (20%), account opening speed and eligibility (15%), customer support quality (15%), app and digital experience (15%), and FSCS protection and regulatory standing (10%). Each criterion is scored out of 5 and weighted to produce a final rating out of 5.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are your reviews independent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our editorial team researches and writes all reviews independently. While we may earn a commission if you open an account through one of our links, this never influences our ratings, verdicts, or the order in which accounts appear in our comparison tables. Affiliate relationships are clearly disclosed on every page.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often do you update your reviews?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We review and update all bank account data at least every three months, and immediately whenever a bank announces a fee change, new product, or significant update. Every review page displays a "Last Reviewed" date so you can see exactly when it was last verified.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who writes your reviews?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our reviews are written by a team of four specialist editors and analysts: James Hartley (Senior Finance Editor, 14+ years), Sarah Mitchell (Chartered Accountant, ACA), Oliver Chen (Fintech Analyst), and Priya Sharma (SME Banking Writer). Each author is assigned to the account types that match their specialism.',
        },
      },
    ],
  },
];

const scoringCriteria = [
  {
    icon: BarChart2,
    label: 'Fees & Costs',
    weight: '25%',
    description:
      'Monthly account fees, per-transaction charges, cash deposit rates, international transfer costs, and any hidden charges. We model the total cost for three business profiles: low-volume sole trader, mid-volume SME, and high-volume established business.',
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    icon: Star,
    label: 'Features & Functionality',
    weight: '20%',
    description:
      'Accounting integrations (Xero, QuickBooks, FreeAgent), invoicing tools, multi-user access, expense management, virtual cards, overdraft availability, and any unique features that add genuine value for business owners.',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: CheckCircle,
    label: 'Account Opening & Eligibility',
    weight: '15%',
    description:
      'How quickly an account can be opened, what documents are required, whether a credit check is performed, which business types and structures are accepted, and the ease of the application process.',
    color: '#059669',
    bg: '#ecfdf5',
  },
  {
    icon: Users,
    label: 'Customer Support',
    weight: '15%',
    description:
      'Availability of UK-based telephone support, in-app chat response times, dedicated business relationship managers, and the quality of help documentation. We assess support channels and average response times.',
    color: '#d97706',
    bg: '#fffbeb',
  },
  {
    icon: Search,
    label: 'App & Digital Experience',
    weight: '15%',
    description:
      'App Store and Google Play ratings, the quality of the mobile and web interface, availability of real-time notifications, payment scheduling, and the overall digital experience for day-to-day banking tasks.',
    color: '#0891b2',
    bg: '#ecfeff',
  },
  {
    icon: Shield,
    label: 'Safety & Regulation',
    weight: '10%',
    description:
      'Whether deposits are protected by the FSCS (up to £85,000 for current accounts, £1m for temporary high balances), the bank\'s FCA authorisation status, and its financial stability and track record.',
    color: '#dc2626',
    bg: '#fef2f2',
  },
];

const reviewProcess = [
  {
    step: '01',
    title: 'Research & Data Collection',
    description:
      'Our analysts collect fee schedules, product terms, and feature lists directly from each bank\'s official website and published tariff documents. We do not rely on press releases or marketing materials.',
  },
  {
    step: '02',
    title: 'Hands-On Testing',
    description:
      'Where possible, our team opens or tests accounts directly to verify the application process, app quality, and customer support responsiveness. We document the experience from a business owner\'s perspective.',
  },
  {
    step: '03',
    title: 'Scoring & Peer Review',
    description:
      'Each review is scored against our six weighted criteria by the assigned author, then peer-reviewed by a second team member to ensure consistency and accuracy before publication.',
  },
  {
    step: '04',
    title: 'Regular Updates',
    description:
      'All reviews are updated at least quarterly, and immediately when a bank announces changes to fees, products, or features. The "Last Reviewed" date on every page reflects the most recent verification.',
  },
  {
    step: '05',
    title: 'Affiliate Disclosure',
    description:
      'We clearly disclose any affiliate relationships on every page. Commission never affects our ratings or editorial independence — accounts are rated and ranked solely on merit.',
  },
];

export default function HowWeReview() {
  const year = new Date().getFullYear();
  const teamList = Object.values(authors);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
      <SEO
        title={`How We Review Business Bank Accounts | Our Methodology ${year}`}
        description="Learn how Business Bank Compare independently researches, tests, and rates UK business bank accounts. Our editorial methodology, scoring criteria, and review process explained in full."
        keywords="how we review business bank accounts, business bank compare methodology, independent bank review process, how business bank accounts are rated UK"
        canonicalPath="/how-we-review"
        ogType="website"
        dateModified={new Date().toISOString().split('T')[0]}
        breadcrumbs={[
          { name: 'Home', url: 'https://businessbankcompare.co.uk/' },
          { name: 'How We Review', url: 'https://businessbankcompare.co.uk/how-we-review' },
        ]}
        schema={methodologySchema}
      />
      <Navigation />

      <div style={{ paddingTop: '88px' }}>
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="container py-3">
            <nav className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-blue-600 no-underline">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 font-medium">How We Review</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section style={{ background: '#0f172a' }} className="py-12">
          <div className="container">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: 'rgba(37,99,235,0.2)', color: '#93c5fd' }}>
                <Shield className="w-3.5 h-3.5" />
                Editorial Independence
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                How We Review Business Bank Accounts
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                Every review on Business Bank Compare is produced by a named specialist editor using a transparent,
                six-criteria scoring methodology. Our ratings are never influenced by commercial relationships.
                Here is exactly how we research, test, and rate UK business bank accounts.
              </p>
            </div>
          </div>
        </section>

        <div className="container py-12">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Our Principles */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                Our Editorial Principles
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Business Bank Compare was founded on the principle that UK business owners deserve honest, expert,
                and genuinely independent guidance on their banking options. Our editorial team operates under
                three core commitments:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Shield, title: 'Independence', desc: 'Our ratings and verdicts are determined solely by our editorial team. No bank can pay to improve its rating or ranking.' },
                  { icon: RefreshCw, title: 'Accuracy', desc: 'All fee data, rates, and product details are verified directly from official bank sources and updated at least quarterly.' },
                  { icon: Users, title: 'Expertise', desc: 'Every review is written by a named specialist with verifiable credentials in finance, accountancy, or fintech.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: '#eff6ff' }}>
                      <Icon className="w-4.5 h-4.5 text-blue-600" style={{ width: '18px', height: '18px' }} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Scoring Criteria */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                Our Scoring Criteria
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Each business bank account is scored across six weighted criteria. Scores are given out of 5 for
                each criterion, then multiplied by their weighting to produce a final overall rating out of 5.
              </p>
              <div className="space-y-4">
                {scoringCriteria.map(({ icon: Icon, label, weight, description, color, bg }) => (
                  <div key={label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: bg }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-gray-900 text-sm">{label}</h3>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: bg, color }}>
                          {weight} weighting
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Review Process */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                Our Review Process
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Every review follows a consistent five-step process to ensure accuracy, fairness, and editorial integrity.
              </p>
              <div className="space-y-4">
                {reviewProcess.map(({ step, title, description }) => (
                  <div key={step} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                      style={{ background: '#0f172a', color: '#93c5fd' }}>
                      {step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Our Team */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                Our Editorial Team
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                All reviews and guides are written by one of our four specialist editors. Each author is assigned
                to account types and guide topics that match their professional specialism.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamList.map((author) => (
                  <div key={author.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={author.photo}
                        alt={author.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-gray-100"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{author.name}</h3>
                        <p className="text-xs text-blue-600 font-medium">{author.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">{author.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {author.credentials.map((cred) => (
                        <span key={cred} className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd' }}>
                          {cred}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Affiliate Disclosure */}
            <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                Affiliate & Commercial Disclosure
              </h2>
              <p className="text-sm text-amber-800 leading-relaxed">
                Business Bank Compare may earn a commission when you open an account through one of our affiliate
                links. These commercial relationships never influence our editorial ratings, verdicts, or the order
                in which accounts appear in our comparison tables. All affiliate links are clearly marked with
                "We may earn a commission" notices. Our editorial team operates independently of our commercial
                team, and no bank can pay to improve its review score or comparison ranking.
              </p>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'How does Business Bank Compare rate business bank accounts?',
                    a: 'We rate each account across six weighted criteria: monthly fees and transaction costs (25%), features and functionality (20%), account opening speed and eligibility (15%), customer support quality (15%), app and digital experience (15%), and FSCS protection and regulatory standing (10%). Each criterion is scored out of 5 and weighted to produce a final rating out of 5.',
                  },
                  {
                    q: 'Are your reviews independent?',
                    a: 'Yes. Our editorial team researches and writes all reviews independently. While we may earn a commission if you open an account through one of our links, this never influences our ratings, verdicts, or the order in which accounts appear in our comparison tables. Affiliate relationships are clearly disclosed on every page.',
                  },
                  {
                    q: 'How often do you update your reviews?',
                    a: 'We review and update all bank account data at least every three months, and immediately whenever a bank announces a fee change, new product, or significant update. Every review page displays a "Last Reviewed" date so you can see exactly when it was last verified.',
                  },
                  {
                    q: 'Who writes your reviews?',
                    a: 'Our reviews are written by a team of four specialist editors and analysts: James Hartley (Senior Finance Editor, 14+ years), Sarah Mitchell (Chartered Accountant, ACA), Oliver Chen (Fintech Analyst), and Priya Sharma (SME Banking Writer). Each author is assigned to the account types that match their specialism.',
                  },
                  {
                    q: 'Does Business Bank Compare accept payment for reviews?',
                    a: 'No. We do not accept payment for reviews, and banks cannot pay to be included in or excluded from our comparisons. Our comparison tables include all major UK business bank accounts regardless of whether we have an affiliate relationship with them.',
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{q}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="rounded-2xl p-6 text-center" style={{ background: '#0f172a' }}>
              <h3 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                Ready to compare business bank accounts?
              </h3>
              <p className="text-sm mb-4 text-slate-300">
                Use our independent comparison tool to find the best account for your business.
              </p>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 text-white no-underline"
                style={{ background: '#2563eb' }}
              >
                Compare All Accounts
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
