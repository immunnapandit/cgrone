import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import useFormSubmit from "@/hooks/useFormSubmit";
import { contactFields } from "@/data/contact";
import bg22 from "@/assets/images/bg22.webp";

const BUTTON_LABEL = {
  idle: "Submit Request",
  sending: "Sending…",
  sent: "Request Sent!",
  error: "Try Again",
};

export default function Contact() {
  const { status, error, submit } = useFormSubmit("/api/contact");

  return (
    <section id="contact" className="py-28 bg-offwhite scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 shadow-2xl">
        <Reveal direction="left" className="relative min-h-[420px] bg-ink">
          <img
            src={bg22}
            alt="Couple traveling with luggage at the airport"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative h-full flex flex-col justify-center px-10 gap-3">
            {["20+ Years Experience", "Global Mobility Platform", "Strategy-First Approach"].map((t) => (
              <span key={t} className="bg-white text-ink t-h5 w-fit px-5 py-2.5">
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1} className="bg-white px-8 sm:px-14 py-16">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> Contact With Us
          </div>
          <h2 className="t-h2 text-ink mb-5">
            Get in Touch for Immigration &amp; Global Mobility
          </h2>

          <p className="t-body mb-8">
            Prefer email? Write to us at{" "}
            <a
              href="mailto:info@cgrone.com"
              className="text-ink font-medium border-b border-primary hover:text-primary transition-colors"
            >
              info@cgrone.com
            </a>
          </p>

          <form onSubmit={submit} className="space-y-5" noValidate={false}>
            <div className="grid sm:grid-cols-2 gap-5">
              {contactFields.map((f) => (
                <input
                  key={f.name}
                  name={f.name}
                  type={f.type}
                  placeholder={f.label}
                  required={f.name !== "phone"}
                  autoComplete={f.autoComplete}
                  className="bg-offwhite px-5 py-4 outline-none border border-transparent focus:border-primary transition-colors font-body"
                />
              ))}
            </div>
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              className="w-full bg-offwhite px-5 py-4 outline-none border border-transparent focus:border-primary transition-colors font-body resize-none"
            />

            {/* Honeypot: hidden from people, irresistible to bots. The API
                accepts anything that fills it in and quietly drops it. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full justify-center !clip-path-none disabled:opacity-70"
            >
              {BUTTON_LABEL[status]} <FaArrowRight />
            </motion.button>

            {/* aria-live so the outcome reaches a screen reader too — the
                button label alone changes silently. */}
            <p aria-live="polite" className="min-h-[1.25rem] text-sm font-body">
              {status === "sent" && (
                <span className="text-ink">
                  Thanks — we&apos;ve got your enquiry and will be in touch shortly.
                </span>
              )}
              {status === "error" && <span className="text-red-700">{error}</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
