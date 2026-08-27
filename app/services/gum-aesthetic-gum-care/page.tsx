"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Clock, Mail, CheckCircle2, ChevronDown } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";
import ContactInfoBar from "@/components/sections/ContactInfoBar";

export default function GumAestheticCarePage() {
  const offerings = [
    {
      title: "Gum Disease Treatment",
      desc: "Non-surgical and surgical periodontal therapy."
    },
    {
      title: "Gum Depigmentation",
      desc: "Even, natural-looking gum tone."
    },
    {
      title: "Gummy Smile Correction",
      desc: "Reshaping for balanced smile proportions."
    }
  ];

  const signs = [
    "Gums bleed while brushing or flossing",
    "Red, swollen, or tender gums",
    "Persistent bad breath",
    "Receding gums",
    "Loose teeth",
    "Sensitivity near the gum line",
    "Pain while chewing",
    "Uneven or excessive gum display when smiling"
  ];

  const faqs = [
    {
      q: "Why do my gums bleed while brushing?",
      a: "Bleeding gums are often an early sign of gingivitis (gum inflammation) caused by plaque buildup. Professional cleaning and improved home oral hygiene usually resolve it quickly."
    },
    {
      q: "What is a gummy smile, and can it be treated?",
      a: "A gummy smile refers to excessive display of gum tissue when you smile. Yes, it can be treated comfortably with laser gum contouring or cosmetic adjustments to achieve balanced proportions."
    },
    {
      q: "Is gum treatment painful?",
      a: "Most gum treatments, including laser reshaping and deep scaling, are performed under local anesthesia or topical numbing. Post-treatment recovery is typically quick with minimal discomfort."
    },
    {
      q: "Can receding gums grow back naturally?",
      a: "Once gum tissue has receded, it cannot grow back naturally. However, treatments like scaling, laser therapy, or soft tissue grafts can prevent further recession and restore protection."
    },
    {
      q: "How can I prevent gum disease?",
      a: "Brushing twice a day, flossing daily, using an antiseptic mouthwash, and visiting your dentist every six months for checkups and cleanings are the most effective ways to prevent gum disease."
    },
    {
      q: "How often should I have my gums checked?",
      a: "Gum health is evaluated during your routine biannual dental examinations. If you have a history of periodontitis, your dentist may recommend checks every three to four months."
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
            src="/images/M9.jpg"
            alt="Gum & Aesthetic Gum Care"
            fill
            className="object-cover object-center md:hidden"
            priority
          />
          {/* Desktop/Tablet view banner */}
          <Image
            src="/images/gum_banner_25334.jpg"
            alt="Gum & Aesthetic Gum Care"
            fill
            className="object-cover object-center scale-x-[-1] hidden md:block"
            priority
          />
          {/* Subtle dark overlay for white text legibility */}
          <div className="absolute inset-0 bg-black/20" />
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
              Gum &amp; <br />Aesthetic Gum Care
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-white font-semibold">
              Enhance Your Gum Health. Elevate Your Smile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Contact Info Bar ── */}
      <ContactInfoBar />

      {/* ── 3. Gum Care Intro (Image Left, Text Right) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image 65669.jpg */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-border-neutral bg-[#FFF8EE]"
          >
            <Image
              src="/images/service_gum_main.jpg"
              alt="Gum Care demonstration at DDS"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

          {/* Right Column: Text & Title */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <div className="flex flex-col space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B]">
                PERIODONTICS
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
                Gum Care
              </h2>
              <h3 className="font-caudex font-bold text-lg md:text-xl text-primary/80 leading-relaxed italic">
                Healthy Gums. Beautiful Smiles.
              </h3>
            </div>

            <p className="font-instrument text-text-dark text-sm md:text-base leading-relaxed">
              Gum &amp; Aesthetic Gum Care focuses on the prevention, diagnosis, and treatment of gum diseases while enhancing the appearance of your gums. Whether you're experiencing bleeding gums, gum recession, or an uneven gum line, our personalized treatments help restore both oral health and smile aesthetics.
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

      {/* ── 4. What we offer Section ── */}
      <section className="py-20 bg-[#FFF8EE] border-t border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              OUR SERVICE OFFERINGS
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              What we offer in Gum &amp; Aesthetic Gum Care?
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

      {/* ── 5. Gum Depigmentation Before/After Image Section ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[2/1] w-full rounded-[24px] overflow-hidden shadow-md border border-border-neutral bg-[#FFF8EE]"
          >
            <Image
              src="/images/gum_depigmentation_before_after.png"
              alt="Gum Depigmentation Before & After case comparison"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </motion.div>
        </div>
      </section>

      {/* ── 6. Signs You May Need Gum Treatment (Text Left, Image Right) ── */}
      <section className="py-20 bg-[#380920] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Signs checklist */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col space-y-8"
          >
            <div className="flex flex-col space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#FFF8EE]/80">
                DIAGNOSIS
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-white leading-tight">
                Signs You May Need Gum Treatment
              </h2>
            </div>

            {/* List in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 w-full">
              {signs.map((sign, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0" />
                  <span className="font-instrument text-sm text-white/90 leading-snug">
                    {sign}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image gum_pain_man.jpg */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-white/10 bg-[#FFF8EE]"
          >
            <Image
              src="/images/gum_pain_man.jpg"
              alt="Person experiencing gum pain"
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