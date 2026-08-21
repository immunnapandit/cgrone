import { FaPlane } from "react-icons/fa";
import { marqueeItems } from "@/data/marqueeItems";

export default function MarqueeStrip() {
  const loop = [...marqueeItems, ...marqueeItems];
  return (
    <div className="bg-primary text-white overflow-hidden py-4 relative z-10">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-6 font-heading font-bold uppercase tracking-wide text-lg mx-6">
            {item}
            <FaPlane className="text-white/80" />
          </span>
        ))}
      </div>
    </div>
  );
}
