"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", dot, children, ...props }, ref) => {
    const variants = {
      default: "bg-slate-100 text-slate-700",
      primary: "bg-emerald-100 text-emerald-700",
      secondary: "bg-slate-200 text-slate-800",
      success: "bg-emerald-100 text-emerald-700",
      warning: "bg-amber-100 text-amber-700",
      danger: "bg-red-100 text-red-700",
      info: "bg-blue-100 text-blue-700",
    };

    const dotColors = {
      default: "bg-slate-500",
      primary: "bg-emerald-500",
      secondary: "bg-slate-600",
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      danger: "bg-red-500",
      info: "bg-blue-500",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-xs",
      lg: "px-3 py-1.5 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full mr-1.5",
              dotColors[variant]
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
