import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* Scroll-in reveal — plain IntersectionObserver and a CSS transition.
 *
 * This used to be a framer-motion `whileInView` with `initial="hidden"`, and
 * it was fail-DANGEROUS: the element rendered at opacity 0 and only became
 * visible if framer's viewport machinery fired. When that did not happen the
 * content was permanently invisible, leaving a hole in the page the size of
 * the block — which reads as "extra spacing", not as a bug, so it survived
 * several passes. Measured on /global-immigration before this rewrite: the
 * "Selected Global Destinations" panel sat at opacity 0 with translateY(50px)
 * while dead-centre in the viewport, and six blocks reverted to opacity 0
 * once scrolled past, despite `once: true`.
 *
 * The same class of failure had already been fixed twice in Hero.jsx (the
 * headline and the slide crossfade) by dropping framer for CSS. This is the
 * third instance and the last one that mattered.
 *
 * Three rules make it safe now:
 *
 * 1. Content renders VISIBLE. It is only hidden if we have already confirmed
 *    we can bring it back — same guard WordsSlideUp uses. If anything is
 *    missing (no IntersectionObserver, reduced motion, element already on
 *    screen) the block simply does not animate, rather than disappearing.
 * 2. Only blocks that start BELOW the fold are armed. Anything in the first
 *    viewport is never hidden, so the top of every page paints immediately.
 * 3. The reveal latches. The observer disconnects on first intersection, so a
 *    block cannot revert to hidden when it scrolls back out of view.
 *
 * threshold is 0 with a negative bottom rootMargin rather than a ratio: a
 * ratio never resolves for a block taller than the viewport, which is exactly
 * what wraps the card grids here.
 */
const TRANSFORMS = {
  up: "translateY(50px)",
  down: "translateY(-50px)",
  zoom: "scale(0.85)",
  fade: "none",
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  /* Kept for call-site compatibility. Reveals are always one-way now — see
     rule 3 above; a block that un-reveals itself is the bug, not a feature. */
  once = true, // eslint-disable-line no-unused-vars
  amount = 0.2, // eslint-disable-line no-unused-vars
}) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  // useLayoutEffect so the hide happens before paint — no flash of the block
  // at rest before it drops out of view.
  useLayoutEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || shown) return;
    const el = ref.current;
    if (!el) return;

    /* Show on intersection OR once the block's top has passed the bottom of
       the viewport — i.e. it has reached us, or we have already gone past it.
       The second half is not belt-and-braces, it is load-bearing: a block can
       go from below the fold to above the viewport without ever reporting an
       intersection, and then it would stay hidden for good. That happens on
       any jump — a refresh where the browser restores scroll position (this
       is how the bug was caught), an in-page #anchor, or a fast flick on a
       phone. IntersectionObserver also delivers one callback on observe, so
       an element that is already behind us is resolved immediately. */
    const io = new IntersectionObserver(
      ([entry]) => {
        const passed = entry.boundingClientRect.top < window.innerHeight;
        if (!entry.isIntersecting && !passed) return;
        setShown(true);
        io.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [armed, shown]);

  const hidden = armed && !shown;
  const resolved = TRANSFORMS[direction] ? direction : "up";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? TRANSFORMS[resolved] : "none",
        transition: hidden
          ? "none"
          : `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: hidden ? "opacity, transform" : undefined,
      }}
    >
      {children}
    </div>
  );
}
