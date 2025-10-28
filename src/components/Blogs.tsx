import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { loadBlogs } from "@/app/blogs/action";
import Link from "next/link";
import Image from "next/image";

export default function Blogs() {
  return (
    <BentoGrid className="max-w-85vw mx-auto">
      {/* <Link href={item.url || "hey"} key={i} className="block group"> */}
      {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={` ${i===3 ? "md:col-span-2 row-span-2" : ""} ${ i==9 ? "md:col-span-2" : ""} ${ i==2 ? "md:row-span-2" : ""}`}
          />
        ))}
        {/* </Link> */}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    {/* <Image src="https://unsplash.com/photos/a-bunch-of-pink-donuts-are-stacked-on-top-of-each-other-obyYZVKwCNI" alt="placeholder" width={400} height={400} /> */}
  </div>
);

// const items = await loadBlogs();

const items = [
  //technically, it should import data from a CMS or database
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.Explore the birth of groundbreaking ideas and inventions.Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    url : "/blogs/dawn-of-innovation",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },{
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.Explore the birth of groundbreaking ideas and inventions.Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    url : "/blogs/dawn-of-innovation",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },{
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.Explore the birth of groundbreaking ideas and inventions.Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    url : "/blogs/dawn-of-innovation",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },{
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.Explore the birth of groundbreaking ideas and inventions.Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    url : "/blogs/dawn-of-innovation",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  }
];
