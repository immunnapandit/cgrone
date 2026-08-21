import Reveal from "@/components/common/Reveal";
import { partners } from "@/data/partners";

export default function Partners() {
  return (
    <section id="partners" className="relative py-28 bg-offwhite overflow-hidden scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="text-center mb-16 max-w-2xl mx-auto">
          <div className="eyebrow mx-auto justify-center mb-6">
            <span className="chev">»</span> Our Partners
          </div>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-ink leading-tight mb-6">
            Backed by a Trusted Network
          </h2>
          <p className="text-gray-500 leading-relaxed">
            We work alongside regulated legal, financial and institutional
            partners around the world to keep every case compliant and moving.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.08}
              className="flex items-center gap-5 bg-white px-8 py-7 shadow-sm border border-black/5"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl shrink-0">
                <p.icon />
              </div>
              <h3 className="font-heading font-semibold text-ink leading-snug">{p.name}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
