"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { generateWhatsAppLink, formatPackageInquiry } from "@/lib/utils";
import { FaMapMarkerAlt } from "react-icons/fa";

interface DestinationCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  index: number;
}

export default function DestinationCard({
  title,
  subtitle,
  description,
  image,
  highlights,
  index,
}: DestinationCardProps) {
  const handleBookNow = () => {
    const link = generateWhatsAppLink(formatPackageInquiry(`${title} Tour`));
    window.open(link, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-white brand-shape overflow-hidden card-shadow-lg hover:shadow-[0_15px_40px_rgba(0,71,158,0.15)] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          className="relative h-full w-full"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 glass rounded-full text-xs font-semibold text-white tracking-wide">
          <FaMapMarkerAlt className="inline mr-1 text-gold" /> {subtitle}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          {description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-6">
          {highlights.map((h) => (
            <span
              key={h}
              className="px-3 py-1 bg-gold/8 text-gold-dark text-xs font-medium rounded-full border border-gold/15"
            >
              {h}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleBookNow}
          className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl shimmer hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-shadow duration-300 cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}
