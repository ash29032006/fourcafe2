"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MembershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0.2, 0.4], ["100%", "0%"]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], ["100%", "0%"]);

  return (
    <section ref={sectionRef} id="apply" className="relative w-full" style={{ backgroundColor: "#0A0A0A", paddingBottom: "120px" }}>
      {/* ── OPENING STATEMENT ── */}
      <div className="relative flex flex-col items-center justify-center w-full" style={{ height: "60vh" }}>
        <div className="flex flex-col items-center">
          <div className="overflow-hidden mb-1">
            <motion.h2
              style={{
                y: y1,
                fontFamily: "var(--font-playfair)",
                color: "#FAF8F5",
                fontSize: "5vw",
                lineHeight: 1.1,
              }}
              className="italic text-center"
            >
              some experiences
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              style={{
                y: y2,
                fontFamily: "var(--font-playfair)",
                color: "#FAF8F5",
                fontSize: "5vw",
                lineHeight: 1.1,
              }}
              className="italic text-center"
            >
              are by invitation only.
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ── THREE TIER CARDS ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 — FOUR GUEST */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            whileHover={{ borderColor: "rgba(184,173,154,0.5)" }}
            className="flex flex-col rounded-[2px] border transition-colors duration-200"
            style={{ 
              backgroundColor: "#141414", 
              borderColor: "rgba(184,173,154,0.2)",
              padding: "40px 32px",
              minHeight: "420px"
            }}
          >
            <h4 className="uppercase text-[11px] tracking-[0.4em]" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
              FOUR GUEST
            </h4>
            <div className="w-full h-[1px] my-5" style={{ backgroundColor: "rgba(184,173,154,0.3)" }} />
            <ul className="flex flex-col text-[14px]" style={{ color: "#FAF8F5", fontFamily: "var(--font-inter)", fontWeight: 300, lineHeight: 2.4 }}>
              <li>Walk-in welcome</li>
              <li>Main floor + café access</li>
              <li>Seasonal menu</li>
              <li>Digital membership card</li>
            </ul>
            <div className="mt-auto pt-6">
              <p className="text-[12px]" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 300 }}>
                No commitment required.
              </p>
            </div>
          </motion.div>

          {/* Card 2 — FOUR MEMBER */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ borderColor: "#FAF8F5" }}
            className="flex flex-col rounded-[2px] border transition-colors duration-200 relative"
            style={{ 
              backgroundColor: "#141414", 
              borderColor: "#B8AD9A",
              padding: "40px 32px",
              minHeight: "420px"
            }}
          >
            <div className="absolute -top-[11px] left-8 px-[10px] py-[4px] border rounded-[2px]" style={{ borderColor: "#B8AD9A", backgroundColor: "#0A0A0A" }}>
              <span className="uppercase text-[10px] tracking-[0.2em]" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
                MOST CONSIDERED
              </span>
            </div>
            <h4 className="uppercase text-[11px] tracking-[0.4em]" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
              FOUR MEMBER
            </h4>
            <div className="w-full h-[1px] my-5" style={{ backgroundColor: "rgba(184,173,154,0.3)" }} />
            <ul className="flex flex-col text-[14px]" style={{ color: "#FAF8F5", fontFamily: "var(--font-inter)", fontWeight: 300, lineHeight: 2.4 }}>
              <li>Everything in Guest</li>
              <li>Reserved seating, all rooms</li>
              <li>Early access to limited drops</li>
              <li>Private tastings + events</li>
              <li>Members app + guest passes</li>
            </ul>
            <div className="mt-auto pt-6">
              <p className="text-[12px]" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 300 }}>
                By application or introduction.
              </p>
            </div>
          </motion.div>

          {/* Card 3 — FOUR CIRCLE */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col rounded-[2px] border group"
            style={{ 
              backgroundColor: "#141414", 
              borderColor: "rgba(184,173,154,0.2)",
              padding: "40px 32px",
              minHeight: "420px"
            }}
          >
            <style jsx>{`
              .group:hover {
                animation: borderPulse 2s ease-in-out infinite;
              }
              @keyframes borderPulse {
                0%, 100% { border-color: rgba(184,173,154,0.2); }
                50%       { border-color: rgba(184,173,154,0.9); }
              }
            `}</style>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="italic text-[22px] mb-3" style={{ color: "#FAF8F5", fontFamily: "var(--font-playfair)" }}>
                not listed here.
              </p>
              <p className="italic text-[18px]" style={{ color: "#B8AD9A", fontFamily: "var(--font-playfair)" }}>
                if you know, you know.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
