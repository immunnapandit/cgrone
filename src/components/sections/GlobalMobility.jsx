import { motion } from "framer-motion";
import { FaArrowRight, FaGlobeAmericas } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { globalMobilityFeatures, globalMobilityStats } from "@/data/globalMobility";

export default function GlobalMobility() {
  return (
    <section id="global-mobility" className="relative py-28 bg-white overflow-hidden scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="left" className="relative order-2 lg:order-1">
          <div className="relative pl-6 border-l-4 border-primary">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80"
              alt="Corporate team collaborating on a relocation"
              className="block w-full max-w-[500px] h-[560px] object-cover object-top"
            />
          </div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-4 bg-white shadow-2xl px-6 py-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-ink text-primary flex items-center justify-center text-xl shrink-0">
              <FaGlobeAmericas />
            </div>
            <div>
              <p className="t-num text-xl leading-none mb-1">20+ Years</p>
              <p className="text-muted text-[13px] uppercase tracking-[0.14em] leading-none">Global Mobility Experience</p>
            </div>
          </motion.div>
        </Reveal>

        <Reveal direction="right" delay={0.1} className="order-1 lg:order-2">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> Global Mobility
          </div>
          <h2 className="t-h2 text-ink mb-6">
            Corporate Relocation &amp; Intra-Company Transfers
          </h2>
          <p className="t-body mb-10 max-w-xl">
            End-to-end mobility support for employers moving talent across
            borders — from work permits and compliance through onboarding in
            the destination country, coordinated with regulated professionals
            at every step.
          </p>

          <div className="space-y-7 mb-10">
            {globalMobilityFeatures.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-5">
                <div className="w-14 h-14 rounded-full bg-primary/12 text-primary flex items-center justify-center text-xl shrink-0">
                  <Icon />
                </div>
                <div>
                  <h3 className="t-h4 text-ink mb-1.5">{title}</h3>
                  <p className="t-body">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-10 pt-8 border-t border-hairline/60">
            {globalMobilityStats.map((s) => (
              <div key={s.label}>
                <p className="t-num text-2xl sm:text-3xl leading-none mb-2">{s.value}</p>
                <p className="text-muted text-[12px] uppercase tracking-[0.14em] leading-snug">{s.label}</p>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-primary">
            Talk To Our Team <FaArrowRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
