"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function VirtualTourBanner() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "480px" }}>
      {/* Background/Video player using the Virtual tour video GIF */}
      <div className="absolute inset-0 w-full h-full bg-[#050505]">
        {isPlaying ? (
          <Image
            src="/images/home_page_video.gif"
            alt="DDS Dental Clinic Virtual Tour Animation"
            fill
            unoptimized
            className="object-cover object-center"
            priority
          />
        ) : (
          <Image
            src="/images/hero_banner.jpeg"
            alt="DDS Dental Clinic Virtual Tour Placeholder"
            fill
            className="object-cover object-center opacity-80"
          />
        )}
      </div>

      {/* Gradient overlay — darker at bottom for overlay text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/45 to-primary/20" />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10">

        {/* Play / Pause button */}
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause virtual tour" : "Play virtual tour"}
          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center shadow-2xl hover:bg-white/30 transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-9 h-9 text-white fill-white" />
          ) : (
            <Play className="w-9 h-9 text-white fill-white ml-1" />
          )}
        </motion.button>

        {/* Action Link */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="font-instrument font-bold text-white text-lg tracking-wide hover:text-cream transition-colors underline underline-offset-4"
          >
            Take a Virtual Tour →
          </Link>
          <p className="text-xs text-cream/70 font-instrument mt-2">
            {isPlaying ? "Click pause to freeze virtual tour preview" : "Click play to preview our state-of-the-art clinic"}
          </p>
        </div>

      </div>
    </section>
  );
}
