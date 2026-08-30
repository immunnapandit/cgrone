import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { aboutHighlights, aboutBulletPoints } from "@/data/aboutContent";
import aboutImage from "@/assets/images/about/About1.webp";

/* The dotted flight path with a paper plane looping along it used to sit in
   the top-right of this section. It was the clearest travel-agency cue on the
   page, so it is gone — an advisory firm does not animate aeroplanes. */
export default function About() {
  return (
    <section id="about" className="relative py-14 md:py-20 lg:py-24 bg-white overflow-hidden scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="left" className="relative">
          <div className="relative pl-6 border-l-2 border-primary">
            <img
              src={aboutImage}
              alt="Traveler with passport"
              className="block w-full max-w-[500px] h-[320px] md:h-[440px] lg:h-[560px] object-cover object-top"
            />
          </div>
          {/* A floating white card hung off the bottom-left corner here,
              carrying the globe and handshake icons — the same two icons the
              highlight tiles show in full, with labels, 400px to the right.
              Unlabelled duplicates of adjacent content are decoration, and it
              overhung the section's left edge into the page margin. Removed. */}
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
            {aboutHighlights.map(({ icon: Icon, title }) => (
              <div key={title.join(" ")} className="flex items-center gap-4">
                {/* Both tiles take the same treatment. The first used to be a
                    solid navy fill and the second a hairline outline, sitting
                    side by side — which reads as one of them being in a state
                    rather than as a deliberate pair. This matches the hero
                    feature cards, so icon boxes look the same sitewide. */}
                <div className="w-14 h-14 border border-hairline text-ink flex items-center justify-center text-xl">
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

          {/* Each of these three lines used to carry a filled navy disc with a
              white arrow in it. An arrow means "go here", and none of them go
              anywhere — they are statements, not links, so the marker was
              decoration that also read as a broken control. Hairline rules
              instead, matching the capability lists on the pillar cards. */}
          <ul className="mb-9 border-t border-hairline">
            {aboutBulletPoints.map((t) => (
              <li
                key={t}
                className="border-b border-hairline py-3.5 text-ink font-medium text-[17px]"
              >
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
