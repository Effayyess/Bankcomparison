// Design: Authoritative Broadsheet | Legal pages
// Privacy Policy, Cookie Policy, Terms of Use, Editorial Policy

import { useParams, Link } from 'wouter';
import { ChevronRight, Shield } from 'lucide-react';
import NotFound from './NotFound';

interface LegalSection {
  heading: string;
  content: string;
}

interface LegalPage {
  title: string;
  h1: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

const legalPages: Record<string, LegalPage> = {
  'privacy-policy': {
    title: 'Privacy Policy | CompareBusiness Account',
    h1: 'Privacy Policy',
    lastUpdated: 'March 2025',
    intro: 'This Privacy Policy explains how CompareBusiness Account ("we", "us", "our") collects, uses, and protects your personal information when you visit our website at comparebusinessaccount.co.uk.',
    sections: [
      {
        heading: 'Information We Collect',
        content: `We may collect the following types of information when you visit our website:

**Information you provide directly:**
- Contact information (name, email address) if you contact us via email or a contact form
- Any other information you choose to provide to us

**Information collected automatically:**
- IP address and approximate location
- Browser type and version
- Pages visited and time spent on each page
- Referring website
- Device type (desktop, mobile, tablet)

**Cookies and tracking technologies:**
We use cookies and similar technologies to improve your experience on our website. Please see our Cookie Policy for more information.`,
      },
      {
        heading: 'How We Use Your Information',
        content: `We use the information we collect for the following purposes:

- To provide and improve our website and services
- To analyse how visitors use our website and identify areas for improvement
- To respond to enquiries you send to us
- To comply with our legal obligations
- To protect the security of our website

We do not sell your personal information to third parties. We do not use your information for direct marketing without your explicit consent.`,
      },
      {
        heading: 'Affiliate Links and Third Parties',
        content: `Our website contains affiliate links to bank and financial product websites. When you click on these links and open an account, we may receive a commission from the bank. This does not affect the price you pay or the terms of the account.

When you click on an affiliate link, you will be directed to a third-party website. We are not responsible for the privacy practices of these third-party websites and encourage you to read their privacy policies.

We use the following third-party services on our website:
- Google Analytics (website analytics)
- Umami Analytics (privacy-friendly analytics)

These services may collect information about your use of our website in accordance with their own privacy policies.`,
      },
      {
        heading: 'Data Retention',
        content: `We retain personal information only for as long as necessary for the purposes described in this policy, or as required by law. Analytics data is typically retained for 26 months.`,
      },
      {
        heading: 'Your Rights',
        content: `Under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, you have the following rights:

- **Right of access:** You can request a copy of the personal information we hold about you
- **Right to rectification:** You can ask us to correct inaccurate information
- **Right to erasure:** You can ask us to delete your personal information in certain circumstances
- **Right to restrict processing:** You can ask us to limit how we use your information
- **Right to data portability:** You can ask us to provide your information in a portable format
- **Right to object:** You can object to our processing of your information in certain circumstances

To exercise any of these rights, please contact us at privacy@comparebusinessaccount.co.uk.

You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.`,
      },
      {
        heading: 'Contact Us',
        content: `If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at:

Email: privacy@comparebusinessaccount.co.uk

We will respond to your enquiry within 30 days.`,
      },
    ],
  },

  'cookie-policy': {
    title: 'Cookie Policy | CompareBusiness Account',
    h1: 'Cookie Policy',
    lastUpdated: 'March 2025',
    intro: 'This Cookie Policy explains how CompareBusiness Account uses cookies and similar tracking technologies on our website. By continuing to use our website, you consent to our use of cookies as described in this policy.',
    sections: [
      {
        heading: 'What Are Cookies?',
        content: `Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.

Cookies can be "session cookies" (which expire when you close your browser) or "persistent cookies" (which remain on your device for a set period or until you delete them).`,
      },
      {
        heading: 'Types of Cookies We Use',
        content: `**Essential cookies:**
These cookies are necessary for the website to function properly. They cannot be disabled. They include cookies that remember your cookie preferences.

**Analytics cookies:**
We use analytics cookies to understand how visitors interact with our website. This helps us improve the user experience. We use Umami Analytics, a privacy-friendly analytics tool that does not use personal identifiers.

**Performance cookies:**
These cookies help us understand how the website performs and identify any issues. They collect anonymous information about page load times and errors.

**Third-party cookies:**
Some pages on our website may include content from third parties (such as embedded videos or social media buttons). These third parties may set their own cookies. We do not control these cookies and recommend you check the relevant third-party privacy policies.`,
      },
      {
        heading: 'Managing Cookies',
        content: `You can control and manage cookies in several ways:

**Browser settings:** Most browsers allow you to refuse or delete cookies through their settings. Please note that disabling cookies may affect the functionality of our website.

**Opt-out tools:** You can opt out of Google Analytics tracking at tools.google.com/dlpage/gaoptout.

**Cookie consent:** When you first visit our website, you will be asked to consent to non-essential cookies. You can change your preferences at any time.

For more information about managing cookies, visit aboutcookies.org or allaboutcookies.org.`,
      },
      {
        heading: 'Changes to This Policy',
        content: `We may update this Cookie Policy from time to time. We will notify you of any significant changes by posting a notice on our website. The date at the top of this policy indicates when it was last updated.`,
      },
    ],
  },

  'terms-of-use': {
    title: 'Terms of Use | CompareBusiness Account',
    h1: 'Terms of Use',
    lastUpdated: 'March 2025',
    intro: 'These Terms of Use govern your use of the CompareBusiness Account website at comparebusinessaccount.co.uk. By using our website, you agree to these terms. Please read them carefully.',
    sections: [
      {
        heading: 'About Our Website',
        content: `CompareBusiness Account is an independent comparison website that provides information about UK business bank accounts. We are not a bank, financial institution, or financial adviser.

The information on our website is provided for general informational purposes only and does not constitute financial, legal, or professional advice. Always seek professional advice before making financial decisions.`,
      },
      {
        heading: 'Accuracy of Information',
        content: `We make every effort to ensure that the information on our website is accurate and up to date. However, bank account terms, fees, and features change frequently, and we cannot guarantee that all information is current at the time you read it.

**Always verify information directly with the bank before applying for an account.** We are not responsible for any decisions made based on information on our website.

We update our data regularly, but we cannot guarantee that all information reflects the most current terms offered by banks.`,
      },
      {
        heading: 'Affiliate Relationships',
        content: `Our website contains affiliate links. When you click on these links and open a bank account, we may receive a commission from the bank. This commission is paid by the bank and does not affect the price you pay or the terms of the account.

Our editorial rankings and reviews are independent of our affiliate relationships. We do not rank accounts higher because we receive a higher commission. Please see our Editorial Policy for more information about how we maintain editorial independence.`,
      },
      {
        heading: 'Intellectual Property',
        content: `All content on this website, including text, graphics, logos, and images, is owned by or licensed to CompareBusiness Account and is protected by copyright law.

You may not reproduce, distribute, or create derivative works from our content without our express written permission. You may share links to our content, provided you attribute the source.`,
      },
      {
        heading: 'Limitation of Liability',
        content: `To the fullest extent permitted by law, CompareBusiness Account shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our website or reliance on information contained on it.

We do not accept liability for any loss or damage resulting from:
- Inaccurate or outdated information on our website
- Your reliance on information on our website when making financial decisions
- Technical issues or interruptions to our website
- Third-party websites linked from our website`,
      },
      {
        heading: 'Governing Law',
        content: `These Terms of Use are governed by the laws of England and Wales. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
      },
      {
        heading: 'Changes to These Terms',
        content: `We may update these Terms of Use from time to time. We will notify you of significant changes by posting a notice on our website. Your continued use of our website after changes are posted constitutes your acceptance of the updated terms.`,
      },
    ],
  },

  'editorial-policy': {
    title: 'Editorial Policy | CompareBusiness Account',
    h1: 'Editorial Policy',
    lastUpdated: 'March 2025',
    intro: 'CompareBusiness Account is committed to providing independent, accurate, and unbiased information to help UK business owners make informed decisions about their business banking. This Editorial Policy explains how we research, write, and maintain our content.',
    sections: [
      {
        heading: 'Our Independence',
        content: `CompareBusiness Account is an independent comparison website. We are not owned by, affiliated with, or funded by any bank or financial institution.

Our editorial team makes all ranking and recommendation decisions independently, based on our own research and assessment criteria. Commercial relationships (such as affiliate partnerships) do not influence our editorial rankings or the content of our reviews.

We do not accept payment for favourable reviews or higher rankings. If a bank approaches us requesting a favourable review, we decline.`,
      },
      {
        heading: 'How We Research and Rate Accounts',
        content: `Our ratings and rankings are based on a comprehensive assessment of each account, including:

**Fees and charges:**
- Monthly account fee
- Transaction fees (per payment, per transfer)
- Cash deposit and withdrawal fees
- International payment fees
- Other charges

**Features:**
- Accounting software integrations
- Invoicing tools
- Expense management
- International payment capabilities
- Multi-currency support
- Overdraft availability

**Safety and regulation:**
- FSCS protection status
- FCA authorisation
- Financial stability of the institution

**Customer experience:**
- App store ratings (iOS and Android)
- Trustpilot and other review platform scores
- Customer service quality
- Account opening speed and ease

**Value for money:**
- Overall cost relative to features offered
- Suitability for different business types

We weight these factors based on their importance to typical business banking customers.`,
      },
      {
        heading: 'Affiliate Relationships',
        content: `Some links on our website are affiliate links. When you click on these links and open a bank account, we may receive a commission from the bank. This is how we fund our editorial operations and keep our content free for users.

We are transparent about our affiliate relationships. Affiliate links are identified on our website.

**Affiliate relationships do not influence our rankings.** We rank accounts based on our independent assessment criteria, not on the commission rate we receive. Some accounts we rank highly may not have affiliate relationships with us.

We only include affiliate links for accounts we would recommend on their merits. We do not include affiliate links for accounts we consider poor value or unsuitable for most businesses.`,
      },
      {
        heading: 'Keeping Information Up to Date',
        content: `Bank account terms, fees, and features change frequently. We are committed to keeping our information as current as possible.

We review and update our account data on a monthly basis. When we become aware of significant changes (such as fee increases or new features), we update our content promptly.

Despite our best efforts, information may occasionally be out of date. We always recommend verifying current terms directly with the bank before applying for an account.

Each article and review displays the date it was last updated so you can assess how current the information is.`,
      },
      {
        heading: 'Corrections Policy',
        content: `We take accuracy seriously. If you believe any information on our website is incorrect, please contact us at editorial@comparebusinessaccount.co.uk. We will investigate and, if necessary, correct the information promptly.

Significant corrections will be noted in the relevant article.`,
      },
      {
        heading: 'Contact Our Editorial Team',
        content: `If you have questions about our editorial process, want to report an inaccuracy, or have a media enquiry, please contact us at:

Email: editorial@comparebusinessaccount.co.uk

We aim to respond to all editorial enquiries within 5 working days.`,
      },
    ],
  },

  'contact': {
    title: 'Contact Us | CompareBusiness Account',
    h1: 'Contact Us',
    lastUpdated: 'March 2025',
    intro: 'We are here to help. Whether you have a question about a business bank account, need help using our website, or want to provide feedback, please get in touch using the details below.',
    sections: [
      {
        heading: 'General Enquiries',
        content: `For general questions about our website, comparisons, or services:

Email: info@comparebusinessaccount.co.uk

We aim to respond to all general enquiries within 2-3 working days.`
      },
      {
        heading: 'Editorial & Corrections',
        content: `If you have spotted an inaccuracy on our website, want to suggest an update, or have a question about our editorial process:

Email: editorial@comparebusinessaccount.co.uk

Please include the URL of the page you are referring to in your email.`
      },
      {
        heading: 'Partnerships & Advertising',
        content: `If you represent a bank or financial institution and would like to discuss partnership opportunities:

Email: partnerships@comparebusinessaccount.co.uk`
      },
      {
        heading: 'Data Privacy',
        content: `For questions about how we handle your personal data, or to exercise your rights under the UK GDPR:

Email: privacy@comparebusinessaccount.co.uk`
      },
      {
        heading: 'Important Note',
        content: `CompareBusiness Account is an independent comparison website. **We are not a bank and we cannot access your bank account details, process transactions, or resolve issues with your specific bank.**

If you have a problem with your business bank account, you must contact your bank directly using the contact details provided on their official website or the back of your bank card.`
      }
    ]
  },
};

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function LegalPage({ slug: slugProp }: { slug?: string }) {
  const params = useParams<{ slug: string }>();
  const slug = slugProp || params.slug || '';
  const page = legalPages[slug];
  if (!page) {
    return <NotFound />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={page.title}
        description={page.intro.slice(0, 160)}
        canonicalPath={`/${slug}`}
        noIndex={slug === 'contact'}
      />
      <Navigation />
      <div style={{ paddingTop: '88px' }}>
        {/* Hero */}
        <div className="text-white py-10" style={{ background: '#0f172a' }}>
          <div className="container">
            <nav className="flex items-center gap-2 text-sm mb-4 text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-300">{page.h1}</span>
            </nav>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-gray-400">Last updated: {page.lastUpdated}</span>
            </div>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
              {page.h1}
            </h1>
          </div>
        </div>
        {/* Content */}
        <div className="container py-10">
          <div className="max-w-3xl">
            {/* Intro */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              <p className="text-base leading-relaxed text-gray-700">{page.intro}</p>
            </div>
            {/* Sections */}
            {page.sections.map((section) => (
              <div key={section.heading} className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {section.heading}
                </h2>
                <div>
                  {section.content.split('\n\n').map((para, i) => {
                    const formatted = para
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n- /g, '<br/>• ');
                    return (
                      <p
                        key={i}
                        className="text-sm leading-relaxed text-gray-600 mb-3 last:mb-0"
                        dangerouslySetInnerHTML={{ __html: formatted }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            {/* Other legal pages */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6 shadow-sm">
              <h3 className="font-bold text-sm text-gray-700 mb-3 uppercase tracking-wider">Other Legal Documents</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Cookie Policy', href: '/cookie-policy' },
                  { label: 'Terms of Use', href: '/terms-of-use' },
                  { label: 'Editorial Policy', href: '/editorial-policy' },
                ]
                  .filter((item) => !item.href.includes(slug))
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-teal-700 hover:text-teal-900 hover:underline px-3 py-1.5 rounded border border-gray-200 bg-gray-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
