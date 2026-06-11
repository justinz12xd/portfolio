"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

interface InteractiveMarker {
  id: string;
  location: [number, number];
  size?: number;
}

interface InteractiveArc {
  id: string;
  from: [number, number];
  to: [number, number];
}

interface GlobeInteractiveProps {
  markers?: InteractiveMarker[];
  arcs?: InteractiveArc[];
  className?: string;
  speed?: number;
}

// Manta, Ecuador — home base.
const ORIGIN: [number, number] = [-0.95, -80.73];

// One representative point per continent the arcs reach toward.
const NORTH_AMERICA: [number, number] = [40.71, -74.01]; // New York
const EUROPE: [number, number] = [52.52, 13.41]; // Berlin
const ASIA: [number, number] = [1.35, 103.82]; // Singapore

const defaultMarkers: InteractiveMarker[] = [
  { id: "ecuador", location: ORIGIN, size: 0.07 },
  { id: "america", location: NORTH_AMERICA, size: 0.05 },
  { id: "europe", location: EUROPE, size: 0.05 },
  { id: "asia", location: ASIA, size: 0.05 },
];

const defaultArcs: InteractiveArc[] = [
  { id: "ecuador-america", from: ORIGIN, to: NORTH_AMERICA },
  { id: "ecuador-europe", from: ORIGIN, to: EUROPE },
  { id: "ecuador-asia", from: ORIGIN, to: ASIA },
];

export function GlobeInteractive({
  markers = defaultMarkers,
  arcs = defaultArcs,
  className = "",
  speed = 0.003,
}: GlobeInteractiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId: number;
    let phi = 0;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0) return;
      if (globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [1, 1, 1],
        markerColor: [0.1, 0.2, 0.45],
        glowColor: [0.94, 0.93, 0.91],
        markers: markers.map((m) => ({
          location: m.location,
          size: m.size ?? 0.05,
        })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to })),
        arcColor: [0.25, 0.45, 0.85],
        arcWidth: 1.2,
        arcHeight: 0.35,
        opacity: 0.7,
      });

      function animate() {
        if (!isPausedRef.current) phi += speed;
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => canvas && (canvas.style.opacity = "1"));
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [markers, arcs, speed]);

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
    </div>
  );
}
