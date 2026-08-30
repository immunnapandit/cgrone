import { Link } from "react-router-dom";
import Reveal from "@/components/common/Reveal";
import useFormSubmit from "@/hooks/useFormSubmit";
import { footerContactInfo, footerServices, footerLinks, footerSocialIcons } from "@/data/footer";
import logo from "@/assets/images/logo/cgr-one-logo.webp";

/** Route links navigate in-app; "/#section" anchors stay real <a> hrefs so
 *  the browser still does the scrolling once it lands on the home page. */
function FooterLink({ href, className, children }) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

const SUBSCRIBE_LABEL = {
  idle: "Subscribe Now",
  sending: "Subscribing…",
  sent: "Subscribed!",
  error: "Try Again",
};

export default function Footer() {
  const { status, error, submit: subscribe } = useFormSubmit("/api/newsletter");

  return (
    /* Light footer. It used to be a full navy block and was the last big dark
       area left on the page; the gold top rule and the navy contact tiles keep
       it anchored so it still reads as a footer and not as another section. */
    <footer className="bg-offwhite text-ink pt-0 border-t-2 border-primary">
      <div className="max-w-[1400px] mx-auto px-6 -translate-y-10">
        {/* white card on ivory — a soft shadow does the separating now that
            there is no navy behind it */}
        <Reveal className="bg-white grid sm:grid-cols-3 gap-6 px-10 py-10 shadow-xl border border-hairline">
          {footerContactInfo.map((it) => {
            /* phone and mail are dialable/mailable, the address is not */
            const Wrapper = it.href ? "a" : "div";
            return (
              <Wrapper
                key={it.label}
                {...(it.href ? { href: it.href } : {})}
                className={`flex items-center gap-4 group ${it.href ? "" : "cursor-default"}`}
              >
                <div className="w-14 h-14 bg-ink text-white flex items-center justify-center text-xl shrink-0 transition-colors duration-300 group-hover:bg-primary group-hover:text-ink">
                  <it.icon />
                </div>
                <div>
                  <p className="font-heading font-medium text-[12px] uppercase tracking-[0.18em] text-soft mb-0.5">{it.label}</p>
                  <p className="t-h5 text-ink leading-snug break-all">{it.value}</p>
                </div>
              </Wrapper>
            );
          })}
        </Reveal>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-12 md:pb-16 grid md:grid-cols-4 gap-8 md:gap-12">
        <div>
          {/* the white box existed only to lift the logo off the navy */}
          <Link to="/" className="inline-block mb-5">
            <img src={logo} alt="Cynosure Global Residency" className="h-12 w-auto" />
          </Link>
          <p className="t-body mb-7 max-w-xs">
            An international advisory platform for immigration, global mobility,
            investment migration and cross-border opportunities — working with
            trusted professionals across jurisdictions.
          </p>
          <Link to="/about" className="btn-primary !py-3 !px-6 text-xs">
            Read More
          </Link>
        </div>

        <div>
          {/* h2, not h4. The footer is a landmark of its own, not a
              continuation of whatever section happened to end above it — and
              because it renders on every page, an h4 here put a level skip
              (h2 -> h4) at the bottom of the entire site. Styling is .t-h4, so
              the tag change is invisible. */}
          <h2 className="t-h4 text-ink mb-6">What We Do</h2>
          {/* two columns on a phone. Stacked, these two lists ran to fourteen
              full-width rows and were most of the footer's height. */}
          <ul className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-1 sm:space-y-3">
            {footerServices.map((s) => (
              <li key={s.label}>
                {/* The "»" that prefixed all seventeen footer links is gone.
                    A double-angle bullet on every item is a stock-theme tell,
                    and it makes a list of destinations read as a list of
                    instructions. Hover darkens to navy rather than turning
                    gold — gold text on the offwhite footer is only 3.3:1. */}
                <FooterLink href={s.href} className="text-[16px] text-muted hover:text-ink transition-colors">
                  {s.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="t-h4 text-ink mb-6">Useful Links</h2>
          {/* two columns on a phone. Stacked, these two lists ran to fourteen
              full-width rows and were most of the footer's height. */}
          <ul className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-1 sm:space-y-3">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href} className="text-[16px] text-muted hover:text-ink transition-colors">
                  {l.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="t-h4 text-ink mb-6">Newsletter</h2>
          <p className="t-body mb-5">
            Sign up for alerts, our latest blogs, thoughts, and insights.
          </p>
          <form className="flex flex-col gap-3" onSubmit={subscribe}>
            {/* labelled for the same reason as the contact form's fields */}
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Your Email address"
              className="bg-white border border-hairline px-5 py-3 outline-none focus:border-primary transition-colors text-ink placeholder:text-soft"
            />

            {/* Honeypot — see the matching field on the contact form. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary justify-center disabled:opacity-70"
            >
              {SUBSCRIBE_LABEL[status]}
            </button>

            <p aria-live="polite" className="min-h-[1.25rem] text-sm">
              {status === "sent" && (
                <span className="text-ink">Thanks for subscribing.</span>
              )}
              {status === "error" && <span className="text-red-700">{error}</span>}
            </p>
          </form>
          {/* only profiles with a real URL are rendered — see footer.js */}
          <div className="flex gap-3 mt-6 empty:mt-0">
            {footerSocialIcons
              .filter((s) => s.href)
              .map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="w-9 h-9 border border-hairline text-ink flex items-center justify-center hover:bg-primary hover:text-ink hover:border-primary transition-colors"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* text-muted, not text-soft — soft lands at 4.52:1 on ivory and this
          line is 13px, so it has almost no margin */}
      <div className="border-t border-hairline py-7 text-center text-muted text-[13px] tracking-[0.06em]">
        © {new Date().getFullYear()} Cynosure Global Residency. All rights reserved.
      </div>
    </footer>
  );
}
