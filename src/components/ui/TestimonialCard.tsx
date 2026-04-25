"use client";

import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  review: string;
  index: number;
}

export default function TestimonialCard({
  name,
  location,
  rating,
  review,
  index,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative bg-white brand-shape p-6 md:p-8 card-shadow border border-gray-100 h-full flex flex-col"
    >
      {/* Quote icon */}
      <FaQuoteLeft className="text-gold/20 text-3xl mb-4" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <FaStar key={i} className="text-gold text-sm" />
        ))}
      </div>

      {/* Review */}
      <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">
        &ldquo;{review}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-primary text-sm">{name}</div>
          <div className="text-text-light text-xs">{location}</div>
        </div>
      </div>
    </motion.div>
  );
}
