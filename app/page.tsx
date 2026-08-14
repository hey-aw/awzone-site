import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-shell";

type Example = {
  status: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  external?: boolean;
  secondaryLinks?: { href: string; label: string }[];
};

const primaryExamples: Example[] = [
  {
    status: "Case study",
    title: "AI-supported student-work analysis",
    description:
      "A teacher-co-designed prototype for analyzing student writing, aligning feedback to a rubric, and surfacing class-wide trends in Wauwatosa.",
    href: "https://eddolearning.com/blog/analyzing-student-work",
    linkLabel: "Read the case study",
    external: true,
  },
  {
    status: "Open source",
    title: "OpenSciEd Educator",
    description:
      "An installable role combining curriculum resource finding with a four-phase pacing workflow for teachers and instructional leaders.",
    href: "https://github.com/eddo-ai/eddo-skills",
    linkLabel: "Browse the skills",
    external: true,
  },
  {
    status: "Open source",
    title: "Classroom Transcripts",
    description:
      "An Azure-based workflow for transcribing classroom audio, identifying teacher and student voices, and supporting discussion analysis.",
    href: "https://github.com/eddo-ai/classroom-transcripts",
    linkLabel: "Browse the source",
    external: true,
  },
  {
    status: "Native app",
    title: "That Movie Night Life",
    description:
      "A SwiftUI iOS and tvOS app for drawing from a 10,734-film Letterboxd list while filtering watched titles and optional buzz kills.",
    href: "https://github.com/hey-aw/that-movie-night-life",
    linkLabel: "Browse the source",
    external: true,
  },
];

const moreExperiments: Example[] = [
  {
    status: "Live beta",
    title: "OpenSciEd Library MCP",
    description:
      "An experimental agent-friendly interface for retrieving and making use of open educational resources from OpenSciEd.",
    href: "/notes/openscied-from-rag-to-mcp",
    linkLabel: "Read the build note",
    secondaryLinks: [
      {
        href: "https://openscied-library-mcp.vercel.app/healthz",
        label: "Live health status",
      },
    ],
  },
  {
    status: "Open source",
    title: "Pacing Coach",
    description:
      "A conversational planning workflow that keeps the teacher in control of calendar, sequence, and pacing decisions.",
    href: "https://github.com/eddo-ai/eddo-skills",
    linkLabel: "Browse the source",
    external: true,
  },
];

function ExampleCard({ example, compact = false }: { example: Example; compact?: boolean }) {
  return (
    <article className={`example-card${compact ? " example-card-compact" : ""}`}>
      <p className="example-status">{example.status}</p>
      <h3>{example.title}</h3>
      <p>{example.description}</p>
      <div className="example-links">
        {example.external ? (
          <a href={example.href} target="_blank" rel="noreferrer">
            {example.linkLabel} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <Link href={example.href}>
            {example.linkLabel} <span aria-hidden="true">→</span>
          </Link>
        )}
        {example.secondaryLinks?.map((link) => (
          <a className="secondary-link" href={link.href} key={link.href} target="_blank" rel="noreferrer">
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <SiteHeader />

      <div className="page-shell">
        <section id="main-content" className="intro" aria-labelledby="intro-title">
          <p className="edition-note">A public notebook · Portland, OR</p>
          <div className="intro-copy">
            <h1 id="intro-title">Hi, I&apos;m Matt AW.</h1>
            <p>
              I build and study AI products for learning, care, and other
              high-context work. This is where I share the useful parts:
              decisions, prototypes, failures, and patterns worth reusing.
            </p>
          </div>
        </section>

        <section id="examples" className="examples" aria-labelledby="examples-title">
          <div className="section-heading">
            <h2 id="examples-title">Open examples</h2>
            <p>Things you can study or try</p>
          </div>
          <div className="example-grid">
            {primaryExamples.map((example) => (
              <ExampleCard example={example} key={example.title} />
            ))}
          </div>
        </section>

        <section className="more-experiments" aria-labelledby="experiments-title">
          <div className="section-heading">
            <h2 id="experiments-title">More experiments</h2>
            <p>Smaller tools and focused explorations</p>
          </div>
          <div className="example-grid example-grid-secondary">
            {moreExperiments.map((example) => (
              <ExampleCard compact example={example} key={example.title} />
            ))}
          </div>
        </section>

        <section id="about" className="about" aria-labelledby="about-title">
          <p className="section-kicker">About</p>
          <div>
            <h2 id="about-title">I am interested in how people understand things.</h2>
            <p>
              My work brings together product development, learning design,
              user experience, and applied AI. Helpful solutions need to be
              capable, adaptable, and clear. I have worked in education and
              healthcare, where context matters and confident shortcuts can do
              real harm. I am fascinated by how people use technology to make
              chores easier and unlock discovery. I use this notebook space to
              share examples and invite curiosity.
            </p>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
