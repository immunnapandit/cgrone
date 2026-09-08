import {
  LuBuilding2,
  LuCompass,
  LuCpu,
  LuGlobe,
  LuHandshake,
  LuHeartPulse,
  LuLayers,
  LuMapPin,
  LuRepeat,
  LuRocket,
  LuSearch,
  LuShoppingBag,
  LuTarget,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu";

/* Business Expansion & Market Entry — the corporate advisory line.
 *
 * Source: src/assets/Documents/Cynosure_Global_Advisory_Profile ppt.pptx
 * (10 slides, added by the client). This is the first content on the site
 * aimed at a company rather than at a person: the three pillars sell mobility
 * to investors, families, professionals and employers, while this sells market
 * entry to a business that wants to trade somewhere it does not trade yet.
 *
 * ---- what was deliberately left out, and why -------------------------------
 *
 * SLIDE 8 ("Why Cynosure") is mostly already on the site and is NOT repeated
 * here. Three of its five bullets restate copy that exists verbatim elsewhere:
 *
 *   "20+ years of experience ..."      -> whyChooseUsPerks + whyChooseUsFacts
 *                                         in whyChooseUs.js, the aboutIntro
 *                                         stat, and aboutHighlights
 *   "established professional network" -> "Trusted Partner Network", same file
 *   "partner-led model ... specialists" -> aboutBulletPoints, and the
 *                                          regulated-professional line that
 *                                          every pillar page already carries
 *
 * A "Why Cynosure" block here would have been the fourth printing of the same
 * three claims, which reads as padding and dilutes them everywhere they
 * appear. Only the two genuinely new points survive — "one platform connecting
 * strategy, relationships, setup and mobility" and the boutique, founder-led
 * framing — and they are folded into `intro` below rather than given a section.
 *
 * SLIDE 9 ("First-Year Business Plan") is not here at all. It is an internal
 * roadmap — "Months 1-2: register the company, build the brand and launch the
 * website" — and on a public page it would tell a visitor the firm is still
 * being set up, directly contradicting the "practising since 2006" and "20+
 * years" positioning the rest of the site is built on.
 *
 * SLIDE 3's sixth capability, "Corporate Immigration & Global Mobility", is a
 * LINK rather than a description. That service has had its own full page since
 * 2026-08-27 (globalMobility.js -> /global-mobility, six support blocks and an
 * extension section). Describing it again here would be a second, shorter and
 * eventually divergent version of the same offer, so the card points at the
 * real page instead. `to` on a capability means exactly that.
 *
 * ---- the approach steps ----------------------------------------------------
 *
 * `approach` (slide 4) is a six-step sequence that shares three words with the
 * four-step `processSteps` on /about#process — Assess/Strategise/Connect
 * against Understand/Strategize/Connect. They are not duplicates and neither
 * should be edited to match the other: processSteps is an individual's advisory
 * journey and ends at "Move Forward", where this ends at a trading operation in
 * a new market. The audiences never overlap, and the two never appear on the
 * same page. Note the spelling differs too (Strategise here, Strategize there)
 * because each follows its own source document.
 */
export const marketEntry = {
  title: "Business Expansion & Market Entry",
  eyebrow: "Business Expansion",

  /* Slide 1's sub-heading and positioning line, verbatim. */
  lede: "Helping businesses enter, establish and grow across international markets.",
  strapline: "India-based · International outlook · Partner-led execution",

  intro: [
    "A practical advisory platform for businesses looking beyond their home market.",
    "One platform connecting strategy, relationships, setup and mobility — a boutique approach, founder-led, that brings the right specialists into each market rather than handing you a report and a bill.",
  ],

  /* Slide 2. */
  aimsTitle: "What We Set Out To Do",
  aims: [
    {
      icon: LuTarget,
      text: "Help businesses identify the right international markets.",
    },
    {
      icon: LuHandshake,
      text: "Build the right local relationships and partnerships.",
    },
    {
      icon: LuCompass,
      text: "Support market entry from strategy through execution.",
    },
    {
      icon: LuTrendingUp,
      text: "Create long-term international growth opportunities.",
    },
  ],

  /* Slide 3. Titles are verbatim; the descriptions are written for the page,
     since the slide is a bare list. The last one links out — see the header. */
  capabilitiesTitle: "What Cynosure Does",
  capabilities: [
    {
      icon: LuSearch,
      title: "Market Assessment",
      text: "Which international markets are worth your time and which are not, judged against your product, your capacity and what you are trying to achieve.",
    },
    {
      icon: LuCompass,
      title: "Market Entry Strategy",
      text: "A route into the market you choose — how you position, in what order you move, and what has to be true before you commit.",
    },
    {
      icon: LuHandshake,
      title: "Strategic Partnerships",
      text: "Identifying and approaching the local clients, partners, distributors and networks an entry actually depends on.",
    },
    {
      icon: LuBuilding2,
      title: "Business Setup Coordination",
      text: "Coordinating the work of establishing the entity, with local legal, tax and regulatory matters handled through the appropriate professional partners.",
    },
    {
      icon: LuGlobe,
      title: "Corporate Immigration & Global Mobility",
      text: "Moving the people who will run the new operation, and their families with them.",
      to: "/global-mobility",
      linkLabel: "See Global Mobility",
    },
    {
      icon: LuRepeat,
      title: "Ongoing Expansion Support",
      text: "Continuing support once the market is live — business development, the next market, and the phase of growth after this one.",
    },
  ],

  /* Slide 4. Step names verbatim; the one-liners are drawn from the sequence
     on slide 6, which describes the same process in sentences. */
  approachTitle: "Our Market Entry Approach",
  approachLede:
    "A simple process designed to move from an idea to an actionable plan.",
  approach: [
    {
      n: "01",
      title: "Assess",
      text: "Understand the company, the product and the expansion goals.",
    },
    {
      n: "02",
      title: "Strategise",
      text: "Select suitable target markets and the route into them.",
    },
    {
      n: "03",
      title: "Connect",
      text: "Identify potential clients, partners and local networks, and coordinate the introductions.",
    },
    {
      n: "04",
      title: "Establish",
      text: "Put the entity and the practical foundations in place, through the appropriate professional partners.",
    },
    {
      n: "05",
      title: "Launch",
      text: "Support pilots, early trading and the first business-development activity in the market.",
    },
    {
      n: "06",
      title: "Grow",
      text: "Build the operation out — and, when it is ready, the market after it.",
    },
  ],
  approachNotes: [
    "We focus on execution, not just reports.",
    "Local legal, tax, regulatory and specialist work is handled through appropriate professional partners.",
  ],

  /* Slide 5, verbatim. */
  clientsTitle: "Who We Work With",
  clients: [
    { icon: LuCpu, text: "Technology and AI companies" },
    { icon: LuHeartPulse, text: "Healthcare and HealthTech businesses" },
    { icon: LuBuilding2, text: "Professional services firms" },
    { icon: LuShoppingBag, text: "Innovative consumer and emerging businesses" },
    { icon: LuRocket, text: "Indian companies seeking international expansion" },
    {
      icon: LuMapPin,
      text: "International companies looking to enter India and selected growth markets",
    },
  ],

  /* Slide 7, verbatim — three tiers rather than a price list. */
  valueTitle: "How We Create Value",
  value: [
    {
      icon: LuCompass,
      label: "Advisory",
      items: ["Market research", "Strategy", "Expansion planning"],
    },
    {
      icon: LuLayers,
      label: "Implementation",
      items: ["Partner identification", "Market entry", "Business setup coordination"],
    },
    {
      icon: LuRepeat,
      label: "Ongoing",
      items: ["Retainers", "Business development", "Expansion support"],
    },
  ],

  /* Slide 6, verbatim. */
  partnershipTitle: "Strategic Partnership Model",
  partnershipLede:
    "Cynosure can act as an international business development and market-entry partner.",
  partnership: [
    "Understand the company, product and expansion goals.",
    "Select suitable target markets.",
    "Identify potential clients, partners and local networks.",
    "Coordinate introductions and market-development activity.",
    "Support pilots, business setup and early-stage expansion.",
    "Develop an ongoing relationship where there is mutual value.",
  ],
  partnershipIcon: LuUsers,

  /* Slide 10. The deck's other line here — "International Market Entry ·
     Strategic Expansion · Global Mobility" — is not used: it is too long for
     the eyebrow slot, which sits inside StatementBand's max-w-2xl and broke it
     across two lines with "MOBILITY" orphaned on the second. It also restates
     the page it closes. This line is the one piece of slide 10 that is NOT
     said elsewhere on the page. */
  closingEyebrow: "India · International Markets",
  closing: "Helping businesses cross borders.",
  cta: "Talk to us about entering a new market",
};
