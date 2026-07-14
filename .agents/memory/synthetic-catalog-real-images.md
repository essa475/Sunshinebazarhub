---
name: Large synthetic product catalogs with real images
description: Strategy for generating thousands of product rows without mass AI image generation
---

When a marketplace/e-commerce app needs thousands of product rows (e.g. 3000) but only a handful of visually distinct product types across a handful of categories, don't generate one image per product.

**Approach:** Use `imageSearch` to pull a modest set of real web photos (e.g. ~5 images per base product type per category, so tens of images total) and cycle/assign them across the full set of programmatically generated product variants (names, prices, ratings via a seeded PRNG for reproducibility). Store products in a real backend table (e.g. Postgres via Drizzle) rather than bundling a large hardcoded array into the frontend.

**Why:** Thousands of unique AI-generated images is slow, expensive, and unnecessary when products are visually similar within a type (e.g. "smartphone", "t-shirt"); real search images look more authentic than AI renders for generic product photography anyway. A large hardcoded product array also bloats the frontend bundle — paginated backend API calls are the right shape once catalog size crosses roughly a few hundred items.

**How to apply:** Use whenever a request asks for a "big" or "realistic-scale" catalog (hundreds to thousands of items) for a demo/mock marketplace.
