// import prisma from "@/lib/db";
import { blogDataSchema } from "@/types/blogData";
// import z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request, {params}: {params: {slug: string}}) {
    //no auth needed;
    try{
        const blog = await prisma.blog.findUnique({
            where: {
                slug: params.slug,
            },
        });
        if (!blog) {
            return new Response("Blog not found", {status: 404});
        } else {
            return new Response(JSON.stringify({ blog }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error : unknown) {
        return new Response("Internal Server Error", {status: 500});
    }
}

export async function PUT(request: Request, {params}: {params: {slug: string}}) {
    const body = await request.json();
    const blogData = blogDataSchema.parse(body);
    try {
        const blog = await prisma.blog.update({
            where: {
                slug: params.slug,
            },
            data: {
                ...blogData,
                content: JSON.stringify(blogData.content),
                tableOfContent: JSON.stringify(blogData.tableOfContent),
                comments: blogData.comments ? JSON.stringify(blogData.comments) : undefined,
            },
        });
        return new Response(JSON.stringify({ blog }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error : unknown) {
        return new Response("Internal Server Error", {status: 500});
    }
}

export async function DELETE(request: Request, {params}: {params: {slug: string}}) {
    // const body = await request.json();
    // console.log(body)
    try {
        const blog = await prisma.blog.delete({
            where: {
                slug: params.slug,
            },
        });
        return new Response(JSON.stringify({ blog }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error : unknown) {
        return new Response("Internal Server Error", {status: 500});
    }
}