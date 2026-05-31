"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  } as const;

  return (
    <motion.footer 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full border-t"
      style={{ 
        backgroundColor: "#0A0A0A", 
        borderColor: "rgba(184,173,154,0.15)",
        padding: "clamp(60px, 8vw, 80px) clamp(24px, 5vw, 64px) clamp(40px, 5vw, 48px)"
      }}
    >
      {/* ── TOP ROW ── */}
      <div className="flex justify-between items-end">
        <motion.div variants={itemVariants} className="flex flex-col">
          <span className="uppercase text-[22px] tracking-[0.25em]" style={{ color: "#FAF8F5", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
            FOUR
          </span>
          <span className="uppercase text-[10px] tracking-[0.5em] mt-1" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 400 }}>
            CAFE
          </span>
        </motion.div>
        <motion.div variants={itemVariants}>
          <p className="italic text-[16px]" style={{ color: "#B8AD9A", fontFamily: "var(--font-playfair)" }}>
            a world, not a venue.
          </p>
        </motion.div>
      </div>

      {/* ── MIDDLE ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 pt-14">
        
        {/* Col 1 */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <h5 className="uppercase text-[10px] tracking-[0.3em] mb-4" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
            VISIT
          </h5>
          <div className="flex flex-col text-[13px]" style={{ color: "#FAF8F5", fontFamily: "var(--font-inter)", fontWeight: 300, lineHeight: 2.2 }}>
            <p>128 Modernity Ave.</p>
            <p>Design District</p>
            <br />
            <p>Mon–Fri  8:00 — 23:00</p>
            <p>Sat–Sun  9:00 — 02:00</p>
          </div>
        </motion.div>

        {/* Col 2 */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <h5 className="uppercase text-[10px] tracking-[0.3em] mb-4" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
            NAVIGATE
          </h5>
          <div className="flex flex-col text-[13px]" style={{ color: "#FAF8F5", fontFamily: "var(--font-inter)", fontWeight: 300, lineHeight: 2.4 }}>
            {['Menu', 'Spaces', 'Cuisine', 'Drops', 'Membership'].map((link, i) => (
              <a key={i} href="#" className="group relative w-max">
                {link}
                <span className="absolute -bottom-[2px] left-0 w-full h-[1px] bg-[#FAF8F5] origin-left scale-x-0 transition-transform duration-150 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Col 3 */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <h5 className="uppercase text-[10px] tracking-[0.3em] mb-4" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
            CONNECT
          </h5>
          <div className="flex flex-col text-[13px]" style={{ color: "#FAF8F5", fontFamily: "var(--font-inter)", fontWeight: 300, lineHeight: 2.4 }}>
            <a href="#" className="group relative w-max">
              Instagram
              <span className="absolute -bottom-[2px] left-0 w-full h-[1px] bg-[#FAF8F5] origin-left scale-x-0 transition-transform duration-150 ease-out group-hover:scale-x-100" />
            </a>
            <a href="#" className="group relative w-max">
              Members App
              <span className="absolute -bottom-[2px] left-0 w-full h-[1px] bg-[#FAF8F5] origin-left scale-x-0 transition-transform duration-150 ease-out group-hover:scale-x-100" />
            </a>
          </div>
        </motion.div>

      </div>

      {/* ── BOTTOM ROW ── */}
      <motion.div variants={itemVariants} className="w-full h-[0.5px] mt-12 mb-6" style={{ backgroundColor: "rgba(184,173,154,0.12)" }} />
      <motion.div variants={itemVariants} className="flex justify-between items-center text-[11px]" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 300 }}>
        <span>© FOUR CAFE</span>
        <span>nothing is mass created.</span>
      </motion.div>

    </motion.footer>
  );
}
