// import prisma from "@/lib/db";
import { blogDataSchema } from "@/types/blogData";
// import z from "zod";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(_req: Request, {params}: {params: {slug: string}}) {
    //no auth needed;
    // const body = await request.json();
    // console.log(body)
    try{
        const blog = await prisma.blog.findUnique({
            where: {
                id: Number(params.slug),
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
        console.error("GET /blog error:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}

export async function PUT(request: Request, {params}: {params: {slug: string}}) {
    //admin check
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
        return new Response(JSON.stringify({ blog, message : "Blog updated successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error : unknown) {
        console.error("PUT /blog error:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return new Response("Blog not found", { status: 404 });
        }

        return new Response("Internal Server Error", {status: 500});
    }
}

export async function DELETE({params}: {params: {slug: string}}) {
    // const body = await request.json();
    // console.log(body)
    try {
        const blog = await prisma.blog.delete({
            where: {
                slug: params.slug,
            },
        });
        return new Response(JSON.stringify({ blog, message: "Blog deleted successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error : unknown) {
        console.error("DELETE /blog error:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return new Response("Blog not found", { status: 404 });
        }

        return new Response("Internal Server Error", {status: 500});
    }
}