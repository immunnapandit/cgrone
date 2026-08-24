import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { heroFeatures } from "@/data/heroFeatures";
import { heroSlides } from "@/data/heroSlides";

const SLIDE_INTERVAL = 5000;

export default function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative pt-36 lg:pt-40 pb-0 overflow-hidden bg-ink">
      {/* rotating background slider */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.img
            key={slide}
            src={heroSlides[slide].src}
            alt={heroSlides[slide].alt}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: SLIDE_INTERVAL / 1000 + 1.2, ease: "linear" },
            }}
            style={{ objectPosition: heroSlides[slide].focal }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="relative min-h-[440px] lg:min-h-[500px] flex items-center pb-28">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-3 border border-white/25 text-white font-heading font-medium text-[12px] uppercase tracking-[0.18em] px-6 py-3 mb-7"
            >
              <span className="w-6 h-[2px] bg-primary shrink-0" />
              20+ Years of Global Immigration Experience
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="t-display text-white mb-7"
            >
              Building a Global Platform for Immigration, Mobility &amp; Opportunity
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="t-lead text-white/75 max-w-xl mb-10"
            >
              With more than two decades of international experience, we
              connect you with the right immigration professionals, lawyers
              and specialist advisors — because international mobility should
              begin with strategy, not paperwork.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              href="#contact"
              className="btn-primary"
            >
              Request A Quote <FaArrowRight />
            </motion.a>

            {/* in flow, so the dots can never collide with the button above
                or get covered by the feature cards overlapping from below */}
            <div className="flex gap-2 mt-10">
              {heroSlides.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setSlide(i)}
                  aria-label={`Show slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === slide ? "w-8 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* feature cards — overlap the slider */}
      <div className="relative bg-offwhite pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[30px] -mt-[70px]">
            {heroFeatures.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.3, ease: "easeOut" }}
                className="feature-block"
              >
                <div className="inner-box">
                  <div className="icon">
                    <card.icon />
                  </div>
                  <div className="content">
                    <h3 className="title">{card.title}</h3>
                    <p className="text">{card.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
