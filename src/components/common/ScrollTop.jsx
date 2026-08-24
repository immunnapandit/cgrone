import { AnimatePresence, motion } from "framer-motion";
import { FaChevronUp } from "react-icons/fa";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function ScrollTop() {
  const show = useScrollPosition(500);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-7 right-7 z-50 w-12 h-12 rounded-full bg-ink text-primary flex items-center justify-center shadow-lg"
        >
          <FaChevronUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
