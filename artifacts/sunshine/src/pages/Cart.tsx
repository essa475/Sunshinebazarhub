import { useState } from "react";
import { useCart } from "@/store/CartContext";
import { useCreateOrder } from "@/lib/api";
import { useAuth } from "@/auth/AuthContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, CheckCircle2, PartyPopper } from "lucide-react";
import { Link, useLocation } from "wouter";

export function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const { isSignedIn, isLoaded } = useAuth();
  const [, setLocation] = useLocation();
  const createOrder = useCreateOrder();

  const [orderSuccess, setOrderSuccess] = useState<{ orderNumber: string; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setError(null);

    if (!isLoaded) return;

    if (!isSignedIn) {
      setLocation('/sign-in');
      return;
    }

    if (items.length === 0) return;

    createOrder.mutate(
      {
        data: {
          items: items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        },
      },
      {
        onSuccess: (order) => {
          setOrderSuccess({ orderNumber: order.orderNumber, total: order.total });
          clearCart();
        },
        onError: (err) => {
          console.error("Failed to place order:", err);
          const message = err instanceof Error ? err.message : undefined;
          setError(
            message
              ? `Couldn't place your order: ${message}`
              : "Something went wrong placing your order. Please try again.",
          );
        },
      },
    );
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background px-4 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />

        <div className="max-w-md w-full bg-card p-8 rounded-3xl shadow-2xl text-center border border-border relative z-10 animate-in zoom-in-95 fade-in duration-500">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-40" />
            <div className="relative w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-in zoom-in duration-700 delay-150">
              <CheckCircle2 className="w-12 h-12" strokeWidth={2.5} />
            </div>
            <PartyPopper className="w-7 h-7 text-secondary absolute -top-1 -right-1 rotate-12 animate-in zoom-in duration-700 delay-300" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-2 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-200">
            Order Booked!
          </h2>
          <p className="text-muted-foreground mb-6 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-300">
            Thank you for shopping at Sunshine. Your order has been placed successfully.
          </p>
          <div className="bg-muted/50 rounded-xl p-4 mb-3 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-500">
            <span className="text-sm text-muted-foreground block mb-1">Order Number</span>
            <span className="font-mono font-bold text-lg text-primary">{orderSuccess.orderNumber}</span>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 mb-8 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-500">
            <span className="text-sm text-muted-foreground block mb-1">Total Paid</span>
            <span className="font-bold text-lg text-foreground">{formatPrice(orderSuccess.total)}</span>
          </div>
          <div className="flex gap-4 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-700">
            <Button variant="outline" className="flex-1" onClick={() => setLocation('/orders')}>
              View Orders
            </Button>
            <Button className="flex-1" onClick={() => setLocation('/')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-black text-foreground mb-8 animate-in fade-in slide-in-from-left-4 duration-500">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              Looks like you haven't added anything to your cart yet. Let's change that!
            </p>
            <Button size="lg" onClick={() => setLocation('/')} className="rounded-full px-8">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, idx) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-3 duration-500"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-muted">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex flex-col flex-grow justify-between">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-2">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.product.category}</p>
                      </div>
                      <div className="font-bold text-lg text-primary shrink-0">
                        {formatPrice(item.product.price)}
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-3 bg-muted rounded-full px-2 py-1 border border-border">
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-colors active:scale-90"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-colors active:scale-90"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted-foreground hover:text-destructive text-sm flex items-center gap-1 font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm sticky top-24 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="font-bold text-xl mb-6">Order Summary</h3>

                <div className="space-y-4 text-sm text-muted-foreground mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.reduce((a,b) => a+b.quantity, 0)} items)</span>
                    <span className="text-foreground font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-foreground font-medium">
                      {shipping === 0 ? <span className="text-green-600 font-bold">FREE</span> : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="text-foreground font-medium">{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-foreground">Total</span>
                    <span className="font-black text-2xl text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full rounded-xl text-lg h-14 transition-transform active:scale-[0.98]"
                  onClick={handlePlaceOrder}
                  disabled={!isLoaded || createOrder.isPending}
                >
                  {createOrder.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Booking Order...
                    </span>
                  ) : (
                    <>
                      {isSignedIn ? "Place Order" : "Sign In to Order"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  100% Secure Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
