import { Link } from "react-router-dom";
import { FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import PageTitle from "@/components/sections/PageTitle";
import Reveal from "@/components/common/Reveal";
import { founder } from "@/data/leadership";

/* No banner photo and no headshot: there is no suitable asset in the repo and
   an advisory firm's leadership page is better plain than illustrated with
   airport stock. `.page-title` falls back to a navy field when `image` is
   omitted. */
export default function Leadership() {
  return (
    <>
      <PageTitle
        title="Leadership"
        crumbs={[{ label: "Home", to: "/" }, { label: "Leadership" }]}
      />

      <section className="py-16 md:py-24 lg:py-28 bg-white">
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

              <div className="flex flex-wrap gap-2">
                {founder.focus.map((f) => (
                  <span
                    key={f}
                    className="border border-hairline text-muted text-[12px] uppercase tracking-[0.14em] px-3 py-1.5"
                  >
                    {f}
                  </span>
                ))}
              </div>
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
