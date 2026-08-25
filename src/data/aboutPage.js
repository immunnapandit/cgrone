import { FaPlaneDeparture, FaGlobeAmericas } from "react-icons/fa";

export const aboutIntro = {
  eyebrow: "Who We Are",
  heading: "Best Immigration & Global Residency Consultation.",
  text: "CGR ONE is built on more than two decades of experience across immigration, global mobility, international business development and advisory services — spanning India, the United Kingdom and Canada. We believe international mobility should begin with strategy, not paperwork.",
  infoBox: {
    title: "Ready to fly with us to your dream country",
    href: "/#contact",
  },
  blocks: [
    {
      icon: FaPlaneDeparture,
      title: "Visa Consultation",
      text: "A strategy-first assessment of the pathway that actually fits your profile, before any application is filed.",
    },
    {
      icon: FaGlobeAmericas,
      title: "Professional Services",
      text: "Coordinated with regulated immigration professionals and qualified lawyers across jurisdictions.",
    },
  ],
  stat: { value: "20+", label: "Years of Global\nImmigration Experience" },
};

export const videoCta = {
  heading: "Most Trusted Immigration & Global Residency Advisors",
  // TODO: set this to the company's intro video (YouTube/Vimeo embed URL).
  // While it is empty the play button renders but opens nothing.
  videoUrl: "",
};
