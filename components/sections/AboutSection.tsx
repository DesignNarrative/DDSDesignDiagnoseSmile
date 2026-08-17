"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";
import { Check, Shield, User, Award } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const corePillars = [
    {
      icon: <User className="w-6 h-6 text-primary" />,
      title: "Personalized treatment plans",
      desc: "Every patient receives a unique care roadmap designed for their distinct health goals.",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Gentle care for young adults",
      desc: "Compassionate approach specialized for creating comfortable, stress-free clinical visits.",
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "State-of-the-Art Technology",
      desc: "Equipped with advanced diagnostic and surgical tools for pain-free treatment.",
    },
  ];

  return (
    <section ref={ref} id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Image and Badges */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 relative h-[450px] md:h-[550px] w-full"
        >
          {/* Main Showcase Image (Figma carousel_1) */}
          <div className="relative w-[90%] h-[90%] rounded-[30px] overflow-hidden shadow-xl">
            <Image
              src="/images/carousel_1.png"
              alt="Sophisticated dental clinic entrance and lounge"
              fill
              className="object-cover"
            />
          </div>

          {/* Floater Experience Badge */}
          <div className="absolute bottom-0 right-0 md:right-4 bg-primary text-white p-6 rounded-[24px] shadow-2xl flex flex-col items-center justify-center text-center w-40 h-40 border-4 border-white">
            <span className="font-caudex font-bold text-4xl text-cream">15+</span>
            <span className="font-instrument text-xs font-semibold uppercase tracking-wider mt-1">
              Years of Glory
            </span>
          </div>
        </motion.div>

        {/* Right Column: Text & Features */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-6 flex flex-col space-y-8"
        >
          <div className="flex flex-col space-y-4">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
              WHO WE ARE
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
              About DDS Dental Clinic
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>

          <p className="font-instrument text-base md:text-lg text-text-dark leading-relaxed">
            We offer high-quality dental care tailored for the whole family. From routine checkups
            to advanced treatments, our compassionate team ensures your smile stays healthy and
            confident. We merge clinical excellence with a soothing dental spa environment.
          </p>

          {/* Pillars List */}
          <div className="flex flex-col space-y-6">
            {corePillars.map((pillar, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="bg-cream-light p-3 rounded-xl flex-shrink-0">
                  {pillar.icon}
                </div>
                <div>
                  <h4 className="font-instrument font-bold text-base text-primary mb-1">
                    {pillar.title}
                  </h4>
                  <p className="font-instrument text-sm text-text-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button href="/about" variant="primary">
              Read Our Full Story
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
