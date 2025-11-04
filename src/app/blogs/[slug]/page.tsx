import { notFound } from "next/navigation";
import { blogDataSchema } from "@/types/blogData";
import { loadBlogBySlug } from "@/app/actions/blogs/loadBlogBySlug";
import BlogDetailClient from "@/components/Blogs/BlogDetailClient";
import { IconSwords } from "@tabler/icons-react";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  let blog;

  try {
    const data = await loadBlogBySlug(params.slug);
    if (!data) {
      notFound();
    }
    blog = blogDataSchema.parse(data);
  } catch (error) {
    console.error("Failed to load blog:", error);
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/Blog/Blog_Header.png')" }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full" />
          <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-red-950 border-2 border-red-900/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            <IconSwords className="h-12 w-12 text-red-500 mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-neutral-300 text-center font-bold">
              Battle Entry Not Found ⚔️
            </p>
            <p className="text-sm text-neutral-500 text-center mt-2">
              This chronicle has been lost to the arena
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <BlogDetailClient blog={blog} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogDetailPageProps) {
  try {
    const blog = await loadBlogBySlug(params.slug);
    if (!blog) return { title: "Blog Not Found" };

    const description = blog.content
      ?.find((block: any) => block.type === "paragraph" && block.text)
      ?.text?.slice(0, 160) || blog.title;

    return {
      title: blog.title,
      description,
      openGraph: {
        title: blog.title,
        description,
        images: blog.thumbnail ? [{ url: blog.thumbnail }] : [],
        type: "article",
        publishedTime: new Date(blog.createdAt).toISOString(),
        tags: blog.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: blog.thumbnail ? [blog.thumbnail] : [],
      },
    };
  } catch {
    return { title: "Blog" };
  }
}

// import axios from "axios";
// import { blogDataSchema } from "@/types/blogData";
// import z from "zod";
// import TableofContent from "./TableofContent";
// import Content from "./Content";

// export default async function BlogPage({params} : {params: {slug: string}}) {
//     //title + main image + date + author
//     //tags + category
//     //table of content
//     //blog content
//     //comments + likes + more related blogs
    
//     // const blogData : z.infer<typeof blogDataSchema> = await getBlogData(params.slug);

//     const blogData : z.infer<typeof blogDataSchema> = {
//         title: 'Starlord.dev',
//         image: 'https://images.unsplash.com/photo-1683278287297-d7c1e1f1b0a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//         date: '2023-03-01',         
//         author: 'Shukla Abhinav',
//         tags: ['Next.js', 'TailwindCSS', 'TypeScript', 'React', 'Node.js'],
//         category: 'Tech',
//         tableOfContent: [
//             {
//                 title: 'Introduction',
//                 level: 1,
//                 id: 'introduction'
//             },
//             {
//                 title: 'Getting Started',
//                 level: 2,
//                 id: 'getting-started'
//             },
//             {
//                 title: 'Next.js',
//                 level: 2,
//                 id: 'next-js'
//             },
//             {
//                 title: 'TailwindCSS',
//                 level: 2,
//                 id: 'tailwindcss'
//             },
//             {
//                 title: 'TypeScript',
//                 level: 2,
//                 id: 'typescript'
//             },
//             {
//                 title: 'React',
//                 level: 2,
//                 id: 'react'
//             },
//             {
//                 title: 'Node.js',
//                 level: 2,       
//                 id: 'node-js'
//             }
//         ],      
//         content: [
//             {
//                 type: 'paragraph',  
//                 text: 'This is a sample blog post content.'
//             }
//             // {
//             //     type: 'heading',
//             //     text: 'Heading 1',
//             //     level: 1
//             // },
//             // {
//             //     type: 'heading',
//             //     text: 'Heading 2',
//             //     level: 2
//             // },
//             // {
//             //     type: 'heading',
//             //     text: 'Heading 3',
//             //     level: 3
//             // },
//             // {
//             //     type: 'heading',
//             //     text: 'Heading 4',
//             //     level: 4
//             // },
//             // {
//             //     type: 'heading',
//             //     text: 'Heading 5',
//             //     level: 5
//             // },
//             // {
//             //     type: 'heading',
//             //     text: 'Heading 6',
//             //     level: 6
//             // },
//             // {
//             //     type: 'image',
//             //     text: 'https://images.unsplash.com/photo-1683278287297-d7c1e1f1b0a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//             //     level: 1
//             // },
//             // {
//             //     type: 'quote',
//             //     text: 'This is a quote.',
//             //     level: 1
//             // },
//             // {
//             //     type: 'code',
//             //     text: 'This is a code block.',
//             //     level: 1
//             // }
//         ],
//         comments: [
//             'This is a comment.',
//             'This is another comment.'
//         ],
//         likes: 10,
//         relatedBlogs: [
//             'https://www.example.com/blog/post-1',
//             'https://www.example.com/blog/post-2',
//             'https://www.example.com/blog/post-3'
//         ]
//     };
//     const content = blogData.content;
//     return (
//         <div className="snap-y snap-mandatory">
//             <BlogHeader blogData={blogData} />
//             <TableofContent toc={{ toc: blogData.tableOfContent }}/>
//             <Content content={{ content }} />
//             <BlogFooter />
//         </div>
//     )
// }

// export function BlogHeader({ blogData }: { blogData: z.infer<typeof blogDataSchema> }) {
//     return (
//         <div className="snap-y snap-mandatory">
//             <h1>{blogData.title}</h1>
//             <p>{blogData.date}</p>
//             <p>By {blogData.author}</p>
//             <img src={blogData.image} alt={blogData.title} className="w-full h-auto"/>
//         </div>
//     )
// }

// export function BlogFooter() {
//     return (
//         <div className="snap-y snap-mandatory">
//             <h1>Footer</h1>
//         </div>
//     )
// }

// // 'use server'
// // export async function getBlogData(slug: string) {
// //     const res = await axios.get(`/api/blogs/${slug}`);
// //     return res.data;
// // }