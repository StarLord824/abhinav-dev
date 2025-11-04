'use server'
// import prisma from '@/lib/prisma';

export async function loadProjectData( { params }: { params: { slug: string } }) {
    const slug = params.slug;
    console.log(slug);
    // const project = await prisma.project.findUnique({
    //     where: { slug }
    // });
    // return project;
    return { message: 'Not implemented yet' };
}