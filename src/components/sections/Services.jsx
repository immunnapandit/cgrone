import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { services } from "@/data/services";
import mapBg from "@/assets/images/testimonial-map.png";

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative py-28 bg-ink overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none">
        <img src={mapBg} alt="" className="w-full h-auto" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        <Reveal className="text-center mb-16">
          <div className="eyebrow mx-auto justify-center text-white/55 mb-6">
            <span className="chev">»</span> Service We Provide
          </div>
          <h2 className="t-h2 text-white">
            Outstanding Immigration
            <br /> Visa Services
          </h2>
        </Reveal>

        <div
          onMouseLeave={() => setActive(0)}
          className="flex flex-col sm:flex-row h-auto sm:h-[480px] gap-4 rounded-2xl overflow-hidden"
        >
          {services.map((s, i) => {
            const isActive = active === i;
            return (
              <div
                key={s.title}
                id={s.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer h-64 sm:h-full flex-none scroll-mt-28 transition-all duration-700 ease-in-out ${
                  isActive ? "sm:flex-[3.5_3.5_0%]" : "sm:flex-[1_1_0%]"
                }`}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t transition-all duration-700 ease-in-out ${
                    isActive ? "from-ink/95 via-ink/30 to-transparent" : "from-ink/90 via-ink/50 to-ink/10"
                  }`}
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0 mb-4 transition-all duration-700 ease-in-out ${
                      isActive ? "bg-primary text-ink" : "bg-white/10 text-white"
                    }`}
                  >
                    <s.icon />
                  </div>

                  <span className="text-[11px] text-white/45 font-heading font-medium tracking-[0.22em] mb-2">{s.n}</span>
                  <h3 className="t-h4 text-white">{s.title}</h3>

                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${
                      isActive ? "max-h-32 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
                    }`}
                  >
                    <p className="t-body text-white/70">{s.desc}</p>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-primary font-heading font-semibold text-[12px] uppercase tracking-[0.16em] hover:gap-2.5 transition-all duration-300"
                    >
                      Read More <FaAngleRight className="text-xs" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
