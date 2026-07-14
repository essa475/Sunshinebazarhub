import { useState, useEffect } from "react";
import { useSearch, useLocation } from "wouter";
import { useListProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const PAGE_SIZE = 24;

export function SearchPage() {
  const searchString = useSearch();
  const query = new URLSearchParams(searchString).get("q") ?? "";
  const [, setLocation] = useLocation();
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever the query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  const { data, isLoading, isFetching } = useListProducts(
    { search: query || undefined, page, limit: PAGE_SIZE },
    { query: { enabled: query.length > 0, placeholderData: (prev: any) => prev } as any },
  );

  const products = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (!query) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center py-16 max-w-md">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <SearchIcon className="w-9 h-9 text-muted-foreground/40" />
          </div>
          <h2 className="text-xl font-bold mb-2">Search Sunshine</h2>
          <p className="text-muted-foreground">Type something into the search bar above and press Enter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          key={query}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 border-b pb-6"
        >
          <h1 className="text-2xl md:text-3xl font-black text-foreground">
            Results for &ldquo;{query}&rdquo;
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLoading ? "Searching…" : `Found ${total} item${total === 1 ? "" : "s"}`}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="py-32 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products.length > 0 ? (
          <>
            <motion.div
              key={`${query}-${page}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
            >
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: Math.min(idx, 10) * 0.04, duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

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
              <SearchIcon className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">No results found</h2>
            <p className="text-muted-foreground mb-6">We couldn&apos;t find anything matching &ldquo;{query}&rdquo;.</p>
            <Button onClick={() => setLocation("/")} className="rounded-full px-8">
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
