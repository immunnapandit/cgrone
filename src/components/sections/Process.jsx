import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";
import { processSteps } from "@/data/processSteps";

/* The third and last place testimonial-map.png appeared — aeroplanes and
   dashed flight paths, here at full opacity across the top of the section.
   The artwork is pale enough on white that it read as texture rather than as
   a picture of aircraft, which is precisely why it survived three earlier
   passes. Removed with the copies in Services and WhyChooseUs. */
export default function Process() {
  return (
    <section id="process" className="relative py-14 md:py-20 lg:py-24 bg-white overflow-hidden scroll-mt-28">
      <div className="relative max-w-[1400px] mx-auto px-6">
        <Reveal className="text-center mb-20">
          <div className="eyebrow mx-auto justify-center mb-6">
            <span className="chev">»</span> Our Approach
          </div>
          <h2 className="t-h2 text-ink">
            Understand. Strategize.
            <br /> Connect. Move Forward.
          </h2>
        </Reveal>

        <div className="relative">
          {/* was a dashed curve swooping across the four steps — a flight-path
              cue. A straight hairline at the centre of the step markers reads
              as a process, not a journey. */}
          <span className="hidden lg:block absolute left-0 right-0 top-14 h-px bg-hairline pointer-events-none" />

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
                {/* previously a dashed gold ring with a 40px gold glow that
                    scaled and rotated 4° on hover. Solid hairline ring, no
                    glow, no rotation — the restraint is the point. */}
                <div className="relative w-28 h-28 mx-auto rounded-full border border-hairline flex items-center justify-center text-4xl text-ink/70 bg-white mb-8 transition-colors duration-300 group-hover:border-primary">
                  <s.icon />
                </div>

                <div className="max-w-[280px] mx-auto px-6 py-5">
                  <span className="text-soft font-heading font-semibold tracking-[0.22em] text-[12px]">STEP {s.n}</span>
                  <h3 className="t-h4 text-ink mt-2.5 mb-3 whitespace-pre-line">{s.title}</h3>
                  <p className="t-body text-balance">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
