import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'TikTok Reply Generator - Create Engaging Replies Instantly',
    description: 'Generate perfect replies for TikTok comments. AI-powered tool to create witty, supportive, and engaging responses.',
    keywords: 'tiktok reply generator, comment reply, tiktok responses, auto reply, engagement tool',
  };
}

export default async function ReplyGeneratorPage() {
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          TikTok Reply Generator
        </h1>
        
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Generate perfect replies for TikTok comments instantly
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Original Comment
              </label>
              <textarea
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                rows={3}
                placeholder="Paste the comment you want to reply to..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Reply Tone
              </label>
              <select className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                <option>Friendly</option>
                <option>Professional</option>
                <option>Humorous</option>
                <option>Thankful</option>
                <option>Informative</option>
              </select>
            </div>

            <button className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition">
              Generate Reply
            </button>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Generated Reply:</p>
              <p className="text-gray-700 dark:text-gray-300">
                Your generated reply will appear here...
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold mb-1">Instant Generation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get multiple reply options in seconds
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold mb-1">Context-Aware</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Replies match the tone and context perfectly
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold mb-1">Engagement Boost</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create replies that encourage conversation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}