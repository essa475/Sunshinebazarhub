import { db, productsTable } from "@workspace/db";
import productsSeed from "./data/products.seed.json" with { type: "json" };

type SeedProduct = {
  name: string;
  price: number;
  originalPrice: number | null;
  category: string;
  image: string;
  rating: number;
  reviews: number;
};

async function main() {
  const products = productsSeed as SeedProduct[];
  console.log(`Seeding ${products.length} products...`);

  await db.delete(productsTable);

  const batchSize = 250;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize).map((p) => ({
      name: p.name,
      price: p.price.toFixed(2),
      originalPrice: p.originalPrice !== null ? p.originalPrice.toFixed(2) : null,
      category: p.category,
      image: p.image,
      rating: p.rating.toFixed(1),
      reviews: p.reviews,
    }));
    await db.insert(productsTable).values(batch);
    console.log(`Inserted ${Math.min(i + batchSize, products.length)}/${products.length}`);
  }

  console.log("Done seeding products.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
