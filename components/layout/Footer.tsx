"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Technology", href: "/#technology" },
    { name: "Happy Clients", href: "/#clients" },
    { name: "Awards", href: "/about#achievements" },
    { name: "Dental Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const treatments = [
    { name: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
    { name: "Orthodontics", href: "/services/orthodontics" },
    { name: "Invisalign", href: "/services/invisalign" },
    { name: "Dental Implants", href: "/services/dental-implants" },
    { name: "Micro-Endodontics", href: "/services/micro-endodontics" },
    { name: "General & Family Dentistry", href: "/services/general-dentistry" },
    { name: "Pediatric Dentistry", href: "/services/pediatric-dentistry" },
    { name: "Gum & Aesthetic Gum Care", href: "/services/gum-aesthetic-gum-care" },
    { name: "Additional Specialized Care", href: "/services/additional-specialized-care" },
  ];

  const socials = [
    { icon: "/images/call_icon.svg", href: "tel:+919673004407", label: "Phone" },
    { icon: "/images/email_icon.svg", href: "mailto:consult@dentsspa.com", label: "Email" },
    { icon: "/images/facebook.svg", href: "#", label: "Facebook" },
    { icon: "/images/linkedin.svg", href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#380920] text-white border-t border-primary/20">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand & Tagline */}
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/dds_final_logo_white.png"
              alt="DDS Dental Clinic Logo"
              width={140}
              height={45}
              className="object-contain"
              priority
            />
          </Link>
          <p className="font-alex text-4xl text-cream-light mt-2 tracking-wide leading-none">
            Diagnose. Design. Smile
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-caudex font-bold text-lg mb-6 tracking-wide text-cream border-b border-white/10 pb-2">
            Quick Links
          </h3>
          <ul className="flex flex-col space-y-3 font-instrument text-sm text-text-light">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-cream transition-colors block py-0.5">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Treatments */}
        <div>
          <h3 className="font-caudex font-bold text-lg mb-6 tracking-wide text-cream border-b border-white/10 pb-2">
            Our Treatments
          </h3>
          <ul className="flex flex-col space-y-3 font-instrument text-sm text-text-light">
            {treatments.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-cream transition-colors block py-0.5">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-caudex font-bold text-lg mb-6 tracking-wide text-cream border-b border-white/10 pb-2">
            Contact
          </h3>
          <ul className="flex flex-col space-y-4 font-instrument text-sm text-text-light">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-cream flex-shrink-0 mt-0.5" />
              <span>101, 102 Eden Hall, Opp. Om Super Market, Model Colony, Shivajinagar, Pune – 411016</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-cream flex-shrink-0" />
              <a href="tel:+919673004407" className="hover:text-cream transition-colors">+91 - 96730 04407</a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-cream flex-shrink-0" />
              <a href="mailto:consult@dentsspa.com" className="hover:text-cream transition-colors">consult@dentsspa.com</a>
            </li>
            <li className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-cream flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-cream">Clinic Timings:</p>
                <p>Mon–Sat: 10 AM–7 PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Bottom Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-instrument text-xs text-text-light order-2 md:order-1">
          Copyright © 2026 DDS Dental Clinic | All Rights Reserved.
        </p>

        {/* Custom Social Media Icons (call_icon, email_icon, facebook, linkedin) */}
        <div className="flex items-center space-x-4 order-1 md:order-2">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.href}
              className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200"
              aria-label={social.label}
            >
              <div className="relative w-5 h-5">
                <Image
                  src={social.icon}
                  alt={social.label}
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
