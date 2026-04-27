"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Store, 
  CreditCard, 
  BadgeCheck, 
  Edit3, 
  Camera,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  // Dummy Seller Details (to be replaced with actual user data or extended)
  const [sellerDetails, setSellerDetails] = useState({
    name: user?.name || "Eleanor Hughes",
    email: user?.email || "admin@hortibasket.com",
    phone: user?.phone || "+91 98765 43210",
    shopName: "Hughes Botanical Haven",
    gstin: "27AACHM1234F1Z5",
    upiId: "eleanor@upi",
    address: "123 Green Valley, Eco Park, Mumbai, Maharashtra - 400001",
    joinedDate: "October 2024",
    totalSales: "₹4,25,000",
    rating: "4.8/5",
    kycStatus: user?.kycStatus || "approved"
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save changes would go here
    setIsEditing(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* ─── Profile Header ─── */}
      <section className="relative overflow-hidden rounded-3xl bg-[#F2F0EA] border border-[#0D140B] shadow-[0_20px_50px_rgba(37,66,34,0.05)]">
        <div className="h-32 md:h-48 bg-gradient-to-r from-[#224229] via-[#00C725]/40 to-[#F2F0EA]"></div>
        <div className="px-6 pb-8 md:px-10 md:pb-10 -mt-12 md:-mt-16 flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 md:h-40 md:w-40 border-4 border-[#F2F0EA] shadow-xl ring-1 ring-[#0D140B]/10">
              <AvatarImage src={user?.avatar || "https://images.unsplash.com/photo-1594834749740-74b3f66ffaeb?q=80&w=300&auto=format&fit=crop"} className="grayscale group-hover:grayscale-0 transition-all duration-700" />
              <AvatarFallback className="text-3xl font-editorial-serif bg-[#E3E0D8]">
                {sellerDetails.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-2 right-2 p-2 bg-[#00C725] text-[#0D140B] rounded-full border-2 border-[#F2F0EA] shadow-lg hover:scale-110 transition-transform">
              <Camera size={18} />
            </button>
          </div>
          
          <div className="flex-1 space-y-2 mb-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-editorial-serif italic text-[#0D140B]">
                {sellerDetails.name}
              </h1>
              <Badge className={cn(
                "uppercase tracking-widest text-[10px] px-2 py-0.5 border",
                sellerDetails.kycStatus === "approved" ? "bg-[#00C725]/20 text-[#0D140B] border-[#00C725]" : "bg-yellow-100 text-yellow-800 border-yellow-300"
              )}>
                {sellerDetails.kycStatus === "approved" ? <span className="flex items-center gap-1"><ShieldCheck size={10} /> Verified Seller</span> : "Pending Verification"}
              </Badge>
            </div>
            <p className="text-[#3B5238] font-sans flex items-center gap-2 text-sm md:text-base">
              <Store size={16} className="text-[#00C725]" />
              {sellerDetails.shopName}
            </p>
          </div>

          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button className="bg-[#0D140B] hover:bg-[#224229] text-white rounded-xl gap-2 px-6 h-12 shadow-lg hover:shadow-xl transition-all">
                <Edit3 size={18} />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#F2F0EA] border-[#0D140B] p-0 overflow-hidden rounded-2xl">
              <form onSubmit={handleUpdate}>
                <DialogHeader className="p-6 bg-[#0D140B] text-white">
                  <DialogTitle className="font-editorial-serif italic text-2xl">Edit Seller Profile</DialogTitle>
                </DialogHeader>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    <Label className="text-[#3B5238] uppercase text-[11px] tracking-widest font-bold">Full Name</Label>
                    <Input 
                      value={sellerDetails.name} 
                      onChange={(e) => setSellerDetails({...sellerDetails, name: e.target.value})}
                      className="border-[#0D140B]/20 focus:border-[#00C725] bg-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#3B5238] uppercase text-[11px] tracking-widest font-bold">Shop Name</Label>
                    <Input 
                      value={sellerDetails.shopName} 
                      onChange={(e) => setSellerDetails({...sellerDetails, shopName: e.target.value})}
                      className="border-[#0D140B]/20 focus:border-[#00C725] bg-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#3B5238] uppercase text-[11px] tracking-widest font-bold">Email Address</Label>
                    <Input 
                      value={sellerDetails.email} 
                      className="border-[#0D140B]/20 focus:border-[#00C725] bg-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#3B5238] uppercase text-[11px] tracking-widest font-bold">Phone Number</Label>
                    <Input 
                      value={sellerDetails.phone} 
                      className="border-[#0D140B]/20 focus:border-[#00C725] bg-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-[#3B5238] uppercase text-[11px] tracking-widest font-bold">Shop Address</Label>
                    <Input 
                      value={sellerDetails.address} 
                      onChange={(e) => setSellerDetails({...sellerDetails, address: e.target.value})}
                      className="border-[#0D140B]/20 focus:border-[#00C725] bg-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#3B5238] uppercase text-[11px] tracking-widest font-bold">GSTIN</Label>
                    <Input 
                      value={sellerDetails.gstin} 
                      onChange={(e) => setSellerDetails({...sellerDetails, gstin: e.target.value})}
                      className="border-[#0D140B]/20 focus:border-[#00C725] bg-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#3B5238] uppercase text-[11px] tracking-widest font-bold">UPI ID</Label>
                    <Input 
                      value={sellerDetails.upiId} 
                      onChange={(e) => setSellerDetails({...sellerDetails, upiId: e.target.value})}
                      className="border-[#0D140B]/20 focus:border-[#00C725] bg-white rounded-xl"
                    />
                  </div>
                </div>
                <DialogFooter className="p-6 bg-[#E3E0D8] border-t border-[#0D140B]/10">
                  <Button variant="ghost" type="button" onClick={() => setIsEditing(false)} className="text-[#3B5238]">Cancel</Button>
                  <Button type="submit" className="bg-[#00C725] text-[#0D140B] font-bold px-8 rounded-xl shadow-lg hover:scale-105 transition-all">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ─── Stats Cards ─── */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-[#0D140B] text-white overflow-hidden border-none shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C725]/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <CardHeader>
              <CardTitle className="text-[12px] uppercase tracking-[0.2em] opacity-60">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-4xl font-editorial-serif italic">{sellerDetails.totalSales}</p>
              <p className="text-xs text-[#00C725] font-sans flex items-center gap-1">
                +12% from last month <ArrowRight size={12} />
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#0D140B]/10 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-[11px] uppercase tracking-[0.15em] text-[#3B5238]">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#3B5238]/60 flex items-center gap-2"><Calendar size={14} /> Joined</span>
                <span className="text-[13px] font-semibold text-[#0D140B]">{sellerDetails.joinedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#3B5238]/60 flex items-center gap-2"><Wallet size={14} /> Commission Plan</span>
                <Badge variant="outline" className="text-[10px] border-[#00C725] text-[#00C725]">Premium Plus</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#3B5238]/60 flex items-center gap-2"><BadgeCheck size={14} /> Seller Level</span>
                <span className="text-[13px] font-semibold text-[#0D140B]">Platinum Expert</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─── Detail Sections ─── */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Personal Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="h-full bg-white border-[#0D140B]/10 hover:border-[#00C725]/30 transition-all duration-300">
                <CardHeader className="border-b border-[#0D140B]/5 bg-gray-50/50">
                  <CardTitle className="text-sm font-editorial-serif italic flex items-center gap-2">
                    <User size={16} className="text-[#00C725]" /> Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-[#3B5238]/60 font-bold">Full Name</p>
                    <p className="text-sm font-medium text-[#0D140B]">{sellerDetails.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-[#3B5238]/60 font-bold">Email Address</p>
                    <p className="text-sm font-medium text-[#0D140B] flex items-center gap-2">
                      <Mail size={14} className="opacity-40" /> {sellerDetails.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-[#3B5238]/60 font-bold">Phone Number</p>
                    <p className="text-sm font-medium text-[#0D140B] flex items-center gap-2">
                      <Phone size={14} className="opacity-40" /> {sellerDetails.phone}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Business Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="h-full bg-white border-[#0D140B]/10 hover:border-[#00C725]/30 transition-all duration-300">
                <CardHeader className="border-b border-[#0D140B]/5 bg-gray-50/50">
                  <CardTitle className="text-sm font-editorial-serif italic flex items-center gap-2">
                    <Store size={16} className="text-[#00C725]" /> Business Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-[#3B5238]/60 font-bold">GSTIN Number</p>
                    <p className="text-sm font-medium text-[#0D140B] flex items-center gap-2">
                      <CreditCard size={14} className="opacity-40" /> {sellerDetails.gstin}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-[#3B5238]/60 font-bold">UPI ID for Settlements</p>
                    <p className="text-sm font-medium text-[#0D140B] flex items-center gap-2">
                      <CreditCard size={14} className="opacity-40" /> {sellerDetails.upiId}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Address */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="md:col-span-2">
              <Card className="bg-white border-[#0D140B]/10 hover:border-[#00C725]/30 transition-all duration-300">
                <CardHeader className="border-b border-[#0D140B]/5 bg-gray-50/50">
                  <CardTitle className="text-sm font-editorial-serif italic flex items-center gap-2">
                    <MapPin size={16} className="text-[#00C725]" /> Shop Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-[#E3E0D8] rounded-xl self-start">
                      <MapPin size={24} className="text-[#3B5238]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] uppercase tracking-widest text-[#3B5238]/60 font-bold">Official Business Address</p>
                      <p className="text-base text-[#0D140B] leading-relaxed max-w-lg">
                        {sellerDetails.address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F2F0EA;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0D140B;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #224229;
        }
      `}</style>
    </div>
  );
}
