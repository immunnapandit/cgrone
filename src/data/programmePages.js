import AG from "country-flag-icons/react/3x2/AG";
import { LuLandmark, LuUsers } from "react-icons/lu";
/* Unsplash, free for commercial use, no attribution required — the licence
   banners.js already restricts this project to. Checked for third-party
   branding and identifiable faces before use; carries neither.
   English Harbour, Antigua at sunset — Rick Jamison (9CJTrF-HnlU).
   Downscaled to 1600px and encoded to WebP. */
import antiguaSunset from "@/assets/images/programmes/antigua-harbour-sunset.webp";
/* Falmouth Harbour, Antigua — same licence, same checks. This is the hero
   photograph: it fills the right half of the split header, so it needs a
   subject that survives a hard vertical crop. */
import antiguaDay from "@/assets/images/programmes/antigua-harbour-day.webp";

/* Programme detail pages for Pillar 1 — one per CBI/RBI programme listed on
 * /investment-migration. Distinct from countryPages.js, which covers the five
 * jurisdictions the firm operates IN; these cover programmes it advises ON.
 *
 * ---- SECTION ORDER MIRRORS THE REFERENCE ------------------------------------
 * The client asked for henleyglobal.com's programme-page layout. Their body
 * sections, in order, are:
 *
 *   0  Header                  split: copy on white left, photo bleeding off
 *                              the right edge, tab strip overlapping its foot
 *   1  Overview                two half-width panels — slate left (heading,
 *                              copy, two actions), pale right (icon facts)
 *   2  Benefits                dash-ruled list, 4, in the left column
 *   3  Requirements            NUMBERED list, 4 investment options, left column
 *                              — a photograph rides sticky in the right column
 *                              alongside 2 and 3
 *   4  Procedure               paragraphs, left column, empty right
 *   5  Why choose <firm>       half-width slate panel bleeding off the LEFT
 *                              edge: dash list, 5, + enquiry
 *   6  FAQ                     accordion, 9, left column + link to the region
 *   7  Contact                 paragraph + image + enquiry
 *
 * This file and ProgrammeDetail.jsx follow that order and those forms exactly,
 * including the shapes that are weaker than what was here before: `procedure`
 * is prose rather than the five numbered stages it replaced, and `requirements`
 * is a numbered list rather than cards, because the reference uses a numbered
 * list.
 *
 * Note what the reference does with its right-hand half: for most of the page,
 * nothing. Sections 4 and 6 leave it empty and 5 leaves it white beside a slate
 * panel. That is not an oversight to be tidied up — the measure it produces
 * (~70 characters) is the reason the pages read as documents rather than as
 * marketing, and filling those columns would undo the layout being copied.
 *
 * ---- WHAT IS DELIBERATELY NOT COPIED ---------------------------------------
 * The prose. Every string below is written for this firm. The reference's copy
 * is its own commercial writing on a live competitor's site, and reproducing it
 * would be both a copyright matter and immediately identifiable to anyone who
 * reads both pages.
 *
 * Still absent: processing times and visa-free destination counts. Both move,
 * neither is sourced, and a stale number on either is worse than no number.
 *
 * Investment thresholds ARE published, which reverses what this file did
 * first. Cynosure_CBI_RBI_Website_Content.docx ends with
 *
 *   "The website should keep program descriptions concise. Detailed investment
 *    amounts, documentation, eligibility analysis and process steps can be
 *    provided after an initial client enquiry and profile assessment."
 *
 * — concise descriptions, and the DETAIL after an enquiry. The four government
 * minimums are what the page needs to be usable at all; the eligibility
 * analysis and the full cost of a route still sit behind the assessment, which
 * is what `disclosure` and the cost FAQ both say. Thresholds "may change" —
 * Caribbean minimums were last revised in 2024 — so `disclosure` carries the
 * date they were last checked, and that date is the thing to keep current.
 * --------------------------------------------------------------------------- */

export const programmePages = [
  {
    slug: "antigua-barbuda",
    name: "Antigua & Barbuda",
    Flag: AG,
    kind: "cbi",
    kindLabel: "Citizenship by Investment",

    lede: "Caribbean citizenship through a qualifying investment, for families planning across more than one generation.",

    /* 0 — Header photograph. Sits in the right half of the split header and is
       cropped hard by it, so the horizon has to sit high enough to survive. */
    hero: {
      src: antiguaDay,
      alt: "Falmouth Harbour, Antigua — yachts moored below green hillsides",
    },

    /* 1 — Overview. ONE paragraph: the reference runs 33 words here and this
       ran 85 across two. */
    intro: [
      "Antigua and Barbuda offers citizenship through four qualifying investment routes, administered by the country's Citizenship by Investment Unit. Applications are filed by a licensed agent in-country; we assess your profile and coordinate the matter throughout.",
    ],

    keyFacts: [
      {
        icon: LuLandmark,
        label: "Minimum investment",
        value: "US$230,000",
        note: "National Development Fund contribution — the lowest of the four routes",
      },
      {
        icon: LuUsers,
        label: "Who may be included",
        value: "Spouse, dependent children and other qualifying dependants",
      },
    ],

    /* 2 — Benefits. Four, as a bulleted list. */
    benefits: [
      "Citizenship for the main applicant and qualifying family members under a single application, rather than a separate process for each person.",
      "Citizenship of a Commonwealth country, with the travel access an Antigua and Barbuda passport carries.",
      "No requirement to relocate, though a short minimum presence condition applies within the first years of holding citizenship.",
      "Citizenship that may generally be passed to children born afterwards, subject to the programme's rules at the time.",
    ],

    /* 3 — Requirements. Plain sentences in the reference's order (fund, UWI,
       real estate, business) and at its length — its four run 15/17/47/37
       words. These were objects with a heading, an amount chip and a paragraph
       each, about 250 words against the reference's 116; the numbering is its
       convention, not a claim that the routes are ranked. */
    requirements: [
      "A non-refundable contribution to the National Development Fund of a minimum of US$230,000, plus government processing fees that scale with family size.",
      "A contribution to the University of the West Indies Fund of US$260,000, open to applications of six family members or more.",
      "The purchase of real estate with a minimum value of US$300,000 in a development approved for programme purposes. The property cannot be resold for five years, unless the proceeds are reinvested in another approved Antigua and Barbuda property.",
      "The purchase of an approved business for a minimum of US$1,500,000 as an individual. Alternatively, two or more applicants may invest jointly in a single approved business totalling at least US$5,000,000, each contributing no less than US$400,000.",
    ],

    /* 4 — Procedure. Three paragraphs, as the reference has it — same wording
       as the single block this replaced, broken at the three stages it
       already described: filing, due diligence, completion. */
    procedure: [
      "An application begins with an assessment of your objectives, family composition and profile, and a decision on which qualifying route fits. Documentation is then prepared and filed by an agent licensed in Antigua and Barbuda — applications cannot be submitted directly.",
      "The Citizenship by Investment Unit conducts background checks on the main applicant and every adult dependant. This stage determines the outcome, and no adviser can shorten it.",
      "On approval, the qualifying investment is completed and the citizenship and passport formalities follow. A short minimum presence condition applies once citizenship is held.",
    ],

    /* The photograph that rides in the right-hand column beside Benefits and
       Requirements. No `caption`: it was captioned when it was a full-width
       band with type over it, and at this size and position a caption would be
       a second, competing column of text beside the one that matters. */
    feature: {
      src: antiguaSunset,
      alt: "English Harbour, Antigua, at sunset — yachts at anchor below green hills",
    },

    /* 5 — Why choose us. Five, as a dash list with an enquiry link.
       Every line here is checkable against the firm's own record: no client
       numbers, no office counts, no award claims, and no regulator named. See
       the credentials note in the project memory — the reference's equivalent
       section leads with volume metrics this firm does not have. */
    whyChoose: [
      "Two decades of advisory experience across immigration, global mobility and investment migration.",
      "Strategy before paperwork — we establish whether this route fits before an application is prepared.",
      "A coordinated network of qualified lawyers and regulated professionals across jurisdictions.",
      "Regulated advice stays with the qualified professional in-country.",
      "One point of contact from assessment to completion.",
    ],

    /* 6 — FAQ. Nine, matching the reference's count AND its answer length: its
       answers run 15–31 words. These ran 40–70, which is where a third of the
       page's excess copy was. Each answer is now one or two sentences; the
       detail behind them belongs in the assessment, which is what the
       programme's own source document asks for. */
    faqs: [
      {
        q: "Who can be included in one application?",
        a: "The main applicant, a spouse, dependent children and other qualifying dependants. Which relatives qualify is confirmed at assessment.",
      },
      {
        q: "What are the qualifying investment routes?",
        a: "A National Development Fund contribution, the University of the West Indies Fund, approved real estate, or an approved business investment.",
      },
      {
        q: "What does the programme cost?",
        /* This answer used to say we do not publish figures, on a page that
           publishes four. It points at them instead. */
        a: "The minimum for each route is set out above, from US$230,000. Government, due-diligence and legal fees are additional and depend on family size.",
      },
      {
        q: "Do I need to live in Antigua and Barbuda?",
        a: "No. A short minimum presence condition applies within the first years of holding citizenship.",
      },
      {
        q: "Is the investment refundable?",
        a: "A fund contribution is not. Real estate and business investments may be recoverable on resale after the minimum holding period, subject to the market.",
      },
      {
        q: "What does due diligence involve?",
        a: "Background checks on the main applicant and every adult dependant, carried out by the Citizenship by Investment Unit.",
      },
      {
        q: "Can citizenship be passed to children born afterwards?",
        a: "Generally yes, subject to the programme's rules at the time.",
      },
      {
        q: "Can I keep my existing citizenship?",
        a: "Antigua and Barbuda does not require you to renounce. Whether your own country permits dual citizenship is a question for its law.",
      },
      {
        q: "What does Cynosure do, and what does the licensed agent do?",
        a: "We assess your profile, recommend the route and coordinate the matter. The application is filed by an agent licensed in Antigua and Barbuda.",
      },
    ],

    /* the reference closes its FAQ with a link out to the regional programmes */
    related: {
      label: "Compare the Caribbean citizenship programmes",
      /* The same destination, at button length. The overview panel's second
         action uses this; the reference puts a FACTSHEET download there and
         there is no factsheet to link. Omit `short` and that button simply
         does not render. */
      short: "Compare Programmes",
      to: "/investment-migration#cbi",
    },

    /* The reference carries no equivalent. Kept, but cut to one line: the page
       publishes government figures that are revised periodically, and dropping
       the caveat entirely to save 50 words is not a trade worth making. The
       date is the part to keep current. */
    disclosure:
      "Figures are the government minimums, last checked on 4 September 2026, and exclude due-diligence and third-party costs.",

    /* Three tabs, as the reference has: the country, the programme, and the
       property route on its own. The programme tab is the default and holds
       the sections above. */
    tabs: [
      {
        id: "about",
        label: "About Antigua & Barbuda",
        heading: "About Antigua and Barbuda",
        body: [
          "Antigua and Barbuda is a twin-island state in the eastern Caribbean and an independent member of the Commonwealth, with English as its official language and a legal system founded on English common law. It has been independent since 1981 and retains a parliamentary system.",
          "The economy is led by tourism and yachting, with English Harbour and Nelson's Dockyard — a UNESCO World Heritage site — at its centre, alongside financial services and construction. The Eastern Caribbean dollar is pegged to the US dollar, which removes exchange-rate uncertainty from any investment denominated locally.",
          "For an applicant, the practical points are these: an English-speaking Commonwealth jurisdiction, no requirement to relocate, and a programme that has been running long enough to have settled procedure. Those are the reasons it appears on most shortlists alongside Dominica, Grenada, St Kitts and Nevis and Saint Lucia.",
        ],
      },
      {
        id: "real-estate",
        label: "Real Estate",
        heading: "The real estate route",
        body: [
          "The property route requires the purchase of real estate valued at a minimum of US$300,000 within a development that the government has approved for programme purposes. It is the only route that leaves you holding a recoverable asset rather than making a contribution.",
          "The property cannot be resold for five years from purchase. The one exception is a sale where the proceeds are reinvested into another officially approved Antigua and Barbuda property, which keeps the capital inside the programme.",
          "Approved developments are concentrated in resort and residential projects, and the range of what qualifies changes as projects are added and completed. Two things matter more than the headline price: whether the specific development is currently approved, and what the resale market for that project realistically looks like in five years. Neither is answerable from a brochure, and both are part of what we assess before recommending this route over a contribution.",
        ],
      },
    ],

    /* 7 — Contact */
    closing: {
      title: "Speak to us about Antigua and Barbuda",
      text: "Whether this programme suits your family is worth establishing before an application is prepared. A first conversation covers your objectives, who would be included, and which route fits.",
    },
    ctaImage: null,
  },
];

export const programmeBySlug = Object.fromEntries(programmePages.map((p) => [p.slug, p]));
