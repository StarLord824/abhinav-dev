import z from "zod"
import { blogContentSchema } from "@/types/blogData"

const contentSchema = z.object({
    content: z.array(blogContentSchema)
})

export default function Content( {content} : {content: z.infer<typeof contentSchema>}) {
    return (
        <>
            <h2>Content</h2>
        </>
    )
}