import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import GlobalMobility from "@/components/sections/GlobalMobility";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <MarqueeStrip />
      <Services />
      {/* must stay directly after Services — it sits on the tail of the
          navy backdrop that Services bleeds 334px past its own bottom */}
      <WhyChooseUs />
      <GlobalMobility />
      <Process />
      <Contact />
    </>
  );
}
