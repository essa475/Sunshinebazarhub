import { useState, useEffect, useRef } from "react";
import { useListProducts, type Product } from "@workspace/api-client-react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import heroImg from "@assets/generated_images/hero.png";
import handbagPromoImg from "@assets/generated_images/handbag.png";
import locketPromoImg from "@assets/generated_images/locket.png";

const CATEGORIES = [
  "Electronics", "Clothing", "Makeup & Beauty", "Bags & Accessories", "Jewelry", "Innerwear"
];

function ProductCarousel({ title, category }: { title: string; category: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ref, isVisible] = useIntersectionObserver();
  const { data, isLoading } = useListProducts({ category, page: 1, limit: 20 });
  const products: Product[] = data?.items ?? [];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={ref} className={cn("mb-12 transition-all duration-700 transform", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
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
            {products.map(product => (
              <div key={product.id} className="w-[160px] sm:w-[200px] md:w-[240px] shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex"
            onClick={() => scroll('right')}
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
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-primary mb-12">
        <img
          src={heroImg}
          alt="Sunshine Mega Sale"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-xl animate-in zoom-in duration-700 fade-in">
              <span className="inline-block py-1 px-3 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest mb-4">
                Grand Opening
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-md">
                The Big <br />Sunshine Sale.
              </h1>
              <p className="text-white/90 text-lg md:text-xl font-medium mb-8 drop-shadow-sm max-w-md">
                Up to 70% off on electronics, clothing, and beauty. Your bustling digital bazaar.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-xl rounded-full px-8 text-lg">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Category Pills */}
        <div className="flex overflow-x-auto gap-3 px-4 md:px-8 mb-12 hide-scrollbar pb-2">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              className="px-5 py-2.5 rounded-full bg-white border border-border shadow-sm text-sm font-semibold whitespace-nowrap hover:border-primary hover:text-primary transition-colors flex-shrink-0"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Carousels */}
        <ProductCarousel title="Trending Electronics" category="Electronics" />
        <ProductCarousel title="Fashion & Apparel" category="Clothing" />
        <ProductCarousel title="Beauty & Makeup" category="Makeup & Beauty" />

        {/* Promo Banner Mid-Page */}
        <div className="px-4 md:px-8 mb-12">
          <div className="w-full bg-gradient-to-br from-accent to-blue-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10 max-w-lg text-center md:text-left">
              <h3 className="text-3xl font-black mb-2">Sunshine Fast Delivery</h3>
              <p className="text-blue-100 mb-6 text-lg">Get your items delivered at lightning speed with our premium shipping.</p>
              <Button className="bg-white text-accent hover:bg-blue-50 rounded-full px-8">
                Learn More
              </Button>
            </div>
            <div className="relative z-10 w-full max-w-sm flex gap-4">
              <img src={handbagPromoImg} className="w-1/2 aspect-square rounded-2xl object-cover shadow-2xl rotate-[-5deg] border-4 border-white/20" alt="Promo" />
              <img src={locketPromoImg} className="w-1/2 aspect-square rounded-2xl object-cover shadow-2xl rotate-[5deg] border-4 border-white/20 mt-8" alt="Promo" />
            </div>
          </div>
        </div>

        <ProductCarousel title="Bags & Accessories" category="Bags & Accessories" />
        <ProductCarousel title="Jewelry Collection" category="Jewelry" />
      </div>
    </div>
  );
}
