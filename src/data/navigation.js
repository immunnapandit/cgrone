/* Navigation, restructured 2026-08-29 to the main nav prescribed in
   Cynosure_Website_Layout_Pattern.docx:

     Home | About Us | Investment & Business Migration | Global Immigration
          | Workforce Mobility | Insights | Contact

   Two deliberate departures:

   - Insights is omitted. The document lists it, but there are still no
     articles — see src/data/insights.js. A nav item leading to an empty page
     is worse than not linking it yet. Add it back the moment content exists.
   - Contact is the header button, not a nav item, so it is not repeated here.

   Countries are no longer top-level. The document is explicit that countries
   sit underneath the pillars, so Canada / Australia / New Zealand hang off
   Global Immigration, and India / UK — whose content is business expansion —
   hang off Investment & Business Migration. */
export const navLinks = [
  { label: "Home", to: "/" },
  {
    label: "About",
    children: [
      { label: "About Cynosure", to: "/about" },
      { label: "Our Story", to: "/about#our-story" },
      { label: "Leadership", to: "/leadership" },
      { label: "Our Process", to: "/about#process" },
    ],
  },
  {
    label: "Investment & Business Migration",
    children: [
      { label: "Overview", to: "/investment-migration" },
      { label: "Citizenship by Investment", to: "/investment-migration#cbi" },
      { label: "Residency by Investment", to: "/investment-migration#rbi" },
      { label: "Business Migration", to: "/investment-migration#business-migration" },
      { label: "India", to: "/countries/india" },
      { label: "United Kingdom", to: "/countries/uk" },
    ],
  },
  {
    label: "Global Immigration",
    children: [
      { label: "Overview", to: "/global-immigration" },
      { label: "Canada", to: "/countries/canada" },
      { label: "Australia", to: "/countries/australia" },
      { label: "New Zealand", to: "/countries/new-zealand" },
    ],
  },
  {
    label: "Workforce Mobility",
    children: [
      { label: "Overview", to: "/workforce-mobility" },
      { label: "Healthcare", to: "/workforce-mobility/healthcare" },
      { label: "Hospitality & Tourism", to: "/workforce-mobility/hospitality" },
      { label: "Corporate Mobility", to: "/global-mobility" },
    ],
  },
];
