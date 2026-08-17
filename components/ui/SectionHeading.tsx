import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl mb-12 flex flex-col space-y-4 ${
        align === "center" ? "mx-auto text-center items-center" : "text-left items-start"
      } ${className}`}
    >
      {subtitle && (
        <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
          {subtitle}
        </span>
      )}
      <h2 className="font-caudex font-bold text-3xl md:text-4xl text-primary leading-tight">
        {title}
      </h2>
      <div className="w-16 h-1 bg-primary rounded-full"></div>
    </div>
  );
}
