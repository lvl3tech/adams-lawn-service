import { MotionConfig, AnimatePresence } from "framer-motion";
import { Switch, Route, useLocation } from "wouter";
import { Home } from "./pages/Home";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { ServiceDetail } from "./pages/ServiceDetail";
import { QuoteForm } from "./components/QuoteForm";
import { QuoteFormProvider } from "./contexts/QuoteFormContext";
import { PageTransition } from "./components/PageTransition";

export default function App() {
  const [location] = useLocation();
  return (
    <MotionConfig reducedMotion="never">
      <QuoteFormProvider>
        <div className="min-h-screen bg-brand-cream selection:bg-brand-gold selection:text-brand-green-dark">
          <AnimatePresence mode="wait">
            <PageTransition key={location}>
              <Switch location={location}>
                <Route path="/" component={Home} />
                <Route path="/services/:slug" component={ServiceDetail} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/terms" component={Terms} />
                <Route component={Home} />
              </Switch>
            </PageTransition>
          </AnimatePresence>
        </div>
        <QuoteForm />
      </QuoteFormProvider>
    </MotionConfig>
  );
}
