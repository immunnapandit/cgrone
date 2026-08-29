import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { corporateMobility } from "@/data/globalMobility";

/* Rebuilt from the client's Corporate Immigration & Global Mobility document.
   Employers and HR/mobility functions are the audience here, not individuals —
   which is why this stopped being a home-page section and became a page. */
export default function GlobalMobility() {
  const { eyebrow, heading, intro, supportTitle, support, extension, closing, closingSub, cta } =
    corporateMobility;

  return (
    <>
      <section id="global-mobility" className="py-16 md:py-24 lg:py-28 bg-white scroll-mt-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-10 items-end pb-14 mb-14 border-b border-hairline">
            <Reveal className="lg:col-span-7">
              <div className="eyebrow mb-6">
                <span className="chev">»</span> {eyebrow}
              </div>
              <WordsSlideUp text={heading} className="t-h2 text-ink" />
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="space-y-5">
                {intro.map((p) => (
                  <p key={p.slice(0, 40)} className="t-body">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="max-w-3xl mb-12">
            <h2 className="t-h3 text-ink">{supportTitle}</h2>
          </Reveal>

          <Reveal amount={0.15}>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {support.map(({ icon: Icon, title, text }, i) => (
                <article key={title} className="group bg-white border border-hairline p-9 lg:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="w-14 h-14 flex items-center justify-center text-2xl text-ink border border-hairline transition-colors duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-ink">
                      <Icon />
                    </span>
                    <span className="t-num text-3xl text-ink/10 leading-none transition-colors duration-300 group-hover:text-primary/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="t-h4 text-ink mb-3 md:min-h-[3.5rem]">{title}</h3>
                  <p className="t-body text-base">{text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-28 bg-offwhite border-y border-hairline">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-x-16 gap-y-10">
          <Reveal className="lg:col-span-5">
            <h2 className="t-h2 text-ink">{extension.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="space-y-6 mb-10">
              {extension.body.map((p) => (
                <p key={p.slice(0, 40)} className="t-body">
                  {p}
                </p>
              ))}
            </div>
            <p className="t-h3 text-ink mb-2">{closing}</p>
            <p className="t-body mb-9">{closingSub}</p>
            <Link to="/contact" className="btn-primary">
              {cta} <FaArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
