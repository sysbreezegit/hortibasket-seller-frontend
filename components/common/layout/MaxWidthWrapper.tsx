import { cn } from "@/lib/utils";
import React from "react";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("max-w-10xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
    {children}
  </div>
);

export default MaxWidthWrapper;
