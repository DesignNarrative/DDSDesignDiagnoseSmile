"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedNumberProps {
  value: string;
}

function AnimatedNumber({ value }: AnimatedNumberProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[\d,]/g, ""); // Get '+' or other non-numeric chars

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());
  const isInView = useInView(numberRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: 2,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, count, numericValue]);

  return (
    <span ref={numberRef} className="font-caudex font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mb-1">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      value: "18+",
      label: "YEARS OF EXPERIENCE",
    },
    {
      value: "2500+",
      label: "MICROSCOPE-ASSISTED ROOT CANALS",
    },
    {
      value: "1000+",
      label: "COSMETIC SMILE DESIGNING CASES",
    },
    {
      value: "750+",
      label: "DENTAL IMPLANTS",
    },
  ];

  return (
    <section ref={ref} className="bg-primary text-white py-12 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-white/20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-2 sm:px-4 py-4 md:py-0 justify-start"
            >
              <AnimatedNumber value={stat.value} />
              <span className="font-instrument text-sm sm:text-base text-cream-light font-semibold leading-snug mt-1 max-w-[220px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative vector background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
    </section>
  );
}

