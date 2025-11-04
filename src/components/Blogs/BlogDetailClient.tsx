import { BlogData } from "@/types/blogData";

export default function BlogDetailClient({ blog }: { blog: BlogData }) {
  return (
    <div className="snap-y snap-mandatory">
      <h1>{blog.title}</h1>
      <p>{blog.createdAt as string}</p>
      <p>By {blog.authorId}</p>
      <img src={blog.thumbnail || '/blogs/altThumbnail.png'} alt={blog.title} className="w-full h-auto"/>
    </div>
  );
}