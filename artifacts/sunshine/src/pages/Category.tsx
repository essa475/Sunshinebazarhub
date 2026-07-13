import { useParams } from "wouter";
import { PRODUCTS, Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

import { ShoppingBag } from "lucide-react";

export function CategoryPage() {
  const { category } = useParams();
  const decodedCategory = category ? decodeURIComponent(category) as Category : null;

  const filteredProducts = decodedCategory 
    ? PRODUCTS.filter(p => p.category === decodedCategory)
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-background pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-black text-foreground">
            {decodedCategory || "All Products"}
          </h1>
          <p className="text-muted-foreground mt-2">
            Showing {filteredProducts.length} items
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">No products found</h2>
            <p className="text-muted-foreground">We couldn't find anything in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
