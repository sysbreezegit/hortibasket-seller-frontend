"use client";

import React, { useRef } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import ProductCard from "@/components/ui/ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const PRODUCTS = [
    {
        _id: "o1",
        productName: "Outdoor Garden Ficus",
        sellingPrice: 1299,
        mrpPrice: 1550,
        averageRating: 4.9,
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&h=1000&auto=format&fit=crop",
        tag: "Hardy",
        urlSlug: "outdoor-garden-ficus"
    },
    {
        _id: "o2",
        productName: "Rose Bush Red",
        sellingPrice: 549,
        mrpPrice: 750,
        averageRating: 4.7,
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=800&h=1000&auto=format&fit=crop",
        tag: "Flavour",
        urlSlug: "rose-bush-red"
    },
    {
        _id: "o3",
        productName: "Garden Petunia",
        sellingPrice: 299,
        mrpPrice: 399,
        averageRating: 4.6,
        image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=800&h=1000&auto=format&fit=crop",
        tag: "Colorful",
        urlSlug: "garden-petunia"
    },
    {
        _id: "o4",
        productName: "Bamboo Palm",
        sellingPrice: 1199,
        mrpPrice: 1499,
        averageRating: 4.8,
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&h=1000&auto=format&fit=crop",
        tag: "Tropical",
        urlSlug: "bamboo-palm"
    },
    {
        _id: "o5",
        productName: "Lavender Plant",
        sellingPrice: 399,
        mrpPrice: 550,
        averageRating: 4.9,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&h=1000&auto=format&fit=crop",
        tag: "Aromatic",
        urlSlug: "lavender-plant"
    },
    {
        _id: "o6",
        productName: "Bougainvillea",
        sellingPrice: 449,
        mrpPrice: 599,
        averageRating: 4.7,
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&h=1000&auto=format&fit=crop",
        tag: "Flowering",
        urlSlug: "bougainvillea"
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

const OutdoorPlants = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            let cardsToShow = 2;
            if (window.innerWidth >= 1280) {
                cardsToShow = 5;
            } else if (window.innerWidth >= 1024) {
                cardsToShow = 4;
            } else if (window.innerWidth >= 768) {
                cardsToShow = 3;
            }
            const scrollAmount = scrollRef.current.offsetWidth / cardsToShow;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <MaxWidthWrapper className="max-w-none w-full px-2 md:px-8 lg:px-12 xl:px-16">
            <section className="w-full mb-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-sans font-black text-[24px] sm:text-[28px] md:text-[32px] lg:text-[42px] text-[#224229]">
                        Outdoor Plants
                    </h2>
                    <Link
                        href="/category/outdoor"
                        className="md:hidden font-sans font-bold text-[16px] text-[#224229]"
                    >
                        View all
                    </Link>
                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="p-3 rounded-full border-2 border-gray-100 hover:border-[#89C839] hover:bg-gray-50 transition-all duration-200 group"
                            aria-label="Scroll left"
                        >
                            <ArrowLeft size={24} className="group-hover:text-[#89C839] transition-colors" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-3 rounded-full border-2 border-gray-100 hover:border-[#89C839] hover:bg-gray-50 transition-all duration-200 group"
                            aria-label="Scroll right"
                        >
                            <ArrowRight size={24} className="group-hover:text-[#89C839] transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Desktop horizontal scroll layout */}
                <motion.div
                    ref={scrollRef}
                    className="hidden md:flex gap-[20px] overflow-x-scroll scroll-smooth snap-x snap-mandatory no-scrollbar pb-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {PRODUCTS.map((product, i) => (
                        <motion.div key={`${product._id}-${i}`} className="snap-start shrink-0" variants={itemVariants} style={{ willChange: "transform, opacity" }}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}

                    {/* View All Button at the end of carousel */}
                    <motion.div variants={itemVariants} className="snap-start shrink-0" style={{ willChange: "transform, opacity" }}>
                        <Link
                            href="/category/outdoor"
                            className="min-w-[318px] h-[464px] flex flex-col items-center justify-center group p-8 border-2 border-dashed border-gray-100 hover:border-[#89C839] rounded-2xl transition-all duration-200 bg-gray-50/50"
                        >
                            <div className="w-20 h-20 rounded-full bg-[#F2F0EA] flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all mb-4">
                                <ArrowRight size={32} className="text-gray-400 group-hover:text-[#89C839] transition-colors" />
                            </div>
                            <span className="font-sans font-black text-xl text-gray-600 group-hover:text-[#89C839] transition-colors">
                                View All
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Mobile grid layout */}
                <motion.div
                    className="grid grid-cols-2 gap-2 md:hidden"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {PRODUCTS.slice(0, 4).map((product, i) => (
                        <motion.div key={`${product._id}-${i}`} variants={itemVariants} style={{ willChange: "transform, opacity" }}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </MaxWidthWrapper>
    );
};

export default OutdoorPlants;
