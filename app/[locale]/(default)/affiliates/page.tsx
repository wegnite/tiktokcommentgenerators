import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Affiliate Program - Earn with TikTok Comment Generator',
    description: 'Join our affiliate program and earn commissions by promoting TikTok Comment Generator.',
    keywords: 'affiliate program, earn money, referral program, tiktok affiliate',
  };
}

export default async function AffiliatesPage() {
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Affiliate Program
        </h1>
        
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Earn up to 30% recurring commission for every customer you refer
        </p>

        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">30%</div>
              <p>Recurring Commission</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">90</div>
              <p>Days Cookie Duration</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$500+</div>
              <p>Average Monthly Earnings</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="bg-pink-100 dark:bg-pink-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Join our affiliate program for free
            </p>
          </div>
          <div className="text-center">
            <div className="bg-pink-100 dark:bg-pink-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Share Your Link</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Promote using your unique referral link
            </p>
          </div>
          <div className="text-center">
            <div className="bg-pink-100 dark:bg-pink-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Earn Commission</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get paid monthly via PayPal or bank transfer
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Commission Structure</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Plan</th>
                <th className="text-left py-3">Price</th>
                <th className="text-left py-3">Your Commission</th>
                <th className="text-left py-3">Monthly Earning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">Pro Plan</td>
                <td className="py-3">$9.99/month</td>
                <td className="py-3">30%</td>
                <td className="py-3 font-semibold text-green-600">$3.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Business Plan</td>
                <td className="py-3">$49.99/month</td>
                <td className="py-3">30%</td>
                <td className="py-3 font-semibold text-green-600">$15.00</td>
              </tr>
              <tr>
                <td className="py-3">Enterprise</td>
                <td className="py-3">Custom</td>
                <td className="py-3">Up to 40%</td>
                <td className="py-3 font-semibold text-green-600">$100+</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-6">Perfect For</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-3">📱 Content Creators</h3>
            <p className="text-gray-600 dark:text-gray-400">
              TikTok influencers and creators who want to monetize their audience
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-3">📝 Bloggers & YouTubers</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Content creators writing about social media marketing
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-3">🏢 Marketing Agencies</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Agencies looking for additional revenue streams
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-3">👥 Community Managers</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Anyone managing TikTok communities or groups
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Affiliate Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">🎨 Marketing Materials</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Banners, graphics, and email templates
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📊 Real-time Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track clicks, conversions, and earnings
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎓 Training Resources</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Best practices and promotion strategies
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💬 Dedicated Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get help from our affiliate team
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-2">🎁 Special Bonus</h3>
          <p>Earn an extra $50 bonus when you reach your first 10 paid referrals!</p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join thousands of affiliates earning passive income
          </p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition text-lg mb-4">
            Join Affiliate Program
          </button>
          <p className="text-sm text-gray-500">
            Free to join • No minimum sales required • Monthly payouts
          </p>
        </div>

        <div className="mt-12 border-t pt-8">
          <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-1">When do I get paid?</p>
              <p className="text-gray-600 dark:text-gray-400">
                Payments are processed monthly, on the 1st of each month for the previous month's earnings.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Is there a minimum payout?</p>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, the minimum payout is $50. Earnings below this amount roll over to the next month.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I promote on TikTok?</p>
              <p className="text-gray-600 dark:text-gray-400">
                Absolutely! TikTok is one of the best platforms to promote our tool.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}