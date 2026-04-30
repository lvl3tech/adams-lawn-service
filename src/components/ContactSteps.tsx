import { motion } from "framer-motion";
import { ClipboardList, PhoneCall, ClipboardCheck } from "lucide-react";
import { useQuoteForm } from "../contexts/QuoteFormContext";
import { Reveal } from "./Reveal";

export function ContactSteps() {
  const { open } = useQuoteForm();
  return (
    <section id="contact" className="py-16 md:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          
          <Reveal className="lg:w-1/3 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-green-dark mb-4 md:mb-6 [text-wrap:balance]">
              Get a <span className="text-brand-gold italic">Quote</span>.
            </h2>
            <p className="text-brand-text/80 text-base sm:text-lg font-medium mb-6 md:mb-8">
              Receiving a quote is easy and only takes three simple steps. We're responsive, local, and ready to get our boots muddy.
            </p>
            <div className="space-y-3 md:space-y-4">
              <button 
                type="button"
                onClick={open}
                className="block w-full bg-brand-green text-brand-cream px-6 sm:px-8 py-4 text-center rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base hover:bg-brand-green-dark transition-colors"
              >
                Start Your Quote
              </button>
              <a 
                href="tel:9317039549"
                className="block w-full bg-transparent border-2 border-brand-green-dark text-brand-green-dark px-6 sm:px-8 py-4 text-center rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base hover:bg-brand-green-dark hover:text-brand-cream transition-colors"
              >
                Call (931) 703-9549
              </a>
            </div>
          </Reveal>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
            {[
              {
                step: "01",
                title: "Submit your request",
                icon: <ClipboardList size={32} className="text-brand-gold" />
              },
              {
                step: "02",
                title: "We confirm details",
                icon: <PhoneCall size={32} className="text-brand-gold" />
              },
              {
                step: "03",
                title: "Receive your quote",
                icon: <ClipboardCheck size={32} className="text-brand-gold" />
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 80, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="bg-brand-paper p-6 sm:p-8 flex flex-col items-start border-t-4 border-brand-green"
              >
                <div className="mb-6 sm:mb-8">
                  {item.icon}
                </div>
                <div className="mt-auto">
                  <p className="font-display text-3xl sm:text-4xl text-brand-green/20 mb-1 sm:mb-2">{item.step}</p>
                  <h3 className="font-bold text-base sm:text-lg md:text-xl text-brand-green-dark uppercase tracking-wide">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
