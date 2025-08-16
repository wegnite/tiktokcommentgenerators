import { Metadata } from "next";
import Link from "next/link";
import { 
  Users, 
  Target, 
  Zap, 
  Globe, 
  Shield, 
  Award,
  MessageCircle,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About TikTok Comment Generator - Our Mission & Story",
  description: "Learn about TikTok Comment Generator, the leading AI-powered tool helping creators create engaging TikTok comments. Our mission is to empower creators worldwide.",
  keywords: "about tiktok comment generator, tiktok tools, social media tools, ai comment generator",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              TikTok Comment Generator
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-primary">Home</Link>
              <Link href="/about" className="text-primary">About</Link>
              <Link href="/faq" className="hover:text-primary">FAQ</Link>
              <Link href="/contact" className="hover:text-primary">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            TikTok Comment Generator
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Empowering creators worldwide with AI-powered tools to enhance their TikTok engagement 
          and build stronger communities.
        </p>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <Target className="w-10 h-10 text-primary mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground mb-4">
                    At TikTok Comment Generator, our mission is to democratize social media engagement 
                    by providing free, powerful tools that help creators of all sizes connect with their 
                    audiences more effectively.
                  </p>
                  <p className="text-muted-foreground">
                    We believe that every creator deserves access to professional-grade tools that can 
                    help them save time, increase engagement, and focus on what they do best - creating 
                    amazing content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">Free</div>
              <div className="text-sm text-muted-foreground">No Sign-up Required</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">Instant</div>
              <div className="text-sm text-muted-foreground">Fast Generation</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Languages Supported</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Free Forever</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our TikTok Comment Generator?</h2>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <Sparkles className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">AI-Powered Technology</h3>
              <p className="text-sm text-muted-foreground">
                Our advanced AI understands context and generates authentic, engaging comments 
                that resonate with TikTok audiences.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <Globe className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Global Reach</h3>
              <p className="text-sm text-muted-foreground">
                Supporting 50+ languages, we help creators connect with audiences worldwide, 
                breaking down language barriers.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                No sign-up required, no data stored. We respect your privacy and keep 
                our tool accessible to everyone.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Generate multiple comment suggestions in seconds, helping you engage 
                with content while it's still trending.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <MessageCircle className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Versatile Styles</h3>
              <p className="text-sm text-muted-foreground">
                From funny to supportive, trendy to professional - create comments 
                that match any mood or content type.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <Award className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p className="text-sm text-muted-foreground">
                Join thousands of successful creators who have boosted their 
                engagement using our tool.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            
            <div className="prose prose-lg mx-auto">
              <p>
                TikTok Comment Generator was born from a simple observation: creating engaging 
                comments takes time and creativity that many creators don't always have. As 
                TikTok grew to become one of the world's largest social platforms, we saw an 
                opportunity to help creators maximize their impact.
              </p>
              
              <p>
                Founded in 2023, we started with a simple goal: make it easier for people to 
                engage authentically on TikTok. What began as a small project has grown into 
                a powerful free tool helping creators worldwide generate authentic comments 
                that have sparked conversations, built communities, and helped creators grow.
              </p>
              
              <p>
                Today, we continue to innovate and improve our TikTok comment generator, adding 
                new features, languages, and styles based on user feedback. We're committed to 
                keeping our core tool free forever because we believe everyone deserves access 
                to quality engagement tools.
              </p>
              
              <p>
                As we look to the future, we're excited to continue supporting the TikTok 
                creator community with new tools and features that make social media engagement 
                more accessible, authentic, and impactful for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Boost Your TikTok Engagement?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Start using our free TikTok comment generator today
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="w-5 h-5" />
          Start Generating Comments
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 TikTok Comment Generator. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
              <Link href="/contact" className="hover:text-primary">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}