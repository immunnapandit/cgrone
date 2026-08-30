import PageTitle from "@/components/sections/PageTitle";
import AboutIntro from "@/components/sections/AboutIntro";
import AdvisoryBoard from "@/components/sections/AdvisoryBoard";
import OurStory from "@/components/sections/OurStory";
import VideoCta from "@/components/sections/VideoCta";
import ProfessionalStandards from "@/components/sections/ProfessionalStandards";
import SecurityPrivacy from "@/components/sections/SecurityPrivacy";
import Process from "@/components/sections/Process";
import { skylines } from "@/data/banners";

/* Two changes here in the home-page slim-down:
   - <Services /> is gone. It rendered the same four panels as the home page,
     and each service already has its own detail page reachable from the nav,
     the footer and the home page.
   - <Countries /> moved to the home page, where "our international reach" is
     one of the five things the client asked the home page to cover.
   <Process /> arrives from the home page in exchange — how we work is About
   material, and the nav links straight to /about#process. */
export default function About() {
  return (
    <>
      <PageTitle
        title="About Us"
        image={skylines.london}
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />
      <AboutIntro />
      <AdvisoryBoard />
      <OurStory />
      <VideoCta />
      <ProfessionalStandards />
      <SecurityPrivacy />
      <Process />
    </>
  );
}
