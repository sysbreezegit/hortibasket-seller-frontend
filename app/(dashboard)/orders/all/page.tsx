"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search, ChevronDown, Package } from "lucide-react";

const ORDERS_DB = [
  { id: "ORD-9482", customer: "Eleanor Vance", supplier: "GreenHouse Co.", items: 3, value: "₹4,200", status: "Processing", date: "Today, 10:42 AM", payment: "Paid" },
  { id: "ORD-9481", customer: "Arthur Pendelton", supplier: "Botanical Rare", items: 1, value: "₹1,850", status: "Dispatched", date: "Today, 09:15 AM", payment: "Pending" },
  { id: "ORD-9480", customer: "Clara Hughes", supplier: "Aroid Central", items: 12, value: "₹12,500", status: "Delivered", date: "Yesterday, 16:30 PM", payment: "Paid" },
  { id: "ORD-9479", customer: "Marcus Thorne", supplier: "GreenHouse Co.", items: 1, value: "₹850", status: "Processing", date: "Yesterday, 14:20 PM", payment: "Paid" },
  { id: "ORD-9478", customer: "Sophie Laurent", supplier: "Desert Blooms", items: 5, value: "₹2,300", status: "Cancelled", date: "Oct 12, 11:00 AM", payment: "Refunded" },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-full bg-[#E3E0D8] p-8 lg:p-12 font-sans selection:bg-[#00C725] selection:text-[#0D140B]">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
      >
        <div>
          <p className="text-[#00C725] font-mono text-xs uppercase tracking-[0.2em] mb-2 font-semibold">
            Fulfillment Management
          </p>
          <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#0D140B] tracking-tight leading-tight">
            Marketplace Orders
          </h1>
          <p className="text-[#3B5238] mt-2 text-sm md:text-base max-w-xl pr-4">
            Oversee all cross-supplier transactions and patron purchases.
          </p>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
         <div className="flex border border-[#0D140B] bg-[#F2F0EA] w-full md:max-w-md items-center px-4 py-2 hover:border-[#0D140B] transition-colors focus-within:border-[#00C725]">
            <Search size={16} className="text-[#3B5238]" />
            <input 
               type="text" 
               placeholder="Search patron, ID, or supplier..." 
               className="bg-transparent border-0 focus:ring-0 text-sm text-[#0D140B] w-full ml-2 placeholder:text-[#3B5238]/50"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <div className="flex gap-4 w-full md:w-auto">
            <button className="flex items-center justify-between w-full md:w-auto gap-4 border border-[#0D140B] bg-[#F2F0EA] px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-[#0D140B]">
              Filter by Status <Filter size={14} />
            </button>
            <button className="flex items-center justify-between w-full md:w-auto gap-4 border border-[#0D140B] bg-[#F2F0EA] px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-[#0D140B]">
              Export CSV <ChevronDown size={14} />
            </button>
         </div>
      </div>

      {/* Heavy Order Table */}
      <div className="bg-[#F2F0EA] border border-[#0D140B] shadow-[4px_4px_0px_#0D140B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#0D140B] text-[10px] uppercase tracking-widest font-mono text-[#0D140B] bg-[#E3E0D8]">
                <th className="p-5 font-bold">Order ID</th>
                <th className="p-5 font-bold">Date & Time</th>
                <th className="p-5 font-bold">Patron</th>
                <th className="p-5 font-bold">Vendor/Supplier</th>
                <th className="p-5 font-bold text-center">Items</th>
                <th className="p-5 font-bold">Value</th>
                <th className="p-5 font-bold">Payment</th>
                <th className="p-5 font-bold text-right">Fulfillment</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS_DB.map((order, i) => (
                <tr key={order.id} className="border-b border-[#0D140B] hover:bg-[#00C725]/5 transition-colors group">
                  <td className="p-5 text-sm font-mono text-[#0D140B] font-semibold flex items-center gap-3">
                     <Package size={16} className="text-[#3B5238] group-hover:text-[#00C725] transition-colors" />
                     {order.id}
                  </td>
                  <td className="p-5 text-xs text-[#3B5238] font-mono">{order.date}</td>
                  <td className="p-5 text-sm font-editorial-serif text-[#0D140B]">{order.customer}</td>
                  <td className="p-5 text-xs text-[#0D140B]"><span className="bg-[#00C725]/20 px-2 py-1 border border-[#0D140B]">{order.supplier}</span></td>
                  <td className="p-5 text-sm font-mono text-[#3B5238] text-center">{order.items}</td>
                  <td className="p-5 text-sm font-bold text-[#00C725]">{order.value}</td>
                  <td className="p-5 text-[10px] uppercase tracking-widest font-bold">
                     <span className={order.payment === 'Paid' ? 'text-[#00C725]' : order.payment === 'Refunded' ? 'text-[#e55c5c]' : 'text-[#e4a11b]'}>
                        {order.payment}
                     </span>
                  </td>
                  <td className="p-5 text-right">
                    <span className={`inline-flex items-center px-3 py-1 border text-[10px] uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'border-[#00C725] text-[#00C725] bg-[#00C725]/10' : 
                      order.status === 'Processing' ? 'border-[#e4a11b] text-[#e4a11b] bg-[#e4a11b]/10' : 
                      order.status === 'Cancelled' ? 'border-[#e55c5c] text-[#e55c5c] bg-[#e55c5c]/10' :
                      'border-[#3B5238] text-[#3B5238] bg-[#00C725]/10'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
