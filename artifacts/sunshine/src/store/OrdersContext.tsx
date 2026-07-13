import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface OrderItem {
  product: Product;
  quantity: number;
  priceAtTime: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sunshine_orders');
      if (saved) setOrders(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to parse orders');
    }
  }, []);

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      const newOrders = [order, ...prev];
      localStorage.setItem('sunshine_orders', JSON.stringify(newOrders));
      return newOrders;
    });
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used within OrdersProvider");
  return context;
}
