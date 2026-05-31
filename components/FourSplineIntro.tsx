"use client";

import { useEffect, useState } from "react";
import { MotionValue } from "framer-motion";

interface FourSplineIntroProps {
  scrollProgress: MotionValue<number>;
  onLoaded: () => void;
}

export default function FourSplineIntro({
  scrollProgress,
  onLoaded,
}: FourSplineIntroProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Notify parent once iframe has loaded
  useEffect(() => {
    if (iframeLoaded) {
      onLoaded();
    }
  }, [iframeLoaded, onLoaded]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        /* Push the Spline watermark off the bottom edge */
        height: "calc(100vh + 50px)",
        backgroundColor: "#0d0d0d",
      }}
    >
      <iframe
        src="https://my.spline.design/theblackcoffeelandingpagedesignui-vU4g5osXRWaU0AAIavwxfYiS/"
        frameBorder="0"
        width="100%"
        height="100%"
        title="FOUR CAFE 3D Scene"
        onLoad={() => setIframeLoaded(true)}
        style={{
          border: "none",
          display: "block",
          /* Ensure the iframe fills the oversized container,
             pushing the watermark past the overflow clip */
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
          transform: "scale(1.72) translate(-3%, 8%)",
          transformOrigin: "center center",
        }}
        allow="autoplay"
      />
    </div>
  );
}
