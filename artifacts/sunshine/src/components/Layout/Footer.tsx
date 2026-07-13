import { Link } from "wouter";
import { Sun } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-primary shrink-0 mb-4">
              <Sun className="h-6 w-6" strokeWidth={3} />
              <span className="text-xl font-black tracking-tight">
                SUNSHINE
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your bright, bustling bazaar for everything from tech to tees. Fast, reliable, and full of great deals.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-foreground">Customer Care</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/help" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="/orders" className="hover:text-primary">Track Order</Link></li>
              <li><Link href="/returns" className="hover:text-primary">Returns & Refunds</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-foreground">Shop Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/Electronics" className="hover:text-primary">Electronics</Link></li>
              <li><Link href="/category/Clothing" className="hover:text-primary">Clothing</Link></li>
              <li><Link href="/category/Makeup & Beauty" className="hover:text-primary">Beauty</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-foreground">About Sunshine</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            This web is created by Captain Ihsan
          </p>
        </div>
      </div>
    </footer>
  );
}
