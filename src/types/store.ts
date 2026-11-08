export interface Product {
  id: string;
  name: string;
  category: 'emerald-heritage' | 'organic-linen' | 'silk-atelier' | 'accessories';
  categoryLabel: string;
  priceUSD: number;
  pricePKR: number;
  priceAED: number;
  image: string;
  badge?: string;
  fabric: string;
  healingProperties: string;
  description: string;
  details: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  bespokeNotes?: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
  paymentMethod: 'cod' | 'bank_transfer' | 'card';
}

export type OrderStatus = 'confirmed' | 'tailoring' | 'inspected' | 'dispatched' | 'delivered';

export interface Order {
  id: string;
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: 'USD' | 'PKR' | 'AED';
  status: OrderStatus;
  trackingNumber: string;
  estimatedDelivery: string;
  assignedKarigar?: string;
}

export type Currency = 'USD' | 'PKR' | 'AED';

export type AdminTab = 'dashboard' | 'orders' | 'products' | 'bespoke' | 'customers' | 'settings';
