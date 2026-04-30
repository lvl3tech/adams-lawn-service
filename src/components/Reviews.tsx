import { motion } from "framer-motion";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Reveal } from "./Reveal";

const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJC3MtAgkFoQERnVehFQheoU0";
const FACEBOOK_REVIEW_URL =
  "https://www.facebook.com/share/18m4GNUVJW/?mibextid=wwXIfr";

const reviews = [
  {
    text: "Kris and his crew were great at communicating by keeping us posted and they were conscientious in their work. We now have the retaining wall and greenery to complete the project. Thanks so much, Adams Lawn Service! Job well done!",
    author: "Recent Customer",
    location: "Shelbyville, TN"
  },
  {
    text: "His recommendations were 'spot on' and the final product was amazing. My wife and I were very pleased and would highly recommend Chris and his team. We will be definitely utilizing their services in the future.",
    author: "Rob & Amber Brock",
    location: "Bell Buckle, TN"
  },
  {
    text: "We have used Adams for over a year and they have done incredible and meticulous work! Kris and his guys were so easy to work with and I have been recommending them to everyone I talk to.",
    author: "Loyal Customer",
    location: "Middle TN"
  },
  {
    text: "I thought we certainly got our money's worth with all the extra things they provided. The suggestion by Chris the owner of using sod in a barren area now looks amazing.",
    author: "Recent Customer",
    location: "Shelbyville, TN"
  }
];

export function Reviews() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-brand-paper bg-topo">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-green-dark mb-4 md:mb-6 [text-wrap:balance]">
              Word on the <span className="text-brand-gold italic">Street</span>.
            </h2>
            <p className="text-brand-text/80 text-base sm:text-lg font-medium">
              Don't just take our word for it. Here is what our neighbors in Middle Tennessee have to say about our work.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-brand-cream p-6 sm:p-8 md:p-10 border border-brand-green-dark/10 relative"
            >
              <div className="text-brand-gold text-5xl sm:text-6xl font-display absolute top-3 left-5 sm:top-4 sm:left-6 opacity-30">"</div>
              <p className="text-brand-text text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 relative z-10 font-medium">
                {review.text}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 border-t border-brand-green-dark/10 pt-4">
                <p className="font-bold text-brand-green uppercase tracking-widest text-xs sm:text-sm">
                  {review.author}
                </p>
                <p className="text-brand-gold text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {review.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16 bg-brand-cream border border-brand-green-dark/10 p-6 sm:p-8 md:p-10 text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-bold text-brand-gold mb-3">
              Worked with us?
            </p>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-green-dark mb-3 [text-wrap:balance]">
              Leave us a review.
            </h3>
            <p className="text-brand-text/80 text-sm sm:text-base font-medium max-w-xl mx-auto mb-6">
              A few honest words from neighbors like you help other Middle Tennessee families find a crew they can trust. Thank you.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Leave a review on Google (opens in a new tab)"
                className="inline-flex items-center justify-center gap-2 bg-brand-green-dark text-brand-cream font-bold uppercase tracking-widest text-xs sm:text-sm px-6 py-4 hover:bg-brand-green transition-colors"
              >
                <FaGoogle aria-hidden="true" size={16} />
                Review on Google
              </a>
              <a
                href={FACEBOOK_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Leave a review on Facebook (opens in a new tab)"
                className="inline-flex items-center justify-center gap-2 bg-brand-cream text-brand-green-dark border-2 border-brand-green-dark font-bold uppercase tracking-widest text-xs sm:text-sm px-6 py-4 hover:bg-brand-green-dark hover:text-brand-cream transition-colors"
              >
                <FaFacebookF aria-hidden="true" size={16} />
                Review on Facebook
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
