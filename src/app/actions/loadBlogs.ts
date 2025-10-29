'use server'

import axios from "axios";

export async function loadBlogs() {
    const blogs : any = await axios.get("/api/blogs");
    return blogs.data;
}