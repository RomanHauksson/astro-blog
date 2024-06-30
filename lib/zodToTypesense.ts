import { z } from 'astro:content';

export function zodToTypesenseSchema(zodSchema, collectionName) {
  const fields = Object.keys(zodSchema.shape).map((key) => {
    const zodType = zodSchema.shape[key]._def.typeName;
    let type;

    switch (zodType) {
      case 'ZodString':
        type = 'string';
        break;
      // Add more cases here if you have other types in your Zod schema
      default:
        throw new Error(`Unsupported Zod type: ${zodType}`);
    }

    return { name: key, type };
  });

  return {
    name: collectionName,
    fields,
  };
}