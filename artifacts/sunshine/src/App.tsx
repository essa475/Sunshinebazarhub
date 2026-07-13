import { Toaster } from '@/components/ui/toaster';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppProviders } from '@/store';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

// Pages
import { Home } from '@/pages/Home';
import { CategoryPage } from '@/pages/Category';
import { CartPage } from '@/pages/Cart';
import { OrdersPage } from '@/pages/Orders';
import { AuthPage } from '@/pages/Auth';
import { AboutPage } from '@/pages/About';
import NotFound from '@/pages/not-found';

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:category" component={CategoryPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProviders>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
    </AppProviders>
  );
}

export default App;
