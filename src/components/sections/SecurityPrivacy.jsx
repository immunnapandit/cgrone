import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { securityPrivacy } from "@/data/standards";
import mapBg from "@/assets/images/testimonial-map.png";

export default function SecurityPrivacy() {
  const { eyebrow, heading, intro, measures, note, closing } = securityPrivacy;

  return (
    <section id="security-privacy" className="relative py-24 lg:py-28 bg-ink overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none">
        <img src={mapBg} alt="" className="w-full h-auto" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        <Reveal className="max-w-3xl">
          <div className="eyebrow text-white/55 mb-6">
            <span className="chev">»</span> {eyebrow}
          </div>
          <WordsSlideUp text={heading} className="t-h2 text-white" />
          <p className="t-body text-white/70 mt-7">{intro}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {measures.map((m, i) => (
            <Reveal key={m.text} delay={i * 0.06}>
              <div className="bg-white/5 border border-white/10 p-7 h-full">
                <span className="w-11 h-11 mb-5 rounded-full bg-primary text-ink flex items-center justify-center text-base">
                  <m.icon />
                </span>
                <p className="t-body text-white/80">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="t-body text-white/70 mt-14 max-w-4xl">{note}</p>
          <p className="t-lead text-white border-l-2 border-primary pl-6 mt-8 max-w-4xl">
            {closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
