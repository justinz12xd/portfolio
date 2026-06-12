"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

type CarouselControls = ReturnType<typeof useAnimation>;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useMediaQuery(query: string, defaultValue = false): boolean {
  const getMatches = (q: string) =>
    typeof window === "undefined" ? defaultValue : window.matchMedia(q).matches;

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    const handleChange = () => setMatches(matchMedia.matches);
    handleChange();
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export interface CarouselImage {
  src: string;
  alt: string;
}

const faceTransition = {
  duration: 0.15,
  ease: [0.32, 0.72, 0, 1] as const,
};

const overlayTransition = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const };

const Cylinder = memo(function Cylinder({
  images,
  controls,
  isActive,
  onSelect,
}: {
  images: CarouselImage[];
  controls: CarouselControls;
  isActive: boolean;
  onSelect: (image: CarouselImage) => void;
}) {
  const isSmall = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isSmall ? 1500 : 2900;
  const faceCount = images.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(
    rotation,
    (value) => `rotate3d(0, 1, 0, ${value}deg)`
  );

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.div
        drag={isActive ? "x" : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={(_, info) =>
          isActive && rotation.set(rotation.get() + info.offset.x * 0.05)
        }
        onDragEnd={(_, info) =>
          isActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 30,
              mass: 0.1,
            },
          })
        }
        animate={controls}
      >
        {images.map((image, i) => (
          <motion.div
            key={`${image.src}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${
                i * (360 / faceCount)
              }deg) translateZ(${radius}px)`,
            }}
            onClick={() => onSelect(image)}
          >
            <motion.img
              src={image.src}
              alt={image.alt}
              layoutId={`carousel-${image.src}`}
              className="pointer-events-none aspect-square w-full rounded-xl object-cover shadow-lg"
              initial={{ filter: "blur(4px)" }}
              layout="position"
              animate={{ filter: "blur(0px)" }}
              transition={faceTransition}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

export function ThreeDPhotoCarousel({
  images,
  className,
}: {
  images: CarouselImage[];
  className?: string;
}) {
  const [active, setActive] = useState<CarouselImage | null>(null);
  const [isActive, setIsActive] = useState(true);
  const controls = useAnimation();
  const cards = useMemo(() => images, [images]);

  const handleSelect = (image: CarouselImage) => {
    setActive(image);
    setIsActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActive(null);
    setIsActive(true);
  };

  return (
    <motion.div layout className={cn("relative", className)}>
      <AnimatePresence mode="sync">
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layoutId={`carousel-container-${active.src}`}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-sm md:p-24"
            style={{ willChange: "opacity" }}
            transition={overlayTransition}
          >
            <motion.img
              layoutId={`carousel-${active.src}`}
              src={active.src}
              alt={active.alt}
              className="max-h-full max-w-full rounded-2xl shadow-2xl"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              style={{ willChange: "transform" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[460px] w-full overflow-hidden sm:h-[580px]">
        <Cylinder
          images={cards}
          controls={controls}
          isActive={isActive}
          onSelect={handleSelect}
        />
      </div>
    </motion.div>
  );
}

export default ThreeDPhotoCarousel;
