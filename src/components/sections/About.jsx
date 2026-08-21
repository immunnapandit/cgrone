import { motion } from "framer-motion";
import { FaArrowRight, FaPaperPlane } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { aboutHighlights, aboutBulletPoints } from "@/data/aboutContent";
import aboutImage from "@/assets/images/about/About1.webp";
import aeroplaneBg from "@/assets/images/about/aeroplane.webp";

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-white overflow-hidden scroll-mt-28">
      {/* flight-path decoration with a plane flying along the route */}
      <div className="absolute right-6 top-10 w-[110px] h-[680px] pointer-events-none hidden lg:block opacity-60">
        <img src={aeroplaneBg} alt="" className="w-full h-full object-contain" />
        <motion.div
          className="absolute top-0 left-0 text-primary"
          initial={{ x: 78, y: 9, rotate: 159 }}
          animate={{
            x: [78, 6, 33, 61, 78, 94, 78],
            y: [9, 173, 277, 426, 478, 664, 9],
            rotate: [159, 121, 124, 117, 130, -135, 159],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaPaperPlane className="text-lg drop-shadow" />
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="left" className="relative">
          <div className="relative pl-6 border-l-4 border-primary">
            <img
              src={aboutImage}
              alt="Traveler with passport"
              className="block w-full max-w-[500px] h-[560px] object-cover object-top"
            />
          </div>
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-4 bg-white shadow-2xl px-6 py-5 flex items-center gap-3"
          >
            {aboutHighlights.map(({ icon: Icon }, i) => (
              <Icon key={i} className={i === 0 ? "text-primary text-3xl" : "text-ink text-2xl"} />
            ))}
          </motion.div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <div className="eyebrow mb-6">
            <span className="chev">»</span> About CGR ONE
          </div>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-ink leading-tight mb-6">
            A Global Platform Built on Two Decades of Immigration Expertise.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8 max-w-xl">
            CGR ONE is built on more than two decades of experience across
            immigration, global mobility, international business development
            and advisory services — spanning India, the United Kingdom and
            Canada. We believe international mobility should begin with
            strategy, not paperwork, connecting clients with the right
            immigration professionals, lawyers and specialist advisors across
            jurisdictions.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {aboutHighlights.map(({ icon: Icon, title }, i) => (
              <div key={title.join(" ")} className="flex items-center gap-4">
                <div
                  className={
                    i === 0
                      ? "w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl"
                      : "w-14 h-14 rounded-full border-2 border-dashed border-primary/50 text-primary flex items-center justify-center text-xl"
                  }
                >
                  <Icon />
                </div>
                <p className="font-heading font-semibold text-ink leading-snug">
                  {title[0]}
                  <br />
                  {title[1]}
                </p>
              </div>
            ))}
          </div>

          <ul className="space-y-3 mb-9">
            {aboutBulletPoints.map((t) => (
              <li key={t} className="flex items-center gap-3 text-ink font-medium">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                  <FaArrowRight />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <a href="#services" className="btn-primary">
            Read More <FaArrowRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
