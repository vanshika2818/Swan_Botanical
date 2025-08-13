import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ZoomIn, 
  Shield, 
  Leaf, 
  Award,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle,
  Users,
  Truck,
  RotateCcw
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
import productImage from '@/assets/product-serum.jpg';
import ingredientsImage from '@/assets/ingredients-closeup.jpg';

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('30ml');
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock product data - in real app, fetch based on id
  const product = {
    id: 'vitamin-c-serum',
    name: 'Vitamin C Brightening Serum',
    subtitle: 'Natural vitamin C from kakadu plum for radiant skin',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviewCount: 256,
    images: [
      productImage,
      ingredientsImage,
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    sizes: [
      { size: '15ml', price: 899, originalPrice: 1099 },
      { size: '30ml', price: 1299, originalPrice: 1599 },
      { size: '50ml', price: 1899, originalPrice: 2299 }
    ],
    benefits: [
      'Brightens and evens skin tone',
      'Reduces dark spots and hyperpigmentation',
      'Boosts collagen production naturally',
      'Protects against environmental damage',
      'Suitable for all skin types',
      'Non-comedogenic formula'
    ],
    keyIngredients: [
      {
        name: 'Kakadu Plum Extract',
        benefit: 'Highest natural source of Vitamin C',
        concentration: '20%'
      },
      {
        name: 'Hyaluronic Acid',
        benefit: 'Deep hydration and plumping',
        concentration: '2%'
      },
      {
        name: 'Niacinamide',
        benefit: 'Pore refinement and oil control',
        concentration: '5%'
      },
      {
        name: 'Rose Hip Oil',
        benefit: 'Anti-aging and skin regeneration',
        concentration: '3%'
      }
    ],
    fullIngredients: 'Aqua, Kakadu Plum Extract (Terminalia ferdinandiana), Hyaluronic Acid, Niacinamide, Rose Hip Oil (Rosa canina), Glycerin, Sodium Hyaluronate, Tocopherol (Vitamin E), Ferulic Acid, Aloe Barbadensis Leaf Juice, Chamomilla Recutita Extract, Natural Fragrance',
    howToUse: 'Apply 2-3 drops to clean, dry skin morning and evening. Follow with moisturizer and sunscreen during the day. For best results, use consistently for 4-6 weeks.',
    reviews: [
      {
        name: 'Priya Sharma',
        rating: 5,
        comment: 'Amazing results! My skin is visibly brighter after just 2 weeks of use.',
        verified: true,
        helpful: 24
      },
      {
        name: 'Anita Patel',
        rating: 5,
        comment: 'Love how gentle this is on my sensitive skin. No irritation at all!',
        verified: true,
        helpful: 18
      },
      {
        name: 'Meera Reddy',
        rating: 4,
        comment: 'Great product but takes time to see results. Worth the patience though.',
        verified: true,
        helpful: 12
      }
    ]
  };

  const relatedProducts = [
    {
      id: 1,
      name: 'Gentle Botanical Cleanser',
      price: '₹899',
      image: '/placeholder.svg',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Nourishing Night Cream',
      price: '₹1,099',
      image: '/placeholder.svg',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Hydrating Rose Mist',
      price: '₹599',
      image: '/placeholder.svg',
      rating: 4.6
    },
    {
      id: 4,
      name: 'Eye Renewal Cream',
      price: '₹1,199',
      image: '/placeholder.svg',
      rating: 4.9
    }
  ];

  const currentPrice = product.sizes.find(s => s.size === selectedSize)?.price || product.price;
  const currentOriginalPrice = product.sizes.find(s => s.size === selectedSize)?.originalPrice || product.originalPrice;
  const discount = Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100);
  const subscriptionPrice = Math.round(currentPrice * 0.9);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="font-open-sans hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="font-open-sans hover:text-primary">Products</Link>
          <span>/</span>
          <span className="font-open-sans text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-zoom-in group">
                    <img
                      src={product.images[currentImageIndex]}
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
                    src={product.images[currentImageIndex]}
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
                    src={image}
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
                <Badge className="bg-primary text-primary-foreground font-open-sans">
                  <Shield className="h-3 w-3 mr-1" />
                  AYUSH Certified
                </Badge>
                <Badge variant="secondary" className="font-open-sans">
                  <Leaf className="h-3 w-3 mr-1" />
                  99% Natural
                </Badge>
              </div>
              
              <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              <p className="font-lora text-lg text-muted-foreground mb-4">
                {product.subtitle}
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
                <span className="font-open-sans text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="font-lora text-lg font-semibold block mb-3">Size</label>
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
                    <div className="font-open-sans font-semibold">{size.size}</div>
                    <div className="font-open-sans text-sm text-muted-foreground">₹{size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-playfair text-3xl font-bold text-primary">
                  ₹{isSubscription ? subscriptionPrice : currentPrice}
                </span>
                <span className="font-open-sans text-lg text-muted-foreground line-through">
                  ₹{currentOriginalPrice}
                </span>
                <Badge variant="destructive" className="font-open-sans">
                  {isSubscription ? discount + 10 : discount}% OFF
                </Badge>
              </div>
              
              {/* Subscription Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary">
                <div>
                  <div className="font-lora font-semibold">Subscribe & Save</div>
                  <div className="font-open-sans text-sm text-muted-foreground">
                    Get 10% off and free delivery every month
                  </div>
                </div>
                <Switch checked={isSubscription} onCheckedChange={setIsSubscription} />
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="font-lora text-lg font-semibold block mb-3">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-open-sans text-lg font-semibold w-12 text-center">
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
                <Button size="lg" className="flex-1 font-open-sans">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-open-sans text-xs">Free Shipping</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-open-sans text-xs">30-Day Returns</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-open-sans text-xs">Secure Payment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <Tabs defaultValue="benefits" className="mb-16">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="benefits" className="font-open-sans">Benefits</TabsTrigger>
            <TabsTrigger value="ingredients" className="font-open-sans">Ingredients</TabsTrigger>
            <TabsTrigger value="usage" className="font-open-sans">How to Use</TabsTrigger>
            <TabsTrigger value="reviews" className="font-open-sans">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="benefits" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold mb-4">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-open-sans">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ingredients" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold mb-4">Key Ingredients</h3>
                <div className="space-y-4 mb-6">
                  {product.keyIngredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                      <div>
                        <div className="font-lora font-semibold">{ingredient.name}</div>
                        <div className="font-open-sans text-sm text-muted-foreground">
                          {ingredient.benefit}
                        </div>
                      </div>
                      <Badge variant="outline" className="font-open-sans">
                        {ingredient.concentration}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <div>
                  <h4 className="font-lora text-lg font-semibold mb-3">Full Ingredient List</h4>
                  <p className="font-open-sans text-sm text-muted-foreground leading-relaxed">
                    {product.fullIngredients}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold mb-4">How to Use</h3>
                <p className="font-open-sans leading-relaxed">{product.howToUse}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-playfair text-2xl font-bold">Customer Reviews</h3>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-lora text-lg font-semibold">{product.rating}</span>
                    </div>
                    <div className="font-open-sans text-sm text-muted-foreground">
                      Based on {product.reviewCount} reviews
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="font-lora font-semibold">{review.name}</div>
                          {review.verified && (
                            <Badge variant="secondary" className="font-open-sans text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="font-open-sans text-muted-foreground mb-3">{review.comment}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="font-open-sans hover:text-primary">
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h2 className="font-playfair text-3xl font-bold text-center mb-8">You May Also Like</h2>
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {relatedProducts.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                  <Card className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-lora font-semibold mb-2">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="font-open-sans font-bold text-primary">{product.price}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-open-sans text-sm ml-1">{product.rating}</span>
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
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;