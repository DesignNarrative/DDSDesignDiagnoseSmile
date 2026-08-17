import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  className = "",
}: StarRatingProps) {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating
              ? "text-[#62826B] fill-[#62826B]"
              : "text-border-neutral"
          }`}
        />
      ))}
    </div>
  );
}
