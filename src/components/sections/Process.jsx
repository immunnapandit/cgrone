import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";
import { processSteps } from "@/data/processSteps";
import mapBg from "@/assets/images/testimonial-map.png";

export default function Process() {
  return (
    <section id="process" className="relative py-28 bg-white overflow-hidden scroll-mt-28">
      <img
        src={mapBg}
        alt=""
        className="absolute top-0 left-0 w-full h-auto pointer-events-none select-none"
      />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <Reveal className="text-center mb-20">
          <div className="eyebrow mx-auto justify-center mb-6">
            <span className="chev">»</span> Our Approach
          </div>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-ink">
            Understand. Strategize.
            <br /> Connect. Move Forward.
          </h2>
        </Reveal>

        <div className="relative">
          <svg
            className="hidden lg:block absolute left-0 right-0 top-16 w-full pointer-events-none"
            width="100%"
            height="60"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
          >
            <path
              d="M20 55 C 250 -10, 350 -10, 590 30 S 950 65, 1160 5"
              fill="none"
              stroke="#111417"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-16 sm:gap-10 lg:gap-6 relative">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  className="relative w-36 h-36 mx-auto rounded-full border-2 border-dashed border-primary/60 flex items-center justify-center text-5xl text-primary bg-white shadow-[0_0_40px_rgba(245,117,14,0.25)] mb-8"
                >
                  <span className="absolute inset-3 rounded-full bg-primary/10 blur-md" />
                  <s.icon className="relative" />
                </motion.div>

                <div className="max-w-[280px] mx-auto rounded-2xl px-6 py-5 transition-all duration-300 group-hover:bg-white group-hover:shadow-2xl">
                  <span className="text-primary font-heading font-bold tracking-widest text-sm">STEP {s.n}</span>
                  <h3 className="font-heading font-semibold text-xl text-ink mt-2 mb-3 whitespace-pre-line">{s.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed text-balance">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
