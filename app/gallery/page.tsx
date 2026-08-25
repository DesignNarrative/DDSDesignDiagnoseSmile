"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Clock, Mail } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "facilities" | "services">("all");
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(8);
  const [visibleCelebrityCount, setVisibleCelebrityCount] = useState(6);

  const localGalleryImages = [
    { src: "/images/gallery_service_1.jpg", alt: "Smile Makeover Cases", type: "services" },
    { src: "/images/gallery_service_2.jpg", alt: "Teeth Shade Matching", type: "services" },
    { src: "/images/gallery_service_3.jpg", alt: "Porcelain Veneers Prep", type: "services" },
    { src: "/images/gallery_service_4.jpg", alt: "Laser Whitening Session", type: "services" },
    { src: "/images/gallery_service_5.jpg", alt: "Aesthetic Restoration", type: "services" },
    { src: "/images/gallery_service_6.jpg", alt: "Cosmetic Bonding Case", type: "services" },
    { src: "/images/gallery_service_7.jpg", alt: "Dental Veneers Design", type: "services" },
    { src: "/images/gallery_service_8.jpg", alt: "Confidence Redefined Case", type: "services" },
    { src: "/images/gallery_service_9.jpg", alt: "Dental Treatment Case", type: "services" },
    { src: "/images/gallery_service_10.jpg", alt: "Oral Care Case", type: "services" },
    { src: "/images/gallery_service_11.jpg", alt: "Smile Transformation", type: "services" },
    { src: "/images/gallery_service_12.jpeg", alt: "Happy Patient", type: "services" },
    { src: "/images/carousel_1.png", alt: "DDS Consultation Room", type: "facilities" },
    { src: "/images/carousel_2.png", alt: "Treatment Operatory Suite", type: "facilities" },
    { src: "/images/carousel_3.png", alt: "Digital Scanning Station", type: "facilities" },
    { src: "/images/carousel_4.png", alt: "Premium Lounge & Reception", type: "facilities" }
  ];

  const celebrityImages = [
    { src: "/images/celebrity_patient_141101.png", alt: "Happy Patient 1" },
    { src: "/images/celebrity_patient_141413.png", alt: "Happy Patient 2" },
    { src: "/images/celebrity_patient_141525.png", alt: "Happy Patient 3" },
    { src: "/images/celebrity_patient_141740.png", alt: "Happy Patient 4" },
    { src: "/images/celebrity_patient_142717.png", alt: "Happy Patient 5" },
    { src: "/images/celebrity_patient_new.jpeg", alt: "Happy Patient 6" }
  ];

  const filteredImages = localGalleryImages.filter((img) => {
    if (filter === "all") return true;
    return img.type === filter;
  });

  const loadMoreGallery = () => {
    setVisibleGalleryCount((prev) => prev + 4);
  };

  const loadMoreCelebrity = () => {
    setVisibleCelebrityCount((prev) => prev + 3);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[55vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] min-h-[350px] sm:min-h-[500px] md:min-h-[650px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Mobile view banner */}
          <Image
            src="/images/M12.jpg"
            alt="DDS Gallery Banner"
            fill
            className="object-cover object-center md:hidden"
            priority
          />
          {/* Desktop/Tablet view banner */}
          <Image
            src="/images/gallery_banner_new.png"
            alt="DDS Gallery Banner"
            fill
            className="object-cover object-center hidden md:block"
            priority
          />
          {/* Dark overlay for white text readability */}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex flex-col items-center md:items-start justify-center space-y-4 max-w-3xl"
          >
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-white/80">
              CLINICAL PORTFOLIO
            </span>
            <h1 className="font-caudex font-bold text-3xl sm:text-5xl md:text-6xl text-white leading-tight">
              Gallery
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-white/95 font-semibold">
              Your natural beauty begins with a confident smile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Contact Info Bar ── */}
      <section className="bg-[#380920] text-white py-6 md:py-8 border-t border-white/5 z-10 relative shadow-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
          
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

      {/* ── 3. Filters & Main Gallery Grid Section ── */}
      <section className="py-20 bg-[#FFF8EE]/30">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Filters buttons */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => {
                setFilter("all");
                setVisibleGalleryCount(8);
              }}
              className={`font-instrument text-sm font-semibold px-6 py-2 rounded-full border transition-all duration-300 ${
                filter === "all"
                  ? "bg-[#380920] text-white border-[#380920]"
                  : "bg-white text-text-dark border-border-neutral/30 hover:bg-[#380920]/5"
              }`}
            >
              View all
            </button>
            <button
              onClick={() => {
                setFilter("facilities");
                setVisibleGalleryCount(8);
              }}
              className={`font-instrument text-sm font-semibold px-6 py-2 rounded-full border transition-all duration-300 ${
                filter === "facilities"
                  ? "bg-[#380920] text-white border-[#380920]"
                  : "bg-white text-text-dark border-border-neutral/30 hover:bg-[#380920]/5"
              }`}
            >
              Facilities
            </button>
            <button
              onClick={() => {
                setFilter("services");
                setVisibleGalleryCount(8);
              }}
              className={`font-instrument text-sm font-semibold px-6 py-2 rounded-full border transition-all duration-300 ${
                filter === "services"
                  ? "bg-[#380920] text-white border-[#380920]"
                  : "bg-white text-text-dark border-border-neutral/30 hover:bg-[#380920]/5"
              }`}
            >
              Services
            </button>
          </div>

          {/* Photo Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.slice(0, visibleGalleryCount).map((img, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={i}
                  className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm border border-border-neutral bg-white group hover:shadow-md transition-shadow duration-300"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-[#380920]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                    <span className="font-caudex font-bold text-white text-sm md:text-base">
                      {img.alt}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {visibleGalleryCount < filteredImages.length && (
            <div className="text-center pt-12">
              <button
                onClick={loadMoreGallery}
                className="font-instrument text-xs font-bold border border-[#380920] text-[#380920] hover:bg-[#380920] hover:text-white px-8 py-2.5 rounded-[12px] transition-all duration-300"
              >
                Load More...
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ── 4. Happy Celebrity Patients Section ── */}
      <section className="py-20 bg-[#FFF8EE]/60 border-t border-[#380920]/5">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              OUR CLIENTS
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              Happy Celebrity Patients
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Celebrity Grid (6 cards total: 5 celebrity photos, 6th is light grey placeholder to match layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {celebrityImages.slice(0, visibleCelebrityCount).map((img, i) => (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                key={i}
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm border border-border-neutral bg-white group hover:shadow-md transition-shadow duration-300"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </motion.div>
            ))}

            {/* 6th Slot Placeholder (Matches layout exactly) */}
            {visibleCelebrityCount >= 6 && celebrityImages.length < 6 && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative aspect-[4/3] w-full rounded-2xl border border-dashed border-border-neutral bg-[#FFF8EE]/40 flex items-center justify-center p-6 text-center"
              >
                <div className="flex flex-col items-center space-y-2 text-text-dark/50">
                  <span className="font-caudex font-bold text-sm">DDS Dental Clinic</span>
                  <span className="font-instrument text-xs">More smiles coming soon</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Load More Celebrity Button */}
          {visibleCelebrityCount < 6 && (
            <div className="text-center pt-12">
              <button
                onClick={loadMoreCelebrity}
                className="font-instrument text-xs font-bold border border-[#380920] text-[#380920] hover:bg-[#380920] hover:text-white px-8 py-2.5 rounded-[12px] transition-all duration-300"
              >
                Load More...
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ── 5. Booking CTA Banner ── */}
      <CTABanner />

    </div>
  );
}
