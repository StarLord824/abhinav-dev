import { loadBlogs } from "@/app/actions/blogs/loadBlogs";
// import prisma from "@/lib/prisma";
// import { getSession } from "better-auth/api";

export async function GET() {
    const blogs = await loadBlogs();  //use of server action to load blogs
    return Response.json(blogs);
}

// export async function POST(request: Request) {
//     const session = await getSession();
//     if(session?.user.role !== "ADMIN"){
//         return new Response("Unauthorized", { status: 403 });
//     }
//     const body = await request.json();
//     const blog = await prisma.blog.create({
//         data: {
//             ...body,
//             author: { connect: { id: session.user.id } },
//         },
//     });
//     return new Response(blog);
// }