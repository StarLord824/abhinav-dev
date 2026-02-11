import { IconSparkles, IconAlertTriangle } from "@tabler/icons-react";
import { blogPreviewSchema, type BlogPreview } from "@/types/blogData";
import { loadBlogsPreview } from "@/app/actions/blogs/loadBlogsPreview";
import BlogPageClient from "@/components/Blogs/BlogPageClient";
import Link from "next/link";
import { BlogStoreProvider } from "@/providers/blog-store-provider";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  let blogs: BlogPreview[] = [];
  let error: Error | null = null;

  try {
    const data = await loadBlogsPreview();
    
    // Validate and parse each blog
    blogs = data.map((blog: any) => {
      try {
        return blogPreviewSchema.parse(blog);
      } catch (parseError) {
        console.error("Failed to parse blog:", blog, parseError);
        throw parseError;
      }
    });

    console.log(`Successfully loaded ${blogs.length} blogs from database`);
  } catch (err) {
    error = err instanceof Error ? err : new Error("Unknown error occurred");
    console.error("Failed to load or validate blogs:", error);
  }

  // Error State - Database connection or validation failed
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-neutral-950 via-red-950/20 to-neutral-950">
        <div className="relative max-w-md w-full">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full animate-pulse" />
          
          <div className="relative bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-red-950/95 border-2 border-red-900/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            {/* Icon with animation */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
              <IconAlertTriangle className="relative h-16 w-16 text-red-500 mx-auto animate-bounce" />
            </div>

            {/* Error message */}
            <h2 className="text-2xl text-white text-center font-black mb-3">
              ⚔️ Arena Connection Lost
            </h2>
            <p className="text-base text-neutral-300 text-center mb-2">
              Failed to summon blogs from the kingdom
            </p>
            <p className="text-sm text-neutral-500 text-center mb-6 font-mono">
              {error.message}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5"
              >
                🔄 Retry Connection
              </button>
              <Link
                href="/"
                className="w-full px-6 py-3 bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-300 hover:text-white font-semibold rounded-lg transition-all duration-300 text-center border border-neutral-700/50"
              >
                ← Return to Arena
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty State - No blogs in database
  if (blogs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-neutral-950 via-blue-950/20 to-neutral-950">
        <div className="relative max-w-md w-full">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full animate-pulse" />
          
          <div className="relative bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-blue-950/95 border-2 border-blue-900/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            {/* Icon with animation */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
              <IconSparkles className="relative h-16 w-16 text-blue-400 mx-auto animate-spin" />
            </div>

            {/* Empty state message */}
            <h2 className="text-2xl text-white text-center font-black mb-3">
              📜 No Battle Logs Yet
            </h2>
            <p className="text-base text-neutral-300 text-center mb-6">
              The chronicles are empty. New adventures await to be written!
            </p>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href="/blogs/admin"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 text-center"
              >
                ✍️ Create First Blog
              </Link>
              <Link
                href="/"
                className="w-full px-6 py-3 bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-300 hover:text-white font-semibold rounded-lg transition-all duration-300 text-center border border-neutral-700/50"
              >
                ← Return to Arena
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success State - Render blogs
  return (
    <BlogStoreProvider initialState={{ blogs }}>
      <BlogPageClient />
    </BlogStoreProvider>
  );
}