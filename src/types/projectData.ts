import { z } from "zod";

export const projectDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  tags: z.string(),
  technologies: z.array(z.string()),
  repoUrl: z.url(),
  liveUrl: z.url(),
  thumbnail: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProjectData = z.infer<typeof projectDataSchema>;