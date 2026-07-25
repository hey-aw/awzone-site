const caseStudies = [
  {
    number: "01",
    title: "OpenSciEd curriculum access",
    label: "Education · AI infrastructure",
    description:
      "An evolving approach to helping educators find and use curriculum materials, moving from an Azure Cognitive Search and RAG prototype toward a governed, read-only MCP service and an instructional skill.",
    detail:
      "Case study in development: architecture, governance, retrieval quality, and what changed when the system was designed for both people and agents.",
    featured: true,
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="AW, home">
          <span className="wordmark-mark">AW</span>
          <span className="wordmark-text">Product developer</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-contact" href="mailto:aw@awzone.com">
          Let&apos;s talk <Arrow />
        </a>
      </header>

      <div id="top" className="hero-shell">
        <section id="main-content" className="hero" aria-labelledby="hero-title">
          <div className="hero-kicker reveal reveal-1">
            <span className="status-dot" aria-hidden="true" />
            AI product development · education + healthcare
          </div>
          <h1 id="hero-title" className="reveal reveal-2">
            I build AI products
            <br />
            for <em>human understanding.</em>
          </h1>
          <div className="hero-bottom reveal reveal-3">
            <p>
              I focus on understanding people&apos;s needs, identifying the most
              limiting obstacles, and rapidly prototyping and iterating on
              helpful applications that deliver value through ease and clarity.
            </p>
            <a className="text-link" href="#work">
              See selected work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <aside className="principles reveal reveal-4" aria-label="Working principles">
          <p className="eyebrow">Working principles</p>
          <ol>
            <li>
              <span>01</span>
              Learn the needs
            </li>
            <li>
              <span>02</span>
              Identify opportunities
            </li>
            <li>
              <span>03</span>
              Build, Measure, Learn
            </li>
          </ol>
        </aside>
      </div>

      <section id="work" className="section work-section" aria-labelledby="work-title">
        <div className="section-intro">
          <p className="eyebrow">Selected work · 2023–now</p>
          <h2 id="work-title">Products that help people make sense of things.</h2>
          <p>
            A closer look at product, research, and systems work in education.
            Public write-ups are intentionally careful about people, data, and
            client context.
          </p>
        </div>

        <div className="case-list">
          {caseStudies.map((item) => (
            <article
              className={`case-card${item.featured ? " case-card-featured" : ""}`}
              key={item.number}
            >
              <div className="case-number">{item.number}</div>
              <div className="case-copy">
                <p className="case-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="case-detail">
                {item.featured && <span className="in-progress">In development</span>}
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="about-lead">
          <p className="eyebrow">A little background</p>
          <h2 id="about-title">
            Product sense,
            <br />
            systems thinking,
            <br />
            <em>insatiable curiosity.</em>
          </h2>
        </div>
        <div className="about-copy">
          <p>
            My work brings together product development, learning design, and
            applied AI. I like ambiguous problems, small capable teams, and
            turning emerging technology into something people can understand
            and trust.
          </p>
          <p>
            I&apos;m especially interested in work that improves how people
            learn, make decisions, and navigate high-stakes information.
          </p>
          <a className="button-link" href="mailto:aw@awzone.com">
            aw@awzone.com <Arrow />
          </a>
        </div>
      </section>

      <footer>
        <div>
          <span className="footer-mark">AW</span>
          <p>AI products for human understanding.</p>
        </div>
        <p className="footer-meta">California · Working thoughtfully across time zones</p>
        <a href="#top" aria-label="Back to top">
          Back to top ↑
        </a>
      </footer>
    </main>
  );
}
