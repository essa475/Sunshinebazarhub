import type { Product } from '@/data/products';
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/CartContext";
import { Star, Plus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-card-border cursor-pointer"
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden bg-muted relative">
        {product.originalPrice && (
          <motion.div
            className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
          >
            Sale
          </motion.div>
        )}
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />

        {/* Quick-add overlay on hover */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-3"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-xs font-semibold flex items-center gap-1">
            <ShoppingCart className="w-3 h-3" /> Quick Add
          </span>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-1.5">
          <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
          <span className="text-xs font-semibold text-muted-foreground">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        <h3 className="font-medium text-sm line-clamp-2 text-foreground mb-3 flex-grow leading-tight">
          {product.name}
        </h3>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="font-bold text-lg text-primary leading-none">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-muted-foreground line-through mt-1">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <motion.div whileTap={{ scale: 0.88 }}>
            <Button
              size="icon"
              className="h-9 w-9 rounded-full shadow-sm relative overflow-hidden"
              onClick={handleAdd}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="check"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 14 }}
                  >
                    ✓
                  </motion.span>
                ) : (
                  <motion.span
                    key="plus"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
