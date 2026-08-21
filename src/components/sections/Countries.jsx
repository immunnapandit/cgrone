import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { countries } from "@/data/countries";

export default function Countries() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-3 bg-primary" />
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-3 gap-14">
        <Reveal direction="left" className="lg:col-span-1">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> Choose Country
          </div>
          <h2 className="font-heading font-bold text-4xl text-ink leading-tight">
            Countries we're support for the immigration
          </h2>
        </Reveal>

        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
          {countries.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
              className="bg-offwhite p-7 relative"
            >
              <button className="absolute top-5 right-5 w-9 h-9 bg-primary text-white flex items-center justify-center text-sm hover:bg-ink transition-colors">
                <FaArrowRight />
              </button>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">{c.flag}</span>
                <h3 className="font-heading font-semibold text-xl text-ink">{c.name}</h3>
              </div>
              <div className="border-t border-dashed border-gray-300 mb-4" />
              <p className="text-sm text-gray-500">
                Dedicated advisors and document checklists tailored to {c.name}'s
                current requirements.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
