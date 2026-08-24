import { useRef } from "react";
import { useInView } from "framer-motion";
import useCountUp from "@/hooks/useCountUp";

export default function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const value = useCountUp(to, inView);

  return (
    <span ref={ref} className="t-num text-4xl block leading-none mb-1.5">
      {value}
      {suffix}
    </span>
  );
}
