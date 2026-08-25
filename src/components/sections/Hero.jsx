import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { heroFeatures } from "@/data/heroFeatures";
import { heroSlides } from "@/data/heroSlides";

const SLIDE_INTERVAL = 5000;

export default function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-offwhite">
      {/* This wrapper — not the section — is what the photo band is measured
          against. The section also contains the feature cards, so anchoring
          the band to it pushed the photo's bottom edge a card's height too
          far down and hid the family's legs. */}
      <div className="relative flex flex-col md:block">
        {/* ---- rotating photo ---------------------------------------
            Both slides are full-body shots: the family fills the frame from
            hairline to shoe and the only empty area is the left third. The
            old layer stretched them over the whole section with
            object-cover, which did three bad things at once — it blew a
            1672x940 file up to ~2000px wide (that was the softness), it hid
            the heads behind the opaque fixed navbar, and it buried the legs
            under the feature cards.

            From md up the photo gets a band of its own that starts below the
            header and stops on the card line, and it is *fitted* rather than
            cropped: object-contain pinned bottom-right paints it at natural
            aspect at whatever size fits, so the family is always whole and
            the file is only ever scaled down, never up.

            A phone is narrower than the photo is tall-to-wide, so fitting it
            there would shrink the family into a stamp in the corner. Below
            md it becomes a full-bleed strip under the copy instead, cropped
            from the left — which only ever eats empty terminal, since both
            slides put the family in the right third. */}
        {/* `isolate` keeps the z-indexes below (slides at 0/1, washes at 10)
            inside this band. Without it they would escape into the section's
            stacking context and the washes would paint over the headline. */}
        <div className="order-2 md:order-none isolate relative aspect-square sm:aspect-[16/9] md:absolute md:aspect-auto md:inset-x-0 md:top-[var(--nav-clear)] md:bottom-[var(--card-overlap)]">
          {/* All slides stay mounted and stacked, and only the incoming one
              animates. Cross-fading both at once — one to 1, the other to 0 —
              leaves the pair semi-transparent through the middle of every
              transition, so the ivory page showed through and the photo
              visibly washed out twice a cycle. Instead the outgoing slide
              holds at full opacity underneath (duration 0, delayed past the
              fade) and is only dropped once the new one is solid on top. */}
          {heroSlides.map((s, i) => (
            <motion.img
              key={s.src}
              src={s.src}
              alt={s.alt}
              initial={false}
              animate={{ opacity: i === slide ? 1 : 0 }}
              transition={
                i === slide
                  ? { duration: 1.2, ease: "easeInOut" }
                  : { duration: 0, delay: 1.2 }
              }
              style={{ zIndex: i === slide ? 1 : 0 }}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-right md:object-contain md:object-right-bottom"
            />
          ))}

          {/* The slides are bright, high-key airport shots. A dark veil would
              have to be near-opaque to carry white type across the headline's
              full width, which is what made the hero heavy — so the wash is
              ivory and the type is navy instead. Navy on this reads ~15:1
              wherever the photo happens to be light or dark. Only needed
              where the copy sits over the photo, so md and up.

              The ramp has to be *finished* before the family starts or it
              greys them out — that was why the photo looked washed. The copy
              column ends at ~50% of the band and the family begins at ~69%,
              so on xl the wash is gone by 60%: full strength under the type,
              nothing at all on the people. Narrower viewports have no such
              corridor — the column takes most of the width there — so the
              ramp runs longer and the photo sits lower in the band instead.

              Stops have to stay on Tailwind's 5% scale; off-scale values like
              `to-62%` generate nothing and silently fall back to 100%. */}
          <div className="hidden md:block absolute inset-0 z-10 bg-gradient-to-r from-offwhite from-40% to-transparent to-70% xl:to-60%" />

          {/* Feather the photo's own top and bottom edges. Fitting rather
              than cropping means those edges now land inside the layout
              instead of off-screen, and slide 1 carries a warm ceiling into
              its top-right corner that would otherwise cut a hard line.

              The top ramp has to be short and fall away fast: the man's
              hair starts only ~5% down the frame, so anything longer than
              this hazes over his head — solid at the seam itself, mostly
              gone by the time it reaches him. */}
          <div className="absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-offwhite from-0% via-offwhite/35 via-35% to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-offwhite from-0% via-offwhite/30 via-40% to-transparent" />
        </div>

        <div className="order-1 md:order-none relative max-w-[1400px] mx-auto px-6">
          <div className="relative md:min-h-[560px] lg:min-h-[620px] flex items-center pt-[calc(var(--nav-clear)+8px)] pb-12 md:pb-[calc(var(--card-overlap)+28px)]">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-3 border border-ink/20 text-ink font-heading font-medium text-[12px] uppercase tracking-[0.18em] px-6 py-3 mb-7"
              >
                <span className="w-6 h-[2px] bg-primary shrink-0" />
                20+ Years of Global Immigration Experience
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="t-display text-ink mb-7"
              >
                Building a Global Platform for Immigration, Mobility &amp;
                Opportunity
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="t-lead max-w-xl mb-10"
              >
                With more than two decades of international experience, we
                connect you with the right immigration professionals, lawyers
                and specialist advisors — because international mobility should
                begin with strategy, not paperwork.
              </motion.p>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                href="#contact"
                className="btn-primary"
              >
                Request A Quote <FaArrowRight />
              </motion.a>

              {/* in flow, so the dots can never collide with the button above
                  or get covered by the feature cards overlapping from below */}
              <div className="flex gap-2 mt-10">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.src}
                    onClick={() => setSlide(i)}
                    aria-label={`Show slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === slide ? "w-8 bg-primary" : "w-1.5 bg-ink/25 hover:bg-ink/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature cards. From md up they reach --card-overlap into the photo
          band above, which reserves exactly that much room for them — on a
          phone the photo is a strip in the flow, so there is nothing to
          overlap and they simply follow it. */}
      <div className="relative bg-offwhite pt-12 md:pt-0 pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[30px] md:-mt-[var(--card-overlap)]">
            {heroFeatures.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.3, ease: "easeOut" }}
                className="feature-block"
              >
                <div className="inner-box">
                  <div className="icon">
                    <card.icon />
                  </div>
                  <div className="content">
                    <h3 className="title">{card.title}</h3>
                    <p className="text">{card.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
