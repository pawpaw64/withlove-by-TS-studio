#!/usr/bin/env node

/**
 * scan-uploads.mjs
 *
 * Scans public/uploads/ for images, compares against
 * gallery (manual + bulk) entries, and reports uncategorized images.
 *
 * Usage:
 *   node scripts/scan-uploads.mjs             # report only
 *   node scripts/scan-uploads.mjs --generate  # create batch JSON files
 */

import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.resolve("public/uploads");
const GALLERY_DIR = path.resolve("content/gallery");
const BULK_DIR = path.resolve("content/gallery-bulk");
const POSTS_DIR = path.resolve("content/posts");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

/* ── scan a directory recursively for images ── */
function scanImages(dir, prefix = "") {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const images = [];
  for (const entry of entries) {
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      images.push(...scanImages(path.join(dir, entry.name), relPath));
    } else if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      images.push({
        path: `/uploads/${relPath}`,
        folder: prefix || "(root)",
        name: entry.name,
      });
    }
  }
  return images;
}

/* ── collect every image path already referenced in gallery content ── */
function getCategorizedImages() {
  const categorized = new Set();

  // manual gallery items
  if (fs.existsSync(GALLERY_DIR)) {
    for (const file of fs.readdirSync(GALLERY_DIR)) {
      if (!file.endsWith(".json")) continue;
      try {
        const data = JSON.parse(
          fs.readFileSync(path.join(GALLERY_DIR, file), "utf-8")
        );
        if (data.image) categorized.add(data.image);
      } catch {
        /* skip bad files */
      }
    }
  }

  // bulk gallery batches
  if (fs.existsSync(BULK_DIR)) {
    for (const file of fs.readdirSync(BULK_DIR)) {
      if (!file.endsWith(".json")) continue;
      try {
        const data = JSON.parse(
          fs.readFileSync(path.join(BULK_DIR, file), "utf-8")
        );
        if (Array.isArray(data.images)) {
          data.images.forEach((img) => categorized.add(img));
        }
      } catch {
        /* skip bad files */
      }
    }
  }

  // blog post images (cover + galleryImages)
  if (fs.existsSync(POSTS_DIR)) {
    for (const file of fs.readdirSync(POSTS_DIR)) {
      if (!file.endsWith(".json")) continue;
      try {
        const data = JSON.parse(
          fs.readFileSync(path.join(POSTS_DIR, file), "utf-8")
        );
        if (data.image) categorized.add(data.image);
        if (Array.isArray(data.galleryImages)) {
          data.galleryImages.forEach((img) => categorized.add(img));
        }
      } catch {
        /* skip bad files */
      }
    }
  }

  return categorized;
}

/* ── main ── */
const allImages = scanImages(UPLOADS_DIR);
const categorized = getCategorizedImages();
const uncategorized = allImages.filter((img) => !categorized.has(img.path));

// group by folder
const byFolder = new Map();
for (const img of uncategorized) {
  if (!byFolder.has(img.folder)) byFolder.set(img.folder, []);
  byFolder.get(img.folder).push(img.path);
}

console.log(`\n  Total images in public/uploads/ : ${allImages.length}`);
console.log(`  Already referenced             : ${categorized.size}`);
console.log(`  Uncategorized                  : ${uncategorized.length}\n`);

if (uncategorized.length === 0) {
  console.log("  ✓ All images are already referenced in gallery or posts!\n");
  process.exit(0);
}

const shouldGenerate = process.argv.includes("--generate");

if (shouldGenerate) {
  fs.mkdirSync(BULK_DIR, { recursive: true });
  for (const [folder, images] of byFolder) {
    const slug =
      folder === "(root)"
        ? "uncategorized"
        : folder.replace(/[/\\]+/g, "-").toLowerCase();
    const filePath = path.join(BULK_DIR, `${slug}.json`);

    if (fs.existsSync(filePath)) {
      // merge into existing file
      try {
        const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const existingSet = new Set(existing.images ?? []);
        let added = 0;
        for (const img of images) {
          if (!existingSet.has(img)) {
            existing.images.push(img);
            added++;
          }
        }
        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2) + "\n");
        console.log(`  Updated ${slug}.json (+${added} images)`);
      } catch {
        console.log(`  Skipped ${slug}.json (could not parse)`);
      }
      continue;
    }

    const data = {
      folderName:
        folder === "(root)"
          ? "Uncategorized Uploads"
          : folder.charAt(0).toUpperCase() + folder.slice(1),
      category: "",
      defaultGridSpan: "",
      images,
    };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
    console.log(`  Created ${slug}.json  (${images.length} images)`);
  }
  console.log(
    "\n  Done! Open TinaCMS admin → Gallery Bulk Import to assign categories.\n"
  );
} else {
  console.log("  Uncategorized images by folder:\n");
  for (const [folder, images] of byFolder) {
    console.log(`  📁 ${folder}/ (${images.length})`);
    for (const img of images) {
      console.log(`     ${img}`);
    }
  }
  console.log(
    "\n  Run with --generate to create batch gallery-bulk JSON files.\n"
  );
}
