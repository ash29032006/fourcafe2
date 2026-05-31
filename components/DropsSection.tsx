"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DropsSection() {
  const drops = [
    { name: "FOUR Black Tee", edition: "EDITION 001 OF 050", status: "AVAILABLE", image: "/assets/drop_tee.png" },
    { name: "Wabi-Sabi Cup", edition: "EDITION 001 OF 030", status: "SOLD", image: "/assets/drop_cup.png" },
    { name: "Night Scent No.4", edition: "EDITION 001 OF 020", status: "SOLD", image: "/assets/drop_candle.png" },
  ];

  return (
    <section id="drops" className="relative w-full pb-32" style={{ backgroundColor: "#0A0A0A", overflow: "hidden" }}>
      {/* ── TICKER ── */}
      <div className="w-full overflow-hidden border-t border-b py-3 group" style={{ borderColor: "rgba(184,173,154,0.15)" }}>
        <div className="ticker flex whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="uppercase text-[11px] tracking-[0.3em] pr-4" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
              LIMITED · ONE TIME · NOT RESTOCKED · INTENTIONAL ·&nbsp;
            </span>
          ))}
        </div>
        <style jsx>{`
          .ticker {
            animation: ticker 22s linear infinite;
          }
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24">
        {/* ── FEATURED DROP ── */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center mb-32">
          {/* Left: Featured Ceramic Mug Image */}
          <div className="w-full md:w-[45%] h-[400px] flex items-center justify-center relative bg-[#151515] border border-white/5 rounded-sm overflow-hidden group">
            <Image 
              src="/assets/drop_cup.png" 
              alt="FOUR Ceramic Mug" 
              fill
              className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
            />
          </div>

          {/* Right: Spec Sheet */}
          <div className="w-full md:w-[55%]">
            <h3 className="uppercase text-[13px] tracking-[0.2em] mb-4" style={{ color: "#FAF8F5", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
              FOUR CERAMIC MUG — ISSUE NO. 001
            </h3>
            <div className="w-full h-[1px] mb-6" style={{ backgroundColor: "#B8AD9A" }} />
            
            <div className="flex flex-col gap-3">
              {[
                { label: "Capacity", value: "240ml (precisely)" },
                { label: "Material", value: "Matte black stoneware" },
                { label: "Origin", value: "Unnamed studio, intentionally" },
                { label: "Thermal rating", value: "Holds heat longer than your attention span" },
                { label: "Dishwasher safe", value: "Technically. We recommend you don't." },
                { label: "Drop frequency", value: "When it feels right" },
                { label: "AI-powered", value: "No. Thankfully." },
                { label: "Pairing", value: "The Four espresso. Obviously." }
              ].map((spec, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col"
                >
                  <div className="flex justify-between py-2 text-[13px]" style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}>
                    <span style={{ color: "#B8AD9A" }}>{spec.label}</span>
                    <span className="text-right" style={{ color: "#FAF8F5", maxWidth: "60%" }}>{spec.value}</span>
                  </div>
                  {i < 7 && <div className="w-full h-[0.5px]" style={{ backgroundColor: "rgba(184,173,154,0.15)" }} />}
                </motion.div>
              ))}
            </div>

            <div className="w-full h-[1px] mt-6 mb-4" style={{ backgroundColor: "#B8AD9A" }} />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="uppercase text-[12px] tracking-[0.3em]" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 500 }}
            >
              STATUS: [ AVAILABLE ]
            </motion.div>
          </div>
        </div>

        {/* ── DROP GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {drops.map((drop, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, borderColor: "rgba(184,173,154,0.6)" }}
              className="flex flex-col p-6 rounded-[2px] border group cursor-pointer"
              style={{ 
                backgroundColor: "#1F1F1F", 
                borderColor: "rgba(184,173,154,0.2)",
                transition: "transform 200ms cubic-bezier(0.25,0.1,0.25,1), border-color 200ms ease"
              }}
            >
              <div className="relative w-full aspect-square overflow-hidden mb-4 rounded-sm">
                <Image 
                  src={drop.image} 
                  alt={drop.name} 
                  fill 
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-100 scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h4 className="text-[13px] mt-2 mb-1" style={{ color: "#FAF8F5", fontFamily: "var(--font-inter)", fontWeight: 500 }}>{drop.name}</h4>
              <p className="text-[11px] mb-4" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 300 }}>{drop.edition}</p>
              
              <div className="mt-auto">
                <span 
                  className={`text-[11px] tracking-[0.2em] uppercase ${drop.status === 'SOLD' ? 'opacity-[0.35] line-through' : ''}`}
                  style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 400 }}
                >
                  {drop.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="flex flex-col items-center justify-center pt-16 text-center">
          <h3 className="italic text-[22px] mb-2" style={{ color: "#FAF8F5", fontFamily: "var(--font-playfair)" }}>
            drops are announced through the members&apos; app.
          </h3>
          <p className="text-[14px] mb-8" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 300 }}>
            you should probably be on the list.
          </p>
          <a href="#apply" className="inline-block px-8 py-3.5 rounded-[1px] uppercase text-[11px] tracking-[0.4em] transition-colors duration-150" 
             style={{ backgroundColor: "#B8AD9A", color: "#0A0A0A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
            JOIN THE LIST
          </a>
        </div>
      </div>
    </section>
  );
}
