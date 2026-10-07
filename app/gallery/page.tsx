"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";
import ContactInfoBar from "@/components/sections/ContactInfoBar";

export default function GalleryPage() {
  const [mediaType, setMediaType] = useState<"photos" | "videos">("photos");
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(8);
  const [visibleCelebrityCount, setVisibleCelebrityCount] = useState(6);

  const localGalleryImages = [
    { src: "/images/gallery_service_1.jpg", alt: "Smile Makeover Cases", type: "services" },
    { src: "/images/gallery_service_2.jpg", alt: "Teeth Shade Matching", type: "services" },
    { src: "/images/gallery_service_3.jpg", alt: "Porcelain Veneers Prep", type: "services" },
    { src: "/images/gallery_service_4.jpg", alt: "Laser Whitening Session", type: "services" },
    { src: "/images/gallery_service_5.jpg", alt: "Aesthetic Restoration", type: "services", objectPosition: "center top" },
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

  const galleryVideos = [
    {
      src: "https://www.instagram.com/reel/DZG11iEKD1t/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      title: "Invisalign Treatment Reel",
      poster: "/images/untitled_design_1_first_frame.jpg",
      isExternal: true
    },
    {
      src: "https://www.instagram.com/reel/Cw7qKzXSUe0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      title: "Dental Care Treatment Reel",
      poster: "/images/untitled_design_2_first_frame.jpg",
      isExternal: true
    },
    {
      src: "/images/snapinsta_patient.mp4",
      title: "Patient Smile Consultation",
      poster: "/images/gallery_service_12.jpeg",
      isExternal: false
    },
    {
      src: "/images/home_page_banner_video.mp4",
      title: "Clinic Experience & Precision Care",
      poster: "/images/carousel_1.png",
      isExternal: false
    },
    {
      src: "/images/advanced_solutions_video.mp4",
      title: "Advanced Dental Solutions",
      poster: "/images/gallery_service_1.jpg",
      isExternal: false
    },
    {
      src: "/images/dental_implant_video.mp4",
      title: "Digital Smile Designing & Implants",
      poster: "/images/gallery_service_8.jpg",
      isExternal: false
    }
  ];

  const celebrityImages = [
    { src: "/images/celebrity_patient_141101.png", alt: "Happy Patient 1", objectPosition: "center top" },
    { src: "/images/celebrity_patient_141413.png", alt: "Happy Patient 2", objectPosition: "center 22%" },
    { src: "/images/celebrity_patient_141525.png", alt: "Happy Patient 3", objectPosition: "center 22%" },
    { src: "/images/celebrity_patient_141740.png", alt: "Happy Patient 4" },
    { src: "/images/celebrity_patient_142717.png", alt: "Happy Patient 5" },
    { src: "/images/celebrity_patient_new.jpeg", alt: "Happy Patient 6" }
  ];

  const loadMoreGallery = () => {
    setVisibleGalleryCount((prev) => prev + 4);
  };

  const loadMoreCelebrity = () => {
    setVisibleCelebrityCount((prev) => prev + 3);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-[85vh] min-h-[250px] sm:min-h-[450px] md:min-h-[600px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner 13.jpg"
            alt="DDS Gallery Banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* ── 2. Contact Info Bar ── */}
      <ContactInfoBar />

      {/* ── 3. Main Gallery Grid Section (Photos & Videos Toggle) ── */}
      <section className="py-20 bg-[#FFF8EE]/30">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Photos & Videos Toggle Button */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white p-1.5 rounded-full border border-border-neutral/60 shadow-sm">
              <button
                onClick={() => setMediaType("photos")}
                className={`px-8 py-2.5 rounded-full text-sm font-instrument font-bold transition-all duration-300 ${
                  mediaType === "photos"
                    ? "bg-[#380920] text-white shadow-sm"
                    : "text-text-dark hover:text-primary hover:bg-[#FFF8EE]"
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setMediaType("videos")}
                className={`px-8 py-2.5 rounded-full text-sm font-instrument font-bold transition-all duration-300 ${
                  mediaType === "videos"
                    ? "bg-[#380920] text-white shadow-sm"
                    : "text-text-dark hover:text-primary hover:bg-[#FFF8EE]"
                }`}
              >
                Videos
              </button>
            </div>
          </div>

          {/* Photos View */}
          {mediaType === "photos" && (
            <>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {localGalleryImages.slice(0, visibleGalleryCount).map((img, i) => (
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
                        style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
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

              {/* Load More Photos Button */}
              {visibleGalleryCount < localGalleryImages.length && (
                <div className="text-center pt-12">
                  <button
                    onClick={loadMoreGallery}
                    className="font-instrument text-xs font-bold border border-[#380920] text-[#380920] hover:bg-[#380920] hover:text-white px-8 py-2.5 rounded-[12px] transition-all duration-300"
                  >
                    Load More...
                  </button>
                </div>
              )}
            </>
          )}

          {/* Videos View */}
          {mediaType === "videos" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {galleryVideos.map((video, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border-neutral group hover:shadow-md transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-black overflow-hidden">
                    {video.isExternal ? (
                      <a
                        href={video.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full relative group/link"
                      >
                        <Image
                          src={video.poster}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/link:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-colors group-hover/link:bg-black/20">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform group-hover/link:scale-110 shadow-lg">
                            <Play className="w-6 h-6 fill-white ml-0.5" />
                          </div>
                        </div>
                      </a>
                    ) : (
                      <video
                        src={video.src}
                        controls
                        playsInline
                        preload="metadata"
                        poster={video.poster}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4 bg-white text-center">
                    <span className="font-caudex font-bold text-base text-primary">
                      {video.title}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
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

          {/* Celebrity Grid */}
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
                  style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </motion.div>
            ))}

            {/* 6th Slot Placeholder */}
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
