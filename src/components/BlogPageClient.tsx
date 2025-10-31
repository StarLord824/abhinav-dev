"use client";

import { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/ui/bento-grid";
import { 
  IconArrowWaveRightUp, 
  IconSwords, 
  IconSparkles,
  IconX,
  IconExternalLink,
  IconHeart
} from "@tabler/icons-react";
import { BlogPreview } from "@/types/blogData";
import Link from "next/link";
import Image from "next/image";

interface BlogPageClientProps {
  blogs: BlogPreview[];
}

export default function BlogPageClient({ blogs }: BlogPageClientProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogPreview | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    
    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const openModal = (blog: BlogPreview) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBlog(null), 300); // Delay to allow fade out
  };

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
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
    <div className="relative min-h-screen flex flex-col">
      
      {/* SKY SECTION - Header */}
      <section 
        id="sky" 
        className="relative py-12 md:py-16 px-4 bg-gradient-to-b from-blue-950/30 via-blue-900/10 to-transparent"
      >
        {/* Subtle cloud-like patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div 
            className="absolute top-10 left-1/4 w-32 h-16 bg-white/20 rounded-full blur-2xl"
            style={{ animation: "float 20s ease-in-out infinite" }}
          />
          <div 
            className="absolute top-20 right-1/3 w-40 h-20 bg-white/15 rounded-full blur-3xl"
            style={{ animation: "float 25s ease-in-out infinite 5s" }}
          />
        </div>

        {/* Hero Header - Game-inspired title section */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-4">
              Battle Log
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
              Chronicles from the development arena • {blogs.length} entries
            </p>
          </div>
        </div>
      </section>

      {/* CASTLE WALL SECTION - Scrollable Blog Grid */}
      <section 
        id="castle-wall" 
        className="relative flex-1 px-4 py-8 overflow-y-auto scroll-smooth"
        style={{ 
          maxHeight: "70vh",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(100, 100, 100, 0.5) transparent"
        }}
      >
        {/* Castle wall texture - placeholder for custom SVG background */}
        {/* FUTURE: Replace with custom SVG from Figma */}
        {/* <div className="absolute inset-0 bg-castle-wall opacity-20 pointer-events-none" /> */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(120,120,120,0.1) 1px, transparent 1px),
              linear-gradient(rgba(120,120,120,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px"
          }}
        />

        {/* Stone brick pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 10px 10px, rgba(80,80,80,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />

        {/* Blog Grid */}
        <BentoGrid className="max-w-7xl mx-auto relative z-10">
          {blogs.map((blog, i) => {
            // Dynamic sizing for visual hierarchy (Clash Royale card variety)
            const isHighlight = i === 3;
            const isWide = i === 9;
            const isTall = i === 2;

            return (
              <div
                key={blog.id}
                onClick={() => openModal(blog)}
                className="cursor-pointer"
              >
                <BentoGridItem
                  title={blog.title}
                  description={
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      {blog.likes !== undefined && blog.likes > 0 && (
                        <span className="flex items-center gap-1">
                          <IconHeart className="h-3 w-3 fill-red-400 text-red-400" />
                          {blog.likes}
                        </span>
                      )}
                      <span>•</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  }
                  header={<BlogThumbnail thumbnail={blog.thumbnail} likes={blog.likes} />}
                  icon={<IconArrowWaveRightUp className="h-4 w-4 text-blue-400" />}
                  className={`
                    ${isHighlight ? "md:col-span-2 md:row-span-2" : ""} 
                    ${isWide ? "md:col-span-2" : ""} 
                    ${isTall ? "md:row-span-2" : ""}
                    
                    bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900
                    border border-neutral-700/50
                    
                    transition-all duration-300 ease-out
                    hover:border-blue-500/60
                    hover:-translate-y-1
                    hover:shadow-lg hover:shadow-blue-500/10
                  `}
                />
              </div>
            );
          })}
        </BentoGrid>
      </section>

      {/* GRASS SECTION - Footer */}
      <section 
        id="grass" 
        className="relative py-8 px-4 bg-gradient-to-b from-transparent via-green-950/10 to-green-900/20"
      >
        {/* Grass texture placeholder */}
        {/* FUTURE: Replace with custom SVG grass texture */}
        {/* <div className="absolute inset-0 bg-grass-texture opacity-30 pointer-events-none" /> */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(34, 197, 94, 0.1) 0px,
              transparent 2px,
              transparent 4px,
              rgba(34, 197, 94, 0.1) 6px
            )`
          }}
        />

        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-500 text-sm">
            End of Battle Log • Scroll up to explore more entries
          </p>
        </div>
      </section>

      {/* BLOG PREVIEW MODAL */}
      {isModalOpen && selectedBlog && (
        <BlogPreviewPane 
          blog={selectedBlog} 
          onClose={closeModal}
          isOpen={isModalOpen}
        />
      )}

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

// Blog Thumbnail Component
function BlogThumbnail({ thumbnail, likes }: { thumbnail?: string; likes?: number }) {
  return (
    <div className="relative flex w-full h-full min-h-[180px] rounded-xl overflow-hidden bg-neutral-900 group">
      {thumbnail ? (
        <>
          <Image
            // src={thumbnail}
            alt="Blog thumbnail"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Likes badge overlay */}
          {likes !== undefined && likes > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-red-500/90 backdrop-blur-sm rounded-full z-10">
              <IconHeart className="h-3.5 w-3.5 text-white fill-white" />
              <span className="text-xs font-bold text-white">{likes}</span>
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 bg-gradient-to-br from-neutral-800 via-neutral-850 to-neutral-900 relative">
          <div 
            className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <IconSwords className="h-16 w-16 text-neutral-700" />
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
    </div>
  );
}

// Blog Preview Modal Component
function BlogPreviewPane({ 
  blog, 
  onClose, 
  isOpen 
}: { 
  blog: BlogPreview; 
  onClose: () => void;
  isOpen: boolean;
}) {
  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        className={`fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 transition-all duration-300 ${
          isOpen 
            ? "translate-y-0 opacity-100" 
            : "translate-y-full md:translate-y-0 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-900 border-2 border-neutral-700/80 rounded-t-3xl md:rounded-3xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-700/50 bg-gradient-to-r from-blue-950/20 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50" />
              <span className="text-sm text-neutral-300 uppercase tracking-wider font-semibold">
                Preview
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-all duration-200 hover:scale-110"
              aria-label="Close preview"
            >
              <IconX className="h-5 w-5 text-neutral-400 hover:text-neutral-200" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6 md:p-8">
            {/* Thumbnail */}
            {blog.thumbnail && (
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  // src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              </div>
            )}

            {/* Title */}
            <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4 leading-tight">
              {blog.title}
            </h2>

            {/* Meta info */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1.5 bg-neutral-800/80 border border-neutral-700 rounded-lg text-xs text-neutral-300">
                📅 {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              {blog.likes !== undefined && blog.likes > 0 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 rounded-lg text-xs text-red-300 font-semibold flex items-center gap-1">
                  <IconHeart className="h-3 w-3 fill-red-400" />
                  {blog.likes}
                </span>
              )}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-neutral-800/60 border border-neutral-700/50 rounded-full text-xs text-neutral-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <Link
              href={`/blogs/${blog.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 group"
            >
              <span>Read Full Entry</span>
              <IconExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}