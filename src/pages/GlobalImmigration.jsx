import { Link } from "react-router-dom";
import { FaArrowRight, FaAngleRight } from "react-icons/fa";
import PageTitle from "@/components/sections/PageTitle";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { countryPages } from "@/data/countryPages";
import StatementBand from "@/components/sections/StatementBand";
import { skylines } from "@/data/banners";

/* Pillar 2 — the hub the layout document puts countries underneath.
 *
 * It lists "Canada | Australia | New Zealand | Selected Global Destinations".
 * India and the UK are NOT here: their content is business expansion, so they
 * sit under Investment & Business Migration instead. This page therefore
 * filters the country set rather than rendering all five. */
const IMMIGRATION_COUNTRIES = ["canada", "australia", "new-zealand"];

export default function GlobalImmigration() {
  const countries = IMMIGRATION_COUNTRIES.map((s) =>
    countryPages.find((c) => c.slug === s)
  ).filter(Boolean);

  return (
    <>
      <PageTitle
        title="Global Immigration"
        image={skylines.toronto}
        crumbs={[{ label: "Home", to: "/" }, { label: "Global Immigration" }]}
      />

      <section className="py-16 md:py-24 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-10 items-end pb-12 mb-12 border-b border-hairline">
            <Reveal className="lg:col-span-7">
              <div className="eyebrow mb-6">
                <span className="chev">»</span> Global Immigration
              </div>
              <WordsSlideUp
                text="For individuals, families and professionals."
                className="t-h2 text-ink"
              />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <Link to="/contact" className="btn-primary">
                Book a Confidential Consultation <FaArrowRight />
              </Link>
            </Reveal>
          </div>

          <Reveal className="max-w-3xl space-y-5 mb-14">
            <p className="t-body">
              Whether your goal is permanent residence, employment, study, family
              reunification or a long-term future abroad, the right pathway starts
              with understanding your circumstances, your objectives and your
              plans — not with picking a visa category.
            </p>
            <p className="t-body">
              Immigration advice is regulated in each of these countries. We
              provide the international client relationship and strategic
              coordination, and work with the appropriately qualified
              professional in the destination country for the advice, the
              application and any representation.
            </p>
          </Reveal>

          <Reveal amount={0.15}>
            <div className="grid md:grid-cols-3 gap-5">
              {countries.map((c) => (
                <Link
                  key={c.slug}
                  to={`/countries/${c.slug}`}
                  className="group bg-white border border-hairline p-8 lg:p-10 flex flex-col hover:bg-offwhite transition-colors"
                >
                  <c.Flag
                    title={c.name}
                    className="w-12 h-8 object-cover rounded-[2px] ring-1 ring-ink/10 mb-7"
                  />
                  <h2 className="t-h3 text-ink mb-3">{c.name}</h2>
                  <p className="t-body text-base mb-7">{c.lede}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-ink font-heading font-semibold text-[12px] uppercase tracking-[0.16em] border-b-2 border-primary pb-1.5 self-start group-hover:gap-3 transition-all">
                    Explore {c.name} <FaAngleRight className="text-xs" />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 border border-hairline bg-offwhite p-8 lg:p-10 max-w-3xl">
              <h2 className="t-h4 text-ink mb-3">Selected Global Destinations</h2>
              <p className="t-body text-base">
                We also advise on other destinations where a genuine pathway
                exists for a client's circumstances. If the country you have in
                mind is not listed here, tell us what you are trying to achieve
                and we will say honestly whether we can help.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <StatementBand
        image={skylines.london}
        position="60% 50%"
        eyebrow="Professional Responsibility"
        line="Regulated advice always comes from the qualified professional in the destination country."
        cta={{ to: "/contact", label: "Speak to our team" }}
      />
    </>
  );
}
