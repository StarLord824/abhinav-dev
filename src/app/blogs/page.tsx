import { IconSwords, IconSparkles } from "@tabler/icons-react";
import { blogPreviewSchema } from "@/types/blogData";
import { loadBlogsPreview } from "@/app/actions/blogs/loadBlogsPreview";
import BlogPageClient from "@/components/Blogs/BlogPageClient";

export default async function BlogPage() {
  let blogs;

  try {
    const data = await loadBlogsPreview();
    blogs = data.map((blog: unknown) => blogPreviewSchema.parse(blog));
  } catch (error) {
    console.error("Failed to load or validate blogs:", error);
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center"
        style={{ backgroundImage: '/Blog/BlogHeader.png' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full" />
          <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-red-950 border-2 border-red-900/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            <IconSwords className="h-12 w-12 text-red-500 mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-neutral-300 text-center font-bold">
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
      <div 
        className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center"
        style={{ backgroundImage: '/Blog/BlogHeader.png' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full animate-pulse" />
          <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-blue-950 border-2 border-blue-900/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            <IconSparkles className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-spin" />
            <p className="text-lg text-neutral-300 text-center font-bold">
              Summoning wisdom from the arena...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <BlogPageClient blogs={blogs} />;
}