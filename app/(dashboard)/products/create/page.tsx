"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CreateProductPage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  return (
    <div className="min-h-full bg-[#E3E0D8] p-8 lg:p-12 font-sans selection:bg-[#00C725] selection:text-[#0D140B]">
      {/* Top Nav */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex items-center justify-between"
      >
        <Link
          href="/products/list"
          className="group flex items-center gap-2 text-[#3B5238] hover:text-[#0D140B] transition-colors"
        >
          <div className="p-2 border border-[#0D140B] rounded-full group-hover:bg-[#00C725]/20 group-hover:-translate-x-1 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium tracking-wide">Back to Catalog</span>
        </Link>
        <div className="flex items-center gap-2 text-[#00C725] text-xs uppercase tracking-widest font-bold">
          <CheckCircle2 size={14} /> Auto-saving draft
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24">
        {/* Left Column: Context / Beautiful Static Copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="xl:col-span-4"
        >
          <div className="sticky top-12">
            <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#0D140B] leading-tight mb-6">
              The Botanist's Log
            </h1>
            <p className="text-[#3B5238] leading-relaxed mb-8">
              Documenting a new specimen requires precise taxonomic details and high-fidelity imagery. Ensure all attributes are correctly classified for the storefront.
            </p>
            
            <div className="bg-[#00C725]/20 border-l-2 border-[#00C725] p-6 text-sm text-[#0D140B] italic font-editorial-serif leading-loose">
              "A plant's presentation is just as vital as its cultivation. Photograph in indirect, bright light and describe its true variegated patterns."
            </div>

            <div className="mt-12 space-y-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#3B5238] mb-2">Required Fields</h4>
                <ul className="text-sm text-[#0D140B] space-y-2">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00C725]"></div> Specimen Name</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00C725]"></div> Scientific Classification</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00C725]"></div> Value (Price)</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Form Fields */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="xl:col-span-8 flex flex-col gap-10 lg:pl-10 lg:border-l border-[#0D140B]"
        >
          {/* Identity Section */}
          <section>
            <h2 className="text-2xl font-editorial-serif text-[#0D140B] mb-6">01. Specimen Identity</h2>
            <div className="space-y-8">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#3B5238] mb-2">Common Name</label>
                <input
                  type="text"
                  placeholder="e.g. Monstera Albo Borsigiana"
                  className="w-full bg-transparent border-0 border-b-2 border-[#0D140B] pb-2 text-xl md:text-2xl text-[#0D140B] font-editorial-serif focus:ring-0 focus:border-[#00C725] transition-colors placeholder:text-[#3B5238] px-0"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#3B5238] mb-2">Scientific Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Monstera deliciosa"
                    className="w-full bg-transparent border-0 border-b-2 border-[#0D140B] pb-2 text-base text-[#0D140B] italic focus:ring-0 focus:border-[#00C725] transition-colors placeholder:text-[#3B5238] px-0"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#3B5238] mb-2">SKU ID</label>
                  <input
                    type="text"
                    placeholder="HT-MON-ALB"
                    className="w-full bg-transparent border-0 border-b-2 border-[#0D140B] pb-2 text-base font-mono text-[#0D140B] focus:ring-0 focus:border-[#00C725] transition-colors placeholder:text-[#3B5238] px-0"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Media Section */}
          <section>
            <h2 className="text-2xl font-editorial-serif text-[#0D140B] mb-6">02. Visuals</h2>
            <div
              className={`border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-hidden bg-[#fffafa] ${
                dragActive ? "border-[#00C725] bg-[#00C725]/5" : "border-[#0D140B]"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C725]/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00C725]/10 rounded-full blur-3xl"></div>
              
              <div className="p-4 bg-[#F2F0EA] shadow-sm border border-[#0D140B] -rotate-2 mb-6">
                <UploadCloud size={32} className="text-[#00C725] stroke-[1.5px]" />
              </div>
              <p className="font-editorial-serif text-xl text-[#0D140B] mb-2">Upload Visual Profile</p>
              <p className="text-xs text-[#3B5238] tracking-wide mb-6">Drag and drop high-res imagery, or click to browse</p>
              
              <button className="px-5 py-2 border border-[#0D140B] text-[#0D140B] text-xs font-bold uppercase tracking-widest hover:bg-[#0D140B] hover:text-white transition-colors">
                Select Files
              </button>
            </div>
            {files.length > 0 && (
              <div className="flex gap-4 mt-6 overflow-x-auto pb-4">
                {files.map((f, i) => (
                  <div key={i} className="relative w-24 h-24 bg-gray-100 border border-[#0D140B] shrink-0 p-1 flex flex-col justify-end">
                    <button className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 border border-white shadow-sm hover:scale-110 transition-transform">
                      <X size={12} />
                    </button>
                    <p className="text-[9px] font-mono truncate text-[#3B5238] bg-[#F2F0EA]/80 p-1">{f.name}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Classification & Economics */}
          <section>
            <h2 className="text-2xl font-editorial-serif text-[#0D140B] mb-6">03. Classification & Economics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="flex flex-col">
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#3B5238] mb-2">Category</label>
                  <select className="w-full bg-transparent border-0 border-b-2 border-[#0D140B] pb-2 text-base text-[#0D140B] focus:ring-0 focus:border-[#00C725] transition-colors px-0 cursor-pointer appearance-none">
                    <option value="" disabled selected>Select taxonomy...</option>
                    <option value="rare">Rare Aroids</option>
                    <option value="interior">Interior Trees</option>
                    <option value="foliage">Foliage Plants</option>
                  </select>
               </div>
               <div className="flex flex-col">
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#3B5238] mb-2">Type</label>
                  <select className="w-full bg-transparent border-0 border-b-2 border-[#0D140B] pb-2 text-base text-[#0D140B] focus:ring-0 focus:border-[#00C725] transition-colors px-0 cursor-pointer appearance-none">
                    <option value="" disabled selected>Select class...</option>
                    <option value="variegated">Variegated</option>
                    <option value="flowering">Flowering</option>
                    <option value="succulent">Succulent</option>
                  </select>
               </div>
               <div className="flex flex-col">
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#3B5238] mb-2">Value (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 12500"
                    className="w-full bg-transparent border-0 border-b-2 border-[#0D140B] pb-2 text-xl font-editorial-serif text-[#0D140B] focus:ring-0 focus:border-[#00C725] transition-colors placeholder:text-[#3B5238] px-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
               </div>
            </div>
            
            <div className="mt-8">
                <label className="block text-xs uppercase tracking-widest font-bold text-[#3B5238] mb-4">Detailed Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe the specimen's unique characteristics, care requirements, and historical background..."
                  className="w-full bg-[#F2F0EA] border border-[#0D140B] p-4 text-base text-[#0D140B] focus:ring-0 focus:outline-none focus:border-[#00C725] transition-colors placeholder:text-[#3B5238]/60 resize-none shadow-inner"
                ></textarea>
            </div>
          </section>

          {/* Action Footer */}
          <div className="pt-8 border-t border-[#0D140B] flex justify-end gap-4 mt-4">
             <button className="px-6 py-3 text-[#3B5238] text-sm font-bold uppercase tracking-widest hover:text-[#0D140B] transition-colors">
                Save Draft
             </button>
             <button className="group relative inline-flex items-center justify-center px-10 py-3 bg-[#0D140B] text-[#E3E0D8] overflow-hidden rounded-none shadow-[4px_4px_0px_#0D140B] hover:shadow-[2px_2px_0px_#0D140B] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
                <div className="absolute inset-0 w-0 bg-[#00C725] transition-all duration-300 ease-out group-hover:w-full"></div>
                <span className="relative font-bold text-sm tracking-widest uppercase">
                  Publish Specimen
                </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
