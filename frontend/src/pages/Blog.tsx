
import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search, Tag, Share2, Facebook, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'clean-beauty', name: 'Clean Beauty Tips' },
    { id: 'ingredient-spotlights', name: 'Ingredient Spotlights' },
    { id: 'sustainability', name: 'Sustainability' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Why 99% Botanical Formulas Matter",
      excerpt: "Discover why our 99% botanical formulations are scientifically proven to be more effective and safer for sensitive skin than synthetic alternatives.",
      category: "clean-beauty",
      author: "Dr. Priya Sharma",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/placeholder.svg",
      tags: ["botanical", "clean beauty", "sensitive skin"],
      metaDescription: "Learn why 99% botanical skincare formulas are superior for sensitive skin. Explore Swan Botanicals' commitment to clean, effective beauty.",
      productLinks: ["/products/1", "/products/2"]
    },
    {
      id: 2,
      title: "How Swan Botanicals Supports Eco-Moms",
      excerpt: "From pregnancy-safe formulations to sustainable packaging, discover how our products are designed with conscious mothers in mind.",
      category: "sustainability",
      author: "Meera Patel",
      date: "2024-01-12",
      readTime: "6 min read",
      image: "/placeholder.svg",
      tags: ["eco-mom", "pregnancy", "sustainability", "safe skincare"],
      metaDescription: "Discover how Swan Botanicals creates pregnancy-safe, eco-friendly skincare for conscious mothers who prioritize health and sustainability.",
      productLinks: ["/products/3", "/products/4"]
    },
    {
      id: 3,
      title: "Turmeric vs. Niacinamide: The Natural Winner",
      excerpt: "Compare the benefits of traditional turmeric with modern niacinamide and learn why ancient botanicals often outperform synthetic ingredients.",
      category: "ingredient-spotlights",
      author: "Dr. Anjali Mehta",
      date: "2024-01-10",
      readTime: "7 min read",
      image: "/placeholder.svg",
      tags: ["turmeric", "niacinamide", "ingredients", "ayurveda"],
      metaDescription: "Compare turmeric vs niacinamide benefits for skin. Learn why Swan Botanicals chooses traditional Ayurvedic ingredients over synthetic alternatives.",
      productLinks: ["/products/1"]
    },
    {
      id: 4,
      title: "The Science Behind AYUSH Certification",
      excerpt: "Understanding what AYUSH certification means for your skincare routine and why it matters for product safety and efficacy.",
      category: "clean-beauty",
      author: "Dr. Priya Sharma",
      date: "2024-01-08",
      readTime: "10 min read",
      image: "/placeholder.svg",
      tags: ["AYUSH", "certification", "safety", "regulation"],
      metaDescription: "Learn about AYUSH certification in skincare and why it ensures product safety and efficacy. Discover Swan Botanicals' certified products.",
      productLinks: ["/products/1", "/products/2", "/products/3"]
    },
    {
      id: 5,
      title: "Rose Water: Ancient Beauty Secret Revealed",
      excerpt: "Explore the time-tested benefits of pure rose water and how this gentle botanical toner can transform sensitive skin naturally.",
      category: "ingredient-spotlights",
      author: "Kavya Singh",
      date: "2024-01-05",
      readTime: "5 min read",
      image: "/placeholder.svg",
      tags: ["rose water", "ayurveda", "sensitive skin", "natural toner"],
      metaDescription: "Discover the benefits of rose water for sensitive skin. Learn about this ancient Ayurvedic ingredient in Swan Botanicals' formulations.",
      productLinks: ["/products/2"]
    },
    {
      id: 6,
      title: "Zero Plastic Beauty: Our 2030 Goal",
      excerpt: "Learn about our ambitious plan to eliminate plastic packaging by 2030 and how you can join the sustainable beauty revolution.",
      category: "sustainability",
      author: "Raj Patel",
      date: "2024-01-03",
      readTime: "9 min read",
      image: "/placeholder.svg",
      tags: ["zero plastic", "packaging", "sustainability", "environment"],
      metaDescription: "Discover Swan Botanicals' zero plastic packaging goal for 2030. Join the sustainable beauty revolution with eco-friendly skincare.",
      productLinks: []
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  // SEO function to handle meta tags
  useEffect(() => {
    document.title = "Beauty & Wellness Blog | Swan Botanicals - Natural Skincare Tips";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover natural skincare secrets, clean beauty tips, and sustainability insights from Swan Botanicals experts. AYUSH-certified botanical formulations.');
    }
  }, []);

  const ShareButtons = ({ post }: { post: typeof blogPosts[0] }) => {
    const shareUrl = `${window.location.origin}/blog/${post.id}`;
    const shareText = `${post.title} - ${post.excerpt}`;

    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Share:</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
          className="hover:bg-blue-50"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`, '_blank')}
          className="hover:bg-blue-50"
        >
          <Twitter className="h-4 w-4 text-blue-400" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
          className="hover:bg-blue-50"
        >
          <Linkedin className="h-4 w-4 text-blue-700" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigator.share ? navigator.share({ title: post.title, text: shareText, url: shareUrl }) : null}
          className="hover:bg-gray-50"
        >
          <Share2 className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Beauty & Wellness Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover natural skincare secrets, sustainability tips, and wellness wisdom 
              from our experts and community.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
          <Card className="overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className="bg-emerald-100 text-emerald-800">
                    {categories.find(cat => cat.id === featuredPost.category)?.name}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <span className="text-sm text-gray-500">
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <ShareButtons post={featuredPost} />
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  {featuredPost.productLinks && featuredPost.productLinks.length > 0 && (
                    <div className="flex items-center space-x-2 pt-2 border-t">
                      <ExternalLink className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-gray-600">Related Products:</span>
                      {featuredPost.productLinks.map((link, index) => (
                        <Button
                          key={index}
                          variant="link"
                          size="sm"
                          className="text-emerald-600 p-0 h-auto"
                          onClick={() => window.open(link, '_blank')}
                        >
                          Product {index + 1}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Tag className="h-5 w-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="relative lg:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {categories.find(cat => cat.id === post.category)?.name}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                          Read More
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <ShareButtons post={post} />
                        {post.productLinks && post.productLinks.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <ExternalLink className="h-3 w-3 text-emerald-600" />
                            <span className="text-xs text-gray-500">
                              {post.productLinks.length} related product{post.productLinks.length > 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found matching your criteria. Try adjusting your filters or search term.
              </p>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with Beauty Tips
          </h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter for the latest skincare tips, ingredient spotlights, 
            and sustainability insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-white text-gray-900 border-0"
            />
            <Button className="bg-white text-emerald-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
