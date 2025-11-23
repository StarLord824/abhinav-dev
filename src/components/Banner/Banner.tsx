"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useMemo } from "react";

const items = Array(10).fill("Aurora UI : Coming Soon");

export default function Banner() {
  // Memoize duplicated items for seamless scroll
  const scrollItems = useMemo(() => [...items, ...items], []);
  const imagePath = '/infinite-slider/aurora-ui.png';

  return (
    <div className="overflow-hidden flex items-center italic font-semibold text-sm sm:text-base md:text-lg bg-white text-black h-8 sm:h-9 md:h-10 w-full">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 30,
        }}
        style={{ 
          display: "inline-flex",
          willChange: "transform"
        }}
      >
        {scrollItems.map((item, idx) => (
          <div key={idx} className="flex gap-2 sm:gap-3 justify-center items-center px-12 sm:px-16 md:px-20">
            {item}
            <Image
              src={imagePath}
              alt="Aurora UI/UX Banner"
              height={70}
              width={70}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
              priority
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
