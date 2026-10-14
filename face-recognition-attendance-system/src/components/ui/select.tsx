"use client";

import { forwardRef, SelectHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options?: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options = [], ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              `
                w-full px-4 py-2.5 rounded-lg border bg-white
                appearance-none transition-all duration-200
                placeholder:text-slate-400
                focus:outline-none focus:ring-2 focus:ring-offset-0
                disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500
              `,
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-200",
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-slate-500">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
