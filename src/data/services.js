import { FaGlobeEurope, FaMapMarkedAlt, FaExchangeAlt, FaRocket } from "react-icons/fa";
import canadaImg from "@/assets/images/services/Canada Immigiration.webp";
import ukExpansionImg from "@/assets/images/services/Global Residency & Investment Migration.webp";
import corporateImg from "@/assets/images/services/Business  Investor Immigration.webp";

/* Every service below is one of the source documents in src/assets/Documents —
   headings, approach steps and closing lines are taken from them, so nothing
   here claims an offering CGR ONE has not written down.

   `id` doubles as the in-page anchor on the home page and as the route
   segment for the detail page at /services/:slug. */
export const services = [
  {
    id: "india-uk-expansion",
    n: "01",
    title: "Cross-Border Expansion: India → UK",
    desc: "Helping Indian businesses establish and grow in the UK, backed by an established network of UK-based professionals.",
    // TODO: this service has no dedicated image yet — it currently borrows the
    // globe/flags shot. Swap in a UK-specific asset when one is available.
    img: ukExpansionImg,
    icon: FaGlobeEurope,
    overview:
      "Expanding from India into the UK involves more than registering a company. Businesses need the right structure, professional support, local connections and a clear understanding of how to operate in the UK market. You may not need to build a UK team from day one — our role is to help you identify what is required, connect you with the right UK professionals and coordinate the process, so you enter the market in a structured and commercially sensible way.",
    points: [
      "Market entry strategy — assessing your business model against practical UK opportunities",
      "UK business structure — company formation, corporate structure, accounting, taxation and compliance",
      "Local professional support — UK accountants, solicitors, financial professionals and specialist advisors",
      "Business and commercial connections — distributors, suppliers, partners and relevant contacts",
      "Operational establishment — the transition from an India-based business to a functioning UK operation",
      "Ongoing UK support and coordination as your business develops",
    ],
    audience: {
      title: "Who We Help",
      items: [
        "Indian SMEs expanding internationally",
        "Established Indian companies entering the UK",
        "Manufacturers and exporters",
        "Technology and professional service businesses",
        "Entrepreneurs developing a UK business presence",
      ],
    },
    closing: "From India to the UK — with the right support.",
    cta: "Planning your UK expansion?",
  },
  {
    id: "india-canada-business-expansion",
    n: "02",
    title: "India–Canada Business Expansion",
    desc: "Evaluate the Canadian opportunity, establish the right presence and build the local relationships needed to operate effectively.",
    img: canadaImg,
    icon: FaMapMarkedAlt,
    overview:
      "Canada presents significant opportunities for Indian businesses across technology, professional services, manufacturing, trade and emerging sectors. Successful international expansion is not simply about creating a Canadian entity — it is about understanding the market, establishing the right structure and building credible local relationships. We help bring these elements together so that Indian businesses can approach Canada with greater clarity and confidence.",
    points: [
      "Assess the opportunity — identify relevant Canadian opportunities and the most practical route to market",
      "Establish your Canadian presence — incorporation, corporate structuring, accounting and taxation",
      "Build local connections — professionals, service providers, suppliers, distributors and strategic partners",
      "Develop the business — customers, partnerships and commercial operations in Canada",
      "Coordinate your local support network as your Canadian operations grow",
    ],
    audience: {
      title: "Suitable For",
      items: [
        "Indian companies exploring the Canadian market",
        "SMEs looking to internationalise",
        "Exporters and manufacturers",
        "Technology and professional service companies",
        "Businesses seeking Canadian partnerships",
        "Entrepreneurs planning a long-term Canadian presence",
      ],
    },
    closing: "India to Canada — a structured path to market.",
    cta: "Have a Canadian expansion plan?",
  },
  {
    id: "india-canada-corporate-mobility",
    n: "03",
    title: "India–Canada Corporate Expansion & Immigration Mobility",
    desc: "For established Indian companies: a Canadian presence that creates commercial opportunity and a framework for employee mobility.",
    img: corporateImg,
    icon: FaExchangeAlt,
    overview:
      "For established Indian companies looking to enter Canada, a Canadian business presence can create both commercial opportunities and a structured framework for international employee mobility. We help businesses plan their India–Canada expansion by bringing together corporate setup, market-entry support and Canadian immigration expertise through the appropriate professional network.",
    points: [
      "India–Canada business structuring, with support from Canadian corporate and tax professionals",
      "Canadian business establishment — incorporation, accounting, banking and compliance",
      "Market entry and business development — genuine Canadian activities, partnerships and customers",
      "Intra-company transfer planning for eligible executives, senior managers and specialised-knowledge personnel",
      "Immigration and mobility coordination with qualified Canadian immigration professionals",
    ],
    closing:
      "Expand your business. Build your Canadian presence. Move the right people.",
    cta: "Planning a Canadian entity for your company?",
  },
  {
    id: "india-canada-business-launch",
    n: "04",
    title: "India–Canada Business Launch & Immigration Strategy",
    desc: "For entrepreneurs: build in India, establish in Canada and plan for global mobility from the beginning.",
    // TODO: shares the Canada image with service 02 until a launch/start-up
    // specific asset exists.
    img: canadaImg,
    icon: FaRocket,
    overview:
      "For entrepreneurs launching a new business, establishing operations in India and Canada as connected markets can create a strong foundation for international growth and future mobility. Our role is to bring together business structuring, Canadian market entry and immigration planning from the beginning — so that the business is built with a clear long-term international strategy.",
    points: [
      "India–Canada business planning — structure, ownership relationship and commercial objectives for both markets",
      "Business establishment in both markets — incorporation and operational setup of the Indian and Canadian entities",
      "Canadian market entry — genuine commercial activities, customers, partnerships and suppliers",
      "Building the corporate relationship between the Indian and Canadian businesses required for future mobility planning",
      "Intra-company transfer strategy as the businesses develop and eligibility requirements are met",
      "Immigration and mobility support coordinated with qualified Canadian immigration professionals",
    ],
    closing:
      "Start in India. Build in Canada. Create a pathway for international mobility.",
    cta: "Launching a business across both markets?",
  },
];
