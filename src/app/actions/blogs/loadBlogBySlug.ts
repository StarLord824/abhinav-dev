'use server'
import prisma from "@/lib/prisma";
import { blogDataSchema } from "@/types/blogData";

export async function loadBlogBySlug(slug: string) {
    const blog = await prisma.blog.findUnique({
        where: {
            slug: slug
        }
    });
    return blogDataSchema.parse(blog);
}