import { SiteFooter, SiteHeader } from "./site-shell";

const examples = [
  {
    status: "Live beta",
    title: "OpenSciEd Library MCP",
    description:
      "An experimental agent-friendly interface for retrieving and making use of open educational resources from OpenSciEd.",
    href: "https://openscied-library-mcp.vercel.app/healthz",
    linkLabel: "Check service health",
  },
  {
    status: "Open source",
    title: "Pacing Coach",
    description:
      "A conversational planning workflow that keeps the teacher in control of calendar, sequence, and pacing decisions.",
    href: "https://github.com/hey-aw/eddo-skills",
    linkLabel: "Browse the source",
  },
];

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
            {examples.map((example) => (
              <article className="example-card" key={example.title}>
                <p className="example-status">{example.status}</p>
                <h3>{example.title}</h3>
                <p>{example.description}</p>
                <a href={example.href} target="_blank" rel="noreferrer">
                  {example.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              </article>
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
