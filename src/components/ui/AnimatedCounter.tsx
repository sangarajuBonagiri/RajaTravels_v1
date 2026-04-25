"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  light?: boolean;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  label,
  light = false,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div
        className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
          light ? "text-gradient-gold" : "text-gold"
        }`}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div
        className={`mt-2 text-sm font-medium tracking-wide uppercase ${
          light ? "text-white/60" : "text-text-secondary"
        }`}
      >
        {label}
      </div>
    </motion.div>
  );
}
