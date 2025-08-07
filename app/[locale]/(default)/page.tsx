import TikTokCommentGenerator from "@/components/tiktok-comment-generator";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  let canonicalUrl = `https://tiktokcommentgenerators.com`;

  if (locale !== "en") {
    canonicalUrl = `https://tiktokcommentgenerators.com/${locale}`;
  }

  return {
    title: "TikTok Comment Generator - Free Viral Comments Creator | 2025",
    description: "Generate viral TikTok comments instantly with our free TikTok comment generator. Create funny, trendy, and engaging comments that boost your TikTok engagement. No sign-up required!",
    keywords: "tiktok comment generator, tiktok comments generator, tiktok comment reply generator, viral tiktok comments, funny tiktok comments, tiktok engagement tool, tokcomment, tok comment generator, free comment generator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "TikTok Comment Generator - Create Viral Comments Instantly",
      description: "Free TikTok comment generator to create engaging, viral comments. Generate funny, supportive, trendy comments with AI. 10M+ comments generated!",
      type: "website",
      locale: locale,
      url: canonicalUrl,
      siteName: "TikTok Comment Generators",
      images: [
        {
          url: "https://tiktokcommentgenerators.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "TikTok Comment Generator Tool",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Free TikTok Comment Generator - Create Viral Comments",
      description: "Generate engaging TikTok comments instantly. AI-powered, free, no sign-up required!",
      images: ["https://tiktokcommentgenerators.com/og-image.png"],
      creator: "@tiktokcomments",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <TikTokCommentGenerator />
      
      {/* FAQ Section for SEO */}
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions about TikTok Comment Generator
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              What is a TikTok comment generator?
            </h3>
            <p className="text-muted-foreground">
              A TikTok comment generator is a free online tool that helps you create engaging, 
              viral comments for TikTok videos. Our AI-powered TikTok comment generator creates 
              authentic comments in various styles including funny, supportive, trendy, and more.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">
              How does the TikTok comment generator work?
            </h3>
            <p className="text-muted-foreground">
              Simply enter the video context or URL, choose your preferred comment tone 
              (funny, supportive, trendy, etc.), and click generate. Our TikTok comment 
              generator will instantly create multiple engaging comment suggestions for you to use.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Is the TikTok comment generator free to use?
            </h3>
            <p className="text-muted-foreground">
              Yes! Our TikTok comment generator is 100% free to use with no sign-up required. 
              Generate unlimited TikTok comments instantly without any cost or registration.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Can I generate TikTok comments in different languages?
            </h3>
            <p className="text-muted-foreground">
              Yes, our TikTok comment generator supports multiple languages including English, 
              Spanish, French, German, Chinese, Japanese, and Korean. Create engaging TikTok 
              comments for a global audience.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">
              What types of TikTok comments can I generate?
            </h3>
            <p className="text-muted-foreground">
              Our TikTok comment generator offers various comment styles including funny comments, 
              supportive messages, trendy responses, questions, compliments, and casual comments. 
              Perfect for any TikTok video type or engagement strategy.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Why should I use a TikTok comment generator?
            </h3>
            <p className="text-muted-foreground">
              Using our TikTok comment generator saves time, increases engagement, helps you 
              stand out with creative comments, and boosts your visibility on TikTok. It's perfect 
              for content creators, social media managers, and anyone looking to enhance their 
              TikTok presence.
            </p>
          </div>
        </div>
      </section>
      
      {/* Additional SEO Content */}
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            TikTok Comment Generator Tools & Resources
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-semibold mb-2">TikTok Reply Generator</h3>
              <p className="text-sm text-muted-foreground">
                Generate perfect replies to TikTok comments with our specialized reply generator feature.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Viral Comment Templates</h3>
              <p className="text-sm text-muted-foreground">
                Access trending TikTok comment templates that are proven to get engagement.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Bulk Comment Generator</h3>
              <p className="text-sm text-muted-foreground">
                Generate multiple TikTok comments at once for efficient content engagement.
              </p>
            </div>
          </div>
          
          <div className="prose prose-lg mx-auto text-center">
            <p>
              Join over <strong>500,000 TikTok creators</strong> using our free TikTok comment generator 
              to boost engagement and grow their following. Whether you need funny TikTok comments, 
              supportive messages, or trendy responses, our AI-powered tool has you covered.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}