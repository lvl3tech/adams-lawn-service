import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Phone, MessageSquare } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  getServicesByCategory,
  SERVICE_CATEGORY_DESCRIPTIONS,
  SERVICE_CATEGORY_LABELS,
  type ServiceCategory,
} from "../data/services";

const CATEGORY_ORDER: ServiceCategory[] = ["landscape", "lawn-care"];

export function Services() {
  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-brand-green-dark text-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <Reveal>
          <div className="max-w-2xl mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-cream mb-4 md:mb-6 [text-wrap:balance]">
              Our <span className="text-brand-gold italic">Services</span>.
            </h2>
            <p className="text-brand-cream/80 text-base sm:text-lg">
              We build the landscapes that anchor a property — patios, walls,
              beds, and stonework — and we keep the rest of it sharp with
              year-round lawn care.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-14 md:mb-20">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-green-dark font-bold uppercase tracking-widest text-sm sm:text-base px-7 sm:px-9 py-4 sm:py-5 hover:bg-brand-cream transition-colors shadow-lg"
            >
              Request a Free Quote
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </a>
            <a
              href="tel:9317039549"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-cream/30 text-brand-cream font-bold uppercase tracking-widest text-sm sm:text-base px-7 sm:px-9 py-4 sm:py-5 hover:border-brand-gold hover:text-brand-gold transition-colors"
            >
              <Phone size={18} />
              Call (931) 703-9549
            </a>
            <a
              href="sms:+19317039549"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-cream/30 text-brand-cream font-bold uppercase tracking-widest text-sm sm:text-base px-7 sm:px-9 py-4 sm:py-5 hover:border-brand-gold hover:text-brand-gold transition-colors"
            >
              <MessageSquare size={18} />
              Text Us
            </a>
          </div>
        </Reveal>

        {CATEGORY_ORDER.map((category, catIndex) => {
          const services = getServicesByCategory(category);
          return (
            <div
              key={category}
              className={catIndex === 0 ? "mb-16 md:mb-20" : ""}
            >
              <Reveal>
                <div className="flex items-end justify-between gap-4 mb-8 md:mb-10 border-b border-brand-cream/10 pb-4 md:pb-5">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-cream">
                      {SERVICE_CATEGORY_LABELS[category]}
                    </h3>
                  </div>
                  <p className="hidden md:block text-brand-cream/60 text-sm max-w-md text-right font-medium">
                    {SERVICE_CATEGORY_DESCRIPTIONS[category]}
                  </p>
                </div>
                <p className="md:hidden text-brand-cream/70 text-sm font-medium mb-8">
                  {SERVICE_CATEGORY_DESCRIPTIONS[category]}
                </p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-12">
                {services.map((service, index) => (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 80, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-brand-green">
                        <img
                          src={service.image}
                          alt={`${service.title} for Adams Lawn Service & Landscaping in Shelbyville, TN`}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 border border-brand-cream/20 m-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-display text-2xl mb-3 text-brand-gold group-hover:text-brand-cream transition-colors">
                          {service.title}
                        </h4>
                        <ArrowUpRight
                          className="text-brand-gold/60 group-hover:text-brand-cream group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                          size={20}
                        />
                      </div>
                      <p className="text-brand-cream/70 leading-relaxed font-medium mb-4">
                        {service.cardDescription}
                      </p>
                      <span className="inline-flex items-center gap-1 text-brand-gold font-bold uppercase tracking-widest text-xs group-hover:gap-2 transition-all">
                        Learn more <ArrowRight size={14} />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
