export interface GuideSection {
  id: string;
  heading: string;
  content: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: GuideSection[];
  relatedGuides: string[];
}

export interface GuideCategory {
  id: string;
  title: string;
  description: string;
  guides: string[];
}

export const guideCategories: GuideCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Essential guides for opening and understanding business bank accounts.',
    guides: [
      'how-to-open-a-business-bank-account',
      'business-account-vs-personal-account',
      'digital-vs-high-street-banks',
      'business-bank-account-for-bad-credit'
    ]
  },
  {
    id: 'business-types',
    title: 'By Business Type',
    description: 'Tailored banking advice for sole traders, limited companies, and more.',
    guides: [
      'sole-trader-business-bank-account',
      'limited-company-business-bank-account',
      'do-sole-traders-need-a-business-bank-account'
    ]
  },
  {
    id: 'account-management',
    title: 'Account Management',
    description: 'Guides on switching, closing, and managing your business account.',
    guides: [
      'switching-business-bank-account',
      'how-to-close-a-business-bank-account',
      'what-is-a-business-overdraft',
      'how-to-change-business-bank-account-details'
    ]
  },
  {
    id: 'fees-and-security',
    title: 'Fees & Security',
    description: 'Understand account costs and how your money is protected.',
    guides: [
      'business-bank-account-fees',
      'fscs-protection-explained'
    ]
  },
  {
    id: 'tools-and-software',
    title: 'Tools & Software',
    description: 'Maximize your account with accounting software and international features.',
    guides: [
      'best-free-business-bank-accounts',
      'best-accounting-software-for-small-businesses',
      'international-business-payments-guide'
    ]
  }
];

export const guidesData: Record<string, Guide> = {
  'how-to-open-a-business-bank-account': {
    slug: 'how-to-open-a-business-bank-account',
    title: 'How to Open a Business Bank Account UK 2026 | Step-by-Step Guide',
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

The good news is that many excellent business bank accounts are available completely free, so there is little reason not to open one.`
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

Most app-only banks (Starling, Monzo, Tide) allow you to verify your identity digitally using your phone camera — no need to visit a branch or post documents.`
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
Once approved, set up your online banking, order any debit cards, and connect your accounting software. Notify your clients and suppliers of your new account details.`
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

If you need a business account urgently, an app-only bank is your best option. Starling Bank in particular is known for its fast, smooth application process.`
      },
      {
        id: 'tips',
        heading: 'Tips for a Smooth Application',
        content: `**Have your documents ready before you start.** Incomplete applications are the most common reason for delays. Gather everything on the list above before beginning.

**Be accurate about your business.** Banks will ask about your business type, expected turnover, and the nature of your transactions. Answer honestly — providing false information could result in your account being closed later.

**Check your credit history.** Some banks (particularly high street banks) will run a credit check on the business and/or its directors. If you have a poor credit history, consider banks with higher acceptance rates like Cashplus or Zempler.

**Consider your future needs.** The cheapest account is not always the best account. Think about whether you will need international payments, an overdraft, or a relationship manager as your business grows.

**Read the fee schedule carefully.** Some accounts that appear free charge for specific transactions. Always read the full fee schedule before opening.`
      }
    ],
    relatedGuides: ['business-account-vs-personal-account', 'digital-vs-high-street-banks']
  },
  'business-account-vs-personal-account': {
    slug: 'business-account-vs-personal-account',
    title: 'Business Account vs Personal Account: What\'s the Difference?',
    metaDescription: 'Understanding the key differences between business and personal bank accounts, and why you should keep them separate.',
    h1: 'Business Account vs Personal Account',
    intro: 'When starting a new venture, many entrepreneurs wonder if they can simply use their existing personal bank account. While it might seem easier initially, mixing business and personal finances often leads to complications. This guide explains the key differences and why keeping them separate is crucial.',
    sections: [
      {
        id: 'key-differences',
        heading: 'The Key Differences',
        content: `While both types of accounts allow you to store money, make transfers, and use a debit card, business accounts are designed specifically for commercial use.

**1. Legal Structure**
Personal accounts are held in your name as an individual. Business accounts can be held in the name of your limited company, partnership, or your trading name as a sole trader.

**2. Terms and Conditions**
Almost all banks state in their personal account terms and conditions that the account must not be used for business purposes. If they detect high volumes of commercial transactions, they may freeze or close your account.

**3. Features and Integrations**
Business accounts offer features you won't find on personal accounts, such as:
- Integration with accounting software (Xero, QuickBooks)
- Bulk payment processing
- Multi-user access for employees or accountants
- Invoicing tools
- Corporate expense cards

**4. Cost Structure**
Personal accounts in the UK are generally free for everyday banking. Business accounts often charge monthly fees or transaction fees, though free options exist (like Starling and Monzo Lite).`
      },
      {
        id: 'why-separate',
        heading: 'Why You Should Keep Them Separate',
        content: `**Legal Requirements**
If you operate as a limited company, you are legally required to have a separate business account. The company is a distinct legal entity, and its money must be kept separate from your personal funds.

**Tax and Accounting**
Mixing finances makes bookkeeping a nightmare. When it's time to file your tax return, you'll have to comb through every transaction to determine if it was a personal expense (like groceries) or a business expense (like software subscriptions). A dedicated account provides a clean audit trail.

**Professional Image**
When you invoice a client, asking them to pay into an account named 'John Smith' looks less professional than an account named 'Smith Consulting Ltd'. It builds trust and credibility with your customers.

**Protecting Your Credit Rating**
Keeping finances separate helps protect your personal credit score from any business financial difficulties, and vice versa.`
      }
    ],
    relatedGuides: ['how-to-open-a-business-bank-account', 'do-sole-traders-need-a-business-bank-account']
  },
  'digital-vs-high-street-banks': {
    slug: 'digital-vs-high-street-banks',
    title: 'Digital vs High Street Banks: Which is Better for Business?',
    metaDescription: 'Compare digital challenger banks like Starling and Monzo against traditional high street banks like HSBC and Barclays to find the best fit.',
    h1: 'Digital vs High Street Banks',
    intro: 'The UK business banking landscape has transformed dramatically over the last decade. Traditional high street banks now face fierce competition from digital-only "challenger" banks. Deciding between the two is one of the most important choices for a new business.',
    sections: [
      {
        id: 'digital-banks',
        heading: 'Digital Banks (Challengers)',
        content: `Digital banks, such as Starling, Monzo, Tide, and Revolut, operate entirely online or via smartphone apps, without physical branches.

**Pros:**
- **Fast setup:** Accounts can often be opened in minutes using your smartphone.
- **Lower fees:** Many offer completely free accounts with no monthly fees.
- **Better technology:** Their apps are generally superior, offering real-time notifications, instant categorization, and seamless accounting integrations.
- **Innovative features:** Built-in invoicing, receipt capture, and tax estimation tools are common.

**Cons:**
- **No physical branches:** You cannot speak to someone face-to-face.
- **Cash handling:** Depositing cash usually incurs a fee and must be done via the Post Office or PayPoint.
- **Lending limits:** They typically offer smaller overdrafts and fewer loan products than traditional banks.`
      },
      {
        id: 'high-street-banks',
        heading: 'High Street Banks',
        content: `Traditional banks like Barclays, HSBC, Lloyds, and NatWest have been serving UK businesses for centuries.

**Pros:**
- **Branch access:** Ideal if you prefer face-to-face support or regularly handle cash and cheques.
- **Comprehensive lending:** Better equipped to provide large business loans, commercial mortgages, and complex credit facilities.
- **Dedicated managers:** Larger businesses may get a dedicated relationship manager.
- **Established trust:** Some clients and suppliers prefer dealing with businesses that use traditional, well-known banks.

**Cons:**
- **Slower setup:** Opening an account can take days or weeks and may require a branch visit.
- **Higher fees:** While they often offer 12-24 months free for startups, monthly fees and transaction charges apply thereafter.
- **Legacy technology:** Their apps and online banking platforms are often less intuitive than those of digital challengers.`
      },
      {
        id: 'which-to-choose',
        heading: 'Which Should You Choose?',
        content: `**Choose a Digital Bank if:**
- You are a freelancer, contractor, or startup.
- You want to open an account quickly.
- You rarely handle cash.
- You want the best mobile app experience and integrations.

**Choose a High Street Bank if:**
- You run a cash-heavy business (like a retail shop or cafe).
- You anticipate needing significant business loans or complex financing.
- You prefer in-person banking support.`
      }
    ],
    relatedGuides: ['how-to-open-a-business-bank-account', 'business-bank-account-fees']
  },
  'business-bank-account-for-bad-credit': {
    slug: 'business-bank-account-for-bad-credit',
    title: 'Business Bank Accounts for Bad Credit | UK Guide',
    metaDescription: 'Having poor credit doesn\'t mean you can\'t open a business account. Find the best guaranteed acceptance and no-credit-check business bank accounts.',
    h1: 'Business Bank Accounts for Bad Credit',
    intro: 'A poor credit history can make opening a business bank account challenging, especially with traditional high street banks. However, several modern providers offer accounts with no hard credit checks, ensuring that past financial difficulties don\'t prevent you from running your business.',
    sections: [
      {
        id: 'why-banks-check',
        heading: 'Why Do Banks Check Your Credit?',
        content: `When you apply for a business bank account, traditional banks usually perform a 'hard' credit check on both the business (if it has a history) and the directors. They do this to assess the risk of offering you credit facilities, such as an overdraft or a business credit card.

If you have a low credit score, CCJs (County Court Judgments), or a history of bankruptcy, traditional banks like Barclays or HSBC may decline your application, even if you only want a basic current account without an overdraft.`
      },
      {
        id: 'no-credit-check-accounts',
        heading: 'No Credit Check Alternatives',
        content: `Fortunately, many digital banks and e-money institutions offer business accounts without requiring a hard credit check. Instead, they perform a 'soft' check (which doesn't affect your credit score) purely to verify your identity and comply with Anti-Money Laundering (AML) regulations.

**Top options for bad credit:**

**1. Tide**
Tide does not perform hard credit checks for its standard business accounts. As long as you can verify your identity and your business meets their eligibility criteria, you can open an account in minutes.

**2. Zempler Bank (formerly Cashplus)**
Zempler specialises in accessible banking. They guarantee acceptance for UK-based businesses provided you pass their identity and fraud checks. They do not require a credit check to open the account.

**3. Revolut Business**
Revolut offers business accounts without a hard credit check. Since they do not offer overdrafts or lending products in the UK, your credit history is not a barrier to opening an account.

**4. ANNA Money**
ANNA performs identity checks but no hard credit checks, making it an excellent option for sole traders and small limited companies with poor credit.`
      },
      {
        id: 'limitations',
        heading: 'Limitations of Bad Credit Accounts',
        content: `While these accounts are excellent for everyday banking, there are some limitations to be aware of:

- **No Overdrafts:** Because they don't check your credit, these providers will not offer you an overdraft or a business credit card.
- **E-money vs Banks:** Some providers (like Tide and Revolut) are e-money institutions, not fully licensed banks. This means your money is safeguarded in separate accounts but is not covered by the FSCS.
- **Account Fees:** While some offer free tiers, accounts guaranteeing acceptance (like Zempler) often charge a monthly fee or transaction fees.`
      }
    ],
    relatedGuides: ['how-to-open-a-business-bank-account', 'digital-vs-high-street-banks']
  },
  'sole-trader-business-bank-account': {
    slug: 'sole-trader-business-bank-account',
    title: 'Best Business Bank Accounts for Sole Traders UK 2026',
    metaDescription: 'Compare the best UK business bank accounts for sole traders. Find free accounts with no monthly fee, instant opening, and great accounting integrations.',
    h1: 'Best Business Bank Accounts for Sole Traders',
    intro: 'As a sole trader, you are not legally required to have a separate business bank account — but it is strongly recommended. Mixing personal and business finances makes tax returns harder, looks unprofessional to clients, and makes it difficult to track your business performance. The good news is that many excellent accounts are available completely free.',
    sections: [
      {
        id: 'why-get-one',
        heading: 'Why Sole Traders Need a Business Account',
        content: `While HMRC does not legally require sole traders to have a business bank account, there are several compelling reasons to open one:

**1. Easier tax returns**
When it comes time to complete your self-assessment tax return, having all your business transactions in one place saves hours of sifting through personal bank statements to identify deductible expenses.

**2. Professionalism**
Invoicing clients with an account in your business name looks much more professional than asking them to pay into your personal account.

**3. Better financial visibility**
A dedicated account gives you a clear, real-time view of your business's financial health, cash flow, and profitability.

**4. Accounting integrations**
Modern business accounts integrate directly with software like Xero, QuickBooks, and FreeAgent, automating your bookkeeping.

**5. Avoiding bank terms breaches**
Many personal bank accounts have terms and conditions that prohibit using the account for business purposes. If your bank notices high volumes of business transactions, they may close your personal account.`
      },
      {
        id: 'top-picks',
        heading: 'Top Picks for Sole Traders',
        content: `**Starling Bank**
Starling is our top recommendation for sole traders. It offers a completely free account with no monthly fees and no charges for UK transfers. It's fully FSCS protected, has an award-winning app, and integrates seamlessly with major accounting software.

**Tide**
Tide is excellent for sole traders who want built-in invoicing and expense management. You can open an account in minutes. The free plan has no monthly fee, though it does charge 20p per transfer.

**Monzo Business**
Monzo's Lite plan is free and offers a great user experience with instant notifications and easy categorization. It's FSCS protected and ideal for sole traders who already use Monzo for their personal banking.

**ANNA Money**
ANNA (Absolutely No Nonsense Admin) is designed specifically for sole traders and small businesses. It combines a business account with tax and admin tools, including automatic invoice chasing and VAT preparation.`
      }
    ],
    relatedGuides: ['do-sole-traders-need-a-business-bank-account', 'best-free-business-bank-accounts']
  },
  'limited-company-business-bank-account': {
    slug: 'limited-company-business-bank-account',
    title: 'Best Business Bank Accounts for Limited Companies UK 2026',
    metaDescription: 'Compare the best UK business bank accounts for limited companies. Limited companies must have a separate business account — find the right one here.',
    h1: 'Best Business Bank Accounts for Limited Companies',
    intro: 'Unlike sole traders, limited companies are legally required to have a separate business bank account. This is because a limited company is a distinct legal entity from its directors and shareholders. The account must be in the company\'s name, and all business income and expenses must pass through it.',
    sections: [
      {
        id: 'legal-requirement',
        heading: 'The Legal Requirement',
        content: `When you form a limited company, you create a new legal entity. The money the company earns belongs to the company, not to you as the director or shareholder.

Therefore, you **must** have a dedicated business bank account in the company's name. You cannot use your personal bank account for limited company transactions. Doing so would breach your legal obligations and create a nightmare for your accountant when trying to separate your personal money from company money.

If you have just incorporated your company, opening a business bank account should be your very next step.`
      },
      {
        id: 'what-to-look-for',
        heading: 'What Limited Companies Should Look For',
        content: `When choosing an account for your limited company, consider the following features:

**Multi-user access:** As your company grows, you may need to give access to co-directors, employees, or your accountant. Check if the account allows multiple users with different permission levels.

**Accounting integration:** A direct feed to your accounting software (Xero, QuickBooks, etc.) is essential for limited companies to manage bookkeeping and prepare statutory accounts.

**Expense cards:** Look for accounts that allow you to issue corporate cards to employees with spend limits and easy receipt capture.

**Invoicing tools:** Some accounts include built-in invoicing, which is useful if you don't use separate accounting software.

**International capabilities:** If your company trades overseas, consider accounts with multi-currency features and low foreign exchange fees, such as Revolut Business or Wise Business.`
      }
    ],
    relatedGuides: ['business-bank-account-fees', 'best-accounting-software-for-small-businesses']
  },
  'do-sole-traders-need-a-business-bank-account': {
    slug: 'do-sole-traders-need-a-business-bank-account',
    title: 'Do Sole Traders Need a Business Bank Account?',
    metaDescription: 'The definitive answer to whether sole traders are legally required to have a separate business bank account, and the pros and cons of getting one.',
    h1: 'Do Sole Traders Need a Business Bank Account?',
    intro: 'If you have just started working for yourself as a freelancer, contractor, or gig worker, you are classed as a sole trader. One of the most common questions new sole traders ask is whether they actually need a dedicated business bank account.',
    sections: [
      {
        id: 'the-short-answer',
        heading: 'The Short Answer: No, but Yes',
        content: `**Legally: No.**
HMRC does not legally require sole traders to have a separate business bank account. Because you and your business are treated as the same legal entity, you can technically use your personal current account for business transactions.

**Practically: Yes.**
Despite the lack of legal requirement, almost every accountant and financial advisor will strongly recommend that you open a separate business account. Furthermore, your bank's terms and conditions probably require it.`
      },
      {
        id: 'the-banks-rules',
        heading: 'Your Bank\'s Terms and Conditions',
        content: `While HMRC doesn't mind if you use a personal account, your bank almost certainly does.

If you read the terms and conditions of your personal current account, you will likely find a clause stating that the account is for 'personal use only'. If the bank notices a high volume of incoming payments from different people, or frequent payments to suppliers, they may flag the account.

Banks have been known to freeze or forcibly close personal accounts that are being used for commercial purposes. Opening a free business account prevents this risk entirely.`
      },
      {
        id: 'benefits',
        heading: 'The Benefits of a Separate Account',
        content: `**1. Tax Time is Easier:** When January rolls around, you won't have to spend hours highlighting which transactions on your bank statement were for business and which were for personal groceries. Everything in the business account is a business transaction.

**2. Professional Image:** If you are invoicing clients, asking them to pay 'Jane Doe' looks less professional than asking them to pay 'Jane Doe Designs'.

**3. Accounting Software:** Business accounts connect seamlessly to software like Xero, QuickBooks, and FreeAgent, automating your bookkeeping.

**4. Clear Financial Health:** It's much easier to see if your business is actually making a profit when the funds aren't mixed with your personal rent and utility payments.`
      }
    ],
    relatedGuides: ['sole-trader-business-bank-account', 'business-account-vs-personal-account']
  },
  'switching-business-bank-account': {
    slug: 'switching-business-bank-account',
    title: 'How to Switch Your Business Bank Account | UK Guide',
    metaDescription: 'A complete guide to switching your business bank account. Learn how the Current Account Switch Service (CASS) works and how long it takes.',
    h1: 'How to Switch Your Business Bank Account',
    intro: 'Many business owners stick with a poor bank account because they worry that switching will be complicated, time-consuming, or disrupt their business. In reality, switching your business bank account is now easier than ever, thanks to the Current Account Switch Service (CASS).',
    sections: [
      {
        id: 'cass-explained',
        heading: 'The Current Account Switch Service (CASS)',
        content: `The Current Account Switch Service (CASS) is a free service that makes switching bank accounts simple, reliable, and stress-free. Over 50 UK banks and building societies participate in the scheme.

**How it works:**
1. You open a new account with a participating bank and request a switch.
2. You choose a switch date (which must be at least 7 working days away).
3. The new bank handles everything. They transfer your balance, move all your Direct Debits and standing orders, and close your old account.
4. For 3 years after the switch, any payments sent to your old account are automatically redirected to your new one.

**The Guarantee:**
The service is backed by the Current Account Switch Guarantee. This means that if anything goes wrong with the switch (such as a missed payment resulting in a penalty fee), the new bank will refund any interest or charges incurred.`
      },
      {
        id: 'eligibility',
        heading: 'Who Can Use CASS?',
        content: `Most small businesses can use CASS. You are eligible if your business:

- Has an annual turnover of less than £6.5 million
- Employs fewer than 50 people
- Is a small charity with an annual income of less than £6.5 million
- Is a small trust with a net asset value of less than £6.5 million

Sole traders, partnerships, and limited companies can all use the service, provided they meet these criteria.`
      },
      {
        id: 'manual-switch',
        heading: 'Switching Manually',
        content: `If your new bank does not participate in CASS (which is the case for some digital providers like Tide and Revolut), you will need to switch manually.

**How to switch manually:**
1. Open your new account.
2. Transfer your funds from the old account to the new one.
3. Manually set up your standing orders and Direct Debits on the new account.
4. Update your invoices with your new bank details.
5. Inform your clients, suppliers, and payment providers (like Stripe or PayPal) of your new details.
6. Once everything is moved over, contact your old bank to close the account.

While this takes more effort than using CASS, it is still a straightforward process.`
      }
    ],
    relatedGuides: ['how-to-close-a-business-bank-account', 'how-to-change-business-bank-account-details']
  },
  'how-to-close-a-business-bank-account': {
    slug: 'how-to-close-a-business-bank-account',
    title: 'How to Close a Business Bank Account | UK Guide',
    metaDescription: 'A step-by-step guide to closing a UK business bank account, including what to do before closing and how to handle remaining funds.',
    h1: 'How to Close a Business Bank Account',
    intro: 'Whether you are switching to a better provider, closing down your company, or simply tidying up your finances, closing a business bank account is a process that requires careful handling to avoid missed payments or lost funds.',
    sections: [
      {
        id: 'before-closing',
        heading: 'Before You Close the Account',
        content: `Do not simply withdraw the money and assume the account is closed. Take these steps first:

**1. Open your new account**
If you are continuing to trade, ensure your new business account is fully operational before closing the old one.

**2. Update your clients**
Inform all clients who pay you regularly of your new bank details. Update the payment information on your invoices and website.

**3. Move Direct Debits and Standing Orders**
Transfer all outgoing payments to your new account. If you use the Current Account Switch Service (CASS), this is done automatically.

**4. Download your statements**
You are legally required to keep business records for at least 6 years (for limited companies) or 5 years (for sole traders). Download and save all your bank statements in PDF or CSV format, as you will lose access to them once the account is closed.`
      },
      {
        id: 'the-process',
        heading: 'The Closing Process',
        content: `The exact process depends on your bank:

**Using CASS:**
If you are switching to a new bank using the Current Account Switch Service, your old account will be closed automatically on your chosen switch date. You don't need to contact your old bank at all.

**Closing Manually (Digital Banks):**
For app-only banks like Starling, Monzo, or Tide, you can usually close your account directly through the app. Navigate to the account settings and look for a 'Close Account' option. You will be prompted to transfer any remaining balance to another account before the closure is finalised.

**Closing Manually (High Street Banks):**
Traditional banks may require you to fill out an account closure form online, call their business banking team, or occasionally visit a branch. If the account requires multiple signatures (e.g., a multi-director limited company), all required signatories must authorize the closure.`
      },
      {
        id: 'outstanding-fees',
        heading: 'Handling Outstanding Fees and Overdrafts',
        content: `You cannot close a business bank account if it is overdrawn. You must clear any outstanding overdraft balance and pay any accrued interest or monthly fees before the bank will process the closure.

If you are closing a limited company that is insolvent and cannot pay its overdraft, you should seek professional advice from an insolvency practitioner, as the account closure will be handled as part of the liquidation process.`
      }
    ],
    relatedGuides: ['switching-business-bank-account', 'what-is-a-business-overdraft']
  },
  'what-is-a-business-overdraft': {
    slug: 'what-is-a-business-overdraft',
    title: 'What is a Business Overdraft and How Does It Work?',
    metaDescription: 'Learn how business overdrafts work, the difference between arranged and unarranged overdrafts, and how to apply for one.',
    h1: 'What is a Business Overdraft?',
    intro: 'Managing cash flow is one of the biggest challenges for any business. A business overdraft is a flexible borrowing facility attached to your business bank account that can provide a crucial safety net when expenses temporarily exceed your income.',
    sections: [
      {
        id: 'how-it-works',
        heading: 'How a Business Overdraft Works',
        content: `An overdraft allows you to continue spending money from your business account even when your balance drops below zero, up to an agreed limit.

Unlike a business loan, where you borrow a lump sum and pay it back in fixed installments, an overdraft is a form of revolving credit. You only borrow what you need, when you need it, and you only pay interest on the amount you are overdrawn.

Once money comes into your account (such as a client paying an invoice), it automatically reduces your overdraft balance.`
      },
      {
        id: 'types',
        heading: 'Arranged vs Unarranged Overdrafts',
        content: `**Arranged Overdraft:**
This is a pre-agreed limit set up with your bank in advance. You know exactly how much you can borrow and what the interest rate will be. This is a sensible way to manage short-term cash flow gaps.

**Unarranged Overdraft:**
This happens when you spend more money than you have in your account without agreeing a limit in advance, or when you exceed your arranged limit. Banks often charge significantly higher interest rates and penalty fees for unarranged overdrafts, and they may refuse the payment entirely.`
      },
      {
        id: 'costs',
        heading: 'The Costs Involved',
        content: `Business overdrafts typically involve two types of fees:

**1. Interest (EAR/APR):**
You are charged interest on the amount you borrow, calculated daily. Business overdraft rates typically range from 10% to 40% EAR, depending on your credit rating and the bank.

**2. Arrangement or Annual Fees:**
Many banks charge a fee simply to have the facility available, even if you don't use it. This might be a flat annual fee (e.g., £50) or a percentage of the agreed limit (e.g., 1.5%).

Because of these costs, overdrafts are best used for short-term cash flow management, not for long-term borrowing or large capital investments.`
      }
    ],
    relatedGuides: ['business-bank-account-fees', 'how-to-change-business-bank-account-details']
  },
  'how-to-change-business-bank-account-details': {
    slug: 'how-to-change-business-bank-account-details',
    title: 'How to Change Business Bank Account Details',
    metaDescription: 'Need to update your business name, address, or directors on your bank account? Here is how to change your business bank account details.',
    h1: 'How to Change Business Bank Account Details',
    intro: 'As your business evolves, your details will change. You might move offices, appoint new directors, or even change your company name. Keeping your bank updated is a legal and regulatory requirement. This guide explains how to make these changes smoothly.',
    sections: [
      {
        id: 'address-contact',
        heading: 'Changing Address and Contact Details',
        content: `Updating your trading address, registered office, phone number, or email is usually the simplest change to make.

**App-only banks:** You can typically update these details directly within the app under your profile or account settings. You may be asked to upload a new proof of address (like a recent utility bill).

**High street banks:** You can often update contact details via online banking. For a change of business address, some banks may require you to fill out a specific mandate form or provide written confirmation signed in accordance with your bank mandate.`
      },
      {
        id: 'directors-signatories',
        heading: 'Adding or Removing Directors/Signatories',
        content: `Changing who has access to the account is a stricter process due to security and fraud prevention.

**Adding a signatory:** The new person will need to be identified. They will have to provide ID and proof of address. For limited companies, the bank will require a new bank mandate to be signed by the existing authorized directors.

**Removing a signatory:** This usually requires a signed request from the remaining directors. If a director has left the company on bad terms, it is crucial to notify the bank immediately to revoke their access to funds.`
      },
      {
        id: 'company-name',
        heading: 'Changing Your Business Name',
        content: `If you change your company name at Companies House, or change your trading name as a sole trader, your bank account name must be updated to match.

**Limited Companies:** You will need to provide the bank with the 'Certificate of Incorporation on Change of Name' issued by Companies House. The bank will then update the account name. Your account number and sort code will remain the same.

**Sole Traders:** You can usually just inform the bank of your new trading name. They may ask for evidence that you are trading under this new name, such as an invoice or a website link.`
      }
    ],
    relatedGuides: ['switching-business-bank-account', 'how-to-close-a-business-bank-account']
  },
  'business-bank-account-fees': {
    slug: 'business-bank-account-fees',
    title: 'Business Bank Account Fees Explained | UK Guide',
    metaDescription: 'Understand the fees associated with UK business bank accounts. Learn about monthly charges, transaction fees, cash deposits, and international costs.',
    h1: 'Business Bank Account Fees Explained',
    intro: 'Unlike personal current accounts, which are usually free for everyday banking in the UK, business bank accounts often come with a variety of fees. Understanding these charges is crucial to choosing the right account and keeping your business costs down.',
    sections: [
      {
        id: 'monthly-fees',
        heading: 'Monthly Account Fees',
        content: `The most visible cost of a business bank account is the monthly maintenance fee.

**High street banks:** Typically charge between £5 and £10 per month. However, they almost always offer a free introductory period for startups (usually 12 to 24 months).

**App-only banks:** Many offer a completely free basic tier (e.g., Starling, Monzo Lite, Tide Free). They also offer premium tiers with advanced features for a monthly fee, usually ranging from £5 to £15.`
      },
      {
        id: 'transaction-fees',
        heading: 'Transaction Fees',
        content: `Even if an account has no monthly fee, you may be charged for individual transactions. This is common with free accounts from providers like Tide and ANNA Money.

**Electronic payments:** Sending or receiving money via Faster Payments, BACS, or Direct Debit. Fees typically range from 20p to 35p per transaction.

**High street banks:** Most high street banks include a set number of free transactions in their monthly fee, with charges for additional transactions. Barclays, for example, charges 35p per transaction above the free allowance.

**Faster Payments:** Most accounts now include Faster Payments (same-day UK transfers) at no additional cost.

**CHAPS payments:** CHAPS (same-day guaranteed transfers, typically for large amounts) usually incur a fee of £15–£30 per payment.`
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

**Cash withdrawal fees:** Most accounts allow free ATM withdrawals up to a monthly limit, with fees for withdrawals above the limit.`
      }
    ],
    relatedGuides: ['best-free-business-bank-accounts', 'international-business-payments-guide']
  },
  'fscs-protection-explained': {
    slug: 'fscs-protection-explained',
    title: 'FSCS Protection Explained: Is Your Business Money Safe?',
    metaDescription: 'Everything you need to know about FSCS protection for business bank accounts, including which banks are covered and how e-money institutions safeguard funds.',
    h1: 'FSCS Protection Explained',
    intro: 'When choosing a business bank account, security should be a top priority. The Financial Services Compensation Scheme (FSCS) is the UK\'s statutory deposit insurance scheme. This guide explains how it works, what it covers, and alternative safeguarding methods used by digital providers.',
    sections: [
      {
        id: 'what-is-fscs',
        heading: 'What is FSCS Protection?',
        content: `The Financial Services Compensation Scheme (FSCS) protects customers when financial firms fail. If your bank goes bust and cannot return your money, the FSCS steps in to compensate you.

For bank accounts, the FSCS currently protects up to **£120,000** per eligible person, per authorised firm. (Note: The limit was increased from £85,000 to £120,000 as of December 2025).

This protection applies to both personal and business accounts, provided the business qualifies as an eligible claimant (which includes sole traders, partnerships, and most small-to-medium limited companies).`
      },
      {
        id: 'who-is-covered',
        heading: 'Which Banks are Covered?',
        content: `Only fully licensed UK banks and building societies are covered by the FSCS. Among the providers we compare, the following are fully licensed banks with FSCS protection:

- Starling Bank
- Monzo Bank
- High Street Banks (HSBC, Barclays, Lloyds, NatWest, RBS, etc.)
- Zempler Bank
- Cynergy Bank
- Co-operative Bank
- Virgin Money

**Important:** The £120,000 limit applies *per banking license*. Some banks share a license (e.g., HSBC and First Direct). If you have £80,000 in HSBC and £60,000 in First Direct, your total is £140,000, meaning £20,000 is unprotected.`
      },
      {
        id: 'safeguarding',
        heading: 'What About E-Money Institutions?',
        content: `Several popular digital business accounts are not banks; they are Electronic Money Institutions (EMIs). This includes:
- Tide
- Revolut Business
- Wise Business
- ANNA Money
- Airwallex

**Are they safe?**
Yes, but they use a different method called **Safeguarding**. EMIs are required by the FCA to keep customer money entirely separate from their own company money. They must place your funds in a safeguarded account at a fully licensed clearing bank (like Barclays or NatWest).

If the EMI goes bust, your money is safe because it is ring-fenced. It cannot be used to pay the EMI's creditors. However, the process of returning your money may take longer than an FSCS payout, and an administrator may deduct their costs from the safeguarded funds.`
      }
    ],
    relatedGuides: ['business-bank-account-fees', 'how-to-open-a-business-bank-account']
  },
  'best-free-business-bank-accounts': {
    slug: 'best-free-business-bank-accounts',
    title: 'Best Free Business Bank Accounts UK 2026 | No Monthly Fee',
    metaDescription: 'The best free UK business bank accounts with no monthly fee. Compare Starling, Monzo, Tide and more — find the right free account for your business.',
    h1: 'Best Free Business Bank Accounts UK 2026',
    intro: 'The good news for UK business owners is that some of the best business bank accounts available are completely free. You do not need to pay a monthly fee to get a high-quality, feature-rich business account. In this guide, we round up the best free business bank accounts and explain what to look for.',
    sections: [
      {
        id: 'best-free-accounts',
        heading: 'Our Top Free Business Bank Accounts',
        content: `**1. Starling Bank — Best Overall Free Account**
Starling Bank is our top pick for a free business bank account. It is a fully licensed bank (meaning FSCS protection up to £120,000), charges no monthly fee, and offers free UK transfers. The mobile app is consistently rated among the best in the market, and it integrates with Xero, QuickBooks, and FreeAgent. Cash deposits are available via Post Office for £3.

**2. Monzo Business (Lite) — Best for Startups**
Monzo's free Lite plan is an excellent option for startups and small businesses. It offers free UK transfers, FSCS protection, and good accounting integrations. The app is excellent. For businesses that need more features, the Pro plan at £5/month is worth considering.

**3. Tide (Free Plan) — Best for Invoicing**
Tide's free plan is popular with sole traders and small businesses, particularly for its strong invoicing tools. Note that it charges 20p per transfer on the free plan, which can add up for businesses with high transaction volumes. Tide is an e-money institution, so deposits are not FSCS protected.

**4. ANNA Money (Pay as You Go) — Best for Tax Management**
ANNA's free Pay as You Go plan is excellent for sole traders who want built-in tax management. It charges 20p per payment but includes automatic tax estimates, VAT preparation, and invoice chasing. Not FSCS protected.`
      },
      {
        id: 'what-to-look-for',
        heading: 'What to Look for in a Free Business Account',
        content: `Not all free accounts are created equal. Here is what to check before opening:

**Transaction fees:** Some accounts that are free to open charge per transaction. Tide charges 20p per transfer on its free plan. Starling and Monzo charge nothing for UK transfers.

**Cash deposit fees:** Most app-only banks charge for cash deposits. Starling charges £3 per Post Office deposit. Monzo charges £1 via PayPoint. If you regularly handle cash, factor this in.

**FSCS protection:** Only fully licensed banks offer FSCS protection. Among free accounts, Starling Bank is the standout — it is FSCS protected. Monzo, Tide, and Revolut are e-money institutions and not FSCS protected, though your money is held in segregated accounts.

**Accounting integrations:** Check which accounting software the account integrates with. Most major free accounts support Xero and QuickBooks.

**International payments:** If you need to send or receive international payments, check whether this is supported and at what cost. Starling supports international payments; Tide's free plan does not.`
      },
      {
        id: 'free-vs-paid',
        heading: 'Free vs Paid: When Should You Pay?',
        content: `For most small businesses, a free account will be perfectly adequate. However, there are situations where a paid account may be worth considering:

**You need unlimited transactions:** If your business makes many payments each month, a paid plan with unlimited transactions (like Monzo Pro at £5/month or Tide Plus at £9.99/month) may be cheaper than paying 20p per transaction on a free plan.

**You need advanced features:** Paid accounts often include advanced features like multi-user access, bulk payments, expense management tools, and priority customer support.

**You handle a lot of cash:** High street banks often charge a monthly fee but may offer lower cash handling fees or a certain amount of free cash deposits each month.

**You trade internationally:** If you make regular international payments, a specialist account like Wise Business or Revolut Business may charge a monthly fee but offer significantly better exchange rates and lower transfer fees.`
      }
    ],
    relatedGuides: ['business-bank-account-fees', 'best-accounting-software-for-small-businesses']
  },
  'best-accounting-software-for-small-businesses': {
    slug: 'best-accounting-software-for-small-businesses',
    title: 'Best Accounting Software for Small Businesses',
    metaDescription: 'A comparison of the best accounting software for UK small businesses, including Xero, QuickBooks, and FreeAgent, and how they integrate with your bank.',
    h1: 'Best Accounting Software for Small Businesses',
    intro: 'Choosing the right accounting software is just as important as choosing the right business bank account. Modern cloud accounting platforms automate bookkeeping, simplify tax returns, and integrate directly with your bank account via Open Banking.',
    sections: [
      {
        id: 'top-software',
        heading: 'The Big Three: Xero, QuickBooks, and FreeAgent',
        content: `**1. Xero**
Xero is widely considered the industry standard for UK small businesses. It offers a beautiful interface, excellent reporting, and integrates with almost every business bank account and third-party app available. It is particularly favoured by accountants. Pricing starts around £15/month.

**2. QuickBooks Online**
QuickBooks is Xero's main rival. It offers very similar features, strong bank feeds, and excellent tools for tracking mileage and expenses. It is often slightly cheaper than Xero and is very user-friendly for non-accountants.

**3. FreeAgent**
FreeAgent is specifically designed for freelancers, contractors, and micro-businesses. Its standout feature is its built-in tax timeline, which estimates your Corporation Tax and VAT liabilities in real-time. **Bonus:** FreeAgent is completely free if you have a business bank account with NatWest, RBS, or Mettle.`
      },
      {
        id: 'bank-integrations',
        heading: 'The Importance of Bank Feeds',
        content: `The primary reason to use cloud accounting software is the 'bank feed'. Thanks to Open Banking, your business bank account connects directly to your software.

Every time you make a payment or receive funds, the transaction appears automatically in your accounting software. The software then uses AI to suggest what the transaction was for (e.g., categorising a payment to 'TfL' as 'Travel'). You simply click 'OK' to reconcile the transaction.

Before choosing a bank account, always check that it integrates directly with your chosen accounting software. Major providers like Starling, Monzo, Tide, and all high street banks support Xero, QuickBooks, and FreeAgent.`
      },
      {
        id: 'built-in-alternatives',
        heading: 'Built-in Bank Accounting Tools',
        content: `If you are a very small sole trader, you might not need separate accounting software at all.

Banks like **ANNA Money**, **Tide**, and **Monzo (Pro plan)** offer built-in accounting features. They allow you to create and send invoices, capture receipts, and estimate your tax directly within the banking app. This can save you the £15-£30 monthly fee of a separate software subscription.`
      }
    ],
    relatedGuides: ['best-free-business-bank-accounts', 'business-bank-account-fees']
  },
  'international-business-payments-guide': {
    slug: 'international-business-payments-guide',
    title: 'International Business Payments Guide',
    metaDescription: 'Learn how to send and receive international business payments efficiently, avoid hidden bank fees, and understand exchange rate margins.',
    h1: 'International Business Payments Guide',
    intro: 'If your business imports goods, pays overseas freelancers, or sells to international customers, managing foreign exchange (FX) is critical. Traditional banks often charge high fees and hide costs in poor exchange rates. This guide explains how to manage international payments efficiently.',
    sections: [
      {
        id: 'hidden-costs',
        heading: 'Understanding the Hidden Costs',
        content: `When you send money abroad through a traditional high street bank, you are typically hit with two charges:

**1. The Transfer Fee:** A flat fee for sending the payment, usually between £15 and £25 per transaction.

**2. The Exchange Rate Margin:** This is the hidden cost. Banks rarely give you the 'mid-market rate' (the real exchange rate you see on Google). Instead, they add a markup—often between 2% and 4%. If you are paying a €10,000 invoice, a 3% margin costs you an extra £300.

Receiving money from abroad into a standard UK GBP account also incurs receiving fees and poor conversion rates applied by the sender's bank.`
      },
      {
        id: 'multi-currency-accounts',
        heading: 'The Solution: Multi-Currency Accounts',
        content: `If you trade internationally, you should consider a specialist multi-currency account. These platforms allow you to hold balances in EUR, USD, AUD, and other currencies, and provide you with local bank details for those countries.

**Wise Business:**
Wise is the market leader for transparent international payments. They charge no exchange rate margin—you get the real mid-market rate. Instead, they charge a small, transparent fee (usually around 0.4% to 1%). You get local account details for 9+ currencies, allowing overseas clients to pay you like a local.

**Revolut Business:**
Revolut allows you to hold and exchange over 25 currencies. Depending on your pricing plan, you get a monthly allowance of currency exchange at the interbank rate, making it incredibly cost-effective for high-volume traders.

**Airwallex:**
Airwallex is built specifically for global businesses and e-commerce. They offer excellent FX rates, global accounts, and borderless corporate cards that allow your team to spend in local currencies without conversion fees.`
      },
      {
        id: 'best-practice',
        heading: 'Best Practices for Global Trade',
        content: `- **Invoice in local currency:** Make it easy for your clients by invoicing them in their local currency and receiving the funds into a multi-currency account.
- **Hold funds:** If you receive USD and also have USD expenses (like paying for US-based software or suppliers), hold the USD in your multi-currency account and use it to pay those bills. This avoids converting the money twice.
- **Never use PayPal for FX:** While convenient, PayPal charges some of the highest currency conversion fees in the market (often 3-4%).`
      }
    ],
    relatedGuides: ['business-bank-account-fees', 'best-accounting-software-for-small-businesses']
  }
};
