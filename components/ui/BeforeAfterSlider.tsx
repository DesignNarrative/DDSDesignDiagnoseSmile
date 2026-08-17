"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  altText: string;
}

export default function BeforeAfterSlider({ beforeSrc, afterSrc, altText }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden select-none touch-none shadow-md border border-border-neutral bg-[#FFF8EE]"
    >
      {/* Before Layer (Left side) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeSrc}
          alt={`${altText} - Before`}
          fill
          className="object-cover"
          draggable={false}
          sizes="(max-width: 768px) 100vw, 45vw"
        />
        {/* Label Before */}
        <span className="absolute left-4 top-4 bg-[#380920]/80 text-[#FFF8EE] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase z-10">
          Before
        </span>
      </div>

      {/* After Layer (Right side) - clipped dynamically */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
        }}
      >
        <Image
          src={afterSrc}
          alt={`${altText} - After`}
          fill
          className="object-cover"
          draggable={false}
          sizes="(max-width: 768px) 100vw, 45vw"
        />
        {/* Label After */}
        <span className="absolute right-4 top-4 bg-[#62826B]/90 text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase z-10">
          After
        </span>
      </div>

      {/* Slider Control Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#380920] shadow-xl flex items-center justify-center border-2 border-[#380920] hover:scale-105 active:scale-95 transition-transform">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M8 9l-4 4 4 4m8 0l4-4-4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
