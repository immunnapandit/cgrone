import { AnimatePresence, motion } from "framer-motion";
import { FaChevronUp } from "react-icons/fa";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function ScrollTop() {
  const show = useScrollPosition(500);

  return (
    <AnimatePresence>
      {/* Fades, no longer springs. It used to pop in from scale 0.5 and grow
          to 1.1 under the cursor — a bouncing circle in the corner of every
          page. It fades in and darkens on hover instead. */}
      {show && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          /* Icon-only, so it needs a name — it announced as "button". */
          aria-label="Back to top"
          className="fixed bottom-7 right-7 z-50 w-11 h-11 bg-primary text-white flex items-center justify-center shadow-[0_10px_28px_-12px_rgba(17,34,61,0.6)] hover:bg-dark transition-colors"
        >
          <FaChevronUp aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
