import PageTitle from "@/components/sections/PageTitle";
import GlobalMobilitySection from "@/components/sections/GlobalMobility";
import Contact from "@/components/sections/Contact";
import { skylines } from "@/data/banners";

/* Corporate mobility used to be a home-page section. It is a standalone
   practice area with its own audience (employers, not individuals), so it
   gets its own page and the home page just links to it. */
export default function GlobalMobility() {
  return (
    <>
      <PageTitle
        title="Global Mobility"
        image={skylines.toronto}
        crumbs={[{ label: "Home", to: "/" }, { label: "Global Mobility" }]}
      />
      <GlobalMobilitySection />
      <Contact />
    </>
  );
}
