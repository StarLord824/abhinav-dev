import prisma from "@/app/lib/db";
import { blogDataSchema } from "@/types/blogData";
import z from "zod";

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
    } catch (error : any) {
        return new Response(error, {status: 500});
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
    } catch (error : any) {
        return new Response(error, {status: 500});
    }
}

export async function DELETE(request: Request, {params}: {params: {slug: string}}) {
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
    } catch (error : any) {
        return new Response(error, {status: 500});
    }
}