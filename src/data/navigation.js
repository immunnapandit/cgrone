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
      /* "Our Story" sat here and is gone with the section it scrolled to —
         a nav item pointing at a #fragment that no element carries lands the
         visitor at the top of /about with nothing highlighted, which reads as
         a broken link rather than a moved one. */
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
      /* Corporate market entry (2026-09-07, from the client's profile deck).
         It is a standalone page, NOT a fourth pillar — it sits in this group
         because the group already holds the business-expansion content, which
         is what India and the UK below are. It is deliberately not a sixth
         top-level item: measured at a 1400 container the horizontal bar is
         already 1338px (see the note on the <nav> in Navbar.jsx), so another
         label of this length would overflow the header outright. */
      { label: "Business Expansion & Market Entry", to: "/market-entry" },
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
