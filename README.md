# AWZone

Standalone public bulletin board for AW: product development, projects in
teaching and learning and healthcare, fun experiments, dated notes, and links
to the original work.

The homepage is organized like a restrained late-1980s or early-1990s personal
BBS. It opens with a system bulletin and main menu, groups work into project
boards, and keeps supporting links in a separate resources area. Published notes
retain durable URLs under `/notes/`.

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

- Production: https://www.awzone.com
- Vercel fallback: https://awzone-site.vercel.app
- Vercel project: `awzone/awzone-site`
- GitHub: https://github.com/hey-aw/awzone-site

No environment variables are required. Redesign branches should be previewed
before merge and must not be deployed or promoted without an explicit launch
decision.
