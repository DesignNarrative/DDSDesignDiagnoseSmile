"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Clock, Mail } from "lucide-react";



export default function Hero() {
  return (
    <div className="w-full flex flex-col">
      {/* ── PART 1: Main Banner section with 683.jpg background ── */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] min-h-[420px] sm:min-h-[550px] md:min-h-[650px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 bg-[#FFF8EE]">
          {/* Mobile view banner video */}
          <video
            src="/images/home_page_banner_video_mobile.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full md:hidden"
          />
          {/* Desktop/Tablet view banner video */}
          <video
            src="/images/home_page_banner_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full hidden md:block"
          />
        </div>

        {/* Content Overlay - Aligned to the left over light background */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 w-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl flex flex-col space-y-4 md:space-y-6 text-left"
          >
            {/* Heading in three lines */}
            <h1 className="font-caudex text-primary text-3xl xs:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Diagnose.<br />
              Design.<br />
              Smile.
            </h1>

            {/* Subheading */}
            <p className="font-instrument text-text-dark text-sm xs:text-base md:text-lg lg:text-xl font-medium max-w-md leading-relaxed">
              That&apos;s not just my process — it&apos;s my promise to every patient who trusts me with their smile.
            </p>

            {/* Google Rating Block (Group 70.png) - Hidden on mobile for cleaner text layout */}
            <div className="relative w-[300px] h-[65px] mt-2 hidden md:block">
              <Image
                src="/images/Group 70.png"
                alt="Google Rating 5.0"
                fill
                className="object-contain object-left"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PART 2: Dark Brown Contact & Hour Info Bar ── */}
      <section className="bg-[#380920] text-white py-6 md:py-8 border-t border-white/5 z-10 relative shadow-md">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
          {/* Column 1: WhatsApp Specialist */}
          <div className="flex items-center space-x-4 md:border-r border-white/10 pr-4 last:border-none">
            <div className="bg-white/5 p-3 rounded-full text-cream flex-shrink-0">
              <Image src="/images/whatsapp_icon.svg" alt="WhatsApp" width={20} height={20} className="filter brightness-0 invert" />
            </div>
            <div className="flex flex-col">
              <span className="font-instrument text-xs md:text-sm font-semibold text-cream">Talk to our specialist?</span>
              <a
                href="https://wa.me/919673004407"
                target="_blank"
                rel="noopener noreferrer"
                className="font-instrument text-xs text-white/80 hover:text-cream transition-colors mt-0.5 underline decoration-dotted"
              >
                WhatsApp No.: 96730 04407
              </a>
            </div>
          </div>

          {/* Column 2: Opening Hours */}
          <div className="flex items-center space-x-4 md:border-r border-white/10 pr-4 last:border-none">
            <div className="bg-white/5 p-3 rounded-full text-cream flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-instrument text-xs md:text-sm font-semibold text-cream">Opening Hours</span>
              <span className="font-instrument text-xs text-white/80 mt-0.5">
                Mon to Sat - 10am to 7pm
              </span>
            </div>
          </div>

          {/* Column 3: Email Us */}
          <div className="flex items-center space-x-4 pr-4 last:border-none">
            <div className="bg-white/5 p-3 rounded-full text-cream flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-instrument text-xs md:text-sm font-semibold text-cream">Email Us</span>
              <a
                href="mailto:contact@dentiaclinic.com"
                className="font-instrument text-xs text-white/80 hover:text-cream transition-colors mt-0.5"
              >
                contact@dentiaclinic.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
