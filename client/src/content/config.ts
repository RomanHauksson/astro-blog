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
const blogCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    projectDate: z.string(),
    publishDate: z.string(),
    lastUpdateDate: z.string(),
    description: z.string(),
    heroImage: z.string(),
  }),
});



// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'blog': blogCollection,
};