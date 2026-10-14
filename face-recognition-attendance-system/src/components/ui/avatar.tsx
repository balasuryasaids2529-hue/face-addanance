"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away" | null;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = "md", status, ...props }, ref) => {
    const sizes = {
      xs: "w-6 h-6 text-xs",
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
      xl: "w-16 h-16 text-xl",
    };

    const statusColors = {
      online: "bg-emerald-500",
      offline: "bg-slate-400",
      busy: "bg-red-500",
      away: "bg-amber-500",
    };

    const initials = name
      ? name
          .split(" ")
          .map((part) => part.charAt(0).toUpperCase())
          .join("")
          .slice(0, 2)
      : "U";

    return (
      <div className="relative inline-block">
        <div
          ref={ref}
          className={cn(
            "rounded-full overflow-hidden flex items-center justify-center",
            src ? "bg-slate-200" : "bg-emerald-600 text-white",
            sizes[size],
            className
          )}
          {...props}
        >
          {src ? (
            <img
              src={src}
              alt={alt || name || "User avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-medium">{initials}</span>
          )}
        </div>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white",
              statusColors[status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

// Avatar Group
export function AvatarGroup({
  avatars,
  max = 3,
  size = "md",
}: {
  avatars: AvatarProps[];
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex items-center -space-x-2">
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          className="border-2 border-white"
        />
      ))}
      {remaining > 0 && (
        <Avatar
          size={size}
          className="border-2 border-white bg-slate-200 text-slate-600"
        >
          +{remaining}
        </Avatar>
      )}
    </div>
  );
}
