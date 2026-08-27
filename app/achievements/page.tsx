"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Clock, Mail, Trophy, Award, Star } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";
import ContactInfoBar from "@/components/sections/ContactInfoBar";

export default function AchievementsPage() {
  const timelineData = [
    {
      year: "2015",
      icon: <Trophy className="w-6 h-6 text-[#62826B]" />,
      items: [
        "Famdent Excellence in Dentistry Awards — Clinic Interiors of the Year"
      ]
    },
    {
      year: "2016",
      icon: <Award className="w-6 h-6 text-[#62826B]" />,
      items: [
        "Indian Health Professional Awards — Excellence in Aesthetic & Cosmetic Dentistry",
        "Indian Health Professional Awards — Outstanding Dentist of the Year",
        "Indian Health Professional Awards — Young Dental Achiever of the Year",
        "Famdent Excellence in Dentistry Awards — Nominated for Outstanding Dentist of the Year",
        "Famdent Excellence in Dentistry Awards — Nominated for Aesthetic Practice of the Year",
        "Indian Health Organization — Accredited Dental Clinic"
      ]
    },
    {
      year: "2018",
      icon: <Star className="w-6 h-6 text-[#62826B]" />,
      items: [
        "Indian Health Professional Awards — Best Practicing Dentist",
        "International Dental Excellence Awards — Versatile Dentist of the Year",
        "Indian Dental Diva — Passionate Dentist of the Year (Prosthodontics)"
      ]
    },
    {
      year: "2019",
      icon: <Trophy className="w-6 h-6 text-[#62826B]" />,
      items: [
        "Indian Dental Diva — Passionate Dentist of the Year (Prosthodontics)"
      ]
    }
  ];

  const recentAwards = [
    {
      year: "2022",
      title: "Dr. D. Y. Patil Institute of Management & Research (DYPIMR) — Women's Day Appreciation Award",
      image: "/images/award_patil_2022.png"
    },
    {
      year: "2023",
      title: "Narishakti Puraskar — Presented by the All India Women Rights Association on the occasion of International Women's Day",
      image: "/images/award_narishakti_2023.png"
    },
    {
      year: "2024",
      title: "Dnyandeep Social Foundation — Sanman Chinha (सन्मानचिन्ह) for valuable contribution to the Palkhi Health Service Camp",
      image: "/images/award_dnyandeep_2024.png"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[55vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] min-h-[350px] sm:min-h-[500px] md:min-h-[650px] overflow-hidden flex items-center bg-[#380920]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/achievements_banner_45.jpg"
            alt="DDS Clinic Achievements"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for white text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-4 max-w-3xl mx-auto"
          >
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-white/80">
              HONORS & RECOGNITIONS
            </span>
            <h1 className="font-caudex font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
              Awards & Recognitions
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Contact Info Bar ── */}
      <ContactInfoBar />

      {/* ── 3. Timeline Awards Section ── */}
      <section className="py-20 bg-[#FFF8EE]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {timelineData.map((col, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col space-y-4"
              >
                {/* Header Icon */}
                <div className="flex items-center space-x-2">
                  <div className="bg-[#62826B]/10 p-2.5 rounded-full">
                    {col.icon}
                  </div>
                  <div className="h-px bg-border-neutral/30 flex-grow" />
                </div>

                {/* Year */}
                <h3 className="font-caudex font-bold text-4xl md:text-5xl text-primary">
                  {col.year}
                </h3>

                {/* Vertical Divider */}
                <div className="h-1 bg-[#62826B] w-8 rounded-full mb-2" />

                {/* List Items */}
                <ul className="space-y-4 text-sm font-instrument text-text-dark/85 leading-relaxed">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#62826B] before:font-bold">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Community Appreciation Awards Section ── */}
      <section className="py-20 bg-[#FFF8EE] border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Title Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              SOCIAL IMPACT & APPRECIATION
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              Community Appreciation Awards
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentAwards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-border-neutral/30 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-card-bg">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col space-y-3 flex-grow">
                  <h3 className="font-caudex font-bold text-2xl text-primary">
                    {award.year}.
                  </h3>
                  <p className="font-instrument text-sm md:text-base text-text-dark/85 leading-relaxed">
                    {award.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. Booking CTA Banner ── */}
      <CTABanner />

    </div>
  );
}
