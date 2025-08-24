import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Filter, Search, Star, ShoppingCart, Leaf, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { getProducts, searchProducts, getProductsByCategory } from '@/api/products';
import { Product } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cleansers', name: 'Cleansers' },
    { id: 'serums', name: 'Serums' },
    { id: 'moisturizers', name: 'Moisturizers' },
    { id: 'masks', name: 'Face Masks' },
    { id: 'oils', name: 'Face Oils' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data: Product[];
        
        if (searchTerm) {
          data = await searchProducts(searchTerm);
        } else if (selectedCategory !== 'all') {
          data = await getProductsByCategory(selectedCategory);
        } else {
          data = await getProducts();
        }
        
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce for search
    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchTerm]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} was added to your cart`,
    });
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Natural Skincare Products | Swan Botanicals</title>
        <meta name="description" content="Browse our complete range of natural skincare products" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our complete range of natural skincare products, 
            each carefully crafted with botanical ingredients.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`min-h-[44px] ${selectedCategory === category.id ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="relative lg:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 min-h-[44px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="text-center py-8">
              <p className="text-yellow-600 text-lg bg-yellow-50 p-4 rounded-lg">
                {error}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const discount = product.originalPrice 
                ? calculateDiscount(product.originalPrice, product.price) 
                : 0;
              
              return (
                <Card key={product._id} className="group hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
                      <img
                        src={product.images[0] || '/placeholder-product.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                        }}
                      />
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-2">
                        {product.isNewProduct && (
                          <Badge className="bg-blue-600 hover:bg-blue-700">
                            New
                          </Badge>
                        )}
                        {product.isBestSeller && (
                          <Badge className="bg-purple-600 hover:bg-purple-700">
                            Bestseller
                          </Badge>
                        )}
                        {discount > 0 && (
                          <Badge variant="destructive">
                            {discount}% OFF
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6 flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          AYUSH Certified
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Leaf className="h-3 w-3 mr-1" />
                          99% Natural
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-3">{product.description}</p>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {product.rating || 0} ({product.reviewCount || 0} reviews)
                        </span>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Key Benefits:</span>
                        <ul className="mt-1 space-y-1">
                          {(product.benefits || []).slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Price and Actions */}
                    <div className="p-6 pt-0 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-2xl font-bold text-emerald-600">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                          <Link to={`/products/${product._id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.stock || product.stock <= 0}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {(!product.stock || product.stock <= 0) ? "Out of Stock" : "Add to Cart"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {products.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found. Try adjusting your filters or search term.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;