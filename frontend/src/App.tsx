import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Ingredients = lazy(() => import("@/pages/Ingredients"));
const Sustainability = lazy(() => import("@/pages/Sustainability"));
const Blog = lazy(() => import("@/pages/Blog"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));

// Components
const SearchResultsPage = lazy(() => import("./components/SearchResultsPage.tsx"));
const LoginPage = lazy(() => import("@/components/auth/LoginForm"));
const RegisterPage = lazy(() => import("@/components/auth/RegisterForm"));

// Context Providers
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Index />} />
                  <Route path="about" element={<About />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/:id" element={<ProductDetails />} />
                  <Route path="ingredients" element={<Ingredients />} />
                  <Route path="sustainability" element={<Sustainability />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="search" element={<SearchResultsPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </TooltipProvider>
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;