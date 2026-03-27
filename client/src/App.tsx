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
import FindMyAccount from './pages/FindMyAccount';

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
        <Route path="/guides" component={GuidesHub} />
        <Route path="/guides/category/:categoryId">
          {(params) => <GuidesCategory categoryId={params.categoryId} />}
        </Route>
        <Route path="/guides/:slug" component={GuidePage} />
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
        <Route path="/contact">
          {() => <LegalPage slug="contact" />}
        </Route>
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
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
