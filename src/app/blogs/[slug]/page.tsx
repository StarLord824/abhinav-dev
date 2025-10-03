import axios from "axios";
import { blogDataSchema } from "@/types/blogData";
import z from "zod";
import TableofContent from "./TableofContent";
import Content from "./content";

export default async function BlogPage({params} : {params: {slug: string}}) {
    //title + main image + date + author
    //tags + category
    //table of content
    //blog content
    //comments + likes + more related blogs
    
    const blogData : z.infer<typeof blogDataSchema> = await getBlogData(params.slug);
    return (
        <div className="snap-y snap-mandatory">
            <BlogHeader blogData={blogData} />
            <TableofContent toc={blogData.tableOfContent}/>
            <Content content={blogData.content}/>
            <BlogFooter />
        </div>
    )
}

export function BlogHeader({ blogData }: { blogData: z.infer<typeof blogDataSchema> }) {
    return (
        <div className="snap-y snap-mandatory">
            <h1>{blogData.title}</h1>
            <p>{blogData.date}</p>
            <p>By {blogData.author}</p>
            <img src={blogData.image} alt={blogData.title} className="w-full h-auto"/>
        </div>
    )
}

export function BlogFooter() {
    return (
        <div className="snap-y snap-mandatory">
            <h1>Footer</h1>
        </div>
    )
}

'use server'
export async function getBlogData(slug: string) {
    const res = await axios.get(`/api/blogs/${slug}`);
    return res.data;
}