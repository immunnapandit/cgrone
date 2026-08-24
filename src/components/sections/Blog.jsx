import { motion } from "framer-motion";
import { FaUser, FaCommentDots, FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import { blogPosts } from "@/data/blogPosts";

export default function Blog() {
  return (
    <section id="blog" className="py-28 bg-white scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal className="text-center mb-16">
          <div className="eyebrow mx-auto justify-center mb-6">
            <span className="chev">»</span> News &amp; Blog
          </div>
          <h2 className="t-h2 text-ink">
            Latest News from insight
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 bg-brand text-white text-center px-4 py-2">
                  <div className="t-num text-white text-2xl leading-none">{p.date}</div>
                </div>
                <div className="absolute bottom-0 left-[64px] bg-white text-ink text-xs px-3 py-2">{p.month}</div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-5 text-[12px] uppercase tracking-[0.14em] text-soft mb-4">
                  <span className="flex items-center gap-2">
                    <FaUser className="text-primary" /> Admin
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCommentDots className="text-primary" /> 0 Comments
                  </span>
                </div>
                <h3 className="t-h4 text-ink mb-5 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <a href="#" className="inline-flex items-center gap-2 text-primary font-heading font-semibold text-[12px] uppercase tracking-[0.16em]">
                  Full Article
                  <span className="w-7 h-7 rounded-full bg-ink text-primary flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <FaArrowRight className="text-xs" />
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
