import { useEffect, useRef } from 'react';
import { ClerkProvider, SignIn, SignUp, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { AppProviders } from '@/store';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

// Pages
import { Home } from '@/pages/Home';
import { CategoryPage } from '@/pages/Category';
import { CartPage } from '@/pages/Cart';
import { OrdersPage } from '@/pages/Orders';
import { AboutPage } from '@/pages/About';
import NotFound from '@/pages/not-found';

// REQUIRED — copy verbatim. Resolves the key from window.location.hostname so the
// same build serves multiple Clerk custom domains. Do not inline the env var, leave
// publishableKey undefined, or replace publishableKeyFromHost with anything else.
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

// REQUIRED — copy verbatim. Empty in dev (Clerk hits dev FAPI directly), auto-set
// in prod. Do NOT gate on import.meta.env.PROD / NODE_ENV — the empty dev value
// is intentional, and any branching breaks the prod proxy.
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

// Clerk passes full paths to routerPush/routerReplace, but wouter's
// setLocation prepends the base — strip it to avoid doubling.
function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || '/'
    : path;
}

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env file');
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: '#F97316',
    colorForeground: '#111827',
    colorMutedForeground: '#64748b',
    colorDanger: '#DC2626',
    colorBackground: '#ffffff',
    colorInput: '#F8FAFC',
    colorInputForeground: '#111827',
    colorNeutral: '#E2E8F0',
    fontFamily: 'Outfit, sans-serif',
    borderRadius: '0.75rem',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-white rounded-2xl w-[440px] max-w-full overflow-hidden shadow-lg',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
    headerTitle: 'text-slate-900 font-black',
    headerSubtitle: 'text-slate-500',
    socialButtonsBlockButtonText: 'text-slate-700 font-medium',
    formFieldLabel: 'text-slate-700 font-medium',
    footerActionLink: 'text-orange-600 font-semibold hover:text-orange-700',
    footerActionText: 'text-slate-500',
    dividerText: 'text-slate-400',
    identityPreviewEditButton: 'text-orange-600',
    formFieldSuccessText: 'text-green-600',
    alertText: 'text-red-600',
    logoBox: 'flex justify-center mb-2',
    logoImage: 'h-10 w-10',
    socialButtonsBlockButton: 'border-slate-200 hover:bg-slate-50',
    formButtonPrimary: 'bg-orange-500 hover:bg-orange-600 text-white font-bold',
    formFieldInput: 'border-slate-200 focus:border-orange-500',
    footerAction: 'text-slate-500',
    dividerLine: 'bg-slate-200',
    alert: 'bg-red-50 border-red-200',
    otpCodeFieldInput: 'border-slate-200',
    formFieldRow: 'mb-4',
    main: 'gap-4',
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

// Keeps the React Query cache from leaking data between different signed-in users.
function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function AppRouter() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:category" component={CategoryPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/sign-up/*?" component={SignUpPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: 'Welcome back',
            subtitle: 'Sign in to continue shopping at Sunshine',
          },
        },
        signUp: {
          start: {
            title: 'Join Sunshine',
            subtitle: 'Create an account to start shopping',
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <AppProviders>
          <AppRouter />
          <Toaster />
        </AppProviders>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
