"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Mail } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";

export default function TechnologyPage() {
  const techCards = [
    {
      name: "Zoom Whitening",
      desc: "Professional in clinic teeth whitening system that delivers a noticeably brighter smile in just one appointment.",
      image: "/images/69b88da312b948e7a0d2ae6800b2c6e1.webp",
    },
    {
      name: "Aquacare Air Abrasion Unit",
      desc: "Minimally invasive air abrasion technology for gentle cavity preparation with maximum tooth preservation.",
      image: "/images/aqucare-4000x4000-11th-march-5-e1765274428125.jpg",
    },
    {
      name: "Zeiss Microscope",
      desc: "High-precision dental microscope that enhances visibility for accurate and minimally invasive treatments.",
      image: "/images/website-4k-camera.jpg",
    },
    {
      name: "CEREC System",
      desc: "Advanced CAD/CAM technology that designs and fabricates custom ceramic restorations in a single visit.",
      image: "/images/dentsply-cerec-digital-chairside-dentistry.jpg",
    },
    {
      name: "Indilase Soft Tissue Laser",
      desc: "Precision laser technology for comfortable soft tissue procedures with faster healing and minimal discomfort.",
      image: "/images/indilase-Pro-1.webp",
    },
    {
      name: "MELAG Class B Autoclave",
      desc: "International-standard sterilization system ensuring the highest level of infection control and patient safety.",
      image: "/images/69b88da312b948e7a0d2ae6800b2c6e1.webp", // Note: user specified this image in query
    },
    {
      name: "3 Shape Scanner",
      desc: "High-precision digital intraoral scanner that captures detailed impressions without traditional moulds.",
      image: "/images/TRIOS_T3_900x430 New tip.jpg",
    },
    {
      name: "Primescan Scanner",
      desc: "Next-generation intraoral scanner delivering exceptional accuracy for restorative, implant, and orthodontic treatments.",
      image: "/images/corp-press-image-primemill.png",
    },
    {
      name: "Dentsply Sirona Sinius Chair",
      desc: "Premium treatment chair designed to maximize patient comfort while enhancing clinical efficiency.",
      image: "/images/tre-product-image-sinius-2024-cs-low.jpeg",
    },
    {
      name: "Orthophos S CBCT",
      desc: "Advanced 3D imaging system providing detailed diagnostics for implants, root canals, orthodontics, and oral surgery.",
      image: "/images/orthophos-s-2.jpeg",
    },
    {
      name: "Dentsply Sirona Intego Pro",
      desc: "Ergonomic dental treatment unit that combines advanced functionality with exceptional patient comfort.",
      image: "/images/m4103416-benelux-variante-hg-monitor-schwarz-800x480px.jpeg",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section (Clean, no text overlay) ── */}
      <section className="relative w-full h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[600px] md:min-h-[750px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/technology_banner_new_v2.png"
            alt="DDS Dental Clinic Treatment Rooms"
            fill
            className="object-cover object-center"
            priority
          />
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

      {/* ── 3. Technology Grid Section ── */}
      <section className="py-20 bg-[#FFF8EE] border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
                className="bg-white rounded-[24px] border border-border-neutral/30 p-8 shadow-sm flex flex-col items-center text-center space-y-6 hover:shadow-md transition-shadow duration-300"
              >
                {/* Tech Image Wrapper */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-card-bg/40 flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 flex-grow flex flex-col justify-between">
                  <h3 className="font-caudex font-bold text-lg md:text-xl text-[#380920] leading-tight">
                    {card.name}
                  </h3>
                  <p className="font-instrument text-sm text-text-dark/80 leading-relaxed max-w-sm">
                    {card.desc}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Booking CTA Banner ── */}
      <CTABanner />

    </div>
  );
}
