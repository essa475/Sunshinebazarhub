import { useState } from 'react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { AppProviders } from '@/store';
import { AuthProvider, useAuth } from '@/auth/AuthContext';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Sun, Eye, EyeOff } from 'lucide-react';

// Pages
import { Home } from '@/pages/Home';
import { CategoryPage } from '@/pages/Category';
import { SearchPage } from '@/pages/Search';
import { CartPage } from '@/pages/Cart';
import { OrdersPage } from '@/pages/Orders';
import { AboutPage } from '@/pages/About';
import NotFound from '@/pages/not-found';

// ── Auth pages ────────────────────────────────────────────────────────────────

function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-primary p-2 rounded-full">
            <Sun className="h-8 w-8 text-white" strokeWidth={3} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function SignInPage() {
  const { signIn } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setLocation('/');
    }
  };

  return (
    <AuthCard>
      <h2 className="text-2xl font-black text-center mb-1">Welcome back</h2>
      <p className="text-muted-foreground text-center text-sm mb-6">
        Sign in to continue shopping at Sunshine
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
        )}
        <Button type="submit" className="w-full rounded-xl h-11" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{' '}
        <button
          className="text-primary font-semibold hover:underline"
          onClick={() => setLocation('/sign-up')}
        >
          Sign up
        </button>
      </p>
    </AuthCard>
  );
}

function SignUpPage() {
  const { signUp } = useAuth();
  const [, setLocation] = useLocation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signUp(email, password, firstName, lastName);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setLocation('/');
    }
  };

  return (
    <AuthCard>
      <h2 className="text-2xl font-black text-center mb-1">Join Sunshine</h2>
      <p className="text-muted-foreground text-center text-sm mb-6">
        Create an account to start shopping
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">First Name</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Jane"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Last Name</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Doe"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">
            Password <span className="text-muted-foreground font-normal">(min 6 chars)</span>
          </label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
        )}
        <Button type="submit" className="w-full rounded-xl h-11" disabled={loading}>
          {loading ? 'Creating account…' : 'Create Account'}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{' '}
        <button
          className="text-primary font-semibold hover:underline"
          onClick={() => setLocation('/sign-in')}
        >
          Sign in
        </button>
      </p>
    </AuthCard>
  );
}

// ── App router ────────────────────────────────────────────────────────────────

function AppRouter() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:category" component={CategoryPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function App() {
  return (
    <WouterRouter base={basePath}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppProviders>
            <AppRouter />
            <Toaster />
          </AppProviders>
        </QueryClientProvider>
      </AuthProvider>
    </WouterRouter>
  );
}

export default App;
