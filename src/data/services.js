import { FaMapMarkedAlt, FaExchangeAlt, FaCoins, FaBriefcase } from "react-icons/fa";
import canadaImmigrationImg from "@/assets/images/services/Canada Immigiration.png";
import usaCanadaPathwaysImg from "@/assets/images/services/USA Canada Pathways.png";
import globalResidencyImg from "@/assets/images/services/Global Residency & Investment Migration.png";
import businessInvestorImg from "@/assets/images/services/Business  Investor Immigration.png";

export const services = [
  {
    id: "canada-immigration",
    n: "01",
    title: "Canada Immigration",
    desc: "End-to-end guidance through Express Entry, PNP, and family sponsorship pathways to permanent residency.",
    img: canadaImmigrationImg,
    icon: FaMapMarkedAlt,
  },
  {
    id: "usa-canada-pathways",
    n: "02",
    title: "USA → Canada Pathways",
    desc: "Seamless relocation planning for US-based professionals and families moving to Canada.",
    img: usaCanadaPathwaysImg,
    icon: FaExchangeAlt,
  },
  {
    id: "global-residency",
    n: "03",
    title: "Global Residency & Investment Migration",
    desc: "Residency and citizenship-by-investment programs across leading destinations worldwide.",
    img: globalResidencyImg,
    icon: FaCoins,
  },
  {
    id: "business-investor",
    n: "04",
    title: "Business / Investor Immigration",
    desc: "Structured support for entrepreneurs and investors seeking business-class visas abroad.",
    img: businessInvestorImg,
    icon: FaBriefcase,
  },
];
