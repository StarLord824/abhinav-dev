'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function loadBlogsPreview() {
    const blog = await prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            authorId: true,
            tags: true,
            thumbnail: true,
            likes: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    return blog;
}