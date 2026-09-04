import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { LuCalendarCheck, LuGlobe, LuMail } from "react-icons/lu";

/* `href` turns the card into a real mailto:/route link — the jurisdictions
   card has none, so it stays plain text.

   Two entries here were template placeholders and have been removed: the
   phone number "+91 458 654 528" is not a dialable Indian number, and the
   address "13005 Greenville, USA" is a country Cynosure does not operate in.
   Put the real switchboard and registered office back the moment they are
   confirmed. */
export const footerContactInfo = [
  { icon: LuMail, label: "Email Us", value: "info@cgrone.com", href: "mailto:info@cgrone.com" },
  { icon: LuGlobe, label: "Where We Operate", value: "India · UK · Canada · Australia · New Zealand" },
  { icon: LuCalendarCheck, label: "Enquiries", value: "Book a Consultation", href: "/contact" },
];

/* The three pillars and what sits under them, per the 2026-08-29 layout
   document. Rendered under the heading "What We Do". */
export const footerServices = [
  { label: "Investment & Business Migration", href: "/investment-migration" },
  { label: "Citizenship by Investment", href: "/investment-migration#cbi" },
  { label: "Residency by Investment", href: "/investment-migration#rbi" },
  { label: "Global Immigration", href: "/global-immigration" },
  { label: "Workforce Mobility", href: "/workforce-mobility" },
  { label: "Healthcare", href: "/workforce-mobility/healthcare" },
  { label: "Hospitality & Tourism", href: "/workforce-mobility/hospitality" },
  { label: "Corporate Mobility", href: "/global-mobility" },
];

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About Cynosure", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Our Story", href: "/about#our-story" },
  { label: "Canada", href: "/countries/canada" },
  { label: "Australia", href: "/countries/australia" },
  { label: "New Zealand", href: "/countries/new-zealand" },
  { label: "Professional Standards", href: "/about#professional-standards" },
  { label: "Security & Privacy", href: "/about#security-privacy" },
  { label: "Our Process", href: "/about#process" },
  { label: "Contact Us", href: "/contact" },
];

/* These rendered as four icons all pointing at `href="#"` — dead controls on a
   live site. Fill in the real profile URLs and each one lights up on its own;
   Footer hides any entry without an `href`, and the whole row when none has
   one. LinkedIn is the one that matters most for an advisory firm. */
export const footerSocialIcons = [
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "" },
  { Icon: FaFacebookF, label: "Facebook", href: "" },
  { Icon: FaTwitter, label: "X", href: "" },
  { Icon: FaInstagram, label: "Instagram", href: "" },
];
