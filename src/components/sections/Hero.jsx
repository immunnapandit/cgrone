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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/35 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="relative min-h-[440px] lg:min-h-[500px] flex items-center pb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center bg-primary text-white font-heading font-semibold text-sm tracking-wide px-6 py-3 mb-6"
              style={{ clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)" }}
            >
              20+ Years of Global Immigration Experience
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-heading font-bold text-white text-[42px] sm:text-[54px] lg:text-[64px] leading-[1.08] mb-6"
            >
              Building a Global Platform for{" "}
              <span className="text-primary">Immigration, Mobility &amp; Opportunity</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-white/80 text-xl leading-relaxed max-w-xl mb-10"
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
          </div>

          <div className="absolute bottom-0 left-0 flex gap-2 z-10">
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

      {/* feature cards */}
      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-0 -mt-1 translate-y-1/2">
          {heroFeatures.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="relative bg-white shadow-2xl flex items-stretch"
            >
              <div className="w-4 bg-primary diagonal-slice shrink-0" />
              <div className="flex items-center gap-5 px-8 py-9">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center text-2xl text-primary shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-ink mb-1">{card.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{card.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="h-24 md:h-28 bg-offwhite" />
    </section>
  );
}
