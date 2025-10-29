'use server'
import { PrismaClient } from "@prisma/client";
import axios from "axios";


const prisma = new PrismaClient();

export async function loadBlogs() {
    const blogs : any = await prisma.blog.findMany();
    return blogs;
}