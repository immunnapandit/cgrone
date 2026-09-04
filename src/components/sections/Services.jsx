import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { pillars, brandMessage } from "@/data/pillars";

/* The home page's main block. Rebuilt 2026-08-29 around the three pillars in
   Cynosure_Website_Layout_Pattern.docx, replacing a set of service cards.

   That document is emphatic that these three carry the homepage and that
   countries and programmes sit underneath them — so the five country cards
   that used to follow this section are gone, and each pillar lists its
   contents as plain labels rather than as links competing with the pillar. */
export default function Services() {
  return (
    // z-0 keeps the bleeding backdrop below trapped in this section's own
    // stacking context, while WhyChooseUs (z-10) still paints over it
    <section id="services" className="relative z-0 py-14 md:py-20 lg:py-24 scroll-mt-28">
      {/* the backdrop runs 334px past the section so WhyChooseUs can sit on its
          tail. No overflow-hidden here or the bleed gets clipped. */}
      {/* The flat offwhite is the whole backdrop now. It used to carry
          testimonial-map.png — aeroplanes and dashed flight paths — at 0.06.
          Faint, but it is the same travel-agency graphic removed from About
          and from the WhyChooseUs panel, and a texture nobody can quite
          resolve is not worth the association. */}
      <div className="absolute top-0 left-0 w-full h-[calc(100%+334px)] bg-offwhite overflow-hidden -z-10 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <div className="eyebrow mx-auto justify-center mb-6">
            <span className="chev">»</span> What We Do
          </div>
          <h2 className="t-h2 text-ink mb-6">{brandMessage.line}</h2>
          <p className="t-body mx-auto">{brandMessage.text}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map(({ icon: Icon, img, title, audience, sub, to }) => (
            <Reveal key={title}>
              <article className="group h-full flex flex-col bg-white border border-hairline">
                {/* the badge hangs below the photo, so it cannot live inside
                    the overflow-hidden box that crops the zooming image */}
                <div className="relative h-36 md:h-52">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="absolute left-6 -bottom-6 z-10 w-12 h-12 bg-primary text-white flex items-center justify-center text-lg">
                    <Icon />
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6 pt-10 md:p-8 md:pt-12">
                  {/* The 01 / 02 / 03 eyebrow is gone. These three are parallel
                      service lines, not steps — nothing is first — so numbering
                      encoded an order that does not exist and invited the row to
                      be read as a process. Numbering stays in Process, where the
                      sequence is real.

                      min-h reserves two lines of the title at md and up, which is
                      what keeps the row aligned: "Global Immigration" fits on one
                      line while the other two wrap, and without this every element
                      below it in that card sat 38px above its neighbours. 2.5em is
                      exactly two lines at .t-h3's 1.25 line-height. Below md the
                      cards stack, so there is no row to align to. */}
                  <h3 className="t-h3 text-ink mb-3 md:min-h-[2.5em]">{title}</h3>
                  <p className="t-body mb-6">{audience}</p>

                  {/* Labels, not links — the pillar itself is the link.
                      These were bordered pills, which read as SaaS filter
                      chips and wrapped into ragged two- and three-line
                      blocks of different heights across the three cards.
                      A ruled list sets them as a capability index instead,
                      and the rows line up card to card. */}
                  <ul className="mb-8 border-t border-hairline">
                    {sub.map((s) => (
                      <li
                        key={s}
                        className="border-b border-hairline py-2.5 text-muted text-[11px] uppercase tracking-[0.14em]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={to}
                    className="mt-auto self-start inline-flex items-center gap-1.5 text-ink font-heading font-semibold text-[12px] uppercase tracking-[0.16em] border-b-2 border-primary pb-1.5 hover:gap-3 transition-all duration-300"
                  >
                    Explore <FaAngleRight className="text-xs" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
