"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import Hero             from "@/components/sections/Hero";
import ServicesGrid     from "@/components/sections/ServicesGrid";
import AdvancedClinic   from "@/components/sections/AdvancedClinic";
import StatsBar         from "@/components/sections/StatsBar";
import TechSection      from "@/components/sections/TechSection";
import VirtualTourBanner from "@/components/sections/VirtualTourBanner";
import Testimonials     from "@/components/sections/Testimonials";
import CTABanner        from "@/components/sections/CTABanner";
import FAQAccordion     from "@/components/ui/FAQAccordion";
import { faqs }         from "@/lib/data/siteData";

/* ─── Inline 2-column FAQ section ─────────────────────────────────────── */
function FAQSection() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const leftFaqs  = faqs.slice(0, 3);   // first 3 on the left column
  const rightFaqs = faqs.slice(3);      // rest on right column

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section label + heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 flex flex-col items-center gap-3"
        >
          <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
            COMMON QUESTIONS
          </span>
          <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary">
            FAQ&rsquo;s
          </h2>
          <div className="w-14 h-1 bg-primary rounded-full" />
        </motion.div>

        {/* 2-column accordion grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <FAQAccordion items={leftFaqs}  className="w-full" />
          <FAQAccordion items={rightFaqs} className="w-full" />
        </div>

      </div>
    </section>
  );
}

/* ─── Home Page ────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero: dark full-width image → cream split */}
      <Hero />

      {/* 2. Services horizontal carousel */}
      <ServicesGrid />

      {/* Pune's Most Advanced Dental Clinic section */}
      <AdvancedClinic />

      {/* 3. Stats counter bar */}
      <StatsBar />

      {/* 4. High-End Technology cards */}
      <TechSection />

      {/* 5. Full-width virtual tour banner */}
      <VirtualTourBanner />

      {/* 6. 2-column FAQ accordion */}
      <FAQSection />

      {/* 7. Patient testimonials */}
      <Testimonials />

      {/* 8. CTA Banner */}
      <CTABanner />

    </div>
  );
}
