import { Link } from "wouter";
import { Facebook } from "lucide-react";
import logo from "../assets/logo.webp";
import { SERVICES } from "../data/services";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100064565778911";

const SERVICE_LINKS = SERVICES.map((s) => ({ title: s.title, slug: s.slug }));

const COUNTIES = [
  "Bedford", "Cannon", "Cheatham", "Coffee", "Davidson", "DeKalb", "Dickson",
  "Franklin", "Giles", "Hickman", "Lawrence", "Lincoln", "Marshall", "Maury",
  "Montgomery", "Moore", "Robertson", "Rutherford", "Sumner", "Warren",
  "Williamson", "Wilson",
];

export function Footer() {
  return (
    <footer className="bg-brand-green-dark text-brand-cream pt-14 md:pt-20 pb-8 md:pb-10 border-t-8 border-brand-gold">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">

          <div className="lg:col-span-2">
            <div className="w-24 mb-6">
              <img src={logo} alt="Adams Lawn Service Logo" className="w-full h-auto drop-shadow-md" />
            </div>
            <p className="text-brand-cream/80 max-w-sm font-medium mb-6">
              Meticulous lawn care, hardscaping, and property maintenance in Middle Tennessee since 1987.
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-brand-gold font-bold text-xl tracking-wider">
                (931) 703-9549
              </p>
              <p className="text-brand-cream/70 text-sm font-medium uppercase tracking-widest">
                <a href="tel:9317039549" className="hover:text-brand-gold transition-colors">
                  Call
                </a>
                <span className="mx-2 text-brand-cream/40" aria-hidden="true">or</span>
                <a href="sms:+19317039549" className="hover:text-brand-gold transition-colors">
                  Text
                </a>
              </p>
            </div>
            <div className="mt-6">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Adams Lawn Service on Facebook"
                className="group inline-flex items-center gap-3 text-brand-cream/80 hover:text-brand-gold transition-colors"
              >
                <span className="w-10 h-10 rounded-full border-2 border-brand-cream/30 group-hover:border-brand-gold flex items-center justify-center transition-colors">
                  <Facebook size={18} aria-hidden="true" />
                </span>
                <span className="text-sm font-bold uppercase tracking-widest">
                  Follow us on Facebook
                </span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xl mb-6 text-brand-gold">Services</h4>
            <ul className="space-y-3 text-brand-cream/80 font-medium">
              {SERVICE_LINKS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-brand-gold transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl mb-6 text-brand-gold">Middle Tennessee Counties</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-brand-cream/80 font-medium text-sm">
              {COUNTIES.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-6 md:pt-8 border-t border-brand-cream/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 text-xs sm:text-sm text-brand-cream/60 font-medium uppercase tracking-widest">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Adams Lawn Service &amp; Landscaping, Inc.
              <span className="mx-2 text-brand-cream/30" aria-hidden="true">·</span>
              Shelbyville, TN
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <Link href="/privacy" className="hover:text-brand-gold transition-colors">
                Privacy
              </Link>
              <span className="text-brand-cream/30" aria-hidden="true">·</span>
              <Link href="/terms" className="hover:text-brand-gold transition-colors">
                Terms
              </Link>
            </div>
          </div>
          <p className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-brand-cream/5 text-center text-[11px] text-brand-cream/40 font-medium uppercase tracking-[0.2em]">
            Designed by{" "}
            <a
              href="https://getlvl3.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-cream/60 hover:text-brand-gold transition-colors"
            >
              LVL3 Technology Partners
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
