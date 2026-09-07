import { LuGlobe, LuHandshake, LuLightbulb } from "react-icons/lu";

export const whyChooseUsPerks = [
  {
    icon: LuLightbulb,
    title: "Strategy-First, Not Paperwork-First",
    text: "International mobility should begin with strategy, not paperwork — the right pathway before the application.",
  },
  {
    icon: LuGlobe,
    title: "20+ Years of International Experience",
    text: "Two decades of experience across immigration, global mobility and investment migration.",
  },
  {
    icon: LuHandshake,
    title: "Trusted Partner Network",
    text: "A coordinated network of qualified lawyers and regulated immigration professionals across jurisdictions.",
  },
];

/* Deliberately factual. The previous version of this block was a pair of
   progress bars reading 95% and 90% — numbers that measure nothing and are
   the single clearest "template" tell on an advisory site. */
export const whyChooseUsFacts = [
  { value: "2006", label: "Practising since — Cynosure Consultancy Services" },
  { value: "20+", label: "Years of international advisory experience" },
  /* The "5" is the problem row of the three, because a figure set at 3xl beside
     five country names quantifies the firm's REACH at five countries. It
     measures the established footprint, not the destinations advised on, and
     the label has to say which. */
  {
    value: "5",
    label: "Home jurisdictions — India, UK, Canada, Australia, New Zealand — advising worldwide",
  },
];
