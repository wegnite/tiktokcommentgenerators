'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  MessageCircle, 
  Menu, 
  X,
  ChevronDown,
  Sparkles,
  DollarSign,
  BookOpen,
  Users,
  HelpCircle,
  Mail,
  FileText,
  Shield,
  Home,
  Wrench,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Tools",
    icon: Wrench,
    children: [
      {
        name: "Comment Generator",
        href: "/",
        description: "Generate viral TikTok comments instantly",
        icon: MessageCircle,
      },
      {
        name: "Reply Generator",
        href: "/tools/reply-generator",
        description: "Create perfect comment replies",
        icon: MessageCircle,
      },
      {
        name: "Hashtag Generator",
        href: "/tools/hashtag-generator",
        description: "Find trending TikTok hashtags",
        icon: TrendingUp,
      },
      {
        name: "Username Generator",
        href: "/tools/username-generator",
        description: "Create unique TikTok usernames",
        icon: Users,
      },
    ]
  },
  {
    name: "Features",
    href: "/features",
    icon: Sparkles,
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: DollarSign,
  },
  {
    name: "Resources",
    icon: BookOpen,
    children: [
      {
        name: "Blog",
        href: "/blog",
        description: "TikTok tips and strategies",
        icon: FileText,
      },
      {
        name: "FAQ",
        href: "/faq",
        description: "Frequently asked questions",
        icon: HelpCircle,
      },
      {
        name: "About",
        href: "/about",
        description: "Learn about our mission",
        icon: Users,
      },
      {
        name: "Contact",
        href: "/contact",
        description: "Get in touch with us",
        icon: Mail,
      },
    ]
  },
];

export default function GlobalNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 font-bold text-xl"
            >
              <MessageCircle className="w-6 h-6 text-primary" />
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                TikTok Comment Generator
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      {item.children ? (
                        <>
                          <NavigationMenuTrigger className="flex items-center gap-1">
                            <item.icon className="w-4 h-4" />
                            {item.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                              {item.children.map((child) => (
                                <li key={child.name}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={child.href}
                                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                      <div className="flex items-center gap-2">
                                        <child.icon className="w-4 h-4 text-primary" />
                                        <div className="text-sm font-medium leading-none">
                                          {child.name}
                                        </div>
                                      </div>
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {child.description}
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <Button className="ml-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Try Free Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden">
          <div className="fixed inset-0 top-16 overflow-y-auto">
            <nav className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer list-none">
                          <span className="flex items-center gap-2 font-medium">
                            <item.icon className="w-4 h-4" />
                            {item.name}
                          </span>
                          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="mt-2 ml-6 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block py-2 text-sm text-muted-foreground hover:text-primary"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <child.icon className="w-4 h-4" />
                                {child.name}
                              </div>
                              <p className="text-xs mt-1 ml-6">
                                {child.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 py-2 font-medium ${
                          pathname === item.href ? "text-primary" : ""
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                <Button className="w-full mt-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try Free Now
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}