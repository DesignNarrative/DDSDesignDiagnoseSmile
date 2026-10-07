"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Technology", href: "/#technology" },
    { name: "Awards", href: "/awards" },
    { name: "Dental Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const treatments = [
    { name: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
    { name: "Orthodontics", href: "/services/orthodontics" },
    { name: "Invisalign", href: "/services/invisalign" },
    { name: "Dental Implants", href: "/services/dental-implants" },
    { name: "Root Canal Treatment", href: "/services/micro-endodontics" },
    { name: "Oral Surgery", href: "/services/oral-surgery" },
    { name: "General & Family Dentistry", href: "/services/general-dentistry" },
    { name: "Pediatric Dentistry", href: "/services/pediatric-dentistry" },
    { name: "Periodontics", href: "/services/gum-aesthetic-gum-care" },
    { name: "Additional Specialized Care", href: "/services/additional-specialized-care" },
  ];

  const socials = [
    { icon: "/images/call_icon.svg", href: "tel:+919673004407", label: "Phone" },
    { icon: "/images/email_icon.svg", href: "mailto:dr.pritimunde@gmail.com", label: "Email" },
    {
      icon: "/images/instagram.svg",
      href: "https://www.instagram.com/digitaldentistryspecialist?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw%3D%3D",
      label: "Instagram",
      isExternal: true
    },
    {
      icon: "/images/facebook.svg",
      href: "https://www.facebook.com/DentsspaFirstDentalSpa?rdid=241gIA66RAqPIDGA&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Dp7947ZLu%2F#",
      label: "Facebook",
      isExternal: true
    },
    {
      icon: "/images/Practo.png",
      href: "https://www.practo.com/pune/clinic/dentsspa-shivaji-nagar#reviews",
      label: "Practo",
      isExternal: true
    },
  ];

  return (
    <footer className="bg-[#380920] text-white border-t border-primary/20">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/DDS_logo_whiteeeee.png"
              alt="DDS Dental Clinic Logo"
              width={160}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
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
              <span>First Floor, Eden Hall, Model Colony, Shivajinagar, Pune – 411016</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-cream flex-shrink-0" />
              <a href="tel:+919673004407" className="hover:text-cream transition-colors">+91 - 96730 04407</a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-cream flex-shrink-0" />
              <a href="mailto:dr.pritimunde@gmail.com" className="hover:text-cream transition-colors">dr.pritimunde@gmail.com</a>
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
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center md:justify-end gap-6">
        {/* Custom Social Media Icons */}
        <div className="flex items-center space-x-4 flex-wrap gap-y-2">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
