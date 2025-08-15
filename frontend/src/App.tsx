// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Ingredients from "./pages/Ingredients";
import Sustainability from "./pages/Sustainability";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SearchResultsPage from "./components/SearchResultsPage.tsx";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import LoginPage from './components/auth/LoginForm.tsx';
import RegisterPage from './components/auth/RegisterForm.tsx';
//import OrdersPage from './pages/Orders';

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* <Route path="/orders" element={<OrdersPage />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;