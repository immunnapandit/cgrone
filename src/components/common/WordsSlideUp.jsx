import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Reveals a heading one word at a time, each word sliding up out of a clipped
 * box — the reference site's "words-slide-up text-split" treatment.
 *
 * Two things this has to get right, both of which can otherwise leave the
 * heading permanently invisible:
 *
 * 1. The observer sits on the heading, never on a word. Each word starts
 *    translated fully outside its own overflow-hidden wrapper, and
 *    IntersectionObserver clips a target's rect by its ancestors' overflow —
 *    so an observer on a word measures a zero-area intersection and never
 *    fires.
 * 2. Words render visible and are only hidden once we know we can bring them
 *    back: below the fold, with IntersectionObserver available and motion
 *    allowed. If any of that is untrue the heading simply doesn't animate,
 *    rather than disappearing.
 */
export default function WordsSlideUp({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.06,
}) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  // useLayoutEffect so arming happens before paint — no flash of the heading
  // at rest before it drops out of view.
  useLayoutEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, []);

  const hidden = armed && !inView;
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
            <motion.span
              className="inline-block"
              initial={false}
              animate={{ y: hidden ? "115%" : 0 }}
              transition={
                hidden
                  ? { duration: 0 }
                  : {
                      duration: 0.7,
                      delay: delay + i * stagger,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              {word}
            </motion.span>
          </span>
          {/* a real space, so the heading stays one selectable, readable string */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
