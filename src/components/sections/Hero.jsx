import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { heroFeatures, heroFacts } from "@/data/heroFeatures";
import { heroSlides } from "@/data/heroSlides";
import { homeIntro } from "@/data/pillars";

const SLIDE_INTERVAL = 6000;

/* The skyline is the hero's backdrop, not a strip underneath it.
 *
 * An earlier pass put the copy on plain white and ran the photographs as a
 * separate 420px band below. That kept the page white but it read as two
 * blocks — a headline, then a picture — instead of one hero, and it forced a
 * 3.6:1 crop on panoramas that are natively 2.0-2.6:1, throwing away a third
 * of every frame.
 *
 * Full-bleed behind the whole hero, the image sits at roughly 2.4:1: almost
 * its native shape, so the crop is slight. The page still reads white because
 * a white scrim covers the copy side — horizontal from md up, where there is
 * room for a column of type beside the skyline, and vertical below that, where
 * there is not. Navy type on white throughout; nothing is set over the photo.
 */
export default function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative bg-white">
      {/* This wrapper is what the backdrop is measured against: it holds the
          photo and the copy, and stops --card-overlap short of the section
          bottom so the feature cards below straddle the image's bottom edge. */}
      <div className="relative">
        {/* ---- backdrop ----
            `isolate` traps the slide z-indexes (0/1) and the scrims (10) in
            here; without it they escape and paint over the headline. */}
        <div className="absolute inset-x-0 top-0 bottom-0 md:bottom-[var(--card-overlap)] isolate overflow-hidden">
          {/* Plain CSS transitions, not framer-motion.
              The crossfade used to be a motion.img animating opacity, and it
              silently stopped working: the dots advanced (a className swap,
              which needs no animation frame) while every image stayed at the
              opacity it started on. framer drives its animations from
              requestAnimationFrame, and rAF is deferred in a throttled tab —
              the same failure that left the headline and the header invisible
              earlier. A CSS opacity transition is handled by the compositor and
              keeps running regardless.

              Only the incoming slide fades. Fading both at once leaves the pair
              semi-transparent through the middle of the transition and the
              white page shows through, so the outgoing one holds at full
              opacity underneath and is dropped in a single step once the new
              one is solid — that is what the 0ms/1400ms delay does. */}
          {heroSlides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              /* objectPosition travels with the slide — the three frames are
                 composed differently. See heroSlides.js. */
              style={{
                objectPosition: s.position,
                opacity: i === slide ? 1 : 0,
                zIndex: i === slide ? 1 : 0,
                transition:
                  i === slide ? "opacity 1400ms ease-in-out" : "opacity 0ms linear 1400ms",
              }}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}

          {/* ---- scrim ----
              This was a WHITE ramp that went opaque across the left half, and
              it walled off most of the photograph — half the hero was a blank
              white panel. The scrim is navy now: the skyline reads edge to
              edge, just darker under the type, and the copy is set in white
              over it. (Latitude's hero does exactly this over a panoramic
              London cityscape.) Only the hero is dark; every other section on
              the site stays white.

              The alpha is not a guess. Two of the three slides are blue-hour
              and dark, but Edinburgh is bright daylight — pale stone under a
              blue sky, luminance ~0.59 — and white type has to clear 4.5:1 on
              ALL of them. Measured against that worst case:
                 0.70 -> 4.41  FAIL
                 0.75 -> 5.01  pass
                 0.82 -> 6.3   pass, with margin
              So the copy zone holds 0.85 out to the 50% mark, which is where
              the max-w-2xl column ends, then falls to 0.10 so the right of the
              frame is essentially the photograph.

              BOTH numbers in these classes move in fives. Stop positions
              (`via-50%`) and opacity modifiers (`via-ink/85`) are each on a
              5-step scale, and an off-scale value generates NO rule at all —
              it does not round, it silently disappears. The first version of
              this line used /88, /82 and /12; every one of them was dropped,
              the whole gradient resolved to `background-image: none`, and the
              white headline ended up sitting on an undimmed daylight
              photograph. Check the compiled CSS if a gradient ever vanishes. */}

          {/* Phone: the copy is the full width, so the ramp runs top-to-bottom
              instead and the skyline keeps the lower part of the frame. */}
          <div className="md:hidden absolute inset-0 z-10 bg-gradient-to-b from-ink/90 from-0% via-ink/85 via-55% to-ink/30 to-100%" />

          <div className="hidden md:block absolute inset-0 z-10 bg-gradient-to-r from-ink/90 from-0% via-ink/85 via-50% to-ink/10 to-95%" />

          <div className="absolute z-20 right-6 bottom-6 flex gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setSlide(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === slide ? "w-8 bg-primary" : "w-1.5 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ---- copy ----
            Deliberately NOT animated. These elements used to mount at opacity 0
            and be faded in by framer-motion, which meant the headline was
            invisible until a JS frame ran — in a throttled tab that frame can
            be deferred long enough that the top of the page renders blank. It
            is also the LCP element, and neither reference firm animates its
            headline. */}
        <div className="relative max-w-[1400px] mx-auto px-6">
          {/* Type is white now that it sits on the photograph. The utility
              classes below override the colours .eyebrow / .t-lead / .t-num set
              in @layer components — Tailwind's utilities layer wins over
              components, so no !important is needed. */}
          <div className="max-w-2xl pt-[calc(var(--nav-clear)+32px)] md:pt-[calc(var(--nav-clear)+52px)] pb-12 md:pb-[calc(var(--card-overlap)+72px)]">
            {/* headline and standfirst are the homepage block from
                Cynosure_Website_Layout_Pattern.docx, verbatim */}
            <div className="eyebrow text-white/75 mb-7">
              <span className="chev">»</span> Global Mobility Advisory
            </div>

            <h1 className="t-display text-white mb-7">{homeIntro.title}</h1>

            <p className="t-lead text-white/85 mb-9">{homeIntro.lead}</p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-11">
              {/* the gold button already carries navy type — it reads the same
                  on a dark ground as on a light one, so it is unchanged */}
              <Link to="/contact" className="btn-primary">
                Book a Confidential Consultation <FaArrowRight />
              </Link>
              <Link
                to="/global-immigration"
                className="inline-flex items-center gap-2 font-heading font-medium text-[13px] uppercase tracking-[0.16em] text-white border-b border-primary pb-1.5 hover:gap-3.5 transition-all duration-300"
              >
                Where We Work
              </Link>
            </div>

            {/* Credentials sit under the copy rather than in a right-hand
                column: that side is the photograph. Both reference firms open
                with figures like these (Henley 70+ offices / 25+ years,
                Latitude 10 years / 12 offices). */}
            <dl className="grid grid-cols-3 border-t border-white/25 pt-6">
              {heroFacts.map((f) => (
                <div key={f.label} className="pr-4">
                  <dt className="t-num text-3xl text-white leading-none mb-2">{f.value}</dt>
                  <dd className="text-white/65 text-[11px] uppercase tracking-[0.16em] leading-snug">
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ---- feature cards, straddling the image's bottom edge ---- */}
      <div className="relative bg-white pb-12 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 md:-mt-[var(--card-overlap)] pt-8 md:pt-0">
            {/* Static too. These sat at opacity 0 until a mount animation ran,
                and they are in the first viewport — the same rAF exposure as
                the slides above. Three small cards do not need an entrance. */}
            {heroFeatures.map((card) => (
              <div key={card.title} className="feature-block">
                <div className="inner-box">
                  <div className="icon">
                    <card.icon />
                  </div>
                  <div className="content">
                    <h3 className="title">{card.title}</h3>
                    <p className="text">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
