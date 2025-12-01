"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  pauseOnHover?: boolean;
  className?: string;
  reverse?: boolean;
  vertical?: boolean;
  repeat?: number;
  duration?: number;
}

export const Marquee = ({
  children,
  direction = "left",
  pauseOnHover = false,
  className,
  reverse = false,
  vertical = false,
  repeat = 2,
  duration = 20,
}: MarqueeProps) => {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col h-full" : "flex-row w-full",
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              vertical ? "flex-col animate-marquee-vertical" : "flex-row animate-marquee",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              reverse && "direction-reverse"
            )}
            style={{
                animationDuration: `${duration}s`,
                animationDirection: reverse ? "reverse" : "normal",
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

