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
    title: "TikTok Comment Generator - Create Viral Comments",
    description: "Free AI-powered TikTok comment generator. Create viral, funny, and engaging comments instantly. Used by 500K+ creators. No sign-up required!",
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
      
      {/* FAQ Section - Redesigned with Accordion Style */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about TikTok Comment Generator
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary">?</span>
                </span>
                What is a TikTok comment generator?
              </h3>
              <p className="text-muted-foreground pl-11">
                A TikTok comment generator is a free online tool that helps you create engaging, 
                viral comments for TikTok videos. Our AI-powered TikTok comment generator creates 
                authentic comments in various styles including funny, supportive, trendy, and more.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary">?</span>
                </span>
                How does the TikTok comment generator work?
              </h3>
              <p className="text-muted-foreground pl-11">
                Simply enter the video context or URL, choose your preferred comment tone 
                (funny, supportive, trendy, etc.), and click generate. Our TikTok comment 
                generator will instantly create multiple engaging comment suggestions for you to use.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary">?</span>
                </span>
                Is the TikTok comment generator free to use?
              </h3>
              <p className="text-muted-foreground pl-11">
                Yes! Our TikTok comment generator is 100% free to use with no sign-up required. 
                Generate unlimited TikTok comments instantly without any cost or registration.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary">?</span>
                </span>
                Can I generate TikTok comments in different languages?
              </h3>
              <p className="text-muted-foreground pl-11">
                Yes, our TikTok comment generator supports multiple languages including English, 
                Spanish, French, German, Chinese, Japanese, and Korean. Create engaging TikTok 
                comments for a global audience.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary">?</span>
                </span>
                What types of TikTok comments can I generate?
              </h3>
              <p className="text-muted-foreground pl-11">
                Our TikTok comment generator offers various comment styles including funny comments, 
                supportive messages, trendy responses, questions, compliments, and casual comments. 
                Perfect for any TikTok video type or engagement strategy.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary">?</span>
                </span>
                Why should I use a TikTok comment generator?
              </h3>
              <p className="text-muted-foreground pl-11">
                Using our TikTok comment generator saves time, increases engagement, helps you 
                stand out with creative comments, and boosts your visibility on TikTok. It's perfect 
                for content creators, social media managers, and anyone looking to enhance their 
                TikTok presence.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resources & Tools Section - Redesigned */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TikTok Creator Resources & Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed on TikTok, all in one place
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl p-8 h-full border border-transparent hover:border-pink-500/20 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-3">TikTok Reply Generator</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate perfect replies to TikTok comments with our specialized reply generator feature.
                </p>
                <p className="text-sm font-medium text-pink-600 dark:text-pink-400 group-hover:underline">
                  Try Reply Generator →
                </p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl p-8 h-full border border-transparent hover:border-violet-500/20 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-3">Viral Comment Templates</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Access trending TikTok comment templates that are proven to get engagement.
                </p>
                <p className="text-sm font-medium text-violet-600 dark:text-violet-400 group-hover:underline">
                  Browse Templates →
                </p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 h-full border border-transparent hover:border-blue-500/20 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-3">Bulk Comment Generator</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate multiple TikTok comments at once for efficient content engagement.
                </p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                  Generate in Bulk →
                </p>
              </div>
            </div>
          </div>
          
          {/* Success Stats */}
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <p className="text-lg md:text-xl font-medium mb-2">
                Join over <span className="font-bold text-primary">500,000 TikTok creators</span> using our free TikTok comment generator
              </p>
              <p className="text-muted-foreground">
                Boost engagement and grow your following with AI-powered comments that resonate
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">10M+</div>
                  <div className="text-sm text-muted-foreground">Comments Generated</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">500K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Languages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}