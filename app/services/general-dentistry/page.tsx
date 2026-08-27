"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Phone, Clock, Mail, CheckCircle2 } from "lucide-react";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTABanner from "@/components/sections/CTABanner";
import ContactInfoBar from "@/components/sections/ContactInfoBar";
import { faqs } from "@/lib/data/siteData";

export default function GeneralDentistryPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const offerings = [
    {
      title: "Routine Dental Checkups",
      desc: "Preventive care and early diagnosis."
    },
    {
      title: "Dental Fillings",
      desc: "Tooth-colored, long-lasting restorations."
    },
    {
      title: "Teeth Cleaning & Scaling",
      desc: "Professional cleaning for gum health."
    },
    {
      title: "Dental Crowns & Bridges",
      desc: "Restoring damaged or missing teeth."
    },
    {
      title: "Wisdom Tooth Extraction",
      desc: "Safe, comfortable surgical care."
    }
  ];

  const commonProblems = [
    "Tooth Decay & Cavities",
    "Tooth Sensitivity",
    "Bleeding or Swollen Gums",
    "Bad Breath (Halitosis)",
    "Plaque & Tartar Build-up",
    "Toothache & Dental Pain",
    "Chipped or Broken Teeth",
    "Routine Oral Health Check-ups",
    "Preventive Dental Care",
    "Early Detection of Oral Diseases"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[55vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] min-h-[350px] sm:min-h-[500px] md:min-h-[650px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Mobile view banner */}
          <Image
            src="/images/M3.jpg"
            alt="General Dentistry"
            fill
            className="object-cover object-center md:hidden"
            priority
          />
          {/* Desktop/Tablet view banner */}
          <Image
            src="/images/general_dentistry_banner_45.jpg"
            alt="General Dentistry"
            fill
            className="object-cover object-center hidden md:block"
            priority
          />
          {/* Subtle light overlay to make text pop while keeping the banner image bright and clear */}
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex flex-col items-center justify-center space-y-4 max-w-3xl mx-auto"
          >
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#380920]/80">
              OUR TREATMENTS
            </span>
            <h1 className="font-caudex font-bold text-4xl sm:text-5xl md:text-6xl text-[#380920] leading-tight">
              General Dentistry
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-[#380920]/95 font-semibold">
              Comprehensive oral care for every stage of life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Contact Info Bar ── */}
      <ContactInfoBar />

      {/* ── 3. Intro Section (Image Left, Text Right) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image 28.jpg */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-border-neutral bg-[#FFF8EE]"
          >
            <Image
              src="/images/28.jpg"
              alt="General Dentistry treatment at DDS"
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
                GENERAL DENTISTRY
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
                Comprehensive Oral Care for Every Stage of Life
              </h2>
            </div>

            <p className="font-instrument text-text-dark text-sm md:text-base leading-relaxed">
              Our general dentistry services focus on the prevention, diagnosis, and treatment of a wide range of oral health issues. Whether you&apos;re coming in for a routine check-up or seeking relief from dental pain, our experienced team is here to help you maintain a healthy, confident smile.
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

      {/* ── 4. What we offer in General & Family Dentistry? ── */}
      <section className="py-20 bg-[#FFF8EE] border-t border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              OUR SERVICE OFFERINGS
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              What we offer in General & Family Dentistry?
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

      {/* ── 5. Common Dental Problems We Treat ── */}
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
                SYMPTOMS & ISSUES
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-white leading-tight">
                Common Dental Problems We Treat
              </h2>
            </div>

            {/* List with clean grid formatting */}
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

          {/* Right Column: Image common_problems.jpg */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-white/10 bg-[#FFF8EE]"
          >
            <Image
              src="/images/common_problems.jpg"
              alt="Common dental problems checkup"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

        </div>
      </section>

      {/* ── 6. FAQ Section ── */}
      <section ref={ref} className="py-20 bg-[#FFF8EE] border-t border-b border-primary/5">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              COMMON QUESTIONS
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              FAQ&rsquo;s
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          <FAQAccordion items={faqs} className="w-full bg-white rounded-2xl p-4 shadow-sm border border-border-neutral/30" />
        </div>
      </section>

      {/* ── 7. CTA Section (Same as Home Page) ── */}
      <CTABanner />

    </div>
  );
}