"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CTABanner from "@/components/sections/CTABanner";

export default function BlogDetailPage() {
  const tips = [
    {
      num: "1.",
      title: "Brush Twice a Day—Properly",
      desc: "Brushing your teeth in the morning and before bed is essential. Use a soft-bristled toothbrush and fluoride toothpaste. Take at least two minutes, making sure to clean all surfaces of your teeth gently but thoroughly."
    },
    {
      num: "2.",
      title: "Don’t Forget to Floss",
      desc: "Flossing removes plaque and food particles between teeth that brushing alone can’t reach. Daily flossing helps prevent gum disease and cavities, especially in those hard-to-reach spots."
    },
    {
      num: "3.",
      title: "Use Mouthwash for Extra Protection",
      desc: "An antimicrobial or fluoride mouthwash can help reduce plaque, fight bad breath, and strengthen enamel. Use it as a finishing touch to your brushing and flossing routine."
    },
    {
      num: "4.",
      title: "Stay Hydrated",
      desc: "Drinking plenty of water helps wash away food debris and bacteria. It also promotes saliva production, which naturally protects your teeth and gums."
    },
    {
      num: "5.",
      title: "Protect Your Teeth",
      desc: "If you grind your teeth at night or play contact sports, use a mouthguard. This protects against unnecessary wear or injury that can affect the look and health of your smile."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[600px] md:min-h-[750px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/invisalign_banner_2605.jpg"
            alt="How to Protect Your Child's Teeth"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for white text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-start justify-center space-y-4 max-w-4xl"
          >
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-white/80">
              BLOG ARTICLE
            </span>
            <h1 className="font-caudex font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              How to Protect Your Child’s Teeth and Prevent Cavities Early On
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Article Content Section ── */}
      <section className="py-20 bg-[#FFF8EE]/20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-border-neutral/30 rounded-3xl p-8 md:p-12 shadow-sm space-y-8"
          >
            
            {/* Intro Paragraph */}
            <p className="font-instrument text-base md:text-lg text-text-dark/90 leading-relaxed font-medium border-l-4 border-[#62826B] pl-4">
              A bright, confident smile isn’t just about looks—it’s a sign of good oral health and self-care. Whether you’re trying to maintain pearly whites or improve your dental routine, small daily habits can make a big difference. Here are 10 easy tips to help you keep your smile healthy and radiant.
            </p>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm border border-border-neutral">
              <Image
                src="/images/gemini_generated_smile.png"
                alt="Healthy smile and preventative dental care"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </div>

            {/* Structured Tips List */}
            <div className="space-y-8 pt-6">
              {tips.map((tip, idx) => (
                <div key={idx} className="space-y-2 border-b border-border-neutral/10 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="font-caudex font-bold text-lg md:text-xl text-primary flex items-center gap-2">
                    <span className="text-[#62826B] font-instrument">{tip.num}</span> {tip.title}
                  </h3>
                  <p className="font-instrument text-sm md:text-base text-text-dark/85 leading-relaxed pl-6">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── 3. CTA Section ── */}
      <CTABanner />

    </div>
  );
}
