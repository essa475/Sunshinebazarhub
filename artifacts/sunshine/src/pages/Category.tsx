import { useState } from "react";
import { useParams, Link } from "wouter";
import { useListProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">

      {/* ── Animated Header Banner ── */}
      <div className="bg-primary text-white py-8 sm:py-12 px-4 relative overflow-hidden">
        {/* Background orbs */}
        <motion.div
          className="absolute top-[-60px] left-[-60px] w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-40px] right-[-40px] w-56 h-56 bg-secondary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
          </motion.div>

          {/* Animated title */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-black drop-shadow-md"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {decodedCategory || "All Products"}
            </motion.h1>
          </div>

          <motion.p
            className="text-white/75 mt-2 text-sm sm:text-base"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {isLoading
              ? "Loading..."
              : `Showing ${products.length} of ${total} items`}
          </motion.p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl pt-8">
        {isLoading ? (
          <div className="py-32 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products.length > 0 ? (
          <>
            <motion.div
              key={page}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: Math.min(idx, 15) * 0.035,
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {totalPages > 1 && (
              <motion.div
                className="flex items-center justify-center gap-3 sm:gap-4 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="outline"
                  disabled={page <= 1 || isFetching}
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="rounded-full px-5"
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground font-semibold min-w-[80px] text-center">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={page >= totalPages || isFetching}
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="rounded-full px-5"
                >
                  Next
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6"
            >
              <ShoppingBag className="w-10 h-10 text-muted-foreground/50" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold text-foreground mb-2"
            >
              No products found
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground"
            >
              We couldn't find anything in this category.
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
}
