
import { Shield, CheckCircle, Leaf, Award, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Ingredients = () => {
  const keyIngredients = [
    {
      name: "Turmeric (Curcuma Longa)",
      benefits: ["Anti-inflammatory", "Brightening", "Antioxidant"],
      description: "Known as 'golden spice', turmeric has been used in Ayurveda for centuries for its healing properties.",
      certification: "AYUSH Approved"
    },
    {
      name: "Neem (Azadirachta Indica)",
      benefits: ["Antibacterial", "Purifying", "Acne-fighting"],
      description: "The 'village pharmacy' of India, neem is renowned for its powerful cleansing properties.",
      certification: "Organic Certified"
    },
    {
      name: "Rose Water (Rosa Damascena)",
      benefits: ["Hydrating", "Soothing", "pH Balancing"],
      description: "Pure rose water from Kashmir roses, providing gentle hydration and natural fragrance.",
      certification: "Distilled Fresh"
    },
    {
      name: "Aloe Vera (Aloe Barbadensis)",
      benefits: ["Moisturizing", "Healing", "Cooling"],
      description: "Fresh aloe gel sourced from organic farms in Rajasthan, known for its soothing properties.",
      certification: "Organic Certified"
    }
  ];

  const certifications = [
    {
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      title: "AYUSH Certified",
      description: "Government of India certification for traditional Ayurvedic formulations",
      details: "License No: AY/2023/SKN/001"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Dermatologist Tested",
      description: "Clinically tested by certified dermatologists for safety and efficacy",
      details: "Tested on 500+ volunteers"
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Organic Ingredients",
      description: "70% of our ingredients are certified organic by recognized bodies",
      details: "India Organic Certification"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Cruelty-Free",
      description: "Never tested on animals, certified by PETA India",
      details: "PETA Approved Vegan"
    }
  ];

  const safetyStandards = [
    "All products undergo rigorous quality testing",
    "Patch testing recommended for sensitive skin",
    "pH balanced formulations (5.5-6.5)",
    "Free from harmful sulfates and parabens",
    "Hypoallergenic and non-comedogenic",
    "Safe for pregnant and breastfeeding women"
  ];

  const testimonials = [
    {
      name: "Dr. Anjali Mehta",
      title: "Dermatologist, Mumbai",
      quote: "Swan Botanicals products show excellent results in clinical trials. The natural formulations are gentle yet effective.",
      rating: 5
    },
    {
      name: "Prof. Rajesh Kumar",
      title: "Ayurveda Expert, Kerala",
      quote: "The traditional knowledge has been beautifully preserved in these modern formulations. Highly recommended.",
      rating: 5
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
              Ingredients & Safety
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparency is at the heart of everything we do. Learn about our carefully 
              selected ingredients and rigorous safety standards.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Certifications
            </h2>
            <p className="text-lg text-gray-600">
              Trusted by experts, certified by authorities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {cert.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {cert.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {cert.details}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Ingredients */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Star Ingredients
            </h2>
            <p className="text-lg text-gray-600">
              Nature's most powerful botanicals, backed by science
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyIngredients.map((ingredient, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {ingredient.name}
                    </h3>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      {ingredient.certification}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {ingredient.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.benefits.map((benefit, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Standards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Safety First
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your safety is our top priority. Every product undergoes extensive 
                testing to ensure it meets the highest safety standards.
              </p>
              <div className="space-y-4">
                {safetyStandards.map((standard, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-emerald-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Quality Assurance Process
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Ingredient Sourcing</h4>
                    <p className="text-sm text-gray-600">Certified suppliers, quality verification</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Formulation Testing</h4>
                    <p className="text-sm text-gray-600">Stability, pH, microbiology tests</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Clinical Trials</h4>
                    <p className="text-sm text-gray-600">Dermatologist supervision, user studies</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Final Approval</h4>
                    <p className="text-sm text-gray-600">Certification, batch testing, release</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Expert Testimonials
            </h2>
            <p className="text-lg text-gray-600">
              What leading experts say about our products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ingredients;
