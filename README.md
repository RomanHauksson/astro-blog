# my blog

This is the repository for my blog and personal website. It was initialized using [Astro's official blog template](https://astro.build/themes/details/blog/), but I wrote all of the components from scratch, except a couple. You can visit it at [roman.computer](https://roman.computer) or [roman.technology](https://roman.technology).

## tech stack

| technology                               | purpose                               |
| :--------------------------------------- | :------------------------------------ |
| [Astro](https://astro.build/)            | static site generator / web framework |
| [React](https://reactjs.org/)            | reactive components                   |
| [Tailwind CSS](https://tailwindcss.com/) | styling                               |
| [MDX](https://mdxjs.com/)                | writing documents                     |
| [Vercel](https://vercel.com/)            | frontend hosting                      |
| [Vimeo](https://vimeo.com/)              | video hosting                         |
| [PostHog](https://posthog.com/)          | analytics                             |

Current experimenting with setting up [Typesense](https://typesense.org/) to enable full text search of blog posts.

## usage

### install

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm run dev` to start a local development server at `localhost:4321`.

### upload blog posts to Typesense

1. Start up the Typesense service in the VPS.

```bash
docker run -p 8108:8108 \
  -v"$(pwd)"/typesense-data:/data typesense/typesense:26.0 \
  --data-dir /data \
  --api-key=$TYPESENSE_API_KEY \
  --enable-cors
```

IPv6: 2604:a880:4:1d0::5c0:3000
IPv4: 137.184.38.192

2. `npx tsx client/src/lib/typesense.ts`
