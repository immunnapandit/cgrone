import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Contact from "@/components/sections/Contact";

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
      <Contact />
    </>
  );
}
