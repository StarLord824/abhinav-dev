// //table of content
// import z from "zod";
// import { tableOfContentItemSchema } from "@/types/blogData";

// const tocSchema = z.object({
//     toc : z.array(tableOfContentItemSchema)
// })
// export default function TableofContent( toc : {toc: z.infer<typeof tocSchema>}) {
//     return (
//         <>
//             <h2>Table of Contents</h2>
//         </>
//     )
// }