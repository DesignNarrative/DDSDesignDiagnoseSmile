"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Clock, Mail } from "lucide-react";
import ContactInfoBar from "@/components/sections/ContactInfoBar";



export default function Hero() {
  return (
    <div className="w-full flex flex-col">
      {/* ── PART 1: Main Banner section with 683.jpg background ── */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] min-h-[300px] sm:min-h-[450px] md:min-h-[550px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Mobile view banner */}
          <Image
            src="/images/Home Page banner_mobile (1).jpg"
            alt="DDS Dental Clinic Mobile Banner"
            fill
            className="object-cover object-top md:hidden"
            priority
          />
          {/* Desktop/Tablet view banner */}
          <Image
            src="/images/Home Page banner (1).jpg"
            alt="DDS Dental Clinic Desktop Banner"
            fill
            className="object-cover object-top hidden md:block"
            priority
          />
        </div>
      </section>

      {/* ── PART 2: Dark Brown Contact & Info Bar ── */}
      <ContactInfoBar />
    </div>
  );
}
