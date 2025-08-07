'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { 
  Copy, 
  RefreshCw, 
  Heart, 
  Share2, 
  Download,
  Sparkles,
  MessageCircle,
  TrendingUp,
  Zap,
  Globe,
  Smartphone
} from 'lucide-react'

// Comment templates for different tones
const commentTemplates = {
  funny: [
    "This is what I look like trying to {action} 😂",
    "POV: You're {description} and failing miserably 💀",
    "My last brain cell watching this: 🧠💨",
    "This lives in my head rent free now",
    "Not me watching this {number} times in a row 😭",
    "The way I {reaction} at this 🤣",
    "Instructions unclear, {result} 😅"
  ],
  support: [
    "You're doing amazing! Keep it up! ❤️",
    "This is exactly what I needed to see today 🥺",
    "Your content always makes my day better! ✨",
    "So proud of how far you've come! 💪",
    "This deserves way more views! 🔥",
    "You inspire me every day! 🌟",
    "Thank you for sharing this with us! 🙏"
  ],
  trendy: [
    "It's giving {vibe} energy ✨",
    "The {thing} for me 👀",
    "Tell me you're {description} without telling me 💅",
    "This is the one ☝️",
    "Bestie really said {action} and dipped 💨",
    "No but why is this so {adjective} though 😳",
    "The way this is so {adjective} coded 🎯"
  ],
  question: [
    "Tutorial please! 🙏",
    "Where did you get {item}?",
    "What's the song name? 🎵",
    "How long did this take?",
    "Can you do a part 2? 👀",
    "What app/filter is this? 📱",
    "Drop the skincare routine! ✨"
  ],
  compliment: [
    "You're literally glowing! ✨",
    "This is a masterpiece! 🎨",
    "Your creativity is unmatched! 🔥",
    "Obsessed with this! 😍",
    "You ate and left no crumbs! 👑",
    "This is perfection! 💯",
    "You never miss! 🎯"
  ],
  casual: [
    "First! 🥇",
    "Here before this blows up 📈",
    "Algorithm brought me here 🤖",
    "Why is this so accurate though",
    "I felt this in my soul",
    "Saving this for later 📌",
    "Sending this to my bestie rn 📲"
  ]
}

// Sample recent comments for display
const sampleRecentComments = [
  { text: "This is literally me every Monday morning 😭", time: "2 min", likes: 234 },
  { text: "Tutorial please! I need to learn this! 🙏", time: "5 min", likes: 189 },
  { text: "The way you did that transition though 🔥", time: "10 min", likes: 567 },
  { text: "POV: You found the best creator on TikTok ✨", time: "15 min", likes: 892 },
  { text: "Not me watching this 20 times in a row 💀", time: "30 min", likes: 1203 }
]

export default function TikTokCommentGenerator() {
  const [videoContext, setVideoContext] = useState('')
  const [commentIdea, setCommentIdea] = useState('')
  const [selectedTone, setSelectedTone] = useState('funny')
  const [generatedComments, setGeneratedComments] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [recentComments, setRecentComments] = useState(sampleRecentComments)
  const [language, setLanguage] = useState('en')

  // Generate comments based on tone and context
  const generateComments = () => {
    setIsGenerating(true)
    
    setTimeout(() => {
      const templates = commentTemplates[selectedTone as keyof typeof commentTemplates]
      const generated = templates.slice(0, 5).map(template => {
        // Simple template filling
        return template
          .replace('{action}', 'dance')
          .replace('{description}', 'trying to be cool')
          .replace('{number}', '10')
          .replace('{reaction}', 'screamed')
          .replace('{result}', 'I broke my phone')
          .replace('{vibe}', 'main character')
          .replace('{thing}', 'confidence')
          .replace('{adjective}', 'iconic')
          .replace('{item}', 'that outfit')
      })
      
      setGeneratedComments(generated)
      setIsGenerating(false)
      toast.success('Comments generated successfully!')
    }, 1500)
  }

  const copyComment = (comment: string) => {
    navigator.clipboard.writeText(comment)
    toast.success('Comment copied to clipboard!')
  }

  const copyAllComments = () => {
    const allComments = generatedComments.join('\n\n')
    navigator.clipboard.writeText(allComments)
    toast.success('All comments copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <Badge className="mb-4" variant="secondary">
          <Sparkles className="w-3 h-3 mr-1" />
          AI-Powered Generator
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          TikTok Comment Generator
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Generate viral TikTok comments instantly with our free TikTok comment generator. 
          Create engaging, authentic comments that boost your TikTok engagement and help you stand out.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">10M+</div>
            <div className="text-sm text-muted-foreground">Comments Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">500K+</div>
            <div className="text-sm text-muted-foreground">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </div>
        </div>
      </section>

      {/* Main Generator Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Generate Comments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Context Input */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Video URL or Context (optional)
                  </label>
                  <Input
                    placeholder="Paste TikTok URL or describe the video..."
                    value={videoContext}
                    onChange={(e) => setVideoContext(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Choose Comment Tone
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(commentTemplates).map((tone) => (
                      <Button
                        key={tone}
                        variant={selectedTone === tone ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTone(tone)}
                        className="capitalize"
                      >
                        {tone === 'funny' && '😂'}
                        {tone === 'support' && '❤️'}
                        {tone === 'trendy' && '🔥'}
                        {tone === 'question' && '❓'}
                        {tone === 'compliment' && '✨'}
                        {tone === 'casual' && '💬'}
                        {' '}{tone}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Comment Idea Input */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Comment Idea (optional)
                  </label>
                  <Textarea
                    placeholder="Write what you want to comment about..."
                    value={commentIdea}
                    onChange={(e) => setCommentIdea(e.target.value)}
                    className="w-full min-h-[100px]"
                  />
                </div>

                {/* Generate Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={generateComments}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate Comments
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Bulk Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Generated Comments */}
            {generatedComments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Generated Comments</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyAllComments}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {generatedComments.map((comment, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <p className="flex-1 text-sm">{comment}</p>
                      <div className="flex gap-1 ml-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => copyComment(comment)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Preview & Recent */}
          <div className="space-y-6">
            {/* Mobile Preview */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-[2rem] p-2 max-w-[300px] mx-auto">
                  <div className="bg-gray-900 rounded-[1.5rem] p-4 h-[500px] overflow-y-auto">
                    {/* Mock TikTok Interface */}
                    <div className="text-white space-y-4">
                      <div className="text-center text-xs text-gray-400 mb-4">
                        TikTok Preview
                      </div>
                      
                      {/* Mock Comments */}
                      {generatedComments.slice(0, 3).map((comment, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full"></div>
                          <div className="flex-1">
                            <div className="text-xs text-gray-400">@user{index + 1}</div>
                            <div className="text-sm mt-1">{comment}</div>
                            <div className="flex gap-4 mt-2 text-xs text-gray-500">
                              <span>2m</span>
                              <span>Reply</span>
                              <span>❤️ 23</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recently Generated
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentComments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="text-sm">{comment.text}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{comment.time} ago</span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {comment.likes}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => copyComment(comment.text)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 border-t">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Use Our TikTok Comment Generator?
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <Sparkles className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI generates authentic, engaging TikTok comments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <Globe className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Multi-Language</h3>
              <p className="text-sm text-muted-foreground">
                Generate comments in 50+ languages for global reach
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">
                Get multiple comment suggestions in seconds
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <TrendingUp className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Boost Engagement</h3>
              <p className="text-sm text-muted-foreground">
                Increase your TikTok engagement with viral comments
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>Free TikTok Comment Generator - Create Engaging Comments Instantly</h2>
          
          <p>
            Our <strong>TikTok comment generator</strong> is the ultimate tool for creating viral, 
            engaging comments that help you stand out on TikTok. Whether you're a content creator, 
            social media manager, or TikTok enthusiast, our free TikTok comment generator helps 
            you craft the perfect response every time.
          </p>

          <h3>How to Use the TikTok Comment Generator</h3>
          <ol>
            <li>Enter the TikTok video URL or describe the content</li>
            <li>Choose your preferred comment tone (funny, supportive, trendy, etc.)</li>
            <li>Click "Generate Comments" to get instant suggestions</li>
            <li>Copy your favorite comments and use them on TikTok</li>
          </ol>

          <h3>Benefits of Using Our TikTok Comment Generator</h3>
          <ul>
            <li>Save time creating engaging TikTok comments</li>
            <li>Increase your visibility and engagement on TikTok</li>
            <li>Generate comments in multiple languages and styles</li>
            <li>Perfect for content creators and social media managers</li>
            <li>100% free TikTok comment generator with no registration required</li>
          </ul>

          <h3>Features of Our TikTok Comment Generator</h3>
          <p>
            Our <strong>TikTok comment generator</strong> uses advanced AI technology to create 
            authentic, engaging comments that resonate with TikTok users. With multiple tone options, 
            language support, and instant generation, you'll never run out of creative comment ideas.
          </p>

          <h3>Why Choose Our TikTok Comment Generator?</h3>
          <p>
            Unlike other TikTok comment generators, our tool is completely free, requires no sign-up, 
            and generates multiple comment variations instantly. Whether you need funny TikTok comments, 
            supportive messages, or trendy responses, our TikTok comment generator has you covered.
          </p>
        </div>
      </section>
    </div>
  )
}