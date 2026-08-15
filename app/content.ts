export type NoteSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type NoteLink = {
  label: string;
  href: string;
  note: string;
};

export type Note = {
  draft: boolean;
  slug: string;
  title: string;
  summary: string;
  kind: string;
  date: string;
  isoDate: string;
  readingTime: string;
  tags: string[];
  lede: string;
  sections: NoteSection[];
  links?: NoteLink[];
};

export const notes: Note[] = [
  {
    draft: false,
    slug: "openscied-from-rag-to-mcp",
    title: "Replacing a curriculum RAG stack with a small, read-only MCP server",
    summary:
      "What changed when we stopped treating semantic search as the product and started giving an agent a bounded way to navigate curriculum structure.",
    kind: "Public note",
    date: "Jul 25, 2026",
    isoDate: "2026-07-25",
    readingTime: "6 min",
    tags: ["OpenSciEd", "MCP", "Retrieval"],
    lede:
      "This is a field note about retiring an expensive retrieval prototype without losing the useful product and instructional lessons it produced.",
    sections: [
      {
        heading: "The first prototype",
        paragraphs: [
          "We published the first version of our OpenSciEd instructional coach in 2024 as part of a seed grant from Digital Promise and collaboration with the Einstein Project and the OpenSciEd team. Our goal was to extend coaching and professional learning from an OpenSciEd curriculum launch into the school year and to give teachers support on demand and in the classroom.",
          "We began with the common RAG architecture of the moment: split curriculum documents into chunks, generate embeddings, store them in Azure Cognitive Search, and retrieve semantically similar passages for a teacher-facing assistant. We prototyped the experience in Streamlit and Next.js prototypes.",
          "The retrieval worked, returning relevant documents from across the instructional materials. We found that the agent was a good assistant, but not a robust coach. A plausible passage did not keep the assistant inside the curriculum's instructional logic, and a user could redirect it away from the intended approach. The fixed search infrastructure was also costly for an experiment with uneven use.",
        ],
      },
      {
        heading: "Developing a smarter successor",
        paragraphs: [
          "The current beta exposes a versioned OpenSciEd snapshot through four read-only operations: check status, browse the hierarchy, run a bounded search, and read a bounded excerpt. At the time of writing, the snapshot reports 3,421 documents and three indexing failures.",
          "The hierarchy and metadata do more of the work. An agent can move from grade to unit to lesson, ask a narrow question, and read only the sources it needs. The server supplies curriculum evidence; it does not decide how teaching should work.",
        ],
      },
      {
        heading: "Guiding the response with agent skills",
        paragraphs: [
          "Instructional stance belongs in a skill: visible instructions that describe teacher control, inquiry and sensemaking, coherence across lessons, and how to distinguish a unit overview from a lesson or assessment artifact.",
          "That separation is useful. The server can remain a small, inspectable library interface. A skill can be reviewed and revised as the teaching workflow develops. Either can improve without pretending retrieval alone is pedagogy.",
        ],
      },
      {
        heading: "What’s next",
        paragraphs: [
          "The next useful evidence is comparative: whether teachers find the cited sources relevant, whether the agent stays in the requested grade, unit, and lesson scope, and whether the skill helps preserve the curriculum's intent under real planning pressure.",
        ],
        bullets: [
          "Citation accuracy and source coverage",
          "Scope drift across multi-turn questions",
          "Teacher corrections and overrides",
          "Time and cost per useful answer",
        ],
      },
    ],
    links: [
      {
        label: "OpenSciEd Library MCP health",
        href: "https://openscied-library-mcp.vercel.app/healthz",
        note: "Live status for the public read-only beta.",
      },
    ],
  },
  {
    draft: true,
    slug: "skill-or-server",
    title: "What should live in a skill, and what needs a server?",
    summary:
      "A packaging rule for agent tools: keep judgment and workflow readable; add a service only when the work genuinely needs live or structured resources.",
    kind: "Design note",
    date: "Jul 25, 2026",
    isoDate: "2026-07-25",
    readingTime: "4 min",
    tags: ["Skills", "Product design", "Packaging"],
    lede:
      "A useful agent workflow should not acquire a server dependency simply because one is available.",
    sections: [
      {
        heading: "A skill is the method",
        paragraphs: [
          "A skill is a readable set of instructions, guardrails, templates, and references. It can tell an agent how to count real instructional days, preserve teacher control, make assumptions visible, and produce a useful planning artifact.",
          "When all of the necessary knowledge fits in that package, the skill should stand alone. It is easier to inspect, easier to install, and less likely to fail because an external service is unavailable.",
        ],
      },
      {
        heading: "A server is a resource boundary",
        paragraphs: [
          "A server earns its place when the agent needs a corpus that is too large, frequently updated, permissioned, or best traversed through structured operations. The OpenSciEd Resource Finder is one example: it can browse and read thousands of curriculum records without bundling the entire library into every installation.",
          "The server should expose the smallest useful interface. Read-only tools, bounded results, stable identifiers, and explicit coverage make the behavior easier to reason about.",
        ],
      },
      {
        heading: "Package from the user's point of view",
        paragraphs: [
          "Pacing Coach should remain available as a mature standalone skill with no MCP dependency. Resource Finder can mature separately. An OpenSciEd pack can eventually install both, but the bundle should not erase the boundary between the planning method and the curriculum service.",
          "This also keeps the publishing story honest: feature each skill on its own, make the whole pack easy to install, and do not require infrastructure for a workflow that does not need it.",
        ],
      },
    ],
    links: [
      {
        label: "Eddo Skills source",
        href: "https://github.com/eddo-ai/eddo-skills",
        note: "Public marketplace and skill source.",
      },
    ],
  },
  {
    draft: true,
    slug: "pacing-starts-with-the-calendar",
    title: "A pacing plan should start with the real calendar",
    summary:
      "The first planning step is not assigning units to months. It is finding the days a teacher can actually use, and showing every assumption along the way.",
    kind: "Practice note",
    date: "Jul 24, 2026",
    isoDate: "2026-07-24",
    readingTime: "5 min",
    tags: ["Pacing", "Teacher tools", "Workflow"],
    lede:
      "The quality of a year-long curriculum plan depends less on a clever schedule than on an honest count of instructional time.",
    sections: [
      {
        heading: "Begin with a choice",
        paragraphs: [
          "Ask the teacher whether they want to provide their calendar or have the agent find the official district calendar. A marked-up PDF or screenshots may be more useful than a clean district page because they capture local testing, conferences, assemblies, field trips, and shortened days.",
          "When the agent does the lookup, it should name the school year, link the authoritative district source, distinguish verified dates from estimates, and surface conflicts instead of silently resolving them.",
        ],
      },
      {
        heading: "Confirm what the teacher sees",
        paragraphs: [
          "A screenshot can contain cropped dates, handwritten exclusions, or annotations that are obvious to the teacher and ambiguous to a model. The agent should restate its interpretation and confirm it before calculating the available days.",
          "The same pattern applies to curriculum sequence. Ask whether the teacher is using the standard OpenSciEd sequence or a district or local adaptation. Published guidance can be checked in parallel, but the teacher's confirmation governs the working plan.",
        ],
      },
      {
        heading: "Keep source values and local decisions separate",
        paragraphs: [
          "Recommended unit lengths should come from an identified OpenSciEd source or a reviewed reference table. Local changes belong in a separate adjustment column. That small accounting choice makes it possible to see where the plan reflects curriculum guidance and where it reflects the realities of this classroom.",
        ],
        bullets: [
          "Recommended Days: the identified curriculum source",
          "Adjustment (+/-): the teacher's local decision",
          "Predicted Days: the working allocation",
          "Actual Days: the value recorded after teaching",
        ],
      },
      {
        heading: "Treat the plan as a record of learning",
        paragraphs: [
          "A first-year implementation needs flex time and periodic revision. Recording actual days turns the plan from a one-time answer into evidence for the next unit and the next year.",
        ],
      },
    ],
    links: [
      {
        label: "Pacing Coach source",
        href: "https://github.com/eddo-ai/eddo-skills",
        note: "The evolving planning workflow and its references.",
      },
    ],
  },
];

export const publishedNotes = notes.filter((note) => !note.draft);

export function getNote(slug: string) {
  return publishedNotes.find((note) => note.slug === slug);
}
