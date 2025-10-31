'use server'
import prisma from '@/lib/prisma';

export async function loadBlogData( { params }: { params: { slug: string } }) {
    const slug = params.slug;

    const blogPost = await prisma.blog.findUnique({
        where: { slug }
    });

    return blogPost;
}