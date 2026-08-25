// Real SVG flags, not emoji: Windows' Segoe UI Emoji has no glyphs for
// regional-indicator pairs, so "🇨🇦" renders as the bare letters "CA".
// Imported one file at a time so only these three flags reach the bundle.
import CA from "country-flag-icons/react/3x2/CA";
import GB from "country-flag-icons/react/3x2/GB";
import IN from "country-flag-icons/react/3x2/IN";

/* The three jurisdictions the source documents in src/assets/Documents
   actually cover — India→Canada and India→UK expansion, plus the founder's
   India / UK / Canada track record. Wording is taken from those documents,
   so no card claims a service CGR ONE has not written down. */
export const countries = [
  {
    name: "Canada",
    code: "CA",
    Flag: CA,
    text: "Canadian market entry, corporate structuring and intra-company transfers, coordinated with regulated Canadian immigration professionals.",
    href: "/services/india-canada-business-expansion",
  },
  {
    name: "United Kingdom",
    code: "GB",
    Flag: GB,
    text: "UK company formation, structure and compliance for Indian businesses, supported by an established network of UK professionals.",
    href: "/services/india-uk-expansion",
  },
  {
    name: "India",
    code: "IN",
    Flag: IN,
    text: "Where most engagements begin — business structured in India alongside the Canadian or UK entity, planned as one cross-border move.",
    href: "/#contact",
  },
];
