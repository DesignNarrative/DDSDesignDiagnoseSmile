"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";

interface SmallBookingCTAProps {
  className?: string;
}

export default function SmallBookingCTA({ className = "" }: SmallBookingCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className={`py-8 bg-transparent w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-primary text-white py-5 px-8 md:px-12 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-white/5"
        >
          <div className="flex flex-col text-left space-y-1">
            <h3 className="font-caudex font-bold text-lg md:text-xl text-cream">
              Ready to Book Your Appointment?
            </h3>
            <p className="font-instrument text-xs md:text-sm text-cream-light/90 max-w-2xl leading-normal">
              Contact us today to schedule your visit and take the first step toward a healthier, more radiant smile.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button href="/book" variant="white" className="!py-2 !px-5 text-sm">
              Book Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
