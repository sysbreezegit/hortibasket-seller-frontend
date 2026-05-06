"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  MapPin, 
  FileText, 
  Camera, 
  ShieldCheck, 
  ShieldAlert,
  Clock,
  ExternalLink,
  CheckCircle2,
  Building2,
  Mail,
  Phone
} from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const kycStatus = user.kycStatus || "pending";
  const kycDetails = (user as any).kycDetails || {};
  const address = (user as any).address || {};

  const statusConfig = {
    pending: { 
      label: "Not Started", 
      icon: ShieldAlert, 
      color: "text-amber-500", 
      bg: "bg-amber-500/10", 
      border: "border-amber-500/20" 
    },
    submitted: { 
      label: "Pending Review", 
      icon: Clock, 
      color: "text-blue-500", 
      bg: "bg-blue-500/10", 
      border: "border-blue-500/20" 
    },
    approved: { 
      label: "Verified", 
      icon: ShieldCheck, 
      color: "text-[#00c725]", 
      bg: "bg-[#00c725]/10", 
      border: "border-[#00c725]/20" 
    },
    rejected: { 
      label: "Rejected", 
      icon: ShieldAlert, 
      color: "text-red-500", 
      bg: "bg-red-500/10", 
      border: "border-red-500/20" 
    },
  };

  const currentStatus = statusConfig[kycStatus as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-[#0a0f09] text-[#f2f0ea] p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10 pb-24">
        {/* Header Profile Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-[#00c725]/10 rounded-3xl flex items-center justify-center border border-[#00c725]/20 text-[#00c725] text-4xl font-bold font-editorial-serif shadow-[0_0_30px_rgba(0,199,37,0.1)]">
              {user.name?.[0] || "?"}
            </div>
            <div>
              <h1 className="text-4xl font-editorial-serif text-[#f2f0ea] tracking-tight mb-2">{user.shopName || "Business Profile"}</h1>
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${currentStatus.bg} ${currentStatus.color} ${currentStatus.border} border shadow-lg`}>
                  <currentStatus.icon size={12} />
                  {currentStatus.label}
                </div>
                <span className="text-white/10 text-xs">•</span>
                <span className="text-[#f2f0ea]/30 text-xs font-mono uppercase tracking-tighter">ID: {user._id.slice(-8)}</span>
              </div>
            </div>
          </div>
          
          {kycStatus !== "approved" && kycStatus !== "submitted" && (
            <Link href="/onboarding/kyc">
              <Button className="bg-[#00c725] text-[#0a0f09] hover:bg-[#00e02a] font-bold px-8 h-12 rounded-xl transition-all shadow-[0_0_30px_rgba(0,199,37,0.2)]">
                Complete Verification
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Contact & Basic Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Info Card */}
            <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10 backdrop-blur-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c725]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <h3 className="text-2xl font-editorial-serif flex items-center gap-3 mb-10 text-[#f2f0ea]">
                 <User className="text-[#00c725]" size={24} />
                 Contact Details
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f2f0ea]/20 font-bold">Account Owner</p>
                    <p className="text-[#f2f0ea] text-lg font-medium tracking-tight">{user.name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f2f0ea]/20 font-bold">Email Address</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[#f2f0ea] text-lg font-medium tracking-tight">{user.email}</p>
                      <CheckCircle2 size={16} className="text-[#00c725]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f2f0ea]/20 font-bold">Registered Phone</p>
                    <p className="text-[#f2f0ea] text-lg font-medium tracking-tight">{user.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f2f0ea]/20 font-bold">GST Identification</p>
                    <p className="text-[#f2f0ea] text-lg font-medium tracking-tight font-mono">{user.gstNumber || "NOT PROVIDED"}</p>
                  </div>
               </div>
            </div>

            {/* Address Card */}
            <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10 backdrop-blur-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c725]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <h3 className="text-2xl font-editorial-serif flex items-center gap-3 mb-10 text-[#f2f0ea]">
                 <MapPin className="text-[#00c725]" size={24} />
                 Business Location
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                  <div className="md:col-span-2 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f2f0ea]/20 font-bold">Street Address</p>
                    <p className="text-[#f2f0ea] text-lg font-medium leading-relaxed max-w-xl">{address.street || "Not Provided"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f2f0ea]/20 font-bold">City & Region</p>
                    <p className="text-[#f2f0ea] text-lg font-medium tracking-tight">{address.city}{address.state ? `, ${address.state}` : ""}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f2f0ea]/20 font-bold">Pincode & Country</p>
                    <p className="text-[#f2f0ea] text-lg font-medium tracking-tight">{address.pincode} • {address.country || "India"}</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: KYC Documents */}
          <div className="space-y-8">
             <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10 backdrop-blur-xl h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c725]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-2xl font-editorial-serif flex items-center gap-3 mb-10 text-[#f2f0ea]">
                  <FileText className="text-[#00c725]" size={24} />
                  Verification
                </h3>

                <div className="space-y-10">
                   <div className="space-y-6">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#f2f0ea]/20 font-bold">{kycDetails.idType || "Identity Document"}</p>
                      <div className="grid grid-cols-2 gap-4">
                         {kycDetails.idFront ? (
                           <a href={kycDetails.idFront} target="_blank" rel="noreferrer" className="group/img relative aspect-[3/4] bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                              <img src={kycDetails.idFront} alt="ID Front" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                              <div className="absolute inset-0 bg-[#0a0f09]/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                                 <ExternalLink size={24} className="text-[#00c725]" />
                              </div>
                           </a>
                         ) : (
                           <div className="aspect-[3/4] bg-white/5 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-[#f2f0ea]/10 gap-3">
                             <FileText size={32} />
                             <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Front View</span>
                           </div>
                         )}
                         
                         {kycDetails.idBack ? (
                           <a href={kycDetails.idBack} target="_blank" rel="noreferrer" className="group/img relative aspect-[3/4] bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                              <img src={kycDetails.idBack} alt="ID Back" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                              <div className="absolute inset-0 bg-[#0a0f09]/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                                 <ExternalLink size={24} className="text-[#00c725]" />
                              </div>
                           </a>
                         ) : (
                           <div className="aspect-[3/4] bg-white/5 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-[#f2f0ea]/10 gap-3">
                             <FileText size={32} />
                             <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Back View</span>
                           </div>
                         )}
                      </div>
                   </div>

                   <div className="space-y-6 pt-10 border-t border-white/5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#f2f0ea]/20 font-bold">Live Verification Selfie</p>
                      {kycDetails.selfie ? (
                        <a href={kycDetails.selfie} target="_blank" rel="noreferrer" className="group/img relative aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-w-[180px]">
                           <img src={kycDetails.selfie} alt="Selfie" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                           <div className="absolute inset-0 bg-[#0a0f09]/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                              <ExternalLink size={24} className="text-[#00c725]" />
                           </div>
                        </a>
                      ) : (
                        <div className="aspect-square bg-white/5 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-[#f2f0ea]/10 gap-3 max-w-[180px]">
                          <Camera size={32} />
                          <span className="text-[8px] uppercase tracking-[0.3em] font-bold">No Capture</span>
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
