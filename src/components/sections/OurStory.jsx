import Reveal from "@/components/common/Reveal";
import { ourStory } from "@/data/ourStory";

/* Deliberately typographic — hairlines and numerals, no icons, no photos, no
   dashed circles. The credibility here comes from the dates and the entity
   names, and dressing them up would work against that. */
export default function OurStory() {
  return (
    <section id="our-story" className="py-14 md:py-20 lg:py-24 bg-white border-t border-hairline scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="max-w-3xl mb-16">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> {ourStory.eyebrow}
          </div>
          <h2 className="t-h2 text-ink mb-6">{ourStory.heading}</h2>
          <p className="t-body">{ourStory.intro}</p>
        </Reveal>

        <Reveal amount={0.15}>
          <ol className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {ourStory.chapters.map((c) => (
              <li key={c.title} className="group bg-white border border-hairline p-9 lg:p-10">
                <div className="flex items-baseline justify-between gap-4 mb-8 pb-5 border-b border-hairline">
                  <span className="t-num text-3xl text-ink leading-none">
                    {c.marker}
                  </span>
                  <span className="text-soft text-[11px] uppercase tracking-[0.16em] text-right">
                    {c.place}
                  </span>
                </div>
                <h3 className="t-h4 text-ink mb-3">{c.title}</h3>
                <p className="t-body text-base">{c.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="t-lead text-ink border-l-2 border-primary pl-6 mt-14 max-w-2xl">
            {ourStory.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
