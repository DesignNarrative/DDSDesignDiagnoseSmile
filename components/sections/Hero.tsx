"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Clock, Mail } from "lucide-react";



export default function Hero() {
  return (
    <div className="w-full flex flex-col">
      {/* ── PART 1: Main Banner section with 683.jpg background ── */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] min-h-[300px] sm:min-h-[450px] md:min-h-[550px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Mobile view banner */}
          <Image
            src="/images/home_page_banner_mobile.jpg"
            alt="DDS Dental Clinic Mobile Banner"
            fill
            className="object-cover object-top md:hidden"
            priority
          />
          {/* Desktop/Tablet view banner */}
          <Image
            src="/images/home_page_banner.jpg"
            alt="DDS Dental Clinic Desktop Banner"
            fill
            className="object-cover object-top hidden md:block"
            priority
          />
        </div>
      </section>

      {/* ── PART 2: Dark Brown Contact & Info Bar ── */}
      <section className="bg-[#380920] text-white py-6 md:py-8 border-t border-white/5 z-10 relative shadow-md">
        
        {/* A. DESKTOP & TABLET VIEW (Grid layout) */}
        <div className="hidden md:grid max-w-7xl mx-auto px-8 md:px-16 lg:px-24 grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 items-center">
          
          {/* Column 1: Google Rating */}
          <div className="flex items-center justify-center lg:border-r border-white/10 lg:pr-6 h-full">
            <Image
              src="/images/Group 70.png"
              alt="Google Rating 5.0"
              width={220}
              height={49}
              className="object-contain"
            />
          </div>

          {/* Column 2: 18+ Years Experience */}
          <div className="flex items-center space-x-3 justify-center lg:border-r border-white/10 lg:pr-6 h-full">
            <Image
              src="/images/Tooth.svg"
              alt="Tooth Icon"
              width={28}
              height={28}
              className="w-7 h-7 flex-shrink-0"
            />
            <span className="font-instrument text-xs md:text-sm font-semibold text-white tracking-wide">
              18+ Years Experience
            </span>
          </div>

          {/* Column 3: WhatsApp Specialist */}
          <div className="flex items-center space-x-3 justify-center lg:border-r border-white/10 lg:pr-6 h-full">
            <Image src="/images/whatsapp_icon.svg" alt="WhatsApp" width={28} height={28} className="filter brightness-0 invert w-7 h-7 flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="font-instrument text-[10px] md:text-xs font-semibold text-cream leading-tight">Talk to our specialist?</span>
              <a
                href="https://wa.me/919673004407"
                target="_blank"
                rel="noopener noreferrer"
                className="font-instrument text-xs md:text-sm text-white hover:text-cream transition-colors mt-0.5 underline decoration-dotted font-semibold"
              >
                WhatsApp No.: 96730 04407
              </a>
            </div>
          </div>

          {/* Column 4: Opening Hours */}
          <div className="flex items-center space-x-3 justify-center h-full">
            <Clock className="w-7 h-7 text-white flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="font-instrument text-[10px] md:text-xs font-semibold text-cream leading-tight">Opening Hours</span>
              <span className="font-instrument text-xs md:text-sm text-white mt-0.5 font-semibold">
                Mon to Sat - 10am to 7pm
              </span>
            </div>
          </div>

        </div>

        {/* B. MOBILE VIEW (Custom stacked layout) */}
        <div className="flex md:hidden flex-col items-center justify-center space-y-5 px-6 w-full text-center">
          {/* 1. Google Rating Badge */}
          <div className="w-full flex justify-center">
            <Image
              src="/images/Group 70.png"
              alt="Google Rating 5.0"
              width={200}
              height={44}
              className="object-contain"
            />
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-white/10" />

          {/* 2. Icons in one line */}
          <div className="flex items-center justify-center space-x-8">
            <Image
              src="/images/Tooth.svg"
              alt="Tooth Icon"
              width={28}
              height={28}
              className="w-7 h-7 flex-shrink-0"
            />
            <Image 
              src="/images/whatsapp_icon.svg" 
              alt="WhatsApp" 
              width={28} 
              height={28} 
              className="filter brightness-0 invert w-7 h-7 flex-shrink-0" 
            />
            <Clock className="w-7 h-7 text-white flex-shrink-0" />
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-white/10" />

          {/* 3. Centered Stack of Texts */}
          <div className="flex flex-col space-y-4 text-xs font-semibold text-white tracking-wide">
            
            {/* Experience */}
            <p className="font-instrument">
              18+ Years Experience
            </p>

            {/* WhatsApp */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-cream">Talk to our specialist?</span>
              <a
                href="https://wa.me/919673004407"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cream mt-0.5 underline decoration-dotted"
              >
                WhatsApp No.: 96730 04407
              </a>
            </div>

            {/* Timings */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-cream">Opening Hours</span>
              <span className="text-white mt-0.5">
                Mon to Sat - 10am to 7pm
              </span>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
