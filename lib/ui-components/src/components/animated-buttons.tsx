"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glow" | "slide" | "pulse" | "neon" | "gradient" | "cyber" | "glass" | "magnetic";
}

// Glow Button - Neon glow effect on hover
export const GlowButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative px-8 py-3 font-semibold text-white rounded-lg",
        "bg-gradient-to-r from-violet-600 to-indigo-600",
        "transition-all duration-300 ease-out",
        "hover:shadow-[0_0_40px_8px_rgba(124,58,237,0.5)]",
        "hover:scale-105 active:scale-95",
        "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r",
        "before:from-violet-600 before:to-indigo-600 before:blur-xl before:opacity-0",
        "hover:before:opacity-70 before:transition-opacity before:-z-10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
GlowButton.displayName = "GlowButton";

// Slide Button - Text slides up on hover
export const SlideButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "group relative px-8 py-3 font-semibold overflow-hidden rounded-lg",
        "bg-zinc-900 text-white border border-zinc-700",
        "transition-all duration-300",
        "hover:border-emerald-500/50",
        className
      )}
      {...props}
    >
      <span className="relative flex items-center justify-center gap-2 transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-emerald-400">
        {children}
      </span>
    </button>
  )
);
SlideButton.displayName = "SlideButton";

// Pulse Button - Ripple pulse effect
export const PulseButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative px-8 py-3 font-semibold text-white rounded-lg",
        "bg-rose-600 overflow-hidden",
        "transition-all duration-300 hover:bg-rose-500",
        "after:absolute after:inset-0 after:bg-white/20",
        "after:scale-0 after:rounded-full after:transition-transform",
        "after:duration-500 hover:after:scale-150 after:opacity-0",
        "hover:after:opacity-100",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
);
PulseButton.displayName = "PulseButton";

// Neon Button - Cyberpunk neon style
export const NeonButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative px-8 py-3 font-bold uppercase tracking-wider",
        "text-cyan-400 bg-transparent border-2 border-cyan-400 rounded",
        "transition-all duration-300",
        "hover:bg-cyan-400 hover:text-zinc-900",
        "hover:shadow-[0_0_20px_rgba(34,211,238,0.8),inset_0_0_20px_rgba(34,211,238,0.3)]",
        "before:absolute before:inset-0 before:bg-cyan-400/10",
        "before:translate-x-[-100%] hover:before:translate-x-0",
        "before:transition-transform before:duration-300",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
);
NeonButton.displayName = "NeonButton";

// Gradient Border Button
export const GradientButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative px-8 py-3 font-semibold text-white rounded-lg",
        "bg-zinc-900 overflow-hidden",
        "before:absolute before:inset-0 before:p-[2px] before:rounded-lg",
        "before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-cyan-500",
        "before:-z-10 before:animate-[spin_3s_linear_infinite]",
        "after:absolute after:inset-[2px] after:rounded-[6px] after:bg-zinc-900 after:-z-[5]",
        "transition-transform duration-300 hover:scale-105",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
);
GradientButton.displayName = "GradientButton";

// Cyber Button - Glitch effect
export const CyberButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "group relative px-8 py-3 font-bold uppercase tracking-widest",
        "bg-yellow-400 text-zinc-900 clip-cyber",
        "transition-all duration-150",
        "hover:bg-yellow-300",
        "before:absolute before:top-0 before:left-0 before:w-full before:h-full",
        "before:bg-red-500 before:-translate-x-1 before:translate-y-1",
        "before:clip-cyber before:-z-10",
        "after:absolute after:top-0 after:left-0 after:w-full after:h-full",
        "after:bg-cyan-400 after:translate-x-1 after:-translate-y-1",
        "after:clip-cyber after:-z-20",
        "hover:before:translate-x-0 hover:before:translate-y-0",
        "hover:after:translate-x-0 hover:after:translate-y-0",
        "before:transition-transform after:transition-transform",
        className
      )}
      style={{
        clipPath: "polygon(0 10%, 10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%)",
      }}
      {...props}
    >
      {children}
    </button>
  )
);
CyberButton.displayName = "CyberButton";

// Glass Button - Glassmorphism style
export const GlassButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "px-8 py-3 font-semibold rounded-xl",
        "bg-white/10 backdrop-blur-md text-white",
        "border border-white/20",
        "shadow-[0_8px_32px_rgba(0,0,0,0.1)]",
        "transition-all duration-300",
        "hover:bg-white/20 hover:border-white/30",
        "hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
        "active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
GlassButton.displayName = "GlassButton";

// Magnetic Button - Follows cursor slightly
export const MagneticButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative px-8 py-3 font-semibold rounded-full",
        "bg-zinc-800 text-white",
        "transition-all duration-200 ease-out",
        "hover:shadow-xl hover:shadow-zinc-900/50",
        "before:absolute before:inset-0 before:rounded-full",
        "before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500",
        "before:opacity-0 hover:before:opacity-100",
        "before:transition-opacity before:-z-10 before:blur-xl",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
MagneticButton.displayName = "MagneticButton";
