// App router — all routes wired
// Each page manages its own Navigation + Footer

import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import BankReview from "./pages/BankReview";
import CategoryPage from "./pages/CategoryPage";
import GuidePage from './pages/GuidePage';
import GuidesHub from './pages/GuidesHub';
import GuidesCategory from './pages/GuidesCategory';
import LegalPage from './pages/LegalPage';
import ContactPage from './pages/ContactPage';
import FindMyAccount from './pages/FindMyAccount';
import CalculatorsHub from './pages/calculators/CalculatorsHub';
import BusinessCostCalculator from './pages/calculators/BusinessCostCalculator';
import FeeComparisonCalculator from './pages/calculators/FeeComparisonCalculator';
import SavingsInterestCalculator from './pages/calculators/SavingsInterestCalculator';
import StickyPromoBar from './components/StickyPromoBar';
import BusinessSavings from './pages/BusinessSavings';
import HowWeReview from './pages/HowWeReview';

// SEO Category Landing Pages
import BestStartupBankAccounts from './pages/seo/BestStartupBankAccounts';
import FreeBankAccounts from './pages/seo/FreeBankAccounts';
import SoleTraderBankAccounts from './pages/seo/SoleTraderBankAccounts';
import NoCreditCheckBankAccounts from './pages/seo/NoCreditCheckBankAccounts';
import LimitedCompanyBankAccounts from './pages/seo/LimitedCompanyBankAccounts';
import DigitalBankAccounts from './pages/seo/DigitalBankAccounts';

// Hub Pillar Pages
import StartingABusinessHub from './pages/hubs/StartingABusinessHub';
import BusinessBankingFeesHub from './pages/hubs/BusinessBankingFeesHub';
import SwitchingBankAccountHub from './pages/hubs/SwitchingBankAccountHub';
import BusinessBankingBySectorHub from './pages/hubs/BusinessBankingBySectorHub';

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Specific routes MUST come before the /:slug catch-all */}
        <Route path="/" component={Home} />
        <Route path="/compare" component={Compare} />
        <Route path="/find-my-account" component={FindMyAccount} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/calculators" component={CalculatorsHub} />
        <Route path="/calculators/business-cost" component={BusinessCostCalculator} />
        <Route path="/calculators/fee-comparison" component={FeeComparisonCalculator} />
        <Route path="/calculators/savings-interest" component={SavingsInterestCalculator} />
        <Route path="/business-savings" component={BusinessSavings} />
        <Route path="/how-we-review" component={HowWeReview} />

        {/* SEO Category Landing Pages */}
        <Route path="/best-business-bank-accounts-for-startups" component={BestStartupBankAccounts} />
        <Route path="/free-business-bank-accounts" component={FreeBankAccounts} />
        <Route path="/best-sole-trader-bank-accounts" component={SoleTraderBankAccounts} />
        <Route path="/business-bank-accounts-no-credit-check" component={NoCreditCheckBankAccounts} />
        <Route path="/best-business-bank-accounts-for-limited-companies" component={LimitedCompanyBankAccounts} />
        <Route path="/best-digital-business-bank-accounts" component={DigitalBankAccounts} />

        {/* Hub Pillar Pages */}
        <Route path="/guides/hub/starting-a-business-uk" component={StartingABusinessHub} />
        <Route path="/guides/hub/business-banking-fees-explained" component={BusinessBankingFeesHub} />
        <Route path="/guides/hub/switching-business-bank-account" component={SwitchingBankAccountHub} />
        <Route path="/guides/hub/business-banking-by-sector" component={BusinessBankingBySectorHub} />

        {/* Guides */}
        <Route path="/guides" component={GuidesHub} />
        <Route path="/guides/category/:categoryId">
          {(params) => <GuidesCategory categoryId={params.categoryId} />}
        </Route>
        <Route path="/guides/:slug" component={GuidePage} />

        {/* Legal */}
        <Route path="/privacy-policy">
          {() => <LegalPage slug="privacy-policy" />}
        </Route>
        <Route path="/cookie-policy">
          {() => <LegalPage slug="cookie-policy" />}
        </Route>
        <Route path="/terms-of-use">
          {() => <LegalPage slug="terms-of-use" />}
        </Route>
        <Route path="/editorial-policy">
          {() => <LegalPage slug="editorial-policy" />}
        </Route>
        <Route path="/contact" component={ContactPage} />

        {/* Bank review pages — /:slug (e.g. /starling-bank) — must be last specific route */}
        <Route path="/:slug" component={BankReview} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
            <StickyPromoBar />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
