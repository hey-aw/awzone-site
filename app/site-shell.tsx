import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <div className="page-shell masthead">
        <div className="brand-lockup">
          <Link className="site-title" href="/" aria-label="AWzone BBS home">
            AWZONE BBS
          </Link>
          <p>Matt AW&apos;s public board / Portland, Oregon</p>
        </div>
        <nav aria-label="Board shortcuts">
          <ol>
            <li>
              <Link href="/#menu">
                <span aria-hidden="true">[0]</span> Menu
              </Link>
            </li>
            <li>
              <Link href="/#latest">
                <span aria-hidden="true">[1]</span> Notes
              </Link>
            </li>
            <li>
              <Link href="/#boards">
                <span aria-hidden="true">[2]</span> Projects
              </Link>
            </li>
            <li>
              <Link href="/#files">
                <span aria-hidden="true">[3]</span> Links
              </Link>
            </li>
            <li>
              <Link href="/#about">
                <span aria-hidden="true">[4]</span> Sysop
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="logoff" className="site-footer">
      <div className="page-shell footer-inner">
        <nav aria-label="Page links">
          <a href="#files">Hyperlinks</a>
        </nav>
        <nav aria-label="External links and contact">
          <a href="mailto:aw@awzone.com">Email</a>
          <a href="https://github.com/hey-aw" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href="https://linkedin.com/in/mattaw" target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a href="https://github.com/hey-aw/awzone-site" target="_blank" rel="noreferrer">
            Site source <span aria-hidden="true">↗</span>
          </a>
          <a href="#top">Top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
