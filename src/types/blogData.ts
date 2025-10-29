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
    id: z.string(), // used for anchor links
    level: z.number().min(1).max(6), // heading level
    title: z.string(),
})

export const blogDataSchema = z.object({
    id : z.number(),
    title: z.string(),
    slug: z.string(),

    authorId: z.string(),

    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
    published: z.boolean(),
    tags: z.array(z.string()),

    thumbnail: z.string().url().optional(),

    content: z.array(blogContentSchema),
    tableOfContent: z.array(tableOfContentItemSchema),

    likes: z.number().min(0).optional(),
    comments: z.array(z.string()).optional(),
    relatedBlogs: z.array(z.string()).optional(),

    createdAt: z.union([z.string(), z.date()]),
    updatedAt: z.union([z.string(), z.date()]),
})

export const blogPreviewSchema = z.object({
    id : z.number(),
    title: z.string(),
    slug: z.string(),
    authorId: z.string(),
    // status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
    // published: z.boolean(),
    tags: z.array(z.string()),
    thumbnail: z.string().url().optional(),
    likes: z.number().min(0).optional(),
    createdAt: z.union([z.string(), z.date()]),
    updatedAt: z.union([z.string(), z.date()]),
})

export type BlogContent = z.infer<typeof blogContentSchema>;
export type TableOfContentItem = z.infer<typeof tableOfContentItemSchema>;
export type BlogData = z.infer<typeof blogDataSchema>;
export type BlogPreview = z.infer<typeof blogPreviewSchema>;