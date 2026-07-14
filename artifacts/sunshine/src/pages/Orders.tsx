import { useListOrders } from "@workspace/api-client-react";
import { useUser, SignInButton } from "@clerk/react";
import { formatPrice } from "@/lib/utils";
import { Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrdersPage() {
  const { isSignedIn, isLoaded } = useUser();
  const { data: orders, isLoading } = useListOrders({ query: { enabled: !!isSignedIn } as any });

  if (isLoaded && !isSignedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center py-16 bg-white rounded-3xl border border-border shadow-sm max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-muted-foreground/40" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Sign in to view orders</h2>
          <p className="text-muted-foreground mb-8">Your order history lives in your Sunshine account.</p>
          <SignInButton>
            <Button size="lg" className="rounded-full px-8">Sign In</Button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-black text-foreground mb-8 animate-in fade-in slide-in-from-left-4 duration-500">My Orders</h1>

        {isLoading ? (
          <div className="py-32 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground">When you buy something, it will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-3 duration-500"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                {/* Header */}
                <div className="bg-muted/30 px-6 py-4 border-b border-border flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Order Placed</span>
                    <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Total</span>
                    <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Order #</span>
                    <span className="font-mono text-sm">{order.orderNumber}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-muted border border-border">
                          <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-foreground line-clamp-1">{item.productName}</h4>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-semibold text-right shrink-0">
                          {formatPrice(item.priceAtTime * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
