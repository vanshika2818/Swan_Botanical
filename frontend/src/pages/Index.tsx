import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, Leaf, Award, Heart, ShieldCheck, Star, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { OrganizationSchema } from '@/components/ui/schema';
import heroImage from '@/assets/hero-botanical.jpg';

const Index = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Gentle Botanical Cleanser",
      price: "₹899",
      originalPrice: "₹1,199",
      image: "/placeholder.svg",
      description: "A mild, sulfate-free cleanser with chamomile and aloe vera",
      rating: 4.8,
      reviews: 324,
      bestseller: true
    },
    {
      id: 2,
      name: "Vitamin C Brightening Serum",
      price: "₹1,299",
      originalPrice: "₹1,599",
      image: "/placeholder.svg",
      description: "Natural vitamin C from kakadu plum for radiant skin",
      rating: 4.9,
      reviews: 256,
      bestseller: true
    },
    {
      id: 3,
      name: "Nourishing Night Cream",
      price: "₹1,099",
      originalPrice: "₹1,399",
      image: "/placeholder.svg",
      description: "Rich botanical oils for overnight skin repair",
      rating: 4.7,
      reviews: 189,
      bestseller: false
    },
    {
      id: 4,
      name: "Hydrating Rose Mist",
      price: "₹599",
      originalPrice: "₹799",
      image: "/placeholder.svg",
      description: "Pure rose water toner for refreshed, glowing skin",
      rating: 4.6,
      reviews: 412,
      bestseller: false
    }
  ];

  const uspFeatures = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "99% Botanical",
      subtitle: "0% Synthetic Chemicals"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Mother-Tested",
      subtitle: "Dermatologist-Verified"
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "AYUSH Certified",
      subtitle: "Government Approved"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Cruelty-Free",
      subtitle: "& Sustainable"
    }
  ];

  const sustainabilityBadges = [
    "Cruelty-Free",
    "Sustainable Packaging",
    "Carbon Neutral",
    "Ethically Sourced"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Swan Botanicals - Premium Natural Skincare | AYUSH Certified Botanical Products</title>
        <meta name="description" content="Discover Swan Botanicals' premium natural skincare collection with 99% botanical ingredients. AYUSH-certified, cruelty-free, and sustainably sourced for healthy, radiant skin." />
        <meta name="keywords" content="natural skincare, botanical skincare, AYUSH certified, organic beauty, cruelty-free skincare, sustainable beauty" />
        <meta property="og:title" content="Swan Botanicals - Premium Natural Skincare" />
        <meta property="og:description" content="99% botanical skincare formulated with AYUSH-certified natural ingredients. Trusted by mothers, loved by families." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swanbotanicals.com" />
        <link rel="canonical" href="https://swanbotanicals.com" />
      </Helmet>
      <OrganizationSchema />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Swan Botanicals natural skincare ingredients and botanical elements"
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
            When botanicals meet quality,
            <span className="block text-secondary"> people can't help but notice.</span>
          </h1>
          <p className="font-lora text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover Swan Botanicals' premium eco-friendly skincare collection, 
            crafted with AYUSH-certified natural ingredients.
          </p>
          <Button asChild size="lg" className="font-open-sans text-lg px-8 py-4 bg-primary hover:bg-primary/90 min-h-[44px]">
            <Link to="/products" aria-label="Shop Swan Botanicals natural skincare products">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* USP Banner */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {uspFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary text-primary-foreground">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-lora text-xl font-semibold text-secondary-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="font-open-sans text-muted-foreground">
                  {feature.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-card-foreground mb-4">
              Bestselling Botanicals
            </h2>
            <p className="font-lora text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most loved natural skincare essentials, trusted by thousands of customers
            </p>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <CardContent className="p-0 relative">
                      {product.bestseller && (
                        <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground font-open-sans">
                          Bestseller
                        </Badge>
                      )}
                      <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={`${product.name} - ${product.description}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-open-sans text-sm text-muted-foreground ml-1">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>
                        <h3 className="font-lora text-xl font-semibold text-card-foreground mb-2">
                          {product.name}
                        </h3>
                        <p className="font-open-sans text-muted-foreground mb-4 text-sm">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-lora text-2xl font-bold text-primary">
                              {product.price}
                            </span>
                            <span className="font-open-sans text-sm text-muted-foreground line-through">
                              {product.originalPrice}
                            </span>
                          </div>
                          <Button size="sm" className="font-open-sans bg-primary hover:bg-primary/90" asChild>
                            <Link to={`/products/${product.id}`}>
                              View Details
                            </Link>
                          </Button>
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
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="font-open-sans">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl font-bold text-secondary-foreground mb-6">
              Our Story Began in Nature's Garden
            </h2>
            <p className="font-lora text-lg text-muted-foreground mb-8 leading-relaxed">
              What started as a mother's quest for pure, safe skincare for her family has blossomed into 
              Swan Botanicals—a brand dedicated to harnessing nature's most potent botanicals. Every product 
              tells a story of tradition, science, and unwavering commitment to your skin's health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="outline" size="lg" className="font-open-sans">
                <Link to="/about">Discover Our Journey</Link>
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-open-sans text-sm">Founded by a mother, loved by families</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Commitment */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground mb-4">
              Our Planet Promise
            </h2>
            <p className="font-lora text-lg text-muted-foreground">
              Committed to beauty that doesn't cost the earth
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {sustainabilityBadges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="font-open-sans text-sm px-4 py-2 bg-secondary text-secondary-foreground"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {badge}
              </Badge>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="font-open-sans">
              <Link to="/sustainability">Learn About Our Impact</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;