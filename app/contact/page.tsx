"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone, Mail, Send } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).trim(),
  email: z.string().email({ message: "Please enter a valid email address." }).trim(),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).trim(),
  message: z.string().min(5, { message: "Message must be at least 5 characters." }).trim(),
});

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear field-specific error as user types
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formState);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const messageText = `Hello DDS Dental Clinic, I would like to get in touch. Here are my details:
Name: ${formState.name}
Email: ${formState.email}
Phone: ${formState.phone}
Message: ${formState.message}`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919673004407?text=${encodedText}`;

    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── 1. Header Banner Section ── */}
      <section className="relative w-full h-[55vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] min-h-[350px] sm:min-h-[500px] md:min-h-[650px] overflow-hidden flex items-center bg-[#FFF8EE]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Mobile view banner */}
          <Image
            src="/images/M13.jpg"
            alt="Contact DDS Dental Clinic"
            fill
            className="object-cover object-center md:hidden"
            priority
          />
          {/* Desktop/Tablet view banner */}
          <Image
            src="/images/contact_banner_27659.jpg"
            alt="Contact DDS Dental Clinic"
            fill
            className="object-cover object-center scale-x-[-1] hidden md:block"
            priority
          />
          {/* Dark overlay for white text readability */}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex flex-col items-center md:items-start justify-center space-y-4 max-w-3xl"
          >
            <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-white/80">
              GET IN TOUCH
            </span>
            <h1 className="font-caudex font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
              Contact
            </h1>
            <p className="font-instrument text-base sm:text-lg md:text-xl text-white/95 font-semibold">
              Fill out the form below and we will contact you during our working.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Info & Form Section ── */}
      <section className="py-20 bg-[#FFF8EE] border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Info & Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-caudex font-bold text-2xl md:text-3xl text-primary leading-tight">
                We are always ready to help <br />you and answer your questions.
              </h2>
              <p className="font-instrument text-sm text-text-dark/85 leading-relaxed">
                Whether you have a question, a suggestion, or just want to say hello, this is the place to do it. Please fill out the form below with your details and message, and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Icons Grid (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              
              {/* Card 1: We're Open */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#62826B]/15 text-[#62826B] p-3 rounded-full flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-caudex font-bold text-base text-primary">We're Open</h4>
                  <p className="font-instrument text-xs text-text-dark/85">
                    Monday - Saturday 11am - 8 pm
                  </p>
                </div>
              </div>

              {/* Card 2: Clinic Location */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#62826B]/15 text-[#62826B] p-3 rounded-full flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-caudex font-bold text-base text-primary">Clinic Location</h4>
                  <p className="font-instrument text-xs text-text-dark/85">
                    Model Colony, Shivajinagar, Pune - 411016
                  </p>
                </div>
              </div>

              {/* Card 3: Call Us Directly */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#62826B]/15 text-[#62826B] p-3 rounded-full flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-caudex font-bold text-base text-primary">Call Us Directly</h4>
                  <a
                    href="tel:+919673004407"
                    className="block font-instrument text-xs text-text-dark/85 hover:text-[#62826B] transition-colors"
                  >
                    +91 96730 04407
                  </a>
                </div>
              </div>

              {/* Card 4: Send a Message */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#62826B]/15 text-[#62826B] p-3 rounded-full flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-caudex font-bold text-base text-primary">Send a Message</h4>
                  <a
                    href="mailto:consult@dentsspa.com"
                    className="block font-instrument text-xs text-text-dark/85 hover:text-[#62826B] transition-colors"
                  >
                    consult@dentsspa.com
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 bg-[#FFF8EE]/40 border border-border-neutral/30 rounded-3xl p-8 md:p-10 shadow-sm"
          >
            <h3 className="font-caudex font-bold text-2xl text-primary mb-6">
              Get in Touch
            </h3>

            {submitted ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
                <div className="w-16 h-16 bg-[#62826B]/10 rounded-full flex items-center justify-center text-[#62826B]">
                  <Send className="w-8 h-8" />
                </div>
                <h4 className="font-caudex font-bold text-xl text-primary">
                  Message Sent!
                </h4>
                <p className="font-instrument text-sm text-text-dark/80">
                  Thank you for reaching out. We will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name */}
                <div>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your Name*"
                    className="w-full font-instrument text-sm text-text-dark border border-border-neutral/20 rounded-xl px-5 py-4 outline-none focus:border-[#62826B] transition-colors bg-white placeholder-text-dark/45 shadow-sm"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 font-instrument pl-2">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your Email*"
                    className="w-full font-instrument text-sm text-text-dark border border-border-neutral/20 rounded-xl px-5 py-4 outline-none focus:border-[#62826B] transition-colors bg-white placeholder-text-dark/45 shadow-sm"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-instrument pl-2">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="Your Phone*"
                    className="w-full font-instrument text-sm text-text-dark border border-border-neutral/20 rounded-xl px-5 py-4 outline-none focus:border-[#62826B] transition-colors bg-white placeholder-text-dark/45 shadow-sm"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 font-instrument pl-2">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your Message*"
                    className="w-full font-instrument text-sm text-text-dark border border-border-neutral/20 rounded-xl px-5 py-4 outline-none focus:border-[#62826B] transition-colors bg-white resize-none placeholder-text-dark/45 shadow-sm"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 font-instrument pl-2">{errors.message}</p>
                  )}
                </div>

                {/* Submit button in deep plum brand color */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-sm font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-md hover:scale-[1.02] flex items-center justify-center"
                  >
                    Send Message
                  </button>
                </div>

              </form>
            )}
          </motion.div>

        </div>
      </section>

    </div>
  );
}
