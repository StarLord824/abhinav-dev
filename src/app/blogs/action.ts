'use server'

import axios from "axios";

export async function loadBlogs() {
    const blogs = await axios.get('/api/blogs');
    return blogs.data;
}