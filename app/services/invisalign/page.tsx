"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Clock, Mail, CheckCircle2, ChevronDown, ShieldCheck, Zap, Heart } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";

export default function InvisalignPage() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-[#62826B]" />,
      title: "No Wires. No Brackets.",
      desc: "Just Clear Confidence"
    },
    {
      icon: <Zap className="w-10 h-10 text-[#62826B]" />,
      title: "Faster results,",
      desc: "Fewer Clinic visits"
    },
    {
      icon: <Heart className="w-10 h-10 text-[#62826B]" />,
      title: "Lifestyle friendly option",
      desc: "for all ages"
    }
  ];

  const suitabilityCards = [
    {
      title: "Crowded Teeth",
      desc: "Create more space and improve the alignment of overlapping teeth."
    },
    {
      title: "Overbite",
      desc: "Correct certain types of excessive vertical overlap between the upper and lower teeth."
    },
    {
      title: "Crossbite",
      desc: "Help correct teeth that sit incorrectly in relation to the opposing arch."
    },
    {
      title: "Gaps Between Teeth",
      desc: "Gradually close unwanted spaces for a more balanced smile."
    },
    {
      title: "Open Bite",
      desc: "Address certain cases where the upper and lower teeth do not meet properly."
    }
  ];

  const careGuidelines = [
    "Take your aligners out before meals and put them back after cleaning your teeth.",
    "Brush and floss regularly to keep your teeth and gums healthy throughout treatment.",
    "Clean your aligners regularly using the method recommended by your dental team.",
    "Regular monitoring allows your orthodontist to assess progress and make adjustments when necessary."
  ];

  const journeySteps = [
    {
      title: "Consultation & Assessment",
      desc: "We begin with a comprehensive assessment of your teeth, bite, smile, and orthodontic goals."
    },
    {
      title: "Treatment Planning",
      desc: "Your orthodontic plan is digitally designed to map the anticipated movement of your teeth."
    },
    {
      title: "Custom Aligners",
      desc: "Your series of personalized clear aligners is created according to your treatment plan."
    },
    {
      title: "Wear & Progress",
      desc: "You wear each aligner as instructed and progress through the series while your orthodontist monitors your treatment."
    }
  ];

  const faqs = [
    {
      q: "Is Invisalign suitable for adults?",
      a: "Yes, Invisalign is highly popular among adults. It offers a discreet, comfortable way to straighten teeth without the appearance of metal brackets, fitting seamlessly into professional and social lifestyles."
    },
    {
      q: "Can I eat while wearing Invisalign?",
      a: "Yes! Since Invisalign aligners are completely removable, you can eat and drink whatever you like. Just remember to remove them before eating and brush your teeth before putting them back in."
    },
    {
      q: "Can Invisalign correct an overbite or underbite?",
      a: "Yes, Invisalign is designed to correct a wide range of bite issues, including overbites, underbites, crossbites, and open bites, when combined with precision attachments or elastics."
    },
    {
      q: "Can I get Invisalign if I already have crowns or fillings?",
      a: "In most cases, yes. Having crowns, bridges, or fillings does not automatically disqualify you from Invisalign. We will evaluate your dental work during your consultation to customize your aligners."
    },
    {
      q: "How do I clean Invisalign aligners?",
      a: "Clean your aligners daily by brushing them gently with a soft-bristled toothbrush and lukewarm water, or using specialized Invisalign cleaning crystals to keep them clear and odor-free."
    },
    {
      q: "Will I need retainers after Invisalign?",
      a: "Yes, wearing retainers after any orthodontic treatment is essential to maintain your new alignment and prevent your teeth from gradually shifting back to their original positions."
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
          <Image
            src="/images/invisalign_banner_2605.jpg"
            alt="Invisalign Provider"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle light overlay for clean text rendering */}
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
              INVISALIGN PROVIDER
            </span>
            <h1 className="font-caudex font-bold text-4xl sm:text-5xl md:text-6xl text-[#380920] leading-tight">
              Invisalign Provider
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-[#380920]/95 font-semibold">
              The smile you expect is the smile you get!
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

      {/* ── 3. Core Features Section (No Wires. No Brackets.) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-stretch">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-border-neutral/30 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-3 bg-[#62826B]/10 rounded-full">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-caudex font-bold text-lg text-primary">
                    {feat.title}
                  </h3>
                  <p className="font-instrument text-sm text-text-dark/85 mt-1">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Is Invisalign Right for You? Section ── */}
      <section className="py-20 bg-[#FFF8EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              TREATMENT RANGE
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              Is Invisalign Right for You?
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
            {suitabilityCards.map((item, idx) => (
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

      {/* ── 5. Invisalign Care Guide (Text Left, Image Right) ── */}
      <section className="py-20 bg-[#380920] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Guidelines */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col space-y-8"
          >
            <div className="flex flex-col space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#FFF8EE]/80">
                ALIGNER COMPLIANCE
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-white leading-tight">
                Invisalign Care Guide
              </h2>
              <p className="font-instrument text-sm text-white/80 italic">
                Consistent wear is essential for keeping your treatment on track.
              </p>
            </div>

            {/* List */}
            <div className="flex flex-col space-y-4">
              {careGuidelines.map((guideline, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                  <span className="font-instrument text-sm text-white/90 leading-relaxed">
                    {guideline}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image invisalign_care_guide.jpg */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-lg border border-white/10 bg-[#FFF8EE]"
          >
            <Image
              src="/images/invisalign_care_guide.jpg"
              alt="Woman wearing invisible orthodontic aligner"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

        </div>
      </section>

      {/* ── 6. Your Invisalign Journey (Text Left, Image Right) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Timeline Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col space-y-8"
          >
            <div className="flex flex-col space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B]">
                ALIGNMENT STEPS
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
                Your Invisalign Journey
              </h2>
              <p className="font-instrument text-sm text-text-dark/80 italic">
                From Digital Scan to Your New Smile.
              </p>
            </div>

            {/* Steps Vertical List */}
            <div className="space-y-6">
              {journeySteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start border-l-2 border-[#62826B]/30 pl-6 relative ml-2">
                  {/* Dot */}
                  <div className="absolute left-[-6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#62826B]" />
                  <div className="space-y-1">
                    <h4 className="font-caudex font-bold text-base text-primary">
                      {step.title}
                    </h4>
                    <p className="font-instrument text-sm text-text-dark/80 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Two Brochure Images Side-by-Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 w-full"
          >
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md border border-border-neutral/30 bg-[#FFF8EE]">
              <Image
                src="/images/invisalign_journey_1.png"
                alt="Invisalign flyer - Built for your Smile"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md border border-border-neutral/30 bg-[#FFF8EE]">
              <Image
                src="/images/invisalign_journey_2.png"
                alt="Invisalign flyer - Smile, designed better"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
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
              FAQs
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
