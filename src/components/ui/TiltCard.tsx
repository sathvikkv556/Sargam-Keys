'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Shine effect transforms
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const shineOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      className={`relative group ${className}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10"
      >
        {children}
      </div>
      
      {/* Dynamic Shine/Glare Effect */}
      <motion.div
        style={{
          left: shineX,
          top: shineY,
          opacity: shineOpacity,
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          transform: "translateZ(60px)",
        }}
        className="absolute w-full h-full pointer-events-none rounded-3xl"
      />

      {/* Background Shadow depth */}
      <div className="absolute inset-0 bg-black/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10 translate-y-4" />
      
      {/* Subtle Floating Notation (Corner) */}
      <div 
        style={{ transform: "translateZ(70px)" }}
        className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <span className="text-xl">♪</span>
      </div>
    </motion.div>
  );
}
