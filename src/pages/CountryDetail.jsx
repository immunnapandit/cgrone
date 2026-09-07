import { Navigate, useParams, Link } from "react-router-dom";
import { FaArrowRight, FaCheck, FaAngleRight, FaExternalLinkAlt } from "react-icons/fa";
import PageTitle from "@/components/sections/PageTitle";
import RegulatedPartner from "@/components/sections/RegulatedPartner";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { countryPages, getCountry } from "@/data/countryPages";
import { countryBanners } from "@/data/banners";

/* One section renderer per shape the documents actually use:
   `cards` (Canada options, NZ objectives), `groups` (Canada market entry,
   Australia how-we-help), `steps` (NZ pathway) and a plain `items` list. */
function Cards({ cards }) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {cards.map((c) => (
        <article key={c.title} className="bg-white border border-hairline p-8 lg:p-9">
          <h3 className="t-h4 text-ink mb-3">{c.title}</h3>
          <p className="t-body">{c.text}</p>
        </article>
      ))}
    </div>
  );
}

function Groups({ groups }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {groups.map((g) => (
        <div key={g.title} className="bg-white border border-hairline p-8 lg:p-9">
          <h3 className="t-h4 text-ink mb-6 pb-4 border-b border-hairline">{g.title}</h3>
          <ul className="space-y-3">
            {g.items.map((it) => (
              <li key={it} className="flex items-start gap-3 t-body">
                <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-ink/25 shrink-0" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Steps({ steps }) {
  return (
    <ol className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
      {steps.map((s) => (
        <li key={s.n} className="bg-white border border-hairline p-8 lg:p-9">
          <span className="t-num text-3xl text-ink/25 leading-none">{s.n}</span>
          <h3 className="t-h4 text-ink mt-5 mb-3">{s.title}</h3>
          <p className="t-body">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Items({ items }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-4 text-ink text-[17px]">
          <span className="w-6 h-6 mt-1 rounded-full bg-primary text-white flex items-center justify-center text-[10px] shrink-0">
            <FaCheck />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

/* ===========================================================================
   DESTINATION-PAGE BLOCKS — added 2026-09-07 for Canada.

   Every one of these renders ONLY when the country carries the matching key,
   so India, the UK, Australia and New Zealand fall straight through to the
   original layout and are not touched by any of it. That is also the upgrade
   path: give another country a `pathways` key and it gets the same section,
   with no change to this file.

   Nothing here invents a component the design system already has. The
   comparison reuses .routes-table from index.css (four columns from lg, a
   stacked block per row below it, driven by the data-label attributes), and
   the two accordions reuse the native <details> pattern from
   ProgrammeDetail.jsx — keyboard-operable and findable by the browser's own
   find-in-page without any JS.
   ======================================================================== */

/* Split hero. Copy left, photograph bleeding off the right edge — the same
   construction as the programme detail header, so a visitor moving between
   the two page types is not meeting a second idea of what a header is. */
function CountryHero({ hero, name, Flag }) {
  return (
    <section className="bg-white pt-[var(--nav-clear)]">
      <div className="lg:grid lg:grid-cols-[minmax(24px,1fr)_minmax(0,600px)_40px_minmax(0,660px)] lg:items-center">
        <div className="px-6 lg:px-0 lg:col-start-2 pt-10 pb-12 lg:py-20">
          {/* Breadcrumbs move into the hero rather than being lost with
              PageTitle. Flat trail with hairline dividers, matching the
              programme header — .page-breadcrumb is styled for white type on
              the navy banner and this header is white. */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="t-label-sm flex flex-wrap items-center gap-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Countries", to: `/countries/${countryPages[0].slug}` },
                { label: name },
              ].map((c, i) => (
                <li key={c.label} className="flex items-center">
                  {i > 0 && <span aria-hidden="true" className="mx-3 sm:mx-4 h-3 w-px bg-hairline" />}
                  {c.to ? (
                    <Link to={c.to} className="inline-block py-1 transition-colors duration-300 hover:text-ink">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-semibold text-ink">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex items-center gap-4 mb-7">
            {Flag && <Flag title={name} className="w-11 h-7 object-cover ring-1 ring-ink/10" />}
            <div className="eyebrow !mb-0">
              <span className="chev">»</span> {hero.eyebrow}
            </div>
          </div>

          <WordsSlideUp as="h1" text={hero.title} className="t-display text-ink" />
          <p className="t-body mt-8 max-w-[52ch]">{hero.lede}</p>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-9">
            <Link to={hero.primary.to} className="btn-primary shrink-0 whitespace-nowrap">
              {hero.primary.label} <FaArrowRight />
            </Link>
            {/* An in-page jump, so it is a plain <a>. React Router would
                otherwise try to resolve "#pathways" as a route. */}
            <a href={hero.secondary.to} className="link-arrow shrink-0 whitespace-nowrap">
              {hero.secondary.label} <FaAngleRight />
            </a>
          </div>
        </div>

        {/* w-full h-auto in a self-contained cell: no aspect box and no
            object-cover, so the photograph is never cropped at any width. */}
        <div className="lg:col-start-4 mt-2 lg:mt-0">
          <img src={hero.image.src} alt={hero.image.alt} className="block w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

/* The band under the hero. Figures lead, labels are captions above them —
   the same hierarchy the programme pages' key-facts panel settled on. */
function QuickFacts({ facts }) {
  return (
    <section className="bg-primary">
      <div className="container-page py-12 lg:py-14">
        <dl className="m-0 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {facts.map((f) => (
            <div key={f.label} className="border-t border-white/25 pt-6">
              <dt className="t-label-sm !text-white/70">{f.label}</dt>
              <dd className="m-0 mt-2.5">
                <span className="t-num block text-white text-[1.5rem] leading-[1.2]">{f.value}</span>
                <span className="t-small block mt-2 !text-white/75">{f.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function WhyCountry({ data }) {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="container-page">
        <Reveal className="max-w-3xl mb-12 lg:mb-16">
          <h2 className="t-h2 text-ink mb-5">{data.title}</h2>
          <p className="t-body">{data.lead}</p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-x-14 gap-y-12 items-start">
          <Reveal className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9">
              {data.items.map((it) => (
                <div key={it.title} className="border-t border-hairline pt-6">
                  <h3 className="t-h4 text-ink mb-2.5">{it.title}</h3>
                  <p className="t-body">{it.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Top-aligned at its natural aspect, and the column below it is
              left empty on purpose — the same treatment the programme pages
              give the photograph beside Benefits. It was `lg:sticky top-32`
              for one build, which did nothing: the grid is `items-start`, so
              the cell is only as tall as the image and a sticky element with
              no travel is just a static one. */}
          {data.image && (
            <Reveal delay={0.1} className="lg:col-span-5">
              <img src={data.image.src} alt={data.image.alt} className="block w-full h-auto" />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* The centrepiece. Open routes as a ruled list rather than a card grid —
   nine cards is a wall, and every one of these has a name, an audience and
   two sentences, which is a definition list, not a feature grid. */
function Pathways({ data }) {
  return (
    <section id={data.id} className="py-14 md:py-20 lg:py-24 bg-offwhite scroll-mt-28">
      <div className="container-page">
        {/* max-w-[68ch], not max-w-3xl. This lead measured 102 characters per
            line — the widest running text on the page and well past the ~70
            the rest of the site holds to. max-w-3xl is 768px, which at 15px
            body is about 100 characters; a ch cap is the honest unit for a
            measure and it does not drift when the type scale moves. */}
        <Reveal className="max-w-[68ch] mb-12">
          <h2 className="t-h2 text-ink mb-5">{data.title}</h2>
          <p className="t-body">{data.lead}</p>
        </Reveal>

        {/* One table for all nine, replacing a prose list plus a separate
            five-row comparison — see the note in countryPages.js. Reuses
            .routes-table, so it is three columns from lg and a stacked block
            per route below it, driven by the data-label attributes. */}
        <Reveal amount={0.1}>
          <table className="routes-table">
            <caption className="sr-only">
              The {data.open.length} permanent residence routes IRCC currently lists as open, who
              each suits, and the condition that most often decides access.
            </caption>
            <colgroup>
              <col className="w-[34%]" />
              <col className="w-[36%]" />
              <col className="w-[30%]" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="t-label-sm">Pathway</th>
                <th scope="col" className="t-label-sm">What it is</th>
                <th scope="col" className="t-label-sm">What it turns on</th>
              </tr>
            </thead>
            <tbody>
              {data.open.map((p) => (
                <tr key={p.name}>
                  <th scope="row" className="font-normal">
                    <span className="t-h4 block text-ink">{p.name}</span>
                    <span className="t-label-sm block mt-2.5">{p.who}</span>
                  </th>
                  <td data-label="What it is"><span className="t-body block">{p.text}</span></td>
                  <td data-label="What it turns on"><span className="t-body block">{p.turns}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Paused routes, stated rather than omitted. Marked with a rule and a
            muted ground so it cannot be mistaken for the open list above. */}
        {data.paused && (
          <Reveal className="mt-14 lg:mt-16 bg-white border border-hairline p-8 lg:p-11">
            <h3 className="t-h4 text-ink mb-4">{data.paused.title}</h3>
            {/* 68ch, not max-w-3xl — that computed to 102 characters a line,
                the last paragraph on the page still over the ~70 measure. */}
            <p className="t-body mb-8 max-w-[68ch]">{data.paused.text}</p>
            <dl className="m-0 grid gap-x-12 gap-y-7 md:grid-cols-2">
              {data.paused.items.map((it) => (
                <div key={it.name} className="border-l-2 border-accent-strong pl-6">
                  <dt className="t-h4 text-ink mb-2">{it.name}</dt>
                  <dd className="t-body m-0">{it.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {data.checked && (
          <Reveal className="mt-10">
            <p className="t-small border-l-2 border-primary pl-6">{data.checked}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}


function Process({ data }) {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-white border-t border-hairline">
      <div className="container-page">
        <Reveal className="max-w-3xl mb-12">
          <h2 className="t-h2 text-ink mb-5">{data.title}</h2>
          <p className="t-body">{data.lead}</p>
        </Reveal>

        <Reveal amount={0.1}>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {data.steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-primary pt-6">
                <span aria-hidden="true" className="t-num text-primary text-[1.125rem] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h4 text-ink mt-4 mb-2.5">{s.title}</h3>
                <p className="t-body">{s.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function Profiles({ data }) {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-tint">
      <div className="container-page">
        <Reveal className="max-w-3xl mb-12">
          <h2 className="t-h2 text-ink mb-5">{data.title}</h2>
          <p className="t-body">{data.lead}</p>
        </Reveal>

        {/* A ruled list, not six bordered cards. As cards this ran 814px —
            two rows of boxes, each padded 32px, each with its own border, to
            carry one sentence. The card was adding a frame around content that
            did not need framing. Same six entries, same words, roughly half
            the height, and the route now sits inline with the description
            rather than pinned to the foot of a stretched box. */}
        <Reveal amount={0.1}>
          {/* Three columns at lg, not two: six entries over two columns is
              three rows, which gave back most of the height the card padding
              had just saved (measured — the first pass cut only 83px). */}
          <dl className="m-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 border-t border-hairline pt-8">
            {data.items.map((p) => (
              <div key={p.title}>
                <dt className="t-h4 text-ink mb-1.5">{p.title}</dt>
                <dd className="m-0">
                  <span className="t-body block">{p.text}</span>
                  <span className="t-label-sm block mt-2 !text-primary-600">{p.route}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* Editorial rather than a grid of equals: one tall image carrying the human
   subject, two landscapes stacked beside it. */
function Gallery({ data }) {
  const [lead, ...rest] = data.images;
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="container-page">
        <Reveal className="max-w-3xl mb-12">
          <h2 className="t-h2 text-ink mb-5">{data.title}</h2>
          <p className="t-body">{data.lead}</p>
        </Reveal>

        {/* Heights are CAPPED here, and this is the one place on the site
            that crops. Measured before: 1,500px of page — two full screens —
            carrying 44 words, the worst content-to-height ratio on the page,
            because a 1000x1500 portrait and two 1200x800 landscapes were all
            rendering at their natural aspect inside a 12-column grid.

            The house rule is natural aspect and no object-cover, and it holds
            for the hero and the feature photographs, where the subject is the
            point. These three are a mood strip: they establish that Canada is
            cities AND landscape, and a crop costs that nothing. One row, one
            height, roughly 3:2 — which is also what makes them read as a set
            rather than as three unrelated pictures. */}
        <Reveal amount={0.1} className="grid gap-5 sm:grid-cols-3">
          {[lead, ...rest].map((im) => (
            <figure key={im.caption} className="m-0">
              <img
                src={im.src}
                alt={im.alt}
                className="block w-full h-[220px] lg:h-[300px] object-cover"
              />
              <figcaption className="t-label-sm mt-4">{im.caption}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* Native <details>, same as the programme FAQ. Used for both the eligibility
   factors and the FAQ, because they are the same object: a question and an
   answer the reader opens only if it applies to them. */
function Accordion({ rows }) {
  return (
    <div className="border-t border-hairline">
      {rows.map((r) => (
        <details key={r.q} className="group border-b border-hairline">
          <summary className="flex items-start justify-between gap-8 py-6 cursor-pointer list-none">
            <h3 className="t-h4 font-normal leading-[1.55] text-ink">{r.q}</h3>
            <span aria-hidden="true" className="faq-marker relative shrink-0 mt-2 w-3.5 h-3.5 text-ink/70">
              <span className="absolute left-0 top-1/2 w-full h-[1.5px] -translate-y-1/2 bg-current" />
              <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-current" />
            </span>
          </summary>
          <p className="t-body pb-6">{r.a}</p>
        </details>
      ))}
    </div>
  );
}

function Factors({ data }) {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-white border-t border-hairline">
      <div className="container-page grid lg:grid-cols-12 gap-x-14 gap-y-10">
        <Reveal className="lg:col-span-5">
          <h2 className="t-h2 text-ink mb-5">{data.title}</h2>
          <p className="t-body">{data.lead}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <Accordion rows={data.groups} />
        </Reveal>
      </div>
    </section>
  );
}

function Documents({ data }) {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-offwhite">
      <div className="container-page">
        <Reveal className="max-w-3xl mb-12">
          <h2 className="t-h2 text-ink mb-5">{data.title}</h2>
          <p className="t-body">{data.lead}</p>
        </Reveal>
        <Reveal amount={0.1}>
          <dl className="m-0 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {data.items.map((d) => (
              <div key={d.title} className="border-t border-hairline pt-5">
                <dt className="t-h4 text-ink mb-2">{d.title}</dt>
                <dd className="t-body m-0">{d.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function CountryFaqs({ faqs }) {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="container-page">
        <div className="lg:w-[calc(60%-15px)]">
          <Reveal>
            <h2 className="t-h2 text-ink mb-10">Frequently Asked Questions</h2>
          </Reveal>
          <Reveal amount={0.1}>
            <Accordion rows={faqs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ data }) {
  return (
    <section className="relative bg-white">
      <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-0 right-1/2 bg-primary" />
      <div className="relative container-page grid lg:grid-cols-2">
        <Reveal className="bg-primary lg:bg-transparent -mx-6 px-6 py-14 lg:mx-0 lg:px-0 lg:py-24 lg:pr-20">
          <h2 className="t-h2 !text-white mb-6">{data.title}</h2>
          <p className="t-body !text-white/85 mb-10">{data.text}</p>
          <div className="flex flex-wrap gap-4">
            <Link to={data.primary.to} className="btn-light">
              {data.primary.label} <FaArrowRight />
            </Link>
            <Link to={data.secondary.to} className="btn-outline-light">
              {data.secondary.label} <FaAngleRight className="text-xs" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function CountryDetail() {
  const { slug } = useParams();
  const country = getCountry(slug);

  // an unknown slug is a dead URL, not an empty page
  if (!country) return <Navigate to="/" replace />;

  const {
    name, Flag, img, lede, intro, sections, audience, regulated, official, closing,
    /* the opt-in destination-page keys — Canada only, for now */
    hero, quickFacts, whyCountry, pathways, process, profiles, gallery,
    factors, documents, faqs, finalCta,
  } = country;

  return (
    <>
      {/* A country with a `hero` gets the split header instead of the banner.
          Without one, nothing below this line changes for it. */}
      {hero ? (
        <CountryHero hero={hero} name={name} Flag={Flag} />
      ) : (
        <PageTitle
          title={name}
          /* countryPages carried a photo for Canada and the UK only, so India,
             Australia and New Zealand opened on the flat navy field while their
             two siblings opened on a photograph. Every country has a skyline
             now — see src/data/banners.js. */
          image={countryBanners[slug] ?? img ?? undefined}
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Countries", to: `/countries/${countryPages[0].slug}` },
            { label: name },
          ]}
        />
      )}

      {/* ---- the destination sequence ------------------------------------
          Why -> what exists -> how it runs -> which one
          is me -> what life looks like -> what gets assessed -> what to
          gather -> questions -> act. Each renders only if its key exists. */}
      {quickFacts && <QuickFacts facts={quickFacts} />}
      {whyCountry && <WhyCountry data={whyCountry} />}
      {pathways && <Pathways data={pathways} />}
      {process && <Process data={process} />}
      {profiles && <Profiles data={profiles} />}
      {gallery && <Gallery data={gallery} />}
      {factors && <Factors data={factors} />}
      {documents && <Documents data={documents} />}
      {faqs && <CountryFaqs faqs={faqs} />}
      {finalCta && <FinalCta data={finalCta} />}

      {/* ---- intro ----
          Skipped where a `hero` exists. On Canada this block was rendering a
          second opener 12 sections after the first: the same two paragraphs
          the hero lede now covers, plus a "Who We Support" panel whose list is
          business-audience content belonging to the market-entry half. It
          measured 780px, and its heading repeated the page's own lede. */}
      {!hero && (
      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-10 items-end pb-14 mb-14 border-b border-hairline">
            <Reveal className="lg:col-span-7">
              <div className="flex items-center gap-5 mb-7">
                <Flag
                  title={name}
                  className="w-12 h-8 object-cover ring-1 ring-ink/10"
                />
                <div className="eyebrow !mb-0">
                  <span className="chev">»</span> International Reach
                </div>
              </div>
              <WordsSlideUp text={lede} className="t-h2 text-ink" />
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <Link to="/contact" className="btn-primary">
                Book a Confidential Consultation <FaArrowRight />
              </Link>
            </Reveal>
          </div>

          <Reveal className="grid lg:grid-cols-12 gap-x-16 gap-y-8">
            <div className="lg:col-span-8 space-y-6">
              {intro.map((p) => (
                <p key={p.slice(0, 40)} className="t-body">
                  {p}
                </p>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-offwhite p-8">
                <h2 className="t-h4 text-ink mb-5">Who We Support</h2>
                <ul className="space-y-2.5">
                  {audience.map((a) => (
                    <li key={a} className="flex items-start gap-3 t-body">
                      <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-ink/25 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      )}

      {/* ---- one block per section in the source document ---- */}
      {sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          /* Every section is white now and separated by a hairline, rather
             than alternating white / tinted. The client asked for a "glossy
             white" ground, and the alternation was also doing the page no
             favours: a tinted band plus 96px of padding either side made each
             seam read as a gap between two documents instead of a rule
             between two sections of one. The first section needs no rule —
             the intro block above it already ends on one. */
          className={`py-14 md:py-20 lg:py-24 scroll-mt-28 bg-white${i === 0 ? "" : " border-t border-hairline"}`}
        >
          <div className="container-page">
            <Reveal className="max-w-3xl mb-12">
              <h2 className="t-h2 text-ink mb-5">{s.title}</h2>
              {s.lead && <p className="t-body">{s.lead}</p>}
            </Reveal>

            <Reveal amount={0.15}>
              {s.cards && <Cards cards={s.cards} />}
              {s.groups && <Groups groups={s.groups} />}
              {s.steps && <Steps steps={s.steps} />}
              {s.items && <Items items={s.items} />}

              {s.note && (
                <p className="t-body mt-9 max-w-4xl border-l-2 border-primary pl-6">
                  {s.note}
                </p>
              )}

              {/* Canada's Strategy → Growth strip */}
              {s.journey && (
                <div className="mt-12 border border-hairline bg-white">
                  <div className="grid sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
                    {s.journey.map((step, n) => (
                      <div key={step} className="px-6 py-7 text-center">
                        <span className="t-num text-sm text-muted block mb-2">
                          0{n + 1}
                        </span>
                        <span className="t-label text-ink">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                  {s.journeyNote && (
                    <p className="t-body px-8 py-7 border-t border-hairline">
                      {s.journeyNote}
                    </p>
                  )}
                </div>
              )}

              {/* Canada's "One Coordinated Point of Contact" and Australia's
                  "A More Connected Immigration Experience". Both documents
                  close their service list with the same move — name the mess
                  of separate professionals a client would otherwise manage,
                  then offer coordination as the answer — and neither block
                  had made it onto the site. It is the argument the rest of
                  the page is evidence for, so it is worth its own panel. */}
              {s.coordinated && (
                <div className="mt-12 bg-offwhite p-9 lg:p-12 max-w-4xl">
                  <h3 className="t-h3 text-ink mb-6">{s.coordinated.title}</h3>
                  <div className="space-y-5">
                    {s.coordinated.body.map((p) => (
                      <p key={p.slice(0, 40)} className="t-body">
                        {p}
                      </p>
                    ))}
                  </div>
                  {s.coordinated.tagline && (
                    <p className="t-h4 text-ink mt-8 pt-7 border-t border-hairline">
                      {s.coordinated.tagline}
                    </p>
                  )}
                </div>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      <RegulatedPartner data={regulated} />

      {/* ---- official sources, where the document asks for it ---- */}
      {official && (
        <section className="py-14 md:py-20 lg:py-24 bg-white">
          <div className="container-page">
            <Reveal className="border border-hairline bg-offwhite p-9 lg:p-11 max-w-4xl">
              <h2 className="t-h4 text-ink mb-4">{official.title}</h2>
              <p className="t-body mb-6">{official.text}</p>
              <a
                href={official.url}
                target="_blank"
                rel="noreferrer noopener"
                className="link-arrow"
              >
                {official.label} <FaExternalLinkAlt />
              </a>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---- closing + sideways navigation ---- */}
      <section className="py-14 md:py-20 lg:py-24 bg-white border-t border-hairline">
        <div className="container-page grid lg:grid-cols-12 gap-x-16 gap-y-12">
          <Reveal className="lg:col-span-7">
            <h2 className="t-h3 text-ink mb-6">{name} Starts With a Conversation</h2>
            <p className="t-lead text-ink border-l-2 border-primary pl-6 mb-9">{closing}</p>
            <Link to="/contact" className="btn-primary">
              Book a Confidential Consultation <FaArrowRight />
            </Link>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="lg:col-span-5">
            <h2 className="t-h4 text-ink mb-6">Other Countries</h2>
            <ul className="divide-y divide-hairline border-y border-hairline">
              {countryPages
                .filter((c) => c.slug !== slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/countries/${c.slug}`}
                      className="group flex items-center gap-4 py-4 text-ink font-heading font-medium hover:text-primary transition-colors"
                    >
                      <c.Flag
                        title={c.name}
                        className="w-8 h-[21px] object-cover ring-1 ring-ink/10 shrink-0"
                      />
                      {c.name}
                      <FaAngleRight className="text-xs text-primary ml-auto transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
