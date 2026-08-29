import { FaCompass, FaBuilding, FaBalanceScale } from "react-icons/fa";

/* Sits beside the hero headline. Moving the photography into a band below the
   copy left the right-hand 44% of the hero empty — 669px of blank white on a
   1520px viewport, which read as a broken layout rather than as whitespace.
   Both reference firms fill that same position with credentials (Henley: 70+
   offices / 25+ years / 30,000+ clients; Latitude: 10 years / 12 offices /
   7,500+ clients), so this does too.
   Every figure here is checkable: 2006 is stated in
   CGR_ONE_About_Us_Global_Platform.docx, and the other two are counts of what
   the site itself covers. */
export const heroFacts = [
  { value: "2006", label: "Practising since" },
  { value: "5", label: "Jurisdictions served" },
  { value: "3", label: "Practice areas" },
];

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
