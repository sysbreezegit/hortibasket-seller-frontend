"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import CareMallLogo from '@/public/assets/caremall.png';

export default function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-linear-to-br from-rose-100 via-white to-orange-100/50 backdrop-blur-3xl">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg p-8 animate-in fade-in zoom-in-95 duration-700">
        <div className="relative w-32 h-32 md:w-56 md:h-56 mb-8 transition-transform duration-700 hover:scale-105 filter drop-shadow-xl">
             <Image
                src={CareMallLogo}
                alt="Care Mall"
                fill
                className="object-contain"
                priority
              />
        </div>
        
        <div className="flex flex-col items-center space-y-6 text-center z-10">
          <Loader2 className="h-12 w-12 text-red-600 animate-spin" strokeWidth={2.5} />
          
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Care Mall <span className="text-red-600">Affiliate</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg animate-pulse">
              Preparing your experience...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
