import axios from 'axios';
import { Product } from '@/types';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api' 
  : 'http://localhost:3000/api';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error(`Product with ID ${id} not found`);
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error(`Failed to fetch products in category ${category}`);
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products');
  }
};

export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
};