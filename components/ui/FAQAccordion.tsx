"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="bg-white border border-border-neutral rounded-[20px] overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-cream-light/30 min-h-[92px]"
            >
              <span className="font-instrument font-bold text-base md:text-lg text-primary pr-4">
                {item.q}
              </span>
              <div className="bg-cream-light p-2 rounded-full text-primary flex-shrink-0">
                {isOpen ? (
                  <Minus className="w-4 h-4 transition-transform duration-200" />
                ) : (
                  <Plus className="w-4 h-4 transition-transform duration-200" />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-sm md:text-base text-text-dark font-instrument leading-relaxed border-t border-cream-light/50 pt-4 bg-cream-light/10">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
