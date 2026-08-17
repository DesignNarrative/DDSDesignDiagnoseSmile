"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";

export default function BookingCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-[32px] p-10 md:p-20 text-center text-white shadow-2xl overflow-hidden flex flex-col items-center justify-center space-y-8 border border-white/10"
          style={{
            background: "linear-gradient(135deg, #411928 0%, #380920 50%, #1e020e 100%)"
          }}
        >
          {/* Subtle elegant glassmorphism glow effect */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-cream/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#62826B]/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

          {/* Premium wireframe grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-60"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] [background-size:64px_64px]"></div>

          <div className="flex flex-col space-y-4 max-w-2xl relative z-10">
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-[#FFF8EE]/70 bg-white/10 px-4 py-1.5 rounded-full self-center backdrop-blur-sm">
              YOUR SMILE JOURNEY STARTS HERE
            </span>
            <h2 className="font-caudex font-bold text-3xl md:text-5xl lg:text-6xl text-cream leading-tight">
              Ready to Book Your Appointment?
            </h2>
          </div>

          <p className="font-instrument text-base md:text-lg lg:text-xl text-cream-light max-w-xl leading-relaxed relative z-10">
            Contact us today to schedule your visit and take the first step toward a healthier, more radiant smile.
          </p>

          <div className="pt-4 relative z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Button href="/book" variant="white" className="shadow-[0_8px_30px_rgb(253,238,217,0.2)]">
                Book Consultation
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
