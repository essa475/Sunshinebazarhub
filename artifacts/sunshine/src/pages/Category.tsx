import { useState } from "react";
import { useParams } from "wouter";
import { useListProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Loader2 } from "lucide-react";

const PAGE_SIZE = 24;

export function CategoryPage() {
  const { category } = useParams();
  const decodedCategory = category ? decodeURIComponent(category) : undefined;
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useListProducts(
    { category: decodedCategory, page, limit: PAGE_SIZE },
    { query: { placeholderData: (prev: any) => prev } as any },
  );

  const products = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-background pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-black text-foreground">
            {decodedCategory || "All Products"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLoading ? "Loading..." : `Showing ${products.length} of ${total} items`}
          </p>
        </div>

        {isLoading ? (
          <div className="py-32 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <Button
                  variant="outline"
                  disabled={page <= 1 || isFetching}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground font-medium">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={page >= totalPages || isFetching}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
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
