"use client";

import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    _id?: string;
    productName: string;
    sellingPrice: number;
    mrpPrice: number;
    image?: string; // For static
    productImages?: string[]; // For dynamic compatibility
    averageRating?: number;
    urlSlug?: string;
    tag?: string;
    inventory?: {
      inStock: boolean;
      totalAvailableQuantity: number;
    }
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const discountPercent = product.mrpPrice > 0
    ? Math.ceil(((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100)
    : 0;

  const productImage = product.image || product.productImages?.[0] || "/placeholder.svg";
  const isOutOfStock = product.inventory?.inStock === false || (product.inventory?.totalAvailableQuantity ?? 1) <= 0;

  const toCapitalized = (str?: string) => {
    if (!str) return "";
    return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const formatPrice = (price: number): string => {
    return `<span class='ruppee-symbol'>₹</span> ${Math.trunc(price)}`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Navigate to product page if the click didn't come from a button
    if (!(e.target as HTMLElement).closest('button')) {
      router.push(`/product/${product?.urlSlug ?? ""}`);
    }
  };

  return (
    <div onClick={handleCardClick} className="contents cursor-pointer group">
      {/* MOBILE */}
      <div className="md:hidden relative bg-[#F2F0EA] rounded-lg hover:shadow-md w-full hover:z-30 border border-gray-100 overflow-hidden">
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 z-20">
            <div className="bg-[#89C839] px-2 py-1 rounded-full text-[10px] font-semibold text-[#1a3320] shadow">
              {discountPercent}% OFF
            </div>
          </div>
        )}

        {/* HEART */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-1 right-1 z-20 bg-[#F2F0EA] rounded-full p-1 shadow hover:bg-gray-200"
        >
          <Heart size={12} className="text-gray-700" />
        </button>

        {/* IMAGE */}
        <div className="relative min-w-[150px] overflow-hidden h-[195px]">
          <img
            src={productImage}
            alt={product?.productName ?? "Product Image"}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-1 right-1 flex items-center gap-1 px-2 py-0.5 rounded-md shadow bg-[#F2F0EA]/90">
            <Star size={12} className="text-[#89C839] fill-[#89C839]" />
            <span className="text-[10px] font-medium text-[#303030]">
              {product?.averageRating || "4.5"}
            </span>
          </div>
        </div>

        {/* TEXT */}
        <div className="p-2">
          <p className="text-sm font-medium text-[#303030] truncate">
            {toCapitalized(product?.productName) || "Unnamed Product"}
          </p>

          <div className="mt-1 flex items-center gap-2">
            <p
              className="text-lg font-semibold text-[#224229]"
              dangerouslySetInnerHTML={{
                __html: formatPrice(product.sellingPrice),
              }}
            />
          </div>

          <div className="mt-2 flex flex-col items-start gap-2">
            <span className="rounded px-2 py-0.5 text-[#224229]/80 text-xs font-medium">
              Free Delivery
            </span>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={cn(
              "w-full mt-2 rounded px-3 py-2 flex items-center justify-center transition-colors",
              isOutOfStock ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-[#224229] text-white hover:bg-[#1a3320]"
            )}
            disabled={isOutOfStock}
          >
            <ShoppingCart size={16} />
            <span className="ml-2 text-sm">
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </span>
          </button>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex flex-col relative bg-[#F2F0EA] rounded-lg hover:shadow-md w-[318px] h-[464px] hover:z-30 transition-all duration-200 border border-gray-100 overflow-hidden">
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#89C839] text-[#1a3320] border border-[#74a930]">
              {discountPercent}% OFF
            </span>
          </div>
        )}

        {/* HEART */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-2 right-2 z-20 bg-[#F2F0EA] rounded-full p-1.5 shadow hover:bg-gray-200"
        >
          <Heart size={14} className="text-gray-700" />
        </button>

        {/* IMAGE */}
        <div className="relative w-full h-[356px] overflow-hidden rounded-t-lg">
          <img
            src={productImage}
            alt={product?.productName ?? "Product Image"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md shadow bg-[#F2F0EA]/90">
            <Star size={14} className="text-[#89C839] fill-[#89C839]" />
            <span className="text-sm font-medium text-[#303030]">
              {product?.averageRating ? product?.averageRating : "4.5"}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-3 flex flex-col gap-2">
          <p className="text-lg font-medium text-[#303030] truncate">
            {toCapitalized(product?.productName) || "Unnamed Product"}
          </p>

          <div className="flex items-center gap-3">
            <p
              className="text-2xl font-semibold text-[#224229]"
              dangerouslySetInnerHTML={{
                __html: formatPrice(product.sellingPrice),
              }}
            />

            <p
              className="text-lg font-medium line-through text-gray-500"
              dangerouslySetInnerHTML={{
                __html: formatPrice(product.mrpPrice),
              }}
            />
          </div>

          <div className="mt-1 flex flex-col gap-2 ">
            <div className="flex justify-between items-center text-center">
              <span className="rounded-sm text-sm text-[#224229]/60 font-medium">
                Free Delivery
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={cn(
                  "rounded px-3 py-2 flex items-center transition-colors",
                  isOutOfStock ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-[#224229] text-white hover:bg-[#1a3320]"
                )}
                disabled={isOutOfStock}
              >
                <ShoppingCart size={16} />
                {isOutOfStock && (
                  <span className="ml-2 text-sm">Out of Stock</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
