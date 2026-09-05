import { Link } from "react-router-dom";
import { FaArrowRight, FaAngleRight } from "react-icons/fa";
import PageTitle from "@/components/sections/PageTitle";
import Reveal from "@/components/common/Reveal";

/* Replaces `<Navigate to="/" replace />` on the catch-all route.
 *
 * The silent redirect was the wrong behaviour twice over.
 *
 * For the visitor: a mistyped or dead URL dropped them on the home page with
 * no indication that anything had gone wrong. Because it redirected with
 * `replace`, the bad URL was gone from history too — so they could not even
 * go back and see what they had typed. A page that quietly becomes a
 * different page is the one navigation outcome a user cannot recover from.
 *
 * For the crawler: server.js already sends a real 404 status for unknown
 * paths (see the `isKnown` check there) and then serves index.html, exactly
 * as it should. The client threw that away and rendered the home page at a
 * 404 URL — a textbook soft 404. This makes the served body agree with the
 * status line the server is already sending.
 *
 * No banner image: PageTitle without one is the navy field, which is right
 * here. A skyline photograph would dress up an error.
 */
const ROUTES = [
  {
    to: "/investment-migration",
    label: "Investment & Business Migration",
    text: "Citizenship and residency by investment, and business migration.",
  },
  {
    to: "/global-immigration",
    label: "Global Immigration",
    text: "Canada, Australia, New Zealand and selected global destinations.",
  },
  {
    to: "/workforce-mobility",
    label: "Workforce Mobility",
    text: "Healthcare, hospitality and skilled technical workforce.",
  },
];

export default function NotFound() {
  return (
    <>
      <PageTitle
        title="Page Not Found"
        crumbs={[{ label: "Home", to: "/" }, { label: "Page Not Found" }]}
      />

      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="t-lead">
              The page you were looking for has been moved, renamed, or never
              existed. Nothing is wrong with your connection — the address
              simply does not match a page on this site.
            </p>
            <Link to="/" className="btn-primary mt-9">
              Back to Home <FaArrowRight />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 pt-12 border-t border-hairline">
            <h2 className="t-h4 text-ink mb-8">Or start from one of these</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {ROUTES.map(({ to, label, text }) => (
                <Link
                  key={to}
                  to={to}
                  className="group bg-white border border-hairline p-8 flex flex-col hover:bg-offwhite transition-colors"
                >
                  <h3 className="t-h3 text-ink mb-3">{label}</h3>
                  <p className="t-body mb-7">{text}</p>
                  <span className="link-arrow mt-auto self-start">
                    Explore <FaAngleRight />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
