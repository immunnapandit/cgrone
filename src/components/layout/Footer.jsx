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
    <footer className="bg-ink text-white pt-0">
      <div className="max-w-[1400px] mx-auto px-6 -translate-y-10">
        {/* an ivory card floating on the navy footer — a second navy panel
            here would only be 1.5:1 against it and read as a smudge */}
        <Reveal className="bg-white grid sm:grid-cols-3 gap-6 px-10 py-10 shadow-2xl">
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
          <Link to="/" className="inline-block bg-white rounded px-4 py-3 mb-5">
            <img src={logo} alt="CGR ONE" className="h-12 w-auto" />
          </Link>
          <p className="t-body text-white/60 mb-7 max-w-xs">
            A global platform connecting clients with immigration
            professionals, lawyers and specialist advisors — built on two
            decades of experience across India, the UK and Canada.
          </p>
          <Link to="/about" className="btn-primary !py-3 !px-6 text-xs">
            Read More
          </Link>
        </div>

        <div>
          <h4 className="t-h4 text-white mb-6">Services</h4>
          <ul className="space-y-3">
            {footerServices.map((s) => (
              <li key={s.label}>
                <FooterLink href={s.href} className="text-[16px] text-white/60 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="text-primary">»</span> {s.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="t-h4 text-white mb-6">Useful Links</h4>
          <ul className="space-y-3">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href} className="text-[16px] text-white/60 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="text-primary">»</span> {l.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="t-h4 text-white mb-6">Newsletter</h4>
          <p className="t-body text-white/60 mb-5">
            Sign up for alerts, our latest blogs, thoughts, and insights.
          </p>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your Email address"
              className="bg-white/10 border border-white/20 px-5 py-3 outline-none focus:border-primary transition-colors text-white placeholder:text-white/50"
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
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-primary hover:text-ink hover:border-primary transition-colors"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-7 text-center text-white/45 text-[13px] tracking-[0.06em]">
        © {new Date().getFullYear()} CGR ONE. All rights reserved.
      </div>
    </footer>
  );
}
