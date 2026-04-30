import { motion } from "framer-motion";
import heroImg from "../assets/hero.webp";
import heroMobileImg from "../assets/hero-mobile.webp";
import { useQuoteForm } from "../contexts/QuoteFormContext";

export function Hero() {
  const { open } = useQuoteForm();
  return (
    <section className="relative min-h-[92svh] sm:min-h-[88svh] flex flex-col pt-32 sm:pt-32 md:pt-32 overflow-hidden bg-brand-green-dark">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={heroMobileImg} />
            <img
              src={heroImg}
              alt="Beautiful Tennessee Landscape"
              className="w-full h-full object-cover object-center opacity-70"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-brand-green-dark/60 to-transparent mix-blend-multiply"></div>
        </motion.div>
      </div>
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-5 sm:px-6 pb-16 md:pb-20 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <h1 className="text-brand-cream text-[1.6rem] xs:text-[1.8rem] sm:text-3xl md:text-[2.8rem] lg:text-[3.4rem] leading-[1.1] sm:leading-[1] mb-5 sm:mb-6 drop-shadow-xl break-words">
            EXCEPTIONAL,<br />
            <span className="text-brand-gold italic font-light tracking-tight">PROFESSIONAL</span><br />
            LANDSCAPERS.
          </h1>
          <p className="text-brand-cream/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 font-medium">Most trusted lawn care, hardscaping, and property maintenance in Middle Tennessee since 1987.</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full">
            <button
              type="button"
              onClick={open}
              className="w-full sm:w-auto bg-brand-gold text-brand-green-dark px-6 sm:px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-brand-gold-light transition-colors text-center text-sm sm:text-base"
            >
              Get a Quote
            </button>
            <a
              href="tel:9317039549"
              className="w-full sm:w-auto bg-brand-green-dark/80 backdrop-blur border border-brand-gold/30 text-brand-cream px-6 sm:px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-brand-green hover:border-brand-gold transition-colors text-center text-sm sm:text-base"
            >
              Call (931) 703-9549
            </a>
            <a
              href="sms:+19317039549"
              className="w-full sm:w-auto bg-brand-green-dark/80 backdrop-blur border border-brand-gold/30 text-brand-cream px-6 sm:px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-brand-green hover:border-brand-gold transition-colors text-center text-sm sm:text-base"
            >
              Text Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
