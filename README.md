# Plastercycle — plastercycle.com

Website for Plastercycle: enclosed, hook-lift plasterboard bins for councils, transfer stations and building sites.

Built with [Astro](https://astro.build) as a static site and published with GitHub Pages. Every push to `main` rebuilds and redeploys through `.github/workflows/deploy.yml`.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Where things live

| What | File |
|---|---|
| Nav, enquiry email, bin dimensions | `src/data/site.ts` |
| Every figure on the site, with sources | `src/data/facts.ts` (rendered at `/facts/`) |
| Logo (traced from the concept render) | `src/components/Logo.astro`, `src/data/logoPaths.ts` |
| Bin drawings | `public/images/` (cut from the fabrication concept render) |
| Levy calculator | `src/components/Calculator.astro` |
| Pages | `src/pages/` |

## Before launch

- **Enquiry inbox.** The Book a bin form opens the visitor's email app addressed to `ENQUIRY_EMAIL` in `src/data/site.ts`. Change it there if enquiries should go elsewhere, or swap in a form service.
- **Logo.** The icon is a trace of the AI concept render and the wordmark is set in Montserrat. Replace with final artwork when it exists.
- **Bin images.** Taken from the concept drawing. Swap for photos of the real bin once it's built.
- **Levy figures.** Victorian rates for 2026–27. They change every 1 July — update `LEVY` in `src/data/facts.ts`.

## Custom domain

To serve the site at plastercycle.com: add `public/CNAME` containing `plastercycle.com`, set the domain under the repo's Settings → Pages, and point DNS at GitHub Pages. The workflow builds at the root automatically when `CNAME` exists.
