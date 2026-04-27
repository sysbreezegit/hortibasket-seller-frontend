"use client";

import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    title: "Beautiful Plants for Every Corner",
    subtitle: "Discover a wide range of exotic and indoor plants that bring life to your home.",
    buttonText: "Shop Plants",
    color: "bg-[#224229]",
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1320&h=585&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Quality Seeds for Your Garden",
    subtitle: "Start your gardening journey with our premium organic seeds.",
    buttonText: "Explore Seeds",
    color: "bg-[#1a3320]",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1320&h=585&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Essential Tools for Success",
    subtitle: "Professional gardening tools to make your hobby easier and more enjoyable.",
    buttonText: "Browse Tools",
    color: "bg-[#89C839]",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1320&h=585&auto=format&fit=crop"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden mt-6">
      <MaxWidthWrapper className="max-w-none w-full px-2 md:px-8 lg:px-12 xl:px-16">
        <div className="relative h-[450px] sm:h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8 md:px-20">
                <div className="max-w-xl text-white space-y-4 md:space-y-6">
                  <h1 className="text-3xl md:text-6xl font-black leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-xl text-gray-200">
                    {slide.subtitle}
                  </p>
                  <button className="bg-[#89C839] hover:bg-[#74a930] text-[#1a3320] font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-4 z-20 p-2 rounded-full bg-[#F2F0EA]/20 hover:bg-[#F2F0EA]/40 text-white backdrop-blur-sm transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-4 z-20 p-2 rounded-full bg-[#F2F0EA]/20 hover:bg-[#F2F0EA]/40 text-white backdrop-blur-sm transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-[#89C839] w-8" : "bg-[#F2F0EA]/50"
                  }`}
              />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
