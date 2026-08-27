"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Phone, Clock, Mail, CheckCircle2 } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";
import ContactInfoBar from "@/components/sections/ContactInfoBar";

export default function DentalImplantsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const offerings = [
    {
      title: "Dental Implants",
      desc: "Permanent, natural-feeling tooth replacement."
    },
    {
      title: "3D Guided Implant Surgery",
      desc: "Precision placement using in-house CBCT imaging."
    },
    {
      title: "All-on-4 / All-on-6 Implants",
      desc: "Full-arch restoration on minimal implants."
    },
    {
      title: "Same-Day Dental Implants",
      desc: "Immediate function where clinically indicated."
    },
    {
      title: "Ceramic (Metal-Free) Implants",
      desc: "Biocompatible option for sensitive patients."
    },
    {
      title: "Full Mouth Rehabilitation",
      desc: "Complete restoration of function and aesthetics."
    }
  ];

  const commonProblems = [
    "Single Missing Tooth",
    "Multiple Missing Teeth",
    "Complete Tooth Loss",
    "Loose or Uncomfortable Dentures",
    "Difficulty Chewing Food",
    "Bone Loss After Tooth Extraction",
    "Missing Front Teeth",
    "Broken or Non-Restorable Teeth",
    "Failing Dental Bridges"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[55vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] min-h-[350px] sm:min-h-[500px] md:min-h-[650px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Mobile view banner */}
          <Image
            src="/images/M5.jpg"
            alt="Dental Implant"
            fill
            className="object-cover object-center md:hidden"
            priority
          />
          {/* Desktop/Tablet view banner */}
          <Image
            src="/images/dental_implants_banner_7584.jpg"
            alt="Dental Implant"
            fill
            className="object-cover object-center scale-x-[-1] hidden md:block"
            priority
          />
          {/* Subtle light overlay to make text pop while keeping the banner image bright and clear */}
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex flex-col items-center md:items-start justify-center space-y-4 max-w-3xl"
          >
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#380920]/80">
              OUR TREATMENTS
            </span>
            <h1 className="font-caudex font-bold text-4xl sm:text-5xl md:text-6xl text-[#380920] leading-tight">
              Dental Implant
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-[#380920]/95 font-semibold">
              Permanent solutions for missing teeth
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Contact Info Bar ── */}
      <ContactInfoBar />

      {/* ── 3. Intro Section (Image Left, Text Right) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image 19646.jpg */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-border-neutral bg-[#FFF8EE]"
          >
            <Image
              src="/images/service_implant_main.jpg"
              alt="Dental implants consultation at DDS"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

          {/* Right Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <div className="flex flex-col space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B]">
                IMPLANTOLOGY
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
                Dental Implant Treatment
              </h2>
              <h3 className="font-caudex font-bold text-lg md:text-xl text-primary/80 leading-relaxed italic">
                Designed to restore function, aesthetics, and confidence.
              </h3>
            </div>

            <p className="font-instrument text-text-dark text-sm md:text-base leading-relaxed">
              Dental implants are titanium posts that are surgically placed into the jawbone to replace missing tooth roots. Once integrated with the bone, they provide a stable foundation for crowns, bridges, or dentures, offering the look, feel, and function of natural teeth.
            </p>

            <div className="pt-2">
              <Link href="/book">
                <button
                  className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-sm font-semibold px-8 py-3 rounded-[12px] transition-all duration-200 shadow-md hover:scale-[1.02]"
                >
                  Book an Appointment
                </button>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 4. What we offer in Dental Implant? ── */}
      <section className="py-20 bg-[#FFF8EE] border-t border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              OUR SERVICE OFFERINGS
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              What we offer in Dental Implant?
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
            {offerings.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-8 border border-border-neutral/30 shadow-sm flex flex-col justify-start hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="font-caudex font-bold text-lg text-primary mb-3">
                  {item.title}
                </h3>
                <p className="font-instrument text-sm text-text-dark/85 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. Common Dental Problems We Treat (Text Left, Image Right) ── */}
      <section className="py-20 bg-[#380920] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Problems List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col space-y-8"
          >
            <div className="flex flex-col space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#FFF8EE]/80">
                SYMPTOMS & LOSS
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-white leading-tight">
                Common Dental Problems We Treat
              </h2>
            </div>

            {/* List in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 w-full">
              {commonProblems.map((problem, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0" />
                  <span className="font-instrument text-sm text-white/90 leading-snug">
                    {problem}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image 247.jpg */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-white/10 bg-[#FFF8EE]"
          >
            <Image
              src="/images/247.jpg"
              alt="Experienced implant specialists at DDS"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

        </div>
      </section>

      {/* ── 6. Wide GIF Banner Section with Cream Background Spacer ── */}
      <section className="py-20 bg-[#FFF8EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative w-full aspect-[21/9] md:aspect-[2.4/1] max-h-[480px] rounded-[28px] overflow-hidden shadow-md border border-border-neutral/30">
            <Image
              src="/images/download_4.gif"
              alt="Dental surgery guided simulation animation"
              fill
              className="object-cover object-center"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ── 7. CTA Section (Same as Homepage) ── */}
      <CTABanner />

    </div>
  );
}