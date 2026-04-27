"use client";

import React from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: 1,
    name: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&h=800&auto=format&fit=crop",
    count: "120+ Items",
    accent: "bg-emerald-500"
  },
  {
    id: 2,
    name: "Outdoor Plants",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=600&h=800&auto=format&fit=crop",
    count: "80+ Items",
    accent: "bg-green-600"
  },
  {
    id: 3,
    name: "Gardening Tools",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&h=800&auto=format&fit=crop",
    count: "50+ Items",
    accent: "bg-stone-600"
  },
  {
    id: 4,
    name: "Pots & Planters",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&h=800&auto=format&fit=crop",
    count: "200+ Items",
    accent: "bg-[#224229]"
  },
  {
    id: 5,
    name: "Fertilizers",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&h=800&auto=format&fit=crop",
    count: "40+ Items",
    accent: "bg-lime-600"
  },
  {
    id: 6,
    name: "Seeds",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=600&h=800&auto=format&fit=crop",
    count: "300+ Items",
    accent: "bg-yellow-600"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const Categories = () => {
  return (
    <section className="py-20 bg-[#F2F0EA]">
      <MaxWidthWrapper className="max-w-none w-full px-2 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-row justify-between items-center mb-12 px-2 sm:px-0">
          <div>
            <span className="text-[#89C839] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs block mb-2">Our Collections</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#224229] tracking-tighter">Shop by Category</h2>
          </div>
          <Link href="/categories" className="flex items-center gap-2 text-[#224229] bg-gray-100/80 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-black hover:bg-[#89C839] hover:text-[#224229] transition-all">
            See All <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CATEGORIES.map((category) => (
            <motion.div key={category.id} variants={itemVariants} style={{ willChange: "transform, opacity" }}>
              <Link href={`/category/${category.id}`} className="group relative block aspect-4/5 sm:aspect-3/4 rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/80 z-10" />
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {category.count}
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 transform transition-transform duration-500 group-hover:-translate-y-1">
                  <div className={`w-8 h-1 ${category.accent} mb-3 transition-all duration-500 group-hover:w-16`} />
                  <h3 className="text-lg sm:text-2xl font-black text-white tracking-tighter leading-none mb-1">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 text-[10px] sm:text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Explore Now <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Categories;
