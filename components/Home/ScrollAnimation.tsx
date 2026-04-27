"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "none";
    delay?: number;
    duration?: number;
    className?: string;
    amount?: "some" | "all" | number;
    once?: boolean;
}

export default function ScrollAnimation({
    children,
    direction = "up",
    delay = 0,
    duration = 0.5,
    className = "",
    amount = 0.1, // Reduced amount for better trigger performance
    once = true,
}: ScrollAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    const variants = {
        hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : (direction === "up" ? 30 : direction === "down" ? -30 : 0),
            x: shouldReduceMotion ? 0 : (direction === "left" ? 30 : direction === "right" ? -30 : 0),
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            transition={{
                duration: shouldReduceMotion ? 0.1 : duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Standard ease-out
            }}
            variants={variants}
            className={className}
            style={{ willChange: "transform, opacity" }} // Hardware acceleration
        >
            {children}
        </motion.div>
    );
}
