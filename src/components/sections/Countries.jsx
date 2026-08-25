import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { countries } from "@/data/countries";

const arrowClass =
  "absolute top-5 right-5 w-9 h-9 bg-ink text-primary flex items-center justify-center text-sm hover:bg-primary hover:text-ink transition-colors";

export default function Countries() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-3 bg-brand" />
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-3 gap-14">
        <Reveal direction="left" className="lg:col-span-1">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> Choose Country
          </div>
          <h2 className="t-h2 text-ink mb-6">
            Countries we support for immigration
          </h2>
          <p className="t-body">
            Two decades of hands-on work across India, the United Kingdom and
            Canada — with every case routed to regulated professionals in the
            destination country.
          </p>
        </Reveal>

        {/* self-start: without it the card grid stretches to the height of
            the copy column beside it and every card grows a dead footer */}
        <div className="lg:col-span-2 self-start grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
              className="bg-offwhite p-7 relative"
            >
              {/* the arrow used to be a dead button — it now opens the page
                  that covers this country. "/#..." targets stay real <a>
                  hrefs so the browser still handles the anchor scroll. */}
              {c.href.includes("#") ? (
                <a
                  href={c.href}
                  aria-label={`${c.name} — get in touch`}
                  className={arrowClass}
                >
                  <FaArrowRight />
                </a>
              ) : (
                <Link
                  to={c.href}
                  aria-label={`${c.name} immigration services`}
                  className={arrowClass}
                >
                  <FaArrowRight />
                </Link>
              )}
              {/* fixed height so a two-line country name keeps its dashed
                  rule level with the cards beside it */}
              <div className="flex items-center gap-4 mb-4 pr-12 min-h-[3.4rem]">
                <c.Flag
                  title={c.name}
                  className="w-10 h-[26px] object-cover shrink-0 rounded-[2px] ring-1 ring-ink/10"
                />
                <h3 className="t-h4 text-ink">{c.name}</h3>
              </div>
              <div className="border-t border-dashed border-hairline mb-4" />
              <p className="t-small">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
