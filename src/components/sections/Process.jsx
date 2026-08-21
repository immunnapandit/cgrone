import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { processSteps } from "@/data/processSteps";

export default function Process() {
  return (
    <section id="process" className="relative py-28 bg-offwhite overflow-hidden scroll-mt-28">
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" viewBox="0 0 1400 700">
        <path d="M0 600 Q 700 100 1400 200" fill="none" stroke="#111417" strokeWidth="1.5" />
      </svg>

      <div className="relative max-w-[1400px] mx-auto px-6">
        <Reveal className="text-center mb-20">
          <div className="eyebrow mx-auto justify-center mb-6">
            <span className="chev">»</span> Working Process
          </div>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-ink">
            Get your visa approved in
            <br /> 3 easy simple steps
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12 md:gap-6 relative">
          {processSteps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative text-center"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4 }}
                className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center text-4xl text-primary bg-white shadow-lg mb-8"
              >
                <s.icon />
              </motion.div>

              {i < processSteps.length - 1 && (
                <FaLongArrowAltRight className="hidden md:block absolute top-16 -right-4 text-gray-300 text-2xl" />
              )}

              <span className="text-primary font-heading font-bold tracking-widest text-sm">STEP {s.n}</span>
              <h3 className="font-heading font-semibold text-xl text-ink mt-2 mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
