import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { aboutHighlights, aboutBulletPoints } from "@/data/aboutContent";
import aboutImage from "@/assets/images/about/About1.webp";

/* The dotted flight path with a paper plane looping along it used to sit in
   the top-right of this section. It was the clearest travel-agency cue on the
   page, so it is gone — an advisory firm does not animate aeroplanes. */
export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-24 lg:py-28 bg-white overflow-hidden scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="left" className="relative">
          <div className="relative pl-6 border-l-2 border-primary">
            <img
              src={aboutImage}
              alt="Traveler with passport"
              className="block w-full max-w-[500px] h-[320px] md:h-[440px] lg:h-[560px] object-cover object-top"
            />
          </div>
          {/* was a card bobbing up and down on a 3.5s loop — held still now */}
          <div className="absolute -bottom-8 -left-4 bg-white shadow-xl px-6 py-5 flex items-center gap-3">
            {aboutHighlights.map(({ icon: Icon }, i) => (
              <Icon key={i} className={i === 0 ? "text-ink text-3xl" : "text-ink text-2xl"} />
            ))}
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <div className="eyebrow mb-6">
            <span className="chev">»</span> About Cynosure
          </div>
          <h2 className="t-h2 text-ink mb-6">
            Experience. Perspective. Global Reach.
          </h2>
          <p className="t-body mb-9 max-w-xl">
            Cynosure Global Residency is an international advisory platform
            focused on immigration, global mobility, investment migration and
            cross-border opportunities. With decades of experience and a network
            of trusted professionals across jurisdictions, we help individuals,
            families and businesses make informed decisions about their
            international future.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {aboutHighlights.map(({ icon: Icon, title }, i) => (
              <div key={title.join(" ")} className="flex items-center gap-4">
                {/* the second tile used to be a dashed circle — the same
                    hand-drawn motif the process steps carried, and the last
                    one left on the page */}
                <div
                  className={
                    i === 0
                      ? "w-14 h-14 bg-ink text-white flex items-center justify-center text-xl"
                      : "w-14 h-14 border border-hairline text-ink flex items-center justify-center text-xl"
                  }
                >
                  <Icon />
                </div>
                <p className="t-h5 text-ink leading-snug">
                  {title[0]}
                  <br />
                  {title[1]}
                </p>
              </div>
            ))}
          </div>

          <ul className="space-y-3 mb-9">
            {aboutBulletPoints.map((t) => (
              <li key={t} className="flex items-center gap-3 text-ink font-medium text-[17px]">
                <span className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-xs">
                  <FaArrowRight />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <a href="#services" className="btn-primary">
            Read More <FaArrowRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
