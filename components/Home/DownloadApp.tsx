"use client";

import React from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import { Smartphone, Apple, Play } from "lucide-react";

const DownloadApp = () => {
  return (
    <section className="py-24 bg-[#f8faf7] overflow-hidden">
      <MaxWidthWrapper className="max-w-none w-full px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-[#89C839] font-black uppercase text-sm tracking-widest bg-[#89C839]/10 px-4 py-2 rounded-full">Coming Soon</span>
              <h2 className="text-4xl md:text-7xl font-black text-[#224229] leading-tight">
                Gardening in your <span className="text-[#89C839]">Pocket.</span>
              </h2>
            </div>

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
              Track your plant growth, get watering notifications, and shop our entire nursery with just a tap. The Hortibasket app makes gardening effortless.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-3xl hover:bg-[#224229] transition-all shadow-xl group">
                <Apple size={30} fill="currentColor" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Download on</p>
                  <p className="text-lg font-bold -mt-1 group-hover:scale-105 transition-transform">App Store</p>
                </div>
              </button>

              <button className="flex items-center gap-3 bg-[#224229] text-white px-8 py-4 rounded-3xl hover:bg-black transition-all shadow-xl group">
                <Play size={30} fill="currentColor" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-green-300">Get it on</p>
                  <p className="text-lg font-bold -mt-1 group-hover:scale-105 transition-transform">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10 w-full max-w-[500px] mx-auto scale-110 lg:scale-125">
              <img
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&h=1000&auto=format&fit=crop"
                alt="App Interface"
                className="rounded-[3rem] shadow-2xl border-[12px] border-[#224229] rotate-6"
              />
            </div>
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#89C839] rounded-full blur-[120px] opacity-20 -z-10"></div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default DownloadApp;
