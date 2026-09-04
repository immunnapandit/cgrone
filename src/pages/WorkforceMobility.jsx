import { Link } from "react-router-dom";
import { FaArrowRight, FaAngleRight } from "react-icons/fa";
import PageTitle from "@/components/sections/PageTitle";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import StatementBand from "@/components/sections/StatementBand";
import { workforceHub as d } from "@/data/workforceMobility";
import { skylines } from "@/data/banners";

/* Pillar 3 hub. Healthcare and Hospitality link out to their own pages;
   Skilled Technical Workforce does not, because the client has not written a
   document for it yet — it is a card here and nothing more. */
export default function WorkforceMobility() {
  return (
    <>
      <PageTitle
        title={d.title}
        image={skylines.london}
        crumbs={[{ label: "Home", to: "/" }, { label: d.title }]}
      />

      <section className="py-14 md:py-20 lg:py-24 bg-white">
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

      <section className="py-14 md:py-20 lg:py-24 bg-white border-t border-hairline">
        <div className="max-w-[1400px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-10">
            <h2 className="t-h2 text-ink">{d.focusTitle}</h2>
          </Reveal>

          <Reveal amount={0.15}>
            <div className="grid md:grid-cols-3 gap-5">
              {d.focus.map(({ slug, icon: Icon, title, text }) => {
                const body = (
                  <>
                    <span className="w-14 h-14 mb-7 flex items-center justify-center text-2xl text-ink border border-hairline">
                      <Icon />
                    </span>
                    <h3 className="t-h3 text-ink mb-3">{title}</h3>
                    <p className="t-body">{text}</p>
                  </>
                );
                return slug ? (
                  <Link
                    key={title}
                    to={`/workforce-mobility/${slug}`}
                    className="group bg-white border border-hairline p-8 lg:p-10 flex flex-col hover:bg-offwhite transition-colors"
                  >
                    {body}
                    <span className="mt-7 inline-flex items-center gap-1.5 text-ink font-heading font-semibold text-[12px] uppercase tracking-[0.16em] border-b-2 border-primary pb-1.5 self-start group-hover:gap-3 transition-all">
                      Read More <FaAngleRight className="text-xs" />
                    </span>
                  </Link>
                ) : (
                  <div key={title} className="bg-white border border-hairline p-8 lg:p-10 flex flex-col">
                    {body}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <StatementBand
        image={skylines.toronto}
        position="55% 70%"
        eyebrow="For Employers and International Talent"
        line="Your people move. We manage the journey."
      />

      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-x-16 gap-y-10">
          <Reveal className="lg:col-span-5">
            <h2 className="t-h2 text-ink">{d.approachTitle}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="space-y-5 mb-10">
              {d.approach.map((p) => (
                <p key={p.slice(0, 40)} className="t-body">
                  {p}
                </p>
              ))}
            </div>

            <dl className="grid sm:grid-cols-2 gap-5 mb-10">
              {d.audiences.map((a) => (
                <div key={a.label} className="bg-white border border-hairline p-7">
                  <dt className="font-heading font-medium text-[12px] uppercase tracking-[0.18em] text-muted mb-2">
                    {a.label}
                  </dt>
                  <dd className="t-h4 text-ink">{a.text}</dd>
                </div>
              ))}
            </dl>

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
