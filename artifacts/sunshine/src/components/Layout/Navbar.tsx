import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, Sun } from "lucide-react";
import { useCart } from "@/store/CartContext";
import { useAuth } from "@/store/AuthContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [location, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white shrink-0">
          <div className="bg-white p-1 rounded-full text-primary shadow-sm">
            <Sun className="h-6 w-6" strokeWidth={3} />
          </div>
          <span className="text-2xl font-black tracking-tight drop-shadow-sm">
            SUNSHINE
          </span>
        </Link>

        {/* Search Bar - Hidden on small mobile */}
        <div className="hidden md:flex flex-1 max-w-xl relative mx-4">
          <input
            type="search"
            placeholder="Search for t-shirts, phones, makeup..."
            className="w-full h-11 pl-4 pr-12 rounded-full border-none focus:ring-4 focus:ring-white/20 bg-white text-foreground shadow-inner"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-full text-white hover:bg-primary/90 transition-colors">
            <Search className="h-4 w-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link href="/auth" className="flex flex-col items-center justify-center text-white/90 hover:text-white group">
            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
              <User className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 hidden sm:block">
              {user ? 'Account' : 'Login'}
            </span>
          </Link>
          
          <Link href="/cart" className="relative flex flex-col items-center justify-center text-white/90 hover:text-white group">
            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-in zoom-in duration-300">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 hidden sm:block">
              Cart
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Search - Visible only on small screens */}
      <div className="md:hidden p-3 bg-primary border-t border-white/10">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search..."
            className="w-full h-10 pl-4 pr-10 rounded-full border-none bg-white text-sm"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
