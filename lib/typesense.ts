// https://github.com/rebelchris/astro-typesense-search/blob/master/src/lib/typesense.js

import 'dotenv/config'
// import { zodToTypesenseSchema } from './zodToTypesense.js';
// import { collections } from '../content/config.ts';
import Typesense from 'typesense';
import fetch from 'node-fetch';
import type { NodeConfigurationWithHostname } from 'typesense/lib/Typesense/Configuration';
import he from 'he';
import { optional } from 'astro/zod';

(async () => {
  if (!process.env.TYPESENSE_HOST) {
    throw new Error('TYPESENSE_HOST is not set');
  }
  if (!process.env.TYPESENSE_PORT) {
    throw new Error('TYPESENSE_PORT is not set');
  }
  if (!process.env.TYPESENSE_PROTOCOL) {
    throw new Error('TYPESENSE_PROTOCOL is not set');
  }
  if (!process.env.TYPESENSE_ADMIN_KEY) {
    throw new Error('TYPESENSE_ADMIN_KEY is not set');
  }

  // Create a new client
  const client = new Typesense.Client({
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: parseInt(process.env.TYPESENSE_PORT),
        protocol: process.env.TYPESENSE_PROTOCOL,
      } as NodeConfigurationWithHostname,
    ],
    apiKey: process.env.TYPESENSE_ADMIN_KEY,
    connectionTimeoutSeconds: 2,
  });

  // Delete the old posts collection if it exists
  try {
    await client.collections('posts').delete();
  } catch (error) {
    console.error('Could not delete posts collection');
  }

  // Create a post schema
  const postsSchema = {
    name: 'posts',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'slug', type: 'string' },
      { name: 'imagePath', type: 'string' },
      { name: 'publishDate', type: 'string' },
      { name: 'draft', type: 'bool', optional: true },
    ],
  };

  const projectsSchema = {
    name: 'projects',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'slug', type: 'string' },
      { name: 'technologies', type: 'string', optional: true },
    ],
  };

  // const postsSchema = zodToTypesenseSchema(collections.blog.schema, 'posts');

  // Create post schema
  await client.collections().create(postsSchema);
  await client.collections().create(projectsSchema);

  // Retrieve data and extract JSON
  const data = fetch(process.env.SEARCH_ENDPOINT)
    .then((response) => response.text())
    .then((text) => {
      // Find the JSON part within the HTML response
      const jsonStart = text.indexOf('[{');
      const jsonEnd = text.lastIndexOf('}]') + 2;
      const jsonData = text.substring(jsonStart, jsonEnd);

      // Decode HTML entities
      const decodedData = he.decode(jsonData);

      // Parse the decoded JSON
      const parsedData = JSON.parse(decodedData);
      return parsedData;
    });

  const posts = await data.then((res) => res);
  for (const post of posts) {
    console.log("Attempting to upload a post. Here's its data:")
    console.log(post)
    if (post.draft) {
      console.log("Skipping draft post")
      continue;
    }
    const createPostResult = await client.collections('posts').documents().create(post);
    console.log(createPostResult);
  }

})().catch((err) => {
  console.error(err);
});