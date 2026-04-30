import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./Reveal";

const faqs = [
  {
    question: "What is the best way to get a quote?",
    answer: "The fastest way is to call or text (931) 703-9549, or use the Get a Quote form on this site. For most jobs we'll do a free on-site walk-through so the estimate reflects your actual property — slope, access, plant material, and the work you want done."
  },
  {
    question: "Is the estimate free, and how long is it good for?",
    answer: "Yes — estimates are always free and there is no obligation. Quotes are typically honored for 30 days. If material costs shift significantly during that window we'll let you know before any work starts."
  },
  {
    question: "Are you licensed and fully insured?",
    answer: "Absolutely. We carry general liability and workers' compensation insurance and we're happy to provide a Certificate of Insurance to homeowners, HOAs, or commercial property managers on request."
  },
  {
    question: "What areas do you serve?",
    answer: "We started in Shelbyville and have grown to serve commercial and residential properties across all of Middle Tennessee — including Bedford, Cannon, Cheatham, Coffee, Davidson (Nashville), DeKalb, Dickson, Franklin, Giles, Hickman, Lawrence, Lincoln, Marshall, Maury, Montgomery, Moore, Robertson, Rutherford (Murfreesboro), Sumner, Warren, Williamson, and Wilson counties."
  },
  {
    question: "Do you offer weekly mowing? What does a typical season look like?",
    answer: "Yes. Most residential properties are on a weekly schedule during the growing season (roughly April through October) and shift to bi-weekly or as-needed in the cooler months. Commercial schedules are tailored to the property — let us know what you need and we'll build a plan."
  },
  {
    question: "How much does lawn service cost?",
    answer: "Pricing depends on lot size, terrain, and the level of service you want. Recurring mowing is quoted as a flat per-visit rate so you know exactly what to expect each month. Landscape projects are quoted as a fixed scope with a written estimate before any work begins."
  },
  {
    question: "What forms of payment do you accept?",
    answer: "We accept check, ACH/bank transfer, and major credit cards. Recurring service customers can be invoiced monthly. We do not require autopay."
  },
  {
    question: "Do I have to sign a long-term contract?",
    answer: "No. Recurring lawn service is a simple seasonal agreement — you can pause or cancel with reasonable notice. Landscape and hardscape projects use a one-time written contract that spells out scope, materials, and price up front."
  },
  {
    question: "What happens if it rains on my scheduled service day?",
    answer: "If the ground is too wet to mow safely, or if there's lightning in the area, we reschedule — usually within a day or two. We'll always communicate so you're not left wondering."
  },
  {
    question: "Do I need to be home when you come out?",
    answer: "No. Once we have access (and any gate codes or pet notes), we can service the property whether you're home or not. For first-time visits or quote walk-throughs, it's helpful but not required."
  },
  {
    question: "Are your fertilizers and treatments safe for kids and pets?",
    answer: "Yes, when applied correctly. We use professional-grade products applied at labeled rates. The standard guidance is to keep kids and pets off treated turf until the application has dried — typically a couple of hours. We'll let you know after each treatment."
  },
  {
    question: "Do you offer landscape design as well as installation?",
    answer: "Yes. We design and install — patios, walls, beds, and full landscape plans. The on-site consultation is part of how we work; we walk the property with you, talk through how you want to use the space, and put together a layout and material recommendation before any work starts."
  },
  {
    question: "Do you offer a warranty on plants or hardscape work?",
    answer: "Hardscape construction (patios, walls, steps) carries a workmanship warranty against settling and structural issues caused by our installation. Plants installed by us are typically warranted for one season when the property is on our care plan or the customer follows the watering plan we provide."
  },
  {
    question: "How do I water new sod, plants, or beds you've installed?",
    answer: "We give every customer a written watering plan after install. The general rule for new sod is daily watering for the first 10–14 days, then tapering as roots take hold. New plantings need consistent moisture through their first growing season. We'll walk you through the specifics for your job."
  },
  {
    question: "Do you handle leaf removal and gutter cleaning?",
    answer: "Yes — leaf removal is part of our fall cleanup service. Hauling away leaves and debris is included so nothing is left at the curb. Gutter cleaning can be added as an optional add-on."
  },
  {
    question: "Do you do snow removal?",
    answer: "Yes. We provide plowing, shoveling, and ice melt service for residential and commercial properties when Middle Tennessee weather calls for it. Set this up before the season so you're on the priority list."
  },
  {
    question: "Can you work with my HOA or property management company?",
    answer: "Yes. We work with HOAs and commercial property managers regularly and can provide insurance certificates, W-9s, lien waivers, and any documentation your management company requires."
  },
  {
    question: "How long has Adams Lawn Service been in business?",
    answer: "Since 1987 — that's 39 years and counting. We're family-owned and based in Shelbyville, currently led by Owner & President Colby Melson. What started as one mower serving our neighbors has grown into a full-service landscape and lawn care company across Middle Tennessee — but you're still talking directly to the family when you call."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-brand-green text-brand-cream border-y border-brand-green-light">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-12">
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-cream mb-4 md:mb-6 [text-wrap:balance]">
              Common <span className="text-brand-gold italic">Questions</span>.
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: Math.min(index, 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="border border-brand-green-light bg-brand-green-dark/30 rounded-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-brand-green-dark/50 transition-colors"
              >
                <span className="font-bold text-base sm:text-lg md:text-xl text-brand-cream pr-6 sm:pr-8">{faq.question}</span>
                <span className="text-brand-gold shrink-0">
                  {openIndex === index ? <Minus size={22} /> : <Plus size={22} />}
                </span>
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 sm:p-6 pt-0 text-brand-cream/80 text-base sm:text-lg leading-relaxed font-medium">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
