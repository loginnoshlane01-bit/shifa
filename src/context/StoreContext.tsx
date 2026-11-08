import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderCustomer, Currency, OrderStatus, AdminTab } from '../types/store';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;
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
  updateOrderStatus: (orderId: string, status: OrderStatus, karigar?: string) => void;
  deleteOrder: (orderId: string) => void;
  trackingOrder: Order | null;
  setTrackingOrder: (o: Order | null) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  viewMode: 'storefront' | 'admin' | 'logo-studio';
  setViewMode: (m: 'storefront' | 'admin' | 'logo-studio') => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS_KEY = 'shifa_clothing_products_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'shifa_clothing_orders_v1';
const LOCAL_STORAGE_CART_KEY = 'shifa_clothing_cart_v1';
const LOCAL_STORAGE_CURRENCY_KEY = 'shifa_clothing_currency_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

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
      // Default initial sample orders for realistic admin & tracking demonstration
      const sampleOrders: Order[] = [
        {
          id: 'SH-8429',
          date: 'Nov 7, 2026, 04:30 PM',
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
          assignedKarigar: 'Ustad Zahid (Lahore Atelier)',
        },
        {
          id: 'SH-8412',
          date: 'Nov 6, 2026, 11:15 AM',
          customer: {
            fullName: 'Fatima Al-Falasi',
            email: 'fatima.al@dubai.ae',
            phone: '+971 50 9182341',
            address: 'Apt 2204, Downtown Tower',
            city: 'Dubai',
            postalCode: '00000',
            paymentMethod: 'card',
            notes: 'Bespoke sleeve length 24.5 inches'
          },
          items: [
            {
              product: PRODUCTS[2],
              selectedSize: '54 (Regular)',
              selectedColor: 'Deep Emerald',
              quantity: 1,
              bespokeNotes: 'Sleeve length 24.5 in, gold piping along lapel'
            }
          ],
          subtotal: PRODUCTS[2].priceAED,
          shipping: 0,
          total: PRODUCTS[2].priceAED,
          currency: 'AED',
          status: 'inspected',
          trackingNumber: 'DHL-AE-81920',
          estimatedDelivery: 'Nov 10, 2026',
          assignedKarigar: 'Master Karigar Tariq',
        },
        {
          id: 'SH-8395',
          date: 'Nov 5, 2026, 02:45 PM',
          customer: {
            fullName: 'Zainab Qazi',
            email: 'zainab.qazi@gmail.com',
            phone: '+44 7700 900123',
            address: '42 Mayfair Mews',
            city: 'London',
            postalCode: 'W1J 8DZ',
            paymentMethod: 'card',
            notes: 'Urgent event gift for daughter'
          },
          items: [
            {
              product: PRODUCTS[1],
              selectedSize: 'M',
              selectedColor: 'Silk Ivory',
              quantity: 1,
            }
          ],
          subtotal: PRODUCTS[1].priceUSD,
          shipping: 0,
          total: PRODUCTS[1].priceUSD,
          currency: 'USD',
          status: 'dispatched',
          trackingNumber: 'FEDEX-GB-33910',
          estimatedDelivery: 'Nov 9, 2026',
          assignedKarigar: 'Ustad Zahid (Lahore Atelier)',
        }
      ];
      return sampleOrders;
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'storefront' | 'admin' | 'logo-studio'>('storefront');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sync products to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage products sync failed', e);
    }
  }, [products]);

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
      assignedKarigar: 'Atelier Head Craftsman',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setTrackingOrder(newOrder);
    setIsCartOpen(false);
    setIsTrackingOpen(true);
    return newOrder;
  };

  // Admin Order Mutations
  const updateOrderStatus = (orderId: string, status: OrderStatus, karigar?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            assignedKarigar: karigar !== undefined ? karigar : ord.assignedKarigar,
          };
        }
        return ord;
      })
    );
    // Also sync trackingOrder if open
    if (trackingOrder && trackingOrder.id === orderId) {
      setTrackingOrder((prev) => (prev ? { ...prev, status, assignedKarigar: karigar || prev.assignedKarigar } : null));
    }
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    if (trackingOrder && trackingOrder.id === orderId) {
      setTrackingOrder(null);
    }
  };

  // Admin Product Mutations
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = `shifa-${Date.now()}`;
    const product: Product = { ...newProduct, id };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProductStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
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
        updateOrderStatus,
        deleteOrder,
        trackingOrder,
        setTrackingOrder,
        isTrackingOpen,
        setIsTrackingOpen,
        viewMode,
        setViewMode,
        adminTab,
        setAdminTab,
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
