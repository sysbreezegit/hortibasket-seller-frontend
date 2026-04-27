"use client";

import React from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import { Truck, ShieldCheck, Leaf, HeartHandshake } from "lucide-react";

const FEATURES = [
  {
    icon: <Truck size={40} className="text-[#89C839]" />,
    title: "Secure Delivery",
    description: "Specialized packaging to ensure your plants arrive fresh and healthy."
  },
  {
    icon: <ShieldCheck size={40} className="text-[#89C839]" />,
    title: "Guaranteed Quality",
    description: "Every plant is inspected for health and quality before it leaves our nursery."
  },
  {
    icon: <Leaf size={40} className="text-[#89C839]" />,
    title: "Expert Guidance",
    description: "Free plant care tips and lifetime support for every plant you buy."
  },
  {
    icon: <HeartHandshake size={40} className="text-[#89C839]" />,
    title: "Eco-Friendly",
    description: "We use sustainable practices and biodegradable packaging wherever possible."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[#1a3320] text-white">
      <MaxWidthWrapper className="max-w-none w-full px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="p-5 bg-[#F2F0EA]/10 rounded-3xl backdrop-blur-sm border border-white/10 mb-2">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default WhyChooseUs;
