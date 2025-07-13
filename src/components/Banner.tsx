"use client";
import { motion } from "motion/react";

const items = Array(10).fill("Banner");

export default function Banner() {
  // Duplicate items for seamless scroll
  const scrollItems = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden flex items-center font-mono italic font-semibold text-lg bg-white text-black h-10 w-full">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
        style={{ width: "200%" }}
      >
        {scrollItems.map((item, idx) => (
          <div key={idx} className="px-8">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
