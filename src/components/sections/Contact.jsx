import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { contactFields } from "@/data/contact";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-28 bg-offwhite scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 shadow-2xl">
        <Reveal direction="left" className="relative min-h-[420px] bg-ink">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80"
            alt="Couple traveling"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-ink/30" />
          <div className="relative h-full flex flex-col justify-center px-10 gap-3">
            {["A Full-Service", "Visa Immigration", "Consulting"].map((t) => (
              <span key={t} className="bg-white text-ink font-heading font-semibold w-fit px-5 py-2 text-lg">
                {t}
              </span>
            ))}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-primary text-xl mt-6"
            >
              <FaPlay className="ml-1" />
            </motion.button>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1} className="bg-white px-8 sm:px-14 py-16">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> Contact With Us
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-ink mb-8">
            Get in Touch for Visa &amp; Immigration
          </h2>

          <form onSubmit={submit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {contactFields.map((f) => (
                <input
                  key={f.name}
                  type={f.type}
                  placeholder={f.label}
                  required
                  className="bg-offwhite px-5 py-4 outline-none border border-transparent focus:border-primary transition-colors font-body"
                />
              ))}
            </div>
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full bg-offwhite px-5 py-4 outline-none border border-transparent focus:border-primary transition-colors font-body resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-dark w-full justify-center !clip-path-none"
            >
              {sent ? "Request Sent!" : "Submit Request"} <FaArrowRight />
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
