import { useState, useRef, useEffect, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Sun, Package, LogOut, ChevronDown } from "lucide-react";
import { useUser, useClerk, Show } from "@clerk/react";
import { useCart } from "@/store/CartContext";

function SearchBar({ className, inputClassName }: { className?: string; inputClassName?: string }) {
  const [, setLocation] = useLocation();
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      setLocation(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for t-shirts, phones, makeup..."
        className={inputClassName}
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-full text-white hover:bg-primary/90 transition-colors"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}

function AccountMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col items-center justify-center text-white/90 hover:text-white group"
      >
        <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors flex items-center gap-0.5">
          <User className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 hidden sm:flex items-center gap-0.5">
          {user?.firstName || 'Account'}
          <ChevronDown className="h-3 w-3" />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-border overflow-hidden text-foreground animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-semibold text-sm truncate">
              {user?.fullName || user?.firstName || "Welcome"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <Link
            href="/orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted transition-colors"
          >
            <Package className="h-4 w-4" /> My Orders
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              signOut({ redirectUrl: basePath || '/' });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { totalItems } = useCart();

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
        <SearchBar
          className="hidden md:flex flex-1 max-w-xl relative mx-4"
          inputClassName="w-full h-11 pl-4 pr-12 rounded-full border-none focus:ring-4 focus:ring-white/20 bg-white text-foreground shadow-inner"
        />

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Show when="signed-in">
            <AccountMenu />
          </Show>
          <Show when="signed-out">
            <Link href="/sign-in" className="flex flex-col items-center justify-center text-white/90 hover:text-white group">
              <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <User className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 hidden sm:block">
                Login
              </span>
            </Link>
          </Show>

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
      <SearchBar
        className="md:hidden p-3 bg-primary border-t border-white/10 relative w-full block"
        inputClassName="w-full h-10 pl-4 pr-10 rounded-full border-none bg-white text-sm"
      />
    </header>
  );
}
