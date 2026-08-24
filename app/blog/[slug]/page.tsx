"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CTABanner from "@/components/sections/CTABanner";
import { useParams } from "next/navigation";
import { blogPosts } from "@/lib/data/siteData";
import { Loader2, ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch("/api/seo")
      .then((res) => res.json())
      .then((data) => {
        const dbBlogs = data.blogs || [];
        let matched = dbBlogs.find((b: any) => b.slug === slug);
        if (matched && matched.status === "draft") {
          matched = null;
        }
        if (!matched) {
          matched = blogPosts.find((b: any) => b.slug === slug);
        }
        setPost(matched);
        setLoading(false);
      })
      .catch(() => {
        const matched = blogPosts.find((b: any) => b.slug === slug);
        setPost(matched);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8EE]/20">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="font-instrument text-sm text-text-muted">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8EE]/20 px-6 text-center">
        <h1 className="font-caudex font-bold text-3xl text-primary mb-4">Article Not Found</h1>
        <p className="font-instrument text-text-dark/80 max-w-md mb-8">
          The blog post you are looking for does not exist or has been unpublished by the administrator.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-xl transition-all font-instrument text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  const renderContent = () => {
    if (!post.content) return null;
    const paragraphs = Array.isArray(post.content)
      ? post.content
      : post.content.split("\n").filter(Boolean);

    return paragraphs.map((para: string, idx: number) => (
      <p key={idx} className="font-instrument text-base md:text-lg text-text-dark/95 leading-relaxed">
        {para}
      </p>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[70vh] md:h-[80vh] min-h-[450px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image || "/images/blog_banner_73696.jpg"}
            alt={post.title}
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for white text readability */}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-start justify-center space-y-4 max-w-4xl"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider mb-2 font-instrument"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blogs
            </Link>
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-white/90">
              BLOG ARTICLE
            </span>
            <h1 className="font-caudex font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center space-x-2 text-white/80 font-instrument text-sm pt-2">
              <CalendarDays className="w-4 h-4 text-cream" />
              <span>Published on: {post.date}</span>
              {post.author && (
                <>
                  <span className="text-white/40">•</span>
                  <span>By {post.author}</span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Article Content Section ── */}
      <section className="py-16 md:py-24 bg-[#FFF8EE]/20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-border-neutral/30 rounded-3xl p-8 md:p-12 shadow-sm space-y-8"
          >
            {/* Excerpt Summary */}
            {post.excerpt && (
              <p className="font-instrument text-base md:text-lg text-text-dark/95 leading-relaxed font-semibold border-l-4 border-[#62826B] pl-4 italic">
                {post.excerpt}
              </p>
            )}

            {/* Dynamic content paragraphs */}
            <div className="space-y-6 pt-2">
              {renderContent()}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── 3. CTA Section ── */}
      <CTABanner />

    </div>
  );
}
