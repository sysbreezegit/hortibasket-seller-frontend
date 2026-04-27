"use client";

import React from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";

const PromoBanner = () => {
  return (
    <section className="py-20">
      <MaxWidthWrapper className="max-w-none w-full px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="relative overflow-hidden rounded-[4rem] bg-[#89C839] h-[400px] md:h-[600px] flex items-center shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1592150621124-3c58f6259f93?q=80&w=1000&h=1000&auto=format&fit=crop"
              alt="Promo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#89C839]"></div>
          </div>

          <div className="relative z-10 px-10 md:px-20 space-y-8 max-w-2xl">
            <h4 className="text-[#1a3320] font-black uppercase tracking-[0.4em] text-sm bg-[#F2F0EA]/30 backdrop-blur-sm inline-block px-4 py-2 rounded-xl">
              Limited Edition Mix
            </h4>
            <h2 className="text-4xl md:text-7xl font-black text-[#1a3320] leading-tight">
              Bring the <br /> <span className="text-white drop-shadow-md">Rainforest</span> <br /> Home Today!
            </h2>
            <p className="text-[#1a3320]/80 text-lg md:text-xl font-medium max-w-md">
              Get up to 40% OFF on our curated selection of tropical indoor plants. Transform your living space.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#224229] text-white font-black py-5 px-12 rounded-full hover:bg-black transition-all shadow-2xl text-lg">
                SHOP THE COLLECTION
              </button>
            </div>
          </div>

          {/* Decorative Leaf */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 opacity-20 pointer-events-none rotate-45">
            <img src="https://cdn-icons-png.flaticon.com/512/892/892917.png" alt="" className="w-full h-full grayscale invert" />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default PromoBanner;
