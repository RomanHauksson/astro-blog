// https://github.com/rebelchris/astro-typesense-search/blob/master/src/lib/typesense.js

import 'dotenv/config'
import Typesense from 'typesense';
import fetch from 'node-fetch';
import type { NodeConfigurationWithHostname } from 'typesense/lib/Typesense/Configuration';
import he from 'he';

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
  if (!process.env.SEARCH_ENDPOINT) {
    throw new Error('SEARCH_ENDPOINT is not set');
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
    console.log('Could not delete posts collection');
  }

  // Delete the old projects collection if it exists
  try {
    await client.collections('projects').delete();
  } catch (error) {
    console.error('Could not delete projects collection');
  }

  // Create a post schema
  const postsSchema = {
    name: 'posts',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'publishDate', type: 'string', sort: true },
      { name: 'lastUpdateDate', type: 'string', sort: true },
      { name: 'description', type: 'string' },
      { name: 'heroImagePath', type: 'string' },
      { name: 'draft', type: 'bool', optional: true },
      { name: 'slug', type: 'string' },
    ],
  };

  const projectsSchema = {
    name: 'projects',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'heroImagePath', type: 'string' },
      { name: 'projectDate', type: 'string', optional: true, sort: true },
      { name: 'publishDate', type: 'string', optional: true, sort: true },
      { name: 'lastUpdateDate', type: 'string', optional: true, sort: true },
      { name: 'draft', type: 'bool', optional: true },
      { name: 'technologies', type: 'string[]', optional: true },
      { name: 'hoursWorked', type: 'int32', optional: true },
      { name: 'slug', type: 'string' },
    ],
  };

  // Create schemas
  await client.collections().create(postsSchema);
  await client.collections().create(projectsSchema);

  // Retrieve data and extract JSON
  const data = await fetch(process.env.SEARCH_ENDPOINT)
    .then((response) => response.text())
    .then((text) => {
      // Find the JSON part within the HTML response
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}') + 2;
      const jsonData = text.substring(jsonStart, jsonEnd);

      // Decode HTML entities
      const decodedData = he.decode(jsonData);

      // Parse the decoded JSON
      const parsedData = JSON.parse(decodedData);
      return parsedData;
    });

  const posts = data.posts;
  const projects = data.projects;

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

  for (const project of projects) {
    console.log("Attempting to upload a project. Here's its data:")
    console.log(project)
    if (project.draft) {
      console.log("Skipping draft project")
      continue;
    }
    const createProjectResult = await client.collections('projects').documents().create(project);
    console.log(createProjectResult);
  }

})().catch((err) => {
  console.error(err);
});