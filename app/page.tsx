"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import LoadingScreen from "@/components/LoadingScreen";
import Nav from "@/components/Nav";
import FourSplineIntro from "@/components/FourSplineIntro";
import FourExplosionCanvas from "@/components/FourExplosionCanvas";
import CuisineSection from "@/components/CuisineSection";
import DropsSection from "@/components/DropsSection";
import MembershipSection from "@/components/MembershipSection";
import Footer from "@/components/Footer";

// ── Space card data ──
const SPACES = [
  {
    id: "01",
    label: "The Table",
    description: "Communal dining, reinvented",
    image: "/spaces/space-01.png",
  },
  {
    id: "02",
    label: "The Lounge",
    description: "After-hours grandeur",
    image: "/spaces/space-02.png",
  },
  {
    id: "03",
    label: "The Alcove",
    description: "Intimate, quiet, yours",
    image: "/spaces/space-03.png",
  },
  {
    id: "04",
    label: "The Vault",
    description: "Hidden. By reservation only",
    image: "/spaces/space-04.png",
  },
];

// ── Custom Cursor Component ──
function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });

  const glowX = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const glowY = useSpring(cursorY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${springX.get()}px, ${springY.get()}px, 0) translate(-50%, -50%)`,
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <div
        className="cursor-glow"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${glowX.get()}px, ${glowY.get()}px, 0) translate(-50%, -50%)`,
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
    </>
  );
}

// ── Space Card with Parallax Tilt ──
function SpaceCard({
  space,
  index,
}: {
  space: (typeof SPACES)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="space-card cursor-pointer"
      style={{
        height: "clamp(300px, 50vh, 500px)",
        perspective: "1000px",
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={space.image}
          alt={space.label}
          fill
          className="space-card-image object-cover"
          sizes="(max-width: 640px) 100vw, 30vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,13,13,0.1) 0%, rgba(13,13,13,0.3) 50%, rgba(13,13,13,0.85) 100%)",
        }}
      />

      {/* Hover light spot */}
      <motion.div
        className="absolute inset-0 z-[1] opacity-0 transition-opacity duration-700"
        style={{
          opacity: hovered ? 0.15 : 0,
          background: `radial-gradient(circle at ${mouseX.get() * 100}% ${mouseY.get() * 100}%, rgba(184,173,154,0.3), transparent 60%)`,
        }}
      />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-[3]">
        <div className="flex items-end justify-between">
          <div>
            <span
              className="block text-[9px] uppercase tracking-[0.3em] mb-1"
              style={{
                color: "rgba(184,173,154,0.5)",
                fontFamily: "var(--font-inter)",
                fontWeight: 300,
              }}
            >
              Space {space.id}
            </span>
            <h3
              className="text-md sm:text-lg uppercase tracking-[0.12em]"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
              }}
            >
              {space.label}
            </h3>
          </div>

          {/* Reveal description on hover */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
            transition={{ duration: 0.4 }}
            className="text-[11px] tracking-wide hidden sm:block"
            style={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
            }}
          >
            {space.description}
          </motion.span>
        </div>
      </div>

      {/* Corner accent */}
      <motion.div
        className="absolute top-5 right-5 z-[3]"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
            fill="rgba(184,173,154,0.4)"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ── Horizontal Divider Line ──
function DividerLine() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xs mx-auto my-0"
      style={{
        height: "1px",
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        transformOrigin: "center",
      }}
    />
  );
}

// ── Main Page ──
export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoadComplete, setIsLoadComplete] = useState(false);

  const [canvasProgress, setCanvasProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Loading manager — gate only on canvas frames; Spline loads independently
  useEffect(() => {
    setLoadProgress(Math.round(canvasProgress));

    if (canvasProgress >= 100) {
      setTimeout(() => setIsLoadComplete(true), 500);
    }
  }, [canvasProgress]);

  // Master timeline scroll Progress (0vh to 800vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.015],
    [1, 0]
  );

  // ── SECTION 1: Spline Hero Transforms (Scroll: 0vh to 100vh -> scrollYProgress 0 to 0.1) ──
  const splineOpacity = useTransform(scrollYProgress, [0.08, 0.1], [1, 0], { clamp: true });
  const splineScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.6], { clamp: true });
  const splineDisplay = useTransform(scrollYProgress, (p) => (p < 0.12 ? "block" : "none"));

  // ── SECTION 2: Explosion Canvas Transforms (Scroll: 100vh to 500vh -> scrollYProgress 0.1 to 0.5) ──
  const explosionOpacity = useTransform(
    scrollYProgress,
    [0.095, 0.1, 0.5, 0.505],
    [0, 1, 1, 0]
  );

  // ── SECTION 3: Typography Interlude Transforms (Scroll: 500vh to 800vh -> scrollYProgress 0.5 to 0.8) ──
  const interludeOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.55, 0.75, 0.8],
    [0, 1, 1, 0]
  );
  const interludeScale = useTransform(
    scrollYProgress,
    [0.5, 0.55, 0.75, 0.8],
    [0.95, 1, 1, 1.05]
  );

  // ── SECTION 4: Horizontal Spaces Slider Transforms (Scroll: 800vh to 1000vh -> scrollYProgress 0.8 to 1.0) ──
  const spacesOpacity = useTransform(scrollYProgress, [0.79, 0.8], [0, 1]);
  const spacesX = useTransform(scrollYProgress, [0.8, 0.98], ["0%", "-60%"]);

  // Render trigger controls to disable components when out of view (improves GPU performance)
  const isSplineActive = useTransform(scrollYProgress, (p) => (p < 0.11 ? "auto" : "none"));
  const isExplosionActive = useTransform(scrollYProgress, (p) => (p >= 0.09 && p <= 0.51 ? "auto" : "none"));
  const isInterludeActive = useTransform(scrollYProgress, (p) => (p > 0.49 && p < 0.81 ? "auto" : "none"));
  const isSpacesActive = useTransform(scrollYProgress, (p) => (p >= 0.79 ? "auto" : "none"));

  return (
    <>
      {/* Navigation */}
      <Nav />

      {/* Loading Gate */}
      <LoadingScreen progress={loadProgress} isComplete={isLoadComplete} />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Film Grain Overlay removed */}

      {/* Main Content */}
      <main>
        {/* ── MASTER TIMELINE WRAPPER (1000vh) ── */}
        <div ref={containerRef} className="relative w-full" style={{ height: "1000vh" }}>
          
          <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: "#0d0d0d" }}>
            
            {/* ── SECTION 1: Spline Hero ── */}
            <motion.div
              style={{
                opacity: splineOpacity,
                scale: splineScale,
                display: splineDisplay,
                pointerEvents: isSplineActive,
              }}
              className="absolute inset-0 w-full h-full z-10 origin-center"
            >
              <FourSplineIntro
                scrollProgress={scrollYProgress}
                onLoaded={() => {}}
              />


            </motion.div>

            {/* ── SECTION 2: Explosion Canvas Sequence ── */}
            <motion.div
              style={{
                opacity: explosionOpacity,
                pointerEvents: isExplosionActive,
              }}
              className="absolute inset-0 w-full h-full z-10"
            >
              <FourExplosionCanvas
                scrollProgress={scrollYProgress}
                onLoadProgress={(p) => setCanvasProgress(p)}
                onLoadComplete={() => {}}
              />
            </motion.div>

            {/* ── SECTION 3: Typography Interlude ── */}
            <motion.div
              style={{
                opacity: interludeOpacity,
                scale: interludeScale,
                pointerEvents: isInterludeActive,
              }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#0d0d0d] px-6"
            >
              <div className="text-center">
                <h2
                  className="leading-[1.05]"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "clamp(2.5rem, 6.5vw, 6rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  Where cuisine
                  <br />
                  meets culture.
                </h2>
              </div>
            </motion.div>

            {/* ── SECTION 4: Horizontal Spaces Grid ── */}
            <motion.div
              style={{
                opacity: spacesOpacity,
                pointerEvents: isSpacesActive,
              }}
              className="absolute inset-0 z-30 bg-[#0d0d0d] flex items-center"
            >
              <div className="w-full flex items-center relative overflow-hidden h-full">
                
                {/* Fixed Description Title on the Left */}
                <div className="absolute left-8 sm:left-12 md:left-20 top-1/2 -translate-y-1/2 z-40 max-w-sm pointer-events-none">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-4 text-[#B8AD9A]" style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}>
                    The Spaces
                  </p>
                  <h2 className="text-3xl sm:text-4xl uppercase tracking-[0.1em] text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                    No two rooms
                    <br />
                    feel the same.
                  </h2>
                  <p className="text-xs sm:text-sm text-white/30" style={{ fontFamily: "var(--font-inter)", fontWeight: 300, lineHeight: 1.6 }}>
                    Scroll vertically to transition through the layout of the estate.
                  </p>
                </div>

                {/* Horizontal slider container */}
                <motion.div
                  style={{ x: spacesX }}
                  className="flex gap-6 sm:gap-8 items-center h-full pl-[38vw] pr-24"
                >
                  {SPACES.map((space, i) => (
                    <div key={space.id} className="w-[300px] sm:w-[400px] md:w-[460px] flex-shrink-0">
                      <SpaceCard space={space} index={i} />
                    </div>
                  ))}
                </motion.div>

              </div>
            </motion.div>

            {/* ── Scroll Indicator ── */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
              style={{ opacity: scrollIndicatorOpacity }}
            >
              <motion.div
                className="w-px h-10"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 300,
                }}
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Scroll to explore
              </motion.span>
            </motion.div>

          </div>
        </div>

        {/* ── Downstream sections ── */}
        <CuisineSection />
        <DropsSection />
        <MembershipSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
