import { useRef } from "react";
import { useInView } from "framer-motion";
import useCountUp from "@/hooks/useCountUp";

export default function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const value = useCountUp(to, inView);

  return (
    <span ref={ref} className="font-heading font-bold text-4xl text-ink">
      {value}
      {suffix}
    </span>
  );
}
