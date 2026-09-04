/* Lucide, not Font Awesome. These three were FaCompass / FaBuilding /
   FaBalanceScale — FA5 *solid* glyphs, which are heavy filled shapes and read
   as clip-art at 52px. The reference firm's own icons are thin strokes, and a
   stroke set is what carries a premium register. react-icons already ships
   Lucide, so this costs no new dependency.

   Note the rest of the site is still on react-icons/fa (~29 distinct glyphs),
   so these are currently the exception. If the other decorative tiles get
   migrated, keep them in this set rather than adding a third. */
import { LuCompass, LuBuilding2, LuScale } from "react-icons/lu";

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

/* Per-card icon colour, added 2026-09-03 at the client's request ("make it
   colorful and professional").

   Note this reverses an earlier decision: these tiles were monochrome navy
   because three tinted icons in the first viewport read as "decorated rather
   than composed", and the palette carries one slate accent because saturated
   accents had been rejected as "not premium". So the hues here are deliberately
   deep and desaturated rather than bright — jewel tones that sit with the navy
   wordmark instead of competing with it. If they still read as too much, the
   dial to turn is saturation, not lightness: keep the glyphs dark.

   `wash` is the accent at 8% on white and `edge` at 30%, precomputed rather
   than done with color-mix() because nothing else in this stylesheet needs
   color-mix and there is no browserslist to check it against. Measured
   contrast, glyph on its own wash / white on the accent for the hover fill:
     teal    #0B6B63   5.66:1 / 6.37:1
     bronze  #8A5A16   5.29:1 / 5.91:1
     indigo  #2B4A7D   7.77:1 / 8.83:1
   All clear AA. Re-check these two ratios if any hue is changed. */
export const heroFeatures = [
  /* keep each `text` to roughly one line per card — the three cards sit in a
     grid row, so a longer string stretches all of them */
  {
    title: "Strategy, Not Paperwork",
    text: "The right pathway identified before any application is prepared.",
    icon: LuCompass,
    // deep teal — the "direction" card, furthest from the navy
    accent: "#0B6B63",
    accentWash: "#EBF3F3",
    accentEdge: "#B6D3D0",
  },
  {
    title: "Business & Mobility",
    text: "Company formation, market entry and immigration planned as one move.",
    icon: LuBuilding2,
    // bronze — picks up the orange in the logo's star without the saturation
    accent: "#8A5A16",
    accentWash: "#F6F2EC",
    accentEdge: "#DCCEB9",
  },
  {
    title: "Regulated Expertise",
    text: "Advice and representation always through the qualified professional in-country.",
    icon: LuScale,
    // deep indigo — nearest the brand navy, for the credibility card
    accent: "#2B4A7D",
    accentWash: "#EEF1F5",
    accentEdge: "#BFC9D8",
  },
];
