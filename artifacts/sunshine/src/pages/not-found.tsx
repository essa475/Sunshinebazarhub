import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-background text-center px-4">
      <div className="text-[120px] font-black text-primary/20 leading-none">404</div>
      <h1 className="mt-4 text-3xl font-black text-foreground">Lost in the Bazaar</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        We searched every aisle, but couldn't find the page you're looking for.
      </p>
      <button 
        onClick={() => setLocation("/")}
        className="mt-8 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg"
      >
        Back to Home
      </button>
    </div>
  );
}