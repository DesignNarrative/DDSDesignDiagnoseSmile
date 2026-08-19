"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Phone, Clock, Mail, CheckCircle2 } from "lucide-react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import CTABanner from "@/components/sections/CTABanner";

export default function CosmeticDentistryPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const offerings = [
    {
      title: "Cosmetic Dentistry",
      desc: "Comprehensive smile makeovers tailored to your facial aesthetics."
    },
    {
      title: "Digital Smile Design",
      desc: "Preview your new smile digitally before treatment begins."
    },
    {
      title: "Porcelain & Ceramic Veneers",
      desc: "Natural-looking, stain-resistant smile transformations."
    },
    {
      title: "Hollywood Smile Makeover",
      desc: "Complete aesthetic upgrade for a red-carpet-ready smile."
    },
    {
      title: "Composite Bonding",
      desc: "Quick, conservative fixes for chips, gaps, and discoloration."
    },
    {
      title: "CEREC Same-Day Restorations",
      desc: "Crowns and veneers designed, milled, and fitted in a single visit."
    }
  ];

  const commonProblems = [
    "Stained or Discolored Teeth",
    "Chipped or Cracked Teeth",
    "Uneven Tooth Shape",
    "Gaps Between Teeth",
    "Worn or Short Teeth",
    "Mildly Misaligned Teeth",
    "Uneven Smile Line",
    "Old or Discolored Fillings",
    "Smile Makeover Requirements",
    "Lack of Smile Confidence"
  ];

  const beforeAfterSliders = [
    {
      id: "case-1",
      title: "Smile Symmetry Correction",
      desc: "Stained and misaligned teeth aligned perfectly using ultra-thin porcelain veneers.",
      before: "/images/smile_symmetry_before.png",
      after: "/images/smile_symmetry_after.png"
    },
    {
      id: "case-2",
      title: "Diastema Gap Closure",
      desc: "Closing prominent front tooth gaps to design a uniform, continuous smile arc.",
      before: "/images/diastema_before.png",
      after: "/images/diastema_after.png"
    },
    {
      id: "case-3",
      title: "Ceramic Edge Restoration",
      desc: "Restoring chipped and worn margins to natural length, shade, and vitality.",
      before: "/images/ceramic_before.png",
      after: "/images/ceramic_after.png"
    },
    {
      id: "case-4",
      title: "Full Arch Makeover",
      desc: "A complete aesthetic upgrade creating a bright, red-carpet-ready Hollywood smile.",
      before: "/images/fullarch_before.png",
      after: "/images/fullarch_after.png"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[600px] md:min-h-[750px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cosmetic_dentistry_banner_123456.jpg"
            alt="Cosmetic Dentistry"
            fill
            className="object-cover object-center"
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
            className="flex flex-col items-center md:items-start justify-center space-y-4 max-w-3xl"
          >
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#380920]/80">
              OUR TREATMENTS
            </span>
            <h1 className="font-caudex font-bold text-4xl sm:text-5xl md:text-6xl text-[#380920] leading-tight">
              Cosmetic Dentistry
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-[#380920]/95 font-semibold">
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

      {/* ── 3. Intro Section (Image Left, Text Right) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image image 028.jpg */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-border-neutral bg-[#FFF8EE]"
          >
            <Image
              src="/images/service_cosmetic_main.jpg"
              alt="Cosmetic Dentistry consultation at DDS"
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
                SMILE MAKEVOERS
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
                Enhancing Your Smile with Art and Precision
              </h2>
            </div>

            <p className="font-instrument text-text-dark text-sm md:text-base leading-relaxed">
              We believe your smile is your best accessory. Our cosmetic dentistry services are designed to improve the appearance of your teeth, gums, and overall smile - boosting your confidence and helping you look your best.
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

      {/* ── 4. Common Dental Problems We Treat (Text Left, Image Right) ── */}
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
                AESTHETIC CONCERNS
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

          {/* Right Column: Image cosmetic_common_problems.jpg */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-white/10 bg-[#FFF8EE]"
          >
            <Image
              src="/images/cosmetic_common_problems.jpg"
              alt="Common dental cosmetic issues"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

        </div>
      </section>

      {/* ── 5. What we offer in Cosmetic Dentistry? ── */}
      <section className="py-20 bg-[#FFF8EE] border-t border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              OUR SERVICE OFFERINGS
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              What we offer in Cosmetic Dentistry?
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

      {/* ── 6. Before & After Interactive Sliders Section ── */}
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B]">
              CLINICAL PORTFOLIO
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              Cosmetic Dentistry Before &amp; After
            </h2>
            <div className="w-16 h-1 bg-[#62826B] rounded-full"></div>
          </div>

          {/* Grid of Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {beforeAfterSliders.map((caseItem, idx) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="flex flex-col space-y-4 p-4 border border-border-neutral/30 rounded-[28px] bg-neutral-50 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Custom Interactive Slider Component */}
                <BeforeAfterSlider beforeSrc={caseItem.before} afterSrc={caseItem.after} altText={caseItem.title} />

                {/* Details text below the slider */}
                <div className="px-2 space-y-1">
                  <h3 className="font-caudex font-bold text-lg text-primary">
                    {caseItem.title}
                  </h3>
                  <p className="font-instrument text-xs text-text-muted leading-relaxed">
                    {caseItem.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. CTA Section ── */}
      <CTABanner />

    </div>
  );
}
