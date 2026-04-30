import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Phone, Menu, X } from "lucide-react";
import logo from "../assets/logo.webp";
import { useQuoteForm } from "../contexts/QuoteFormContext";

const NAV_ITEMS = [
  { label: "About", hash: "about" },
  { label: "Services", hash: "services" },
  { label: "Reviews", hash: "reviews" },
  { label: "FAQ", hash: "faq" },
  { label: "Contact", hash: "contact" },
];

interface HeaderProps {
  variant?: "transparent" | "solid";
}

export function Header({ variant = "solid" }: HeaderProps) {
  const [location, setLocation] = useLocation();
  const { open: openQuote } = useQuoteForm();
  const [mobileOpen, setMobileOpen] = useState(false);
  const onHome = location === "/" || location === "";

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  function goToSection(hash: string) {
    setMobileOpen(false);
    if (onHome) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setLocation("/");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  const isTransparent = variant === "transparent";

  return (
    <header
      className={
        isTransparent
          ? "absolute top-0 left-0 right-0 z-30 pt-6"
          : "relative z-30 bg-brand-green-dark border-b-4 border-brand-gold"
      }
    >
      <nav className="w-full px-6 md:px-12 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          aria-label="Adams Lawn Service home"
          className="block w-24 sm:w-32 md:w-44 flex-shrink-0"
          onClick={() => setMobileOpen(false)}
        >
          <img src={logo} alt="Adams Lawn Service Logo" className="w-full h-auto drop-shadow-md" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.hash}>
              <button
                type="button"
                onClick={() => goToSection(item.hash)}
                className="text-brand-cream font-bold uppercase tracking-widest text-xs hover:text-brand-gold transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-1 sm:gap-3 md:gap-6">
          <a
            href="tel:9317039549"
            className="text-brand-cream hidden md:flex items-center gap-2 font-medium tracking-wide hover:text-brand-gold transition-colors"
          >
            <Phone size={18} />
            (931) 703-9549
          </a>
          {/* Mobile-only tap-to-call icon */}
          <a
            href="tel:9317039549"
            aria-label="Call (931) 703-9549"
            className="md:hidden text-brand-cream p-2 hover:text-brand-gold transition-colors"
          >
            <Phone size={22} />
          </a>
          <button
            type="button"
            onClick={openQuote}
            className="hidden sm:inline-block bg-brand-gold text-brand-green-dark px-5 md:px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-brand-gold-light transition-colors"
          >
            Get a Quote
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden text-brand-cream p-2 -mr-2 hover:text-brand-gold transition-colors"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-brand-green-dark border-t border-brand-gold/30">
          <ul className="px-6 py-4 max-w-7xl mx-auto">
            {NAV_ITEMS.map((item) => (
              <li key={item.hash}>
                <button
                  type="button"
                  onClick={() => goToSection(item.hash)}
                  className="block w-full text-left py-3 text-brand-cream font-bold uppercase tracking-widest text-sm hover:text-brand-gold transition-colors border-b border-brand-cream/10"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="pt-4 flex flex-col gap-3">
              <a
                href="tel:9317039549"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 text-brand-cream border border-brand-cream/30 py-3 font-bold uppercase tracking-widest text-sm hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                <Phone size={18} />
                (931) 703-9549
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openQuote();
                }}
                className="bg-brand-gold text-brand-green-dark py-3 font-bold uppercase tracking-widest text-sm hover:bg-brand-gold-light transition-colors"
              >
                Get a Quote
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
