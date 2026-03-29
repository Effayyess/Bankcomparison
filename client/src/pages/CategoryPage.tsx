// Design: Authoritative Broadsheet | Category SEO pages
// Sole trader, limited company, contractor, startup, freelancer, international, free, app-only, high-street

import { useParams, Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { banks, getBanksBySuitability, getBanksByType } from '@/lib/bankData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BankCard from '@/components/BankCard';
import NotFound from './NotFound';
import SEO from '@/components/SEO';

const CATEGORY_HERO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663463044688/ARsFo8cnc8CpnHoXXZH5qW/category-hero-6Nc3QNrcoK9d5tYJhmmahE.webp';

interface CategoryConfig {
  title: string;
  h1: string;
  description: string;
  intro: string;
  getBanks: () => typeof banks;
  faq: { q: string; a: string }[];
}

const categoryOrder: Record<string, string[]> = {
  'sole-trader': ['hsbc', 'tide', 'lloyds', 'virgin', 'revolut', 'natwest', 'cynergy', 'zempler', 'barclays', 'coop', 'rbs', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals', 'airwallex', 'worldfirst', 'wallester'],
  'startup': ['hsbc', 'tide', 'lloyds', 'virgin', 'revolut', 'airwallex', 'natwest', 'cynergy', 'zempler', 'worldfirst', 'wallester', 'barclays', 'coop', 'rbs', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals'],
  'freelancer': ['hsbc', 'tide', 'revolut', 'airwallex', 'zempler', 'worldfirst', 'wallester', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals', 'lloyds', 'virgin', 'natwest', 'barclays', 'coop', 'rbs', 'cynergy'],
  'contractor': ['hsbc', 'tide', 'revolut', 'airwallex', 'zempler', 'worldfirst', 'wallester', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals', 'lloyds', 'virgin', 'natwest', 'barclays', 'coop', 'rbs', 'cynergy'],
  'limited-company': ['hsbc', 'tide', 'lloyds', 'virgin', 'revolut', 'airwallex', 'natwest', 'cynergy', 'zempler', 'worldfirst', 'wallester', 'barclays', 'coop', 'rbs', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals'],
  'international': ['hsbc', 'revolut', 'equals', 'wallester', 'airwallex', 'worldfirst', 'wise', 'tide', 'monzo', 'starling', 'barclays', 'natwest', 'lloyds'],
  'free-business-accounts': ['hsbc', 'tide', 'virgin', 'airwallex', 'natwest', 'zempler', 'worldfirst', 'wallester', 'coop', 'rbs', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals', 'lloyds', 'cynergy'],
  'no-credit-check': ['tide', 'revolut', 'airwallex', 'zempler', 'worldfirst', 'wallester', 'anna', 'equals', 'countingup', 'monzo', 'starling', 'wise', 'mettle'],
  'app-only-banks': ['tide', 'revolut', 'airwallex', 'worldfirst', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals', 'wallester', 'zempler'],
  'app-only': ['tide', 'revolut', 'airwallex', 'worldfirst', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals', 'wallester', 'zempler'],
  'high-street-banks': ['hsbc', 'lloyds', 'barclays', 'natwest', 'rbs', 'coop', 'virgin', 'cynergy'],
  'high-street': ['hsbc', 'lloyds', 'barclays', 'natwest', 'rbs', 'coop', 'virgin', 'cynergy'],
  'fast-opening': ['tide', 'revolut', 'airwallex', 'worldfirst', 'monzo', 'anna', 'starling', 'wise', 'mettle', 'countingup', 'equals', 'wallester', 'zempler'],
  'overdraft': ['tide', 'hsbc', 'lloyds', 'virgin', 'natwest', 'zempler', 'barclays', 'coop', 'rbs', 'monzo', 'starling', 'revolut', 'cynergy'],
  'multi-currency': ['revolut', 'airwallex', 'worldfirst', 'wallester', 'equals', 'wise', 'hsbc', 'tide', 'monzo', 'starling'],
  'cash-deposit': ['hsbc', 'tide', 'lloyds', 'virgin', 'natwest', 'zempler', 'wallester', 'barclays', 'coop', 'rbs', 'monzo', 'anna', 'countingup', 'starling', 'cynergy'],
  'branch-access': ['hsbc', 'tide', 'lloyds', 'virgin', 'natwest', 'barclays', 'coop', 'rbs', 'cynergy'],
  'accounting': ['hsbc', 'tide', 'virgin', 'revolut', 'airwallex', 'natwest', 'zempler', 'worldfirst', 'wallester', 'coop', 'rbs', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals', 'lloyds', 'barclays', 'cynergy'],
  'small-business': ['hsbc', 'tide', 'lloyds', 'virgin', 'revolut', 'airwallex', 'natwest', 'cynergy', 'zempler', 'worldfirst', 'wallester', 'barclays', 'coop', 'rbs', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals'],
  'bad-credit': ['zempler', 'tide', 'revolut', 'airwallex', 'worldfirst', 'wallester', 'anna', 'countingup', 'monzo', 'starling', 'wise', 'mettle', 'equals'],
  'corporate': ['tide', 'hsbc', 'barclays', 'natwest', 'lloyds', 'revolut', 'airwallex', 'coop', 'rbs'],
  'multi-director': ['hsbc', 'tide', 'lloyds', 'virgin', 'revolut', 'airwallex', 'natwest', 'cynergy', 'zempler', 'worldfirst', 'wallester', 'barclays', 'coop', 'rbs', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals'],
  'joint': ['tide', 'hsbc', 'lloyds', 'virgin', 'natwest', 'barclays', 'coop', 'rbs', 'starling', 'monzo', 'revolut', 'airwallex', 'wise', 'mettle', 'cynergy', 'equals', 'worldfirst', 'wallester', 'zempler', 'anna'],
  'switcher': ['hsbc', 'tide', 'lloyds', 'natwest', 'barclays', 'coop', 'rbs', 'starling', 'monzo', 'virgin', 'revolut'],
  'online': ['hsbc', 'tide', 'virgin', 'revolut', 'airwallex', 'natwest', 'zempler', 'worldfirst', 'wallester', 'coop', 'rbs', 'monzo', 'anna', 'countingup', 'mettle', 'starling', 'wise', 'equals', 'lloyds', 'barclays', 'cynergy'],
  'partnership': ['tide', 'hsbc', 'lloyds', 'virgin', 'natwest', 'barclays', 'coop', 'rbs', 'starling', 'monzo', 'revolut', 'airwallex', 'wise', 'mettle', 'cynergy'],
};

function sortBanksByCategory(bankList: typeof banks, slug: string): typeof banks {
  const order = categoryOrder[slug];
  if (!order) return bankList;
  return [...bankList].sort((a, b) => {
    const ai = order.indexOf(a.id);
    const bi = order.indexOf(b.id);
    const aPos = ai === -1 ? 999 : ai;
    const bPos = bi === -1 ? 999 : bi;
    return aPos - bPos;
  });
}
const categoryConfigs: Record<string, CategoryConfig> = {
  'sole-trader': {
    title: `Best Business Bank Accounts for Sole Traders UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for Sole Traders',
    description: 'Compare the best UK business bank accounts for sole traders. Find free accounts with no monthly fee, instant opening, and great accounting integrations.',
    intro: 'As a sole trader, you are not legally required to have a separate business bank account — but it is strongly recommended. Mixing personal and business finances makes tax returns harder, looks unprofessional to clients, and makes it difficult to track your business performance. The good news is that many excellent accounts are available completely free.',
    getBanks: () => getBanksBySuitability('sole-trader'),
    faq: [
      { q: 'Do sole traders need a business bank account?', a: 'Sole traders are not legally required to have a separate business bank account, unlike limited companies. However, it is strongly recommended to keep business and personal finances separate for tax purposes, professional appearance, and easier bookkeeping.' },
      { q: 'Can a sole trader get a free business bank account?', a: 'Yes — several excellent free business bank accounts are available to sole traders, including Starling Bank, Monzo Business (Lite plan), and ANNA Money (Pay as you go). These offer no monthly fee with a good range of features.' },
      { q: 'What documents do I need to open a sole trader account?', a: 'Typically you will need: proof of identity (passport or driving licence), proof of address (utility bill or bank statement), your UTR number if you have one, and details about your business. Most app-only banks can verify your identity digitally.' },
    ],
  },
  'limited-company': {
    title: `Best Business Bank Accounts for Limited Companies UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for Limited Companies',
    description: 'Compare the best UK business bank accounts for limited companies. Limited companies must have a separate business account — find the right one here.',
    intro: 'Unlike sole traders, limited companies are legally required to have a separate business bank account. This is because a limited company is a distinct legal entity from its directors and shareholders. The account must be in the company\'s name, and all business income and expenses must pass through it.',
    getBanks: () => getBanksBySuitability('limited-company'),
    faq: [
      { q: 'Do limited companies need a business bank account?', a: 'Yes — limited companies are legally required to have a business bank account in the company\'s name. This is because a limited company is a separate legal entity from its directors, and all company finances must be kept separate from personal finances.' },
      { q: 'What is the best business bank account for a new limited company?', a: 'For new limited companies, we recommend Starling Bank (free, FSCS protected, excellent app) or NatWest Business (free for 24 months for new businesses, full branch access). Monzo Business is also excellent for startups.' },
      { q: 'Can I use a personal bank account for my limited company?', a: 'No — you must not use a personal bank account for limited company transactions. This would breach your company\'s legal obligations and could create significant accounting and tax complications.' },
    ],
  },
  'contractor': {
    title: `Best Business Bank Accounts for Contractors UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for Contractors',
    description: 'Compare the best UK business bank accounts for contractors and consultants. Find accounts with great invoicing tools, accounting integrations, and low fees.',
    intro: 'Contractors — whether operating through a limited company or as sole traders — have specific banking needs. You need an account that makes invoicing clients straightforward, integrates with accounting software, and keeps costs low during quiet periods. Many contractors also benefit from accounts that handle multiple clients and projects clearly.',
    getBanks: () => getBanksBySuitability('contractor'),
    faq: [
      { q: 'What is the best bank account for a contractor?', a: 'For contractors, we recommend Starling Bank (free, excellent accounting integrations, FSCS protected) or Tide (strong invoicing tools, good for managing multiple clients). If you operate through a limited company, you must have a separate business account.' },
      { q: 'Do contractors need a business bank account?', a: 'If you operate through a limited company, yes — you are legally required to have a business account. If you are a sole trader contractor, it is not legally required but strongly recommended for professional invoicing and tax purposes.' },
      { q: 'Which bank accounts have the best invoicing for contractors?', a: 'Tide has particularly strong built-in invoicing tools, including automatic payment chasing. Starling and Monzo also offer invoicing features. ANNA Money is specifically designed with invoicing and tax management in mind.' },
    ],
  },
  'startup': {
    title: `Best Business Bank Accounts for Startups UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for Startups',
    description: 'Compare the best UK business bank accounts for startups. Find accounts with free periods, easy opening, and features designed for growing businesses.',
    intro: 'Choosing the right bank account is one of the first decisions a startup founder needs to make. You need an account that is easy to open quickly, has low or no fees while you are getting started, and offers the features you will need as you grow — from accounting integrations to international payments.',
    getBanks: () => getBanksBySuitability('startup'),
    faq: [
      { q: 'What is the best bank account for a startup?', a: 'For startups, we recommend Monzo Business (excellent free tier, great expense management) or Starling Bank (free, FSCS protected, fast to open). NatWest Business offers 24 months free for new businesses if you prefer a high street bank.' },
      { q: 'Can I open a business bank account before my company is registered?', a: 'No — you need to have registered your limited company with Companies House before you can open a business bank account in the company\'s name. However, you can open a sole trader account immediately.' },
      { q: 'How quickly can I open a startup business bank account?', a: 'App-only banks like Starling and Monzo can open accounts on the same day, often within minutes. High street banks typically take 3–7 days and may require a branch visit.' },
    ],
  },
  'freelancer': {
    title: `Best Business Bank Accounts for Freelancers UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for Freelancers',
    description: 'Compare the best UK business bank accounts for freelancers. Find free accounts with invoicing tools, expense tracking, and tax management features.',
    intro: 'Freelancers need a business bank account that makes managing irregular income straightforward, helps with invoicing clients, and keeps tax preparation as painless as possible. The best accounts for freelancers combine low costs with smart financial tools.',
    getBanks: () => getBanksBySuitability('freelancer'),
    faq: [
      { q: 'Do freelancers need a business bank account?', a: 'Freelancers operating as sole traders are not legally required to have a separate business account, but it is highly recommended. It makes invoicing more professional, simplifies tax returns, and helps you track your business finances clearly.' },
      { q: 'What is the best free bank account for a freelancer?', a: 'Starling Bank is our top pick for freelancers — it is completely free, FSCS protected, and has excellent invoicing and accounting tools. ANNA Money is also excellent for freelancers who want built-in tax management.' },
      { q: 'Which bank accounts help with self-assessment tax returns?', a: 'ANNA Money is specifically designed to help with self-assessment, including automatic tax estimates and VAT return preparation. Countingup also has built-in accounting software. Starling, Monzo, and Tide all integrate with accounting software like Xero and QuickBooks.' },
    ],
  },
  'international': {
    title: `Best Multi-Currency Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for International Businesses',
    description: 'Compare the best UK business bank accounts for international businesses. Find multi-currency accounts with competitive exchange rates and global payment capabilities.',
    intro: 'If your business operates internationally — whether you are selling to overseas customers, paying international suppliers, or employing staff abroad — you need a business bank account with strong international capabilities. The best accounts offer multi-currency wallets, competitive exchange rates, and low international transfer fees.',
    getBanks: () => getBanksBySuitability('international'),
    faq: [
      { q: 'What is the best multi-currency business bank account in the UK?', a: 'Wise Business is our top pick for international businesses — it holds 40+ currencies, uses real mid-market exchange rates, and offers local bank details in 10+ countries. Revolut Business and Airwallex are also excellent for international operations.' },
      { q: 'Which UK business bank accounts support international payments?', a: 'Most major banks support international payments, but the costs vary significantly. App-only banks like Wise, Revolut, and Airwallex offer the most competitive rates. High street banks like HSBC and Barclays also support international payments but typically charge higher fees.' },
      { q: 'Do I need a separate account for international payments?', a: 'You do not necessarily need a separate account, but many businesses find it beneficial to use a specialist multi-currency account (like Wise or Revolut) alongside their main UK business account for international transactions.' },
    ],
  },
  'free-business-accounts': {
    title: `Best Free Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best Free Business Bank Accounts',
    description: 'Compare the best free UK business bank accounts with no monthly fee. Find accounts that are genuinely free with no hidden charges.',
    intro: 'A growing number of excellent business bank accounts are available with no monthly fee. These free accounts are not stripped-down products — many offer features that rival or exceed paid alternatives, including accounting integrations, invoicing tools, and FSCS protection.',
    getBanks: () => banks.filter((b) => b.monthlyFeeNum === 0 && !['aldermore', 'shawbrook'].includes(b.id)),
    faq: [
      { q: 'Are free business bank accounts any good?', a: 'Yes — free business bank accounts have improved dramatically in recent years. Starling Bank, for example, is completely free and consistently rated as one of the best business bank accounts in the UK. Free does not mean inferior.' },
      { q: 'What is the catch with free business bank accounts?', a: 'Some free accounts charge for specific transactions (e.g., Tide charges 20p per transfer on its free plan). Others are free for a limited period (e.g., Barclays is free for 12 months). Always check the full fee schedule before opening.' },
      { q: 'Which free business bank accounts are FSCS protected?', a: 'Starling Bank is the standout free business account that is also FSCS protected. Zempler Bank also offers a free option with FSCS protection. Most other free accounts (Monzo, Tide, Revolut) are e-money institutions and not FSCS protected.' },
    ],
  },
  'app-only-banks': {
    title: `Best App-Only Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best App-Only Business Bank Accounts',
    description: 'Compare the best digital-only UK business bank accounts. Fast to open, feature-rich, and often free — the best app banks for UK businesses.',
    intro: 'App-only business bank accounts have transformed UK business banking. With no physical branches, these digital-first banks can offer lower fees, faster account opening, and more innovative features than traditional high street banks. The best app-only accounts are now the top choice for most UK small businesses.',
    getBanks: () => getBanksByType('digital'),
    faq: [
      { q: 'Are app-only business bank accounts safe?', a: 'Yes — the major app-only banks are regulated by the FCA and PRA. Starling Bank is a fully licensed bank with FSCS protection. Others like Monzo, Tide, and Revolut are e-money institutions, which means your money is held in segregated accounts but not FSCS protected.' },
      { q: 'Can I deposit cash with an app-only business account?', a: 'Most app-only banks allow cash deposits via Post Office (Starling, Tide) or PayPoint (Monzo), though fees may apply. Revolut does not accept cash deposits at all. If you regularly handle cash, this is an important consideration.' },
      { q: 'How quickly can I open an app-only business account?', a: 'Most app-only banks can open accounts on the same day, often within minutes. You will need to verify your identity digitally using your phone camera and a valid ID document.' },
    ],
  },
  'high-street-banks': {
    title: `Best High Street Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best High Street Business Bank Accounts',
    description: 'Compare the best UK high street business bank accounts. Find traditional banks with branch access, overdrafts, and full business banking services.',
    intro: 'High street business bank accounts remain the preferred choice for businesses that need branch access, cash handling facilities, or the full range of traditional banking services including overdrafts, loans, and relationship managers. While they typically charge monthly fees after an initial free period, they offer capabilities that app-only banks cannot match.',
    getBanks: () => getBanksByType('highstreet'),
    faq: [
      { q: 'Which high street bank is best for business?', a: 'Barclays Business is our top-rated high street business bank, offering a strong digital platform alongside its branch network. NatWest Business is also excellent, particularly for new businesses as it offers 24 months free.' },
      { q: 'Do high street banks charge for business accounts?', a: 'Most high street banks offer a free period (typically 12–24 months for new businesses) before charging a monthly fee of around £6–£8.50. Transaction fees are usually included in the monthly fee.' },
      { q: 'When should I choose a high street bank over an app-only bank?', a: 'Choose a high street bank if you regularly deposit cash, need an overdraft or business loan, want a relationship manager, or prefer face-to-face banking. For most small businesses with low cash handling needs, an app-only bank will offer better value.' },
    ],
  },
  // Aliases for nav links
  'high-street': {
    title: `Best High Street Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best High Street Business Bank Accounts',
    description: 'Compare the best UK high street business bank accounts with branch access.',
    intro: 'High street business bank accounts offer branch access, cash handling, overdrafts, and relationship managers. They typically charge monthly fees after an initial free period.',
    getBanks: () => getBanksByType('highstreet'),
    faq: [
      { q: 'Which high street bank is best for business?', a: 'Barclays Business is our top-rated high street business bank. NatWest Business is also excellent, particularly for new businesses as it offers 24 months free.' },
    ],
  },
  'app-only': {
    title: `Best App-Only Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best App-Only Business Bank Accounts',
    description: 'Compare the best digital-only UK business bank accounts. Fast to open, feature-rich, and often free.',
    intro: 'App-only business bank accounts have transformed UK business banking with lower fees, faster opening, and innovative features.',
    getBanks: () => getBanksByType('digital'),
    faq: [
      { q: 'Are app-only business bank accounts safe?', a: 'Yes — the major app-only banks are regulated by the FCA. Starling Bank has full FSCS protection. Others like Monzo and Tide are e-money institutions with segregated accounts.' },
    ],
  },
  'fast-opening': {
    title: `Best Fast-Opening Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best Fast-Opening Business Bank Accounts',
    description: 'Open a UK business bank account today. Compare accounts that can be opened same-day or within 24 hours.',
    intro: 'Need a business bank account quickly? Several UK banks can open your account the same day — often within minutes. These app-only banks use digital identity verification to speed up the process.',
    getBanks: () => getBanksByType('fast-opening'),
    faq: [
      { q: 'How quickly can I open a business bank account?', a: 'App-only banks like Starling, Monzo, and Tide can open accounts within minutes. High street banks typically take 3–7 days.' },
    ],
  },
  'overdraft': {
    title: `Best Business Bank Accounts with Overdraft UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts with Overdraft',
    description: 'Compare UK business bank accounts that offer overdraft facilities. Find accounts with flexible credit for your business.',
    intro: 'An overdraft can be a vital safety net for businesses managing cash flow. Not all business bank accounts offer overdrafts — here are the ones that do.',
    getBanks: () => getBanksByType('overdraft'),
    faq: [
      { q: 'Which business bank accounts offer overdrafts?', a: 'High street banks like Barclays, HSBC, NatWest, and Lloyds all offer business overdrafts. Starling Bank also offers an overdraft facility for eligible businesses.' },
    ],
  },
  'multi-currency': {
    title: `Best Multi-Currency Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best Multi-Currency Business Bank Accounts',
    description: 'Compare the best UK multi-currency business bank accounts for international businesses.',
    intro: 'Multi-currency business accounts let you hold, send, and receive money in multiple currencies — ideal for businesses with international clients or suppliers.',
    getBanks: () => getBanksBySuitability('international'),
    faq: [
      { q: 'What is the best multi-currency business account?', a: 'Wise Business is our top pick — it holds 40+ currencies at the real exchange rate. Revolut Business and Airwallex are also excellent.' },
    ],
  },
  'cash-deposit': {
    title: `Best Business Bank Accounts for Cash Deposits UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for Cash Deposits',
    description: 'Compare UK business bank accounts that accept cash deposits. Find accounts with Post Office or branch cash deposit facilities.',
    intro: 'If your business handles cash regularly, you need an account that makes depositing it easy and affordable. Here are the best options.',
    getBanks: () => getBanksByType('cash-deposit'),
    faq: [
      { q: 'Which business bank accounts accept cash deposits?', a: 'High street banks accept cash at branches. Starling and Tide accept cash via Post Office. Monzo accepts cash via PayPoint. Revolut does not accept cash deposits.' },
    ],
  },
  'accounting': {
    title: `Best Business Bank Accounts with Accounting Integration UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts with Accounting Integration',
    description: 'Compare UK business bank accounts that integrate with Xero, QuickBooks, FreeAgent, and other accounting software.',
    intro: 'Connecting your business bank account to your accounting software saves hours of manual data entry. Here are the best accounts with accounting integrations.',
    getBanks: () => getBanksByType('accounting'),
    faq: [
      { q: 'Which business bank accounts integrate with Xero?', a: 'Starling Bank, Monzo Business, Tide, Barclays, NatWest, and most major banks integrate with Xero. Starling and Monzo also integrate with QuickBooks and FreeAgent.' },
    ],
  },
  'small-business': {
    title: `Best Business Bank Accounts for Small Businesses UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for Small Businesses',
    description: 'Compare the best UK business bank accounts for small businesses. Find the right account for your SME.',
    intro: 'Small businesses need a bank account that balances cost, features, and reliability. Here are our top picks for UK small businesses.',
    getBanks: () => getBanksBySuitability('small-business'),
    faq: [
      { q: 'What is the best bank account for a small business?', a: 'For most small businesses, Starling Bank (free, FSCS protected) or Tide (excellent invoicing) are our top picks. For businesses needing branch access, Barclays or NatWest are recommended.' },
    ],
  },
  'partnership': {
    title: `Best Business Bank Accounts for Partnerships UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for Partnerships',
    description: 'Compare the best UK business bank accounts for business partnerships. Find accounts that support multiple directors and signatories.',
    intro: 'Business partnerships need an account that supports multiple signatories and provides clear visibility of shared finances.',
    getBanks: () => getBanksBySuitability('partnership'),
    faq: [
      { q: 'Can a partnership open a business bank account?', a: 'Yes — most UK banks accept partnership applications. You will typically need details of all partners and a partnership agreement.' },
    ],
  },
  'ecommerce': {
    title: `Best Business Bank Accounts for E-commerce UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for E-commerce Businesses',
    description: 'Compare the best UK business bank accounts for e-commerce and online businesses.',
    intro: 'E-commerce businesses need accounts that handle high transaction volumes, integrate with payment processors, and support international payments.',
    getBanks: () => getBanksBySuitability('ecommerce'),
    faq: [
      { q: 'What is the best bank account for an e-commerce business?', a: 'Revolut Business and Wise Business are excellent for e-commerce, offering multi-currency support and competitive rates. Starling and Monzo are also popular for their API integrations.' },
    ],
  },
  'charity': {
    title: `Best Business Bank Accounts for Charities UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for Charities',
    description: 'Compare the best UK business bank accounts for charities and non-profit organisations.',
    intro: 'Charities and non-profits have specific banking needs, including multiple signatories, transparent reporting, and ethical banking options.',
    getBanks: () => getBanksBySuitability('charity'),
    faq: [
      { q: 'What is the best bank account for a charity?', a: 'The Co-operative Bank is well-known for its ethical banking and charity-friendly policies. Barclays and NatWest also offer specific charity account products.' },
    ],
  },
  'no-credit-check': {
    title: `Best Business Bank Accounts with No Credit Check UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts with No Credit Check',
    description: 'Compare UK business bank accounts that do not require a credit check. Open an account even with a poor credit history.',
    intro: 'Several UK business bank accounts can be opened without a credit check — ideal for new businesses, those with a thin credit file, or anyone who has been declined elsewhere.',
    getBanks: () => getBanksByType('no-credit-check'),
    faq: [
      { q: 'Can I open a business bank account with bad credit?', a: 'Yes — several accounts including Zempler Bank, Tide, and Revolut do not require a credit check. These are ideal if you have been declined by a high street bank.' },
    ],
  },
  'bad-credit': {
    title: `Best Business Bank Accounts for Bad Credit UK ${new Date().getFullYear()}`,
    h1: 'Best Business Bank Accounts for Bad Credit',
    description: 'Compare UK business bank accounts for businesses with bad credit or a poor credit history.',
    intro: 'Having a poor credit history does not mean you cannot get a business bank account. Several UK banks specialise in accounts for businesses that have been declined elsewhere.',
    getBanks: () => getBanksBySuitability('bad-credit'),
    faq: [
      { q: 'Can I get a business bank account with bad credit?', a: 'Yes — Zempler Bank (formerly Cashplus) specialises in accounts for businesses with bad credit. Tide and Revolut also do not run credit checks.' },
      { q: 'Which banks do not credit check for business accounts?', a: 'Zempler Bank, Tide, Revolut, ANNA Money, Wallester, Monzo, and CountingUp all offer accounts without a credit check. These are ideal for businesses that have been declined elsewhere.' },
    ],
  },
  'corporate': {
    title: `Best Corporate Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best Corporate Business Bank Accounts',
    description: 'Compare UK corporate business bank accounts for larger businesses, PLCs, and established companies.',
    intro: 'Larger businesses and corporate entities require more sophisticated banking services — including relationship managers, higher transaction limits, multi-currency capabilities, and dedicated business support. Here are the best corporate business bank accounts in the UK.',
    getBanks: () => getBanksByType('corporate'),
    faq: [
      { q: 'What is a corporate business bank account?', a: 'A corporate business bank account is designed for larger businesses with more complex banking needs. They typically offer higher transaction limits, dedicated relationship managers, and a wider range of financial products.' },
      { q: 'Which banks offer corporate business accounts?', a: 'HSBC, Barclays, NatWest, and Lloyds all offer dedicated corporate banking services for larger businesses. Revolut Business and Airwallex also offer corporate-grade features for growing businesses.' },
    ],
  },
  'multi-director': {
    title: `Best Multi-Director Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best Multi Director Business Bank Accounts',
    description: 'Compare UK business bank accounts that support multiple directors and signatories for limited companies.',
    intro: 'Limited companies with multiple directors need a business bank account that supports multiple signatories, provides clear access controls, and makes it easy to manage shared finances. Most UK business bank accounts support multiple directors, but the ease of adding them varies significantly.',
    getBanks: () => getBanksBySuitability('limited-company'),
    faq: [
      { q: 'Can multiple directors share a business bank account?', a: 'Yes — most UK business bank accounts support multiple directors and signatories. You can typically set different permission levels for each director.' },
      { q: 'Which business bank accounts are best for multiple directors?', a: 'Starling Bank, Monzo Business, and Tide all support multiple directors with easy online management. High street banks like Barclays and NatWest also support multi-director accounts.' },
    ],
  },
  'joint': {
    title: `Best Joint Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best Joint Business Bank Accounts',
    description: 'Compare UK joint business bank accounts for partnerships, co-founders, and businesses with multiple owners.',
    intro: 'Joint business bank accounts allow two or more people to share access to a business account. They are ideal for business partnerships, husband-and-wife businesses, and companies with multiple co-founders. Most UK business banks support joint accounts with customisable access levels.',
    getBanks: () => getBanksBySuitability('partnership'),
    faq: [
      { q: 'Can two people share a business bank account?', a: 'Yes — most UK business bank accounts support joint access. You can typically add multiple account holders with different permission levels.' },
      { q: 'What is the best joint business bank account?', a: 'Starling Bank and Monzo Business are our top picks for joint accounts — they offer easy online management of multiple users. For partnerships, Barclays and NatWest also offer strong joint account features.' },
    ],
  },
  'switcher': {
    title: `Best Switcher Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best Switcher Business Bank Accounts',
    description: 'Compare the best UK business bank accounts for switching. Use the Current Account Switch Service to move your account easily.',
    intro: 'Switching your business bank account has never been easier. The Current Account Switch Service (CASS) guarantees a smooth switch within 7 working days, with all payments automatically redirected. Many banks offer incentives for switchers — including cashback, fee waivers, and welcome bonuses.',
    getBanks: () => getBanksByType('switcher'),
    faq: [
      { q: 'How do I switch my business bank account?', a: 'Use the Current Account Switch Service (CASS) — available at most major UK banks. The switch takes 7 working days and all your payments are automatically redirected. You can initiate the switch at your new bank.' },
      { q: 'Will switching affect my business credit score?', a: 'Switching itself does not affect your credit score. However, applying for a new account may involve a credit check, which could leave a soft or hard footprint depending on the bank.' },
    ],
  },
  'online': {
    title: `Best Online Business Bank Accounts UK ${new Date().getFullYear()}`,
    h1: 'Best Online Business Bank Accounts',
    description: 'Compare the best fully digital UK business bank accounts. Manage everything online with no branch visits required.',
    intro: 'Online business bank accounts let you manage all your banking digitally — from opening the account to making payments, checking statements, and integrating with accounting software. The best online accounts offer powerful mobile apps, instant notifications, and seamless integrations.',
    getBanks: () => getBanksByType('online'),
    faq: [
      { q: 'Are online business bank accounts safe?', a: 'Yes — all FCA-regulated online business banks use bank-grade security including two-factor authentication, biometric login, and real-time fraud monitoring.' },
      { q: 'Can I manage my entire business banking online?', a: 'Yes — with most digital banks like Starling, Monzo, and Tide, you can do everything online: open an account, make payments, manage expenses, and integrate with accounting software.' },
    ],
  },
};

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || '';
  const config = categoryConfigs[slug];

  if (!config) {
    return <NotFound />;
  }

  const categoryBanks = sortBanksByCategory(config.getBanks(), slug);

  const categorySchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: config.h1,
      description: config.description,
      numberOfItems: categoryBanks.length,
      itemListElement: categoryBanks.slice(0, 10).map((bank, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${bank.name} Business Bank Account`,
        url: `https://businessbankcompare.co.uk/${bank.slug}`,
        description: bank.tagline,
      })),
    },
    ...(config.faq && config.faq.length > 0 ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: config.faq.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
      <SEO
        title={config.title}
        description={config.description}
        keywords={`${config.h1.toLowerCase()}, compare business bank accounts, best business bank account UK, business banking UK, ${slug.replace(/-/g, ' ')} bank account`}
        canonicalPath={`/category/${slug}`}
        dateModified={new Date().toISOString().split('T')[0]}
        breadcrumbs={[
          { name: 'Home', url: 'https://businessbankcompare.co.uk/' },
          { name: 'Compare Accounts', url: 'https://businessbankcompare.co.uk/compare' },
          { name: config.h1, url: `https://businessbankcompare.co.uk/category/${slug}` },
        ]}
        schema={categorySchema}
      />
      <Navigation />
      <div style={{ paddingTop: '88px' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#0f172a', minHeight: '220px' }}>
        <div className="relative container py-12">
          <nav className="flex items-center gap-2 text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-white no-underline text-white/80">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">{config.h1}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            {config.h1}
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {config.description}
          </p>
        </div>
      </section>

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Intro */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <p className="text-sm leading-relaxed text-gray-700">
                {config.intro}
              </p>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                {categoryBanks.length} Accounts Found
              </h2>
            </div>

            <div className="space-y-4 mb-10">
              {categoryBanks.map((bank, index) => (
                <BankCard key={bank.id} bank={bank} rank={index + 1} />
              ))}
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                {config.faq.map((item) => (
                  <div key={item.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <h3 className="font-bold text-sm mb-2 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                      {item.q}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bank-card p-5">
                <h3 className="font-bold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Account Categories
                </h3>
                <ul className="space-y-1.5">
                  {[
                    { key: 'fast-opening',    label: 'Fast Opening Accounts' },
                    { key: 'accounting',      label: 'With Accountancy' },
                    { key: 'cash-deposit',    label: 'Cash Deposit Accounts' },
                    { key: 'branch-access',   label: 'Branch Access Accounts' },
                    { key: 'freelancer',      label: 'Freelancer Accounts' },
                    { key: 'startup',         label: 'Startup Accounts' },
                    { key: 'free-business-accounts', label: 'Free Business Accounts' },
                    { key: 'joint',           label: 'Joint Business Accounts' },
                    { key: 'overdraft',       label: 'Accounts With Overdraft' },
                    { key: 'app-only-banks',  label: 'Online Business Accounts' },
                    { key: 'sole-trader',     label: 'Sole Trader Accounts' },
                    { key: 'multi-director',  label: 'Multi Director Accounts' },
                    { key: 'no-credit-check', label: 'No Credit Check Accounts' },
                    { key: 'switcher',        label: 'Switcher Accounts' },
                    { key: 'small-business',  label: 'Small Business Accounts' },
                    { key: 'bad-credit',      label: 'Bad Credit Accounts' },
                    { key: 'corporate',       label: 'Corporate Accounts' },
                    { key: 'international',   label: 'International Accounts' },
                    { key: 'multi-currency',  label: 'Multi-Currency Accounts' },
                    { key: 'high-street-banks', label: 'High Street Banks' },
                  ].filter(item => item.key !== slug).map(item => (
                    <li key={item.key}>
                      <Link
                        href={`/category/${item.key}`}
                        className="text-sm hover:text-blue-700 flex items-center gap-1 no-underline text-blue-600"
                      >
                        <ChevronRight className="w-3 h-3" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bank-card p-5">
                <h3 className="font-bold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Useful Guides
                </h3>
                <ul className="space-y-2">
                  {[
                    { label: 'How to Open a Business Account', href: '/guides/how-to-open-a-business-bank-account' },
                    { label: 'Best Free Accounts', href: '/guides/best-free-business-bank-accounts' },
                    { label: 'Fees Explained', href: '/guides/business-bank-account-fees' },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-sm hover:text-blue-700 flex items-center gap-1 no-underline text-blue-600">
                        <ChevronRight className="w-3 h-3" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
      </div>
    </div>
  );
}
