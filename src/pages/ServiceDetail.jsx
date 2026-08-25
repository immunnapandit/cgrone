import { Navigate, useParams, Link } from "react-router-dom";
import { FaArrowRight, FaCheck, FaPhoneAlt } from "react-icons/fa";
import PageTitle from "@/components/sections/PageTitle";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { services } from "@/data/services";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.id === slug);

  // an unknown slug is a dead URL, not an empty page
  if (!service) return <Navigate to="/" replace />;

  const { title, img, overview, points, desc, audience, closing, cta, icon: Icon } = service;

  return (
    <>
      <PageTitle
        title={title}
        image={img}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: `/services/${services[0].id}` },
          { label: title },
        ]}
      />

      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[1fr_360px] gap-14 items-start">
          <Reveal>
            <img
              src={img}
              alt={title}
              className="w-full h-[420px] object-cover mb-12"
            />

            <div className="eyebrow mb-3">
              <span className="chev">»</span> Service Overview
            </div>
            <WordsSlideUp text={title} className="t-h2 text-ink" />
            <p className="t-lead mt-7">{desc}</p>
            <p className="t-body mt-6">{overview}</p>

            <h3 className="t-h3 text-ink mt-12 mb-7">What This Covers</h3>
            <ul className="space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-4 text-ink text-[17px]">
                  <span className="w-6 h-6 mt-1 rounded-full bg-ink text-primary flex items-center justify-center text-[10px] shrink-0">
                    <FaCheck />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            {/* only two of the source documents carry a "Who We Help" /
                "Suitable For" list, so this block is optional */}
            {audience && (
              <>
                <h3 className="t-h3 text-ink mt-12 mb-7">{audience.title}</h3>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {audience.items.map((a) => (
                    <li key={a} className="flex items-start gap-3 t-body">
                      <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-primary shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {closing && (
              <p className="t-lead text-ink border-l-2 border-primary pl-6 mt-12">
                {closing}
              </p>
            )}
          </Reveal>

          <Reveal direction="left" delay={0.1} className="lg:sticky lg:top-32">
            <div className="bg-offwhite p-8 mb-8">
              <h4 className="t-h4 text-ink mb-6">All Services</h4>
              <ul className="space-y-1">
                {services.map((s) => {
                  const active = s.id === slug;
                  return (
                    <li key={s.id}>
                      <Link
                        to={`/services/${s.id}`}
                        className={`flex items-center gap-3 px-4 py-3.5 text-[15px] leading-snug transition-colors ${
                          active
                            ? "bg-ink text-white"
                            : "bg-white text-ink hover:bg-ink hover:text-white"
                        }`}
                      >
                        <s.icon
                          className={`shrink-0 ${active ? "text-primary" : "text-primary"}`}
                        />
                        {s.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bg-ink text-white p-8 text-center">
              <span className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary text-ink flex items-center justify-center text-2xl">
                <Icon />
              </span>
              <h4 className="t-h4 text-white mb-3">
                {cta ?? "Not sure this is your route?"}
              </h4>
              <p className="t-body text-white/70 mb-7">
                Let&rsquo;s start with a conversation.
              </p>
              <a href="/#contact" className="btn-primary w-full justify-center">
                Talk To Us <FaArrowRight />
              </a>
              <a
                href="tel:+91458654528"
                className="flex items-center justify-center gap-3 mt-6 text-primary font-heading text-[15px]"
              >
                <FaPhoneAlt className="text-xs" /> +91 458 654 528
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
