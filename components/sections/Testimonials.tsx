"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star, ThumbsUp, Share2, MoreVertical, Play } from "lucide-react";

interface GoogleReview {
  id: string;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  subtitle: string;
  rating: number;
  date: string;
  text: string;
  likes: number;
  link: string;
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reviewScrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const toggleReview = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const instagramReels = [
    {
      url: "https://www.instagram.com/reel/DZG11iEKD1t/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      thumbnail: "/images/untitled_design_1_first_frame.jpg",
      isGif: true,
      alt: "Invisalign Treatment reel"
    },
    {
      url: "https://www.instagram.com/reel/Cw7qKzXSUe0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      thumbnail: "/images/untitled_design_2_first_frame.jpg",
      isGif: true,
      alt: "Dental Care Treatment reel"
    },
    {
      url: "https://www.instagram.com/reel/DY6U-RJqb5v/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      videoSrc: "/images/snapinsta_patient.mp4",
      isGif: false,
      alt: "Our happy patient reel"
    }
  ];

  const googleReviews: GoogleReview[] = [
    {
      id: "r1",
      name: "ketan thakare",
      avatarLetter: "K",
      avatarBg: "bg-[#e67e22]",
      subtitle: "Local Guide",
      rating: 5,
      date: "2 months ago",
      text: "I was suffering from dental pain and was referred to Dr. Priti by one of my dentist friends. From the moment I visited Dentsspa Dental Studio, I had a very pleasant experience. The clinic is clean, modern, and well equipped, and the staff was very courteous and welcoming.\nDr. Priti carefully examined my problem and performed the procedure so smoothly that I didn't feel any pain or discomfort. She is very caring and constantly checked on me throughout the treatment to make sure I was comfortable and at ease. Thanks to her expertise and compassionate approach, I am completely relieved from the pain and feeling much better now.\nHighly recommend Dr. Priti and Dentsspa Dental Studio for quality and painless dental treatment.",
      likes: 1,
      link: "https://maps.app.goo.gl/EbogRMPsYmUJbJix6"
    },
    {
      id: "r2",
      name: "Shaina Ali",
      avatarLetter: "S",
      avatarBg: "bg-[#9b59b6]",
      subtitle: "Local Guide",
      rating: 5,
      date: "3 months ago",
      text: "I got my dental implant done at Dentsspa Dental Studio and the result looks and feels completely natural. The procedure was smooth, with minimal discomfort, and Dr. Priti explained every step clearly. The clinic is clean, modern, and very professional. I feel confident smiling again and highly recommend their implant services.",
      likes: 2,
      link: "https://maps.app.goo.gl/mun4ktY9KjstK8D59"
    },
    {
      id: "r3",
      name: "Harshada Todkar",
      avatarLetter: "H",
      avatarBg: "bg-[#2ecc71]",
      subtitle: "Local Guide",
      rating: 5,
      date: "3 months ago",
      text: "I had an excellent experience with Dr.Priti . The service was truly fantastic — professional, thorough, and incredibly reassuring throughout the visit. The procedure was explained clearly, and I felt completely at ease from start to finish. The clinic is well-maintained, the staff is courteous, and the overall experience exceeded my expectations. Highly recommend for anyone looking for expert and compassionate dental care.",
      likes: 1,
      link: "https://maps.app.goo.gl/yHWoY1tkoZ4ZNmj4A"
    },
    {
      id: "r4",
      name: "Dnyanoba Chitte",
      avatarLetter: "D",
      avatarBg: "bg-[#34495e]",
      subtitle: "Local Guide",
      rating: 5,
      date: "3 months ago",
      text: "I have been visiting Dr. Priti for a while now, and she has taken great care of my teeth and gums. From routine check‑ups to small procedures, everything has been smooth, professional, and painless. I can clearly see the improvement in my oral health.",
      likes: 3,
      link: "https://maps.app.goo.gl/GYgjDEPcoWWsyAyj8"
    },
    {
      id: "r5",
      name: "Harshali",
      avatarLetter: "H",
      avatarBg: "bg-[#1abc9c]",
      subtitle: "Patient",
      rating: 5,
      date: "3 months ago",
      text: "I opted for a full oral checkup and cleaning package at Dentsspa Dental Studio and it was a very comfortable experience. The dentist checked each tooth carefully, explained my oral health in simple terms, and the cleaning was gentle and effective. The whole team is polite and professional. A perfect place for regular dental checkups",
      likes: 2,
      link: "https://maps.app.goo.gl/gqxqodviTCf8BzGo9"
    },
    {
      id: "r6",
      name: "Ashwini Kalel",
      avatarLetter: "A",
      avatarBg: "bg-[#f1c40f]",
      subtitle: "Local Guide",
      rating: 5,
      date: "2 months ago",
      text: "After my treatment with Dr. Priti, the healing was smooth and faster than I expected. She gave clear post‑treatment instructions and followed up to check if everything was okay. I am very satisfied with the recovery and overall experience.",
      likes: 1,
      link: "https://maps.app.goo.gl/JWp4DpbHYf2MuFhN9"
    },
    {
      id: "r7",
      name: "Nikhil Atpadkar",
      avatarLetter: "N",
      avatarBg: "bg-[#e74c3c]",
      subtitle: "Local Guide",
      rating: 5,
      date: "3 months ago",
      text: "Excellent experience at DDS Dentsspa Dental Studio! The staff was friendly, professional, and made me feel comfortable throughout the visit. The clinic is clean, modern, and the treatment was handled with great care. Highly recommended for anyone looking for quality dental care!",
      likes: 4,
      link: "https://maps.app.goo.gl/Sx2SvZq6HyYEzv5N8"
    },
    {
      id: "r8",
      name: "Manisha Chitte",
      avatarLetter: "M",
      avatarBg: "bg-[#3498db]",
      subtitle: "Patient",
      rating: 5,
      date: "3 months ago",
      text: "Dr. Priti is very gentle and patient, which made my dental visit much less stressful. She took time to understand my problems and gave me honest advice instead of unnecessary treatments. I feel completely confident visiting her for any dental issue.",
      likes: 2,
      link: "https://maps.app.goo.gl/2BayixbXPmCeGCPd8"
    }
  ];

  const handleReviewScroll = () => {
    if (reviewScrollRef.current) {
      const scrollLeft = reviewScrollRef.current.scrollLeft;
      const children = Array.from(reviewScrollRef.current.children) as HTMLElement[];
      let closestIndex = 0;
      let minDiff = Infinity;
      children.forEach((child, idx) => {
        const diff = Math.abs(child.offsetLeft - 24 - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = idx;
        }
      });
      setActiveDot(closestIndex);
    }
  };

  const scrollToReview = (idx: number) => {
    if (reviewScrollRef.current) {
      const children = Array.from(reviewScrollRef.current.children) as HTMLElement[];
      const card = children[idx];
      if (card) {
        reviewScrollRef.current.scrollTo({
          left: card.offsetLeft - 24,
          behavior: "smooth"
        });
        setActiveDot(idx);
      }
    }
  };

  return (
    <section ref={ref} id="clients" className="py-16 md:py-24 bg-[#FFF8EE]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center space-y-4">
          <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
            TESTIMONIALS
          </span>
          <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
            What our Patients Says
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full"></div>
        </div>

        {/* Video & GIF Cards - Clicking opens Instagram reels in a new tab */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 justify-start lg:grid lg:grid-cols-3 lg:overflow-visible">
          {instagramReels.map((reel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="snap-center flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto aspect-[9/16] relative rounded-[24px] overflow-hidden shadow-lg border border-border-neutral bg-black group"
            >
              <a href={reel.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                {reel.isGif ? (
                  <Image
                    src={reel.thumbnail || ""}
                    alt={reel.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={reel.videoSrc}
                    preload="metadata"
                    className="w-full h-full object-cover rounded-[24px]"
                  />
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-opacity duration-300 hover:bg-black/25">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-lg">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  
                  {/* Yellow Patient Text Overlay for Reel 3 */}
                  {!reel.isGif && (
                    <span className="absolute top-6 left-6 font-caudex font-bold text-lg text-[#f2a900] drop-shadow-md">
                      Our happy patient
                    </span>
                  )}
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Google Rating Image */}
        <div className="flex justify-center mt-16 mb-8">
          <div className="relative w-[280px] h-[55px]">
            <Image
              src="/images/Group 70.png"
              alt="Google Rating 5.0 Stars"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Google Reviews Carousel - Clicking opens specific review map link */}
        <div className="relative max-w-5xl mx-auto">
          <div
            ref={reviewScrollRef}
            onScroll={handleReviewScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 justify-start"
            style={{ scrollbarWidth: "none" }}
          >
            {googleReviews.map((review) => (
              <a
                key={review.id}
                href={review.link}
                target="_blank"
                rel="noopener noreferrer"
                className="snap-center flex-shrink-0 w-full md:w-[calc(50%-12px)] bg-white rounded-[16px] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${review.avatarBg}`}>
                        {review.avatarLetter}
                      </div>
                      
                      {/* Name & Subtitle */}
                      <div className="flex flex-col">
                        <h4 className="font-instrument font-bold text-sm text-primary leading-tight group-hover:text-primary-deep transition-colors capitalize">
                          {review.name}
                        </h4>
                        <span className="font-instrument text-[11px] text-text-muted">
                          {review.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Right side: 3 dots */}
                    <div className="text-text-muted">
                      <MoreVertical className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Stars & Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#f2a900] text-[#f2a900]" />
                      ))}
                    </div>
                    <span className="font-instrument text-[11px] text-text-muted">
                      {review.date}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="font-instrument text-sm text-text-dark leading-relaxed pr-2 whitespace-pre-line">
                    {(() => {
                      const isExpanded = expandedReviews[review.id];
                      const threshold = 110;
                      if (review.text.length <= threshold || isExpanded) {
                        return (
                          <>
                            {review.text}
                            {review.text.length > threshold && (
                              <button
                                onClick={(e) => toggleReview(review.id, e)}
                                className="text-[#380920] hover:underline font-semibold ml-1.5 focus:outline-none"
                              >
                                Show less
                              </button>
                            )}
                          </>
                        );
                      }
                      
                      const truncatedText = review.text.slice(0, threshold) + "...";
                      return (
                        <>
                          {truncatedText}
                          <button
                            onClick={(e) => toggleReview(review.id, e)}
                            className="text-[#f2a900] hover:underline font-semibold ml-1.5 focus:outline-none"
                          >
                            +more
                          </button>
                        </>
                      );
                    })()}
                  </p>
                </div>

                {/* Footer Interaction */}
                <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-50 text-text-muted text-xs">
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{review.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Navigation Dots - 8 dots mapped to 8 reviews */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {googleReviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToReview(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  activeDot === idx
                    ? "bg-[#380920] scale-110"
                    : "bg-[#380920]/20 hover:bg-[#380920]/40"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
