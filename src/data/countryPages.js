import AU from "country-flag-icons/react/3x2/AU";
import CA from "country-flag-icons/react/3x2/CA";
import GB from "country-flag-icons/react/3x2/GB";
import IN from "country-flag-icons/react/3x2/IN";
import NZ from "country-flag-icons/react/3x2/NZ";
import canadaImg from "@/assets/images/services/Canada Immigiration.webp";
import ukImg from "@/assets/images/services/Global Residency & Investment Migration.webp";

/* Five country pages, rebuilt 2026-08-27 from the client's own website copy.
 *
 * Sources, one per country:
 *   canada  → Cynosure_Canada_Immigration_Final_Website_Content.docx
 *             + Cynosure_Canada_Market_Entry_Business_Expansion.docx
 *   au      → Cynosure_Australia_Immigration_Global_Mobility.docx
 *   nz      → Cynosure_New_Zealand_Immigration_Final_Website_Content.docx
 *   uk      → Cross_Border_Expansion_India_to_UK.docx
 *   india   → CGR_ONE_About_Us_Global_Platform.docx (2006 origin)
 *
 * The three newest documents each carry the same two-column split between what
 * Cynosure does and what the regulated practitioner does. That is reproduced
 * verbatim in `regulated` — it is a professional-responsibility statement, not
 * marketing, so it must not be paraphrased.
 *
 * TODO: only Canada and the UK have a banner photo. India, Australia and New
 * Zealand fall back to the navy PageTitle field until real assets exist.
 */
export const countryPages = [
  {
    slug: "india",
    name: "India",
    Flag: IN,
    img: null,
    lede: "Where the practice began.",
    intro: [
      "India is where Cynosure started. The practice was established here in 2006 as Cynosure Consultancy Services, and India remains the market where a large share of engagements begin — because the structure you build here shapes what is possible abroad later.",
      "We treat the Indian entity and the overseas entity as one plan rather than two projects. The ownership relationship, the commercial rationale and the timing are considered together from the outset, instead of being retrofitted once an application is already in progress.",
    ],
    sections: [
      {
        id: "how-we-help",
        title: "How We Help",
        lead: "Indian businesses and individuals planning a move into the UK, Canada, Australia or New Zealand.",
        items: [
          "Business structured in India alongside the overseas entity, planned as one cross-border move",
          "The corporate relationship between the Indian and overseas businesses that later mobility planning depends on",
          "Assessment of the Indian business against practical opportunities in the destination market",
          "Coordination with the professionals handling the overseas side of the same plan",
          "Executive and key-person mobility planning as the businesses develop",
        ],
      },
    ],
    audience: [
      "Indian SMEs expanding internationally",
      "Established Indian companies entering new markets",
      "Manufacturers and exporters",
      "Technology and professional service businesses",
      "Entrepreneurs building across two markets from the start",
    ],
    regulated: null,
    official: null,
    closing: "Every route we work on starts with the same question: where do you actually want to get to?",
  },

  {
    slug: "uk",
    name: "United Kingdom",
    Flag: GB,
    img: ukImg,
    lede: "Two decades of UK exposure, from an established UK base.",
    intro: [
      "The UK is where the practice first became international. Cynosure Consulting UK Ltd gave the business direct exposure to international clients, cross-border mobility and the practical complexities of helping individuals and businesses navigate opportunities across jurisdictions — experience that still underpins the UK work today.",
      "Expanding into the UK involves more than registering a company. Businesses need the right structure, professional support, local connections and a clear understanding of how to operate in the UK market. You may not need to build a UK team from day one; our role is to identify what is actually required and connect you with the right UK professionals.",
    ],
    sections: [
      {
        id: "market-entry",
        title: "Market Entry & Business Expansion",
        lead: "Establishing and growing an overseas business in the UK.",
        items: [
          "Market entry strategy — assessing your business model against practical UK opportunities",
          "UK business structure — company formation, corporate structure, accounting, taxation and compliance",
          "Local professional support — UK accountants, solicitors, financial professionals and specialist advisors",
          "Business and commercial connections — distributors, suppliers, partners and relevant contacts",
          "Operational establishment — the transition from an overseas business to a functioning UK operation",
          "Ongoing UK support and coordination as your business develops",
        ],
      },
    ],
    audience: [
      "SMEs expanding internationally",
      "Established companies entering the UK",
      "Manufacturers and exporters",
      "Technology and professional service businesses",
      "Entrepreneurs developing a UK business presence",
    ],
    regulated: null,
    official: null,
    closing: "Into the UK — with the right support.",
  },

  {
    slug: "canada",
    name: "Canada",
    Flag: CA,
    img: canadaImg,
    lede: "Experience. Strategy. The right professional expertise.",
    intro: [
      "Canada has been at the heart of our immigration expertise for many years. Whether your goal is permanent residence, employment, study, family reunification or establishing a business in Canada, the right pathway starts with understanding your circumstances, your objectives and your long-term plans.",
      "At Cynosure Global Residency, we provide the international client relationship and strategic coordination, working with qualified Canadian immigration professionals to deliver the appropriate regulated immigration services for each case.",
    ],
    sections: [
      {
        id: "immigration",
        title: "Your Canadian Immigration Options",
        lead: "Individuals and families planning a future in Canada.",
        cards: [
          {
            title: "Permanent Residence",
            text: "Explore economic, skilled, provincial, regional, family and other permanent residence pathways suited to your circumstances.",
          },
          {
            title: "Work & Employer Immigration",
            text: "Support for professionals, employers and international talent through appropriate work permit and workforce mobility pathways.",
          },
          {
            title: "Business Immigration",
            text: "Guidance for entrepreneurs and business owners considering Canadian business and immigration opportunities.",
          },
          {
            title: "Study & Temporary Residence",
            text: "Support for individuals and families exploring study, visitor and temporary residence options.",
          },
          {
            title: "Family Immigration",
            text: "Assistance with eligible family and sponsorship pathways, helping families plan their future together in Canada.",
          },
          {
            title: "Citizenship & Long-Term Planning",
            text: "Support for clients already established in Canada as they progress towards citizenship and their longer-term objectives.",
          },
        ],
      },
      {
        id: "market-entry",
        title: "Canada Market Entry & Business Expansion",
        lead: "Your business. Your Canadian opportunity. One coordinated pathway. Expanding into Canada requires more than establishing a company — it requires the right strategy, structure, market knowledge and local support.",
        groups: [
          {
            title: "Market Entry Strategy",
            items: [
              "Canadian market and industry assessment",
              "Market-entry strategy",
              "Provincial and regional considerations",
              "Go-to-market planning",
              "Business model and positioning",
            ],
          },
          {
            title: "Business Establishment",
            items: [
              "Company incorporation and corporate structuring",
              "Business and tax registrations",
              "GST/HST registration",
              "Banking and business address solutions",
              "Licensing and regulatory coordination",
              "Import/export setup",
            ],
          },
          {
            title: "Commercial Market Access",
            items: [
              "Customer and partner identification",
              "Business development",
              "Distributor and reseller opportunities",
              "Strategic partnerships",
              "Supplier and professional-network introductions",
              "Local market representation",
            ],
          },
          {
            title: "Finance, Tax & Compliance",
            items: [
              "Accounting and bookkeeping coordination",
              "Tax and GST/HST compliance",
              "Payroll setup",
              "Corporate compliance",
              "Cross-border tax coordination",
              "Financial administration",
            ],
          },
          {
            title: "People, Immigration & Global Mobility",
            items: [
              "Business immigration strategy",
              "Work permit pathways",
              "Executive and key-person mobility",
              "International recruitment",
              "Employee relocation",
              "Permanent residence planning",
            ],
          },
          {
            title: "Operational & Local Support",
            items: [
              "Local administrative support",
              "Canadian business address solutions",
              "Vendor and service-provider coordination",
              "HR and payroll support",
              "Operational administration",
              "Ongoing business support",
            ],
          },
        ],
        journey: ["Strategy", "Establishment", "Market Access", "Operations", "Growth"],
        journeyNote:
          "Our role doesn't end when your Canadian company is incorporated. We can continue to coordinate the professional, operational and commercial resources required as your business develops — from your initial launch through expansion and long-term growth.",
      },
    ],
    audience: [
      "International entrepreneurs",
      "Start-ups",
      "SMEs",
      "Established companies",
      "Investors",
      "Professional firms",
      "Technology businesses",
      "Manufacturers and exporters",
    ],
    regulated: {
      heading: "A Coordinated Canadian Immigration Experience",
      sub: "Cynosure Global Residency + Canadian Immigration Professionals",
      lead: "Our model brings together Cynosure's international client management and strategic coordination with the expertise of qualified Canadian immigration professionals.",
      ours: {
        title: "Cynosure Global Residency",
        items: ["Client relationship", "Strategic guidance", "Case coordination", "Cross-border support"],
      },
      theirs: {
        title: "Canadian Immigration Professionals",
        items: [
          "Regulated immigration advice",
          "Application preparation",
          "Representation",
          "Professional case management",
        ],
      },
      note: "This collaborative approach provides clients with one coordinated experience, while regulated immigration advice and representation remain with the appropriately qualified Canadian professional.",
    },
    official: {
      title: "Current Program Information",
      text: "Canadian immigration programs, eligibility criteria and application requirements can change. We therefore keep this website focused on our services rather than reproducing detailed program rules. For current eligibility requirements, program criteria, forms, fees and application information, please refer to the official Government of Canada resources or discuss your circumstances with the appropriate Canadian immigration professional.",
      label: "Immigration, Refugees and Citizenship Canada",
      url: "https://www.canada.ca/en/services/immigration-citizenship.html",
    },
    closing: "You don't need to know which immigration pathway is right for you before you speak with us.",
  },

  {
    slug: "australia",
    name: "Australia",
    Flag: AU,
    img: null,
    lede: "A coordinated approach to your Australian immigration journey.",
    intro: [
      "Australia continues to attract skilled professionals, entrepreneurs, business owners, families and internationally mobile individuals seeking new opportunities and a long-term future.",
      "Choosing the right immigration pathway, however, requires more than simply selecting a visa category. It requires a clear understanding of your circumstances, objectives and long-term plans. At Cynosure Global Residency, we help clients navigate this through a structured and coordinated approach — from understanding your objectives and assessing potential pathways to preparing for the professional advice and application process in Australia.",
    ],
    sections: [
      {
        id: "how-we-help",
        title: "How We Help",
        lead: "We begin by understanding your personal, professional and family circumstances and your objectives for Australia. Our aim is to help you understand the options available and determine the appropriate next step.",
        groups: [
          {
            title: "Immigration Pathway Assessment",
            items: [
              "Skilled migration",
              "Employer-sponsored migration",
              "Business and investment pathways",
              "Family and partner migration",
              "Student and graduate pathways",
              "Temporary residence",
              "Permanent residence",
              "Citizenship planning",
            ],
          },
          {
            title: "Application & Case Coordination",
            items: [
              "Documentation planning",
              "Evidence coordination",
              "Application process management",
              "Communication and case coordination",
              "Progress updates",
              "Pre- and post-lodgement support",
            ],
          },
          {
            title: "Business & Global Mobility",
            items: [
              "Employer and workforce mobility",
              "Executive and key-person relocation",
              "Business establishment",
              "Family relocation",
              "Long-term residence planning",
              "International mobility strategies",
            ],
          },
        ],
        note: "Strategic case preparation: a well-prepared immigration case begins with a clear understanding of the applicant's circumstances. We help clients organise their information, identify the key documentation required and prepare for a detailed assessment by the appropriate Australian immigration professional.",
      },
    ],
    audience: [
      "Skilled professionals",
      "Entrepreneurs and business owners",
      "Families and partners",
      "Students and graduates",
      "Internationally mobile individuals",
      "Employers relocating staff",
    ],
    regulated: {
      heading: "Our Australian Practitioner Network",
      sub: "International client support. Australian regulated expertise.",
      lead: "Australian immigration advice and representation is regulated. Cynosure works in collaboration with Australian registered migration agents and qualified immigration lawyers who provide the relevant regulated immigration advice and professional services. Our role is to understand the client's objectives, coordinate the relationship and help facilitate a smooth connection with the appropriate Australian practitioner.",
      ours: {
        title: "Cynosure Global Residency",
        items: ["International client strategy", "Coordination", "Relationship management"],
      },
      theirs: {
        title: "Australian Regulated Practitioner",
        items: ["Immigration advice", "Application services", "Representation"],
      },
      note: "The regulated practitioner remains responsible for the immigration advice, application work and representation within the scope of their professional engagement.",
    },
    official: null,
    closing:
      "Understand your options. Build your strategy. Connect with the right professional. Move forward with confidence.",
  },

  {
    slug: "new-zealand",
    name: "New Zealand",
    Flag: NZ,
    img: null,
    lede: "Your pathway begins with the right advice.",
    intro: [
      "Moving to New Zealand is a significant decision — whether you are pursuing a career opportunity, establishing a business, joining family, studying, or planning a long-term future.",
      "The challenge is not simply finding a visa. It is understanding which pathway fits your circumstances, how it supports your longer-term plans, and how to move forward with the right professional guidance. Cynosure Global Residency helps international clients navigate that journey with a structured, personal and coordinated approach.",
    ],
    sections: [
      {
        id: "objectives",
        title: "Start With Your Objective",
        lead: "Every immigration journey begins with a reason for moving. We first look at where you want to go — and why.",
        cards: [
          { title: "Skilled Migration", text: "Building a professional future in New Zealand." },
          { title: "Employment & Work", text: "Joining a New Zealand employer or developing your career." },
          { title: "Business & Investment", text: "Exploring opportunities to establish or grow a business." },
          { title: "Family & Partners", text: "Reuniting with family or building a future together." },
          {
            title: "Study & Graduate Pathways",
            text: "Turning education into longer-term opportunities.",
          },
          {
            title: "Residence & Long-Term Planning",
            text: "Developing a pathway towards establishing your future in New Zealand.",
          },
        ],
      },
      {
        id: "pathway",
        title: "From Possibility to Pathway",
        lead: "Once we understand your objectives, we help bring structure to the next stage. The result is a clearer journey — without having to navigate every stage alone.",
        steps: [
          {
            n: "01",
            title: "Understand",
            text: "We look at your personal, professional and family circumstances and identify the key factors that may influence your immigration options.",
          },
          {
            n: "02",
            title: "Prepare",
            text: "We help you organise the information and documentation required for a professional assessment, so that your case can be considered clearly and efficiently.",
          },
          {
            n: "03",
            title: "Professional Assessment",
            text: "Where regulated immigration advice is required, the relevant New Zealand immigration professional assesses the appropriate pathway and provides the necessary professional advice.",
          },
          {
            n: "04",
            title: "Coordinate",
            text: "Throughout the engagement, we coordinate communication, documentation and case progress between the client and the relevant professional.",
          },
        ],
      },
      {
        id: "beyond",
        title: "Beyond Immigration",
        lead: "For many clients, moving to New Zealand is only one part of a much bigger decision. A new job may involve relocating a family. A business opportunity may require key personnel to move. Our experience allows us to look at immigration within the context of the bigger picture.",
        items: [
          "Executive and key-person relocation",
          "Employer and workforce mobility",
          "Business establishment",
          "Family relocation",
          "Long-term residence planning",
          "International mobility requirements",
        ],
      },
    ],
    audience: [
      "Skilled professionals",
      "Employees joining a New Zealand employer",
      "Entrepreneurs and investors",
      "Families and partners",
      "Students and graduates",
      "Employers relocating staff",
    ],
    regulated: {
      heading: "The Right Expertise Behind Your Application",
      sub: "International client management. New Zealand regulated expertise.",
      lead: "New Zealand immigration advice is regulated. Cynosure Global Residency works with appropriately qualified New Zealand Licensed Immigration Advisers and immigration lawyers to ensure that regulated immigration advice and professional application services are provided through the appropriate professional channel. Our clients work with Cynosure as their principal point of contact throughout the engagement.",
      ours: {
        title: "Our Role",
        items: [
          "Client relationship",
          "Case coordination",
          "Documentation and communication",
          "International strategy",
        ],
      },
      theirs: {
        title: "Professional Immigration Expertise",
        items: ["Regulated immigration advice", "Application services", "Professional representation"],
      },
      note: "The regulated practitioner remains responsible for the immigration advice, application and representation within the scope of their professional engagement.",
    },
    official: null,
    closing:
      "One coordinated client experience — supported by the right professional expertise.",
  },
];

export function getCountry(slug) {
  return countryPages.find((c) => c.slug === slug);
}
