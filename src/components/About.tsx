import { motion } from "framer-motion";
import landscapeImg from "../assets/landscape-wide.webp";
import { Reveal } from "./Reveal";

const VALUES = [
  {
    title: "Doing it right the first time",
    body:
      "We don't cut corners. Whether it's a custom patio or a weekly mow, our crews are trained to pay attention to the details — clean edges, deep mulch, straight lines.",
  },
  {
    title: "Honest communication",
    body:
      "We show up when we say we will. If weather delays us, we let you know. Transparent quotes, no hidden fees, and we'll never sell you a service your yard doesn't need.",
  },
  {
    title: "Our community",
    body:
      "We live here, we work here, and we raise our families here. The yards we landscape belong to our friends, our doctors, our kids' teachers — and we take pride in making Middle Tennessee a more beautiful place to live.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="bg-brand-cream relative overflow-hidden bg-topo border-b-2 border-brand-green-dark"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-brand-gold"></span>
                <span className="uppercase tracking-widest text-brand-green text-sm font-bold">
                  Our Family Story · Est. 1987
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-green-dark mb-6 md:mb-8 leading-tight [text-wrap:balance]">
                Family-owned for{" "}
                <span className="italic text-brand-gold">39 years</span>.
              </h2>

              <div className="space-y-5 md:space-y-6 text-brand-text/85 text-base sm:text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                <p>
                  Adams Lawn Service &amp; Landscaping is one of Middle
                  Tennessee's most trusted lawn care and landscaping companies —
                  a family-owned business that has been around for 39 years.
                </p>
                <p>
                  We started in 1987 with a simple promise: treat every yard as
                  if it were our own, and treat every customer like a neighbor.
                  Today, under the leadership of Owner &amp; President{" "}
                  <span className="text-brand-green-dark font-bold">
                    Colby Melson
                  </span>
                  , that promise is exactly the same.
                </p>
                <p>
                  What started as a single mower serving our neighbors has
                  expanded across Middle Tennessee. Today we proudly care for
                  homes and businesses throughout Bedford, Davidson, Williamson,
                  Rutherford, Maury, Marshall, Coffee, Moore, Lincoln, Wilson,
                  Sumner, Montgomery, and the surrounding counties — from basic
                  lawn maintenance to full-service landscape design, custom
                  hardscaping, and commercial property management. When you
                  call us, you're talking directly to the family.
                </p>
              </div>

              <div className="mt-10 md:mt-12 grid grid-cols-3 gap-4 sm:gap-6 pt-6 md:pt-8 border-t border-brand-green-dark/10">
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl text-brand-green-dark mb-1">
                    39
                  </h4>
                  <p className="text-[11px] sm:text-sm font-bold uppercase tracking-wider text-brand-gold leading-tight">
                    Years Serving Middle TN
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl text-brand-green-dark mb-1">
                    1000+
                  </h4>
                  <p className="text-[11px] sm:text-sm font-bold uppercase tracking-wider text-brand-gold leading-tight">
                    Satisfied Customers
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl text-brand-green-dark mb-1">
                    100%
                  </h4>
                  <p className="text-[11px] sm:text-sm font-bold uppercase tracking-wider text-brand-gold leading-tight">
                    Family-Owned &amp; Insured
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-3 bg-brand-paper shadow-xl lg:rotate-1 lg:hover:rotate-0 transition-transform duration-500"
            >
              <img
                src={landscapeImg}
                alt="Beautiful landscaping across Middle Tennessee by Adams Lawn Service"
                className="w-full h-auto object-cover border border-brand-green/20"
              />
              <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 bg-brand-green-dark text-brand-cream p-4 sm:p-6 shadow-lg rotate-[-3deg]">
                <p className="font-display text-lg sm:text-xl leading-tight">
                  Beautiful
                  <br />
                  <span className="text-brand-gold italic">landscaping</span>
                  <br />
                  across Middle TN.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="uppercase tracking-widest text-brand-green text-sm font-bold">
                What we care about
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-green-dark mb-10 md:mb-12 max-w-2xl [text-wrap:balance]">
              The way we run a job hasn't changed in 39 years.
            </h3>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="bg-brand-paper border-t-4 border-brand-green p-6 sm:p-8 h-full">
                  <h4 className="font-display text-xl sm:text-2xl text-brand-green-dark mb-3">
                    {value.title}
                  </h4>
                  <p className="text-brand-text/80 leading-relaxed font-medium">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-12 md:mt-16 bg-brand-green-dark text-brand-cream p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
              <div className="max-w-xl">
                <h4 className="font-display text-2xl sm:text-3xl mb-2 [text-wrap:balance]">
                  Let our family take care of your{" "}
                  <span className="text-brand-gold italic">property</span>.
                </h4>
                <p className="text-brand-cream/80 font-medium">
                  We'd love to come take a look at what you need done.
                </p>
              </div>
              <a
                href="#contact"
                className="shrink-0 inline-flex items-center justify-center bg-brand-gold text-brand-green-dark font-bold uppercase tracking-widest text-sm sm:text-base px-7 sm:px-9 py-4 sm:py-5 hover:bg-brand-cream transition-colors"
              >
                Request a Free Quote
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
