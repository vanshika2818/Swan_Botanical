import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ZoomIn, 
  Shield, 
  Leaf, 
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle,
  Truck,
  RotateCcw,
  Loader
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById, getProductsByCategory } from '@/api/products';
import { Product } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        
        // Fetch related products from the same category
        if (productData.category) {
          const related = await getProductsByCategory(productData.category);
          setRelatedProducts(related.filter(p => p._id !== id).slice(0, 4));
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load product. Please try again.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product._id,
      name: product.name,
      price: currentPrice,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize || undefined
    });
    
     toast({
    title: "Added to Cart",
    description: `${quantity} × ${product.name} ${selectedSize ? `(${selectedSize})` : ''} added to cart`,
  });
};

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">{error || 'Product not found'}</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const currentPrice = selectedSize && product.sizes 
    ? product.sizes.find(s => s.size === selectedSize)?.price || product.price
    : product.price;
    
  const currentOriginalPrice = selectedSize && product.sizes 
    ? product.sizes.find(s => s.size === selectedSize)?.originalPrice || product.originalPrice
    : product.originalPrice;
    
  const discount = currentOriginalPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;
    
  const subscriptionPrice = Math.round(currentPrice * 0.9);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-zoom-in group">
                    <img
                      src={product.images[currentImageIndex] || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <img
                    src={product.images[currentImageIndex] || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                </DialogContent>
              </Dialog>
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                    disabled={currentImageIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={() => setCurrentImageIndex(Math.min(product.images.length - 1, currentImageIndex + 1))}
                    disabled={currentImageIndex === product.images.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-primary' : 'border-muted'
                  }`}
                >
                  <img
                    src={image || '/placeholder-product.jpg'}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground">
                  <Shield className="h-3 w-3 mr-1" />
                  AYUSH Certified
                </Badge>
                <Badge variant="secondary">
                  <Leaf className="h-3 w-3 mr-1" />
                  99% Natural
                </Badge>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-4">
                {product.description}
              </p>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="text-lg font-semibold block mb-3">Size</label>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size.size)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedSize === size.size
                          ? 'border-primary bg-secondary text-secondary-foreground'
                          : 'border-muted hover:border-muted-foreground'
                      }`}
                    >
                      <div className="font-semibold">{size.size}</div>
                      <div className="text-sm text-muted-foreground">₹{size.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ₹{isSubscription ? subscriptionPrice : currentPrice}
                </span>
                {currentOriginalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{currentOriginalPrice}
                  </span>
                )}
                {discount > 0 && (
                  <Badge variant="destructive">
                    {isSubscription ? discount + 10 : discount}% OFF
                  </Badge>
                )}
              </div>
              
              {/* Subscription Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary">
                <div>
                  <div className="font-semibold">Subscribe & Save</div>
                  <div className="text-sm text-muted-foreground">
                    Get 10% off and free delivery every month
                  </div>
                </div>
                <Switch checked={isSubscription} onCheckedChange={setIsSubscription} />
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="text-lg font-semibold block mb-3">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            {product.stock > 0 && (
              <div className="text-sm text-muted-foreground">
                {product.stock} items left in stock
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-xs">Free Shipping</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-xs">30-Day Returns</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-xs">Secure Payment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <Tabs defaultValue="benefits" className="mb-16">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="usage">How to Use</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="benefits" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ingredients" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Key Ingredients</h3>
                <div className="space-y-4 mb-6">
                  {product.keyIngredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                      <div>
                        <div className="font-semibold">{ingredient.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {ingredient.benefit}
                        </div>
                      </div>
                      <Badge variant="outline">
                        {ingredient.concentration}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <div>
                  <h4 className="text-lg font-semibold mb-3">Full Ingredient List</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.fullIngredients}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">How to Use</h3>
                <p className="leading-relaxed">{product.howToUse}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Customer Reviews</h3>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{product.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Based on {product.reviewCount} reviews
                    </div>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Reviews will be displayed here once available</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">You May Also Like</h2>
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {relatedProducts.map((product) => (
                  <CarouselItem key={product._id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                    <Card className="group hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                          <img
                            src={product.images[0] || '/placeholder-product.jpg'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{product.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary">₹{product.price}</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm ml-1">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;