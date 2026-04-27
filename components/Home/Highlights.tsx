"use client";

import { ArrowLeft, ArrowRight, ShoppingCart, X, Volume2, VolumeX } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const HIGHLIGHTS_DATA = [
  {
    _id: "1",
    video: "https://caremall-web.s3.ap-south-1.amazonaws.com/videos/61f622c1-cad9-4bc2-ace3-03bc57900dd7.mp4",
    product: {
      _id: "p1",
      productName: "Premium Indoor Palm",
      sellingPrice: 1299,
      mrpPrice: 1800,
      urlSlug: "premium-indoor-palm",
      productImages: ["https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=800&h=1000&auto=format&fit=crop"]
    }
  },
  {
    _id: "2",
    video: "https://caremall-web.s3.ap-south-1.amazonaws.com/videos/a3bbfa32-06dc-41cc-acbd-fc69376cdba2.mp4",
    product: {
      _id: "p2",
      productName: "Exotic Orchid Collection",
      sellingPrice: 2499,
      mrpPrice: 3200,
      urlSlug: "exotic-orchid-collection",
      productImages: ["https://m.media-amazon.com/images/I/61FcWFWaHEL._SX679_.jpg"]
    }
  },
  {
    _id: "3",
    video: "https://caremall-web.s3.ap-south-1.amazonaws.com/videos/9fbc8704-6115-49e2-b149-46516cc450f9.mp4",
    product: {
      _id: "p3",
      productName: "Designer Ceramic Pot Set",
      sellingPrice: 899,
      mrpPrice: 1200,
      urlSlug: "designer-ceramic-pot-set",
      productImages: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&h=1000&auto=format&fit=crop"]
    }
  },
  {
    _id: "4",
    video: "https://caremall-web.s3.ap-south-1.amazonaws.com/videos/9bc2ccb0-9685-42cc-b8ff-1f0e6e9db673.quicktime",
    product: {
      _id: "p4",
      productName: "Hanging Garden Kit",
      sellingPrice: 599,
      mrpPrice: 850,
      urlSlug: "hanging-garden-kit",
      productImages: ["https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=800&h=1000&auto=format&fit=crop"]
    }
  }
];

const Highlights = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [selectedHighlight, setSelectedHighlight] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListMuted, setIsListMuted] = useState(true);
  const [isModalMuted, setIsModalMuted] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(HIGHLIGHTS_DATA.length / itemsPerView);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const handleCardClick = (e: React.MouseEvent, highlight: any) => {
    e.preventDefault();
    setSelectedHighlight(highlight);
    setIsModalOpen(true);
    setIsModalMuted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHighlight(null);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  const getDiscountPct = (mrp?: number, sell?: number) => {
    if (!mrp || !sell || mrp <= 0 || sell >= mrp) return null;
    return Math.ceil(((mrp - sell) / mrp) * 100);
  };

  const isCarousel = HIGHLIGHTS_DATA.length > itemsPerView;

  return (
    <MaxWidthWrapper className="max-w-none w-full px-2 md:px-8 lg:px-12 xl:px-16">
      <div className="py-10">
        <section className="w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-sans font-black text-[24px] sm:text-[28px] md:text-[32px] lg:text-[42px] text-[#224229]">
              Hortibasket Highlights
            </h2>

            {isCarousel && (
              <div className="hidden md:flex items-center gap-2">
                <button
                  className="bg-[#F2F0EA] hover:bg-gray-200 border p-2 rounded transition-colors"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <ArrowLeft />
                </button>
                <button
                  className="bg-[#F2F0EA] hover:bg-gray-200 border p-2 rounded transition-colors"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <ArrowRight />
                </button>
              </div>
            )}
          </div>

          <div className="relative overflow-hidden w-full">
            <motion.div
              className="flex"
              animate={{ x: `-${currentSlide * (100 / itemsPerView)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ willChange: "transform" }}
            >
              {HIGHLIGHTS_DATA.map((highlight, i) => (
                <div key={i} className="shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                  <div className="cursor-pointer" onClick={(e) => handleCardClick(e, highlight)}>
                    <div className="w-full h-[380px] xs:h-[450px] sm:h-[320px] md:h-[340px] lg:h-[550px] rounded-lg shadow-md overflow-hidden relative group">
                      <video
                        src={highlight.video}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        autoPlay
                        loop
                        muted={isListMuted}
                        playsInline
                        preload="metadata"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsListMuted((m) => !m);
                        }}
                        aria-label={isListMuted ? "Unmute video" : "Mute video"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-[#F2F0EA]/90 hover:bg-[#F2F0EA] transition-colors p-2 shadow md:hidden"
                      >
                        {isListMuted ? (
                          <VolumeX className="w-5 h-5 text-gray-900" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-gray-900" />
                        )}
                      </button>

                      <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 backdrop-blur-md p-3 md:p-4 rounded-lg shadow-md z-10 bg-[#F2F0EA]/80 group-hover:bg-[#F2F0EA]/90 transition-colors">
                        <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-1 md:mb-2 line-clamp-1">
                          {highlight.product.productName}
                        </h3>
                        <div className="flex justify-between items-center">
                          <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                            Rs.{highlight.product.sellingPrice}
                            <span className="text-sm text-gray-500 line-through ml-2">
                              Rs.{highlight.product.mrpPrice}
                            </span>
                          </p>
                          <button
                            className=" bg-[#8dd62d] hover:bg-[#89C839]/80 text-white w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert("Added to cart!");
                            }}
                            aria-label="Add to cart"
                          >
                            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {totalSlides > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-blue-500" : "bg-gray-300"}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal for Highlight Details - Near-exact clone of Caremall Highlights.tsx modal */}
      {isModalOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-100">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />
          {/* Content wrapper */}
          <div className="relative h-full w-full">
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-3 right-3 z-50 rounded-full bg-[#F2F0EA] text-black hover:bg-gray-100 transition-colors p-2 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main content */}
            <div className="absolute inset-0 bg-black/90" />
            <div className="relative h-full w-full grid md:grid-cols-[minmax(0,1fr)_420px]">
              {/* Media area */}
              <div className="relative flex items-center justify-center overflow-hidden bg-black">
                <video
                  src={selectedHighlight.video}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted={isModalMuted}
                  playsInline
                />
                <button
                  onClick={() => setIsModalMuted((m) => !m)}
                  aria-label={isModalMuted ? "Unmute video" : "Mute video"}
                  className="absolute right-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-[#F2F0EA]/90 hover:bg-[#F2F0EA] transition-colors p-3 shadow"
                >
                  {isModalMuted ? (
                    <VolumeX className="w-6 h-6 text-gray-900" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-gray-900" />
                  )}
                </button>
              </div>

              {/* Right product panel (desktop) */}
              <aside className="hidden md:flex flex-col h-full bg-[#F2F0EA] p-6 gap-6">
                <div className="flex flex-col gap-4">
                  {selectedHighlight.product.productImages?.[0] && (
                    <img
                      src={selectedHighlight.product.productImages[0]}
                      alt={selectedHighlight.product.productName}
                      className="w-full max-w-[260px] aspect-square object-contain rounded-md border border-gray-200"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-gray-900">{selectedHighlight.product.productName}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-900">
                      Rs.{selectedHighlight.product.sellingPrice}
                    </span>
                    <div className="space-y-2">
                      {selectedHighlight.product.mrpPrice && (
                        <span className="text-gray-500 line-through">Rs.{selectedHighlight.product.mrpPrice}</span>
                      )}
                    </div>
                    {getDiscountPct(selectedHighlight.product.mrpPrice, selectedHighlight.product.sellingPrice) !== null && (
                      <span className="text-green-600 font-medium">
                        {getDiscountPct(selectedHighlight.product.mrpPrice, selectedHighlight.product.sellingPrice)}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <Link
                    href={`/products/${selectedHighlight.product.urlSlug}`}
                    onClick={closeModal}
                    className="w-full inline-flex items-center justify-center rounded-md bg-[#8dd62d] text-white px-5 py-3 text-sm font-semibold hover:bg-gray-900 transition-colors"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </aside>
            </div>

            {/* Mobile bottom sheet (inside overlay) */}
            <div className="md:hidden pointer-events-none fixed bottom-0 left-0 right-0">
              <div className="pointer-events-auto mx-3 mb-3 rounded-xl bg-[#F2F0EA] shadow-2xl p-3 flex items-center gap-3">
                {selectedHighlight.product.productImages?.[0] && (
                  <img
                    src={selectedHighlight.product.productImages[0]}
                    alt={selectedHighlight.product.productName}
                    className="size-14 rounded-md object-contain border border-gray-200"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {selectedHighlight.product.productName}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900">
                      Rs.{selectedHighlight.product.sellingPrice}
                    </span>
                    {selectedHighlight.product.mrpPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        Rs.{selectedHighlight.product.mrpPrice}
                      </span>
                    )}
                    {getDiscountPct(selectedHighlight.product.mrpPrice, selectedHighlight.product.sellingPrice) !== null && (
                      <span className="text-xs text-green-600 font-medium">
                        {getDiscountPct(selectedHighlight.product.mrpPrice, selectedHighlight.product.sellingPrice)}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/products/${selectedHighlight.product.urlSlug}`}
                  onClick={closeModal}
                  className="rounded-md bg-[#8dd62d] text-white px-4 py-2 text-xs font-semibold hover:bg-gray-900 transition-colors whitespace-nowrap"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Highlights;
