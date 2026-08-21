import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { whyChooseUsPerks, whyChooseUsBars } from "@/data/whyChooseUs";
import travelerImage from "@/assets/images/about/Abouts.webp";

function Bar({ label, value }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between font-heading font-semibold text-ink mb-2">
        <span className="capitalize">{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative">
      <div className="grid lg:grid-cols-2">
        <div className="relative bg-primary text-white px-8 sm:px-16 py-24 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 600 700">
            <circle cx="500" cy="350" r="260" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="2 10" />
          </svg>
          <Reveal direction="left" className="relative max-w-lg">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight mb-12">
              A strategy-first approach to immigration &amp; mobility
            </h2>
            <div className="space-y-9">
              {whyChooseUsPerks.map((p) => (
                <div key={p.title} className="flex gap-5">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center text-xl shrink-0">
                    <p.icon />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1">{p.title}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative bg-offwhite px-8 sm:px-16 py-24">
          <div className="hidden xl:block absolute right-10 -top-16 -bottom-16 w-56 shadow-2xl">
            <img
              src={travelerImage}
              alt="Traveler with passport and boarding pass"
              className="w-full h-full object-cover"
            />
          </div>

          <Reveal direction="right" className="max-w-lg">
            <div className="eyebrow mb-6">
              <span className="chev">»</span> Why Choose Us
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-ink mb-6">
              Why Choose CGR ONE
            </h2>
            <p className="text-gray-500 leading-relaxed mb-10">
              A transparent, strategy-first approach backed by more than two
              decades of experience across India, the United Kingdom and
              Canada.
            </p>

            {whyChooseUsBars.map((bar) => (
              <Bar key={bar.label} label={bar.label} value={bar.value} />
            ))}

            <div className="flex items-center gap-4 mt-10">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Call for free</p>
                <p className="font-heading font-bold text-xl text-ink">+91 458 654 528</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
