import toronto from "@/assets/images/hero/skyline-toronto.webp";

/* City skylines, supplied by the client 2026-08-27, replacing the two
 * family-at-the-airport stock shots. That swap does more to move the site out
 * of the visa-consultancy category than any other single change — Latitude's
 * hero is a panoramic London cityscape for the same reason.
 *
 * The originals were 5-19 MB JPEGs (42 MB for the three). They are resized to
 * 2400px wide and re-encoded to webp, ~1 MB for the set.
 *
 * ---- 2400px is no longer enough --------------------------------------
 * The originals were never committed and are not on the build machine, and
 * that is now a visible problem rather than a tidiness one. The hero is
 * full-bleed, so at 1521 CSS px wide and 860 tall object-cover renders this
 * 2400x1181 file at 1748x860 CSS — which on a 2x display is 3496x1720 device
 * pixels asked of a 2400px source. It is being magnified, and it looks soft.
 *
 * A replacement wants to be about 3800px on the long edge, not 2400. If the
 * original JPEG turns up, re-encode with
 *   sharp(src).resize({width:3800}).webp({quality:90, effort:6})
 * which lands around 700KB-1MB — acceptable for the one image that is the
 * LCP element on the home page. Do NOT upscale the 2400px webp to get there;
 * that adds file size and no detail.
 *
 * ---- one frame, and which one -----------------------------------------
 * The hero carries its copy directly on the picture with no panel, scrim or
 * gradient behind it — every form of dimming has been rejected. That makes
 * the PHOTOGRAPH the contrast mechanism.
 *
 * Measured, not judged by eye: the rendered hero was sampled on a canvas
 * behind the eyebrow, h1, standfirst, CTA link and stats, across a grid of
 * object-position values, taking the worst zone each time. For WHITE type:
 *
 *              0%     20%    40%    60%    80%    100%
 *   london    3.48   2.37   2.34   1.50   1.94   2.04
 *   toronto   4.39   4.50   4.62   4.80   4.96   5.07
 *   edinburgh 2.60   2.58   2.52   2.49   2.43   2.42
 *
 * Toronto is the only night frame in the folder and the only one that clears
 * AA anywhere. A three-slide version was built and taken back out: London and
 * Edinburgh are bright, so they were flipped to navy type via a per-slide
 * `tone`, but both are MIXED-luminance — bright sky and dark buildings inside
 * the same copy area — so navy failed on their dark patches exactly as white
 * had failed on their bright ones. Averages passed, worst patches did not.
 *
 * `tone` survives because Hero.jsx still reads it and it costs nothing: set
 * "light" for white type on a dark photograph, "dark" for navy on a bright
 * one. If you add a frame, measure both colours in it and use whichever
 * clears 4.5:1 across every zone. If neither does, the photograph is not
 * usable here — do not reach for an overlay.
 *
 * ---- `position` -------------------------------------------------------
 * At 1440 the backdrop is about 1521x860, TALLER in ratio than this
 * photograph (2.03:1), so object-cover scales by height and crops the SIDES
 * only — Y does nothing until the viewport passes about 2:1, at which point
 * the frame starts losing height instead and Y takes over.
 * ---------------------------------------------------------------------- */
export const heroSlides = [
  {
    src: toronto,
    alt: "The Toronto waterfront skyline at dusk",
    // 2400x1181. X=70% puts the open lake under the copy while holding the
    // skyline run from the CN Tower out to the Rogers Centre dome at 87%
    // inside the frame. Y favours the lower half for wide viewports, where
    // this frame crops vertically instead and would lose the reflections.
    position: "70% 65%",

    // Phones only (below 768px). The frame goes portrait there and keeps
    // barely a quarter of this panorama's width — at 70% that quarter is the
    // lit downtown core, the brightest thing in the picture and the one place
    // white type cannot sit. 30% moves the window left onto the open water
    // and the low, dim buildings at that end.
    positionSm: "30% 55%",

    tone: "light",
  },
];
