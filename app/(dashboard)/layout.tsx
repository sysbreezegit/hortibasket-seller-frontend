"use client";

import { useState, useEffect } from "react";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { useAuthStore } from "@/store/AuthStore";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const isKycSubmitted = user?.kycStatus === "submitted";
  const isKycApproved = user?.kycStatus === "approved";

  // Only show KYC overlay on specific pages (starting with Dashboard)
  const normalizedPathname = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const isProtectedPage = normalizedPathname === "/dashboard/";
  const shouldShowOverlay = !isKycApproved && isProtectedPage;

  // Disable scrolling when the overlay is active
  useEffect(() => {
    if (shouldShowOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [shouldShowOverlay]);

  return (
    <LayoutWrapper>
      <div className={shouldShowOverlay ? "blur-[2px] pointer-events-none select-none" : ""}>
        {children}
      </div>

      <AnimatePresence>
        {shouldShowOverlay && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:ml-[240px]">
            {/* Semi-transparent dark backdrop */}
            <div className="absolute inset-0 bg-[#0a0f09]/40 backdrop-blur-[1px]" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#0a0f09] border border-[#00c725]/30 rounded-[32px] p-10 shadow-[0_32px_64px_rgba(0,0,0,0.8)] relative overflow-hidden z-10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c725]/5 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="relative z-20 text-center">
                <div className="w-20 h-20 bg-[#00c725]/10 rounded-3xl flex items-center justify-center border border-[#00c725]/20 mx-auto mb-8 shadow-[0_0_20px_rgba(0,199,37,0.1)]">
                  {isKycSubmitted ? (
                    <ShieldCheck className="text-[#00c725]" size={40} />
                  ) : (
                    <Lock className="text-[#00c725]" size={40} />
                  )}
                </div>

                <h2 className="text-3xl font-editorial-serif text-[#f2f0ea] mb-4 tracking-tight">
                  {isKycSubmitted ? "Verification Pending" : "Identity Verification"}
                </h2>

                <p className="text-[#f2f0ea]/50 text-sm leading-relaxed mb-10 px-4">
                  {isKycSubmitted 
                    ? "Your documents are currently being reviewed by our compliance team. This usually takes 24-48 hours."
                    : "To start selling and access all features of the Hortibasket ecosystem, you need to verify your business identity."}
                </p>

                <div className="space-y-4">
                  {isKycSubmitted ? (
                    <Link
                      href="/profile"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 text-[#f2f0ea] border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all transform active:scale-95"
                    >
                      View Submission Status
                    </Link>
                  ) : (
                    <Link
                      href="/onboarding/kyc"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-[#00c725] text-[#0a0f09] rounded-2xl font-bold hover:bg-[#00e02a] transition-all shadow-[0_0_30px_rgba(0,199,37,0.2)] transform active:scale-95"
                    >
                      Verify Identity Now
                      <ArrowRight size={18} />
                    </Link>
                  )}

                  <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#f2f0ea]/20 font-bold pt-2">
                    <ShieldCheck size={12} />
                    Hortibasket Trust & Safety
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </LayoutWrapper>
  );
}
