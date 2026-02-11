"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { IconHeart, IconClock, IconEye } from "@tabler/icons-react";
import { BlogPreview } from "@/types/blogData";

interface BlogCardProps {
  blog: BlogPreview;
  index: number;
  onClick: () => void;
  featured?: boolean; // For larger cards in bento grid
}

export default function BlogCard({ blog, index, onClick, featured = false }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
    >
      <motion.div
        onClick={onClick}
        className="relative bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                   rounded-2xl overflow-hidden cursor-pointer h-full
                   border-2 border-gray-200 dark:border-gray-700/50
                   shadow-lg hover:shadow-2xl dark:shadow-black/40
                   transition-all duration-500 ease-out group
                   flex flex-col"
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Thumbnail Section with Gradient Overlay */}
        <div className={`relative w-full ${featured ? 'h-64 md:h-80' : 'h-48 md:h-56'} bg-gray-900 overflow-hidden`}>
          {blog.thumbnail ? (
            <>
              {/* Blurred Background Layer for Fill */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={blog.thumbnail}
                  alt=""
                  fill
                  className="object-cover blur-xl scale-125 opacity-60 transition-transform duration-700 group-hover:scale-150"
                  sizes="100vw"
                  priority={featured}
                />
              </div>

              {/* Main Image Layer - Fit and Visible */}
              <div className="absolute inset-0 z-1 flex items-center justify-center p-2">
                <div className="relative w-full h-full">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                    priority={featured}
                  />
                </div>
              </div>

              {/* Gradient overlays */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent text-white" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950">
              <div className="text-6xl opacity-30 select-none">??</div>
            </div>
          )}

          {/* Category Badge - Top Left */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div
              className="absolute top-4 left-4 z-10"
              whileHover={{ scale: 1.05 }}
            >
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700
                             text-white text-xs font-bold rounded-lg shadow-lg
                             backdrop-blur-sm border border-white/20
                             uppercase tracking-wider">
                {blog.tags[0]}
              </span>
            </motion.div>
          )}

          {/* Likes Badge - Top Right */}
          {blog.likes !== undefined && blog.likes > 0 && (
            <motion.div
              className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5
                         bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg shadow-lg
                         border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <IconHeart className="h-4 w-4 text-red-500 fill-red-500" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {blog.likes}
              </span>
            </motion.div>
          )}

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <div className="flex items-center gap-3 text-white/90 text-xs font-medium">
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                <IconClock className="h-3.5 w-3.5" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                <IconEye className="h-3.5 w-3.5" />
                <span>5 min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 md:p-6 flex flex-col bg-white dark:bg-gray-900/50">
          {/* Title */}
          <h3 className={`${featured ? 'text-xl md:text-2xl mb-3' : 'text-lg md:text-xl mb-2.5'} 
                         font-black text-gray-900 dark:text-white
                         line-clamp-2 leading-tight
                         group-hover:text-transparent group-hover:bg-clip-text 
                         group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600
                         dark:group-hover:from-blue-400 dark:group-hover:to-purple-400
                         transition-all duration-300`}>
            {blog.title}
          </h3>

          {/* Excerpt/Description (if featured) */}
          {featured && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
              Discover the latest insights and best practices in modern web development...
            </p>
          )}

          {/* Tags Row */}
          {blog.tags && blog.tags.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.slice(1, featured ? 4 : 3).map((tag, idx) => (
                <motion.span
                  key={idx}
                  className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 
                           text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md
                           hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          )}

          {/* Footer - Author/Stats */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  AB
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">Admin</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Author</p>
                </div>
              </div>
              
              <motion.div
                className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-sm font-bold"
                whileHover={{ x: 4 }}
              >
                <span>Read</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/50 dark:ring-blue-400/50" />
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl" />
        </div>
      </motion.div>
    </motion.div>
  );
}

