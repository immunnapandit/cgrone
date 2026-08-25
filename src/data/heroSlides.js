import hero1 from "@/assets/images/hero/new hero 1.webp";
import hero2 from "@/assets/images/hero/new hero 2.webp";

/* Both shots are ~1672x940 with the family standing full-height on the right
   and a bright, near-empty left third — which is where the headline sits.
   Hero.jsx fits them with object-contain pinned bottom-right rather than
   cropping them, so there is no focal point to tune: the whole frame is
   always on screen, and the file is only ever scaled down. Any replacement
   slide has to keep that shape — subject right, clear left third, and at
   least 1600px wide so it still looks sharp on a retina screen. */
export const heroSlides = [
  {
    src: hero1,
    alt: "Family holding passports at an airport window, an aeroplane on the tarmac behind them",
  },
  {
    src: hero2,
    alt: "Family with passports and luggage in a bright airport terminal",
  },
];
