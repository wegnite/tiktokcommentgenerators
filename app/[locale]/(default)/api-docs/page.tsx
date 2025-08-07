import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'API Documentation - TikTok Comment Generator',
    description: 'Complete API documentation for integrating TikTok Comment Generator into your applications.',
    keywords: 'api docs, tiktok api, comment generator api, developer documentation',
  };
}

export default async function ApiDocsPage() {
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">API Documentation</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Integrate our powerful comment generation API into your applications.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <p className="font-semibold">🚀 API Access Available in Business Plan</p>
            <p>Get API access with our Business plan for $49.99/month</p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Authentication</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Endpoints</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Generate Comments</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <code>POST /api/v1/generate-comments</code>
          </div>
          
          <h4 className="font-semibold mb-2">Request Body:</h4>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6">
{`{
  "context": "Video description or URL",
  "style": "funny | supportive | trendy | question | compliment | casual",
  "count": 5,
  "language": "en"
}`}
          </pre>

          <h4 className="font-semibold mb-2">Response:</h4>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6">
{`{
  "success": true,
  "comments": [
    "Generated comment 1",
    "Generated comment 2",
    "Generated comment 3"
  ],
  "usage": {
    "requests_remaining": 9995,
    "reset_date": "2025-02-01"
  }
}`}
          </pre>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Rate Limits</h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Business Plan: 10,000 requests/month</li>
            <li>Enterprise: Custom limits available</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Error Codes</h2>
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Code</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">200</td>
                <td className="py-2">Success</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">400</td>
                <td className="py-2">Bad Request</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">401</td>
                <td className="py-2">Unauthorized</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">429</td>
                <td className="py-2">Rate Limit Exceeded</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">500</td>
                <td className="py-2">Internal Server Error</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-2xl font-semibold mt-8 mb-4">SDKs & Libraries</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">JavaScript/Node.js</h3>
              <code className="text-sm">npm install @tiktok-generator/sdk</code>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Python</h3>
              <code className="text-sm">pip install tiktok-generator</code>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="font-semibold mb-2">Need Help?</p>
            <p>Contact our developer support at api@tiktokcommentgenerators.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}