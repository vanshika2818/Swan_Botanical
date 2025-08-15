import { useState } from 'react';
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
      originalPrice: 1099,
      rating: 4.8,
      reviewCount: 124,
      image: "/cleanser.jpg",
      description: "A mild, sulfate-free cleanser with chamomile and aloe vera",
      benefits: [
        "Gently removes impurities",
        "Maintains skin's natural moisture",
        "Suitable for all skin types"
      ],
      sizes: [
        { size: "100ml", price: 899 },
        { size: "200ml", price: 1499 }
      ],
      ingredients: ["Chamomile", "Aloe Vera", "Coconut Oil"],
      isNew: true,
      isBestSeller: false
    },
    {
      id: 2,
      name: "Vitamin C Brightening Serum",
      category: "serums",
      price: 1299,
      originalPrice: 1599,
      rating: 4.9,
      reviewCount: 256,
      image: "/serum.jpg",
      description: "Natural vitamin C from kakadu plum for radiant skin",
      benefits: [
        "Brightens skin tone",
        "Reduces dark spots",
        "Boosts collagen production"
      ],
      sizes: [
        { size: "15ml", price: 899 },
        { size: "30ml", price: 1299 },
        { size: "50ml", price: 1899 }
      ],
      ingredients: ["Kakadu Plum", "Hyaluronic Acid", "Niacinamide"],
      isNew: false,
      isBestSeller: true
    },
    {
      id: 3,
      name: "Hydrating Rose Mist",
      category: "moisturizers",
      price: 599,
      originalPrice: 799,
      rating: 4.6,
      reviewCount: 87,
      image: "/mist.jpg",
      description: "Refreshing facial mist with rose water and hyaluronic acid",
      benefits: [
        "Instant hydration",
        "Sets makeup",
        "Soothes irritated skin"
      ],
      sizes: [
        { size: "50ml", price: 599 },
        { size: "100ml", price: 999 }
      ],
      ingredients: ["Rose Water", "Hyaluronic Acid", "Aloe Vera"],
      isNew: true,
      isBestSeller: false
    },
    {
      id: 4,
      name: "Detox Clay Mask",
      category: "masks",
      price: 799,
      originalPrice: 999,
      rating: 4.7,
      reviewCount: 142,
      image: "/mask.jpg",
      description: "Purifying clay mask with charcoal and tea tree oil",
      benefits: [
        "Deep cleans pores",
        "Reduces excess oil",
        "Minimizes blackheads"
      ],
      sizes: [
        { size: "50g", price: 799 },
        { size: "100g", price: 1299 }
      ],
      ingredients: ["Bentonite Clay", "Charcoal", "Tea Tree Oil"],
      isNew: false,
      isBestSeller: true
    },
    {
      id: 5,
      name: "Nourishing Night Cream",
      category: "moisturizers",
      price: 1099,
      originalPrice: 1399,
      rating: 4.8,
      reviewCount: 178,
      image: "/night-cream.jpg",
      description: "Rich overnight cream with shea butter and peptides",
      benefits: [
        "Intense hydration",
        "Repairs skin barrier",
        "Reduces fine lines"
      ],
      sizes: [
        { size: "30ml", price: 1099 },
        { size: "50ml", price: 1599 }
      ],
      ingredients: ["Shea Butter", "Peptides", "Ceramides"],
      isNew: false,
      isBestSeller: false
    },
    {
      id: 6,
      name: "Radiance Face Oil",
      category: "oils",
      price: 1199,
      originalPrice: 1499,
      rating: 4.9,
      reviewCount: 203,
      image: "/face-oil.jpg",
      description: "Luxurious blend of botanical oils for glowing skin",
      benefits: [
        "Deep nourishment",
        "Improves skin elasticity",
        "Reduces redness"
      ],
      sizes: [
        { size: "15ml", price: 1199 },
        { size: "30ml", price: 1999 }
      ],
      ingredients: ["Rosehip Oil", "Jojoba Oil", "Sea Buckthorn"],
      isNew: false,
      isBestSeller: true
    },
    // --- NEW PRODUCTS START HERE ---
    {
      id: 7,
      name: "Eye Renewal Cream",
      category: "moisturizers",
      price: 1199,
      originalPrice: 1499,
      rating: 4.9,
      reviewCount: 155,
      image: "/eye-cream.jpg",
      description: "A potent eye cream to reduce dark circles and fine lines.",
      benefits: ["Reduces dark circles", "Minimizes puffiness", "Firms delicate skin"],
      sizes: [{ size: "15ml", price: 1199 }],
      ingredients: ["Caffeine", "Peptides", "Green Tea Extract"],
      isNew: true,
      isBestSeller: false
    },
    {
      id: 8,
      name: "Mineral Sunscreen SPF 50",
      category: "moisturizers",
      price: 999,
      originalPrice: 1299,
      rating: 4.7,
      reviewCount: 210,
      image: "/sunscreen.jpg",
      description: "Broad-spectrum mineral sunscreen for daily protection.",
      benefits: ["SPF 50 protection", "No white cast", "Lightweight and non-greasy"],
      sizes: [{ size: "50ml", price: 999 }],
      ingredients: ["Zinc Oxide", "Titanium Dioxide", "Niacinamide"],
      isNew: false,
      isBestSeller: true
    },
    {
      id: 9,
      name: "Balancing pH Toner",
      category: "cleansers",
      price: 699,
      originalPrice: 899,
      rating: 4.6,
      reviewCount: 95,
      image: "/toner.jpg",
      description: "An alcohol-free toner to balance and prep the skin.",
      benefits: ["Restores skin's pH", "Tightens pores", "Removes residual impurities"],
      sizes: [{ size: "120ml", price: 699 }],
      ingredients: ["Witch Hazel", "Rose Water", "Glycerin"],
      isNew: true,
      isBestSeller: false
    },
    {
      id: 10,
      name: "Hyaluronic Acid Serum",
      category: "serums",
      price: 1150,
      originalPrice: 1450,
      rating: 4.8,
      reviewCount: 312,
      image: "/hyaluronic-serum.jpg",
      description: "Intensely hydrating serum for plump, dewy skin.",
      benefits: ["Deeply hydrates", "Plumps fine lines", "Improves skin texture"],
      sizes: [{ size: "30ml", price: 1150 }],
      ingredients: ["Sodium Hyaluronate", "Vitamin B5", "Glycerin"],
      isNew: false,
      isBestSeller: true
    },
    {
      id: 11,
      name: "Purifying Matcha Mask",
      category: "masks",
      price: 950,
      originalPrice: 1150,
      rating: 4.8,
      reviewCount: 180,
      image: "/matcha-mask.jpg",
      description: "Antioxidant-rich matcha mask to purify and calm skin.",
      benefits: ["Reduces inflammation", "Rich in antioxidants", "Brightens complexion"],
      sizes: [{ size: "50g", price: 950 }],
      ingredients: ["Matcha Green Tea", "Kaolin Clay", "Aloe Vera"],
      isNew: true,
      isBestSeller: false
    },
    {
      id: 12,
      name: "Rosehip Seed Oil",
      category: "oils",
      price: 1350,
      originalPrice: 1600,
      rating: 4.9,
      reviewCount: 250,
      image: "/rosehip-oil.jpg",
      description: "Cold-pressed, organic rosehip oil for scars and anti-aging.",
      benefits: ["Reduces scars & fine lines", "Improves skin texture", "Rich in fatty acids"],
      sizes: [{ size: "30ml", price: 1350 }],
      ingredients: ["100% Rosa Canina (Rosehip) Seed Oil"],
      isNew: false,
      isBestSeller: true
    }
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
      image: product.image,
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const discount = product.originalPrice 
                ? calculateDiscount(product.originalPrice, product.price) 
                : 0;
              
              return (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-2">
                        {product.isNew && (
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
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {product.rating} ({product.reviewCount} reviews)
                        </span>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Key Benefits:</span>
                        <ul className="mt-1 space-y-1">
                          {product.benefits.slice(0, 3).map((benefit, index) => (
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
                          <Link to={`/products/${product.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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