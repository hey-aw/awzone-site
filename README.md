# AWZone

Standalone editorial site for AW: dated notes, shareable working examples, and
lessons from building AI products in education, healthcare, and other
high-context settings.

The site is intentionally organized like a public notebook. The homepage
features selected work and smaller experiments, while each published note has a
durable URL under `/notes/`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Deployment

The project is a standard Next.js application and includes `vercel.json`.
It is connected to the `hey-aw/awzone-site` GitHub repository and deploys from
`main` through Vercel.

- Production: https://awzone-site.vercel.app
- Vercel project: `awzone/awzone-site`
- GitHub: https://github.com/hey-aw/awzone-site

No environment variables are required. `awzone.com` has not been connected and
its DNS configuration has not been changed.

Preview this editorial direction before merging it to `main`. A branch preview
must not be promoted to production or connected to the custom domain without an
explicit launch decision.

## Before connecting awzone.com

Connect `awzone.com` only after the editorial direction and initial public
notes have been reviewed.

- Confirm which working examples should be publicly linked
- Review the OpenSciEd case note for governance and source language
- Decide whether an RSS feed and archive taxonomy belong in the first release
- Replace or remove the previous social preview artwork before domain launch
