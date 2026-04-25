"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { BUS_TYPES, BUSINESS } from "@/lib/constants";
import { generateWhatsAppLink } from "@/lib/utils";
import { FaCheck, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const busFeatures = [
  "AC & Non-AC Options Available",
  "Experienced & Professional Drivers",
  "Well-Maintained Premium Fleet",
  "GPS Tracking on All Vehicles",
  "24/7 Customer Support",
  "Flexible Scheduling",
  "Competitive Pricing",
  "All India Permits",
];

export default function BusRentalSection() {
  const handleInquiry = () => {
    const link = generateWhatsAppLink(
      "Hi! I'd like to inquire about bus rental services. Please share availability and pricing."
    );
    window.open(link, "_blank");
  };

  return (
    <section id="bus-rental" className="py-20 md:py-28 bg-surface relative">
      <div className="absolute inset-0 bg-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Bus Services"
          title="Premium Bus Rental"
          subtitle="Comfortable, reliable, and affordable bus rental services for every occasion — from family outings to corporate events."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Bus types grid */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-bold text-primary mb-5">
              Available Bus Types
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {BUS_TYPES.map((type, i) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-white rounded-xl p-4 text-center card-shadow border border-gray-100 hover:border-gold/30 transition-all duration-300 cursor-default"
                >
                  <div className="text-2xl mb-1">🚌</div>
                  <div className="text-sm font-semibold text-primary">
                    {type}
                  </div>
                </motion.div>
              ))}
            </div>

            <h3 className="text-lg font-bold text-primary mb-4">
              Why Our Buses?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {busFeatures.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <FaCheck className="text-emerald text-xs shrink-0" />
                  <span className="text-text-secondary">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Image + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative brand-shape overflow-hidden aspect-[4/3] mb-6">
              <Image
                src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80"
                alt="Premium luxury bus for rental travel services"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-white font-semibold text-sm">
                    Perfect for Marriages • Corporate Events • Family Tours
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleInquiry}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-primary-light hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] text-white font-semibold rounded-xl transition-all duration-300 shimmer cursor-pointer text-sm"
              >
                <FaWhatsapp className="text-lg" />
                Inquire on WhatsApp
              </button>
              <a
                href={`tel:${BUSINESS.primaryPhone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-primary-light hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] text-white font-semibold rounded-xl transition-all duration-300 shimmer text-sm"
              >
                <FaPhoneAlt className="text-sm" />
                Call: {BUSINESS.primaryPhone}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
