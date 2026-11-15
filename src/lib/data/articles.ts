import type { Article, BreakingNews, Category } from "@/lib/types";

/**
 * Mock dataset for Vercel Daily. Every story here is fictional.
 *
 * Only `src/lib/api.ts` reads this module. Pages and components go through
 * that data-access layer, so swapping in a real news API is a one-file change.
 */

function photo(id: string): string {
  return `https://images.unsplash.com/photo-${id}?w=1600&h=900&fit=crop`;
}

export const categories: Category[] = [
  { slug: "engineering", name: "Engineering" },
  { slug: "ai", name: "AI" },
  { slug: "product", name: "Product" },
  { slug: "design", name: "Design" },
  { slug: "security", name: "Security" },
  { slug: "community", name: "Community" },
];

export const articles: Article[] = [
  {
    slug: "edge-first-rendering-goes-mainstream",
    title:
      "Edge-first rendering goes mainstream as teams rethink the request path",
    excerpt:
      "A new wave of frameworks treats the static shell as the default and streams everything else, cutting time to first byte across the board.",
    body: [
      "For years, teams picked between static pages that were fast but stale and server-rendered pages that were fresh but slow. That trade-off is quietly disappearing. A growing number of production apps now prerender a static shell for every route and stream the request-specific parts in afterwards.",
      "The pattern is simple to describe: anything that doesn't depend on the incoming request is rendered ahead of time and served from the edge, while personalised or fast-changing content waits behind a Suspense boundary. Users see a complete layout instantly, and the slow parts fill in as soon as they are ready.",
      "Engineers we spoke to say the biggest change is cultural rather than technical. Instead of asking whether a page should be static or dynamic, they ask which individual components need the request at all. In most apps, the answer is surprisingly few.",
      "The results show up in the metrics. Teams report time to first byte dropping well below 100 milliseconds on cached shells, with largest contentful paint improving because hero images and headlines no longer wait for a database round trip.",
      "There are still sharp edges. Caching data that varies per user requires care, and debugging what ended up in the shell versus what streamed can be confusing at first. But the direction is clear: the static shell is becoming the default, and dynamic rendering is something you opt into, one component at a time.",
    ],
    category: "engineering",
    author: { name: "Maya Chen", role: "Senior Editor" },
    publishedAt: "2026-11-13T09:00:00Z",
    image: {
      src: photo("1451187580459-43490279c0fa"),
      alt: "Glowing network lines circling the Earth at night",
    },
    tags: ["rendering", "performance", "edge", "streaming"],
    featured: true,
  },
  {
    slug: "ai-agents-ship-their-first-pull-requests",
    title:
      "AI coding agents ship their first unsupervised pull requests at scale",
    excerpt:
      "Several engineering orgs now let agents open, test, and merge routine changes. The early data on quality is more encouraging than skeptics expected.",
    body: [
      "Six months ago, letting an AI agent merge code without a human in the loop would have sounded reckless. Today, a handful of engineering organisations do exactly that for a narrow class of changes: dependency bumps, lint fixes, and small refactors with full test coverage.",
      "The guardrails are strict. Agents work in isolated branches, must pass the full CI suite, and are limited to files with high test coverage. Anything touching authentication, billing, or database migrations still requires a human reviewer.",
      "Teams running these programmes say the revert rate on agent-authored changes is comparable to that of junior engineers on the same kinds of task. The bigger win is throughput: maintenance work that used to sit in backlogs for weeks now lands the same day.",
      "Critics warn that the gains could erode code ownership, with fewer people understanding why a change was made. Proponents counter that agents write more detailed commit messages than most humans ever did.",
    ],
    category: "ai",
    author: { name: "Daniel Okafor", role: "AI Correspondent" },
    publishedAt: "2026-11-12T15:30:00Z",
    image: {
      src: photo("1485827404703-89b55fcc595e"),
      alt: "A white humanoid robot looking toward the camera",
    },
    tags: ["agents", "automation", "code review", "llm"],
    featured: true,
  },
  {
    slug: "the-quiet-return-of-server-actions",
    title:
      "The quiet return of the form: why Server Actions changed how teams build mutations",
    excerpt:
      "Progressive enhancement is back in fashion, and this time it comes with type safety and no hand-written API routes.",
    body: [
      "For most of the last decade, submitting a form meant writing a client-side handler, an API route, a fetch call, and a pile of loading-state logic. Server Actions collapsed that stack into a single async function that runs on the server and can be called directly from a form.",
      "The appeal goes beyond less code. Because a form with a Server Action works before JavaScript loads, sign-up and checkout flows keep working on slow networks and older devices. Teams that measured it found a noticeable drop in abandoned submissions on mobile.",
      "Security teams have their own reasons to like the pattern. Every action is a public endpoint, which forces engineers to validate input and re-check authorisation inside the function itself rather than trusting the UI.",
      "The pattern has limits. Actions are a poor fit for high-frequency updates or streaming uploads, and teams still reach for route handlers when they need a stable public API for other clients.",
    ],
    category: "engineering",
    author: { name: "Priya Raman", role: "Staff Writer" },
    publishedAt: "2026-11-12T08:15:00Z",
    image: {
      src: photo("1555066931-4365d14bab8c"),
      alt: "Colourful code on a dark editor screen",
    },
    tags: ["forms", "server actions", "progressive enhancement"],
    featured: true,
  },
  {
    slug: "design-systems-embrace-tokens-everywhere",
    title:
      "Design systems embrace tokens everywhere, from Figma to production CSS",
    excerpt:
      "Design tokens have moved from a niche idea to the backbone of how product teams ship consistent interfaces across platforms.",
    body: [
      "Ask a design-system team what changed this year and most will give the same answer: tokens. Colours, spacing, radii, and type scales now live in a single source of truth that feeds design tools, CSS, and native apps alike.",
      "The payoff is speed. When a brand colour changes, it changes everywhere in one pull request. Dark mode, which used to be a quarter-long project, becomes a matter of defining a second set of values.",
      "Utility-first CSS frameworks have accelerated the shift by reading tokens directly from CSS variables, so the same names show up in design files and in class names.",
      "The hard part, designers say, is naming. A token called 'blue-500' tells you nothing about where it should be used, and teams are converging on semantic names like 'surface', 'muted', and 'accent' instead.",
    ],
    category: "design",
    author: { name: "Lena Park", role: "Design Editor" },
    publishedAt: "2026-11-11T13:00:00Z",
    image: {
      src: photo("1531297484001-80022131f5a1"),
      alt: "A laptop with a colourful interface on a desk",
    },
    tags: ["design tokens", "css", "dark mode", "figma"],
    featured: true,
  },
  {
    slug: "supply-chain-attacks-target-build-pipelines",
    title: "Supply-chain attacks shift their focus to build pipelines",
    excerpt:
      "Attackers are moving upstream, compromising CI runners and package publishing flows instead of production servers.",
    body: [
      "Security researchers say the most dangerous attacks this year did not target production at all. Instead, they went after the build: the CI runners, caches, and publishing tokens that turn source code into deployable artifacts.",
      "The logic is straightforward. A compromised build step can inject malicious code into every downstream deployment, and it often runs with broad credentials that nobody audits.",
      "Defenders are responding with short-lived credentials, signed provenance for every artifact, and stricter isolation between build steps. Lockfiles and pinned versions, once seen as a chore, are now treated as a security control.",
      "Experts recommend a simple first step: inventory every secret your pipeline can read, and remove any that a given job does not strictly need.",
    ],
    category: "security",
    author: { name: "Marcus Webb", role: "Security Reporter" },
    publishedAt: "2026-11-10T17:45:00Z",
    image: {
      src: photo("1550751827-4bd374c3f58b"),
      alt: "Abstract blue digital lock representing cybersecurity",
    },
    tags: ["supply chain", "ci", "provenance", "secrets"],
    featured: true,
  },
  {
    slug: "open-source-maintainers-find-new-funding-models",
    title: "Open-source maintainers find new funding models beyond donations",
    excerpt:
      "From paid support tiers to company-backed foundations, maintainers are experimenting with ways to make critical projects sustainable.",
    body: [
      "The tension at the heart of open source has not gone away: a small number of volunteers maintain software that billions of dollars of business depend on. What has changed is the range of options for funding that work.",
      "Some projects now offer paid support tiers with guaranteed response times. Others have formed foundations backed by the companies that rely on them most. A few have turned their documentation and training into a sustainable business.",
      "Maintainers we interviewed were cautiously optimistic. Several said that steady funding, even modest amounts, mattered less for the money than for the permission it gave them to prioritise maintenance over new features.",
      "The common thread is predictability. One-off donations are welcome, but recurring commitments are what let maintainers plan beyond the next release.",
    ],
    category: "community",
    author: { name: "Sofia Alvarez", role: "Community Editor" },
    publishedAt: "2026-11-10T10:00:00Z",
    image: {
      src: photo("1522071820081-009f0129c71c"),
      alt: "A group of people collaborating around laptops at a table",
    },
    tags: ["open source", "funding", "maintainers"],
    featured: true,
  },
  {
    slug: "product-teams-ditch-quarterly-roadmaps",
    title: "Product teams ditch quarterly roadmaps for continuous discovery",
    excerpt:
      "Shipping smaller changes more often is pushing product managers to replace fixed roadmaps with rolling bets and tight feedback loops.",
    body: [
      "The quarterly roadmap, once the centrepiece of product planning, is losing its grip. Teams that deploy dozens of times a day find that a plan locked three months in advance is mostly fiction by week three.",
      "In its place, many teams run continuous discovery: weekly customer interviews, small experiments behind feature flags, and a short list of bets that are re-evaluated every few weeks.",
      "Feature flags are the enabling technology. Shipping code dark and turning it on for a slice of users lets teams learn from real behaviour before committing to a full launch.",
      "Not everyone is convinced. Sales and marketing teams still need dates, and some product leaders worry that constant re-prioritisation makes it hard to finish anything ambitious.",
    ],
    category: "product",
    author: { name: "James Holloway", role: "Product Columnist" },
    publishedAt: "2026-11-09T14:20:00Z",
    image: {
      src: photo("1460925895917-afdab827c52f"),
      alt: "A laptop showing analytics charts on a desk",
    },
    tags: ["roadmaps", "feature flags", "discovery"],
    featured: true,
  },
  {
    slug: "small-language-models-run-on-device",
    title: "Small language models run on device, and users notice the speed",
    excerpt:
      "Compact models running locally on phones and laptops are taking over autocomplete, summarisation, and search tasks once sent to the cloud.",
    body: [
      "Not every AI feature needs a data centre. A new generation of small models, some under a few billion parameters, now runs comfortably on recent phones and laptops.",
      "The first thing users notice is latency. Autocomplete and summarisation that run locally respond almost instantly, with no network round trip and no spinner.",
      "Privacy is the second benefit. When a model runs on device, sensitive text never leaves it, which matters for email, notes, and health apps.",
      "Developers caution that small models are not a replacement for large ones. The emerging pattern is a hybrid: handle quick, private tasks locally and route harder questions to a larger hosted model.",
    ],
    category: "ai",
    author: { name: "Daniel Okafor", role: "AI Correspondent" },
    publishedAt: "2026-11-08T11:00:00Z",
    image: {
      src: photo("1518770660439-4636190af475"),
      alt: "Close-up of a computer circuit board",
    },
    tags: ["llm", "on-device", "privacy", "latency"],
    featured: false,
  },
  {
    slug: "core-web-vitals-inp-one-year-later",
    title:
      "One year of INP: what changed when responsiveness became a ranking signal",
    excerpt:
      "Interaction to Next Paint forced teams to look at the main thread again. Here is what the fastest sites did differently.",
    body: [
      "When Interaction to Next Paint replaced First Input Delay as a Core Web Vital, many sites saw their scores drop overnight. INP measures every interaction, not just the first, and it exposed how much work modern apps do on the main thread.",
      "The fastest sites shared a few habits. They shipped less JavaScript, broke up long tasks, and moved work that did not need the browser back to the server.",
      "Server Components helped in a way few expected: components that render on the server send no JavaScript for their own logic, which shrinks bundles without any manual code splitting.",
      "Performance engineers say the lesson is broader than one metric. Users notice sluggish interactions, and a fast first load is not enough if every click afterwards stutters.",
    ],
    category: "engineering",
    author: { name: "Maya Chen", role: "Senior Editor" },
    publishedAt: "2026-11-07T16:00:00Z",
    image: {
      src: photo("1551288049-bebda4e38f71"),
      alt: "Performance dashboard with charts and graphs",
    },
    tags: ["web vitals", "inp", "performance", "javascript"],
    featured: false,
  },
  {
    slug: "passkeys-reach-the-tipping-point",
    title:
      "Passkeys reach the tipping point as major apps drop password prompts",
    excerpt:
      "With support across every major platform, passkeys are moving from an option buried in settings to the default way to sign in.",
    body: [
      "Passkeys have been available for a few years, but this was the year they became the default. Several large consumer apps now offer a passkey first and fall back to passwords only when needed.",
      "The security case is strong: passkeys cannot be phished, reused, or leaked in a database breach, because the private key never leaves the user's device.",
      "Usability, once the sticking point, has improved too. Syncing across devices and clearer prompts mean users no longer need to understand the cryptography to benefit from it.",
      "Account recovery remains the hardest problem. Teams are experimenting with recovery contacts and hardware keys, but no approach has emerged as the standard yet.",
    ],
    category: "security",
    author: { name: "Marcus Webb", role: "Security Reporter" },
    publishedAt: "2026-11-06T09:30:00Z",
    image: {
      src: photo("1526374965328-7f61d4dc18c5"),
      alt: "Green code characters raining down a dark screen",
    },
    tags: ["passkeys", "authentication", "webauthn"],
    featured: false,
  },
  {
    slug: "accessibility-audits-move-into-ci",
    title:
      "Accessibility audits move into CI, catching issues before they ship",
    excerpt:
      "Automated accessibility checks now run on every pull request at many companies, turning a once-a-year audit into a daily habit.",
    body: [
      "Accessibility used to be something teams checked once a year, usually right before a compliance deadline. Increasingly, it is checked on every pull request.",
      "Automated tools can catch missing labels, low colour contrast, and broken heading structure in seconds. They cannot catch everything, but they stop the most common regressions from shipping.",
      "Designers say the shift has changed conversations. When a contrast failure blocks a merge, it gets fixed in the component library instead of being patched page by page.",
      "Advocates stress that tooling complements, rather than replaces, testing with real assistive technology and with disabled users.",
    ],
    category: "design",
    author: { name: "Lena Park", role: "Design Editor" },
    publishedAt: "2026-11-05T12:00:00Z",
    image: {
      src: photo("1498050108023-c5249f4df085"),
      alt: "A developer's desk with a laptop showing code",
    },
    tags: ["accessibility", "ci", "testing", "a11y"],
    featured: false,
  },
  {
    slug: "developer-conferences-go-hybrid-for-good",
    title: "Developer conferences go hybrid for good",
    excerpt:
      "Organisers say remote attendance is no longer a pandemic stopgap but a permanent part of how communities gather.",
    body: [
      "The big developer conferences are back in person, but the livestream never went away. Organisers now plan for two audiences from day one.",
      "Remote attendees get more than a video feed: dedicated Q&A, online workshops, and community spaces that run alongside the main event.",
      "For many developers, especially those far from tech hubs, hybrid events are the only realistic way to attend. Organisers report that remote audiences are often several times larger than the in-person crowd.",
      "The challenge is making both groups feel like first-class participants, rather than treating the stream as an afterthought.",
    ],
    category: "community",
    author: { name: "Sofia Alvarez", role: "Community Editor" },
    publishedAt: "2026-11-04T15:00:00Z",
    image: {
      src: photo("1504639725590-34d0984388bd"),
      alt: "Laptop with code in a dimly lit room",
    },
    tags: ["conferences", "events", "community"],
    featured: false,
  },
  {
    slug: "usage-based-pricing-reshapes-saas",
    title: "Usage-based pricing reshapes how SaaS products are built",
    excerpt:
      "When customers pay for what they use, product teams start measuring and optimising very different things.",
    body: [
      "Seat-based pricing is giving way to usage-based models across developer tools and infrastructure. Customers like paying for what they use; vendors like revenue that grows with adoption.",
      "The shift has knock-on effects for product teams. Metering becomes a core feature, and dashboards that show customers their usage in real time move from nice-to-have to essential.",
      "Finance teams have adjusted too. Revenue is harder to forecast, so companies are investing in better usage analytics and spending alerts.",
      "The risk is bill shock. The best products make costs predictable with budgets, caps, and clear explanations of what drives spend.",
    ],
    category: "product",
    author: { name: "James Holloway", role: "Product Columnist" },
    publishedAt: "2026-11-03T10:30:00Z",
    image: {
      src: photo("1488590528505-98d2b5aba04b"),
      alt: "A laptop on a table showing a dashboard",
    },
    tags: ["pricing", "saas", "metering"],
    featured: false,
  },
  {
    slug: "rag-pipelines-grow-up",
    title: "Retrieval pipelines grow up as teams move past the demo stage",
    excerpt:
      "Retrieval-augmented generation is easy to prototype and hard to run in production. Teams share what it takes to make answers reliable.",
    body: [
      "Building a demo that answers questions over your documents takes an afternoon. Building one that answers them correctly, every time, takes months.",
      "Teams running retrieval in production say most of the work happens before the model sees anything: cleaning documents, splitting them sensibly, and ranking results well.",
      "Evaluation is the other big investment. Without a test set of real questions and expected answers, it is impossible to know whether a change made things better or worse.",
      "The lesson, practitioners say, is that retrieval quality is a search problem first and an AI problem second.",
    ],
    category: "ai",
    author: { name: "Priya Raman", role: "Staff Writer" },
    publishedAt: "2026-11-02T13:15:00Z",
    image: {
      src: photo("1535378917042-10a22c95931a"),
      alt: "Abstract illustration of artificial intelligence",
    },
    tags: ["rag", "retrieval", "evaluation", "llm"],
    featured: false,
  },
  {
    slug: "monorepos-and-the-build-cache",
    title: "Monorepos win over skeptics thanks to remote build caching",
    excerpt:
      "Shared caches mean most builds never run at all, and teams that resisted monorepos are reconsidering.",
    body: [
      "The classic argument against monorepos was build time: why rebuild everything when you changed one package? Remote build caching has largely answered it.",
      "With a shared cache, a task that has already run anywhere, on a teammate's laptop or in CI, is restored instead of re-executed. Many teams report that the majority of their CI tasks are now cache hits.",
      "The benefits compound. Shared components and types live in one place, and a single pull request can update a library and every app that uses it.",
      "Monorepos still need discipline. Clear package boundaries and ownership rules matter more as the repository grows.",
    ],
    category: "engineering",
    author: { name: "Daniel Okafor", role: "AI Correspondent" },
    publishedAt: "2026-11-01T09:00:00Z",
    image: {
      src: photo("1461749280684-dccba630e2f6"),
      alt: "Code on a monitor in a dark room",
    },
    tags: ["monorepo", "build cache", "ci", "turborepo"],
    featured: false,
  },
  {
    slug: "zero-trust-for-internal-tools",
    title: "Zero trust comes for internal tools and admin dashboards",
    excerpt:
      "Internal apps have long been protected by little more than a VPN. That is changing fast.",
    body: [
      "Admin dashboards and internal tools often hold the most sensitive data a company has, yet many are protected only by a VPN and a shared password.",
      "Zero-trust approaches replace network location with identity: every request is authenticated and authorised, whether it comes from the office or a coffee shop.",
      "The good news is that adoption has become easier. Identity-aware proxies can sit in front of existing tools without code changes.",
      "Security leaders recommend starting with the tools that can change data, not just read it, and logging every privileged action.",
    ],
    category: "security",
    author: { name: "Marcus Webb", role: "Security Reporter" },
    publishedAt: "2026-10-31T16:30:00Z",
    image: {
      src: photo("1558494949-ef010cbdcc31"),
      alt: "Rows of servers in a data centre",
    },
    tags: ["zero trust", "internal tools", "identity"],
    featured: false,
  },
  {
    slug: "type-safety-across-the-stack",
    title: "End-to-end type safety becomes the default expectation",
    excerpt:
      "Developers now expect types to flow from the database to the browser without hand-written glue code.",
    body: [
      "A few years ago, end-to-end type safety was a selling point. Now it is table stakes: developers expect a change to a database column to surface as a type error in the UI that uses it.",
      "Typed route parameters, schema-validated inputs, and generated clients have closed most of the gaps. The remaining seams are usually at the edges, such as third-party APIs and user input.",
      "Teams say the biggest benefit is confidence during refactors. Renaming a field across a large codebase becomes a mechanical change rather than a risky one.",
      "The caveat is runtime validation. Types disappear at runtime, so data from outside the system still needs to be checked before it is trusted.",
    ],
    category: "engineering",
    author: { name: "Priya Raman", role: "Staff Writer" },
    publishedAt: "2026-10-30T11:45:00Z",
    image: {
      src: photo("1517694712202-14dd9538aa97"),
      alt: "A laptop with code open on a wooden desk",
    },
    tags: ["typescript", "type safety", "validation"],
    featured: false,
  },
  {
    slug: "remote-teams-rethink-async-collaboration",
    title: "Remote teams rethink async collaboration tools",
    excerpt:
      "Fewer meetings, better writing: distributed teams are building habits that make async work actually work.",
    body: [
      "Remote work is no longer an experiment, and distributed teams have learned what does and does not scale. The biggest lesson: async collaboration depends on writing.",
      "Teams that thrive write decisions down, record short videos instead of scheduling calls, and keep a single source of truth for project status.",
      "Tooling has followed. Comment threads on previews, recorded walkthroughs, and shared documents now carry conversations that once required a meeting.",
      "Managers say the hardest part is cultural: giving people permission to not respond instantly.",
    ],
    category: "community",
    author: { name: "Sofia Alvarez", role: "Community Editor" },
    publishedAt: "2026-10-29T14:00:00Z",
    image: {
      src: photo("1519389950473-47ba0277781c"),
      alt: "A team working together on laptops around a table",
    },
    tags: ["remote work", "async", "collaboration"],
    featured: false,
  },
];

export const breakingNews: BreakingNews[] = [
  {
    id: "bn-1",
    headline:
      "Edge-first rendering hits the mainstream: static shells are now the default",
    articleSlug: "edge-first-rendering-goes-mainstream",
  },
  {
    id: "bn-2",
    headline: "AI agents are now merging routine pull requests without review",
    articleSlug: "ai-agents-ship-their-first-pull-requests",
  },
  {
    id: "bn-3",
    headline: "Security alert: attackers shift focus to CI build pipelines",
    articleSlug: "supply-chain-attacks-target-build-pipelines",
  },
];
