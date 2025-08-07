import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Partners - TikTok Comment Generator Partnership Program',
    description: 'Partner with us to bring powerful TikTok engagement tools to your audience.',
    keywords: 'partners, partnership, business partners, tiktok tools partnership',
  };
}

export default async function PartnersPage() {
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Partnership Program
        </h1>
        
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Grow your business with our powerful TikTok engagement tools
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🏢</div>
            <h2 className="text-2xl font-bold mb-4">Agency Partners</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Perfect for digital marketing agencies managing multiple TikTok accounts
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Bulk account management</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>White-label options</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Volume discounts</span>
              </li>
            </ul>
            <button className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition">
              Become an Agency Partner
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🔌</div>
            <h2 className="text-2xl font-bold mb-4">Technology Partners</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Integrate our API into your platform or application
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Full API access</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Custom integration support</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Co-marketing opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Revenue sharing</span>
              </li>
            </ul>
            <button className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition">
              Become a Tech Partner
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold mb-1">500K+ Users</h3>
              <p className="text-sm">Growing community of creators</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-semibold mb-1">Global Reach</h3>
              <p className="text-sm">50+ languages supported</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold mb-1">99.9% Uptime</h3>
              <p className="text-sm">Reliable infrastructure</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Current Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center h-24">
            <span className="text-gray-400">Partner Logo</span>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center h-24">
            <span className="text-gray-400">Partner Logo</span>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center h-24">
            <span className="text-gray-400">Partner Logo</span>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center h-24">
            <span className="text-gray-400">Partner Logo</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Partner Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">📊 Analytics Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track performance and usage metrics in real-time
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💰 Revenue Sharing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Earn commissions on referred customers
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎯 Marketing Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Co-branded materials and campaigns
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🛠️ Technical Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Dedicated partner success team
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Partner?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Let's discuss how we can grow together
          </p>
          <button className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition text-lg">
            Contact Partnership Team
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Or email us at partners@tiktokcommentgenerators.com
          </p>
        </div>
      </div>
    </div>
  );
}