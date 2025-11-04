"use client";

import { useState, useEffect, useRef } from "react";
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
    setTimeout(() => setSelectedBlog(null), 300);
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

  // Calculate how many filler sections we need based on blog count
  const blogsPerFiller = 9;

  return (
    <div className="relative min-h-screen">
      
      {/* HEADER SECTION - BlogHeader.png with title overlay */}
      <section 
        className="relative w-full h-[40vh] md:h-[50vh] bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url('/Blog/Blog_Header.png')`
        }}
      >
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        
        {/* Title overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mb-4 text-center">
            Battle ⚔️ Logs 
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-semibold text-center max-w-2xl">
            Chronicles from the Arena 
          </p>
        </div>

        {/* Bottom fade to blend with content */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/40" />
      </section>

      {/* MAIN CONTENT - Blog grid with repeating filler backgrounds */}
      <section className="relative pb-16">
        {/* Repeating BlogFiller.png background - stops before footer */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: "url('/Blog/BlogFiller.png')",
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
            backgroundPosition: "top center",
            bottom: "64px" // Stop filler before footer to prevent overlap
          }}
        />

        {/* Content over the filler with extra bottom padding */}
        <div className="relative z-10 px-4 py-12 md:py-16 pb-24">
          {/* Improved BentoGrid with consistent spacing */}
          <BentoGrid className="max-w-7xl mx-auto gap-6">
            {blogs.map((blog, i) => {
              const isHighlight = i === 3;
              const isWide = i === 9;
              const isTall = i === 2;

              // Insert visual filler divider every 9 blogs
              const shouldShowDivider = i > 0 && i % blogsPerFiller === 0;

              return (
                <div key={blog.id} className="h-full">
                  {/* Filler divider for visual separation */}
                  {shouldShowDivider && (
                    <div className="col-span-full h-0 my-8 relative">
                      {/* Decorative line or spacer */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-neutral-600/50 to-transparent" />
                      </div>
                    </div>
                  )}

                  {/* Blog card with improved hover and spacing */}
                  <div
                    onClick={() => openModal(blog)}
                    className="cursor-pointer h-full"
                  >
                    <BentoGridItem
                      title={blog.title}
                      description={
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                          {blog.likes !== undefined && blog.likes > 0 && (
                            <span className="flex items-center gap-1">
                              <IconHeart className="h-3 w-3 fill-red-400 text-red-400" />
                              {blog.likes}
                            </span>
                          )}
                          <span>•</span>
                          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      }
                      header={<BlogThumbnail thumbnail={blog.thumbnail} likes={blog.likes} />}
                      icon={<IconArrowWaveRightUp className="h-4 w-4 text-blue-400" />}
                      className={`
                        ${isHighlight ? "md:col-span-2 md:row-span-2" : ""} 
                        ${isWide ? "md:col-span-2" : ""} 
                        ${isTall ? "md:row-span-2" : ""}
                        
                        bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-neutral-900/95
                        border border-neutral-700/60
                        backdrop-blur-sm
                        h-full
                        
                        transition-all duration-300 ease-out
                        hover:border-blue-500/70
                        hover:-translate-y-2
                        hover:shadow-2xl hover:shadow-blue-500/20
                        hover:scale-[1.02]
                      `}
                    />
                  </div>
                </div>
              );
            })}
          </BentoGrid>
        </div>

        {/* Extended bottom fade to blend with footer */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none z-20" />
      </section>

      {/* FOOTER SECTION - BlogFooter.png - Now fully visible */}
      <section 
        className="relative w-full h-[30vh] md:h-[40vh] bg-cover bg-bottom bg-no-repeat -mt-16"
        style={{
          backgroundImage: "url('/Blog/BlogFooter.png')"
        }}
      >
        {/* Top fade from content - blends naturally */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
        
        {/* Footer content overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-end px-4 pb-8">
          <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-xl px-6 py-3">
            <p className="text-neutral-300 text-sm md:text-base text-center font-medium">
              End of Battle Log • Return to the Arena
            </p>
          </div>
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
            src={thumbnail}
            alt="Blog thumbnail"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
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

// Blog Preview Modal Component with outside click detection
function BlogPreviewPane({ 
  blog, 
  onClose, 
  isOpen 
}: { 
  blog: BlogPreview; 
  onClose: () => void;
  isOpen: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      // Add listener with a slight delay to prevent immediate close
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop with blur - clicking here will trigger outside click */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        className={`fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 transition-all duration-300 pointer-events-none ${
          isOpen 
            ? "translate-y-0 opacity-100" 
            : "translate-y-full md:translate-y-0 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal content with ref for outside click detection */}
        <div 
          ref={modalRef}
          className="bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-900 border-2 border-neutral-700/80 rounded-t-3xl md:rounded-3xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] overflow-hidden pointer-events-auto"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-700/50 bg-gradient-to-r from-blue-950/30 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50" />
              <span className="text-sm text-neutral-300 uppercase tracking-wider font-bold">
                Battle Preview
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
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6 border-2 border-neutral-700/50">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
              </div>
            )}

            {/* Title */}
            <h2 id="modal-title" className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight drop-shadow-lg">
              {blog.title}
            </h2>

            {/* Meta info */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1.5 bg-neutral-800/90 border border-neutral-700 rounded-lg text-xs text-neutral-300 font-semibold backdrop-blur-sm">
                📅 {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              {blog.likes !== undefined && blog.likes > 0 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-red-600/30 to-red-500/30 border border-red-500/50 rounded-lg text-xs text-red-300 font-bold flex items-center gap-1 backdrop-blur-sm">
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
                    className="px-3 py-1.5 bg-neutral-800/70 border border-neutral-700/60 rounded-full text-xs text-neutral-400 font-medium backdrop-blur-sm hover:text-neutral-300 hover:border-neutral-600 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <Link
              href={`/blogs/${blog.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-lg rounded-xl transition-all duration-300 shadow-xl shadow-blue-600/40 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 hover:scale-105 group"
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