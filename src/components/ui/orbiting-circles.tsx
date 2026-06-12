"use client";

import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface OrbitingCirclesProps {
  className?: string;
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 80,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path ? (
        <svg className="pointer-events-none absolute inset-0 size-full">
          <circle
            className="stroke-primary/15"
            cx="50%"
            cy="50%"
            fill="none"
            r={radius}
            strokeDasharray="4 6"
          />
        </svg>
      ) : null}

      <div
        className={cn(
          "absolute flex size-full transform-gpu items-center justify-center rounded-full animate-orbit [animation-delay:calc(var(--delay)*1000ms)] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
          className
        )}
        style={
          {
            "--duration": duration,
            "--radius": radius,
            "--delay": -delay,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </>
  );
}
