import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlay, FaArrowRight, FaTimes } from "react-icons/fa";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { videoCta } from "@/data/aboutPage";
import bg from "@/assets/images/hero/Hero2.webp";

export default function VideoCta() {
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(videoCta.videoUrl);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="video-cta">
      <div className="bg" style={{ backgroundImage: `url(${bg})` }} />

      <div className="relative container-page">
        <div className="outer-box">
          <div className="title-box">
            <WordsSlideUp
              text={videoCta.heading}
              className="t-h2 title max-w-[16ch]"
            />
          </div>

          <div className="flex items-center">
            {/* Until an intro video is configured this stays a real call to
                action rather than a button that does nothing. */}
            {hasVideo ? (
              <>
                <span className="watch-label font-heading hidden sm:flex">
                  Watch Video
                </span>
                <button
                  type="button"
                  className="play-now"
                  aria-label="Play the intro video"
                  onClick={() => setOpen(true)}
                >
                  <FaPlay />
                </button>
              </>
            ) : (
              <>
                <span className="watch-label font-heading hidden sm:flex">
                  Talk To Our Team
                </span>
                <a
                  href="/contact"
                  className="play-now"
                  aria-label="Go to the contact form"
                >
                  <FaArrowRight />
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && hasVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            /* role/aria-modal: Escape and the close button were already here,
               but without these the overlay was an anonymous <div> — a screen
               reader had no signal that a dialog had opened or that the page
               behind it was inert. aria-label names it, since the only heading
               inside is the iframe's own. */
            role="dialog"
            aria-modal="true"
            aria-label="Cynosure intro video"
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center"
            >
              <FaTimes />
            </button>
            <div
              className="w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={videoCta.videoUrl}
                title="Cynosure intro video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
