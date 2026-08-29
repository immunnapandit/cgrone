import { motion } from "framer-motion";

const variants = {
  up: { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -50 }, show: { opacity: 1, y: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

/* `direction="left"` and `"right"` used to slide the block 60px sideways. They
 * now resolve to the vertical entrance, and the horizontal variants are gone.
 *
 * The reason is arithmetic, not taste. Content sits in a `max-w-[1400px]
 * mx-auto px-6` column, so a block waiting to animate extended 60px past its
 * own column — and past the viewport at every width below about 1470px:
 *
 *     390 -> overflows by 36     1280 -> overflows by 36
 *     768 -> overflows by 36     1440 -> overflows by 16
 *    1024 -> overflows by 36     1536 -> fits
 *
 * Only a large desktop had the spare gutter to absorb it. Everywhere else the
 * document scrollWidth exceeded the viewport (measured: 411 against 390 on a
 * phone, 789 against 768 on a tablet). `body { overflow-x: hidden }` clipped
 * it so no one could actually scroll sideways, which is why it went unnoticed
 * — but the block was visibly cut off while animating, and body-level clipping
 * is not something to depend on; iOS Safari will still rubber-band past it.
 *
 * A breakpoint would not have fixed this: there is no common viewport where
 * the slide has room. The call sites still pass `direction="left"`/`"right"`
 * and are left alone — they simply get the vertical entrance now.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  amount = 0.2,
}) {
  const resolved = variants[direction] ? direction : "up";

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants[resolved]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
