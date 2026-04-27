"use client";

import React from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";

const OFFERS = [
  {
    id: 1,
    title: "Summer Garden Sale",
    image: "https://images.unsplash.com/photo-1592150621124-3c58f6259f93?q=80&w=1320&h=500&auto=format&fit=crop",
    link: "/offers/summer"
  },
  {
    id: 2,
    title: "Indoor Oxygen Boosters",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1320&h=500&auto=format&fit=crop",
    link: "/offers/indoor"
  }
];

const OfferCards = () => {
  return (
    <section className="py-12 bg-[#F2F0EA]">
      <MaxWidthWrapper className="max-w-none w-full px-4 md:px-8 lg:px-12 xl:px-16">
        <h2 className="text-2xl md:text-4xl font-black text-[#224229] mb-8">Exclusive Green Deals</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map((offer) => (
            <div key={offer.id} className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-lg h-[250px] md:h-[400px]">
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#224229]/80 to-transparent flex items-end p-8 md:p-12">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-5xl font-black text-white leading-tight max-w-md">
                    {offer.title}
                  </h3>
                  <button className="bg-[#89C839] text-[#1a3320] font-black py-3 px-8 rounded-full transform hover:scale-105 transition-all shadow-xl">
                    CLAIM OFFER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default OfferCards;
