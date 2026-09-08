import AU from "country-flag-icons/react/3x2/AU";
import CA from "country-flag-icons/react/3x2/CA";
import GB from "country-flag-icons/react/3x2/GB";
import IN from "country-flag-icons/react/3x2/IN";
import NZ from "country-flag-icons/react/3x2/NZ";
import canadaImg from "@/assets/images/services/canada-immigration.webp";
import ukImg from "@/assets/images/services/global-residency-investment-migration.webp";

/* Canada destination photography, added 2026-09-07 with the page rebuild.
   Unsplash, commercial use, no attribution — same licence bar and the same
   opened-and-looked-at-before-committing rule as the programme images.
   Prepared by scripts/convert-country-images.mjs.

   NOT used: services/canada-immigration.webp, the passport-flag-and-rubber-
   stamp composite this page opened on. It is the exact "generic stock" the
   brief rules out, and a page about somebody's life should not lead with an
   image of paperwork. It stays imported as `img` because PageTitle still
   falls back to it for other callers. */
import caHero from "@/assets/images/countries/canada-vancouver-golden-hour.webp";
import caMountains from "@/assets/images/countries/canada-vancouver-mountains.webp";
import caLake from "@/assets/images/countries/canada-moraine-lake.webp";
import caStreet from "@/assets/images/countries/canada-toronto-distillery.webp";

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
        /* "or further afield" matters on this page specifically: an Indian
           client looking at a Caribbean or European investment route would
           otherwise read four destination names and conclude the practice does
           not cover theirs, on the one page most likely to be their first. */
        lead: "Indian businesses and individuals planning a move into the UK, Canada, Australia, New Zealand or further afield.",
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

    /* =====================================================================
       CANADA DESTINATION PAGE — added 2026-09-07
       =====================================================================
       Every key below is OPT-IN. CountryDetail.jsx renders each block only
       when the country carries it, so India, the UK, Australia and New
       Zealand are untouched by all of this and keep the original layout.

       ---- WHAT CONSTRAINS THE CONTENT ---------------------------------
       Two things, and they pull in the same direction.

       1. `official` at the foot of this entry states the site's own policy:
          "We therefore keep this website focused on our services rather than
          reproducing detailed program rules." 2. `regulated` states that
          regulated immigration advice and representation stay with the
          qualified Canadian professional.

       So this page NAMES what exists and says who it suits. It does not
       state thresholds, scores, fees or processing times, and it does not
       tell a reader whether they qualify — that is the assessment, and the
       determination is IRCC's. Where a reader needs the actual rule, the
       page sends them to IRCC (see `official`).

       ---- EVERY PROGRAM STATUS HERE WAS VERIFIED ----------------------
       Checked against canada.ca/en/immigration-refugees-citizenship on
       2026-09-07, against the department's own "Immigrate to Canada" index,
       which sorts its programs into open / paused / closed:

         OPEN    Express Entry - Provincial Nominee Program - Atlantic
                 Immigration Program - Rural and Francophone Community
                 Immigration Pilots - home care workers - physicians -
                 Quebec-selected skilled workers - Quebec investors and
                 entrepreneurs - family sponsorship
         PAUSED  Start-up Visa - Self-employed persons
         CLOSED  Agri-Food Pilot - Rural and Northern Immigration Pilot
                 (RNIP) - TR-to-PR pathway - Economic Mobility Pathways
                 Pilot - and several situation-specific streams

       The paused pair is PUBLISHED rather than quietly omitted, in
       `pathways.paused`. A reader who has been researching Canada for a
       year has heard of the Start-up Visa; a page that simply leaves it out
       looks incomplete, and one that still lists it as open is wrong.

       RE-CHECK THIS BLOCK BEFORE ANY EDIT. Program status is the one thing
       on this page that goes stale silently, and `pathways.checked` carries
       the date it was last verified. That date is the thing to keep current.
       ===================================================================== */

    hero: {
      eyebrow: "Canada",
      title: "Immigrate to Canada",
      /* Not "Canada is a land of opportunity". The one thing a reader
         actually needs at the top is that there is no single Canadian
         route — which is also the reason to talk to somebody. */
      lede: "Canada does not run one immigration programme. It runs a federal points system, a nomination stream for every province, regional and community pilots, and a separate family route — and the one that fits depends on your work, your language, your family and where you intend to settle.",
      /* The brief asked for "Speak to an Immigration Expert" as the second
         action. Both CTAs would then land on /contact, which is two buttons
         doing one job. The second is the in-page jump instead: a visitor who
         is not ready to talk wants to see the options, and that is the
         section immediately below. */
      primary: { label: "Check Your Eligibility", to: "/contact" },
      secondary: { label: "Explore the Pathways", to: "#pathways" },
      image: {
        src: caHero,
        alt: "False Creek and the downtown Vancouver skyline at golden hour, with the North Shore mountains behind",
      },
    },

    /* Five, all sourced. The two figures are from the 2026-2028 Immigration
       Levels Plan; the category count is IRCC's current Express Entry list.
       No "quality of life" ranking, no "one of the world's most welcoming" —
       those are the invented statistics the brief rules out. */
    quickFacts: [
      { label: "Planned PR admissions", value: "380,000", note: "A year, for each of 2026, 2027 and 2028" },
      { label: "Express Entry admissions", value: "109,000", note: "Planned for 2026, rising to 111,000 in 2027 and 2028" },
      { label: "Permanent residence routes", value: "Multiple", note: "Federal, provincial, regional, Quebec and family streams" },
      { label: "Express Entry categories", value: "Ten", note: "Occupation and language categories used in current rounds" },
      { label: "Official languages", value: "English & French", note: "French proficiency is its own selection category" },
    ],

    whyCountry: {
      title: "Why Canada",
      lead: "Most of the reasons are structural rather than promotional — Canada's system is unusually explicit about who it is trying to select, which is what makes it possible to plan against.",
      items: [
        {
          title: "Routes that end in permanent residence",
          text: "The main economic streams apply for permanent residence directly, rather than granting a temporary status you must later convert.",
        },
        {
          title: "Selection aimed at occupations",
          text: "Express Entry runs category-based rounds for named fields — healthcare and social services, trades, STEM, education, transport and others.",
        },
        {
          title: "Provinces select their own",
          /* NOT "every province and territory except Quebec" — that was the
             first draft and it is wrong. Nunavut does not run a nominee
             programme, so the universal quantifier is a false claim on a page
             whose whole credibility rests on not making them. */
          text: "Provinces and territories run their own nomination streams for the skills their labour markets are short of, and Quebec selects separately again.",
        },
        {
          title: "Regional and community routes",
          text: "The Atlantic Immigration Program and the rural and francophone community pilots exist for people willing to settle outside the largest cities.",
        },
        {
          title: "Family is its own stream",
          text: "Sponsorship of spouses, partners, dependent children and other eligible relatives is a named route, not an exception to the economic ones.",
        },
        {
          title: "Two official languages",
          text: "French-language proficiency is one of the current Express Entry selection categories, and the francophone community pilot exists alongside it.",
        },
      ],
      image: {
        src: caMountains,
        alt: "Downtown Vancouver from across False Creek, with the snow-capped North Shore mountains behind the city",
      },
    },

    pathways: {
      id: "pathways",
      title: "Immigration Pathways",
      lead: "The routes below are the ones Immigration, Refugees and Citizenship Canada currently lists as open. Which of them applies to you depends on your circumstances, and the eligibility determination is IRCC's.",
      checked: "Program status last verified against IRCC on 7 September 2026.",
      /* ---- ONE TABLE, NOT A PROSE LIST PLUS A TABLE (2026-09-07, second pass)
         This was nine routes as a ruled list, each with a `text` paragraph AND
         a `detail` paragraph, followed by a SEPARATE five-row comparison table
         that restated five of them. Measured: 2,249px + 831px = 3,080px, just
         over four screens, to answer one question twice.

         It is one table now, covering all nine. `turns` is the column that
         earns its place — the single condition that most often decides whether
         a route is open to you at all, which is the thing a reader is actually
         scanning for. The old `detail` lines are gone; the two facts worth
         keeping from them (the ten Express Entry categories, and that the
         pilot communities are a named list) moved into `text`.

         No "Outcome" column: it read "Permanent residence" nine times. That
         belongs in the lead sentence, said once. */
      open: [
        {
          name: "Express Entry",
          who: "Skilled workers and tradespeople",
          text: "The federal system, covering the Federal Skilled Worker and Federal Skilled Trades Programs and the Canadian Experience Class. Ten category-based streams currently run alongside the general rounds.",
          turns: "Qualifying work experience and language ability",
        },
        {
          name: "Provincial Nominee Program",
          who: "Applicants committed to one province",
          text: "Participating provinces and territories nominate for the occupations each one needs. Some streams connect to Express Entry, others are applied for directly.",
          turns: "A nomination from that province or territory",
        },
        {
          name: "Atlantic Immigration Program",
          who: "Workers moving to Atlantic Canada",
          text: "An employer-driven route for New Brunswick, Newfoundland and Labrador, Nova Scotia and Prince Edward Island.",
          turns: "An offer from a designated Atlantic employer",
        },
        {
          name: "Rural Community Immigration Pilot",
          who: "Workers settling in a participating rural community",
          text: "For people prepared to settle in one of the specific rural communities taking part. The list of communities is named by IRCC, not open-ended.",
          turns: "A role in a participating community, and its endorsement",
        },
        {
          name: "Francophone Community Immigration Pilot",
          who: "French-speaking workers outside Quebec",
          text: "The francophone counterpart to the rural pilot, for participating French-speaking communities outside Quebec.",
          turns: "French ability and a participating community",
        },
        {
          name: "Home care workers",
          who: "Caregivers",
          text: "Permanent residence routes for home care workers. Intake arrangements are set by IRCC and worth checking before planning around this one.",
          turns: "Qualifying care work experience",
        },
        {
          name: "Physicians",
          who: "Medical doctors",
          text: "A route for doctors, alongside an Express Entry category for physicians with Canadian work experience. Provincial licensing runs separately, on its own timetable.",
          turns: "Medical qualifications and, for the category, Canadian experience",
        },
        {
          name: "Quebec programs",
          who: "Applicants intending to settle in Quebec",
          text: "Quebec selects its own economic immigrants — skilled worker routes plus investor and entrepreneur streams — under criteria set by the province rather than by IRCC.",
          turns: "Selection by Quebec, under Quebec's own rules",
        },
        {
          name: "Family sponsorship",
          who: "Close relatives of citizens and permanent residents",
          text: "Sponsorship of a spouse or partner, dependent children and other eligible relatives. The sponsor's eligibility is assessed alongside the applicant's.",
          turns: "An eligible sponsor already in Canada",
        },
      ],
      /* Published, not omitted — see the note at the head of this block. */
      paused: {
        title: "Currently paused",
        text: "Two business routes are not accepting new applications. They appear here because they are widely written about elsewhere and a reader who has heard of them deserves the current position rather than silence.",
        items: [
          {
            name: "Start-up Visa",
            text: "IRCC stopped accepting new applications after 31 December 2025. Applicants holding a valid 2025 commitment from a designated organisation had until 30 June 2026 to file. Applications already accepted continue to be processed.",
          },
          {
            name: "Self-employed persons",
            text: "Paused. Not accepting new applications.",
          },
        ],
      },
    },


    /* `process`, NOT `journey`. The market-entry section further down already
       carries a `journey` key (Strategy -> Growth) and the renderer reads it
       inside the sections loop; reusing the name at country level would have
       been two different shapes under one word. */
    process: {
      title: "How an Application Runs",
      /* The honest caveat is doing real work here. The brief's six-step
         journey is the shape MOST applications take, but the Atlantic
         programme starts with an employer and family sponsorship starts with
         the sponsor, so presenting one universal process would be wrong. */
      lead: "This is the shape most applications take. It is not universal — an Atlantic or community application starts with an employer, a provincial stream starts with the province, and a sponsorship starts with the sponsor in Canada.",
      steps: [
        { title: "Assessment", text: "Your work history, qualifications, language, family and intended province, against the routes actually open to you." },
        { title: "Route selection", text: "Narrowing to the one or two streams worth preparing for, and deciding what has to be true before filing." },
        { title: "Evidence", text: "Language testing, credential assessment and the employment evidence the chosen route turns on. Usually the longest stage." },
        { title: "Filing", text: "Prepared and submitted by the regulated Canadian professional handling the file." },
        { title: "Assessment by IRCC", text: "Including background and medical checks. Timelines differ by programme and are published by IRCC." },
        { title: "Arrival", text: "Landing formalities, and the practical side of settling — province, housing, schooling, credential recognition." },
      ],
    },

    profiles: {
      title: "Which Applies to You?",
      lead: "Most people arrive at this page already fitting one of these descriptions. It is the fastest way to narrow nine routes down to two or three worth discussing.",
      items: [
        { title: "Skilled professionals", text: "Degree-level work experience in a field Canada is selecting for.", route: "Express Entry, or a provincial stream" },
        { title: "Tradespeople", text: "Certified trades experience, with trades as a named Express Entry category.", route: "Express Entry or PNP" },
        { title: "Workers with a Canadian offer", text: "An employer in Atlantic Canada or a participating community changes which routes open up.", route: "Atlantic Immigration Program, community pilots, PNP" },
        { title: "Families", text: "A spouse, partner, child or eligible relative already a citizen or permanent resident.", route: "Family sponsorship" },
        { title: "French speakers", text: "French-language ability is selected for in its own right, inside and outside Quebec.", route: "Express Entry French category, FCIP, Quebec" },
        { title: "Healthcare and medical", text: "Healthcare and social services is a category; physicians have a route of their own.", route: "Express Entry, physician routes, PNP" },
      ],
    },

    gallery: {
      title: "Life in Canada",
      lead: "Where you settle changes the immigration route as much as it changes the life — the community pilots and provincial streams exist precisely because Vancouver, Halifax and a rural prairie town are not the same proposition.",
      images: [
        { src: caStreet, alt: "A pedestrian street in Toronto's Distillery District at dusk, strung with lights, the CN Tower beyond", caption: "Cities" },
        { src: caLake, alt: "Moraine Lake in Banff National Park, Alberta, below the snow-covered Valley of the Ten Peaks", caption: "Landscape" },
        { src: caMountains, alt: "Downtown Vancouver seen across the water, the North Shore mountains rising behind it", caption: "Coast and mountains" },
      ],
    },

    factors: {
      title: "What an Assessment Looks At",
      lead: "These are the factors Canadian economic routes are built around. Deliberately no numbers: the thresholds differ by programme, several are scored rather than pass-or-fail, and the determination belongs to IRCC and to the regulated professional handling the file — not to a website.",
      groups: [
        { q: "Age", a: "Most economic streams score age, with the strongest scoring in the earlier working years. It is a scored factor rather than a cut-off in Express Entry." },
        { q: "Language", a: "English or French ability, evidenced by an approved test. French is scored separately and is also its own Express Entry selection category." },
        { q: "Education", a: "Qualifications gained outside Canada generally need an Educational Credential Assessment before they can be counted." },
        { q: "Work experience", a: "Skilled experience, classified against Canada's occupational system. Canadian experience and foreign experience are counted differently." },
        { q: "Job offer", a: "Not required for every route, and decisive for some — the Atlantic Immigration Program and the community pilots are built around one." },
        { q: "Provincial nomination", a: "A nomination from a province or territory is a route in itself and materially changes an Express Entry profile." },
        { q: "Settlement funds", a: "Several routes require you to show funds to support yourself and your family on arrival. The amount depends on family size and is set by IRCC." },
      ],
    },

    documents: {
      title: "What You Will Be Asked to Gather",
      lead: "Requirements vary by programme and by your own circumstances — this is the shape of it, not a checklist. The regulated professional handling your file confirms what is actually needed.",
      items: [
        { title: "Identity and travel", text: "Passports and travel history for everyone included in the application." },
        { title: "Language results", text: "Results from an approved English or French test, within their validity period." },
        { title: "Education", text: "Degrees, transcripts and, where qualifications are foreign, an Educational Credential Assessment." },
        { title: "Work history", text: "Employment letters and evidence establishing duties, hours and dates." },
        { title: "Funds", text: "Proof of settlement funds where the route requires it." },
        { title: "Family", text: "Marriage, birth and relationship documents for accompanying family." },
        { title: "Police certificates", text: "From countries where you have lived, as directed." },
        { title: "Medical examination", text: "Completed by a panel physician when instructed." },
      ],
    },

    faqs: [
      { q: "Which pathway is right for me?", a: "That is what an assessment establishes. In practice it turns on your occupation, your language ability, whether you hold a Canadian job offer and which province you intend to settle in." },
      { q: "What is Express Entry?", a: "The federal system covering three skilled-worker programmes. Eligible candidates sit in a pool, are ranked, and are invited to apply for permanent residence in rounds — some general, some targeting named categories." },
      { q: "What is a Provincial Nominee Program?", a: "Each province and territory outside Quebec runs its own streams for the skills it needs and can nominate candidates for permanent residence. Some streams connect to Express Entry; others are applied for directly." },
      { q: "Do I need a job offer?", a: "Not for every route. Express Entry can be entered without one. The Atlantic Immigration Program and the community pilots are built around an offer from a designated or participating employer." },
      { q: "Can I include my family?", a: "Economic applications generally include a spouse or partner and dependent children. Sponsoring a relative already separated from you is a different route — family sponsorship." },
      { q: "Is the Start-up Visa still available?", a: "No. IRCC stopped accepting new applications after 31 December 2025, and the final window for holders of a valid 2025 commitment closed on 30 June 2026. Applications already accepted are still being processed." },
      { q: "How long does an application take?", a: "It depends on the programme and IRCC publishes current processing times itself. We do not quote a figure here, because a stale timeline is worse than none." },
      { q: "Does Quebec work differently?", a: "Yes. Quebec selects its own economic immigrants under its own criteria, so a Quebec plan and a federal plan are genuinely different applications." },
      { q: "Who actually files the application?", a: "A regulated Canadian immigration professional. We handle the assessment, the strategy and the coordination; regulated advice and representation stay with the qualified practitioner in-country." },
    ],

    finalCta: {
      title: "The Right Route Is the Whole Question",
      text: "Nine open pathways, each with its own criteria and its own timetable. A first conversation covers your work, your family, where you want to settle and which two or three routes are realistically worth preparing for.",
      primary: { label: "Check Your Eligibility", to: "/contact" },
      secondary: { label: "Speak to an Adviser", to: "/contact" },
    },

    sections: [
      {
        id: "immigration",
        /* Retitled 2026-09-07. Was "Your Canadian Immigration Options", which
           now sits three sections below "Immigration Pathways" and read as a
           second, vaguer version of it. These six are SERVICE lines — what we
           help with, including study, temporary residence and citizenship,
           none of which are permanent-residence programmes — so the heading
           says that instead. The cards themselves are unchanged. */
        title: "How We Support You",
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
        /* From Cynosure_Canada_Market_Entry_Business_Expansion.docx. This was
           the one block of that document with nothing on the page. */
        coordinated: {
          title: "One Coordinated Point of Contact",
          body: [
            "International expansion can involve lawyers, accountants, immigration professionals, recruiters, corporate service providers and other specialists.",
            "We help bring these requirements together into a coordinated pathway, giving you a clearer view of what needs to happen, when it needs to happen and who should handle it.",
          ],
          tagline: "One strategy. One coordinated pathway. The right Canadian resources.",
        },
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
        /* From Cynosure_Australia_Immigration_Global_Mobility.docx. The
           document's four-step tagline was already here as `closing`, but the
           two sentences that set it up were not on the page at all. */
        coordinated: {
          title: "A More Connected Immigration Experience",
          body: [
            "For clients based outside Australia, navigating a new immigration system can often feel fragmented.",
            "Our role is to provide a familiar point of coordination throughout the journey while connecting you with the appropriate Australian immigration professional for your case.",
          ],
        },
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
