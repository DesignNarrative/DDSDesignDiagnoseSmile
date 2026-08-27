"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Clock, Mail, CheckCircle2, ChevronDown } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";
import ContactInfoBar from "@/components/sections/ContactInfoBar";

export default function MicroEndodonticsPage() {
  const offerings = [
    {
      title: "Microscope-Assisted Root Canal Treatment",
      desc: "ZEISS Opmi Pico–guided precision endodontics."
    },
    {
      title: "Retreatment of Failed Root Canals",
      desc: "Advanced techniques to save compromised teeth."
    },
    {
      title: "Single-Visit Root Canal Therapy",
      desc: "Where clinically appropriate, minimizing visits."
    }
  ];

  const benefits = [
    "Eliminates tooth pain and infection",
    "Preserves your natural tooth",
    "Restores normal chewing function",
    "Prevents infection from spreading",
    "Improves overall oral health",
    "Long-lasting results with proper care",
    "Minimally invasive with modern technology"
  ];

  const faqs = [
    {
      q: "Is a root canal painful?",
      a: "With modern anesthetics and advanced micro-endodontic techniques, root canal treatment is typically no more uncomfortable than having a standard filling placed. Its primary purpose is to relieve pain caused by an infected tooth pulp."
    },
    {
      q: "How long does the treatment take?",
      a: "A standard treatment usually takes between 60 to 90 minutes. Depending on the complexity of the tooth's canal anatomy and the extent of infection, it may be completed in a single visit or require two visits."
    },
    {
      q: "Will I need a crown after a root canal?",
      a: "Yes, in most cases, especially for molars and premolars that endure heavy chewing forces. A root canal-treated tooth becomes more brittle over time, and a custom crown is placed to protect it from fracturing and restore full function."
    },
    {
      q: "Can a root canal fail?",
      a: "While root canal therapies have success rates exceeding 95%, failure can occasionally occur due to complex undetected canals, micro-leakage in restorations, or new decay. Failed treatments can often be saved using advanced endodontic retreatment."
    },
    {
      q: "How long does a root canal-treated tooth last?",
      a: "With proper care, regular check-ups, and a high-quality crown restoration, a root canal-treated tooth can last for a lifetime, functioning exactly like a natural tooth."
    },
    {
      q: "When should I visit the dentist for Root Canal ?",
      a: "You should schedule an evaluation immediately if you experience severe tooth pain (especially while chewing), prolonged sensitivity to hot or cold temperatures, gum swelling, tooth discoloration, or a persistent pimple on the gums."
    }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[55vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] min-h-[350px] sm:min-h-[500px] md:min-h-[650px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Mobile view banner */}
          <Image
            src="/images/M10.jpg"
            alt="Micro-Endodontics"
            fill
            className="object-cover object-center md:hidden"
            priority
          />
          {/* Desktop/Tablet view banner */}
          <Image
            src="/images/endo_banner_67119.jpg"
            alt="Micro-Endodontics"
            fill
            className="object-cover object-center scale-x-[-1] hidden md:block"
            priority
          />
          {/* Dark overlay for white text legibility */}
          <div className="absolute inset-0 bg-black/30" />
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
              OUR TREATMENTS
            </span>
            <h1 className="font-caudex font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
              Micro-Endodontics
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-white/90 font-semibold">
              Save Your Natural Tooth with Precision Endodontic Care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Contact Info Bar ── */}
      <ContactInfoBar />

      {/* ── 3. Intro Section (Image Left, Text Right) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image 34090.jpg */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-border-neutral bg-[#FFF8EE]"
          >
            <Image
              src="/images/service_endo_main.jpg"
              alt="Root canal procedure model at DDS"
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
                ENDODONTICS
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
                Root Canal Treatment
              </h2>
              <h3 className="font-caudex font-bold text-lg md:text-xl text-primary/80 leading-relaxed italic">
                Relieve Pain. Preserve Your Natural Smile.
              </h3>
            </div>

            <p className="font-instrument text-text-dark text-sm md:text-base leading-relaxed">
              Micro-Endodontics, commonly known as Root Canal Treatment (RCT), is an advanced procedure that treats infected or damaged tooth pulp while preserving your natural tooth. Using magnification, modern imaging, and precision techniques, we deliver comfortable, predictable, and minimally invasive treatment.
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

      {/* ── 4. What we offer in Root Canal Treatment? ── */}
      <section className="py-20 bg-[#FFF8EE] border-t border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              OUR SERVICE OFFERINGS
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              What we offer in Root Canal Treatment?
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch animate-fade-in-up">
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

      {/* ── 5. Side-by-Side Gemini Generated Images Section ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Image 1: Diagnosis Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-md border border-border-neutral bg-[#FFF8EE]"
            >
              <Image
                src="/images/rct_step_diagnosis.png"
                alt="Root canal treatment diagnosis steps"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </motion.div>

            {/* Image 2: Shade Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-md border border-border-neutral bg-[#FFF8EE]"
            >
              <Image
                src="/images/rct_teeth_shades.png"
                alt="Natural shade comparisons for dental crowns"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Benefits of Root Canal Treatment (Text Left, Image Right) ── */}
      <section className="py-20 bg-[#380920] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Benefits list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col space-y-8"
          >
            <div className="flex flex-col space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#FFF8EE]/80">
                PULP PRESERVATION
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-white leading-tight">
                Benefits of Root Canal Treatment
              </h2>
            </div>

            {/* List in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 w-full">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0" />
                  <span className="font-instrument text-sm text-white/90 leading-snug">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image 57015 01.jpg */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-white/10 bg-[#FFF8EE]"
          >
            <Image
              src="/images/endo_benefits_57015.jpg"
              alt="Natural endodontic treatment results at DDS"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

        </div>
      </section>

      {/* ── 7. FAQ's Section ── */}
      <section className="py-20 bg-[#FFF8EE]/50">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              FAQ’s
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-border-neutral/30 overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-neutral-50/50"
                  >
                    <span className="font-caudex font-bold text-primary text-base md:text-lg">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary/70 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[300px] border-t border-border-neutral/10" : "max-h-0"
                    } overflow-hidden`}
                  >
                    <p className="p-6 font-instrument text-sm text-text-dark/85 leading-relaxed bg-neutral-50/20">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 8. CTA Section ── */}
      <CTABanner />

    </div>
  );
}