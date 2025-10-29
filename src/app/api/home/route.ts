import { loadProjectsPreview } from "@/app/actions/projects/loadProjectsPreview";

export async function GET() {
    const projects = await loadProjectsPreview();
    return Response.json(projects);
}

// export async function POST(request: Request) {
//     const body = await request.json();
//     const project = await prisma.project.create({
//         data: {
//             ...body,
//         },
//     });
//     return new Response(project);
// }