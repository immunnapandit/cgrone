import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { heroFeatures } from "@/data/heroFeatures";
import { heroSlides } from "@/data/heroSlides";
import { homeIntro } from "@/data/pillars";

const SLIDE_INTERVAL = 6000;

/* The whole hero block — eyebrow, headline, standfirst and both CTAs — sits ON
 * the photograph at EVERY width. It used to split at lg: photograph above,
 * copy on white below, on phones. The client's note 2026-09-02, on seeing the
 * phone layout: "ye jo text niche aa raha hai, ye hero image ke upar hona
 * chahiye" — the same instruction that put the copy on the picture on desktop,
 * now applied to the phone. So there is one arrangement at all widths.
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
 * ---- contrast, re-measured 2026-09-01 -----------------------------------
 * The figures previously recorded here (standfirst 3.84:1, CTA link 1.86:1,
 * credentials 2.04-2.70:1) were wrong in both directions, because they
 * averaged the luminance under each zone. Averaging is the wrong statistic on
 * a night cityscape: what breaks a glyph is a bright PATCH behind it — a lit
 * window, a specular streak off the water — and this file already knew that,
 * having rejected London and Edinburgh because "averages passed, worst
 * patches did not". That test was simply never re-run against Toronto.
 *
 * Re-measured on the worst 10px block (about one glyph stem) rather than the
 * mean, white type, at the production crop of X=70%. Measured by drawing the
 * rendered <img> to a canvas and sampling the real getBoundingClientRect() of
 * each element — NOT by modelling the layout offline, which got the hero box
 * height wrong (860 vs the real 820), changed the object-cover scale, and made
 * every figure optimistic by one to two whole points:
 *
 *                  bare frame   with .hero-veil
 *   eyebrow           10.19          11.89   PASS
 *   headline           6.26           8.02   PASS
 *   standfirst         4.13           5.99   PASS
 *   CTA link           3.67           4.92   PASS
 *   credentials        1.69              —   removed from the page entirely
 *
 * The standfirst and the CTA link do NOT clear AA on the bare photograph, so
 * the veil is load-bearing rather than decorative — see .hero-veil in
 * index.css for why a 32% left-anchored grade is a different object from the
 * full-frame scrim that was rejected. The credentials row could not be made to
 * pass by any permitted means (a gradient heavy enough needed 0.78-0.98 alpha,
 * i.e. the rejected panel; no height in the lower half of the frame beats
 * 2.89:1; all six skylines in the folder measure worse than Toronto) and has
 * since been removed from the page at the client's request.
 *
 * Y is not a lever: at this aspect ratio object-cover crops the SIDES only,
 * so every Y from 35% to 80% measures identically. Only X moves anything.
 *
 * ---- contrast below lg, measured 2026-09-02 -----------------------------
 * Same method — worst 10px block, white type, the veil built from the
 * element's own computed gradient rather than a copy of the numbers, so the
 * measurement cannot drift from the CSS. The phone crop is X=30% and the veil
 * is the vertical one (see .hero-veil):
 *
 *              320    390    540    768    900   1023
 *   eyebrow   12.97  12.66  12.31  12.25  12.23  12.19
 *   headline   9.88  10.23  10.21  10.43  10.42  10.20
 *   standfirst 5.29   5.20   5.73   7.69   7.56   7.12
 *   link       5.70   5.89   4.75   4.93   5.14   5.72
 *
 * The standfirst is the binding zone on a phone, as it is on a desktop, and
 * 5.20 at 390 is the floor. On the BARE frame at 390 it is 3.29 and the link
 * is 4.70, so the veil is load-bearing here too. Alphas were measured before
 * being chosen: a 0.36/0.32/0.08 grade puts the standfirst at 4.65, only 0.15
 * clear of the line, so it runs 0.46/0.42/0.10 for 5.20.
 *
 * The primary CTA is not in the table: it is an opaque white slab with a navy
 * label, so what is behind it does not reach the type.
 *
 * ---- one measurement that is NOT about this change ----------------------
 * The desktop path is untouched, but sweeping it turned up a dip at exactly
 * 1280px wide: the "Where We Work" link measures 3.91:1 there against 4.5,
 * where 1240 gives 5.86 and 1320 gives 4.94. A lit patch drifts under that one
 * link at that one crop. It predates this change and is left as found.
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
      <div className="relative flex min-h-[560px] sm:min-h-[680px] lg:min-h-[820px]">
        {/* ---- photograph ---- */}
        {/* A full-bleed backdrop at every width now — the eyebrow, headline
            and both CTAs sit ON it on a phone as well as on a desktop.

            The min-height above is a floor, not the height: on a 375px phone
            the copy itself runs about 780px, so the copy sets the height and
            the photograph follows it. The floor only matters on a short
            landscape phone, where it stops the frame collapsing to the height
            of two wrapped lines. */}
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
            /* One source at every width. A <picture> used to swap in the
               pre-cropped band below lg, because the phone's frame was a
               280px strip and the full photograph is ~60% sky, which left the
               skyline a thin line along the bottom. The phone's frame is now
               the full height of the copy — about 780px, taller than it is
               wide — so object-cover keeps the WHOLE height of the original
               (sky above, skyline below) and crops the sides instead. That is
               the crop the band was invented to avoid, and it is also the one
               the copy needs: the dark sky is what the white type sits on.
               See heroSlides.js. */
            <img
              key={s.src}
              src={s.src}
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
          ))}

          {/* The veil, at every width now that the copy is on the picture at
              every width. It is a left-anchored horizontal grade from lg and a
              top-anchored vertical one below it, because the copy fills the
              width of a phone and a horizontal grade would leave the right
              half of every line unlifted. Sits above the slides (z-10) and
              below the slide picker (z-20). See the note on .hero-veil in
              index.css for why this scrim is permissible where the earlier
              full-frame one was not. */}
          <div className="hero-veil" aria-hidden="true" />

          {/* Hidden while there is one frame — a slide picker with a single
              slide is a control that does nothing. The only thing over the
              photo either way, and it covers 40x6px of it.

              The dot IS the button no longer. It was a 6px-tall control —
              h-1.5, and 6px wide when inactive — which is a 6x6 hit target on a
              touch screen, against a 44pt floor and WCAG 2.2's 24x24 minimum.
              The mark stays exactly the same size; the button around it is now
              44px tall with a 24px minimum width, and bottom-1 pulls the taller
              row back down so the dots sit where they always did. aria-current
              tells a screen reader which frame is showing — previously the four
              buttons were indistinguishable. */}
          {heroSlides.length > 1 && (
            <div className="absolute z-20 right-6 bottom-1 flex gap-2">
              {heroSlides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={i === slide}
                  className="group/dot grid place-items-center h-11 min-w-[24px]"
                >
                  <span
                    className={`block h-1.5 rounded-full shadow-sm transition-all duration-300 ${
                      i === slide ? "w-8 bg-white" : "w-1.5 bg-white/60 group-hover/dot:bg-white"
                    }`}
                  />
                </button>
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

            The top padding clears the fixed navbar at every width — it is the
            copy that starts under the header now, not a photo band with a
            margin. --nav-clear is 104px on a phone and 128px from sm.

            `lg:justify-center` centres the block in the frame instead of
            hanging it off that padding. The padding alone was tuned when the
            headline was 60px; once the type scale came down to the reference's
            40px the block lost ~60px of height, the min-h-[820px] frame did
            not, and the copy ended up sitting 54px below the navbar with 330px
            of empty photograph under the buttons. Centring fixes that and
            keeps fixing it — the next change to the headline length or the
            type scale re-centres on its own rather than silently drifting back
            up. The padding stays as the floor that clears the navbar.

            Below lg the copy is usually TALLER than the min-height, so there is
            no free space to distribute and centring would do nothing; it is
            left at flex-start there so the phone keeps its fixed top offset. */}
        <div className="relative z-10 w-full container-page flex flex-col lg:justify-center pt-[calc(var(--nav-clear)+20px)] lg:pt-[calc(var(--nav-clear)+16px)] pb-14 lg:pb-10">
          <div className="hero-copy max-w-[640px] on-photo">
            {/* headline and standfirst are the homepage block from
                Cynosure_Website_Layout_Pattern.docx, verbatim */}
            <div className="eyebrow mb-6 text-white/85">
              {/* plain white or plain navy, never the accent — the slate is
                  2.0:1 on a night sky and 2.4:1 on pale stone */}
              <span className="chev bg-white/70">»</span> Global Mobility Advisory
            </div>

            <h1 className="t-display mb-7 text-white">{homeIntro.title}</h1>

            {/* Fully opaque, no /85. Over a photograph the alpha is paid for
                twice — it dims the type AND the type is already the
                lower-contrast element — and this is the zone with the least
                margin on the picture (4.71:1 against a 4.5 requirement). */}
            <p className="t-lead mb-9 text-white">{homeIntro.lead}</p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {/* `hero-cta` rather than `btn-light`: same white slab, but its
                  own class, because it also carries the phone treatment (full
                  width, tighter tracking) that the other buttons take only
                  below 640px. */}
              <Link to="/contact" className="hero-cta">
                Book a Confidential Consultation <FaArrowRight />
              </Link>
              {/* was bare underlined type, invisible against the lit skyline —
                  see .btn-ghost-light for why this is a component fix rather
                  than a reopening of the settled hero-contrast decision */}
              <Link to="/global-immigration" className="btn-ghost-light">
                Where We Work
              </Link>
            </div>
          </div>

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
        <div className="container-page">
          {/* The 2006 / 5 / 3 credentials row stood here, between the
              photograph and these cards. Removed at the client's request
              2026-09-01 — the second time this row has been taken out (the
              first was reversed the same day), so if it is wanted again the
              markup is in git rather than commented out here.

              Nothing about the hero's contrast depends on it. It was the one
              zone that could not clear AA on the photograph, and deleting it
              settles that the same way moving it did; the veil is still
              carrying the standfirst and the CTA link, which fail on the bare
              frame at 4.13:1 and 3.67:1. See .hero-veil in index.css. */}
          {/* gap raised 16/24 -> 24/32 to match the pillar grid in Services,
              which was already at gap-6 md:gap-8. Cards this size read as
              crowded at 16px. */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {/* Static too. These sat at opacity 0 until a mount animation ran,
                and they are in the first viewport — the same rAF exposure as
                the slides above. Three small cards do not need an entrance. */}
            {heroFeatures.map((card) => (
              /* accent per card, consumed by .feature-block in index.css —
                 see heroFeatures.js for the hues and their contrast ratios */
              <div
                key={card.title}
                className="feature-block"
                style={{
                  "--card-accent": card.accent,
                  "--card-accent-wash": card.accentWash,
                  "--card-accent-edge": card.accentEdge,
                }}
              >
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
