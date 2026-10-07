"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function InsideTheTooth() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth responsive spring physics for scroll position
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.1,
    restDelta: 0.0005,
  });

  // ==========================================
  // Layer Opacities (Smooth Crossfades)
  // ==========================================
  // Stage 1: Healthy Isolated Tooth (0.00 -> 0.20)
  const opacity1 = useTransform(smoothProgress, [0.0, 0.14, 0.20], [1, 1, 0]);
  const scale1 = useTransform(smoothProgress, [0.0, 0.20], [1.0, 1.03]);

  // Stage 2: Anatomical Cutaway (0.16 -> 0.38)
  const opacity2 = useTransform(smoothProgress, [0.14, 0.20, 0.32, 0.38], [0, 1, 1, 0]);
  const scale2 = useTransform(smoothProgress, [0.16, 0.38], [1.01, 1.05]);

  // Stage 3: Endodontic File Inside Canal (0.34 -> 0.56)
  const opacity3 = useTransform(smoothProgress, [0.32, 0.38, 0.50, 0.56], [0, 1, 1, 0]);
  const scale3 = useTransform(smoothProgress, [0.34, 0.56], [1.02, 1.07]);

  // Stage 4: Microscopic Canal Close-up (0.52 -> 0.74)
  const opacity4 = useTransform(smoothProgress, [0.50, 0.56, 0.68, 0.74], [0, 1, 1, 0]);
  const scale4 = useTransform(smoothProgress, [0.52, 0.74], [1.03, 1.09]);

  // Stage 5: Treated / Sealed Root Canal (0.70 -> 0.88)
  const opacity5 = useTransform(smoothProgress, [0.68, 0.74, 0.84, 0.89], [0, 1, 1, 0]);
  const scale5 = useTransform(smoothProgress, [0.70, 0.88], [1.05, 1.01]);

  // Stage 6: Restored Full Tooth in Bone (0.85 -> 1.00)
  const opacity6 = useTransform(smoothProgress, [0.84, 0.90, 1.0], [0, 1, 1]);
  const scale6 = useTransform(smoothProgress, [0.85, 1.0], [0.98, 1.02]);

  // Gentle floating 3D parallax
  const groupY = useTransform(smoothProgress, [0.0, 0.5, 1.0], [0, -8, 0]);

  // Scroll hint fade out
  const scrollHintOpacity = useTransform(smoothProgress, [0.0, 0.1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FFF8EE]"
      style={{ height: "240vh" }}
    >
      {/* ── STICKY VIEWPORT (100vh) ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center py-8 md:py-12 px-6 select-none bg-[#FFF8EE]">
        
        {/* Soft Ambient Warm Studio Lighting */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] md:w-[750px] h-[500px] md:h-[750px] rounded-full bg-gradient-to-b from-[#FAF4EA] to-[#F3ECE0] opacity-80 blur-3xl" />
        </div>

        {/* ── 1. HEADER AREA: Non-Scary Reassuring Title & Subtitle ── */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto pt-2 md:pt-4">
          <span className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-[#380920]/80 mb-2">
            GENTLE & PRECISE CARE
          </span>
          <h2 className="font-caudex font-bold text-2xl sm:text-3xl md:text-4xl text-[#380920] tracking-tight leading-snug">
            How We Gently Save Your Natural Tooth
          </h2>
          <p className="font-instrument text-sm sm:text-base text-[#380920]/80 mt-2 max-w-xl leading-relaxed">
            A calm, step-by-step look at preserving your smile and relieving pain.
          </p>
        </div>

        {/* ── 2. CENTER AREA: Medium-Sized Balanced Tooth Visual ── */}
        <div className="relative z-10 w-full max-w-[620px] sm:max-w-[700px] md:max-w-[780px] h-[40vh] sm:h-[46vh] md:h-[50vh] flex items-center justify-center my-auto">
          
          {/* Subtle Grounding Floor Shadow */}
          <div className="absolute bottom-[2%] sm:bottom-[4%] w-[220px] sm:w-[320px] md:w-[420px] h-[16px] sm:h-[22px] bg-[#380920]/10 rounded-full blur-xl pointer-events-none transform scale-y-50" />

          {/* Tooth Animation Layers */}
          <motion.div
            style={{ y: groupY }}
            className="relative w-full h-full flex items-center justify-center"
          >
            
            {/* 1. Realistic Isolated Molar Tooth */}
            <motion.div
              style={{
                opacity: opacity1,
                scale: scale1,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full max-h-[46vh]">
                <Image
                  src="/images/rct/stage-1.webp"
                  alt="Micro-Endodontics isolated molar tooth"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_15px_30px_rgba(56,9,32,0.10)]"
                  sizes="(max-width: 768px) 90vw, 780px"
                  quality={95}
                />
              </div>
            </motion.div>

            {/* 2. Molar Tooth Anatomical Cutaway */}
            <motion.div
              style={{
                opacity: opacity2,
                scale: scale2,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full max-h-[46vh]">
                <Image
                  src="/images/rct/stage-2.webp"
                  alt="Molar tooth anatomical internal cutaway"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_15px_30px_rgba(56,9,32,0.10)]"
                  sizes="(max-width: 768px) 90vw, 780px"
                  quality={95}
                />
              </div>
            </motion.div>

            {/* 3. Endodontic File Inside Molar Root Canal */}
            <motion.div
              style={{
                opacity: opacity3,
                scale: scale3,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full max-h-[46vh]">
                <Image
                  src="/images/rct/stage-3.webp"
                  alt="Gentle root canal cleaning with endodontic file"
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(56,9,32,0.10)]"
                  sizes="(max-width: 768px) 90vw, 780px"
                  quality={95}
                />
              </div>
            </motion.div>

            {/* 4. Molar Root Canal Anatomy Close-Up */}
            <motion.div
              style={{
                opacity: opacity4,
                scale: scale4,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full max-h-[46vh] rounded-[24px] md:rounded-[32px] overflow-hidden">
                <Image
                  src="/images/rct/stage-4.webp"
                  alt="Microscopic magnification root canal anatomy"
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(56,9,32,0.10)]"
                  sizes="(max-width: 768px) 90vw, 780px"
                  quality={95}
                />
              </div>
            </motion.div>

            {/* 5. Root Canal Treated Molar Cutaway */}
            <motion.div
              style={{
                opacity: opacity5,
                scale: scale5,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full max-h-[46vh]">
                <Image
                  src="/images/rct/stage-5.webp"
                  alt="Root canal treated molar cutaway"
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(56,9,32,0.10)]"
                  sizes="(max-width: 768px) 90vw, 780px"
                  quality={95}
                />
              </div>
            </motion.div>

            {/* 6. Photorealistic Molar Anatomy Cutaway */}
            <motion.div
              style={{
                opacity: opacity6,
                scale: scale6,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full max-h-[46vh]">
                <Image
                  src="/images/rct/stage-6.webp"
                  alt="Photorealistic restored molar anatomy cutaway"
                  fill
                  className="object-contain drop-shadow-[0_20px_35px_rgba(56,9,32,0.12)]"
                  sizes="(max-width: 768px) 90vw, 780px"
                  quality={95}
                />
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* ── 3. BOTTOM AREA: Minimal Subtle Scroll Track & Hint ── */}
        <div className="relative z-20 flex flex-col items-center space-y-2 pb-2 md:pb-4">
          <div className="w-36 sm:w-48 h-1 bg-[#380920]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C99E5C] to-[#380920]"
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
            />
          </div>
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="flex items-center space-x-1.5 text-[11px] font-montserrat tracking-widest text-[#380920]/60 uppercase font-semibold"
          >
            <span>Scroll to explore stages</span>
            <span className="animate-bounce inline-block">↓</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
