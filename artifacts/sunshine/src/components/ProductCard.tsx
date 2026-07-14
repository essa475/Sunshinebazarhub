import type { Product } from '@workspace/api-client-react';
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/CartContext";
import { Star, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-card-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/5] overflow-hidden bg-muted relative">
        {product.originalPrice && (
          <div className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Sale
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-1.5">
          <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
          <span className="text-xs font-semibold text-muted-foreground">
            {product.rating} ({product.reviews})
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
          
          <Button 
            size="icon"
            className="h-9 w-9 rounded-full shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
