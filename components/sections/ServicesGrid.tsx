"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { services } from "@/lib/data/siteData";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mappings to SVG icon files in public/images
const iconMap: Record<string, string> = {
  "general-dentistry":    "/images/general_dentistry_icon.svg",
  "cosmetic-dentistry":   "/images/cosmetic_dentistry_icon.svg",
  "restorative-dentistry":"/images/restorative_treatment_icon.svg",
  "orthodontic-treatment":"/images/orthodontic_treatment_icon.svg",
  "laser-dentistry":      "/images/laser_dentistry_icon.svg",
};

export default function ServicesGrid() {
  const ref    = useRef(null);
  const scroll = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const pan = (dir: "left" | "right") => {
    scroll.current?.scrollBy({ left: dir === "right" ? 384 : -384, behavior: "smooth" });
  };

  return (
    <section ref={ref} id="services" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-caudex font-bold text-2xl md:text-3xl text-center text-primary mb-12 max-w-3xl mx-auto leading-snug"
        >
          Complete Dental Care for Your Family –
        </motion.h2>

        {/* Carousel row */}
        <div className="flex items-center gap-3 md:gap-5 justify-center">

          {/* Prev */}
          <button
            onClick={() => pan("left")}
            aria-label="Previous services"
            className="hidden lg:flex flex-shrink-0 w-11 h-11 rounded-full border-2 border-primary/20 bg-white hover:bg-primary hover:border-primary text-primary hover:text-white transition-all duration-200 items-center justify-center shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable track with items centered horizontally inside the container */}
          <div
            ref={scroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full py-4 justify-start items-stretch"
            style={{ scrollbarWidth: "none" }}
          >
            {services.map((service, i) => {
              if (service.id === "general-dentistry") {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="snap-center flex-shrink-0 flex flex-col h-[750px] lg:h-[680px]"
                  >
                    <div className="flex flex-col h-[750px] lg:h-[680px] w-[290px] xs:w-[320px] md:w-[360px] bg-white rounded-[24px] overflow-hidden border border-border-neutral shadow-lg transition-all duration-300">
                      {/* Top Image */}
                      <div className="relative w-full h-[220px] flex-shrink-0">
                        <Image
                          src="/images/74143.jpg"
                          alt="General & Family Dentistry"
                          fill
                          className="object-cover"
                          priority={i < 2}
                        />
                      </div>
                      
                      {/* Card Body */}
                      <div className="flex flex-col flex-1 px-6 py-6 text-center items-center">
                        {/* Title */}
                        <h3 className="font-caudex font-bold text-xl md:text-2xl text-primary mb-3">
                          General & Family Dentistry
                        </h3>
                        
                        {/* Description */}
                        <p className="font-instrument text-text-dark text-sm leading-relaxed mb-4 max-w-sm">
                          Our general dentistry services focus on the prevention, diagnosis, and treatment of a wide range of oral health issues.
                        </p>
                        
                        {/* Icons Grid */}
                        <div className="grid grid-cols-2 w-full border-t border-b border-gray-100 my-2 mt-auto">
                          {/* Cell 1: Routine Dental Checkups */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Routine Dental Checkups.svg"
                                alt="Routine Dental Checkups"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Routine Dental Checkups
                            </span>
                          </div>

                          {/* Cell 2: Teeth Cleaning & Scaling */}
                          <div className="flex flex-col items-center justify-center p-4 border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Teeth Cleaning & Scaling.svg"
                                alt="Teeth Cleaning & Scaling"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Teeth Cleaning & Scaling
                            </span>
                          </div>

                          {/* Cell 3: Dental Crowns & Bridges */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Dental Crowns & Bridges.svg"
                                alt="Dental Crowns & Bridges"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Dental Crowns & Bridges
                            </span>
                          </div>

                          {/* Cell 4: Wisdom Tooth Extraction */}
                          <div className="flex flex-col items-center justify-center p-4 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Wisdom Tooth Extraction.svg"
                                alt="Wisdom Tooth Extraction"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Wisdom Tooth Extraction
                            </span>
                          </div>
                        </div>

                        {/* Know More Button */}
                        <div className="mt-4 w-full flex justify-center">
                          <Link
                            href="/services/general-dentistry"
                            className="border border-[#62826B] hover:bg-[#62826B] text-[#62826B] hover:text-white font-instrument text-xs font-semibold px-8 py-2.5 rounded-[12px] transition-all duration-200"
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (service.id === "cosmetic-dentistry") {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="snap-center flex-shrink-0 flex flex-col h-[750px] lg:h-[680px]"
                  >
                    <div className="flex flex-col h-[750px] lg:h-[680px] w-[290px] xs:w-[320px] md:w-[360px] bg-white rounded-[24px] overflow-hidden border border-border-neutral shadow-lg transition-all duration-300">
                      {/* Top Image */}
                      <div className="relative w-full h-[220px] flex-shrink-0">
                        <Image
                          src="/images/15279.jpg"
                          alt="Cosmetic Dentistry"
                          fill
                          className="object-cover"
                          priority={i < 2}
                        />
                      </div>
                      
                      {/* Card Body */}
                      <div className="flex flex-col flex-1 px-6 py-6 text-center items-center">
                        {/* Title */}
                        <h3 className="font-caudex font-bold text-xl md:text-2xl text-primary mb-3">
                          Cosmetic Dentistry
                        </h3>
                        
                        {/* Description */}
                        <p className="font-instrument text-text-dark text-sm leading-relaxed mb-4 max-w-sm">
                          Our cosmetic dentistry services are designed to improve the appearance of your teeth, gums, and overall smile.
                        </p>
                        
                        {/* Icons Grid */}
                        <div className="grid grid-cols-2 w-full border-t border-b border-gray-100 my-2 mt-auto">
                          {/* Cell 1: Digital Smile Design */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Digital Smile Design.svg"
                                alt="Digital Smile Design"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Digital Smile Design
                            </span>
                          </div>

                          {/* Cell 2: Composite Bonding */}
                          <div className="flex flex-col items-center justify-center p-4 border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Composite Bonding.svg"
                                alt="Composite Bonding"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Composite Bonding
                            </span>
                          </div>

                          {/* Cell 3: Porcelain Veneers */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Dental Crowns & Bridges.svg"
                                alt="Porcelain & Ceramic Veneers"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Porcelain & Ceramic Veneers
                            </span>
                          </div>

                          {/* Cell 4: CEREC Restorations */}
                          <div className="flex flex-col items-center justify-center p-4 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/CEREC Same-Day Restorations.svg"
                                alt="CEREC Same-Day Restorations"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              CEREC Same-Day Restorations
                            </span>
                          </div>
                        </div>

                        {/* Know More Button */}
                        <div className="mt-4 w-full flex justify-center">
                          <Link
                            href="/services/cosmetic-dentistry"
                            className="border border-[#62826B] hover:bg-[#62826B] text-[#62826B] hover:text-white font-instrument text-xs font-semibold px-8 py-2.5 rounded-[12px] transition-all duration-200"
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (service.id === "orthodontic-treatment") {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="snap-center flex-shrink-0 flex flex-col h-[750px] lg:h-[680px]"
                  >
                    <div className="flex flex-col h-[750px] lg:h-[680px] w-[290px] xs:w-[320px] md:w-[360px] bg-white rounded-[24px] overflow-hidden border border-border-neutral shadow-lg transition-all duration-300">
                      {/* Top Image */}
                      <div className="relative w-full h-[220px] flex-shrink-0">
                        <Image
                          src="/images/54356.jpg"
                          alt="Orthodontics"
                          fill
                          className="object-cover"
                          priority={i < 2}
                        />
                      </div>
                      
                      {/* Card Body */}
                      <div className="flex flex-col flex-1 px-6 py-6 text-center items-center">
                        {/* Title */}
                        <h3 className="font-caudex font-bold text-xl md:text-2xl text-primary mb-3">
                          Orthodontics
                        </h3>
                        
                        {/* Description */}
                        <p className="font-instrument text-text-dark text-sm leading-relaxed mb-4 max-w-sm">
                          Our braces are designed to straighten and align teeth, enhancing both the aesthetics and functionality of your smile.
                        </p>
                        
                        {/* Icons Grid */}
                        <div className="grid grid-cols-2 w-full border-t border-b border-gray-100 my-2 mt-auto">
                          {/* Cell 1: Invisalign */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Invisalign.svg"
                                alt="Invisalign"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Invisalign
                            </span>
                          </div>

                          {/* Cell 2: Metal & Ceramic Braces */}
                          <div className="flex flex-col items-center justify-center p-4 border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/teeth_1974585.svg"
                                alt="Metal & Ceramic Braces"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Metal & Ceramic Braces
                            </span>
                          </div>

                          {/* Cell 3: Damon Braces */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Damon Braces.svg"
                                alt="Damon Braces"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Damon Braces
                            </span>
                          </div>

                          {/* Cell 4: Lingual Braces */}
                          <div className="flex flex-col items-center justify-center p-4 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/lingual braces.svg"
                                alt="Lingual Braces"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Lingual Braces
                            </span>
                          </div>
                        </div>

                        {/* Know More Button */}
                        <div className="mt-4 w-full flex justify-center">
                          <Link
                            href="/services/orthodontics"
                            className="border border-[#62826B] hover:bg-[#62826B] text-[#62826B] hover:text-white font-instrument text-xs font-semibold px-8 py-2.5 rounded-[12px] transition-all duration-200"
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (service.id === "dental-implants") {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="snap-center flex-shrink-0 flex flex-col h-[750px] lg:h-[680px]"
                  >
                    <div className="flex flex-col h-[750px] lg:h-[680px] w-[290px] xs:w-[320px] md:w-[360px] bg-white rounded-[24px] overflow-hidden border border-border-neutral shadow-lg transition-all duration-300">
                      {/* Top Image */}
                      <div className="relative w-full h-[220px] flex-shrink-0">
                        <Image
                          src="/images/9350.jpg"
                          alt="Dental Implants"
                          fill
                          className="object-cover"
                          priority={i < 2}
                        />
                      </div>
                      
                      {/* Card Body */}
                      <div className="flex flex-col flex-1 px-6 py-6 text-center items-center">
                        {/* Title */}
                        <h3 className="font-caudex font-bold text-xl md:text-2xl text-primary mb-3">
                          Dental Implants
                        </h3>
                        
                        {/* Description */}
                        <p className="font-instrument text-text-dark text-sm leading-relaxed mb-4 max-w-sm">
                          Dental implants are titanium posts that are surgically placed into the jawbone to replace missing tooth roots.
                        </p>
                        
                        {/* Icons Grid */}
                        <div className="grid grid-cols-2 w-full border-t border-b border-gray-100 my-2 mt-auto">
                          {/* Cell 1: 3D Guided Implant */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/3D Guided Implant.svg"
                                alt="3D Guided Implant"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              3D Guided Implant
                            </span>
                          </div>

                          {/* Cell 2: Full Mouth Rehabilitation */}
                          <div className="flex flex-col items-center justify-center p-4 border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Full Mouth Rehabilitation.svg"
                                alt="Full Mouth Rehabilitation"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Full Mouth Rehabilitation
                            </span>
                          </div>

                          {/* Cell 3: Ceramic Implants */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Ceramic (Metal-Free) Implants.svg"
                                alt="Ceramic (Metal-Free) Implants"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Ceramic (Metal-Free) Implants
                            </span>
                          </div>

                          {/* Cell 4: Dental Implants */}
                          <div className="flex flex-col items-center justify-center p-4 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/implant_1328941.svg"
                                alt="Dental Implants"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Dental Implants
                            </span>
                          </div>
                        </div>

                        {/* Know More Button */}
                        <div className="mt-4 w-full flex justify-center">
                          <Link
                            href="/services/dental-implants"
                            className="border border-[#62826B] hover:bg-[#62826B] text-[#62826B] hover:text-white font-instrument text-xs font-semibold px-8 py-2.5 rounded-[12px] transition-all duration-200"
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (service.id === "micro-endodontics") {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="snap-center flex-shrink-0 flex flex-col h-[750px] lg:h-[680px]"
                  >
                    <div className="flex flex-col h-[750px] lg:h-[680px] w-[290px] xs:w-[320px] md:w-[360px] bg-white rounded-[24px] overflow-hidden border border-border-neutral shadow-lg transition-all duration-300">
                      {/* Top Image */}
                      <div className="relative w-full h-[220px] flex-shrink-0">
                        <Image
                          src="/images/3124.jpg"
                          alt="Micro-Endodontics (Root Canal Treatment)"
                          fill
                          className="object-cover"
                          priority={i < 2}
                        />
                      </div>
                      
                      {/* Card Body */}
                      <div className="flex flex-col flex-1 px-6 py-6 text-center items-center">
                        {/* Title */}
                        <h3 className="font-caudex font-bold text-xl md:text-2xl text-primary mb-3">
                          Micro-Endodontics<br />(Root Canal Treatment)
                        </h3>
                        
                        {/* Description */}
                        <p className="font-instrument text-text-dark text-sm leading-relaxed mb-4 max-w-sm">
                          Advanced retreatment techniques to preserve previously treated teeth and restore long-term oral health.
                        </p>
                        
                        {/* Icons Grid */}
                        <div className="grid grid-cols-2 w-full border-t border-b border-gray-100 my-2 mt-auto">
                          {/* Cell 1: Microscope-Assisted Root Canal Treatment */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Microscope-Assisted Root Canal Treatment.svg"
                                alt="Microscope-Assisted Root Canal Treatment"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Microscope-Assisted Root Canal Treatment
                            </span>
                          </div>

                          {/* Cell 2: Retreatment of Failed Root Canals */}
                          <div className="flex flex-col items-center justify-center p-4 border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Retreatment of Failed Root Canals.svg"
                                alt="Retreatment of Failed Root Canals"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Retreatment of Failed Root Canals
                            </span>
                          </div>

                          {/* Cell 3: Single-Visit Root Canal Therapy */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Single-Visit Root Canal Therapy.svg"
                                alt="Single-Visit Root Canal Therapy"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Single-Visit Root Canal Therapy
                            </span>
                          </div>

                          {/* Cell 4: Empty (matching screenshot) */}
                          <div className="flex flex-col items-center justify-center p-4 min-h-[110px]">
                            {/* Empty container */}
                          </div>
                        </div>

                        {/* Know More Button */}
                        <div className="mt-4 w-full flex justify-center">
                          <Link
                            href="/services/micro-endodontics"
                            className="border border-[#62826B] hover:bg-[#62826B] text-[#62826B] hover:text-white font-instrument text-xs font-semibold px-8 py-2.5 rounded-[12px] transition-all duration-200"
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (service.id === "oral-surgery") {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="snap-center flex-shrink-0 flex flex-col h-[750px] lg:h-[680px]"
                  >
                    <div className="flex flex-col h-[750px] lg:h-[680px] w-[290px] xs:w-[320px] md:w-[360px] bg-white rounded-[24px] overflow-hidden border border-border-neutral shadow-lg transition-all duration-300">
                      {/* Top Image */}
                      <div className="relative w-full h-[220px] flex-shrink-0">
                        <Image
                          src="/images/Oral Surgery.jpg"
                          alt="Oral Surgery"
                          fill
                          className="object-cover"
                          priority={i < 2}
                        />
                      </div>
                      
                      {/* Card Body */}
                      <div className="flex flex-col flex-1 px-6 py-6 text-center items-center">
                        {/* Title */}
                        <h3 className="font-caudex font-bold text-xl md:text-2xl text-primary mb-3">
                          Oral Surgery
                        </h3>
                        
                        {/* Description */}
                        <p className="font-instrument text-text-dark text-sm leading-relaxed mb-4 max-w-sm">
                          A range of procedures designed to treat conditions that cannot always be addressed through routine dental treatment.
                        </p>
                        
                        {/* Icons Grid */}
                        <div className="grid grid-cols-2 w-full border-t border-b border-gray-100 my-2 mt-auto">
                          {/* Cell 1: Dental Surgical Extraction */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Dental Surgical Extraction.svg"
                                alt="Dental Surgical Extraction"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Dental Surgical Extraction
                            </span>
                          </div>

                          {/* Cell 2: Oral Cyst & Lesion Removal */}
                          <div className="flex flex-col items-center justify-center p-4 border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Oral Cyst & Lesion Removal.svg"
                                alt="Oral Cyst & Lesion Removal"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Oral Cyst & Lesion Removal
                            </span>
                          </div>

                          {/* Cell 3: Complex Tooth Extraction */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Complex Tooth Extraction.svg"
                                alt="Complex Tooth Extraction"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Complex Tooth Extraction
                            </span>
                          </div>

                          {/* Cell 4: Empty */}
                          <div className="flex flex-col items-center justify-center p-4 min-h-[110px]">
                            {/* Empty container */}
                          </div>
                        </div>

                        {/* Know More Button */}
                        <div className="mt-4 w-full flex justify-center">
                          <Link
                            href="/services/oral-surgery"
                            className="border border-[#62826B] hover:bg-[#62826B] text-[#62826B] hover:text-white font-instrument text-xs font-semibold px-8 py-2.5 rounded-[12px] transition-all duration-200"
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (service.id === "pediatric-dentistry") {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="snap-center flex-shrink-0 flex flex-col h-[750px] lg:h-[680px]"
                  >
                    <div className="flex flex-col h-[750px] lg:h-[680px] w-[290px] xs:w-[320px] md:w-[360px] bg-white rounded-[24px] overflow-hidden border border-border-neutral shadow-lg transition-all duration-300">
                      {/* Top Image */}
                      <div className="relative w-full h-[220px] flex-shrink-0">
                        <Image
                          src="/images/2151686836.jpg"
                          alt="Pediatric Dentistry"
                          fill
                          className="object-cover"
                          priority={i < 2}
                        />
                      </div>
                      
                      {/* Card Body */}
                      <div className="flex flex-col flex-1 px-6 py-6 text-center items-center">
                        {/* Title */}
                        <h3 className="font-caudex font-bold text-xl md:text-2xl text-primary mb-3">
                          Pediatric Dentistry
                        </h3>
                        
                        {/* Description */}
                        <p className="font-instrument text-text-dark text-sm leading-relaxed mb-4 max-w-sm">
                          our goal is to ensure healthy teeth while building lifelong positive dental habits of Infants and teenagers.
                        </p>
                        
                        {/* Icons Grid */}
                        <div className="grid grid-cols-2 w-full border-t border-b border-gray-100 my-2 mt-auto">
                          {/* Cell 1: Children's Dental Care */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Experts team.svg"
                                alt="Children's Dental Care"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Children&apos;s Dental Care
                            </span>
                          </div>

                          {/* Cell 2: Fluoride Treatments */}
                          <div className="flex flex-col items-center justify-center p-4 border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Fluoride Treatments.svg"
                                alt="Fluoride Treatments"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Fluoride Treatments
                            </span>
                          </div>

                          {/* Cell 3: Habit Correction & Early Orthodontic Screening */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Habit Correction & Early Orthodontic Screening.svg"
                                alt="Habit Correction & Early Orthodontic Screening"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Habit Correction & Early Orthodontic Screening
                            </span>
                          </div>

                          {/* Cell 4: Empty (matching screenshot) */}
                          <div className="flex flex-col items-center justify-center p-4 min-h-[110px]">
                            {/* Empty container */}
                          </div>
                        </div>

                        {/* Know More Button */}
                        <div className="mt-4 w-full flex justify-center">
                          <Link
                            href="/services/pediatric-dentistry"
                            className="border border-[#62826B] hover:bg-[#62826B] text-[#62826B] hover:text-white font-instrument text-xs font-semibold px-8 py-2.5 rounded-[12px] transition-all duration-200"
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (service.id === "gum-aesthetic-gum-care") {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="snap-center flex-shrink-0 flex flex-col h-[750px] lg:h-[680px]"
                  >
                    <div className="flex flex-col h-[750px] lg:h-[680px] w-[290px] xs:w-[320px] md:w-[360px] bg-white rounded-[24px] overflow-hidden border border-border-neutral shadow-lg transition-all duration-300">
                      {/* Top Image */}
                      <div className="relative w-full h-[220px] flex-shrink-0">
                        <Image
                          src="/images/74182.jpg"
                          alt="Gum & Aesthetic Gum Care"
                          fill
                          className="object-cover"
                          priority={i < 2}
                        />
                      </div>
                      
                      {/* Card Body */}
                      <div className="flex flex-col flex-1 px-6 py-6 text-center items-center">
                        {/* Title */}
                        <h3 className="font-caudex font-bold text-xl md:text-2xl text-primary mb-3">
                          Gum & Aesthetic Gum Care
                        </h3>
                        
                        {/* Description */}
                        <p className="font-instrument text-text-dark text-sm leading-relaxed mb-4 max-w-sm">
                          Protect your oral health with expert gum care while enhancing the harmony of your smile.
                        </p>
                        
                        {/* Icons Grid */}
                        <div className="grid grid-cols-2 w-full border-t border-b border-gray-100 my-2 mt-auto">
                          {/* Cell 1: Gum Disease Treatment */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Gum Disease Treatment.svg"
                                alt="Gum Disease Treatment"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Gum Disease Treatment
                            </span>
                          </div>

                          {/* Cell 2: Gum Depigmentation */}
                          <div className="flex flex-col items-center justify-center p-4 border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Gum Depigmentation.svg"
                                alt="Gum Depigmentation"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Gum Depigmentation
                            </span>
                          </div>

                          {/* Cell 3: Gummy Smile Correction */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Gummy Smile Correction.svg"
                                alt="Gummy Smile Correction"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Gummy Smile Correction
                            </span>
                          </div>

                          {/* Cell 4: Empty (matching screenshot) */}
                          <div className="flex flex-col items-center justify-center p-4 min-h-[110px]">
                            {/* Empty container */}
                          </div>
                        </div>

                        {/* Know More Button */}
                        <div className="mt-4 w-full flex justify-center">
                          <Link
                            href="/services/gum-aesthetic-gum-care"
                            className="border border-[#62826B] hover:bg-[#62826B] text-[#62826B] hover:text-white font-instrument text-xs font-semibold px-8 py-2.5 rounded-[12px] transition-all duration-200"
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (service.id === "additional-specialized-care") {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="snap-center flex-shrink-0 flex flex-col h-[750px] lg:h-[680px]"
                  >
                    <div className="flex flex-col h-[750px] lg:h-[680px] w-[290px] xs:w-[320px] md:w-[360px] bg-white rounded-[24px] overflow-hidden border border-border-neutral shadow-lg transition-all duration-300">
                      {/* Top Image */}
                      <div className="relative w-full h-[220px] flex-shrink-0">
                        <Image
                          src="/images/182891.jpg"
                          alt="Additional Specialized Care"
                          fill
                          className="object-cover"
                          priority={i < 2}
                        />
                      </div>
                      
                      {/* Card Body */}
                      <div className="flex flex-col flex-1 px-6 py-6 text-center items-center">
                        {/* Title */}
                        <h3 className="font-caudex font-bold text-xl md:text-2xl text-primary mb-3">
                          Additional Specialized Care
                        </h3>
                        
                        {/* Description */}
                        <p className="font-instrument text-text-dark text-sm leading-relaxed mb-4 max-w-sm">
                          Safe and comfortable sedation options to ensure a relaxed, anxiety-free dental experience.
                        </p>
                        
                        {/* Icons Grid */}
                        <div className="grid grid-cols-2 w-full border-t border-b border-gray-100 my-2 mt-auto">
                          {/* Cell 1: Teeth Whitening */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Teeth Whitening.svg"
                                alt="Teeth Whitening"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Teeth Whitening
                            </span>
                          </div>

                          {/* Cell 2: Laser Dentistry */}
                          <div className="flex flex-col items-center justify-center p-4 border-b border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Routine Dental Checkups.svg"
                                alt="Laser Dentistry"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Laser Dentistry
                            </span>
                          </div>

                          {/* Cell 3: TMJ Treatment */}
                          <div className="flex flex-col items-center justify-center p-4 border-r border-gray-100 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/TMJ Treatment.svg"
                                alt="TMJ Treatment"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              TMJ Treatment
                            </span>
                          </div>

                          {/* Cell 4: Sedation Dentistry */}
                          <div className="flex flex-col items-center justify-center p-4 min-h-[110px]">
                            <div className="relative w-10 h-10 mb-2">
                              <Image
                                src="/images/Sedation Dentistry.svg"
                                alt="Sedation Dentistry"
                                fill
                                className="object-contain"
                                style={{
                                  filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                                }}
                              />
                            </div>
                            <span className="font-instrument text-[11px] font-semibold text-text-dark leading-tight">
                              Sedation Dentistry
                            </span>
                          </div>
                        </div>

                        {/* Know More Button */}
                        <div className="mt-4 w-full flex justify-center">
                          <Link
                            href="/services/additional-specialized-care"
                            className="border border-[#62826B] hover:bg-[#62826B] text-[#62826B] hover:text-white font-instrument text-xs font-semibold px-8 py-2.5 rounded-[12px] transition-all duration-200"
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              const iconPath = iconMap[service.id] || "/images/general_dentistry_icon.svg";
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="snap-center flex-shrink-0 flex flex-col h-[750px] lg:h-[680px]"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex flex-col items-center justify-center gap-4 w-[160px] md:w-[185px] h-[220px] bg-card-bg rounded-2xl px-5 py-6 border border-border-neutral shadow-sm hover:shadow-md hover:border-[#62826B]/50 hover:bg-[#62826B]/5 transition-all duration-300 group text-center"
                  >
                    {/* Icon container - clean, centered, transparent bg, icon color set to #62826B */}
                    <div className="relative w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={iconPath}
                        alt={`${service.title} Icon`}
                        fill
                        className="object-contain filter-accent-green"
                        style={{
                          filter: "invert(48%) sepia(12%) saturate(718%) hue-rotate(85deg) brightness(93%) contrast(85%)" // Approx color filter for #62826B
                        }}
                      />
                    </div>

                    {/* Title */}
                    <span className="font-caudex font-bold text-sm text-primary leading-snug">
                      {service.title}
                    </span>

                    {/* Sub-label */}
                    <span className="font-montserrat font-semibold text-[10px] uppercase tracking-widest text-[#62826B]">
                      Services
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Next */}
          <button
            onClick={() => pan("right")}
            aria-label="Next services"
            className="hidden lg:flex flex-shrink-0 w-11 h-11 rounded-full border-2 border-primary/20 bg-white hover:bg-primary hover:border-primary text-primary hover:text-white transition-all duration-200 items-center justify-center shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>
      </div>
    </section>
  );
}
