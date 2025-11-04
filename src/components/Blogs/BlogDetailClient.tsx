import { BlogData } from "@/types/blogData";
import Image from "next/image";

export default function BlogDetailClient({ blog }: { blog: BlogData }) {
  return (
    <div className="snap-y snap-mandatory">
      <h1>{blog.title}</h1>
      <p>{blog.createdAt as string}</p>
      <p>By {blog.authorId}</p>
      <Image 
        src={blog.thumbnail || '/blogs/altThumbnail.png'} 
        alt={blog.title} 
        fill
        className="w-full h-auto"
      />
    </div>
  );
}