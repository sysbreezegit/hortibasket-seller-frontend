"use client";

import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import { motion, Variants } from "framer-motion";

const GALLERY_IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=800&h=1000&auto=format&fit=crop",
        width: 800,
        height: 1000,
        alt: "Snake Plant Zeylanica"
    },
    {
        src: "https://m.media-amazon.com/images/I/61FcWFWaHEL._SX679_.jpg",
        width: 800,
        height: 1000,
        alt: "Peace Lily"
    },
    {
        src: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&h=1000&auto=format&fit=crop",
        width: 800,
        height: 1200,
        alt: "Monstera Deliciosa"
    },
    {
        src: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=800&h=1000&auto=format&fit=crop",
        width: 800,
        height: 1000,
        alt: "Aloe Vera Hybrid"
    },
    {
        src: "https://m.media-amazon.com/images/I/51ooCfmgCvL._SY300_SX300_QL70_FMwebp_.jpg",
        width: 800,
        height: 800,
        alt: "Areca Palm"
    },
    {
        src: "https://m.media-amazon.com/images/I/41N9oD2-F8L._SY300_SX300_QL70_FMwebp_.jpg",
        width: 800,
        height: 1100,
        alt: "Spider Plant"
    },
    {
        src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&h=1200&auto=format&fit=crop",
        width: 800,
        height: 1200,
        alt: "Tropical Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&h=800&auto=format&fit=crop",
        width: 800,
        height: 800,
        alt: "Featured Collection"
    }
];

const photoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
};

const PhotoGallery = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="py-16 bg-[#F2F0EA] overflow-hidden">
            <MaxWidthWrapper className="max-w-none w-full px-2 md:px-8 lg:px-12 xl:px-16">
                <div className="mb-12 px-2">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#224229] tracking-tighter leading-none">
                            Photo <span className="text-[#89C839]">gallery</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-[#89C839] mt-6 rounded-full" />
                    </motion.div>
                </div>

                <div className="rounded-3xl overflow-hidden min-h-[400px]">
                    {mounted ? (
                        <MasonryPhotoAlbum
                            photos={GALLERY_IMAGES}
                            columns={(containerWidth) => {
                                if (containerWidth < 640) return 2;
                                if (containerWidth < 768) return 3;
                                return 4;
                            }}
                            spacing={16}
                            render={{
                                image: (props, { photo, index }) => (
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.1 }}
                                        custom={index}
                                        variants={photoVariants}
                                        className="group relative overflow-hidden rounded-2xl md:rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500"
                                        style={{ willChange: "transform, opacity" }}
                                    >
                                        <img
                                            {...props}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            style={{ ...props.style, display: 'block' }}
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                    </motion.div>
                                ),
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-50 animate-pulse rounded-3xl" />
                    )}
                </div>
            </MaxWidthWrapper>
        </section>
    );
};

export default PhotoGallery;
