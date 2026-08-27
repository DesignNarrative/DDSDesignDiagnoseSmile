"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";
import ContactInfoBar from "@/components/sections/ContactInfoBar";
import FAQAccordion from "@/components/ui/FAQAccordion";

export default function OralSurgeryPage() {
  const offerings = [
    {
      title: "Wisdom Tooth Removal",
      desc: "Surgical removal of impacted, partially erupted, or problematic wisdom teeth to prevent pain, infection."
    },
    {
      title: "Surgical Extraction",
      desc: "Advanced extraction techniques for teeth requiring additional surgical access or specialized care."
    },
    {
      title: "Gummy Smile Correction",
      desc: "Reshaping for balanced smile proportions."
    },
    {
      title: "Apicoectomy",
      desc: "A precision surgical procedure used to remove infection from the tip of a tooth root when conventional root canal treatment is not sufficient."
    },
    {
      title: "Oral Cyst & Lesion Removal",
      desc: "Diagnosis and surgical removal of certain cysts or abnormal oral lesions when clinically indicated."
    },
    {
      title: "Pre-Implant Surgery",
      desc: "Procedures such as bone augmentation or other preparatory treatments that may be required before dental implant placement."
    }
  ];

  const signs = [
    "Persistent or severe tooth pain",
    "Swelling around the teeth or jaw",
    "Impacted wisdom teeth",
    "Recurrent dental infections",
    "Difficulty opening your mouth",
    "Pain or difficulty while chewing",
    "Severely broken or damaged teeth",
    "Persistent swelling or unusual growths in the mouth"
  ];

  const faqs = [
    {
      q: "Is oral surgery painful?",
      a: "Oral surgery is performed with appropriate anesthesia to help keep you comfortable during the procedure. Some tenderness or swelling may occur during recovery, depending on the treatment."
    },
    {
      q: "When should wisdom teeth be removed?",
      a: "Wisdom teeth may require removal when they are impacted, causing pain or infection, damaging neighboring teeth, or creating other oral health concerns. Your dentist can determine whether removal is necessary after an examination and imaging."
    },
    {
      q: "How long does recovery take after oral surgery?",
      a: "Recovery varies depending on the type and complexity of the procedure. Your dental specialist will provide specific aftercare instructions and an expected recovery timeline."
    },
    {
      q: "Is CBCT required before oral surgery?",
      a: "Not every procedure requires CBCT. When clinically indicated, 3D imaging can provide detailed information about teeth, roots, nerves, and bone to support more precise treatment planning."
    },
    {
      q: "Can an infected tooth always be saved?",
      a: "Not every tooth can be preserved. Depending on the condition of the tooth, options may include root canal treatment, surgical treatment, or extraction followed by an appropriate replacement option."
    },
    {
      q: "What should I expect after oral surgery?",
      a: "Mild discomfort, swelling, or sensitivity may occur depending on the procedure. You will receive personalized post-operative instructions to support healing and recovery."
    }
  ];

  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[55vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] min-h-[350px] sm:min-h-[500px] md:min-h-[650px] overflow-hidden flex items-center bg-[#380920]">
        <div className="absolute inset-0 z-0">
          {/* Mobile view banner */}
          <Image
            src="/images/Oral Surgery mobile.jpg"
            alt="Oral Surgery Treatment Mobile Banner"
            fill
            className="object-cover object-center md:hidden"
            priority
          />
          {/* Desktop/Tablet view banner */}
          <Image
            src="/images/image (1).png"
            alt="Oral Surgery Treatment Desktop Banner"
            fill
            className="object-cover object-center hidden md:block scale-x-[-1]"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
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
              Precision Surgical Care.<br />Thoughtfully Delivered.
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-white/95">
              Precision Before the Procedure
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Contact Info Bar ── */}
      <ContactInfoBar />

      {/* ── 3. Overview Section (Text Right, Image Left) ── */}
      <section className="py-20 bg-[#FFF8EE]/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image 65669.jpg */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative h-[300px] md:h-[380px] w-full rounded-[24px] overflow-hidden shadow-lg border border-border-neutral bg-white"
          >
            <Image
              src="/images/65669.jpg"
              alt="DDS Oral Surgery Specialist"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

          {/* Right Column: Overview copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B]">
              ORAL SURGERY
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              Expert Surgical Care,<br />When You Need It.
            </h2>
            <p className="font-instrument text-base md:text-lg text-text-dark/90 leading-relaxed">
              Oral surgery focuses on the diagnosis and surgical treatment of conditions affecting the teeth, gums, jaw, and surrounding oral structures. At DDS, we combine specialist expertise, advanced diagnostics, and modern surgical techniques to provide precise treatment with a strong focus on patient comfort and safety.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── 4. Offerings Section ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B]">
              TREATMENTS AVAILABLE
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              What we offer in Oral Surgery Treatments
            </h2>
            <div className="w-16 h-1 bg-[#62826B] rounded-full"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-8 border border-border-neutral/30 shadow-sm flex flex-col justify-start hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="font-caudex font-bold text-xl text-primary mb-3">
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

      {/* ── 5. Signs Section (Text Left, Image Right) ── */}
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
                Signs You May Need Oral Surgery
              </h2>
            </div>

            {/* List */}
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

          {/* Right Column: Image 44088.jpg */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-white/10 bg-[#FFF8EE]"
          >
            <Image
              src="/images/44088.jpg"
              alt="Person in need of oral surgery"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

        </div>
      </section>

      {/* ── 6. FAQ's Section ── */}
      <section className="py-20 bg-[#FFF8EE]/40">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B]">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              FAQ’s
            </h2>
            <div className="w-16 h-1 bg-[#62826B] rounded-full"></div>
          </div>

          {/* 2-Column Accordions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <FAQAccordion items={leftFaqs} className="w-full" />
            <FAQAccordion items={rightFaqs} className="w-full" />
          </div>

        </div>
      </section>

      {/* ── 7. CTA Section ── */}
      <CTABanner />

    </div>
  );
}
