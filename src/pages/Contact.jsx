import { LuGlobe, LuMail, LuMessageCircle } from "react-icons/lu";
import PageTitle from "@/components/sections/PageTitle";
import ContactSection from "@/components/sections/Contact";
import Reveal from "@/components/common/Reveal";
import { skylines } from "@/data/banners";

/* Contact was only ever a "#contact" anchor on the home page. Every reference
   firm has a real page, and an anchor cannot be linked to from an email, a
   business card or a search result. The form itself is the shared section, so
   there is one form to maintain, not two. */
const WAYS = [
  {
    icon: LuMail,
    label: "Email",
    value: "info@cgrone.com",
    href: "mailto:info@cgrone.com",
    text: "Written enquiries reach the advisory team directly.",
  },
  {
    icon: LuGlobe,
    label: "Where We Operate",
    value: "India · UK · Canada · Australia · New Zealand",
    text: "Every matter is routed to regulated professionals in the destination jurisdiction.",
  },
  {
    icon: LuMessageCircle,
    label: "What Happens Next",
    value: "A conversation, not a quote",
    text: "We start by understanding the objective, then set out the routes that actually fit it.",
  },
];

export default function Contact() {
  return (
    <>
      <PageTitle
        title="Contact Us"
        image={skylines.london}
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact Us" }]}
      />

      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="container-page">
          <Reveal className="max-w-2xl mb-16">
            <div className="eyebrow mb-6">
              <span className="chev">»</span> Get in Touch
            </div>
            <h2 className="t-h2 text-ink mb-6">
              Tell Us Where You Want to Get To
            </h2>
            <p className="t-body">
              Whether you are planning a UK or Canadian entity, moving employees
              across borders or weighing up your options, the first step is the
              same — a conversation about the objective behind the move.
            </p>
          </Reveal>

          <Reveal amount={0.15}>
            <div className="grid md:grid-cols-3 border border-hairline divide-y md:divide-y-0 md:divide-x divide-hairline">
              {WAYS.map(({ icon: Icon, label, value, href, text }) => {
                /* only the email is actionable — the other two are statements,
                   so they must not render as dead links */
                const Wrapper = href ? "a" : "div";
                return (
                  <Wrapper
                    key={label}
                    {...(href ? { href } : {})}
                    className="group bg-offwhite p-9 lg:p-11 transition-colors duration-300 hover:bg-white"
                  >
                    <span className="w-14 h-14 mb-8 flex items-center justify-center text-2xl text-ink border border-hairline transition-colors duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white">
                      <Icon />
                    </span>
                    <p className="t-label mb-2">
                      {label}
                    </p>
                    <p className="t-h4 text-ink mb-3 break-words">{value}</p>
                    <p className="t-body">{text}</p>
                  </Wrapper>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
