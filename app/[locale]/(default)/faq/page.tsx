import { Metadata } from "next";
import Link from "next/link";
import { 
  MessageCircle,
  ChevronDown
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ - TikTok Comment Generator Questions & Answers",
  description: "Find answers to frequently asked questions about TikTok Comment Generator. Learn how to use our tool, features, privacy, and more.",
  keywords: "tiktok comment generator faq, frequently asked questions, how to use tiktok comment generator",
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is TikTok Comment Generator?",
        a: "TikTok Comment Generator is a free AI-powered tool that helps you create engaging, viral comments for TikTok videos. It generates authentic comments in various styles including funny, supportive, trendy, and more, helping you boost engagement and save time."
      },
      {
        q: "Is TikTok Comment Generator free to use?",
        a: "Yes! Our TikTok comment generator is 100% free to use. There are no hidden fees, no sign-up required, and no limits on how many comments you can generate. We believe everyone should have access to quality engagement tools."
      },
      {
        q: "Do I need to create an account to use the tool?",
        a: "No, you don't need to create an account or sign up. Our TikTok comment generator is completely accessible without any registration. Just visit our website and start generating comments immediately."
      },
      {
        q: "How many comments can I generate?",
        a: "You can generate unlimited comments! There are no daily limits or restrictions. Generate as many TikTok comments as you need for your content engagement strategy."
      }
    ]
  },
  {
    category: "Features & Usage",
    questions: [
      {
        q: "How do I use the TikTok Comment Generator?",
        a: "Using our tool is simple: 1) Enter the TikTok video URL or describe the content (optional), 2) Choose your preferred comment tone (funny, supportive, trendy, etc.), 3) Click 'Generate Comments', 4) Copy your favorite comments and use them on TikTok."
      },
      {
        q: "What types of comments can I generate?",
        a: "Our generator offers six main comment styles: Funny (humorous and entertaining), Supportive (encouraging and positive), Trendy (using current TikTok trends), Questions (engaging queries), Compliments (praise and admiration), and Casual (everyday conversational)."
      },
      {
        q: "Can I generate comments in different languages?",
        a: "Yes! We support 50+ languages including English, Spanish, French, German, Chinese, Japanese, Korean, and many more. Simply select your preferred language from the language selector to generate comments in that language."
      },
      {
        q: "Can I customize the generated comments?",
        a: "While the tool generates complete comments, you're free to modify them before using. You can also provide context or ideas in the input field to influence the generation. Think of the generated comments as inspiration that you can personalize."
      },
      {
        q: "What is bulk comment generation?",
        a: "Bulk generation allows you to create multiple comment variations at once. This is perfect for content creators who need various comment options quickly or social media managers handling multiple accounts."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        q: "How does the AI generate comments?",
        a: "Our AI analyzes current TikTok trends, popular comment patterns, and engagement strategies to generate authentic-sounding comments. It considers context, tone, and platform-specific language to create comments that feel natural and engaging."
      },
      {
        q: "Do I need to install anything?",
        a: "No installation required! TikTok Comment Generator is a web-based tool that works directly in your browser. It's compatible with all devices including desktop, tablet, and mobile phones."
      },
      {
        q: "Does the tool work on mobile devices?",
        a: "Yes, our TikTok comment generator is fully responsive and works perfectly on all mobile devices. You can generate comments on your phone while browsing TikTok for seamless engagement."
      },
      {
        q: "Is there an API available?",
        a: "We're currently developing an API for developers and businesses. If you're interested in API access for bulk generation or integration, please contact us for more information."
      }
    ]
  },
  {
    category: "Privacy & Safety",
    questions: [
      {
        q: "Is my data safe?",
        a: "Absolutely. We don't store any personal data or the comments you generate. Our tool operates with a privacy-first approach - no tracking, no data collection, just pure functionality."
      },
      {
        q: "Do you store the comments I generate?",
        a: "No, we don't store generated comments. Each session is independent, and once you leave the page, all generated content is cleared. Your privacy is our priority."
      },
      {
        q: "Will using generated comments get me banned on TikTok?",
        a: "Our tool generates original, human-like comments that comply with TikTok's community guidelines. However, we recommend using comments authentically and avoiding spam-like behavior such as posting the same comment repeatedly."
      },
      {
        q: "Can I use the generated comments commercially?",
        a: "Yes, you're free to use the generated comments for both personal and commercial purposes. The comments are generated uniquely for you and you have full rights to use them."
      }
    ]
  },
  {
    category: "Best Practices",
    questions: [
      {
        q: "How can I make generated comments more authentic?",
        a: "Personalize the generated comments by adding your own touch, referencing specific details from the video, or combining elements from multiple suggestions. Use them as inspiration rather than copying them verbatim."
      },
      {
        q: "When is the best time to comment on TikTok?",
        a: "Comment early! The first few hours after a video is posted are crucial. Early engagement can help boost the video's visibility, and your comment is more likely to be seen and receive likes."
      },
      {
        q: "How many comments should I post?",
        a: "Quality over quantity. Focus on posting meaningful, relevant comments rather than many generic ones. One well-crafted comment is worth more than ten generic ones."
      },
      {
        q: "Should I use emojis in my comments?",
        a: "Yes! Emojis are a natural part of TikTok communication. Our generator includes relevant emojis, but feel free to add or modify them to match your style and the video's vibe."
      }
    ]
  },
  {
    category: "Troubleshooting",
    questions: [
      {
        q: "The generator isn't working. What should I do?",
        a: "Try refreshing the page, clearing your browser cache, or using a different browser. If the problem persists, please contact our support team with details about the issue."
      },
      {
        q: "Can I generate comments for specific TikTok niches?",
        a: "Yes! Provide context about the video or niche in the optional input field. The AI will consider this information to generate more relevant, niche-specific comments."
      },
      {
        q: "The comments don't match my style. How can I improve them?",
        a: "Try different tone settings, provide more specific context in the input field, or generate multiple batches to find comments that match your voice. Remember, you can always edit the suggestions."
      },
      {
        q: "Is there a limit to comment length?",
        a: "Our generator creates comments optimized for TikTok's format - typically concise and punchy. TikTok comments can be up to 150 characters, and our tool generates comments within this limit."
      }
    ]
  }
];

export default function FAQPage() {
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
              <Link href="/faq" className="text-primary">FAQ</Link>
              <Link href="/contact" className="hover:text-primary">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know about TikTok Comment Generator. 
          Can't find what you're looking for? Feel free to contact us.
        </p>
      </section>

      {/* FAQ Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">
                {category.category}
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${categoryIndex}-${index}`}
                    className="bg-card border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you couldn't find the answer you're looking for, our support team is here to help. 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Support
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-background border px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Try Generator
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>About Our TikTok Comment Generator FAQ</h2>
          <p>
            This comprehensive FAQ covers everything about our TikTok comment generator tool. 
            Whether you're new to using AI-powered comment generators or an experienced content 
            creator looking to optimize your TikTok engagement strategy, you'll find helpful 
            information here.
          </p>
          
          <p>
            Our TikTok comment generator is designed to be user-friendly and accessible to everyone. 
            With no sign-up required and completely free access, you can start generating engaging 
            TikTok comments immediately. The tool supports multiple languages and comment styles, 
            making it perfect for creators worldwide.
          </p>
          
          <p>
            Remember, the key to successful TikTok engagement is authenticity. While our generator 
            provides excellent comment suggestions, we encourage users to personalize them and use 
            them as inspiration for genuine interaction with the TikTok community.
          </p>
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
              <Link href="/contact" className="hover:text-primary">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}