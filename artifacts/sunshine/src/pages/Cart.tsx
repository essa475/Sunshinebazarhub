import { useState } from "react";
import { useCart } from "@/store/CartContext";
import { useOrders } from "@/store/OrdersContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [, setLocation] = useLocation();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setIsCheckingOut(true);
    
    // Simulate network delay
    setTimeout(() => {
      const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      addOrder({
        id: orderNumber,
        date: new Date().toISOString(),
        items: items.map(item => ({
          product: item.product,
          quantity: item.quantity,
          priceAtTime: item.product.price
        })),
        total: total,
        status: 'Processing'
      });
      
      setOrderSuccess(orderNumber);
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-card p-8 rounded-3xl shadow-xl text-center border border-border">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-2">Order Booked!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for shopping at Sunshine. Your order has been placed successfully.
          </p>
          <div className="bg-muted/50 rounded-xl p-4 mb-8">
            <span className="text-sm text-muted-foreground block mb-1">Order Number</span>
            <span className="font-mono font-bold text-lg text-primary">{orderSuccess}</span>
          </div>
          <div className="flex gap-4">
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
        <h1 className="text-3xl font-black text-foreground mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-border shadow-sm">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCartIcon className="w-10 h-10 text-muted-foreground/40" />
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
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm">
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
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                        <button 
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-colors"
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
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm sticky top-24">
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
                
                <Button 
                  size="lg" 
                  className="w-full rounded-xl text-lg h-14" 
                  onClick={handlePlaceOrder}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Place Order"}
                  {!isCheckingOut && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
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

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
