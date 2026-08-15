import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNote, type NoteParagraph, publishedNotes } from "../../content";
import { SiteFooter, SiteHeader } from "../../site-shell";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedNotes.map((note) => ({ slug: note.slug }));
}

function ArticleParagraph({ paragraph }: { paragraph: NoteParagraph }) {
  if (typeof paragraph === "string") {
    return <p>{paragraph}</p>;
  }

  return (
    <p>
      {paragraph.parts.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <a
            className="article-inline-link"
            href={part.href}
            key={`${part.href}-${index}`}
            target="_blank"
            rel="noreferrer"
          >
            {part.label}
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        ),
      )}
    </p>
  );
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    return {};
  }

  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: `/notes/${note.slug}`,
    },
    openGraph: {
      title: note.title,
      description: note.summary,
      type: "article",
      publishedTime: note.isoDate,
      url: `/notes/${note.slug}`,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "AWzone BBS welcome screen",
        },
      ],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    notFound();
  }

  return (
    <>
      <a className="skip-link" href="#note-content">
        Skip to note
      </a>
      <SiteHeader />

      <main id="note-content" className="note-shell page-shell">
        <article className="article">
          <header className="article-header">
            {/* Full document navigation is intentional for the board transition. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className="back-link" href="/">
              ← Back to board
            </a>
            <div className="article-meta">
              <p>{note.kind}</p>
              <time dateTime={note.isoDate}>{note.date}</time>
              <p>{note.readingTime}</p>
            </div>
            <h1>{note.title}</h1>
            <p className="article-lede">{note.lede}</p>
            <ul className="article-tags" aria-label="Topics">
              {note.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </header>

          <div className="article-layout">
            <div className="article-body">
              {note.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <ArticleParagraph
                      key={typeof paragraph === "string" ? paragraph : section.heading}
                      paragraph={paragraph}
                    />
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <aside className="article-side" aria-label="Note details">
              <div>
                <p className="side-label">Status</p>
                <p>Public note</p>
                <p className="side-caption">
                  A dated note from the board. Corrections are welcome.
                </p>
              </div>
              {note.links && (
                <div>
                  <p className="side-label">Related</p>
                  {note.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      <span>{link.label} ↗</span>
                      <small>{link.note}</small>
                    </a>
                  ))}
                </div>
              )}
            </aside>
          </div>

          <footer className="article-footer">
            <p>Corrections and related examples are welcome.</p>
            <a href={`mailto:aw@awzone.com?subject=${encodeURIComponent(note.title)}`}>
              Email a correction →
            </a>
          </footer>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
