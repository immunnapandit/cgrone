import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { securityPrivacy } from "@/data/standards";

export default function SecurityPrivacy() {
  const { eyebrow, heading, intro, measures, note, closing } = securityPrivacy;

  return (
    /* deliberately light: this sits between the navy video CTA and the
       Countries grid, and a third dark block in a row was what made the
       About page read as heavy */
    <section
      id="security-privacy"
      className="relative py-24 lg:py-28 bg-offwhite overflow-hidden scroll-mt-28"
    >
      <div className="absolute top-0 left-0 w-full h-3 bg-brand" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <Reveal className="max-w-3xl">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> {eyebrow}
          </div>
          <WordsSlideUp text={heading} className="t-h2 text-ink" />
          <p className="t-body mt-7">{intro}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {measures.map((m, i) => (
            <Reveal key={m.text} delay={i * 0.06}>
              <div className="bg-white p-7 h-full border-t-2 border-primary shadow-sm">
                <span className="w-11 h-11 mb-5 rounded-full bg-primary text-ink flex items-center justify-center text-base">
                  <m.icon />
                </span>
                <p className="t-body">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="t-body mt-14 max-w-4xl">{note}</p>
          <p className="t-lead text-ink border-l-2 border-primary pl-6 mt-8 max-w-4xl">
            {closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
