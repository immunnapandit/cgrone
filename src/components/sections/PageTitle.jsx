import { Link } from "react-router-dom";
import WordsSlideUp from "@/components/common/WordsSlideUp";

/** Inner-page banner: full-bleed photo, navy gradient wash, centred title
 *  and a breadcrumb — the reference's `.page-title`.
 *
 *  `image` is optional. Without it the banner is the navy field alone, which
 *  `.page-title`'s background-color provides — passing `url(undefined)` would
 *  leave the veil sitting on white and the title unreadable. */
export default function PageTitle({ title, crumbs = [], image }) {
  return (
    <section
      className="page-title"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
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
