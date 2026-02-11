"use client";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useBlogStoreContext } from "@/providers/blog-store-provider"; // Added import
import { 
  // IconSwords, 
  IconSparkles,
  IconX,
  IconExternalLink,
  IconHeart
} from "@tabler/icons-react";
import { BlogPreview } from "@/types/blogData";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "./BlogCard";

// interface BlogPageClientProps {
//   // blogs: BlogPreview[]; // blogs are now in the store
// }

export default function BlogPageClient() {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { 
    blogs, 
    isModalOpen, 
    selectedPreviewBlog, 
    openPreviewModal, 
    closePreviewModal 
  } = useBlogStoreContext((state) => state);

  const [selectedBlog, setSelectedBlog] = useState<BlogPreview | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync component local state with store for legacy support if needed, or replace usage entirely.
  // For this refactor, we will direct everything to the store.

  // Memoize handlers to prevent unnecessary re-renders and satisfy lint rules
  const openModal = (blog: BlogPreview) => {
    openPreviewModal(blog);
  };

  const closeModal = () => {
    closePreviewModal();
  };

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
  }, [isModalOpen, closePreviewModal]); // check dependency

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
  // const blogsPerFiller = 9;

  return (
    <div className="relative min-h-screen">
      
      {/* ADMIN BUTTON */}
      <div className="absolute top-6 right-6 z-50">
        <Link href="/blogs/admin" className="group relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-5 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-gray-900 group-hover:text-blue-200">
            Admin Login
          </span>
        </Link>
      </div>

      {/* HEADER SECTION - BlogHeader.png with title overlay */}
      <section 
        className="relative w-full h-[40vh] md:h-[50vh] bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url('/Blog/Blog_Header.png')`
        }}
      >
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        
        {/* Title overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4
                           drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]
                           [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%),_-1px_-1px_2px_rgb(255_255_255_/_20%)]
                           bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent
                           tracking-tight mt-18">
              Battle ⚔️ Logs
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/95 
                       drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]
                       font-bold text-center max-w-2xl
                       tracking-wide mt-36"
          >
            Chronicles from the Arena
          </motion.p>
        </div>

        {/* Enhanced bottom fade with matching gray-purple color */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#9d919d]/40 to-[#9d919d]/80" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#9d919d]/60 to-[#9d919d]" />
      </section>

      {/* MAIN CONTENT - Blog grid with repeating filler backgrounds */}
      <section className="relative pb-16">
        {/* Repeating BlogFiller.png background - stops before footer */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "url('/Blog/BlogFiller.png')",
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
            backgroundPosition: "top center",
            bottom: "64px" // Stop filler before footer to prevent overlap
          }}
        />

        {/* Smooth gradient overlay to blend backgrounds - using matching gray-purple */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#9d919d] via-[#9d919d]/70 to-transparent z-10" />

        {/* Content over the filler with extra bottom padding */}
        <div className="relative z-10 px-4 py-12 md:py-16 pb-24">
          {/* Bento Grid Layout with Varying Sizes - No Vertical Elongation */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.map((blog, i) => {
                // Define varying card sizes for visual interest (Horizontal only)
                const isFeatured = i === 0 || i === 5; // First and 6th cards are wide
                const isWide = i === 3 || i === 8; // Some cards span 2 columns
                
                return (
                  <div
                    key={blog.id}
                    className={`
                      ${isFeatured ? 'md:col-span-2' : ''}
                      ${isWide && !isFeatured ? 'md:col-span-2' : ''}
                    `}
                  >
                    <BlogCard
                      blog={blog}
                      index={i}
                      onClick={() => openModal(blog)}
                      featured={isFeatured}
                    />
                  </div>
                );
              })}
            </div>

            {/* Load More Button matching Landing Page style */}
            {blogs.length > 0 && (
              <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <motion.div 
                  className="relative"
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    hover: { scale: 1.02 },
                    tap: { scale: 0.98 }
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.button 
                    className="relative w-64 h-16 sm:w-72 sm:h-18 md:w-80 md:h-20 rounded-2xl"
                    variants={{
                      hover: { y: -2 },
                      tap: { y: 1 }
                    }}
                  >
                    {/* Main button container */}
                    <motion.div 
                      className="flex justify-center items-center relative w-full h-full bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-2xl border-b-4 border-orange-600 shadow-lg"
                      variants={{
                        hover: { 
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2), inset 0px 4px 8px rgba(97, 82, 61, 0.3)",
                          borderBottomWidth: "4px"
                        },
                        tap: { 
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15), inset 0px 2px 4px rgba(97, 82, 61, 0.4)",
                          borderBottomWidth: "2px"
                        }
                      }}
                      style={{
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15), inset 0px 4px 4px rgba(97, 82, 61, 0.25)"
                      }}
                    >
                      {/* Text content */}
                      <motion.div 
                        className="font-bold text-xl sm:text-2xl md:text-2xl text-black heavy-stroke-text select-none flex items-center gap-2"
                        style={{
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3), -1px -1px 0px rgba(255, 255, 255, 0.8)"
                        }}
                        variants={{
                          hover: { scale: 1.05 },
                          tap: { scale: 0.95 }
                        }}
                      >
                        Load More
                        {/* <svg className="w-6 h-6 stroke-black stroke-[3px]" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg> */}
                      </motion.div>
                      
                      {/* Glossy highlight */}
                      <motion.div 
                        className="absolute w-1.5 h-2 top-1.5 right-2 bg-white rounded-full opacity-80"
                        style={{ transform: "rotate(-35deg)" }}
                        variants={{
                          hover: { 
                            scale: 1.2,
                            opacity: 0.9,
                            boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
                          },
                          tap: { 
                            scale: 0.9,
                            opacity: 0.7
                          }
                        }}
                      />
                      
                      {/* Additional highlight for depth */}
                      <motion.div 
                        className="absolute top-2 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                        variants={{
                          hover: { opacity: 0.6 },
                          tap: { opacity: 0.3 }
                        }}
                        initial={{ opacity: 0.4 }}
                      />
                    </motion.div>
                    
                    {/* Subtle glow effect on hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-2xl bg-gradient-to-b from-yellow-200/20 to-yellow-400/20 pointer-events-none"
                      variants={{
                        hover: { opacity: 1 },
                        tap: { opacity: 0 }
                      }}
                      initial={{ opacity: 0 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Extended bottom fade to blend with footer - using matching gray-purple */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#9d919d]/50 to-[#9d919d]/90 pointer-events-none z-20" />
      </section>

      {/* FOOTER SECTION - BlogFooter.png - Now fully visible */}
      <section 
        className="relative w-full h-[30vh] md:h-[40vh] bg-cover bg-bottom bg-no-repeat -mt-16"
        style={{
          backgroundImage: "url('/Blog/BlogFooter.png')"
        }}
      >
        {/* Top fade from content - blends naturally with matching gray-purple */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#9d919d]/90 to-transparent" />
        
        {/* Footer content overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-end px-4 pb-8">
          <motion.div 
            className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-xl px-6 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/" className="text-neutral-300 text-sm md:text-base text-center font-medium hover:text-white transition-colors">
              End of Battle Log • Return to the Arena
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BLOG PREVIEW MODAL */}
      {isModalOpen && selectedPreviewBlog && (
        <BlogPreviewPane 
          blog={selectedPreviewBlog} 
          onClose={closeModal}
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
}

// Blog Thumbnail Component
// function BlogThumbnail({ thumbnail, likes }: { thumbnail?: string; likes?: number }) {
//   return (
//     <div className="relative flex w-full h-full min-h-[180px] rounded-xl overflow-hidden bg-neutral-900 group">
//       {thumbnail ? (
//         <>
//           <Image
//             src={thumbnail}
//             alt="Blog thumbnail"
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//             loading="lazy"
//           />
//           {likes !== undefined && likes > 0 && (
//             <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-red-500/90 backdrop-blur-sm rounded-full z-10">
//               <IconHeart className="h-3.5 w-3.5 text-white fill-white" />
//               <span className="text-xs font-bold text-white">{likes}</span>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="flex-1 bg-gradient-to-br from-neutral-800 via-neutral-850 to-neutral-900 relative">
//           <div 
//             className="absolute inset-0 opacity-20" 
//             style={{
//               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
//               backgroundSize: '32px 32px'
//             }}
//           />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <IconSwords className="h-16 w-16 text-neutral-700" />
//           </div>
//         </div>
//       )}
      
//       <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
//     </div>
//   );
// }

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal content with ref for outside click detection */}
        <motion.div 
          ref={modalRef}
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            y: isOpen ? 0 : 100,
            scale: isOpen ? 1 : 0.95
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.4, 0, 0.2, 1] // Custom easing for smooth feel
          }}
          className="bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-900 border-2 border-neutral-700/80 rounded-t-3xl md:rounded-3xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] overflow-hidden pointer-events-auto"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-700/50 bg-gradient-to-r from-blue-950/30 to-transparent">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50" />
              <span className="text-sm text-neutral-300 uppercase tracking-wider font-bold">
                Battle Preview
              </span>
            </motion.div>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-all duration-200"
              aria-label="Close preview"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <IconX className="h-5 w-5 text-neutral-400 hover:text-neutral-200" />
            </motion.button>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6 md:p-8 custom-scrollbar">
            {/* Thumbnail */}
            {blog.thumbnail && (
              <motion.div 
                className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6 border-2 border-neutral-700/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
              </motion.div>
            )}

            {/* Title */}
            <motion.h2 
              id="modal-title" 
              className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {blog.title}
            </motion.h2>

            {/* Meta info */}
            <motion.div 
              className="flex flex-wrap gap-3 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <span className="px-3 py-1.5 bg-neutral-800/90 border border-neutral-700 rounded-lg text-xs text-neutral-300 font-semibold backdrop-blur-sm">
                📅 {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              {blog.likes !== undefined && blog.likes > 0 && (
                <motion.span 
                  className="px-3 py-1.5 bg-gradient-to-r from-red-600/30 to-red-500/30 border border-red-500/50 rounded-lg text-xs text-red-300 font-bold flex items-center gap-1 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconHeart className="h-3 w-3 fill-red-400" />
                  {blog.likes}
                </motion.span>
              )}
            </motion.div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <motion.div 
                className="flex flex-wrap gap-2 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {blog.tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className="px-3 py-1.5 bg-neutral-800/70 border border-neutral-700/60 rounded-full text-xs text-neutral-400 font-medium backdrop-blur-sm hover:text-neutral-300 hover:border-neutral-600 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link
                href={`/blogs/${blog.slug}`}
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-lg rounded-xl transition-all duration-300 shadow-xl shadow-blue-600/40 hover:shadow-2xl hover:shadow-blue-500/50 group"
              >
                <span>Read Full Entry</span>
                <IconExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}