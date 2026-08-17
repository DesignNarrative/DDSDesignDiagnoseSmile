"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Clock, Mail } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";

export default function PediatricDentistry() {
  const services = [
    {
      title: "Routine Dental Check-ups",
      desc: "Regular examinations help monitor oral development and detect dental issues early.",
    },
    {
      title: "Preventive Dental Care",
      desc: "Professional cleaning, fluoride application, and dental sealants to protect growing teeth.",
    },
    {
      title: "Tooth-Coloured Fillings",
      desc: "Safe, aesthetic restorations for cavities while maintaining a natural appearance.",
    },
    {
      title: "Emergency Care",
      desc: "Immediate care for dental injuries, toothaches, or broken teeth.",
    },
    {
      title: "Habit Counseling",
      desc: "Guidance for thumb sucking, tongue thrusting, pacifier habits, and other oral habits affecting dental development.",
    },
    {
      title: "Infant Oral Health Exams",
      desc: "Gentle exams for babies to monitor development and guide parents on early dental care.",
    },
  ];

  const stages = [
    {
      title: "0–2 Years: First Tooth, First Visit",
      bullets: [
        "Oral health guidance for parents",
        "Teething support",
        "Early cavity prevention",
      ],
    },
    {
      title: "3-6 Years: Healthy Habits Begin",
      bullets: [
        "Routine dental check-ups",
        "Fluoride treatments",
        "Dental sealants",
        "Brushing education",
      ],
    },
    {
      title: "7-12 Years: Growing Smiles",
      bullets: [
        "Monitoring permanent teeth",
        "Space maintainers",
        "Early orthodontic assessments",
        "Sports mouthguards",
      ],
    },
    {
      title: "Teen Years: Confident Smiles",
      bullets: [
        "Orthodontic guidance",
        "Wisdom teeth monitoring",
        "Cosmetic dental care",
        "Preventive maintenance",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero / Top Banner */}
      <section className="relative w-full h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[600px] md:min-h-[750px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/2151686836.jpg"
            alt="Pediatric Dentistry Treatment Banner"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#411928]/45" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-start justify-center space-y-4 max-w-3xl mx-auto md:mx-0"
          >
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#FFF8EE]/80">
              OUR TREATMENTS
            </span>
            <h1 className="font-caudex font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
              Pediatric Dentistry Treatment
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-cream/90 mt-4 max-w-xl italic">
              Comprehensive oral care for every stage of life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Contact Info Bar */}
      <section className="bg-[#380920] text-white py-6 md:py-8 border-t border-white/5 z-10 relative shadow-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
          
          {/* Column 1: WhatsApp Specialist */}
          <div className="flex items-center space-x-4 md:border-r border-white/10 pr-4 last:border-none">
            <div className="bg-white/5 p-3 rounded-full text-cream flex-shrink-0">
              <Phone className="w-5 h-5" />
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

      {/* 3. Overview Section */}
      <section className="py-20 bg-[#FFF8EE]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Image */}
          <div className="lg:col-span-5 relative h-[300px] md:h-[380px] w-full rounded-[24px] overflow-hidden shadow-lg border border-border-neutral bg-white">
            <Image
              src="/images/281.jpg"
              alt="Making Every Child's Dental Visit Comfortable & Fun"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B]">
              PEDIATRIC DENTISTRY
            </span>
            <h2 className="font-caudex font-bold text-2xl md:text-3xl lg:text-4xl text-primary leading-tight">
              Making Every Child&rsquo;s Dental Visit Comfortable &amp; Fun.
            </h2>
            <p className="font-instrument text-base md:text-lg text-text-dark leading-relaxed">
              At DDS Dental, we specialize in providing gentle, fear-free care that puts young patients at ease. Our team is dedicated to creating positive dental experiences, laying the foundation for a lifetime of healthy smiles in a warm, welcoming environment.
            </p>
          </div>
        </div>
      </section>

      {/* 4. GIF / Video Section */}
      <section className="py-12 bg-white flex justify-center border-t border-b border-border-neutral/30">
        <div className="max-w-4xl w-full px-6">
          <div className="relative aspect-video rounded-[24px] overflow-hidden shadow-lg border border-border-neutral bg-[#FFF8EE]">
            <Image
              src="/images/download_2.gif"
              alt="Animated Dental Treatment demonstration"
              fill
              className="object-cover object-center"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* 5. Our Pediatric Dental Services Section */}
      <section className="py-20 bg-[#FFF8EE]/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              TREATMENTS AVAILABLE
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              Our Pediatric Dental Services
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-border-neutral/30 shadow-sm flex flex-col justify-start hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="font-caudex font-bold text-lg text-primary mb-3">
                  {item.title}
                </h3>
                <p className="font-instrument text-sm text-text-dark/85 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Growing Smiles Through Every Stage Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#62826B]">
                DEVELOPMENT PHASES
              </span>
              <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
                Growing Smiles Through Every Stage.
              </h2>
              <p className="font-instrument text-sm md:text-base text-text-dark/80">
                We care for your child&rsquo;s dental needs at every stage of development.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {stages.map((stage, i) => (
                <div key={i} className="space-y-2.5">
                  <h4 className="font-caudex font-bold text-sm md:text-base text-primary">
                    {stage.title}
                  </h4>
                  <ul className="space-y-1">
                    {stage.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-text-dark/70 font-medium">
                        <span className="text-[#61826B]">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Collage */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-12 gap-4 relative">
              <div className="col-span-6 space-y-4">
                <div className="relative h-[150px] md:h-[180px] w-full rounded-[16px] overflow-hidden border border-border-neutral bg-white shadow-sm">
                  <Image
                    src="/images/2149206290.jpg"
                    alt="Child dental checkup"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[150px] md:h-[180px] w-full rounded-[16px] overflow-hidden border border-border-neutral bg-white shadow-sm">
                  <Image
                    src="/images/cute-kid-dentist.jpg"
                    alt="Dentist explaining care"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="col-span-6 relative h-[316px] md:h-[376px] w-full rounded-[16px] overflow-hidden border border-border-neutral bg-white shadow-sm">
                <Image
                  src="/images/close-up-boy-dentist.jpg"
                  alt="Dentist examining tooth"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <CTABanner />
      
    </div>
  );
}
