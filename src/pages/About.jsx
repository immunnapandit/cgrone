import PageTitle from "@/components/sections/PageTitle";
import AboutIntro from "@/components/sections/AboutIntro";
import Services from "@/components/sections/Services";
import VideoCta from "@/components/sections/VideoCta";
import ProfessionalStandards from "@/components/sections/ProfessionalStandards";
import SecurityPrivacy from "@/components/sections/SecurityPrivacy";
import Countries from "@/components/sections/Countries";
import banner from "@/assets/images/about/aeroplaneabout.webp";

export default function About() {
  return (
    <>
      <PageTitle
        title="About Us"
        image={banner}
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />
      <AboutIntro />
      <Services />
      <VideoCta />
      <ProfessionalStandards />
      <SecurityPrivacy />
      <Countries />
    </>
  );
}
