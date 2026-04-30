import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Seo } from "../components/Seo";
import { TERMS_SEO } from "../data/seo";

const LAST_UPDATED = "April 28, 2026";

export function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo
        title={TERMS_SEO.title}
        description={TERMS_SEO.description}
        path="/terms"
      />
      <Header />
      <main className="bg-brand-cream py-14 md:py-20">
        <article className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-brand-green-dark/60 hover:text-brand-green-dark text-xs uppercase tracking-widest font-bold mb-8"
          >
            <ChevronLeft size={16} /> Back to home
          </Link>

          <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs mb-3">Legal</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-green-dark mb-3">Terms of Service</h1>
          <p className="text-brand-text/60 text-sm font-medium mb-8 md:mb-12">Last updated: {LAST_UPDATED}</p>

          <div className="prose-content space-y-8 text-brand-text font-medium leading-relaxed">
            <section>
              <p>
                These Terms of Service ("Terms") govern your use of the Adams Lawn Service &amp;
                Landscaping, Inc. ("Adams Lawn Service," "we," "our," or "us") website and the
                services we provide. By using our website or requesting a quote, you agree to
                these Terms. Service work performed at your property is also subject to the
                separate written estimate, work order, or invoice we provide for that project,
                which will control if there is any conflict with these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">About our services</h2>
              <p>
                We offer residential and commercial lawn care, landscaping, hardscaping,
                seasonal cleanup, and snow services across Middle Tennessee. Specific services,
                schedules, scope, and pricing are agreed in writing on a per-project basis.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Quotes and estimates</h2>
              <p>
                Quotes provided through our website, by phone, by text, or by email are good-faith
                estimates based on the information you give us and our visual review of the
                property. Quotes are not binding contracts. Final pricing may change if the scope
                of work changes, if site conditions differ from what was described, or if access
                to the property is restricted. If pricing needs to change, we will discuss it with
                you before doing the additional work.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Scheduling and weather</h2>
              <p>
                Service dates are scheduled in good faith. Weather, prior-job overruns, equipment
                issues, or events outside our control may require us to reschedule. We will let
                you know as soon as possible if a visit needs to move and will work with you to
                find a new time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Property access and conditions</h2>
              <p>
                You agree to provide safe, reasonable access to the work area, including unlocking
                gates, removing personal property, and securing pets. You are responsible for
                identifying buried sprinkler lines, invisible pet fences, low-voltage lighting,
                and other private utilities or hazards. Tennessee 811 will be contacted before
                excavation work as required by law; however, we are not responsible for damage to
                unmarked private utilities or fixtures we were not informed about in advance.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Payment</h2>
              <p>
                Payment terms are set out in your written estimate or invoice. Unless agreed
                otherwise, invoices are due within 15 days of completion. Past-due balances may
                accrue a reasonable late fee at the maximum rate allowed by Tennessee law and may
                be referred for collection, in which case you agree to pay reasonable collection
                costs.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Cancellations</h2>
              <p>
                Recurring services may be canceled or paused with reasonable advance notice. For
                landscape installation, hardscape, or other custom work, deposits and cancellation
                terms are set out in the project's written agreement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Plant material and warranty</h2>
              <p>
                Living plant material depends on watering, weather, and many other conditions
                outside our control. Unless we provide a separate written warranty for a specific
                project, plant material is not guaranteed. Hardscape construction defects that
                result from our workmanship will be addressed at no charge if reported within a
                reasonable period after installation.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Photography</h2>
              <p>
                We may photograph completed work for our portfolio, social media, and marketing.
                Photographs will not include identifying information about you or your address. If
                you prefer that we not photograph your property, please tell us in writing before
                work begins.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Limitation of liability</h2>
              <p>
                To the fullest extent allowed by law, Adams Lawn Service is not liable for
                indirect, incidental, or consequential damages arising from our services or the
                use of this website. Our total liability for any claim related to a project will
                not exceed the amount you paid us for that project.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Website use</h2>
              <p>
                Our website is provided "as is" for general informational purposes. Content,
                services, pricing, and photos shown on the site are for reference and may change
                at any time. You agree not to misuse the website (for example, by attempting to
                disrupt it, scrape it at scale, or use it for unlawful purposes).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Governing law</h2>
              <p>
                These Terms are governed by the laws of the State of Tennessee, without regard to
                conflict-of-law principles. Any dispute will be resolved in the state or federal
                courts located in Bedford County, Tennessee.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Changes to these terms</h2>
              <p>
                We may update these Terms from time to time. The "Last updated" date at the top
                of this page reflects the most recent change. Continued use of the website or our
                services after a change means you accept the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Contact us</h2>
              <p>
                Adams Lawn Service &amp; Landscaping, Inc.<br />
                Shelbyville, Tennessee<br />
                Phone: <a href="tel:9317039549" className="text-brand-green-dark underline hover:text-brand-gold">(931) 703-9549</a>
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
