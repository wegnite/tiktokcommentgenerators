'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import * as htmlToImage from 'html-to-image'
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
  Smartphone,
  Image,
  Palette,
  ChevronDown,
  CheckCircle,
  Verified,
  MoreHorizontal
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// TikTok background styles
const backgroundStyles = [
  { 
    id: 'dark', 
    name: 'Dark Mode', 
    bg: 'bg-black',
    commentBg: 'bg-gray-900/80',
    textColor: 'text-white',
    secondaryText: 'text-gray-400',
    borderColor: 'border-gray-800'
  },
  { 
    id: 'light', 
    name: 'Light Mode', 
    bg: 'bg-white',
    commentBg: 'bg-gray-50',
    textColor: 'text-gray-900',
    secondaryText: 'text-gray-600',
    borderColor: 'border-gray-200'
  },
  { 
    id: 'gradient-purple', 
    name: 'Purple Gradient', 
    bg: 'bg-gradient-to-br from-purple-900 via-black to-pink-900',
    commentBg: 'bg-black/60',
    textColor: 'text-white',
    secondaryText: 'text-gray-300',
    borderColor: 'border-purple-800/30'
  },
  { 
    id: 'gradient-blue', 
    name: 'Blue Ocean', 
    bg: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900',
    commentBg: 'bg-black/50',
    textColor: 'text-white',
    secondaryText: 'text-cyan-200',
    borderColor: 'border-cyan-700/30'
  },
  { 
    id: 'gradient-sunset', 
    name: 'Sunset', 
    bg: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600',
    commentBg: 'bg-black/40',
    textColor: 'text-white',
    secondaryText: 'text-orange-100',
    borderColor: 'border-orange-400/30'
  },
  { 
    id: 'neon', 
    name: 'Neon Lights', 
    bg: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
    commentBg: 'bg-black/70',
    textColor: 'text-white',
    secondaryText: 'text-purple-300',
    borderColor: 'border-purple-500/50'
  }
]

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
  { text: "This is literally me every Monday morning 😭", time: "2 min", likes: 234, username: "sarah_loves_coffee", verified: true },
  { text: "Tutorial please! I need to learn this! 🙏", time: "5 min", likes: 189, username: "creativemind22", verified: false },
  { text: "The way you did that transition though 🔥", time: "10 min", likes: 567, username: "videoproeditor", verified: true },
  { text: "POV: You found the best creator on TikTok ✨", time: "15 min", likes: 892, username: "tiktokfan99", verified: false },
  { text: "Not me watching this 20 times in a row 💀", time: "30 min", likes: 1203, username: "memequeen", verified: false }
]

export default function TikTokCommentGenerator() {
  const [videoContext, setVideoContext] = useState('')
  const [commentIdea, setCommentIdea] = useState('')
  const [username, setUsername] = useState('cooluser123')
  const [selectedTone, setSelectedTone] = useState('funny')
  const [generatedComments, setGeneratedComments] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [recentComments, setRecentComments] = useState(sampleRecentComments)
  const [language, setLanguage] = useState('en')
  const [selectedBackground, setSelectedBackground] = useState(backgroundStyles[0])
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpeg' | 'webp'>('png')
  const [showVerified, setShowVerified] = useState(false)
  const [currentComment, setCurrentComment] = useState('')
  const [likes, setLikes] = useState('234')
  const [replies, setReplies] = useState('12')
  const [timeAgo, setTimeAgo] = useState('2m')
  
  const previewRef = useRef<HTMLDivElement>(null)

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
      if (generated.length > 0 && !currentComment) {
        setCurrentComment(generated[0])
      }
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

  // Download the preview as image
  const downloadImage = async (format: 'png' | 'jpeg' | 'webp' = downloadFormat) => {
    if (!previewRef.current) return

    try {
      let dataUrl: string
      
      if (format === 'png') {
        dataUrl = await htmlToImage.toPng(previewRef.current, {
          quality: 1,
          pixelRatio: 2
        })
      } else if (format === 'jpeg') {
        dataUrl = await htmlToImage.toJpeg(previewRef.current, {
          quality: 0.95,
          pixelRatio: 2
        })
      } else {
        dataUrl = await htmlToImage.toCanvas(previewRef.current, {
          pixelRatio: 2
        }).then(canvas => canvas.toDataURL('image/webp', 0.95))
      }

      const link = document.createElement('a')
      link.download = `tiktok-comment-${Date.now()}.${format}`
      link.href = dataUrl
      link.click()
      
      toast.success(`Comment downloaded as ${format.toUpperCase()}!`)
    } catch (error) {
      console.error('Error downloading image:', error)
      toast.error('Failed to download image')
    }
  }

  // Apply comment to preview
  const applyComment = (comment: string) => {
    setCurrentComment(comment)
    toast.success('Comment applied to preview!')
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
            <div className="text-3xl font-bold text-primary">Free</div>
            <div className="text-sm text-muted-foreground">No Sign-up</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">Instant</div>
            <div className="text-sm text-muted-foreground">Generation</div>
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
                {/* Username Input */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Username
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your username..."
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowVerified(!showVerified)}
                      className={showVerified ? 'bg-blue-50 border-blue-500' : ''}
                    >
                      <Verified className={`w-4 h-4 ${showVerified ? 'text-blue-500' : ''}`} />
                    </Button>
                  </div>
                </div>

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
                      className="flex items-start justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                    >
                      <p className="flex-1 text-sm">{comment}</p>
                      <div className="flex gap-1 ml-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => applyComment(comment)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => copyComment(comment)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Preview & Settings */}
          <div className="space-y-6">
            {/* Background Style Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Customize Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Background Style
                  </label>
                  <RadioGroup value={selectedBackground.id} onValueChange={(value) => {
                    const style = backgroundStyles.find(s => s.id === value)
                    if (style) setSelectedBackground(style)
                  }}>
                    <div className="grid grid-cols-2 gap-2">
                      {backgroundStyles.map((style) => (
                        <div key={style.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={style.id} id={style.id} />
                          <Label htmlFor={style.id} className="cursor-pointer text-sm">
                            {style.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Comment Settings */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Likes</label>
                    <Input
                      value={likes}
                      onChange={(e) => setLikes(e.target.value)}
                      placeholder="234"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Replies</label>
                    <Input
                      value={replies}
                      onChange={(e) => setReplies(e.target.value)}
                      placeholder="12"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Time</label>
                    <Input
                      value={timeAgo}
                      onChange={(e) => setTimeAgo(e.target.value)}
                      placeholder="2m"
                      className="h-8 text-sm"
                    />
                  </div>
                </div>

                {/* Download Options */}
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download as {downloadFormat.toUpperCase()}
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Download Format</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => { setDownloadFormat('png'); downloadImage('png'); }}>
                        <Image className="w-4 h-4 mr-2" />
                        PNG (High Quality)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setDownloadFormat('jpeg'); downloadImage('jpeg'); }}>
                        <Image className="w-4 h-4 mr-2" />
                        JPEG (Smaller Size)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setDownloadFormat('webp'); downloadImage('webp'); }}>
                        <Image className="w-4 h-4 mr-2" />
                        WebP (Modern Format)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyComment(currentComment)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Preview with TikTok UI */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  ref={previewRef}
                  className={`${selectedBackground.bg} rounded-[2rem] p-4 max-w-[350px] mx-auto`}
                >
                  <div className="min-h-[500px] flex flex-col justify-end">
                    {/* TikTok-style comment section */}
                    <div className="space-y-3">
                      {/* Main comment preview */}
                      <div className={`${selectedBackground.commentBg} backdrop-blur-md rounded-2xl p-4 border ${selectedBackground.borderColor}`}>
                        {/* User info */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <span className={`font-semibold text-sm ${selectedBackground.textColor}`}>
                                @{username || 'cooluser123'}
                              </span>
                              {showVerified && (
                                <Verified className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <p className={`text-sm mt-1 ${selectedBackground.textColor} leading-relaxed`}>
                              {currentComment || "Your awesome comment will appear here! Try generating some comments or type your own. 🎉"}
                            </p>
                            
                            {/* Interaction buttons */}
                            <div className={`flex items-center gap-4 mt-3 text-xs ${selectedBackground.secondaryText}`}>
                              <span>{timeAgo}</span>
                              <button className="hover:underline">Reply</button>
                              <div className="flex items-center gap-1">
                                <Heart className="w-3.5 h-3.5" />
                                <span>{likes}</span>
                              </div>
                              {replies !== '0' && (
                                <button className="hover:underline">
                                  View {replies} replies
                                </button>
                              )}
                              <MoreHorizontal className="w-3.5 h-3.5 ml-auto" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sample reply */}
                      {replies !== '0' && (
                        <div className={`${selectedBackground.commentBg} backdrop-blur-md rounded-2xl p-4 ml-8 border ${selectedBackground.borderColor} opacity-70`}>
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex-shrink-0"></div>
                            <div className="flex-1">
                              <span className={`font-semibold text-xs ${selectedBackground.textColor}`}>
                                @replyer
                              </span>
                              <p className={`text-xs mt-1 ${selectedBackground.textColor}`}>
                                So true! 💯
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Comment input area */}
                      <div className={`${selectedBackground.commentBg} backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 border ${selectedBackground.borderColor}`}>
                        <span className={`text-sm ${selectedBackground.secondaryText}`}>
                          Add comment...
                        </span>
                        <div className="ml-auto flex gap-2">
                          <span className="text-lg">😊</span>
                          <span className="text-lg">@</span>
                        </div>
                      </div>
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
                    onClick={() => setCurrentComment(comment.text)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs font-medium">@{comment.username}</span>
                        {comment.verified && (
                          <Verified className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
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
                      onClick={(e) => {
                        e.stopPropagation()
                        copyComment(comment.text)
                      }}
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
                    <Image className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Export Options</h3>
                  <p className="text-sm text-muted-foreground">
                    Download your comments as PNG, JPEG, or WebP images with custom backgrounds
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <Card className="relative h-full border-muted/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Custom Styles</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from multiple TikTok-authentic background styles and themes
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
                  <h3 className="font-semibold text-lg mb-2">Live Preview</h3>
                  <p className="text-sm text-muted-foreground">
                    See your comments in realistic TikTok interface before downloading
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
              Create viral comments in just 4 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Enter Username</h3>
              <p className="text-muted-foreground text-center text-sm">
                Add your TikTok username and choose verification badge if needed
              </p>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Choose Style</h3>
              <p className="text-muted-foreground text-center text-sm">
                Select comment tone and background theme for your preview
              </p>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Generate & Customize</h3>
              <p className="text-muted-foreground text-center text-sm">
                Get AI-generated comments and customize likes, replies, and time
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  4
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Download Image</h3>
              <p className="text-muted-foreground text-center text-sm">
                Export your comment as PNG, JPEG, or WebP with TikTok styling
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
                  <h4 className="font-semibold mb-1">Realistic TikTok UI</h4>
                  <p className="text-sm text-muted-foreground">
                    Preview comments in authentic TikTok interface with customizable elements
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-500 text-lg">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Multiple Export Formats</h4>
                  <p className="text-sm text-muted-foreground">
                    Download as PNG, JPEG, or WebP with high-quality rendering
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-500 text-lg">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Custom Backgrounds</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose from dark mode, light mode, gradients, and neon themes
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-500 text-lg">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Instant Preview</h4>
                  <p className="text-sm text-muted-foreground">
                    See your comment with background before downloading
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
            Start using our free TikTok comment generator to boost engagement
          </p>
          <Button size="lg" className="text-lg px-8" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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