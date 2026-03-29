// authorsData.ts — Editorial team profiles for Business Bank Compare
// Used by AuthorByline component on guide pages and bank review pages

export interface Author {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  shortBio: string;
  credentials: string[];
  specialisms: string[];
  linkedinUrl?: string;
}

export const authors: Record<string, Author> = {
  'james-hartley': {
    id: 'james-hartley',
    name: 'James Hartley',
    role: 'Senior Finance Editor',
    photo: '/authors/james-hartley.jpg',
    bio: 'James Hartley is a senior finance journalist and editor with over 14 years of experience covering UK business banking, SME finance, and financial regulation. He began his career at a national financial newswire before moving into specialist business finance publishing, where he has reviewed hundreds of business bank accounts, credit facilities, and financial products. James holds a degree in Economics from the University of Exeter and is a member of the Chartered Institute of Journalists. His work focuses on helping UK business owners make informed decisions about their banking, with a particular specialism in high street and challenger bank comparisons, business overdrafts, and the regulatory landscape governing UK business finance.',
    shortBio: 'Senior finance journalist with 14+ years covering UK business banking and SME finance.',
    credentials: ['Member, Chartered Institute of Journalists', 'BA Economics, University of Exeter', '14+ years in financial journalism'],
    specialisms: ['High street bank reviews', 'Business overdrafts & credit', 'FCA regulation & compliance', 'SME finance strategy'],
  },
  'oliver-chen': {
    id: 'oliver-chen',
    name: 'Oliver Chen',
    role: 'Fintech & Business Banking Analyst',
    photo: '/authors/oliver-chen.jpg',
    bio: 'Oliver Chen is a fintech analyst and business banking specialist with eight years of experience evaluating digital banking platforms, payment infrastructure, and emerging financial technology for UK small businesses. After graduating with a First in Computer Science from Imperial College London, Oliver worked as a product analyst at two leading UK fintech firms before transitioning to financial journalism. He brings a uniquely technical perspective to business banking reviews, with deep expertise in API banking, open banking integrations, and the fee structures of digital-first providers such as Monzo, Starling, Tide, Revolut, and Wise. Oliver is particularly focused on how technology can reduce banking costs and administrative burden for UK startups and sole traders.',
    shortBio: 'Fintech analyst and digital banking specialist with 8+ years evaluating UK business banking platforms.',
    credentials: ['BSc Computer Science (First Class), Imperial College London', '8+ years in fintech analysis', 'Open Banking & API specialist'],
    specialisms: ['Digital & challenger bank reviews', 'Fintech product analysis', 'Open banking & integrations', 'Fee comparison & cost modelling'],
  },
  'sarah-mitchell': {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'Personal Finance Editor & Chartered Accountant',
    photo: '/authors/sarah-mitchell.jpg',
    bio: 'Sarah Mitchell is a Chartered Accountant (ACA) and personal finance editor with over 12 years of experience advising small businesses and sole traders on financial management, tax planning, and business banking. She qualified with a Big Four accountancy firm before moving into financial content, where she has written extensively on business savings accounts, FSCS protection, tax-efficient banking strategies, and the practical realities of managing business finances as a sole trader or limited company director. Sarah\'s editorial focus is on ensuring that financial content is accurate, jargon-free, and genuinely actionable for the business owners who read it. She is a Fellow of the Institute of Chartered Accountants in England and Wales (ICAEW).',
    shortBio: 'Chartered Accountant (ACA) and finance editor specialising in business savings, tax, and SME financial management.',
    credentials: ['ACA, Fellow of ICAEW', '12+ years in accountancy and financial journalism', 'Specialist in SME tax and savings strategy'],
    specialisms: ['Business savings accounts', 'FSCS protection & deposit safety', 'Sole trader & limited company banking', 'Tax-efficient financial management'],
  },
  'priya-sharma': {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'SME Banking & Fintech Writer',
    photo: '/authors/priya-sharma.jpg',
    bio: 'Priya Sharma is a business banking and fintech writer with six years of experience producing in-depth guides, reviews, and comparison content for UK small business owners. She holds an MSc in Finance from the University of Manchester and has previously worked in business development roles at two UK challenger banks, giving her an insider perspective on how digital banking products are designed, priced, and marketed to SMEs. Priya specialises in writing accessible, practical guides that help new business owners navigate the complexities of opening a business bank account, understanding banking fees, and choosing the right account for their specific business type. She has a particular focus on accounts for startups, freelancers, and businesses with international payment needs.',
    shortBio: 'Business banking writer with 6+ years producing guides and reviews for UK SMEs, with insider fintech experience.',
    credentials: ['MSc Finance, University of Manchester', '6+ years in business banking content', 'Former challenger bank business development'],
    specialisms: ['Startup & new business banking', 'International payments & FX', 'Business account opening guides', 'Freelancer & sole trader banking'],
  },
};

// Author assignment map — which author covers which content categories
// Bank reviews: high street → james, digital/fintech → oliver, savings → sarah, specialist → priya
// Guides: getting-started → priya, fees → sarah, digital → oliver, regulatory → james

export type AuthorCategory =
  | 'high-street-bank-review'
  | 'digital-bank-review'
  | 'savings-bank-review'
  | 'specialist-bank-review'
  | 'guide-getting-started'
  | 'guide-fees'
  | 'guide-digital'
  | 'guide-regulatory'
  | 'guide-savings'
  | 'guide-international';

export const categoryAuthorMap: Record<AuthorCategory, string> = {
  'high-street-bank-review': 'james-hartley',
  'digital-bank-review': 'oliver-chen',
  'savings-bank-review': 'sarah-mitchell',
  'specialist-bank-review': 'priya-sharma',
  'guide-getting-started': 'priya-sharma',
  'guide-fees': 'sarah-mitchell',
  'guide-digital': 'oliver-chen',
  'guide-regulatory': 'james-hartley',
  'guide-savings': 'sarah-mitchell',
  'guide-international': 'priya-sharma',
};

// Per-bank author assignments
export const bankAuthorMap: Record<string, string> = {
  // High street banks → James Hartley
  'hsbc-business': 'james-hartley',
  'lloyds-business': 'james-hartley',
  'barclays-business': 'james-hartley',
  'natwest-business': 'james-hartley',
  'santander-business': 'james-hartley',
  'metro-bank-business': 'james-hartley',
  'co-op-business': 'james-hartley',
  'bank-of-scotland-business': 'james-hartley',
  'tsb-business': 'james-hartley',
  // Digital / challenger banks → Oliver Chen
  'starling-bank': 'oliver-chen',
  'monzo-business': 'oliver-chen',
  'tide-business': 'oliver-chen',
  'revolut-business': 'oliver-chen',
  'wise-business': 'oliver-chen',
  'anna-business': 'oliver-chen',
  'cashplus-business': 'oliver-chen',
  'card-one-banking': 'oliver-chen',
  // Savings-focused specialist banks → Sarah Mitchell
  'aldermore-business': 'sarah-mitchell',
  'shawbrook-business': 'sarah-mitchell',
  // Other specialist / international → Priya Sharma
  'airwallex-business': 'priya-sharma',
  'payoneer-business': 'priya-sharma',
};

// Per-guide author assignments
export const guideAuthorMap: Record<string, string> = {
  // Getting started guides → Priya Sharma
  'how-to-open-a-business-bank-account': 'priya-sharma',
  'business-account-vs-personal-account': 'priya-sharma',
  'business-bank-account-for-bad-credit': 'priya-sharma',
  'what-do-i-need-to-open-a-business-bank-account-uk': 'priya-sharma',
  'how-long-does-it-take-to-open-a-business-bank-account': 'priya-sharma',
  'can-i-open-a-business-bank-account-online-uk': 'priya-sharma',
  'business-bank-account-for-non-uk-residents': 'priya-sharma',
  'how-to-open-a-business-bank-account-as-a-new-limited-company': 'priya-sharma',
  'can-i-use-my-personal-bank-account-for-business-in-the-uk': 'priya-sharma',
  'what-happens-if-you-use-a-personal-account-for-business': 'priya-sharma',
  'how-old-do-you-have-to-be-to-open-a-business-bank-account-uk': 'priya-sharma',
  'can-i-open-business-bank-account-bad-credit-uk': 'priya-sharma',
  'how-to-open-business-bank-account-no-credit-check-uk': 'priya-sharma',
  'what-is-a-business-current-account': 'priya-sharma',
  'sole-trader-multiple-bank-accounts-uk': 'priya-sharma',
  'how-to-open-a-second-business-bank-account-uk': 'priya-sharma',
  'can-i-open-business-bank-account-before-company-registered': 'priya-sharma',
  'how-to-open-self-employed-business-bank-account-uk': 'priya-sharma',
  'sort-code-account-number-business-uk': 'priya-sharma',
  // Fees & costs guides → Sarah Mitchell
  'business-bank-account-fees': 'sarah-mitchell',
  'best-free-business-bank-accounts': 'sarah-mitchell',
  'business-current-account-vs-savings-account-uk': 'sarah-mitchell',
  'fscs-protection-explained': 'sarah-mitchell',
  'best-accounting-software-for-small-businesses': 'sarah-mitchell',
  'switching-business-bank-account': 'sarah-mitchell',
  'how-to-close-a-business-bank-account': 'sarah-mitchell',
  'how-to-change-business-bank-account-details': 'sarah-mitchell',
  'what-is-a-business-overdraft': 'sarah-mitchell',
  // Digital / fintech guides → Oliver Chen
  'digital-vs-high-street-banks': 'oliver-chen',
  'sole-trader-business-bank-account': 'oliver-chen',
  'limited-company-business-bank-account': 'oliver-chen',
  // International & regulatory guides → James Hartley
  'international-business-payments-guide': 'james-hartley',
};
