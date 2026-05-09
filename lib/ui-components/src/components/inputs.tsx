"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Floating Label Input
export const FloatingInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 rounded-lg",
            "bg-zinc-800/50 border border-zinc-700",
            "text-white placeholder-transparent",
            "transition-all duration-200",
            "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            "focus:outline-none",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          placeholder={label}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
          }}
          {...props}
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none",
            "text-zinc-400",
            focused || hasValue || props.value
              ? "top-2 text-xs text-indigo-400"
              : "top-1/2 -translate-y-1/2 text-sm"
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";

// Underline Input
export const UnderlineInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        className={cn(
          "peer w-full px-0 py-2",
          "bg-transparent border-b-2 border-zinc-600",
          "text-white placeholder-transparent",
          "transition-all duration-200",
          "focus:border-cyan-500 focus:outline-none",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        placeholder={label}
        {...props}
      />
      <label
        className={cn(
          "absolute left-0 transition-all duration-200 pointer-events-none",
          "text-zinc-400",
          "peer-placeholder-shown:top-2 peer-placeholder-shown:text-base",
          "peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400",
          "-top-5 text-xs"
        )}
      >
        {label}
      </label>
      <div
        className={cn(
          "absolute bottom-0 left-0 h-0.5 bg-cyan-500",
          "scale-x-0 peer-focus:scale-x-100",
          "transition-transform duration-300 origin-left",
          "w-full"
        )}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
);
UnderlineInput.displayName = "UnderlineInput";

// Glass Input
export const GlassInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl",
          "bg-white/10 backdrop-blur-md",
          "border border-white/20",
          "text-white placeholder-white/50",
          "transition-all duration-200",
          "focus:bg-white/15 focus:border-white/40",
          "focus:outline-none focus:ring-2 focus:ring-white/20",
          error && "border-red-400/50 focus:border-red-400",
          className
        )}
        placeholder={label}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
);
GlassInput.displayName = "GlassInput";

// Neon Input
export const NeonInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => (
    <div className="relative group">
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-lg",
          "bg-zinc-900 border border-zinc-700",
          "text-cyan-400 placeholder-zinc-500",
          "transition-all duration-300",
          "focus:border-cyan-500 focus:outline-none",
          "focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]",
          "group-hover:border-cyan-600",
          error && "border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
          className
        )}
        placeholder={label}
        {...props}
      />
      {label && (
        <label className="absolute -top-2.5 left-3 px-1 bg-zinc-900 text-xs text-cyan-400">
          {label}
        </label>
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
);
NeonInput.displayName = "NeonInput";

// Neumorphic Input
export const NeumorphicInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => (
    <div>
      {label && <label className="block mb-2 text-sm text-zinc-400">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl",
          "bg-zinc-800",
          "shadow-[inset_4px_4px_8px_#1a1a1a,inset_-4px_-4px_8px_#363636]",
          "text-white placeholder-zinc-500",
          "transition-all duration-200",
          "focus:shadow-[inset_6px_6px_12px_#1a1a1a,inset_-6px_-6px_12px_#363636]",
          "focus:outline-none",
          error && "shadow-[inset_4px_4px_8px_rgba(239,68,68,0.2),inset_-4px_-4px_8px_#363636]",
          className
        )}
        placeholder={props.placeholder}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
);
NeumorphicInput.displayName = "NeumorphicInput";

// Search Input with Icon
export const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        ref={ref}
        className={cn(
          "w-full pl-12 pr-4 py-3 rounded-full",
          "bg-zinc-800/50 border border-zinc-700",
          "text-white placeholder-zinc-500",
          "transition-all duration-200",
          "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
          "focus:outline-none",
          className
        )}
        placeholder="Search..."
        {...props}
      />
    </div>
  )
);
SearchInput.displayName = "SearchInput";

// Gradient Border Input
export const GradientInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => (
    <div>
      {label && <label className="block mb-2 text-sm text-zinc-400">{label}</label>}
      <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-[6px]",
            "bg-zinc-900",
            "text-white placeholder-zinc-500",
            "focus:outline-none",
            className
          )}
          placeholder={props.placeholder}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
);
GradientInput.displayName = "GradientInput";

// OTP Input
export function OTPInput({
  length = 6,
  onChange,
  className,
}: {
  length?: number;
  onChange?: (value: string) => void;
  className?: string;
}) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);
    onChange?.(newValues.join(""));

    if (value && index < length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className={cn("flex gap-3", className)}>
      {values.map((value, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={cn(
            "w-12 h-14 text-center text-xl font-bold rounded-lg",
            "bg-zinc-800 border-2 border-zinc-700",
            "text-white",
            "transition-all duration-200",
            "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            "focus:outline-none"
          )}
        />
      ))}
    </div>
  );
}
