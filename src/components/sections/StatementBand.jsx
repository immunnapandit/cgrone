import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

/* A full-bleed photograph carrying one line of copy.
 *
 * The pillar and sector pages were long runs of type with a banner at the top
 * and nothing after it — accurate, but flat. This breaks the column, gives the
 * eye somewhere to land, and puts the city photography to work on more than
 * the home page. Henley and Latitude both use exactly this device between
 * dense sections.
 *
 * The scrim maths is the hero's: white type needs the navy at ~0.75 alpha to
 * clear 4.5:1 over the brightest of these frames (Edinburgh, luminance ~0.59),
 * so it sits at 0.8 with margin. No image is ever left to carry type on its
 * own tone.
 */
export default function StatementBand({ image, position = "50% 50%", eyebrow, line, cta }) {
  return (
    <section className="relative isolate overflow-hidden h-[320px] md:h-[380px] lg:h-[440px] flex items-center">
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ objectPosition: position }}
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 from-0% via-ink/80 via-55% to-ink/40 to-100%" />

      <div className="relative container-page w-full">
        <div className="max-w-2xl">
          {eyebrow && (
            <div className="eyebrow text-white/70 mb-6">
              {/* The accent, inherited from .chev rather than overridden.

                  This band had `bg-white/60` here, which never applied — see
                  the specificity note on :where(.eyebrow) .chev in index.css.
                  Now that the override WOULD work, it is removed on purpose:
                  the eyebrow sits at the left edge, where the veil is ink/90,
                  i.e. effectively flat navy. The logo orange is 5.68:1 there.

                  So this rule keeps the brand mark the same colour it is on
                  every light section instead of inverting for no reason. The
                  hero is the one place that still inverts, because its veil is
                  ink/46 over rotating photography and no accent can be
                  guaranteed against an unknown image. */}
              <span className="chev">»</span> {eyebrow}
            </div>
          )}
          <p className="t-h2 text-white">{line}</p>
          {cta && (
            <Link
              to={cta.to}
              className="link-arrow link-arrow-light mt-9"
            >
              {cta.label} <FaArrowRight />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
