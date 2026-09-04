import { LuBookUser, LuGlobe, LuHouse, LuListChecks, LuTruck, LuUsers } from "react-icons/lu";

/* Verbatim from src/assets/Documents/Cynosure_Corporate_Immigration_Global_Mobility.docx
   (added by the client 2026-08-27).
 *
 * This replaces the previous contents of this file, which were three
 * template-era capability blurbs and a stat row containing "100% —
 * Compliance-first approach". None of that had a document behind it. */
export const corporateMobility = {
  eyebrow: "Corporate Immigration & Global Mobility",
  heading: "Enabling Global Talent Mobility",
  intro: [
    "Cynosure Global Residency provides end-to-end global mobility and immigration support to companies relocating employees across international markets.",
    "We work alongside employers, HR teams and mobility functions to manage the employee journey — from initial assessment and immigration through relocation, arrival and ongoing compliance.",
  ],
  supportTitle: "End-to-End Mobility Support",
  support: [
    {
      icon: LuBookUser,
      title: "Immigration & Work Authorisation",
      text: "Assessment, application management and coordination of visas, work permits and related immigration requirements.",
    },
    {
      icon: LuTruck,
      title: "International Relocation",
      text: "Practical coordination to help employees and their families transition smoothly into a new country.",
    },
    {
      icon: LuUsers,
      title: "Employee & Family Mobility",
      text: "Managing immigration and relocation requirements for accompanying family members.",
    },
    {
      icon: LuHouse,
      title: "Pre-Arrival & Settlement Support",
      text: "Helping employees prepare for their move and navigate the practical requirements of establishing themselves in a new location.",
    },
    {
      icon: LuListChecks,
      title: "Case Management & Coordination",
      text: "Centralised documentation, timelines, communication and case tracking throughout the mobility lifecycle.",
    },
    {
      icon: LuGlobe,
      title: "Global Partner Network",
      text: "Coordinating with trusted immigration lawyers, regulated professionals and local specialists across jurisdictions.",
    },
  ],
  extension: {
    title: "An Extension of Your Global Mobility Function",
    body: [
      "Whether relocating a single executive or managing employee mobility across multiple markets, Cynosure can operate as an extended mobility partner to your organisation.",
      "We combine global mobility expertise with hands-on case management and international professional networks to reduce administrative complexity and provide a consistent experience for both employers and employees.",
    ],
  },
  closing: "Your People Move. We Manage the Journey.",
  closingSub: "Global mobility, managed with experience, structure and perspective.",
  cta: "Talk to us about your global mobility requirements",
};
