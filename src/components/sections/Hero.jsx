import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { heroFeatures, heroFacts } from "@/data/heroFeatures";
import { heroSlides } from "@/data/heroSlides";
import { homeIntro } from "@/data/pillars";

const SLIDE_INTERVAL = 6000;

/* The whole hero block — eyebrow, headline, standfirst, both CTAs and the
 * 2006/5/3 credentials — sits ON the photograph from lg up. On a phone all of
 * it is on white under a 280px band of the pre-cropped frame.
 *
 * ---- read this before changing the height or the padding ----------------
 * Ten or so arrangements were built and rejected here, each because a client
 * instruction ruled one out:
 *
 *   "hero images ko fade mat karo"             -> no ink/85 ramp over the photo
 *   "images full honi chahiye, jaise pehle"    -> no split into two columns
 *   "content ke piche blue background remove"  -> no solid panel behind the copy
 *   "photo ke upar hona chahiye"               -> the copy is on the picture
 *   "buildings dikhne chahiye, scroll pe nahi" -> the hero came down from 1000
 *   "image ka size thoda kam karo"                to 760, then back up to 820
 *   "ye sab content bhi images ke upar rakho"  -> everything is on the picture
 *
 * The mechanism: with no background of any kind, the copy needs DARK pixels,
 * and the dark part of this photograph is its sky. The more copy on the
 * picture, the more sky must stay above the skyline, the taller the hero, the
 * lower the buildings sit. Those two cannot both be satisfied — on a 1366x768
 * laptop the copy runs y=144 to 589 and the buildings must start below it,
 * past a 640px fold. That is arithmetic, not a property of this picture.
 *
 * THE CURRENT SETTING IS THE CLIENT'S, NOT AA'S. At 820px the standfirst is
 * 3.84:1, the CTA link 1.86:1 and the credentials 2.04-2.70:1 against a 4.5
 * requirement — the lower half of the block sits on the lit skyline. They were
 * shown these numbers and said to proceed. Do not "fix" it by re-introducing a
 * scrim, a panel, or by moving copy off the picture; all three were built and
 * rejected. The only untried fix that keeps everything is a photograph whose
 * LEFT THIRD is dark for its full height — seven night cityscapes were
 * measured against these zones and all seven failed, so it needs a proper
 * sourcing round rather than another quick search.
 *
 * Also measured and ruled out: cutting sky from the frame (an 18% cut drops
 * the link to 3.44, 26% to 1.04, 34% drops the standfirst to 1.00), and
 * putting the buildings on top with the copy on the water below them (the
 * water band is 200-300px against a 445px copy block, so it overflows at
 * every crop and height).
 */
export default function Hero() {
  const [slide, setSlide] = useState(0);

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
      {/* 820px: the client's chosen height, arrived at by asking for the
          image shorter (1000 -> 760) and then a little taller again. Height,
          the lg top padding and the lg bottom padding are ONE setting — the
          copy is anchored to the top and the credentials to the bottom, so
          moving either end changes what sits behind the other. */}
      <div className="relative flex flex-col lg:flex-row lg:min-h-[820px]">
        {/* ---- photograph ---- */}
        {/* A band under the navbar on a phone; a full-bleed backdrop from lg,
            where the eyebrow, headline and CTA sit ON it.

            lg:h-auto is load-bearing. With position:absolute and top/bottom
            both 0, an explicit height still WINS — the pair is only honoured
            when height is auto — so without it the backdrop stays a 460px
            strip at the top of an 820px hero and the white type lands on
            white. */}
        <div className="relative h-[280px] sm:h-[380px] lg:h-auto mt-[var(--nav-clear)] lg:mt-0 lg:absolute lg:inset-0 isolate overflow-hidden">
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
            /* <picture>, because the two breakpoints want different CROPS,
               not two sizes of one crop. From lg the copy sits on the picture
               and needs the full frame's dark sky above the skyline. Below lg
               the copy is on white under a 280px band, where that same sky
               would leave the skyline a thin strip — so the phone gets the
               pre-cropped band. See heroSlides.js. */
            <picture key={s.src}>
              {s.srcBand && <source media="(min-width: 1024px)" srcSet={s.src} />}
            <img
              src={s.srcBand ?? s.src}
              alt={s.alt}
              /* Two positions, handed to CSS as variables rather than set
                 directly, because they differ by breakpoint and an inline
                 object-position cannot be overridden by a media query.
                 `.hero-frame` picks between them. */
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
            </picture>
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

            The whole height/padding/width coupling that used to live here
            is gone with the backdrop. The copy is on white, so its size and
            position are a typographic decision again rather than a contrast
            one, and it no longer has to be re-measured per viewport width. */}
        <div className="relative w-full max-w-[1400px] mx-auto px-6 flex flex-col pt-12 md:pt-14 pb-10 md:pb-12 lg:pt-[calc(var(--nav-clear)+16px)] lg:pb-10">
          <div className="max-w-[640px] lg:on-photo">
            {/* headline and standfirst are the homepage block from
                Cynosure_Website_Layout_Pattern.docx, verbatim */}
            <div className="eyebrow mb-6 text-soft lg:text-white/85">
              {/* plain white or plain navy, never the accent — the slate is
                  2.0:1 on a night sky and 2.4:1 on pale stone */}
              <span className="chev bg-primary lg:bg-white/70">»</span> Global Mobility Advisory
            </div>

            <h1 className="t-display mb-7 text-ink lg:text-white">{homeIntro.title}</h1>

            {/* Fully opaque from lg, no /85. Over a photograph the alpha is
                paid for twice — it dims the type AND the type is already the
                lower-contrast element — and this is the zone with the least
                margin on the picture (4.71:1 against a 4.5 requirement). */}
            <p className="t-lead mb-9 text-muted lg:text-white">{homeIntro.lead}</p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {/* `hero-cta` rather than `btn-primary`: it is a slate button on
                  the white mobile ground and inverts to a white slab from lg,
                  where it sits on the night photograph. */}
              <Link to="/contact" className="hero-cta">
                Book a Confidential Consultation <FaArrowRight />
              </Link>
              <Link
                to="/global-immigration"
                className="inline-flex items-center gap-2 font-heading font-medium text-[13px] uppercase tracking-[0.16em] border-b pb-1.5 hover:gap-3.5 transition-all duration-300 text-ink border-primary lg:text-white lg:border-white/60"
              >
                Where We Work
              </Link>
            </div>
          </div>

          {/* ---- credentials ----
              Removed at the client's request and added back the same day.
              `lg:mt-auto` drops it to the bottom of the picture. At 820px that
              lands it on the waterfront rather than the open water below it,
              which is why it measures 2.04-2.70 rather than the 4.5+ it did at
              1000px — see the note at the top of this file.

              Three columns from sm up, three ROWS on a phone: stacked in
              columns each label gets about 90px on a 360px screen and all
              three need 102-124px, so every one wrapped, and to different
              depths. On a phone the number and its label share one baseline
              instead, which always fits.

              All four benchmark firms open on figures like these; Henley
              leads on 70+ offices and 25+ years. */}
          <dl className="mt-10 lg:mt-auto lg:pt-12 grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-y-0 max-w-[560px] border-t border-hairline lg:border-white/40 lg:on-photo-sm">
            {heroFacts.map((f) => (
              <div
                key={f.label}
                className="flex items-baseline gap-3 sm:block sm:pr-4 pt-4 sm:pt-6"
              >
                <dt className="t-num text-2xl sm:text-3xl md:text-4xl leading-none sm:mb-2 text-ink lg:text-white">
                  {f.value}
                </dt>
                <dd className="text-[11px] uppercase tracking-[0.16em] leading-snug text-soft lg:text-white">
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
