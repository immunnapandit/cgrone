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

export default function CountryDetail() {
  const { slug } = useParams();
  const country = getCountry(slug);

  // an unknown slug is a dead URL, not an empty page
  if (!country) return <Navigate to="/" replace />;

  const { name, Flag, img, lede, intro, sections, audience, regulated, official, closing } =
    country;

  return (
    <>
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

      {/* ---- intro ---- */}
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
