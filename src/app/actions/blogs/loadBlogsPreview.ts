'use server'
import prisma from '@/lib/prisma';

export async function loadBlogsPreview() {
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                // Only fetch published blogs for public view
                published: true,
                status: 'PUBLISHED'
            },
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
            },
            // Order by newest first
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log(`[loadBlogsPreview] Loaded ${blogs.length} published blogs from database`);
        return blogs;
    } catch (error) {
        console.error('[loadBlogsPreview] Database error:', error);
        throw new Error(
            error instanceof Error 
                ? `Database error: ${error.message}` 
                : 'Failed to connect to database'
        );
    }
}