import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { globalMobilityFeatures, globalMobilityStats } from "@/data/globalMobility";
import mapBg from "@/assets/images/testimonial-map.png";

/** Corporate mobility block. Deliberately built out of flat slabs — a
 *  capability row sitting on a navy stat strip — so it does not repeat the
 *  image-left/copy-right split that About already uses higher up the page. */
export default function GlobalMobility() {
  return (
    <section id="global-mobility" className="relative py-28 bg-white overflow-hidden scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* header: title carries the left, the supporting copy and CTA sit in
            the outer column so the two read as one line of type */}
        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-10 items-end pb-14 mb-14 border-b border-hairline">
          <Reveal className="lg:col-span-7">
            <div className="eyebrow mb-6">
              <span className="chev">»</span> Global Mobility
            </div>
            <h2 className="t-h2 text-ink">
              Corporate Relocation &amp;
              <br className="hidden sm:block" /> Intra-Company Transfers
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="t-body mb-8">
              End-to-end mobility support for employers moving talent across
              borders — from work permits and compliance through onboarding in
              the destination country, coordinated with regulated professionals
              at every step.
            </p>
            <a href="#contact" className="btn-primary">
              Talk To Our Team <FaArrowRight />
            </a>
          </Reveal>
        </div>

        {/* capability row + stat strip animate as one slab — revealing them
            separately makes the strip detach from the row mid-scroll */}
        <Reveal amount={0.15}>
          <div className="grid md:grid-cols-3 border border-hairline divide-y md:divide-y-0 md:divide-x divide-hairline">
            {globalMobilityFeatures.map(({ icon: Icon, title, text }, i) => (
              <article
                key={title}
                className="group relative bg-offwhite p-9 lg:p-11 transition-colors duration-300 hover:bg-white"
              >
                {/* gold rule draws across the top on hover */}
                <span className="absolute left-0 top-0 h-[3px] w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full" />

                <div className="flex items-center justify-between mb-8">
                  <span className="w-14 h-14 flex items-center justify-center text-2xl text-primary border border-primary/30 transition-colors duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-ink">
                    <Icon />
                  </span>
                  <span className="t-num text-3xl text-ink/10 leading-none transition-colors duration-300 group-hover:text-primary/40">
                    0{i + 1}
                  </span>
                </div>

                {/* fixed title box so a two-line title doesn't push its body
                    copy out of line with the columns beside it */}
                <h3 className="t-h4 text-ink mb-3 md:min-h-[3.5rem]">{title}</h3>
                <p className="t-body text-base">{text}</p>
              </article>
            ))}
          </div>

          <div className="relative bg-ink overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.13] pointer-events-none">
              <img src={mapBg} alt="" className="w-full h-auto" />
            </div>

            <div className="relative grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {globalMobilityStats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-5 px-9 lg:px-11 py-9">
                  <p className="t-num text-4xl text-primary leading-none shrink-0">{s.value}</p>
                  <p className="text-white/60 text-[12px] uppercase tracking-[0.16em] leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
