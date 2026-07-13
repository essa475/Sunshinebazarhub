import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import { OrdersProvider } from './OrdersContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          {children}
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  );
}
