# AWZone

Standalone personal site for AW, an AI product developer working across
education and healthcare.

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

## Before connecting awzone.com

- Public examples, outcomes, and names for the education and healthcare work
- Preferred short biography and location line
- Any social, résumé, or scheduling links to add
- Final OpenSciEd case-study details and governance language
