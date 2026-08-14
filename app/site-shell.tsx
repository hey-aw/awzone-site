import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-shell masthead">
        <div className="brand-lockup">
          <Link className="site-title" href="/" aria-label="AWzone home">
            AWzone
          </Link>
          <p>Notes and working examples from AW</p>
        </div>
        <nav aria-label="Primary navigation">
          <Link href="/#examples">Examples</Link>
          <Link href="/#about">About</Link>
          <a href="mailto:aw@awzone.com">Email</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-inner">
        <p>
          <span>AWzone</span>
          A public notebook about AI products, learning, and human understanding.
        </p>
        <div>
          <a href="mailto:aw@awzone.com">aw@awzone.com</a>
          <a href="https://github.com/hey-aw" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/mattaw" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/hey-aw/awzone-site" target="_blank" rel="noreferrer">
            Source for this site
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
