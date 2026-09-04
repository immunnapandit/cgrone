import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { whyChooseUsPerks, whyChooseUsFacts } from "@/data/whyChooseUs";

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="outer-box">
          <div className="grid lg:grid-cols-2">
            {/* navy panel — left on desktop, but second in the source so the
                copy is read first on narrow screens */}
            <Reveal direction="right" className="features-column order-2 lg:order-1">
              {/* The backdrop here was testimonial-map.png at 0.2 opacity — a
                  world map with three aeroplane silhouettes and dashed flight
                  paths arcing across it, plainly legible over the navy. That
                  is the travel-agency motif this site removed from the About
                  section for exactly the same reason ("an advisory firm does
                  not animate aeroplanes"); it had simply been missed here and
                  in Services. The panel carries its own colour. */}
              <div className="inner-column">
                <div className="title-box relative">
                  <WordsSlideUp
                    text="A structured approach to cross-border expansion"
                    className="t-h3 title"
                  />
                </div>

                {whyChooseUsPerks.map((p) => (
                  <div key={p.title} className="why-choose-block">
                    <div className="inner-box">
                      <div className="icon">
                        <p.icon />
                      </div>
                      <div className="content-box">
                        <h3 className="t-h5 title">{p.title}</h3>
                        <div className="text">{p.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal
              direction="left"
              delay={0.1}
              className="content-column order-1 lg:order-2"
            >
              <div className="inner-column">
                <div className="eyebrow mb-3">
                  <span className="chev">»</span> Why Cynosure
                </div>
                <WordsSlideUp
                  text="Advisory built on two decades of international experience"
                  className="t-h2 text-ink"
                />
                <p className="t-body mt-7 mb-9">
                  Rather than a one-size-fits-all solution, we first understand
                  the objective, circumstances and long-term vision of each
                  client — and then develop a strategy around it, connecting you
                  with regulated professionals at every stage.
                </p>

                {/* Replaced the old 95%/90% progress bars: invented percentages
                    read as template filler on an advisory site. These are two
                    plain, checkable facts instead. */}
                <dl className="border-t border-hairline">
                  {whyChooseUsFacts.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-baseline gap-6 py-3.5 sm:py-5 border-b border-hairline"
                    >
                      <dt className="t-num text-3xl text-ink leading-none shrink-0 w-28">
                        {f.value}
                      </dt>
                      <dd className="text-muted text-[13px] uppercase tracking-[0.16em] leading-snug">
                        {f.label}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="#contact"
                  className="mt-9 inline-flex items-center gap-2 font-heading font-semibold text-[13px] uppercase tracking-[0.16em] text-ink border-b-2 border-primary pb-1.5 hover:gap-3.5 transition-all duration-300"
                >
                  Book a Confidential Consultation <FaArrowRight className="text-xs" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
