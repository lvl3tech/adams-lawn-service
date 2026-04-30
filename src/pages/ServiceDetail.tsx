import { useEffect } from "react";
import { Link, useRoute, Redirect } from "wouter";
import { ChevronLeft, ChevronRight, Check, Phone } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { useQuoteForm } from "../contexts/QuoteFormContext";
import {
  getServiceBySlug,
  SERVICE_CATEGORY_LABELS,
} from "../data/services";
import {
  SERVICE_SEO,
  buildServiceJsonLd,
  buildServiceBreadcrumb,
} from "../data/seo";

export function ServiceDetail() {
  const [, params] = useRoute<{ slug: string }>("/services/:slug");
  const slug = params?.slug ?? "";
  const service = getServiceBySlug(slug);
  const { open: openQuote } = useQuoteForm();

  useEffect(() => {
    if (!service) return;
    window.scrollTo(0, 0);
  }, [service]);

  if (!service) {
    return <Redirect to="/" />;
  }

  const seoEntry = SERVICE_SEO[service.slug];
  const seoTitle =
    seoEntry?.title ??
    `${service.title} — Adams Lawn Service & Landscaping`;
  const seoDescription = seoEntry?.description ?? service.intro;

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={`/services/${service.slug}`}
        jsonLd={[
          buildServiceJsonLd(service.slug, service.title, service.intro),
          buildServiceBreadcrumb(service.slug, service.title),
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative bg-brand-green-dark text-brand-cream overflow-hidden border-b-4 border-brand-gold">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-brand-green-dark/70 to-brand-green-dark/40"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 md:px-12 py-16 md:py-24 lg:py-28">
          <Link
            href="/#services"
            className="inline-flex items-center gap-1 text-brand-cream/70 hover:text-brand-gold text-xs uppercase tracking-widest font-bold mb-6 md:mb-8 transition-colors"
          >
            <ChevronLeft size={16} /> All services
          </Link>
          <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-3">
            {SERVICE_CATEGORY_LABELS[service.category]}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-cream mb-4 md:mb-6 leading-[1.05] [text-wrap:balance]">
            {service.title}
          </h1>
          <p className="text-brand-cream/85 text-base sm:text-lg md:text-xl max-w-2xl font-medium">
            {service.intro}
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={openQuote}
              className="bg-brand-gold text-brand-green-dark px-6 sm:px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base hover:bg-brand-gold-light transition-colors"
            >
              Get a Quote
            </button>
            <a
              href="tel:9317039549"
              className="inline-flex items-center justify-center gap-2 bg-brand-green-dark/40 backdrop-blur border border-brand-gold/30 text-brand-cream px-6 sm:px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base hover:bg-brand-green hover:border-brand-gold transition-colors"
            >
              <Phone size={18} />
              (931) 703-9549
            </a>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="bg-brand-cream py-14 md:py-20 bg-topo">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-green-dark mb-6 md:mb-8 [text-wrap:balance]">
              Designed with intent. Built to last.
            </h2>
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {service.whatItIs.map((item, i) => (
                <div
                  key={i}
                  className="bg-brand-paper p-5 sm:p-6 border-t-4 border-brand-green text-brand-text font-medium leading-relaxed"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our process */}
      <section className="bg-brand-green-dark text-brand-cream py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="uppercase tracking-widest text-brand-gold text-xs sm:text-sm font-bold">
                How we do it
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-cream mb-10 md:mb-12 [text-wrap:balance]">
              Our process for {service.title.toLowerCase()}.
            </h2>
          </Reveal>

          <ol className="space-y-6 md:space-y-8">
            {service.ourProcess.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <li className="flex gap-5 sm:gap-6 md:gap-8 border-l-2 border-brand-gold/30 pl-5 sm:pl-6 md:pl-8 relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-brand-gold text-brand-green-dark flex items-center justify-center font-display text-sm font-bold"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-brand-gold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-brand-cream/85 leading-relaxed font-medium text-base sm:text-lg max-w-3xl">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-brand-paper py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="uppercase tracking-widest text-brand-green text-xs sm:text-sm font-bold">
                What's included
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-green-dark mb-4 [text-wrap:balance]">
              Every job, every time.
            </h2>
            <p className="text-brand-text/80 font-medium leading-relaxed">
              No nickel-and-diming. Here's what's in the price when you hire us
              for {service.title.toLowerCase()}.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-3 md:space-y-4">
              {service.included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 sm:gap-4 bg-brand-cream border border-brand-green-dark/10 px-4 sm:px-5 py-3 sm:py-4"
                >
                  <Check
                    size={20}
                    className="text-brand-gold shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-brand-text font-medium leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-brand-green text-brand-cream py-14 md:py-20 border-y border-brand-green-light">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12 text-center">
          <Reveal>
            <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-4">
              Why it matters
            </p>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-cream leading-snug [text-wrap:balance]">
              {service.whyItMatters}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      {service.related.length > 0 && (
        <section className="bg-brand-cream py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12">
            <Reveal>
              <div className="flex items-center justify-between mb-8 md:mb-10 gap-6 flex-wrap">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-green-dark [text-wrap:balance]">
                  Pairs well with.
                </h2>
                <Link
                  href="/#services"
                  className="text-brand-green-dark font-bold uppercase tracking-widest text-xs sm:text-sm hover:text-brand-gold transition-colors inline-flex items-center gap-1"
                >
                  All services <ChevronRight size={16} />
                </Link>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {service.related
                .map((s) => getServiceBySlug(s))
                .filter((s): s is NonNullable<typeof s> => Boolean(s))
                .map((rel, i) => (
                  <Reveal key={rel.slug} delay={i * 0.06}>
                    <Link
                      href={`/services/${rel.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-brand-green">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <h3 className="font-display text-xl text-brand-green-dark group-hover:text-brand-gold transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-brand-text/70 text-sm font-medium mt-1">
                        {rel.shortTagline}
                      </p>
                    </Link>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-green-dark text-brand-cream py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-cream mb-4 md:mb-6 [text-wrap:balance]">
              Ready to start your{" "}
              <span className="text-brand-gold italic">project</span>?
            </h2>
            <p className="text-brand-cream/80 text-base sm:text-lg font-medium max-w-xl mx-auto mb-8">
              Tell us a little about your property and we'll put a quote
              together. No pressure, no upsell.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={openQuote}
                className="bg-brand-gold text-brand-green-dark px-6 sm:px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base hover:bg-brand-gold-light transition-colors"
              >
                Start Your Quote
              </button>
              <a
                href="tel:9317039549"
                className="bg-transparent border-2 border-brand-cream/40 text-brand-cream px-6 sm:px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                Call (931) 703-9549
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
