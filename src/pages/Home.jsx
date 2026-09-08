import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import StatementBand from "@/components/sections/StatementBand";
import Contact from "@/components/sections/Contact";
import { skylines } from "@/data/banners";

/* Restructured 2026-08-29 to Cynosure_Website_Layout_Pattern.docx.
 *
 * The Countries block is gone. It showed five country cards at equal weight,
 * and the layout document rules that out directly:
 *
 *   "Do not present CBI, RBI, Canada, Australia, New Zealand, Healthcare,
 *    Hospitality and Skilled Technical Workforce as equal standalone
 *    businesses on the homepage."
 *
 * Reach is still on the page — each of the three pillars in <Services /> lists
 * what sits under it — but the pillars carry the message now, and the country
 * pages live under /global-immigration. */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      {/* must stay directly after Services — `.why-choose-us` has no top
          padding and sits on the tail of the backdrop that Services bleeds
          334px past its own bottom */}
      <WhyChooseUs />
      {/* The corporate line's only presence on the home page, and deliberately
          a band rather than a fourth card in <Services />. The layout document
          rules that the three pillars carry this page — adding a fourth tile
          beside them would break that and, worse, put a B2B offer at the same
          weight as the three that speak to individuals and families.
          A band after the pillars reads as "and there is also this", which is
          what it is.

          Sydney, not Edinburgh, and the reason is measured at phone width.
          StatementBand veils its photograph at ink/90 -> ink/80 -> ink/40 left
          to right. On a 1500px desktop band the light end is wide enough for
          any frame to show through, but at 390px the whole band sits under the
          dense end — and Edinburgh, the one DAYLIGHT frame in the set (see
          banners.js), goes completely flat there: solid navy, no photograph.
          Checked against the Edinburgh band already shipping on
          /workforce-mobility/healthcare, which has the same problem and is
          left alone here because it is pre-existing and not this page's to fix.
          London, Sydney and Auckland were all compared in a 390px viewport
          under this exact scrim; Sydney and London read clearly, Auckland's
          sunset fights the brand orange. Sydney wins over London only because
          /market-entry — the page this band links to — closes on London, and
          the two should not be the same photograph. Toronto is the hero above,
          so this also keeps the one rule in banners.js: no skyline twice on
          one page. */}
      <StatementBand
        image={skylines.sydney}
        position="50% 60%"
        eyebrow="For Businesses Expanding Internationally"
        line="Helping businesses enter, establish and grow across international markets."
        cta={{ to: "/market-entry", label: "Business Expansion & Market Entry" }}
      />
      <Contact />
    </>
  );
}
