import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { desc, eq, inArray } from "drizzle-orm";
import { getAuth } from "@clerk/express";
import { db, ordersTable, orderItemsTable, productsTable } from "@workspace/db";
import { ListOrdersResponse, CreateOrderBody, CreateOrderResponse } from "@workspace/api-zod";

const router: IRouter = Router();

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  (req as Request & { userId: string }).userId = userId;
  next();
}

async function loadOrdersForUser(userId: string) {
  const orders = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.userId, userId))
    .orderBy(desc(ordersTable.createdAt));

  if (orders.length === 0) return [];

  const orderIds = orders.map((o) => o.id);
  const items = await db
    .select()
    .from(orderItemsTable)
    .where(inArray(orderItemsTable.orderId, orderIds));

  return orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    subtotal: Number(order.subtotal),
    shipping: Number(order.shipping),
    tax: Number(order.tax),
    total: Number(order.total),
    createdAt: order.createdAt,
    items: items
      .filter((it) => it.orderId === order.id)
      .map((it) => ({
        id: it.id,
        productId: it.productId,
        productName: it.productName,
        productImage: it.productImage,
        category: it.category,
        quantity: it.quantity,
        priceAtTime: Number(it.priceAtTime),
      })),
  }));
}

router.get("/orders", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as Request & { userId: string }).userId;
  const orders = await loadOrdersForUser(userId);
  res.json(ListOrdersResponse.parse(orders));
});

router.post("/orders", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as Request & { userId: string }).userId;

  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ body: req.body, issues: parsed.error.issues }, "Invalid create-order payload");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const productIds = parsed.data.items.map((i) => i.productId);
  const products = await db
    .select()
    .from(productsTable)
    .where(inArray(productsTable.id, productIds));

  const productById = new Map(products.map((p) => [p.id, p]));
  const missing = productIds.filter((id) => !productById.has(id));
  if (missing.length > 0) {
    res.status(400).json({ error: `Unknown product ids: ${missing.join(", ")}` });
    return;
  }

  const lineItems = parsed.data.items.map((item) => {
    const product = productById.get(item.productId)!;
    return {
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      category: product.category,
      quantity: item.quantity,
      priceAtTime: Number(product.price),
    };
  });

  const subtotal = lineItems.reduce((sum, li) => sum + li.priceAtTime * li.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const [order] = await db
    .insert(ordersTable)
    .values({
      orderNumber,
      userId,
      status: "Processing",
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    })
    .returning();

  const insertedItems = await db
    .insert(orderItemsTable)
    .values(
      lineItems.map((li) => ({
        orderId: order.id,
        productId: li.productId,
        productName: li.productName,
        productImage: li.productImage,
        category: li.category,
        quantity: li.quantity,
        priceAtTime: li.priceAtTime.toFixed(2),
      })),
    )
    .returning();

  res.status(201).json(
    CreateOrderResponse.parse({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      subtotal: Number(order.subtotal),
      shipping: Number(order.shipping),
      tax: Number(order.tax),
      total: Number(order.total),
      createdAt: order.createdAt,
      items: insertedItems.map((it) => ({
        id: it.id,
        productId: it.productId,
        productName: it.productName,
        productImage: it.productImage,
        category: it.category,
        quantity: it.quantity,
        priceAtTime: Number(it.priceAtTime),
      })),
    }),
  );
});

export default router;
