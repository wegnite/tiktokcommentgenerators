import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'TikTok Hashtag Generator - Trending Tags for Your Videos',
    description: 'Generate viral TikTok hashtags instantly. Find trending tags to boost your video visibility and reach.',
    keywords: 'tiktok hashtag generator, trending hashtags, viral tags, tiktok tags, hashtag tool',
  };
}

export default async function HashtagGeneratorPage() {
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          TikTok Hashtag Generator
        </h1>
        
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Find the perfect hashtags to make your TikTok videos go viral
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Video Topic or Keywords
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="E.g., dance, cooking, comedy, fashion..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Category
              </label>
              <select className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                <option>Entertainment</option>
                <option>Education</option>
                <option>Fashion & Beauty</option>
                <option>Food & Cooking</option>
                <option>Fitness & Health</option>
                <option>Technology</option>
                <option>Travel</option>
                <option>Gaming</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Hashtag Mix
              </label>
              <select className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                <option>Balanced (Trending + Niche)</option>
                <option>High Competition (Popular)</option>
                <option>Low Competition (Niche)</option>
              </select>
            </div>

            <button className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition">
              Generate Hashtags
            </button>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-500 mb-3">Generated Hashtags (30):</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-sm">
                  #fyp
                </span>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-sm">
                  #foryou
                </span>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-sm">
                  #viral
                </span>
                <span className="text-gray-500">Generate to see more...</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold mb-1">Trending Analysis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real-time trending hashtag suggestions
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold mb-1">Niche Targeting</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Find hashtags specific to your content
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-semibold mb-1">Visibility Boost</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Increase your reach with optimal tags
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}