import axios from 'axios';
import { Product } from '@/types';

const API_URL = 'https://swan-botanical.onrender.com/api';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Mock data fallback
const mockProducts: Product[] = [
  {
    _id: '1',
    name: "Gentle Botanical Cleanser",
    description: "A mild, sulfate-free cleanser with chamomile and aloe vera",
    price: 899,
    originalPrice: 1099,
    category: "cleansers",
    images: ["/placeholder-product.jpg"],
    stock: 50,
    rating: 4.8,
    reviewCount: 124,
    benefits: ["Gently removes impurities", "Maintains skin's natural moisture"],
    keyIngredients: [{ name: "Chamomile", benefit: "Soothing", concentration: "5%" }],
    fullIngredients: "Aqua, Chamomile, Aloe Vera",
    howToUse: "Use morning and evening",
    isNewProduct: true,
    isBestSeller: false,
    createdAt: new Date().toISOString(),
    sizes: []
  },
  {
    _id: '2',
    name: "Vitamin C Brightening Serum",
    description: "Natural vitamin C serum for radiant skin",
    price: 1299,
    originalPrice: 1599,
    category: "serums",
    images: ["/placeholder-product.jpg"],
    stock: 30,
    rating: 4.9,
    reviewCount: 256,
    benefits: ["Brightens skin tone", "Reduces dark spots"],
    keyIngredients: [{ name: "Vitamin C", benefit: "Antioxidant", concentration: "15%" }],
    fullIngredients: "Aqua, Vitamin C, Hyaluronic Acid",
    howToUse: "Apply 2-3 drops daily",
    isNewProduct: false,
    isBestSeller: true,
    createdAt: new Date().toISOString(),
    sizes: []
  }
];

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('API failed, using mock data');
    return mockProducts;
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    // Return first mock product as fallback
    return mockProducts[0];
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    // Filter mock products by category
    return mockProducts.filter(p => p.category === category);
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/products/search/${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    // Filter mock products by search query
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }
};