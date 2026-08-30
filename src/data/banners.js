/* Inner-page banner photography.
 *
 * Every page banner used to draw from the stock set — an aeroplane graphic on
 * /about, a passport-and-maple-leaf composite on /global-immigration, a man at
 * a laptop on /global-mobility — and three of the five country pages had no
 * photograph at all, falling back to the flat navy field.
 *
 * The three hero skylines are the only genuinely architectural images the
 * project owns: real cities, shot wide, no people and no props. They are what
 * a firm of this positioning puts behind a page title, so they carry the
 * banners now and the stock composites are out of the layout entirely.
 *
 * THE ONE RULE HERE: a skyline must not appear twice on the same page. Several
 * routes already close with a <StatementBand> over a skyline, and those are
 * fixed — see the table below. Assignments are chosen around them.
 *
 *   route                        banner       StatementBand
 *   /about                       london       —
 *   /leadership                  edinburgh    —
 *   /contact                     london       —
 *   /investment-migration        edinburgh    london
 *   /global-immigration          toronto      london
 *   /workforce-mobility          london       toronto
 *   /workforce-mobility/:slug    toronto      edinburgh
 *   /global-mobility             toronto      —
 *   /countries/india             mumbai       —
 *   /countries/uk                london       —
 *   /countries/canada            toronto      —
 *   /countries/australia         sydney       —
 *   /countries/new-zealand       auckland     —
 *
 * Only three photographs cover thirteen banners, so repetition across the site
 * is unavoidable; repetition *within one page* is what reads as an oversight.
 *
 * Toronto goes to the Canada-facing routes and London to the UK/investment
 * ones because the city matches the subject. Edinburgh is the general-purpose
 * third — it is the one daylight frame, so it also breaks up a run of
 * blue-hour banners.
 */
import london from "@/assets/images/hero/skyline-london.webp";
import edinburgh from "@/assets/images/hero/skyline-edinburgh.webp";
import toronto from "@/assets/images/hero/skyline-toronto.webp";
import sydney from "@/assets/images/hero/skyline-sydney.webp";
import auckland from "@/assets/images/hero/skyline-auckland.webp";
import mumbai from "@/assets/images/hero/skyline-mumbai.webp";

/* PROVENANCE — the three added 2026-08-30 are Unsplash, whose licence permits
 * commercial use with no attribution required. Recorded here so the licence is
 * traceable if anyone ever asks where they came from:
 *
 *   skyline-sydney.webp    unsplash.com/photos/ZFvfQVFEVbk  (James Coleman)
 *   skyline-auckland.webp  unsplash.com/photos/cduCWqThfBw  (Tobias Rademacher)
 *   skyline-mumbai.webp    unsplash.com/photos/qrj4LiT9NRQ
 *
 * All three normalised to 2400x1000 to match the original set. Auckland's
 * source is a portrait frame, cropped to the band via imgix on download.
 *
 * DO NOT add images from a general image search here. Search results are
 * overwhelmingly copyrighted and this is a commercial site.
 */
export const skylines = { london, edinburgh, toronto, sydney, auckland, mumbai };

/** Banner photo per country slug — each one its OWN city.
 *
 * This is the rule that matters here. An earlier pass put Edinburgh behind
 * India, Australia and New Zealand just so every country page had a picture,
 * and the result was a page headed "Australia" over the Scott Monument and the
 * Balmoral clock tower, both plainly legible through the 0.74 veil. On a
 * general page a skyline reads as "international"; on a page named after one
 * country it reads as the wrong country, which is a credibility problem for a
 * firm selling country expertise.
 *
 * All five are now the right city. If a sixth country is added, give it a
 * photograph of itself or leave it on the navy field — do not borrow. */
export const countryBanners = {
  india: mumbai,
  uk: london,
  canada: toronto,
  australia: sydney,
  "new-zealand": auckland,
};
