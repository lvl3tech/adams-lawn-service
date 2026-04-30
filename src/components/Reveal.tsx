import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  y = 70,
  duration = 0.9,
  className,
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
