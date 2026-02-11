"use client";
import React from "react";
import { useBlogStoreContext } from "@/providers/blog-store-provider";
import { BlogContent, TableOfContentItem } from "@/types/blogData";
import { motion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { 
  IconArrowLeft, 
  IconCalendar, 
  IconUser, 
  IconHash,
  IconQuote
} from "@tabler/icons-react";

export default function BlogDetailClient() {
  const blog = useBlogStoreContext((state) => state.currentBlog);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!blog) return null; // Should be handled by parent or loading state, but safe guard here.

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-blue-500/30">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-40">
        <Link 
          href="/blogs"
          className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full 
                     hover:bg-white/10 transition-all duration-300 text-sm font-medium group"
        >
          <IconArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Arena</span>
        </Link>
      </div>

      {/* Hero Section */}
      <header className="relative w-full h-[50vh] min-h-[400px] flex flex-col justify-end pb-12 md:pb-20">
        {/* Background Image with Blur/Fit Strategy */}
        <div className="absolute inset-0 z-0">
          {blog.thumbnail ? (
            <>
              {/* Blurred Fill Layer */}
              <Image
                src={blog.thumbnail}
                alt=""
                fill
                className="object-cover blur-2xl opacity-40 scale-110"
                priority
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-neutral-950/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-neutral-950" />
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
              {blog.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <IconUser className="h-4 w-4" />
                <span>{blog.authorId}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCalendar className="h-4 w-4" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Social / Meta (Optional placement for larger screens) */}
        <aside className="lg:col-span-1 hidden lg:block">
          {/* Visual decoration or sticky social share could go here */}
          <div className="sticky top-24 w-px h-64 bg-gradient-to-b from-blue-500/50 to-transparent mx-auto" />
        </aside>

        {/* Center Column: Article Content */}
        <article className="lg:col-span-8 space-y-8">
          {/* Featured Image (Contained) */}
          {blog.thumbnail && (
            <motion.div 
              className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-contain" // Preserved aspect ratio as requested
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                priority
              />
            </motion.div>
          )}

          {/* Dynamic Content Rendering */}
          <div className="prose prose-lg prose-invert max-w-none">
            {blog.content?.map((block: BlogContent, index: number) => {
              switch (block.type) {
                case "heading":
                  const HeadingTag = `h${Math.min(block.level || 2, 6)}` as React.ElementType;
                  const id = block.text?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <HeadingTag key={index} id={id} className={`font-bold text-white mt-12 mb-6 ${
                      block.level === 1 ? 'text-4xl' : 
                      block.level === 2 ? 'text-3xl' : 
                      'text-2xl'
                    }`}>
                      {block.text}
                    </HeadingTag>
                  );
                
                case "paragraph":
                  return (
                    <p key={index} className="text-neutral-300 leading-relaxed mb-6">
                      {block.text}
                    </p>
                  );

                case "image":
                  return (
                    <figure key={index} className="my-8">
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                        {block.text && (
                          <Image
                            src={block.text}
                            alt="" // Decorative usually if not specified
                            fill
                            className="object-contain"
                          />
                        )}
                      </div>
                    </figure>
                  );

                case "quote":
                  return (
                    <blockquote key={index} className="relative border-l-4 border-blue-500 pl-6 my-8 py-2 bg-blue-500/5 rounded-r-xl">
                      <IconQuote className="absolute top-2 left-6 h-6 w-6 text-blue-500/20 -translate-x-full -ml-8" />
                      <p className="text-xl italic text-neutral-200 font-medium">
                        {block.text}
                      </p>
                    </blockquote>
                  );

                case "code":
                  return (
                    <div key={index} className="my-8 rounded-xl overflow-hidden border border-neutral-700 bg-[#1e1e1e] shadow-xl">
                      <div className="flex items-center px-4 py-2 bg-neutral-800 border-b border-neutral-700">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                        {block.language && (
                          <span className="ml-4 text-xs font-mono text-neutral-400 capitalize">{block.language}</span>
                        )}
                      </div>
                      <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-200">
                        <code>{block.text || block.code}</code>
                      </pre>
                    </div>
                  );
                
                default:
                  return null;
              }
            })}
          </div>

          <div className="h-12" /> {/* Spacer */}
        </article>

        {/* Right Column: Table of Contents */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-24 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <IconHash className="h-4 w-4" />
              Table of Contents
            </h3>
            {blog.tableOfContent && blog.tableOfContent.length > 0 ? (
              <nav className="flex flex-col gap-1">
                {blog.tableOfContent.map((item: TableOfContentItem) => (
                  <Link 
                    key={item.id} 
                    href={`#${item.id}`}
                    className={`block py-1.5 text-sm transition-colors duration-200 ${
                      item.level === 1 ? 'pl-0 text-neutral-200 font-medium' : 
                      item.level === 2 ? 'pl-4 text-neutral-400 hover:text-blue-400' :
                      'pl-8 text-neutral-500 hover:text-blue-400'
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            ) : (
              <p className="text-sm text-neutral-600 italic">No contents available</p>
            )}
          </div>
        </aside>

      </main>

      {/* Dynamic Footer for this page */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-neutral-200 mb-2">Enjoyed this chronicle?</h2>
          <p className="text-neutral-500 mb-8">Share it with your fellow gladiators.</p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-blue-600 rounded-full text-white font-bold hover:bg-blue-500 transition-colors">
              Share on Twitter
            </button>
            <Link href="/blogs" className="px-6 py-2 bg-neutral-800 rounded-full text-neutral-300 font-bold hover:bg-neutral-700 transition-colors">
              Read More Logs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}