"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Clock, Mail, CalendarDays, ArrowRight, Loader2 } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";
import ContactInfoBar from "@/components/sections/ContactInfoBar";
import { blogPosts } from "@/lib/data/siteData";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetch("/api/seo")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && data.blogs.length > 0) {
          const activeBlogs = data.blogs.filter((b: any) => b.status !== "draft");
          setBlogs(activeBlogs);
        } else {
          setBlogs(blogPosts);
        }
        setLoading(false);
      })
      .catch(() => {
        setBlogs(blogPosts);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-[85vh] min-h-[250px] sm:min-h-[450px] md:min-h-[600px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner 15.jpg"
            alt="DDS Blog Banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* ── 2. Contact Info Bar ── */}
      <ContactInfoBar />

      {/* ── 3. Blog Grid Section (Entire Card Clickable) ── */}
      <section className="py-20 bg-[#FFF8EE]/30">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.slice(0, visibleCount).map((post, i) => (
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
              {visibleCount < blogs.length && (
                <div className="text-center pt-12">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="font-instrument text-xs font-bold border border-[#380920] text-[#380920] hover:bg-[#380920] hover:text-white px-8 py-2.5 rounded-[12px] transition-all duration-300 hover:scale-[1.02]"
                  >
                    Load More...
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── 4. CTA Section ── */}
      <CTABanner />

    </div>
  );
}
