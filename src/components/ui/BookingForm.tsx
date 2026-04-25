"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaSpinner } from "react-icons/fa";
import { BUS_TYPES, BUSINESS } from "@/lib/constants";
import { generateWhatsAppLink, formatBookingMessage } from "@/lib/utils";

interface FormData {
  serviceType: string;
  startPoint: string;
  destination: string;
  journeyDate: string;
  busType: string;
  customerName: string;
  phone: string;
  message: string;
}

const initialFormData: FormData = {
  serviceType: "",
  startPoint: "",
  destination: "",
  journeyDate: "",
  busType: "",
  customerName: "",
  phone: "",
  message: "",
};

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = () => {
    return (
      formData.serviceType !== "" &&
      formData.startPoint !== "" &&
      formData.destination !== "" &&
      formData.journeyDate !== "" &&
      formData.customerName !== "" &&
      formData.phone !== "" &&
      (formData.serviceType === "Bus Rental" ? formData.busType !== "" : true)
    );
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    const message = formatBookingMessage(formData);
    const link = generateWhatsAppLink(message);
    window.open(link, "_blank");
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setSending(true);

    try {
      // EmailJS integration - replace with your actual credentials
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        BUSINESS.emailjs.serviceId,
        BUSINESS.emailjs.templateId,
        {
          service_type: formData.serviceType,
          from_name: formData.customerName,
          phone: formData.phone,
          start_point: formData.startPoint,
          destination: formData.destination,
          journey_date: formData.journeyDate,
          bus_type: formData.busType || "N/A",
          message: formData.message || "No additional message",
        },
        BUSINESS.emailjs.publicKey
      );
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 4000);
    } catch {
      // Fallback: open mailto link
      const subject = encodeURIComponent(
        `Bus Booking Request - ${formData.customerName}`
      );
      const body = encodeURIComponent(formatBookingMessage(formData));
      window.open(`mailto:${BUSINESS.email}?subject=${subject}&body=${body}`);
    } finally {
      setSending(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-gold/60 focus:bg-white/15 transition-all duration-300 text-sm backdrop-blur-sm";
  const labelClasses = "block text-white/70 text-xs font-medium mb-1.5 tracking-wide uppercase";

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-3xl p-6 md:p-8 max-w-2xl mx-auto gold-glow"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
          Book Your Journey
        </h3>
        <p className="text-white/50 text-sm mt-1">
          Fill in your travel details below
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service Type */}
        <div className="md:col-span-2">
          <label htmlFor="serviceType" className={labelClasses}>
            Service Required
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={(e) => {
              handleChange(e);
              // Reset bus type when changing service
              if (e.target.value !== "Bus Rental") {
                setFormData(prev => ({ ...prev, busType: "" }));
              }
            }}
            className={`${inputClasses} appearance-none cursor-pointer`}
            required
          >
            <option value="" className="text-gray-900">Select Service Type</option>
            <option value="Bus Rental" className="text-gray-900">Bus Rental Services</option>
            <option value="Papikondalu Package" className="text-gray-900">Papikondalu Tour Package</option>
            <option value="Maredumilli Package" className="text-gray-900">Maredumilli Tour Package</option>
            <option value="Other Service" className="text-gray-900">Other Travel Service</option>
          </select>
        </div>

        {/* Start Point */}
        <div>
          <label htmlFor="startPoint" className={labelClasses}>
            Pickup Location
          </label>
          <input
            id="startPoint"
            type="text"
            name="startPoint"
            placeholder="e.g., Rajahmundry"
            value={formData.startPoint}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="destination" className={labelClasses}>
            Destination
          </label>
          <input
            id="destination"
            type="text"
            name="destination"
            placeholder="e.g., Hyderabad"
            value={formData.destination}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        {/* Journey Date */}
        <div>
          <label htmlFor="journeyDate" className={labelClasses}>
            Journey Date
          </label>
          <input
            id="journeyDate"
            type="date"
            name="journeyDate"
            value={formData.journeyDate}
            onChange={handleChange}
            className={`${inputClasses} [color-scheme:dark]`}
            required
          />
        </div>

        {/* Bus Type (Conditional) */}
        {formData.serviceType === "Bus Rental" && (
          <div>
            <label htmlFor="busType" className={labelClasses}>
              Bus Type (Seater)
            </label>
            <select
              id="busType"
              name="busType"
              value={formData.busType}
              onChange={handleChange}
              className={`${inputClasses} appearance-none cursor-pointer`}
              required={formData.serviceType === "Bus Rental"}
            >
              <option value="" className="text-gray-900">
                Select Bus Type
              </option>
              {BUS_TYPES.map((type) => (
                <option key={type} value={type} className="text-gray-900">
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Customer Name */}
        <div>
          <label htmlFor="customerName" className={labelClasses}>
            Your Name
          </label>
          <input
            id="customerName"
            type="text"
            name="customerName"
            placeholder="Full Name"
            value={formData.customerName}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label htmlFor="message" className={labelClasses}>
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Any special requirements..."
            value={formData.message}
            onChange={handleChange}
            className={`${inputClasses} resize-none h-20`}
            rows={2}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        <button
          type="button"
          onClick={handleWhatsApp}
          disabled={!isFormValid()}
          className="flex items-center justify-center gap-2 py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/30 disabled:opacity-40 disabled:cursor-not-allowed shimmer cursor-pointer text-sm"
        >
          <FaWhatsapp className="text-lg" />
          Send via WhatsApp
        </button>

        <button
          type="button"
          onClick={handleEmail}
          disabled={!isFormValid() || sending}
          className="flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-40 disabled:cursor-not-allowed shimmer cursor-pointer text-sm"
        >
          {sending ? (
            <FaSpinner className="text-lg animate-spin" />
          ) : (
            <FaEnvelope className="text-lg" />
          )}
          {emailSent ? "Sent ✓" : "Send via Email"}
        </button>
      </div>

      {emailSent && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-emerald-light text-center text-sm mt-3"
        >
          ✓ Booking details sent successfully!
        </motion.p>
      )}
    </motion.form>
  );
}
