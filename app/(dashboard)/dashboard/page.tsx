"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, ShoppingBag, Store, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

const STATS = [
  { label: "Total Revenue", value: "₹4,25,000", trend: "+12.5%", isPositive: true, icon: TrendingUp },
  { label: "Pending Orders", value: "38", trend: "-2", isPositive: false, icon: ShoppingBag },
  { label: "Total Orders", value: "1,240", trend: "+8.2%", isPositive: true, icon: ShoppingBag },
  { label: "Growth Rate", value: "24%", trend: "+5.4%", isPositive: true, icon: TrendingUp },
];

const RECENT_ORDERS = [
  { id: "ORD-9482", customer: "Eleanor Vance", value: "₹4,200", status: "Processing", date: "Today, 10:42 AM" },
  { id: "ORD-9481", customer: "Arthur Pendelton", value: "₹1,850", status: "Dispatched", date: "Today, 09:15 AM" },
  { id: "ORD-9480", customer: "Clara Hughes", value: "₹12,500", status: "Delivered", date: "Yesterday, 16:30 PM" },
  { id: "ORD-9479", customer: "Marcus Thorne", value: "₹850", status: "Processing", date: "Yesterday, 14:20 PM" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-full bg-[#E3E0D8] p-8 lg:p-12 font-sans selection:bg-[#00C725] selection:text-[#0D140B]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
        <p className="text-[#00C725] font-mono text-xs uppercase tracking-[0.2em] mb-2 font-semibold">HQ Overview</p>
        <h1 className="text-4xl md:text-5xl font-editorial-serif text-[#0D140B] tracking-tight leading-tight">
          Executive Dashboard
        </h1>
        <p className="text-[#3B5238] mt-2 text-sm max-w-xl">
          Complete pulse of your botanical marketplace operations. Monitor sales, order performance, and growth.
        </p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-[#F2F0EA] border border-[#0D140B] p-6 flex flex-col justify-between hover:border-[#0D140B] transition-colors relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={48} className="text-[#0D140B]" />
             </div>
            
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#3B5238] mb-4">{stat.label}</p>
            <h3 className="text-3xl font-editorial-serif text-[#0D140B] mb-4">{stat.value}</h3>
            
            <div className="flex items-center gap-2 pt-4 border-t border-[#0D140B] mt-auto">
               <span className={`flex items-center text-[10px] font-bold font-mono ${stat.isPositive ? 'text-[#00C725]' : 'text-[#e55c5c]'}`}>
                 {stat.isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                 {stat.trend}
               </span>
               <span className="text-[10px] text-[#3B5238] uppercase tracking-widest">vs Last Week</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom Analytics CSS Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12 bg-[#F2F0EA] border border-[#0D140B] shadow-[4px_4px_0px_#0D140B] p-8 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
           <div>
             <h2 className="text-xs uppercase tracking-widest font-mono text-[#00C725] mb-2 font-bold">Performance Analytics</h2>
             <h3 className="font-editorial-serif text-3xl md:text-4xl text-[#0D140B]">Platform Revenue Trajectory</h3>
           </div>
           <div className="flex gap-6 mt-6 md:mt-0 pb-2">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-[#0D140B]"></div>
                 <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B5238]">Gross Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-[#00C725]/60 border border-[#0D140B]"></div>
                 <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B5238]">Storefront Traffic</span>
              </div>
           </div>
        </div>

        {/* Chart Canvas */}
        <div className="relative w-full h-[350px] sm:h-[450px] pl-0 sm:pl-10 pb-10">
           
           {/* Y-Axis Grid */}
           <div className="absolute inset-0 pl-0 sm:pl-10 pb-10 flex flex-col justify-between pointer-events-none z-0">
              {[4, 3, 2, 1, 0].map((line, idx) => (
                 <div key={idx} className="w-full border-t border-dashed border-[#0D140B] flex-1 relative">
                    <span className="absolute -left-10 top-[-8px] text-[10px] font-mono text-[#3B5238] hidden sm:block">
                       {(line * 50).toString() + "K"}
                    </span>
                 </div>
              ))}
           </div>
           
           {/* Bars Container */}
           <div className="w-full h-full flex items-end justify-between gap-1 sm:gap-3 lg:gap-6 relative z-10 border-b border-[#0D140B]">
             {[
               { month: "Jan", revenue: 45, traffic: 60 },
               { month: "Feb", revenue: 52, traffic: 65 },
               { month: "Mar", revenue: 38, traffic: 45 },
               { month: "Apr", revenue: 65, traffic: 80 },
               { month: "May", revenue: 85, traffic: 95 },
               { month: "Jun", revenue: 72, traffic: 85 },
               { month: "Jul", revenue: 90, traffic: 110 },
               { month: "Aug", revenue: 115, traffic: 130 },
               { month: "Sep", revenue: 105, traffic: 125 },
               { month: "Oct", revenue: 140, traffic: 160 },
               { month: "Nov", revenue: 165, traffic: 180 },
               { month: "Dec", revenue: 210, traffic: 240 },
             ].map((data, i) => (
               <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  
                  {/* Hover Tooltip */}
                  <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0D140B] text-[#E3E0D8] p-3 pointer-events-none shadow-lg whitespace-nowrap z-30 flex flex-col items-center">
                     <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-[#3B5238]">{data.month} 2024</p>
                     <p className="text-sm font-editorial-serif">₹{data.revenue},000</p>
                     <div className="absolute -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-[#0D140B]"></div>
                  </div>
                  
                  {/* Traffic Envelope Bar */}
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: `${(data.traffic / 250) * 100}%` }} transition={{ delay: 0.4 + (i * 0.05), duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-[48px] bg-[#00C725]/30 flex items-end justify-center relative hover:bg-[#00C725]/60 transition-colors border-x border-t border-[#0D140B]"
                  >
                     {/* Revenue Solid Bar */}
                     <motion.div 
                       initial={{ height: 0 }} animate={{ height: `${(data.revenue / data.traffic) * 100}%` }} transition={{ delay: 0.8 + (i * 0.05), duration: 0.6 }}
                       className="w-full bg-[#0D140B] hover:bg-[#00C725] transition-colors"
                     />
                  </motion.div>
                  
                  {/* X-Axis Label */}
                  <div className="absolute -bottom-8 w-full text-center">
                     <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#3B5238]">
                        {data.month}
                     </span>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-3 bg-[#F2F0EA] border border-[#0D140B]">
           <div className="p-6 border-b border-[#0D140B] flex justify-between items-center bg-[#E3E0D8]">
              <h2 className="text-xl font-editorial-serif text-[#0D140B]">Recent Marketplace Orders</h2>
              <a href="/orders/all" className="text-[10px] uppercase font-bold tracking-widest text-[#00C725] hover:text-[#0D140B] transition-colors">View All</a>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-[#0D140B] text-[10px] uppercase tracking-widest font-mono text-[#3B5238]">
                       <th className="p-4 font-normal">Order ID</th>
                       <th className="p-4 font-normal">Patron</th>
                       <th className="p-4 font-normal">Amount</th>
                       <th className="p-4 font-normal">Status</th>
                    </tr>
                 </thead>
                 <tbody>
                    {RECENT_ORDERS.map((order, i) => (
                       <tr key={order.id} className="border-b border-[#0D140B] hover:bg-[#00C725]/5 transition-colors">
                          <td className="p-4 text-sm font-mono text-[#0D140B]">{order.id}</td>
                          <td className="p-4 text-sm font-editorial-serif text-[#0D140B]">{order.customer}</td>
                          <td className="p-4 text-sm font-bold text-[#00C725]">{order.value}</td>
                          <td className="p-4 text-sm text-[#3B5238]">
                             <span className={`inline-flex items-center px-2 py-0.5 border text-[10px] uppercase tracking-widest ${
                                order.status === 'Delivered' ? 'border-[#00C725] text-[#00C725] bg-[#00C725]/10' : 
                                order.status === 'Processing' ? 'border-[#e4a11b] text-[#e4a11b] bg-[#e4a11b]/10' : 
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
        </motion.div>
      </div>
    </div>
  );
}
