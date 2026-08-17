"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import SmallBookingCTA from "@/components/sections/SmallBookingCTA";

export default function ServicesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const mainServices = [
    {
      id: "general-dentistry",
      title: "General Dentistry",
      desc: "Comprehensive diagnostics, cleanings, tooth-colored fillings, painless extractions, and foundational dental wellness.",
      image: "/images/service_general.png",
      slug: "/services/general-dentistry",
    },
    {
      id: "cosmetic-dentistry",
      title: "Cosmetic Dentistry",
      desc: "Transform your smile with digital design veneers, composite bonding, and professional laser whitening options.",
      image: "/images/service_cosmetic.png",
      slug: "/services/cosmetic-dentistry",
    },

    {
      id: "micro-endodontics",
      title: "Micro-Endodontics",
      desc: "ZEISS microscope-guided root canal treatments and failed endodontic retreatments to save compromised natural teeth.",
      image: "/images/endo_banner_67119.jpg",
      slug: "/services/micro-endodontics",
    },
    {
      id: "implants-dentistry",
      title: "Dental Implants Treatment",
      desc: "Premium prosthetic replacements restoring root support, biting stability, and long-lasting bone-level alignment.",
      image: "/images/carousel_1.png",
      slug: "/services/dental-implants",
    },
    {
      id: "orthodontics",
      title: "Orthodontics",
      desc: "Modern clear aligners, Invisalign First, and metal or ceramic braces mapping teeth geometry into perfectly balanced visual arcs.",
      image: "/images/carousel_3.png",
      slug: "/services/orthodontics",
    },
    {
      id: "invisalign",
      title: "Invisalign",
      desc: "Discreet clear aligners to gently shift your teeth into alignment without wires or brackets.",
      image: "/images/invisalign_banner_2605.jpg",
      slug: "/services/invisalign",
    },
    {
      id: "pediatric-dentistry",
      title: "Pediatric Dentistry",
      desc: "Gentle, fear-free treatments and preventive sealant applications designed specifically for younger patients.",
      image: "/images/carousel_4.png",
      slug: "/services/pediatric-dentistry",
    },
    {
      id: "gum-aesthetic-gum-care",
      title: "Gum & Aesthetic Gum Care",
      desc: "Prevention and treatment of gum disease, depigmentation, and gummy smile correction for a balanced look.",
      image: "/images/gum_banner_25334.jpg",
      slug: "/services/gum-aesthetic-gum-care",
    },
    {
      id: "additional-specialized-care",
      title: "Additional Specialized Care",
      desc: "Precision in-house 3D CBCT diagnostics, teeth whitening, TMJ joint care, sedation, and advanced soft tissue lasers.",
      image: "/images/specialized_banner_13186.jpg",
      slug: "/services/additional-specialized-care",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Text-only Header (no banner image, matches requested text) */}
      <section className="pt-32 pb-12 px-6 bg-[#62826B]/10 border-b border-border-neutral text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
          <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B] mb-2">
            OUR CATALOG
          </span>
          <h1 className="font-caudex font-bold text-4xl md:text-5xl text-primary leading-tight">
            Dental Solutions Tailored for You
          </h1>
        </div>
      </section>

      {/* Services Grid Section */}
      <section ref={ref} className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service, i) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[24px] overflow-hidden border border-border-neutral shadow-sm hover:shadow-lg hover:border-[#62826B]/30 hover:bg-[#62826B]/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <Link href={service.slug} className="flex flex-col h-full flex-grow justify-between">
                  <div className="flex flex-col flex-grow">
                    {/* Visual frame with zoom animation */}
                    <div className="relative h-[220px] w-full overflow-hidden bg-card-bg flex-shrink-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Description info */}
                    <div className="p-6 space-y-3 flex-grow">
                      <h3 className="font-caudex font-bold text-xl text-primary group-hover:text-[#62826B] transition-colors">
                        {service.title}
                      </h3>
                      <p className="font-instrument text-sm text-text-dark leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex flex-wrap gap-4">
                    <div className="inline-flex items-center gap-1.5 font-instrument font-bold text-sm text-[#62826B] group-hover:text-primary transition-colors">
                      View Details
                      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <SmallBookingCTA />
    </div>
  );
}
