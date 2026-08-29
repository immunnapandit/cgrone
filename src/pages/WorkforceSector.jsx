import { Navigate, useParams, Link } from "react-router-dom";
import { FaArrowRight, FaAngleRight } from "react-icons/fa";
import PageTitle from "@/components/sections/PageTitle";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import StatementBand from "@/components/sections/StatementBand";
import { getWorkforceSector, workforceSectors } from "@/data/workforceMobility";
import edinburghImg from "@/assets/images/hero/skyline-edinburgh.webp";

/* Healthcare and Hospitality share a document structure — Who We Work With,
   a five-step approach, selected markets, an employers block and a closing
   CTA — so one component renders either. */
export default function WorkforceSector() {
  const { slug } = useParams();
  const d = getWorkforceSector(slug);

  // an unknown slug is a dead URL, not an empty page
  if (!d) return <Navigate to="/workforce-mobility" replace />;

  const others = Object.values(workforceSectors).filter((s) => s.slug !== slug);

  return (
    <>
      <PageTitle
        title={d.title}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Workforce Mobility", to: "/workforce-mobility" },
          { label: d.title },
        ]}
      />

      <section className="py-16 md:py-24 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-10 items-end pb-12 mb-12 border-b border-hairline">
            <Reveal className="lg:col-span-7">
              <div className="eyebrow mb-6">
                <span className="chev">»</span> Workforce Mobility
              </div>
              <WordsSlideUp text={d.lede} className="t-h2 text-ink" />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <Link to="/contact" className="btn-primary">
                {d.cta} <FaArrowRight />
              </Link>
            </Reveal>
          </div>

          <Reveal className="grid lg:grid-cols-12 gap-x-16 gap-y-10">
            <div className="lg:col-span-7 space-y-5">
              {d.intro.map((p) => (
                <p key={p.slice(0, 40)} className="t-body">
                  {p}
                </p>
              ))}
            </div>

            <div className="lg:col-span-5">
              <div className="bg-offwhite p-8">
                <h2 className="t-h4 text-ink mb-5">{d.whoTitle}</h2>
                <ul className="space-y-2.5 mb-6">
                  {d.who.map((w) => (
                    <li key={w} className="flex items-start gap-3 t-body text-base">
                      <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-ink/25 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
                <p className="t-small">{d.whoNote}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- five-step approach ---- */}
      <section className="py-16 md:py-24 lg:py-28 bg-offwhite">
        <div className="max-w-[1400px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-10">
            <h2 className="t-h2 text-ink">Our Approach</h2>
          </Reveal>
          <Reveal amount={0.15}>
            <ol className="grid sm:grid-cols-2 xl:grid-cols-5 gap-5">
              {d.steps.map((s) => (
                <li key={s.n} className="bg-white border border-hairline p-7 lg:p-8">
                  <span className="font-heading font-semibold text-[11px] uppercase tracking-[0.2em] text-soft">
                    {s.n}
                  </span>
                  <p className="t-body text-base mt-4">{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <StatementBand
        image={edinburghImg}
        position="55% 35%"
        eyebrow="Workforce Mobility"
        line={d.closing}
        cta={{ to: "/contact", label: d.cta }}
      />

      {/* ---- markets ---- */}
      <section className="py-16 md:py-24 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-x-16 gap-y-10">
          <Reveal className="lg:col-span-5">
            <h2 className="t-h2 text-ink">{d.marketsTitle}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="flex flex-wrap gap-2 mb-8">
              {d.markets.map((m) => (
                <span
                  key={m.name}
                  className="flex items-center gap-3 border border-hairline text-ink font-heading font-medium text-[13px] uppercase tracking-[0.14em] pl-3 pr-4 py-2.5"
                >
                  <m.Flag
                    title={m.name}
                    className="w-7 h-[18px] object-cover rounded-[2px] ring-1 ring-ink/10"
                  />
                  {m.name}
                </span>
              ))}
            </div>
            <p className="t-body">{d.marketsNote}</p>
          </Reveal>
        </div>
      </section>

      {/* ---- employers ---- */}
      <section className="py-16 md:py-24 lg:py-28 bg-offwhite border-y border-hairline">
        <div className="max-w-[1400px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-9">
            <h2 className="t-h2 text-ink mb-5">{d.employers.title}</h2>
            <p className="t-body">{d.employers.text}</p>
          </Reveal>
          <Reveal amount={0.15}>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {d.employers.chain.map((step, i) => (
                <div key={step} className="bg-white border border-hairline px-6 py-7 text-center">
                  <span className="t-num text-sm text-soft block mb-2">0{i + 1}</span>
                  <span className="font-heading font-medium text-[13px] uppercase tracking-[0.14em] text-ink">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- closing ---- */}
      <section className="py-16 md:py-24 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-x-16 gap-y-12">
          <Reveal className="lg:col-span-7">
            <h2 className="t-h3 text-ink mb-6">{d.closing}</h2>
            <p className="t-body mb-9">{d.closingText}</p>
            <Link to="/contact" className="btn-primary">
              {d.cta} <FaArrowRight />
            </Link>
            <p className="t-small mt-4">{d.ctaNote}</p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <h2 className="t-h4 text-ink mb-6">Other Sectors</h2>
            <ul className="divide-y divide-hairline border-y border-hairline">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/workforce-mobility/${o.slug}`}
                    className="group flex items-center gap-4 py-4 text-ink font-heading font-medium hover:text-primary transition-colors"
                  >
                    {o.title}
                    <FaAngleRight className="text-xs text-primary ml-auto transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/workforce-mobility"
                  className="group flex items-center gap-4 py-4 text-ink font-heading font-medium hover:text-primary transition-colors"
                >
                  All Workforce Mobility
                  <FaAngleRight className="text-xs text-primary ml-auto transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
