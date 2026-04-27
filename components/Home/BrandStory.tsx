"use client";

import React from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";

const BrandStory = () => {
  return (
    <section className="py-24 overflow-hidden">
      <MaxWidthWrapper className="max-w-none w-full px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1416870230247-d0a999a21605?q=80&w=800&h=1000&auto=format&fit=crop"
                alt="Gardening"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#89C839]/10 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-[#89C839] font-bold tracking-widest uppercase text-sm">Our Garden Story</h3>
              <h2 className="text-4xl md:text-6xl font-black text-[#224229] leading-tight">
                Helping You Grow Your Own <span className="text-[#89C839]">Urban Jungle</span>
              </h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              At Hortibasket, we believe that every home deserves a touch of green. Whether you live in a small apartment or have a sprawling backyard, we're here to provide you with everything you need to cultivate your own oasis.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <span className="text-4xl font-black text-[#224229]">10k+</span>
                <p className="text-gray-400 text-sm mt-1">Happy Gardeners</p>
              </div>
              <div>
                <span className="text-4xl font-black text-[#224229]">500+</span>
                <p className="text-gray-400 text-sm mt-1">Plant Varieties</p>
              </div>
            </div>

            <button className="bg-[#224229] text-white font-bold py-4 px-10 rounded-full hover:bg-[#89C839] transition-all shadow-xl group">
              Read Our Story
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default BrandStory;
