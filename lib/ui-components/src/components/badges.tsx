"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  className?: string;
  children?: ReactNode;
}

// Glow Badge
export function GlowBadge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
        "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
        "hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]",
        "transition-shadow duration-300",
        className
      )}
    >
      {children}
    </span>
  );
}

// Gradient Badge
export function GradientBadge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold",
        "bg-gradient-to-r from-pink-500 to-violet-500 text-white",
        "shadow-lg shadow-violet-500/25",
        className
      )}
    >
      {children}
    </span>
  );
}

// Outline Badge
export function OutlineBadge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        "bg-transparent border border-zinc-600 text-zinc-300",
        "hover:border-zinc-400 hover:text-white",
        "transition-colors duration-200",
        className
      )}
    >
      {children}
    </span>
  );
}

// Pill Badge with Dot
export function DotBadge({
  className,
  children,
  color = "emerald",
}: BadgeProps & { color?: "emerald" | "amber" | "rose" | "blue" }) {
  const colorClasses = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    blue: "bg-blue-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
        "bg-zinc-800 text-zinc-300",
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full animate-pulse", colorClasses[color])} />
      {children}
    </span>
  );
}

// Status Badge
export function StatusBadge({
  className,
  status,
}: BadgeProps & { status: "online" | "offline" | "away" | "busy" }) {
  const statusConfig = {
    online: { color: "bg-emerald-500", text: "Online", ring: "ring-emerald-500/30" },
    offline: { color: "bg-zinc-500", text: "Offline", ring: "ring-zinc-500/30" },
    away: { color: "bg-amber-500", text: "Away", ring: "ring-amber-500/30" },
    busy: { color: "bg-rose-500", text: "Busy", ring: "ring-rose-500/30" },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
        "bg-zinc-800 text-zinc-300",
        className
      )}
    >
      <span className={cn("w-2.5 h-2.5 rounded-full ring-4", config.color, config.ring)} />
      {config.text}
    </span>
  );
}

// Animated Badge
export function AnimatedBadge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        "bg-zinc-900 text-white overflow-hidden",
        className
      )}
    >
      <span
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
          "translate-x-[-100%] animate-shimmer"
        )}
      />
      {children}
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </span>
  );
}

// Counter Badge
export function CounterBadge({
  className,
  count,
  max = 99,
}: BadgeProps & { count: number; max?: number }) {
  const displayCount = count > max ? `${max}+` : count;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full text-xs font-bold",
        "bg-rose-500 text-white",
        count > 0 && "animate-bounce-in",
        className
      )}
    >
      {displayCount}
      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </span>
  );
}

// Tag with Remove
export function RemovableTag({
  className,
  children,
  onRemove,
}: BadgeProps & { onRemove?: () => void }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-sm",
        "bg-zinc-800 text-zinc-300 border border-zinc-700",
        className
      )}
    >
      {children}
      <button
        onClick={onRemove}
        className="p-0.5 rounded-full hover:bg-zinc-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

// Ribbon Badge
export function RibbonBadge({ className, children }: BadgeProps) {
  return (
    <div className={cn("absolute -top-1 -right-1", className)}>
      <div className="relative">
        <div
          className={cn(
            "px-8 py-1 text-xs font-bold uppercase",
            "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
            "transform rotate-45 translate-x-4 -translate-y-1",
            "shadow-lg"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// Verified Badge
export function VerifiedBadge({ className, size = "md" }: BadgeProps & { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        "bg-blue-500 text-white",
        sizeClasses[size],
        className
      )}
    >
      <svg className="w-3/4 h-3/4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}
