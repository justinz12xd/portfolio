"use client"

import React, { useEffect, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { animate, createDrawable, onScroll } from "animejs"

import { cn } from "@/lib/utils"

const headingVariants = cva(
  "tracking-tight pb-3 bg-clip-text text-transparent",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-t from-foreground/80 to-foreground dark:from-stone-200 dark:to-neutral-200",
        pink: "bg-gradient-to-t from-accent to-accent/90 dark:from-stone-200 dark:to-neutral-200",
        light: "bg-gradient-to-t from-neutral-200 to-neutral-300",
        secondary:
          "bg-gradient-to-t from-neutral-500 to-neutral-600 dark:from-stone-200 dark:to-neutral-200",
      },
      size: {
        default: "text-2xl sm:text-3xl lg:text-4xl",
        xxs: "text-base sm:text-lg lg:text-lg",
        xs: "text-lg sm:text-xl lg:text-2xl",
        sm: "text-xl sm:text-2xl lg:text-3xl",
        md: "text-2xl sm:text-3xl lg:text-4xl",
        lg: "text-3xl sm:text-4xl lg:text-5xl",
        xl: "text-4xl sm:text-5xl lg:text-6xl",
        xll: "text-4xl sm:text-6xl lg:text-[5.4rem]  lg:leading-[0.5rem] ",
        xxl: "text-5xl sm:text-6xl lg:text-[6rem]",
        xxxl: "text-5xl sm:text-6xl lg:text-[8rem]",
      },
      weight: {
        default: "font-bold",
        thin: "font-thin",
        base: "font-base",
        semi: "font-semibold",
        bold: "font-bold",
        black: "font-black",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "default",
    },
  }
)

export interface HeadingProps extends VariantProps<typeof headingVariants> {
  asChild?: boolean
  children: React.ReactNode
  className?: string
}

const GradientHeading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild, variant, weight, size, className, children, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "h2" // default to 'h2' if not a child
    const headingRef = useRef<HTMLHeadingElement | null>(null)
    const pathRef = useRef<SVGPathElement | null>(null)

    useEffect(() => {
      const heading = headingRef.current
      const path = pathRef.current
      if (!heading || !path) return

      const [drawable] = createDrawable(path)
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (prefersReducedMotion) {
        drawable.draw = "0 1"
        return
      }

      drawable.draw = "0 0"

      const animation = animate(drawable, {
        draw: "0 1",
        ease: "outQuad",
        duration: 700,
        autoplay: onScroll({
          target: heading,
          enter: "bottom-=10% top",
          once: true,
        }),
      })

      return () => animation.revert()
    }, [])

    return (
      <Comp
        ref={(node: HTMLHeadingElement | null) => {
          headingRef.current = node
          if (typeof forwardedRef === "function") forwardedRef(node)
          else if (forwardedRef) forwardedRef.current = node
        }}
        {...props}
        className={cn(className)}
      >
        <span className={cn(headingVariants({ variant, size, weight }))}>
          {children}
        </span>
        <svg
          aria-hidden="true"
          className="mt-3 block h-1 w-24 text-primary"
          fill="none"
          viewBox="0 0 96 4"
        >
          <path
            ref={pathRef}
            d="M2 2 H94"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </svg>
      </Comp>
    )
  }
)

GradientHeading.displayName = "GradientHeading"

// Manually define the variant types
export type Variant = "default" | "pink" | "light" | "secondary"
export type Size =
  | "default"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl"
export type Weight = "default" | "thin" | "base" | "semi" | "bold" | "black"

export { GradientHeading, headingVariants }
