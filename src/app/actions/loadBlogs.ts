'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function loadBlogs() {
    const blogs = await prisma.blog.findMany();
    return blogs;
}