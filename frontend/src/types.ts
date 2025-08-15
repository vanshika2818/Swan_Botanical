export type ID = string;

export interface User {
  _id: ID;
  name: string;
  email: string;
}

export interface CartItem {
  productId: ID;
  name: string;
  price: number; // per unit
  qty: number;
  imageUrl?: string;
  // optional SKU/variant fields
  sku?: string;
}

export interface Cart {
  items: CartItem[];
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}