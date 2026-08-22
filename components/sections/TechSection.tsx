"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TechSection() {
  const ref      = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const techItems = [
    {
      title: "Zeiss Microscope",
      image: "/images/website-4k-camera.jpg",
    },
    {
      title: "Aquacare air abrasion unit",
      image: "/images/aqucare-4000x4000-11th-march-5-e1765274428125.jpg",
    },
    {
      title: "Zoom Whitening: Oral Care gel",
      image: "/images/69b88da312b948e7a0d2ae6800b2c6e1.webp",
    },
    {
      title: "CEREC system",
      image: "/images/dentsply-cerec-digital-chairside-dentistry.jpg",
    },
    {
      title: "Indilase Soft Tissue Laser",
      image: "/images/indilase-Pro-1.webp",
    },
    {
      title: "MELAG Class B Autoclave",
      image: "/images/Melag-vacuclave-41b-side.jpg",
    },
    {
      title: "3 Shape Scanner",
      image: "/images/TRIOS_T3_900x430 New tip.jpg",
    },
    {
      title: "Primescan Scanner",
      image: "/images/corp-press-image-primemill.png",
    },
    {
      title: "Orthophos S CBCT",
      image: "/images/orthophos-s-2.jpeg",
    },
    {
      title: "Dentsply Sirona Sinius Chair",
      image: "/images/tre-product-image-sinius-2024-cs-low.jpeg",
    },
    {
      title: "Dentsply Sirona Intego Pro",
      image: "/images/m4103416-benelux-variante-hg-monitor-schwarz-800x480px.jpeg",
    }
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 324;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={ref} id="technology" className="py-16 md:py-20 bg-[#F4F2EE]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header row */}
        <div className="flex flex-col gap-3 mb-12">
          <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
            Our High-End Technology
          </h2>
          <div className="w-14 h-1 bg-primary rounded-full" />
        </div>

        {/* Carousel row with side arrows */}
        <div className="flex items-center gap-3 md:gap-5 justify-center">

          {/* Prev */}
          <button
            onClick={() => scroll("left")}
            aria-label="Previous technology"
            className="hidden lg:flex flex-shrink-0 w-11 h-11 rounded-full border-2 border-primary/20 bg-white hover:bg-primary hover:border-primary text-primary hover:text-white transition-all duration-200 items-center justify-center shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable track containing cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2 justify-start items-stretch w-full"
            style={{ scrollbarWidth: "none" }}
          >
            {techItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="snap-start flex-shrink-0 flex flex-col w-[280px] sm:w-[300px] bg-white rounded-[20px] overflow-hidden border border-border-neutral shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 h-[380px]"
              >
                {/* Card image */}
                <div className="relative h-[200px] w-full overflow-hidden bg-card-bg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>

                {/* Card text and button */}
                <div className="p-5 flex flex-col flex-grow items-center justify-between text-center">
                  <h3 className="font-caudex font-bold text-base text-primary leading-snug min-h-[44px] flex items-center justify-center">
                    {item.title}
                  </h3>
                  
                  <Link href="/technology" className="mt-auto w-full">
                    <button
                      className="border border-[#62826B] hover:bg-[#62826B] text-[#62826B] hover:text-white font-instrument text-xs font-semibold px-6 py-2 rounded-[10px] transition-all duration-200 w-full"
                    >
                      Know More
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => scroll("right")}
            aria-label="Next technology"
            className="hidden lg:flex flex-shrink-0 w-11 h-11 rounded-full border-2 border-primary/20 bg-white hover:bg-primary hover:border-primary text-primary hover:text-white transition-all duration-200 items-center justify-center shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </section>
  );
}
