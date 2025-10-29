
import { loadBlogs } from "@/app/actions/loadBlogs";

export async function GET(request: Request) {
    const blogs = await loadBlogs();  //use of server action to load blogs
    return Response.json(blogs);
}

export async function POST(request: Request) {
    // const session = await getSession();
    // if(session?.user.role !== "ADMIN"){
    //     return new Response("Unauthorized", { status: 403 });
    // }
    // const body = await request.json();
    // const blog = await request.db.blog.create({
    //     data: {
    //         ...body,
    //         author: { connect: { id: session.user.id } },
    //     },
    // });
    // return new Response(blog);
}

export async function PUT(request: Request) {
    // const session = await getSession();
    // if(session?.user.role !== "ADMIN"){
    //     return new Response("Unauthorized", { status: 403 });
    // }
    // const body = await request.json();
    // const blog = await request.db.blog.update({
    //     where: { id: body.id },
    //     data: {
    //         ...body,
    //     },
    // });
    // return new Response(blog);
}

export async function DELETE(request: Request) {
    // const session = await getSession();
    // if(session?.user.role !== "ADMIN"){
    //     return new Response("Unauthorized", { status: 403 });
    // }
    // const body = await request.json();
    // const blog = await request.db.blog.delete({
    //     where: { id: body.id },
    // });
    // return new Response(blog);
}