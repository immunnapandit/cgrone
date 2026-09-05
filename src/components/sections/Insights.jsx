import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { insights } from "@/data/insights";

const DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/* Replaces the old Blog section. Gone with it: the "Admin" byline, the
   "0 Comments" counter and the `href="#"` read-more links — three things that
   announce a template blog rather than a firm's published thinking. */
export default function Insights() {
  if (insights.length === 0) return null;

  return (
    <section id="insights" className="py-14 md:py-20 lg:py-24 bg-white scroll-mt-28">
      <div className="container-page">
        <Reveal className="max-w-2xl mb-16">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> Insights
          </div>
          <h2 className="t-h2 text-ink">
            Notes on Cross-Border Business and Mobility
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((p) => (
            <article key={p.slug} className="group border border-hairline flex flex-col">
              {p.img && (
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col flex-1">
                <time
                  dateTime={p.date}
                  className="t-label mb-4"
                >
                  {DATE.format(new Date(p.date))}
                </time>
                <h3 className="t-h4 text-ink mb-4">{p.title}</h3>
                <p className="t-body mb-7">{p.summary}</p>
                <Link
                  to={p.href}
                  className="link-arrow mt-auto self-start"
                >
                  Read More <FaAngleRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
