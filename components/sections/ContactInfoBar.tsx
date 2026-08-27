"use client";

import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

export default function ContactInfoBar() {
  return (
    <section className="bg-[#380920] text-white py-6 md:py-8 border-t border-white/5 z-10 relative shadow-md">
      
      {/* A. DESKTOP & TABLET VIEW (Grid layout) */}
      <div className="hidden md:grid max-w-7xl mx-auto px-8 md:px-16 lg:px-24 grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
        
        {/* Column 1: 18+ Years Experience */}
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

        {/* Column 2: WhatsApp Specialist */}
        <div className="flex items-center space-x-3 justify-center lg:border-r border-white/10 lg:pr-6 h-full">
          <Image src="/images/whatsapp_icon.svg" alt="WhatsApp" width={28} height={28} className="filter brightness-0 invert w-7 h-7 flex-shrink-0" />
          <div className="flex flex-col text-left">
            <span className="font-instrument text-xs md:text-sm font-semibold text-cream leading-tight">Talk to our specialist?</span>
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

        {/* Column 3: Opening Hours */}
        <div className="flex items-center space-x-3 justify-center h-full">
          <Clock className="w-7 h-7 text-white flex-shrink-0" />
          <div className="flex flex-col text-left">
            <span className="font-instrument text-xs md:text-sm font-semibold text-cream leading-tight">Opening Hours</span>
            <span className="font-instrument text-xs text-white/80 mt-0.5">
              Mon to Sat - 10am to 7pm
            </span>
          </div>
        </div>

      </div>

      {/* B. MOBILE VIEW (Aligned exactly like About page contact bar) */}
      <div className="flex md:hidden flex-col space-y-8 px-6 max-w-7xl mx-auto">
        
        {/* Column 1: 18+ Years Experience */}
        <div className="flex items-center space-x-4">
          <div className="bg-white/5 p-3 rounded-full text-cream flex-shrink-0">
            <Image
              src="/images/Tooth.svg"
              alt="Tooth Icon"
              width={20}
              height={20}
              className="w-5 h-5 text-cream"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-instrument text-xs font-semibold text-cream">Experience</span>
            <span className="font-instrument text-xs text-white/80 mt-0.5">
              18+ Years Experience
            </span>
          </div>
        </div>

        {/* Column 2: WhatsApp Specialist */}
        <div className="flex items-center space-x-4">
          <div className="bg-white/5 p-3 rounded-full text-cream flex-shrink-0">
            <Image src="/images/whatsapp_icon.svg" alt="WhatsApp" width={20} height={20} className="filter brightness-0 invert w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-instrument text-xs font-semibold text-cream">Talk to our specialist?</span>
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

        {/* Column 3: Opening Hours */}
        <div className="flex items-center space-x-4">
          <div className="bg-white/5 p-3 rounded-full text-cream flex-shrink-0">
            <Clock className="w-5 h-5 text-cream" />
          </div>
          <div className="flex flex-col">
            <span className="font-instrument text-xs font-semibold text-cream">Opening Hours</span>
            <span className="font-instrument text-xs text-white/80 mt-0.5">
              Mon to Sat - 10am to 7pm
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
