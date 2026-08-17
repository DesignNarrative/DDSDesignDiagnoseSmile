"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).trim(),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).trim(),
  email: z.string().email({ message: "Please enter a valid email address." }).trim(),
  date: z.string().optional(),
});

export default function BookPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const serviceOptions = [
    "General Dentistry",
    "Cosmetic Dentistry",
    "Micro-Endodontics",
    "Dental Implants Treatment",
    "Orthodontics",
    "Invisalign",
    "Pediatric Dentistry",
    "Gum & Aesthetic Gum Care",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error on type
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedTimeSlot) return;
    setErrors({});

    const result = bookingSchema.safeParse(formData);
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

    const messageText = `Hello DDS Dental Clinic, I would like to book an appointment. Here are my details:
Service: ${selectedService}
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Preferred Date: ${formData.date || "Not specified"}
Preferred Time Slot: ${selectedTimeSlot}`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919673004407?text=${encodedText}`;

    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream-light/20">
      {/* Page Hero */}
      <section className="py-20 bg-white border-b border-border-neutral text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center space-y-4">
          <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary">
            SCHEDULE YOUR VISIT
          </span>
          <h1 className="font-caudex font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            Make your dream smile a reality!
          </h1>
          <p className="font-instrument text-base md:text-lg text-text-dark max-w-2xl leading-relaxed">
            Book your seat today in a clutter free, soothing and sophisticated experience of turning your fear into glory. Be fearless and let DDS Dental make your smile brighter.
          </p>
          <div className="w-16 h-1 bg-primary rounded-full mt-2"></div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-border-neutral rounded-[30px] p-12 shadow-md text-center flex flex-col items-center space-y-6"
            >
              <div className="w-20 h-20 bg-cream-light rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-caudex font-bold text-2xl md:text-3xl text-primary">
                Appointment Booked!
              </h2>
              <p className="font-instrument text-base text-text-dark max-w-md leading-relaxed">
                Thank you for choosing DDS Dental Clinic. We have received your appointment request for{" "}
                <span className="font-bold text-primary">{selectedService}</span>. Our team will contact you at{" "}
                <span className="font-bold text-primary">{formData.phone}</span> to confirm your slot.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelectedService(null);
                  setSelectedTimeSlot(null);
                  setFormData({ name: "", phone: "", email: "", date: "" });
                }}
                className="font-instrument text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-[11px] transition-all duration-300"
              >
                Book Another
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-border-neutral rounded-[30px] p-8 md:p-12 shadow-md"
            >
              <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
                {/* Step 1: Select Service */}
                <div className="flex flex-col space-y-4">
                  <h2 className="font-caudex font-bold text-xl md:text-2xl text-primary">
                    1. Select a Service
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`font-instrument text-sm font-medium px-4 py-3 rounded-[11px] border-2 transition-all duration-200 text-center ${
                          selectedService === service
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-white text-text-dark border-border-neutral hover:border-primary/50 hover:bg-cream-light/30"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  {!selectedService && (
                    <p className="font-instrument text-xs text-text-muted">
                      Please select a service to continue.
                    </p>
                  )}
                </div>

                {/* Step 2: Select Time Slot */}
                <div className="flex flex-col space-y-4">
                  <h2 className="font-caudex font-bold text-xl md:text-2xl text-primary">
                    2. Select a Time Slot
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                    <button
                      type="button"
                      onClick={() => setSelectedTimeSlot("10am to 1pm")}
                      className={`font-instrument text-sm font-medium px-4 py-3 rounded-[11px] border-2 transition-all duration-200 text-center ${
                        selectedTimeSlot === "10am to 1pm"
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white text-text-dark border-border-neutral hover:border-primary/50 hover:bg-cream-light/30"
                      }`}
                    >
                      10am to 1pm
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTimeSlot("2pm to 7pm")}
                      className={`font-instrument text-sm font-medium px-4 py-3 rounded-[11px] border-2 transition-all duration-200 text-center ${
                        selectedTimeSlot === "2pm to 7pm"
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white text-text-dark border-border-neutral hover:border-primary/50 hover:bg-cream-light/30"
                      }`}
                    >
                      2pm to 7pm
                    </button>
                  </div>
                  {!selectedTimeSlot && (
                    <p className="font-instrument text-xs text-text-muted">
                      Please select a preferred time slot to continue.
                    </p>
                  )}
                </div>

                {/* Step 3: Personal Details */}
                <div className="flex flex-col space-y-4">
                  <h2 className="font-caudex font-bold text-xl md:text-2xl text-primary">
                    3. Your Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="book-name"
                        className="font-instrument font-semibold text-sm text-text-dark"
                      >
                        Your Name*
                      </label>
                      <input
                        id="book-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full name"
                        className="font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white placeholder-text-light"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 font-instrument pl-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="book-phone"
                        className="font-instrument font-semibold text-sm text-text-dark"
                      >
                        Your Phone*
                      </label>
                      <input
                        id="book-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Contact number"
                        className="font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white placeholder-text-light"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 font-instrument pl-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="book-email"
                        className="font-instrument font-semibold text-sm text-text-dark"
                      >
                        Your Email*
                      </label>
                      <input
                        id="book-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className="font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white placeholder-text-light"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 font-instrument pl-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Preferred Date */}
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="book-date"
                        className="font-instrument font-semibold text-sm text-text-dark"
                      >
                        Preferred Date
                      </label>
                      <input
                        id="book-date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="font-instrument text-sm border border-border-neutral rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white text-text-dark"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!selectedService || !selectedTimeSlot}
                  className="bg-primary hover:bg-primary-deep disabled:bg-border-neutral disabled:cursor-not-allowed text-white font-instrument font-semibold text-sm px-8 py-4 rounded-[11px] transition-all duration-200 hover:scale-[1.02] self-start"
                >
                  Book an Appointment
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
