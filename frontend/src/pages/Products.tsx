import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Filter, Search, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ProductSchema } from '@/components/ui/schema';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cleansers', name: 'Cleansers' },
    { id: 'serums', name: 'Serums' },
    { id: 'moisturizers', name: 'Moisturizers' },
    { id: 'masks', name: 'Face Masks' },
    { id: 'oils', name: 'Face Oils' }
  ];

  const products = [
    {
      id: 1,
      name: "Gentle Botanical Cleanser",
      category: "cleansers",
      price: 899,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg",
      description: "A mild, sulfate-free cleanser with chamomile and aloe vera",
      ingredients: ["Chamomile", "Aloe Vera", "Coconut Oil"]
    },
    // ... (keep all other product objects the same)
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} was added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Natural Skincare Products | Swan Botanicals - AYUSH Certified Beauty</title>
        <meta name="description" content="Browse Swan Botanicals' complete range of natural skincare products. From cleansers to serums, each product contains 99% botanical ingredients and is AYUSH certified." />
        <meta name="keywords" content="natural skincare products, botanical cleansers, vitamin C serum, natural moisturizers, face masks, face oils" />
        <meta property="og:title" content="Natural Skincare Products | Swan Botanicals" />
        <meta property="og:description" content="Complete range of AYUSH-certified natural skincare products with botanical ingredients." />
        <link rel="canonical" href="https://swanbotanicals.com/products" />
      </Helmet>
      {filteredProducts.map((product) => (
        <ProductSchema key={product.id} product={product} />
      ))}
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our complete range of natural skincare products, 
              each carefully crafted with AYUSH-certified botanical ingredients.
            </p>
          </div>
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
                    aria-pressed={selectedCategory === category.id}
                    aria-label={`Filter products by ${category.name}`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="relative lg:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 min-h-[44px]"
                aria-label="Search products by name or description"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={`${product.name} - ${product.description} containing ${product.ingredients.join(', ')}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
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
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-gray-500">Key Ingredients:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.ingredients.slice(0, 3).map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-emerald-600">
                          ₹{product.price}
                        </span>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 min-h-[44px]" asChild>
                          <Link to={`/products/${product.id}`} aria-label={`View details for ${product.name}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your criteria. Try adjusting your filters or search term.
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