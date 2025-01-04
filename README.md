# Peter Wei's Portfolio Website

Hey there! 👋 Welcome to my portfolio website repository. This is a modern, responsive web application built with Next.js 13+ and TypeScript, showcasing my professional experience, projects, and skills as a Full Stack Developer.

## 🌟 Features

- **Responsive Design**: Looks great on all devices, from mobile to desktop
- **Dark/Light Mode**: Easy on the eyes with theme switching capability
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Interactive Elements**: Including a typewriter effect on the homepage
- **Contact Form**: Get in touch with me directly through the website
- **Project Showcase**: Highlighting my key development projects
- **Professional Experience**: Timeline of my work history
- **Skills & Education**: Comprehensive overview of my technical abilities

## 🚀 Live Demo

Check out the live site at: [https://my-portfolio-ruddy-alpha-30.vercel.app/](https://my-portfolio-ruddy-alpha-30.vercel.app/)

## 💻 Tech Stack

- **Framework**: Next.js 13+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes
- **Deployment**: Vercel

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Petersonwei/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

The project follows a clean and organized structure:

```
my-app/
├── app/                  # Next.js 13+ app directory
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── experience/      # Experience page
│   ├── projects/        # Projects page
│   └── layout.tsx       # Root layout
├── components/          # Reusable components
│   ├── ui/             # UI components
│   ├── navbar.tsx      # Navigation component
│   └── footer.tsx      # Footer component
├── lib/                 # Utility functions
├── public/             # Static assets
└── styles/             # Global styles
```

## 🎨 Key Components

### Homepage

The homepage features a clean, minimalist design with a typewriter effect showcasing my role:

```tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"

export default function Home() {
  const words = [
    { text: "Full" },
    { text: "Stack" },
    { text: "Developer" },
    { text: "&" },
    { text: "IT" },
    { text: "Professional" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center">
        Peter Wei
      </h1>
      <div className="h-16 mt-4">
        <TypewriterEffect words={words} />
      </div>
      <p className="max-w-[700px] text-center text-gray-500 md:text-xl dark:text-gray-400 mx-4 mt-4">
        Passionate about building scalable and user-friendly web applications using modern frameworks and cloud technologies.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button asChild size="lg">
          <Link href="/projects">View Projects</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact">Contact Me</Link>
        </Button>
      </div>
    </div>
  )
}
```

### Navigation

A responsive navbar with mobile menu support:

```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 sm:px-8 lg:px-12">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Peter Wei</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.path ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink href="/" className="flex items-center" onOpenChange={setIsOpen}>
              <span className="font-bold">Peter Wei</span>
            </MobileLink>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navItems.map(
                  (item) => (
                    <MobileLink
                      key={item.path}
                      href={item.path}
                      onOpenChange={setIsOpen}
                    >
                      {item.name}
                    </MobileLink>
                  )
                )}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
```

### Contact Form

A functional contact form with toast notifications:

```tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // FIXME: send the form data to a server
    console.log(formData)
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    })
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Contact Me</h1>
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>Fill out the form below to send me a message.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
            </div>
          </form>
          <div className="mt-6 text-left">
            <p className="text-sm font-medium text-gray-700">+61452509198 | pwei.dev@gmail.com | <a href="https://linkedin.com/in/peter-wei-it/" className="text-blue-500">linkedin.com/in/peter-wei-it/</a></p>
          </div>
          <div className="mt-4"> 
            <Button type="submit">Send Message</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 🤝 Contributing

Feel free to fork this repository and customize it for your own use. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📝 License

This project is open source and available under the MIT License.

## 📧 Contact

Feel free to reach out to me:
- Email: pwei.dev@gmail.com
- LinkedIn: [peter-wei-it](https://linkedin.com/in/peter-wei-it/)
- GitHub: [Petersonwei](https://github.com/Petersonwei)

---

Built with ❤️ by Peter Wei using Next.js and TypeScript. Check out the source code on [GitHub](https://github.com/Petersonwei/my-portfolio.git).

