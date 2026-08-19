"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Clock, Mail, CheckCircle2, ChevronDown } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";

export default function AdditionalSpecializedCarePage() {
  const offerings = [
    {
      title: "Teeth Whitening",
      desc: "In-office and take-home whitening options."
    },
    {
      title: "TMJ Treatment",
      desc: "Diagnosis and management of jaw joint disorders."
    },
    {
      title: "Sedation Dentistry",
      desc: "Anxiety-free care for nervous patients."
    },
    {
      title: "Laser Dentistry",
      desc: "Minimally invasive treatment for soft tissue procedures."
    },
    {
      title: "In-House CBCT Imaging",
      desc: "Advanced 3D diagnostics for precise treatment planning."
    }
  ];

  const points = [
    "Advanced Technology",
    "Experienced Specialists",
    "Personalized Treatment",
    "Comfort-Focused Experience"
  ];

  const faqs = [
    {
      q: "Is professional teeth whitening safe?",
      a: "Yes, professional teeth whitening performed under the supervision of a dentist is entirely safe. We use high-quality, clinically tested whitening agents and protective barriers to shield your gums from sensitivity or irritation."
    },
    {
      q: "When should I seek treatment for TMJ pain?",
      a: "You should seek treatment if you experience persistent jaw pain, difficulty opening or closing your mouth, clicking or popping sounds when chewing, frequent tension headaches, or unexplained neck and shoulder stiffness."
    },
    {
      q: "Will I be awake during sedation dentistry?",
      a: "Yes, with mild to moderate sedation (like nitrous oxide or oral conscious sedation), you remain awake, responsive, and able to follow instructions, but you will feel deeply relaxed and free of anxiety."
    },
    {
      q: "Is laser dentistry painful?",
      a: "Laser dentistry is highly precise and minimally invasive, often eliminating the need for traditional drills or needles. Most soft tissue procedures performed with dental lasers are virtually painless and require little to no local anesthesia."
    },
    {
      q: "Why is CBCT imaging better than traditional X-rays?",
      a: "Cone Beam Computed Tomography (CBCT) provides highly detailed 3D dental reconstructions of your teeth, jawbone, nerve pathways, and surrounding tissues, offering significantly more diagnostic accuracy than flat 2D X-rays for planning implants and surgeries."
    },
    {
      q: "How do I know which specialized treatment is right for me?",
      a: "During a comprehensive diagnostic evaluation, our specialists use 3D imaging and detailed checkups to analyze your symptoms, discussing personalized treatment plans tailored to your specific goals and health needs."
    }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[600px] md:min-h-[750px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/specialized_banner_13186.jpg"
            alt="Additional Specialized Care"
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
              Additional <br />Specialized Care
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-[#380920]/95 font-semibold">
              Advanced Solutions for Complete Oral Wellness.
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
          
          {/* Left Column: Image ChatGPT Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-border-neutral bg-[#FFF8EE]"
          >
            <Image
              src="/images/service_specialized_main.png"
              alt="Specialized Care consultation at DDS"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

          {/* Right Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <div className="flex flex-col space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B]">
                SPECIALIZED SERVICES
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
                Additional Specialized Care
              </h2>
              <h3 className="font-caudex font-bold text-lg md:text-xl text-primary/80 leading-relaxed italic">
                Redefining Dental Care with Precision and Technology.
              </h3>
            </div>

            <p className="font-instrument text-text-dark text-sm md:text-base leading-relaxed">
              We believe exceptional dental care goes beyond routine treatments. Our specialized services combine advanced technology with personalized care to deliver comfortable, precise, and efficient treatment experiences tailored to your unique needs.
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

      {/* ── 4. Animated GIF Section (Wrapped in Cream spacer) ── */}
      <section className="bg-[#FFF8EE] py-12 flex justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/9] w-full max-w-5xl rounded-[24px] overflow-hidden shadow-md border border-border-neutral"
          >
            <Image
              src="/images/specialized_waiting_room.gif"
              alt="DDS waiting lounge experience"
              fill
              className="object-cover"
              unoptimized={true}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 5. What We Offer Section ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              OUR SPECIALTIES
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              What we offer in Additional Specialized Care?
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

      {/* ── 6. Why Choose DDS (Text Left, Image Right) ── */}
      <section className="py-20 bg-[#380920] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col space-y-8"
          >
            <div className="flex flex-col space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#FFF8EE]/80">
                CLINICAL ADVANTAGES
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-white leading-tight">
                Why Choose DDS for Specialized Care?
              </h2>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 w-full">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0" />
                  <span className="font-instrument text-sm text-white/90 leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image yqdoor.png */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-white/10 bg-[#FFF8EE]"
          >
            <Image
              src="/images/specialized_why_choose.png"
              alt="DDS specialized care diagnostic room"
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
