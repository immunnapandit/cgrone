import { FaGlobeAmericas } from "react-icons/fa";
import { services } from "@/data/services";

/* Long-form variant of the service cards, kept in sync with @/data/services so
   there is only one place to edit the copy. Global Mobility has no document of
   its own as a service page, so it is appended here from @/data/globalMobility
   wording rather than invented. */
export const immigrationPrograms = [
  ...services.map((s) => ({
    id: s.id,
    eyebrow: s.title,
    title: s.closing ?? s.title,
    icon: s.icon,
    img: s.img,
    text: s.desc,
    points: s.points.slice(0, 3),
  })),
  {
    id: "global-mobility",
    eyebrow: "Global Mobility",
    title: "Corporate Relocation & Intra-Company Transfers",
    icon: FaGlobeAmericas,
    img: services[2].img,
    text: "End-to-end mobility support for employers moving talent across borders, from work permits through onboarding in the destination country.",
    points: [
      "Intra-company transfer visas",
      "Employer compliance & sponsorship",
      "Employee relocation support",
    ],
  },
];
