import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Seo } from "../components/Seo";
import { PRIVACY_SEO } from "../data/seo";

const LAST_UPDATED = "April 28, 2026";

export function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo
        title={PRIVACY_SEO.title}
        description={PRIVACY_SEO.description}
        path="/privacy"
      />
      <Header />
      <main className="bg-brand-cream py-14 md:py-20">
        <article className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-brand-green-dark/60 hover:text-brand-green-dark text-xs uppercase tracking-widest font-bold mb-6 md:mb-8"
          >
            <ChevronLeft size={16} /> Back to home
          </Link>

          <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs mb-3">Legal</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-green-dark mb-3">Privacy Policy</h1>
          <p className="text-brand-text/60 text-sm font-medium mb-8 md:mb-12">Last updated: {LAST_UPDATED}</p>

          <div className="prose-content space-y-8 text-brand-text font-medium leading-relaxed">
            <section>
              <p>
                Adams Lawn Service &amp; Landscaping, Inc. ("Adams Lawn Service," "we," "our," or
                "us") respects your privacy. This Privacy Policy explains what information we
                collect when you visit our website or request a quote, how we use it, and the
                choices you have. By using our website, you agree to the practices described
                here.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Information we collect</h2>
              <p className="mb-3">We collect only the information needed to respond to your inquiry and provide our services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-brand-green-dark">Information you provide.</strong> When
                  you submit a quote request, we collect your name, phone number, email address,
                  property address, county, the services you are interested in, and any project
                  details you choose to share.
                </li>
                <li>
                  <strong className="text-brand-green-dark">Communication content.</strong> If you
                  call, text, or email us, we keep a record of that conversation so we can serve
                  you well.
                </li>
                <li>
                  <strong className="text-brand-green-dark">Basic technical data.</strong> Like
                  most websites, our hosting provider may automatically log standard request data
                  such as your browser type, device, and approximate location based on IP address.
                  We do not use this for advertising or profiling.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">How we use your information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To prepare and deliver quotes you request.</li>
                <li>To schedule, perform, and follow up on services we provide.</li>
                <li>To communicate with you about your project, billing, or routine business matters.</li>
                <li>To comply with applicable laws and to protect our legal rights.</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Sharing of information</h2>
              <p className="mb-3">We share information only as needed to operate our business:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With trusted service providers who help us run our business (for example, email or accounting software), bound by reasonable confidentiality expectations.</li>
                <li>When required by law, subpoena, or to enforce our legal rights.</li>
                <li>With your consent, when you ask us to share information on your behalf.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Cookies and tracking</h2>
              <p>
                Our website uses minimal cookies that are required for the site to work properly.
                We do not use third-party advertising cookies or cross-site tracking. Your browser
                lets you block or delete cookies at any time through its settings.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Data retention</h2>
              <p>
                We keep customer information for as long as needed to maintain our relationship
                with you, comply with legal and tax obligations, and resolve disputes. You may
                request that we delete information about you that we are not required to retain.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Children's privacy</h2>
              <p>
                Our website and services are intended for adults. We do not knowingly collect
                personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Your choices</h2>
              <p>
                You may opt out of non-essential communications from us at any time by replying
                to a message or by contacting us using the details below. To request a copy,
                correction, or deletion of personal information we hold about you, please contact
                us.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-brand-green-dark mb-3">Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise
                the "Last updated" date at the top of this page. Material changes will be made
                reasonably visible on the site.
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
