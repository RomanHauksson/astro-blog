// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// Example of props from a blog post
// title: "graphing tangent lines to two circles"
// projectDate: "2023 Jul 10"
// publishDate: "2024 Mar 4"
// lastUpdateDate: "2024 Mar 4"
// description: "a system of equations for the lines tangent to two circles on the coordinate plane"
// heroImage: "/src/assets/tangents.webp"

// 2. Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    publishDate: z.string().optional(),
    lastUpdateDate: z.string().optional(),
    description: z.string(),
    heroImage: z.string(),
    draft: z.boolean().optional()
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    projectDate: z.string().optional(),
    publishDate: z.string().optional(),
    lastUpdateDate: z.string().optional(),
    draft: z.boolean().optional()
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'posts': postsCollection,
  'projects': projectsCollection
};