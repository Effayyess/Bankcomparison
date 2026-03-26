// Design: Authoritative Broadsheet | App router
// All routes wired: home, compare, review/:slug, category/:slug, guides/:slug, legal pages

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import BankReview from "./pages/BankReview";
import CategoryPage from "./pages/CategoryPage";
import GuidePage from "./pages/GuidePage";
import LegalPage from "./pages/LegalPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/compare" component={Compare} />
      <Route path="/review/:slug" component={BankReview} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/guides/:slug" component={GuidePage} />
      {/* Legal pages — use a wildcard path and pass slug as prop */}
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
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Layout />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
