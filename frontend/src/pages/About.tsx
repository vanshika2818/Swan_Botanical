import { Heart, Users, Stethoscope, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-ivory via-serene-mint/20 to-blush-pink/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-6">
              A Mother's Promise
            </h1>
            <p className="font-lora text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Born from love, loss, and an unwavering commitment to safe, effective skincare that every mother can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blush-pink/20 px-4 py-2 rounded-full mb-6">
                <Heart className="h-5 w-5 text-blush-pink-foreground" />
                <span className="font-lora text-blush-pink-foreground font-medium">A Personal Journey</span>
              </div>
              
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-8">
                When Love Meets Science
              </h2>
              
              <div className="space-y-6 font-open-sans text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  My name is Meera Jain, and Swan Botanicals was born from the deepest pain a mother can know – 
                  watching my daughter Anaya suffer from severe eczema that no conventional treatment could heal.
                </p>
                <p>
                  After countless sleepless nights and failed treatments, I remembered my grandmother's gentle touch – 
                  how she would calm my childhood rashes with simple herbs from her garden. That memory sparked a mission: 
                  to create skincare that's as pure as a mother's love.
                </p>
                <p>
                  I left my pharmaceutical career and spent three years researching, formulating, and testing. 
                  When Anaya's skin finally healed using our first serum, I knew we had something special. 
                  Today, thousands of mothers trust Swan Botanicals because they know it was created by one.
                </p>
                <div className="bg-blush-pink/10 p-6 rounded-lg border-l-4 border-blush-pink">
                  <p className="font-lora text-blush-pink-foreground italic">
                    "Every formula is tested on my own family first. If it's not safe enough for Anaya, 
                    it's not safe enough for your children."
                  </p>
                  <p className="text-sm mt-2 text-blush-pink-foreground/80">— Meera Jain, Founder & Mother</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blush-pink/20 to-serene-mint/20 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-blush-pink/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-16 w-16 text-blush-pink-foreground" />
                  </div>
                  <p className="font-lora text-muted-foreground">Founder's Photo Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-serene-mint/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
              Trusted by Mothers, Verified by Experts
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <Award className="h-12 w-12 text-amber-600 mx-auto mb-3" />
              <Badge variant="secondary" className="mb-2">AYUSH Certified</Badge>
              <p className="text-sm text-muted-foreground">Government Approved</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <Stethoscope className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <Badge variant="secondary" className="mb-2">Dermatologist Verified</Badge>
              <p className="text-sm text-muted-foreground">Clinically Tested</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <ShieldCheck className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <Badge variant="secondary" className="mb-2">Cruelty-Free</Badge>
              <p className="text-sm text-muted-foreground">Never Tested on Animals</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <Sparkles className="h-12 w-12 text-blush-pink-foreground mx-auto mb-3" />
              <Badge variant="secondary" className="mb-2">Mother-Tested</Badge>
              <p className="text-sm text-muted-foreground">Family Approved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission & Values
            </h2>
            <p className="font-lora text-lg text-muted-foreground max-w-3xl mx-auto">
              Every product we create is guided by our unwavering commitment to safety, 
              nurturing care, and results that mothers can trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 border-blush-pink/20 hover:border-blush-pink/40 transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blush-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-blush-pink-foreground" />
                </div>
                <h3 className="font-lora text-xl font-semibold text-foreground mb-4">
                  Customer-First Care
                </h3>
                <p className="text-muted-foreground">
                  Every decision we make puts you and your family's wellbeing first. Your trust is our most precious ingredient.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-serene-mint/40 hover:border-serene-mint/60 transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-serene-mint/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-sage-green" />
                </div>
                <h3 className="font-lora text-xl font-semibold text-foreground mb-4">
                  Mother-Inspired Nurturing
                </h3>
                <p className="text-muted-foreground">
                  Born from a mother's love, our gentle formulations provide the tender care your skin deserves.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-warm-ivory/60 hover:border-warm-ivory/80 transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-warm-ivory/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-amber-700" />
                </div>
                <h3 className="font-lora text-xl font-semibold text-foreground mb-4">
                  Result-Driven Simplicity
                </h3>
                <p className="text-muted-foreground">
                  Pure, effective formulations that deliver visible results without complicated routines or harsh chemicals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-warm-ivory/30 to-serene-mint/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Team
            </h2>
            <p className="font-lora text-lg text-muted-foreground max-w-2xl mx-auto">
              A dedicated team of mothers, scientists, and skincare experts working together to bring you the safest, most effective products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-blush-pink/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-12 w-12 text-blush-pink-foreground" />
              </div>
              <h3 className="font-lora text-lg font-semibold text-foreground mb-2">Founder & Team</h3>
              <p className="text-muted-foreground text-sm">Photos coming soon - we're too busy perfecting your next favorite product!</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-serene-mint/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="h-12 w-12 text-sage-green" />
              </div>
              <h3 className="font-lora text-lg font-semibold text-foreground mb-2">Lab Team</h3>
              <p className="text-muted-foreground text-sm">Expert formulators ensuring every batch meets our mother-approved standards.</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-warm-ivory/40 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-amber-700" />
              </div>
              <h3 className="font-lora text-lg font-semibold text-foreground mb-2">Support Team</h3>
              <p className="text-muted-foreground text-sm">Fellow mothers ready to help you find the perfect products for your family.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;