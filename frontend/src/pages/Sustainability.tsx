import { Leaf, Recycle, MapPin, Target, Award, Truck, Package, Globe, ShieldCheck, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Sustainability = () => {
  const ecoPractices = [
    {
      icon: <Package className="h-8 w-8 text-leaf-green" />,
      title: "100% Recyclable Packaging",
      description: "Our bottles are made from recycled glass, and our boxes use FSC-certified paper with soy-based inks.",
      impact: "Eliminated 2 tons of plastic waste"
    },
    {
      icon: <Truck className="h-8 w-8 text-sage-green-alt" />,
      title: "Carbon-Neutral Shipping",
      description: "Every delivery is carbon-offset through verified reforestation projects across India.",
      impact: "500+ trees planted this year"
    },
    {
      icon: <Recycle className="h-8 w-8 text-leaf-green" />,
      title: "Circular Manufacturing",
      description: "Zero-waste production with 100% renewable energy and water recycling systems.",
      impact: "90% waste reduction achieved"
    },
    {
      icon: <Globe className="h-8 w-8 text-sage-green-alt" />,
      title: "Biodegradable Formulas",
      description: "All ingredients break down naturally without harming waterways or soil ecosystems.",
      impact: "Ocean-safe certified formulations"
    }
  ];

  const sourcingRegions = [
    { name: "Kerala", ingredient: "Coconut Oil", coordinates: "9.5312, 76.2673", farmers: 15 },
    { name: "Rajasthan", ingredient: "Rose Petals", coordinates: "26.2389, 73.0243", farmers: 8 },
    { name: "Maharashtra", ingredient: "Turmeric", coordinates: "19.2000, 74.7500", farmers: 12 },
    { name: "Karnataka", ingredient: "Sandalwood", coordinates: "15.3173, 75.7139", farmers: 6 },
    { name: "Tamil Nadu", ingredient: "Jasmine", coordinates: "11.1271, 78.6569", farmers: 10 }
  ];

  const certifications = [
    {
      name: "USDA Organic",
      icon: <Leaf className="h-12 w-12 text-green-600" />,
      description: "Certified organic ingredients"
    },
    {
      name: "Leaping Bunny",
      icon: <ShieldCheck className="h-12 w-12 text-blue-600" />,
      description: "Cruelty-free verified"
    },
    {
      name: "AYUSH Certified",
      icon: <Award className="h-12 w-12 text-amber-600" />,
      description: "Traditional medicine approved"
    },
    {
      name: "Fair Trade",
      icon: <Globe className="h-12 w-12 text-purple-600" />,
      description: "Ethical sourcing guaranteed"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-leaf-green/10 via-sage-green-alt/20 to-serene-mint/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-leaf-green/20 px-4 py-2 rounded-full mb-6">
              <Leaf className="h-5 w-5 text-leaf-green" />
              <span className="font-lora text-leaf-green font-medium">Transparency First</span>
            </div>
            
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-6">
              Beauty for a Better World
            </h1>
            <p className="font-lora text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Every choice we make, from seed to skin, is guided by our commitment to 
              environmental stewardship and social responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* Eco-Practices Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Eco-Practices
            </h2>
            <p className="font-lora text-lg text-muted-foreground max-w-3xl mx-auto">
              Pioneering sustainable practices that protect our planet while delivering exceptional skincare.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ecoPractices.map((practice, index) => (
              <Card key={index} className="border-2 border-leaf-green/20 hover:border-leaf-green/40 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-leaf-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {practice.icon}
                    </div>
                    <div>
                      <h3 className="font-lora text-xl font-semibold text-foreground mb-2">
                        {practice.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {practice.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-leaf-green/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-leaf-green" />
                      <span className="font-medium text-leaf-green">Impact: {practice.impact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient Sourcing Map */}
      <section className="py-20 bg-sage-green-alt/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ethically Harvested Botanicals
            </h2>
            <p className="font-lora text-lg text-muted-foreground max-w-3xl mx-auto">
              Tracing every ingredient back to its source, ensuring fair wages and sustainable farming practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-leaf-green/10 to-sage-green-alt/10 p-8 rounded-2xl">
                <h3 className="font-lora text-2xl font-semibold text-foreground mb-6 text-center">
                  Our Sourcing Network
                </h3>
                
                <div className="space-y-4">
                  {sourcingRegions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-leaf-green" />
                        <div>
                          <span className="font-medium text-foreground">{region.name}</span>
                          <p className="text-sm text-muted-foreground">{region.ingredient}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-leaf-green/20 text-leaf-green">
                        {region.farmers} farmers
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-leaf-green/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Total Farmers Supported</span>
                    <span className="text-2xl font-bold text-leaf-green">51</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-lora text-xl font-semibold text-foreground mb-6">
                Our Sourcing Principles
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-leaf-green rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Direct Trade Partnerships</h4>
                    <p className="text-muted-foreground">Working directly with farmers, eliminating middlemen and ensuring fair prices.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-sage-green-alt rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Organic Certification</h4>
                    <p className="text-muted-foreground">All ingredients are certified organic, pesticide-free, and sustainably grown.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-leaf-green rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Community Investment</h4>
                    <p className="text-muted-foreground">Supporting education and healthcare programs in farming communities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zero Waste Goal */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-leaf-green/20 px-4 py-2 rounded-full mb-6">
              <Target className="h-5 w-5 text-leaf-green" />
              <span className="font-lora text-leaf-green font-medium">Our 2030 Mission</span>
            </div>
            
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Zero Waste by 2030
            </h2>
            <p className="font-lora text-lg text-muted-foreground max-w-3xl mx-auto">
              Our ambitious goal to eliminate all waste from our operations while maintaining the highest quality standards.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-leaf-green/10 to-sage-green-alt/10 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-leaf-green mb-2">2024</div>
                  <div className="text-muted-foreground">Current Year</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage-green-alt mb-2">68%</div>
                  <div className="text-muted-foreground">Waste Reduced</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-leaf-green mb-2">2030</div>
                  <div className="text-muted-foreground">Target Year</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground">Overall Progress</span>
                    <span className="text-leaf-green font-bold">68%</span>
                  </div>
                  <Progress value={68} className="h-3" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Packaging Waste</span>
                      <span className="text-leaf-green font-bold">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Manufacturing Waste</span>
                      <span className="text-sage-green-alt font-bold">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Water Conservation</span>
                      <span className="text-leaf-green font-bold">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Energy Efficiency</span>
                      <span className="text-sage-green-alt font-bold">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-warm-ivory/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Trusted Certifications
            </h2>
            <p className="font-lora text-lg text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence is verified by leading certification bodies worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {cert.icon}
                  </div>
                  <h3 className="font-lora text-lg font-semibold text-foreground mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cert.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="font-lora text-muted-foreground italic">
              All certifications are independently verified and regularly audited to ensure compliance.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sustainability;