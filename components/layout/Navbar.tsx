"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setIsServicesOpen(false);
    setIsTechOpen(false);
  }, [pathname]);

  const servicesDropdown = [
    { name: "General Dentistry", href: "/services/general-dentistry" },
    { name: "Micro-Endodontics", href: "/services/micro-endodontics" },
    { name: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
    { name: "Orthodontics", href: "/services/orthodontics" },
    { name: "Invisalign", href: "/services/invisalign" },
    { name: "Dental Implants Treatment", href: "/services/dental-implants" },
    { name: "Pediatric Dentistry", href: "/services/pediatric-dentistry" },
    { name: "Gum & Aesthetic Gum Care", href: "/services/gum-aesthetic-gum-care" },
    { name: "Additional Specialized Care", href: "/services/additional-specialized-care" },
  ];

  const navLinks = [
    { name: "ABOUT", href: "/about" },
    { name: "TREATMENTS", href: "/services", dropdown: servicesDropdown },
    { name: "TECHNOLOGY", href: "/technology" },
    { name: "GALLERY", href: "/gallery" },
    { name: "ACHIEVEMENTS", href: "/achievements" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#380920] shadow-md py-4`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/dds_final_logo_white.png"
            alt="DDS Dental Clinic Logo"
            width={160}
            height={50}
            className="object-contain h-10 w-auto"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            if (link.dropdown) {
              const isService = link.name === "TREATMENTS";
              const isOpenDropdown = isService ? isServicesOpen : isTechOpen;
              const setOpenDropdown = isService ? setIsServicesOpen : setIsTechOpen;

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(true)}
                  onMouseLeave={() => setOpenDropdown(false)}
                >
                  <Link 
                    href={link.href}
                    className="flex items-center space-x-1 font-montserrat font-semibold text-sm text-white hover:text-cream transition-colors py-2"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  </Link>

                  <AnimatePresence>
                    {isOpenDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl py-2 border border-border-neutral"
                      >
                        {link.dropdown.map((subItem) => {
                          const item = subItem as { name: string; href: string; subItems?: { name: string; href: string }[] };
                          if (item.subItems) {
                            return (
                              <div
                                key={item.name}
                                className="relative group/sub px-4 py-2 text-sm font-instrument text-text-dark hover:bg-cream-light hover:text-primary transition-colors flex items-center justify-between cursor-pointer"
                              >
                                <span>{item.name}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
                                <div className="absolute left-full top-0 ml-1 hidden group-hover/sub:block w-56 bg-white rounded-xl shadow-xl py-2 border border-border-neutral">
                                  {item.subItems.map((child) => (
                                    <Link
                                      key={child.name}
                                      href={child.href}
                                      className="block px-4 py-2 text-sm font-instrument text-text-dark hover:bg-cream-light hover:text-primary transition-colors"
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm font-instrument text-text-dark hover:bg-cream-light hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-montserrat font-semibold text-sm hover:text-cream transition-colors py-2 ${
                  isActive ? "text-cream border-b-2 border-cream" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA BUTTON - OUTLINED IN WHITE */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/book"
            className="border-2 border-white text-white hover:bg-white hover:text-[#380920] font-instrument text-sm font-semibold px-6 py-2.5 rounded-[11px] transition-all duration-200 hover:scale-[1.02]"
          >
            Book an Appointment
          </Link>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2 hover:text-cream transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#380920] border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  const isService = link.name === "TREATMENTS";
                  const isDropOpen = isService ? isServicesOpen : isTechOpen;
                  const setDropOpen = isService ? setIsServicesOpen : setIsTechOpen;

                  return (
                    <div key={link.name} className="flex flex-col space-y-2">
                      <button
                        onClick={() => setDropOpen(!isDropOpen)}
                        className="flex items-center justify-between font-montserrat font-semibold text-sm text-white py-2"
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isDropOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isDropOpen && (
                        <div className="pl-4 flex flex-col space-y-2 border-l border-white/20">
                           {link.dropdown.map((subItem) => {
                             const item = subItem as { name: string; href: string; subItems?: { name: string; href: string }[] };
                             if (item.subItems) {
                               return (
                                 <div key={item.name} className="flex flex-col space-y-1 w-full text-left">
                                   <span className="text-xs font-montserrat font-bold text-white/50 px-1 py-1 uppercase tracking-wider text-left">
                                     {item.name}
                                   </span>
                                   <div className="pl-3 flex flex-col space-y-1 border-l border-white/10">
                                     {item.subItems.map((child) => (
                                       <Link
                                         key={child.name}
                                         href={child.href}
                                         className="text-sm font-instrument text-cream/80 hover:text-white py-1 block text-left"
                                       >
                                         {child.name}
                                       </Link>
                                     ))}
                                   </div>
                                 </div>
                               );
                             }

                             return (
                               <Link
                                 key={item.name}
                                 href={item.href}
                                 className="text-sm font-instrument text-cream/80 hover:text-white py-1 block text-left"
                               >
                                 {item.name}
                               </Link>
                             );
                           })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-montserrat font-semibold text-sm text-white hover:text-cream py-2"
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/book"
                className="border-2 border-white text-white hover:bg-white hover:text-[#380920] font-instrument text-sm font-semibold px-6 py-3 rounded-[11px] text-center transition-all duration-200"
              >
                Book an Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
