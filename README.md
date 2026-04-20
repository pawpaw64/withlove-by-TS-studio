# WithLove by TS Studio

> A handcrafted macramé blog and portfolio — built with love.

**Live site:** https://withlove-by-ts-studio.vercel.app/

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Available Routes](#available-routes)
- [Content Schema](#content-schema)
- [Contributing](#contributing)
- [License & Acknowledgments](#license--acknowledgments)

---

## Project Overview

**WithLove by TS Studio** is a creative web application for a macramé craft studio. It serves as a combined blog, tutorial library, and photo gallery where the creator — TS — shares step-by-step macramé guides, showcases finished pieces, and connects with the handcraft community.

The site is fully content-managed through [TinaCMS](https://tina.io/), a Git-backed headless CMS that gives the studio owner a visual editor for all text, images, and settings without touching code. Content is stored as plain JSON files in the repository, making it fully version-controlled and portable.

**Target audiences:**

- **Visitors / craft enthusiasts** — browse tutorials, filter by category, and explore the gallery.
- **The studio owner (content author)** — manage all posts, gallery items, site settings, and About page copy through the TinaCMS visual editor at `/admin`.

---

## Key Features

### Visitor-Facing

- **Hero section** — full-bleed background image with configurable subtitle and call-to-action button, all editable via CMS.
- **Blog grid** — paginated card grid of all posts with category chips, excerpt, and cover image.
- **Category pages** — filtered views of posts by macramé category (Wall Arts, Plant Hanger, Mirror, Shelf, etc.).
- **Blog post detail** — rich post pages with cover image, body content (rich text), difficulty badge, time estimate, materials list, numbered tutorial steps (each with optional step image), pro tips, embedded YouTube video tutorials, and a side gallery of additional images.
- **Tutorials library** — dedicated page listing only posts that contain steps or videos, with live search, category filter pills, and sort options (newest, oldest, by difficulty, by step count). Cards animate in on scroll using IntersectionObserver.
- **Gallery** — masonry-layout photo grid with category filter pills and a full-screen lightbox with keyboard/click navigation. Gallery items can originate from standalone gallery entries or from blog post gallery images. Linking from the lightbox back to the source blog post is supported.
- **About page** — animated creator profile with orbiting decorative rings, bio paragraphs, a "What I Believe" values grid, and a configurable CTA section.
- **Contact popup** — accessible from the header; displays configurable social/contact links (Facebook, Instagram, TikTok, YouTube, WhatsApp, Email) with animated entrance and brand-colored platform icons.
- **Fully responsive** — mobile navigation with slide-down menu and a sticky glass-effect desktop navbar.

### Content Author (Admin)

- **TinaCMS visual editor** at `/admin` — point-and-click editing for all content collections.
- **Post management** — create, edit, and delete blog posts including all structured fields (steps, materials, tips, videos, gallery images).
- **Gallery management** — standalone gallery items with category reference, image, and optional grid size (normal, tall, wide).
- **Site settings** — control brand name, hero image/subtitle/CTA, blog section headings, footer text, social links list, newsletter copy, footer links, and copyright text.
- **About page** — manage creator name, photo, bio paragraphs, values cards, and CTA section entirely from the CMS.
- **Categories** — add or rename macramé categories once; they are available everywhere (posts, gallery).

---

## Technology Stack

| Layer | Technology | Reason |
|---|---|---|
| **Framework** | [React 18](https://react.dev/) | Component model, concurrent features, and the largest ecosystem for SPAs. |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Static typing catches content schema mismatches and component prop errors at compile time. |
| **Build tool** | [Vite 5](https://vitejs.dev/) + `@vitejs/plugin-react-swc` | Near-instant HMR and fast production builds via SWC compilation. |
| **Routing** | [React Router DOM 6](https://reactrouter.com/) | Declarative client-side routing with nested route support. |
| **UI components** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) | Accessible, unstyled primitives composed into project-specific components; no runtime CSS-in-JS overhead. |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) | Utility-first CSS keeps styles co-located with markup; custom theme tokens for brand colours (peach, blush, primary). |
| **CMS** | [TinaCMS](https://tina.io/) | Git-backed headless CMS — content lives as JSON in the repo, editable via a visual UI. No separate database required. |
| **Data fetching** | [TanStack React Query 5](https://tanstack.com/query) | Caching and async state management for any future API calls. |
| **Async rendering** | `import.meta.glob` (Vite) | Eager-loads all `content/**/*.json` files at build time; no runtime HTTP fetches needed for content. |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, tree-shakeable SVG icon set. |
| **Rich text** | [react-markdown](https://github.com/remarkjs/react-markdown) | Renders the TinaCMS rich-text body field. |
| **Analytics** | [@vercel/analytics](https://vercel.com/docs/analytics) + [@vercel/speed-insights](https://vercel.com/docs/speed-insights) | First-party, privacy-friendly page view tracking and Core Web Vitals monitoring. |
| **Unit tests** | [Vitest](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/) | Fast, Vite-native test runner with jsdom. |
| **E2E tests** | [Playwright](https://playwright.dev/) | Cross-browser end-to-end testing. |
| **Linting** | [ESLint 9](https://eslint.org/) + `typescript-eslint` + `eslint-plugin-react-hooks` | Enforces code quality and React hooks rules. |
| **Deployment** | [Vercel](https://vercel.com/) | Zero-config deployment with automatic preview deployments on every push. |

---

## Project Structure

```
withlove-by-TS-studio/
│
├── content/                        # Git-backed CMS content (JSON)
│   ├── about/
│   │   └── index.json              # About page copy (bio, values, CTA)
│   ├── categories/
│   │   ├── accessories.json        # Category definition: label + image
│   │   ├── curtain.json
│   │   ├── home-decor.json
│   │   ├── materials.json
│   │   ├── mirror.json
│   │   ├── plant-hanger.json
│   │   ├── shelf.json
│   │   └── wall-Arts.json
│   ├── posts/
│   │   └── *.json                  # One file per blog post / tutorial
│   └── site/
│       └── settings.json           # Global site settings (brand, hero, footer, social)
│
├── public/
│   ├── admin/                      # TinaCMS compiled admin UI (generated)
│   └── uploads/                    # Media files uploaded via TinaCMS
│
├── src/
│   ├── assets/                     # Static images bundled with the app
│   ├── components/
│   │   ├── main_page/              # Page-level layout components
│   │   │   ├── BlogCard.tsx        # Post card used in the blog grid
│   │   │   ├── BlogGrid.tsx        # Responsive grid of BlogCards
│   │   │   ├── CategoryCircle.tsx  # Round category pill/icon
│   │   │   ├── Footer.tsx          # Site footer with links & newsletter section
│   │   │   ├── Header.tsx          # Sticky navbar + mobile menu + contact popup
│   │   │   ├── HeroSection.tsx     # Full-bleed hero with CMS-driven content
│   │   │   └── NavLink.tsx         # Styled navigation link component
│   │   └── ui/                     # shadcn/ui primitives (accordion, button, dialog, …)
│   ├── hooks/
│   │   ├── use-mobile.tsx          # Detects mobile viewport via media query
│   │   ├── useAboutContent.ts      # Reads content/about/index.json
│   │   ├── useCategories.ts        # Returns all category definitions
│   │   ├── useGalleryItems.ts      # Merges standalone gallery + post gallery images
│   │   ├── usePosts.ts             # Loads & sorts all posts from content/posts/
│   │   └── useSiteSettings.ts      # Reads content/site/settings.json
│   ├── lib/
│   │   ├── categories.ts           # Resolves category ID → label; exports allCategories()
│   │   └── utils.ts                # Tailwind cn() helper
│   ├── pages/
│   │   ├── About.tsx               # /about — animated creator profile page
│   │   ├── BlogPost.tsx            # /post/:slug — full post detail
│   │   ├── CategoryPage.tsx        # /category/:id — filtered post grid
│   │   ├── Gallery.tsx             # /gallery — masonry gallery + lightbox
│   │   ├── Index.tsx               # / — homepage (hero + blog grid)
│   │   ├── NotFound.tsx            # 404 fallback
│   │   └── Tutorials.tsx           # /tutorials — searchable tutorial library
│   ├── types/
│   │   └── post.ts                 # TypeScript interfaces: Post, Category, TutorialStep, VideoTutorial
│   ├── App.tsx                     # Root component: providers + router
│   ├── App.css                     # Global styles & CSS custom properties
│   ├── index.css                   # Tailwind base directives
│   └── main.tsx                    # Vite entry point
│
├── tina/
│   ├── config.ts                   # TinaCMS schema: all collections & fields
│   └── tina-lock.json              # Auto-generated TinaCMS lock file
│
├── .env.example                    # Required environment variables
├── components.json                 # shadcn/ui configuration
├── eslint.config.js                # ESLint flat config
├── index.html                      # Vite HTML entry
├── package.json
├── playwright.config.ts            # Playwright E2E configuration
├── postcss.config.js
├── tailwind.config.ts              # Tailwind theme: custom colours, fonts, plugins
├── tsconfig.app.json               # App TypeScript config (path aliases: @/)
├── tsconfig.json                   # Root TypeScript references config
├── tsconfig.node.json              # TypeScript config for Vite/Node tooling
├── vite.config.ts                  # Vite configuration
└── vitest.config.ts                # Vitest configuration
```

---

## Setup Instructions

### Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9 (or [bun](https://bun.sh/) — a `bun.lock` is included)
- A [TinaCMS Cloud](https://app.tina.io/) account (free tier available) if you want the visual editor

### 1. Clone the repository

```sh
git clone https://github.com/pawpaw64/withlove-by-TS-studio.git
cd withlove-by-TS-studio
```

### 2. Install dependencies

```sh
npm install
# or
bun install
```

### 3. Configure environment variables

Copy the example file and fill in your TinaCMS credentials:

```sh
cp .env.example .env
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Client ID from your TinaCMS Cloud project |
| `TINA_TOKEN` | Read-only content token from TinaCMS Cloud |
| `TINA_BRANCH` | Git branch TinaCMS should track (default: `main`) |

> **Local development without TinaCMS Cloud:** The `tina/config.ts` file contains fallback values so the app runs without credentials. The visual editor at `/admin` requires valid credentials to save changes.

### 4. Start the development server

```sh
npm run dev
```

This runs `tinacms dev -c "vite"`, which starts both the Vite dev server and the local TinaCMS proxy. Open [http://localhost:5173](http://localhost:5173) to view the site and [http://localhost:5173/admin](http://localhost:5173/admin) for the CMS editor.

### 5. Build for production

```sh
# Standard build (uses TinaCMS Cloud for content at runtime)
npm run build

# Build with TinaCMS schema compiled into the output (self-contained)
npm run build:tina
```

### 6. Run tests

```sh
# Unit tests (Vitest)
npm test

# Unit tests in watch mode
npm run test:watch

# E2E tests (Playwright — requires a running dev server)
npx playwright test
```

### 7. Lint

```sh
npm run lint
```

---

## Available Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section + full blog grid |
| `/about` | About | Creator bio, values, and CTA |
| `/tutorials` | Tutorials | Searchable, filterable tutorial library |
| `/gallery` | Gallery | Masonry photo gallery with lightbox |
| `/post/:slug` | Blog Post | Full post detail with steps, materials, tips, and videos |
| `/category/:id` | Category | Posts filtered by a specific category |
| `/admin` | TinaCMS Editor | Visual CMS (requires credentials) |

---

## Content Schema

All content is stored as JSON files under `content/` and managed through TinaCMS. The schema is defined in `tina/config.ts`.

### Categories (`content/categories/*.json`)

| Field | Type | Description |
|---|---|---|
| `label` | string | Display name shown in filter pills |
| `image` | image | Representative photo |

### Posts (`content/posts/*.json`)

| Field | Type | Description |
|---|---|---|
| `title` | string | Post title |
| `excerpt` | string | Short summary shown on cards |
| `category` | reference → Category | Linked category |
| `date` | datetime | Publication date (used for sorting) |
| `image` | image | Cover / thumbnail image |
| `difficulty` | enum | `Beginner` / `Intermediate` / `Advanced` |
| `timeEstimate` | string | Free-text estimate, e.g. `"2–3 hours"` |
| `materials` | string[] | List of required materials |
| `steps` | object[] | Ordered tutorial steps: `title`, `description`, optional `image` |
| `tips` | string[] | Pro tips displayed at the end of the post |
| `videoTutorials` | object[] | YouTube embeds: `title`, `youtubeUrl` |
| `galleryImages` | image[] | Extra images — shown in the post and auto-included in the Gallery page |
| `body` | rich-text | Full-length post body (Markdown/MDX rendered by react-markdown) |

### Gallery Items (`content/gallery/*.json`)

| Field | Type | Description |
|---|---|---|
| `title` | string | Image title shown in the lightbox |
| `category` | reference → Category | Used for gallery filter pills |
| `image` | image | The gallery photo |
| `gridSpan` | enum | `""` (normal) / `row-span-2` (tall) / `col-span-2` (wide) |

### Site Settings (`content/site/settings.json`)

Covers: brand name, hero image/subtitle/CTA, blog section headings, footer description, social links (platform, label, URL), newsletter copy, footer links, and copyright text.

### About Page (`content/about/index.json`)

Covers: page subtitle, creator name and photo, three bio paragraphs, values cards (title + description), and CTA section (heading, description, two configurable buttons).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository and create your branch from `main`:
   ```sh
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** — keep commits small and focused.
3. **Run the linter and tests** before pushing:
   ```sh
   npm run lint
   npm test
   ```
4. **Open a pull request** with a clear description of the change and why it was made.

### Guidelines

- Follow the existing TypeScript and React patterns in the codebase.
- New UI components should be placed in `src/components/main_page/` (page-level) or `src/components/ui/` (primitives).
- New content fields must be added to both the TypeScript interfaces in `src/types/post.ts` and the TinaCMS schema in `tina/config.ts`.
- Do not commit secrets or personal credentials.

---

## License & Acknowledgments

This project is the personal creative work of **TS Studio**. All macramé designs, tutorial content, and photography are the intellectual property of the studio owner.

**Built with:**

- [Vite](https://vitejs.dev/) — lightning-fast frontend tooling
- [React](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [shadcn/ui](https://ui.shadcn.com/) — accessible UI component library
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [TinaCMS](https://tina.io/) — Git-backed visual CMS
- [Vercel](https://vercel.com/) — hosting and deployment

---

*Made with ❤️ by TS Studio*

