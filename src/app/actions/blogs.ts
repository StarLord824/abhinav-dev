import prisma from '@/lib/prisma';

'use server'
export async function loadBlogs() {
    const blogs = await prisma.blog.findMany();
    return blogs;
}

'use server'
export async function loadBlogData( { params }: { params: { slug: string } }) {
    const slug = params.slug;

    const blogPost = await prisma.blog.findUnique({
        where: { slug }
    });

    return blogPost;
}

'use server'
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