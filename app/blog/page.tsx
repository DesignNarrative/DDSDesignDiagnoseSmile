"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Clock, Mail, CalendarDays, ArrowRight } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";
import { blogPosts } from "@/lib/data/siteData";

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(3);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[600px] md:min-h-[750px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog_banner_73696.jpg"
            alt="DDS Blog Banner"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle light overlay to make text pop while keeping the banner image bright and clear */}
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
              DENTAL WELLNESS
            </span>
            <h1 className="font-caudex font-bold text-4xl sm:text-5xl md:text-6xl text-[#380920] leading-tight">
              Blogs
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-[#380920]/95 font-semibold">
              Your trusted resource for dental wellness, smile transformations, <br className="hidden md:inline" />
              and everyday oral care guidance.
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

      {/* ── 3. Blog Grid Section (Entire Card Clickable) ── */}
      <section className="py-20 bg-[#FFF8EE]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, visibleCount).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[24px] border border-border-neutral/30 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:border-primary/10 transition-all duration-300 group"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full flex-grow">
                  
                  {/* Blog Image */}
                  <div className="relative h-[220px] w-full overflow-hidden bg-card-bg flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>

                  {/* Blog Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="flex flex-col space-y-3">
                      {/* Date */}
                      <div className="flex items-center space-x-2 text-text-dark/50 font-instrument text-xs">
                        <CalendarDays className="w-4 h-4 text-[#62826B]" />
                        <span>Posted on: {post.date}</span>
                      </div>
                      {/* Title */}
                      <h2 className="font-caudex font-bold text-lg text-primary leading-tight group-hover:text-[#62826B] transition-colors">
                        {post.title}
                      </h2>
                      {/* Excerpt */}
                      <p className="font-instrument text-sm text-text-dark/80 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Read More Link (Inline decoration matches overall layout) */}
                    <div className="inline-flex items-center space-x-2 font-instrument font-bold text-sm text-[#62826B] group-hover:text-primary transition-colors pt-2">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < blogPosts.length && (
            <div className="text-center pt-12">
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="font-instrument text-xs font-bold border border-[#380920] text-[#380920] hover:bg-[#380920] hover:text-white px-8 py-2.5 rounded-[12px] transition-all duration-300 hover:scale-[1.02]"
              >
                Load More...
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. CTA Section ── */}
      <CTABanner />

    </div>
  );
}
