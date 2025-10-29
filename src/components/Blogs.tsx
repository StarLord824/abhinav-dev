import React from "react";
import { BentoGrid, BentoGridItem } from "@/ui/bento-grid";
import { IconArrowWaveRightUp } from "@tabler/icons-react";
import { blogPreviewSchema } from "@/types/blogData";
import { loadBlogsPreview } from "@/app/actions/blogs/loadBlogsPreview";
import z from "zod";
import Image from "next/image";

export default async function Blogs() {  
  let blogs: z.infer<typeof blogPreviewSchema>[] = [];

  try {
    const data = await loadBlogsPreview();
    blogs = data.map((blog) => blogPreviewSchema.parse(blog));
  } catch (error) {
    console.error("Failed to load or validate blogs:", error);
    return (
      <div className="flex flex-col items-center justify-center py-24 text-neutral-400">
        <div className="animate-pulse text-lg">
          Error summoning blogs from the arena ⚔️
        </div>
      </div>
    );
  }

  if (blogs.length === 0)
  return (
    <div className="flex flex-col items-center justify-center py-24 text-neutral-400">
      <div className="animate-pulse text-lg">Summoning blogs from the arena...</div>
    </div>
  );

  return (
    <BentoGrid className="max-w-85vw mx-auto p-4 md:p-8">
      {/* <Link href={item.url || "hey"} key={i} className="block group"> */}
      {blogs.map((blog, i) => (
          <BentoGridItem
            key = {i}
            title = {blog.title}
            // description = {blog.content?.[0]?.children?.[0]?.text?.slice(0, 100) || blog.description || ""}
            header = {<BlogThumbnail thumbnail={blog.thumbnail} />}
            icon = {<IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />}
            className={`
                ${i===3 ? "md:col-span-2 row-span-2" : ""} 
                ${ i==9 ? "md:col-span-2" : ""} 
                ${ i==2 ? "md:row-span-2" : ""}
                hover:border-yellow-400/50 hover:shadow-yellow-400/20 bg-gradient-to-br from-[#0e0e0e] via-[#141414] to-[#181818] border border-[#2c2c2c]
            `}
          />
        ))}
        {/* </Link> */}
    </BentoGrid>
  );
}

// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
//     {/* <Image src="https://unsplash.com/photos/a-bunch-of-pink-donuts-are-stacked-on-top-of-each-other-obyYZVKwCNI" alt="placeholder" width={400} height={400} /> */}
//   </div>
// );

function BlogThumbnail({ thumbnail }: { thumbnail?: string }) {
  return (
    <div className="flex w-full h-full rounded-xl overflow-hidden bg-neutral-900">
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex-1 bg-gradient-to-br from-neutral-800 to-neutral-700" />
      )}
    </div>
  );
}

// function loadBlogPreview() {
//   throw new Error("Function not implemented.");
// }
