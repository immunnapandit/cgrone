import AG from "country-flag-icons/react/3x2/AG";
import DM from "country-flag-icons/react/3x2/DM";
import GD from "country-flag-icons/react/3x2/GD";
import KN from "country-flag-icons/react/3x2/KN";
import LC from "country-flag-icons/react/3x2/LC";
import PT from "country-flag-icons/react/3x2/PT";
import AE from "country-flag-icons/react/3x2/AE";
import GR from "country-flag-icons/react/3x2/GR";
import MT from "country-flag-icons/react/3x2/MT";

/* Pillar 1. Verbatim from Cynosure_CBI_RBI_Website_Content.docx (2026-08-29),
 * with the Business Migration block drawn from the earlier India→UK and
 * India–Canada expansion documents.
 *
 * The source document ends with an instruction that governs this whole page:
 *
 *   "The website should keep program descriptions concise. Detailed investment
 *    amounts, documentation, eligibility analysis and process steps can be
 *    provided after an initial client enquiry and profile assessment."
 *
 * So there are NO investment thresholds, fees or timelines anywhere below, and
 * none should be added. Every programme line here is the one-sentence summary
 * the client wrote. Inventing a figure would also be inventing a number a
 * prospective investor can check.
 */
export const investmentMigration = {
  /* No `banner` key: page banners come from src/data/banners.js now, and the
     stock composite this used to point at is out of the layout. */
  title: "Investment & Business Migration",
  lede: "Citizenship & Residency by Investment",
  intro: [
    "For investors, entrepreneurs and business families, an investment-led route can open long-term residence or citizenship alongside a wider commercial plan.",
    "Each programme carries its own eligibility, due-diligence and processing requirements. We assess your objectives and profile before recommending the most appropriate option.",
  ],

  sections: [
    {
      id: "cbi",
      title: "Citizenship by Investment (CBI)",
      lead: "The Caribbean offers established Citizenship by Investment programs for qualifying individuals and families. Depending on the country, applicants may qualify through a government contribution, approved real estate or other permitted investment routes.",
      groupTitle: "Caribbean Citizenship by Investment",
      cards: [
        {
          /* `to` opts a card into having its own detail page. Only programmes
             with an entry in programmePages.js carry one — the rest render as
             plain cards until their page is written, so nothing links to a
             route that redirects. */
          to: "/investment-migration/antigua-barbuda",
          title: "Antigua & Barbuda",
          Flag: AG,
          text: "Qualifying contribution, approved real estate and other permitted routes.",
        },
        {
          title: "Dominica",
          Flag: DM,
          text: "Established program with contribution and approved real estate options.",
        },
        {
          title: "Grenada",
          Flag: GD,
          text: "Qualifying contribution and approved investment routes.",
        },
        {
          title: "St. Kitts & Nevis",
          Flag: KN,
          text: "One of the Caribbean's longest-established investment citizenship programs.",
        },
        {
          title: "Saint Lucia",
          Flag: LC,
          text: "Qualifying contribution, approved investments and other permitted routes.",
        },
      ],
      note: "Other CBI opportunities: citizenship-by-investment options outside the Caribbean are more limited and subject to changing government policies. Where available, we provide guidance on current eligibility, investment routes and due diligence.",
    },

    {
      id: "rbi",
      title: "Residency by Investment (RBI)",
      lead: "Residence routes through qualifying investment, for investors seeking long-term flexibility in Europe and the Gulf.",
      cards: [
        {
          title: "Portugal Golden Visa",
          Flag: PT,
          text: "A European residence-by-investment route through qualifying investment options, suited to investors seeking long-term European residency flexibility.",
        },
        {
          title: "UAE Golden Visa",
          Flag: AE,
          text: "Long-term UAE residence for qualifying investors, entrepreneurs, professionals and other eligible categories.",
        },
        {
          title: "Greece Golden Visa",
          Flag: GR,
          text: "Residence through qualifying investment, including permitted real estate routes. Requirements vary by location and investment type.",
        },
        {
          title: "Malta Permanent Residence",
          Flag: MT,
          text: "A permanent residence framework combining qualifying property, government contributions and other eligibility requirements.",
        },
      ],
      note: "Program requirements, investment thresholds and qualifying routes may change. Detailed eligibility, investment options, costs, documentation and timelines are provided during the consultation and assessment stage.",
    },

    {
      id: "business-migration",
      title: "Business Migration",
      lead: "For companies establishing themselves in a new market, where the corporate structure and the mobility plan have to be built together rather than in sequence.",
      items: [
        "Market entry strategy — assessing your business model against practical opportunities in the destination market",
        "Business establishment — incorporation, corporate structuring, accounting, taxation and compliance",
        "Local professional support — accountants, solicitors, financial professionals and specialist advisors",
        "Commercial connections — distributors, suppliers, partners and relevant contacts",
        "Executive and key-person mobility planning as the business develops",
        "Ongoing coordination as the operation grows",
      ],
      /* India and the UK moved under this pillar on 2026-08-29: their content
         is business expansion, not immigration, so the layout document's
         Global Immigration pillar (Canada / Australia / New Zealand) is the
         wrong home for them. */
      links: [
        { label: "India — where the practice began", to: "/countries/india" },
        { label: "United Kingdom — market entry & expansion", to: "/countries/uk" },
        { label: "Canada — market entry & business expansion", to: "/countries/canada#market-entry" },
      ],
    },
  ],

  closing:
    "We assess your objectives and profile before recommending the most appropriate option.",
};
