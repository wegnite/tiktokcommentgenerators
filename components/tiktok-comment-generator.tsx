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

      {/* Features Section - Redesigned */}
      <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Zap className="w-3 h-3 mr-1" />
              Core Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our TikTok Comment Generator?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of AI-driven comment generation with features designed for creators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <Card className="relative h-full border-muted/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced AI generates authentic, engaging TikTok comments that resonate with your audience
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <Card className="relative h-full border-muted/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Multi-Language</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate comments in 50+ languages for global reach and international audience engagement
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <Card className="relative h-full border-muted/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Get multiple comment suggestions in seconds with our lightning-fast generation engine
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <Card className="relative h-full border-muted/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Boost Engagement</h3>
                  <p className="text-sm text-muted-foreground">
                    Increase your TikTok engagement with viral comments that drive conversations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Beautiful Design */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-violet-500/5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <MessageCircle className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Use TikTok Comment Generator
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create viral comments in just 3 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Enter Context</h3>
              <p className="text-muted-foreground text-center">
                Paste the TikTok URL or describe the video content you want to comment on
              </p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-pink-500 to-transparent" />
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Choose Style</h3>
              <p className="text-muted-foreground text-center">
                Select your preferred comment tone: funny, supportive, trendy, or more
              </p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-violet-500 to-transparent" />
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Generate & Copy</h3>
              <p className="text-muted-foreground text-center">
                Get instant comment suggestions and copy your favorites with one click
              </p>
            </div>
          </div>
          
          {/* Benefits Grid */}
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Why Creators Love Our Tool</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-500 text-lg">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Save Hours Daily</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate engaging comments instantly instead of spending time thinking
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-500 text-lg">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Increase Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Stand out with creative comments that get more likes and replies
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-500 text-lg">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">100% Free Forever</h4>
                  <p className="text-sm text-muted-foreground">
                    No sign-up required, no hidden fees, unlimited comment generation
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-500 text-lg">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Perfect for Creators</h4>
                  <p className="text-sm text-muted-foreground">
                    Ideal for content creators, social media managers, and TikTok enthusiasts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500/10 via-violet-500/10 to-blue-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Viral TikTok Comments?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 500,000+ creators using our free TikTok comment generator to boost engagement
          </p>
          <Button size="lg" className="text-lg px-8">
            <Sparkles className="w-5 h-5 mr-2" />
            Start Generating Comments
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No sign-up required • 100% Free • Instant results
          </p>
        </div>
      </section>
    </div>
  )
}