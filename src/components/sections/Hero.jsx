import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { heroFeatures, heroFacts } from "@/data/heroFeatures";
import { heroSlides } from "@/data/heroSlides";
import { homeIntro } from "@/data/pillars";

const SLIDE_INTERVAL = 6000;

/* Two complete sets of copy styling, one per slide `tone`. See heroSlides.js
   for the measurements that decide which slide gets which: in short, Toronto
   is a night frame and takes white type, London and Edinburgh are bright and
   take navy. Every value in a set has to move together — swapping the text
   colour but leaving a white hairline or a white-filled button behind is how
   this ends up looking broken on one slide out of three. */
const TONES = {
  // white type, for a dark photograph
  light: {
    halo: "on-photo",
    haloSm: "on-photo-sm",
    eyebrow: "text-white/85",
    chev: "bg-white/70",
    heading: "text-white",
    body: "text-white",
    cta: "btn-light",
    link: "text-white border-white/60",
    rule: "border-white/40",
    label: "text-white",
  },
  // navy type, for a bright photograph
  dark: {
    halo: "on-photo-light",
    haloSm: "on-photo-light",
    eyebrow: "text-ink/80",
    chev: "bg-ink/70",
    heading: "text-ink",
    body: "text-ink",
    cta: "btn-primary",
    link: "text-ink border-ink/50",
    rule: "border-ink/35",
    label: "text-ink",
  },
};

/* Full-bleed photograph with the copy set directly on it. Nothing behind the
 * type — no panel, no scrim, no gradient, no filter.
 *
 * Three client notes, in order, and each one removed an option:
 *
 *   "hero images ko fade mat karo"            -> no ink/85 ramp
 *   "images full honi chahiye, jaise pehle"   -> no split into two columns
 *   "content ke piche blue background remove" -> no solid navy panel either
 *   "photo ke upar hona chahiye"              -> and the copy stays on the image
 *
 * That leaves exactly one way to keep white type legible, and it is not a
 * background of any kind: the PHOTOGRAPHS have to be dark where the type
 * sits. See heroSlides.js — the rotation is down to the two blue-hour frames
 * for that reason. `.on-photo` adds a text-shadow on top, which darkens only
 * the pixels immediately around each glyph and leaves the picture itself
 * untouched.
 *
 * If anyone is tempted to add a translucent layer back here for "just a bit"
 * of contrast: that is the fade, and it has now been rejected three times.
 * Change the photograph instead.
 */
export default function Hero() {
  const [slide, setSlide] = useState(0);
  const tone = TONES[heroSlides[slide].tone] ?? TONES.light;

  /* heroSlides is down to a single frame — see the measurement in that file.
     The rotation is kept rather than hard-coded away so that adding a night
     photograph back to the array is the only change needed to restore it. */
  useEffect(() => {
    if (heroSlides.length < 2) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative bg-white">
      {/* The height is pulled in two directions and 860 is where they meet.

          CONTRAST wants it tall. The sky is a fixed ~58% of the photograph, so
          a taller frame gives the fixed-height copy more dark pixels to sit
          on. Sampling the worst copy zone against the rendered image:
             762px -> 4.18:1 (fails AA)   860px -> 4.9   960px -> 5.4

          SHARPNESS wants it short. object-cover scales this 2400x1181 file by
          HEIGHT once the box passes 749px tall, so every pixel of height past
          that magnifies the picture. The magnification is (H / 1181) * DPR,
          and it crosses 1.0 — the point where the browser starts inventing
          pixels — at H = 945 on a 1.25 DPR display. At 960 the client called
          the result out as soft, and 960 is exactly where that crossing sits.

          940 is the last height that is still 1:1 or better on a standard
          display while keeping the copy high enough in the frame to clear AA.
          860 was tried and is sharper still, but it drops the CTA link to
          3.90:1 and the stats row into the lit towers.

          On a 2x screen this is magnified whatever we do here; the only fix
          for that is a larger source file — see heroSlides.js. */}
      <div className="relative flex lg:min-h-[940px]">
        {/* ---- photograph, full bleed ----
            `isolate` traps the slide z-indexes (0/1) in here; without it they
            escape and paint over the copy panel. */}
        <div className="absolute inset-0 isolate overflow-hidden">
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
              one is solid — that is what the 0ms/1400ms delay does. This is a
              crossfade BETWEEN two photographs; neither is ever dimmed. */}
          {heroSlides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              /* Two positions, handed to CSS as variables rather than set
                 directly, because they have to differ by breakpoint and an
                 inline object-position cannot be overridden by a media query.
                 `.hero-frame` picks between them. See heroSlides.js. */
              style={{
                "--hero-pos": s.position,
                "--hero-pos-sm": s.positionSm ?? s.position,
                opacity: i === slide ? 1 : 0,
                zIndex: i === slide ? 1 : 0,
                transition:
                  i === slide ? "opacity 1400ms ease-in-out" : "opacity 0ms linear 1400ms",
              }}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              draggable={false}
              className="hero-frame absolute inset-0 w-full h-full object-cover"
            />
          ))}

          {/* Hidden while there is one frame — a slide picker with a single
              slide is a control that does nothing. The only thing over the
              photo either way, and it covers 40x6px of it. */}
          {heroSlides.length > 1 && (
            <div className="absolute z-20 right-6 bottom-6 flex gap-2">
              {heroSlides.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setSlide(i)}
                  aria-label={`Show slide ${i + 1}`}
                  className={`h-1.5 rounded-full shadow-sm transition-all duration-300 ${
                    i === slide ? "w-8 bg-white" : "w-1.5 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ---- copy ----
            Deliberately NOT animated. These elements used to mount at opacity 0
            and be faded in by framer-motion, which meant the headline was
            invisible until a JS frame ran — in a throttled tab that frame can
            be deferred long enough that the top of the page renders blank. It
            is also the LCP element, and Henley does not animate its headline
            either.

            SIZE IS A CONTRAST CONSTRAINT HERE, not a taste decision. With no
            background behind the type, the copy has to finish inside the dark
            sky, and the sky is the top ~58% of this photograph — a fixed
            property of the frame that no amount of cropping changes. That is
            roughly 430px at this hero height. Everything that has to be
            legible fits in it; the stats row did not, which is why it now sits
            on white below. Adding a line here pushes the bottom of the block
            down into the lit skyline, where white type measures 1.01:1. */}
        <div className="relative w-full max-w-[1400px] mx-auto px-6 flex flex-col pt-[calc(var(--nav-clear)+24px)] pb-10 md:pb-12">
          {/* No background of any kind. The halo class is a text-shadow,
              inherited by everything in here — it is applied to the type, not
              laid over the picture. `hero-copy` carries the colour transition
              so the tone change rides the crossfade instead of snapping. */}
          <div className={`max-w-[640px] hero-copy ${tone.halo}`}>
            {/* headline and standfirst are the homepage block from
                Cynosure_Website_Layout_Pattern.docx, verbatim */}
            <div className={`eyebrow mb-6 ${tone.eyebrow}`}>
              {/* plain white or plain navy, never the accent — the slate is
                  2.0:1 on a night sky and 2.4:1 on pale stone */}
              <span className={`chev ${tone.chev}`}>»</span> Global Mobility Advisory
            </div>

            <h1 className={`t-display mb-6 ${tone.heading}`}>{homeIntro.title}</h1>

            {/* Fully opaque, no /85. Over a photograph the alpha is paid for
                twice — it dims the type AND the type is already the
                lower-contrast element — and it cost about a fifth of the
                measured ratio on the zones with no margin to spare. */}
            <p className={`t-lead mb-8 ${tone.body}`}>{homeIntro.lead}</p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {/* Flips with the tone. A white slab on Edinburgh's pale stone
                  has almost no edge; a navy one on Toronto's night sky has
                  almost none either. Each frame gets the fill that separates
                  from it. */}
              <Link to="/contact" className={tone.cta}>
                Book a Confidential Consultation <FaArrowRight />
              </Link>
              <Link
                to="/global-immigration"
                className={`inline-flex items-center gap-2 font-heading font-medium text-[13px] uppercase tracking-[0.16em] border-b pb-1.5 hover:gap-3.5 transition-all duration-300 ${tone.link}`}
              >
                Where We Work
              </Link>
            </div>
          </div>

          {/* ---- credentials, on the photograph ----
              `mt-auto` pins these to the BOTTOM of the hero, and the position
              is the whole point. Directly under the CTA — where they started —
              they landed on the skyline's lit towers and measured 1.01:1, a
              wall of lit windows behind white type. The bottom of this frame
              is open water, which is the second dark region the picture
              offers, so that is where they go.

              Consequence to keep in mind: this row and the copy block above it
              are now anchored to opposite ends of the hero. Growing either one
              eats the gap between them and eventually pushes this row up into
              the skyline again. Re-measure if the copy changes.

              All four benchmark firms open on figures like these; Henley leads
              on 70+ offices and 25+ years. */}
          {/* Three columns from sm up, three ROWS on a phone. Stacked in
              columns, each label gets about 90px on a 360px screen and all
              three of them need 102-124px, so every one wrapped — and they
              wrapped to different depths, which left the row visibly ragged.
              On a phone the number and its label sit on one baseline instead,
              which always fits and reads as a list of credentials. */}
          <dl
            className={`mt-auto pt-10 sm:pt-16 grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-y-0 max-w-[560px] border-t hero-copy ${tone.rule} ${tone.haloSm}`}
          >
            {heroFacts.map((f) => (
              <div
                key={f.label}
                className="flex items-baseline gap-3 sm:block sm:pr-4 pt-4 sm:pt-6"
              >
                <dt
                  className={`t-num text-2xl sm:text-3xl md:text-4xl leading-none sm:mb-2 ${tone.label}`}
                >
                  {f.value}
                </dt>
                {/* fully opaque — over a photograph the alpha is paid twice
                    and this label has the least margin on the page */}
                <dd
                  className={`text-[11px] uppercase tracking-[0.16em] leading-snug ${tone.label}`}
                >
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ---- feature cards ----
          Below the photograph, not riding up into it on a negative margin:
          the overlap cropped the bottom of every frame. */}
      {/* No bottom padding. The About section below opens with its own
          py-14/20/24, and carrying a pb here as well stacked the two into
          roughly 260px of empty white between the cards and the next
          heading — the widest seam on the page. */}
      <div className="relative bg-white pt-12 md:pt-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
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
                    {/* h2: these three sit directly under the page's h1 with
                        no h2 between, so h3 skipped a level. .feature-block
                        .title styles by class, so the tag change is invisible. */}
                    <h2 className="title">{card.title}</h2>
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
