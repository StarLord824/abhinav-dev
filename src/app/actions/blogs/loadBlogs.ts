'use server'
import prisma from '@/lib/prisma';

export async function loadBlogs() {
    const blogs = await prisma.blog.findMany();
    return blogs;
}