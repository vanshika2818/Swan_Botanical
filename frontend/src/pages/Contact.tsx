
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Instagram, HelpCircle, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-emerald-600" />,
      title: "Email Us",
      details: "support@swanbotanicals.com",
      description: "Get in touch for any questions"
    },
    {
      icon: <Phone className="h-6 w-6 text-emerald-600" />,
      title: "Call Us",
      details: "+91 98765 43210",
      description: "Mon-Fri 9AM-6PM IST"
    },
    {
      icon: <MapPin className="h-6 w-6 text-emerald-600" />,
      title: "Visit Us",
      details: "Mumbai, Maharashtra",
      description: "Flagship store & office"
    },
    {
      icon: <Clock className="h-6 w-6 text-emerald-600" />,
      title: "Response Time",
      details: "Within 24 hours",
      description: "We're here to help"
    }
  ];

  const faqItems = [
    {
      question: "Are your products safe for pregnancy?",
      answer: "Yes! All Swan Botanicals products are formulated with pregnancy-safe ingredients. We avoid retinoids, hydroquinone, and other ingredients not recommended during pregnancy. However, we always recommend consulting with your healthcare provider before starting any new skincare routine during pregnancy."
    },
    {
      question: "What makes Swan Botanicals different?",
      answer: "We combine traditional Ayurvedic wisdom with modern science, using only AYUSH-certified natural ingredients and sustainable practices. Our 99% botanical formulations are specifically designed for sensitive skin."
    },
    {
      question: "Are your products suitable for sensitive skin?",
      answer: "Absolutely! All our products are dermatologist-tested and formulated to be gentle on sensitive skin. We use natural botanicals that soothe rather than irritate. We always recommend patch testing before use."
    },
    {
      question: "Do you test on animals?",
      answer: "Never! Swan Botanicals is 100% cruelty-free. We're certified by Leaping Bunny and have never tested on animals. We use alternative testing methods and work with certified suppliers who share our values."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day satisfaction guarantee for unopened products. If you're not completely satisfied with your purchase, we'll provide a full refund or exchange. For opened products, we evaluate returns on a case-by-case basis."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship within India with free shipping on orders over ₹999. International shipping will be available soon. Subscribe to our newsletter to be the first to know when we expand globally!"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our products? Need help with your order? 
              Want to explore wholesale opportunities? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-1">
                    {info.details}
                  </p>
                  <p className="text-sm text-gray-600">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Forms */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* General Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-emerald-600" />
                  General Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="wholesale">Wholesale</SelectItem>
                          <SelectItem value="press">Press</SelectItem>
                          <SelectItem value="product">Product Question</SelectItem>
                          <SelectItem value="order">Order Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What can we help you with?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Wholesale Inquiry Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-emerald-600" />
                  Wholesale Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Partner with Swan Botanicals
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Join our growing network of retail partners and bring natural, 
                      sustainable skincare to your customers.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Competitive wholesale pricing</li>
                      <li>• Marketing support and materials</li>
                      <li>• Dedicated account management</li>
                      <li>• Flexible minimum orders</li>
                      <li>• Fast shipping and reliable supply</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Requirements for Wholesale Partnership:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Valid business license</li>
                      <li>• Physical or online store</li>
                      <li>• Minimum order quantity: ₹25,000</li>
                      <li>• Commitment to brand values</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3">
                      Ready to get started? Send us your business details using the form on the left, 
                      or email us directly at:
                    </p>
                    <a 
                      href="mailto:wholesale@swanbotanicals.com"
                      className="text-emerald-600 font-medium hover:underline"
                    >
                      wholesale@swanbotanicals.com
                    </a>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Download Wholesale Catalog
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Chat & Social Media */}
      <section className="py-16 bg-golden-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Live Chat Option */}
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="bg-golden-sand/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-golden-sand-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Need Immediate Help?
                </h3>
                <p className="text-gray-600 mb-6">
                  Chat with our beauty experts for instant answers about products, 
                  skincare routines, and ingredient recommendations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Available Mon-Fri 9AM-6PM IST</span>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-golden-sand hover:bg-golden-sand/90 text-golden-sand-foreground font-semibold"
                  >
                    Start Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="bg-golden-sand/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Instagram className="h-8 w-8 text-golden-sand-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Follow Our Journey
                </h3>
                <p className="text-gray-600 mb-6">
                  Join our community for daily beauty tips, behind-the-scenes content, 
                  and exclusive offers.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-golden-sand text-golden-sand-foreground hover:bg-golden-sand hover:text-golden-sand-foreground"
                      onClick={() => window.open('https://instagram.com/swanbotanicals', '_blank')}
                    >
                      <Instagram className="mr-2 h-5 w-5" />
                      Instagram
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-golden-sand text-golden-sand-foreground hover:bg-golden-sand hover:text-golden-sand-foreground"
                      onClick={() => window.open('https://tiktok.com/@swanbotanicals', '_blank')}
                    >
                      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                      TikTok
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    @swanbotanicals • 50K+ followers
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our products and services
            </p>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Collapsible 
                key={index} 
                open={openFaq === index} 
                onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <Card className="shadow-sm border-l-4 border-l-emerald-200">
                  <CollapsibleTrigger asChild>
                    <CardContent className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <HelpCircle className="h-5 w-5 mr-3 text-emerald-600" />
                          {item.question}
                        </h3>
                        {openFaq === index ? (
                          <Minus className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Plus className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 ml-8">
                        {item.answer}
                      </p>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>
              <Button 
                className="bg-golden-sand hover:bg-golden-sand/90 text-golden-sand-foreground"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
