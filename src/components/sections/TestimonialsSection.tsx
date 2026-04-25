"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="What Our Customers Say"
          subtitle="Here's what our happy travelers have to say about their experience with Raja Travels."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.name} name={t.name} location={t.location} rating={t.rating} review={t.review} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 max-w-4xl mx-auto">
          {TESTIMONIALS.slice(3, 5).map((t, i) => (
            <TestimonialCard key={t.name} name={t.name} location={t.location} rating={t.rating} review={t.review} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
