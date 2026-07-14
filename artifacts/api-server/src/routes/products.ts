import { Router, type IRouter } from "express";
import { and, asc, count, eq, ilike, sql } from "drizzle-orm";
import { db, productsTable } from "@workspace/db";
import {
  ListCategoriesResponse,
  ListProductsQueryParams,
  ListProductsResponse,
  GetProductParams,
  GetProductResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function serializeProduct(p: typeof productsTable.$inferSelect) {
  return {
    id: p.id,
    name: p.name,
    price: Number(p.price),
    originalPrice: p.originalPrice !== null ? Number(p.originalPrice) : null,
    category: p.category,
    image: p.image,
    rating: Number(p.rating),
    reviews: p.reviews,
  };
}

router.get("/categories", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      name: productsTable.category,
      count: count(productsTable.id),
    })
    .from(productsTable)
    .groupBy(productsTable.category)
    .orderBy(asc(productsTable.category));

  res.json(ListCategoriesResponse.parse(rows));
});

router.get("/products", async (req, res): Promise<void> => {
  const parsed = ListProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { category, search, page, limit } = parsed.data;

  const conditions = [];
  if (category) {
    conditions.push(eq(productsTable.category, category));
  }
  if (search) {
    conditions.push(ilike(productsTable.name, `%${search}%`));
  }
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ total }] = await db
    .select({ total: count(productsTable.id) })
    .from(productsTable)
    .where(whereClause);

  const items = await db
    .select()
    .from(productsTable)
    .where(whereClause)
    .orderBy(asc(productsTable.id))
    .limit(limit)
    .offset((page - 1) * limit);

  res.json(
    ListProductsResponse.parse({
      items: items.map(serializeProduct),
      total,
      page,
      limit,
    }),
  );
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const params = GetProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, params.data.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(GetProductResponse.parse(serializeProduct(product)));
});

export default router;
