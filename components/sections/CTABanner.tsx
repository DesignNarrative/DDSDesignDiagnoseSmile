"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="relative w-full h-[220px] md:h-[260px] overflow-hidden flex items-center bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta_banner.jpg"
          alt="Book dental care session"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle overlay to keep white text readable while maintaining image clarity */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
          
          {/* Text */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-caudex font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight md:whitespace-nowrap"
          >
            Ready to book your dental care session?
          </motion.h2>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-shrink-0"
          >
            <Link href="/book">
              <button
                className="bg-white text-[#380920] hover:bg-cream-light font-instrument text-sm sm:text-base font-semibold px-8 py-3.5 rounded-[12px] transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                Book an Appointment
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
