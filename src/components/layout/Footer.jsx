import { Link } from "react-router-dom";
import Reveal from "@/components/common/Reveal";
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

export default function Footer() {
  return (
    /* Light footer. It used to be a full navy block and was the last big dark
       area left on the page; the gold top rule and the navy contact tiles keep
       it anchored so it still reads as a footer and not as another section. */
    <footer className="bg-offwhite text-ink pt-0 border-t-4 border-primary">
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
                <div className="w-14 h-14 bg-ink text-primary flex items-center justify-center text-xl shrink-0 transition-colors duration-300 group-hover:bg-primary group-hover:text-ink">
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

      <div className="max-w-[1400px] mx-auto px-6 pb-16 grid md:grid-cols-4 gap-12">
        <div>
          {/* the white box existed only to lift the logo off the navy */}
          <Link to="/" className="inline-block mb-5">
            <img src={logo} alt="CGR ONE" className="h-12 w-auto" />
          </Link>
          <p className="t-body mb-7 max-w-xs">
            A global platform connecting clients with immigration
            professionals, lawyers and specialist advisors — built on two
            decades of experience across India, the UK and Canada.
          </p>
          <Link to="/about" className="btn-primary !py-3 !px-6 text-xs">
            Read More
          </Link>
        </div>

        <div>
          <h4 className="t-h4 text-ink mb-6">Services</h4>
          <ul className="space-y-3">
            {footerServices.map((s) => (
              <li key={s.label}>
                <FooterLink href={s.href} className="text-[16px] text-muted hover:text-primary transition-colors flex items-center gap-2">
                  <span className="text-primary">»</span> {s.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="t-h4 text-ink mb-6">Useful Links</h4>
          <ul className="space-y-3">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href} className="text-[16px] text-muted hover:text-primary transition-colors flex items-center gap-2">
                  <span className="text-primary">»</span> {l.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="t-h4 text-ink mb-6">Newsletter</h4>
          <p className="t-body mb-5">
            Sign up for alerts, our latest blogs, thoughts, and insights.
          </p>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your Email address"
              className="bg-white border border-hairline px-5 py-3 outline-none focus:border-primary transition-colors text-ink placeholder:text-soft"
            />
            <button type="submit" className="btn-primary justify-center">
              Subscribe Now
            </button>
          </form>
          <div className="flex gap-3 mt-6">
            {footerSocialIcons.map((Icon, i) => (
              <a
                key={i}
                href="#"
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
        © {new Date().getFullYear()} CGR ONE. All rights reserved.
      </div>
    </footer>
  );
}
