"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Nav() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Determine when to show Nav (after Hero section)
    // Assuming hero + culture transition is roughly 500vh + 100vh = ~600vh, 
    // but a safer check is to see if we've scrolled past a large threshold
    // We will hardcode a safe threshold for now, or use IntersectionObserver in a real app
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 5 : 4000;
    
    if (latest > threshold) {
      setIsVisible(true);
      // Change background after 40px scroll within the visible zone
      if (latest > threshold + 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    } else {
      setIsVisible(false);
      setMenuOpen(false); // Close menu if we scroll back up
    }
  });

  const links = [
    { label: "MENU", href: "#cuisine" },
    { label: "SPACES", href: "#section-spaces" },
    { label: "MEMBERS", href: "#apply" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between pointer-events-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          padding: "clamp(20px, 3vw, 28px) clamp(24px, 5vw, 48px)",
          backgroundColor: isScrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          transition: "background-color 300ms ease, backdrop-filter 300ms ease",
        }}
      >
        {/* Left: Wordmark */}
        <a 
          href="#"
          className="uppercase tracking-[0.28em] font-medium text-[13px]"
          style={{ fontFamily: "var(--font-inter)", color: "#FAF8F5" }}
        >
          FOUR
        </a>

        {/* Right: Desktop Links */}
        <div className="hidden md:flex gap-10">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="group relative uppercase tracking-[0.2em] font-normal text-[11px] transition-colors duration-300 hover:text-[#FAF8F5]"
              style={{ fontFamily: "var(--font-inter)", color: "#B8AD9A" }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#FAF8F5] origin-left scale-x-0 transition-transform duration-150 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* Right: Mobile Hamburger */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-6 h-6 z-[101]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-[18px] h-[1.5px] bg-[#FAF8F5] transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[1.5px]' : '-translate-y-1'}`} />
          <span className={`w-[18px] h-[1.5px] bg-[#FAF8F5] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-[18px] h-[1.5px] bg-[#FAF8F5] transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[1.5px]' : 'translate-y-1'}`} />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.97 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center pointer-events-auto"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            {links.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                className="text-4xl italic mb-8"
                style={{ fontFamily: "var(--font-playfair)", color: "#FAF8F5" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label.toLowerCase()}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
