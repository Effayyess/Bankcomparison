// Design: Authoritative Broadsheet | Guide articles
// Long-form editorial guides with table of contents, related guides sidebar

import { useParams, Link } from 'wouter';
import { ChevronRight, BookOpen } from 'lucide-react';
import NotFound from './NotFound';

const GUIDE_HERO = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=80';

interface GuideSection {
  id: string;
  heading: string;
  content: string;
}

interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: GuideSection[];
  relatedGuides: string[];
}

const guides: Record<string, Guide> = {
  'how-to-open-a-business-bank-account': {
    slug: 'how-to-open-a-business-bank-account',
    title: 'How to Open a Business Bank Account UK 2025 | Step-by-Step Guide',
    metaDescription: 'Step-by-step guide to opening a UK business bank account. Learn what documents you need, how long it takes, and which banks are easiest to open with.',
    h1: 'How to Open a Business Bank Account in the UK',
    intro: 'Opening a business bank account is one of the first and most important steps for any UK business owner. Whether you are a sole trader, limited company director, or startup founder, having a dedicated business account keeps your finances organised, looks professional to clients, and makes tax time significantly easier. This guide walks you through the entire process.',
    sections: [
      {
        id: 'do-you-need-one',
        heading: 'Do You Need a Business Bank Account?',
        content: `Whether you are legally required to have a business bank account depends on your business structure.

**Limited companies** are legally required to have a business bank account. A limited company is a separate legal entity from its directors, and all company income and expenditure must pass through a company account. Using a personal account for company transactions is a breach of your legal obligations.

**Sole traders** are not legally required to have a separate business account — HMRC does not mandate it. However, it is strongly recommended for several reasons:

- It makes completing your self-assessment tax return much easier
- It looks more professional when invoicing clients
- It helps you track your business income and expenses clearly
- Some clients and suppliers may require a business account to pay you
- It protects your personal finances from business liabilities

The good news is that many excellent business bank accounts are available completely free, so there is little reason not to open one.`,
      },
      {
        id: 'what-you-need',
        heading: 'What Documents Do You Need?',
        content: `The documents required to open a business bank account vary depending on the bank and your business structure. Here is what you will typically need:

**For all businesses:**
- Proof of identity: passport, driving licence, or national identity card
- Proof of address: utility bill, bank statement, or council tax bill (usually within 3 months)
- Your business address
- Your business's nature and expected turnover

**For limited companies, you will also need:**
- Your Companies House registration number
- Your company's registered address
- Details of all directors and significant shareholders (those owning 25%+ of shares)
- Your company's Memorandum and Articles of Association (usually available from Companies House)

**For sole traders:**
- Your UTR (Unique Taxpayer Reference) number if you have one
- Details of your business activities

**For partnerships:**
- Partnership agreement
- Details of all partners

Most app-only banks (Starling, Monzo, Tide) allow you to verify your identity digitally using your phone camera — no need to visit a branch or post documents.`,
      },
      {
        id: 'how-to-apply',
        heading: 'How to Apply: Step by Step',
        content: `**Step 1: Choose the right account**
Before applying, compare your options carefully. Consider: monthly fees, transaction costs, accounting integrations, whether you need branch access, and whether FSCS protection is important to you. Our comparison tool can help you find the best account for your needs.

**Step 2: Gather your documents**
Collect all the documents listed above before starting your application. Having everything ready will speed up the process significantly.

**Step 3: Start your application**
For app-only banks (Starling, Monzo, Tide, Revolut): download the app and follow the in-app application process. You will typically need to take photos of your ID and a selfie for identity verification.

For high street banks (Barclays, NatWest, HSBC, Lloyds): you can usually start online but may need to visit a branch to complete the process. Some banks now allow fully online applications.

**Step 4: Wait for approval**
App-only banks typically approve accounts within minutes to a few hours. High street banks can take 3–7 business days. Some applications may require additional information or a credit check.

**Step 5: Set up your account**
Once approved, set up your online banking, order any debit cards, and connect your accounting software. Notify your clients and suppliers of your new account details.`,
      },
      {
        id: 'how-long-does-it-take',
        heading: 'How Long Does It Take?',
        content: `The time to open a business bank account varies significantly between providers:

| Bank | Typical Opening Time |
|------|---------------------|
| Starling Bank | Same day (often minutes) |
| Monzo Business | Same day |
| Tide | Same day |
| Revolut Business | 1–2 days |
| Wise Business | 1–3 days |
| Barclays Business | 3–5 days |
| NatWest Business | 3–5 days |
| HSBC Business | 5–7 days |
| Lloyds Business | 3–5 days |

If you need a business account urgently, an app-only bank is your best option. Starling Bank in particular is known for its fast, smooth application process.`,
      },
      {
        id: 'tips',
        heading: 'Tips for a Smooth Application',
        content: `**Have your documents ready before you start.** Incomplete applications are the most common reason for delays. Gather everything on the list above before beginning.

**Be accurate about your business.** Banks will ask about your business type, expected turnover, and the nature of your transactions. Answer honestly — providing false information could result in your account being closed later.

**Check your credit history.** Some banks (particularly high street banks) will run a credit check on the business and/or its directors. If you have a poor credit history, consider banks with higher acceptance rates like Cashplus or Zempler.

**Consider your future needs.** The cheapest account is not always the best account. Think about whether you will need international payments, an overdraft, or a relationship manager as your business grows.

**Read the fee schedule carefully.** Some accounts that appear free charge for specific transactions. Always read the full fee schedule before opening.`,
      },
    ],
    relatedGuides: ['best-free-business-bank-accounts', 'sole-trader-business-bank-account', 'business-bank-account-fees'],
  },

  'best-free-business-bank-accounts': {
    slug: 'best-free-business-bank-accounts',
    title: 'Best Free Business Bank Accounts UK 2025 | No Monthly Fee',
    metaDescription: 'The best free UK business bank accounts with no monthly fee. Compare Starling, Monzo, Tide and more — find the right free account for your business.',
    h1: 'Best Free Business Bank Accounts UK 2025',
    intro: 'The good news for UK business owners is that some of the best business bank accounts available are completely free. You do not need to pay a monthly fee to get a high-quality, feature-rich business account. In this guide, we round up the best free business bank accounts and explain what to look for.',
    sections: [
      {
        id: 'best-free-accounts',
        heading: 'Our Top Free Business Bank Accounts',
        content: `**1. Starling Bank — Best Overall Free Account**
Starling Bank is our top pick for a free business bank account. It is a fully licensed bank (meaning FSCS protection up to £85,000), charges no monthly fee, and offers free UK transfers. The mobile app is consistently rated among the best in the market, and it integrates with Xero, QuickBooks, and FreeAgent. Cash deposits are available via Post Office for £3.

**2. Monzo Business (Lite) — Best for Startups**
Monzo's free Lite plan is an excellent option for startups and small businesses. It offers free UK transfers, FSCS protection, and good accounting integrations. The app is excellent. For businesses that need more features, the Pro plan at £5/month is worth considering.

**3. Tide (Free Plan) — Best for Invoicing**
Tide's free plan is popular with sole traders and small businesses, particularly for its strong invoicing tools. Note that it charges 20p per transfer on the free plan, which can add up for businesses with high transaction volumes. Tide is an e-money institution, so deposits are not FSCS protected.

**4. ANNA Money (Pay as You Go) — Best for Tax Management**
ANNA's free Pay as You Go plan is excellent for sole traders who want built-in tax management. It charges 20p per payment but includes automatic tax estimates, VAT preparation, and invoice chasing. Not FSCS protected.`,
      },
      {
        id: 'what-to-look-for',
        heading: 'What to Look for in a Free Business Account',
        content: `Not all free accounts are created equal. Here is what to check before opening:

**Transaction fees:** Some accounts that are free to open charge per transaction. Tide charges 20p per transfer on its free plan. Starling and Monzo charge nothing for UK transfers.

**Cash deposit fees:** Most app-only banks charge for cash deposits. Starling charges £3 per Post Office deposit. Monzo charges £1 via PayPoint. If you regularly handle cash, factor this in.

**FSCS protection:** Only fully licensed banks offer FSCS protection. Among free accounts, Starling Bank is the standout — it is FSCS protected. Monzo, Tide, and Revolut are e-money institutions and not FSCS protected, though your money is held in segregated accounts.

**Accounting integrations:** Check which accounting software the account integrates with. Most major free accounts support Xero and QuickBooks.

**International payments:** If you need to send or receive international payments, check whether this is supported and at what cost. Starling supports international payments; Tide's free plan does not.`,
      },
      {
        id: 'free-vs-paid',
        heading: 'Free vs Paid: When Should You Pay?',
        content: `For most small businesses, a free account will be perfectly adequate. However, there are situations where a paid account may be worth considering:

**You need unlimited transactions:** If your business makes many payments each month, a paid plan with unlimited transactions (like Monzo Pro at £5/month or Tide Plus at £9.99/month) may be cheaper than paying per transaction.

**You need more features:** Paid plans typically include additional features like expense cards for employees, cashback on spending, and priority customer support.

**You need a high street bank:** High street banks like Barclays, NatWest, and HSBC charge monthly fees after their free introductory periods, but offer branch access, overdrafts, and relationship managers that app-only banks cannot provide.

**You have high cash handling needs:** If you regularly deposit large amounts of cash, a high street bank with free in-branch deposits may work out cheaper than paying per deposit at a Post Office.`,
      },
    ],
    relatedGuides: ['how-to-open-a-business-bank-account', 'sole-trader-business-bank-account', 'business-bank-account-fees'],
  },

  'sole-trader-business-bank-account': {
    slug: 'sole-trader-business-bank-account',
    title: 'Best Sole Trader Business Bank Accounts UK 2025',
    metaDescription: 'Do sole traders need a business bank account? Which is best? Our guide covers everything sole traders need to know about business banking.',
    h1: 'Sole Trader Business Bank Accounts: The Complete Guide',
    intro: 'As a sole trader, you have more flexibility than limited company directors when it comes to business banking — but that does not mean you should ignore it. This guide explains everything sole traders need to know about business bank accounts, including whether you need one, the best options available, and how to choose the right account for your business.',
    sections: [
      {
        id: 'do-sole-traders-need-account',
        heading: 'Do Sole Traders Need a Business Bank Account?',
        content: `The short answer is no — sole traders are not legally required to have a separate business bank account. Unlike limited companies (which are separate legal entities and must have their own accounts), sole traders and their businesses are legally the same entity.

However, while it is not a legal requirement, having a separate business account is strongly recommended for several important reasons:

**Tax purposes:** HMRC requires sole traders to keep accurate records of their business income and expenses. Having a dedicated business account makes this much easier and reduces the risk of errors on your self-assessment tax return.

**Professionalism:** Paying invoices from a personal account can look unprofessional. A business account in your trading name looks more credible to clients and suppliers.

**Financial clarity:** Mixing personal and business finances makes it very difficult to understand how your business is actually performing. A separate account gives you a clear picture of your business finances.

**Accounting software:** Most accounting software works best when connected to a dedicated business account, as it can automatically categorise transactions.

**Protection:** While sole traders have unlimited personal liability, keeping finances separate can help demonstrate the business nature of expenses if HMRC ever questions your tax return.`,
      },
      {
        id: 'best-accounts',
        heading: 'Best Business Bank Accounts for Sole Traders',
        content: `**Starling Bank — Our Top Pick**
Starling is our top recommendation for sole traders. It is completely free, FSCS protected, and offers an excellent mobile app with built-in invoicing, spending insights, and accounting integrations. You can open an account in minutes.

**ANNA Money — Best for Tax Management**
ANNA is specifically designed for sole traders and small businesses. It includes automatic tax estimates, VAT return preparation, and invoice chasing. The Pay as You Go plan is free (with 20p per payment), or £14.90/month for unlimited transactions.

**Tide — Best for Invoicing**
Tide has strong built-in invoicing tools and is popular with sole traders. The free plan charges 20p per transfer, but the Plus plan (£9.99/month) includes unlimited transfers and additional features.

**Countingup — Best for Accounting**
Countingup combines a business bank account with built-in accounting software, making it ideal for sole traders who want everything in one place. It includes automatic tax estimates, receipt capture, and invoicing.`,
      },
      {
        id: 'what-to-consider',
        heading: 'What to Consider When Choosing',
        content: `**Monthly fees:** Many excellent sole trader accounts are free. Unless you need specific features that require a paid plan, start with a free account.

**Transaction volumes:** If you make many payments each month, check whether the account charges per transaction. Starling and Monzo's free plans have no transaction fees; Tide charges 20p per transfer.

**Cash handling:** If your business handles cash regularly (e.g., market stalls, tradespeople), consider how the account handles cash deposits. Most app-only banks charge for cash deposits.

**Accounting needs:** If you use accounting software like Xero or QuickBooks, check that the account integrates with it. Most major accounts do.

**Tax management:** If you struggle with self-assessment, consider an account with built-in tax tools like ANNA Money or Countingup.

**FSCS protection:** If you keep significant funds in your account, FSCS protection (available with Starling) provides peace of mind.`,
      },
    ],
    relatedGuides: ['how-to-open-a-business-bank-account', 'best-free-business-bank-accounts', 'business-bank-account-fees'],
  },

  'limited-company-business-bank-account': {
    slug: 'limited-company-business-bank-account',
    title: 'Best Limited Company Business Bank Accounts UK 2025',
    metaDescription: 'Limited companies must have a business bank account. Compare the best UK business bank accounts for limited companies and find the right one for your company.',
    h1: 'Limited Company Business Bank Accounts: The Complete Guide',
    intro: 'If you operate a limited company in the UK, having a separate business bank account is not optional — it is a legal requirement. Your limited company is a separate legal entity from you as a director, and all company finances must be kept entirely separate from your personal finances. This guide explains everything you need to know about choosing the right account for your limited company.',
    sections: [
      {
        id: 'why-required',
        heading: 'Why Limited Companies Must Have a Business Account',
        content: `A limited company is a distinct legal entity, separate from its directors and shareholders. This means:

- The company owns its own assets and owes its own debts
- Company money is not your money — it belongs to the company
- You must not mix company and personal finances

Using a personal bank account for company transactions is a serious breach of your legal obligations as a director. It could result in:

- HMRC treating company money as personal income (and taxing it accordingly)
- Difficulty obtaining loans or investment
- Problems if the company is ever audited
- Potential personal liability for company debts

The account must be in the company's name (not your personal name), and all company income and expenditure must pass through it.`,
      },
      {
        id: 'best-accounts',
        heading: 'Best Business Bank Accounts for Limited Companies',
        content: `**Starling Bank — Best Overall**
Starling is our top recommendation for limited companies. It is free, FSCS protected, and offers an excellent range of features including accounting integrations, invoicing, and international payments. The application process is quick and straightforward.

**Monzo Business — Best for Startups**
Monzo Business is excellent for new limited companies. The free Lite plan is a good starting point, with the Pro plan (£5/month) offering additional features as you grow.

**Revolut Business — Best for International**
If your limited company operates internationally, Revolut Business is worth considering. It offers multi-currency accounts, competitive exchange rates, and strong expense management tools.

**Barclays Business — Best High Street Option**
For limited companies that need branch access, overdrafts, or a relationship manager, Barclays Business is our top high street recommendation. It is free for the first 12 months.

**NatWest Business — Best for New Companies**
NatWest offers 24 months free for new businesses, making it an attractive option for recently incorporated companies.`,
      },
      {
        id: 'what-to-consider',
        heading: 'Key Considerations for Limited Companies',
        content: `**Director requirements:** Most banks require all directors to verify their identity when opening a limited company account. Make sure all directors are available to complete the verification process.

**Shareholder information:** Banks are required by law to identify significant shareholders (those owning 25% or more of shares). Have this information ready.

**Companies House registration:** You will need your company registration number and registered address. Make sure your Companies House details are up to date.

**Future funding needs:** If you plan to seek investment or a business loan, consider whether your bank can support this. High street banks typically have more lending options than app-only banks.

**International payments:** If your company trades internationally, ensure your account supports international payments at competitive rates.

**Accounting software:** Most limited companies use accounting software. Check that your chosen bank integrates with your preferred software (Xero, QuickBooks, Sage, FreeAgent).`,
      },
    ],
    relatedGuides: ['how-to-open-a-business-bank-account', 'best-free-business-bank-accounts', 'switching-business-bank-account'],
  },

  'switching-business-bank-account': {
    slug: 'switching-business-bank-account',
    title: 'How to Switch Business Bank Accounts UK 2025 | Complete Guide',
    metaDescription: 'Thinking of switching your business bank account? Our step-by-step guide makes switching easy. Find out how long it takes and what to watch out for.',
    h1: 'How to Switch Your Business Bank Account',
    intro: 'Many business owners stay with their current bank out of inertia, even when they are unhappy with the service or fees. The good news is that switching your business bank account is much easier than most people think. This guide walks you through the process step by step.',
    sections: [
      {
        id: 'when-to-switch',
        heading: 'When Should You Switch?',
        content: `There are many good reasons to switch your business bank account:

**High fees:** If you are paying monthly fees that you could avoid with a free account like Starling or Monzo, switching could save you hundreds of pounds per year.

**Poor customer service:** If you consistently struggle to get help when you need it, it may be time to move to a bank with better support.

**Missing features:** If your current account lacks features you need — such as accounting integrations, international payments, or expense management — a switch could significantly improve your day-to-day banking.

**Better interest rates:** Some accounts now offer interest on credit balances, which can be valuable if you maintain a significant balance.

**Better app experience:** If you find your current bank's app frustrating to use, modern app-only banks offer significantly better digital experiences.`,
      },
      {
        id: 'how-to-switch',
        heading: 'How to Switch: Step by Step',
        content: `**Step 1: Choose your new bank**
Research your options carefully before switching. Consider fees, features, FSCS protection, and accounting integrations. Use our comparison tool to find the best account for your needs.

**Step 2: Open your new account**
Apply for your new account before closing your old one. For app-only banks, this can be done in minutes. Keep both accounts open during the transition period.

**Step 3: Update your payment details**
Notify everyone who pays you or who you pay:
- Clients: send updated bank details for future invoices
- Suppliers: update your payment details with each supplier
- HMRC: update your bank details for tax refunds
- Payroll: update your payroll software if you have employees
- Direct debits: transfer all direct debits to your new account
- Standing orders: recreate any standing orders on your new account

**Step 4: Wait for all transactions to clear**
Allow at least 2–4 weeks for all pending transactions to clear before closing your old account. Check your old account regularly for any unexpected payments.

**Step 5: Close your old account**
Once you are confident all transactions have moved across, contact your old bank to close the account. Get written confirmation of the closure.`,
      },
      {
        id: 'current-account-switch-service',
        heading: 'The Current Account Switch Service',
        content: `The Current Account Switch Service (CASS) is a free service that makes switching bank accounts easier. However, it is important to note that CASS is primarily designed for personal accounts and not all business banks participate.

Banks that participate in CASS for business accounts include Barclays, NatWest, Lloyds, HSBC, and Santander. App-only banks like Starling, Monzo, and Tide do not participate in CASS.

If your new bank participates in CASS, the switch takes 7 working days and includes:
- Automatic transfer of all direct debits and standing orders
- Automatic redirection of payments to your old account for 3 years
- Guaranteed refund if anything goes wrong

If your new bank does not participate in CASS, you will need to manually transfer your direct debits and standing orders, which takes more time but is still straightforward.`,
      },
    ],
    relatedGuides: ['how-to-open-a-business-bank-account', 'best-free-business-bank-accounts', 'business-bank-account-fees'],
  },

  'business-bank-account-fees': {
    slug: 'business-bank-account-fees',
    title: 'Business Bank Account Fees Explained UK 2025',
    metaDescription: 'A complete guide to UK business bank account fees. Monthly fees, transaction charges, cash deposit fees, international transfer fees — everything explained.',
    h1: 'Business Bank Account Fees Explained',
    intro: 'Understanding the fees associated with business bank accounts is essential for choosing the right account and managing your costs. Business bank account fees can be complex, with multiple different charges applying in different circumstances. This guide explains every type of fee you might encounter.',
    sections: [
      {
        id: 'monthly-fees',
        heading: 'Monthly Account Fees',
        content: `The monthly account fee is the most visible cost of a business bank account. It is a fixed charge for maintaining the account, regardless of how much you use it.

**Free accounts:** Many excellent accounts are available with no monthly fee, including Starling Bank, Monzo Business (Lite), and Tide (Free plan). These are suitable for most small businesses.

**Paid accounts:** High street banks typically charge £6–£8.50/month after an initial free period. Some app-only banks offer paid tiers with additional features (e.g., Monzo Pro at £5/month, Tide Plus at £9.99/month).

**Free introductory periods:** Most high street banks offer free banking for new businesses, typically for 12–24 months. NatWest and Royal Bank of Scotland offer 24 months free; Barclays, Lloyds, and HSBC offer 12 months.

**Is a monthly fee worth paying?** It depends on what you get for it. A £8/month fee is justified if it includes unlimited transactions, cash deposits, and branch access. For businesses that primarily bank digitally and have low cash handling needs, a free account is usually the better choice.`,
      },
      {
        id: 'transaction-fees',
        heading: 'Transaction Fees',
        content: `Transaction fees are charges for individual payments in or out of your account. They vary significantly between providers:

**Free transactions:** Starling Bank, Monzo Business (all plans), and Revolut Business (within monthly allowance) charge nothing for UK bank transfers.

**Per-transaction fees:** Tide's free plan charges 20p per transfer. ANNA Money's Pay as You Go plan charges 20p per payment. These can add up quickly for businesses with high transaction volumes.

**High street banks:** Most high street banks include a set number of free transactions in their monthly fee, with charges for additional transactions. Barclays, for example, charges 35p per transaction above the free allowance.

**Faster Payments:** Most accounts now include Faster Payments (same-day UK transfers) at no additional cost.

**CHAPS payments:** CHAPS (same-day guaranteed transfers, typically for large amounts) usually incur a fee of £15–£30 per payment.`,
      },
      {
        id: 'cash-fees',
        heading: 'Cash Deposit and Withdrawal Fees',
        content: `Cash handling fees are particularly important for businesses that regularly deal with cash — retailers, tradespeople, market traders, and hospitality businesses.

**High street banks:** Generally offer free or low-cost cash deposits at branches. This is one of the main advantages of high street banks for cash-heavy businesses.

**App-only banks:** Most charge for cash deposits:
- Starling Bank: £3 per deposit at Post Office
- Monzo Business: £1 per deposit at PayPoint
- Tide: £1 per deposit at Post Office
- Revolut Business: Cash deposits not available

**Cash withdrawal fees:** Most accounts allow free ATM withdrawals up to a monthly limit, with fees for withdrawals above the limit.

**Coin deposits:** Many banks no longer accept coin deposits, or charge significant fees for them. Check this if your business handles large amounts of coins.`,
      },
      {
        id: 'international-fees',
        heading: 'International Payment Fees',
        content: `International payment fees can be significant if your business trades globally. There are typically two components:

**Transfer fees:** A flat fee or percentage charged for sending money abroad. High street banks typically charge £15–£25 per international transfer. Wise Business charges a small percentage (typically 0.4–1%) with no flat fee.

**Exchange rate margin:** Banks add a margin on top of the mid-market exchange rate when converting currencies. High street banks typically add 2–3%. Wise Business uses the real mid-market rate with no margin.

**Receiving international payments:** Some accounts charge for receiving international payments. Check this if you invoice overseas clients.

**Multi-currency accounts:** Wise Business, Revolut Business, and Airwallex allow you to hold multiple currencies and convert at competitive rates, which can significantly reduce costs for businesses with regular international transactions.`,
      },
    ],
    relatedGuides: ['how-to-open-a-business-bank-account', 'best-free-business-bank-accounts', 'switching-business-bank-account'],
  },
};

const guideSlugToTitle: Record<string, string> = {
  'how-to-open-a-business-bank-account': 'How to Open a Business Account',
  'best-free-business-bank-accounts': 'Best Free Business Accounts',
  'sole-trader-business-bank-account': 'Sole Trader Banking Guide',
  'limited-company-business-bank-account': 'Limited Company Banking',
  'switching-business-bank-account': 'Switching Business Banks',
  'business-bank-account-fees': 'Business Account Fees Explained',
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
      {/* Hero — matches site's navy hero style */}
      <section className="relative overflow-hidden" style={{ background: '#0f172a', minHeight: '220px' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 100%)', opacity: 0.95 }} />
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
  );
}
