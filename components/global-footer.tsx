import Link from "next/link";
import { 
  MessageCircle, 
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Github
} from "lucide-react";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { name: "TikTok Comment Generator", href: "/" },
      { name: "Reply Generator", href: "/tools/reply-generator" },
      { name: "Hashtag Generator", href: "/tools/hashtag-generator" },
      { name: "Username Generator", href: "/tools/username-generator" },
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
    ]
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "TikTok Marketing Guide", href: "/blog/tiktok-marketing-guide" },
      { name: "Comment Best Practices", href: "/blog/comment-best-practices" },
      { name: "Viral Content Tips", href: "/blog/viral-content-tips" },
      { name: "FAQ", href: "/faq" },
      { name: "API Documentation", href: "/api-docs" },
    ]
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Press Kit", href: "/press" },
      { name: "Partners", href: "/partners" },
      { name: "Affiliates", href: "/affiliates" },
    ]
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "GDPR", href: "/gdpr" },
      { name: "DMCA", href: "/dmca" },
      { name: "Disclaimer", href: "/disclaimer" },
    ]
  }
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/tiktokcomments" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/tiktokcommentgenerator" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/tiktokcomments" },
  { name: "Youtube", icon: Youtube, href: "https://youtube.com/@tiktokcomments" },
  { name: "Github", icon: Github, href: "https://github.com/tiktokcomments" },
];

export default function GlobalFooter() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                TikTok Comment Generator
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              The #1 free TikTok comment generator tool. Create viral, engaging comments 
              instantly with AI. Used by 500K+ creators worldwide.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">{footerLinks.product.title}</h3>
            <ul className="space-y-2">
              {footerLinks.product.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">{footerLinks.resources.title}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">{footerLinks.company.title}</h3>
            <ul className="space-y-2">
              {footerLinks.company.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">{footerLinks.legal.title}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-b py-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-2">Subscribe to our newsletter</h3>
              <p className="text-sm text-muted-foreground">
                Get TikTok tips, trends, and updates delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border bg-background flex-1 md:w-64"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            © 2025 TikTok Comment Generator. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/sitemap.xml" className="hover:text-primary">Sitemap</Link>
            <Link href="/accessibility" className="hover:text-primary">Accessibility</Link>
            <Link href="/security" className="hover:text-primary">Security</Link>
            <Link href="/status" className="hover:text-primary">Status</Link>
          </div>
        </div>

        {/* SEO Text */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-xs text-muted-foreground text-center">
            TikTok Comment Generator is the leading free tool for creating viral TikTok comments. 
            Our AI-powered comment generator helps content creators, social media managers, and TikTok enthusiasts 
            generate engaging comments instantly. With support for multiple languages and comment styles, 
            our TikTok comment generator is trusted by over 500,000 users worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}