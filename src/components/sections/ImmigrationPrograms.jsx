import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { immigrationPrograms } from "@/data/immigrationPrograms";

export default function ImmigrationPrograms() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="text-center mb-20 max-w-2xl mx-auto">
          <div className="eyebrow mx-auto justify-center mb-6">
            <span className="chev">»</span> Our Programs
          </div>
          <h2 className="t-h2 text-ink">
            Immigration Programs Built Around You
          </h2>
        </Reveal>

        <div className="space-y-28">
          {immigrationPrograms.map((p, i) => (
            <div
              key={p.id}
              id={p.id}
              className={`grid lg:grid-cols-2 gap-16 items-center scroll-mt-28 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal direction={i % 2 === 1 ? "right" : "left"}>
                <img src={p.img} alt={p.eyebrow} className="w-full h-[420px] object-cover" />
              </Reveal>
              <Reveal direction={i % 2 === 1 ? "left" : "right"} delay={0.1}>
                <div className="w-14 h-14 rounded-full bg-ink text-primary flex items-center justify-center text-2xl mb-6">
                  <p.icon />
                </div>
                <div className="eyebrow mb-4">
                  <span className="chev">»</span> {p.eyebrow}
                </div>
                <h3 className="t-h3 text-ink mb-5">{p.title}</h3>
                <p className="t-body mb-7 max-w-xl">{p.text}</p>
                <ul className="space-y-3 mb-8">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-ink font-medium text-[17px]">
                      <span className="w-6 h-6 rounded-full bg-ink text-primary flex items-center justify-center text-xs shrink-0">
                        <FaArrowRight />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn-primary">
                  Get Started <FaArrowRight />
                </a>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
