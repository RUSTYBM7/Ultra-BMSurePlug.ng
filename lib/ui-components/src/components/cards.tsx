"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children?: ReactNode;
}

// Glass Card
export function GlassCard({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl",
        "bg-white/10 backdrop-blur-xl",
        "border border-white/20",
        "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        "transition-all duration-300",
        "hover:bg-white/15 hover:border-white/30",
        "hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      {children}
    </div>
  );
}

// Neon Card
export function NeonCard({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-xl",
        "bg-zinc-900 border border-cyan-500/30",
        "transition-all duration-300",
        "hover:border-cyan-400",
        "hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]",
        "before:absolute before:inset-0 before:rounded-xl",
        "before:bg-gradient-to-r before:from-cyan-500/10 before:to-purple-500/10",
        "before:opacity-0 hover:before:opacity-100",
        "before:transition-opacity",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Gradient Border Card
export function GradientBorderCard({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "relative p-[2px] rounded-2xl overflow-hidden",
        "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500",
        "animate-gradient-x",
        className
      )}
    >
      <div className="bg-zinc-900 rounded-[14px] p-6 h-full">{children}</div>
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

// Holographic Card
export function HolographicCard({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-2xl overflow-hidden",
        "bg-zinc-900",
        "before:absolute before:inset-0",
        "before:bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.1)_40%,rgba(255,255,255,0.2)_45%,rgba(255,255,255,0.1)_50%,transparent_70%)]",
        "before:bg-[length:200%_100%]",
        "before:animate-shimmer",
        "border border-white/10",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

// Floating Card
export function FloatingCard({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl",
        "bg-zinc-800/80 backdrop-blur-sm",
        "border border-zinc-700/50",
        "shadow-xl shadow-black/20",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10",
        "hover:border-indigo-500/30",
        className
      )}
    >
      {children}
    </div>
  );
}

// 3D Tilt Card
export function TiltCard({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "group perspective-1000",
        className
      )}
    >
      <div
        className={cn(
          "p-6 rounded-2xl",
          "bg-gradient-to-br from-zinc-800 to-zinc-900",
          "border border-zinc-700",
          "shadow-xl",
          "transition-transform duration-300 ease-out",
          "group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]",
          "transform-style-preserve-3d"
        )}
      >
        {children}
      </div>
    </div>
  );
}

// Spotlight Card
export function SpotlightCard({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "group relative p-6 rounded-2xl overflow-hidden",
        "bg-zinc-900 border border-zinc-800",
        "transition-colors duration-300",
        "hover:border-zinc-700",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0",
          "group-hover:opacity-100 transition-opacity duration-300",
          "bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.06),transparent_40%)]"
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Neumorphic Card
export function NeumorphicCard({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl",
        "bg-zinc-200",
        "shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff]",
        "transition-all duration-300",
        "hover:shadow-[12px_12px_20px_#b8b8b8,-12px_-12px_20px_#ffffff]",
        "dark:bg-zinc-800",
        "dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#363636]",
        "dark:hover:shadow-[12px_12px_20px_#1a1a1a,-12px_-12px_20px_#363636]",
        className
      )}
    >
      {children}
    </div>
  );
}

// Morphing Card
export function MorphingCard({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "p-6",
        "bg-gradient-to-br from-violet-600 to-indigo-600",
        "transition-all duration-700 ease-in-out",
        "animate-morph-card",
        className
      )}
      style={{
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes morph-card {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .animate-morph-card {
          animation: morph-card 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Pricing Card
export function PricingCard({
  className,
  title,
  price,
  features,
  popular,
}: CardProps & {
  title?: string;
  price?: string;
  features?: string[];
  popular?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-2xl",
        "bg-zinc-900 border",
        popular ? "border-indigo-500 scale-105" : "border-zinc-800",
        "transition-all duration-300",
        "hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10",
        className
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full">
          Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="text-4xl font-bold text-white mb-6">
        {price}
        <span className="text-sm text-zinc-400 font-normal">/month</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features?.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-zinc-300">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "w-full py-3 rounded-xl font-semibold transition-all",
          popular
            ? "bg-indigo-500 text-white hover:bg-indigo-400"
            : "bg-zinc-800 text-white hover:bg-zinc-700"
        )}
      >
        Get Started
      </button>
    </div>
  );
}

// Product Card
export function ProductCard({
  className,
  image,
  title,
  price,
  rating,
}: CardProps & {
  image?: string;
  title?: string;
  price?: string;
  rating?: number;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "bg-zinc-900 border border-zinc-800",
        "transition-all duration-300",
        "hover:border-zinc-700 hover:shadow-xl",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={cn("w-4 h-4", i < (rating || 0) ? "text-yellow-500" : "text-zinc-700")}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <h3 className="font-semibold text-white truncate">{title}</h3>
        <p className="text-xl font-bold text-emerald-500">{price}</p>
      </div>
    </div>
  );
}
