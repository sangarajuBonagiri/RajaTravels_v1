"use client";

import { motion } from "framer-motion";
import {
  FaBus,
  FaShip,
  FaTree,
  FaHotel,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  bus: <FaBus className="text-2xl" />,
  boat: <FaShip className="text-2xl" />,
  forest: <FaTree className="text-2xl" />,
  resort: <FaHotel className="text-2xl" />,
  group: <FaUsers className="text-2xl" />,
  corporate: <FaBriefcase className="text-2xl" />,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  index,
}: ServiceCardProps) {
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
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white brand-shape-reverse p-6 md:p-8 card-shadow hover:card-shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Accent border top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center text-gold group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-dark group-hover:text-white transition-all duration-300 mb-5">
        {iconMap[icon] || <FaBus className="text-2xl" />}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-gold transition-colors duration-300">
        {title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed">
        {description}
      </p>

      {/* Arrow */}
      <div className="mt-5 flex items-center text-gold font-medium text-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
        Learn More
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </motion.div>
  );
}
