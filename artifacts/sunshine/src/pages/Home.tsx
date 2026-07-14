import { useState, useEffect, useRef } from "react";
import { useListProducts, type Product } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import heroImg from "@assets/generated_images/hero.png";
import handbagPromoImg from "@assets/generated_images/handbag.png";
import locketPromoImg from "@assets/generated_images/locket.png";

const CATEGORIES = [
  { name: "Electronics",       emoji: "📱" },
  { name: "Clothing",          emoji: "👗" },
  { name: "Makeup & Beauty",   emoji: "💄" },
  { name: "Bags & Accessories",emoji: "👜" },
  { name: "Jewelry",           emoji: "💎" },
  { name: "Innerwear",         emoji: "🧦" },
  { name: "Home & Kitchen",    emoji: "🏠" },
  { name: "Sports & Fitness",  emoji: "🏋️" },
  { name: "Toys & Kids",       emoji: "🧸" },
  { name: "Books & Stationery",emoji: "📚" },
  { name: "Health & Wellness", emoji: "🌿" },
];

function ProductCarousel({ title, category, delay = 0 }: { title: string; category: string; delay?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ref, isVisible] = useIntersectionObserver();
  const { data, isLoading } = useListProducts({ category, page: 1, limit: 20 });
  const products: Product[] = data?.items ?? [];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "mb-14 transition-all duration-700 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-end justify-between mb-6 px-4 md:px-8">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">Top picks for you</p>
        </div>
        <Link href={`/category/${encodeURIComponent(category)}`}>
          <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 font-semibold group hidden sm:flex">
            View All <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="h-40 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="relative group/carousel">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 px-4 md:px-8 pb-8 hide-scrollbar snap-x snap-mandatory"
          >
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                className="w-[160px] sm:w-[200px] md:w-[240px] shrink-0 snap-start"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: idx * 0.04 + 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}

export function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { if (window.scrollY > 50) setScrolled(true); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[300px] md:h-[420px] lg:h-[520px] overflow-hidden bg-primary mb-12">
        <motion.img
          src={heroImg}
          alt="Sunshine Mega Sale"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="inline-block py-1 px-3 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Grand Opening
              </motion.span>
              <motion.h1
                className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                The Big <br />Sunshine Sale.
              </motion.h1>
              <motion.p
                className="text-white/90 text-lg md:text-xl font-medium mb-8 drop-shadow-sm max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                Up to 70% off on electronics, clothing, and beauty. Your bustling digital bazaar.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-xl rounded-full px-8 text-lg">
                  Shop Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* ── Category Pills ── */}
        <div className="flex overflow-x-auto gap-3 px-4 md:px-8 mb-12 hide-scrollbar pb-2">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: "backOut" }}
            >
              <Link
                href={`/category/${encodeURIComponent(cat.name)}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border shadow-sm text-sm font-semibold whitespace-nowrap hover:border-primary hover:text-primary hover:shadow-md transition-all flex-shrink-0 group"
              >
                <span className="text-base group-hover:scale-125 transition-transform duration-200 inline-block">
                  {cat.emoji}
                </span>
                {cat.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Carousels (all 11 categories) ── */}
        <ProductCarousel title="Trending Electronics"       category="Electronics"        delay={0}   />
        <ProductCarousel title="Fashion & Apparel"          category="Clothing"            delay={60}  />
        <ProductCarousel title="Beauty & Makeup"            category="Makeup & Beauty"     delay={120} />

        {/* ── Mid-page Promo Banner ── */}
        <motion.div
          className="px-4 md:px-8 mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full bg-gradient-to-br from-accent to-blue-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <motion.div
              className="relative z-10 max-w-lg text-center md:text-left"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-black mb-2">Sunshine Fast Delivery</h3>
              <p className="text-blue-100 mb-6 text-lg">Get your items delivered at lightning speed with our premium shipping.</p>
              <Button className="bg-white text-accent hover:bg-blue-50 rounded-full px-8">Learn More</Button>
            </motion.div>
            <div className="relative z-10 w-full max-w-sm flex gap-4">
              <motion.img
                src={handbagPromoImg}
                className="w-1/2 aspect-square rounded-2xl object-cover shadow-2xl border-4 border-white/20"
                initial={{ rotate: -8, opacity: 0 }}
                whileInView={{ rotate: -5, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                alt="Promo"
              />
              <motion.img
                src={locketPromoImg}
                className="w-1/2 aspect-square rounded-2xl object-cover shadow-2xl border-4 border-white/20 mt-8"
                initial={{ rotate: 8, opacity: 0 }}
                whileInView={{ rotate: 5, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                alt="Promo"
              />
            </div>
          </div>
        </motion.div>

        <ProductCarousel title="Bags & Accessories"         category="Bags & Accessories"  delay={0}   />
        <ProductCarousel title="Jewelry Collection"         category="Jewelry"             delay={60}  />
        <ProductCarousel title="Innerwear Essentials"       category="Innerwear"           delay={120} />

        {/* ── Second Promo Banner ── */}
        <motion.div
          className="px-4 md:px-8 mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative z-10 text-center md:text-left max-w-lg">
              <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                New Arrival
              </span>
              <h3 className="text-3xl font-black mb-2">Home, Sports & More</h3>
              <p className="text-emerald-100 mb-6">Discover 5 brand-new categories — Home & Kitchen, Sports & Fitness, Toys, Books, and Health & Wellness.</p>
              <Link href="/category/Home%20%26%20Kitchen">
                <Button className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-full px-8">Explore Now</Button>
              </Link>
            </div>
            <div className="relative z-10 flex gap-3 text-6xl">
              {["🏠","🏋️","🧸","📚","🌿"].map((e, i) => (
                <motion.span
                  key={e}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  className="drop-shadow-xl"
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        <ProductCarousel title="Home & Kitchen Picks"       category="Home & Kitchen"      delay={0}   />
        <ProductCarousel title="Sports & Fitness Gear"      category="Sports & Fitness"    delay={60}  />
        <ProductCarousel title="Toys & Kids Favourites"     category="Toys & Kids"         delay={120} />
        <ProductCarousel title="Books & Stationery"         category="Books & Stationery"  delay={0}   />
        <ProductCarousel title="Health & Wellness"          category="Health & Wellness"   delay={60}  />
      </div>
    </div>
  );
}
