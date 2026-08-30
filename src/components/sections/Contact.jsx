import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import useFormSubmit from "@/hooks/useFormSubmit";
import { contactFields } from "@/data/contact";
import bg22 from "@/assets/images/bg22.webp";

const BUTTON_LABEL = {
  idle: "Send Enquiry",
  sending: "Sending…",
  sent: "Enquiry Sent",
  error: "Try Again",
};

export default function Contact() {
  const { status, error, submit } = useFormSubmit("/api/contact");

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-28 bg-offwhite scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 border border-hairline shadow-[0_24px_60px_-40px_rgba(17,34,61,0.45)]">
        {/* Hidden below lg. It is a 420px stock photograph of a couple at an
            airport that carries no information the form does not, and on a
            phone it pushed the actual contact form a full screen down the
            page. Desktop keeps it because the two-column layout needs a left
            half. */}
        <Reveal direction="left" className="hidden lg:block relative min-h-[420px] bg-ink">
          <img
            src={bg22}
            alt="Couple traveling with luggage at the airport"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative h-full flex flex-col justify-center px-10 gap-3">
            {["20+ Years Experience", "Global Mobility Platform", "Strategy-First Approach"].map((t) => (
              <span key={t} className="bg-white text-ink t-h5 w-fit px-5 py-2.5">
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1} className="bg-white px-8 sm:px-14 py-16">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> Contact
          </div>
          <h2 className="t-h2 text-ink mb-5">
            Speak to Our Advisory Team
          </h2>

          <p className="t-body mb-8">
            Prefer email? Write to us at{" "}
            <a
              href="mailto:info@cgrone.com"
              className="text-ink font-medium border-b border-primary hover:text-primary transition-colors"
            >
              info@cgrone.com
            </a>
          </p>

          <form onSubmit={submit} className="space-y-5" noValidate={false}>
            {/* Every field carries a real <label>, visually hidden with
                .sr-only so the design is unchanged.

                They previously had a placeholder and nothing else. A
                placeholder is not a label: it is not reliably exposed as the
                accessible name, and it vanishes the moment someone starts
                typing, so anyone who loses their place — or who is filling
                this in with a screen reader — has no way to tell which field
                they are in. That is WCAG 3.3.2 and 4.1.2, on the one form the
                firm collects enquiries through. */}
            <div className="grid sm:grid-cols-2 gap-5">
              {contactFields.map((f) => (
                <div key={f.name} className="flex flex-col">
                  <label htmlFor={`contact-${f.name}`} className="sr-only">
                    {f.label}
                  </label>
                  <input
                    id={`contact-${f.name}`}
                    name={f.name}
                    type={f.type}
                    placeholder={f.label}
                    required={f.name !== "phone"}
                    autoComplete={f.autoComplete}
                    className="bg-offwhite px-5 py-4 outline-none border border-transparent focus:border-primary transition-colors font-body"
                  />
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Message"
                rows={4}
                className="w-full bg-offwhite px-5 py-4 outline-none border border-transparent focus:border-primary transition-colors font-body resize-none"
              />
            </div>

            {/* Honeypot: hidden from people, irresistible to bots. The API
                accepts anything that fills it in and quietly drops it. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            {/* no scale on hover/tap. A button that grows under the cursor
                reads consumer, not advisory; .btn-primary already darkens. */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full justify-center disabled:opacity-70"
            >
              {BUTTON_LABEL[status]} <FaArrowRight />
            </button>

            {/* aria-live so the outcome reaches a screen reader too — the
                button label alone changes silently. */}
            <p aria-live="polite" className="min-h-[1.25rem] text-sm font-body">
              {status === "sent" && (
                <span className="text-ink">
                  Thanks — we&apos;ve got your enquiry and will be in touch shortly.
                </span>
              )}
              {status === "error" && <span className="text-red-700">{error}</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
