"use client";

import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// Table Root
interface TableProps extends HTMLAttributes<HTMLTableElement> {
  size?: "sm" | "md" | "lg";
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const sizes = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    return (
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          className={cn("w-full", sizes[size], className)}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

// Table Header
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn("bg-slate-50", className)}
      {...props}
    />
  );
});

TableHeader.displayName = "TableHeader";

// Table Body
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return <tbody ref={ref} className={cn("", className)} {...props} />;
});

TableBody.displayName = "TableBody";

// Table Footer
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={cn("bg-slate-50 border-t border-slate-200", className)}
      {...props}
    />
  );
});

TableFooter.displayName = "TableFooter";

// Table Row
export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn("border-b border-slate-100", className)}
      {...props}
    />
  );
});

TableRow.displayName = "TableRow";

// Table Head Cell
interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, align = "left", children, ...props }, ref) => {
    const alignments = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    return (
      <th
        ref={ref}
        className={cn(
          "px-4 py-3 font-semibold text-slate-600 uppercase tracking-wider",
          alignments[align],
          className
        )}
        {...props}
      >
        {children}
      </th>
    );
  }
);

TableHead.displayName = "TableHead";

// Table Cell
interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = "left", children, ...props }, ref) => {
    const alignments = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    return (
      <td
        ref={ref}
        className={cn(
          "px-4 py-3 text-slate-700",
          alignments[align],
          className
        )}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";

// Empty State
export function TableEmpty({
  message = "No data available",
  description,
  icon,
}: {
  message?: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <TableRow>
      <TableCell colSpan={100} className="h-48">
        <div className="flex flex-col items-center justify-center text-center">
          {icon && (
            <div className="mb-4 text-slate-400">{icon}</div>
          )}
          <p className="text-slate-900 font-medium">{message}</p>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
