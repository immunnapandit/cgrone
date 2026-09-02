import { FaCompass, FaBuilding, FaBalanceScale } from "react-icons/fa";

/* `heroFacts` — 2006 / 5 / 3, "practising since / jurisdictions / practice
   areas" — was exported here and rendered in the hero. Removed at the client's
   request 2026-09-01, and with Hero.jsx its only consumer, the export went
   too rather than sitting unreferenced.

   Worth keeping in mind if it is ever asked for again: 2006 is stated in
   CGR_ONE_About_Us_Global_Platform.docx and the other two were counts of what
   the site itself covers, so all three were checkable rather than marketing
   figures. Both reference firms carry an equivalent row (Henley: 70+ offices
   / 25+ years / 30,000+ clients; Latitude: 10 years / 12 offices / 7,500+
   clients). */

/* The departing-aeroplane icon went with the airport photography — an advisory
   firm's three proof points should not open with a plane taking off. */
export const heroFeatures = [
  /* keep each `text` to roughly one line per card — the three cards sit in a
     grid row, so a longer string stretches all of them */
  {
    title: "Strategy, Not Paperwork",
    text: "The right pathway identified before any application is prepared.",
    icon: FaCompass,
  },
  {
    title: "Business & Mobility",
    text: "Company formation, market entry and immigration planned as one move.",
    icon: FaBuilding,
  },
  {
    title: "Regulated Expertise",
    text: "Advice and representation always through the qualified professional in-country.",
    icon: FaBalanceScale,
  },
];
