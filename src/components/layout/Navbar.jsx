import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { navLinks } from "@/data/navigation";
import useScrollPosition from "@/hooks/useScrollPosition";
import logo from "@/assets/images/logo/cgr-one-logo.webp";

export default function Navbar() {
  const scrolled = useScrollPosition(40);
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-lg py-2" : "bg-white py-4"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <img src={logo} alt="CGR ONE" className="h-14 sm:h-16 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-8 font-heading text-sm font-semibold tracking-wide uppercase">
          {navLinks.map((l) =>
            l.children ? (
              <div key={l.label} className="relative group py-2">
                <button className="flex items-center gap-1 text-ink hover:text-primary transition-colors duration-300">
                  {l.label}
                  <HiChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-white rounded-xl shadow-xl border border-black/5 py-2 normal-case">
                    {l.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="block px-5 py-2.5 text-sm font-medium tracking-normal text-ink hover:text-primary hover:bg-offwhite transition-colors duration-200"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="relative py-2 text-ink hover:text-primary transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            )
          )}
        </nav>

        <a href="#contact" className="hidden lg:inline-flex btn-primary !py-3 !px-6 text-xs">
          Contact Us
        </a>

        <button className="lg:hidden text-3xl text-ink" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:hidden overflow-hidden bg-white border-t"
          >
            <div className="flex flex-col px-6 py-4 gap-1 font-heading font-semibold uppercase text-sm">
              {navLinks.map((l) =>
                l.children ? (
                  <div key={l.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between py-3 text-ink hover:text-primary transition-colors"
                    >
                      {l.label}
                      <HiChevronDown
                        className={`text-xs transition-transform duration-300 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-4"
                        >
                          {l.children.map((c) => (
                            <a
                              key={c.label}
                              href={c.href}
                              onClick={() => setOpen(false)}
                              className="block py-2.5 text-xs normal-case font-medium text-ink/80 hover:text-primary transition-colors"
                            >
                              {c.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="py-3 text-ink hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                )
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
