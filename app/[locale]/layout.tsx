import "@/app/globals.css";

import { getMessages, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/locale";

import { AppContextProvider } from "@/contexts/app";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";
import { NextAuthSessionProvider } from "@/auth/session";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/providers/theme";
import { cn } from "@/lib/utils";
import Script from "next/script";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Removed unused variables to fix TypeScript warnings

  return {
    title: {
      template: `%s | TikTok Comments`,
      default: "TikTok Comment Generator - Free AI Tool",
    },
    description: "Create viral TikTok comments instantly with our free AI-powered generator. Join 500K+ creators using our tool. No sign-up required!",
    keywords: "tiktok comment generator, tiktok comments generator, tiktok comment reply generator, viral tiktok comments, funny tiktok comments, tiktok engagement tool, free comment generator, AI comment generator",
    openGraph: {
      title: "TikTok Comment Generator - Create Viral Comments Instantly",
      description: "Generate engaging TikTok comments with our free AI-powered tool. Create funny, trendy, and authentic comments that boost engagement.",
      url: "https://tiktokcommentgenerators.com",
      siteName: "TikTok Comment Generators",
      type: "website",
      images: [
        {
          url: "https://tiktokcommentgenerators.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "TikTok Comment Generator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "TikTok Comment Generator - Create Viral Comments",
      description: "Free AI-powered TikTok comment generator. Create engaging comments instantly!",
      images: ["https://tiktokcommentgenerators.com/og-image.png"],
    },
    alternates: {
      canonical: "https://tiktokcommentgenerators.com",
      languages: {
        "en": "https://tiktokcommentgenerators.com/en",
        "zh": "https://tiktokcommentgenerators.com/zh",
        "es": "https://tiktokcommentgenerators.com/es",
        "fr": "https://tiktokcommentgenerators.com/fr",
        "de": "https://tiktokcommentgenerators.com/de",
        "ja": "https://tiktokcommentgenerators.com/ja",
        "ko": "https://tiktokcommentgenerators.com/ko",
      },
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
    verification: {
      google: "verification_token_here",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://tiktokcommentgenerators.com";
  const googleAdsenseCode = "ca-pub-6224617757558738";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-adsense-account" content={googleAdsenseCode} />
        <meta name="author" content="TikTok Comment Generators" />
        <meta name="robots" content="index, follow" />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`${webUrl}/${locale === "en" ? "" : locale}`} />

        {locales &&
          locales.map((loc) => (
            <link
              key={loc}
              rel="alternate"
              hrefLang={loc}
              href={`${webUrl}${loc === "en" ? "" : `/${loc}`}/`}
            />
          ))}
        <link rel="alternate" hrefLang="x-default" href={webUrl} />
        
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MM928ZVYZB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-1" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MM928ZVYZB');
          `}
        </Script>
        
        {/* Google Analytics 2 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0771XCB6W2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-2" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0771XCB6W2');
          `}
        </Script>
        
        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseCode}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* Schema.org Structured Data */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "TikTok Comment Generator",
              "url": "https://tiktokcommentgenerators.com",
              "description": "Free AI-powered TikTok comment generator to create viral, engaging comments instantly",
              "applicationCategory": "SocialNetworkingApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "10234"
              }
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <NextAuthSessionProvider>
            <AppContextProvider>
              <ThemeProvider attribute="class" disableTransitionOnChange>
                {children}
              </ThemeProvider>
            </AppContextProvider>
          </NextAuthSessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
