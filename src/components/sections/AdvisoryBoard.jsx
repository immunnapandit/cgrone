import Reveal from "@/components/common/Reveal";
import { whyCynosure, advisoryBoard, philosophy } from "@/data/advisory";

/* Three short blocks from the client's expanded About Us document: why
   Cynosure, the Strategic Advisory Board and the firm's philosophy. Kept
   typographic and on one ground so /about does not turn into another stack of
   alternating slabs. */
export default function AdvisoryBoard() {
  return (
    <section id="advisory-board" className="py-14 md:py-20 lg:py-24 bg-white scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="max-w-3xl mb-20">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> {whyCynosure.eyebrow}
          </div>
          <h2 className="t-h2 text-ink mb-6">{whyCynosure.heading}</h2>
          <p className="t-body">{whyCynosure.text}</p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-14 pt-16 border-t border-hairline">
          <Reveal className="lg:col-span-7">
            <div className="eyebrow mb-6">
              <span className="chev">»</span> {advisoryBoard.eyebrow}
            </div>
            <h3 className="t-h3 text-ink mb-7">{advisoryBoard.heading}</h3>
            <div className="space-y-5 mb-9">
              {advisoryBoard.body.map((p) => (
                <p key={p.slice(0, 40)} className="t-body">
                  {p}
                </p>
              ))}
            </div>
            {/* the last of the bordered chips — ruled rows, matching the
                pillar cards, the About list and the founder's specialisms */}
            <ul className="border-t border-hairline">
              {advisoryBoard.disciplines.map((d) => (
                <li
                  key={d}
                  className="border-b border-hairline py-2.5 text-muted text-[12px] uppercase tracking-[0.14em]"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="lg:col-span-5">
            <div className="bg-offwhite p-9 lg:p-11 h-full flex flex-col">
              <div className="eyebrow mb-6">
                <span className="chev">»</span> {philosophy.eyebrow}
              </div>
              <h3 className="t-h4 text-ink mb-5">{philosophy.heading}</h3>
              <p className="t-body text-base mb-8">{philosophy.text}</p>
              <p className="t-lead text-ink border-l-2 border-primary pl-6 mt-auto">
                {philosophy.closing}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
