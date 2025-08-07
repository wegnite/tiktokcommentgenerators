import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'TikTok Username Generator - Create Unique Usernames',
    description: 'Generate creative and unique TikTok usernames instantly. Find the perfect username for your TikTok profile.',
    keywords: 'tiktok username generator, username ideas, tiktok names, creative usernames, profile names',
  };
}

export default async function UsernameGeneratorPage() {
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          TikTok Username Generator
        </h1>
        
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Create unique and memorable usernames for your TikTok profile
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Keywords or Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter your name or keywords..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Style
                </label>
                <select className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                  <option>Cool & Trendy</option>
                  <option>Cute & Fun</option>
                  <option>Professional</option>
                  <option>Gaming</option>
                  <option>Aesthetic</option>
                  <option>Minimalist</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                  <option>Content Creator</option>
                  <option>Influencer</option>
                  <option>Artist</option>
                  <option>Gamer</option>
                  <option>Musician</option>
                  <option>Comedian</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Include numbers</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Include symbols</span>
              </label>
            </div>

            <button className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition">
              Generate Usernames
            </button>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-500 mb-3">Generated Usernames:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  <span className="font-medium">@username_example</span>
                  <button className="text-pink-500 hover:text-pink-600">
                    Copy
                  </button>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  <span className="font-medium">@creative_name</span>
                  <button className="text-pink-500 hover:text-pink-600">
                    Copy
                  </button>
                </div>
                <p className="text-center text-gray-500 pt-2">
                  Click generate to see username suggestions...
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="font-semibold mb-1">Unique & Creative</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stand out with original username ideas
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-semibold mb-1">Availability Check</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Suggests usernames likely to be available
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold mb-1">Multiple Styles</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Various styles to match your personality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}