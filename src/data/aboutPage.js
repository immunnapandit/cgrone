import { LuCompass, LuGlobe } from "react-icons/lu";

/* Copy here used to read as a visa consultancy — "Best Immigration & Global
   Residency Consultation", "Ready to fly with us to your dream country", a
   "Visa Consultation" block under a departing-aeroplane icon. Reworded to the
   advisory register the brief asked for; the underlying claims are unchanged
   and still come from src/assets/Documents. */
export const aboutIntro = {
  eyebrow: "About Us",
  // headline and text now come from Cynosure_Global_Advisory_About_Us_Expanded.docx
  heading: "Experience. Perspective. Global Reach.",
  text: "Cynosure Global Residency is an international advisory platform focused on immigration, global mobility, investment migration and cross-border opportunities. With decades of experience and a network of trusted professionals across jurisdictions, we help individuals, families and businesses make informed decisions about their international future.",
  infoBox: {
    title: "Discuss your cross-border plans with our team",
    href: "/contact",
  },
  blocks: [
    {
      icon: LuCompass,
      title: "Strategic Assessment",
      text: "A strategy-first assessment of the pathway that actually fits your profile, before any application is filed.",
    },
    {
      icon: LuGlobe,
      title: "Regulated Professional Network",
      text: "Coordinated with regulated immigration professionals and qualified lawyers across jurisdictions.",
    },
  ],
  stat: { value: "20+", label: "Years of International\nAdvisory Experience" },
};

export const videoCta = {
  heading: "Two Decades of International Advisory Experience",
  // TODO: set this to the company's intro video (YouTube/Vimeo embed URL).
  // While it is empty the play button renders but opens nothing.
  videoUrl: "",
};
