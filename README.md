# 💖 WithLove by TS Studio

> A handcrafted macramé blog and portfolio — built with love.

🌐 https://withlove-by-ts-studio.vercel.app/

---

## 📸 Preview

<p align="center">
 <img alt="Screenshot 2026-03-12 184231" src="https://github.com/user-attachments/assets/b6a4d319-f6dd-4338-881d-12f3fb889fbc" width=60% height=80% />

</p>

---

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Setup Instructions](#setup-instructions)
- [Contributing](#contributing)
- [License & Acknowledgments](#license--acknowledgments)

---

## 📖 Project Overview

**WithLove by TS Studio** is a creative web application for a macramé craft studio. It serves as a combined **blog, tutorial library, and photo gallery** where the creator shares step-by-step guides, showcases handmade pieces, and connects with the craft community.

Content is fully managed using **TinaCMS**, a Git-backed headless CMS that allows editing without coding, with all data stored as version-controlled JSON files.

### 🎯 Target Users

- **Visitors / craft enthusiasts** — explore tutorials, categories, and gallery  
- **Content creator** — manage posts, gallery, and site content via `/admin`  

---

## ✨ Key Features

### Visitor Experience

- **Hero Section** — CMS-controlled banner with CTA  
- **Blog Grid** — paginated posts with categories and previews  
- **Category Pages** — filter content by macramé types  
- **Tutorial Posts** — steps, materials, tips, videos, and gallery  
- **Tutorial Library** — search, filter, and sort tutorials  
- **Gallery** — masonry grid + fullscreen lightbox  
- **About Page** — animated profile with values & CTA  
- **Responsive Design** — smooth across all devices  

### Admin Features

- **TinaCMS Editor** — visual content editing  
- **Post Management** — full CRUD for tutorials and blogs  
- **Gallery Management** — manage images and layouts  
- **Site Settings** — control branding, hero, footer, and links  
- **Category System** — reusable across posts and gallery  

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js ≥ 18  
- npm ≥ 9 or bun  
- TinaCMS account (optional)

---

### Installation

```sh
git clone https://github.com/pawpaw64/withlove-by-TS-studio.git
cd withlove-by-TS-studio
npm install

```

### 2. Install dependencies

```sh
npm install
# or
bun install
```



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

