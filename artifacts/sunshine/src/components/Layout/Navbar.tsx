import { useState, useRef, useEffect, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Sun, Package, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { useCart } from "@/store/CartContext";
import { motion, AnimatePresence } from "framer-motion";

function SearchBar({ className, inputClassName }: { className?: string; inputClassName?: string }) {
  const [, setLocation] = useLocation();
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) setLocation(`/search?q=${encodeURIComponent(trimmed)}`);
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
  const { user, signOut } = useAuth();
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
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
          {user?.firstName || "Account"}
          <ChevronDown className="h-3 w-3" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-border overflow-hidden text-foreground z-50"
          >
            <div className="px-4 py-3 border-b border-border">
              <p className="font-semibold text-sm truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <Link
              href="/orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              <Package className="h-4 w-4" /> My Orders
            </Link>
            <button
              onClick={() => { setOpen(false); signOut(); setLocation("/"); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Animated letter-by-letter logo */
const LOGO_LETTERS = "SUNSHINE".split("");

function AnimatedLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-white shrink-0">
      <motion.div
        className="bg-white p-1 rounded-full text-primary shadow-sm"
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.05 }}
      >
        <Sun className="h-6 w-6" strokeWidth={3} />
      </motion.div>
      <span className="text-2xl font-black tracking-tight drop-shadow-sm flex">
        {LOGO_LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08 + i * 0.045,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </Link>
  );
}

export function Navbar() {
  const { isSignedIn } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary">
      <div className="container mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Animated Logo */}
        <AnimatedLogo />

        {/* Search Bar – hidden on small mobile */}
        <SearchBar
          className="hidden md:flex flex-1 max-w-xl relative mx-4"
          inputClassName="w-full h-11 pl-4 pr-12 rounded-full border-none focus:ring-4 focus:ring-white/20 bg-white text-foreground shadow-inner"
        />

        {/* Actions */}
        <motion.div
          className="flex items-center gap-1.5 sm:gap-3 shrink-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        >
          {isSignedIn ? (
            <AccountMenu />
          ) : (
            <Link
              href="/sign-in"
              className="flex flex-col items-center justify-center text-white/90 hover:text-white group"
            >
              <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <User className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 hidden sm:block">
                Login
              </span>
            </Link>
          )}

          <Link
            href="/cart"
            className="relative flex flex-col items-center justify-center text-white/90 hover:text-white group"
          >
            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </div>
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
              >
                {totalItems > 99 ? "99+" : totalItems}
              </motion.span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 hidden sm:block">
              Cart
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Mobile Search */}
      <SearchBar
        className="md:hidden px-3 pb-2.5 pt-1 bg-primary border-t border-white/10 relative w-full block"
        inputClassName="w-full h-9 pl-4 pr-10 rounded-full border-none bg-white text-sm"
      />
    </header>
  );
}
