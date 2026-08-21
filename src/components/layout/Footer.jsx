import Reveal from "@/components/common/Reveal";
import { footerContactInfo, footerServices, footerLinks, footerSocialIcons } from "@/data/footer";
import logo from "@/assets/images/logo/cgr-one-logo.webp";

export default function Footer() {
  return (
    <footer className="bg-ink text-white pt-0">
      <div className="max-w-[1400px] mx-auto px-6 -translate-y-10">
        <Reveal className="bg-primary grid sm:grid-cols-3 gap-6 px-10 py-10 shadow-xl">
          {footerContactInfo.map((it) => (
            <div key={it.label} className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white text-primary flex items-center justify-center text-xl shrink-0">
                <it.icon />
              </div>
              <div>
                <p className="font-heading font-semibold">{it.label}</p>
                <p className="text-white/90">{it.value}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-16 grid md:grid-cols-4 gap-12">
        <div>
          <a href="#home" className="inline-block bg-white rounded px-4 py-3 mb-5">
            <img src={logo} alt="CGR ONE" className="h-12 w-auto" />
          </a>
          <p className="text-white/60 leading-relaxed mb-6 max-w-xs">
            We work with a passion for taking on challenges and turning them into
            reliable visa outcomes for every client we serve.
          </p>
          <a href="#about" className="btn-primary !py-3 !px-6 text-xs">
            Read More
          </a>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-6">Services</h4>
          <ul className="space-y-3">
            {footerServices.map((s) => (
              <li key={s}>
                <a href="#" className="text-white/60 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="text-primary">»</span> {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-6">Useful Links</h4>
          <ul className="space-y-3">
            {footerLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-white/60 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="text-primary">»</span> {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-6">Newsletter</h4>
          <p className="text-white/60 mb-5">
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
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} CGR ONE. All rights reserved.
      </div>
    </footer>
  );
}
