import { Link } from "react-router-dom";
import { FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import PageTitle from "@/components/sections/PageTitle";
import Reveal from "@/components/common/Reveal";
import { founder } from "@/data/leadership";
import { skylines } from "@/data/banners";

/* Still no headshot — there is no photograph of the founder in the repo, and a
   leadership page is better plain than illustrated with stock. The banner is
   the Edinburgh skyline (2026-08-30): a city, not a person, so it says nothing
   the page cannot support. */
export default function Leadership() {
  return (
    <>
      <PageTitle
        title="Leadership"
        image={skylines.edinburgh}
        crumbs={[{ label: "Home", to: "/" }, { label: "Leadership" }]}
      />

      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-x-16 gap-y-12">
          {/* name block holds the left rail, the bio runs beside it */}
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 border-t-2 border-primary pt-8">
              <div className="eyebrow mb-6">
                <span className="chev">»</span> Founder
              </div>
              <h2 className="t-h2 text-ink mb-5">{founder.name}</h2>
              {/* the document writes the role as a pipe-separated line — split
                  it so it sets as a list rather than one long wrapped string */}
              <ul className="space-y-1.5 mb-9">
                {founder.role.split("|").map((r) => (
                  <li
                    key={r}
                    className="text-soft text-[13px] uppercase tracking-[0.16em]"
                  >
                    {r.trim()}
                  </li>
                ))}
              </ul>

              {/* Bordered chips here wrapped into a ragged 2/1/1 stack because
                  the labels are long ("International Business Development").
                  Ruled rows instead — the same treatment as the pillar cards
                  and the About list, so a list of specialisms looks the same
                  wherever it appears. */}
              <ul className="border-t border-hairline">
                {founder.focus.map((f) => (
                  <li
                    key={f}
                    className="border-b border-hairline py-2.5 text-muted text-[12px] uppercase tracking-[0.14em]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <h3 className="t-h3 text-ink mb-8">Professional Profile</h3>

            <div className="space-y-6">
              {founder.bio.map((p) => (
                <p key={p.slice(0, 40)} className="t-body">
                  {p}
                </p>
              ))}
            </div>

            <figure className="mt-12 bg-offwhite border-l-2 border-primary px-9 py-10">
              <FaQuoteLeft className="text-ink/25 text-2xl mb-5" />
              <blockquote className="t-h4 text-ink leading-relaxed">
                {founder.quote}
              </blockquote>
              <figcaption className="mt-5 text-soft text-[13px] uppercase tracking-[0.16em]">
                {founder.name}
              </figcaption>
            </figure>

            <Link to="/contact" className="btn-primary mt-12">
              Book a Confidential Consultation <FaArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
