"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  MapPin, 
  FileText, 
  Camera, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Upload,
  Loader2,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadInput } from "../../../../components/ImageUpload";
import { CameraCapture } from "../../../../components/CameraCapture";
import axios from "@/lib/axios";
import { toast } from "sonner";

const kycSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  shopName: z.string().min(2, "Shop name is too short"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().email("Invalid email"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Invalid pincode"),
  country: z.string().min(2, "Country is required"),
  idType: z.string().min(1, "Select ID type"),
  idFront: z.string().min(1, "Front image is required"),
  idBack: z.string().min(1, "Back image is required"),
  gstNumber: z.string().optional(),
  selfie: z.string().min(1, "Selfie is required"),
});

type KycFormData = z.infer<typeof kycSchema>;

const STEPS = [
  { id: 1, title: "Identity", icon: User },
  { id: 2, title: "Address", icon: MapPin },
  { id: 3, title: "Documents", icon: FileText },
  { id: 4, title: "Verification", icon: Camera },
];

export default function KycOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const methods = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      name: user?.name || "",
      shopName: user?.shopName || "",
      phone: user?.phone || "",
      email: user?.email || "",
      street: (user?.address as any)?.street || "",
      city: (user?.address as any)?.city || "",
      state: (user?.address as any)?.state || "",
      pincode: (user?.address as any)?.pincode || "",
      country: (user?.address as any)?.country || "India",
      idType: "Aadhar Card",
      gstNumber: user?.gstNumber || "",
    },
  });

  const { handleSubmit, watch, setValue, trigger, reset, formState: { errors } } = methods;

  useEffect(() => {
    if (user) {
      const addr = user.address as any;
      reset({
        name: user.name || "",
        shopName: user.shopName || "",
        phone: user.phone || "",
        email: user.email || "",
        street: addr?.street || "",
        city: addr?.city || "",
        state: addr?.state || "",
        pincode: addr?.pincode || "",
        country: addr?.country || "India",
        idType: "Aadhar Card",
        gstNumber: user.gstNumber || "",
      });
    }
  }, [user, reset]);

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 1) fieldsToValidate = ["name", "shopName", "phone", "email"];
    if (currentStep === 2) fieldsToValidate = ["street", "city", "state", "pincode", "country"];
    if (currentStep === 3) fieldsToValidate = ["idFront", "idBack", "idType"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleBackendUpload = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post("/kyc/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.url;
    } catch (error: any) {
      toast.error("Upload failed: " + (error.response?.data?.message || error.message));
      throw error;
    }
  };

  const onSubmit = async (data: KycFormData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/kyc/submit", {
        ...data,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          country: data.country,
        },
        kycDetails: {
          idType: data.idType,
          idFront: data.idFront,
          idBack: data.idBack,
          selfie: data.selfie,
        }
      });
      
      if (response.data.success) {
        toast.success("KYC Submitted Successfully!");
        setUser(response.data.seller);
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error("Submission failed: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f09] text-[#f2f0ea] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#00c725]/10 rounded-2xl flex items-center justify-center border border-[#00c725]/20">
              <ShieldCheck className="text-[#00c725]" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-editorial-serif tracking-tight">Seller Verification</h1>
              <p className="text-[#f2f0ea]/40 text-sm font-medium">Complete your onboarding to start selling</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
             {STEPS.map((step) => (
               <div key={step.id} className="flex items-center">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                   currentStep >= step.id ? "bg-[#00c725] text-[#0a0f09]" : "bg-white/5 text-[#f2f0ea]/20 border border-white/10"
                 }`}>
                   {currentStep > step.id ? <CheckCircle2 size={16} /> : step.id}
                 </div>
                 {step.id !== STEPS.length && (
                   <div className={`w-12 h-[2px] mx-2 rounded-full transition-all duration-500 ${
                     currentStep > step.id ? "bg-[#00c725]" : "bg-white/5"
                   }`} />
                 )}
               </div>
             ))}
          </div>
        </div>

        {/* Form Area */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00c725]/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
          
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
              <AnimatePresence mode="wait">
                {/* STEP 1: IDENTITY */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label className="text-[#f2f0ea]/60 ml-1">Full Name</Label>
                        <Input {...methods.register("name")} className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-[#00c725]/50 focus:ring-[#00c725]/20" />
                        {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#f2f0ea]/60 ml-1">Business Name</Label>
                        <Input {...methods.register("shopName")} className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-[#00c725]/50 focus:ring-[#00c725]/20" />
                        {errors.shopName && <p className="text-red-400 text-xs mt-1 ml-1">{errors.shopName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#f2f0ea]/60 ml-1">Phone Number</Label>
                        <Input {...methods.register("phone")} className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-[#00c725]/50 focus:ring-[#00c725]/20" />
                        {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#f2f0ea]/60 ml-1">Email Address</Label>
                        <Input {...methods.register("email")} className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-[#00c725]/50 focus:ring-[#00c725]/20" />
                        {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: ADDRESS */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-[#f2f0ea]/60 ml-1">Street Address</Label>
                        <Input {...methods.register("street")} placeholder="Building, Street, Area" className="bg-white/5 border-white/10 h-14 rounded-xl" />
                        {errors.street && <p className="text-red-400 text-xs mt-1 ml-1">{errors.street.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#f2f0ea]/60 ml-1">City</Label>
                        <Input {...methods.register("city")} placeholder="City Name" className="bg-white/5 border-white/10 h-14 rounded-xl" />
                        {errors.city && <p className="text-red-400 text-xs mt-1 ml-1">{errors.city.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#f2f0ea]/60 ml-1">State</Label>
                        <Input {...methods.register("state")} placeholder="State" className="bg-white/5 border-white/10 h-14 rounded-xl" />
                        {errors.state && <p className="text-red-400 text-xs mt-1 ml-1">{errors.state.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#f2f0ea]/60 ml-1">Pincode</Label>
                        <Input {...methods.register("pincode")} placeholder="6-digit code" className="bg-white/5 border-white/10 h-14 rounded-xl" />
                        {errors.pincode && <p className="text-red-400 text-xs mt-1 ml-1">{errors.pincode.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#f2f0ea]/60 ml-1">Country</Label>
                        <Input {...methods.register("country")} className="bg-white/5 border-white/10 h-14 rounded-xl" />
                        {errors.country && <p className="text-red-400 text-xs mt-1 ml-1">{errors.country.message}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: DOCUMENTATION */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <Label className="text-[#f2f0ea]/60">Select Identity Document</Label>
                        <select 
                          {...methods.register("idType")}
                          className="w-full bg-white/5 border border-white/10 h-14 rounded-xl px-4 outline-none focus:border-[#00c725]/50"
                        >
                          <option value="Aadhar Card">Aadhar Card</option>
                          <option value="PAN Card">PAN Card</option>
                          <option value="Voter ID">Voter ID</option>
                          <option value="Driving License">Driving License</option>
                        </select>
                        
                        <div className="space-y-2">
                           <Label className="text-[#f2f0ea]/60">GST Number (Optional)</Label>
                           <Input {...methods.register("gstNumber")} placeholder="22AAAAA0000A1Z5" className="bg-white/5 border-white/10 h-14 rounded-xl" />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                          <ImageUploadInput 
                            name="idFront" 
                            label="ID Front View" 
                            onUpload={handleBackendUpload}
                          />
                          <ImageUploadInput 
                            name="idBack" 
                            label="ID Back View" 
                            onUpload={handleBackendUpload}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: VERIFICATION */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 text-center"
                  >
                    <div className="max-w-md mx-auto space-y-6">
                      <div className="p-4 bg-[#00c725]/10 rounded-2xl border border-[#00c725]/20 text-[#00c725] flex items-center gap-3 text-left">
                        <AlertCircle size={24} />
                        <p className="text-xs font-bold leading-tight uppercase tracking-wider">
                          Live Selfie Required: Please look directly into the camera for live face verification.
                        </p>
                      </div>
                      
                      <CameraCapture 
                        initialValue={watch("selfie")}
                        onCapture={async (blob) => {
                          const url = await handleBackendUpload(blob);
                          setValue("selfie", url);
                        }}
                        onClear={() => setValue("selfie", "")}
                      />
                      {errors.selfie && <p className="text-red-400 text-sm font-bold">{errors.selfie.message}</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 1 || isSubmitting}
                  className="h-14 px-8 rounded-xl text-[#f2f0ea]/40 hover:text-[#f2f0ea] hover:bg-white/5"
                >
                  <ChevronLeft className="mr-2" /> Back
                </Button>

                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="h-14 px-10 rounded-xl bg-[#00c725] text-[#0a0f09] font-bold hover:bg-[#00e02a] transition-all transform active:scale-95"
                  >
                    Next Step <ChevronRight className="ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 px-12 rounded-xl bg-[#00c725] text-[#0a0f09] font-bold hover:bg-[#00e02a] transition-all shadow-[0_0_40px_rgba(0,199,37,0.3)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Complete Verification"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
