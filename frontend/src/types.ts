// Cart and Product Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  benefits: string[];
  keyIngredients: Ingredient[];
  fullIngredients: string;
  howToUse: string;
  sizes?: ProductSize[];
  isNew?: boolean;
  isBestSeller?: boolean;
  createdAt: string;
  isNewProduct?: boolean
}

export interface Ingredient {
  name: string;
  benefit: string;
  concentration: string;
}

export interface ProductSize {
  size: string;
  price: number;
  originalPrice?: number;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  validation?: RegExp;
  errorMessage?: string;
}

// UI Types
export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
}

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<any>;
  children?: NavItem[];
}

// Filter Types
export interface ProductFilter {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'paypal' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  userName: string;
  userAvatar?: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
  addedAt: string;
}

// Newsletter Types
export interface NewsletterSubscription {
  email: string;
  subscribed: boolean;
  subscribedAt?: string;
  unsubscribedAt?: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar?: string;
  image: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  readTime: number;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// Theme Types
export interface Theme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}

// Settings Types
export interface AppSettings {
  theme: Theme;
  currency: string;
  language: string;
  notifications: boolean;
  newsletter: boolean;
}

// Utility Types
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type Require<T, K extends keyof T> = T & Required<Pick<T, K>>;