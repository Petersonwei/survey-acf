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
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Mobile Menu */}
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
                {navItems.map((item) => (
                  <MobileLink
                    key={item.path}
                    href={item.path}
                    onOpenChange={setIsOpen}
                  >
                    {item.name}
                  </MobileLink>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* Centered Logo with Dropdown */}
        <div className="flex-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 hover:bg-transparent">
              <Image 
                src="/ACF-logo.png" 
                alt="Logo" 
                width={250} 
                height={250}
                className="object-contain cursor-pointer"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            {navItems.map((item) => (
              <DropdownMenuItem key={item.path} asChild>
                <Link
                  href={item.path}
                  className={cn(
                    "w-full cursor-pointer",
                    pathname === item.path ? "font-medium" : ""
                  )}
                >
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex-1 flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

interface MobileLinkProps {
  children: React.ReactNode
  href: string
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
