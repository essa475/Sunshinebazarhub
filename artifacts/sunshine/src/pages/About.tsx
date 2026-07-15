import { useEffect, useRef, useState } from "react";
import { Sun, Sparkles, Zap, Heart, ShoppingBag, Globe } from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = to / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" } }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } }),
};

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">

      {/* ── Hero ── */}
      <div className="bg-primary text-white py-24 px-4 relative overflow-hidden">
        {/* Animated background orbs */}
        <motion.div
          className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=1920')] opacity-10 mix-blend-overlay bg-cover"></div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="inline-flex bg-white p-3 rounded-full text-primary shadow-xl mb-6"
          >
            <Sun className="h-10 w-10" strokeWidth={3} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-black mb-6 drop-shadow-md"
          >
            Bringing the Bazaar<br/>to Your Pocket.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto"
          >
            Sunshine is the most vibrant online marketplace, offering everything from high-end tech to daily essentials.
          </motion.p>
        </div>
      </div>

      {/* ── CAPTAIN IHSAN BANNER ── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 py-8 px-4 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/30"
            style={{ left: `${10 + i * 16}%`, top: `${20 + (i % 2) * 40}%` }}
            animate={{ y: [-8, 8, -8], rotate: [0, 180, 360] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
        ))}
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2"
          >
            Founded &amp; Captained by
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 10 }}
            className="text-4xl md:text-6xl font-black italic text-white drop-shadow-2xl tracking-widest uppercase"
            style={{ fontStyle: "italic", textShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
          >
            RTD CAPTAIN IHSAN
          </motion.h2>
          <motion.div
            className="w-24 h-1.5 bg-white/60 rounded-full mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          />
        </div>
      </motion.div>

      {/* ── Stats ── */}
      <div className="bg-white border-b border-border py-14 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <ShoppingBag className="w-7 h-7" />, value: 220, suffix: "+", label: "Products" },
              { icon: <Globe className="w-7 h-7" />, value: 12, suffix: "", label: "Categories" },
              { icon: <Heart className="w-7 h-7" />, value: 50000, suffix: "+", label: "Happy Shoppers" },
              { icon: <Zap className="w-7 h-7" />, value: 99, suffix: "%", label: "Uptime" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  {stat.icon}
                </div>
                <p className="text-3xl font-black text-foreground">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-20">

        {/* ── Mission ── */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-black text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Shopping shouldn't be boring, clinical, or difficult. We built Sunshine to bring back the energy, discovery, and joy of walking through a bustling local market — but with the convenience of modern technology.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're hunting for a deal on the latest gadget, picking out a delicate gold locket, or restocking on basics — Sunshine is your go-to digital bazaar.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="bg-secondary/20 rounded-3xl p-8 border-2 border-secondary/30 relative transform rotate-2 transition-transform"
          >
            <div className="absolute -top-4 -left-4 bg-primary text-white px-4 py-1 rounded-full font-bold transform -rotate-6 shadow-md text-sm">
              Fun Fact ✨
            </div>
            <p className="text-xl font-medium text-foreground italic">
              "We process over 10,000 orders a day in our simulation — and every single one gets the VIP treatment."
            </p>
          </motion.div>
        </div>

        {/* ── Values ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6 mb-20"
        >
          {[
            { icon: "⚡", title: "Speed First", text: "Lightning-fast browsing, instant search, zero friction between you and your next great find." },
            { icon: "🎨", title: "Always Vibrant", text: "We believe shopping should feel alive. Bold colours, smooth animations — this is a bazaar, not a filing cabinet." },
            { icon: "🔒", title: "Shop Safe", text: "Your cart and orders are saved locally, private to you. No server, no leaks — just you and your wishlist." },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm"
            >
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-black text-lg text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Founder Note ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <h2 className="text-2xl font-black text-foreground mb-6">A Note from the Creator</h2>

          <div className="prose prose-lg prose-p:text-muted-foreground max-w-none">
            <p>
              Welcome to Sunshine! I built this app because I wanted a shopping experience that felt <em>alive</em>. Too many e-commerce sites today are stripped down to grey text on white backgrounds — they feel like filing cabinets.
            </p>
            <p>
              Sunshine is different. It's loud, it's colourful, and it's packed with everything you could ever want. It's designed to mimic the chaotic but thrilling energy of a real-world market, where you never know what deal you'll find next.
            </p>
            <p className="font-medium text-foreground mt-8">
              Stay bright,
            </p>
          </div>

          {/* Signature block */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white font-black text-xl shadow-lg">
              I
            </div>
            <div>
              <p className="text-xl font-black text-primary italic uppercase tracking-wide">
                RTD CAPTAIN IHSAN
              </p>
              <p className="text-sm text-muted-foreground">Founder &amp; Chief Sunshine Officer</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
