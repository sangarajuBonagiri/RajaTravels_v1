"use client";

import { motion } from "framer-motion";
import { FaClock, FaCheck } from "react-icons/fa";
import { generateWhatsAppLink, formatPackageInquiry } from "@/lib/utils";

interface PackageCardProps {
  title: string;
  adultPrice: string;
  childPrice: string;
  duration: string;
  destination: string;
  highlights: string[];
  index: number;
}

export default function PackageCard({
  title,
  adultPrice,
  childPrice,
  duration,
  highlights,
  index,
}: PackageCardProps) {
  const handleBookNow = () => {
    const link = generateWhatsAppLink(formatPackageInquiry(title));
    window.open(link, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-white brand-shape overflow-hidden card-shadow hover:card-shadow-lg transition-all duration-300 border border-gray-100"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light p-5 pb-6">
        <div className="flex items-center gap-2 text-gold/80 text-xs font-medium mb-2">
          <FaClock className="text-[10px]" />
          {duration}
        </div>
        <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
      </div>

      {/* Price */}
      <div className="px-6 -mt-3">
        <div className="inline-flex items-baseline gap-2 bg-white rounded-xl px-4 py-2 card-shadow border border-gold/20">
          <span className="text-2xl font-bold text-gold-dark">
            {adultPrice}
          </span>
          <span className="text-xs text-text-secondary">/adult</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 pt-4">
        <div className="text-sm text-text-secondary mb-4">
          Child: <span className="font-semibold text-primary">{childPrice}</span>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-6">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm">
              <FaCheck className="text-emerald text-xs mt-1 shrink-0" />
              <span className="text-text-secondary">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={handleBookNow}
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl shimmer hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 cursor-pointer text-sm"
        >
          Book This Package
        </button>
      </div>
    </motion.div>
  );
}
