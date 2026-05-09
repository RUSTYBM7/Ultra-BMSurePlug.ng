"use client";

import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

// Pulse Dots Loader
export function PulseDotsLoader({ className, size = "md", color }: LoaderProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            sizeClasses[size],
            "rounded-full animate-pulse",
            color || "bg-blue-500"
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.8s",
          }}
        />
      ))}
    </div>
  );
}

// Spinner Loader
export function SpinnerLoader({ className, size = "md", color }: LoaderProps) {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-14 w-14 border-4",
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        "rounded-full border-zinc-700 animate-spin",
        color ? `border-t-[${color}]` : "border-t-cyan-500",
        className
      )}
      style={{ borderTopColor: color }}
    />
  );
}

// Orbit Loader
export function OrbitLoader({ className, size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
      <div
        className="absolute inset-1 rounded-full border-2 border-transparent border-t-pink-500 animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
      />
      <div
        className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-500 animate-spin"
        style={{ animationDuration: "1.5s" }}
      />
    </div>
  );
}

// Wave Loader
export function WaveLoader({ className, size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4",
    md: "h-8",
    lg: "h-12",
  };

  return (
    <div className={cn("flex items-end gap-1", sizeClasses[size], className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1.5 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-full animate-wave"
          style={{
            animationDelay: `${i * 0.1}s`,
            height: "100%",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Cube Grid Loader
export function CubeGridLoader({ className, size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("grid grid-cols-3 gap-0.5", sizeClasses[size], className)}>
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="bg-amber-500 rounded-sm animate-pulse"
          style={{
            animationDelay: `${(i % 3) * 0.1 + Math.floor(i / 3) * 0.1}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
}

// DNA Helix Loader
export function DNALoader({ className, size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-10",
    lg: "h-14",
  };

  return (
    <div className={cn("flex items-center gap-1", sizeClasses[size], className)}>
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col justify-between h-full">
          <div
            className="w-2 h-2 rounded-full bg-rose-500"
            style={{
              animation: `dna-top 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
          <div
            className="w-2 h-2 rounded-full bg-blue-500"
            style={{
              animation: `dna-bottom 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes dna-top {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(100%); }
        }
        @keyframes dna-bottom {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
}

// Morphing Loader
export function MorphLoader({ className, size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        "bg-gradient-to-r from-indigo-500 to-purple-500 animate-morph",
        className
      )}
      style={{
        animation: "morph 2s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 60% 30% 60% / 30% 70% 40% 60%; }
          75% { border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%; }
        }
      `}</style>
    </div>
  );
}

// Typing Loader
export function TypingLoader({ className, size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(sizeClasses[size], "bg-zinc-400 rounded-full animate-bounce")}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  );
}

// Progress Bar Loader
export function ProgressLoader({ className }: LoaderProps) {
  return (
    <div className={cn("w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
        style={{
          animation: "progress 1.5s ease-in-out infinite",
        }}
      >
        <style jsx>{`
          @keyframes progress {
            0% { width: 0%; margin-left: 0%; }
            50% { width: 100%; margin-left: 0%; }
            100% { width: 0%; margin-left: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
}

// Glitch Loader
export function GlitchLoader({ className }: LoaderProps) {
  return (
    <div className={cn("relative", className)}>
      <span className="text-2xl font-bold text-white tracking-wider animate-glitch">
        LOADING
      </span>
      <style jsx>{`
        @keyframes glitch {
          0%, 100% { 
            text-shadow: 2px 0 #ff0000, -2px 0 #00ff00;
            transform: translate(0);
          }
          20% { 
            text-shadow: -2px 0 #ff0000, 2px 0 #00ff00;
            transform: translate(-2px, 2px);
          }
          40% { 
            text-shadow: 2px 0 #ff0000, -2px 0 #00ff00;
            transform: translate(2px, -2px);
          }
          60% { 
            text-shadow: -2px 0 #ff0000, 2px 0 #00ff00;
            transform: translate(-1px, 1px);
          }
          80% { 
            text-shadow: 2px 0 #ff0000, -2px 0 #00ff00;
            transform: translate(1px, -1px);
          }
        }
        .animate-glitch {
          animation: glitch 0.5s infinite;
        }
      `}</style>
    </div>
  );
}
