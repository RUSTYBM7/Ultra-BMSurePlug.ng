"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, useState } from "react";

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

// iOS Style Toggle
export const IOSToggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer", className)}>
      <div className="relative">
        <input ref={ref} type="checkbox" className="sr-only peer" {...props} />
        <div
          className={cn(
            "w-14 h-8 rounded-full",
            "bg-zinc-700",
            "peer-checked:bg-emerald-500",
            "transition-colors duration-300"
          )}
        />
        <div
          className={cn(
            "absolute top-1 left-1 w-6 h-6 rounded-full",
            "bg-white shadow-lg",
            "peer-checked:translate-x-6",
            "transition-transform duration-300"
          )}
        />
      </div>
      {label && <span className="text-white">{label}</span>}
    </label>
  )
);
IOSToggle.displayName = "IOSToggle";

// Neon Toggle
export const NeonToggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer", className)}>
      <div className="relative">
        <input ref={ref} type="checkbox" className="sr-only peer" {...props} />
        <div
          className={cn(
            "w-14 h-8 rounded-full",
            "bg-zinc-800 border border-zinc-700",
            "peer-checked:border-cyan-500",
            "peer-checked:shadow-[0_0_15px_rgba(34,211,238,0.5)]",
            "transition-all duration-300"
          )}
        />
        <div
          className={cn(
            "absolute top-1.5 left-1.5 w-5 h-5 rounded-full",
            "bg-zinc-600",
            "peer-checked:bg-cyan-400",
            "peer-checked:translate-x-6",
            "peer-checked:shadow-[0_0_10px_rgba(34,211,238,0.8)]",
            "transition-all duration-300"
          )}
        />
      </div>
      {label && <span className="text-white">{label}</span>}
    </label>
  )
);
NeonToggle.displayName = "NeonToggle";

// Gradient Toggle
export const GradientToggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer", className)}>
      <div className="relative">
        <input ref={ref} type="checkbox" className="sr-only peer" {...props} />
        <div
          className={cn(
            "w-14 h-8 rounded-full",
            "bg-zinc-700",
            "peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-violet-500",
            "transition-all duration-300"
          )}
        />
        <div
          className={cn(
            "absolute top-1 left-1 w-6 h-6 rounded-full",
            "bg-white",
            "peer-checked:translate-x-6",
            "transition-transform duration-300"
          )}
        />
      </div>
      {label && <span className="text-white">{label}</span>}
    </label>
  )
);
GradientToggle.displayName = "GradientToggle";

// Animated Checkbox
export const AnimatedCheckbox = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer group", className)}>
      <div className="relative">
        <input ref={ref} type="checkbox" className="sr-only peer" {...props} />
        <div
          className={cn(
            "w-6 h-6 rounded-md",
            "border-2 border-zinc-600",
            "peer-checked:border-indigo-500 peer-checked:bg-indigo-500",
            "transition-all duration-200",
            "group-hover:border-zinc-500"
          )}
        />
        <svg
          className={cn(
            "absolute inset-0 w-6 h-6 text-white",
            "stroke-[3] scale-0 peer-checked:scale-100",
            "transition-transform duration-200"
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {label && <span className="text-white">{label}</span>}
    </label>
  )
);
AnimatedCheckbox.displayName = "AnimatedCheckbox";

// Bounce Checkbox
export const BounceCheckbox = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer", className)}>
      <div className="relative">
        <input ref={ref} type="checkbox" className="sr-only peer" {...props} />
        <div
          className={cn(
            "w-6 h-6 rounded-full",
            "border-2 border-zinc-600",
            "peer-checked:border-emerald-500 peer-checked:bg-emerald-500",
            "peer-checked:animate-bounce-once",
            "transition-all duration-200"
          )}
        />
        <svg
          className={cn(
            "absolute inset-0 w-6 h-6 text-white p-0.5",
            "opacity-0 peer-checked:opacity-100",
            "transition-opacity duration-200"
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {label && <span className="text-white">{label}</span>}
      <style jsx>{`
        @keyframes bounce-once {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .animate-bounce-once {
          animation: bounce-once 0.3s ease-in-out;
        }
      `}</style>
    </label>
  )
);
BounceCheckbox.displayName = "BounceCheckbox";

// Radio Button Group
export function RadioGroup({
  options,
  value,
  onChange,
  className,
}: {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="sr-only peer"
            />
            <div
              className={cn(
                "w-6 h-6 rounded-full",
                "border-2 border-zinc-600",
                "peer-checked:border-indigo-500",
                "transition-all duration-200",
                "group-hover:border-zinc-500"
              )}
            />
            <div
              className={cn(
                "absolute inset-1.5 rounded-full",
                "bg-indigo-500 scale-0 peer-checked:scale-100",
                "transition-transform duration-200"
              )}
            />
          </div>
          <span className="text-white">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

// Pill Toggle Group
export function PillToggleGroup({
  options,
  value,
  onChange,
  className,
}: {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex p-1 rounded-full bg-zinc-800", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange?.(option.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium",
            "transition-all duration-200",
            value === option.value
              ? "bg-white text-zinc-900"
              : "text-zinc-400 hover:text-white"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Day/Night Toggle
export function DayNightToggle({
  checked,
  onChange,
  className,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <button
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative w-20 h-10 rounded-full",
        "transition-colors duration-500",
        checked ? "bg-indigo-900" : "bg-sky-400",
        className
      )}
    >
      <div
        className={cn(
          "absolute top-1 w-8 h-8 rounded-full",
          "transition-all duration-500",
          checked ? "left-11 bg-zinc-200" : "left-1 bg-yellow-300"
        )}
      >
        {checked && (
          <>
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-zinc-400" />
            <div className="absolute top-3 left-5 w-1.5 h-1.5 rounded-full bg-zinc-400" />
          </>
        )}
      </div>
      {checked && (
        <>
          <div className="absolute top-2 left-3 w-1 h-1 rounded-full bg-white animate-twinkle" />
          <div className="absolute top-5 left-5 w-0.5 h-0.5 rounded-full bg-white animate-twinkle" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-3 left-7 w-0.5 h-0.5 rounded-full bg-white animate-twinkle" style={{ animationDelay: "1s" }} />
        </>
      )}
      {!checked && (
        <>
          <div className="absolute top-2 right-3 w-4 h-2 bg-white rounded-full opacity-70" />
          <div className="absolute top-5 right-5 w-3 h-1.5 bg-white rounded-full opacity-50" />
        </>
      )}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
}
