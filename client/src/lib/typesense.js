// https://github.com/rebelchris/astro-typesense-search/blob/master/src/lib/typesense.js

// require('dotenv').config();
// const Typesense = require('typesense');
// const fetch = require('node-fetch');

import { getCollection, getEntry } from 'astro:content';
import Typesense from 'typesense';


(async () => {
  // Create a new client
  const client = new Typesense.Client({
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: process.env.TYPESENSE_PORT,
        protocol: process.env.TYPESENSE_PROTOCOL,
      },
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
      { name: 'altText', type: 'string' },
      { name: 'publishDate', type: 'string' },
    ],
  };

  // Create post schema
  await client.collections().create(postsSchema);

  console.log('made it!');
  console.log(process.env.SEARCH_ENDPOINT);

  const allBlogPosts = await getCollection('blog');

  // Loop over each item and create document
  data.then((res) => {
    for (post of res) {
      client.collections('posts').documents().create(post);
    }
  });
})().catch((err) => {
  console.error(err);
});