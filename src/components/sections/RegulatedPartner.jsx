import Reveal from "@/components/common/Reveal";

/* The two-column "what we do / what the regulated practitioner does" split.
 *
 * The Canada, Australia and New Zealand documents each carry this block in
 * almost identical form, and it is the single most important trust element on
 * the site: it tells a prospective client exactly where regulated advice sits.
 * Treat the wording as a professional-responsibility statement — summarise the
 * layout if you must, never the text.
 */
export default function RegulatedPartner({ data }) {
  if (!data) return null;
  const { heading, sub, lead, ours, theirs, note } = data;

  return (
    <section className="py-14 md:py-20 lg:py-24 bg-white border-y border-hairline">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="max-w-3xl mb-14">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> Professional Responsibility
          </div>
          <h2 className="t-h2 text-ink mb-4">{heading}</h2>
          <p className="t-h5 text-soft mb-6">{sub}</p>
          <p className="t-body">{lead}</p>
        </Reveal>

        <Reveal amount={0.15}>
          <div className="grid md:grid-cols-2 border border-hairline divide-y md:divide-y-0 md:divide-x divide-hairline">
            {[ours, theirs].map((col, i) => (
              <div
                key={col.title}
                /* ours reads as the lighter half, the regulated practitioner as
                   the anchored one — the point is that advice sits over there */
                className={i === 0 ? "bg-white p-9 lg:p-11" : "bg-ink p-9 lg:p-11"}
              >
                <h3 className={`t-h4 mb-7 ${i === 0 ? "text-ink" : "text-white"}`}>
                  {col.title}
                </h3>
                <ul className="space-y-3.5">
                  {col.items.map((it) => (
                    <li
                      key={it}
                      className={`flex items-start gap-3 text-[16px] ${
                        i === 0 ? "text-muted" : "text-white/75"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-ink/25 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="t-body text-base mt-8 max-w-4xl border-l-2 border-primary pl-6">
            {note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
