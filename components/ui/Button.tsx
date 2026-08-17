import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "white";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-instrument text-sm font-semibold px-6 py-3 rounded-[11px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-deep shadow-sm",
    outline: "border border-primary text-primary hover:bg-cream-light",
    white: "bg-white text-primary hover:bg-cream-light shadow-sm",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
