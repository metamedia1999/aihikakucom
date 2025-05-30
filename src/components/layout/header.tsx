'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { NAV_ITEMS, SITE_NAME } from '@/lib/constants'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, Twitter, X } from 'lucide-react'
import { motion } from 'framer-motion'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full bg-white border-b border-neutral-200 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-blue to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
              AI
            </div>
            <span className="text-xl font-bold text-primary-blue">{SITE_NAME}</span>
          </Link>

          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-10">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative text-sm font-medium text-neutral-700 transition-colors duration-300 hover:text-primary-blue group"
                >
                  {item.label}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Social Icon */}
            <a
              href="https://twitter.com/aihikaku"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block text-neutral-600 hover:text-primary-blue transition-colors duration-300"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden text-neutral-700 hover:text-primary-blue"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">メニューを開く</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md bg-white">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
                    <Link 
                      href="/" 
                      className="flex items-center space-x-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-blue to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        AI
                      </div>
                      <span className="text-xl font-bold text-primary-blue">{SITE_NAME}</span>
                    </Link>
                  </div>
                  
                  <nav className="flex flex-col gap-4 mt-8">
                    {NAV_ITEMS.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="text-lg font-medium text-neutral-700 transition-colors hover:text-primary-blue"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-6 border-t border-neutral-200">
                    <a
                      href="https://twitter.com/aihikaku"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-neutral-600 hover:text-primary-blue transition-colors duration-300"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="text-sm">Twitterをフォロー</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
