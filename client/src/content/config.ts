// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Example of props from a blog post
// title: "graphing tangent lines to two circles"
// projectDate: "2023 Jul 10"
// publishDate: "2024 Mar 4"
// lastUpdateDate: "2024 Mar 4"
// description: "a system of equations for the lines tangent to two circles on the coordinate plane"
// heroImage: "/src/assets/tangents.webp"

// 2. Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    publishDate: z.string().optional(),
    lastUpdateDate: z.string().optional(),
    description: z.string(),
    heroImagePath: z.string(),
    draft: z.boolean().optional(),
    // Project-specific fields (now optional for posts)
    projectDate: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    hoursWorked: z.number().optional(),
  }),
});

const talksCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishDate: z.string().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  talks: talksCollection,
};
