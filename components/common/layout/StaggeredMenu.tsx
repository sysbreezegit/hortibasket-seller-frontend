"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MenuItem {
    label: string;
    ariaLabel?: string;
    link: string;
}

interface SocialItem {
    label: string;
    link: string;
}

interface StaggeredMenuProps {
    position?: "left" | "right";
    items?: MenuItem[];
    socialItems?: SocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    changeMenuColorOnOpen?: boolean;
    colors?: [string, string]; // [from, to] for gradient overlay
    logoUrl?: string;
    accentColor?: string;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

// ─── Default props (Hortibasket themed) ───────────────────────────────────────

const DEFAULT_ITEMS: MenuItem[] = [
    { label: "Plants", ariaLabel: "Browse our plants", link: "/plants" },
    { label: "Seeds", ariaLabel: "Explore seeds", link: "/seeds" },
    { label: "Pots & Planters", ariaLabel: "Shop pots and planters", link: "/pots" },
    { label: "Tools", ariaLabel: "View garden tools", link: "/tools" },
    { label: "Fertilizers", ariaLabel: "Browse fertilizers", link: "/fertilizers" },
];

const DEFAULT_SOCIAL: SocialItem[] = [
    { label: "Instagram", link: "https://instagram.com" },
    { label: "Facebook", link: "https://facebook.com" },
    { label: "WhatsApp", link: "https://wa.me" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    position = "left",
    items = DEFAULT_ITEMS,
    socialItems = DEFAULT_SOCIAL,
    displaySocials = true,
    displayItemNumbering = true,
    menuButtonColor = "#224229",
    openMenuButtonColor = "#ffffff",
    changeMenuColorOnOpen = true,
    colors = ["#224229", "#1a3320"],
    logoUrl,
    accentColor = "#89C839",
    onMenuOpen,
    onMenuClose,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Refs
    const overlayRef = useRef<HTMLDivElement>(null);
    const menuPanelRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
    const socialRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Build GSAP timeline once
    useEffect(() => {
        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline({ paused: true });

            // 1. Fade in the dark backdrop
            tlRef.current.to(overlayRef.current, {
                opacity: 1,
                duration: 0.25,
                ease: "power2.out",
            });

            // 2. Slide panel in from correct side
            tlRef.current.to(
                menuPanelRef.current,
                {
                    x: 0,
                    duration: 0.4,
                    ease: "power3.out",
                },
                "<0.05"
            );

            // 3. Stagger logo
            if (logoRef.current) {
                tlRef.current.fromTo(
                    logoRef.current,
                    { opacity: 0, y: -16 },
                    { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.4)" },
                    "-=0.1"
                );
            }

            // 4. Stagger menu items
            const filteredItems = menuItemsRef.current.filter(Boolean);
            tlRef.current.fromTo(
                filteredItems,
                { opacity: 0, x: position === "left" ? -32 : 32 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.07,
                    ease: "power3.out",
                },
                "-=0.15"
            );

            // 5. Divider line
            if (dividerRef.current) {
                tlRef.current.fromTo(
                    dividerRef.current,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 0.35, ease: "power2.out", transformOrigin: "left" },
                    "-=0.2"
                );
            }

            // 6. Social links fade in
            if (socialRef.current && displaySocials) {
                tlRef.current.fromTo(
                    socialRef.current,
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
                    "-=0.1"
                );
            }
        });

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position, displaySocials]);

    // Play / reverse on open state change
    useEffect(() => {
        if (!tlRef.current) return;
        if (isOpen) {
            tlRef.current.play();
            document.body.style.overflow = "hidden";
            onMenuOpen?.();
        } else {
            tlRef.current.reverse();
            document.body.style.overflow = "";
            onMenuClose?.();
        }
    }, [isOpen, onMenuOpen, onMenuClose]);

    // Cleanup body scroll on unmount
    useEffect(() => () => { document.body.style.overflow = ""; }, []);

    const panelStart = position === "left" ? "-100%" : "100%";
    const panelSide = position === "left"
        ? { left: 0, right: "auto" }
        : { left: "auto", right: 0 };

    return (
        <>
            {/* ── Hamburger Button — hidden while panel is open ── */}
            <button
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
                className="relative z-[300] flex flex-col justify-center items-center w-10 h-10 gap-[5px] group focus:outline-none transition-all duration-200"
                style={{ opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? "none" : "auto" }}
            >
                <span
                    className="block h-[2px] w-6 rounded-full transition-all duration-300"
                    style={{ backgroundColor: menuButtonColor }}
                />
                <span
                    className="block h-[2px] w-6 rounded-full transition-all duration-300"
                    style={{ backgroundColor: menuButtonColor }}
                />
                <span
                    className="block h-[2px] w-6 rounded-full transition-all duration-300"
                    style={{ backgroundColor: menuButtonColor }}
                />
            </button>

            {/* ── Overlay backdrop ── */}
            <div
                ref={overlayRef}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[250]"
                style={{
                    opacity: 0,
                    pointerEvents: isOpen ? "auto" : "none",
                    background: "rgba(20, 36, 24, 0.65)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                }}
            />

            {/* ── Menu Panel ── */}
            <div
                ref={menuPanelRef}
                className="fixed top-0 bottom-0 z-[260] flex flex-col w-[300px] sm:w-[340px] overflow-hidden"
                style={{
                    ...panelSide,
                    transform: `translateX(${panelStart})`,
                    background: `linear-gradient(160deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
                }}
            >
                {/* ── Header: Logo + single X close button ── */}
                <div className="flex items-center justify-between px-7 pt-8 pb-6">
                    <div ref={logoRef} style={{ opacity: 0 }}>
                        {logoUrl ? (
                            <img src={logoUrl} alt="Hortibasket logo" className="h-8 w-auto" />
                        ) : (
                            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ background: accentColor }}
                                >
                                    <span className="font-black text-xs italic text-[#1a3320]">H</span>
                                </div>
                                <span className="text-xl font-black text-white tracking-tighter uppercase">
                                    Hortibasket
                                </span>
                            </Link>
                        )}
                    </div>

                    {/* The ONE close button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-[#F2F0EA]/20"
                        style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* ── Nav Items ── */}
                <nav className="flex-1 overflow-y-auto px-7 pb-4">
                    <ul className="flex flex-col gap-1">
                        {items.map((item, i) => (
                            <li
                                key={item.link + i}
                                ref={(el) => { menuItemsRef.current[i] = el; }}
                                style={{ opacity: 0 }}
                            >
                                <Link
                                    href={item.link}
                                    aria-label={item.ariaLabel}
                                    onClick={() => setIsOpen(false)}
                                    className="group flex items-center gap-4 py-4 border-b border-white/10 transition-all duration-200 hover:pl-2"
                                >
                                    {displayItemNumbering && (
                                        <span
                                            className="text-[10px] font-bold tabular-nums w-5 shrink-0"
                                            style={{ color: accentColor, opacity: 0.8 }}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    )}
                                    <span className="text-[16px] font-bold text-white uppercase tracking-widest leading-none">
                                        {item.label}
                                    </span>
                                    <svg
                                        className="ml-auto transition-transform duration-200 group-hover:translate-x-1 shrink-0 opacity-40 group-hover:opacity-80"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* ── Divider ── */}
                <div
                    ref={dividerRef}
                    className="mx-7 h-px"
                    style={{ background: `rgba(255,255,255,0.15)`, transformOrigin: "left" }}
                />

                {/* ── Socials + CTA ── */}
                {displaySocials && (
                    <div
                        ref={socialRef}
                        className="px-7 py-6"
                        style={{ opacity: 0 }}
                    >
                        <p
                            className="text-[9px] font-bold uppercase tracking-[0.25em] mb-4"
                            style={{ color: `${accentColor}99` }}
                        >
                            Follow Us
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {socialItems.map((s) => (
                                <a
                                    key={s.link}
                                    href={s.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-full border border-white/20 hover:border-white/60 transition-colors"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/account"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
                                style={{ background: accentColor, color: "#1a3320" }}
                            >
                                My Account
                            </Link>
                            <Link
                                href="/help"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-white transition-all border border-white/20 hover:border-white/50"
                            >
                                Customer Service
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default StaggeredMenu;
