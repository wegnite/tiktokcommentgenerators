import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Careers - Join Our Team at TikTok Comment Generator',
    description: 'Join our growing team and help millions of creators boost their TikTok engagement.',
    keywords: 'careers, jobs, hiring, work with us, tiktok comment generator careers',
  };
}

export default async function CareersPage() {
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Join Our Team
        </h1>
        
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Help us build the future of social media engagement tools
        </p>

        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">✨ Innovation First</h3>
              <p>Work on cutting-edge AI technology</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🌍 Remote Friendly</h3>
              <p>Work from anywhere in the world</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📈 Growth Opportunities</h3>
              <p>Grow with a rapidly scaling startup</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💰 Competitive Compensation</h3>
              <p>Great salary and equity packages</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Open Positions</h2>

        <div className="space-y-6">
          <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Senior Full Stack Engineer</h3>
                <p className="text-gray-600 dark:text-gray-400">Engineering • Remote • Full-time</p>
              </div>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                New
              </span>
            </div>
            <p className="mb-4">
              We're looking for an experienced full-stack engineer to help build and scale our AI-powered platform.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-4">
              <li>5+ years of experience with React and Node.js</li>
              <li>Experience with AI/ML integration</li>
              <li>Strong understanding of scalable architectures</li>
            </ul>
            <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition">
              Apply Now
            </button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Product Designer</h3>
                <p className="text-gray-600 dark:text-gray-400">Design • Remote • Full-time</p>
              </div>
            </div>
            <p className="mb-4">
              Join us to design beautiful, intuitive interfaces that millions of creators will love.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-4">
              <li>3+ years of product design experience</li>
              <li>Strong portfolio of consumer products</li>
              <li>Experience with design systems</li>
            </ul>
            <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition">
              Apply Now
            </button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Content Marketing Manager</h3>
                <p className="text-gray-600 dark:text-gray-400">Marketing • Remote • Full-time</p>
              </div>
            </div>
            <p className="mb-4">
              Lead our content strategy and help creators discover our tools through engaging content.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-4">
              <li>Experience with social media marketing</li>
              <li>Strong understanding of TikTok ecosystem</li>
              <li>Excellent writing and communication skills</li>
            </ul>
            <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition">
              Apply Now
            </button>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">🎯 User First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Everything we do starts with our users' needs
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🚀 Ship Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Move quickly and iterate based on feedback
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💡 Stay Curious</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Always learning and exploring new ideas
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🤝 Team Work</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Collaborate and support each other
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Don't see a position that fits? We're always looking for talented people.
          </p>
          <button className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 transition">
            Send us your resume
          </button>
        </div>
      </div>
    </div>
  );
}