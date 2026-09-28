# Elite Gutters and Aluminium Products

Marketing site for [eliteguttersandaluminium.co.za](https://eliteguttersandaluminium.co.za) — _Build | Protect | Enhance_.

Built with TanStack Start (React, Vite, TypeScript, Tailwind). Connected to [Lovable](https://lovable.dev/projects/1e3058c4-8346-4e49-a85f-cfea4a2f31fa): commits pushed to `main` sync back to the Lovable editor.

## Editing content

| What | Where |
| --- | --- |
| Copy, services, FAQs, contact details, project captions | `src/data/content.ts` |
| Images and video slots | `src/data/images.ts` |
| Page titles, meta tags, JSON-LD helpers | `src/data/seo.ts` |
| Sitemap / robots | `public/sitemap.xml`, `public/robots.txt` |

Blocks marked `CLIENT CONTENT` in `content.ts` (the Why Seamless Gutters advantages list and the About story) are waiting on client material.

### Photos and videos

Every image renders with a `data-slot` attribute matching an entry in `src/data/images.ts`. Project photos are WebP files in `public/images/<category>/` (max 1920px wide) and videos are muted H.264 MP4s with WebP posters in `public/videos/`. `media-plan.md` records which original client file became which slot.

To replace a photo, add the new file, point its slot's `src` at it and update `width`, `height` and `alt`. Keep every file under 5 MB.

## Development

```sh
bun install
bun run dev      # http://localhost:5173
bun run build
bun run lint
```

Pages are file routes in `src/routes/`. Service pages are generated from `services` in `content.ts` via `src/routes/services.$slug.tsx`. If you add a service, also add its URL to `public/sitemap.xml`.
