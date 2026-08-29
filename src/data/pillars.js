import { FaChartLine, FaGlobeAmericas, FaUsers } from "react-icons/fa";
import investmentImg from "@/assets/images/services/Global Residency & Investment Migration.webp";
import immigrationImg from "@/assets/images/services/Canada Immigiration.webp";
import workforceImg from "@/assets/images/services/Business  Investor Immigration.webp";

/* The three pillars, from Cynosure_Website_Layout_Pattern.docx (2026-08-29).
 *
 * That document is explicit about how these must be presented:
 *
 *   "Do not present CBI, RBI, Canada, Australia, New Zealand, Healthcare,
 *    Hospitality and Skilled Technical Workforce as equal standalone
 *    businesses on the homepage. The three pillars should carry the message.
 *    Countries, programmes and individual services should sit underneath
 *    them."
 *
 * So the sub-labels below are labels, not links — they signal what sits under
 * each pillar without competing with it. The home page previously listed five
 * country cards at equal weight, which is exactly what this forbids; that
 * section is gone.
 */
export const pillars = [
  {
    n: "01",
    icon: FaChartLine,
    img: investmentImg,
    title: "Investment & Business Migration",
    audience: "For investors, entrepreneurs and business families.",
    sub: ["CBI & RBI", "Business Migration", "Investment-led Residency"],
    to: "/investment-migration",
  },
  {
    n: "02",
    icon: FaGlobeAmericas,
    img: immigrationImg,
    title: "Global Immigration",
    audience: "For individuals, families and professionals.",
    sub: ["Canada", "Australia", "New Zealand", "Selected Global Destinations"],
    to: "/global-immigration",
  },
  {
    n: "03",
    icon: FaUsers,
    img: workforceImg,
    title: "International Workforce Mobility",
    audience: "For employers and international talent.",
    sub: ["Healthcare", "Hospitality & Tourism", "Skilled Technical Workforce"],
    to: "/workforce-mobility",
  },
];

/* Verbatim from the layout document's homepage block. */
export const homeIntro = {
  title: "International Mobility. Strategic. Personalised. Global.",
  lead: "For over two decades, we have helped individuals, families, professionals and businesses navigate international mobility — from investment and business migration to immigration and global workforce solutions.",
};

export const brandMessage = {
  line: "We move people internationally.",
  text: "They may be investors, entrepreneurs, families, professionals or international workers. One coherent story, rather than several disconnected service offerings.",
};
