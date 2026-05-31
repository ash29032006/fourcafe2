"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  progress: number;
  isComplete: boolean;
}

export default function LoadingScreen({
  progress,
  isComplete,
}: LoadingScreenProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0d0d0d" }}
        >
          {/* Circular progress ring */}
          <div className="relative mb-10">
            <svg
              width="88"
              height="88"
              viewBox="0 0 88 88"
              className="transform -rotate-90"
            >
              {/* Background ring */}
              <circle
                cx="44"
                cy="44"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              {/* Progress ring */}
              <circle
                cx="44"
                cy="44"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: "stroke-dashoffset 0.3s ease-out",
                }}
              />
            </svg>

            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-xs tracking-[0.2em] tabular-nums"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {Math.round(progress)}
              </span>
            </div>
          </div>

          {/* Brand name */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm tracking-[0.35em] uppercase"
            style={{
              color: "rgba(255,255,255,0.25)",
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
            }}
          >
            FOUR
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
