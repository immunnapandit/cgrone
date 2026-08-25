import { Link } from "react-router-dom";
import WordsSlideUp from "@/components/common/WordsSlideUp";

/** Inner-page banner: full-bleed photo, navy gradient wash, centred title
 *  and a breadcrumb — the reference's `.page-title`. */
export default function PageTitle({ title, crumbs = [], image }) {
  return (
    <section className="page-title" style={{ backgroundImage: `url(${image})` }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="title-outer">
          <WordsSlideUp as="h1" text={title} className="t-display title" />
          <ul className="page-breadcrumb">
            {crumbs.map((c) => (
              <li key={c.label}>
                {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
