import { blogDataSchema } from "@/types/blogData";
import prisma from "@/lib/prisma"; // Use Singleton
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";

export async function GET(_req: Request, {params}: {params: Promise<{slug: string}>}) {
    const { slug } = await params;
    try{
        const blog = await prisma.blog.findUnique({
            where: {
                id: Number(slug),
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

export async function PUT(request: Request, {params}: {params: Promise<{slug: string}>}) {
    //admin check
    const { slug } = await params;
    const body = await request.json();
    const blogData = blogDataSchema.parse(body);
    try {
        const blog = await prisma.blog.update({
            where: {
                slug: slug,
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

        if ((error as PrismaClientKnownRequestError).code === "P2025") {
            return new Response("Blog not found", { status: 404 });
        }

        return new Response("Internal Server Error", {status: 500});
    }
}

export async function DELETE(_req: Request, {params}: {params: Promise<{slug: string}>}) {
    const { slug } = await params;
    try {
        const blog = await prisma.blog.delete({
            where: {
                slug: slug,
            },
        });
        return new Response(JSON.stringify({ blog, message: "Blog deleted successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error : unknown) {
        console.error("DELETE /blog error:", error);

        if ((error as PrismaClientKnownRequestError).code === "P2025") {
            return new Response("Blog not found", { status: 404 });
        }

        return new Response("Internal Server Error", {status: 500});
    }
}