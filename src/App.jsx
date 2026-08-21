import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Services from "@/components/sections/Services";
import ImmigrationPrograms from "@/components/sections/ImmigrationPrograms";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Countries from "@/components/sections/Countries";
import Process from "@/components/sections/Process";
import Partners from "@/components/sections/Partners";
import Stats from "@/components/sections/Stats";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import ScrollTop from "@/components/common/ScrollTop";

export default function App() {
  return (
    <div className="font-body">
      <Navbar />
      <Hero />
      <About />
      <MarqueeStrip />
      <Services />
      <ImmigrationPrograms />
      <WhyChooseUs />
      <Countries />
      <Process />
      <Partners />
      <Stats />
      <Blog />
      <Contact />
      <Footer />
      <ScrollTop />
    </div>
  );
}
