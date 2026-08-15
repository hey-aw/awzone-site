import Link from "next/link";
import { publishedNotes } from "./content";
import { SiteFooter, SiteHeader } from "./site-shell";

type BoardId = "learning" | "classroom-media" | "side-projects";

type ResourceLink = {
  href: string;
  label: string;
  external?: boolean;
};

type BoardTopic = {
  slug: string;
  board: BoardId;
  status: string;
  title: string;
  summary: string;
  resources: ResourceLink[];
  noteHref?: string;
};

type BoardArea = {
  id: BoardId;
  command: string;
  title: string;
  description: string;
};

const boardAreas: BoardArea[] = [
  {
    id: "learning",
    command: "A",
    title: "Learning + curriculum",
    description: "Curriculum, teacher planning, and student-work tools.",
  },
  {
    id: "classroom-media",
    command: "B",
    title: "Classroom media",
    description: "Working examples for classroom audio and discussion.",
  },
  {
    id: "side-projects",
    command: "C",
    title: "Side projects",
    description: "Things built outside the main line of work.",
  },
];

const boardTopics: BoardTopic[] = [
  {
    slug: "student-work-analysis",
    board: "learning",
    status: "Case study",
    title: "AI-supported student-work analysis",
    summary:
      "A teacher-co-designed prototype for analyzing student writing, aligning feedback to a rubric, and surfacing class-wide trends in Wauwatosa.",
    resources: [
      {
        href: "https://eddolearning.com/blog/analyzing-student-work",
        label: "Read case study",
        external: true,
      },
    ],
  },
  {
    slug: "openscied-educator",
    board: "learning",
    status: "Open source",
    title: "OpenSciEd Educator",
    summary:
      "An installable role combining curriculum resource finding with a four-phase pacing workflow for teachers and instructional leaders.",
    resources: [
      {
        href: "https://github.com/eddo-ai/eddo-skills",
        label: "Open source",
        external: true,
      },
    ],
  },
  {
    slug: "openscied-library-mcp",
    board: "learning",
    status: "Live beta",
    title: "OpenSciEd Library MCP",
    summary:
      "An experimental agent-friendly interface for retrieving and making use of open educational resources from OpenSciEd.",
    noteHref: "/notes/openscied-from-rag-to-mcp",
    resources: [
      {
        href: "/notes/openscied-from-rag-to-mcp",
        label: "Read build note",
      },
      {
        href: "https://openscied-library-mcp.vercel.app/healthz",
        label: "Service health",
        external: true,
      },
    ],
  },
  {
    slug: "pacing-coach",
    board: "learning",
    status: "Open source",
    title: "Pacing Coach",
    summary:
      "A conversational planning workflow that keeps the teacher in control of calendar, sequence, and pacing decisions.",
    resources: [
      {
        href: "https://github.com/eddo-ai/eddo-skills",
        label: "Open source",
        external: true,
      },
    ],
  },
  {
    slug: "classroom-transcripts",
    board: "classroom-media",
    status: "Open source",
    title: "Classroom Transcripts",
    summary:
      "An Azure-based workflow for transcribing classroom audio, identifying teacher and student voices, and supporting discussion analysis.",
    resources: [
      {
        href: "https://github.com/eddo-ai/classroom-transcripts",
        label: "Open source",
        external: true,
      },
    ],
  },
  {
    slug: "that-movie-night-life",
    board: "side-projects",
    status: "Native app",
    title: "That Movie Night Life",
    summary:
      "A SwiftUI iOS and tvOS app for drawing from a 10,734-film Letterboxd list while filtering watched titles and optional buzz kills.",
    resources: [
      {
        href: "https://github.com/hey-aw/that-movie-night-life",
        label: "Open source",
        external: true,
      },
    ],
  },
];

function ResourceAnchor({ resource }: { resource: ResourceLink }) {
  const label = (
    <>
      {resource.label} <span aria-hidden="true">{resource.external ? "↗" : "→"}</span>
    </>
  );

  return resource.external ? (
    <a href={resource.href}>{label}</a>
  ) : (
    <Link href={resource.href}>{label}</Link>
  );
}

function MainMenu() {
  const commands = [
    { number: "1", href: "#latest", label: "Latest notes", note: "Read the newest public note" },
    { number: "2", href: "#boards", label: "Projects", note: "Browse project topics by area" },
    {
      number: "3",
      href: "/#links",
      label: "Linked resources",
      note: "Case studies, source code, and live links",
    },
    { number: "4", href: "#about", label: "About the sysop", note: "Who keeps this board" },
    { number: "5", href: "#logoff", label: "Hyperlinks", note: "Email, profiles, and site source" },
  ];

  return (
    <nav id="menu" className="main-menu panel" aria-labelledby="main-menu-title">
      <header className="panel-titlebar">
        <p>Main menu</p>
        <h2 id="main-menu-title">Select an area</h2>
      </header>
      <ol>
        {commands.map((command) => (
          <li key={command.number}>
            <a href={command.href}>
              <span className="menu-command" aria-hidden="true">
                [{command.number}]
              </span>
              <span>
                <strong>{command.label}</strong>
                <small>{command.note}</small>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ProjectActions({ topic }: { topic: BoardTopic }) {
  const directResources = topic.resources.filter(
    (resource) => resource.href !== topic.noteHref,
  );

  return (
    <div className="topic-actions">
      {topic.noteHref && (
        <Link href={topic.noteHref}>
          Read note <span aria-hidden="true">→</span>
        </Link>
      )}
      {directResources.map((resource) => (
        <ResourceAnchor resource={resource} key={resource.href} />
      ))}
    </div>
  );
}

function MessageBoard({ board }: { board: BoardArea }) {
  const topics = boardTopics.filter((topic) => topic.board === board.id);

  return (
    <section className={`message-board message-board-${board.id}`} aria-labelledby={`board-${board.id}`}>
      <header className="board-heading">
        <p aria-hidden="true">[{board.command}]</p>
        <div>
          <h3 id={`board-${board.id}`}>{board.title}</h3>
          <p>{board.description}</p>
        </div>
      </header>
      <ol className="topic-list">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <article className="board-topic">
              <div className="topic-meta">
                <p>Project topic</p>
                <p>{topic.status}</p>
              </div>
              <h4>{topic.title}</h4>
              <p>{topic.summary}</p>
              <ProjectActions topic={topic} />
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Home() {
  const latestNote = publishedNotes[0];

  return (
    <>
      <a className="skip-link" href="#board-content">
        Skip to bulletin board
      </a>

      <SiteHeader />

      <main id="board-content" className="bbs-shell page-shell">
        <div className="bbs-opening">
          <section className="welcome-bulletin panel" aria-labelledby="welcome-title">
            <p className="panel-label">System bulletin</p>
            <h1 id="welcome-title">Welcome to AWzone.</h1>
            <p>
              This is Matt AW&apos;s public bulletin board: product development,
              projects in teaching &amp; learning and healthcare, and fun experiments.
            </p>
            <p className="welcome-instruction">
              Read a note, browse the projects, or follow a hyperlink to the original
              work.
            </p>
          </section>

          <MainMenu />
        </div>

        {latestNote && (
          <section id="latest" className="latest-bulletin panel" aria-labelledby="latest-title">
            <header className="panel-titlebar">
              <p>Latest notes</p>
              <h2 id="latest-title">Note</h2>
            </header>
            <article className="bulletin-post">
              <div className="post-side">
                <p>Posted by</p>
                <strong>Matt AW</strong>
                <p>Published</p>
                <time dateTime={latestNote.isoDate}>{latestNote.date}</time>
                <p>Type</p>
                <span>{latestNote.kind}</span>
                <p>Read time</p>
                <span>{latestNote.readingTime}</span>
              </div>
              <div className="post-copy">
                <p className="post-marker">Note</p>
                <h3>{latestNote.title}</h3>
                <p className="post-lede">{latestNote.lede}</p>
                <p>{latestNote.summary}</p>
                <ul aria-label="Topics">
                  {latestNote.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a href={`/notes/${latestNote.slug}`}>
                  Read full note <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </section>
        )}

        <section id="boards" className="boards-panel panel" aria-labelledby="boards-title">
          <header className="panel-titlebar">
            <p>Project areas</p>
            <h2 id="boards-title">Project boards</h2>
          </header>
          <div className="boards-grid">
            {boardAreas.map((board) => (
              <MessageBoard board={board} key={board.id} />
            ))}
          </div>
        </section>

        <section id="links" className="files-panel panel" aria-labelledby="links-title">
          <header className="panel-titlebar">
            <p>Linked resources</p>
            <h2 id="links-title">Hyperlinks</h2>
          </header>
          <p className="files-intro">
            Case studies, source code, build notes, and live services linked from the
            project boards above.
          </p>
          <ul className="resource-list">
            {boardTopics.map((topic) => (
              <li id={`file-${topic.slug}`} key={topic.slug}>
                <div>
                  <p>{topic.status}</p>
                  <h3>{topic.title}</h3>
                </div>
                <div className="resource-links">
                  {topic.resources.map((resource) => (
                    <ResourceAnchor resource={resource} key={resource.href} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="sysop-panel panel" aria-labelledby="about-title">
          <header className="panel-titlebar">
            <p>Board operator</p>
            <h2 id="about-title">About the sysop</h2>
          </header>
          <div className="sysop-copy">
            <p>
              I&apos;m Matt AW. I work across product development, learning design,
              user experience, and applied AI. I&apos;m interested in how people
              understand things, and in the ways technology can make ordinary work
              easier or unlock discovery.
            </p>
            <p>
              Helpful solutions can create meaningful benefits for people.
            </p>
          </div>
        </section>

        <p className="command-prompt">
          <span className="prompt-path" aria-hidden="true">
            AWZONE BBS&gt;
          </span>
          <span>Choose a menu item, or press Tab to move through links.</span>
          <span className="prompt-cursor" aria-hidden="true" />
        </p>
      </main>

      <SiteFooter />
    </>
  );
}
