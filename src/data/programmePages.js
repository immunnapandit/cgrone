import AG from "country-flag-icons/react/3x2/AG";
import DM from "country-flag-icons/react/3x2/DM";
import GD from "country-flag-icons/react/3x2/GD";
import KN from "country-flag-icons/react/3x2/KN";
import LC from "country-flag-icons/react/3x2/LC";
import PT from "country-flag-icons/react/3x2/PT";
import AE from "country-flag-icons/react/3x2/AE";
import GR from "country-flag-icons/react/3x2/GR";
import MT from "country-flag-icons/react/3x2/MT";
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

/* The other four programmes, added 2026-09-07 on the same licence and the same
   checks as the two above: Unsplash, free for commercial use, no attribution
   required, and each one opened and looked at before it was committed rather
   than trusted from its search result. That last step is not a formality —
   Unsplash's results for these islands are loose, and two candidates that came
   back under "st kitts and nevis" were Puerto Rico and St Barthélemy. Anything
   whose location could not be confirmed from the photograph itself was
   dropped, because a Grenada page carrying a picture of somewhere else is a
   false claim in the one place on the page nobody proofreads.

   Prepared by scripts/convert-programme-images.mjs: heroes at 1600px, which
   covers 2x for the 705px half they fill at a 1440 viewport; features at
   1100px, already past 2x for the 380px they render at beside Benefits. */
import dominicaRoseau from "@/assets/images/programmes/dominica-roseau-harbour.webp";
import dominicaFalls from "@/assets/images/programmes/dominica-trafalgar-falls.webp";
import grenadaCarenage from "@/assets/images/programmes/grenada-carenage.webp";
import grenadaAerial from "@/assets/images/programmes/grenada-st-georges-aerial.webp";
import kittsPeninsula from "@/assets/images/programmes/st-kitts-southeast-peninsula.webp";
import kittsCoast from "@/assets/images/programmes/st-kitts-coastline.webp";
import luciaPitonBeach from "@/assets/images/programmes/st-lucia-piton-beach.webp";
import luciaSoufriere from "@/assets/images/programmes/st-lucia-soufriere.webp";

/* The four RBI programmes, added 2026-09-08. Same licence and the same checks
   as the Caribbean set above — Unsplash, free for commercial use, no
   attribution required — and the same rule enforced the same way: every frame
   was opened and identified from the photograph itself, not from its tags.

   That rule did real work here. A candidate tagged "Malta" was dropped because
   nothing in it was recognisably Maltese; a Valletta street shot was dropped
   after a zoom showed a restaurant fascia and menu boards, which is the
   third-party branding this project excludes. What survived carries a landmark
   you can name: São Vicente de Fora and the Panteão dome, the Ponte Maria Pia,
   the Burj Khalifa, the Sheikh Zayed Grand Mosque, the Parthenon, the Porch of
   the Caryatids, the Grand Harbour bastions, and Valletta's gallarija.

   Prepared by scripts/convert-programme-images.mjs' sibling,
   scripts/convert-rbi-images.mjs — heroes 1600px, features 1100px. */
import lisbonAlfama from "@/assets/images/programmes/portugal-lisbon-alfama.webp";
import portoDouro from "@/assets/images/programmes/portugal-porto-douro.webp";
import dubaiSkyline from "@/assets/images/programmes/uae-dubai-skyline.webp";
import abuDhabiMosque from "@/assets/images/programmes/uae-abu-dhabi-grand-mosque.webp";
import athensAcropolis from "@/assets/images/programmes/greece-athens-acropolis.webp";
import athensCaryatids from "@/assets/images/programmes/greece-athens-caryatids.webp";
import vallettaHarbour from "@/assets/images/programmes/malta-valletta-grand-harbour.webp";
import vallettaFacades from "@/assets/images/programmes/malta-valletta-facades.webp";

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
 *                              copy, two actions), pale right (key facts)
 *   2  Benefits                dash-ruled list, 4, in the left column, with a
 *                              photograph in the right one
 *   3  Investment routes       the four qualifying options
 *   4  Procedure               left column, empty right
 *   5  Why choose <firm>       half-width slate panel bleeding off the LEFT
 *                              edge: dash list, 5, + enquiry
 *   6  FAQ                     accordion, 9, left column + link to the region
 *   7  Contact                 paragraph + image + enquiry
 *
 * ---- WHERE THIS DEPARTS FROM THE REFERENCE, AND WHY -------------------------
 * Note what the reference does with its right-hand half: for most of the page,
 * nothing. Sections 4 and 6 leave it empty and 5 leaves it white beside a slate
 * panel. That is not an oversight to be tidied up — the measure it produces
 * (~70 characters) is the reason the pages read as documents rather than as
 * marketing, and filling those columns would undo the layout being copied. It
 * is preserved for every PROSE section here.
 *
 * Section 3 is the exception, and it is a deliberate one (design audit,
 * 2026-09-06). The reference presents its four qualifying routes as numbered
 * sentences, and this file copied that: four paragraphs with the government
 * minimum buried mid-sentence, no route named as a heading, and no way to hold
 * four figures side by side. That is the single decision a visitor comes to
 * this page to make, and prose is the wrong instrument for it. The routes are a
 * four-column comparison across the FULL container width now, because the
 * measure rule protects reading matter and a comparison is not reading matter.
 * Every original sentence survives verbatim inside the table's first column, so
 * nothing was traded away for the scannability.
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
 *
 * ---- THE OTHER FOUR CARIBBEAN PROGRAMMES (2026-09-07) -----------------------
 * Dominica, Grenada, St Kitts and Nevis and Saint Lucia were added on the same
 * shape as Antigua, so ProgrammeDetail.jsx renders all five without a change.
 * Three things to know before editing any of them:
 *
 *   ROUTE COUNT VARIES, and the layout already absorbs it. Dominica and Grenada
 *   have two qualifying routes, St Kitts three, Saint Lucia four. .routes-table
 *   is a fixed four-COLUMN grid over any number of ROWS, so a two-route table
 *   is short, not broken. Do not pad a country to four routes to match Antigua.
 *
 *   FIGURES CAME FROM henleyglobal.com's four programme pages, read on
 *   2026-09-07, which is the date every new `disclosure` carries. Only the
 *   FACTS were taken — amounts, route names, holding periods, who qualifies as
 *   a dependant. Every sentence is written for this firm, for the copyright
 *   reason in the section above, and it applies with more force to four pages
 *   than to one.
 *
 *   NO TOTALS ARE COMPUTED. Grenada's property route is US$270,000 plus a
 *   separate US$50,000 contribution and Saint Lucia's bond route is US$300,000
 *   plus a US$50,000 fee. Neither source states a combined figure, so neither
 *   file does: the property/bond figure is `amount` and the second payment is
 *   `amountNote`, which is the pattern Antigua's business route already uses.
 *   Adding the two into one headline number would be publishing a figure no
 *   government has published.
 *
 * The visa-free counts on the reference's four pages (140 / 150 destinations)
 * are absent here for the reason given above — they move, and this file has
 * never carried one.
 *
 * PHOTOGRAPHS were added on 2026-09-07 and all five programmes now carry a
 * hero and a feature. The licence bar and the verify-before-committing rule
 * are in the import comments at the top of the file; the sizing rule is in
 * scripts/convert-programme-images.mjs.
 *
 * `hero` and `feature` stay null-guarded in ProgrammeDetail.jsx, so a sixth
 * programme can still be written before its pictures are found. The header
 * degrades to its left-hand copy column with a white right half — the same
 * empty half Procedure, Why Choose and the FAQ have by design — and the tab
 * band drops its 20% inset, because that inset exists to reveal a photograph.
 * --------------------------------------------------------------------------- */

export const programmePages = [
  {
    slug: "antigua-barbuda",
    name: "Antigua & Barbuda",
    Flag: AG,
    kind: "cbi",
    kindLabel: "Citizenship by Investment",

    lede: "Caribbean citizenship through a qualifying investment, for families planning across more than one generation.",

    /* 0 — The header's one-line answer to "what does this cost and what are my
       options", set as a tracked label rather than a sentence.

       It exists because the header measured 220px of empty white beneath the
       lede at 1440 and offered no action and no figure: a visitor's first
       screen answered two of the seven questions the page is for. Each entry is
       a compression of something asserted further down — the fund minimum from
       `routes[0]`, the route count from `intro`, the relocation position from
       `benefits[2]` — so the header promises nothing the page does not then
       carry. Keep it to three: the row sits on one line at 1440 and wraps to
       two below ~1100, and a fourth would wrap at every width. */
    headline: ["From US$230,000", "Four qualifying routes", "No relocation required"],

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

    /* 1 — The pale half of the overview band.

       This was two icon rows — a line icon, a Garamond heading and one line of
       copy — and it had the hierarchy exactly inverted: "Minimum investment"
       was set at 26px and "US$230,000" at 15px, so the most important number on
       the page was the smallest text in its own block. The figure leads now and
       the label is a tracked 11px caption above it.

       THREE, and the count is load-bearing rather than arbitrary. Two left the
       panel two-thirds empty. A fourth — "Residence: Not required" — was
       written, measured and removed: at four rows the pale half runs 867px
       against roughly 300px of heading, paragraph and buttons in the slate half
       beside it, and two-thirds of a bleeding colour field with nothing in it
       reads as a fault rather than as space. The fact itself is not lost. It is
       in `headline` above the fold, it is the "No relocation" benefit, and it
       has its own FAQ row. A glance is three things; the fourth was a list.

       The icons went with the restructure. Some of these facts have an obvious
       glyph and some do not, and a row where half the marks are reaches is
       worse than none — see the note on icon scale in index.css. The figures
       are the marks here. */
    keyFacts: [
      {
        label: "Minimum investment",
        value: "US$230,000",
        note: "National Development Fund contribution — the lowest of the four routes",
      },
      {
        label: "Qualifying routes",
        value: "Four",
        /* One line. It named all four routes in full, which is three lines in a
           393px panel and duplicates the table immediately below it. */
        note: "A fund contribution, the university fund, property or business",
      },
      {
        label: "Who may be included",
        value: "Spouse and dependants",
        note: "Dependent children and other qualifying dependants, under a single application",
      },
    ],

    /* 2 — Benefits. Four, as a dash list.
       The sentences are unchanged. Each carries a two-or-three-word label now,
       because four dash rows of one sentence each gave a reader scanning the
       column nothing to catch on: you had to read all four to learn what the
       four were about. The label is the sentence's own subject, not a claim
       added on top of it. */
    benefits: [
      {
        label: "One family application",
        text: "Citizenship for the main applicant and qualifying family members under a single application, rather than a separate process for each person.",
      },
      {
        label: "Commonwealth citizenship",
        text: "Citizenship of a Commonwealth country, with the travel access an Antigua and Barbuda passport carries.",
      },
      {
        label: "No relocation",
        text: "No requirement to relocate, though a short minimum presence condition applies within the first years of holding citizenship.",
      },
      {
        label: "The next generation",
        text: "Citizenship that may generally be passed to children born afterwards, subject to the programme's rules at the time.",
      },
    ],

    /* 3 — The four qualifying routes, in the reference's order: fund, UWI, real
       estate, business.

       `detail` is the sentence this section used to be — verbatim, not
       paraphrased, so the restructure costs no information. Everything around
       it is a field lifted OUT of that sentence rather than written for it:

         amount     the figure the sentence already states
         bestFor    NDF   — keyFacts calls it "the lowest of the four routes"
                    UWI   — "open to applications of six family members or more"
                    prop  — the real-estate tab: "the only route that leaves you
                            holding a recoverable asset rather than making a
                            contribution"
                    biz   — the sentence's own subject
         condition  the binding term in the sentence, at label length

       `condition` is deliberately short. The business route's full alternative
       — two or more applicants, US$5,000,000 total, US$400,000 each — is a
       clause, not a label, so the column carries the headline of it and the
       whole thing stays in `detail` beside it.

       NOTHING HERE IS A NEW CLAIM. If a figure or a term is not in `detail`, it
       does not belong in the other four fields. The government minimums are
       revised periodically — the Caribbean programmes last moved in 2024 — so
       `disclosure` carries the date they were last checked, and that date is
       the thing to keep current. */
    routesIntro:
      "To qualify, the main applicant must be over 18, meet the application requirements, and select one of the four options below. Which one suits you depends on family size and how long you want capital committed.",

    routes: [
      {
        name: "National Development Fund",
        amount: "US$230,000",
        bestFor: "The lowest entry point",
        condition: "Non-refundable contribution",
        detail:
          "A non-refundable contribution to the National Development Fund of a minimum of US$230,000, plus government processing fees that scale with family size.",
      },
      {
        name: "University of the West Indies Fund",
        amount: "US$260,000",
        bestFor: "Families of six or more",
        condition: "Six or more family members",
        detail:
          "A contribution to the University of the West Indies Fund of US$260,000, open to applications of six family members or more.",
      },
      {
        name: "Real Estate",
        amount: "US$300,000",
        bestFor: "Holding a recoverable asset",
        condition: "Five-year holding period",
        detail:
          "The purchase of real estate with a minimum value of US$300,000 in a development approved for programme purposes. The property cannot be resold for five years, unless the proceeds are reinvested in another approved Antigua and Barbuda property.",
      },
      {
        name: "Business",
        amount: "US$1,500,000",
        amountNote: "as an individual",
        bestFor: "Direct business ownership",
        condition: "Joint investment permitted from US$5,000,000",
        detail:
          "The purchase of an approved business for a minimum of US$1,500,000 as an individual. Alternatively, two or more applicants may invest jointly in a single approved business totalling at least US$5,000,000, each contributing no less than US$400,000.",
      },
    ],

    /* 3b — What the published figures do and do not include.

       The page states four government minimums and then, in three separate
       places, that they are not the whole cost: `routes[0]` mentions government
       processing fees, the cost FAQ says government, due-diligence and legal
       fees are additional, and `disclosure` excludes due-diligence and
       third-party costs. A reader had to assemble that from three fragments.
       This is the same information in one place, beneath the figures it
       qualifies.

       NO AMOUNTS. None are published for any of the three additional
       categories, and the source document is explicit that the detailed costing
       follows the profile assessment. What is stated is the STRUCTURE — which
       is what a reader needs to know that the headline figure is a floor. */
    costs: [
      {
        label: "Investment",
        text: "The qualifying route you select, from US$230,000.",
      },
      {
        label: "Government processing fees",
        text: "Additional to the investment, and scale with family size.",
      },
      {
        label: "Due diligence",
        text: "Additional. Background checks are carried out by the Citizenship by Investment Unit on the main applicant and every adult dependant.",
      },
      {
        label: "Legal and agent fees",
        text: "Additional. The application is filed by an agent licensed in Antigua and Barbuda.",
      },
    ],

    /* 4 — Procedure. Three stages, the wording unchanged from when they were
       three untitled paragraphs. The stages were always there — this file's own
       note described them as "filing, due diligence, completion" — but a reader
       could not see them without reading all three paragraphs. The titles name
       what each paragraph already says. */
    procedure: [
      {
        title: "Assessment and filing",
        text: "An application begins with an assessment of your objectives, family composition and profile, and a decision on which qualifying route fits. Documentation is then prepared and filed by an agent licensed in Antigua and Barbuda — applications cannot be submitted directly.",
      },
      {
        title: "Due diligence",
        text: "The Citizenship by Investment Unit conducts background checks on the main applicant and every adult dependant. This stage determines the outcome, and no adviser can shorten it.",
      },
      {
        title: "Approval and completion",
        text: "On approval, the qualifying investment is completed and the citizenship and passport formalities follow. A short minimum presence condition applies once citizenship is held.",
      },
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
       date is the part to keep current.

       It sat at the foot of the FAQ, four sections below the only figures it
       qualifies. It closes the routes section now — a caveat a reader meets
       after the numbers have left the screen is a caveat that has already
       failed. */
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

  /* ===========================================================================
     DOMINICA
     Two routes, and the lowest minimum of the five at US$200,000. Its one
     genuinely distinguishing feature is the dependant definition: parents AND
     grandparents from 65, which is the only programme here that reaches three
     generations upward. That is what `headline`, `benefits[1]` and the first
     FAQ all lead on, because a family in that position has no comparable
     alternative among the other four.

     The fund is the Economic Diversification Fund. The reference calls it the
     "Economic Development Fund" in its route text and the "Economic
     Diversification Fund" in its own FAQ; the government's unit publishes it as
     Diversification, so that is what is used here.
     ======================================================================== */
  {
    slug: "dominica",
    name: "Dominica",
    Flag: DM,
    kind: "cbi",
    kindLabel: "Citizenship by Investment",

    lede: "Caribbean citizenship at the lowest qualifying threshold of the five programmes, and the one that reaches furthest across a family.",

    headline: ["From US$200,000", "Two qualifying routes", "No minimum stay"],

    hero: {
      src: dominicaRoseau,
      alt: "Roseau, Dominica — the capital's coloured rooftops between green hills and the sea, with a cruise ship at the pier",
    },

    intro: [
      "Dominica offers citizenship through two qualifying investment routes, administered by the country's Citizenship by Investment Unit. Applications are filed by a licensed agent in-country; we assess your profile and coordinate the matter throughout.",
    ],

    keyFacts: [
      {
        label: "Minimum investment",
        value: "US$200,000",
        note: "Economic Diversification Fund contribution for a single applicant — the lower of the two routes",
      },
      {
        label: "Qualifying routes",
        value: "Two",
        note: "A fund contribution or approved real estate",
      },
      {
        /* The value stays short because the panel is 393px at lg; the reach
           across three generations is the note's job. */
        label: "Who may be included",
        value: "Spouse and dependants",
        note: "Dependent children under 31, and parents and grandparents aged 65 and over",
      },
    ],

    benefits: [
      {
        label: "One family application",
        text: "Citizenship for the main applicant and qualifying family members under a single application, rather than a separate process for each person.",
      },
      {
        label: "Three generations",
        text: "Parents and grandparents aged 65 and over may be included alongside a spouse and dependent children, which is the widest family reach of the Caribbean programmes on this site.",
      },
      {
        label: "No minimum stay",
        text: "No requirement to relocate and no minimum stay condition, either before the application or after citizenship is granted.",
      },
      {
        label: "The next generation",
        text: "Citizenship that may generally be passed by descent to children born afterwards, subject to the programme's rules at the time.",
      },
    ],

    routesIntro:
      "To qualify, the main applicant must be over 18, meet the application requirements, and select one of the two options below. The choice is largely whether you want the capital back: a contribution does not come back, a property may.",

    routes: [
      {
        name: "Economic Diversification Fund",
        amount: "US$200,000",
        amountNote: "single applicant",
        bestFor: "The lowest entry point",
        condition: "Non-refundable contribution",
        detail:
          "A non-refundable contribution to the Economic Diversification Fund of US$200,000 for a single applicant, or US$250,000 for a main applicant and up to three qualifying dependants. Each additional qualifying dependant is US$25,000 under the age of 18 and US$40,000 over it.",
      },
      {
        name: "Real Estate",
        amount: "US$200,000",
        bestFor: "Holding a recoverable asset",
        condition: "Three-year holding period",
        detail:
          "The purchase of real estate with a minimum value of US$200,000 in a development approved for programme purposes. The property may be sold on the open market after three years, or after five years to a buyer using it as their own qualifying investment.",
      },
    ],

    costs: [
      {
        label: "Investment",
        text: "The qualifying route you select, from US$200,000.",
      },
      {
        label: "Government processing fees",
        text: "Additional to the investment, and scale with family size.",
      },
      {
        label: "Due diligence",
        text: "Additional. Background checks are carried out by the Citizenship by Investment Unit on the main applicant and every dependant aged 16 and over.",
      },
      {
        label: "Legal and agent fees",
        text: "Additional. The application is filed by an agent licensed in Dominica.",
      },
    ],

    procedure: [
      {
        title: "Assessment and filing",
        text: "An application begins with an assessment of your objectives, family composition and profile, and a decision on which qualifying route fits. Documentation is then prepared and filed by an agent licensed in Dominica — applications cannot be submitted directly.",
      },
      {
        title: "Due diligence and interview",
        text: "The Citizenship by Investment Unit conducts background checks on the main applicant and every dependant aged 16 and over. An interview is mandatory at this stage and is normally held virtually. This stage determines the outcome, and no adviser can shorten it.",
      },
      {
        title: "Approval and completion",
        text: "On approval, the qualifying investment is completed and an oath of allegiance is taken before an authorised notary, justice of the peace or commissioner of oaths. The citizenship and passport formalities follow.",
      },
    ],

    /* Trafalgar Falls rather than a beach: Dominica's own tab copy calls it
       the least developed of the five commercially and the most intact
       environmentally, and the picture beside Benefits should agree with the
       prose two sections above it. */
    feature: {
      src: dominicaFalls,
      alt: "Twin waterfalls dropping through dense rainforest in Dominica's mountainous interior",
    },

    whyChoose: [
      "Two decades of advisory experience across immigration, global mobility and investment migration.",
      "Strategy before paperwork — we establish whether this route fits before an application is prepared.",
      "A coordinated network of qualified lawyers and regulated professionals across jurisdictions.",
      "Regulated advice stays with the qualified professional in-country.",
      "One point of contact from assessment to completion.",
    ],

    faqs: [
      {
        q: "Who can be included in one application?",
        a: "The main applicant, a spouse, dependent children under 31, and parents and grandparents aged 65 and over. Which relatives qualify is confirmed at assessment.",
      },
      {
        q: "What are the qualifying investment routes?",
        a: "A contribution to the Economic Diversification Fund, or the purchase of real estate in an approved development.",
      },
      {
        q: "What does the programme cost?",
        a: "The minimum for each route is set out above, from US$200,000. Government, due-diligence and legal fees are additional and depend on family size.",
      },
      {
        q: "Do I need to live in Dominica?",
        a: "No. There is no minimum stay requirement, before the application or after citizenship is granted.",
      },
      {
        q: "Is the investment refundable?",
        a: "A fund contribution is not. Property may be recoverable on resale after the minimum holding period, subject to the market.",
      },
      {
        q: "What does due diligence involve?",
        a: "Background checks on the main applicant and every dependant aged 16 and over, carried out by the Citizenship by Investment Unit, together with a mandatory interview.",
      },
      {
        q: "Can dependants be added after citizenship is granted?",
        a: "The programme allows qualifying dependants to be added afterwards. The requirements and the cost of doing so are confirmed at assessment.",
      },
      {
        q: "Can I keep my existing citizenship?",
        a: "Dominica places no restriction on dual citizenship. Whether your own country permits it is a question for its law.",
      },
      {
        q: "What does Cynosure do, and what does the licensed agent do?",
        a: "We assess your profile, recommend the route and coordinate the matter. The application is filed by an agent licensed in Dominica.",
      },
    ],

    related: {
      label: "Compare the Caribbean citizenship programmes",
      short: "Compare Programmes",
      to: "/investment-migration#cbi",
    },

    disclosure:
      "Figures are the government minimums, last checked on 7 September 2026, and exclude due-diligence and third-party costs.",

    tabs: [
      {
        id: "about",
        label: "About Dominica",
        heading: "About Dominica",
        body: [
          "The Commonwealth of Dominica is a mountainous island in the eastern Caribbean, between Guadeloupe and Martinique, and should not be confused with the Dominican Republic. It has been independent since 1978 and is a parliamentary republic within the Commonwealth, with English as its official language and a legal system founded on English common law.",
          "It is the least developed of the five islands commercially and the most intact environmentally — the Morne Trois Pitons National Park is a UNESCO World Heritage site, and the economy runs on agriculture, eco-tourism and a long-running geothermal energy programme rather than on resort tourism. The Eastern Caribbean dollar is pegged to the US dollar, which removes exchange-rate uncertainty from any investment denominated locally.",
          "For an applicant, the practical points are these: the lowest qualifying threshold of the five programmes, no minimum stay at any stage, and a dependant definition that reaches parents and grandparents from 65. The last of those is the reason it appears on a shortlist where the other four do not.",
        ],
      },
      {
        id: "real-estate",
        label: "Real Estate",
        heading: "The real estate route",
        body: [
          "The property route requires the purchase of real estate valued at a minimum of US$200,000 within a development the government has approved for programme purposes. It is the only one of Dominica's two routes that leaves you holding a recoverable asset rather than making a contribution, and it sits at the same threshold as the fund rather than above it.",
          "Two holding periods apply rather than one, and the difference matters. The property may be sold on the open market after three years. Selling it after five years to a buyer who is themselves using it as a qualifying investment is the other exit, and it is the one with a defined pool of buyers.",
          "Approved developments in Dominica are concentrated in a small number of resort and villa projects, and the range of what qualifies changes as projects are added and completed. Two things matter more than the headline price: whether the specific development is currently approved, and what the resale market for that project realistically looks like in three to five years. Neither is answerable from a brochure, and both are part of what we assess before recommending this route over a contribution.",
        ],
      },
    ],

    closing: {
      title: "Speak to us about Dominica",
      text: "Whether this programme suits your family is worth establishing before an application is prepared. A first conversation covers your objectives, who would be included, and which route fits.",
    },
    ctaImage: null,
  },

  /* ===========================================================================
     GRENADA
     Two routes, and the one fact on this page a visitor cannot get from any of
     the other four: Grenada holds an E-2 investor treaty with the United
     States. That is why it is in `headline` rather than the route count.

     THE E-2 CLAIM IS CAREFULLY BOUNDED, in four places, and it must stay that
     way. The treaty makes a Grenadian citizen ELIGIBLE TO APPLY for a
     non-immigrant E-2 visa after three continuous years of domicile in Grenada.
     It is not a visa, not a grant, not automatic, and the E-2 itself has its
     own separate requirement — a substantial investment in a US business — that
     has nothing to do with this programme. `benefits[1]` and the E-2 FAQ both
     say so. Do not shorten either into "citizenship gives you a US visa".

     No combined property figure: see the note at the head of this file.
     ======================================================================== */
  {
    slug: "grenada",
    name: "Grenada",
    Flag: GD,
    kind: "cbi",
    kindLabel: "Citizenship by Investment",

    lede: "Caribbean citizenship with an investor treaty route to the United States that no other programme in the region carries.",

    headline: ["From US$235,000", "US E-2 treaty country", "No minimum stay"],

    hero: {
      src: grenadaCarenage,
      alt: "The Carenage, St George's, Grenada — yachts moored along the horseshoe harbour below red-tiled warehouses",
    },

    intro: [
      "Grenada offers citizenship through two qualifying investment routes under its Citizenship by Investment Act, 2013. Applications are filed by a licensed agent in-country; we assess your profile and coordinate the matter throughout.",
    ],

    keyFacts: [
      {
        label: "Minimum investment",
        value: "US$235,000",
        note: "National Transformation Fund contribution, covering a single applicant or a family of up to four",
      },
      {
        label: "Qualifying routes",
        value: "Two",
        note: "A fund contribution or approved real estate",
      },
      {
        label: "Who may be included",
        value: "Spouse and dependants",
        note: "Dependent children under 30, unmarried siblings aged 18 and over, parents and grandparents",
      },
    ],

    benefits: [
      {
        label: "One family application",
        text: "Citizenship for the main applicant and qualifying family members under a single application, and the fund minimum covers a family of up to four rather than the applicant alone.",
      },
      {
        /* Bounded deliberately — see the block comment above this entry. */
        label: "The US E-2 treaty",
        text: "Grenada is the only Caribbean citizenship programme with an E-2 investor treaty with the United States. It makes a citizen eligible to apply for the non-immigrant E-2 visa after three continuous years of domicile in Grenada; the visa has its own separate requirements and is not granted by the citizenship.",
      },
      {
        label: "No minimum stay",
        text: "No requirement to relocate and no minimum stay condition attached to the citizenship itself.",
      },
      {
        label: "The next generation",
        text: "Citizenship that may generally be passed to a subsequent spouse and to future generations, subject to the programme's rules at the time.",
      },
    ],

    routesIntro:
      "To qualify, the main applicant must be over 18, meet the application requirements, and select one of the two options below. Both minimums cover a family of up to four, so family size moves the figure less here than it does elsewhere in the region.",

    routes: [
      {
        name: "National Transformation Fund",
        amount: "US$235,000",
        amountNote: "family of up to four",
        bestFor: "The lowest entry point",
        condition: "Non-refundable contribution",
        detail:
          "A non-refundable contribution to the National Transformation Fund of US$235,000, covering a single applicant or a family of up to four members. What is payable for dependants beyond four is confirmed at assessment.",
      },
      {
        /* amount + amountNote, NOT a US$320,000 total. The two payments are
           separate and no government publishes them added together. */
        name: "Real Estate",
        amount: "US$270,000",
        amountNote: "plus a US$50,000 contribution",
        bestFor: "Holding a recoverable asset",
        condition: "Five-year hold to resell as a qualifying investment",
        detail:
          "A purchase of at least US$270,000 from a government-approved real estate project, together with an additional non-refundable contribution of US$50,000, covering a single applicant or a family of up to four members. The property must be held for five years to be resold as a qualifying investment to another applicant; otherwise it may be sold at any point after purchase.",
      },
    ],

    costs: [
      {
        label: "Investment",
        text: "The qualifying route you select, from US$235,000. The property route carries a second, separate contribution of US$50,000.",
      },
      {
        label: "Government processing fees",
        text: "Additional to the investment, and scale with family size.",
      },
      {
        label: "Due diligence",
        text: "Additional. Background checks are carried out on the main applicant and every adult dependant.",
      },
      {
        label: "Legal and agent fees",
        text: "Additional. The application is filed by an agent licensed in Grenada.",
      },
    ],

    procedure: [
      {
        title: "Assessment and filing",
        text: "An application begins with an assessment of your objectives, family composition and profile, and a decision on which qualifying route fits. Documentation is then prepared and filed by an agent licensed in Grenada — applications cannot be submitted directly.",
      },
      {
        title: "Due diligence",
        text: "Grenada's citizenship authority conducts background checks on the main applicant and every adult dependant. This stage determines the outcome, and no adviser can shorten it.",
      },
      {
        title: "Approval and completion",
        text: "On approval, the qualifying investment is completed and the citizenship and passport formalities follow. Passports do not have to be collected in person — the collection is coordinated and the documents are sent on.",
      },
    ],

    feature: {
      src: grenadaAerial,
      alt: "St George's, Grenada from the air — the town, its inner harbour and the fortified headland beyond",
    },

    whyChoose: [
      "Two decades of advisory experience across immigration, global mobility and investment migration.",
      "Strategy before paperwork — we establish whether this route fits before an application is prepared.",
      "A coordinated network of qualified lawyers and regulated professionals across jurisdictions.",
      "Regulated advice stays with the qualified professional in-country.",
      "One point of contact from assessment to completion.",
    ],

    faqs: [
      {
        q: "Who can be included in one application?",
        a: "The main applicant, a spouse, dependent children under 30, unmarried siblings aged 18 and over, parents and grandparents. Which relatives qualify is confirmed at assessment.",
      },
      {
        q: "What are the qualifying investment routes?",
        a: "A National Transformation Fund contribution, or a government-approved real estate purchase paired with a separate contribution.",
      },
      {
        q: "Does Grenadian citizenship give me a US visa?",
        /* The whole point of this row is to say no. It is the question the
           E-2 benefit will prompt, and it belongs high in the list. */
        a: "No. The E-2 treaty makes a Grenadian citizen eligible to apply for a non-immigrant investor visa after three continuous years of domicile in Grenada. The application is made to the United States, on its own requirements, including an investment in a US business.",
      },
      {
        q: "What does the programme cost?",
        a: "The minimum for each route is set out above, from US$235,000. Government, due-diligence and legal fees are additional and depend on family size.",
      },
      {
        q: "Do I need to live in Grenada?",
        a: "Not for the citizenship, which carries no minimum stay. Three continuous years of domicile is a condition of the E-2 route specifically, and only of that.",
      },
      {
        q: "Is the investment refundable?",
        a: "A fund contribution is not, and neither is the US$50,000 that accompanies the property route. The property itself may be recoverable on resale, subject to the market.",
      },
      {
        q: "What does due diligence involve?",
        a: "Background checks on the main applicant and every adult dependant, carried out by Grenada's citizenship authority.",
      },
      {
        q: "Can I keep my existing citizenship?",
        a: "Grenada places no restriction on dual citizenship. Whether your own country permits it is a question for its law.",
      },
      {
        q: "What does Cynosure do, and what does the licensed agent do?",
        a: "We assess your profile, recommend the route and coordinate the matter. The application is filed by an agent licensed in Grenada.",
      },
    ],

    related: {
      label: "Compare the Caribbean citizenship programmes",
      short: "Compare Programmes",
      to: "/investment-migration#cbi",
    },

    disclosure:
      "Figures are the government minimums, last checked on 7 September 2026, and exclude due-diligence and third-party costs.",

    tabs: [
      {
        id: "about",
        label: "About Grenada",
        heading: "About Grenada",
        body: [
          "Grenada is a three-island state in the southeastern Caribbean — Grenada itself, Carriacou and Petite Martinique — and an independent member of the Commonwealth, with English as its official language and a legal system founded on English common law. It has been independent since 1974 and retains a parliamentary system.",
          "It is known as the Spice Isle and remains one of the world's larger producers of nutmeg and mace, alongside tourism, offshore education at St George's University, and construction. The Eastern Caribbean dollar is pegged to the US dollar, which removes exchange-rate uncertainty from any investment denominated locally.",
          "For an applicant, the practical points are these: an English-speaking Commonwealth jurisdiction, no minimum stay, a fund minimum that already covers a family of four, and the E-2 treaty with the United States that no other Caribbean programme holds. That last point is the reason Grenada is usually on the shortlist of anyone whose plan involves operating a business in the US.",
        ],
      },
      {
        id: "real-estate",
        label: "Real Estate",
        heading: "The real estate route",
        body: [
          "Grenada's property route is two payments rather than one. It requires a purchase of at least US$270,000 from a government-approved real estate project, and separately a non-refundable contribution of US$50,000. Both are required; the property is the recoverable half and the contribution is not.",
          "The holding period depends on how you intend to exit. The property may be sold at any point after purchase on the open market. If you want to sell it to another applicant as their qualifying investment — a defined pool of buyers, and usually the more reliable one for a project of this kind — it must have been held for five years.",
          "Approved projects are concentrated in resort and branded-residence developments, and the range of what qualifies changes as projects are added and completed. Two things matter more than the headline price: whether the specific development is currently approved, and what the resale market for that project realistically looks like in five years. Neither is answerable from a brochure, and both are part of what we assess before recommending this route over a contribution.",
        ],
      },
    ],

    closing: {
      title: "Speak to us about Grenada",
      text: "Whether this programme suits your family is worth establishing before an application is prepared. A first conversation covers your objectives, who would be included, whether the E-2 route is realistic for you, and which investment fits.",
    },
    ctaImage: null,
  },

  /* ===========================================================================
     ST KITTS AND NEVIS
     Three routes, and the oldest programme of its kind anywhere — running since
     1984. That is the `headline`'s third slot and `benefits[0]`, because it is
     the only claim on the page that none of the other four can make and it is
     checkable rather than promotional.

     The property route has TWO thresholds, US$325,000 and US$600,000, split by
     what you buy rather than by family size. `amount` carries the lower one and
     `amountNote` the higher, so the comparison row still holds a single figure.
     ======================================================================== */
  {
    slug: "st-kitts-nevis",
    name: "St. Kitts & Nevis",
    Flag: KN,
    kind: "cbi",
    kindLabel: "Citizenship by Investment",

    lede: "The oldest citizenship-by-investment programme in the world, and the one with the longest settled procedure behind it.",

    headline: ["From US$250,000", "Three qualifying routes", "Established in 1984"],

    /* The one photograph on any of these five pages that shows the whole
       country: the southeast peninsula of St Kitts in the foreground and Nevis
       across The Narrows behind it. A two-island federation is the first thing
       the About tab explains, and this says it before the tab is opened. */
    hero: {
      src: kittsPeninsula,
      alt: "The southeast peninsula of St Kitts, the Atlantic on one side and the Caribbean on the other, with Nevis rising across The Narrows",
    },

    intro: [
      "St Kitts and Nevis offers citizenship through three qualifying investment routes, administered by the federation's Citizenship by Investment Unit under legislation dating to 1984. Applications are filed by a licensed agent in-country; we assess your profile and coordinate the matter throughout.",
    ],

    keyFacts: [
      {
        label: "Minimum investment",
        value: "US$250,000",
        note: "Sustainable Island State Contribution, covering the main applicant and up to three dependants",
      },
      {
        label: "Qualifying routes",
        value: "Three",
        note: "A contribution, an approved public benefit project or property",
      },
      {
        label: "Who may be included",
        value: "Spouse and dependants",
        note: "Dependent children under 30 and parents aged 55 and over; dependants may be added after approval",
      },
    ],

    benefits: [
      {
        label: "The longest record",
        text: "The programme has been running since 1984, which is longer than any other of its kind, and the reason its procedure and its documentation requirements are settled rather than moving.",
      },
      {
        label: "One family application",
        text: "Citizenship for the main applicant and up to three dependants under a single application, with further dependants added at a stated figure rather than a separate process.",
      },
      {
        label: "No minimum stay",
        text: "No requirement to relocate and no minimum stay condition attached to holding the citizenship.",
      },
      {
        label: "The next generation",
        text: "Citizenship held for life and passed by descent to future generations, subject to the programme's rules at the time.",
      },
    ],

    routesIntro:
      "To qualify, the main applicant must be over 18, meet the application requirements, and select one of the three options below. Which one suits you depends on family size and whether you want capital committed to an asset or given as a contribution.",

    routes: [
      {
        name: "Sustainable Island State Contribution",
        amount: "US$250,000",
        amountNote: "up to four people",
        bestFor: "The lowest entry point",
        condition: "Non-refundable contribution",
        detail:
          "A non-refundable contribution to the Sustainable Island State Contribution of US$250,000 for the main applicant and up to three dependants. Each additional dependant is US$25,000 under the age of 18 and US$50,000 over it.",
      },
      {
        name: "Public Benefit Project",
        amount: "US$250,000",
        bestFor: "Directing the contribution to a named project",
        condition: "Non-refundable contribution",
        detail:
          "A non-refundable contribution of at least US$250,000 to an approved public benefit unit. Which projects hold that approval changes over time, and the current list is confirmed at assessment.",
      },
      {
        /* Two thresholds, split by property type rather than family size. */
        name: "Real Estate",
        amount: "US$325,000",
        amountNote: "US$600,000 for a private dwelling",
        bestFor: "Holding a recoverable asset",
        condition: "Seven-year holding period",
        detail:
          "The purchase of a unit in an approved development or a condominium at a minimum of US$325,000, or of a single-family private dwelling at a minimum of US$600,000. Resale is permitted after seven years, subject to conditions — the longest holding period of the five programmes.",
      },
    ],

    costs: [
      {
        label: "Investment",
        text: "The qualifying route you select, from US$250,000.",
      },
      {
        label: "Government processing fees",
        text: "Additional to the investment, and scale with family size.",
      },
      {
        label: "Due diligence",
        text: "Additional. Background checks are carried out by independent professional firms instructed by the Citizenship by Investment Unit.",
      },
      {
        label: "Legal and agent fees",
        text: "Additional. Application forms are available only through authorised service providers, and the application is filed by an agent licensed in St Kitts and Nevis.",
      },
    ],

    procedure: [
      {
        title: "Assessment and filing",
        text: "An application begins with an assessment of your objectives, family composition and profile, and a decision on which qualifying route fits. The prescribed government forms are available only through authorised providers, and the application is filed by an agent licensed in St Kitts and Nevis.",
      },
      {
        title: "Due diligence and interview",
        text: "The Citizenship by Investment Unit examines the application and instructs independent professional firms to conduct background checks. An interview is mandatory for every investor, held virtually by default, and dependants aged 16 and over may be interviewed where the Unit considers it necessary. An application containing a false statement or an omission is declined.",
      },
      {
        title: "Approval and completion",
        text: "On approval the qualifying investment is completed and a Certificate of Registration is issued. The certificate is collected in person, either in St Kitts and Nevis or at a designated embassy or consulate, and the passport application follows registration.",
      },
    ],

    /* The only portrait feature of the four, and it is the right shape here
       rather than an oversight: at 380px wide it stands 570px tall against
       four labelled benefits that run to roughly the same, so this column is
       the most balanced of the five pages. */
    feature: {
      src: kittsCoast,
      alt: "The Atlantic coast of the St Kitts southeast peninsula — a long beach below green hills and the coast road",
    },

    whyChoose: [
      "Two decades of advisory experience across immigration, global mobility and investment migration.",
      "Strategy before paperwork — we establish whether this route fits before an application is prepared.",
      "A coordinated network of qualified lawyers and regulated professionals across jurisdictions.",
      "Regulated advice stays with the qualified professional in-country.",
      "One point of contact from assessment to completion.",
    ],

    faqs: [
      {
        q: "Who can be included in one application?",
        a: "The main applicant, a spouse, dependent children under 30 and parents aged 55 and over. Which relatives qualify is confirmed at assessment.",
      },
      {
        q: "What are the qualifying investment routes?",
        a: "The Sustainable Island State Contribution, a contribution to an approved public benefit project, or the purchase of approved real estate.",
      },
      {
        q: "What does the programme cost?",
        a: "The minimum for each route is set out above, from US$250,000. Government, due-diligence and legal fees are additional and depend on family size.",
      },
      {
        q: "Do I need to live in St Kitts and Nevis?",
        a: "No. There is no minimum stay condition. The Certificate of Registration is collected in person, either in the federation or at a designated embassy or consulate.",
      },
      {
        q: "Is there an interview?",
        a: "Yes. An interview is mandatory for every investor and is held virtually by default. Dependants aged 16 and over may be interviewed where the Unit considers it necessary.",
      },
      {
        q: "Is the investment refundable?",
        a: "Neither contribution route is. Property may be recoverable on resale after the seven-year holding period, subject to the market and to conditions.",
      },
      {
        q: "Can dependants be added after approval?",
        a: "Yes. Dependants may be added once the main application has been approved, at the figures set out in the routes above.",
      },
      {
        q: "Can I keep my existing citizenship?",
        a: "St Kitts and Nevis permits dual citizenship. Whether your own country permits it is a question for its law.",
      },
      {
        q: "What does Cynosure do, and what does the licensed agent do?",
        a: "We assess your profile, recommend the route and coordinate the matter. The application is filed by an agent licensed in St Kitts and Nevis.",
      },
    ],

    related: {
      label: "Compare the Caribbean citizenship programmes",
      short: "Compare Programmes",
      to: "/investment-migration#cbi",
    },

    disclosure:
      "Figures are the government minimums, last checked on 7 September 2026, and exclude due-diligence and third-party costs.",

    tabs: [
      {
        id: "about",
        label: "About St. Kitts & Nevis",
        heading: "About St Kitts and Nevis",
        body: [
          "The Federation of Saint Christopher and Nevis is a two-island state in the eastern Caribbean and an independent member of the Commonwealth, with English as its official language and a legal system founded on English common law. It has been independent since 1983, is the smallest sovereign state in the Americas by both area and population, and Nevis holds its own island administration within the federation.",
          "The economy moved from sugar to tourism and financial services after the sugar industry closed in 2005, and the islands have good air links to Europe and North America. Brimstone Hill Fortress National Park is a UNESCO World Heritage site. The Eastern Caribbean dollar is pegged to the US dollar, which removes exchange-rate uncertainty from any investment denominated locally.",
          "For an applicant, the practical points are these: the longest-running programme of its kind, a settled procedure with a mandatory interview built into it, three routes rather than two, and no minimum stay. The trade is at the other end — the property route's seven-year holding period is the longest of the five programmes.",
        ],
      },
      {
        id: "real-estate",
        label: "Real Estate",
        heading: "The real estate route",
        body: [
          "The property route has two thresholds, and which one applies depends on what you buy rather than on how large your family is. A unit in an approved development or a condominium qualifies from US$325,000. A single-family private dwelling qualifies from US$600,000.",
          "Resale is permitted after seven years, subject to conditions. That is the longest holding period of the five Caribbean programmes on this site, and it is the single most important number on this tab: capital committed here is committed for the better part of a decade, which is a different proposition from Dominica's three years or the five that Antigua, Grenada and Saint Lucia apply.",
          "Development timelines vary from project to project, and a project that completes late can push the citizenship timeline with it. Three things matter more than the headline price: whether the specific development currently holds approval, whether its construction schedule fits the timeline you need, and what the resale market for it realistically looks like in seven years. None of the three is answerable from a brochure, and all three are part of what we assess before recommending this route over a contribution.",
        ],
      },
    ],

    closing: {
      title: "Speak to us about St Kitts and Nevis",
      text: "Whether this programme suits your family is worth establishing before an application is prepared. A first conversation covers your objectives, who would be included, and which of the three routes fits.",
    },
    ctaImage: null,
  },

  /* ===========================================================================
     SAINT LUCIA
     Four routes, the same count as Antigua but a different set — it is the only
     one of the five with a government bond option, and the only one whose
     property route lifts the cap on how many dependants a single application
     can carry. Both of those are in `routes`, and the dependant point is
     `bestFor` on the property row rather than a separate claim.

     No combined bond figure: US$300,000 and the US$50,000 administrative fee
     are separate payments and stay separate. See the note at the head of this
     file.
     ======================================================================== */
  {
    slug: "st-lucia",
    name: "Saint Lucia",
    Flag: LC,
    kind: "cbi",
    kindLabel: "Citizenship by Investment",

    lede: "Four qualifying routes, including the region's only government bond option and a property route with no cap on family size.",

    headline: ["From US$240,000", "Four qualifying routes", "No minimum stay"],

    hero: {
      src: luciaPitonBeach,
      alt: "A beach on Saint Lucia's west coast, yachts at anchor offshore and the steep green flank of a Piton rising straight out of the sea",
    },

    intro: [
      "Saint Lucia offers citizenship through four qualifying investment routes under its Citizenship by Investment Act No. 14 of 2015, administered by the country's Citizenship by Investment Board. Applications are filed by a licensed agent in-country; we assess your profile and coordinate the matter throughout.",
    ],

    keyFacts: [
      {
        label: "Minimum investment",
        value: "US$240,000",
        note: "National Economic Fund contribution, covering the main applicant and up to three dependants",
      },
      {
        label: "Qualifying routes",
        value: "Four",
        note: "A fund contribution, an approved enterprise, property or government bonds",
      },
      {
        label: "Who may be included",
        value: "Spouse and dependants",
        note: "Dependent children under 31, siblings under 18 and parents aged 55 and over",
      },
    ],

    benefits: [
      {
        label: "One family application",
        text: "Citizenship for the main applicant and qualifying family members under a single application, rather than a separate process for each person.",
      },
      {
        label: "Four ways to qualify",
        text: "A contribution, an approved enterprise, property or government bonds — so the investment can be structured around what you want to do with the capital rather than the other way round.",
      },
      {
        label: "No minimum stay",
        text: "No requirement to relocate and no minimum stay or visit condition, either before the application or after citizenship is granted.",
      },
      {
        label: "The next generation",
        text: "Citizenship that may generally be passed by descent to children born afterwards, subject to the programme's rules at the time.",
      },
    ],

    routesIntro:
      "To qualify, the main applicant must be over 18, meet the application requirements, and select one of the four options below. Family size is the main constraint on three of them — the fund, the enterprise route and the bonds all price for the main applicant and up to three dependants, while the property route does not cap the number at all.",

    routes: [
      {
        name: "National Economic Fund",
        amount: "US$240,000",
        amountNote: "up to four people",
        bestFor: "The lowest entry point",
        condition: "Non-refundable contribution",
        detail:
          "A non-refundable contribution to the National Economic Fund of US$240,000 for the main applicant and up to three dependants. Each additional dependant is US$10,000 under the age of 18 and US$20,000 over it.",
      },
      {
        name: "Approved Enterprise Project",
        amount: "US$250,000",
        amountNote: "plus administrative fees",
        bestFor: "An interest in an operating business",
        condition: "Government-approved project",
        detail:
          "An investment of at least US$250,000, plus administrative fees, in an enterprise or project approved by the government, covering the main applicant and up to three dependants.",
      },
      {
        /* The uncapped dependant count is this route's real distinguishing
           feature and the reason it is the right one for a large family, so it
           is `bestFor` rather than a line buried in `detail`. */
        name: "Real Estate",
        amount: "US$300,000",
        bestFor: "Larger families, and a recoverable asset",
        condition: "Five-year holding period",
        detail:
          "The purchase of real estate with a minimum value of US$300,000 in an approved development, held for a minimum of five years. Unlike the other three routes, this one accommodates any number of qualifying dependants rather than pricing for three.",
      },
      {
        /* amount + amountNote, NOT a US$350,000 total — the fee is a separate
           payment and no government publishes the two added together. */
        name: "Government Bonds",
        amount: "US$300,000",
        amountNote: "plus a US$50,000 administrative fee",
        bestFor: "A defined end to the commitment",
        condition: "Five-year holding period",
        detail:
          "An investment of US$300,000 in non-interest-bearing government bonds, plus a US$50,000 administrative fee. The bonds must be held for a minimum of five years and pay no interest over that period.",
      },
    ],

    costs: [
      {
        label: "Investment",
        text: "The qualifying route you select, from US$240,000. The enterprise and bond routes carry separate administrative fees on top.",
      },
      {
        label: "Government processing fees",
        text: "Additional to the investment, non-refundable, and payable for the main applicant and each dependant.",
      },
      {
        label: "Due diligence",
        text: "Additional and non-refundable. Fees are payable for the main applicant and each dependant, and are due before the application is processed.",
      },
      {
        label: "Legal and agent fees",
        text: "Additional. The application is filed in English by an agent licensed in Saint Lucia.",
      },
    ],

    procedure: [
      {
        title: "Assessment and filing",
        text: "An application begins with an assessment of your objectives, family composition and profile, and a decision on which qualifying route fits. The application is submitted in English, in electronic and printed form, by an agent licensed in Saint Lucia. Every supporting document must be attached before processing starts, and the processing and due-diligence fees are non-refundable.",
      },
      {
        title: "Due diligence",
        text: "The Citizenship by Investment Board conducts background checks on the main applicant and every adult dependant, and may grant, refuse or delay an application for cause. This stage determines the outcome, and no adviser can shorten it.",
      },
      {
        title: "Approval and completion",
        text: "On approval in principle the qualifying funds must be remitted within 90 calendar days. An oath or affirmation of allegiance is then taken before an attorney-at-law, notary royal or notary public, and the certificate of citizenship follows.",
      },
    ],

    feature: {
      src: luciaSoufriere,
      alt: "Soufrière, Saint Lucia — the town spread across a green valley below the two Pitons, with the sea beyond",
    },

    whyChoose: [
      "Two decades of advisory experience across immigration, global mobility and investment migration.",
      "Strategy before paperwork — we establish whether this route fits before an application is prepared.",
      "A coordinated network of qualified lawyers and regulated professionals across jurisdictions.",
      "Regulated advice stays with the qualified professional in-country.",
      "One point of contact from assessment to completion.",
    ],

    faqs: [
      {
        q: "Who can be included in one application?",
        a: "The main applicant, a spouse, dependent children under 31, siblings under 18 and parents aged 55 and over. Which relatives qualify is confirmed at assessment.",
      },
      {
        q: "What are the qualifying investment routes?",
        a: "A National Economic Fund contribution, an investment in an approved enterprise or project, approved real estate, or government bonds.",
      },
      {
        q: "What does the programme cost?",
        a: "The minimum for each route is set out above, from US$240,000. Government, due-diligence and legal fees are additional and depend on family size.",
      },
      {
        q: "Which route suits a large family?",
        /* The one row on this page that answers something the other four
           programmes cannot, so it sits above the standard questions. */
        a: "The property route, which is the only one that does not price for a fixed number of dependants. The other three cover the main applicant and up to three, with a stated figure for each person beyond that.",
      },
      {
        q: "Do I need to live in Saint Lucia?",
        a: "No. There is no minimum stay or visit requirement, before the application or after citizenship is granted.",
      },
      {
        q: "Is the investment refundable?",
        a: "A fund contribution is not. Bonds are repaid at the end of the five-year term but pay no interest over it, and property may be recoverable on resale after the holding period, subject to the market.",
      },
      {
        q: "How quickly must the investment be paid?",
        a: "Within 90 calendar days of approval in principle. The processing and due-diligence fees are payable earlier, before the application is processed at all, and are not refundable.",
      },
      {
        q: "Can I keep my existing citizenship?",
        a: "Saint Lucia recognises dual citizenship. Whether your own country permits it is a question for its law.",
      },
      {
        q: "What does Cynosure do, and what does the licensed agent do?",
        a: "We assess your profile, recommend the route and coordinate the matter. The application is filed by an agent licensed in Saint Lucia.",
      },
    ],

    related: {
      label: "Compare the Caribbean citizenship programmes",
      short: "Compare Programmes",
      to: "/investment-migration#cbi",
    },

    disclosure:
      "Figures are the government minimums, last checked on 7 September 2026, and exclude due-diligence and third-party costs.",

    tabs: [
      {
        id: "about",
        label: "About Saint Lucia",
        heading: "About Saint Lucia",
        body: [
          "Saint Lucia is a mountainous island in the eastern Caribbean and an independent member of the Commonwealth, with English as its official language and Saint Lucian Creole widely spoken alongside it. It has been independent since 1979 and retains a parliamentary system. The island changed hands between Britain and France repeatedly before that, and its law still shows it: the system is founded on English common law but carries a civil law inheritance from the French period.",
          "The economy is led by tourism, offshore financial services and agriculture, with bananas the historic export. The Pitons, the two volcanic spires above Soufrière, are a UNESCO World Heritage site and the island's defining image. The Eastern Caribbean dollar is pegged to the US dollar, which removes exchange-rate uncertainty from any investment denominated locally.",
          "For an applicant, the practical points are these: four routes rather than two or three, no minimum stay or visit condition, and a property route with no cap on the number of qualifying dependants. It is the programme that gives a large or unusually structured family the most room to work with.",
        ],
      },
      {
        id: "real-estate",
        label: "Real Estate",
        heading: "The real estate route",
        body: [
          "The property route requires the purchase of real estate valued at a minimum of US$300,000 in a development approved for programme purposes, held for a minimum of five years. It is the highest of Saint Lucia's four thresholds and, for one particular kind of applicant, comfortably the cheapest of them.",
          "That is because of the dependant rule rather than the price. The fund, the enterprise route and the bonds all price for the main applicant and up to three dependants, with a stated figure for each person beyond that. The property route does not cap the number at all. A family large enough to be paying several of those add-ons can reach the point where US$300,000 in property costs less than US$240,000 in contributions, and where that point falls is arithmetic we run at assessment.",
          "Approved developments are concentrated in resort and branded-residence projects along the west coast. Two things matter more than the headline price: whether the specific development is currently approved, and what the resale market for that project realistically looks like in five years. Neither is answerable from a brochure, and both are part of what we assess before recommending this route over a contribution.",
        ],
      },
    ],

    closing: {
      title: "Speak to us about Saint Lucia",
      text: "Whether this programme suits your family is worth establishing before an application is prepared. A first conversation covers your objectives, who would be included, and which of the four routes fits.",
    },
    ctaImage: null,
  },
  {
    slug: "portugal",
    name: "Portugal",
    Flag: PT,
    kind: "rbi",
    kindLabel: "Golden Residence Permit",
    sourceUrl: "https://www.henleyglobal.com/residence-investment/portugal",
    lede: "European residence through a qualifying investment, with a light physical-presence expectation and a long-term route to Portuguese citizenship.",
    headline: ["Schengen access", "Average 7 days/year", "Apply after 5 years"],
    hero: {
      src: lisbonAlfama,
      alt: "Lisbon — São Vicente de Fora and the Panteão Nacional dome above the Alfama rooftops",
    },
    intro: ["Portugal's Golden Residence Permit Program is a residence-by-investment option for qualifying investors. Henley highlights visa-free access to the Schengen Area and the possibility of applying for Portuguese citizenship after five years while maintaining the permit requirements."],
    keyFacts: [
      { label: "Travel", value: "Schengen Area", note: "Visa-free access for permit holders, as described by Henley" },
      { label: "Presence", value: "Average 7 days/year", note: "The average physical-presence expectation stated by Henley" },
      { label: "Long-term pathway", value: "Citizenship application", note: "Possible after five years, subject to the applicable requirements" },
    ],
    feature: {
      src: portoDouro,
      alt: "Porto — the Douro below the Serra do Pilar monastery, crossed by the Ponte Maria Pia",
    },
    benefits: [
      { label: "European residence", text: "A Portuguese residence route for investors seeking a long-term European base." },
      { label: "Schengen travel", text: "Visa-free travel across the Schengen Area is a core program benefit highlighted by Henley." },
      { label: "Low presence", text: "Henley states an average physical-presence expectation of seven days each year while holding the permit." },
      { label: "Citizenship pathway", text: "Eligible holders may apply for Portuguese citizenship after five years, subject to the rules in force at that time." },
    ],
    procedure: [
      { title: "Initial assessment", text: "We assess your objectives, family circumstances, source of funds and the qualifying route that may suit your profile." },
      { title: "Application preparation", text: "The required supporting evidence and investment documentation are prepared with the appropriate in-country professionals." },
      { title: "Residence and renewal", text: "Once granted, the permit must be maintained in line with the program requirements and any applicable renewal rules." },
    ],
    whyChoose: ["Two decades of advisory experience across immigration, global mobility and investment migration.", "Strategy before paperwork - we establish whether this route fits before an application is prepared.", "A coordinated network of qualified lawyers and regulated professionals across jurisdictions.", "Regulated advice stays with the qualified professional in-country.", "One point of contact from assessment to completion."],
    faqs: [
      { q: "What does Portugal's Golden Residence Permit provide?", a: "Henley describes a qualifying investor residence route with visa-free Schengen travel and a potential citizenship application after five years." },
      { q: "How much time must I spend in Portugal?", a: "Henley states an average physical-presence expectation of seven days per year. The applicable requirement should be confirmed before applying." },
      { q: "Can my family be included?", a: "Family eligibility depends on the rules and your particular application. We confirm who may be included during assessment." },
      { q: "Can I apply for Portuguese citizenship?", a: "Henley states that permit holders may apply after five years, subject to the applicable legal and program requirements." },
    ],
    related: { label: "Compare residence programs", short: "Compare Programs", to: "/investment-migration#rbi" },
    closing: { title: "Speak to us about Portugal", text: "A first conversation establishes whether Portugal's Golden Residence Permit fits your family, investment objectives and long-term plans." },
    ctaImage: null,
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    Flag: AE,
    kind: "rbi",
    kindLabel: "Golden Visa",
    sourceUrl: "https://www.henleyglobal.com/residence-investment/united-arab-emirates",
    lede: "Long-term UAE residence for qualifying investors, entrepreneurs and other eligible applicants who want to live, work or study in the Emirates.",
    headline: ["10-year renewable permit", "No sponsor required", "Family sponsorship"],
    hero: {
      src: dubaiSkyline,
      alt: "Dubai — the Burj Khalifa rising above the Business Bay skyline",
    },
    intro: ["The UAE Golden Visa is a renewable 10-year residence permit. Henley describes a route that allows foreign nationals to live, work and study in the UAE without a sponsor, with the ability to sponsor a spouse and children."],
    keyFacts: [
      { label: "Residence term", value: "10 years", note: "Renewable residence permit" },
      { label: "Sponsorship", value: "No sponsor", note: "Henley states that a sponsor is not required" },
      { label: "Family", value: "Spouse and children", note: "Eligible holders can sponsor immediate family members" },
    ],
    feature: {
      src: abuDhabiMosque,
      alt: "Abu Dhabi — the Sheikh Zayed Grand Mosque mirrored in its reflecting pool at dusk",
    },
    benefits: [
      { label: "Long-term residence", text: "A renewable 10-year permit for qualifying foreign nationals." },
      { label: "Everyday flexibility", text: "The permit supports living, working and studying in the United Arab Emirates." },
      { label: "Independent status", text: "Henley states that holders do not need a sponsor for the Golden Visa." },
      { label: "Family sponsorship", text: "Eligible holders can sponsor their spouse and children." },
    ],
    procedure: [
      { title: "Profile assessment", text: "We establish which qualifying category may apply to you, including real estate investment, entrepreneurship or specialized talent." },
      { title: "Evidence and filing", text: "The supporting documents for the relevant category are assembled and submitted through the applicable UAE process." },
      { title: "Residence maintenance", text: "Once issued, the residence permit is managed in line with the renewal and eligibility requirements then in force." },
    ],
    whyChoose: ["Two decades of advisory experience across immigration, global mobility and investment migration.", "Strategy before paperwork - we establish whether this route fits before an application is prepared.", "A coordinated network of qualified lawyers and regulated professionals across jurisdictions.", "Regulated advice stays with the qualified professional in-country.", "One point of contact from assessment to completion."],
    faqs: [
      { q: "How long is the UAE Golden Visa valid for?", a: "Henley describes the Golden Visa as a renewable 10-year residence permit." },
      { q: "Do I need a sponsor?", a: "Henley states that foreign nationals who qualify for the Golden Visa do not require a sponsor." },
      { q: "Can I include my family?", a: "Henley states that eligible holders can sponsor their spouse and children." },
      { q: "Which categories can qualify?", a: "Henley identifies real estate investment, entrepreneurship and specialized talent among the relevant qualification routes." },
    ],
    related: { label: "Compare residence programs", short: "Compare Programs", to: "/investment-migration#rbi" },
    closing: { title: "Speak to us about the UAE", text: "We can assess the category that best matches your profile and coordinate the next steps with the appropriate UAE professionals." },
    ctaImage: null,
  },
  {
    slug: "greece",
    name: "Greece",
    Flag: GR,
    kind: "rbi",
    kindLabel: "Golden Visa",
    sourceUrl: "https://www.henleyglobal.com/residence-investment/greece",
    lede: "Greek residence through qualifying investment, with options in real estate or a company and a five-year residence permit for successful applicants.",
    headline: ["5-year residence", "Schengen access", "Family inclusion"],
    hero: {
      src: athensAcropolis,
      alt: "Athens — the Parthenon on the Acropolis, above the Odeon of Herodes Atticus",
    },
    intro: ["Greece's Golden Visa Program offers a range of investment options, including real estate or a company. Henley states that successful applicants obtain a five-year residence permit and visa-free travel access in the Schengen Area."],
    keyFacts: [
      { label: "Residence term", value: "5 years", note: "Permit term stated by Henley for successful applicants" },
      { label: "Investment options", value: "Real estate or company", note: "The two routes highlighted on the source page" },
      { label: "Family", value: "Immediate family", note: "Spouse, children under 21 and parents are listed by Henley" },
    ],
    feature: {
      src: athensCaryatids,
      alt: "Athens — the Porch of the Caryatids on the Erechtheion",
    },
    benefits: [
      { label: "European residence", text: "A Greek residence permit for qualifying investors." },
      { label: "Schengen travel", text: "Henley highlights visa-free access across the Schengen Area." },
      { label: "Choice of route", text: "Qualifying investment may be through real estate or a company, subject to the applicable requirements." },
      { label: "Family planning", text: "Henley lists a spouse, children under 21 and parents among the family members who may be included." },
    ],
    procedure: [
      { title: "Investment route assessment", text: "We consider your objectives and the applicable real estate or company investment route before any commitment is made." },
      { title: "Application coordination", text: "The investment and residence documentation is prepared with the relevant Greek legal and professional support." },
      { title: "Permit issue and maintenance", text: "Successful applicants receive the residence permit subject to the program rules and the terms applicable to their case." },
    ],
    whyChoose: ["Two decades of advisory experience across immigration, global mobility and investment migration.", "Strategy before paperwork - we establish whether this route fits before an application is prepared.", "A coordinated network of qualified lawyers and regulated professionals across jurisdictions.", "Regulated advice stays with the qualified professional in-country.", "One point of contact from assessment to completion."],
    faqs: [
      { q: "What permit does Greece's Golden Visa provide?", a: "Henley states that successful applicants obtain a five-year Greek residence permit." },
      { q: "What investment options are available?", a: "Henley highlights real estate and company investment options. The route and current requirements need to be confirmed for your case." },
      { q: "Who may be included?", a: "Henley lists a spouse, children under 21 and parents among the family members eligible for inclusion." },
      { q: "Does the permit support Schengen travel?", a: "Henley highlights visa-free travel access in the Schengen Area as a program benefit." },
    ],
    related: { label: "Compare residence programs", short: "Compare Programs", to: "/investment-migration#rbi" },
    closing: { title: "Speak to us about Greece", text: "We can help you assess the Greek Golden Visa against your family needs, investment preferences and long-term objectives." },
    ctaImage: null,
  },
  {
    slug: "malta",
    name: "Malta",
    Flag: MT,
    kind: "cbi",
    kindLabel: "Citizenship by Naturalization",
    sourceUrl: "https://www.henleyglobal.com/residence-investment/malta",
    lede: "A Maltese citizenship route for exceptional services by direct investment, distinct from a residence permit program and subject to certification under Maltese law.",
    headline: ["Citizenship route", "Exceptional services", "Maltese Citizenship Act"],
    hero: {
      src: vallettaHarbour,
      alt: "Valletta — the fortified peninsula above the Grand Harbour",
    },
    intro: ["Henley's Malta page covers citizenship by naturalization for exceptional services by direct investment. It describes a legal route for highly reputable foreign individuals and families who contribute to Malta's economic development, subject to the applicable criteria, exceptions and regulations."],
    keyFacts: [
      { label: "Outcome", value: "Maltese citizenship", note: "A naturalization route, not a residence permit program" },
      { label: "Basis", value: "Exceptional services", note: "Direct investment and contribution to economic development" },
      { label: "Certification", value: "Required", note: "Henley refers to certification under the Maltese Citizenship Act, Cap. 188" },
    ],
    feature: {
      src: vallettaFacades,
      alt: "Valletta — limestone façades with the island's enclosed timber balconies",
    },
    benefits: [
      { label: "Citizenship route", text: "A legal route to Maltese citizenship by naturalization for eligible applicants." },
      { label: "Family context", text: "Henley describes the route for highly reputable foreign individuals and families." },
      { label: "Exceptional contribution", text: "The route is based on exceptional services through direct investment and contribution to Malta's economic development." },
      { label: "Legal framework", text: "Exceptional services must be certified in accordance with the Maltese Citizenship Act, Cap. 188." },
    ],
    procedure: [
      { title: "Eligibility assessment", text: "We first assess your circumstances and determine whether a citizenship route is appropriate for your objectives." },
      { title: "Professional coordination", text: "The application and evidence are coordinated with the appropriate Maltese legal and regulated professionals." },
      { title: "Certification and decision", text: "The route remains subject to the criteria, exceptions, regulations and certification required under Maltese law." },
    ],
    whyChoose: ["Two decades of advisory experience across immigration, global mobility and investment migration.", "Strategy before paperwork - we establish whether this route fits before an application is prepared.", "A coordinated network of qualified lawyers and regulated professionals across jurisdictions.", "Regulated advice stays with the qualified professional in-country.", "One point of contact from assessment to completion."],
    faqs: [
      { q: "Is this a residence permit program?", a: "No. Henley's Malta page describes citizenship by naturalization for exceptional services by direct investment." },
      { q: "What is the route based on?", a: "Henley describes direct investment and exceptional services that contribute to Malta's economic development." },
      { q: "Can a family be considered?", a: "Henley describes the route for highly reputable foreign individuals and families. Eligibility must be assessed in each case." },
      { q: "What legal framework applies?", a: "Henley states that exceptional services must be certified under the Maltese Citizenship Act, Cap. 188." },
    ],
    related: { label: "Compare investment migration programs", short: "Compare Programs", to: "/investment-migration" },
    closing: { title: "Speak to us about Malta", text: "We can discuss whether a Maltese citizenship route is aligned with your family circumstances, contribution plans and long-term objectives." },
    ctaImage: null,
  },
];

export const programmeBySlug = Object.fromEntries(programmePages.map((p) => [p.slug, p]));
