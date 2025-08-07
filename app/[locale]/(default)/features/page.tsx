import { Metadata } from "next";
import GlobalNavigation from "@/components/global-navigation";
import GlobalFooter from "@/components/global-footer";
import { 
  Sparkles, 
  Zap, 
  Globe, 
  Shield,
  MessageCircle,
  TrendingUp,
  Users,
  BarChart,
  Clock,
  RefreshCw,
  Languages,
  Palette,
  Download,
  Cloud,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Features - TikTok Comment Generator | All Powerful Tools",
  description: "Explore all features of TikTok Comment Generator. AI-powered generation, multiple languages, various comment styles, bulk generation, and more.",
  keywords: "tiktok comment generator features, ai comment tools, bulk comment generation, multi-language comments",
};

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Advanced AI technology creates authentic, contextual comments that feel natural and engaging.",
    details: [
      "Context-aware generation",
      "Natural language processing",
      "Trend analysis integration",
      "Emotion recognition"
    ]
  },
  {
    icon: Globe,
    title: "50+ Languages Support",
    description: "Generate comments in over 50 languages to reach global audiences on TikTok.",
    details: [
      "Major world languages",
      "Regional dialects",
      "Mixed language support",
      "Cultural adaptation"
    ]
  },
  {
    icon: Palette,
    title: "Multiple Comment Styles",
    description: "Choose from 6+ comment tones to match any video or mood perfectly.",
    details: [
      "Funny & Humorous",
      "Supportive & Encouraging",
      "Trendy & Viral",
      "Questions & Engagement",
      "Compliments & Praise",
      "Casual & Conversational"
    ]
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Get multiple comment suggestions in seconds, no waiting required.",
    details: [
      "Sub-second response time",
      "5-10 comments per generation",
      "Real-time processing",
      "No queue waiting"
    ]
  },
  {
    icon: Users,
    title: "Bulk Generation",
    description: "Generate up to 50 comments at once for efficient content engagement.",
    details: [
      "Mass comment creation",
      "CSV export option",
      "Batch processing",
      "Template saving"
    ]
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "No sign-up required, no data stored. Your privacy is our priority.",
    details: [
      "No registration needed",
      "Zero data retention",
      "Anonymous usage",
      "GDPR compliant"
    ]
  },
  {
    icon: TrendingUp,
    title: "Trend Integration",
    description: "Comments incorporate current TikTok trends and viral phrases.",
    details: [
      "Real-time trend tracking",
      "Viral phrase database",
      "Hashtag suggestions",
      "Meme integration"
    ]
  },
  {
    icon: RefreshCw,
    title: "Unlimited Regeneration",
    description: "Not happy with results? Regenerate as many times as you want.",
    details: [
      "Infinite regenerations",
      "Different variations",
      "No daily limits",
      "Free forever"
    ]
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Access our tool anytime, anywhere. Always online and ready.",
    details: [
      "99.9% uptime",
      "Global CDN",
      "Fast loading",
      "Mobile optimized"
    ]
  },
  {
    icon: MessageCircle,
    title: "Reply Generator",
    description: "Generate perfect replies to comments on your TikTok videos.",
    details: [
      "Context-aware replies",
      "Conversation continuation",
      "Tone matching",
      "Engagement boosting"
    ]
  },
  {
    icon: BarChart,
    title: "Analytics Preview",
    description: "See potential engagement metrics for generated comments.",
    details: [
      "Engagement prediction",
      "Virality score",
      "Sentiment analysis",
      "Performance tips"
    ]
  },
  {
    icon: Download,
    title: "Export Options",
    description: "Download generated comments in various formats for easy use.",
    details: [
      "Copy to clipboard",
      "CSV export",
      "Text file download",
      "Batch export"
    ]
  }
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <GlobalNavigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Powerful Features for 
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              {" "}TikTok Success
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Everything you need to create engaging TikTok comments that drive real engagement. 
            Discover why over 500,000 creators choose our TikTok comment generator.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-5 h-5" />
              Try Generator Free
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">10M+</div>
              <div className="text-sm text-muted-foreground">Comments Generated</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">500K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free Forever</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Complete Feature Set
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose TikTok Comment Generator?
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-lg p-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4">Feature</th>
                    <th className="text-center py-4">Our Tool</th>
                    <th className="text-center py-4">Others</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4">Free to Use</td>
                    <td className="text-center py-4 text-green-500">✓</td>
                    <td className="text-center py-4 text-red-500">Limited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">No Sign-up Required</td>
                    <td className="text-center py-4 text-green-500">✓</td>
                    <td className="text-center py-4 text-red-500">✗</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Multiple Languages</td>
                    <td className="text-center py-4 text-green-500">50+</td>
                    <td className="text-center py-4">5-10</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">AI-Powered</td>
                    <td className="text-center py-4 text-green-500">✓</td>
                    <td className="text-center py-4">Basic</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Bulk Generation</td>
                    <td className="text-center py-4 text-green-500">✓</td>
                    <td className="text-center py-4 text-red-500">✗</td>
                  </tr>
                  <tr>
                    <td className="py-4">Daily Limit</td>
                    <td className="text-center py-4 text-green-500">Unlimited</td>
                    <td className="text-center py-4 text-red-500">10-50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Boost Your TikTok Engagement?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join over 500,000 creators using our free TikTok comment generator to create 
          viral, engaging comments that get noticed.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Generating Comments
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/api-docs">API Access</Link>
          </Button>
        </div>
      </section>

      <GlobalFooter />
    </main>
  );
}