import { FaArrowRight } from "react-icons/fa";
import { LuGlobe } from "react-icons/lu";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { aboutIntro } from "@/data/aboutPage";
import image1 from "@/assets/images/about/About2.webp";
import image2 from "@/assets/images/about/About3.webp";

export default function AboutIntro() {
  const { eyebrow, heading, text, infoBox, blocks, stat } = aboutIntro;

  return (
    <section className="about-section-two">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* copy sits right on desktop (reference uses order-lg-2) */}
          <Reveal
            direction="left"
            delay={0.1}
            className="content-column order-2 lg:order-2"
          >
            <div className="sec-title">
              <div className="eyebrow mb-3">
                <span className="chev">»</span> {eyebrow}
              </div>
              <WordsSlideUp text={heading} className="t-h2 text-ink" />
              <p className="t-body mt-7">{text}</p>
            </div>

            <div className="content-box">
              <div className="info-box">
                <h3 className="t-h5 text-ink title">{infoBox.title}</h3>
                <a className="read-more font-heading" href={infoBox.href}>
                  More <FaArrowRight />
                </a>
              </div>

              {blocks.map((b) => (
                <div key={b.title} className="about-block-two">
                  <span className="icon">
                    <b.icon />
                  </span>
                  <h3 className="t-h4 text-ink title">{b.title}</h3>
                  <p className="t-body text">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="btm-box">
              <a href="/contact" className="btn-primary">
                Discover More <FaArrowRight />
              </a>
            </div>
          </Reveal>

          <Reveal direction="right" className="image-column order-1 lg:order-1">
            <div className="inner-column">
              <figure className="image-1">
                <img src={image1} alt="Couple waiting at the airport with passports and luggage" />
              </figure>
              <figure className="image-2">
                <img src={image2} alt="Traveller holding a passport and boarding pass abroad" />
              </figure>

              <div className="experience">
                <span className="icon">
                  <LuGlobe />
                </span>
                <strong>{stat.value}</strong>
                <span className="whitespace-pre-line">{stat.label}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
