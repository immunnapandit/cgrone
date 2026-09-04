import { LuConciergeBell, LuStethoscope, LuWrench } from "react-icons/lu";
import DE from "country-flag-icons/react/3x2/DE";
import MT from "country-flag-icons/react/3x2/MT";
import PL from "country-flag-icons/react/3x2/PL";
import PT from "country-flag-icons/react/3x2/PT";
import CY from "country-flag-icons/react/3x2/CY";
import GR from "country-flag-icons/react/3x2/GR";
import HR from "country-flag-icons/react/3x2/HR";

/* Pillar 3. Verbatim from three documents added 2026-08-29:
 *   Cynosure_International_Workforce_Mobility_Webpage.docx  (the hub)
 *   Cynosure_Healthcare_Global_Workforce_Mobility.docx      (sector page)
 *   Cynosure_International_Hospitality_Workforce_Mobility.docx (sector page)
 *
 * Skilled Technical Workforce is a pillar sub-heading in the layout document
 * and appears in the hub document's focus areas, but has NO document of its
 * own — so it is a section on this hub, not a page. Give it a page when the
 * client writes one; do not pad it out in the meantime.
 */
export const workforceHub = {
  /* No `banner` key — see src/data/banners.js. */
  title: "International Workforce Mobility",
  lede: "Connecting Global Talent with Opportunities Across Europe",
  intro: [
    "At Cynosure Global Residency, we help businesses access qualified international talent while supporting professionals through a structured, transparent and compliant mobility process.",
    "Our focus is on sectors where skilled workforce demand continues to grow across international markets.",
  ],
  focusTitle: "Our Focus Areas",
  focus: [
    {
      slug: "healthcare",
      icon: LuStethoscope,
      title: "Healthcare",
      text: "Connecting healthcare employers with qualified doctors, nurses and allied healthcare professionals from international talent markets.",
    },
    {
      slug: "hospitality",
      icon: LuConciergeBell,
      title: "Hospitality & Tourism",
      text: "Supporting hotels, resorts, restaurants and food-service businesses with skilled chefs, cooks, F&B and hospitality professionals.",
    },
    {
      // no dedicated document yet — rendered without a link
      slug: null,
      icon: LuWrench,
      title: "Skilled Technical Workforce",
      text: "Sourcing experienced technical talent including electricians, welders, HVAC technicians, CNC operators, maintenance and other skilled trades.",
    },
  ],
  approachTitle: "Our Approach",
  approach: [
    "We work with employers, recruitment partners and trusted talent networks across international markets to identify, assess and mobilise suitable professionals.",
    "From talent sourcing and screening to documentation, immigration coordination and relocation, we help make international workforce mobility simpler and more structured.",
  ],
  audiences: [
    { label: "For Employers", text: "Access qualified international talent." },
    { label: "For Professionals", text: "Explore genuine international career opportunities." },
  ],
  closing: "Build your international workforce with Cynosure.",
};

/* The two sectors that have their own document. Both follow the same shape,
   so one page component renders either. */
export const workforceSectors = {
  healthcare: {
    slug: "healthcare",
    title: "Healthcare & Global Workforce Mobility",
    lede: "Connecting Healthcare Talent with Global Opportunities",
    intro: [
      "Healthcare systems across the world are experiencing growing demand for qualified healthcare professionals, caregivers and support workers.",
      "Cynosure Global Residency helps healthcare professionals and care workers explore international career opportunities and navigate the journey from qualification and employment to immigration and relocation.",
    ],
    whoTitle: "Who We Work With",
    who: [
      "Nurses and nursing professionals",
      "Healthcare assistants and support workers",
      "Caregivers, personal carers and elderly-care professionals",
      "Home-care and community-care professionals",
      "Allied healthcare professionals",
      "Experienced healthcare professionals seeking international careers",
    ],
    whoNote:
      "Our international talent network can extend across South Asia, Southeast Asia, the Middle East and other emerging talent markets.",
    steps: [
      { n: "ASSESS", text: "We review your qualifications, experience, language ability and career objectives." },
      { n: "MATCH", text: "We identify suitable countries, roles and potential employment pathways." },
      { n: "PREPARE", text: "Where required, we assist with qualification recognition, documentation and other requirements." },
      { n: "CONNECT", text: "Where suitable opportunities are available through our network, we connect qualified candidates with relevant employers and institutions." },
      { n: "RELOCATE", text: "We coordinate the applicable immigration and work-authorisation process with authorised local partners and support you through relocation." },
    ],
    marketsTitle: "Selected International Markets",
    markets: [
      { name: "Germany", Flag: DE },
      { name: "Malta", Flag: MT },
      { name: "Poland", Flag: PL },
      { name: "Portugal", Flag: PT },
      { name: "Cyprus", Flag: CY },
    ],
    marketsNote:
      "We continue to explore additional destinations where genuine healthcare and care-sector demand exists. Requirements vary by country, profession and individual profile, so we focus on finding the right pathway for each candidate.",
    employers: {
      title: "For Healthcare Employers",
      text: "Cynosure is also developing international talent networks for healthcare organisations, care homes, home-care providers and other employers seeking qualified international personnel.",
      chain: ["International Talent Sourcing", "Candidate Screening", "Mobility Coordination", "Immigration Support"],
    },
    closing: "Your Career. Our Global Network.",
    closingText:
      "Whether you are an experienced healthcare professional seeking your next international opportunity, or an employer looking for qualified global talent, Cynosure Global Residency can help you explore the possibilities.",
    cta: "Start Your International Healthcare Journey",
    ctaNote: "Submit your profile for an initial assessment.",
  },

  hospitality: {
    slug: "hospitality",
    title: "International Hospitality Workforce Mobility",
    lede: "Connecting Hospitality Talent with Global Opportunities",
    intro: [
      "Europe's hospitality sector continues to face structural workforce shortages, particularly across chefs, cooks and waiters.",
      "Cynosure Global Residency helps hospitality professionals explore international career opportunities and supports the journey from recruitment and employer matching through work authorisation and relocation.",
    ],
    whoTitle: "Who We Work With",
    who: [
      "Chefs and cooks",
      "Commis chefs and kitchen professionals",
      "Food & beverage and restaurant service staff",
      "Hotel and hospitality professionals",
      "Housekeeping and selected hospitality-support roles",
    ],
    whoNote:
      "Our international talent network can extend across South Asia, Southeast Asia, the Middle East and other emerging talent markets.",
    steps: [
      { n: "ASSESS", text: "We review experience, skills, language ability and career objectives." },
      { n: "MATCH", text: "We identify suitable destinations, roles and potential employers." },
      { n: "PREPARE", text: "We assist with documentation, skills readiness and employer requirements." },
      { n: "CONNECT", text: "Where suitable opportunities are available through our network, we connect candidates with relevant employers." },
      { n: "RELOCATE", text: "We coordinate the applicable work-authorisation and immigration process with authorised local partners and support relocation." },
    ],
    marketsTitle: "Selected European Markets",
    markets: [
      { name: "Malta", Flag: MT },
      { name: "Greece", Flag: GR },
      { name: "Croatia", Flag: HR },
      { name: "Portugal", Flag: PT },
      { name: "Cyprus", Flag: CY },
    ],
    marketsNote:
      "We also explore additional markets where genuine hospitality and tourism-sector demand exists. Permanent and seasonal opportunities may be available depending on the country, role and employer.",
    employers: {
      title: "For Hospitality Employers",
      text: "Cynosure helps hospitality businesses build access to qualified international talent for hotels, resorts, restaurants, catering companies and other food-service operations.",
      chain: ["International Talent Sourcing", "Candidate Screening", "Employer Matching", "Mobility Coordination"],
    },
    closing: "Your Hospitality Career. Our Global Network.",
    closingText:
      "Whether you are an experienced hospitality professional seeking an international opportunity or an employer looking for reliable global talent, Cynosure Global Residency can help you explore the right pathway.",
    cta: "Start Your International Hospitality Journey",
    ctaNote: "Submit your profile for an initial assessment.",
  },
};

export function getWorkforceSector(slug) {
  return workforceSectors[slug];
}
