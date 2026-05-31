"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 172;

function getFramePath(index: number): string {
  const frameNum = String(index + 1).padStart(3, "0");
  return `/sequence/ezgif-frame-${frameNum}.jpg`;
}

interface TextBeatProps {
  scrollProgress: MotionValue<number>;
  ranges: [number, number, number, number];
  title: string;
  subtitle: string;
  align: "center" | "left" | "right";
  cta?: { label: string };
}

function TextBeat({
  scrollProgress,
  ranges,
  title,
  subtitle,
  align,
  cta,
}: TextBeatProps) {
  const opacity = useTransform(scrollProgress, ranges, [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, ranges, [40, 0, 0, -40]);
  const scale = useTransform(scrollProgress, ranges, [0.95, 1, 1, 1.02]);
  const filterBlur = useTransform(scrollProgress, ranges, [4, 0, 0, 6]);
  const filter = useTransform(filterBlur, (v) => `blur(${v}px)`);

  const alignClass =
    align === "left"
      ? "items-start text-left pl-6 sm:pl-12 md:pl-20 lg:pl-32"
      : align === "right"
        ? "items-end text-right pr-6 sm:pr-12 md:pr-20 lg:pr-32"
        : "items-center text-center";

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col justify-center ${alignClass} pointer-events-none px-6 z-20`}
      style={{ opacity, y, scale, filter }}
    >
      <h2
        className="font-bold leading-[0.9] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-4 sm:mb-6"
        style={{
          fontFamily: "var(--font-playfair)",
          color: "rgba(255,255,255,0.9)",
          fontSize: "clamp(2rem, 6vw, 5.5rem)",
          textShadow: "0 0 80px rgba(0,0,0,0.5)",
        }}
      >
        {title}
      </h2>
      <p
        className="max-w-md sm:max-w-lg leading-relaxed"
        style={{
          fontFamily: "var(--font-inter)",
          color: "rgba(255,255,255,0.45)",
          fontSize: "clamp(0.8rem, 1.5vw, 1.05rem)",
          fontWeight: 300,
          letterSpacing: "0.04em",
          lineHeight: 1.7,
        }}
      >
        {subtitle}
      </p>

      {cta && (
        <motion.a
          href="#apply"
          className="pointer-events-auto mt-8 sm:mt-10 inline-block border px-8 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm uppercase tracking-[0.25em]"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.6)",
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
          whileHover={{
            scale: 1.03,
            borderColor: "rgba(184, 173, 154, 0.4)",
            color: "rgba(255,255,255,0.9)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {cta.label}
        </motion.a>
      )}
    </motion.div>
  );
}

interface FourExplosionCanvasProps {
  scrollProgress: MotionValue<number>;
  onLoadProgress: (progress: number) => void;
  onLoadComplete: () => void;
}

export default function FourExplosionCanvas({
  scrollProgress,
  onLoadProgress,
  onLoadComplete,
}: FourExplosionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedFrame = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preloading image sequence
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (!isMounted) return;
          images[index] = img;
          loadedCount++;
          onLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
          if (loadedCount === TOTAL_FRAMES) {
            imagesRef.current = images;
            setIsLoaded(true);
            onLoadComplete();
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          onLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
          if (loadedCount === TOTAL_FRAMES) {
            imagesRef.current = images;
            setIsLoaded(true);
            onLoadComplete();
          }
          resolve();
        };
        img.src = getFramePath(index);
      });
    };

    const loadAll = async () => {
      await loadImage(0);
      for (let i = 1; i < TOTAL_FRAMES; i += 12) {
        if (!isMounted) break;
        const batch: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + 12, TOTAL_FRAMES); j++) {
          batch.push(loadImage(j));
        }
        await Promise.all(batch);
      }
    };

    loadAll();
    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Frame rendering logic
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, w, h);

    const imgAspect = 1280 / 720;
    const canvasAspect = w / h;
    let dw: number, dh: number, dx: number, dy: number;

    if (canvasAspect > imgAspect) {
      dw = w;
      dh = w / imgAspect;
      dx = 0;
      dy = (h - dh) / 2;
    } else {
      dh = h;
      dw = h * imgAspect;
      dx = (w - dw) / 2;
      dy = 0;
    }

    ctx.drawImage(img, dx, dy, dw, dh);

    // Cover the default Gemini watermark in the bottom-right corner of the video
    const px = dx + dw * 0.915;
    const py = dy + dh * 0.885;
    const pr = dw * 0.05;

    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(px - pr, py - pr, pr * 2, pr * 2);

    // Overlay dark "FOUR" logo exactly over the covered watermark
    const bs = Math.max(10, w * 0.008);
    ctx.save();
    ctx.font = `600 ${bs}px Inter, sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "2px";
    ctx.fillText("FOUR", px, py);
    ctx.restore();

    // Cinematic vignette
    const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.78);
    vig.addColorStop(0, "rgba(13,13,13,0)");
    vig.addColorStop(0.65, "rgba(13,13,13,0)");
    vig.addColorStop(1, "rgba(13,13,13,0.5)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
  }, []);

  // RequestAnimationFrame scrub loop
  useEffect(() => {
    if (!isLoaded) return;
    let running = true;

    const tick = () => {
      if (!running) return;

      const progress = scrollProgress.get();
      // Section 2 is mapped to progress [0.1, 0.5] (100vh to 500vh out of 1000vh)
      let frameIndex = 0;
      if (progress >= 0.1) {
        const animProgress = Math.min(Math.max((progress - 0.1) / 0.4, 0), 1);
        frameIndex = Math.min(
          Math.max(Math.floor(animProgress * (TOTAL_FRAMES - 1)), 0),
          TOTAL_FRAMES - 1
        );
      }

      if (frameIndex !== lastRenderedFrame.current) {
        lastRenderedFrame.current = frameIndex;
        renderFrame(frameIndex);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    renderFrame(0);
    rafRef.current = requestAnimationFrame(tick);

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
      lastRenderedFrame.current = -1;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, renderFrame, scrollProgress]);

  return (
    <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: "#0d0d0d" }}>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10" />

      {/* ── Beat A (100vh to 200vh, scrollProgress 0.1 to 0.2) ── */}
      <TextBeat
        scrollProgress={scrollProgress}
        ranges={[0.1, 0.125, 0.175, 0.2]}
        title="FOUR"
        subtitle="A lifestyle universe where cuisine, design, and community converge."
        align="center"
      />

      {/* ── Beat B (200vh to 300vh, scrollProgress 0.2 to 0.3) ── */}
      <TextBeat
        scrollProgress={scrollProgress}
        ranges={[0.2, 0.225, 0.275, 0.3]}
        title="INTENTIONAL CHAOS"
        subtitle="In a world of fast and forgettable, we engineer rare experiences."
        align="left"
      />

      {/* ── Beat C (300vh to 400vh, scrollProgress 0.3 to 0.4) ── */}
      <TextBeat
        scrollProgress={scrollProgress}
        ranges={[0.3, 0.325, 0.375, 0.4]}
        title="NOT A PLACE. A WORLD."
        subtitle="From curated fine dining and sensory lounges to limited capsule drops. Every detail is a story."
        align="right"
      />

      {/* ── Beat D (400vh to 500vh, scrollProgress 0.4 to 0.5) ── */}
      <TextBeat
        scrollProgress={scrollProgress}
        ranges={[0.4, 0.425, 0.475, 0.5]}
        title="BELONG TO FOUR"
        subtitle="Enter the inner circle. Experience the unmassed."
        align="center"
        cta={{ label: "Request Access" }}
      />
    </div>
  );
}
