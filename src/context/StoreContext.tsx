import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderCustomer, Currency } from '../types/store';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usd: number, pkr: number, aed: number) => string;
  addToCart: (product: Product, size: string, color: string, quantity?: number, bespokeNotes?: string) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, newQty: number) => void;
  cartCount: number;
  cartSubtotal: { usd: number; pkr: number; aed: number };
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  orders: Order[];
  createOrder: (customer: OrderCustomer) => Order;
  trackingOrder: Order | null;
  setTrackingOrder: (o: Order | null) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  viewMode: 'storefront' | 'logo-studio';
  setViewMode: (m: 'storefront' | 'logo-studio') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_ORDERS_KEY = 'shifa_clothing_orders_v1';
const LOCAL_STORAGE_CART_KEY = 'shifa_clothing_cart_v1';
const LOCAL_STORAGE_CURRENCY_KEY = 'shifa_clothing_currency_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CURRENCY_KEY);
      return (saved === 'USD' || saved === 'PKR' || saved === 'AED') ? saved : 'PKR';
    } catch {
      return 'PKR';
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
      // Default initial sample order for immediate instant tracking verification
      const sampleOrder: Order = {
        id: 'SH-8429',
        date: new Date(Date.now() - 3600000 * 18).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        customer: {
          fullName: 'Sufyan Malik',
          email: 'sufyan.malik@example.com',
          phone: '+92 300 8472910',
          address: 'Villa 14, Phase 5, DHA',
          city: 'Lahore',
          postalCode: '54000',
          paymentMethod: 'cod',
          notes: 'Please ensure extra gold embroidery packaging'
        },
        items: [
          {
            product: PRODUCTS[0],
            selectedSize: 'L',
            selectedColor: 'Deep Emerald',
            quantity: 1,
          }
        ],
        subtotal: PRODUCTS[0].pricePKR,
        shipping: 0,
        total: PRODUCTS[0].pricePKR,
        currency: 'PKR',
        status: 'tailoring',
        trackingNumber: 'TCS-94827104',
        estimatedDelivery: '3 to 5 Business Days',
      };
      return [sampleOrder];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'storefront' | 'logo-studio'>('storefront');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sync cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage cart sync failed', e);
    }
  }, [cart]);

  // Sync orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage order sync failed', e);
    }
  }, [orders]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(LOCAL_STORAGE_CURRENCY_KEY, c);
    } catch {}
  };

  const formatPrice = (usd: number, pkr: number, aed: number): string => {
    if (currency === 'PKR') {
      return `Rs. ${pkr.toLocaleString()}`;
    }
    if (currency === 'AED') {
      return `AED ${aed.toLocaleString()}`;
    }
    return `$${usd.toLocaleString()}`;
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1, bespokeNotes?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        if (bespokeNotes) next[existingIdx].bespokeNotes = bespokeNotes;
        return next;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity, bespokeNotes }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (acc, item) => ({
      usd: acc.usd + item.product.priceUSD * item.quantity,
      pkr: acc.pkr + item.product.pricePKR * item.quantity,
      aed: acc.aed + item.product.priceAED * item.quantity,
    }),
    { usd: 0, pkr: 0, aed: 0 }
  );

  const createOrder = (customer: OrderCustomer): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SH-${randomNum}`;
    
    const sub = currency === 'PKR' ? cartSubtotal.pkr : currency === 'AED' ? cartSubtotal.aed : cartSubtotal.usd;
    const shipping = 0; // Free shipping threshold promotion
    const total = sub + shipping;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer,
      items: [...cart],
      subtotal: sub,
      shipping,
      total,
      currency,
      status: 'confirmed',
      trackingNumber: `SHIFA-EXP-${Date.now().toString().slice(-6)}`,
      estimatedDelivery: '3 to 5 Business Days',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setTrackingOrder(newOrder);
    setIsCartOpen(false);
    setIsTrackingOpen(true);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        currency,
        setCurrency,
        formatPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        orders,
        createOrder,
        trackingOrder,
        setTrackingOrder,
        isTrackingOpen,
        setIsTrackingOpen,
        viewMode,
        setViewMode,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
