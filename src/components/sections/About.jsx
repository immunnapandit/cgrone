import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { aboutHighlights, aboutBulletPoints } from "@/data/aboutContent";
/* Was About1.webp — a smiling traveller at an airport departures board, the
   last piece of consumer stock left in the home page body. Passport.png is
   the client's own file: Canadian, Australian and New Zealand passports,
   three of the five jurisdictions this firm actually works in. Resized to
   1400px and re-encoded (2.91 MB PNG -> 324 KB webp); keep any replacement in
   that shape. */
import aboutImage from "@/assets/images/about/Passport.webp";

/* The dotted flight path with a paper plane looping along it used to sit in
   the top-right of this section. It was the clearest travel-agency cue on the
   page, so it is gone — an advisory firm does not animate aeroplanes. */
export default function About() {
  return (
    <section id="about" className="relative py-14 md:py-20 lg:py-24 bg-white overflow-hidden scroll-mt-28">
      {/* items-start, not items-center. Centering a 413px-tall image column
          against a ~640px text column pushed the photograph 101px below the
          eyebrow — an offset too small to read as intent and too large to read
          as alignment, and it left a conspicuous void at the top left. Aligned
          tops also put the left accent rule level with the eyebrow, which is
          what makes the asymmetry look measured rather than accidental. */}
      <div className="container-page grid lg:grid-cols-2 gap-16 items-start">
        <Reveal direction="left" className="relative">
          <div className="relative pl-6 border-l-2 border-primary">
            {/* The box matches the photograph's own ratio, so nothing is
                cropped. That is the point: the three passports sit side by
                side across a 3:2 frame, so any box taller than 3:2 eats them
                from the outside in. The fixed heights this replaces were
                560x300 / 560x380 / 560x460, and the desktop one was cutting
                9.4% off EACH side — the left edge of the Canadian cover and
                the fern on the New Zealand one.

                620px is the full width of this column (1352 content, less the
                64px grid gap, halved, less the 24px pl-6 above), so dropping
                the crop costs only about 47px of height against the old
                460. */}
            <img
              src={aboutImage}
              alt="Canadian, Australian and New Zealand passports"
              className="block w-full max-w-[620px] aspect-[3/2] object-cover"
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
                {/* text-2xl, not text-xl: the other three w-14 icon tiles on the
                    site (GlobalMobility, Contact, WorkforceMobility) are all
                    24px, and these two were the odd ones at 20px — which the
                    comment above already claimed they were not. Stroke glyphs
                    make the gap more obvious than filled ones did. */}
                <div className="w-14 h-14 border border-hairline text-ink flex items-center justify-center text-2xl">
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
