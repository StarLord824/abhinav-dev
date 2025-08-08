"use client";
import { motion } from "motion/react";
import Image from "next/image";
const items = Array(10).fill("Aurora UI");

export default function Banner() {
  // Duplicate items for seamless scroll
  const scrollItems = [...items, ...items, ...items];
  const imagePath='/Adobe.png'
  return (
    <div className="overflow-hidden flex items-center  italic font-semibold text-lg bg-white text-black h-10 w-full">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 2,
        }}
        style={{ width: "200%" }}
      >
        {scrollItems.map((item, idx) => (
          <div key={idx} className="flex gap-3 justify-center items-center px-20">
            {item}
            <Image
              src={imagePath}
              alt="Aurora UI/UX Banner"
              // maintain original dimensions of image
              height={70}
              width={70}
            />
          </div>
        ))}
      </motion.div>
      {/* Replace banner text with image */}
    </div>
  );
}
