"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, ArrowRight } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { href: "#about", label: "Sobre" },
  { href: "#how-it-works", label: "Como Funciona" },
  { href: "#plans", label: "Planos" },
  { href: "#examples", label: "Exemplos" },
  { href: "#faq", label: "FAQ" },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = links.map((link) => link.href.replace("#", ""))

    const observers = sectionIds
      .map((id) => {
        const element = document.getElementById(id)
        if (!element) return null

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id)
              }
            })
          },
          { threshold: 0.3 },
        )

        observer.observe(element)
        return { id, observer, element }
      })
      .filter(Boolean)

    // Cleanup
    return () => {
      observers.forEach((item) => {
        if (item && item.observer && item.element) {
          item.observer.unobserve(item.element)
        }
      })
    }
  }, [])

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id.replace("#", ""))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setActiveSection(id.replace("#", ""))
      }
      if (isOpen) {
        setIsOpen(false)
      }
    },
    [isOpen],
  )

  const isActive = (href: string) => activeSection === href.replace("#", "")

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-secondary-dark/95 backdrop-blur-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center"
        >
          <Heart className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-primary">Love Journey</span>
        </motion.div>

        {/* Desktop Navigation - Centered on larger screens */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          {links.map((link, index) => (
            <motion.button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`text-base mx-4 transition-colors ${
                isActive(link.href) ? "text-primary font-medium" : "text-gray-300 hover:text-primary"
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1 * (index + 1),
                type: "spring",
                stiffness: 300,
              }}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  className="h-0.5 bg-primary mt-1"
                  layoutId="activeIndicator"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile Navigation Links (md screens) */}
        <div className="hidden md:flex lg:hidden items-center space-x-6">
          {links.map((link, index) => (
            <motion.button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`text-sm transition-colors ${
                isActive(link.href) ? "text-primary font-medium" : "text-gray-300 hover:text-primary"
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1 * (index + 1),
                type: "spring",
                stiffness: 300,
              }}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  className="h-0.5 bg-primary mt-1"
                  layoutId="activeIndicatorMd"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.1 * (links.length + 1),
            type: "spring",
            stiffness: 300,
          }}
        >
          <Button
            onClick={() => scrollToSection("#plans")}
            className="hidden md:flex"
          >
            Comece Agora
          </Button>
        </motion.div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="md:hidden">
              <Button variant="ghost" className="[&_svg]:size-6" aria-label="Menu">
                <Menu />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="top" className="w-full h-full bg-secondary-dark border-secondary">
            <motion.div
              className="flex flex-col h-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <Heart className="h-6 w-6 text-primary mr-2" />
                  <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-primary">
                    Love Journey
                  </span>
                </div>
                <SheetClose asChild>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2">
                    <X className="h-6 w-6 text-gray-300" />
                  </motion.button>
                </SheetClose>
              </div>
              <nav className="flex flex-col items-start justify-start flex-grow pt-8 px-2 space-y-6">
                <AnimatePresence>
                  {links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.1 * index,
                        type: "spring",
                        stiffness: 300,
                      }}
                      className="w-full"
                    >
                      <SheetClose asChild>
                        <button
                          onClick={() => scrollToSection(link.href)}
                          className={`text-lg transition-colors ${
                            isActive(link.href) ? "text-primary font-medium" : "text-gray-300 hover:text-primary"
                          }`}
                        >
                          {link.label}
                        </button>
                      </SheetClose>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 * (links.length + 1),
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="w-full pt-4"
                >
                  <SheetClose asChild>
                    <Button
                      onClick={() => scrollToSection("#plans")}
                      className="w-full bg-gradient-primary text-white hover:opacity-90 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Comece Agora <ArrowRight className="ml-2" />
                    </Button>
                  </SheetClose>
                </motion.div>
              </nav>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header