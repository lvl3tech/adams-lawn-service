import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { ContactSteps } from "../components/ContactSteps";
import { Reviews } from "../components/Reviews";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { Seo } from "../components/Seo";
import { HOME_SEO, buildHomeJsonLd } from "../data/seo";

export function Home() {
  return (
    <>
      <Seo
        title={HOME_SEO.title}
        description={HOME_SEO.description}
        path="/"
        jsonLd={buildHomeJsonLd()}
      />
      <Header variant="transparent" />
      <Hero />
      <About />
      <Services />
      <ContactSteps />
      <Reviews />
      <FAQ />
      <Footer />
    </>
  );
}
