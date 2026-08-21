import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="relative py-28 bg-ink overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1900&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        <Reveal className="text-center mb-16">
          <div className="eyebrow mx-auto justify-center border-white/25 text-white mb-6">
            <span className="chev">»</span> Service We Provide
          </div>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-white">
            Outstanding Immigration
            <br /> Visa Services
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="bg-white flex items-center justify-between px-6 py-5">
                <div>
                  <span className="text-xs text-gray-400 font-heading">{s.n}</span>
                  <h3 className="font-heading font-semibold text-ink">{s.title}</h3>
                </div>
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <s.icon />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
