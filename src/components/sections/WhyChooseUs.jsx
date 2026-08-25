import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { whyChooseUsPerks, whyChooseUsBars } from "@/data/whyChooseUs";
import mapBg from "@/assets/images/testimonial-map.png";

/** Bar fills from 0 to `value`% once scrolled into view. The percentage label
 *  sits at the right edge of the fill, so it travels along with it. */
function SkillItem({ label, value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div ref={ref} className="skill-item">
      <div className="skill-header">
        <div className="skill-title">{label}</div>
      </div>
      <div className="skill-bar">
        <div className="bar-inner">
          <div className="bar" style={{ width: inView ? `${value}%` : 0 }}>
            {/* the label rides the end of the fill, so it starts stacked on
                top of the title — hold it until the bar has moved clear */}
            <div
              className="skill-percentage"
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 0.8s ease 1s",
              }}
            >
              {value}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="outer-box">
          <div className="grid lg:grid-cols-2">
            {/* navy panel — left on desktop, but second in the source so the
                copy is read first on narrow screens */}
            <Reveal direction="right" className="features-column order-2 lg:order-1">
              <div className="inner-column">
                <div className="bg" style={{ backgroundImage: `url(${mapBg})` }} />

                <div className="title-box relative">
                  <WordsSlideUp
                    text="We ensure prompt services for visa & immigration"
                    className="t-h3 title"
                  />
                </div>

                {whyChooseUsPerks.map((p) => (
                  <div key={p.title} className="why-choose-block">
                    <div className="inner-box">
                      <div className="icon">
                        <p.icon />
                      </div>
                      <div className="content-box">
                        <h5 className="t-h5 title">{p.title}</h5>
                        <div className="text">{p.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal
              direction="left"
              delay={0.1}
              className="content-column order-1 lg:order-2"
            >
              <div className="inner-column">
                <div className="eyebrow mb-3">
                  <span className="chev">»</span> Why Choose Us
                </div>
                <WordsSlideUp
                  text="We are professional experts in immigration"
                  className="t-h2 text-ink"
                />
                <p className="t-body mt-7 mb-9">
                  A transparent, strategy-first approach backed by more than two
                  decades of experience across India, the United Kingdom and
                  Canada — connecting you with regulated professionals at every
                  stage.
                </p>

                <div className="skills">
                  {whyChooseUsBars.map((bar) => (
                    <SkillItem key={bar.label} label={bar.label} value={bar.value} />
                  ))}
                </div>

                <motion.a href="tel:+91458654528" className="info-btn" whileHover={{ x: 2 }}>
                  <span className="icon">
                    <FaPhoneAlt />
                  </span>
                  <small>Call for free</small>
                  <strong>+91 458 654 528</strong>
                </motion.a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
