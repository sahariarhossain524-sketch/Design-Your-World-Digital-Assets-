export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  tags?: string[];
  isBundle?: boolean;
  items?: string[];
  slides?: number;
  styles?: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  bgColor: string;
  image: string;
  subcategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FontItem {
  name: string;
  category: string;
  styles: number;
  price: number;
  specimen: string;
}

export interface PresentationItem {
  title: string;
  slides: number;
  price: number;
  image: string;
}

export type ToastType = 'success' | 'cart' | 'wishlist' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}
