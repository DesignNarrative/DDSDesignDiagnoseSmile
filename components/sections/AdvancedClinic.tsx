"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

export default function AdvancedClinic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    "Personalized treatment plans",
    "State-of-the-Art Technology",
    "Gentle care for young adults",
    "Pain-free & comfortable care"
  ];

  return (
    <section ref={ref} className="py-16 md:py-20 bg-[#FFF8EE]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[4/3] sm:aspect-[1.5/1] lg:aspect-[4/3] rounded-[24px] overflow-hidden shadow-lg"
          >
            <Image
              src="/images/PM_4477.jpg.jpeg"
              alt="Pune’s Benchmark in Digital Dentistry"
              fill
              className="object-cover object-[center_25%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-start"
          >
            {/* Title */}
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              Pune’s Benchmark <br />
              in Digital Dentistry!
            </h2>

            {/* Subtitle */}
            <h3 className="font-caudex font-bold text-base md:text-lg text-primary/80 mt-4 mb-2">
              Trusted for precision, proven over 18 years — and counting.
            </h3>

            {/* Description */}
            <p className="font-instrument text-text-dark text-sm leading-relaxed mb-6 max-w-xl">
              At DDS, we don&apos;t just treat teeth — we craft smiles with the precision of technology and the warmth of genuine care.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 w-full mb-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={3} />
                  <span className="font-instrument text-sm text-text-dark leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/about">
              <button
                className="border border-[#380920] hover:bg-[#380920] text-[#380920] hover:text-white font-instrument text-xs font-semibold px-8 py-2.5 rounded-[12px] transition-all duration-200"
              >
                Know More
              </button>
            </Link>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
