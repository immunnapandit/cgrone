import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck, FaAngleRight } from "react-icons/fa";
import PageTitle from "@/components/sections/PageTitle";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import StatementBand from "@/components/sections/StatementBand";
import { investmentMigration as d } from "@/data/investmentMigration";
import { skylines } from "@/data/banners";

/* Pillar 1 — see src/data/investmentMigration.js for the sourcing note.
   No investment thresholds, fees or timelines appear here: the source
   document asks for concise programme descriptions and says the numbers come
   after an enquiry and profile assessment. */
export default function InvestmentMigration() {
  return (
    <>
      <PageTitle
        title={d.title}
        image={skylines.edinburgh}
        crumbs={[{ label: "Home", to: "/" }, { label: d.title }]}
      />

      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-10 items-end pb-12 mb-12 border-b border-hairline">
            <Reveal className="lg:col-span-7">
              <div className="eyebrow mb-6">
                <span className="chev">»</span> Investment & Business Migration
              </div>
              <WordsSlideUp text={d.lede} className="t-h2 text-ink" />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <Link to="/contact" className="btn-primary">
                Book a Confidential Consultation <FaArrowRight />
              </Link>
            </Reveal>
          </div>

          <Reveal className="max-w-3xl space-y-5">
            {d.intro.map((p) => (
              <p key={p.slice(0, 40)} className="t-body">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {d.sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          /* White throughout, hairline between — same as CountryDetail. The
             alternating tint made each of the three programme sections look
             like a separate page. */
          className={`py-14 md:py-20 lg:py-24 scroll-mt-28 bg-white${i === 0 ? "" : " border-t border-hairline"}`}
        >
          <div className="max-w-[1400px] mx-auto px-6">
            <Reveal className="max-w-3xl mb-10">
              <h2 className="t-h2 text-ink mb-5">{s.title}</h2>
              <p className="t-body">{s.lead}</p>
            </Reveal>

            <Reveal amount={0.15}>
              {/* sans, not the serif t-h4 this used to be: Garamond set small,
                  uppercase and tracked out is the one thing an old-style serif
                  is worst at */}
              {s.groupTitle && (
                <p className="font-heading font-medium text-[12px] uppercase tracking-[0.18em] text-soft mb-6">
                  {s.groupTitle}
                </p>
              )}

              {s.cards && (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {s.cards.map((c) => (
                    <article key={c.title} className="bg-white border border-hairline p-7 lg:p-9">
                      {/* the flag identifies the programme at a glance — this
                          is how Latitude presents its programme grids, and it
                          turns a list of names into something scannable */}
                      {c.Flag && (
                        <c.Flag
                          title={c.title}
                          className="w-11 h-[29px] object-cover rounded-[2px] ring-1 ring-ink/10 mb-6"
                        />
                      )}
                      {/* h3, not h4: the section heading above is an h2 and
                          the group label is a label rather than a heading, so
                          h4 skipped a level. Styling comes from .t-h4, not the
                          tag, so nothing moves. */}
                      <h3 className="t-h4 text-ink mb-3">{c.title}</h3>
                      <p className="t-body text-base">{c.text}</p>
                    </article>
                  ))}
                </div>
              )}

              {s.items && (
                <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-4 text-ink text-[17px]">
                      <span className="w-6 h-6 mt-1 rounded-full bg-ink text-white flex items-center justify-center text-[10px] shrink-0">
                        <FaCheck />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              )}

              {s.links && (
                <ul className="mt-10 divide-y divide-hairline border-y border-hairline max-w-2xl">
                  {s.links.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="group flex items-center gap-4 py-4 text-ink font-heading font-medium hover:text-primary transition-colors"
                      >
                        {l.label}
                        <FaAngleRight className="text-xs text-primary ml-auto transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {s.note && (
                <p className="t-body text-base mt-9 max-w-4xl border-l-2 border-primary pl-6">
                  {s.note}
                </p>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      <StatementBand
        image={skylines.london}
        position="60% 50%"
        eyebrow="Investment & Business Migration"
        line="An investment route is a means, not the objective. We start with where you want to end up."
        cta={{ to: "/contact", label: "Discuss your objectives" }}
      />

      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <Reveal className="max-w-3xl">
            <p className="t-lead text-ink border-l-2 border-primary pl-6 mb-9">{d.closing}</p>
            <Link to="/contact" className="btn-primary">
              Book a Confidential Consultation <FaArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
