import { useEffect, useRef, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { FaArrowRight, FaAngleRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { programmeBySlug } from "@/data/programmePages";

/* Detail page for one CBI/RBI programme — /investment-migration/:slug.
 *
 * The LAYOUT here is henleyglobal.com's programme page, matched section by
 * section against their Antigua and Barbuda page at the client's instruction.
 * Four things carry that layout, and none of them are decoration:
 *
 *   1. A SPLIT HEADER. Copy on white in the left half, photograph bleeding off
 *      the right edge, and a pale tab band crossing the foot of the picture.
 *      Not the site's PageTitle banner — that is a centred title on a navy
 *      veil, which is a different page type.
 *   2. HALF-WIDTH GROUNDS. The overview band is slate on the left and pale on
 *      the right, each bleeding off its own edge of the viewport; "why choose
 *      us" is the same slate panel with nothing beside it.
 *   3. A LEFT-HAND MEASURE. Body sections occupy the left column and leave the
 *      right one empty, apart from one photograph beside Benefits. The empty
 *      half is the point: it is what holds the measure near 70 characters.
 *   4. DASH BULLETS. A short rule in the margin, not a disc — the same mark
 *      .eyebrow uses.
 *
 * ---- THE 2026-09-06 DESIGN AUDIT --------------------------------------------
 * Four changes, all of them to hierarchy rather than to style. Nothing in the
 * palette, the type scale, the radius rule or the section rhythm moved, and no
 * figure or claim on the page changed.
 *
 *   HEADER      gained the page's only above-the-fold action and its only
 *               above-the-fold figure. It had neither, and 220px of empty white
 *               beneath the copy where they now sit.
 *   KEY FACTS   the overview's pale half had "Minimum investment" at 26px over
 *               "US$230,000" at 15px. Figure first now, and four facts rather
 *               than two in a panel that was two-thirds empty.
 *   ROUTES      were four paragraphs in the left column with the government
 *               minimums buried mid-sentence, stacked under Benefits in a block
 *               that left 1000px of empty column beside it. They are their own
 *               full-width four-column comparison now — the one section on the
 *               page that breaks the measure, and the note in programmePages.js
 *               explains why that is the right call for tabular data and the
 *               wrong one for everything else here.
 *   PROCEDURE   three untitled paragraphs that were always three named stages.
 *
 * What was deliberately NOT changed: the empty right column on Procedure, Why
 * Choose and the FAQ. That is the measure decision above, it is correct, and
 * filling it was the obvious wrong move.
 *
 * Rendered in the site's own tokens throughout: --c-primary slate, Garamond
 * 400 heads, hairlines, zero radius. Two deliberate departures from the
 * reference remain, both documented in programmePages.js — no factsheet
 * download (there is no factsheet), and no invented figures.
 *
 * ---- MEASURED GEOMETRY ------------------------------------------------------
 * Taken off the reference in a browser at a 1440 viewport, not estimated from a
 * screenshot. Everything below is one of its numbers:
 *
 *   content column   1200px, centred, so 120px gutters at 1440
 *                    -> max-w-[1248px] px-6. The 1248 is 1200 plus the two 24px
 *                       gutters px-6 adds, because border-box makes max-width
 *                       include them; it is NOT a width anyone chose. This is
 *                       narrower than the 1400 the rest of the site uses, which
 *                       is also true of the reference against its own header.
 *   column split     two 585px columns with a 30px gutter: 120–705 and 735–1320
 *                    -> w-[calc(50%-15px)] for the left, and the right-hand
 *                       photograph starts at calc(50% + 15px). Both are exact
 *                       at every width, because the container is centred and so
 *                       its midpoint IS 50%.
 *   half-width grounds  split at the VIEWPORT midpoint (720), not the column
 *                    gutter — the overview's slate/pale edge and the tab band
 *                    are a different split from the text columns.
 *   tab band         ends at 1153 = 80% of the viewport -> right-[20%]
 *   feature photo    380 wide inside the 585 column, flush to the container's
 *                    right edge, top-aligned with the Benefits heading, and at
 *                    its NATURAL aspect — the reference crops nothing here.
 *
 * The type scale IS the reference's now, and it is in the tokens rather than
 * scoped here — see the scale note in index.css. It was measured off the same
 * page as the geometry above: 40/36 heads against the 60/44 the site had been
 * carrying on the strength of a guess. Body is the one deliberate departure,
 * 15px/1.6 rather than their 14px/1.286.
 */

/* The reference's list bullet is a short horizontal rule set in the margin.
   It is .eyebrow's `.chev` at a lighter weight, and it is most of why those
   lists read as a document's rather than as a feature grid's.

   Two shapes of item, because two callers need different things from the same
   object. `whyChoose` passes plain strings — five one-line claims about the
   firm, where a label per row would be noise. `benefits` passes
   { label, text }: four full sentences, where the label is what lets a reader
   scan the column without reading it. A string is normalised to { text }, so an
   entry written either way renders rather than throwing on `.slice`. */
function RuleList({ items, tone = "dark", className = "", spacing = "space-y-6" }) {
  const rule = tone === "light" ? "bg-white/60" : "bg-ink/40";
  const text = tone === "light" ? "!text-white/85" : "";
  const label = tone === "light" ? "!text-white/70" : "";

  return (
    <ul className={`${spacing} ${className}`}>
      {items.map((raw) => {
        const item = typeof raw === "string" ? { text: raw } : raw;
        return (
          <li key={item.text.slice(0, 40)} className="flex items-start gap-6 sm:gap-8">
            {/* 0.72em lands the rule on the centre of a 15px/1.6 body line.
                With a label above it the first line is the 11px one instead,
                so the rule comes up to meet it. */}
            <span
              aria-hidden="true"
              className={`${item.label ? "mt-2" : "mt-[0.72em]"} h-px w-6 sm:w-8 shrink-0 ${rule}`}
            />
            <div>
              {item.label && <p className={`t-label-sm m-0 mb-2 ${label}`}>{item.label}</p>}
              <p className={`t-body m-0 ${text}`}>{item.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* Flat uppercase trail with hairline dividers, not the site's
   `.page-breadcrumb` — that class is styled for white type on the navy banner
   and this header is white. */
function Crumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="t-label-sm flex flex-wrap items-center gap-y-2">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center">
            {i > 0 && <span aria-hidden="true" className="mx-3 sm:mx-4 h-3 w-px bg-hairline" />}
            {c.to ? (
              /* inline-block + py-1 for the 24px target minimum — as a bare
                 inline link this measured 37x17. Matches the fix on
                 `.page-breadcrumb li a`, the site's other breadcrumb; these two
                 have always been separate implementations. */
              <Link
                to={c.to}
                className="inline-block py-1 transition-colors duration-300 hover:text-ink"
              >
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* The strip that crosses the foot of the header photograph. Sentence case and
   hairline dividers, as the reference has it — not the uppercase tracked-out
   tabs this file carried before, which read as a toolbar.

   Every panel stays in the DOM and is hidden with `hidden` rather than being
   unmounted, so the prerenderer and search engines get all three. The tab
   strip is the one part of the reference that costs it indexable content, and
   there is no reason to copy that part of it. */
function Tabs({ tabs, active, onChange }) {
  const stripRef = useRef(null);

  /* Below lg the three labels come to ~500px against a 342px measure, so the
     strip scrolls. Keep the SELECTED tab in view: the default tab is the
     middle one, and without this it was clipped mid-word at the right edge on
     a phone — which reads as a broken layout rather than as something you can
     swipe. Only moves when the tab is actually out of view, so the desktop
     strip (which never overflows) is untouched. */
  useEffect(() => {
    const strip = stripRef.current;
    const tab = strip?.querySelector('[aria-selected="true"]');
    if (!strip || !tab) return;
    const s = strip.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    if (t.right > s.right - 24) strip.scrollLeft += t.right - s.right + 24;
    else if (t.left < s.left + 24) strip.scrollLeft -= s.left - t.left + 24;
  }, [active]);

  return (
    <div
      ref={stripRef}
      role="tablist"
      aria-label="Page sections"
      /* -mx-6 px-6 lets the scroll area run to the viewport edge while the
         tabs keep the page's gutter: a label cut off at the edge of the screen
         reads as scrollable, one cut off inside a 24px margin reads as a
         mistake. Net zero at widths where nothing overflows. */
      className="flex items-center overflow-x-auto -mx-6 px-6"
    >
      {tabs.map((t, i) => {
        const on = t.id === active;
        return (
          <div key={t.id} className="flex items-center">
            {i > 0 && <span aria-hidden="true" className="mx-5 lg:mx-8 h-5 w-px bg-hairline" />}
            <button
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              onClick={() => onChange(t.id)}
              className={`shrink-0 whitespace-nowrap py-7 lg:py-8 text-[15px] transition-colors duration-300 ${
                on ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              <span className={`inline-block border-b-2 pb-2 ${on ? "border-ink" : "border-transparent"}`}>
                {t.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function ProgrammeDetail() {
  const { slug } = useParams();
  const p = programmeBySlug[slug];
  const [tab, setTab] = useState("programme");

  /* Same posture as CountryDetail: an unknown slug goes home rather than
     rendering an empty shell, and matches App.jsx's catch-all. */
  if (!p) return <Navigate to="/investment-migration" replace />;

  const {
    name, Flag, kindLabel, lede, headline = [], hero, intro, keyFacts, feature,
    benefits, routes = [], routesIntro, costs = [], procedure, whyChoose, faqs,
    related, disclosure, ctaImage, closing, tabs = [],
  } = p;

  /* The reference orders its strip country-background → programme → property,
     so the programme tab is INSERTED after the first supporting tab rather
     than pushed to the front. Clamped, so a programme that ships with fewer
     supporting tabs still produces a valid strip. */
  const allTabs = [...tabs];
  allTabs.splice(Math.min(1, tabs.length), 0, { id: "programme", label: kindLabel });

  const panel = (id) => (id === tab ? "" : "hidden");
  /* `procedure` has been a single string, then an array of paragraphs, and is
     now an array of { title, text } stages. Accept all three, so an entry
     written against an older shape renders its prose rather than a blank
     section or a crash. */
  const procedureSteps = (Array.isArray(procedure) ? procedure : [procedure]).map((s) =>
    typeof s === "string" ? { text: s } : s
  );

  return (
    <>
      {/* ---- 0. split header ------------------------------------------------
          The section clears the fixed navbar itself; everything inside is
          positioned against the strip of page you can actually see. */}
      <section className="bg-white pt-[var(--nav-clear)]">
        <div className="relative">
          {/* Copy one side, photograph the other — and the photograph is never
              cropped, at any width.

              Five grid tracks build the page gutters, so the photograph can span
              the last two and run from the column gutter to the viewport edge
              WITHOUT a vw unit: 100vw includes the scrollbar on Windows and
              would land the bleed a dozen pixels out from every other section.
              At 1440 the tracks resolve to 120 | 585 | 30 | 585 | 120, which is
              the reference's grid exactly.

              The photograph is `w-full h-auto` in a `self-start` cell. That is
              the whole crop fix: no fixed height, no aspect box and no
              object-cover, so the image is shown at its own aspect ratio and
              there is nothing for the browser to cut off. It sizes the header
              row (705x529 at 1440 from the 1600x1200 source) and the copy sits
              beside it. Two earlier attempts here both cropped — a fixed
              bottom offset took 26% off the height, and filling the half took
              19% off the width. */}
          <div className="lg:grid lg:grid-cols-[minmax(24px,1fr)_minmax(0,585px)_30px_minmax(0,585px)_minmax(24px,1fr)]">
            <div className="px-6 lg:px-0 lg:col-start-2 lg:self-start pt-8 pb-12 lg:pt-12 lg:pb-14">
              <Crumbs
                items={[
                  { label: "Home", to: "/" },
                  { label: "Investment Migration", to: "/investment-migration" },
                  { label: name },
                ]}
              />

              {/* Not in the reference, which carries no flag. Kept because this
                  is a country programme and a 28px flag says which country
                  faster than the title does. */}
              {Flag && <Flag title={name} className="w-11 h-7 mt-8 object-cover ring-1 ring-ink/10" />}

              <WordsSlideUp as="h1" text={`${name} ${kindLabel}`} className="t-display text-ink mt-7" />

              <p className="t-body mt-9 max-w-[44ch]">{lede}</p>

              {/* ---- the header's answer to "how much, and what are my options"
                  Measured before this was added: the copy column ended 220px
                  above the foot of the photograph beside it, and the first
                  screen carried no figure and no action at any width. A visitor
                  had to scroll a full viewport to learn the minimum or to find
                  anything to click.

                  The two additions are sized to that gap rather than poured
                  into it. Copy column at 1440 was 405px against a 529px
                  photograph; the fact row (50px) and the action row (96px) take
                  it to 551, so the column now runs 22px past the picture
                  instead of stopping 124px short of it. Anything more — the
                  four-fact grid this started as, or a second paragraph — puts
                  the tab strip below the fold on a 900px window, which is the
                  one thing in this header that must stay visible. */}
              {/* Separated by space, not by a rule. The hairline dividers this
                  had are the Crumbs idiom and they do not survive a wrap: the
                  row needs 562px and the column is 473 at lg and 585 only from
                  xl, so on a phone AND on a 1024–1170 laptop the last divider
                  on each line was left hanging at the end of it. A gap cannot
                  strand. At 0.16em tracking the space between two of these
                  phrases is six times the space inside one, which is separation
                  enough without a mark. */}
              {headline.length > 0 && (
                <p className="t-label text-ink mt-8 flex flex-wrap gap-x-8 gap-y-2">
                  {headline.map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </p>
              )}

              {/* One slab and one arrow link, not two slabs. Two buttons come
                  to 692px against a 585px column, so they wrap into a stacked
                  pair that reads as a menu; and the site already has a tier for
                  the softer of two actions. The heavy action is the
                  consultation — the comparison link is where a visitor who is
                  not ready for one goes. */}
              {/* shrink-0 on both, and the row wraps rather than compressing.
                  Without it the pair is 616px of content in a 585px column and
                  flex takes the difference out of the two items: the button's
                  label broke to "BOOK A CONFIDENTIAL / CONSULTATION" and the
                  link's to two lines under its own rule. They wrap to a second
                  row at lg, where the column is 585, and sit side by side from
                  sm to md, where it is the full page width. */}
              <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-6">
                <Link to="/contact" className="btn-primary shrink-0 whitespace-nowrap">
                  Book a Confidential Consultation <FaArrowRight />
                </Link>
                {related?.short && (
                  <Link to={related.to} className="link-arrow shrink-0 whitespace-nowrap">
                    {related.short} <FaAngleRight />
                  </Link>
                )}
              </div>
            </div>

            {hero && (
              <div className="lg:col-start-4 lg:col-span-2 lg:self-start">
                <img src={hero.src} alt={hero.alt} className="block w-full h-auto" />
              </div>
            )}
          </div>

          {/* Tab band. Stops short of the right edge so the picture shows past
              its end: the reference's band ends at 1153 of 1440, which is 80%,
              so right-[20%] rather than the 21% that was here by estimate.

              The inset is FOR the photograph, so it goes when there is none.
              Four of the five programmes ship without a hero (see the note in
              programmePages.js) and on those the 20% was a band stopping short
              of nothing, which reads as a truncated element rather than as a
              deliberate reveal. Full width there instead. */}
          <div className="relative">
            <div
              aria-hidden="true"
              className={`absolute inset-y-0 left-0 right-0 bg-offwhite ${hero ? "lg:right-[20%]" : ""}`}
            />
            <div className="relative container-narrow">
              <Tabs tabs={allTabs} active={tab} onChange={setTab} />
            </div>
          </div>
        </div>
      </section>

      {/* ---- the two supporting tabs ----
          Left column, empty right — the reference's measure, and the same
          shape as Procedure below. */}
      {tabs.map((t) => (
        <div
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          className={panel(t.id)}
        >
          <section className="py-14 md:py-20 lg:py-24 bg-white">
            <div className="container-narrow">
              <Reveal className="lg:w-[calc(50%-15px)]">
                <h2 className="t-h2 text-ink">{t.heading}</h2>
                <div className="mt-8 space-y-6">
                  {t.body.map((b) => (
                    <p key={b.slice(0, 40)} className="t-body">
                      {b}
                    </p>
                  ))}
                </div>
                <div className="mt-10">
                  <Link to="/contact" className="btn-primary">
                    Book a Confidential Consultation <FaArrowRight />
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      ))}

      {/* ---- programme tab ---- */}
      <div id="panel-programme" role="tabpanel" aria-labelledby="tab-programme" className={panel("programme")}>

        {/* ---- 1. overview: two half-width grounds -------------------------
            Each ground is a positioned sibling bleeding off its own edge of
            the viewport, with the copy in the ordinary container on top.
            Painted this way rather than as two 100vw panels with vw-derived
            gutters because 100vw INCLUDES the scrollbar on Windows — a vw
            gutter lands a dozen pixels out of line with every other section
            on the page. */}
        <section className="relative">
          <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-0 right-1/2 bg-primary" />
          <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-1/2 right-0 bg-offwhite" />

          <div className="relative container-narrow grid lg:grid-cols-2">
            {/* below lg there are no halves to bleed into, so each column
                paints its own ground and -mx-6 px-6 takes it full width */}
            <Reveal className="bg-primary lg:bg-transparent -mx-6 px-6 py-14 lg:mx-0 lg:px-0 lg:py-24 lg:pr-20">
              <h2 className="t-h2 !text-white">{kindLabel} Overview</h2>

              <div className="mt-8 space-y-5">
                {intro.map((t) => (
                  <p key={t.slice(0, 40)} className="t-body !text-white/85">
                    {t}
                  </p>
                ))}
              </div>

              {/* The reference pairs ENQUIRY with a FACTSHEET download. There
                  is no factsheet, and a dead download is worse than not having
                  one, so the second action is the link the FAQ already ends
                  on. */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-light">
                  Enquiry <FaArrowRight />
                </Link>
                {related?.short && (
                  <Link to={related.to} className="btn-outline-light">
                    {related.short} <FaAngleRight className="text-xs" />
                  </Link>
                )}
              </div>
            </Reveal>

            {/* ---- key facts, figure first --------------------------------
                The reference's version of this panel is two icon rows: a line
                icon, a Garamond heading, one line of copy. Copying it put
                "Minimum investment" at 26px and "US$230,000" at 15px, so the
                number a visitor came for was the smallest text in its own
                block. The label is an 11px caption above the figure now and the
                figure carries the Garamond.

                A ruled definition list rather than four more icon rows. Two of
                these four facts have an obvious glyph and two do not, and the
                hairline between rows does the separating work an icon was
                standing in for. */}
            <Reveal
              delay={0.1}
              className="bg-offwhite lg:bg-transparent -mx-6 px-6 py-14 lg:mx-0 lg:px-0 lg:py-24 lg:pl-20"
            >
              <p className="t-label">At a glance</p>

              {/* Label above value at every width. A two-column label/value row
                  is the tidier object, but the panel is only 393px wide at lg —
                  half the container less its 80px inset — and a fixed label
                  column leaves the note squeezed into 185px. One column holds at
                  320px and at 1440 alike. */}
              <dl className="m-0 mt-8 border-t border-hairline">
                {keyFacts.map((f) => (
                  <div key={f.label} className="border-b border-hairline py-7">
                    <dt className="t-label-sm">{f.label}</dt>
                    <dd className="m-0 mt-2">
                      <span className="t-num block text-[1.375rem] leading-[1.25]">{f.value}</span>
                      {f.note && <span className="t-small block mt-2">{f.note}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ---- 2. benefits, photograph in the right column ------------------
            The qualifying routes used to share this section, stacked beneath
            the benefits in the same left column, and between them they made a
            1236px block against a 250px photograph — 1000px of empty right
            column, in the one place on the page that had something to put
            there. The routes are their own full-width section now and this one
            is close to balanced: four labelled benefits come to roughly the
            height of the picture beside them. */}
        <section className="py-14 md:py-20 lg:py-24 bg-white">
          {/* gap-x-[30px], not gap-x-16: with the 1200px content column a 30px
              gutter makes each track 585 — the reference's column exactly. */}
          <div className="container-narrow grid lg:grid-cols-2 gap-x-[30px] gap-y-14">
            <div>
              <Reveal>
                {/* kindLabel, not a hardcoded "Citizenship by Investment" —
                    the same component renders residence programmes, and the
                    heading has to follow `kind` rather than assume it. */}
                <h2 className="t-h2 text-ink">Benefits of {name} {kindLabel}</h2>
              </Reveal>
              <Reveal className="mt-9">
                <RuleList items={benefits} spacing="space-y-8" />
              </Reveal>
            </div>

            {/* The reference's treatment, which this got wrong twice over: its
                photograph is 380 of the 585 column, flush to the container's
                right edge, top-aligned with the Benefits heading, and shown at
                its NATURAL aspect ratio.

                What was here filled the column at a forced aspect-[4/3] with
                object-cover, and rode sticky. The sticky was a reasonable
                argument — these two sections run long — but it is not what the
                reference does, and the forced aspect box is the thing to be rid
                of: an aspect box plus object-cover crops whatever does not fit,
                which is exactly the complaint. w-auto/h-auto here means the
                image is never cropped at any width, whatever aspect the next
                programme's photograph turns out to be. */}
            {feature && (
              <Reveal delay={0.1} className="lg:ml-auto lg:w-[65%]">
                <img src={feature.src} alt={feature.alt} className="w-full h-auto" />
              </Reveal>
            )}
          </div>
        </section>

        {/* ---- 3. the qualifying routes -------------------------------------
            The full container width, and the only body section on the page that
            takes it. The reasoning is in programmePages.js: the left-hand
            measure exists to hold PROSE near 70 characters, and four government
            minimums a visitor is choosing between are not prose. Held in the
            585px column they were four paragraphs with the figures buried
            mid-sentence, which is the one thing this page could not afford to
            get wrong.

            .routes-table in index.css carries the responsive half — four columns
            from lg, a stacked block per route below it, one table either way. */}
        {routes.length > 0 && (
          <section id="investment-routes" className="py-14 md:py-20 lg:py-24 bg-offwhite scroll-mt-28">
            <div className="container-narrow">
              <Reveal className="lg:w-[calc(50%-15px)]">
                <h2 className="t-h2 text-ink">{name} Investment Routes</h2>
                {routesIntro && <p className="t-body mt-7">{routesIntro}</p>}
              </Reveal>

              <Reveal className="mt-12 lg:mt-14">
                <table className="routes-table">
                  <caption className="sr-only">
                    The {routes.length} qualifying investment routes, with the government minimum,
                    the profile each suits and its binding condition.
                  </caption>
                  {/* Percentages, not widths: the container is fluid between
                      1024 and 1248 and the proportions have to hold across that
                      range. Sized off the WORST case, which is the amount
                      column at the narrow end — "US$1,500,000" measures 135px
                      at 24px Garamond, and at 18% of a 976px table less the
                      40px gutter the cell offered 136px. One pixel of margin,
                      and `table-layout: fixed` does not wrap a number at its
                      commas: it would have spilled the figure into the next
                      column on any 1024–1150 laptop. 20% and a 22px figure
                      until xl gives it 31px of clearance at the narrow end and
                      65px at the wide one. */}
                  <colgroup>
                    <col className="w-[38%]" />
                    <col className="w-[20%]" />
                    <col className="w-[18%]" />
                    <col className="w-[24%]" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" className="t-label-sm">Route</th>
                      <th scope="col" className="t-label-sm">Minimum investment</th>
                      <th scope="col" className="t-label-sm">Best for</th>
                      <th scope="col" className="t-label-sm">Key condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routes.map((r) => (
                      <tr key={r.name}>
                        {/* A row header, not a cell. The route name is what
                            every other cell in the row is about, and scope="row"
                            is what lets a screen reader announce "Real Estate,
                            minimum investment, US$300,000" instead of reading
                            four unattached values. font-normal because <th>
                            defaults to bold and .t-h4 sets its own weight. */}
                        <th scope="row" className="font-normal">
                          <span className="t-h4 block text-ink">{r.name}</span>
                          <span className="t-body block mt-3">{r.detail}</span>
                        </th>
                        <td data-label="Minimum investment">
                          <span className="t-num block text-[1.375rem] xl:text-[1.5rem] leading-[1.15]">
                            {r.amount}
                          </span>
                          {r.amountNote && <span className="t-small block mt-2">{r.amountNote}</span>}
                        </td>
                        <td data-label="Best for">
                          <span className="t-body block">{r.bestFor}</span>
                        </td>
                        <td data-label="Key condition">
                          <span className="t-body block">{r.condition}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>

              {/* What the four figures above do not include. Three separate
                  places on this page said "there is more to pay than this" —
                  a clause in the fund route, an FAQ answer and the disclosure
                  line — and a reader had to assemble the picture from all
                  three. No amounts: none are published for any of the three
                  additional categories, and the structure is what tells you the
                  headline figure is a floor. */}
              {costs.length > 0 && (
                <Reveal className="mt-16 lg:mt-20 pt-12 border-t border-hairline">
                  <h3 className="t-h4 text-ink">What the figures cover</h3>
                  <dl className="m-0 mt-9 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
                    {costs.map((c) => (
                      <div key={c.label}>
                        <dt className="t-label-sm">{c.label}</dt>
                        <dd className="t-body m-0 mt-3">{c.text}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              )}

              {/* Moved up from the foot of the FAQ, four sections below the
                  only figures it qualifies. */}
              <Reveal className="mt-12">
                <p className="t-small border-l-2 border-primary pl-6">{disclosure}</p>
              </Reveal>
            </div>
          </section>
        )}

        {/* ---- 4. procedure — left column, empty right ----------------------
            Still the left measure: this is prose and the empty half is what
            holds it near 70 characters.

            What changed is that the three stages are visible. They were always
            three — the data file's own note called them "filing, due diligence,
            completion" — but they rendered as three untitled paragraphs, so the
            structure existed only for whoever read all of it. A ruled row per
            stage, an ordinal in the margin and the stage's name as its heading.
            White, not the offwhite it used to be: the routes section above took
            the tint, and two tinted sections in a row lose the seam between
            them.

            The ordinal is aria-hidden. It is a visual index, the <ol> already
            carries the order, and the stage title is what actually names the
            step — so reading "01" aloud before every heading would be noise. */}
        <section className="py-14 md:py-20 lg:py-24 bg-white">
          <div className="container-narrow">
            <Reveal className="lg:w-[calc(50%-15px)]">
              <h2 className="t-h2 text-ink">Procedure for the {name} Programme</h2>
            </Reveal>
            <Reveal className="mt-10 lg:w-[calc(50%-15px)]">
              <ol className="m-0 list-none p-0">
                {procedureSteps.map((s, i) => (
                  <li
                    key={s.text.slice(0, 40)}
                    className="grid grid-cols-[2rem_1fr] gap-x-6 border-t border-hairline py-8 first:border-t-0 first:pt-0 sm:gap-x-8"
                  >
                    <span
                      aria-hidden="true"
                      className="t-num text-primary text-[1.375rem] leading-[1.4]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      {s.title && <h3 className="t-h4 text-ink">{s.title}</h3>}
                      <p className={`t-body ${s.title ? "mt-3" : ""}`}>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* ---- 5. why choose us — the slate panel, bleeding off the LEFT ----
            Every line is checkable against the firm's own record: the
            reference's equivalent section leads with client and office counts
            this firm does not have, so those are absent rather than
            invented. */}
        <section className="relative bg-white">
          <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-0 right-1/2 bg-primary" />

          <div className="relative container-narrow">
            <Reveal className="lg:w-1/2 lg:pr-20 bg-primary lg:bg-transparent -mx-6 px-6 py-14 lg:mx-0 lg:px-0 lg:py-24">
              <h2 className="t-h2 !text-white">Why Choose Cynosure?</h2>
              <RuleList items={whyChoose} tone="light" className="mt-9" />
              <div className="mt-11">
                <Link to="/contact" className="btn-outline-light">
                  Enquiry <FaArrowRight />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- 6. FAQ ---- */}
        <section className="py-14 md:py-20 lg:py-24 bg-white">
          <div className="container-narrow">
            <div className="lg:w-[calc(50%-15px)]">
              <Reveal>
                <h2 className="t-h2 text-ink">
                  {name} {kindLabel} Frequently Asked Questions
                </h2>
              </Reveal>

              {/* Native <details>, not a JS accordion: keyboard-operable and
                  expandable by the browser's own find-in-page without us
                  writing or maintaining any of that. */}
              <Reveal className="mt-10">
                <div className="border-t border-hairline">
                  {faqs.map((f) => (
                    <details key={f.q} className="group border-b border-hairline">
                      <summary className="flex items-start justify-between gap-8 py-7 cursor-pointer list-none">
                        <h3 className="t-h4 font-normal leading-[1.7] text-ink">{f.q}</h3>
                        {/* CSS-only marker; .faq-marker in index.css turns the
                            plus into an x when the row opens */}
                        <span
                          aria-hidden="true"
                          className="faq-marker relative shrink-0 mt-2.5 w-3.5 h-3.5 text-ink/70"
                        >
                          <span className="absolute left-0 top-1/2 w-full h-[1.5px] -translate-y-1/2 bg-current" />
                          <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-current" />
                        </span>
                      </summary>
                      <p className="t-body pb-7">{f.a}</p>
                    </details>
                  ))}
                </div>
              </Reveal>

              {/* the reference closes its FAQ with a link out to the regional
                  programmes, so this does too. The disclosure line used to
                  follow it and has moved up to the routes section, beside the
                  figures it qualifies. */}
              {related && (
                <Reveal className="mt-12">
                  <Link
                    to={related.to}
                    className="link-arrow"
                  >
                    {related.label} <FaAngleRight />
                  </Link>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* ---- 7. contact ----
            Two columns when a photograph exists, matching the reference's
            contact block; the left-hand measure when it does not, rather than
            a paragraph running the full width of the page. */}
        <section className="py-14 md:py-20 lg:py-24 bg-offwhite border-t border-hairline">
          <div className="container-narrow">
            <div className={ctaImage ? "grid lg:grid-cols-2 gap-x-16 gap-y-10 items-center" : ""}>
              <Reveal className={ctaImage ? "" : "lg:w-[calc(50%-15px)]"}>
                <h2 className="t-h2 text-ink mb-5">{closing.title}</h2>
                <p className="t-body mb-9">{closing.text}</p>
                {/* Same pair as the header, and deliberately the same shapes:
                    the visitor who reaches the foot of the page without booking
                    is the one who wants to compare first, and sending them back
                    to an empty page end is how that visitor leaves. */}
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-6">
                  <Link to="/contact" className="btn-primary shrink-0 whitespace-nowrap">
                    Book a Confidential Consultation <FaArrowRight />
                  </Link>
                  {related?.short && (
                    <Link to={related.to} className="link-arrow shrink-0 whitespace-nowrap">
                      {related.short} <FaAngleRight />
                    </Link>
                  )}
                </div>
              </Reveal>

              {ctaImage && (
                <Reveal delay={0.1}>
                  {/* natural aspect, like the other two photographs on this
                      page — an aspect box plus object-cover crops whatever
                      does not fit it */}
                  <img src={ctaImage.src} alt={ctaImage.alt} className="block w-full h-auto" />
                </Reveal>
              )}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
