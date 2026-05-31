"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CuisineSection() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <section id="cuisine" className="relative w-full" style={{ backgroundColor: "#0A0A0A" }}>
      {/* ── EDITORIAL GRID ── */}
      <div className="px-6 md:px-12 pt-20 md:pt-32 pb-32">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[2px] w-full max-w-7xl mx-auto items-center md:items-stretch">
          
          {/* Col 1 */}
          <div className="w-full md:w-[52%] relative overflow-hidden group">
            <motion.div
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1.0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full"
              style={{ height: "70vh", minHeight: "500px" }}
            >
              <Image 
                src="/assets/cuisine_plate.png" 
                alt="Spring Chapter IV" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <div className="absolute bottom-6 left-6 z-10">
              <p className="uppercase text-[11px] tracking-[0.3em]" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 300 }}>
                SPRING · CHAPTER IV
              </p>
            </div>
          </div>

          {/* Col 2 */}
          <div className="w-full md:w-[24%] flex items-center p-6 md:p-8 relative">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="uppercase text-[10px] tracking-[0.4em]" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
                FROM THE KITCHEN
              </p>
              <div className="w-[40px] h-[1px] my-4" style={{ backgroundColor: "#B8AD9A" }} />
              <p className="text-[15px]" style={{ color: "#FAF8F5", fontFamily: "var(--font-inter)", fontWeight: 300, lineHeight: 1.85 }}>
                Each dish begins with a question, not a recipe. The answer changes with the season.
              </p>
            </motion.div>
          </div>

          {/* Col 3 */}
          <div className="w-full md:w-[24%] relative mt-8 md:mt-[80px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative w-full aspect-[3/4]"
            >
              <Image 
                src="/assets/cuisine_hands.png" 
                alt="Kitchen preparation" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </motion.div>
          </div>
        </div>

        {/* ── MENU TEASER ── */}
        <div className="w-full flex flex-col items-center justify-center pt-24 text-center">
          <p className="text-[16px]" style={{ color: "#B8AD9A", fontFamily: "var(--font-inter)", fontWeight: 300, lineHeight: 1.8 }}>
            we change the menu when the seasons do.
          </p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="italic text-[22px] mt-2 mb-10" 
            style={{ color: "#FAF8F5", fontFamily: "var(--font-playfair)" }}
          >
            and sometimes when we just feel like it.
          </motion.p>
          
          <a href="#" className="group relative uppercase tracking-[0.3em] font-medium text-[11px]" style={{ color: "#FAF8F5", fontFamily: "var(--font-inter)" }}>
            VIEW CURRENT MENU →
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#FAF8F5] origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
