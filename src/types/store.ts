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

export interface Order {
  id: string;
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: 'USD' | 'PKR' | 'AED';
  status: 'confirmed' | 'tailoring' | 'inspected' | 'dispatched' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export type Currency = 'USD' | 'PKR' | 'AED';
