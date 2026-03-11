import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "ba512e93-3d1b-47ef-b600-e5b941c04c4b",
  token: process.env.TINA_TOKEN || "eb2c13ee5b7e28dd5b6dc466067f66e43681beb1",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "json",
        ui: {
          router: ({ document }) => `/post/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: { component: "textarea" },
          },
          {
            type: "reference",
            name: "category",
            label: "Category",
            collections: ["category"],
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "image",
            name: "image",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "difficulty",
            label: "Difficulty",
            options: ["Beginner", "Intermediate", "Advanced"],
          },
          {
            type: "string",
            name: "timeEstimate",
            label: "Time Estimate",
            description: "e.g. 2-3 hours",
          },
          {
            type: "string",
            name: "materials",
            label: "Materials",
            list: true,
            description: "One material per line",
          },
          {
            type: "object",
            name: "steps",
            label: "Tutorial Steps",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Step Title",
              },
              {
                type: "string",
                name: "description",
                label: "Step Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "image",
                label: "Step Image (optional)",
              },
            ],
          },
          {
            type: "string",
            name: "tips",
            label: "Tips",
            list: true,
            description: "One tip per line",
          },
          {
            type: "object",
            name: "videoTutorials",
            label: "Video Tutorials",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Video Title",
              },
              {
                type: "string",
                name: "youtubeUrl",
                label: "YouTube URL",
                description: "Full YouTube URL, e.g. https://www.youtube.com/watch?v=...",
              },
            ],
          },
          {
            type: "image",
            name: "galleryImages",
            label: "Gallery Images",
            list: true,
            description: "Additional images shown in a side gallery on the post page",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "category",
        label: "Categories",
        path: "content/categories",
        format: "json",
        fields: [
          {
            type: "string",
            name: "categoryId",
            label: "ID",
          },
          {
            type: "string",
            name: "label",
            label: "Label",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
          },
        ],
      },
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "content/site",
        format: "json",
        fields: [
          {
            type: "string",
            name: "brandName",
            label: "Brand Name",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Background Image",
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "heroCtaText",
            label: "Hero Button Text",
          },
          {
            type: "string",
            name: "heroCtaLink",
            label: "Hero Button Link",
          },
          {
            type: "string",
            name: "blogSectionTitle",
            label: "Blog Section Title",
          },
          {
            type: "string",
            name: "blogSectionSubtitle",
            label: "Blog Section Subtitle",
          },
          {
            type: "string",
            name: "footerDescription",
            label: "Footer Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "facebookUrl",
            label: "Facebook URL (legacy)",
            description: "Kept for backwards-compat. Prefer Social Links below.",
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social / Contact Links",
            list: true,
            description: "Links shown in the Contact popup (Facebook, Instagram, etc.)",
            fields: [
              {
                type: "string",
                name: "platform",
                label: "Platform",
                options: ["Facebook", "Instagram", "TikTok", "YouTube", "WhatsApp", "Email", "Website"],
              },
              {
                type: "string",
                name: "label",
                label: "Display Label",
              },
              {
                type: "string",
                name: "url",
                label: "URL",
              },
            ],
          },
          {
            type: "string",
            name: "newsletterTitle",
            label: "Newsletter Title",
          },
          {
            type: "string",
            name: "newsletterDescription",
            label: "Newsletter Description",
          },
          {
            type: "string",
            name: "emailPlaceholder",
            label: "Email Placeholder",
          },
          {
            type: "string",
            name: "copyrightText",
            label: "Copyright Text",
          },
          {
            type: "object",
            name: "footerLinks",
            label: "Footer Links",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "href",
                label: "URL",
              },
            ],
          },
        ],
      },
      {
        name: "aboutPage",
        label: "About Page",
        path: "content/about",
        format: "json",
        fields: [
          {
            type: "string",
            name: "pageSubtitle",
            label: "Page Subtitle",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "creatorName",
            label: "Creator Name",
          },
          {
            type: "image",
            name: "creatorPhoto",
            label: "Creator Photo",
          },
          {
            type: "string",
            name: "bioParagraph1",
            label: "Bio Paragraph 1",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "bioParagraph2",
            label: "Bio Paragraph 2",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "bioParagraph3",
            label: "Bio Paragraph 3",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "values",
            label: "Values / Beliefs",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "string",
            name: "ctaHeading",
            label: "CTA Heading",
          },
          {
            type: "string",
            name: "ctaDescription",
            label: "CTA Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "ctaButton1Label",
            label: "CTA Button 1 Label",
          },
          {
            type: "string",
            name: "ctaButton1Link",
            label: "CTA Button 1 Link",
          },
          {
            type: "string",
            name: "ctaButton2Label",
            label: "CTA Button 2 Label",
          },
          {
            type: "string",
            name: "ctaButton2Link",
            label: "CTA Button 2 Link",
          },
        ],
      },
      {
        name: "galleryItem",
        label: "Gallery",
        path: "content/gallery",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Wall Art",
              "Plant Hangers",
              "Home Decor",
              "Accessories",
              "Custom Orders",
            ],
          },
          {
            type: "image",
            name: "image",
            label: "Image",
          },
          {
            type: "string",
            name: "gridSpan",
            label: "Grid Size",
            options: [
              { label: "Normal", value: "" },
              { label: "Tall (2 rows)", value: "row-span-2" },
              { label: "Wide (2 columns)", value: "col-span-2" },
            ],
          },
        ],
      },
      {
        name: "galleryBulk",
        label: "Gallery Bulk Import",
        path: "content/gallery-bulk",
        format: "json",
        ui: {
          filename: {
            slugify: (values) =>
              (values?.folderName ?? "batch")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "folderName",
            label: "Folder / Batch Name",
            isTitle: true,
            required: true,
            description:
              "A descriptive name for this group of images (e.g. 'Wall Art – March 2026')",
          },
          {
            type: "string",
            name: "category",
            label: "Category (applies to all images below)",
            options: [
              "Wall Art",
              "Plant Hangers",
              "Home Decor",
              "Accessories",
              "Custom Orders",
            ],
          },
          {
            type: "string",
            name: "defaultGridSpan",
            label: "Default Grid Size",
            options: [
              { label: "Normal", value: "" },
              { label: "Tall (2 rows)", value: "row-span-2" },
              { label: "Wide (2 columns)", value: "col-span-2" },
            ],
          },
          {
            type: "image",
            name: "images",
            label: "Images",
            list: true,
            description:
              "Select multiple images. All will share the category above — no need to categorize one by one.",
          },
        ],
      },
    ],
  },
});
