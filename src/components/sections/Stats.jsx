import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import Counter from "@/components/common/Counter";
import { stats } from "@/data/stats";

export default function Stats() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="border-t-4 border-primary bg-offwhite grid lg:grid-cols-2 items-center overflow-hidden">
          <Reveal direction="left" className="px-8 sm:px-16 py-16">
            <h2 className="t-h2 text-ink mb-7">
              Ready to fly with
              <br /> us your dream
              <br /> country
            </h2>
            <a href="#contact" className="inline-flex items-center gap-2 font-heading font-semibold text-ink uppercase text-[12px] tracking-[0.18em] group">
              Our Services
              <span className="w-8 h-8 rounded-full bg-ink text-primary flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <FaArrowRight className="text-xs" />
              </span>
            </a>
          </Reveal>

          <div className="relative flex justify-center">
            <motion.img
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80"
              alt="Happy traveler"
              className="h-[420px] object-cover object-top"
            />
          </div>

          <div className="lg:col-span-2 grid grid-cols-3 divide-x divide-hairline border-t border-hairline">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-center gap-4 py-8 px-4">
                <span className="text-2xl text-primary">
                  <s.icon />
                </span>
                <div>
                  <Counter to={s.value} suffix={s.suffix} />
                  <p className="text-muted text-[12px] uppercase tracking-[0.16em] leading-snug">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
