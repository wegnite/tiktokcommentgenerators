import { Metadata } from "next";
import Link from "next/link";
import { 
  Mail, 
  MessageCircle, 
  Send,
  Clock,
  Globe,
  HelpCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Contact Us - TikTok Comment Generator Support",
  description: "Get in touch with the TikTok Comment Generator team. We're here to help with any questions, feedback, or support needs.",
  keywords: "contact tiktok comment generator, support, help, feedback",
};

export default function ContactPage() {
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
              <Link href="/about" className="hover:text-primary">About</Link>
              <Link href="/faq" className="hover:text-primary">FAQ</Link>
              <Link href="/contact" className="text-primary">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions about TikTok Comment Generator? We're here to help! 
          Reach out to our team and we'll get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Options */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get help via email. We typically respond within 24 hours.
              </p>
              <a 
                href="mailto:support@tiktokcommentgenerators.com" 
                className="text-primary hover:underline"
              >
                support@tiktokcommentgenerators.com
              </a>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We aim to respond to all inquiries within 24-48 hours.
              </p>
              <p className="text-sm font-medium">
                Monday - Friday, 9 AM - 6 PM EST
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">FAQ First</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Many questions are already answered in our FAQ section.
              </p>
              <Link href="/faq" className="text-primary hover:underline">
                Visit FAQ Page
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="What's this about?" 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us how we can help you..." 
                    className="min-h-[150px]"
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category" 
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  >
                    <option>General Question</option>
                    <option>Technical Support</option>
                    <option>Feature Request</option>
                    <option>Bug Report</option>
                    <option>Business Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Topics */}
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Common Contact Topics</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Feature Requests</h3>
              <p className="text-sm text-muted-foreground">
                Have an idea for a new feature? We'd love to hear your suggestions!
              </p>
            </div>
            
            <div className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Bug Reports</h3>
              <p className="text-sm text-muted-foreground">
                Found something not working? Let us know so we can fix it quickly.
              </p>
            </div>
            
            <div className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2">API Access</h3>
              <p className="text-sm text-muted-foreground">
                Interested in API integration? Contact us for business solutions.
              </p>
            </div>
            
            <div className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Partnerships</h3>
              <p className="text-sm text-muted-foreground">
                Looking to partner? We're open to collaboration opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Before You Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Check Our FAQ</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Many common questions are already answered in our comprehensive FAQ section. 
                  This is often the fastest way to get the information you need.
                </p>
                <Link href="/faq" className="text-primary hover:underline text-sm">
                  Browse FAQ →
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Try the Tool First</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you haven't tried our TikTok comment generator yet, give it a go! 
                  It's free and might answer questions about how it works.
                </p>
                <Link href="/" className="text-primary hover:underline text-sm">
                  Try Generator →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
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
              <Link href="/about" className="hover:text-primary">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}