import { Link } from "react-router-dom";
import { FaArrowRight, FaAngleRight } from "react-icons/fa";
import PageTitle from "@/components/sections/PageTitle";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import StatementBand from "@/components/sections/StatementBand";
import { marketEntry as d } from "@/data/marketEntry";
import { skylines } from "@/data/banners";

/* /market-entry — the corporate advisory line from the client's profile deck.
   See the header of src/data/marketEntry.js for what the deck contains, what
   was left out of it and why.

   Banner is Mumbai and the StatementBand is London, per the one rule in
   banners.js: a skyline must not appear twice on the same page. Mumbai is the
   right frame for the top of this one — the deck's own positioning line is
   "India-based, international outlook" — and London carries the outward half
   of that at the break. */
export default function MarketEntry() {
  return (
    <>
      <PageTitle
        title={d.title}
        image={skylines.mumbai}
        crumbs={[{ label: "Home", to: "/" }, { label: d.title }]}
      />

      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-10 items-end pb-12 mb-12 border-b border-hairline">
            <Reveal className="lg:col-span-7">
              <div className="eyebrow mb-6">
                <span className="chev">»</span> {d.eyebrow}
              </div>
              <WordsSlideUp text={d.lede} className="t-h2 text-ink" />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <Link to="/contact" className="btn-primary">
                {d.cta} <FaArrowRight />
              </Link>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-10">
            <Reveal className="lg:col-span-7 space-y-5">
              {d.intro.map((p) => (
                <p key={p.slice(0, 40)} className="t-body">
                  {p}
                </p>
              ))}
              {/* The deck's own positioning line. Set as a rule-led aside
                  rather than a fourth body paragraph — it is three claims in
                  apposition, not a sentence. */}
              <p className="t-label text-ink border-l-2 border-primary pl-6 !mt-9">
                {d.strapline}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <h2 className="t-h4 text-ink mb-6">{d.aimsTitle}</h2>
              <ul className="border-t border-hairline">
                {d.aims.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-4 border-b border-hairline py-4"
                  >
                    <span className="shrink-0 w-9 h-9 flex items-center justify-center text-base text-ink border border-hairline">
                      <Icon />
                    </span>
                    <span className="t-body">{text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 lg:py-24 bg-offwhite border-t border-hairline">
        <div className="container-page">
          <Reveal className="max-w-3xl mb-10">
            <h2 className="t-h2 text-ink">{d.capabilitiesTitle}</h2>
          </Reveal>

          <Reveal amount={0.15}>
            <div className="grid md:grid-cols-3 gap-5">
              {d.capabilities.map(({ icon: Icon, title, text, to, linkLabel }) => {
                const body = (
                  <>
                    <span className="w-14 h-14 mb-7 flex items-center justify-center text-2xl text-ink border border-hairline">
                      <Icon />
                    </span>
                    <h3 className="t-h3 text-ink mb-3">{title}</h3>
                    <p className="t-body">{text}</p>
                  </>
                );
                /* Only the mobility card carries `to`. It points at the page
                   that already describes that service in full instead of
                   restating it here — see marketEntry.js. */
                return to ? (
                  <Link
                    key={title}
                    to={to}
                    className="group bg-white border border-hairline p-8 lg:p-10 flex flex-col hover:bg-offwhite transition-colors"
                  >
                    {body}
                    <span className="link-arrow mt-7 self-start">
                      {linkLabel} <FaAngleRight />
                    </span>
                  </Link>
                ) : (
                  <div
                    key={title}
                    className="bg-white border border-hairline p-8 lg:p-10 flex flex-col"
                  >
                    {body}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="container-page">
          <Reveal className="max-w-3xl mb-10">
            <h2 className="t-h2 text-ink mb-6">{d.approachTitle}</h2>
            <p className="t-lead text-ink">{d.approachLede}</p>
          </Reveal>

          <Reveal amount={0.15}>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {d.approach.map(({ n, title, text }) => (
                <li
                  key={n}
                  className="bg-white border border-hairline p-7 lg:p-8 flex flex-col"
                >
                  <span className="t-label text-primary mb-4">{n}</span>
                  <h3 className="t-h4 text-ink mb-3">{title}</h3>
                  <p className="t-body">{text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="border-t border-hairline max-w-3xl">
              {d.approachNotes.map((note) => (
                <li key={note.slice(0, 40)} className="border-b border-hairline py-4">
                  <p className="t-body text-ink">{note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <StatementBand
        image={skylines.london}
        position="60% 50%"
        eyebrow={d.closingEyebrow}
        line={d.closing}
        cta={{ to: "/contact", label: "Speak to our team" }}
      />

      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="container-page grid lg:grid-cols-12 gap-x-16 gap-y-14">
          <Reveal className="lg:col-span-4">
            <h2 className="t-h2 text-ink mb-8">{d.clientsTitle}</h2>
            <ul className="border-t border-hairline">
              {d.clients.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-4 border-b border-hairline py-4"
                >
                  <span className="shrink-0 w-9 h-9 flex items-center justify-center text-base text-ink border border-hairline">
                    <Icon />
                  </span>
                  <span className="t-body">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* 8/4 rather than the 7/5 used elsewhere on this page, and the tiles
              go 3-up at md rather than sm. Both are driven by one word:
              "IMPLEMENTATION" is 14 characters that cannot wrap, and at
              .t-label's 13px/0.16em it needs 140px of content width. Measured
              across 390-1536, the original 7/5 + sm:grid-cols-3 overflowed its
              tile at two real widths — 640 (by 19px) and 1024 (by 33px, the
              worst, because lg is exactly where this column narrows to 7/12).
              Widening the column and holding the 3-up until md clears 640 and
              gets 1024 to within 5px; the tracking below closes the rest. */}
          <Reveal delay={0.1} className="lg:col-span-8">
            <h2 className="t-h2 text-ink mb-8">{d.valueTitle}</h2>
            {/* Three tiers of engagement, not three prices — the deck gives no
                figures and none are invented here. */}
            <dl className="grid md:grid-cols-3 gap-5">
              {d.value.map(({ icon: Icon, label, items }) => (
                <div
                  key={label}
                  className="bg-white border border-hairline p-7 flex flex-col"
                >
                  <span className="w-11 h-11 mb-6 flex items-center justify-center text-lg text-ink border border-hairline">
                    <Icon />
                  </span>
                  {/* 0.10em, not .t-label's 0.16em. Kept at .t-label's 13px
                      rather than dropped to .t-label-sm, which would also have
                      fitted: the ruled items below are already .t-label-sm, so
                      matching them would leave the tier name the same size as
                      its own list and flatten the hierarchy. Tightening the
                      tracking buys the ~11px needed without touching size. */}
                  <dt className="t-label tracking-[0.1em] mb-4">{label}</dt>
                  <dd>
                    <ul className="border-t border-hairline">
                      {items.map((i) => (
                        <li key={i} className="t-label-sm border-b border-hairline py-2.5">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20 lg:py-24 bg-offwhite border-t border-hairline">
        <div className="container-page grid lg:grid-cols-12 gap-x-16 gap-y-10">
          <Reveal className="lg:col-span-5">
            <span className="w-14 h-14 mb-7 flex items-center justify-center text-2xl text-ink border border-hairline bg-white">
              <d.partnershipIcon />
            </span>
            <h2 className="t-h2 text-ink mb-6">{d.partnershipTitle}</h2>
            <p className="t-lead text-ink">{d.partnershipLede}</p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ol className="border-t border-hairline mb-10">
              {d.partnership.map((step, i) => (
                <li
                  key={step.slice(0, 40)}
                  className="flex items-start gap-5 border-b border-hairline py-4"
                >
                  <span className="t-label text-primary shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-body">{step}</span>
                </li>
              ))}
            </ol>
            <Link to="/contact" className="btn-primary">
              {d.cta} <FaArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
