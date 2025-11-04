import React from "react";
import { BentoGrid, BentoGridItem } from "@/ui/bento-grid";
import { IconArrowWaveRightUp, IconSwords, IconSparkles } from "@tabler/icons-react";
import { blogPreviewSchema } from "@/types/blogData";
import { loadBlogsPreview } from "@/app/actions/blogs/loadBlogsPreview";
import z from "zod";
// import Image from "next/image";
import Link from "next/link";
import Image from "next/image";

export default async function Blogs() {  
  let blogs: z.infer<typeof blogPreviewSchema>[] = [];

  try {
    const data = await loadBlogsPreview();
    blogs = data.map((blog) => blogPreviewSchema.parse(blog));
  } catch (error) {
    console.error("Failed to load or validate blogs:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* Error state with game-inspired styling */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full" />
          <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-red-950 border border-red-900/50 rounded-2xl p-8 shadow-2xl">
            <IconSwords className="h-12 w-12 text-red-500 mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-neutral-300 text-center font-medium">
              Arena connection lost ⚔️
            </p>
            <p className="text-sm text-neutral-500 text-center mt-2">
              Failed to summon blogs from the kingdom
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* Loading state with premium feel */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full animate-pulse" />
          <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-blue-950 border border-blue-900/50 rounded-2xl p-8 shadow-2xl">
            <IconSparkles className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-spin" />
            <p className="text-lg text-neutral-300 text-center font-medium">
              Summoning wisdom from the arena...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-20 px-4">
      {/* Hero Header - Game-inspired title section */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <div className="relative">
          {/* Subtle glow effect behind title */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-3xl" />
          
          <div className="relative text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-4">
              Battle Log
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
              Chronicles from the development arena • {blogs.length} entries
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <BentoGrid className="max-w-7xl mx-auto">
        {blogs.map((blog, i) => {
          // Dynamic sizing for visual hierarchy (Clash Royale card variety)
          const isHighlight = i === 3;
          const isWide = i === 9;
          const isTall = i === 2;

          return (
            <Link 
              href={blog.url || `/blog/${blog.slug || i}`} 
              key={i} 
              className="block group"
            >
              <BentoGridItem
                title={blog.title}
                // description={
                //   blog.content?.[0]?.children?.[0]?.text?.slice(0, 100) || 
                //   blog.description || 
                //   ""
                // }
                header={<BlogThumbnail thumbnail={blog.thumbnail} />}
                icon={<IconArrowWaveRightUp className="h-4 w-4 text-blue-400" />}
                className={`
                  ${isHighlight ? "md:col-span-2 md:row-span-2" : ""} 
                  ${isWide ? "md:col-span-2" : ""} 
                  ${isTall ? "md:row-span-2" : ""}
                  
                  
                  /* Base card styling - game-inspired layered look */
                  bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900
                  border border-neutral-700/50
                  
                  /* Optimized hover effect - only transform and border color change */
                  transition-all duration-300 ease-out
                  hover:border-blue-500/60
                  hover:-translate-y-1
                  hover:shadow-lg hover:shadow-blue-500/10
                  
                  `}
                  // /* Inner glow on hover without heavy blur */
                  // relative overflow-hidden
                  // before:absolute before:inset-0 
                  // before:bg-gradient-to-br before:from-blue-500/5 before:to-transparent 
                  // before:opacity-0 hover:before:opacity-100
                  // before:transition-opacity before:duration-300
              />
            </Link>
          );
        })}
      </BentoGrid>
    </div>
  );
}

// Optimized thumbnail component
function BlogThumbnail({ thumbnail }: { thumbnail?: string }) {
  return (
    <div className="relative flex w-full h-full min-h-[180px] rounded-xl overflow-hidden bg-neutral-900">
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt="Blog thumbnail"
          // width={}
          // height={}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy" // Lazy load for performance
        />
      ) : (
        // Placeholder with subtle pattern instead of heavy gradients
        <div className="flex-1 bg-gradient-to-br from-neutral-800 via-neutral-850 to-neutral-900 relative">
          {/* Subtle grid pattern for empty state */}
          <div className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>
      )}
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
    </div>
  );
}