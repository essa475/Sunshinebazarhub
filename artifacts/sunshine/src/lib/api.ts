/**
 * Local API layer — replaces @workspace/api-client-react for static Netlify deployment.
 * Uses the static product catalog and localStorage for orders, scoped per user.
 */
import { useQuery, useMutation, useQueryClient, type PlaceholderDataFunction } from '@tanstack/react-query';
import { PRODUCTS } from '@/data/products';
import { useAuth } from '@/auth/AuthContext';

export type { Product } from '@/data/products';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  priceAtTime: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

type ProductsResult = { items: (typeof PRODUCTS)[number][]; total: number };

function ordersKey(userId: string) {
  return `sunshine_orders_${userId}`;
}

function readOrders(userId: string): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ordersKey(userId)) ?? '[]');
  } catch {
    return [];
  }
}

function writeOrders(userId: string, orders: Order[]) {
  localStorage.setItem(ordersKey(userId), JSON.stringify(orders));
}

// ── Products ──────────────────────────────────────────────────────────────────

export function useListProducts(
  params?: { category?: string; search?: string; page?: number; limit?: number },
  options?: {
    query?: {
      enabled?: boolean;
      placeholderData?:
        | ProductsResult
        | PlaceholderDataFunction<ProductsResult, Error, ProductsResult, unknown[]>;
    };
  },
) {
  const { category, search, page = 1, limit = 24 } = params ?? {};
  const enabled = options?.query?.enabled ?? true;

  return useQuery<ProductsResult>({
    queryKey: ['products', category ?? null, search ?? null, page, limit],
    enabled,
    placeholderData: options?.query?.placeholderData,
    queryFn: (): ProductsResult => {
      let filtered = PRODUCTS;
      if (category) {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q),
        );
      }
      const total = filtered.length;
      const start = (page - 1) * limit;
      const items = filtered.slice(start, start + limit);
      return { items, total };
    },
  });
}

// ── Orders ────────────────────────────────────────────────────────────────────

export function useListOrders(options?: { query?: { enabled?: boolean } }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const callerEnabled = options?.query?.enabled ?? true;

  return useQuery<Order[]>({
    queryKey: ['orders', userId],
    enabled: callerEnabled && !!userId,
    queryFn: () => (userId ? readOrders(userId) : []),
  });
}

export function useCreateOrder() {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      data: { items: { productId: number; quantity: number }[] };
    }): Promise<Order> => {
      if (!user?.id) throw new Error('Must be signed in to place an order');

      const { items: cartItems } = payload.data;

      const orderItems: OrderItem[] = cartItems.map((ci, idx) => {
        const product = PRODUCTS.find((p) => p.id === ci.productId);
        if (!product) throw new Error(`Product ${ci.productId} not found`);
        return {
          id: Date.now() + idx,
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          quantity: ci.quantity,
          priceAtTime: product.price,
        };
      });

      const total = orderItems.reduce(
        (sum, i) => sum + i.priceAtTime * i.quantity,
        0,
      );
      const orderNumber = `SUN-${Date.now().toString(36).toUpperCase()}`;

      const order: Order = {
        id: Date.now(),
        orderNumber,
        total,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        items: orderItems,
      };

      const existing = readOrders(user.id);
      writeOrders(user.id, [order, ...existing]);

      return order;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders', user?.id] });
    },
  });
}
