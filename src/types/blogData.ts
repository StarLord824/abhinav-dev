import {z} from "zod";

export const blogContentSchema = z.object({
    type: z.enum(["paragraph", "heading", "image", "quote", "code"]), // block type
    text: z.string().optional(), // used for paragraph, heading, quote
    level: z.number().min(1).max(6).optional(), // for headings
    url: z.url().optional(), // for images
    language: z.string().optional(), // for code blocks
    code: z.string().optional(), // for code blocks
})

export const tableOfContentItemSchema = z.object({
    title: z.string(),
    level: z.number().min(1).max(6), // heading level
    id: z.string(), // used for anchor links
})

export const blogDataSchema = z.object({
    title: z.string(),
    image: z.string(),
    date: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    tableOfContent: tableOfContentItemSchema.array(),
    content: z.array(blogContentSchema),
    comments: z.array(z.string()).optional(),
    likes: z.number().min(0).optional(),
    relatedBlogs: z.array(z.string()).optional(),
})
