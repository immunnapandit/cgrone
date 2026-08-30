import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { professionalStandards } from "@/data/standards";

export default function ProfessionalStandards() {
  const { eyebrow, heading, intro, body, approach, network, commitment, closing } =
    professionalStandards;

  return (
    <section id="professional-standards" className="py-14 md:py-20 lg:py-24 bg-white scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-20 items-start">
          <Reveal direction="right">
            <div className="eyebrow mb-3">
              <span className="chev">»</span> {eyebrow}
            </div>
            <WordsSlideUp text={heading} className="t-h2 text-ink" />
            <p className="t-body mt-7">{intro}</p>
            <p className="t-body mt-5">{body}</p>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <h3 className="t-h4 text-ink mb-7">Our Professional Approach</h3>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {approach.map((a) => (
                <div key={a.text} className="flex items-start gap-4">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-offwhite text-ink flex items-center justify-center text-sm">
                    <a.icon />
                  </span>
                  <p className="t-small pt-1.5">{a.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {[network, commitment].map((block, i) => (
            <Reveal key={block.title} delay={0.1 + i * 0.08}>
              <div className="bg-offwhite p-8 h-full">
                <h3 className="t-h4 text-ink mb-4">{block.title}</h3>
                <p className="t-body">{block.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="t-lead text-ink border-l-2 border-primary pl-6 mt-14">
            {closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
