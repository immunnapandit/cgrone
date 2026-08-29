import london from "@/assets/images/hero/skyline-london.webp";
import toronto from "@/assets/images/hero/skyline-toronto.webp";
import edinburgh from "@/assets/images/hero/skyline-edinburgh.webp";

/* City skylines, supplied by the client 2026-08-27, replacing the two
 * family-at-the-airport stock shots. That swap does more to move the site out
 * of the visa-consultancy category than any other single change — Latitude's
 * hero is a panoramic London cityscape for the same reason.
 *
 * The originals were 5-19 MB JPEGs (42 MB for the three). They are resized to
 * 2400px wide and re-encoded to webp, ~1 MB for the set. Keep any replacement
 * in that shape: a wide panorama, 2000px+, run through the same resize.
 *
 * ---- `position` -------------------------------------------------------
 * The focal point travels with the photograph, because which axis gets
 * cropped changes with the viewport and the three frames are composed
 * differently.
 *
 * Measured on the live hero: at 1440 the backdrop is 1521x816, or 1.86:1 —
 * TALLER than all three photographs (2.0-2.6:1). object-cover therefore
 * scales them by height and crops the SIDES: 606px off London, 138px off
 * Toronto, 111px off Edinburgh, with no vertical crop at all. On a wide
 * monitor the box goes past 2.0:1 and Toronto and Edinburgh start losing
 * height instead. So both axes are set, and both are load-bearing.
 *
 * X matters most, and it is not simply "centre". The white scrim covers the
 * left 45-65% of the hero — the type sits there — so only the right of each
 * frame is actually seen, and X is pushed past 50% to bring the landmark
 * cluster into that zone rather than leaving it behind the headline.
 *
 * If you swap an image: check where its landmarks sit horizontally, and
 * remember the left half of the frame will be under white.
 * ---------------------------------------------------------------------- */
export const heroSlides = [
  {
    src: london,
    alt: "The London skyline at dusk, seen along the Thames from Tower Bridge",
    // 2400x921. Loses 606px of width here — the widest frame, so the most
    // cropped. X favours the City cluster (Walkie-Talkie, Cheesegrater,
    // Gherkin) on the right; City Hall and the Shard fall under the scrim.
    position: "60% 50%",
  },
  {
    src: toronto,
    alt: "The Toronto waterfront skyline at dusk",
    // 2400x1181. CN Tower and the Rogers Centre sit right of centre, which
    // is exactly the zone left clear of the type. Y favours the lower half
    // for wide viewports, where this frame crops vertically instead.
    position: "55% 70%",
  },
  {
    src: edinburgh,
    alt: "Rooftops and historic architecture across the Edinburgh skyline",
    // 2400x1200. Calton Hill and the monument are right of centre. Y sits
    // high because the bottom of this frame is Waverley station roofs —
    // the least interesting thing in the picture.
    position: "55% 30%",
  },
];
