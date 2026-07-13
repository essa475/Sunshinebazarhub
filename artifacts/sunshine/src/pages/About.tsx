import { Sun } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-primary text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=1920')] opacity-10 mix-blend-overlay object-cover"></div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="inline-flex bg-white p-3 rounded-full text-primary shadow-xl mb-6">
            <Sun className="h-10 w-10" strokeWidth={3} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-md">
            Bringing the Bazaar to Your Pocket.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto">
            Sunshine is the most vibrant online marketplace, offering everything from high-end tech to daily essentials.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-black text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Shopping shouldn't be boring, clinical, or difficult. We built Sunshine to bring back the energy, discovery, and joy of walking through a bustling local market, but with the convenience of modern technology.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're hunting for a deal on the latest PlayStation, picking out a delicate gold locket, or just restocking on basics, Sunshine is designed to be your go-to digital bazaar.
            </p>
          </div>
          <div className="bg-secondary/20 rounded-3xl p-8 border-2 border-secondary/30 relative transform rotate-2">
             <div className="absolute -top-4 -left-4 bg-primary text-white px-4 py-1 rounded-full font-bold transform -rotate-6 shadow-md">Fun Fact</div>
             <p className="text-xl font-medium text-foreground italic">"We process over 10,000 mock orders a day in our simulation."</p>
          </div>
        </div>

        {/* Founder Note */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <h2 className="text-2xl font-black text-foreground mb-6">A Note from the Creator</h2>
          
          <div className="prose prose-lg prose-p:text-muted-foreground max-w-none">
            <p>
              Welcome to Sunshine! I built this app because I wanted a shopping experience that felt alive. Too many e-commerce sites today are stripped down to gray text on white backgrounds. They feel like filing cabinets.
            </p>
            <p>
              Sunshine is different. It's loud, it's colorful, and it's packed with everything you could ever want. It's designed to mimic the chaotic but thrilling energy of a real-world market, where you never know what deal you'll find next.
            </p>
            <p className="font-medium text-foreground mt-8">
              Stay bright,<br/>
              <span className="text-xl font-black text-primary block mt-2">Captain Ihsan</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
