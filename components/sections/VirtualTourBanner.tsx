"use client";

import React from "react";

export default function VirtualTourBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505]">
      {/* Mobile view banner video */}
      <video
        src="/images/home_page_banner_video_mobile.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto md:hidden"
      />
      {/* Desktop/Tablet view banner video */}
      <video
        src="/images/home_page_banner_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto hidden md:block"
      />
    </section>
  );
}
