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
  { name: "Electronics",        emoji: "📱" },
  { name: "Clothing",           emoji: "👗" },
  { name: "Makeup & Beauty",    emoji: "💄" },
  { name: "Bags & Accessories", emoji: "👜" },
  { name: "Jewelry",            emoji: "💎" },
  { name: "Innerwear",          emoji: "🧦" },
  { name: "Home & Kitchen",     emoji: "🏠" },
  { name: "Sports & Fitness",   emoji: "🏋️" },
  { name: "Toys & Kids",        emoji: "🧸" },
  { name: "Books & Stationery", emoji: "📚" },
  { name: "Health & Wellness",  emoji: "🌿" },
];

/* ── Word-by-word animated headline ── */
function AnimatedHeadline({
  lines,
  className = "",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  delay?: number;
}) {
  return (
    <h1 className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, wi) => (
            <motion.span
              key={wi}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 28, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{
                delay: delay + (li * 3 + wi) * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/* ── Fade-in on scroll utility ── */
function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Product Carousel ── */
function ProductCarousel({
  title,
  category,
  delay = 0,
}: {
  title: string;
  category: string;
  delay?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ref, isVisible] = useIntersectionObserver();
  const { data, isLoading } = useListProducts({ category, page: 1, limit: 20 });
  const products: Product[] = data?.items ?? [];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 sm:mb-14 transition-all duration-700 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Section header */}
      <div className="flex items-end justify-between mb-4 sm:mb-6 px-3 sm:px-4 md:px-8">
        <div>
          <motion.h2
            className="text-xl sm:text-2xl font-black text-foreground tracking-tight"
            initial={{ opacity: 0, x: -16 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xs sm:text-sm text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            Top picks for you
          </motion.p>
        </div>
        <Link href={`/category/${encodeURIComponent(category)}`}>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary hover:bg-primary/5 font-semibold group hidden sm:flex text-sm"
          >
            View All{" "}
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
            className="flex overflow-x-auto gap-3 sm:gap-4 md:gap-5 px-3 sm:px-4 md:px-8 pb-6 hide-scrollbar snap-x snap-mandatory"
          >
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                className="w-[148px] sm:w-[190px] md:w-[230px] shrink-0 snap-start"
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: idx * 0.04 + 0.1,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   Main Home page
══════════════════════════════════════════ */
export function Home() {
  const [_scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">

      {/* ══ Hero Banner ══ */}
      <div className="relative w-full h-[260px] sm:h-[360px] md:h-[440px] lg:h-[520px] overflow-hidden bg-primary mb-8 sm:mb-12">
        <motion.img
          src={heroImg}
          alt="Sunshine Mega Sale"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />

        {/* floating sparkle orbs */}
        <motion.div
          className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-[-4rem] left-[-4rem]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-secondary/20 rounded-full blur-3xl bottom-[-2rem] right-[10%]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Copy */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-md sm:max-w-lg">
              {/* Badge */}
              <motion.span
                className="inline-block py-1 px-3 rounded-full bg-secondary text-secondary-foreground text-[11px] font-bold uppercase tracking-widest mb-3"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.45, ease: "backOut" }}
              >
                Grand Opening
              </motion.span>

              {/* Animated word-by-word headline */}
              <AnimatedHeadline
                lines={["The Big", "Sunshine Sale."]}
                delay={0.25}
                className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-3 drop-shadow-lg"
              />

              {/* Sub-text fade */}
              <motion.p
                className="text-white/90 text-sm sm:text-base md:text-lg font-medium mb-6 drop-shadow-sm max-w-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
              >
                Up to 70% off on electronics, clothing &amp; beauty.
                Your bustling digital bazaar.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Link href="/category/Electronics">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-secondary hover:text-secondary-foreground shadow-xl rounded-full px-6 sm:px-8 text-sm sm:text-base transition-all duration-300"
                  >
                    Shop Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl">

        {/* ══ Section Label ══ */}
        <FadeIn delay={0} className="px-3 sm:px-4 md:px-8 mb-4 sm:mb-6">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest text-primary mb-1"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Browse by category
          </motion.p>
        </FadeIn>

        {/* ══ Category Pills ══ */}
        <div className="flex overflow-x-auto gap-2 sm:gap-3 px-3 sm:px-4 md:px-8 mb-10 sm:mb-12 hide-scrollbar pb-2">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 14, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.045 + 0.1, duration: 0.4, ease: "backOut" }}
            >
              <Link
                href={`/category/${encodeURIComponent(cat.name)}`}
                className="flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white border border-border shadow-sm text-xs sm:text-sm font-semibold whitespace-nowrap hover:border-primary hover:text-primary hover:shadow-md transition-all flex-shrink-0 group"
              >
                <span className="text-sm sm:text-base group-hover:scale-125 transition-transform duration-200 inline-block">
                  {cat.emoji}
                </span>
                {cat.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ══ Carousels – first 3 ══ */}
        <ProductCarousel title="Trending Electronics"  category="Electronics"      delay={0}   />
        <ProductCarousel title="Fashion &amp; Apparel" category="Clothing"         delay={60}  />
        <ProductCarousel title="Beauty &amp; Makeup"   category="Makeup & Beauty"  delay={120} />

        {/* ══ Mid-page Promo Banner ══ */}
        <FadeIn delay={0} y={40} className="px-3 sm:px-4 md:px-8 mb-10 sm:mb-14">
          <div className="w-full bg-gradient-to-br from-accent to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <motion.div
              className="relative z-10 max-w-lg text-center md:text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl sm:text-3xl font-black mb-2">Sunshine Fast Delivery</h3>
              <p className="text-blue-100 mb-5 sm:mb-6 text-sm sm:text-base md:text-lg">
                Get your items delivered at lightning speed with our premium shipping.
              </p>
              <Button className="bg-white text-accent hover:bg-blue-50 rounded-full px-6 sm:px-8 text-sm sm:text-base">
                Learn More
              </Button>
            </motion.div>
            <div className="relative z-10 w-full max-w-xs sm:max-w-sm flex gap-3 sm:gap-4">
              <motion.img
                src={handbagPromoImg}
                className="w-1/2 aspect-square rounded-xl sm:rounded-2xl object-cover shadow-2xl border-4 border-white/20"
                initial={{ rotate: -8, opacity: 0 }}
                whileInView={{ rotate: -5, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                alt="Promo"
              />
              <motion.img
                src={locketPromoImg}
                className="w-1/2 aspect-square rounded-xl sm:rounded-2xl object-cover shadow-2xl border-4 border-white/20 mt-6 sm:mt-8"
                initial={{ rotate: 8, opacity: 0 }}
                whileInView={{ rotate: 5, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                alt="Promo"
              />
            </div>
          </div>
        </FadeIn>

        {/* ══ Carousels – next 3 ══ */}
        <ProductCarousel title="Bags &amp; Accessories" category="Bags & Accessories" delay={0}   />
        <ProductCarousel title="Jewelry Collection"     category="Jewelry"            delay={60}  />
        <ProductCarousel title="Innerwear Essentials"   category="Innerwear"          delay={120} />

        {/* ══ Second Promo Banner ══ */}
        <FadeIn delay={0} y={40} className="px-3 sm:px-4 md:px-8 mb-10 sm:mb-14">
          <div className="w-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white flex flex-col md:flex-row items-center gap-6 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative z-10 text-center md:text-left max-w-lg">
              <span className="inline-block bg-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                New Arrival
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mb-2">Home, Sports &amp; More</h3>
              <p className="text-emerald-100 mb-5 sm:mb-6 text-sm sm:text-base">
                Discover 5 brand-new categories — Home &amp; Kitchen, Sports &amp; Fitness, Toys, Books, and Health &amp; Wellness.
              </p>
              <Link href="/category/Home%20%26%20Kitchen">
                <Button className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-full px-6 sm:px-8 text-sm sm:text-base">
                  Explore Now
                </Button>
              </Link>
            </div>
            <div className="relative z-10 flex gap-2 sm:gap-3 text-4xl sm:text-5xl md:text-6xl">
              {["🏠", "🏋️", "🧸", "📚", "🌿"].map((e, i) => (
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
        </FadeIn>

        {/* ══ Final Carousels ══ */}
        <ProductCarousel title="Home &amp; Kitchen Picks"    category="Home & Kitchen"    delay={0}   />
        <ProductCarousel title="Sports &amp; Fitness Gear"   category="Sports & Fitness"  delay={60}  />
        <ProductCarousel title="Toys &amp; Kids Favourites"  category="Toys & Kids"       delay={120} />
        <ProductCarousel title="Books &amp; Stationery"      category="Books & Stationery" delay={0}  />
        <ProductCarousel title="Health &amp; Wellness"       category="Health & Wellness"  delay={60} />
      </div>
    </div>
  );
}
