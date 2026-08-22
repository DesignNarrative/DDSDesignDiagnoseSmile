"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Phone, Clock, Mail, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const infoItems = [
    {
      icon: "/images/soothing_environment_new.svg",
      title: "Soothing Environment"
    },
    {
      icon: "/images/care_after_treatment_new.svg",
      title: "Care After Treatment"
    },
    {
      icon: "/images/experts_team_new.svg",
      title: "Experts Team"
    }
  ];

  const highlights = [
    "Founder & Clinical Director, DDS — 15 years strong (est. 2011)",
    "Certified Invisalign Provider, delivering precise, clear aligner solutions for every stage of alignment",
    "Built DDS into a fully digital, AI-driven, German technology-forward dental clinic"
  ];

  const diplomas = [
    {
      year: "2021",
      title: "PG Diploma in Aesthetic and Restorative Dentistry",
      subtitle: "City of London Dental School, UK",
      desc: "(completed 4 modules)"
    },
    {
      year: "2024-25",
      title: "Advanced Micro Endodontics Fellowship",
      subtitle: "D Y Patil University",
      desc: "(Completed)"
    },
    {
      year: "2026",
      title: "Diploma in Dental Lasers",
      subtitle: "Medical University of Vienna",
      desc: "(In progress)"
    }
  ];

  const reasons = [
    {
      num: "1",
      title: "CEREC Same-Day Dentistry",
      desc: "Walk in broken, walk out restored. One visit, zero compromises."
    },
    {
      num: "2",
      title: "ZEISS Microscope Precision",
      desc: "We see what others miss — up to 25x magnification, zero guesswork."
    },
    {
      num: "3",
      title: "Guided Implant Surgery",
      desc: "Millimeter-precise placement, planned before we ever pick up a drill."
    },
    {
      num: "4",
      title: "In-House CBCT 3D Imaging",
      desc: "Full 3D clarity in seconds — no referrals, no waiting, no blind spots."
    },
    {
      num: "5",
      title: "Invisalign Certified Provider",
      desc: "Straighten your smile invisibly — engineered by certified expertise."
    },
    {
      num: "6",
      title: "Painless & Comfortable Treatment",
      desc: "Advanced technique meets genuine compassion — dentistry, redefined."
    },
    {
      num: "7",
      title: "Hospital-Grade Hygiene & Sterilization",
      desc: "MELAG Class B sterilization. German engineering. Zero shortcuts."
    },
    {
      num: "8",
      title: "Personalized Planning & Transparency",
      desc: "No jargon, no surprises — just honest care, explained clearly."
    }
  ];

  // Placeholder images for gallery
  const galleryImages = [
    "/images/about_gallery_1_v3.jpg",
    "/images/about_gallery_2.jpg",
    "/images/about_gallery_3.jpg",
    "/images/about_gallery_4.jpg",
    "/images/about_gallery_5.jpg",
    "/images/about_gallery_6.jpg"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[600px] md:min-h-[750px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about_banner.jpg"
            alt="Dentsspa Dental Studio Experience"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle dark overlay for text readability while maintaining banner image clarity */}
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl flex flex-col space-y-8 text-left"
          >
            <h1 className="font-caudex font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed drop-shadow-md">
              The dentistry is not just a procedure.<br />
              It is a carefully crafted experience<br />
              transparent, comfortable, and tailored<br />
              entirely to you.
            </h1>
            
            <div className="pt-2">
              <Link href="/book">
                <button
                  className="bg-white text-[#380920] hover:bg-cream-light font-instrument text-sm sm:text-base font-semibold px-8 py-3.5 rounded-[12px] transition-all duration-200 shadow-lg hover:scale-[1.02]"
                >
                  Book an Appointment
                </button>
              </Link>
            </div>
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

      {/* ── 3. Dr. Priti Munde Profile Section ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Doctor Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[1/1] sm:aspect-[4/3] lg:aspect-[1/1] w-full rounded-[24px] overflow-hidden shadow-lg border border-border-neutral"
          >
            <Image
              src="/images/dr_priti_munde_portrait_35.jpg"
              alt="Dr. Priti Munde - Clinical Director"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

          {/* Right Column: Bio & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <div className="flex flex-col space-y-2">
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary">
                Dr. Priti Munde
              </h2>
              <h3 className="font-instrument text-xs md:text-sm font-bold text-primary/80 uppercase tracking-widest leading-relaxed">
                BDS | Registration No.: A-17135 <br />
                Cosmetic Dental Surgeon  |  Dental Implantologist <br />
                Micro-Endodontist (FAME)  |  Diploma In Dental Lasers <br />
                (University of Vienna)
              </h3>
            </div>

            <p className="font-instrument text-text-dark text-sm md:text-base leading-relaxed">
              As a General Dentist with over 18 years of experience, and 15 years leading DDS, I’ve trained across three countries — India, the UK, and Austria — to bring that belief to life: a PG Diploma in Aesthetic & Restorative Dentistry (City of London Dental School), a Fellowship in Advanced Micro-Endodontics (D. Y. Patil University), and an ongoing Mastership in Laser Dentistry (Medical University of Vienna).
            </p>

            {/* Highlights List */}
            <div className="flex flex-col space-y-4 pt-2">
              <h4 className="font-caudex font-bold text-lg text-primary">
                Career Highlights
              </h4>
              <div className="space-y-3">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-instrument text-sm text-text-dark leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── 4. Fellowships & Diplomas (Three Columns) ── */}
      <section className="py-16 bg-[#FFF8EE] border-t border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <h2 className="font-caudex font-bold text-2xl md:text-3xl text-primary text-center mb-12">
            Fellowships & Diplomas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {diplomas.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border-neutral/35 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="font-montserrat font-extrabold text-sm text-primary/60 tracking-wider">
                    Year: {item.year}
                  </span>
                  <h3 className="font-caudex font-bold text-lg text-primary mt-2 mb-1">
                    {item.title}
                  </h3>
                  <span className="font-instrument text-xs font-semibold text-text-muted">
                    {item.subtitle}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50">
                  <span className="font-instrument text-xs italic text-text-dark/80">
                    {item.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. Our Philosophy (Diagnose, Design, Smile) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary">
              Our Philosophy
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mb-2"></div>
            <p className="font-caudex font-bold text-base md:text-lg text-primary/80 leading-relaxed italic max-w-2xl">
              &ldquo;In fifteen years of practice, I&apos;ve learned that a great smile is never an accident — it&apos;s engineered. That belief shapes everything I do at DDS, built on three principles I refuse to compromise on.&rdquo;
            </p>
          </div>

          {/* Pillars List */}
          <div className="space-y-16 max-w-5xl w-full">
            
            {/* Pillar 1: Diagnose (Text Left, Image Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col space-y-4"
              >
                <h3 className="font-caudex font-bold text-2xl text-primary flex items-center gap-3">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src="/images/diagnose_icon.svg"
                      alt="Diagnose Icon"
                      fill
                      className="object-contain"
                      style={{
                        filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)" // brown color filter (#380920)
                      }}
                    />
                  </div>
                  Diagnose
                </h3>
                <p className="font-instrument text-text-dark text-sm md:text-base leading-relaxed pr-2">
                  I don&apos;t treat what I assume — I treat what I know. With in-house CBCT 3D imaging, ZEISS microscope-assisted examination, and digital intraoral scanning, I look beneath the surface — the hidden fractures, the early infections, the details a routine check-up would miss. I don&apos;t begin treatment until I have the complete picture.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-border-neutral"
              >
                <Image
                  src="/images/pm_4437.jpg"
                  alt="Diagnose technology checkup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </motion.div>
            </div>

            {/* Pillar 2: Design (Image Left, Text Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-border-neutral md:order-1"
              >
                <Image
                  src="/images/pm_4449.jpg"
                  alt="Smile Design CAD planning"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col space-y-4 md:order-2"
              >
                <h3 className="font-caudex font-bold text-2xl text-primary flex items-center gap-3">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src="/images/design_icon.svg"
                      alt="Design Icon"
                      fill
                      className="object-contain"
                      style={{
                        filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                      }}
                    />
                  </div>
                  Design
                </h3>
                <p className="font-instrument text-text-dark text-sm md:text-base leading-relaxed pl-2">
                  For me, a smile isn&apos;t fixed — it&apos;s designed. I use Digital Smile Design and CAD-based planning to map every case with precision, balancing function, aesthetics, and your natural facial harmony — before a single instrument ever touches your tooth.
                </p>
              </motion.div>
            </div>

            {/* Pillar 3: Smile (Text Left, Image Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col space-y-4"
              >
                <h3 className="font-caudex font-bold text-2xl text-primary flex items-center gap-3">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src="/images/smile_icon.svg"
                      alt="Smile Icon"
                      fill
                      className="object-contain"
                      style={{
                        filter: "invert(16%) sepia(23%) saturate(1786%) hue-rotate(314deg) brightness(91%) contrast(92%)"
                      }}
                    />
                  </div>
                  Smile
                </h3>
                <p className="font-instrument text-text-dark text-sm md:text-base leading-relaxed pr-2">
                  This is where the work becomes personal. Not just a treated tooth, but a transformation I stand behind painless, precise, and built to last. I hold every case to the same exacting standard I held on day one, and the one I&apos;ll hold fifteen years from now.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-border-neutral"
              >
                <Image
                  src="/images/gemini_generated_smile.png"
                  alt="Transformation Smile results"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 6. Green Bar Section (Soothing Environment, Care After Treatment, Experts Team) ── */}
      <section className="bg-[#62826B] text-white py-12 md:py-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32 w-full">
          {infoItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-5 w-full md:w-auto justify-center md:justify-start">
              <div className="relative w-18 h-18 flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className={`object-contain filter brightness-0 invert ${idx === 0 ? "scale-[1.35]" : ""}`}
                />
              </div>
              <span className="font-caudex font-bold text-lg md:text-xl text-white leading-tight whitespace-nowrap">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Why Patients Trust DDS? ── */}
      <section className="py-20 bg-[#FFF8EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary">
              Why Patients Trust DDS?
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Reasons Grid (4x2 layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-border-neutral/30 shadow-sm flex flex-col justify-start hover:shadow-md transition-shadow duration-300"
              >
                <span className="font-montserrat font-bold text-3xl text-primary/15 mb-3 block">
                  {reason.num.padStart(2, "0")}
                </span>
                <h3 className="font-caudex font-bold text-base text-primary mb-2 min-h-[44px] flex items-center">
                  {reason.title}
                </h3>
                <p className="font-instrument text-xs md:text-sm text-text-dark/80 leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 8. Scrolling Gallery Section (74143.jpg template placeholder) ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="flex gap-4 overflow-x-auto py-2 scrollbar-hide snap-x snap-mandatory justify-start"
            style={{ scrollbarWidth: "none" }}
          >
            {galleryImages.map((src, idx) => (
              <div
                key={idx}
                className="snap-start flex-shrink-0 w-[240px] sm:w-[280px] aspect-[4/3] relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border-neutral/30 bg-neutral-50"
              >
                <Image
                  src={src}
                  alt={`Dentsspa Studio Clinical Gallery ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA Banner (Brighter background style) ── */}
      <section className="relative w-full h-[220px] md:h-[260px] overflow-hidden flex items-center bg-primary">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cta_banner.jpg"
            alt="Book dental care session"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle overlay to keep white text readable while maintaining image clarity */}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
            
            {/* Text */}
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-caudex font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight md:whitespace-nowrap"
            >
              Ready to book your dental care session?
            </motion.h2>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-shrink-0"
            >
              <Link href="/book">
                <button
                  className="bg-white text-[#380920] hover:bg-cream-light font-instrument text-sm sm:text-base font-semibold px-8 py-3.5 rounded-[12px] transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book an Appointment
                </button>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
