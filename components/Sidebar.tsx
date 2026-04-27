"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  ChevronDown,
  ChevronUp,
  AlignLeft,
  ChevronRight,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navigation } from "../lib/SidebarItems";
import { useAuthStore } from "../store/AuthStore";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggle,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const [optimisticPath, setOptimisticPath] = useState<string | null>(null);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  function checkPermission(navItem: any): boolean {
    return true;
  }

  const filteredNavigation = navigation
    .filter((item) => checkPermission(item))
    .map((item) => ({
      ...item,
      children: item.children
        ? item.children.filter((child: any) => checkPermission(child))
        : [],
    }));

  const activePath = optimisticPath || pathname;

  const isItemActive = (item: any) => {
    if (activePath === item.href) return true;
    if (item.href && item.href !== '#') {
      return activePath.startsWith(item.href);
    }
    if (item.children && item.children.length > 0) {
      return item.children.some((child: any) => isChildActive(child));
    }
    return false;
  };

  const isChildActive = (child: any) => activePath === child.href;

  useEffect(() => {
    setOptimisticPath(null); // Clear optimistic selection when real navigation completes
    
    const activeParents = navigation
      .filter((item) => {
        if (item.children) {
          return item.children.some((child: any) => isChildActive(child));
        }
        return false;
      })
      .map((item) => item.name);

    if (activeParents.length > 0) {
      setExpandedItems(activeParents);
    }
  }, [pathname]);

  const toggleExpanded = (itemName: string) => {
    if (isCollapsed) onToggle();
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const handleNavigation = (item: any, isMobile = false) => {
    if (item.href && item.href !== '#') {
      setOptimisticPath(item.href); // Immediately highlight the item
      router.push(item.href);
      if (isMobile) onClose();
    }
  };

  const renderNavItem = (item: any, isMobile = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.name);
    const isActive = isItemActive(item);
    const hasValidHref = item.href && item.href !== '#';

    return (
      <div key={item.name} className="relative group/item mb-1 z-10 w-full overflow-hidden">
        
        {/* Active item edge-to-edge gradient */}
        {isActive && !isCollapsed && (
          <motion.div
            layoutId="active-bg"
            className="absolute inset-0 z-0 bg-gradient-to-r from-[#00C725]/15 via-[#00C725]/5 to-transparent border-l-[3px] border-[#00C725]"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        
        {/* Active indicator dot when collapsed */}
        {isActive && isCollapsed && (
          <motion.div
            layoutId="active-dot"
            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00C725] z-20"
            transition={{ type: "spring" }}
          />
        )}

        <Button
          variant="ghost"
          className={cn(
            "w-full h-[46px] bg-transparent hover:bg-transparent relative z-10",
            "transition-all duration-300 font-sans tracking-[0.02em] font-medium flex items-center shadow-none",
            isCollapsed && !isMobile
              ? "justify-center px-0 w-full"
              : "justify-start gap-[16px] px-5",
            isActive ? "text-[#0D140B]" : "text-[#3B5238] hover:text-[#0D140B]",
            !hasValidHref && !hasChildren && "cursor-default opacity-50"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.name);
            } else if (hasValidHref) {
              handleNavigation(item, isMobile);
            }
          }}
        >
          <span className="sr-only">{item.name}</span>
          
          <motion.div 
            animate={{ x: isActive ? 4 : 0 }} 
            whileHover={{ x: 4 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="flex items-center shrink-0"
          >
            <item.icon className={cn(
              "shrink-0 transition-colors duration-300", 
              isCollapsed && !isMobile ? "h-[22px] w-[22px]" : "h-[18px] w-[18px]",
              isActive ? "text-[#00C725] stroke-[2px]" : "text-[#3B5238]/80 group-hover/item:text-[#00C725] stroke-[1.5px]"
            )} />
          </motion.div>
          
          {(!isCollapsed || isMobile) && (
            <>
              <motion.span 
                 animate={{ x: isActive ? 4 : 0 }} 
                 whileHover={{ x: 4 }}
                 transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                 className="flex-1 text-left truncate text-[14px]"
              >
                {item.name}
              </motion.span>
              
              {hasChildren && (
                <div className={cn("shrink-0 transition-all duration-300", isActive ? "text-[#00C725]" : "text-[#3B5238]")}>
                  {isExpanded ? (
                    <ChevronUp className="h-[14px] w-[14px] stroke-[1.5px]" />
                  ) : (
                    <ChevronDown className="h-[14px] w-[14px] stroke-[1.5px]" />
                  )}
                </div>
              )}
            </>
          )}

          {/* Minimal Tooltip when Collapsed */}
          {isCollapsed && !isMobile && (
            <div className="absolute left-[72px] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible bg-[#0D140B] border border-[#0D140B] rounded-[4px] px-3 py-1.5 text-[12px] text-[#ece2b1] font-sans tracking-wide uppercase whitespace-nowrap z-[999] transition-all duration-300 pointer-events-none -translate-x-2 group-hover/item:translate-x-0 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
              {item.name}
            </div>
          )}
        </Button>

        {/* Child Menu Animation */}
        <AnimatePresence initial={false}>
          {hasChildren && isExpanded && (!isCollapsed || isMobile) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden bg-[#E3E0D8] relative z-0 shadow-inner"
            >
              <div className="absolute left-[29px] top-0 bottom-6 w-[1px] bg-[#00C725] z-0"></div>
              
              <div className="pt-2 pb-4 space-y-1 relative z-10">
                {item.children.map((child: any) => {
                  const isChildActiveState = isChildActive(child);
                  return (
                    <Button
                      key={child.name}
                      variant="ghost"
                      className={cn(
                        "w-full h-[36px] justify-start gap-[16px] pl-[29px] text-[13px] bg-transparent hover:bg-transparent shadow-none",
                        "transition-all duration-400 font-sans tracking-[0.01em] font-medium",
                        isChildActiveState
                          ? "text-[#0D140B]"
                          : "text-[#3B5238] hover:text-[#0D140B]"
                      )}
                      onClick={() => handleNavigation(child, isMobile)}
                    >
                      <div className={cn(
                        "w-[6px] h-[1px] shrink-0 transition-all duration-300", 
                        isChildActiveState ? "bg-[#00C725] w-[12px] -ml-[3px]" : "bg-[#00C725] group-hover:bg-[#00C725]"
                      )} />
                      
                      <span className={cn(
                        "truncate transition-transform duration-300",
                        isChildActiveState ? "translate-x-1 font-semibold" : "group-hover:translate-x-1"
                      )}>
                        {child.name}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap');
        
        .font-editorial-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        
        .sidebar-scroll::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>
      
      {/* Desktop sidebar */}
      <motion.div
        animate={{ width: isCollapsed ? 80 : 240 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 z-40 bg-[#F2F0EA] border-r border-[#0D140B]",
          "shadow-[5px_0_30px_rgba(37,66,34,0.03)]"
        )}
      >
        <div className="flex flex-col h-full relative z-10 mt-2">
          
          <div className={cn("flex items-center min-h-[90px]", isCollapsed ? "justify-center" : "justify-between pl-6 pr-4")}>
            <div className="flex items-center gap-0">
              <AnimatePresence mode="wait">
                {!isCollapsed ? (
                  <motion.div
                    key="full-logo"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col cursor-pointer"
                  >
                     <span className="font-editorial-serif italic text-[22px] tracking-tight text-[#0D140B] leading-none">
                      Hortibasket
                     </span>
                     <span className="font-sans uppercase text-[7.5px] tracking-[0.2em] text-[#00C725] mt-[4px] font-semibold">
                       Botanical Market
                     </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mini-logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-12 h-12 flex items-center justify-center cursor-pointer"
                    onClick={onToggle}
                  >
                    <span className="font-editorial-serif italic text-[32px] text-[#0D140B]">H</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="h-[36px] w-[36px] text-[#3B5238]/60 hover:text-[#0D140B] hover:bg-[#00C725]/20 rounded-full transition-all flex-shrink-0"
              >
                <AlignLeft className="h-[18px] w-[18px] stroke-[1.5px]" />
              </Button>
            )}
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00C725] to-transparent shrink-0 opacity-40 mb-6"></div>

          <nav className="flex-1 overflow-y-auto sidebar-scroll pb-10 flex flex-col">
            {filteredNavigation.map((item) => (
              <div key={item.name}>
                 {renderNavItem(item)}
              </div>
            ))}
          </nav>

          <div className="shrink-0 p-5 pt-4 mt-auto">
             {!isCollapsed ? (
               <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 group cursor-pointer p-2 -m-2 rounded-lg hover:bg-[#00C725]/20 transition-colors">
                   <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0 border border-[#0D140B]">
                     <img 
                       src={user?.avatar || "https://images.unsplash.com/photo-1594834749740-74b3f66ffaeb?q=80&w=150&auto=format&fit=crop"} 
                       alt="User" 
                       className="w-full h-full object-cover grayscale transition-all duration-500"
                     />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-[13px] font-sans text-[#0D140B] font-semibold truncate tracking-wide">
                       {user?.name || "Eleanor Hughes"}
                     </p>
                     <p className="text-[11px] font-sans text-[#3B5238] font-medium truncate">
                       {user?.email || "admin@hortibasket.com"}
                     </p>
                   </div>
                 </div>
                 
                 <Button
                    onClick={() => {
                      useAuthStore.getState().logout();
                      router.push("/login");
                    }}
                    variant="ghost"
                    className="w-full h-[40px] bg-[#F2F0EA] border border-[#0D140B] hover:bg-[#00C725]/20 hover:border-[#00C725]/40 text-[#3B5238] hover:text-[#0D140B] justify-start gap-[10px] px-4 font-sans text-[11px] uppercase tracking-widest font-bold transition-all duration-300"
                  >
                    <LogOut className="h-[14px] w-[14px] stroke-[1.5px]" />
                    <span className="translate-y-[1px]">Sign Out</span>
                 </Button>
               </div>
             ) : (
                <div className="flex flex-col items-center gap-6">
                  <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0 border border-[#0D140B] opacity-90 hover:opacity-100 transition-opacity">
                     <img 
                       src={user?.avatar || "https://images.unsplash.com/photo-1594834749740-74b3f66ffaeb?q=80&w=150&auto=format&fit=crop"} 
                       alt="User" 
                       className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                     />
                   </div>
                   <Button
                      onClick={() => {
                        useAuthStore.getState().logout();
                        router.push("/login");
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-[40px] w-[40px] bg-[#F2F0EA] border border-[#0D140B] hover:bg-[#00C725]/20 hover:border-[#00C725]/50 text-[#3B5238] hover:text-[#0D140B] transition-all duration-300 rounded-full group mx-auto"
                    >
                      <LogOut className="h-[16px] w-[16px] stroke-[1.5px] group-hover:translate-x-[2px] transition-transform" />
                   </Button>
                </div>
             )}
          </div>

        </div>
      </motion.div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[240px] bg-[#F2F0EA] transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] lg:hidden shadow-[30px_0_50px_rgba(37,66,34,0.1)]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full relative z-10">
          
          <div className="flex items-center justify-between min-h-[90px] px-6">
            <div className="flex flex-col">
               <span className="font-editorial-serif italic text-[22px] tracking-tight text-[#0D140B] leading-none">
                Hortibasket
               </span>
               <span className="font-sans uppercase text-[7.5px] tracking-[0.2em] text-[#00C725] mt-[4px] font-semibold">
                 Botanical Market
               </span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-[#3B5238]/80 hover:text-[#0D140B]">
              <X className="h-[20px] w-[20px] stroke-[1.5px]" />
            </Button>
          </div>
          
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00C725] to-transparent shrink-0 opacity-40 mb-6"></div>

          <nav className="flex-1 space-y-1 overflow-y-auto sidebar-scroll pb-10">
            {filteredNavigation.map((item) => renderNavItem(item, true))}
          </nav>

          <div className="shrink-0 p-6 border-t border-[#0D140B]">
            <Button
              onClick={() => {
                useAuthStore.getState().logout();
                localStorage.removeItem("affiliate-auth");
                router.push("/login");
              }}
              variant="ghost"
              className="w-full h-[48px] bg-[#F2F0EA] border border-[#0D140B] text-[#0D140B] hover:bg-[#00C725]/20 justify-center gap-[12px] font-sans text-[12px] uppercase tracking-widest font-bold"
            >
              <LogOut className="h-[14px] w-[14px] stroke-[1.5px]" />
              <span className="translate-y-[1px]">Sign out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        />
      )}
    </>
  );
}
